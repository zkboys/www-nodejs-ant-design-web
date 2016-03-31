/*
 *  本地存储封装，项目中其他地方不要直接使用localStorage和sessionStorage，统一使用封装。
 *  简化接口，字符串json转换。
 * */
export default {
    local: {
        get(key){
            let strValue = localStorage.getItem(key);
            return JSON.parse(strValue);
        },
        set(key, jsonValue){
            var strValue = JSON.stringify(jsonValue);
            localStorage.setItem(key, strValue)
        },
        remove(key){
            localStorage.removeItem(key);
        }
    },
    session: {
        get(key){
            let strValue = sessionStorage.getItem(key);
            return JSON.parse(strValue);
        },
        set(key, jsonValue){
            var strValue = JSON.stringify(jsonValue);
            sessionStorage.setItem(key, strValue)
        },
        remove(key){
            sessionStorage.removeItem(key);
        }
    }

}