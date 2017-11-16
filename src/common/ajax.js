/**
 * Created by lichun on 2017/5/10.
 */
import axios from 'axios'

const options = {}
if (process.env.NODE_ENV === 'production') {
    if (window.location.protocol === 'http:') {
        options.baseURL = window.location.protocol + '//crazybet.choopaoo.com:6899'
    } else {
        options.baseURL = window.location.protocol + '//crazybet.choopaoo.com:46899'
    }
} else if (process.env.NODE_ENV === 'preRelease') {
    // options.baseURL = 'http://crazybet.choopaoo.com:8090'
    options.baseURL = 'http://crazybet.choopaoo.com:8090'
} else {
    options.baseURL = '/api'
}
const _axios = axios.create(options)

const ajax = function (url, config) {
    return _axios.get(url, config).then((response) => {
        if (response.status === 200) {
            return response.data
        } else {
            throw new Error(response.message)
        }
    }).then(resp => {
        if (resp.status === '100') {
            return resp.data
        } else {
            const error = new Error(resp.message)
            error.code = resp.status
            throw error
        }
    })
}
ajax.get = function (url, config) {
    return _axios.get(url, config).then((response) => {
        if (response.status === 200) {
            return response.data
        } else {
            throw new Error(response.message)
        }
    }).then(resp => {
        if (resp.status === '100') {
            return resp.data
        } else {
            const error = new Error(resp.message)
            error.code = resp.status
            throw error
        }
    })
}
ajax.post = function (url, param, config) {
    return _axios.post(url, param, config).then((response) => {
        if (response.status === 200) {
            return response.data
        } else {
            throw new Error(response.message)
        }
    }).then(resp => {
        if (resp.status === '100') {
            return resp.data
        } else {
            const error = new Error(resp.message)
            error.code = resp.status
            throw error
        }
    })
}
export default ajax
