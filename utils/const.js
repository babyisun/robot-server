export const ERROR = {
    NO: {
        SUCCESS: 0,
        NO_LOGIN: 40,
        ERROR: 50,
    },
    MSG: {
        SUCCESS: '成功',
        NO_LOGIN: '没有登录',
        ERROR: '操作失败',
    }
};

// 账号状态
export const USER_STATUS = {
    DEFINE: {
        ON: 1,
        OFF: 0,
    },
    DATA: {
        1: '启用',
        0: '禁用',
    },
    COLOR: {
        1: 'green',
        0: 'red',
    },
};

// 角色
export const ROLE = {
    ADMIN: 'Admin',
    NORMAL: 'Normal',
};

// 数据状态
export const STATUS = {
    DEFINE: {
        DELETE: -1, // 删除,
        OFF: 0, // 禁用
        ON: 1, // 正常
    },
    DATA: {
        [-1]: '删除',
        0: '禁用',
        1: '正常',
    },
    COLOR: {
        0: 'red',
        1: 'green',
    },
};

// module.exports = {
//     ERRNO,
//     ERRMSG
// };