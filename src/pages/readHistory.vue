<template>
	<div>
		<div class="aui-tab" style="position: fixed; top: 0;z-index: 12;">
			    <ul class="aui-tab-nav">
			        <li class="tab_read actived">已读（{{count}}）</li>
			        <li class="tab_unread">未读（0）</li>
			    </ul>
			</div>
			<div style="height:45px;width:100%"></div>
			<div id="wrapper" ref="readWrapper">
			    <ul>
				   <li class="aui-list-view-cell" v-for="user in results">
				       <img class="aui-col-xs-2" :src="userImgSrc" style="width: 3.0rem; height: 3.0rem; border-radius: 50%;">
				           <div class="aui-col-xs-7">
				               <h4 style="height: 3.0rem;line-height: 3.0rem;margin-left: 0.5rem;" v-text="user.name"></h4>
				           </div>
				           <div class="aui-col-xs-3">
				               <p class="aui-text-right font_title_other1" style="height: 3.0rem;line-height: 3.0rem;" v-text="user.readdate">
				               </p>
				           </div>
				       </img>
				   </li>
			    </ul>
			  </div>
	</div>
	
</template>

<script type="text/javascript">
	import BScroll from 'better-scroll'
	import api from '../api/api'
	// import Vue from 'vue'
	import axios from 'axios'
	// Vue.prototype.$http = axios
	import qs from 'qs'


	export default{

		data () {
			return {
				uid: 2,
				docexId: 0,
				pageSize: 12,
				pageStart: 0,
				type: 1,
				results: []
			}
		},

		computed: {
			/*用户头像的url*/
			userImgSrc(){
				return `${api.serverInfo.domain}/plugins/dyn/dyn.do?method=file&className=cn.firstsoft.firstframe.plugins.dyn.docex.service.DocexService&methodName=loadPhoto&params=${this.uid}`;
			},

			count(){
				return this.results.length
			}
		},

		created() {
			const vm = this
			this.docexId = this.$route.query.docexId
			this.uid = this.$route.query.sender
			const params = [this.uid, this.docexId, this.pageStart, this.pageSize, this.type].join(",")
			
			/**
			 * [myAxios description]默认情况下axios serializes JavaScript objects to JSON，使用application/x-www-form-urlencoded来提交数据的时候，
			 * In a browser, you can use the URLSearchParams to format,或者使用
			 * var qs = require('qs')这个库来format
			 * @type {[type]}
			 */
			var myAxios = axios.create({
			  baseURL: `${api.serverInfo.domain}/plugins/dyn/dyn.do`,
			  headers:{
		        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		    },
		    params: {
          timestamp: Date.parse(new Date()) / 1000
        },
			  data: {},
	      // withCredentials: true //设置跨域请求,后台设置了"Access-Control-Allow-Origin","*"就不用开启了
			})

			myAxios.post('', qs.stringify({
        method:'ajax',
        className:'cn.firstsoft.firstframe.plugins.dyn.docex.service.DocexService',
        methodName: 'getDocexFileReaderListByPageToKOA',
		    params
		  }))
		  .then(function (response) {
		    console.log(response);
		    if(response.data.success === 1) {
		    	vm.results = response.data.result.docexFileReaderVOs
		    }else{
		    	alert("获取阅读记录失败")
		    }
		  })
		  .catch(function (error) {
		    console.log(error);
		  })

			// 用 $nextTick 來确保 Dom 加载完后再執行一些事情
			this.$nextTick( () => {
			  this._initScroll()
			} )

		},

		mounted() {
			/*let scroll = new BScroll(this.$refs.readWrapper,{
			   probeType: 3
			})

			scroll.on('scroll', (pos) => {
			  console.log(pos.x + '~' + posx.y)
			})*/
			
		},

		methods: {


			_initScroll() {
				if(!this.readScroll) {
					this.readScroll = new BScroll(this.$refs.readWrapper, {
					  click: true,
					  probeType: 3
					});
				} else {
					this.readScroll.refresh()
				}
        

        this.readScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
          console.log(this.scrollY)
        });

      },
		}
	}


</script>

<style type="text/css">
	.actived {
	    color: #3cbaff ! important;
	    border-bottom: 2px #3cbaff solid !important;
	}
</style>