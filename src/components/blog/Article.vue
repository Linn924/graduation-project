<template>
    <div id="article">
        <!-- 博客 -->
        <article v-html="html" v-highlight class="markdown-body md"></article>
        <!-- 评论 -->
        <Comment :commentList="commentList" :id="blog_id" :getBlogComment="getBlogComment"></Comment>
    </div>
</template>

<script>
import showdown from 'showdown'
import Comment from './Comment'
export default {
    components:{
        Comment,//评论组件
    },
    data(){
        return {
           html:'',//当前博客
           commentList:[],//所有与当前博客相关的评论
           blog_id:Number,//当前博客id
        }
    },
    watch: {
        $route(to,from){//路由变化再次调用方法
            this.getmd()
        }
    },
    created() {
        this.getmd()
    },
    methods: {
        //获取md文档博客数据
        async getmd(){
            var converter = new showdown.Converter()
            var url = window.location.href;
            var mdname = url.split("?")[1];
            const {data:res} = await this.axios.get(`content/${mdname}`)
            if(res.code != 200) return this.$message.error(`${res.tips}`)
            this.html = converter.makeHtml(res.data[0].content)
            window.sessionStorage.setItem('blog_id',res.data[0].id)
            this.blog_id = res.data[0].id
            this.getBlogComment(this.blog_id)
        },
        //根据当前博客id获取所有与当前博客相关的评论
        async getBlogComment(id){
            const {data:res} = await this.axios.get(`comments/${id}`)
            if(res.code != 200) return this.$message.error(`${res.tips}`)
            this.dealCommentData(res)
        },
        //处理获取到的与博客相关的评论
        dealCommentData(res){
            res.data.forEach((item,index) => {
                let arr = []
                res.data2.forEach(i => {
                    if(item.user_id === i.respondent_id){
                        arr.push(i)
                    }
                })
                item.children = arr
            })
            this.commentList = res.data
        }
        
    }
}
</script>

<style lang="less" scoped>
@import "../../assets/css/md.css";
#article{
    max-width: 100%;
    min-width: 100%;
    box-sizing: border-box;
    article{
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 3px;
        box-shadow: 0 2px 10px 0 rgba(0,0,0,0.12);
        margin-bottom: 10px;
        padding: 20px 20px;
        box-sizing: border-box;
        color: #565A5F;
    }
}
</style>