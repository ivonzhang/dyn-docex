<template>
	<div>
		<li class="aui-list-view-cell aui-img yunzhijia-click-active2" v-for="attach in attaches">
			<img class="aui-img-object aui-pull-left" style="width: 2.0rem;height: 2.0rem;margin-top: 0.30rem;" :src="attachImgSrc(attach.ext)">
			<div class="aui-img-body">
				<h4 class="aui-ellipsis-1 main-font-color" v-text="attach.title"></h4>
				<p class="sub-font-color" style="font-size: 0.79em;" v-text="formatSize(attach.size)"></p>
			</div>
		</li>
	</div>
</template>

<script>
	import api from '../api/api.js'
	import {mapGetters} from 'vuex'

	export default{

		computed: {

			/*详情的附件 + 回复意见中添加的附件*/
			attaches() {
				var attachesArr = [];
				if(this.doecedetailAttachsOfTodo.count > 0){
					attachesArr = attachesArr.concat(this.doecedetailAttachsOfTodo.docexFileAttachVOs);
				}
				const opinions = this.docexdetailOpinionOfTodo.docexFileOptionVOs;
				if(this.docexdetailOpinionOfTodo.count > 0){
					for(var opinion of opinions){
						if(opinion.docexFileAttachAllVO.count > 0){
							attachesArr = attachesArr.concat(opinion.docexFileAttachAllVO.docexFileAttachVOs)
						}
					}
				}
				return attachesArr;
			},

			
			
			...mapGetters(['doecedetailAttachsOfTodo', 'docexdetailOpinionOfTodo'])
		},

		methods: {
			/*转化附件大小*/
			formatSize(size) {
				if ( !$.isNumeric(size) ) {
					return size;
				}
				if ( size < 1024 ) {
					return size + 'B';
				} else if ( size < 1048576 ) {
					return (size / 1024).toFixed(2) + 'KB';
				} else if ( size < 1073741824 ) {
					return (size / 1048576).toFixed(2) + 'MB';
				} else {
					return (size / 1073741824).toFixed(2) + 'GB';
				}
			},

			/*附件类型图片的url*/
			attachImgSrc(fileExt) {
				//附件后缀
				const attachIcon = {
					'doc': '/base/img/attachs/word.png',
					'docx': '/base/img/attachs/word.png',
					'ppt': '/base/img/attachs/ppt.png',
					'pptx': '/base/img/attachs/ppt.png',
					'xls': '/base/img/attachs/xls.png',
					'xlsx': '/base/img/attachs/xls.png',
					'pdf': '/base/img/attachs/pdf.png',
					'jpg': '/base/img/attachs/img.png',
					'jpeg': '/base/img/attachs/img.png',
					'png': '/base/img/attachs/img.png',
					'txt': '/base/img/attachs/text.png',
					'zip': '/base/img/attachs/zip.png',
					'rar': '/base/img/attachs/zip.png',
					'mp3': '/base/img/attachs/voice.png',
				};
				var imgExtName = '/base/img/attachs/unknow.png';
				if (attachIcon[fileExt]) {
					imgExtName = attachIcon[fileExt];
				}

				return api.serverInfo.domain + '/plugins/dyn' + imgExtName;
			},
		}
	}
</script>

<style type="text/css">
	#docex-attachs .aui-list-view-cell {
	    padding: 5px 15px;
	}
	.aui-list-view-cell:after {
	    border-bottom: 1px solid #dce1e8;
	}
	.aui-list-view-cell:last-child:after {
	    border-bottom: 0px;
	}
</style>