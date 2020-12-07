<template>
    <div class="comment">
        <div class="title-comment">
            <span>评论</span>
            <span>共10条评论</span>
            <div></div>
        </div>
        <div class="yours-comment">
            <div class="part-one">
                <img src="https://s3.ax1x.com/2020/12/02/D5a7qK.jpg" alt="">
                <div class="triangle"></div>
                <textarea placeholder="评论" maxlength=140></textarea>
            </div>
            <div class="part-two">
                <span>140</span>
                <button>评论</button>
            </div>
        </div>
        <div class="others-comment">
            <div class="title">
                <span>所有评论</span>
                <div></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    }
}
</script>

<style lang="less" scoped>
.comment{
    box-sizing: border-box;
    padding: 0 20px;
    height: 600px;
}
.title-comment{
    span:first-child{font-size: 18px;}
    span:nth-child(2){
        font-size: 12px;
        margin-left: 20px;
        color: #666;
    }
    div{
        border: 1px solid #2468F2;
        margin: 10px 0 20px 0;
    }
}
.yours-comment{
    .part-one{
        display: flex;
        box-sizing: border-box;
        position: relative;
        img{
            width: 60px;
            height: 60px;
            margin-right: 15px;
        }
        .triangle{
            position: absolute;
            top: 12px;
            left:65px;
            width: 0;
            height: 0;
            border-width:6px 10px 6px 0;
            border-style: solid;
            border-color: transparent #CDCDCD transparent transparent;
            &::after{
                content: "";
                position: absolute;
                top: -5px;
                left:3px;
                width: 0;
                height: 0;
                border-width:5px 8px 5px 0;
                border-style: solid;
                border-color: transparent #fff transparent transparent;
            }
        } 
        textarea{
            resize: none;
            width: 100%;
            border-color: #CDCDCD;
            border-radius: 2px;
            outline: #CDCDCD;
            padding: 3px 0 0 5px;
        }
    }
    .part-two{
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
        span{color: #666;font-size: 14px;}
        button{
            margin-left: 10px;
            height: 20px;
            width: 44px;
            color: #fff;
            background-color: #2468F2;
            border: none;
            outline: none;
            cursor: pointer;
            border-radius: 2px;
            font-size: 12px;
            &:hover{opacity: 0.8;}
        }
    }
}
.others-comment{
    .title{
        span{font-size: 14px;}
        div{border: 1px solid #CFCFCF;margin-top: 5px;}
    }
}
</style>