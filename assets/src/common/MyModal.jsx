import React from 'react';
import { Modal , Button} from 'antd';
const MyModal = React.createClass({
    getInitialState() {
        return {visible: false};
    },
    showModal() {
        this.setState({
            visible: true
        });
    },
    handleOk() {
        console.log('点击了确定');
        this.setState({
            visible: false
        });
        this.props.okCb();
    },
    handleCancel() {
        this.setState({
            visible: false
        });
        this.props.cancelCb();
    },
    render() {
        return <div>
            <Button type="primary" onClick={this.showModal}>{this.props.btnText}</Button>
            <Modal title={this.props.title} visible={this.state.visible}
                   onOk={this.handleOk} onCancel={this.handleCancel}>
                <p>{this.props.content}</p>
            </Modal>
        </div>;
    }
});

export default MyModal;
