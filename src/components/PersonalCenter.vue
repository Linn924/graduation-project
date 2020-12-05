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
            <div class="main-right"></div>
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
                {id:2,className:'el-icon-thumb',title:'点赞文章'}
            ],
            currentIndex:0,//当前导航下标
        }
    },
    methods:{
        //切换导航
        switchNav(id){
            this.currentIndex = id
        }
    }
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
    height: 300px;
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
}
.changeColor{
    color: #2468F2!important;
}
</style>