<template>
	<div>
		<div class="title">
			<div class="title_div" id="title">{{headerInfo.title}}</div>
		</div>
		<div class="aui-flex-col aui-flex-center" style="background-color: #fff;">
			<div class="aui-flex-item-2 aui-flex-col aui-padded-0-5 aui-flex-middle">
				<img class="sender-img" :src="userImgSrc">
			</div>
			<div class="aui-flex-item-7 aui-row-5  aui-flex-middle">
				<p class="sender-name sub-font-color" style="font-size: 0.79em;">{{headerInfo.sender}}</p>
				<p class="createdate sub-font-color" style="font-size: 0.79em;">{{headerInfo.createdate}}</p>
			</div>
			<div class="aui-flex-item-3 aui-flex-row aui-flex-middle">
				<router-link :to="{ path: 'read', query: { sender: senderAndDetailId.sender, docexId: senderAndDetailId.docexId}}">
					<h4 id="read-history-btn" class="aui-text-center">阅读记录</h4>
				</router-link>
			</div>
		</div>
	</div>
</template>
<script>
	
	import api from '../api/api.js'
	import {mapGetters,mapActions} from 'vuex'

	
	export default{

		/*props:{
			docexDetailvo:{//从父组件传来 此处遵循驼峰写法
				type: Object,
				default: function () {
					return {}
				}
			}
		},*/
		created(){
			// console.log(this.docexDetailvo.title);
		},
		computed:{
			/*用户头像的url*/
			userImgSrc(){
				return api.serverInfo.domain + '/plugins/dyn/dyn.do?method=file&className=cn.firstsoft.firstframe.plugins.dyn.docex.service.DocexService&methodName=loadPhoto&params=' + this.detailDocexdetailVO.senderId;
			},
			/*详情页面头部信息：标题 发送者 */
			headerInfo(){
				return{
					title: this.detailDocexdetailVO.title,
					sender: this.detailDocexdetailVO.sender,
					createdate: this.detailDocexdetailVO.createdate,
				}
			},

			/*发送者用户id以及详情id*/
			senderAndDetailId(){
				return {
					sender: this.detailDocexdetailVO.senderId,
					docexId: this.detailDocexdetailVO.id
				}
			},

			...mapGetters(['detailDocexdetailVO'])

		}
	}

</script>

<style type="text/css" scoped>
	.title {
	    padding: 0.5rem;
	    background-color: #fff;
	    border: none;
	}
	.title .title_div {
	    word-break: break-all;
	    font-weight: bold;
	    font-size: 1.3em;
	}
	.sender-img{width:2.2rem; height: 2.2rem;border-radius: 50%;}
	#read-history-btn{color: #3cbaff;font-size: 0.85em;margin-top: 1.0rem;}
</style>