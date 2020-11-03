import axios from '../api'

const getRecords = data => {
    return axios({
        url: '/home/community',
        method: 'post',
        data
    })
}

const  getInfo = data => {
    return axios({
        url: '/info',
        method: 'post',
        data
    })
}

const getPublish = data => {
    return axios({
        url: '/mine',
        method: 'post',
        data
    })
}


const getSearchSuggest = data => {
    return axios({
        url: '/home/search',
        method: 'post',
        data
    })
}

export default {
    getRecords,
    getPublish,
    getInfo,
    getSearchSuggest
}