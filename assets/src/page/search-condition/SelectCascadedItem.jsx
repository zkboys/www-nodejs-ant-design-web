import React from 'react';
import {Col} from 'antd';
import assign from 'object-assign'
import SelectItem from './SelectItem'
import SelectSearchItem from './SelectSearchItem'
import SelectMultipleItem from './SelectMultipleItem'
import LabelItem from './LabelItem'
import PubSubMsg from '../../common/pubsubmsg';
class SelectCascadedItem extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        selects: this.props.items
    };
    componentDidMount = ()=> {
        this.props.items &&
        this.props.items.length &&
        this.props.items[0].defaultValue &&
        this.setNextOptions(0, this.props.items[0].defaultValue);
    };
    setNextOptions = (index, value)=> {
        let tempState = assign({}, this.state);
        let selects = tempState.selects;
        for (let i = 0; i < selects.length; i++) {
            if (i > index) {
                let item = selects[i - 1];
                let nextItem = selects[i];
                if (nextItem) {
                    let name = nextItem.name;
                    let options = [];
                    if(i-1===index){
                        options = item.getNextOptions && item.getNextOptions(value);
                    }
                    PubSubMsg.publish('setNextOptions' + name, {name, options})
                }
            }
        }
    };

    render() {
        let selects = this.state.selects.map((item, index, arr)=> {
            let TempSelect;
            switch(item.type){
                case 'selectSearch':{
                    TempSelect = SelectSearchItem;
                    break;
                }
                case 'selectMultiple':{
                    TempSelect = SelectMultipleItem;
                    break;
                }
                default:{
                    TempSelect = SelectItem;
                    break;
                }

            }
            return (
                <div key={index} style={{display: 'flex',alignItems:'center'}}>
                    <LabelItem key={'label-'+index} {...item}/>
                    <TempSelect  {...item} setData={this.props.setData} search={this.props.search} setNextOptions={(value)=>{this.setNextOptions(index,value)}}/>
                </div>
            )
        });
        return (
            <div style={{display: 'flex',alignItems:'center'}}>{selects}</div>
        );
    }
}
export default SelectCascadedItem
