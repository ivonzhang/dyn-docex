<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

// import Header from './components/header.vue';
// import DocexList from './components/docexList.vue';
// import IndexFooter from './components/indexFooter.vue';
import api from './api/api'

export default {
  name: 'app',
  data () {
    return {
      
    }
  },
  created () {
      // api.initSettingInfo();
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      /*分发*/
      // this.$store.dispatch('indexGetList')
  },
  components:{
      // 'docex-header':Inde,
      // 'docex-list' : DocexList,
      // 'index-footer' : IndexFooter,
      // 'index': Index
  }
}
</script>

<style>
#app {
  font-size: 1em;
  font-family: 'Microsoft YaHei', Tahoma, Helvetica, Arial, SimSun, sans-serif;
  margin: 0px;
  padding: 0px;
  background-color: #f1f4f8;
}
</style>
