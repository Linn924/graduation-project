<template>
    <div class="analysis">
        <Header :isSearch="false"></Header>
        <main></main>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '../Header.vue'
import Footer from '../Footer.vue'
export default {
    inject:['reload'],//注入重载方法
    components:{
        Header,
        Footer
    },
    data(){
        return {

        }
    }
}
</script>

<style lang="less" scoped>

</style>