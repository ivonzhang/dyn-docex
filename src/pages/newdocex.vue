<template>
	<div id="newdocex">
		<div id="add_content">
			<div class="title_div"><input placeholder="请输入标题(限25个字)" id="title"></div>
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
			
			<div id="startdiv">
				<div class="aui-text-center" id="start">下一步</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	
</script>

<style type="text/css">
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
	#newdocex #content {
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



</style>