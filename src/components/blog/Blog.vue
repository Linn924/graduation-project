<template>
    <div id="blog">

        <!-- 回到顶部 写在顶部-->
        <el-backtop><i class="el-icon-caret-top"></i></el-backtop>

        <!-- 头部导航 -->
        <header>
            <section>
                <a href="javascript:void(0);">
                    <img src="https://s3.ax1x.com/2020/12/02/D5a7qK.jpg" alt="">
                    <span>Simon</span>
                </a>
                <nav>
                    <li>
                        <router-link to="/blog/articlelist" 
                            @click.native="isSearch?getBlogAgain():''">
                            <i class="el-icon-s-home"></i>
                            <span>主页</span>
                        </router-link>
                    </li>
                    <!-- <li>
                        <router-link to="/me">
                            <i class="el-icon-user-solid"></i>
                            <span>关于我</span>
                        </router-link>
                    </li> -->
                </nav>
                <div class="not-logon" v-show="!status">
                    <span>未登录，请</span>
                    <router-link to="/logon">登录</router-link>
                </div>
                <div class="logon" v-show="status">
                    <span>欢迎您，</span>
                    <span @mouseenter="personBoxShow=true">
                        {{username}}
                    </span>
                </div>
            </section>
            <section>
                <img src="https://s3.ax1x.com/2020/12/02/D5a7qK.jpg" alt="">
                <div class="icon">
                    <i class="el-icon-search" @click="searchBox = true"></i>
                    <el-dropdown placement="bottom-start" trigger="click">
                        <span class="el-dropdown-link">
                            <i class="el-icon-s-operation"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <router-link to="/content" 
                                    @click.native="isSearch?getBlogAgain():''">
                                    <i class="el-icon-s-home" style="color:#000"></i>
                                    <span style="color:#000">home</span>
                                </router-link>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <router-link to="/me">
                                    <i class="el-icon-user-solid" style="color:#000"></i>
                                    <span style="color:#000">About</span>
                                </router-link>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </section>
        </header>

        <!-- 内容区域 -->
        <main>
            <section>
                <!-- 左侧边栏 -->
                <aside class="aside-left">
                    <!-- 个人简介 -->
                    <div class="me">
                        <header>
                            <img src="https://s3.ax1x.com/2020/12/02/D5a7qK.jpg" alt="">
                            <div><span>爱开发</span><span>爱学习</span></div>
                        </header>
                        <main>
                            <span>Simon</span>
                            <span>Learner &amp; Developer</span>
                            <span class="el-icon-location-outline">江苏 · 南京</span>
                        </main>
                        <footer>
                            <header>
                                <div><span>{{total}}</span><span>文章</span></div>
                                <div><span>{{sortCount}}</span><span>分类</span>
                                </div>
                            </header>
                            <footer>
                                <a href="https://github.com/Linn924">
                                    <el-tooltip content="GitHub" placement="right">
                                        <img src="https://s1.ax1x.com/2020/05/01/JXhUOK.png" alt="">
                                    </el-tooltip>
                                </a>
                                <a href="https://mp.csdn.net/console/article">
                                    <el-tooltip content="CSDN" placement="left">
                                        <img src="https://s1.ax1x.com/2020/05/01/JXhclt.png" alt="">
                                    </el-tooltip>
                                </a>
                            </footer>
                        </footer>
                    </div>
                </aside>
                <!-- 博客文章 -->
                <router-view ref="article"></router-view>
                <!--右侧边栏 -->
                <aside class="aside-right">
                    <!-- 搜索区域 -->
                    <div class="search">
                        <span><i class="el-icon-search"></i>搜索</span>
                        <div class="line"></div>
                        <el-input size="small" placeholder="按标题搜索" clearable
                            v-model="value" @keyup.enter.native="enter" suffix-icon="el-icon-search">
                        </el-input>
                    </div>
                    <!-- 分类区域 -->
                    <div class="sort">
                        <span><i class="el-icon-folder-opened"></i>分类</span>
                        <div class="line"></div>
                        <section>
                            <button v-for="item in sortList" :key="item.id" 
                                @click="clickSort(item)">
                                {{item.sort_name}}
                            </button>
                        </section>
                    </div>
                    <!-- 最近文章区域 -->
                    <article>
                        <span><i class="el-icon-document"></i>最近文章</span>
                        <div class="line"></div>
                        <nav>
                            <li v-for="item in blogList" :key="item.id">
                                <label @click="changePath(item)">
                                    {{item.title}}
                                </label>
                            </li>
                        </nav>
                    </article>                      
                    <!-- 友情链接 -->
                    <div class="link">
                        <span><i class="el-icon-link"></i>个人链接</span>
                        <div class="line"></div>
                        <nav>
                            <a href="http://home.linncode.cn" target="__blank">西蒙首页</a>
                            <a href="http://nav.linncode.cn" target="__blank">西蒙导航</a>
                        </nav>
                    </div>
                </aside>  
            </section>
        </main>
        
        <!-- 底部区域 -->
        <footer>         
            <section>
                <p>© 2020 - 2021 Simon 版权所有</p>
                <p>苏ICP备20023864号</p>
            </section>
        </footer>
        
        <!-- 搜索框对话盒子(手机模式) -->
        <el-dialog :visible.sync="searchBox" title="搜索框" width="200px">
            <el-input size="small" placeholder="回车搜索" clearable
                v-model="value" @keyup.enter.native="enter" suffix-icon="el-icon-search">
            </el-input>
        </el-dialog>

        <div class="person-box" @mouseenter="personBoxShow=true" 
            @mouseleave="personBoxShow=false" v-show="personBoxShow">
            <div class="person-center">
                <router-link to="/personalcenter">个人中心</router-link>
            </div>
            <div class="logout" @click="logout">
                <span>登出</span>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    inject:['reload'],//注入reload(重载)方法
    data(){
        return {
            username:'', //用户登录名称         
            status:false,//登录状态,未登录  
            personBoxShow:false,//个人中心盒子隐藏 
            blogList:[],
            total:0,
            sortCount:0,//分类总数
            sortList:[],//分类数据
            value:'',//搜索框数据
            isSearch:false,//是否点击了搜索
            searchBox:false,//是否显示搜索盒子(在手机模式下)
        }
    },
    created() {
        this.getSTData()
        this.getBlogAllData()
        this.getUname()
         //禁止鼠标右键点击
        document.oncontextmenu =  () => {event.returnValue = false}
    },
    methods: {
         //获取登录名称
        getUname(){
            this.username = sessionStorage.getItem('username')
            this.status = sessionStorage.getItem('username') !== null ? true : false
        },
        //获取博客最近文章
        async getBlogAllData(){
            const {data:res} = await this.axios.get('blogAllData')
            if(res.code != 200) return this.$message({message: `${res.tips}`,type: 'error',duration:1000})
            this.total = res.total
            this.blogList = res.data
        },
        //搜索框按回车搜索文章
        enter(){
            this.$store.commit("setValue",this.value)
            this.$refs.article.getBlogData()
            this.value = ''
            this.isSearch = true
            this.searchBox = false
        },
        //获取分类与标签数据
        async getSTData(){
            const {data:res} = await this.axios.get("blogdatadetail")
            if(res.code != 200) return this.$message({message: `${res.tips}`,type: 'error',duration:1000})
            this.sortList = res.data.data
            this.sortCount = this.sortList.length
        },
        //监听要查看的博客地址
        changePath(item){
            this.$store.commit('setMdname',item.mdname)
            this.$router.push({path:`/blog/article?${item.mdname}`})
        },
        //跳转路由
        clickSort(data){
            this.$router.push(`/blog/articlelist?sort=${data.sort_name}&id=${data.id}`)
        }, 
        getBlogAgain(){
            this.$refs.article.getBlogData()
            this.isSearch = false
        },
        //登出
        logout(){
            window.sessionStorage.clear()
            this.reload()
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/blog.css';
#blog{
    width: 100vw;
    min-width: 375px;
    min-height: 100vh;
    position: relative;
    >header{
        min-height: 60px;
        background-color: #fff;
        box-shadow: 0 2px 10px 0 rgba(0,0,0,0.12);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    >main{
        padding: 2vh 0 5vh 0;
        >section{
            width: 80vw;
            box-sizing: border-box;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 2fr 6fr 2fr;
            grid-template-rows: auto auto;
            gap: 20px;
        }
    }
    >footer{
        box-sizing: border-box;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
    }
    .el-backtop{
        bottom: 20px!important;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 5px;
        color:#1e90ff;
    }
}
#blog>header{
    section:first-child{
        width: 80vw;
        display: grid;
        grid-template-columns:140px 1fr 130px;
        grid-template-rows: 1fr;
        margin: 0 auto;
        >a{
            display: flex;
            align-items: center;
            margin-right: 2vw;
            &:hover span{color: #1E90FF;}
            img{
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-right: 20px;
            }
            span{
                color: #000;
                font-size: 20px;
                transition: color .25s; 
            }
        }
        nav{
            display: flex;
            list-style: none;
            line-height: 60px;
            li{
                margin-right: 20px;
                a{
                    color: #000;
                    transition: color .5s;
                    &:hover{color: #1E90FF!important;}
                    font-size: 15px;
                    >i{margin-right: 2px;}
                }
                
            }
        }
        .not-logon{
            display: flex;
            justify-content: center;
            align-items: center;
            a{color: #2468F2!important;}
        }
        .logon{
            display: flex;
            justify-content: flex-end;
            align-items: center;
            span:last-child{
                color: #2468F2;
                cursor: pointer;
            }
        }
    }
    section:last-child{
        width: 80vw;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 20px;
        }
        .icon i{
            font-size: 20px;
            cursor: pointer;
            transition: all .25s;
            &:first-child{margin-right: 20px;}
            &:hover{color: #1E90FF;}
        }
    }
}
#blog>main{
    aside:first-child{
        width: 100%;
        .me{
            min-height: 330px;
            padding: 20px 0 0 0;
            background-color: rgba(255, 255, 255, 0.4);
            border-radius: 8px;
            box-shadow: 0 2px 10px 0 rgba(0,0,0,0.12);
            >header{
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100px;
                img{
                    width: 100px;
                    height: 100px;
                    margin-right: 40px;
                    border-radius: 5px;
                }
                div{
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                    color: #000;
                    font-size: 14px;
                    span:nth-child(2){margin: 10px 0;}
                }
            }
            main{
                display: flex;
                flex-direction: column;
                align-items: center;
                margin: 20px 0;
                span{margin-bottom: 8px;color: #000;}
            }
            >footer{
                header{
                    display: flex;
                    border-top: 1px solid #ECEFF2;
                    border-bottom: 1px solid #ECEFF2;
                    div{
                        width: 50%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        padding: 8px 0;
                        &:first-child{border-right: 1px solid #ECEFF2;}
                    }
                }
                footer{
                    display: flex;
                    justify-content: space-around;
                    margin-top: 10px;
                    img{width: 30px;height: 30px;border-radius: 50%;}
                }
            }
        }
    }
    aside:last-child{
        width: 100%;
        .search{
            min-height: 100px;
            background-color: rgba(255, 255, 255, 0.4);
            border-radius: 8px;
            box-shadow: 0 2px 10px 0 rgba(0,0,0,0.12);
            box-sizing: border-box;
            padding: 10px 10px;
            span>i{margin-right: 5px;}
            .line{border: 1px solid #70A1FF;margin: 10px 0;}
        }
        .sort{
            min-height: 160px;
            margin-top: 10px;
            background-color: rgba(255, 255, 255, 0.4);
            border-radius: 8px;
            box-shadow: 0 2px 10px 0 rgba(0,0,0,0.12);
            box-sizing: border-box;
            padding: 10px 10px;
            transition: all .5s;
            span>i{margin-right: 5px;}
            .line{border: 1px solid #70A1FF;margin: 10px 0;}
            section{
                display: grid;
                place-content: center center;
                grid-template-columns: repeat(3,1fr);
                gap: 10px;
                button{
                    height: 25px;
                    border-radius: 4px;
                    border: none;
                    background-color: rgba(231,76,60);
                    color: #fff;
                    font-size: 12px;
                    cursor: pointer;
                    outline: none;
                    transition:all .2s;
                    &:nth-child(2n+1){background-color: rgba(112,161,225);}
                    &:nth-child(3n){background-color: rgba(46,204,113);}
                    &:hover{&:hover{opacity: 0.8;}}
                }
            }
        }
        article{
            background-color: rgba(255, 255, 255, 0.5);
            border-radius: 8px;
            box-shadow: 0 2px 10px 0 rgba(0,0,0,0.12);
            box-sizing: border-box;
            padding: 10px 10px;
            margin: 10px 0;
            transition: all .5s;
            span>i{margin-right: 5px;}
            .line{border: 1px solid #70A1FF;margin-top: 10px;}
            li{
                list-style: none;
                line-height: 30px;
                border-bottom: 1px solid #ccc;
                font-size: 14px;
                &:last-child{border: 0;}
                label{
                    transition: color .25s;
                    cursor: pointer;
                    &:hover{color: #1e90ff;}
                }
            }
        }
        .link{
            background-color: rgba(255, 255, 255, 0.5);
            border-radius: 8px;
            box-shadow: 0 2px 10px 0 rgba(0,0,0,0.12);
            box-sizing: border-box;
            padding: 10px 10px;
            margin: 10px 0;
            transition: all .25s;
            span>i{margin-right: 5px;}
            .line{border: 1px solid #70A1FF;margin: 10px 0;}
            nav{
                a{
                    color: #000;
                    transition: all .25s;
                    &:hover{color: #1e90ff;}
                    &:last-child{margin: 0 0 0 10px;}
                }
            }
        }
    }  
}
#blog>footer{
    section{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center; 
        p{
            margin-bottom: 5px;
            font-size: 12px;
        }  
    }
}
.person-box{
    position: absolute;
    top: 5px;
    right: 80px;
    z-index: 999;
    width: 100px;
    height: 50px;
    background-color: #fff;
    box-shadow: 0 2px 10px 0 rgba(0,0,0,0.12);
    display: flex;
    flex-direction: column;
    font-size: 14px;
    border-radius: 5px;
    &::before{
        content: "";
        position: absolute;
        top: 20px;
        left:-10px;
        width: 0;
        height: 0;
        border-width:6px 10px 6px 0;
        border-style: solid;
        border-color: transparent #578BF5 transparent transparent;
        box-shadow: 0 2px 10px 0 rgba(0,0,0,0.12);
    }
    div{
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        cursor: pointer;
        &:hover{color: #578BF5;}
    }
    div:first-child{
        border-bottom: 1px solid #ccc;
        a{
            color: #000;
            &:hover{color: #578BF5;}
        }
    }
}
</style>