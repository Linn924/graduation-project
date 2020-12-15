<template>
    <div class="practical">
        <Header :isSearch="false"></Header>
        <main>
            <div v-for="n in 9" :key="n">
                <span>输入内容自动生成头像</span>
                <input type="text" v-model="value" placeholder="请输入内容">
                <avatar :username="value" v-show="value"></avatar>
            </div>
        </main>
        <Footer></Footer>
    </div>
</template>

<script>
import Avatar from 'vue-avatar'
import Header from '../Header.vue'
import Footer from '../Footer.vue'
export default {
    inject:['reload'],//注入重载方法
    components:{
        Header,
        Footer,
        Avatar
    },
    data(){
        return {
            value:'简约'
        }
    }
}
</script>

<style lang="less" scoped>
.practical{
    height: 100vh;
    main{
        width: 80vw;
        height: 85vh;
        margin: 20px auto;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-areas: 1fr 1fr 1fr;
        gap: 20px;
    }
}
main>div{
    box-sizing: border-box;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 2px 10px 0 rgba(0,0,0,0.12);
    border-radius: 3px;
    width: 100%;
}
main>div{
    display: flex;
    flex-direction: column;
    align-items: center;
    span{
        color: #2468F2;
        font-size: 18px;
    }
    input{
        border: 1px solid #ccc;
        box-sizing: border-box;
        padding-left: 5px;
        outline: none;
        width: 350px;
        height: 32px;
        border-radius: 3px;
        background-color: #fff;
        margin: 20px 0;
    }
}
</style>