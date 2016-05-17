import "./style.less";
import React from "react";
import Request from "superagent";
import FAIcon from "../faicon/FAIcon";
import {Spin, Radio, Button} from "antd";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class RadioItem extends React.Component {
    state = {
        options: this.props.options,
    };
    static defaultProps = {
        size: 'large',
        minCount: 10,
        expandable: false,
        options: [],
        optionsFilter(res){
            return res.body.results;
        },

    };
    static propTypes = {
        options: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        minCount: React.PropTypes.number,
        expandable: React.PropTypes.bool,
    };
    loadingValue = Symbol();

    componentDidMount() {
        const url = this.props.url;
        let options = this.props.options;
        if (url) {
            options.push({
                value: this.loadingValue,
                label: <div className="spin-wrap"><Spin /></div>
            });
            const optionsFilter = this.props.optionsFilter;
            Request
                .get(url)
                .end((err, res)=> {
                    options = options.filter((v)=> {
                        return v.value !== this.loadingValue;
                    });
                    if (err) {
                        options.push({
                            value: this.loadingValue,
                            label: <div className="spin-wrap error">获取数据失败</div>
                        });
                    } else {
                        const newOptions = optionsFilter(res);
                        options = options.concat(newOptions);
                    }
                    options = options.map((v)=> {
                        return {value: v.value.toString(), label: v.label}
                    });
                    this.setState({
                        options
                    })
                });
        }
    };

    handleExpandBtnClick = (e)=> {
        let button = e.currentTarget;
        let btnClassNames = button.className.split(' ');
        if (btnClassNames.includes('expanded')) {
            btnClassNames.splice(btnClassNames.indexOf('expanded'), 1);
            button.title = "显示更多";
            this.setState({
                expanded: false,
            })
        } else {
            btnClassNames.push('expanded');
            button.title = "收起更多";
            this.setState({
                expanded: true,
            })
        }
        button.className = btnClassNames.join(' ');
    };

    render() {
        const button = this.props.button;
        let options = this.state.options;
        const showCount = this.props.minCount;
        const expandable = this.props.expandable;
        const showExpandedBtn = expandable && options.length > showCount;
        options = expandable ? options.filter((v, i, a)=> {
            if (this.state.expanded) {
                return true;
            }
            return i < showCount;
        }) : options;

        return (
            <div className="form-item form-item-radio ">
                <RadioGroup {...this.props}>
                    {options.map((v, i)=> {
                        const key = i;
                        if (v.value === this.loadingValue) {
                            return <span key={key}>{v.label}</span>;
                        }
                        if (button) {
                            return <RadioButton key={key} value={v.value}>{v.label}</RadioButton>;
                        } else {
                            return <Radio key={key} value={v.value}>{v.label}</Radio>;
                        }

                    })}
                    {
                        showExpandedBtn ?
                            <Button
                                type="ghost"
                                title="显示更多"
                                style={{padding:'0 25px',paddingTop:'1px', fontSize:button?'19px':'12px'}}
                                onClick={this.handleExpandBtnClick}
                            >
                                <FAIcon type="fa-angle-double-down"/>
                            </Button>
                            : ''
                    }
                </RadioGroup>
            </div>
        )
    };
}
export default RadioItem;
