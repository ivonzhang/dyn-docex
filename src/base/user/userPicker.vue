<template>
	<div class="choosed_users">
		<!--
		<div class="choosed_user" v-for="user in choosed_users" :id="user.id" :style="{backgroundImage : 'url(' + userPhotoUrl(user.id) + ')'}">
		    <div class="delete" id="delete2">
		    </div>
		    <div class="choosed_user_name" v-text="user.name"></div>
		</div>
		-->
		<div class="click_to_choose_users" id="choose_revertArb_users"><i class="aui-iconfont aui-icon-add"></i></div>
	</div>
</template>

<script type="text/javascript">

	// import './build/k3oa-dyn-contact.min.js'
	import './js/k3oa-dyn-base.js'
	import './k3oa-dyn-contact.js'
	import api from '../../api/api.js'
	import './build/k3oa-dyn-contact.min.css'
	// import './css/k3oa-dyn-base.css'

	export default {

		data(){
			return{
				choosed_users: []
			}
		},

		mounted() {
			var vm = this
			vm.$nextTick(function(){
				/*打开选人控件*/
				$('div.click_to_choose_users').bind('click', function() {
					var parent = $(this).parent();
					$.showContact({
						server: api.serverInfo.domain,
						module: 'docex',
						uid: 3,
						multiple: true,
						text: {
							button: {
								ok: '确定',
								cancel: '取消',
							},
							tip: '接收人'
						},
						ok: function(users) {
								// 使用vue的方式渲染 开启template中的渲染模板
								vm.choosed_users = users;
								
								// 使用jQuery的方式添加已选用户列表 在vue这里先不使用
								parent.find("div.choosed_user").remove();
								$.each(users, function() {
									vm.addChoosedUser(this, parent);
								});
							},
						users: vm.choosed_users
						});
				})
			})
		},
		methods: {

			userPhotoUrl(uid){
				var _photoUrl = api.serverInfo.domain + '/plugins/dyn/dyn.do?'+$.param({
					method: 'file',
					className: 'cn.firstsoft.firstframe.plugins.dyn.docex.service.DocexService',
					methodName: 'loadPhoto',
					params: uid
				})
				return _photoUrl
			},

			/*使用jQuery的方式添加被选中的用户*/
			addChoosedUser(user, parent){
				//var choosed_users = $('div.choosed_users');
				var choosed_users = parent;
				var click_to_choose_users = choosed_users.find("div.click_to_choose_users");
				var choosed_user = $('<div class="choosed_user"></div>');
				var delete_div = $('<div class="delete"></div>');
				var choosed_user_name = $('<div class="choosed_user_name"></div>');
				choosed_user_name.text(user.name);
				choosed_user.append(delete_div);
				choosed_user.append(choosed_user_name);
				var _photoUrl = api.serverInfo.domain + '/plugins/dyn/dyn.do?'+$.param({
					method: 'file',
					className: 'cn.firstsoft.firstframe.plugins.dyn.docex.service.DocexService',
					methodName: 'loadPhoto',
					params: user.id
				});
				choosed_user.css('background-image', 'url('+ _photoUrl +')');
				choosed_user.attr('id', user.id);
				delete_div.attr('id', 'delete'+user.id);
				click_to_choose_users.before(choosed_user);
				
				delete_div.bind("click",function(){
					$(this).css('background-image', 'url(img/delete_active.png)');
					var _userid = choosed_user.attr("id");
					/*任意流转 删除人员*/
					if($._params.sendType == 'Arb' || $._params.sendType == 'newArb'){
						$.each($._choosed_users, function(i, u) {
							if ( u.id == _userid ) {
								$._choosed_users.splice(i, 1);
								return false;
							}
						});
					}else{
						/*顺序流转 删除人员*/
						var stepItem = parent.parent();
						var selectedUsers = stepItem.data("stepReceivers");
						$.each(selectedUsers, function(i, u) {
							if ( u.id == _userid ) {
								selectedUsers.splice(i, 1);
								return false;
							}
						});
						stepItem.data("stepReceivers", selectedUsers);
					}
					/*移除被删除的接收人*/
					choosed_user.remove();
				});
			},


		}
	}

</script>

<style type="text/css" scoped>
	.choosed_users {
	    float: left;
	    background-color: #fff;
	    width: 100%;
	}
</style>