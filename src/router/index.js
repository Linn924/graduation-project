const NotFound = () => import(/* webpackChunkName: "NotFound" */'../components/NotFound.vue')
const HomePage = () => import(/* webpackChunkName: "HomePage" */'../components/HomePage.vue')
const ArticleListPage = () => import(/* webpackChunkName: "ArticleListPage" */'../components/blog/ArticleListPage.vue')
const ArticlePage = () => import(/* webpackChunkName: "ArticlePage" */'../components/blog/ArticlePage.vue')

Vue.use(VueRouter)

const routes = [
  { path: '*', component: NotFound },
  { path:'/', redirect: '/homepage' },
  { path: '/homepage', 
    redirect: '/homepage/articlelistpage', 
    component: HomePage,
    children:[
      { path:'/homepage/articlelistpage', component:ArticleListPage},
      { path:'/homepage/articlepage', component:ArticlePage},
    ]
  }
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

export default router
