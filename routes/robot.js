'use strict';
const router = require('express').Router();
const moment = require('moment');
const {
    ajax,
    json
} = require('../utils/ajax');

// 发送消息
router.post('/', function (req, res, next) {
    var {
        key,
        user
    } = req.body;
    // var post_data = {
    //     "msgtype": "text",
    //     "text": {
    //         "content": "发送测试：" + moment().format('YYYY-MM-DD HH:mm:ss'),
    //         // "mentioned_list": ["wangqing", "@all"],
    //     }
    // };
    res.json(json({
        key,
        user,
        a: 123
    }));
    // ajax.post("/cgi-bin/webhook/send?key=7ced3ef6-aea1-48de-a49b-817bc2a44bad", post_data).then(function (data) {
    //     res.json(data);
    // }).catch(next);

});

module.exports = router;