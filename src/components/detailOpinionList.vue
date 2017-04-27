<template>
	<div>
		<div class="aui-flex-col aui-flex-center aui-padded-5" style="background-color: #fff;">
		    <div class="aui-flex-item-9 aui-text-left replytab" style="padding-left: 10px;">
		        回复意见（{{opinionCount}}）
		    </div>
		    <div class="aui-flex-item-3 aui-text-center flowshowtab" style="color: #3cbaff;font-size: 0.85em;line-height: 24px;">
		    </div>
		</div>
		<div class="aui-content" id="docex-replys" v-show="showOpinionList">
			<ul class="aui-list-view replys-list">
			    <li class="aui-list-view-cell aui-img"  v-for="opinion in opinions">
			        <img class="aui-img-object aui-pull-left" :src="userImgUrl(opinion)" style="width: 2.0rem;height: 2.0rem;border-radius: 50%;"/>
		            <div class="aui-img-body reply-content-info">
		                <p class="sub-font-color">
		                    {{opinion.opUser}}
		                </p>
		                <p class="sub-font-color" style="font-size: 0.79em;">
		                    {{opinion.opDate}}
		                </p>
		                <h4 class="">
		                    {{opinion.opContent}}
		                </h4>
		            </div>
			    </li>
			</ul>
		</div>
	</div>
</template>

<script>
	import api from '../api/api';
	import {mapGetters} from 'vuex'

	export default{

		computed:{
			opinionCount() {
				return this.docexdetailOpinionOfTodo.count
			},

			opinions(){
				return this.docexdetailOpinionOfTodo.docexFileOptionVOs
			},

			showOpinionList(){
				if(this.opinionCount > 0){
					return true
				}else{
					return false
				}
			},

			...mapGetters(['docexdetailOpinionOfTodo'])
		},

		methods: {
			userImgUrl(opinion){//意见回复者头像地址
				return api.serverInfo.domain + '/plugins/dyn/dyn.do?method=file&className=cn.firstsoft.firstframe.plugins.dyn.docex.service.DocexService&methodName=loadPhoto&params=' + opinion.opUId;
			},

			opinionsOfReply(opinion){
				return opinion.docexFileOpReplyVOs
			},
		}
	}
</script>

<style type="text/css">
	.replys-list .aui-list-view-cell {
	    padding: 10px 0 0 15px;
	}
	.replys-list .aui-list-view-cell:last-child:after {
	    border-bottom: 0px solid #dce1e8;
	}
	.aui-list-view-cell:last-child:after {
	    border-bottom: 0px solid #dce1e8;
	}
	.replys-list .aui-list-view-cell:after {
	    border-bottom: 0px solid #dce1e8;
	}
	.aui-list-view-cell:after {
	    border-bottom: 1px solid #dce1e8;
	}
	.reply-content-info {
	    border-bottom: 1px solid #dce1e8;
	}
	.replys-list li:last-child .reply-content-info {
	    border: none;
	}
	#docex-replys .aui-list-view:after {
	    border-top: 1px solid #dce1e8;
	}

</style>