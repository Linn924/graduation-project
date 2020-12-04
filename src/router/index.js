const NotFound = () => import(/* webpackChunkName: "NotFound" */'../components/NotFound.vue')
const HomePage = () => import(/* webpackChunkName: "HomePage" */'../components/HomePage.vue')
const ArticleListPage = () => import(/* webpackChunkName: "ArticleListPage" */'../components/blog/ArticleListPage.vue')
const ArticlePage = () => import(/* webpackChunkName: "ArticlePage" */'../components/blog/ArticlePage.vue')
const Logon = () => import(/* webpackChunkName: "Logon" */'../components/Logon.vue')
const Register = () => import(/* webpackChunkName: "Register" */'../components/Register.vue')

Vue.use(VueRouter)

const routes = [
  { path: '*', component: NotFound },
  { path:'/', redirect: '/logon' },
  { path: '/homepage', 
    redirect: '/homepage/articlelistpage', 
    component: HomePage,
    children:[
      { path:'/homepage/articlelistpage', component:ArticleListPage},
      { path:'/homepage/articlepage', component:ArticlePage},
    ]
  },
  { path:'/logon', component:Logon },
  { path:'/register', component:Register },
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

export default router
