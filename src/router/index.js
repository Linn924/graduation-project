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

const Home = () => import(/* webpackChunkName: "home" */ '../components//home/Home.vue')

Vue.use(VueRouter)

const routes = [
  { path: '*', component: NotFound },
  { path:'/', redirect: '/logon' },
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
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

export default router
