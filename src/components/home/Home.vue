<template>
    <div id="home" v-cloak>

        <!-- 背景图 -->
        <img :src="defaultImg" :style="{transform:flag?'scale(1.1)':'scale(1)'}">

        <!-- 遮罩 -->
        <div class="mask" :style="{'backgroundColor':flag?'rgba(0,0,0,.5)':''}"></div>
        
        <!-- 时间模块 -->
        <h1 @click="clickTime">{{currentTime}}</h1>
        
        <!-- 底部说明模块 -->
        <h5><span>@&nbsp;2020&nbsp;Simon</span>&nbsp;|&nbsp;<span>关于</span></h5>

        <!-- 搜索框模块 search -->
        <transition name="sameAnimateOne">
            <div class="search" v-show="isSearchShow"
                @mouseover="enlarge" @mouseout="narrow">

                <!-- 搜索框模块 -->
                <input type="text" :class="{enlarge:isEnlarge,narrow:isNarrow,changeBgColor:isChangeBgColor}"
                    placeholder="Search" v-model="inputValue" @keyup="search" @click="clickInput"
                    :style="{background:flagInput?'#fff':'rgba(255,255,255,.2)'}">

            </div>
        </transition>

        <!-- 搜索引擎模块 searchOptBox -->
        <transition name="sameAnimateOne">
            <div class="searchOptBox" v-show="isSearchOptBoxShow">

                <!-- 不同的搜索引擎 -->
                <span v-for="item in browserTypes" :key="item.id" @click="clickIcon(item.id)"
                    :class="browserIndex == item.id ? 'iconSpan':''">
                    <svg class="iconSmall smallIcon" aria-hidden="true">
                        <use :xlink:href="item.className"></use>
                    </svg>
                </span>

            </div>
        </transition>

        <!-- 关键词模块 keyWord -->
        <transition name="sameAnimateOne">
            <div class="keyWord"  v-show="searchList.length != 0">

                <!-- 关键词 -->
                <div v-for="(item,index) in searchList" 
                    :key="index" @click="clickKeyWords(item.url)">
                    {{item.title}}
                </div>

            </div>
        </transition>

        <!-- 格言模块 motto -->
        <transition name="sameAnimateOne">
            <div class="motto" v-show="isMottoShow"
                @mouseover="isMottoAuthorShow = true"
                @mouseout="isMottoAuthorShow = false">

                <span>{{motto.content}}</span>
                <span :class="isMottoAuthorShow?'mottoAuthorShow':'mottoAuthorHide'">
                    {{motto.author}}{{motto.works}}
                </span>

            </div>
        </transition>

        <!-- 功能模块 navBox -->
        <transition name="sameAnimateOne">

            <div class="navBox" v-show="isNavBoxShow">

                <!-- 折叠的nav盒子 -->
                <div class="navBoxOne" v-show="isFoldNavBoxShow">

                    <div class="foldNavCustom" v-for="item in foldNavList" :key="item.id" @click="unFoldNav(item.id)">
                        <div class="foldNavCustomItem">
                            <div class="navItem" v-for="i in item.children" :key="i.id">
                                <svg class="iconMini" aria-hidden="true">
                                    <use :xlink:href="i.className"></use>
                                </svg>
                            </div>
                        </div>
                        <span>{{item.title}}</span>
                    </div>

                    <!-- 有关壁纸的功能 -->
                    <div class="navCustomItem wallpaperNav" @click="showWallpaper">
                        <div class="navItem">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-wallpaper"></use>
                            </svg>
                        </div>
                        <span>壁纸</span>
                    </div>

                    <!-- 有关添加模块的功能 -->
                    <div class="navCustomItem addNav" @click="addModule">
                        <div class="navItem">
                            <svg class="icon icon-add" aria-hidden="true">
                                <use xlink:href="#icon-add"></use>
                            </svg>
                        </div>
                    </div>

                </div>

                <!-- 展开的nav盒子 -->
                <div class="navBoxOne" v-show="item.id == navBoxOneIndex"
                    v-for="item in unFoldNavList" :key="item.id">

                    <div class="navCustomItem" v-for="i in item.children"
                        :key="i.id" @click="openWebsite(i.url)"
                        @contextmenu.prevent="rightClickNav(i,$event)">
                        <div class="navItem">
                            <svg class="icon" aria-hidden="true">
                                <use :xlink:href="i.className"></use>
                            </svg>
                        </div>
                        <span>{{i.title}}</span>
                    </div>

                </div>

                <!-- 便签模块 -->
                <div class="navBoxTwo">

                    <!-- 包裹一层div 目的是子元素根据此容器绝对定位 -->
                    <div class="template">

                        <!-- 左侧便签列 -->
                        <transition name="noteList">
                            <div class="noteList" v-show="isNoteListShow">
                                <div class="addNote" @click="newNote">
                                    <span>+</span>
                                    <span>新便签</span>
                                </div>
                                <div class="noteItem noteItemBorder" v-show="noteList.length == 0">
                                    <span>{{noteValue}}</span>
                                    <span>{{writeNoteTime}}</span>
                                </div>
                                <div :class="item.id == noteItemIndex
                                     ? 'noteItem noteItemBorder':'noteItem'" @click="clickNoteItem(item)"
                                     v-for="item in noteList" :key="item.id" v-show="noteList.length != 0">
                                    <span>{{updateNoteItemIndex==item.id?noteValue:item.noteValue}}</span>
                                    <span>{{updateNoteItemIndex==item.id?writeNoteTime:item.writeNoteTime}}</span>
                                </div>
                            </div>
                        </transition>

                        <!-- 右侧textarea模块 -->
                        <textarea :class="{textareaNarrow:isTextareaNarrow,
                            textareaEnlarge:isTextareaEnlarge}" placeholder="创建便签"
                            @keyup="writeNote" v-model="noteValue">
                        </textarea>

                        <!-- 操作图标 -->
                        <transition name="sameAnimateOne">
                            <div class="noteToolBar" v-show="isNoteListShow">
                                <div title="删除" @click="deleteNote">
                                    <svg class="iconSmall icon-delete" aria-hidden="true">
                                        <use xlink:href="#icon-delete"></use>
                                    </svg>
                                </div>
                                <div title="钉住" @click="pinNoteShow">
                                    <svg class="iconSmall icon-pin" aria-hidden="true">
                                        <use xlink:href="#icon-pin"></use>
                                    </svg>
                                </div>
                                <div title="保存" @click="isUpdateNote?updateNote():saveNote()">
                                    <svg class="iconSmall icon-save" aria-hidden="true">
                                        <use xlink:href="#icon-save"></use>
                                    </svg>
                                </div>
                            </div>
                        </transition>

                    </div>
                </div>
            </div>
            
        </transition>
        
        <!-- 钉住的便签模块 -->
        <div class="pinNoteBox">

            <transition-group name="sameAnimateOne">
                <div class="pinNoteItem" v-for="(item,index) in noteList"
                    :key="item.id" v-show="noteList[index].show">
                    <div class="content">
                        <span>{{item.noteValue}}</span>
                        <span>{{item.writeNoteTime}}</span>
                    </div>
                    <svg class="iconSmall icon-close"
                        aria-hidden="true" @click="pinNoteHide(item.id)">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
            </transition-group>
            

        </div>

        <!-- 切换模块 navBoxSwitch -->
        <transition name="sameAnimateOne">
            <div class="navBoxSwitch" v-show="isSwitchShow" 
                @click="clickSwitchSpan($event)">
                <span :class="switchSpanIndex == 0 ?'switchSpan':''" 
                    data-id = "0"></span>
                <span :class="switchSpanIndex == 1 ?'switchSpan':''" 
                    data-id = "1"></span>
            </div>
        </transition>

        <!-- 添加导航模块 addNavItem -->
        <transition name="sameAnimateTwo">
            <div class="addNavItem" v-show="isAddNavItemShow">
                <header>
                    <span>添加网站</span>
                    <svg class="iconSmall icon-close" aria-hidden="true"
                        @click="isAddNavItemShow = false">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </header>
                <input type="text" placeholder="网址" 
                    ref="wangzhi" v-model="addNavForm.url">
                <input type="text" placeholder="标题"
                    v-model="addNavForm.name">
                <button @click="addNav">添加</button>
            </div> 

        </transition>

        <!-- 更新导航模块 updateNavItem -->
        <transition name="sameAnimateTwo">
            <div class="updateNavItem" v-show="isUpdateNavItemShow">
                <header>
                    <span>编辑网站</span>
                    <svg class="iconSmall icon-close" aria-hidden="true"
                        @click="isUpdateNavItemShow = false">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </header>
                <input type="text" placeholder="网址" 
                    v-model="updateNavForm.url">
                <input type="text" placeholder="标题"
                    v-model="updateNavForm.name">
                <button @click="updateNav">保存</button>
            </div> 

        </transition>

        <!-- 删除和编辑以及折叠导航模块 handleNavItem -->
        <transition name="sameAnimateTwo">
            <div class="handleNavItem" v-show="isHandleNavItemShow">
                <div class="box" @click="foldNav">
                    <svg class="iconSmall icon-fold" aria-hidden="true">
                        <use xlink:href="#icon-fold"></use>
                    </svg>
                    <span>折叠</span>
                </div>
                <div class="box" @click="updateNavItemShow">
                    <svg class="iconSmall icon-edit" aria-hidden="true">
                        <use xlink:href="#icon-edit"></use>
                    </svg>
                    <span>编辑</span>
                </div>
                <div class="box" @click="deleteNav">
                    <svg class="iconSmall icon-delete2" aria-hidden="true">
                        <use xlink:href="#icon-delete2"></use>
                    </svg>
                    <span>删除</span>
                </div>
            </div>
        </transition> 

        <!-- 登录和设置模块 userAndset -->
       <transition name="sameAnimateTwo">
            <div class="userAndset" v-show="isUserAndSetShow">
                <div class="userAndsetIcon">
                    <div title="设置" @click="clickSet">
                        <svg class="icon icon-set" aria-hidden="true">
                            <use xlink:href="#icon-set"></use>
                        </svg>
                    </div>
                </div>
                <transition name="userAndsetModule">
                    <div class="setModule" v-show="isSetModuleShow">
                        <span @click="popup">常规设置</span>
                        <span @click="popup">搜索引擎设置</span>
                        <span @click="setWallpaper">背景图片设置</span>
                    </div>
                </transition>
            </div>
       </transition>

        <!-- 壁纸模块 wallpaperBox -->
        <transition name="sameAnimateTwo">
            <div class="wallpaperBox" v-show="isWallpaperBoxShow">
                <div class="wallpaper">
                    <header>
                        <span>背景图片偏好</span>
                        <svg class="icon icon-close" aria-hidden="true"
                            @click="isWallpaperBoxShow = false">
                            <use xlink:href="#icon-close"></use>
                        </svg>
                    </header>
                    <section>
                        <div class="custom">
                            <span>自定义</span>
                            <div class="customBox">
                                <div :class="imgIndex == 9?'img image':'img'">
                                    <img :src="isUploadImg?customImgUrl:'https://s1.ax1x.com/2020/10/13/0hyDFH.jpg'" :data-url="customImgUrl"  
                                    alt="" @click="customImg($event)">
                                </div>
                                <div class="describe">
                                    <span>将您喜爱的任意图像设为壁纸。</span>
                                    <span>建议图像尺寸：1920×1080 或更高</span>
                                    <div class="uploadBox">
                                        <input type="file" accept="image/*" @change="uploadFile" ref="uploadWp" v-show="false"/>
                                        <button @click="$refs.uploadWp.click()">浏览...</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="default sameStyle">
                            <span>默认</span>
                            <div class="box">
                                <div :class="item.id == imgIndex ? 'img image' : 'img' "
                                    v-for="item in liveWallpapers" :key="item.id">
                                    <img src="https://s1.ax1x.com/2020/10/13/0hyDFH.jpg" 
                                    :data-url="item.url" @click="chooseImg(item)">
                                </div>
                            </div>
                        </div>
                        <div class="trends sameStyle">
                            <span>动态</span>
                            <div class="box">
                                <span>暂无</span>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            
        </transition>


    </div>
</template>

<script>
export default {
    inject:['reload'],//注入重载方法
    data(){
        return {
            currentTime:'',//当前时间
            flag:false,//控制遮罩和图片放大
            flagInput:false,//是否点击了搜索框
            flagTime:false,//是否点击了时间
            isEnlarge:false,//页面初始化不添加enlarge动画
            isNarrow:false,//页面初始化不添加narrow动画
            isChangeBgColor:true,//允许鼠标移入搜索框背景颜色改变
            isAddNavItemShow:false,//隐藏添加导航模块
            isUpdateNavItemShow:false,//隐藏更新导航模块
            isHandleNavItemShow:false,//隐藏操作导航模块
            isFoldNavBoxShow:true,//显示折叠盒子
            navBoxOneIndex:-1,//控制展开哪个nav盒子
            isNavBoxShow:false,//隐藏导航模块
            isSearchShow:true,//显示搜索模块
            isMottoShow:false,//隐藏格言模块
            isSearchOptBoxShow:false,//隐藏搜索引擎选择模块
            isMottoAuthorShow:false,//不添加mottoAuthorShow动画
            isUserAndSetShow:false,//隐藏用户和设置模块
            isSetModuleShow:false,//隐藏有关设置的模块
            isUserModuleShow:false,//隐藏有关用户的模块
            isSwitchShow:false,//隐藏切换模块
            isNoteListShow:false,//隐藏便签列表
            isWallpaperBoxShow:false,//隐藏壁纸盒子
            isTextareaNarrow:false,//不加载textareaNarrow动画
            isTextareaEnlarge:false,//不加载textareaEnlarge动画
            isManageAccountBoxShow:false,//隐藏个人账户管理
            switchSpanIndex:0,//当前切换模块的下标默认初始在导航模块
            noteValue:'',//便签的内容
            noteForm:{//便签对象
                id:0,
                show:false,
                noteValue:'',
                writeNoteTime:''
            },
            noteList:[],//所有便签数据
            noteItemIndex:-1,//当前点击的便签下标
            updateNoteItemIndex:-1,//要修改的便签下标
            isUpdateNote:false,//是否修改便签
            browserTypes:[//浏览器种类
                {id:0,className:'#icon-biying'},
                {id:1,className:'#icon-baidu'},
                {id:2,className:'#icon-guge'},
            ],
            browserIndex:0,//默认选择必应浏览器
            searchEngines:[//搜索引擎搜索地址
                {id:0,path:'https://cn.bing.com/search?q='},
                {id:1,path:'https://www.baidu.com/s?wd='},
                {id:2,path:'http://www.google.com/search?q='}
                
            ],
            keyWordsApi:[//不同搜索引擎的关键词联想
                {id:0,path:`http://api.bing.com/qsonhs.aspx?type=cb&cb=jsonpCB&q=`},
                {id:1,path:'http://suggestion.baidu.com/su?cb=jsonpCB&wd='},
                {id:2,path:'http://suggestqueries.google.com/complete/search?client=youtube&jsonp=jsonpCB&q='}
            ],
            inputValue:'',//关键字
            searchList:[],//搜索框搜寻的数据
            motto:{//格言内容
                content:'',
                author:'',
                works:''
            },
            copyMotto:{},//复制一份motto
            navList:[],//所有nav数据
            writeNoteTime:'',//写便签的时间
            wallpaperList:[],//壁纸数据
            imgIndex:0,//默认第一张壁纸
            defaultImg:'https://s1.ax1x.com/2020/10/13/0hyDFH.jpg',//默认背景图片地址
            customImgUrl:'',//自定义背景图片地址
            isUploadImg:false,//是否上传了壁纸
            isLoginBoxShow:false,//隐藏登录盒子
            token:null,//默认没有token值
            addNavForm:{//新增的nav值
                name:'',
                url:''
            },
            updateNavForm:{//更新新增的nav
                name:'',
                url:'',
                id:''
            },
            deleteNavId:-1,//删除指定新增的nav
            theme:'#icon-sun',   
        }
    },
    created(){
        //获取格言数据
        this.getMotto()
        //初始化获取存在localStorge的便签数据
        this.getNoteList()
        //禁止鼠标右键点击
        document.oncontextmenu =  () => {event.returnValue = false}
        //获取壁纸数据
        this.getWallpaper()
        //获取nav数据
        this.getNav()
        //页面初始化获得token值
        this.token = sessionStorage.getItem('token')
    },
    mounted(){
        //JSONP跨域实现自动补全搜索(关键词联想)
        window.jsonpCB = data => {
            this.searchList = []
            if(data instanceof Array){
                for(let i of data[1]){
                    let obj = {
                        title:i[0],
                        url:this.searchEngines[2].path + i[0]
                    }
                    this.searchList.push(obj)
                }
            }
            if(data instanceof Object){
                if(data.s){
                    for(let i of data.s){
                        let obj = {
                            title:i,
                            url:this.searchEngines[1].path + i
                        }
                        this.searchList.push(obj)
                    }
                }
                if(data.AS && data.AS.Results){
                     for(let i of data.AS.Results[0].Suggests){
                        let obj = {
                            title:i.Txt,
                            url:this.searchEngines[0].path + i.Txt
                        }
                        this.searchList.push(obj)
                    }
                }
            }
        }        
        //初始化 使得页面渲染完成之前页面中有时间数据展示
        this.nowTime()
        setInterval(this.nowTime,1000)
    },
    watch:{
        //监听点击搜索框 添加点击事件和移出点击事件
        flagInput(value){
            if(value){
                var timer = setTimeout(()=>{
                    document.addEventListener('click',this.addeventGlass)
                },100)
            }else{
                clearTimeout(timer)
                document.removeEventListener('click',this.addeventGlass)
            }
        },
        //监听点击时间 添加点击事件和移出点击事件
        flagTime(value){
            if(value){
                var timer = setTimeout(()=>{
                    document.addEventListener('click',this.addeventTime)
                },100)
            }else{
                clearTimeout(timer)
                document.removeEventListener('click',this.addeventTime)
            }
        },
        //监听搜索的关键词是否有数据，有则把便签隐藏
        searchList(newVal){
            if(newVal.length > 0){
                this.isMottoShow = false
            }else{
                this.isMottoShow = true
            }
        },
        //监听是否修改便签数据
        noteValue(value){
            let flag
            if(this.noteList.length != 0){
                for(let i of this.noteList){
                    if(i.id == this.noteItemIndex){
                        flag = i.noteValue != value
                    }
                }
                if(flag){
                    this.updateNoteItemIndex = this.noteItemIndex
                    this.isUpdateNote = true
                }
            }else{
                this.updateNoteItemIndex = -1
            }
            
        },
        //监听便签数据
        noteList(value){
            if(value.length == 0){
                this.isNoteListShow = false
                this.isTextareaNarrow = false
                this.isTextareaEnlarge = true
            }
        },
    },
    methods:{
        //当前时间
        nowTime(){
            const t = new Date()
            const y = t.getFullYear()
            const m = (t.getMonth() + 1 + '').padStart(2, '0')
            const d = (t.getDate() + '').padStart(2, '0')
            const hh = (t.getHours() + '').padStart(2, '0')
            const mm = (t.getMinutes() + '').padStart(2, '0')
            const ss = (t.getSeconds() + '').padStart(2, '0')
            this.currentTime =`${hh}:${mm}`
            this.writeNoteTime = `${y}-${m}-${d} ${hh}:${mm}:${ss}`
        },
        //搜索界面添加点击事件
        addeventGlass(e){
            if(e.target.className == 'mask'){
                this.flag = false
                this.flagInput = false
                this.isEnlarge = false
                this.isNarrow = true
                this.isSearchOptBoxShow = false
                this.inputValue = ''
                this.searchList = []
                this.browserIndex = 0
                this.isChangeBgColor = true
                this.$nextTick(() => {this.isMottoShow = false})
            }  
        },
        //功能界面添加点击事件
        addeventTime(e){
            if(this.conditionOne(e)){
                this.flag = false
                this.flagTime = false
                this.isNavBoxShow = false
                this.isAddNavItemShow = false
                this.isSearchShow = true
                this.isEnlarge = false
                this.isNarrow = false
                this.isUserAndSetShow = false
                this.isSwitchShow = false
            }else if(this.conditionTwo(e)){
                this.isSetModuleShow = false
                this.isUserModuleShow = false
                this.isHandleNavItemShow = false
                this.isAddNavItemShow = false
                this.navBoxOneIndex = -1
                this.isFoldNavBoxShow = true
            }
        },
        //鼠标移入搜索框
        enlarge(){
            this.isEnlarge = true
            this.isNarrow = false
        },
        //鼠标移出搜索框
        narrow(){
            if(!this.flagInput){
                this.isEnlarge = false
                this.isNarrow = true
            }
        },
        //点击搜索框
        clickInput(){
            this.flagInput = true
            this.flag = true
            this.isSearchOptBoxShow = true
            this.isMottoShow = true
            this.motto = JSON.parse(JSON.stringify(this.copyMotto))
            this.isChangeBgColor = false
        },
        //点击时间
        clickTime(){
            this.flag = true
            this.flagTime = true
            this.isNavBoxShow = true
            this.isSearchShow = false
            this.isUserAndSetShow = true
            this.isSwitchShow = true
            this.isMottoShow = false
            this.motto = {}
            this.isSearchOptBoxShow = false
            this.isEnlarge = false
            this.isNarrow = false
        },
        //点击切换搜索引擎
        clickIcon(id){
            this.browserIndex = id
            this.$jsonp(this.keyWordsApi[this.browserIndex].path + this.inputValue)
                .then(res => res)
        },
        // 搜索事件
        search(e){
            if(e.keyCode == 13){
              open(this.searchEngines[this.browserIndex].path + this.inputValue)
              this.inputValue = ""
            }
            this.$jsonp(this.keyWordsApi[this.browserIndex].path + this.inputValue)
                .then(res => res)
            if(this.inputValue == "") {this.searchList = []}
        },
        //打开网页
        clickKeyWords(url){
            open(url)
            this.inputValue = ''
            this.searchList = []
        },
        //获取格言警句
        async getMotto(){
            const {data:res} = await this.axios.get('https://v1.hitokoto.cn/?c=d&amp;c=i&amp;encode=json')
            this.motto.content ='「' + res.hitokoto + '」'
            this.motto.author = res.from_who ==  null ? '--' : '--' + res.from_who + '/'
            this.motto.works = res.from ==  null ? '' : res.from
            this.copyMotto = JSON.parse(JSON.stringify(this.motto))
        },
        //获取NavList
        async getNav(){
            const {data:res} = await this.axios.get('homeNavs')
            if(res.code != 200) return this.$message({message:`${res.tips}`,type:'error',duration:1000})
            this.navList = res.data
        },
        //打开折叠的nav盒子
        unFoldNav(id){
            this.navBoxOneIndex = id
            this.isFoldNavBoxShow = false
        },
        //折叠打开的nav盒子
        foldNav(){
            this.isFoldNavBoxShow = true
            this.navBoxOneIndex = -1
            this.isHandleNavItemShow = false
        },
        //右击nav便于折叠删除及修改
        rightClickNav(data,e){
            this.isHandleNavItemShow = true
            this.isAddNavItemShow = false
            this.isUpdateNavItemShow = false
            let handleNavItem = document.querySelector('.handleNavItem')
            handleNavItem.style.top = e.pageY + 'px'
            handleNavItem.style.left = e.pageX + 'px'
            let updateNavItem = document.querySelector('.updateNavItem')
            updateNavItem.style.top = e.pageY  + 'px'
            updateNavItem.style.left = e.pageX  + 'px'
            this.updateNavForm = {
                name:data.title,
                url:data.url,
                id:data.id
            }
            this.deleteNavId = data.id
        },
         //显示添加模块
        addModule(e){
            this.isAddNavItemShow = true
            let addNavItem = document.querySelector('.addNavItem')
            addNavItem.style.top = e.pageY  + 'px'
            addNavItem.style.left = e.pageX  + 'px'
            this.$nextTick(() => {this.$refs.wangzhi.focus()})
        },
        //显示更新模块
        updateNavItemShow(){
            this.isHandleNavItemShow = false
            this.isUpdateNavItemShow = true
        },
        //更新nav
        async updateNav(){
            const {data:res} = await this.axios.put('websites',this.updateNavForm)
            if(res.code != 200) return this.$message({message:`${res.tips}`,type:'error',duration:1000})
            this.$message({message:`${res.tips}`,type:'success',duration:1000})
            this.isUpdateNavItemShow = false
            this.updateNavForm = {
                id:'',
                name:'',
                url:''
            }
            this.getNav()
        },
        //添加nav
        async addNav(){
            const {data:res} = await this.axios.post('websites',this.addNavForm)
            if(res.code != 200) return this.$message({message:`${res.tips}`,type:'error',duration:1000})
            this.$message({message:`${res.tips}`,type:'success',duration:1000})
            this.isAddNavItemShow = false
            this.addNavForm = {
                name:'',
                url:''
            }
            this.getNav()
        },
        //处理navList数据
        cutArr(arr,num){
            if(!arr instanceof Array){
                return false
            }
            let i = 0,newArr = []
            while(i < arr.length){
                let Arr = arr.slice(i,i+num)
                newArr.push(Arr)
                i += num
            }
            return newArr
        },
        //删除nav
        async deleteNav(){
            const confirmResult = await this.$confirm(
            '是否永久删除该数据?','提示',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err)
            if (confirmResult !== 'confirm'){
                this.isHandleNavItemShow = false
                return this.$message({message: '已取消删除',type: 'info',duration:1000})
            }
            const {data:res} = await this.axios.delete('websites',{params:{id:this.deleteNavId}})
            if(res.code != 200) return this.$message({message:`${res.tips}`,type:'error',duration:1000})
            this.$message({message:`${res.tips}`,type:'success',duration:1000})
            this.isHandleNavItemShow = false
            this.deleteNavId = -1
            this.getNav()
        },
        //点击nav
        openWebsite(url){
            open(url)
        },
        //点击user模块
        clickUser(){
            this.isSetModuleShow = false
            if(!this.token){
                this.isLoginBoxShow = true
            }else{
                this.isUserModuleShow = true
            }
        },
        //点击set模块
        clickSet(){
            this.isSetModuleShow = true
            this.isUserModuleShow = false
        },
        //切换模块
        clickSwitchSpan(e){
            this.switchSpanIndex = e.target.dataset.id
            var navBox = document.querySelector('.navBox')
            if(this.switchSpanIndex == 1){
                navBox.scrollTo({left:660,behavior:'smooth'})
            }else{
                navBox.scrollTo({left:-660,behavior:'smooth'}) 
            }
        },
        //当前点击便签后的样式
        clickNoteItem(data){
            this.noteItemIndex = data.id
            this.noteValue = data.noteValue 
        },
        //获取localStorage中的noteList数据
        getNoteList(){
            let arr = JSON.parse(localStorage.getItem('noteList'))
            this.noteList = arr == null ? [] : arr
            if(this.noteList.length != 0){
                this.isNoteListShow = true
                this.isTextareaNarrow = true
                this.isTextareaEnlarge = false
            }
        },  
        //编写便签
        writeNote(){
            this.isNoteListShow = true
            this.isTextareaNarrow = true
            this.isTextareaEnlarge = false
            if(this.noteValue == '' && this.noteList.length == 0){
                this.isNoteListShow = false
                this.isTextareaNarrow = false
                this.isTextareaEnlarge = true
            }
        },
        //添加新的便签
        newNote(){
            this.noteItemIndex = -1
            this.noteValue = ''
        },
        //保存便签
        saveNote(){
            if(this.noteValue == '') return this.$message({message:'请输入内容',type:'error',duration:1000})
            this.noteForm = {
                id:this.noteList.length,
                show:false,
                noteValue:this.noteValue,
                writeNoteTime:this.writeNoteTime
            }
            this.noteList.push(this.noteForm)
            this.noteValue = ''
            if(this.noteList.length > 6) 
            return this.$message({message:'添加那么多便签能完成吗？',type:'error',duration:1000})
            localStorage.setItem('noteList',JSON.stringify(this.noteList))
            this.$message({message:'添加便签成功',type:'success',duration:1000})
            this.getNoteList()
        },
        //更新便签
        updateNote(){
            this.noteList.some(item => {
                if(item.id == this.updateNoteItemIndex){
                    item.noteValue = this.noteValue
                    item.writeNoteTime = this.writeNoteTime
                    return true
                }
            })
            localStorage.setItem('noteList',JSON.stringify(this.noteList))
            this.updateNoteItemIndex = -1
            this.noteItemIndex = -1
            this.isUpdateNote = false
            this.noteValue = ''
            this.$message({message:'修改便签成功',type:'success',duration:1000})
            this.getNoteList()
        },
        //删除点击的便签
        deleteNote(){
            if(this.noteItemIndex == -1) return this.$message({message:'请选中要删除的便签',type:'error',duration:1000})
            let arr = this.noteList.filter(item => item.id != this.noteItemIndex)
            if(arr.length == 0){
                 localStorage.clear()
                 this.noteItemIndex = -1
            }else{
                localStorage.setItem('noteList',JSON.stringify(arr))
            }
            this.noteValue = ''
            this.$message({message:'删除便签成功',type:'success',duration:1000})
            this.noteItemIndex = -1
            this.getNoteList()
        },
        //钉住选择的便签
        pinNoteShow(){
            if(this.noteItemIndex == -1) return this.$message({message:'请选中要钉住的便签',type:'error',duration:1000})
            for (let i of this.noteList){
                if(i.id == this.noteItemIndex){
                    i.show = true
                }
            }
            this.$message({message:'钉住便签成功',type:'success',duration:1000})
            localStorage.setItem('noteList',JSON.stringify(this.noteList))
            this.noteValue = ''
            this.noteItemIndex = -1
        },
        //钉住的便签隐藏
        pinNoteHide(id){
            this.noteList.some(item => {
                if(item.id == id){
                    item.show = false
                    return true
                }
            })
            this.$message({message:'取消钉住便签成功',type:'success',duration:1000})
            localStorage.setItem('noteList',JSON.stringify(this.noteList))
        },
        //展示壁纸盒子
        showWallpaper(){
            this.isWallpaperBoxShow = true
            const imgs = document.querySelectorAll('.wallpaperBox section img')
            for(let i of imgs){i.src = i.dataset.url}
        },
        //点击壁纸，获取壁纸数据
        async getWallpaper(){
            const {data:res} = await this.axios.get('wallpapers')
            if(res.code != 200) return this.$message({message:`${res.tips}`,type:'error',duration:1000})
            this.wallpaperList = res.data
            this.defaultImg = res.data[0].newurl
            let arr = JSON.parse(JSON.stringify(res.data))
            this.customImgUrl = arr.reverse()[0].newurl
            this.wallpaperList.some(item => {
                if(this.defaultImg == item.url){
                    this.imgIndex = item.id
                    return true
                }
            })
        },
        //上传文件
        async uploadFile(e){
            let image = e.target.files[0] //获取图片文件
            let formData = new FormData()  // 创建form对象
            formData.append('image', image)  // 通过append向form对象添加数据
            const {data:res} = await this.axios.post('wallpapers',formData)
            if(res.code != 200) return this.$message({message: `${res.tips}`,type: 'error',duration:1000})
            this.$message({message: `${res.tips}`,type: 'success',duration:1000})
            this.getWallpaper()
            this.isUploadImg = true
        },
        //选择的图片下标
        chooseImg(data){
            if(this.token){
                this.imgIndex = data.id
                this.defaultImg = data.url
            }
            this.updateWallpaper(data.url)
        },
        //点击切换自定义壁纸
        customImg(e){  
            if(this.token){
                this.imgIndex = 9
                this.defaultImg = e.target.src
            }
            this.updateWallpaper(e.target.src)
        },
        //更新背景图片
        async updateWallpaper(url){
            const {data:res} = await this.axios.put('wallpapers',{newurl:url})
            if(res.code != 200) return this.$message({message:`${res.tips}`,type:'error',duration:1000})
            this.$message({message:`${res.tips}`,type:'success',duration:1000})
            this.getWallpaper()
        },
        //设置背景图片
        setWallpaper(){
            this.showWallpaper()
            this.isSetModuleShow = false
        },
        //管理账户
        manageAccount(){
            this.isManageAccountBoxShow = true
            this.isUserModuleShow = false
        },
        //点击搜索引擎和常规设置
        popup(){
            this.$message({message:'敬请期待',type:'success',duration:1000})
            this.isSetModuleShow = false
        },  
    },
    computed: {
        liveWallpapers(){
            let arr = this.wallpaperList.slice(0,8)
            return arr
        },
        //未折叠的数据
        unFoldNavList(){
            let Arr = []
            this.cutArr(this.navList,20).forEach((item,index) => {
                let obj = {}
                obj.id = index
                obj.title = `页面${index+1}`
                obj.children = item
                Arr.push(obj)
            })
            return Arr
        },
        //折叠的数据
        foldNavList(){
            let arr = JSON.parse(JSON.stringify(this.unFoldNavList))
            arr.forEach(item => item.children.splice(9,item.children.length-1))
            return arr
        },
        conditionOne(){
            let screenWidth = document.body.clientWidth || document.documentElement.clientWidth
            return e => ((e.target.className == 'mask' || e.target.className =='navBoxOne') 
                        && !this.isSetModuleShow && !this.isUserModuleShow
                        && !this.isHandleNavItemShow && !this.isAddNavItemShow 
                        && this.navBoxOneIndex == -1)
        },
        conditionTwo(){
            let screenWidth = document.body.clientWidth || document.documentElement.clientWidth
            return e => (e.target.className == 'mask' || e.target.className =='navBoxOne')
                && (this.isSetModuleShow || this.isUserModuleShow
                || this.isHandleNavItemShow || this.isAddNavItemShow 
                || this.navBoxOneIndex != -1)
        }
    },
}
</script>

<style lang="less" scoped>
@transitionTime:.5s;
[v-cloak] {
    display: none!important; 
}

#home{
    width: 100vw;
    min-width: 300px;
    height: 100vh;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
    user-select:none;
    >img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        transition:all @transitionTime;
    }
    .mask{
        height: 100%;
        position: relative; 
        transition:all @transitionTime;
        background-image: radial-gradient(rgba(0,0,0,0) 0%,rgba(0,0,0,0.5) 100%),radial-gradient(rgba(0,0,0,0) 33%,rgba(0,0,0,0.3) 166%);
    }
    >h1{
        position: absolute;
        top: 12vh;
        left: 50%;
        transform: translateX(-50%);
        color: #FAFBFC;
        font-size: 36px;
        font-weight: 100;
        cursor: pointer;
        transition:all .25s;
        &:hover{font-size: 40px;}
    }
    >h5{
        position: absolute;
        bottom: 2vh;
        left: 50%;
        transform: translateX(-50%);
        color:#B1B1B2;
        font-size: 12px;
        transition:all .15s;
        span{
            cursor: pointer;
            transition:all .15s;
            &:hover{color: #ddd;}
        }
    }
    .search{
        position: absolute;
        top: 20vh;
        left: 50%;
        transform: translateX(-50%);
    }
    .searchOptBox{
        position: absolute;
        top: 26vh;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
    }
    .keyWord{
        position: absolute;
        top: 31vh;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        width: 560px;
        background-color:rgba(255, 255, 255, .2);
        backdrop-filter: blur(30px);
        list-style: none;
        border-radius: 15px;
        box-sizing: border-box;
    }
    .motto{
        position: absolute;
        bottom: 12vh;
        left: 0;
        width: 100%;
        height: 70px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .navBox{
        position: absolute;
        top: 20vh;
        left: 50%;
        width: 600px;
        transform: translateX(-50%);
        overflow: hidden;
        display: flex;
    }
    .navBoxSwitch{
        position: absolute;
        bottom: 15vh;
        left: 50%;
        transform: translateX(-50%);
        width: 45px;
        display: flex;
        justify-content: space-between;
    }
    .addNavItem,.updateNavItem{
        position: absolute;
        top: 0;
        left: 0;
        width: 300px;
        background-color: #fff;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 10px 20px;
        font-size: 14px;
    }
    .handleNavItem{
        position: absolute;
        top: 0;
        left: 0;
        width: 140px;
        height: 80px;
        background-color: #fff;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        font-size: 12px;
        color: #626262;
    }
    .userAndset{
        position: absolute;
        top: 30px;
        right: 50px; 
    }
    .pinNoteBox{
        position: absolute;
        top: 40px;
        left: 60px;
    }
    .wallpaperBox{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .loginBox{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .manageAccountBox{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.5);
        display: flex;
        justify-content: center;
        align-items: center; 
    }
}

.search{
    input{
        width: 250px;
        height: 40px;
        outline: none;
        border: none;
        cursor: text;
        border-radius: 20px;
        text-align: center;
        background: none;
        backdrop-filter: blur(30px);
        box-shadow: 0 0 15px rgba(0, 0, 0, .2);
        transition: all @transitionTime;
        &::placeholder{color:rgba(255,255,255,.8);}
    }
}

.searchOptBox{
    span{
        display: inline-block;
        padding: 8px 30px;
        background-color:rgba(255,255,255, .2);
        border-radius: 20px;
        transition: all @transitionTime;
        cursor: pointer;
        font-size: 12px;
        color: #fff;
        text-align: center;
        &:not(:first-child):not(:last-child){margin: 0 10px;}
        svg{pointer-events: none;}
        z-index: 999;
    }
}

.keyWord{
    div{
        padding: 5px 20px;
        color: rgba(255, 255, 255, .8);
        font-size: 14px;
        transition: all @transitionTime;
        cursor: pointer;
        &:hover{background-color:rgba(255, 255, 255, .2);padding: 5px 25px;}
        &:first-child{border-radius: 15px 15px 0 0;}
        &:last-child{border-radius: 0 0 15px 15px;}
    }
} 

.motto{
    span{
        display: block;
        padding: 5px 0;
        color: #fff;
        font-size: 14px;
        cursor: default;
        pointer-events: none;
        transition: all @transitionTime;
    }
    &:hover{
        transition: all @transitionTime;
        background-color:rgba(0, 0, 0, .5);
    }
}

.navBox{
    .navBoxOne{
        min-width: 600px;
        max-height: 500px;
        display: grid;
        grid-template-columns: repeat(5,1fr);
        grid-template-rows: repeat(4,1fr);
        gap: 20px 50px;
        overflow: hidden;   
        .navCustomItem{
            width: 80px;
            height: 100px;
            display: flex;
            flex-direction: column;
            align-items: center;
            box-sizing: border-box;
            cursor: pointer;
            &:hover .navItem{background-color: rgba(255,255,255, .8);}
            .navItem{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 80px;
                height: 80px;
                background-color: rgba(255,255,255, .5);
                backdrop-filter: blur(30px);
                border-radius: 10px;
                pointer-events: none;
                transition: all @transitionTime;
            }
            span{
                color: #fff;
                font-size: 10px;
                margin-top: 5px;
                pointer-events: none;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        .foldNavCustom{
            width: 80px;
            height: 100px; 
            box-sizing: border-box;
            padding: 2px;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            transition: all @transitionTime;
            &:hover .foldNavCustomItem{background-color: rgba(255,255,255, .8);}
            .foldNavCustomItem{
                width: 80px;
                height: 80px; 
                backdrop-filter: blur(10px);
                border-radius: 10px;
                background-color:rgba(231,231,230,.5);
                display: grid;
                gap: 1px;
                grid-template-columns: repeat(3,1fr);
                grid-template-rows: repeat(3,1fr);
                place-items: center center;
                transition: all @transitionTime;
                .navItem{
                    pointer-events: none;
                    border-radius: 4px;
                    padding: 0 2px;
                    box-sizing: border-box;
                    transition: all @transitionTime;
                }
            }
            span{
                color: #fff;
                font-size: 10px;
                margin-top: 5px;
                pointer-events: none;
            }
            
        }
    }
    .navBoxTwo{
        margin-left: 20px;
        min-width: 600px;
        border-radius: 15px;
        transition: all @transitionTime;
        display: flex;
        .template{
            position: relative;
            height: 500px;
            border-radius: 15px;
            .noteList{
                position: absolute;
                top:0;
                width: 190px;
                height: 450px;
                margin-right: 10px;
                border-radius: 15px;
                backdrop-filter: blur(30px);
                .addNote{
                    box-sizing: border-box;
                    color: #fff;
                    font-size: 14px;
                    border-radius: 15px 15px 0 0;
                    padding: 10px 20px;
                    span:last-child{margin-left: 5px;}
                    &:hover{background-color:rgba(192,192,192, .5);}
                }
                .noteItem{
                    box-sizing: border-box;
                    min-height: 60px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    font-size: 12px;
                    padding: 10px 20px;
                    color: #fff;
                    cursor: pointer;
                    transition: all @transitionTime;
                    span{pointer-events: none;}
                    span:last-child{margin-top: 10px;}
                    &:hover{background-color:rgba(192,192,192, .5);}
                }
            }
            textarea{
                box-sizing: border-box;
                position: absolute;
                top:0;
                width: 600px;
                height: 450px;
                backdrop-filter: blur(30px);
                background-color: rgba(255,255,255,.6);
                border-radius: 15px;
                padding: 20px;
                resize: none;
                outline: none;
                border: none;
                font-size: 14px;
                color: black;
            }
            .noteToolBar{
                position: absolute;
                bottom: 10px;
                left: 220px;
                display: flex;
                >div:not(:first-child):not(:last-child){margin: 0 10px;}
                .icon-delete,.icon-pin,.icon-save{
                    cursor: pointer;
                    fill: currentColor;
                    color:#C0C4CA;
                    transition: all @transitionTime;
                    &:hover{color:rgba(255, 255, 255);}
                }
            }
        } 
    }
}

.navBoxSwitch{
    span{
        display: block;
        width: 20px;
        height: 4px;
        border-radius: 2px;
        background-color:rgb(102,107,112);
        cursor: pointer;
        transition: all @transitionTime;
        &:hover{background-color: rgba(202,205,208, .8);}
    }
}

.addNavItem,.updateNavItem{
    header{
        display: flex;
        justify-content: space-between;
        .icon-close{
            cursor: pointer;
            fill: currentColor;
            color: #A9A9AA;
            transition: all @transitionTime;
            &:hover{color:#70C000;}
        }
    }
    input{
        background-color: #F2F2F2;
        width: 250px;
        height: 22px;
        border-radius: 11px;
        border: 0;
        outline: none;
        padding-left: 12px;
        font-size: 12px;
        margin: 10px 0;
    }
    button{
        width: 60px;
        height: 22px;
        border-radius: 11px;
        border: 0;
        outline: none;
        background-color: #70C000;
        color: #fff;
        margin-left: auto;
        cursor: pointer;
        transition: all @transitionTime;
        &:hover{background-color: rgb(19, 116, 19);}
    }
}

.userAndset{
    .userAndsetIcon{
        width: 65px;
        display: flex;
        justify-content: space-between;
        .icon-user,.icon-set{
            cursor: pointer;
            fill: currentColor;
            color:#9D9D9F;
            transition: all @transitionTime;
            &:hover{color:rgba(255, 255, 255);}
        }
    }
    .userModule{
        position: absolute;
        top: 30px;
        right: 40px;
        width: 160px;
        background-color: rgba(255, 255, 255);
        display: flex;
        flex-direction: column;
        color:#7B7B7B;
        font-size: 12px;
        border-radius: 8px;
        box-sizing: border-box;
        .user{
            display: flex;
            flex-direction: column;
            padding: 10px 10px;
            transition: all @transitionTime;
            &:hover{
                background-color:rgba(192,192,192, .5);
                border-radius: 8px 8px 0 0;
            }
            span:first-child{font-size: 16px!important;}
            cursor: pointer;
        }
        >span{
            display: block;
            padding: 10px 10px;
            transition: all @transitionTime;
            cursor: pointer;
            &:first-child{border-radius: 8px 8px 0 0;}
            &:last-child{border-radius: 0 0 8px 8px;}
            &:hover{background-color:rgba(192,192,192, .5);}
        }
    }
    .setModule{
        position: absolute;
        top: 30px;
        right: 0;
        width: 160px;
        background-color: rgba(255, 255, 255);
        display: flex;
        flex-direction: column;
        color:#7B7B7B;
        font-size: 12px;
        border-radius: 8px;
        box-sizing: border-box;
        span{
            display: block;
            padding: 10px 10px;
            transition: all @transitionTime;
            cursor: pointer;
            &:first-child{border-radius: 8px 8px 0 0;}
            &:last-child{border-radius: 0 0 8px 8px;}
            &:hover{background-color:rgba(192,192,192, .5);}
        }
    }
}

.pinNoteBox{
    .pinNoteItem{
        width: 250px;
        min-height: 55px;
        box-sizing: border-box;
        padding: 7px 20px;
        background-color: rgba(255, 255, 255, .8);
        border-radius: 5px;
        backdrop-filter: blur(30px);
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        cursor: pointer;
        overflow: hidden;
        margin-bottom: 20px;
        &:hover{.icon-close{opacity: 1!important;}}
        .content{
            display: flex;
            flex-direction: column;
            width: 180px;
            justify-content: space-between;
            span:last-child{
                color: #A9A9AA;
                font-size: 12px;
                margin-top: 10px;
            }
        }
        .icon-close{
            cursor: pointer;
            fill: currentColor;
            color: #A9A9AA;
            transition: all @transitionTime;
            opacity: 0;
            font-size: 14px;
            &:hover{color:#70C000;}
        }
    }
    
}

.handleNavItem{
    .box{
        width: 100%;
        height: 40px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        padding: 0 20px;
        cursor: pointer;
        &:first-child{border-radius: 10px 10px 0 0;}
        &:last-child{border-radius: 0 0 10px 10px;}
        &:hover{background-color:rgba(192,192,192, .5);}
        span{margin-left: 10px;}
    }
    .icon-edit,.icon-delete2,.icon-fold{
        fill: currentColor;
        color: #6C6C6C;
    }
}

.wallpaper{
    width: 600px;
    height: 500px;
    background-color: #fff;
    border-radius: 25px;
    box-sizing: border-box;
    padding: 40px 70px;
    header{
        font-size: 24px;
        display: flex;
        justify-content: space-between;
        .icon-close{
            font-size: 14px;
            fill: currentColor;
            color: #B4B4B4;
            cursor: pointer;
            transition: all @transitionTime;
            &:hover{color: #70C000;}
        }
    }
    section{
        margin: 20px 0;
        width:100%;
        height: 350px;
        overflow: hidden;
        overflow-y: auto;
        .custom{
            display: flex;
            flex-direction: column;
            >span{
                font-size: 16px;
                color: #C3C3C3;
            }
            .customBox{
                width: 100%;
                display: flex;
                margin-top: 10px;
                .img{
                    width: 135px;
                    height: 90px;
                    overflow: hidden;
                    border-radius: 5px;
                    position: relative;
                    img{
                        width: 100%;
                        height: 100%;
                        cursor: pointer;
                        border-radius: 5px;
                        transition: all @transitionTime;
                        &:hover{transform: scale(1.1);}
                        
                    }
                }
                .describe{
                    display: flex;
                    flex-direction: column;
                    margin-left: 20px;
                    span:nth-child(2){
                        font-size: 14px;
                        color: #C3C3C3;
                        margin: 7px 0;
                    }
                    button{
                        width: 105px;
                        height: 35px;
                        border-radius: 5px;
                        color: #fff;
                        background-color:#70c000;
                        border: none;
                        outline: none;
                        cursor: pointer;
                        transition: all @transitionTime;
                        &:hover{background-color: #62A703;}
                    }
                }
            }
        }
        .sameStyle{
            display: flex;
            flex-direction: column;
            margin: 15px 0;
            >span{
                font-size: 16px;
                color: #C3C3C3;
            }
            .box{
                width: 100%;
                display: flex;
                margin-top: 10px;
                display: grid;
                grid-template-columns: repeat(3,1fr);
                grid-template-rows: repeat(3,1fr);
                gap: 20px 10px;
                .img{
                    width: 135px;
                    height: 90px;
                    overflow: hidden;
                    border-radius: 5px;
                    position: relative;
                    img,video{
                        width: 100%;
                        height: 100%;
                        cursor: pointer;
                        border-radius: 5px;
                        object-fit: cover;
                        transition: all @transitionTime;
                        &:hover{transform: scale(1.1);}
                    }  
                }
            }
        }
        .trends{
            .box{
                grid-template-rows: 1fr;
            }
        }
    }
}

.login{
    width: 400px;
    height: 400px;
    background-color: #fff;
    border-radius: 25px;
    box-sizing: border-box;
    padding: 50px;
    position: relative;
    header{
        font-size: 24px;
        display: flex;
        justify-content: space-between;
        .icon-close{
            font-size: 14px;
            fill: currentColor;
            color: #B4B4B4;
            cursor: pointer;
            transition: all @transitionTime;
            &:hover{color: #70C000;}
        }
    }
    section{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        span{margin-bottom: 30px;}
        input{
            width:300px;
            height:30px;
            border-radius: 15px;
            border: none;
            outline: none;
            background-color: #F2F2F2;
            margin: 10px 0;
            text-align: center;
        }
        .button{
            width: 100%;
            display: flex;
            margin-top: 20px;
            justify-content: space-between;
            align-items: center;
            button{
                width: 140px;
                height: 30px;
                border-radius: 15px;
                font-size:12px;
                border: 0;
                outline: none;
                background-color: #70C000;
                color: #fff;
                margin-left: auto;
                cursor: pointer;
                border:1px solid  #70C000;
                transition: all @transitionTime;
                &:first-child{margin-left: 0px;}
                &:last-child{
                    background-color: #fff;
                    color: #70C000;
                    &:hover{color: #fff;}
                }
                &:hover{
                    background-color: rgb(19, 116, 19);
                    border:1px solid rgb(19, 116, 19);
                }
            } 
        }
    }
}

.manageAccount{
    width: 400px;
    height: 300px;
    background-color: #fff;
    border-radius: 25px;
    box-sizing: border-box;
    padding: 50px;
    header{
        font-size: 24px;
        display: flex;
        justify-content: space-between;
        .icon-close{
            font-size: 14px;
            fill: currentColor;
            color: #B4B4B4;
            cursor: pointer;
            transition: all @transitionTime;
            &:hover{color: #70C000;}
        }
    }
    section{
        margin-top: 20px;
        background-color: #F2F2F2;
        border-radius: 5px;
        font-size: 14px;
        padding: 20px;
        box-sizing: border-box;
        div{
            span:first-child{color: #A7A7A7;}
            span:last-child{color: #1D1D1D;margin-left: 10px;}
            &:last-child{margin-top: 20px;}
        }
    }
}

.changeBgColor:hover{
    background: rgba(255, 255, 255, .5)!important;
    &::placeholder{color:rgba(0,0,0,.5)!important;}
}

.image::after{
    content: '√';
    position: absolute;
    top: 0;
    left: 0;
    font-size: 24px;
    width: 135px;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background-color: rgba(0, 0, 0, .4);
} 

.addNavItem :not(:first-child):not(:last-child){margin: 10px 0;}
.iconSpan{background-color:rgba(255,255,255, .4)!important;}
.switchSpan{background-color: rgba(202,205,208)!important;}
.noteItemBorder{border-left: 4px #70C000 solid!important;}

.enlarge{animation: enlarge .25s ease forwards;}
.narrow{animation: narrow .25s ease forwards;}
.mottoAuthorShow{animation: mottoAuthorShow .25s ease forwards;}
.mottoAuthorHide{animation: mottoAuthorHide .01s ease forwards;}
.textareaEnlarge{animation: textareaEnlarge @transitionTime ease forwards;}
.textareaNarrow{animation: textareaNarrow @transitionTime ease forwards;}

@keyframes enlarge{from{width: 250px;}to{width: 530px;}}
@keyframes narrow{from{width: 530px;}to{width: 250px;}}
@keyframes mottoAuthorShow {from{opacity: 0;}to{opacity: 1;}}
@keyframes mottoAuthorHide {from{opacity: 1;}to{opacity: 0;}}
@keyframes textareaEnlarge{
    from{width: 400px;left: 200px;}
    to{width: 600px;left: 0;}
}
@keyframes textareaNarrow{
    from{width: 600px;left: 0;}
    to{width: 400px;left: 200px;}
}
@keyframes noteListShow{from{left: -190px;}to{left: 0;}}
@keyframes noteListHide{from{left: 0;}to{left: -190px;}}

.sameAnimateOne-enter-active,
.noteList-enter-active
{transition: all @transitionTime;}

.sameAnimateOne-leave-active,
.noteList-leave-active
{transition: all @transitionTime;}

.sameAnimateTwo-enter-active
{transition: all .25s;}

.sameAnimateTwo-leave-active
{transition: all .25s;}

.sameAnimateOne-enter,
.sameAnimateOne-leave-to,
.sameAnimateTwo-enter,
.sameAnimateTwo-leave-to
{opacity: 0;}

.noteList-enter{
    animation: noteListShow @transitionTime ease forwards;
    opacity: 0;
}
.noteList-leave-to{
    animation: noteListHide @transitionTime ease forwards;
    opacity: 0;
}

// 壁纸盒子滚动条样式
section::-webkit-scrollbar {
  width: 5px;
}
section::-webkit-scrollbar-thumb {
  background-color: #E5E5E5;
  border-radius: 2px;
}
</style>