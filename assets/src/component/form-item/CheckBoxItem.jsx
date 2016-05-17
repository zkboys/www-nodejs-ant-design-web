import "./style.less";
import React from "react";
import Request from "superagent";
import FAIcon from "../faicon/FAIcon";
import {Spin, Button, Checkbox} from "antd";

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
        defaultValue: React.PropTypes.array,
        value: React.PropTypes.array,
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
                        let newOptions = optionsFilter(res);
                        options = options.concat(newOptions);
                    }
                    this.setState({
                        options
                    });
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
    handleChange = (v)=> {
        const value = this.props.value || this.props.defaultValue || [];
        let index = value.indexOf(v);
        if (index !== -1) {
            value.splice(index, 1)
        } else {
            value.push(v);
        }
        this.setState({
            value
        });
        this.props.onChange && this.props.onChange(value)
    };

    render() {
        const value = this.props.value || this.props.defaultValue || [];
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
            <div className="form-item form-item-checkbox ">
                {options.map((v, i)=> {
                    const key = i;
                    if (v.value === this.loadingValue) {
                        return <span key={key}>{v.label}</span>;
                    }
                    let className = ['checkbox-btn'];
                    if (value.includes(v.value)) {
                        className.push('checkbox-btn-checked');
                    }
                    if (button) {
                        return (
                            <label
                                key={key}
                                className={className.join(' ')}
                                onClick={()=>{this.handleChange(v.value)}}
                            >
                                {v.label}
                            </label>
                        );
                    }
                    return (
                        <label key={key} className="check-box-group">
                            <Checkbox checked={value.includes(v.value)}
                                      onClick={()=>{this.handleChange(v.value)}}/>{v.label}
                        </label>
                    );
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
            </div>
        )
    };
}
export default RadioItem;
