<template>
    <div class="personal-center">
        <Header :isSearch="false"></Header>
        <main>
            <div class="main-left">
                <nav>
                    <li v-for="item in navList" :key="item.id" @click="switchNav(item.id)"  
                        :class="currentIndex == item.id?'changeColor':''">
                        <i :class="item.className"></i>
                        <span>{{item.title}}</span>
                    </li>
                </nav>
            </div>
            <div class="main-right">
                <div class="personal-information" v-show="currentIndex == 0">
                    <div class="basic-data">
                        <div class="basic-data-item">
                            <span>昵称：</span>
                            <input type="text" v-model="username">
                            <span>修改</span>
                        </div>
                        <div class="basic-data-item">
                            <span>邮箱：</span>
                            <input type="text" v-model="email">
                            <span>修改</span>
                        </div>
                    </div>
                    <div class="fixed-data">
                        登录时间：{{logontime | date}}
                    </div>
                </div>
                <div class="comment-article" v-show="currentIndex == 1">
                    评论文章
                </div>
                <div class="fabulous-article" v-show="currentIndex == 2">
                    点赞文章
                </div>
                <div class="fabulous-article" v-show="currentIndex == 3">
                    收藏文章
                </div>
                <div class="fabulous-article" v-show="currentIndex == 4">
                    操作日志
                </div>
            </div>
        </main>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from './Header.vue'
import Footer from './Footer.vue'
export default {
    components:{
        Header,
        Footer
    },
    data(){
        return {
            navList:[//左侧导航
                {id:0,className:'el-icon-user',title:'个人信息'},
                {id:1,className:'el-icon-tickets',title:'评论文章'},
                {id:2,className:'el-icon-thumb',title:'点赞文章'},
                {id:3,className:'el-icon-star-off',title:'收藏文章'},
                {id:4,className:'el-icon-document-remove',title:'操作日志'},
            ],
            currentIndex:0,//当前导航下标
            username:'',//用户昵称
            email:'',//用户邮箱
            logontime:'',//登录时间
        }
    },
    created(){
        this.username = window.sessionStorage.getItem('username')
        this.email = window.sessionStorage.getItem('email')
        this.logontime = window.sessionStorage.getItem('logontime')
    },
    methods:{
        //切换导航
        switchNav(id){
            this.currentIndex = id
        }
    },
    
}
</script>

<style lang="less" scoped>
.personal-center{
    width: 100vw;
    min-height: 100vh;
    background-color: #F5F5F5;
}
main{
    box-sizing: border-box;
    padding: 2vh 0 5vh 0;
    width: 80vw;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.5fr 8.5fr;
    grid-template-rows: auto;
    gap: 20px;
}
.main-left{
    background-color: #fff;
    box-shadow: 0 10px 20px 0px rgba(0, 0, 0, .05);
    box-sizing: border-box;
    border-radius: 8px;
    height: 400px;
    nav{
        list-style: none;
        box-sizing: border-box;
        padding: 0 15px;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        li{
            flex: 1;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            cursor: pointer;
            border-bottom: 1px solid #ccc;
            span{margin-left: 5px;}
            &:hover{color:#2468F2;}
            &:last-child{border: none;}
        }

    }
}
.main-right{
    background-color: #fff;
    box-shadow: 0 10px 20px 0px rgba(0, 0, 0, .05);
    box-sizing: border-box;
    border-radius: 8px;
    padding: 50px;
}
.changeColor{
    color: #2468F2!important;
}
.personal-information{
    display: flex;
    .basic-data{
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-right: 1px solid #ccc;
    }
    .fixed-data{
        flex: 1;
        display: flex;
        justify-content: center;
    }
}
</style>