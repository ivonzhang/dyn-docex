<template>
	<div>
		<div id="main">
		    <!-- 任意流转 -->
		    <div class="tips">
		        处理人
		    </div>
		    <user-picker></user-picker>
		</div>
		<div class="clear">
		</div>
		<div class="yunzhijia-click-active2" id="send">
		    提交
		</div>
	</div>
</template>

<script type="text/javascript">
	import userPicker from '../base/user/userPicker.vue'
	import customAlert from '../components/customAlert.vue'

	export default {


		components: {
			userPicker,
			customAlert
		}
	}
</script>

<style type="text/css" scoped>
	div#main {
	    height: auto;
	    background-color: #ffffff;
	}
	#main .tips {
	    padding: 0.5rem;
	    margin-top: 0.5rem;
	    color: #98a1a8;
	}
	div#send {
	    position: fixed;
	    bottom: 0;
	    width: 100%;
	    height: 3rem;
	    line-height: 3rem;
	    text-align: center;
	    z-index: 9;
	    background-color: #fff;
	    color: #3cbaff;
	}
</style>