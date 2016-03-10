webpackJsonp([0,13],{10:/*!*************************************!*\
  !*** ./src/framework/page/Page.jsx ***!
  \*************************************/
function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t};Object.defineProperty(e,"__esModule",{value:!0}),n(11);var a=n(1),s=r(a),o=n(9),u=n(13),l=n(21),c=n(18),h=n(14),p=r(h),d=n(16),f=r(d),m=s["default"].createClass({displayName:"Page",getInitialState:function(){return{pageHeader:"",showPageAnimate:p["default"].pageAnimate()}},getDefaultProps:function(){return{loading:!1,animConfig:[{opacity:[1,0],translateY:[0,50]},{opacity:[1,0],translateY:[0,-50]}]}},getPageHeaderDateByMenu:function(){for(var t=(0,c.getCurrentSidebarMenu)(),e=t?t.parentText:[],n=t?t.text:"",r=[],i=0;i<e.length;i++)r.push({text:e[i]});return r.push({text:n}),{title:n,breadcrumbItems:r}},setPageHeader:function(){var t="",e=null;if("auto"===this.props.header?e=this.getPageHeaderDateByMenu():"object"==i(this.props.header)&&(this.props.header.title||this.props.header.breadcrumbItems?(e={},"auto"===this.props.header.title?e.title=this.getPageHeaderDateByMenu().title:this.props.header.title?e.title=this.props.header.title:e.title=" ","auto"===this.props.header.breadcrumbItems?e.breadcrumbItems=this.getPageHeaderDateByMenu().breadcrumbItems:this.props.header.breadcrumbItems?e.breadcrumbItems=this.props.header.breadcrumbItems:e.breadcrumbItems=""):t=this.state.showPageAnimate?s["default"].createElement("div",{className:"admin-page-header"},s["default"].createElement(o.QueueAnim,{animConfig:this.props.animConfig},s["default"].createElement("div",{key:"queue-anim-item1"},this.props.header))):s["default"].createElement("div",{className:"admin-page-header"},this.props.header)),e){var n=(0,l.getCurrentHeaderMenu)(),r=[];n&&r.push(s["default"].createElement(o.Breadcrumb.Item,{key:"page-breadcrumb-item-home"},s["default"].createElement(u.Link,{to:n.path},n.text)));for(var a=e.breadcrumbItems,c=0;c<a.length;c++){var h=a[c],p="page-breadcrumb-item"+c;r.push(h.path?s["default"].createElement(o.Breadcrumb.Item,{key:p},s["default"].createElement(u.Link,{to:h.path},h.text)):s["default"].createElement(o.Breadcrumb.Item,{key:p},h.text))}var d="";e.breadcrumbItems&&(d=s["default"].createElement(o.Breadcrumb,null,r)),t=this.state.showPageAnimate?s["default"].createElement("div",{className:"admin-page-header"},s["default"].createElement(o.QueueAnim,{animConfig:this.props.animConfig},s["default"].createElement("div",{key:"queue-anim-item1"},s["default"].createElement("h1",{className:"admin-page-header-title"},e.title),d))):s["default"].createElement("div",{className:"admin-page-header"},s["default"].createElement("h1",{className:"admin-page-header-title"},e.title),d)}this.setState({pageHeader:t})},switchLoadingMessage:function(){this.props.loading?!this.hideLoading:this.hideLoading&&this.hideLoading()},componentWillUpdate:function(){this.switchLoadingMessage()},componentDidUpdate:function(){this.switchLoadingMessage()},componentWillMount:function(){},componentDidMount:function(){var t=this;f["default"].subscribeOnceAcceptOldMsg("set-header-breadcrumb",function(){t.setPageHeader()})},componentWillUnmount:function(){this.hideLoading&&this.hideLoading()},render:function(){var t=s["default"].createElement(o.Spin,{spining:this.props.loading},this.props.children);return this.state.showPageAnimate&&(t=s["default"].createElement(o.QueueAnim,{animConfig:this.props.animConfig,delay:100},s["default"].createElement("div",{key:"queue-anim-item1"},t))),s["default"].createElement("div",{className:"admin-page "},s["default"].createElement("div",{className:"admin-page-content"},s["default"].createElement("div",{className:"admin-page-content-inner"},this.state.pageHeader,t)))}});e["default"]=m,t.exports=e["default"]},11:/*!***************************************!*\
  !*** ./src/framework/page/style.less ***!
  \***************************************/
function(t,e){},57:/*!************************************!*\
  !*** ./~/superagent/lib/client.js ***!
  \************************************/
function(t,e,n){function r(){}function i(t){var e={}.toString.call(t);switch(e){case"[object File]":case"[object Blob]":case"[object FormData]":return!0;default:return!1}}function a(t){return t===Object(t)}function s(t){if(!a(t))return t;var e=[];for(var n in t)null!=t[n]&&o(e,n,t[n]);return e.join("&")}function o(t,e,n){return Array.isArray(n)?n.forEach(function(n){o(t,e,n)}):void t.push(encodeURIComponent(e)+"="+encodeURIComponent(n))}function u(t){for(var e,n,r={},i=t.split("&"),a=0,s=i.length;s>a;++a)n=i[a],e=n.split("="),r[decodeURIComponent(e[0])]=decodeURIComponent(e[1]);return r}function l(t){var e,n,r,i,a=t.split(/\r?\n/),s={};a.pop();for(var o=0,u=a.length;u>o;++o)n=a[o],e=n.indexOf(":"),r=n.slice(0,e).toLowerCase(),i=_(n.slice(e+1)),s[r]=i;return s}function c(t){return/[\/+]json\b/.test(t)}function h(t){return t.split(/ *; */).shift()}function p(t){return v(t.split(/ *; */),function(t,e){var n=e.split(/ *= */),r=n.shift(),i=n.shift();return r&&i&&(t[r]=i),t},{})}function d(t,e){e=e||{},this.req=t,this.xhr=this.req.xhr,this.text="HEAD"!=this.req.method&&(""===this.xhr.responseType||"text"===this.xhr.responseType)||"undefined"==typeof this.xhr.responseType?this.xhr.responseText:null,this.statusText=this.req.xhr.statusText,this.setStatusProperties(this.xhr.status),this.header=this.headers=l(this.xhr.getAllResponseHeaders()),this.header["content-type"]=this.xhr.getResponseHeader("content-type"),this.setHeaderProperties(this.header),this.body="HEAD"!=this.req.method?this.parseBody(this.text?this.text:this.xhr.response):null}function f(t,e){var n=this;b.call(this),this._query=this._query||[],this.method=t,this.url=e,this.header={},this._header={},this.on("end",function(){var t=null,e=null;try{e=new d(n)}catch(r){return t=new Error("Parser is unable to parse the response"),t.parse=!0,t.original=r,t.rawResponse=n.xhr&&n.xhr.responseText?n.xhr.responseText:null,n.callback(t)}if(n.emit("response",e),t)return n.callback(t,e);if(e.status>=200&&e.status<300)return n.callback(t,e);var i=new Error(e.statusText||"Unsuccessful HTTP response");i.original=t,i.response=e,i.status=e.status,n.callback(i,e)})}function m(t,e){return"function"==typeof e?new f("GET",t).end(e):1==arguments.length?new f("GET",t):new f(t,e)}function y(t,e){var n=m("DELETE",t);return e&&n.end(e),n}var g,b=n(58),v=n(59);g="undefined"!=typeof window?window:"undefined"!=typeof self?self:this,m.getXHR=function(){if(!(!g.XMLHttpRequest||g.location&&"file:"==g.location.protocol&&g.ActiveXObject))return new XMLHttpRequest;try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(t){}return!1};var _="".trim?function(t){return t.trim()}:function(t){return t.replace(/(^\s*|\s*$)/g,"")};m.serializeObject=s,m.parseString=u,m.types={html:"text/html",json:"application/json",xml:"application/xml",urlencoded:"application/x-www-form-urlencoded",form:"application/x-www-form-urlencoded","form-data":"application/x-www-form-urlencoded"},m.serialize={"application/x-www-form-urlencoded":s,"application/json":JSON.stringify},m.parse={"application/x-www-form-urlencoded":u,"application/json":JSON.parse},d.prototype.get=function(t){return this.header[t.toLowerCase()]},d.prototype.setHeaderProperties=function(t){var e=this.header["content-type"]||"";this.type=h(e);var n=p(e);for(var r in n)this[r]=n[r]},d.prototype.parseBody=function(t){var e=m.parse[this.type];return e&&t&&(t.length||t instanceof Object)?e(t):null},d.prototype.setStatusProperties=function(t){1223===t&&(t=204);var e=t/100|0;this.status=this.statusCode=t,this.statusType=e,this.info=1==e,this.ok=2==e,this.clientError=4==e,this.serverError=5==e,this.error=4==e||5==e?this.toError():!1,this.accepted=202==t,this.noContent=204==t,this.badRequest=400==t,this.unauthorized=401==t,this.notAcceptable=406==t,this.notFound=404==t,this.forbidden=403==t},d.prototype.toError=function(){var t=this.req,e=t.method,n=t.url,r="cannot "+e+" "+n+" ("+this.status+")",i=new Error(r);return i.status=this.status,i.method=e,i.url=n,i},m.Response=d,b(f.prototype),f.prototype.use=function(t){return t(this),this},f.prototype.timeout=function(t){return this._timeout=t,this},f.prototype.clearTimeout=function(){return this._timeout=0,clearTimeout(this._timer),this},f.prototype.abort=function(){return this.aborted?void 0:(this.aborted=!0,this.xhr.abort(),this.clearTimeout(),this.emit("abort"),this)},f.prototype.set=function(t,e){if(a(t)){for(var n in t)this.set(n,t[n]);return this}return this._header[t.toLowerCase()]=e,this.header[t]=e,this},f.prototype.unset=function(t){return delete this._header[t.toLowerCase()],delete this.header[t],this},f.prototype.getHeader=function(t){return this._header[t.toLowerCase()]},f.prototype.type=function(t){return this.set("Content-Type",m.types[t]||t),this},f.prototype.parse=function(t){return this._parser=t,this},f.prototype.accept=function(t){return this.set("Accept",m.types[t]||t),this},f.prototype.auth=function(t,e){var n=btoa(t+":"+e);return this.set("Authorization","Basic "+n),this},f.prototype.query=function(t){return"string"!=typeof t&&(t=s(t)),t&&this._query.push(t),this},f.prototype.field=function(t,e){return this._formData||(this._formData=new g.FormData),this._formData.append(t,e),this},f.prototype.attach=function(t,e,n){return this._formData||(this._formData=new g.FormData),this._formData.append(t,e,n),this},f.prototype.send=function(t){var e=a(t),n=this.getHeader("Content-Type");if(e&&a(this._data))for(var r in t)this._data[r]=t[r];else"string"==typeof t?(n||this.type("form"),n=this.getHeader("Content-Type"),"application/x-www-form-urlencoded"==n?this._data=this._data?this._data+"&"+t:t:this._data=(this._data||"")+t):this._data=t;return!e||i(t)?this:(n||this.type("json"),this)},f.prototype.callback=function(t,e){var n=this._callback;this.clearTimeout(),n(t,e)},f.prototype.crossDomainError=function(){var t=new Error("Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.");t.crossDomain=!0,t.status=this.status,t.method=this.method,t.url=this.url,this.callback(t)},f.prototype.timeoutError=function(){var t=this._timeout,e=new Error("timeout of "+t+"ms exceeded");e.timeout=t,this.callback(e)},f.prototype.withCredentials=function(){return this._withCredentials=!0,this},f.prototype.end=function(t){var e=this,n=this.xhr=m.getXHR(),a=this._query.join("&"),s=this._timeout,o=this._formData||this._data;this._callback=t||r,n.onreadystatechange=function(){if(4==n.readyState){var t;try{t=n.status}catch(r){t=0}if(0==t){if(e.timedout)return e.timeoutError();if(e.aborted)return;return e.crossDomainError()}e.emit("end")}};var u=function(t){t.total>0&&(t.percent=t.loaded/t.total*100),e.emit("progress",t)};this.hasListeners("progress")&&(n.onprogress=u);try{n.upload&&this.hasListeners("progress")&&(n.upload.onprogress=u)}catch(l){}if(s&&!this._timer&&(this._timer=setTimeout(function(){e.timedout=!0,e.abort()},s)),a&&(a=m.serializeObject(a),this.url+=~this.url.indexOf("?")?"&"+a:"?"+a),n.open(this.method,this.url,!0),this._withCredentials&&(n.withCredentials=!0),"GET"!=this.method&&"HEAD"!=this.method&&"string"!=typeof o&&!i(o)){var h=this.getHeader("Content-Type"),p=this._parser||m.serialize[h?h.split(";")[0]:""];!p&&c(h)&&(p=m.serialize["application/json"]),p&&(o=p(o))}for(var d in this.header)null!=this.header[d]&&n.setRequestHeader(d,this.header[d]);return this.emit("request",this),n.send("undefined"!=typeof o?o:null),this},f.prototype.then=function(t,e){return this.end(function(n,r){n?e(n):t(r)})},m.Request=f,m.get=function(t,e,n){var r=m("GET",t);return"function"==typeof e&&(n=e,e=null),e&&r.query(e),n&&r.end(n),r},m.head=function(t,e,n){var r=m("HEAD",t);return"function"==typeof e&&(n=e,e=null),e&&r.send(e),n&&r.end(n),r},m.del=y,m["delete"]=y,m.patch=function(t,e,n){var r=m("PATCH",t);return"function"==typeof e&&(n=e,e=null),e&&r.send(e),n&&r.end(n),r},m.post=function(t,e,n){var r=m("POST",t);return"function"==typeof e&&(n=e,e=null),e&&r.send(e),n&&r.end(n),r},m.put=function(t,e,n){var r=m("PUT",t);return"function"==typeof e&&(n=e,e=null),e&&r.send(e),n&&r.end(n),r},t.exports=m},58:/*!***************************************************!*\
  !*** ./~/superagent/~/component-emitter/index.js ***!
  \***************************************************/
function(t,e){function n(t){return t?r(t):void 0}function r(t){for(var e in n.prototype)t[e]=n.prototype[e];return t}t.exports=n,n.prototype.on=n.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks[t]=this._callbacks[t]||[]).push(e),this},n.prototype.once=function(t,e){function n(){r.off(t,n),e.apply(this,arguments)}var r=this;return this._callbacks=this._callbacks||{},n.fn=e,this.on(t,n),this},n.prototype.off=n.prototype.removeListener=n.prototype.removeAllListeners=n.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var n=this._callbacks[t];if(!n)return this;if(1==arguments.length)return delete this._callbacks[t],this;for(var r,i=0;i<n.length;i++)if(r=n[i],r===e||r.fn===e){n.splice(i,1);break}return this},n.prototype.emit=function(t){this._callbacks=this._callbacks||{};var e=[].slice.call(arguments,1),n=this._callbacks[t];if(n){n=n.slice(0);for(var r=0,i=n.length;i>r;++r)n[r].apply(this,e)}return this},n.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks[t]||[]},n.prototype.hasListeners=function(t){return!!this.listeners(t).length}},59:/*!**************************************************!*\
  !*** ./~/superagent/~/reduce-component/index.js ***!
  \**************************************************/
function(t,e){t.exports=function(t,e,n){for(var r=0,i=t.length,a=3==arguments.length?n:t[r++];i>r;)a=e.call(null,a,t[r],++r,t);return a}},91:/*!******************************************!*\
  !*** ./src/page/dashboard/Dashboard.jsx ***!
  \******************************************/
function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0}),n(459);var i=n(1),a=r(i),s=n(5),o=(r(s),n(9)),u=n(10),l=r(u),c=n(57),h=r(c),p={getInitialState:function(){return{loading:!1}},componentWillMount:function(){this.intervals=[]},setInterval:function(t){function e(){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(){this.intervals.push(setInterval.apply(null,arguments))}),componentWillUnmount:function(){this.intervals.map(clearInterval),this.req.abort()},get:function(t,e){var n=e.data,r=void 0===n?{}:n,i=e.end,a=void 0===i?function(){}:i,s=this;s.setState({loading:!0}),s.req=h["default"].get(t).query(r).end(function(t,e){a(t,e),s.setState({loading:!1})})}},d=a["default"].createClass({displayName:"Dashboard",getInitialState:function(){return{seconds:0,testAjax:"testAjax"}},getDefaultProps:function(){return{test:"I'm a test"}},propTypes:{test:a["default"].PropTypes.string},mixins:[p],statics:{customMethod:function(t){return"bar"===t}},componentWillMount:function(){},componentDidMount:function(){var t=this;t.get("/dashboard.json",{data:{query:"Manny",range:"1..5",order:"desc"},end:function(e,n){console.log("use superagent",n.body),t.setState({testAjax:n.body.name})}})},shouldComponentUpdate:function(t,e){return!0},componentWillUpdate:function(t,e){},componentDidUpdate:function(t,e){},componentWillUnmount:function(){},componentWillReceiveProps:function(t){},tick:function(){this.setState({seconds:this.state.seconds+1})},handleClick:function(){var t=this;t.get("/dashboard.json",{end:function(e,n){console.log(e,n),console.log(n.body),t.setState({testAjax:n.body.name})}})},render:function(){return a["default"].createElement(l["default"],{header:"auto",loading:this.state.loading},a["default"].createElement("div",{className:"dashboard"},a["default"].createElement(o.Button,{type:"primary",onClick:this.handleClick},"发起ajax请求"),a["default"].createElement(o.Button,null,"次按钮"),a["default"].createElement(o.Button,{type:"ghost"},"幽灵按钮"),a["default"].createElement(o.Button,{type:"dashed"},"虚线按钮"),a["default"].createElement("p",null,"npm run dev-server 运行一个静态文件服务器 并且打开默认浏览器！"),a["default"].createElement("p",null,"开发过程中，修改文件，浏览器会自动刷新，特别适合双屏/大屏开发！"),a["default"].createElement("p",null,"随着项目复杂度的增加，不知道会不会慢。目前的相应速度还是可以接受的。"),a["default"].createElement("p",null,this.props.test),a["default"].createElement("p",null,"React has been running for ",this.state.seconds," seconds."),a["default"].createElement("p",null,"ajax result: ",this.state.testAjax)))}});e["default"]=d,t.exports=e["default"]},459:/*!***************************************!*\
  !*** ./src/page/dashboard/style.less ***!
  \***************************************/
function(t,e){}});
//# sourceMappingURL=0.js.map