<template>
	<div>
		<div class="aui-tab" style="position: fixed; top: 0;z-index: 12;">
			    <ul class="aui-tab-nav">
			        <li class="tab_read actived">已读（1）</li>
			        <li class="tab_unread">未读（0）</li>
			    </ul>
			</div>
			<div style="height:45px;width:100%"></div>
			<div id="wrapper" ref="readWrapper">
			    <ul>
				   <li class="aui-list-view-cell" v-for="i in sum">
				       <img class="aui-col-xs-2" :src="userImgSrc" style="width: 3.0rem; height: 3.0rem; border-radius: 50%;">
				           <div class="aui-col-xs-7">
				               <h4 style="height: 3.0rem;line-height: 3.0rem;margin-left: 0.5rem;">
				                   张发
				               </h4>
				           </div>
				           <div class="aui-col-xs-3">
				               <p class="aui-text-right font_title_other1" style="height: 3.0rem;line-height: 3.0rem;">
				                   2017-01-19 10:23
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


	export default{

		data () {
			return {
				sum: 10
			}
		},

		computed: {
			/*用户头像的url*/
			userImgSrc(){
				return api.serverInfo.domain + '/plugins/dyn/dyn.do?method=file&className=cn.firstsoft.firstframe.plugins.dyn.docex.service.DocexService&methodName=loadPhoto&params=3';
			},
		},

		created() {


			var myAxios = axios.create({
			  baseURL: `${api.serverInfo.domain}/plugins/dyn/dyn.do?timestamp=1493361646241`,
			  headers:{
		        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		    },
			  data:{
	          method:'ajax',
	          lastName:'cn.firstsoft.firstframe.plugins.dyn.docex.service.DocexService',
	          methodName: 'getDocexFileReaderListByPageToKOA',
	      },
	      withCredentials: true
			})

			myAxios.post('', {
		    params: '3,15,0,12,0'
		  })
		  .then(function (response) {
		    console.log(response);
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