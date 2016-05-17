import "./style.less";
import React from "react";
import assign from "object-assign";
import moment from "moment";
import {Spin, Button, Checkbox, Form, DatePicker, TimePicker} from "antd";
class RadioItem extends React.Component {
    state = {
        startValue: this.props.startFieldProps.value || this.props.startDefaultValue,
        endValue: this.props.endFieldProps.value || this.props.endDefaultValue,
    };
    static defaultProps = {};
    static propTypes = {};

    componentDidMount() {
    };

    dateToString = (date, format)=> {
        format = format.replace('yyyy', 'YYYY');
        format = format.replace('dd', 'DD');
        return moment(date).format(format);
    };
    stringToDate = (str, format) => {
        format = format.replace('yyyy', 'YYYY');
        format = format.replace('dd', 'DD');
        return moment(str, format).toDate();
    };

    render() {
        const resultDateToString = this.props.resultDateToString;
        let defaultFormat = {
            date: 'yyyy-MM-dd',
            dateArea: 'yyyy-MM-dd',
            time: 'HH:mm',
            timeArea: 'HH:mm',
            dateTime: 'yyyy-MM-dd HH:mm',
            dateTimeArea: 'yyyy-MM-dd HH:mm',
        };
        const isDate = this.props.date;
        const isDateArea = this.props.dateArea;
        const isTime = this.props.time;
        const isTimeArea = this.props.timeArea;
        const isDateTime = this.props.dateTime;
        const isDateTimeArea = this.props.dateTimeArea;
        const itemType =
            isDate && 'date'
            || isDateArea && 'dateArea'
            || isTime && 'time'
            || isTimeArea && 'timeArea'
            || isDateTime && 'dateTime'
            || isDateTimeArea && 'dateTimeArea';
        const format = this.props.format || defaultFormat[itemType];
        let disableBefore = this.props.disableBefore;
        let disableAfter = this.props.disableAfter;
        if (typeof disableBefore === 'string') {
            disableBefore = this.stringToDate(disableBefore, format)
        }
        if (typeof disableAfter === 'string') {
            disableAfter = this.stringToDate(disableAfter, format)
        }

        let disabledStartDate = (startValue)=> {
            let endValue = this.state.endValue;
            if (!startValue || !endValue) {
                return false;
            }
            if (typeof endValue === 'string') {
                endValue = this.stringToDate(endValue, format);
            }
            let disEnd = startValue.getTime() > endValue.getTime();
            let disBefore = false;
            if (disableBefore) {
                disBefore = startValue.getTime() < disableBefore.getTime();
            }
            let disAfter = false;
            if (disableAfter) {
                disAfter = startValue.getTime() > disableAfter.getTime();
            }
            return disEnd || disBefore || disAfter;

        };
        let disabledEndDate = (endValue)=> {
            let startValue = this.state.startValue;
            if (!endValue || !startValue) {
                return false;
            }
            if (typeof startValue === 'string') {
                startValue = this.stringToDate(startValue, format);
            }
            let disStart = endValue.getTime() < startValue.getTime();
            let disBefore = false;
            if (disableBefore) {
                disBefore = endValue.getTime() < disableBefore.getTime();
            }
            let disAfter = false;
            if (disableAfter) {
                disAfter = endValue.getTime() > disableAfter.getTime();
            }
            return disStart || disBefore || disAfter;

        };


        const width = this.props.width;
        let splitWidth = 10;
        const itemWidth = ((parseInt(width) - splitWidth) / 2) + 'px';
        splitWidth = splitWidth + 'px';
        const eleProps = {
            style: {width: '100%'}
        };
        if (isDateTimeArea) {
            eleProps.showTime = true;
        }
        const startFieldPropsOptions = this.props.startFieldProps;
        const endFieldPropsOptions = this.props.endFieldProps;
        let handleChange = (name)=> {
            return (value)=> {
                this.setState({
                    [name]: value,
                });
                if (resultDateToString && value) {
                    value = this.dateToString(value, format);
                }
                name === 'startValue' && startFieldPropsOptions.onChange && startFieldPropsOptions.onChange(value);
                name === 'endValue' && endFieldPropsOptions.onChange && endFieldPropsOptions.onChange(value);
                this.props.onChange && this.props.onChange(value, name);
            }
        };
        const startEleProps = assign({}, eleProps, {onChange: handleChange('startValue')});
        const endEleProps = assign({}, eleProps, {onChange: handleChange('endValue')});

        let startDefaultValue = startFieldPropsOptions.value || this.props.startDefaultValue;
        let endDefaultValue = endFieldPropsOptions.value || this.props.endDefaultValue;
        if (startDefaultValue && typeof startDefaultValue === 'string') {
            startDefaultValue = this.stringToDate(startDefaultValue, format);
        }
        if (endDefaultValue && typeof endDefaultValue === 'string') {
            endDefaultValue = this.stringToDate(endDefaultValue, format);
        }
        let startPicker;
        let endPicker;
        if (isDateArea || isDateTimeArea) {
            startPicker = (
                <DatePicker
                    disabledDate={disabledStartDate}
                    {...startFieldPropsOptions}
                    defaultValue={startDefaultValue}
                    format={format}
                    {...startEleProps}
                />
            );
            endPicker = (
                <DatePicker
                    disabledDate={disabledEndDate}
                    {...endFieldPropsOptions}
                    defaultValue={endDefaultValue}
                    format={format}
                    {...endEleProps}
                />
            );
        }
        if (isTimeArea) {
            startPicker = (
                <TimePicker
                    size="large"
                    {...startFieldPropsOptions}
                    defaultValue={startDefaultValue}
                    format={format}
                    {...startEleProps}
                />
            );
            endPicker = (
                <TimePicker
                    size="large"
                    {...endFieldPropsOptions}
                    defaultValue={endDefaultValue}
                    format={format}
                    {...endEleProps}
                />
            );
        }

        return (
            <div className="form-item form-item-datetime-area">
                <div className="area-item" style={{width:itemWidth}}>
                    {startPicker}
                </div>
                <div className="area-split" style={{width:splitWidth}}>
                    <p className="ant-form-split">-</p>
                </div>
                <div className="area-item" style={{width:itemWidth}}>
                    {endPicker}
                </div>
            </div>
        )
    };
}
export default RadioItem;
