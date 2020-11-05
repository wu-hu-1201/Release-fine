// var express = require('express');
// var router = express.Router();
// var request = require('request'); 
// var githubConfig = {
//     // 客户ID
//     client_ID: '2d1ca78f779b24e7dfba',
//     // 客户密匙
//     client_Secret: 'ac22c4a3a992d69591b73a9a11ba4f64a8e427e0',
//     // 获取 access_token
//     // eg: https://github.com/login/oauth/access_token?client_id=7***************6&client_secret=4***************f&code=9dbc60118572de060db4&redirect_uri=http://manage.hgdqdev.cn/#/login
//     access_token_url: 'https://github.com/login/oauth/access_token',
//     // 获取用户信息
//     // eg: https://api.github.com/user?access_token=86664b010dbb841a86d4ecc38dfeb8ac673b9430&scope=&token_type=bearer
//     user_info_url: 'https://api.github.com/user?',
//     // 回调地址
//     redirect_uri: 'http://localhost:8080/login'
// }
// router.all('/api/github/user_info', function(req, res, next) {
//     var param = req.query || req.params; 
//     var code = param.code || '';
//     if (code == '') {
//         res.end(JSON.stringify({
//             msg: '请传入正确的参数',
//             status: 103
//         }));
//         return;
//     }
//     request({
//         url: githubConfig.access_token_url,
//         form: {
//             client_id: githubConfig.client_ID,
//             client_secret: githubConfig.client_Secret,
//             code: code,
//             redirect_uri: githubConfig.redirect_uri
//         }},
//         function(error, response, body){
//             if (!error && response.statusCode == 200) {
//                 var urlStr = githubConfig.user_info_url + body;
//                 request({
//                         url: urlStr,
//                         headers: {
//                             'User-Agent': 'zhuming3834'
//                         }
//                     },
//                     function(error, response, resbody){
//                         if (!error) {
//                             res.end(JSON.stringify({
//                                 msg: '获取成功',
//                                 status: 100,
//                                 data: JSON.parse(resbody)
//                             }));
//                         }else{
//                             res.end(JSON.stringify({
//                                 msg: '获取用户信息失败',
//                                 status: 102
//                             }));
//                         }
//                     }
//                 )
//             }else{
//                 res.end(JSON.stringify({
//                     msg: '获取用户信息失败',
//                     status: 101
//                 }));
//             }
//         }
//     )
// })