import menus from '../menus';

let headMenus = menus.filter((menu)=> {
    return !menu.parentKey;
});
export default headMenus;