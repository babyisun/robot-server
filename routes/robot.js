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
        url,
        key,
        user
    } = req.body;
    var post_data = {
        "msgtype": "markdown",
        "markdown": {
            "content": `Bug反馈<font color=\"warning\">132个</font>，请相关同事注意。\n
>自测:<font color=\"info\">1例</font> \n >QA反馈:<font color=\"comment\">15例</font> \n
[本消息来自小机机](http://127.0.0.1:3000)`,
            // "content": "发送测试：" + moment().format('YYYY-MM-DD HH:mm:ss'),
            // "mentioned_list": ["wangqing", "@all"],
        }
    };
    // res.json(json({
    //     key,
    //     user,
    //     a: 123
    // }));
    ajax.post(url, post_data).then((data) => {
        res.json(json(data));
    }).catch(next);

});

// 发送消息
router.get('/doit', function (req, res, next) {
    res.json(json({
        a: 123
    }));
});

module.exports = router;