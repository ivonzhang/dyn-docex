<template>
	<div>
		<docex-header :todo-all-readed='isShowUnread'></docex-header>
		<docex-list></docex-list>
		<index-footer></index-footer>
	</div>
</template>

<script>
	import DocexHeader from '../components/header.vue';
	import DocexList from '../components/docexList.vue';
	import IndexFooter from '../components/indexFooter.vue';
	import {mapGetters,mapActions} from 'vuex';
	

	export default {

		data(){
			return{
				params:{
					start : 0,
					pageSize : 12,
					inboxId : ' ',
					type : 'todo',
					strKey : ' '
				},
			}
		},
		
		components:{
			DocexHeader,
			DocexList,
			IndexFooter
		},
		created () {
		    /*首页列表打数据加载改到docexList.vue组件中加载吧*/
		    // var vm = this;
		   /* vm.$store.dispatch('settingGetInitInfo').then(function(){
		    	setTimeout(function(){vm.$store.dispatch('indexGetList', vm.params);},100);
		    });*/
		},

		/*...mapGetters的写法需要安装插件 请参考https://babeljs.io/docs/plugins/transform-object-rest-spread/*/
        computed: {
           /*是否提示未读样式*/
        	isShowUnread(){
        		var isShow = false;
        		for (var item of this.indexListData) {
        			if(item.isRead === 0){
        				isShow = true;
        				break;
        			}
        		}
        		return isShow;
        	},

            ...mapGetters(['indexListData', 'indexDoneListData', 'indexListType'])
        },

        methods:{
        	
        }

	}

</script>

<style>
	
</style>