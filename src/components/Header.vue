<template>
    <header>
        <!-- 大屏幕下的头部 -->
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
                <li>
                    <router-link to="/analysis">
                        <i class="el-icon-s-data"></i>
                        <span>分析</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/practical">
                        <i class="el-icon-s-cooperation"></i>
                        <span>实用</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/nav">
                        <i class="el-icon-s-promotion"></i>
                        <span>导航</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/home">
                        <i class="el-icon-s-custom"></i>
                        <span>首页</span>
                    </router-link>
                </li>
            </nav>
            <div class="not-logon" v-show="!status">
                <span>未登录，</span>
                <router-link to="/logon">登录</router-link>
            </div>
            <div class="logon" v-show="status">
                <span>欢迎您，</span>
                <span @mouseenter="personBoxShow=true">
                    {{username}}
                </span>
            </div>
        </section>
        <!-- 个人中心盒子 -->
        <div class="person-box" @mouseenter="personBoxShow=true" 
            @mouseleave="personBoxShow=false" v-show="personBoxShow">
            <div class="person-center">
                <router-link to="/personalcenter">个人中心</router-link>
            </div>
            <div class="logout" @click="logout">
                <span>登出</span>
            </div>
        </div>
        <!-- 小屏幕下的头部 -->
        <section>
            <img src="https://s3.ax1x.com/2020/12/02/D5a7qK.jpg" alt="">
            <div class="icon">
                <i class="el-icon-search"></i>
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
</template>

<script>
export default {
    inject:['reload'],//注入重载方法
    props:{
        'getBlogAgain':Function,
        'isSearch':Boolean,
    },
    data(){
        return {
            username:'', //用户登录名称
            status:false,//登录状态         
            personBoxShow:false,//个人中心盒子隐藏 
        }
    },
    created(){
        this.getUserData()
    },
    methods:{
        //登出
        logout(){
            window.sessionStorage.clear()
            this.reload()
            this.$router.push('/blog/articlelist')
        },
        //获取用户信息及状态
        getUserData(){
            let userForm = JSON.parse(window.sessionStorage.getItem('userForm'))
            if(userForm === null){
                this.status = false
            }else{
                this.username = userForm.username
                this.status = true
            }   
        }
    }
}
</script>

<style lang="less" scoped>
header{
    min-height: 60px;
    background-color: #fff;
    box-shadow: 0 2px 10px 0 rgba(0,0,0,0.12);
    display: flex;
    justify-content: center;
    align-items: center;
    section:first-child{
        width: 80vw;
        display: grid;
        grid-template-columns:140px 1fr auto;
        grid-template-rows: 1fr;
        margin: 0 auto;
        >a{
            display: flex;
            align-items: center;
            margin-right: 2vw;
            &:hover span{color: #2468F2;}
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
                    &:hover{color: #2468F2!important;}
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
    .person-box{
        position: absolute;
        top: 50px;
        right: 190px;
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
            top: -10px;
            left:40px;
            width: 0;
            height: 0;
            border-width:0 10px 10px 10px;
            border-style: solid;
            border-color: transparent transparent #2468F2 transparent;
            box-shadow: 0 2px 10px 0 rgba(0,0,0,0.12);
        }
        div{
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
            cursor: pointer;
            &:hover{color: #2468F2;}
        }
        div:first-child{
            border-bottom: 1px solid #ccc;
            a{
                color: #000;
                &:hover{color: #2468F2;}
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
            &:hover{color: #2468F2;}
        }
    }
}
@media screen and (min-width:376px){
  header{
      position: sticky;
      top: 0;
      z-index: 998;
    }
}
@media screen and (max-width: 600px) {
  header section:first-child{
    display: none!important;
  }
}
@media screen and (min-width: 601px) {
  header section:last-child{
    display: none!important;
  }
}
</style>