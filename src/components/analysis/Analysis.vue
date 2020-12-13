<template>
    <div class="analysis">
        <Header :isSearch="false"></Header>
        <main>
            <div class="main-left">
                博客排行榜
            </div>
            <div class="main-right">
                <div class="title">
                    <i class="el-icon-collection"><span>评论</span></i>
                    <span>热榜</span>
                </div>
                <div class="line"></div>
                <table>
                    <tr v-for="(item,index) in commentLeaderboard" :key="index">
                        <td style="width:20px">{{index + 1}}</td>
                        <td>{{item.username}}：{{item.content}}</td>
                        <td style="width:170px" align="center">{{item.date | date}}</td>
                        <td style="width:60px" align="right">{{item.agree_count}}<span>点赞</span></td>
                    </tr>
                </table>
                <div id="echarts" style="width: 100%;height:400px;"></div>
            </div>
        </main>
        <Footer></Footer>
    </div>
</template>

<script>
import _ from 'lodash'
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
            commentLeaderboard:[],
            options: {
                title: {
                    text: '统计分析用户得赞数'
                },
                series : [
                    {
                        type: 'pie',
                        radius: '55%',
                        data:[
                            
                        ],
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
        }
    },
    created(){
        this.getCommentLeaderboard()
    },
    methods:{
        async getCommentLeaderboard(){
            const {data:res} = await this.axios.get('commentLeaderboard')
            if(res.code !== 200) return this.$message({message:`${res.tips}`,type:'error',duration:1000,offset:5})
            this.commentLeaderboard = res.data
            this.dealEchartsData(res.data2)
        },
        //处理echarts数据与本地数据合并
        dealEchartsData(data){
            data.forEach(item => {
                let obj = {
                    value:500 + item.praised * 50,
                    name:item.username
                }
                this.options.series[0].data.push(obj)
            })
            var myChart = echarts.init(document.getElementById('echarts'))
            myChart.setOption(this.options)
        }
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
    height: 85vh;
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
        height: 80vh;
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
    overflow: hidden;
    &:hover{overflow-y: auto;}
    &::-webkit-scrollbar {width: 6px;}
    &::-webkit-scrollbar-thumb {background-color: #ddd;border-radius: 3px;}
    &::-webkit-scrollbar-track{background-color: #fff;}
}
</style>