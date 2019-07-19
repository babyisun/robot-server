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
      1: '启用',
    },
    COLOR: {
      0: 'red',
      1: 'green',
    },
    BTN:{
      0: '启用',
      1: '禁用',
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
  
  // 支付方式
  export const PAY_METHOD = {
    DEFINE: {
      UNDERLINE: 0,
      WECHAT: 1,
      ALIPAY: 2,
    },
    DATA: {
      0: '线下支付',
      1: '微信支付',
      2: '支付宝支付',
    },
  };
  
  // 性别
  export const GENDER = {
    DEFINE: {
      UNKNOW: 0,
      MALE: 1,
      FEMALE: 2,
    },
    DATA: {
      1: 'male',
      2: 'female',
    },
    TIP: {
      1: '男',
      2: '女',
    },
    COLOR: {
      1: '#6ab0e8',
      2: '#ff36c2',
    },
  };
  
  // 消息类型
  export const MSG_TYPE = {
    DEFINE: {
      TEXT: 1,
      MARKDOWN: 2,
      IMAGE: 3,
      NEWS: 4,
    },
    DATA: {
      1: '文本消息',
      2: '富文本消息',
      3: '图片',
      4: '新闻',
    },
  };