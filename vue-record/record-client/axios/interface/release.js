import axios from '../api'

const release = data => {
    return axios({
        url: '/home/mine',
        method: 'post',
        data
    })
}

export default {
    release
}