import "./style.less";
import React from "react";
import assign from "object-assign";
import Request from "superagent";
import {Spin, Select, Button} from "antd";

class SelectItem extends React.Component {
    state = {
        options: this.props.options,
    };
    static defaultProps = {
        size: 'large',
        options: [],
        optionsFilter(res){
            return res.body.results;
        },

    };
    static propTypes = {
        options: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
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

    render() {
        let options = this.state.options;
        let props = this.props;
        if (this.props.showSearch) {
            props = assign({}, {
                optionFilterProp: "children",
                notFoundContent: "无法找到",
                searchPlaceholder: "输入关键词",
            }, this.props)
        }
        return (
            <Select {...props}>
                {options.map((v, i)=> {
                    if (v.value === this.loadingValue) {
                        return <span key={i}>{v.label}</span>;
                    }
                    return <Option key={i} value={v.value}>{v.label}</Option>;
                })}
            </Select>
        )
    };
}
export default SelectItem;
