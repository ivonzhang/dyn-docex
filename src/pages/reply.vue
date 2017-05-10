<template>
	<div class="reply_and_attachs active" style="" v-show="cancelClicked">
	    <div class="reply_advice">
	        <div class="reply_input_div">
	            <textarea class="reply_input" cols="30" placeholder="请填写回复意见" rows="4" type="text" v-model="choosedOpinion">
	            </textarea>
	        </div>
	    </div>
	    <div class="common_advice">
	        <div class="advice-tips tips-font-color">
	            快捷意见
	        </div>
	        <div class="advice">
	            <div class="advice1" v-text="opinions[0]" ></div>
	            <div class="advice2" v-text="opinions[1]"></div>
	            <div class="advice3" v-text="opinions[2]"></div>
	        </div>
	    </div>
	    <div class="reply_attachs">
	        <div class="click_to_choose_attachs fu-281">
	            <div class="o" style="text-align: center;">
	                <i class="aui-iconfont aui-icon-add">
	                </i>
	            </div>
	            <input name="file" type="file"/>
	        </div>
	    </div>
	    <div class="reply_foot">
	        <div class="last_step" @click="clickedCancleBtn">
	            取消
	        </div>
	        <div class="img_reply" @click="sendOpinion">
	            发送
	        </div>
	    </div>
	    <div class="aui-toast" v-show="showReplyStatus" id="after-operation-toast">
	    	 	<i class="aui-iconfont aui-icon-check"></i>
	    	    <div class="aui-toast-content"></div>
	    </div>
	</div>
</template>
<script>
	
	import $ from 'jQuery'
	import {mapActions,mapGetters} from 'vuex'

	export default{
		data(){
			return {
				opinions:['同意', '不同意', '已阅'],
				choosedOpinion: '',
				cancelClicked: true,
				replyStutusMsg: ''

			}
		},

		mounted(){
			var vm = this;
			/*常用意见选择*/
			$(".advice1, .advice2, .advice3").click(function(){
				vm.choosedOpinion = $(this).text();
				$(".reply_input").val($(this).text());
				$(this).siblings().removeClass("active");
				$(this).addClass("active");
			}).bind("touchstart", function(e){
				$(this).addClass("yunzhijia-click-active3");
			}).bind("touchend", function(e){
				$(this).removeClass("yunzhijia-click-active3");
			});
		},

		computed: {
			/*从vuex中读取详情id*/
			docexId(){
				return this.detailDocexdetailVO.id
			},

			showReplyStatus(){
				this.replyStutusMsg = this.docexdetailOpinionSaveStatus.msg
				return this.docexdetailOpinionSaveStatus.success == "1"
			},

			...mapGetters(['detailDocexdetailVO', 'docexdetailOpinionSaveStatus'])
		},

		methods: {

			/*chooseOpinion(that){

			}*/
			clickedCancleBtn(){
				this.cancelClicked = !this.cancelClicked
				this.$store.dispatch('setIsShowReplyPage', this.cancelClicked)
			},

			sendOpinion(){
				var vm = this;
				const params = {
					docexId: vm.docexId,
					opId: 0,
					reply_content: vm.choosedOpinion,
					isReply: 0
				};
				console.log(vm.chooseOpinion)
				vm.$store.dispatch('detailSendOpinion', params).then(function(){
					$.showCustomAlert('123')
				})
			}

		}
	}

</script>

<style type="text/css" scoped>
	div.clear{clear:both;}

	/*新回复操作样式*/
	div.reply_advice{
		width: 100%;
		color: #8A8A8A;
		display: -webkit-box;
		display: -moz-box;
		display: box;
		-webkit-box-orient: horizontal;
		-moz-box-orient: horizontal;
		box-orient: horizontal;
		z-index: 8;
		background-color: #ffffff;
		
	}

	div.reply_advice div.reply_write_png{
		width: 35px;
		height: 35px;
		line-height: 35px;
		text-align:center;
		margin-top: 5px;
		-webkit-box-flex: 0;
		-moz-box-flex: 0;
		box-flex: 0;
	}

	div.reply_advice div.reply_input_div{
		width: 70%;
		height: 10rem; 
		line-height: 10rem;
		margin: 0 5px 5px;
	    background-size: 100% 100%;
		-webkit-box-flex: 1;
		-moz-box-flex: 1;
		box-flex: 1;
	}
	div.reply_advice div.reply_reply_png{
		height:35px; 
		line-height:35px;
		-webkit-box-flex: 1;
		-moz-box-flex: 1;
		box-flex: 1;
		text-align:center;
		color: #3cbaff;
		margin-top: 5.0rem;
	}
	div.reply_advice div.reply_reply_png img{
		width:71px;
		height:30px;
		text-align:center;
		margin: 2px 5px 2px 5px;
	}
	.reply_reply_png{
		text-align: center;
	    margin: 15px;
	    width: 3.5rem;
	    background-color: #3cbaff;
	    color: #ffffff;
	    border-radius: 15px;
	    padding: 2px 10px;
	}
	div.reply_advice div.reply_input_div input.reply_input{
		width: 100%;
		display: block;
		font-size:14px;
		border-right: #ffffff 0px solid;
	    border-top: #ffffff 0px solid;
	    border-left: #ffffff 0px solid;
	    border-bottom: #c0c0c0 1px solid;
	    background-color: #ffffff;
		border-radius: 4px;
	    padding: 7px 0 7px 5px;
	    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075); 
		box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075); 
		-webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s; 
		transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s; 
	}
	div.reply_advice div.reply_input_div input.reply_input:focus { 
		border-color: #66afe9; 
		outline: 0; 
		-webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6); 
		box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6); 
	} 
	div.reply_list div.reply_reply_png{
		width: 35px;
		height: 35px;
		line-height: 35px;
		
		-webkit-box-flex: 0;
		-moz-box-flex: 0;
		box-flex: 0;
	}
	textarea.reply_input{
		overflow-y: auto;
		border:none;
		padding: 10px 5px;
		height: 100%;
	}

	div.reply_and_attachs{
		position: relative;
	    border-bottom: none !important;
		width: 100%;
		height: 100%;
	    min-height: 16.0rem;
	    z-index: 8;
	    border-bottom: 1px solid #BFBFBF;
	}
	div.reply_and_attachs div.reply_advice{
		width: 100%;
	    color: #8A8A8A;
	    display: -webkit-box;
	    display: -moz-box;
	    display: box;
	    -webkit-box-orient: horizontal;
	    -moz-box-orient: horizontal;
	    box-orient: horizontal;
	    z-index: 8;
	    background-color: #ffffff;
	    padding: 0.5rem 0 0 0;
	}
	div.common_advice{
		width: 100%;
	    height: 2.50rem;
	    z-index: 8;
	    background-color: #ffffff;
	}
	div.common_advice div{
		float: left;
	}
	div.common_advice div:nth-of-type(2){margin: 0 0.5rem;}
	div.advice-tips { padding: 5px 10px 5px !important;}
	.advice div{
		border: 1px solid #dce1e8 !important;
		color: #9a9a9a;
		width: 4.0rem;
	    height: 2.0rem;
	    line-height: 2.0rem;
	    border-radius: 15px;
	    text-align: center;
	}
	div.advice1.active{
		text-align: center;
		background-color: #3cbaff;
		color: #ffffff !important;
	}
	div.advice2.active{
		text-align: center;
		background-color: #f35959;
		color: #ffffff !important;
	}
	div.advice3.active{
		text-align: center;
		background-color: #9a9a9a;
		color: #ffffff !important;
	}
	.adviceSelected{
		color: #8A8A8A;
	}
	div.reply_attachs{
		width: 100%;
	    z-index: 8;
	    background-color: #fff;
	    margin: 0.5rem 0 3.0rem 0;
	    float: left;
	}
	div.reply_attach{
		height: 2.5em;
	    width: 2.5em;
	    line-height: 2.5em;
	    border: 1px solid #cccccc;
	    /* background-image: url(../img/xt.png); */
	    background-size: 2.5em 2.5em;
	    background-repeat: no-repeat;
	    position: relative;
	    background-position: center;
	    margin: 1em;
	    float: left;
	}
	div.delete{
		position: absolute;
	    width: 20px;
	    height: 20px;
	    right: -8px;
	    top: -8px;
	    /* background-image: url(../img/delete_normal.png); */
	    background-size: 20px 20px;
	    background-repeat: no-repeat;
	    z-index: 100;
	}
	div.click_to_choose_attachs{
	    line-height: 2.5em;
	    position: relative;
	    margin: 0.5rem;
	    float: left;
	    tap-highlight-color: rgba(0,0,0,0);
		-webkit-tap-highlight-color: rgba(0,0,0,0);
		-webkit-tap-highlight-color: transparent;
	}

	#bg{ display: none;  position: fixed;  top: 0%;  left: 0%;  width: 100%;  height: 100%;  background-color: black;  z-index:1001;  -moz-opacity: 0.7;  opacity:.30;  filter: alpha(opacity=70);}
	/*IPhone 回复样式*/
	.shade{ display: none;  position: fixed;  top: 0%;  left: 0%;  width: 100%;  height: 100%;  background-color: black;  z-index:1001;  -moz-opacity: 0.7;  opacity:.70;  filter: alpha(opacity=70);}
	/*#show{display: none;  position: fixed;  top: 35%;  left: 5%;  width: 80%;  height: 15%;  padding: 5px;  border: 1px solid #E8E9F7;  background-color: white;  z-index:1002;  overflow: auto;}*/
	 
	div#show {display: none;  position: fixed;  top: 35%;  left: 10%;  width: 80%;    padding: 1px;  border: 1px solid #E8E9F7;  background-color: white;  z-index:1002;  overflow: auto;}


</style>