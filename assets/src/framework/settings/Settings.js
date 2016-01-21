import storage from './../common/storage'
export default {
    pageAnimate(value){
        return getSetValue('showPageAnimate', value, true);
    },
    collapseSidebar(value){
        return getSetValue('collapseBar', value, true);
    },
    sidebarMenuAlwaysOpen(value){
        return getSetValue('sidebarMenuAlwaysOpen', value, false);
    }
}
function getSetValue(key, value, defaultValue) {
    if (value === undefined) {
        let result = storage.local.get(key);
        return result == null ? defaultValue : result;
    } else {
        storage.local.set(key, value);
    }
}