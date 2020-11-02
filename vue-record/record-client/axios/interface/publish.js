import axios from '../api'

const publish = data => {
    return axios({
        url: '/home/publish',
        method: 'post',
        data
    })
}

export default {
    publish
}