import React from "react";
import Common from "../common/common.jsx";
import {message} from "antd";
import request from '../common/request/request';

class BaseComponent extends React.Component {
    // 页面上多个请求同时进行，用来记录loading数量
    loadings = 0;
    startLoading = ()=> {
        this.setState({
            loading: true
        });
        this.loadings++;
    };
    endLoading = ()=> {
        this.loadings--;
        if (this.loadings === 0) {
            this.setState({
                loading: false
            });
        }
    };
    request = ()=> {
        let _this = this;
        return {
            url: null,
            withNoMchId: false,
            errorMsg: null,
            type: null,
            paramsData: {},
            withNoLoading: false,
            startCb: null,
            errorCb: null,
            successCb: null,
            get(url){
                this.url = url;
                this.type = 'get';
                return this;
            },
            post(url){
                this.url = url;
                this.type = 'post';
                return this;
            },
            put(url) {
                this.url = url;
                this.type = 'put';
                return this;
            },
            delete(url) {
                this.url = url;
                this.type = 'delete';
                return this;
            },
            params(params){
                this.paramsData = params;
                return this;
            },
            noMchId(){
                this.withNoMchId = true;
                return this;
            },
            noLoading(){
                this.withNoLoading = true;
                return this;
            },
            setErrorMsg(errorMsg){
                this.errorMsg = Common.messageContent[errorMsg];
                return this;
            },
            start(cb){
                this.startCb = cb;
                return this;
            },
            error(cb){
                this.errorCb = cb;
                return this;
            },
            success(cb){
                this.successCb = cb;
                return this;
            },
            end(cb){
                if (!this.url) {
                    console.error('request need a url!');
                    return this;
                }

                // ajax结束回调函数
                let endCb = (err, res)=> {
                    if (err || !res.ok) {
                        if (this.errorCb) {
                            this.errorCb(err, res);
                        } else {
                            message.error(this.errorMsg || res.body && res.body.message || '未知系统错误', 1);
                        }
                    } else {
                        if (res.type === 'text/html') {
                            console.error('The url maybe invalid!');
                        } else {
                            let result;
                            let results;
                            if (res.body) {
                                results = res.body.results;
                                result = res.body.result;
                            }
                            this.successCb && this.successCb(result || results || res.body || res, res);
                        }
                    }
                    if (!this.withNoLoading) {
                        _this.endLoading();
                    }

                    //所有处理完成之后的操作
                    cb && cb(err, res);
                };

                //ajax开始之前的一些自定义操作
                this.startCb && this.startCb();

                if (!this.withNoLoading) {
                    _this.startLoading();
                }

                if (this.type === 'get') {
                    request
                        .get(this.url, this.withNoMchId)
                        .query(this.paramsData)
                        .end(endCb);
                } else if(this.type === 'put') {
                    request
                        .put(this.url, this.withNoMchId)
                        .query(this.paramsData)
                        .end(endCb);
                }else if(this.type === 'delete') {
                    request
                        .delete(this.url, this.withNoMchId)
                        .query(this.paramsData)
                        .end(endCb);
                }else {
                    request
                        .post(this.url, this.withNoMchId)
                        .query(this.paramsData)
                        .end(endCb);
                }

                return this;
            },
        }
    };
}

export default BaseComponent;
