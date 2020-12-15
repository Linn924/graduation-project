const NotFound = () => import(/* webpackChunkName: "NotFound" */'../components/NotFound.vue')

const Blog = () => import(/* webpackChunkName: "Blog" */'../components/blog/Blog.vue')
const ArticleList = () => import(/* webpackChunkName: "ArticleList" */'../components/blog/ArticleList.vue')
const Article = () => import(/* webpackChunkName: "Article" */'../components/blog/Article.vue')

const Logon = () => import(/* webpackChunkName: "Logon" */'../components/Logon.vue')
const Register = () => import(/* webpackChunkName: "Register" */'../components/Register.vue')
const ReSetPwd = () => import(/* webpackChunkName: "ReSetPwd" */'../components/ReSetPwd.vue')

const PersonalCenter = () => import(/* webpackChunkName: "PersonalCenter" */'../components/PersonalCenter.vue')

const Nav = () => import(/* webpackChunkName: "nav" */ '../components/nav/Nav.vue')
const Link = () => import(/* webpackChunkName: "link" */ '../components/nav/Link.vue')

const Home = () => import(/* webpackChunkName: "home" */ '../components/home/Home.vue')

const Analysis = () => import(/* webpackChunkName: "analysis" */ '../components/analysis/Analysis.vue')

const Practical = () => import(/* webpackChunkName: "practical" */ '../components/practical/Practical.vue')

Vue.use(VueRouter)

const routes = [
  { path: '*', component: NotFound },
  { path:'/', redirect: '/blog' },
  { path: '/blog', 
    redirect: '/blog/articlelist', 
    component: Blog,
    children:[
      { path:'/blog/articlelist', component:ArticleList},
      { path:'/blog/article', component:Article},
    ]
  },
  { path:'/logon', component:Logon },
  { path:'/register', component:Register },
  { path:'/resetpwd', component:ReSetPwd },
  { path:'/personalcenter', component:PersonalCenter },
  { path: '/nav',
    redirect: '/nav/link', 
    component:Nav,
    children:[
      { path:'/nav/link',component:Link}
    ]
  },
  { path:'/home', component:Home },
  { path:'/practical', component:Practical },
  { path:'/analysis', component:Analysis },
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/blog/articlelist' || to.path === '/blog/article' || to.path === '/logon' || to.path === '/register' 
      || to.path === '/resetpwd' || to.path === '/nav/link' || to.path === '/practical' || to.path === '/analysis')
  {
    next()
  } else {
    if (!window.sessionStorage.getItem('token')) {
      next('/logon')
    } else {
      next()
    }
  }
})

export default router
