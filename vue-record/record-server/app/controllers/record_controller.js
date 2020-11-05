const uuidv1 = require('uuid').v1
const Record_col = require('./../models/record')
const User_col = require('./../models/user')


// 获取所有发布消息
const getRecord = async (ctx, next) => {
    const req = ctx.request.body
    const records = await Record_col.find({
        status: req.status
    }, {_id: 0})
    
    if (records) {
        ctx.status = 200
        ctx.body = {
            code: 1,
            data: records
        }
    } else {
        ctx.status = 200
        ctx.body = {
            code: 0,
            msg: '获取失败'
        }
    }
}




// 发布
const publish = async (ctx, next) => {
    const uuid = uuidv1()
    let req = ctx.request.body
    ctx.status = 200
    

    if (!req.title || !req.words || !req.images) {
        ctx.body = {
            code: 0,
            msg: '请正确输入'
        }
        return
    }
    

    req.id = uuid
    const result = await Record_col.create(req)

    if (result) {
        ctx.body = {
            code: 1,
            msg: '发布成功'
        }
    } else {
        ctx.body = {
            code: 0,
            msg: '发布失败'
        }
    }
}

// 按种类获取发布信息
const getInfo = async (ctx, next) => {
    const req = ctx.request.body
    const info = await Record_col.find({
        target: req.target
    }, {_id: 0})

    if (info) {
        ctx.status = 200
        ctx.body = {
            code: 1,
            data: info
        }
    } else {
        ctx.status = 200
        ctx.body = {
            code: 0,
            msg: '获取失败'
        }
    }
}


const getPublish = async (ctx, next) => {
    const req = ctx.request.body
    const publishInfo = await Record_col.find({
        author: req.author
    }, {_id: 0})

    if (publishInfo) {
        ctx.status = 200
        ctx.body = {
            code: 1,
            data: publishInfo
        }
    } else {
        ctx.status = 200
        ctx.body = {
            code: 0,
            msg: '获取失败'
        }
    }
}


const getSearchSuggest = async (ctx, next) => {
    const req = ctx.request.body
    const suggest = await Record_col.find({
        title: {
            $regex:'.*' + req.title,
            $options: 'i'
        }
    }, {_id: 0})

    if (suggest) {
        ctx.status = 200
        ctx.body = {
            code: 1,
            data: suggest
        }
    } else {
        ctx.status = 200
        ctx.body = {
            code: 0,
            msg: '获取失败'
        }
    }
}

module.exports = {
    publish,
    getRecord,
    getPublish,
    getInfo,
    getSearchSuggest
}
