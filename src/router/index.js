const NotFound = () => import(/* webpackChunkName: "NotFound" */'../components/NotFound.vue')
const Home = () => import(/* webpackChunkName: "Home" */'../components/Home.vue')
const ArticleList = () => import(/* webpackChunkName: "ArticleList" */'../components/blog/ArticleList.vue')
const Article = () => import(/* webpackChunkName: "Article" */'../components/blog/Article.vue')
const Logon = () => import(/* webpackChunkName: "Logon" */'../components/Logon.vue')
const Register = () => import(/* webpackChunkName: "Register" */'../components/Register.vue')
const ReSetPwd = () => import(/* webpackChunkName: "FindPwd" */'../components/ReSetPwd.vue')

Vue.use(VueRouter)

const routes = [
  { path: '*', component: NotFound },
  { path:'/', redirect: '/logon' },
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
  { path:'/resetpwd', component:ReSetPwd },
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

export default router
