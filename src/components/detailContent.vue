<template>
	<div>
		<div class="content" id="content" v-html="docexDetailContent"></div>
	</div>
</template>

<script>
	import {mapGetters,mapActions} from 'vuex'

	export default{

		created(){
			
		},
		mounted(){
			var vm = this;
			// vm.$store.dispatch('detailGetContentOfTodo', vm.detailDocexdetailVO.id, vm.detailDocexdetailVO.fileType)
		},
		computed:{
			docexDetailContent(){
				return this.detailContentOfTodo.content
			},
			...mapGetters(['detailContentOfTodo'])
		}

	}

</script>

<style type="text/css">
	div.content {
	    padding: 0.5em;
	    word-break: break-all;
	    _height: 200px;
	    min-height: 200px;
	    color: #373737;
	    background-color: #fff;
	}
</style>