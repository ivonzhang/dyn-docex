<template>
	<div>
		<div id="main" v-show="!isShowReplyPage" style="margin-top: 0">
			<docex-detail-header></docex-detail-header>
			<div class="container">
				<docex-detail-content></docex-detail-content>

				<div class="aui-content" id="docex-attachs">
					<ul class="aui-list-view attachs-list">
						<docex-detail-attach></docex-detail-attach>
					</ul>
				</div>

				<docex-detail-opinionlist></docex-detail-opinionlist>

			</div>
		</div>
		
		<docex-detail-reply v-show="isShowReplyPage"></docex-detail-reply>

		<docex-detail-footer></docex-detail-footer>

	</div>
	
</template>

<script>
	import DocexDetailHeader from '../components/detailHeader.vue';
	import DocexDetailContent from '../components/detailContent.vue';
	import DocexDetailAttach from '../components/detailAttach.vue';
	import DocexDetailOpinionlist from '../components/detailOpinionList.vue';
	import DocexDetailFooter from '../components/detailFooter.vue';
	import DocexDetailReply from '../pages/reply.vue';
	import {mapGetters,mapActions} from 'vuex';


	export default {

		data(){
			return{

			}
		},

		created() {
			var vm = this;
			const docexId = this.$route.query.id;
			console.log('docexId:'+docexId);
			vm.$store.dispatch('settingGetInitInfo').then(function(){
		    	setTimeout(function(){
		    		vm.$store.dispatch('detailLoadOfTodo',docexId).then(function(){
		    			// vm.$store.dispatch('detailGetContentOfTodo', docexId, vm.detailDocexdetailVO.fileType)
		    		});
		    	},100);
		    });
		},

		components:{
			DocexDetailHeader,
			DocexDetailContent,
			DocexDetailAttach,
			DocexDetailOpinionlist,
			DocexDetailFooter,
			DocexDetailReply
		},

		computed:{
			isShowReplyPage(){
				return this.docexdetailIsShowReplyPage
			},
			...mapGetters(['detailDocexdetailVO', 'docexdetailIsShowReplyPage'])
		},

		methods: {

		}

	}

</script>
<style type="text/css" scoped>
	#main {
	    margin-bottom: 4.0rem;
	}
	#docex-attachs {
	    margin-top: 1.0rem;
	}
	.container{background-color: #f1f4f8;}
</style>