<template>
    <div id="nav">

        <!-- 回到顶部 必须写在首位-->
        <el-backtop><i class="el-icon-caret-top"></i></el-backtop>

        <!-- 左侧栏 -->
        <aside :class="flag?'switchColor enterAside':''">
            <!-- logo图标 -->
            <div class="logo">
                <img src="https://s3.ax1x.com/2020/12/02/D5a7qK.jpg">
                <transition name="logo">
                    <span v-show="!isCollapse">Simon</span>
                </transition>
            </div>
            <!-- 折叠栏一 -->
            <el-menu :class="flag?'one switchColor':'one'" :collapse="isCollapse" :unique-opened="true">
                <el-submenu v-for="item in asideData1" :key="item.id" :index="item.id">
                    <template slot="title">
                        <i :class="item.className" :style="{'margin':item.id == 5 
                            || item.id == 6 ? '0 10px 0 5px': ''}"></i>
                        <span slot="title" :style="{'color':flag?'#fff':'#000'}">{{item.title}}</span>
                    </template>
                    <el-menu-item-group :class="flag?'switchColor enterAside':''">
                        <span slot="title">{{item.title}}</span>
                        <el-menu-item v-for="i in item.children" :key="i.id" :index="`${item.id}-${i.id}`" 
                            @click="location(item.id,i.id,i.flag)" :style="{'color':flag?'#fff':'#000'}">
                        {{i.title}}</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
            <!-- 折叠栏二 -->
            <el-menu :class="flag?'two switchColor':'two'" :collapse="isCollapse">
                <el-menu-item v-for="item in asideData2" :key="item.id" :index="item.id" 
                    :style="{'color':flag?'#fff':'#000'}" @click="openWebsite(item.url)">
                    <i :class="item.className"></i>
                    <span slot="title">{{item.title}}</span>
                </el-menu-item>
            </el-menu>
        </aside>

        <!-- 蒙版 -->
        <transition name="mengban">
            <div class="mengban" v-show="drawer" @click="drawer = !drawer"></div>
        </transition>

        <!-- 移动端状态下的导航抽屉 -->
        <transition name="drawer">
            <div class="drawer" v-show="drawer">
                <!-- logo图标 -->
                <div class="logo">
                    <img src="https://s3.ax1x.com/2020/12/02/D5a7qK.jpg">
                    <transition name="logo">
                        <span>Simon</span>
                    </transition>
                </div>
                <el-menu :class="flag?'one switchColor':'one'" :unique-opened="true">
                    <el-submenu v-for="item in asideData1" :key="item.id" :index="item.id">
                        <template slot="title">
                            <i :class="item.className" :style="{'margin':item.id == 5 
                                || item.id == 6 ? '0 10px 0 5px': ''}"></i>
                            <span slot="title" :style="{'color':flag?'#fff':'#000'}">{{item.title}}</span>
                        </template>
                        <el-menu-item-group :class="flag?'switchColor enterAside':''">
                            <span slot="title">{{item.title}}</span>
                            <el-menu-item v-for="i in item.children" :key="i.id" :index="`${item.id}-${i.id}`" 
                                @click="location(item.id,i.id,i.flag)" :style="{'color':flag?'#fff':'#000'}">
                            {{i.title}}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
                <!-- 折叠栏二 -->
                <el-menu :class="flag?'two switchColor':'two'">
                    <el-menu-item v-for="item in asideData2" :key="item.id" :index="item.id" 
                        :style="{'color':flag?'#fff':'#000'}" @click="openWebsite(item.url)">
                        <i :class="item.className"></i>
                        <span slot="title">{{item.title}}</span>
                    </el-menu-item>
                </el-menu>
            </div>
        </transition>

        <!-- 右边内容区域 -->
        <section :style="{'padding-left':isCollapse ?'64px':'200px'}">
            <!-- 顶部导航 -->
            <header :class="flag?'black':'white'">
                <div class="computer">
                    <img src="https://s3.ax1x.com/2020/12/02/D5a7qK.jpg">
                    <i class="el-icon-s-unfold" @click="showCollapse" v-show="show"></i>
                    <i class="el-icon-s-fold" @click="hideCollapse" v-show="hide"></i>
                    <nav>
                        <li><router-link to="/blog/articlelist"><i class="el-icon-s-home"></i>
                            主页</router-link></li>
                        <li><router-link to="/home"><i class="el-icon-s-custom"></i>
                            首页</router-link></li>
                    </nav>
                </div>
                <div class="phone">
                    <img src="https://s3.ax1x.com/2020/12/02/D5a7qK.jpg">
                    <i class="el-icon-s-operation" @click="drawer = !drawer"></i>
                </div>
            </header>

            <!-- 中间链接内容-->
            <main><router-view ref="Link" :flag="flag"></router-view></main>

        </section>

        <!-- 右下角天气 -->
        <div class="weatherBox">
            <!-- 天气盒子 -->
            <div class="weather">
                <!-- <i :class="flag?'el-icon-heavy-rain backtopBlack':'el-icon-heavy-rain backtopWhite'"  -->
                <i :class="className" 
                    @mouseenter="showWeather = true" @mouseleave="showWeather = false"></i>
                <div v-show="showWeather" @mouseenter="showWeather = true" 
                    @mouseleave="showWeather = false">
                    <header><label>{{city}}</label><span>简约天气</span></header>
                    <main><span>{{wendu}}</span><span>{{type}}</span>
                    </main>
                    <footer>
                        <table>
                            <tr v-for="(item,index) in weatherList" :key="index">
                                <td align="center">{{item.date}}</td>
                                <td align="center">{{item.type}}</td>
                                <td align="center">{{item.wendu}}</td>
                                <td align="center">{{item.fengxiang}}</td>
                            </tr>
                        </table>
                    </footer>
                </div>
            </div>
            <!-- 切换主题 -->
            <!-- <div class="toggleMode">
                <el-tooltip effect="dark" content="日间模式" placement="left">
                    <i :class="flag?'el-icon-sunny backtopBlack':'el-icon-sunny backtopWhite'" 
                    v-show="sunny" @click="switchMoon"></i>
                </el-tooltip>
                <el-tooltip effect="dark" content="夜间模式" placement="left">
                    <i :class="flag?' el-icon-moon backtopBlack':'el-icon-moon backtopWhite'" 
                    v-show="moon" @click="switchSunny"></i>
                </el-tooltip>
            </div> -->
        </div>

    </div>
</template>

<script>
export default {
    data(){
        return {
            asideData1:[//左侧导航数据1
                {
                    id:0,
                    className:'el-icon-location',
                    title:'常用站点',
                    children:[
                        {id:0,title:'阅读',flag:false},
                        {id:1,title:'购物',flag:false},
                        {id:2,title:'直播',flag:false},
                        {id:3,title:'国外',flag:false},
                        {id:4,title:'视频',flag:false},
                        {id:5,title:'工具',flag:false}
                    ]
                },
                {
                    id:1,
                    className:'el-icon-video-camera-solid',
                    title:'视频直播',
                    children:[
                        {id:0,title:'免费在线',flag:true},
                        {id:1,title:'高清下载',flag:true},
                        {id:2,title:'追剧',flag:false},
                        {id:3,title:'动漫',flag:false},
                        {id:4,title:'解析',flag:false}
                    ]
                },
                {
                    id:2,
                    className:'el-icon-zoom-in',
                    title:'资源搜索',
                    children:[
                        {id:0,title:'网盘搜索',flag:true},
                        {id:1,title:'BT搜索',flag:true},
                        {id:2,title:'磁力软件',flag:true}
                    ]
                },
                {
                    id:3,
                    className:'el-icon-s-platform',
                    title:'软件游戏',
                    children:[
                        {id:0,title:'精品软件',flag:true},
                        {id:1,title:'安卓',flag:false},
                        {id:2,title:'苹果',flag:false},
                        {id:3,title:'游戏',flag:false},
                        {id:4,title:'浏览器类',flag:true}
                    ]
                },
                {
                    id:4,
                    className:'el-icon-s-order',
                    title:'阅读漫画',
                    children:[
                        {id:0,title:'阅读小说',flag:true},
                        {id:1,title:'免费漫画',flag:true}
                    ]
                },
                {
                    id:5,
                    className:'fa fa-music',
                    title:'音乐动听',
                    children:[
                        {id:0,title:'在线音乐',flag:true},
                        {id:1,title:'无损音乐',flag:true},
                        {id:2,title:'音乐软件',flag:true}
                    ]
                },
                {
                    id:6,
                    className:'fa fa-wrench',
                    title:'实用工具',
                    children:[
                        {id:0,title:'综合工具',flag:true},
                        {id:1,title:'小功能类',flag:true},
                        {id:2,title:'文件处理',flag:true},
                        {id:3,title:'图片处理',flag:true}
                    ]
                },
                {
                    id:7,
                    className:'el-icon-edit',
                    title:'学习教育',
                    children:[
                        {id:0,title:'好好学习',flag:true},
                        {id:1,title:'文档学术',flag:true}
                    ]
                },
                {
                    id:8,
                    className:'el-icon-s-cooperation',
                    title:'办公素材',
                    children:[
                        {id:0,title:'PPT',flag:false},
                        {id:1,title:'图库',flag:false},
                        {id:2,title:'壁纸',flag:false},
                        {id:3,title:'图标',flag:false},
                        {id:4,title:'字体',flag:false},
                        {id:5,title:'配色',flag:false}
                    ]
                },
            ],
            asideData2:[//左侧导航数据2
                {id:0,className:'el-icon-notebook-1',title:'西蒙博客',url:'http://blog.linncode.cn'},
                {id:1,className:'el-icon-user',title:'西蒙首页',url:'http://home.linncode.cn'}
            ],
            city:'',//当前城市
            weatherList:[],//最近三天天气数据
            wendu:'',//当天平均温度
            type:'',//当天天气状态
            isCollapse: true,//默认折叠
            hide:false,//控制折叠
            show:true,//控制展开
            sunny:false,//控制切换到日间模式
            moon:true,//控制切换到夜间模式
            flag:false,//是否是日间模式
            showWeather:false,//是否展示天气
            drawer:false
        }
    },
    computed:{
        className(){
            let className = ''
            if(!this.flag){
                if(this.type == '晴'){
                    className = 'el-icon-sunny ' + 'backtopWhite'
                }else if(this.type == '多云'){
                    className = 'el-icon-cloudy ' + 'backtopWhite'
                }else{
                    className = 'el-icon-heavy-rain ' + 'backtopWhite'
                }
            }else{
                if(this.type == '晴'){
                    className = 'el-icon-sunny ' + 'backtopBlack'
                }else if(this.type == '多云'){
                    className = 'el-icon-cloudy ' + 'backtopBlack'
                }else{
                    className = 'el-icon-heavy-rain ' + 'backtopBlack'
                }
            }
            return className
        }
    },
    created() {
        this.getLoactionCity()//初始化前获取当前地址
        //禁止鼠标右键点击
        document.oncontextmenu =  () => {event.returnValue = false}
    },
    methods: {
        //展开折叠
        showCollapse(){
            this.isCollapse = false
            this.show = false
            this.hide = true
        },
        //关闭折叠
        hideCollapse(){
            this.isCollapse = true
            this.show = true
            this.hide = false
        },
        //锚点跳转
        location(fatherIndex,sonIndex,sonFlag){
            var ul = document.querySelectorAll('.item>div nav')[fatherIndex]
            var lis = ul.children
            window.scroll({top: ul.offsetTop - 135,behavior: 'smooth'})
            //调用子组件方法
            this.$refs.Link.clickNav(fatherIndex,sonIndex,sonFlag)
        },
        //打开个人链接
        openWebsite(url){
            window.open(url)
        },
        //切换到日间模式
        switchSunny(){
            this.moon = false
            this.sunny = true
            this.flag = true
        },
        //切换到夜间模式
        switchMoon(){
            this.moon = true
            this.sunny = false
            this.flag = false
        },
        //获取当前地址,使用jsonp解决跨域问题 (get请求)
        async getLoactionCity(){
            const data = await this.$jsonp('https://restapi.amap.com/v3/ip?key=b30eb9c64b4094a062fa5cce3b26496e')
            this.city = data.city
            this.getWeather(data.city)
        },
        //根据城市获取城市天气
        async getWeather(location){
            const {data:res} = await this.axios.get(`http://wthrcdn.etouch.cn/weather_mini?city=${location}`)
            if(res.status !== 1000) return this.$message.error('获取天气数据失败')
            const value = res.data.forecast.slice(0,3)
            this.handleWeatherData(value)
        },
        //处理天气数据
        handleWeatherData(value){
            value.map( (item,index) => {
                if(index == 0){item.date = '今天';}
                else if(index == 1){item.date = '明天';}
                else{item.date = '后天';}
                item.wendu = item.low.split(' ')[1] + '/' + item.high.split(' ')[1]
            })
            this.weatherList = value
            let high = Number(value[0].high.split(' ')[1].split('').filter(item => item !== '℃' && item).join(''))
            let low = Number(value[0].low.split(' ')[1].split('').filter(item => item !== '℃' && item).join(''))
            this.wendu = (high + low) / 2 + '℃'
            this.type = value[0].type
        }
    }
}
</script>

<style lang="less" scoped>

#nav{
    display: flex;
    position: relative;
    >aside{
        height: 100vh; 
        background-color: #f9f9f9;
        position: fixed;
        display: flex;
        flex-direction: column;
    }
    .drawer{
        z-index: 999;
        top: 0;
        height: 100vh; 
        background-color: #f9f9f9;
        position: fixed;
        display: flex;
        flex-direction: column;
    }
    .mengban{
        height: 100vh;
        width: 100vw;
        position: fixed;
        background-color: rgba(0,0,0, .5);
        z-index: 998;
    }
    >section{
        width: 100vw;
        transition: all .5s;
        box-sizing: border-box;
    }
    .weatherBox{
        position: fixed;
        top: 92vh;
        right: 25px;
        box-sizing: border-box;
        height: 100vh;
        display: flex;
        flex-direction: column;
        z-index: 999;
    }
}

#nav>aside,.drawer{
    .logo{
        margin: 10px auto;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        img{width: 50px;height: 50px;border-radius: 50%;}
        span{margin-left: 10px;color: #1E90FF;}
    }
    .one:not(.el-menu--collapse) {
        width: 200px;
        border: 0;
        max-height: 750px;
        overflow-y: auto;
        overflow-x: hidden;
        &::-webkit-scrollbar {width: 6px;}
        &::-webkit-scrollbar-thumb {background-color: #ddd;border-radius: 3px;}
        &::-webkit-scrollbar-track{background-color: #fff;}
    }
    .one,.two{border: 0;background-color: #f9f9f9;}
    .two{margin-top: auto;}
    .el-menu-item{&:hover{color: #1E90FF!important;}}
}

#nav>section{
    header{
        width: 100%;
        height: 7.5vh;
        position: fixed;
        display: flex;
        align-items: center;
        z-index: 997;
        .computer{
            display: flex;
            align-items: center;
            position: relative;
            >i{
                font-size: 24px;
                color: #888888;
                transition: color .25s;
                &:hover{color: #1E90FF!important;}
                margin: 0 20px 0 20px;
                cursor: pointer;
            }
            img{width: 50px;height: 50px;border-radius: 50%;display: none;}
            nav{
                display: flex;
                list-style: none;
                li{margin-right: 20px;
                    a{
                        color: #000;
                        transition: color .25s;
                        cursor: pointer;
                        &:hover{color: #1E90FF!important;}
                        font-size: 14px;
                        i{margin-right: 2px;}
                    }
                    
                }
            }
        }
        .phone{
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            img{width: 50px;height: 50px;border-radius: 50%;margin-left: 20px;}
            >i{
                font-size: 24px;
                color:#1E90FF;
                margin: 0 20px 0 20px;
                cursor: pointer;
            }
        }
    }
}

#nav .weatherBox{
    i{
        padding: 12px 12px;
        background-color: #eee;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 2px 10px 0 rgba(0,0,0,0.12);
        transition: color .25s;
    }
    .toggleMode{
        i:first-child:hover{color: #fff!important;}
        i:last-child:hover{color: #000!important;}
    }
    .weather{
        position: relative;
        >div{
            position: absolute;
            top: 50px;
            left: -1px;
            transform: translate(-100%,-100%);
            width: 270px;
            height: 450px;
            border-radius: 5px;
            padding: 10px 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background-color: rgba(0,0,0, .2);
            backdrop-filter: blur(2px);
            background: url(https://s1.ax1x.com/2020/10/08/00iVJO.jpg) no-repeat center;
            background-size: cover;
            z-index: 999;
            header{
                display: flex;
                justify-content: space-between;
                color: #fff;
                font-size: 14px;
            }
            main{
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: #fff;
                padding-bottom:10px ;
                span:first-child{font-size: 50px;}
                span:last-child{
                    font-size: 14px;
                    background-color: #1e90ff;
                    border-radius: 5px;
                    padding: 2px 5px;
                }
                border-bottom: 1px solid #fff;
            }
            footer{
                color: #fff;
                td{width: 25%;}
            }
        }
        i{margin: 10px 0;}
    }
}

.backtopBlack{background-color: #363738!important;color: #AAA!important;}
.backtopWhite{background-color: #fff!important;color: #777!important;}

.el-backtop{
    color: #777;
    font-size: 14px;
    right: 25px!important;
    bottom: 80px!important;
    width: 40px;
    height: 40px;
    i{padding: 14px 15px;border-radius: 50%;}
}
header.black{
    a{color: #fff!important;}
}
.black::before{
    content: '';
    backdrop-filter: blur(5px);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    background-color: rgba(0,0,0, .2);
    background-attachment: fixed;
}
.white::before{
    content: '';
    backdrop-filter: blur(5px);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    background-color: rgba(253,253,253, .8);
    background-attachment: fixed;
}


@keyframes drawerShow{from{left: -200px;}to{left: 0;}}
@keyframes drawerHide{from{left: 0;}to{left: -200px;}}
.switchColor{background-color: #2C2E2F!important;}
.logo-enter,.logo-leave-to{opacity: 0;}
.logo-enter-active{transition: all 1s;}
.logo-leave-active{transition: all 0.2s;}
.drawer-enter{
    animation: drawerShow 1s linear forwards;
    opacity: 0;
}
.drawer-leave-to{
    animation: drawerHide 0.4s linear forwards;
    opacity: 0;
}
.drawer-enter-active{transition: all 1s;}
.drawer-leave-active{transition: all 0.4s;}
.mengban-enter,.mengban-leave-to{opacity: 0;}
.drawer-enter-active{transition: all 1s;}
.drawer-leave-active{transition: all 0.4s;}


.enterAside{
    div.el-submenu__title:hover{
        span{color: #1e90ff!important;}
    }
    li.el-menu-item:hover{
        background-color: #1B1D1F!important;
        color: #1e90ff!important;
    } 
} 
@media screen and (max-width: 760px) {
    #nav>aside,#nav>section>header .computer,.weatherBox{
        display: none!important;
    }
    #nav>section>header .computer>img{
        display: block;
        margin-right: 20px;
    }
    #nav>section{
        padding-left: 0!important;
    }
    #nav>.el-backtop{
        right: 18px!important;
        bottom: 20px!important;
    }
}
@media screen and (min-width: 761px) { 
    section header .phone{
        display: none!important;
    }
}
</style>