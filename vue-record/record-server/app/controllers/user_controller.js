const User_col = require('../models/user')
const Password_col = require('../models/password')
const passport = require('../utils/passport')
const uuidv1 = require('uuid').v1
const config = require('../../config')

// 连接访问测试
const get = async (ctx, next) => {
    ctx.status = 200;
    ctx.body = {
        msg: 'get request!',
        data: {
            data: 'hello world'
        }
    }
}


// 登录
const login = async (ctx, next) => {
    const req = ctx.request.body

    // 获取用户userId
    const user = await User_col.findOne({  // 在User_col查找一条数据
        account: req.account
    }, {
        __v: 0,
        _id: 0
    })
    if (!user) {
        ctx.status = 200;
        ctx.body = {
            code: 0,
            msg: '账号不存在'
        }
        return;
    }
    const userId = user.userId


    // 获取数据库中的hash（加密过的密码）
    const pass = await Password_col.findOne({
        userId
    }, {
        hash: 1
    })
    const match = await passport.validate(req.password, pass.hash)
    if (match) {
        ctx.body = {
            code: 1,
            msg: '登录成功',
            data: user  // 将用户返回
        }
        return
    }
    ctx.body = {
        code: 0,
        msg: '密码错误'
    }
}

const getLogin = async (ctx, next) => {
    var express = require('express');
    var router = express.Router();
    var request = require('request');
    var githubConfig = {
        // 客户ID
        client_ID: '2d1ca78f779b24e7dfba',
        // 客户密匙
        client_Secret: '4e2c20991c888f41bcff7516f635b39556b4fa30',
        // 获取 access_token
        // eg: https://github.com/login/oauth/access_token?client_id=7***************6&client_secret=4***************f&code=9dbc60118572de060db4&redirect_uri=http://manage.hgdqdev.cn/#/login
        access_token_url: 'https://github.com/login/oauth/access_token',
        // 获取用户信息
        // eg: https://api.github.com/user?access_token=86664b010dbb841a86d4ecc38dfeb8ac673b9430&scope=&token_type=bearer
        user_info_url: 'https://api.github.com/user?',
        // 回调地址
        redirect_uri: 'http://localhost:8080/home/community'
    }
    router.all('/api/github/user_info', function (req, res, next) {
        var param = req.query || req.params;
        var code = param.code || '';
        if (code == '') {
            res.end(JSON.stringify({
                msg: '请传入正确的参数',
                status: 103
            }));
            return;
        }
        request({
            url: githubConfig.access_token_url,
            form: {
                client_id: githubConfig.client_ID,
                client_secret: githubConfig.client_Secret,
                code: code,
                redirect_uri: githubConfig.redirect_uri
            }
        },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var urlStr = githubConfig.user_info_url + body;
                    request({
                        url: urlStr,
                        headers: {
                            'User-Agent': 'zhuming3834'
                        }
                    },
                        function (error, response, resbody) {
                            if (!error) {
                                res.end(JSON.stringify({
                                    msg: '获取成功',
                                    status: 100,
                                    data: JSON.parse(resbody)
                                }));
                            } else {
                                res.end(JSON.stringify({
                                    msg: '获取用户信息失败',
                                    status: 102
                                }));
                            }
                        }
                    )
                } else {
                    res.end(JSON.stringify({
                        msg: '获取用户信息失败',
                        status: 101
                    }));
                }
            }
        )
    })
}


// 注册
const register = async (ctx, next) => {
    // 判断当前账号是否可注册
    const req = ctx.request.body
    // 获取当前用户的userId
    const user = await User_col.findOne({
        account: req.account
    }, {
        __v: 0,
        _id: 0
    })
    ctx.status = 200;
    if (user) {
        ctx.body = {
            code: 0,
            msg: '该用户已存在'
        }
        return
    }
    // 插入用户
    const userId = uuidv1()
    const newUser = await User_col.create({
        userId,
        account: req.account
    })
    if (newUser) {
        //加密
        const hash = await passport.encrypt(req.password, config.saltTimes)
        const newPassword = await Password_col.create({
            userId,
            hash
        })
        if (newPassword) {
            ctx.body = {
                code: 1,
                msg: '注册成功',
                data: {
                    userId: newUser.userId,
                    account: newUser.account
                }
            }
        } else {
            ctx.body = {
                code: 0,
                msg: '注册失败'
            }
        }
    }
}

// 修改资料
const release = async (ctx, next) => {
    let req = ctx.request.body

    // 获取此时用户 userId
    const result = await User_col.updateOne({
        userId: req.userId
    }, req)
    ctx.status = 200


    if (result) {
        ctx.body = {
            code: 1,
            msg: '修改成功',
            // data: {
            //     userId: result.userId,
            //    userName: result.userName,
            //    signature: result.signature,
            //    headerImg: result.headerImg[0].content
            // }
        }
    } else {
        ctx.body = {
            code: 0,
            msg: '修改失败'
        }
    }


}

module.exports = {
    get,
    login,
    register,
    release,
    getLogin
}