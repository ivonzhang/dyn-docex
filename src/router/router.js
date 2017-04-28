/*
* created by zhangf 2017-01-04
*/
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '../App.vue';
import Index from '../pages/index.vue';
import Detail from '../pages/detail.vue';
import DocexDetailReply from '../pages/reply.vue';
import ReadHistoryList from '../pages/readHistory.vue';

Vue.use(VueRouter);


const routes = [
  {
    path: '/',
    component: Index,
    name: 'app'
  },
  {
    path: '/detail',
    component: Detail,
    name: 'detail'
  },
  {
    path: '/read',
    component: ReadHistoryList,
    name: 'read'
  },
  /*{
    path: '/reply',
    component: DocexDetailReply,
    name: 'reply'
  },*/
  /*{
    path: '/movies',
    component: App.components.Movies,
    name: 'movies'
  },
  {
    path: '/movie/list',
    component: App.components.MovieList,
    name: 'movie-list'
  },
  {
    path: '/movie/subject/:id',
    component: App.components.MovieDetail,
    name: 'movie-detail'
  },
  {
    path: '/movie/search',
    component: App.components.SearchList,
    name: 'movie-search'
  },
  {
    path: '/book/search',
    component: App.components.SearchBook,
    name: 'book-search'
  }*/
]

const router = new VueRouter({
	routes:routes, // short for routes: routes
    linkActiveClass:'active',     //router-link的选中状态的class，也有一个默认的值
    history:true
});

export default router;