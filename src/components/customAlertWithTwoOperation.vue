<template>
	<div>
		<div v-show="config.isShow">
			<div id="bg" style="display: block;"></div>
			<div class="myAlert" style="display: block;">
			 	<div class="alert_title" v-text="config.title"></div>
			 	<div class="opration_div">
					<div class="cancle" @click="cancle">取消</div>
					<div class="confirm" @click="finish">确认</div>
				</div>
			</div>
		</div>
		<custom-alert :customConfig="showConfig"></custom-alert>
	</div>
</template>

<script type="text/javascript">
	
	import {mapActions,mapGetters} from 'vuex'
	import customAlert from './customAlert.vue'

	export default {
		data() {
			return {
				isShowOperationWin: false,
				showConfig: {
					showAlert: false,
					title: this.customTitle,
					closeTips: "确定",
					ok: this.afterFinish
				}
			}
		},

		props: {
			config: {
				type: Object,
				default: {
					isShow: false,
					title: '提示',
					ok: function(){
						alert("确定操作未定义")
					}
				}
			}
		},

		computed: {
			customTitle(){
				if(!this.docexFinishStatus) {
					return "提示"
				}else{
					return this.docexFinishStatus
				}
			},
			...mapGetters(['docexFinishStatus'])
		},

		methods: {
			/**
			 * 定义确定按钮的操作
			 * @return {[type]} [description]
			 */
			finish() {
				var vm = this
				this.config.ok()
				setTimeout(function(){
					vm.config.isShow = false
					vm.showConfig.showAlert = true
					vm.showConfig.title = vm.docexFinishStatus
					vm.showConfig.ok = vm.afterFinish
				},300)
				console.log(vm.docexFinishStatus)

			},
			/**
			 * 定义取消按钮的操作
			 * @return {[type]} [description]
			 */
			cancle(){
				this.config.isShow = false
			},

			/**
			 * 定义finish方法完成后的提示操作
			 * @return {[type]} [description]
			 */
			afterFinish(){
				window.history.back()
				window.location.reload()
			},

		},

		components: {
			customAlert
		}
	}
</script>

<style type="text/css" scoped>
	/*遮罩*/
	#bg{ display: none;  position: fixed;  top: 0%;  left: 0%;  width: 100%;  height: 100%;  background-color: black;  z-index:1001;  -moz-opacity: 0.3;  opacity:.30;  filter: alpha(opacity=30);}
	/*自定义提示窗口: 单个按钮*/
	div.customAlert {display: none;  position: fixed;  top: 35%;  left: 10%;  width: 80%;    padding: 1px;  border: 1px solid #E8E9F7;  background-color: white;  z-index:1002;  overflow: auto; border-radius: 0.3rem;}
	div.custom_alert_title{
		height:auto!important;
		min-height:80px;
		line-height: 1.5;
		text-align: center;
		padding:20px;
		border-bottom: 1px solid #dddddd;
		
		white-space: pre-wrap; /* css-3 */
		white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
		white-space: -pre-wrap; /* Opera 4-6 */
		white-space: -o-pre-wrap; /* Opera 7 */
		word-wrap: break-word; /* Internet Explorer 5.5+ */
		word-break:break-all;
	}
	div.custom_confirm_div{
		height: 40px;
		line-height: 40px;
		text-align: center;
		color: #3cbaff;
	}
	div.custom_confirm_div:active{box-shadow: inset 0 0 1000px rgba(0, 0, 0, 0.2);-webkit-box-shadow: inset 0 0 1000px rgba(0, 0, 0, 0.2);}

</style>