<template>
	<div id="newdocex">
		<div id="add_content" v-show="!showNext">
			<div class="title_div"><input placeholder="请输入标题(限25个字)" id="title"  v-model="title"></div>
			<div class="content_div">
				<div id="content" contenteditable="true"></div>
			</div>
			
			<!--
			<div style="background-color: #fff;z-index: 6;">
			   <div class="click_to_choose_attachs">
			        <div class="add_attach_img fu-281"><div class="o" style="text-align: center;"><i class="aui-iconfont aui-icon-add"></i></div><input type="file" name="file"></div>
			        <div class="add_attach_tips">(移动端只能添加图片附件)</div> 
			   </div>
			   <div id="choosed_attach_list"></div>
			</div>
			-->
			<div class="blank"></div>
			
			<div id="startdiv" @click="showNextOrPreStep">
				<div class="aui-text-center" id="start">下一步</div>
			</div>
		</div>

		<div class="newstep_and_revert" v-show="showNext">
		    <div class="aui-flex-col aui-flex-center aui-border-b" style="background-color: #fff;">
		        <div class="aui-flex-item-3 aui-flex-col aui-flex-middle aui-padded-0-5">
		            流转方式
		        </div>
		        <div class="aui-flex-item-4 aui-flex-col aui-flex-middle aui-padded-5">
		            <i class="tab-revertArb aui-iconfont" :class="classObject1" @click="selectType" style="color: #3cbaff;font-size: 30px;">
		            </i>
		            任意流转
		        </div>
		        <div class="aui-flex-item-5 aui-flex-col aui-flex-middle aui-padded-5">
		            <i class="tab-revertStep aui-iconfont" :class="classObject2" @click="selectType" style="color: #3cbaff;font-size: 30px;">
		            </i>
		            步骤流转
		        </div>
		    </div>
		    <div id="main">
		        <!-- 任意流转 -->
		        <div class="revertArb" style="display: block;" v-show="isActive">
		            <!--
		            <div class="choosed_users">
		                <div class="click_to_choose_users" id="choose_revertArb_users">
		                    <i class="aui-iconfont aui-icon-add">
		                    </i>
		                </div>
		            </div>
		            -->
		            <user-picker></user-picker>
		            <div class="add_to_special">
		                <div class="special active">
		                </div>
		                <div class="special_description">
		                    可加签
		                </div>
		            </div>
		        </div>
		        <!-- 步骤流转 -->
		        <div class="revertStep" v-show="!isActive">
		            <div class="step_list">
		                <!-- 增加步骤 -->
		                <div class="step_item" v-for="(step, index) in stepVOs">
		                    <div class="title">
		                        <div class="step_name">
		                            步骤{{index+1}}
		                        </div>
		                        <div>
		                            <i class="aui-iconfont aui-icon-roundclosefill" style="color: #e74c3c; font-size: 1.1rem;" @click="deleteStep(index)"></i>
		                        </div>
		                    </div>
		                    <user-picker></user-picker>
		                    <div class="step_style">
		                        <div class="serial" @click="changeStepType(4, index)" :class="{'step_selected' : step.stepType === 4}">
		                            串行
		                        </div>
		                        <div class="jointly_sign" @click="changeStepType(0, index)" :class="{'step_selected' : step.stepType === 0}">
		                            会签
		                        </div>
		                        <div class="exclusive" @click="changeStepType(1, index)" :class="{'step_selected' : step.stepType === 1}">
		                            排他
		                        </div>
		                    </div>
		                    <div class="choose_permision">
		                        <div class="alter">
		                            <div class="alter_img" :class="{'notactive' : step.isChangMem === 0}" @click="canChangeUser(index)">
		                            </div>
		                            <div class="alter_description">
		                                允许更改人员
		                            </div>
		                        </div>
		                        <div class="forward">
		                            <div class="forward_img" :class="{'active' : step.isRevert === 1}" @click="canRevert(index)">
		                            </div>
		                            <div class="forward_description">
		                                允许转发
		                            </div>
		                        </div>
		                    </div>
		                </div>
		                <div id="add_step" @click="addStep">
		                    增加步骤
		                </div>
		            </div>
		        </div>
		    </div>
		    <div class="clear">
		    </div>
		    <div class="blank" style="height: 6rem; background-color: #f4f4f4;">
		    </div>
		    <div style="background-color: #fff; height: 3em;position: fixed;bottom: 0;left: 0;right: 0;">
		    </div>
		    <div class="aui-content" id="prestep-send">
		        <div class="aui-col-xs-6 aui-text-center " @click="showNextOrPreStep">
		            上一步
		        </div>
		        <div class="aui-col-xs-6 aui-text-center " id="send">
		            提交
		        </div>
		    </div>
		</div>
		
		
		<custom-alert :customConfig="showConfig"></custom-alert>
	</div>
</template>

<script type="text/javascript">
	// require('../css/docex-forward.css')

	import contentDiv from '../components/newContentEdiableDiv.vue'
	import userPicker from '../base/user/userPicker.vue'
	import customAlert from '../components/customAlert.vue'

	import {mapGetters} from 'vuex'

	export default{

		data () {
			return {
				title: "",
				content: "",
				showNext: false,
				isActive: true,
				stepVOs: [{userIds:[], isRevert:0, stepType:4, isChangMem:1, stepName:""}],
				showConfig: {
					showAlert: false,
					title: '输入的内容不能为空',
					closeTips: "确定",
					ok: this.closeTips
				}
			}
		},

		/*watch: {
			"content":{
				handler: (newVal, oldVal) => {
					alert(newVal)
				},
				deep: true
			}
		},*/

		created() {
			var vm = this
			const path = this.$route.name
			if(path === 'revert') {
				this.$nextTick(function() {
					vm.title = vm.detailDocexdetailVO.title
					$("#content").html(vm.detailContentOfTodo.content)
				})
				
			}
		},


		computed: {
			classObject1(){
				return {
				     "aui-icon-roundcheckfill": this.isActive,
				     'aui-icon-round': !this.isActive,
			    }
			},
			classObject2(){
				return {
				     "aui-icon-roundcheckfill": !this.isActive,
				     'aui-icon-round': this.isActive,
			    }
			},

			docexId() {
				return this.detailDocexdetailVO.id
			},

			...mapGetters(['detailContentOfTodo', 'detailDocexdetailVO'])
		},


		methods: {
			showNextOrPreStep(){
				var content = $("#content").html();
				this.content = content
				if(this.title === "" || content === "") {
					// this.showTips("输入的内容不能为空")
					this.showConfig.showAlert = true
					return this.showNext = false
				}else{
					return this.showNext = !this.showNext
				}
				
			},

			/**
			 * 关闭弹出提示框
			 * @return {[type]}       [description]
			 */
			closeTips() {
				this.showConfig.showAlert = false
			},

			/**
			 * 选择流转方式：isActive：true任意流转； isActive：false步骤流转
			 * @return {[type]} [description]
			 */
			selectType(){
				return this.isActive = !this.isActive
			},

			/**
			 * 增加流转步骤
			 */
			addStep(){
				const stepVO = {userIds:[], isRevert:0, stepType:4, isChangMem:1, stepName:""}
				this.stepVOs.push(stepVO)
			},

			/**
			 * 删除步骤
			 * @param  {[type]} index [description]
			 * @return {[type]}       [description]
			 */
			deleteStep(index){
				if(this.stepVOs.length > 0) {
					this.stepVOs.splice(index,1)
				}
			},

			/**
			 * 修改步骤流转的方式：4：串行:0：会签:1：排他
			 * @param  {[type]} type [description]
			 * @param  {[type]} index [description]
			 * @return {[type]}      [description]
			 */
			changeStepType(type, index) {
				if(index < this.stepVOs.length && index >= 0) {
					this.stepVOs[index].stepType = type
					// console.log(this.stepVOs[index].stepType)
				}
			},

			/**
			 * 是否允许在该节点步骤选择人员
			 * @param  {[type]} index [description]
			 * @return {[type]}       [description]
			 */
			canChangeUser(index){
				if(index < this.stepVOs.length && index >= 0) {
					const targetStepVO = this.stepVOs[index]
					targetStepVO.isChangMem = targetStepVO.isChangMem === 1 ? 0 : 1
				}
			},

			/**
			 * 是否允许在该节点执行转发操作
			 * @param  {[type]} index [description]
			 * @return {[type]}       [description]
			 */
			canRevert(index){
				if(index < this.stepVOs.length && index >= 0) {
					const targetStepVO = this.stepVOs[index]
					targetStepVO.isRevert = targetStepVO.isRevert === 1 ? 0 : 1
				}
			},

		},

		components:{
			contentDiv,
			userPicker,
			customAlert
		}
	}
	
</script>

<style type="text/css" scoped>
	@import '../css/docex-forward.css';

	#add_content {
	    height: 100%;
	}
	div.title_div {
	    background-color: #fff;
	    margin-top: 0.5rem;
	    padding: 0.5rem 0;
	    z-index: 9;
	}
	#add_content input {
	    font-size: 1em;
	    padding-left: 7px;
	    border: none;
	    outline: none;
	    width: 100%;
	    height: 30px;
	    margin: 0px;
	    -webkit-user-select: text;
	}
	div.content_div {
	    background-color: #fff;
	    margin: 0.5rem 0;
	    z-index: 9;
	}
	#content {
	    max-height: 16rem;
	    height: 16rem;
	    outline: none;
	    overflow-x: hidden;
	    overflow-y: auto;
	    margin: 5px;
	    -webkit-user-select: text;
	}
	div#startdiv {
	    position: fixed;
	    bottom: 0;
	    width: 100%;
	    height: 3rem;
	    line-height: 3rem;
	    left: 0;
	    right: 0;
	    z-index: 110;
	    background-color: #fff;
	    color: #3cbaff;
	}

	.newstep_and_revert .aui-flex-col, .revertArb, .revertStep {
	    background-color: #fff;
	}
	.newstep_and_revert .aui-flex-col, .revertArb, .revertStep {
	    background-color: #fff;
	}
	.newstep_and_revert .aui-flex-col, .revertArb, .revertStep {
	    background-color: #fff;
	}
	.newstep_and_revert .aui-flex-col, .revertArb, .revertStep {
	    background-color: #fff;
	}

	.revertArb, .revertStep {
	    background-color: #fff;
	}

	.notactive{background-image: url("../img/add_to_special_normal.png") ! important}
	.active{background-image: url("../img/add_to_special_active.png") ! important}
</style>