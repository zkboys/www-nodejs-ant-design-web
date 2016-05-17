import "./style.less";
import React from "react";
import Request from "superagent";
import {Spin, Select, Button} from "antd";

class ComboboxItem extends React.Component {
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
        options: React.PropTypes.array.isRequired,
    };

    componentDidMount() {
        const url = this.props.url;
        let options = this.props.options;
        if (url) {
            //options.push(<div className="spin-wrap"><Spin /></div>);
            const optionsFilter = this.props.optionsFilter;
            Request
                .get(url)
                .end((err, res)=> {
                    //options = options.filter((v)=> {
                    //    return !(v instanceof Object);
                    //});
                    if (err) {
                        options.push(<div className="spin-wrap error">获取数据失败</div>);
                    } else {
                        const newOptions = optionsFilter(res);
                        options = options.concat(newOptions);
                    }

                    this.setState({
                        options,
                    })
                });
        }
    };

    handleChange = (value)=> {
        let comboboxOptions;
        const separator = this.props.separator;
        if (!value || value.indexOf(separator) >= 0) {
            comboboxOptions = [];
        } else {
            comboboxOptions = this.state.options.map((opt) => {
                const label = `${value}${separator}${opt}`;
                return <Option key={label}>{label}</Option>;
            });
        }
        this.setState({
            comboboxOptions
        });
        this.props.onChange && this.props.onChange(value)
    };

    render() {
        return (
            <Select
                combobox
                {...this.props}
                filterOption={false}
                onChange={this.handleChange}
            >
                {this.state.comboboxOptions}
            </Select>
        )
    };
}
export default ComboboxItem;
