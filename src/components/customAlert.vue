<template>
	<div v-show="customConfig.showAlert">
		<div id="bg2"></div>
		<!-- 自定义提示窗口 -->
		<div class="customAlert" v-show="customConfig.showAlert">
		 	<div class="custom_alert_title" v-text="customConfig.title"></div>
		 	<div class="custom_confirm_div" v-text="customConfig.closeTips" @click="confirm"></div>
		</div>
	</div>
</template>

<script type="text/javascript">
	
	export default {
		data() {
			return {
				// showAlert: false,
			}
		},

		props: {
			customConfig: {
				type: Object,
				default: {
					showAlert: false,
					title: '提示',
					closeTips: '确定',
					ok: function() {
						alert("确定操作为定义")
					}
				}
			}
		},

		methods: {
			confirm(){
				this.customConfig.ok()
			}
		}
	}
</script>

<style type="text/css" scoped>
	/*遮罩*/
	#bg2{ /* display: none; */  position: fixed;  top: 0%;  left: 0%;  width: 100%;  height: 100%;  background-color: black;  z-index:1001;  -moz-opacity: 0.3;  opacity:.30;  filter: alpha(opacity=30);}
	/*自定义弹出提示框: 取消+确定两个按钮*/
	div.myAlert{/* display: none; */  position: fixed;  top: 35%;  left: 5%;  width: 90%;    padding: 0px;  background-color: #ffffff;  z-index:1002;  overflow: auto;border-radius: 0.3rem;}
	div.alert_title{
		min-height:80px;
		line-height: 2.0;
		padding: 20px;
		text-align:center;
		border-bottom: 1px solid #dddddd;
	}
	div.opration_div{
	  	width: 100%;
	  	margin:0 auto;
		line-height: 30px;
		padding: 0.5rem 0;
		border-radius: 5px;
		
		display:-webkit-box;
		display:-moz-box;
		display:box;
		-webkit-box-orient:horizontal;
		-moz-box-orient:horizontal;
		box-orient:horizontal;
	}
	div.cancle{
		-webkit-box-flex:1;
		-moz-box-flex:1;
		box-flex:1;
		text-align: center;
		border-right: 1px solid #dce1e8;
		color: #9a9a9a;
	}
	div.confirm{
		-webkit-box-flex:1;
		-moz-box-flex:1;
		box-flex:1;
		text-align: center;
		color: #3cbaff;
	}
</style>