const NotFound = () => import(/* webpackChunkName: "NotFound" */'../components/NotFound.vue')
const Home = () => import(/* webpackChunkName: "Home" */'../components/Home.vue')
const ArticleList = () => import(/* webpackChunkName: "ArticleList" */'../components/blog/ArticleList.vue')
const Article = () => import(/* webpackChunkName: "Article" */'../components/blog/Article.vue')
const Logon = () => import(/* webpackChunkName: "Logon" */'../components/Logon.vue')
const Register = () => import(/* webpackChunkName: "Register" */'../components/Register.vue')
const FindPwd = () => import(/* webpackChunkName: "FindPwd" */'../components/FindPwd.vue')

Vue.use(VueRouter)

const routes = [
  { path: '*', component: NotFound },
  { path:'/', redirect: '/findpwd' },
  { path: '/home', 
    redirect: '/home/articlelist', 
    component: Home,
    children:[
      { path:'/home/articlelist', component:ArticleList},
      { path:'/home/article', component:Article},
    ]
  },
  { path:'/logon', component:Logon },
  { path:'/register', component:Register },
  { path:'/findpwd', component:FindPwd },
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

export default router
