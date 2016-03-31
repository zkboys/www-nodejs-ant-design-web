/*
 * 这个文件是通过SimpleRoutesCfg.js生成出来的，不要直接编辑这个文件，路由相关配置写到SimpleRoutesCfg.js文件中
 * 由于SimpleRoutesCfg.js不在webpack watch范围内，修改SimpleRoutesCfg.js文件要手动执行一下 npm run generate-routes 来生成路由
 * npm run generate-routes 命令已经写入webpack.config.js，build之前会自动执行。
 */
export default[{

    path: '/shop/reddit', getComponent: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./reddit/Index.jsx'));
        })
    }
},{

    path: '/shop/todo', getComponent: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./todo/index.jsx'));
        })
    }
}, {
    path: '/shop/test/require', getComponent: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./testrequire/TestRequire.jsx'));
        })
    }
}, {
    path: '/system/mail/unread', getComponent: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./mail/UnReadMail'));
        })
    }
}, {
    path: '/system/mail/read', getComponent: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./mail/ReadMail'));
        })
    }
}, {
    path: '/system/remind', getComponent: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./remind/Remind'));
        })
    }
}, {
    path: '/system/profile/message', getComponent: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./profile/ProfileMessage'));
        })
    }
}, {
    path: '/system/profile/password', getComponent: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./profile/ProfilePassWord'));
        })
    }
}, {
    path: '/shop/MyForm', getComponent: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./myform/MyForm'));
        })
    }
}, {
    path: '/shop/Dashboard', getComponent: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./dashboard/Dashboard'));
        })
    }
}, {
    path: '/shop/MyTime', getComponent: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./mytime/MyTime'));
        })
    }
}, {
    path: '/shop/ValidationDemo', getComponent: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./validation-demo/ValidationDemo'));
        })
    }
}, {
    path: '/service/MyForm', getComponent: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./myform/MyForm'));
        })
    }
}, {
    path: '/service/Dashboard', getComponent: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./dashboard/Dashboard'));
        })
    }
}, {
    path: '/service/MyTime', getComponent: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./mytime/MyTime'));
        })
    }
}, {
    path: '/service/ValidationDemo', getComponent: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./validation-demo/ValidationDemo'));
        })
    }
}, {
    path: '/expressage/MyForm', getComponent: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./myform/MyForm'));
        })
    }
}, {
    path: '/expressage/Dashboard', getComponent: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./dashboard/Dashboard'));
        })
    }
}, {
    path: '/expressage/MyTime', getComponent: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./mytime/MyTime'));
        })
    }
}, {
    path: '/expressage/ValidationDemo', getComponent: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./validation-demo/ValidationDemo'));
        })
    }
}]