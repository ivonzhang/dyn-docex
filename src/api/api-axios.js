import axios from 'axios'
import api from './api'
import qs from 'qs'

const reqConfig = {
    className: 'cn.firstsoft.firstframe.plugins.dyn.docex.service.DocexService',
    method: 'ajax'
}
var myAxios = axios.create({
    baseURL: `${api.serverInfo.domain}/plugins/dyn/dyn.do`,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    params: {
        timestamp: Date.parse(new Date()) / 1000
    },
    // data: {},
    // withCredentials: true //设置跨域请求,后台设置了"Access-Control-Allow-Origin","*"就不用开启了
})

export default {

	/**
	 * 封装axios的post请求
	 * @param  {[type]}   req [description]
	 * @param  {Function} cb  [description]
	 * @return {[type]}       [description]
	 */
    post: async function(req, cb) {
        Object.assign(reqConfig, req)
        myAxios.post('', qs.stringify(reqConfig)).then(function(response) {
            console.log(response)
            if(response.data.success === 1) {
            	cb(response.data)
            }
        }).catch(function(error) {
            console.log(error);
        })
    },


    // readHistory: async() => {}
}