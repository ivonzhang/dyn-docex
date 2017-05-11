<template>
	<div>
		<div class="foot">
			<div class="foot_reply" v-show="isShowReplyBtn" @click="showReplyPage">回复</div>
			<div class="foot_complete" v-show="isShowFinish" @click="showFinish">完成</div>
			<div class="foot_end" v-show="isShowEnd" @click="showEnd">结束</div>
		    <div v-for="operation in docexOperations" v-show="operation.url != 'reply'">{{operation.name}}</div>
		</div>
		<custom-alert-with-two-operation :config="showConfig"></custom-alert-with-two-operation>
		<custom-alert :customConfig="showConfig2"></custom-alert>
	</div>
</template>

<script type="text/javascript">

	import customAlertWithTwoOperation from './customAlertWithTwoOperation.vue'
	import {mapActions, mapGetters} from 'vuex'
	import customAlert from './customAlert.vue'

	export default{

		data() {
			return {
				showConfig: {
					isShow: false,
					title: '是否确认完成事项',
					ok: this.finishDetail
				},
				showConfig2: {
					showAlert: false,
					title: this.customTitle,
					closeTips: "确定",
					ok: this.afterFinish
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

			/**
			 * 是否展示完成操作按钮
			 * @return {Boolean} [description]
			 */
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

			customTitle(){
				if(!this.docexFinishStatus) {
					return "提示"
				}else{
					return this.docexFinishStatus
				}
			},

			...mapGetters(['docexdetailOperations', 'detailDocexdetailVO', 'indexListType', 'docexFinishStatus', 'docexEndStatus'])

		},

		methods:{
			showReplyPage(){
				this.$store.dispatch('setIsShowReplyPage', true)
			},

			/**
			 * 是否弹出完成操作的确认提示框
			 * @return {[type]} [description]
			 */
			showFinish() {
				this.showConfig.isShow = true;
			},

			/**
			 * 执行完成操作，修改store中相应的状态
			 * @return {[type]} [description]
			 */
			finishDetail(){
				var vm = this
				const docexId = this.detailDocexdetailVO.id
				this.$store.dispatch('detailFinish', docexId).then(function(){
					// vm.showConfig.isShow = false
					// 此处监听store中docexFinishStatus的变化 从而确定弹出框的标题提示信息
					vm.$watch('docexFinishStatus', function (newVal, oldVal) {
					  if(newVal !== oldVal){
					  	vm.showConfig2.showAlert = true
						vm.showConfig2.title = vm.docexFinishStatus
					  }
					})
					vm.showConfig2.ok = vm.afterFinish
				})
			},

			/**
			 * 定义finish方法完成后的提示操作
			 * @return {[type]} [description]
			 */
			afterFinish(){
				window.history.back()
				window.location.reload()
			},

			/**
			 * 是否弹出结束操作提示框
			 * @return {[type]} [description]
			 */
			showEnd() {
				this.showConfig.title = '是否确认结束事项'
				this.showConfig.ok = this.endDetail
				this.showConfig.isShow = true
			},

			/**
			 * 执行结束操作，修改store中相应的状态
			 * @return {[type]} [description]
			 */
			endDetail() {
				console.log("endDetail")
				var vm = this
				const docexId = this.detailDocexdetailVO.id
				this.$store.dispatch('detailEnd', docexId).then(function() {
					vm.$watch('docexEndStatus', function (newVal, oldVal) {
					  if(newVal !== oldVal){
					  	vm.showConfig2.showAlert = true
						vm.showConfig2.title = vm.docexEndStatus
					  }
					})
					vm.showConfig2.ok = vm.afterFinish
				})
			}

		},

		components: {
			customAlertWithTwoOperation,
			customAlert
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