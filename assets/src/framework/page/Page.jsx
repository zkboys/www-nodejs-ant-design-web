import './style.less';
import React from 'react';
import {message, Breadcrumb,Spin, QueueAnim} from 'antd';
import {Link} from 'react-router';
import {getCurrentHeaderMenu} from '../HeaderMenu';
import {getCurrentSidebarMenu} from '../SidebarMenu'
import Settings from '../settings/Settings'
import PubSubMsg from '../common/pubsubmsg';
const Page = React.createClass({
    getInitialState(){
        return {
            pageHeader: '',
            showPageAnimate: Settings.pageAnimate()
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
        let currentMenu = getCurrentSidebarMenu();
        let parentText = currentMenu ? currentMenu.parentText : [];
        let title = currentMenu ? currentMenu.text : '';
        let breadcrumbItems = [];
        for (let i = 0; i < parentText.length; i++) {
            breadcrumbItems.push({text: parentText[i]});
        }
        breadcrumbItems.push({text: title});
        return {
            title,
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
                if (this.props.header.title === 'auto') {
                    pageHeaderDate.title = this.getPageHeaderDateByMenu().title;
                } else if (this.props.header.title) {
                    pageHeaderDate.title = this.props.header.title;
                } else {
                    pageHeaderDate.title = ' ';
                }
                if (this.props.header.breadcrumbItems === 'auto') {
                    pageHeaderDate.breadcrumbItems = this.getPageHeaderDateByMenu().breadcrumbItems
                } else if (this.props.header.breadcrumbItems) {
                    pageHeaderDate.breadcrumbItems = this.props.header.breadcrumbItems;
                } else {
                    pageHeaderDate.breadcrumbItems = ''
                }
            } else {
                if (this.state.showPageAnimate) {
                    pageHeaderJsx =
                        <div className="admin-page-header">
                            <QueueAnim animConfig={this.props.animConfig}>
                                <div key='queue-anim-item1'>
                                    {this.props.header}
                                </div>
                            </QueueAnim>
                        </div>
                } else {
                    pageHeaderJsx =
                        <div className="admin-page-header">
                            {this.props.header}
                        </div>
                }

            }

        }
        if (pageHeaderDate) {
            let currentHeaderMenu = getCurrentHeaderMenu();
            let breadcrumbItems = [];
            if (currentHeaderMenu) {
                breadcrumbItems.push(
                    <Breadcrumb.Item key="page-breadcrumb-item-home"><Link to={currentHeaderMenu.path}>{currentHeaderMenu.text}</Link></Breadcrumb.Item>
                );
            }
            let items = pageHeaderDate.breadcrumbItems;
            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                let key = 'page-breadcrumb-item' + i;
                breadcrumbItems.push(
                    item.path ? <Breadcrumb.Item key={key}><Link to={item.path}>{item.text}</Link></Breadcrumb.Item>
                        : <Breadcrumb.Item key={key}>{item.text}</Breadcrumb.Item>
                );
            }
            let breadcrumb = '';
            if (pageHeaderDate.breadcrumbItems) {
                breadcrumb =
                    <Breadcrumb>
                        {breadcrumbItems}
                    </Breadcrumb>;
            }
            if (this.state.showPageAnimate) {
                pageHeaderJsx =
                    <div className="admin-page-header">
                        <QueueAnim animConfig={this.props.animConfig}>
                            <div key='queue-anim-item1'>
                                <h1 className="admin-page-header-title">{pageHeaderDate.title}</h1>
                                {breadcrumb}
                            </div>
                        </QueueAnim>
                    </div>;
            } else {
                pageHeaderJsx =
                    <div className="admin-page-header">
                        <h1 className="admin-page-header-title">{pageHeaderDate.title}</h1>
                        {breadcrumb}
                    </div>;
            }

        }
        this.setState({
            pageHeader: pageHeaderJsx
        });
    },
    switchLoadingMessage(){

        if (this.props.loading) {
            if (!this.hideLoading) {
                //this.hideLoading = message.loading('正在加载...', 0);
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
        PubSubMsg.subscribe('set-header-breadcrumb', function () {
            _this.setPageHeader();
        });
        PubSubMsg.unsubscribe('set-header-breadcrumb');

    },
    componentWillUnmount(){
        if (this.hideLoading) {
            this.hideLoading();
        }
    },
    render() {
        let pageChildren =
            <Spin spining={this.props.loading}>
                {this.props.children}
            </Spin>;
        if (this.state.showPageAnimate) {
            pageChildren =
                <QueueAnim animConfig={this.props.animConfig} delay={100}>
                    <div key='queue-anim-item1'>
                        {pageChildren}
                    </div>
                </QueueAnim>
        }
        return (
            <div className={"admin-page "}>
                <div className="admin-page-content">
                    <div className="admin-page-content-inner">
                        {this.state.pageHeader}
                        {pageChildren}
                    </div>
                </div>
            </div>
        );
    }
});

export default Page;
