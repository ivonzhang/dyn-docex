<template>
  <div id="app">
    <transition
        name="custom-classes-transition"
        enter-active-class="animated bounce"
        leave-active-class="animated bounceOutLeft"
    >
      <router-view></router-view>
    </transition>
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


/* .fold-enter-active {
  animation-name: fold-in;
  animation-duration: .5s;
}
.fold-leave-active {
  animation-name: fold-out;
  animation-duration: .5s;
}
@keyframes fold-in {
  0% {
    transform: translate3d(0, 100%, 0);
  }
  50% {
    transform: translate3d(0, 50%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fold-out {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 50%, 0);
  }
  100% {
    transform: translate3d(0, 100%, 0);
  }
} 
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-out .5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes bounce-out {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(0);
  }
}
*/

</style>
