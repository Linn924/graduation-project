<template>
    <div class="register">
        <!-- 遮罩 -->
        <div class="mask"></div>
        <!-- 主体内容 -->
        <section>
            <header></header>
            <main>
                <!-- 左侧修饰样式 -->
                <div class="main-left"></div>
                <!-- 右侧关于登录的部分 -->
                <div class="main-right">
                    <div class="register-form">
                        <div class="title">
                            <span @click="accountRegister" :style="{color:accountForm?'#2468F2':'#000'}">账号注册</span>
                            <span @click="faceRegister" :style="{color:faceForm?'#2468F2':'#000'}">人脸注册</span>
                        </div>
                        <div class="line"></div>
                        <div :class="accountForm?'line-special-left':'line-special-right'"></div>
                        <!-- 注册方法 -->
                        <div class="register-method">
                            <!-- 账号注册表单 -->
                            <div class="account-form" v-show="accountForm">
                                <div class="account-content">
                                    <el-form ref="registerFormRef" :model="registerForm" :rules="registerRules">
                                        <el-form-item>
                                            <el-input v-model="registerForm.username" clearable prefix-icon="el-icon-user-solid" 
                                                placeholder="请设置昵称" autofocus="true" @keyup.native="checkUname" 
                                                :class="isSuccess?'':'fail'" @blur="checkUname"></el-input>
                                            <span class="check" :style="{color:validateForm.success?'#67C23A':'#F56C6C'}">
                                                {{validateForm.value}}</span>
                                        </el-form-item>
                                        <el-form-item prop="password">
                                            <el-input v-model="registerForm.password" clearable prefix-icon="el-icon-lock" 
                                                type="password" placeholder="请设置密码"></el-input>
                                        </el-form-item>
                                        <el-form-item prop="email">
                                            <el-input v-model="registerForm.email" clearable prefix-icon="el-icon-message" 
                                                placeholder="可用于评论等功能"></el-input>
                                        </el-form-item>
                                    </el-form>
                                    <button @click="register">注册</button>
                                    <div class="account-end">
                                        已有账号？<router-link to="/logon">登录</router-link>
                                    </div>
                                    <p class="account-tips">温馨提示：请按照规定注册账号哦!</p>
                                </div>
                            </div>
                            <!-- 人脸注册表单 -->
                            <div class="face-form" v-show="faceForm">
                                <div class="distinguish-box"></div>
                                <button>开启摄像头</button>
                                <p class="face-tips">温馨提示：只有打开摄像头才能注册哦!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer></footer>
        </section>
    </div>
</template>

<script>
export default {
    data(){
        // 验证邮箱的规则
        var checkEmail = (rule, value, cb) => {
            // 验证邮箱的正则表达式
            const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
            if (regEmail.test(value)) {
                // 合法的邮箱   
                return cb()
            }
            cb(new Error('请输入合法的邮箱'))
        }
        return {
            accountForm:true,//显示账号注册
            faceForm:false,//隐藏人脸注册
            registerForm:{//注册表单数据
                username:'',
                password:'123456',
                email:'linn924@126.com'
            },
            registerRules:{//注册表单验证规则
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { validator: checkEmail, trigger: 'blur' }
                ]
            },
            timer:null,//设置定时器初始值
            validateForm:{//验证表单
                value:'',
                success:''
            },
            isSuccess:true,//控制昵称输入框的边框颜色变化
        }
    },
    watch:{
        'registerForm.username':{
            handler: function(value) {
                if(value.trim().length === 0){
                    this.validateForm.value = ''
                    this.validateForm.success = ''
                    this.isSuccess = true
                }
            },
        }
    },
    methods:{
        //检查昵称是否可用
        checkUname(){
            clearTimeout(this.timer)
            this.timer = setTimeout(async () => {
                const {data:res} = await this.axios.post('checkUname',this.registerForm)
                if(res.code != 200){
                    this.validateForm.success = false
                    this.isSuccess = false
                }
                else{
                    this.validateForm.success = true
                    this.isSuccess = true
                }
                this.validateForm.value = res.tips
            },500)
        },
        //注册
        async register(){
            if(this.registerForm.username.trim() === '' || !this.isSuccess){
                this.checkUname()
                return this.$message({message: `请按照规定注册账号`,type: 'error',duration:1000})
            }
            this.$refs.registerFormRef.validate( async valid => {
                if(!valid) return this.$message({message: `请按照规定注册账号`,type: 'error',duration:1000})
                const {data:res} = await this.axios.post('register',this.registerForm)
                if(res.code != 200) return this.$message({message: `${res.tips}`,type: 'error',duration:1000})
                this.$message({message: `${res.tips}`,type: 'success',duration:1000})
                this.$refs.registerFormRef.resetFields()
                this.registerDialog = false
            })
        },
        //账号注册
        accountRegister(){
            this.faceForm = false
            this.accountForm = true
        },
        //人脸注册
        faceRegister(){
            this.faceForm = true
            this.accountForm = false
        }
    }
}
</script>

<style lang="less" scoped>
.register{
    height: 100vh;
    background: url(https://s3.ax1x.com/2020/12/04/DqiyWD.jpg) no-repeat center center;
    .mask{
        height: 100%;
        background-image: radial-gradient(rgba(0,0,0,0) 0%,rgba(0,0,0,0.5) 100%),radial-gradient(rgba(0,0,0,0) 33%,rgba(0,0,0,0.3) 166%);
    }
    section{
        position: absolute;
        top: 0;
        width: 100vw;
        height: 100vh;
    }
}
section{
    header,footer{
        padding: 70px 0;
        height: 20px;
        width: 90vw;
        margin: 0 auto;
    }
    main{
        width: 90vw;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
    }
}
main{
    .main-right{
        width: 480px;
        height: 620px;
        background-color:rgba(255,255,255,.5);
        border-radius: 15px;
        box-shadow: 0 10px 20px 0px rgba(0, 0, 0, .05);
        box-sizing: border-box;
        padding: 60px 40px;
        .register-form{
            width: 100%;
            height: 100%;
            position: relative;
            .title{
                display: flex;
                justify-content: space-around;
                padding: 20px 0;
                font-size: 20px;
                cursor: pointer;
            }
            .line{
                border: 1px solid #ECECEC;
            }
        }
        
    }
}
.register-method{
    height: 100%;
    width: 100%;
    display: flex;
    .account-form{
        margin: 0 auto;
        .account-content{
            padding-top: 10px;
            button{
                margin-top: 18px;
                width: 320px;
                padding: 12px 0;
                border-radius: 20px;
                border: none;
                outline: none;
                background-color: #BDCEFC;
                color: #fff;
                cursor: pointer;
            }
        }
        .account-end{
            display: flex;
            justify-content: flex-end;
            margin-top: 35px;
            a{
                color: #2468F2;
                cursor: pointer;
            } 
        }
        .account-tips{
            margin-top: 30px;
            font-size: 12px;
            line-height: 2;
            color: rgba(0, 0, 0);
        }
    }
    .face-form{
        margin: 0 auto;
        .distinguish-box{
            width: 200px;
            height: 200px;
            border-radius: 50%;
            border: 1px solid #ccc;
            margin: 20px auto;
            margin-bottom: 20px;
        }
        button{
            width: 320px;
            padding: 12px 0;
            border-radius: 20px;
            border: none;
            outline: none;
            background-color: #2468F2;
            color: #fff;
            cursor: pointer;
        }
        .face-tips{
            margin-top: 20px;
            font-size: 12px;
            line-height: 2;
            color: rgba(0, 0, 0);
        }
    }
}
.el-form-item{
    padding-top: 15px;
}
.check{
    position: absolute;
    top: 30px;
    left: 0;
    font-size: 12px;
}
.line-special-left{
    position: absolute;
    top: 66px;
    left: 0;
    width: 200px;
    border: 1px solid #2468F2;
}
.line-special-right{
    position: absolute;
    top: 66px;
    left: 200px;
    width: 200px;
    border: 1px solid #2468F2;
}
</style>