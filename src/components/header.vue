<template>
  <div>
    <div class="aui-tab" :class="tabPosition">
          <ul class="aui-tab-nav">
              <li class="undone" :class="{actived : activedTab}" id="tab-left" @click="getTodoList">待办<i v-show="hasNotReaded"></i></li>
              <li class="done" :class="{actived : !activedTab}" id="tab-right" @click="getDoneList"><i class="split-line"></i>已办<i class="aui-iconfont aui-icon-unfold"></i></li>
          </ul>
      </div>
      
      <div class="aui-mask done-mask" v-show="isShowDoneTab">
        <div class="aui-content" style="margin-top: 45px;">
            <ul class="aui-list-view">
                <li class="aui-list-view-cell" id="tab_myDraft" @click="getMyDraftOrMySent('myDraft')">我发起的</li>
                <li class="aui-list-view-cell" id="tab_mySent" @click="getMyDraftOrMySent('mySent')">我经办的</li>
            </ul>
        </div>
      </div>
      <div class="blank" style="height: 3em;"></div>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';

export default {
  data:function(){
      return{
        tabPosition : 'header-tab',
        activedTab : true,
        isShowDoneTab: false,
        params:{
          start : 0,
          pageSize : 12,
          inboxId : ' ',
          type : 'myDraft',
          strKey : ' '
        }
      }
  },
  props:{
      /*判断首页代办列表是否含有未读代办项目*/
      todoAllReaded:{
        type: Boolean,
        default: function () {
          return false
        }
      }
  },
  methods:{
    /*单击代办tab 加载最新代办列表*/
    getTodoList(){
      this.activedTab = true;
      this.isShowDoneTab = false;
      const vm = this;
      vm.$store.dispatch('resetIndexListData').then(function(){
        vm.$store.dispatch('indexGetList',vm.params).then(function(){
          // console.log(vm.indexListData.length)
          // vm.params.start += vm.indexListData.length
          vm.$store.dispatch('setIndexContinueToLoad', true)
        })
      });
    },

    /*单击已办tab*/
    getDoneList(){
      const vm = this;
      vm.$store.dispatch('resetIndexDoneListData');
      this.activedTab = false;
      this.isShowDoneTab = true;
    },

    /*单击我发起的tab 加载已办中“我发起的/我经办的”列表*/
    getMyDraftOrMySent(type){
      this.params.type = type;
      const vm = this;
      vm.$store.dispatch('indexSetListType', type);
      vm.$store.dispatch('indexGetDoneList',vm.params).then(function(){
        vm.isShowDoneTab = false;
      });
      vm.$store.dispatch('setIndexContinueToLoad', true)
      /*vm.$store.dispatch('settingGetInitInfo').then(function(){
        setTimeout(function(){vm.$store.dispatch('indexGetList', vm.params);},100);
      });*/

    }
  },
  computed:{
    /*判断列表项是否为未读*/
    hasNotReaded(){
      return this.activedTab && this.todoAllReaded;
    },
    ...mapGetters(['indexListData', 'indexListType'])
  }
  
}
</script>

<style>

  body{color: #3f3f3f;}
  .aui-list-view:after {border-top: 0px solid #c8c7cc; }
  .docex-item .aui-padded-10 {padding-left: 0;margin-left: 10px;}

  .header-tab{
    position: fixed; top: 0;z-index: 12;
  }
  .actived{
    color: #3cbaff ! important;
    border-bottom: 2px #3cbaff solid !important;
  }
  #tab-left > i {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 10px;
      background-color: #3cbaff;
      margin-left: 5px;
      opacity: 0.7;
  }
</style>
