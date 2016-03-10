export default[
    {
        path: '/shop/test/require', getComponent: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./testrequire/TestRequire.jsx'));
        })
    }
    },
    {
        path: '/system/mail/unread', getComponent: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./mail/UnReadMail'));
        })
    }
    },
    {
        path: '/system/mail/read', getComponent: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./mail/ReadMail'));
        })
    }
    },
    {
        path: '/system/remind', getComponent: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./remind/Remind'));
        })
    }
    },
    {
        path: '/system/profile/message', getComponent: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./profile/ProfileMessage'));
        })
    }
    },
    {
        path: '/system/profile/password', getComponent: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./profile/ProfilePassWord'));
        })
    }
    },

    {
        path: '/shop/MyForm', getComponent: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./myform/MyForm'));
        })
    }
    },
    {
        path: '/shop/Dashboard', getComponent: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./dashboard/Dashboard'));
        })
    }
    },
    {
        path: '/shop/MyTime', getComponent: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./mytime/MyTime'));
        })
    }
    },
    {
        path: '/shop/ValidationDemo', getComponent: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./validation-demo/ValidationDemo'));
        })
    }
    },

    {
        path: '/service/MyForm', getComponent: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./myform/MyForm'));
        })
    }
    },
    {
        path: '/service/Dashboard', getComponent: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./dashboard/Dashboard'));
        })
    }
    },
    {
        path: '/service/MyTime', getComponent: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./mytime/MyTime'));
        })
    }
    },
    {
        path: '/service/ValidationDemo', getComponent: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./validation-demo/ValidationDemo'));
        })
    }
    },

    {
        path: '/expressage/MyForm', getComponent: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./myform/MyForm'));
        })
    }
    },
    {
        path: '/expressage/Dashboard', getComponent: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./dashboard/Dashboard'));
        })
    }
    },
    {
        path: '/expressage/MyTime', getComponent: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./mytime/MyTime'));
        })
    }
    },
    {
        path: '/expressage/ValidationDemo', getComponent: (location, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./validation-demo/ValidationDemo'));
        })
    }
    }
]