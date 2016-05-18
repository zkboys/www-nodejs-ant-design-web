import menus from '../menus';

let headMenus = menus.filter((menu)=> {
    return !menu.parentKey;
});
headMenus.forEach((headMenu)=> {
    headMenu.path = getFirstPath(headMenu) || '/';

});

function getFirstPath(node) {
    if (node.path) return node.path;
    let firstChild;
    for (let i = 0; i < menus.length; i++) {
        let menu = menus[i];
        if (menu.parentKey === node.key) {
            firstChild = menu;
            break;
        }
    }
    if (firstChild) {
        return firstChild.path || getFirstPath(firstChild)
    } else {
        return undefined;
    }
}
export default headMenus;