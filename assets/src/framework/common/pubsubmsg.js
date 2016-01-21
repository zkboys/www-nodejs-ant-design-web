/*========================================================
 * 发布订阅模式,带有消息队列 生产者消费者 性质
 * =======================================================*/
var pubsubmsg = {};
(function ($) {
    $.topics = {};
    $.unConsumedMsg = {};//key 对应主题，value对应消息数据
    /*
     * 发布或广播事件
     * topic：事件名称
     * args：回调函数参数
     */
    $.publish = function (topic, args) {
        /*
         * 消息统一放入消息队列当中。
         * 注意：为了后订阅的所有订阅者都能接受到消息，这个消息队列不会被清空，如果存在大量的后订阅情况，小心内存溢出。
         * */
        $.unConsumedMsg[topic] = args;
        if (!$.topics[topic])
            return false;
        for (let p in $.topics[topic]) {
            var func = $.topics[topic][p]['func'];
            var once = $.topics[topic][p]['once'];
            if (func) {
                func(args);
                if (once) {
                    delete ($.topics[topic][p]);
                }
            }

        }
        return this;
    };
    /*
     * 同subscribe,但是相应函数只触发一次
     * */
    $.subscribeOnce = function (topic, name, func) {
        if (arguments.length == 2) {
            func = name;
            name = new Date().getTime();//未指定name，使用时间戳，指定一个
        }
        return $._subscribe(topic, name, func, true, false);
    };
    /*
     * 同subscribeOnce,但是会消费历史消息
     * */
    $.subscribeOnceAcceptOldMsg = function (topic, name, func) {
        if (arguments.length == 2) {
            func = name;
            name = new Date().getTime();//未指定name，使用时间戳，指定一个
        }
        return $._subscribe(topic, name, func, true, true);
    };
    $.subscribeAcceptOldMsg = function (topic, name, func) {
        if (arguments.length == 2) {
            func = name;
            name = new Date().getTime();//未指定name，使用时间戳，指定一个
        }
        return $._subscribe(topic, name, func, false, true);
    };
    $.subscribe = function (topic, name, func) {
        if (arguments.length == 2) {
            func = name;
            name = new Date().getTime();//未指定name，使用时间戳，指定一个
        }
        return $._subscribe(topic, name, func, false, false);
    };
    /*
     * 通过事件名称、订阅者名称、回调函数订阅事件
     * topic：事件名
     * name: 订阅者名 可选 如果没指定那么，那么不能单独取消订阅，只能统一取消订阅。
     * func: 订阅事件（发布时触发）
     * once: 是否只触发一次func
     * acceptOldMsg:接受历史消息
     * 同一个事件，不同的订阅者可以单独取消自己的订阅
     */
    $._subscribe = function (topic, name, func, once, acceptOldMsg) {
        if (!$.topics[topic])
            $.topics[topic] = {};
        $.topics[topic][name] = {};
        $.topics[topic][name]['func'] = func;
        $.topics[topic][name]['once'] = once;
        if (acceptOldMsg) {
            // 对应topic下加入回调函数
            /*
             * 查询是否有未消费的相应消息，如果有，立即执行回调。
             * */
            if (topic in $.unConsumedMsg) {
                let data = $.unConsumedMsg[topic];
                func(data);
            }
        }
        return this;
    };
    $.unsubscribe = function (topic, name) {
        /*
         解绑取消订阅事件
         topic：事件名
         name: 订阅者名 可选 如果没指定那么，那么不能单独取消订阅，只能统一取消订阅。
         */
        if (!$.topics[topic])
            return false;
        if (!name) {
            //解绑所有 topic 事件
            delete($.topics[topic]);
        } else if ($.topics[topic][name]) {
            //解绑 topic 事件下的指定 name 订阅者
            delete($.topics[topic][name]);
        }
        return this;
    }
})(pubsubmsg);
export default pubsubmsg;
// 注册事件 订阅
//pubsubmsg.subscribe("confirm", "confirm1", function (data) {
//    alert("this is the confirm1");
//});
//pubsubmsg.subscribe("alert", "alert1", function (data) {
//    alert("this is the alert1 " + data);
//});
//pubsubmsg.subscribe("alert", 'alert2', function (data) {
//    alert("this is the alert2 " + data);
//});
//pubsubmsg.subscribe("alert", 'alert3', function (data) {
//    alert("this is the alert3 " + data);
//});
////订阅事件，但是不指定订阅者名称
//pubsubmsg.subscribe("alert", function (data) {
//    alert("this is the alert no name " + data);
//});
////发布消息
//pubsubmsg.publish("alert", "adsfadsf");
////取消订阅
//pubsubmsg.unsubscribe("alert", "alert3")
////发布消息，此时alert3这个订阅者就接收不到消息了。
//pubsubmsg.publish("alert", "adsfadsf");
////所有的订阅者全部取消订阅
//pubsubmsg.unsubscribe("alert");
////发布消息，这是alert3这个订阅者就接收不到消息了。
//pubsubmsg.publish("alert", "adsfadsf");


