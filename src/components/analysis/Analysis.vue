<template>
    <div class="analysis">
        <Header :isSearch="false"></Header>
        <main>
            <!-- 博客浏览量榜单 -->
            <div class="main-left">
                <div class="title">
                    <i class="el-icon-reading"><span>博客</span></i>
                    <span>热榜</span>
                </div>
                <div class="line"></div>
                <table>
                    <tr v-for="(item,index) in blogList" :key="index">
                        <td style="width:30px">{{index + 1}}</td>
                        <td @click="readBlogs(item)">{{item.title}}</td>
                        <td style="width:170px" align="center">{{item.date | date}}</td>
                        <td style="width:80px" align="right">{{item.pageviews}}<span>浏览</span></td>
                    </tr>
                </table>
                <div id="echarts" style="width: 100%;height:350px;"></div>
            </div>
            <!-- 用户评论点赞量榜单 -->
            <div class="main-right">
                <div class="title">
                    <i class="el-icon-collection"><span>评论</span></i>
                    <span>热榜</span>
                </div>
                <div class="line"></div>
                <table>
                    <tr v-for="(item,index) in commentList" :key="index">
                        <td style="width:30px">{{index + 1}}</td>
                        <td>{{item.username}}：{{item.content}}</td>
                        <td style="width:170px" align="center">{{item.date | date}}</td>
                        <td style="width:60px" align="right">{{item.agree_count}}<span>点赞</span></td>
                    </tr>
                </table>
                <div id="echarts2" style="width: 100%;height:350px;"></div>
            </div>
        </main>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '../Header.vue'
import Footer from '../Footer.vue'
export default {
    inject:['reload'],//注入重载
    components:{//私有组件
        Header,
        Footer
    },
    data(){
        return {
            commentList:[],//评论榜单
            blogList:[]//博客榜单
        }
    },
    created(){
        this.getCommentList()
        this.getBlogList()
    },
    methods:{
        //获取评论榜单
        async getCommentList(){
            const {data:res} = await this.axios.get('commentList')
            if(res.code !== 200) return this.$message({message:`${res.tips}`,type:'error',duration:1000,offset:5})
            this.commentList = res.data
            this.dealComments(res.data2)
        },
        //处理echarts数据与实时数据合并
        dealComments(data){
            let options = {
                title: {
                    text: '统计分析用户得赞数'
                },
                series : [
                    {
                        type: 'pie',
                        radius: '60%',
                        data:[],
                        roseType: 'angle',
                        label: {
                            normal: {
                                textStyle: {
                                    color: '#2468F2'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: '#2468F2'
                                }
                            }
                        }
                    }
                ]
            }
            data.forEach(item => {
                let obj = {
                    value:500 + item.praised * 50,
                    name:item.username
                }
                options.series[0].data.push(obj)
            })
            let myChart = echarts.init(document.getElementById('echarts2'))
            myChart.setOption(options)
        },
        //获取博客榜单
        async getBlogList(){
            const {data:res} = await this.axios.get('blogList')
            if(res.code !== 200) return this.$message({message:`${res.tips}`,type:'error',duration:1000,offset:5})
            this.blogList = res.data
            this.dealBlogs(res.data)
        },
        //处理echarts数据与实时数据合并
        dealBlogs(data){
            let options = {
                title: {
                    text: '统计分析博客浏览量'
                },
                series : [
                    {
                        type: 'pie',
                        radius: '60%',
                        data:[],
                        roseType: 'angle',
                        label: {
                            normal: {
                                textStyle: {
                                    color: '#2468F2'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: '#2468F2'
                                }
                            }
                        }
                    }
                ]
            }
            data.forEach(item => {
                let obj = {
                    value:500 + item.pageviews * 10,
                    name:item.title
                }
                options.series[0].data.push(obj)
            })
            let myChart = echarts.init(document.getElementById('echarts'))
            myChart.setOption(options)
        },
        //监听要查看的博客地址
        readBlogs(item){
            this.$store.commit('setMdname',item.mdname)
            this.$router.push({path:`/blog/article?${item.mdname}`})
            if(window.sessionStorage.token){
                this.saveOperateLog(item.title)
                this.addPageviews(item)
            }
        },
        //增加浏览量
        async addPageviews(data){
            let blogForm = {
                blog_id:data.id,
                pageviews:data.pageviews + 1
            }
            const {data:res} = await this.axios.put('blogsPageview',blogForm)
            if(res.code != 200) return this.$message({message: `${res.tips}`,type: 'error',duration:1000})
        },
        //操作日志
        saveOperateLog(content){
            let str = sessionStorage.getItem('operationlogArr')
            let operationlogArr = str == null ? [] : JSON.parse(str)
            let operationlogForm = {
                title:`您浏览了${content}这篇文章`,
                time:new Date()
            }
            operationlogArr.push(operationlogForm)
            sessionStorage.setItem('operationlogArr',JSON.stringify(operationlogArr))
        },
    }
}
</script>

<style lang="less" scoped>
.analysis{
    height: 100vh;
}
main{
    width: 80vw;
    margin: 20px auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: auto;
    gap: 20px;
    >div{
        box-sizing: border-box;
        padding: 50px;
        background-color: #fff;
        box-shadow: 0 2px 10px 0 rgba(0,0,0,0.12);
        border-radius: 3px;
        width: 100%;
        height: 85vh;
    }
}
main>div{
    display: flex;
    flex-direction: column;
    .title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 18px;
        box-sizing: border-box;
        i>span{margin-left: 5px;}
    }
    .line{
        width: 100%;
        border: 1px solid #EBEBEB;
        margin: 5px 0 15px 0;
    }
    table{
        box-sizing: border-box;
        width: 100%;
        border-spacing: 0 20px;
        table-layout: fixed;
        tr:hover{color: #2468F2;cursor: pointer;}
        tr,td{box-sizing: border-box;}
        tr:first-child{td:first-child{color: #F1403C;}}
        tr:nth-child(2){td:first-child{color: #F1403C;}}
        tr:nth-child(3){td:first-child{color: #F14094;}}
        td:first-child{color: #757587;}
        td:nth-child(2){
            padding-left: 5px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        td:last-child{
            color: #2468F2;
            span{color: #757587;margin-left: 5px;}
        }
    }
}
.main-left,.main-right{
    overflow-y: auto;
    &::-webkit-scrollbar {width: 6px;}
    &::-webkit-scrollbar-thumb {background-color: #ddd;border-radius: 3px;}
    &::-webkit-scrollbar-track{background-color: #fff;}
}
</style>