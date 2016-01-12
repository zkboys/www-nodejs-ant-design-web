import './style.less';
import React from 'react';
import {message, Breadcrumb,Spin, QueueAnim} from 'antd';
import {Link} from 'react-router';
import {menuRouts} from '../MenusRouts'
import Sidebar from '../sidebar/Sidebar';
/*
 * props:
 header: object / 'auto' 用来显示头部标题和右侧面包屑导航
 object demo:
 {
 title: '左侧标题啊',
 breadcrumbItems: [
 {text: '用户管理'},
 {text: '用户查询', path: '/myTime3'},
 {text: '修改用户'}
 ]
 }

 loading: true / false 切换页面loading和非loading状态。
 * */
const Page = React.createClass({
    getInitialState(){
        return {
            pageHeader: ''
        }
    },
    getDefaultProps(){
        return {
            loading: false,
            animConfig: [
                {opacity: [1, 0], translateY: [0, 50]},
                {opacity: [1, 0], translateY: [0, -50]}
            ]
        }
    },
    getPageHeaderDateByMenu(){
        let currentMenuKey = Sidebar.getCurrentMenuKey();
        let currentMenu = null;
        for (let i = 0; i < menuRouts.length; i++) {
            let menu = menuRouts[i];
            if (menu.key === currentMenuKey) {
                currentMenu = menu;
                break;
            }
        }
        let breadcrumbItems = [];
        for (let i = 0; i < currentMenu.parentText.length; i++) {
            breadcrumbItems.push({text: currentMenu.parentText[i]});
        }
        breadcrumbItems.push({text: currentMenu.text});
        return {
            title: currentMenu.text,
            breadcrumbItems
        };
    },
    setPageHeader(){
        let pageHeaderJsx = '';
        let pageHeaderDate = null;
        if (this.props.header === 'auto') {
            pageHeaderDate = this.getPageHeaderDateByMenu();
        } else if (typeof this.props.header == 'object') {
            if (this.props.header.title || this.props.header.breadcrumbItems) {
                pageHeaderDate = {};
                pageHeaderDate.title = this.props.header.title === 'auto' || !this.props.header.title ? this.getPageHeaderDateByMenu().title : this.props.header.title;
                pageHeaderDate.breadcrumbItems = this.props.header.breadcrumbItems === 'auto' || !this.props.header.breadcrumbItems ? this.getPageHeaderDateByMenu().breadcrumbItems : this.props.header.breadcrumbItems;

            } else {
                pageHeaderJsx =
                    <div className="admin-page-header">
                        <QueueAnim animConfig={this.props.animConfig}>
                            <div key='queue-anim-item1'>
                                {this.props.header}
                            </div>
                        </QueueAnim>
                    </div>
            }

        }

        if (pageHeaderDate) {
            let breadcrumbItems = [
                <Breadcrumb.Item key="page-breadcrumb-item-home"><Link to="/">首页</Link></Breadcrumb.Item>
            ];
            let items = pageHeaderDate.breadcrumbItems;
            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                let key = 'page-breadcrumb-item' + i;
                breadcrumbItems.push(
                    item.path ? <Breadcrumb.Item key={key}><Link to={item.path}>{item.text}</Link></Breadcrumb.Item>
                        : <Breadcrumb.Item key={key}>{item.text}</Breadcrumb.Item>
                );
            }
            pageHeaderJsx =
                <div className="admin-page-header">
                    <QueueAnim animConfig={this.props.animConfig}>
                        <div key='queue-anim-item1'>
                            <h1 className="admin-page-header-title">{pageHeaderDate.title}</h1>
                            <Breadcrumb>
                                {breadcrumbItems}
                            </Breadcrumb>
                        </div>
                    </QueueAnim>
                </div>;
        }
        this.setState({
            pageHeader: pageHeaderJsx
        });
    },
    switchLoadingMessage(){
        if (this.props.loading) {
            if (!this.hideLoading) {
                this.hideLoading = message.loading('正在加载...', 0);
            }
        } else {
            if (this.hideLoading) {
                this.hideLoading();
            }
        }
    },
    componentWillUpdate(){
        this.switchLoadingMessage();
    },
    componentDidUpdate(){
        this.switchLoadingMessage();
    },
    componentWillMount(){

    },
    componentDidMount(){
        let _this = this;
        if (Sidebar.getSidebarStatus() === 'ok') {
            _this.setPageHeader();
        } else {
            /*
             * 由于Routs中使用了一个setTimeout，处理页面首次进入时候的菜单状态，导致这里不能确保在菜单设置状态之后访问，所以加了个setTimeout
             * TODO：Routs中的setTimeout和这里的setTimeout都是不好的解决方案，需要替换。
             * */
            setTimeout(function () {
                _this.setPageHeader();
            }, 10);//这种方式，切换页面的时候，头部会闪动，设置成1ms也会有闪动。
        }

    },
    componentWillUnmount(){
        if (this.hideLoading) {
            this.hideLoading();
        }
    },
    render() {
        return (
            <div className={"admin-page "}>
                <div className="admin-page-content">
                    <div className="admin-page-content-inner">
                        {this.state.pageHeader}
                        <QueueAnim animConfig={this.props.animConfig} delay={100}>
                            <div key='queue-anim-item1'>
                                <Spin spining={this.props.loading}>
                                    {this.props.children}
                                </Spin>
                            </div>
                        </QueueAnim>
                    </div>
                </div>
            </div>
        );
    }
});

export default Page;
