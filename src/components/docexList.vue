<template>
	<div id="main" class="main">
		<div v-for="item in getDocexListData">
			<docex-item :docex="item"></docex-item>
		</div>
	</div>
</template>

<script>
	import docexItem from './docexItem.vue'
	import $ from 'jQuery'
	import {mapGetters,mapActions} from 'vuex'
	require('../api/util/utils.js')

	export default{
		data (){
			return {
				params:{
					start : 0,
					pageSize : 12,
					inboxId : ' ',
					type : 'todo',
					strKey : ' '
				},
			}
		},
		props:{
			listData:{//从父组件index.vue传过来的 <docex-list :list-data='indexListData'></docex-list>
				type: Array,
				default: function () {
					return []
				}
			}
		},
		created () {
			var vm = this;
			/*初始化用户信息 then加载首页代办列表*/
			vm.$store.dispatch('settingGetInitInfo').then(function(){
				if(vm.indexListData.length === 0){
					setTimeout(function(){vm.$store.dispatch('indexGetList', vm.params);},100);//加载代办列表 
				}
		    });

			/*在这里利用jQuery做一下滚动刷新的操作逻辑 继续完善*/
		    var initTop = 0;
            $(document).unbind("scroll").scroll(function(e) {
                var scrollTop = $(document).scrollTop();
                if ((scrollTop > initTop) && $.jQutils.isScrollBottom() && vm.indexContinueToLoad) {
                	if(vm.indexListType === 'todo'){
                		vm.params.start = vm.indexListData.length;
                		vm.$store.dispatch('indexGetList', vm.params);
                	}else{
                		vm.params.start = vm.indexDoneList.length;
                		vm.params.type = vm.indexListType;
                		vm.$store.dispatch('indexGetDoneList', vm.params);
                	}
                }
                initTop = scrollTop;
            });
		},

		components:{
			'docex-item' : docexItem,
		},
		computed:{
			/*读取从父组件中传递的数据list-data */
			getListData(){
				return this.listData;
			},
			/*判断列表加载的类型：代办、已办，从vuex中读取出来*/
			getDocexListData(){
				if(this.indexListType === 'todo'){
					return this.indexListData;
				}else{
					return this.indexDoneList;
				}
			},

			...mapGetters(['indexListType','indexListData', 'indexDoneList', 'indexContinueToLoad'])
		}
	}

</script>

<style type="text/css" scoped>
	#main {
		background-color: #fff;
		margin-top: 5px;
	}
	#main>div:last-of-type>div>.docex-item div:last-of-type {
	    border: none;
	}
</style>