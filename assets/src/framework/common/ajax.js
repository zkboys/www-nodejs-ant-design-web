/*
 * 后台请求封装，有可能是fetch 或者 super agent
 * */
import Request from 'superagent';
import Cookie from './Cookie'
export default {
    get(options){
        let defaultOptions = {
            before(){
            },
            error(error){
                throw error;
            },
            success(res){
                throw Error('success callback is required!');
            },
            complete(error, res){

            }
        };
        options = Object.assign({}, defaultOptions, options);
        if (options.before()===false) {
            return false;
        }
        return Request
            .get(options.url)
            .send(options.data)
            .set('Accept', 'application/json')
            .end((error, res) => {
                error ? options.error(error) : options.success(res);
                options.complete(error, res);
            });
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
