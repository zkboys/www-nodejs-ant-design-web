/*
 * 后台请求封装，有可能是fetch 或者 super agent
 * */
import Request from 'superagent';
import Cookie from './Cookie'
export default {
    get(params){
        let r;
        let p = new Promise(function (resolve, reject) {
            r = Request
                .get(params.url)
                .send(params.data)
                .set('Accept', 'application/json')
                .end((error, res) => {
                    error ? reject(error) : resolve(res);
                });
        });
        p.abort = function () {
            r.abort();
        };
        return p;
    },
    post(params){
        //TODO:_csrf
        //Cookie.getCookie();
        return new Promise(function (resolve, reject) {
            let r = Request
                .post(params.url)
                .send(params.data)
                .set('Accept', 'application/json')
                .end((error, res) => {
                    error ? reject(error) : resolve(res);
                });
            this.abort = function () {
                r.abort();
            };
        });
    }

}
