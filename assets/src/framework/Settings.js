import storage from './common/storage'
export default {
    pageAnimate(value){
        if (value==undefined) {
            let result = storage.local.get('showPageAnimate');
            return result == null ? true : result;
        } else {
            storage.local.set('showPageAnimate', value);
        }
    },
    collapseSidebar(value){
        if (value==undefined) {
            let result = storage.local.get('collapseBar');
            return result == null ? true : result;
        } else {
            storage.local.set('collapseBar', value);
        }
    }
}
