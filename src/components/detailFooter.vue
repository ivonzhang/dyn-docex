<template>
	<div>
		<div class="foot">
			<div class="foot_reply" v-show="isShowReplyBtn" @click="showReplyPage">回复</div>
			<div class="foot_complete" v-show="isShowFinish" @click="showFinish">完成</div>
			<div class="foot_end" v-show="isShowEnd">结束</div>
		    <div v-for="operation in docexOperations" v-show="operation.url != 'reply'">{{operation.name}}</div>
		</div>
		<custom-alert-with-two-operation :config="showConfig" @finish=""></custom-alert-with-two-operation>
	</div>
</template>

<script type="text/javascript">
	import customAlertWithTwoOperation from './customAlertWithTwoOperation.vue'
	import {mapActions, mapGetters} from 'vuex'
	export default{

		data() {
			return {
				isShowOperationWin: false,
				showConfig: {
					isShow: false,
					title: '是否确认完成事项',
					ok: this.finishDetail
				}
			}
		},

		computed:{
			/*是否展示结束操作按钮*/
			isShowEnd(){
				const status = this.detailDocexdetailVO.status
				const type = this.indexListType
				if(status === 1 && type === 'myDraft'){
					return true
				}else{
					return false
				}
			},

			docexOperations(){
				var operationVOs = this.docexdetailOperations.operationVOs
				return operationVOs
			},

			isShowFinish() {
				const status = this.detailDocexdetailVO.status
				return !this.isShowEnd && status !== 3
			},

			/*是否展示回复意见操作按钮*/
			isShowReplyBtn(){
				const status = this.detailDocexdetailVO.status
				if(status !=3 && status != 6){
					return true
				}else{
					return false
				}
			},

			...mapGetters(['docexdetailOperations', 'detailDocexdetailVO', 'indexListType'])

		},

		methods:{
			showReplyPage(){
				this.$store.dispatch('setIsShowReplyPage', true)
			},

			/**/
			showFinish() {
				this.isShowOperationWin = ! this.isShowOperationWin
				this.showConfig.isShow = true;
			},

			finishDetail(){
				const docexId = this.detailDocexdetailVO.id
				this.$store.dispatch('detailFinish', docexId).then(function(){
					
				})
			}

		},

		components: {
			customAlertWithTwoOperation
		}
	}

</script>

<style type="text/css">
	div.foot, .reply_foot {
	    height: 3.0rem;
	    line-height: 3.0rem;
	    color: #9a9a9a;
	    width: 100%;
	    position: fixed;
	    bottom: 0;
	    left: 0;
	    z-index: 6;
	    background-color: #fff;
	    width: 100%;
	    display: -webkit-box;
	    display: box;
	}
	div.foot div, div.reply_foot div {
	    -webkit-box-flex: 1;
	    box-flex: 1;
	    text-align: center;
	}
	div.foot div:first-child:before, div.reply_foot div:first-child:before {
	    content: '';
	}
	div.foot div:before, div.reply_foot div:before {
	    content: '|';
	    float: left;
	    opacity: 0.2;
	}
</style>