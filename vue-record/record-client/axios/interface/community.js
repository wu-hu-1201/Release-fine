import axios from '../api'

const getRecords = data => {
    return axios({
        url: '/home/community',
        method: 'post',
        data
    })
}

// const  getInfo = data => {
//     return axios({
//         url: '/info',
//         method: 'post',
//         data
//     })
// }

export default {
    getRecords,
    // getInfo
}