<template>
	<!--<div class="content_div"></div>-->
	<div id="content" contenteditable="true" v-text="comment"  @input="changeText()"></div>
	
</template>

<script type="text/javascript">

	export default {

		props:['value'],

		data() {
			return{
				comment: this.value
			}
		},
		methods: {
			changeText(){
				this.comment = this.$el.innerText;
				console.log(this.comment)
                this.$emit('input',this.comment);
			}
		}
	}
</script>

<style type="text/css" scoped="">
	div.content_div {
	    background-color: #fff;
	    margin: 0.5rem 0;
	    z-index: 9;
	}
	div#content {
	    max-height: 16rem;
	    height: 16rem;
	    outline: none;
	    overflow-x: hidden;
	    overflow-y: auto;
	    margin: 5px;
	    -webkit-user-select: text;
	}
</style>