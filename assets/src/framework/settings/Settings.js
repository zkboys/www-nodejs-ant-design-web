import storage from '../../common/storage'
export default {
    pageAnimate(value){
        return getSetValue('showPageAnimate', value, true);
    },
    collapseSidebar(value){
        return getSetValue('collapseBar', value, true);
    },
    sidebarMenuAlwaysOpen(value){
        return getSetValue('sidebarMenuAlwaysOpen', value, false);
    },
    themeColors(value){
        let defaultColors = {
            logoBackground:'',
            logoColor:'',
            header:{r:243, g:156, b:18,a:1},
            headerMenu:{r:102, g:102, b:102, a:1},
            headerMenuActive:{r:255, g:255, b:255, a:1},
            headerButton:'',
            headerButtonActive:'',
            sidebar:'',
            sidebarMenu:'',
            sidebarMenuActive:'',
            sidebarMenuHover:''
        };
        return getSetValue('themeColors', value, defaultColors);
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