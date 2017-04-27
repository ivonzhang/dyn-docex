<template>
	<div>
		<router-link :to="{ path: 'detail', query: { id: docex.id, userId: '3', hasFlowShow: docex.hasFlowShow, status: docex.status, source: settingSource, type: indexListType}}">
			<div class="docex-item aui-flex-col aui-flex-center yunzhijia-click-active2">
				<div class="aui-flex-item-2 aui-flex-row aui-flex-middle" style="padding-bottom: 10px;">
					<img class="" :src="userImgSrc">
					<h4 class="aui-text-center ellipsis sub-font-color">{{docex.sender}}</h4>
				</div>
				<div class="aui-flex-item-10 aui-flex-middle aui-padded-10 aui-arrow-right" style="padding-top: 0;padding-right: 1.5rem;">
					<h3 class="ellipsis" :class="{'unreaded-docex-item' : isReaded}">{{docex.title}}</h3>
					<p class="status sub-font-color" v-text="setDocexStatusInfo"></p>
					<p class="aui-flex-row aui-flex-bottom font_title_other1 sub-font-color" style="line-height: 20px; margin-top: 0.25rem;">{{docex.createdate}}</p>
				</div>
			</div>
		</router-link>
	</div>
</template>

<script>
	import api from '../api/api';
	import {mapGetters} from 'vuex';

	export default{
		data(){
			return{
				
			}
		},
		props:{
			docex:{//从父组件传来的待办项
				type: Object,
				default: function () {
					return {}
				}
			}
		},
		computed:{
			/*用户头像的url*/
			userImgSrc(){
				return api.serverInfo.domain + '/plugins/dyn/dyn.do?method=file&className=cn.firstsoft.firstframe.plugins.dyn.docex.service.DocexService&methodName=loadPhoto&params=' + this.docex.senderId;
			},
			/*是否为已读*/
			isReaded(){
				const listType = this.$store.state.index.index.listType;
				return this.docex.isRead === 0 && listType === 'todo';
			},
			/*设置列表项目的状态描述*/
			setDocexStatusInfo(){
				const listType = this.$store.state.index.index.listType;
				var docexStatus = '进行中';
				if(listType === 'done'){
					if(this.docex.status == 3){
						docexStatus = '已结束';
					}else if(this.docex.status == 6){
						docexStatus = '发起人结束';
					}else{
						docexStatus = '进行中';
					}
				}else{
					docexStatus = '进行中';
				}
				return docexStatus
			},
			...mapGetters(['settingSource','indexListType'])
		},

		methods:{

		}
	}
</script>

<style>
	.docex-item {
	    width: 100%;
	    display: -webkit-box;
	    display: box;
	    padding-left: 5px;
	    padding-top: 10px;
	}
	.docex-item .aui-flex-item-2 {
	    -webkit-box-flex: 0;
	    box-flex: 0;
	}
	.docex-item .aui-flex-item-10 {
	    -webkit-box-flex: 1;
	    box-flex: 1;
	    border-bottom: 1px solid #dce1e8;
	    padding-right: 0;
	}
	
	.docex-item .aui-padded-10 {
	    padding-left: 0;
	    margin-left: 10px;
	}
	.docex-item div img {
	    border-radius: 50%;
	    width: 3.0rem;
	    height: 3.0rem;
	    display: block;
	    margin: 0 auto;
	}
	.docex-item div h4 {
	    font-size: 0.80rem;
	    line-height: 20px;
	}
	.unreaded-docex-item {
	    color: #3cbaff;
	}
	a{color: #3f3f3f;}
</style>