<template>
    <div class="homepage">
        <el-button @click="loginDialog = true" type="primary">账号密码登录</el-button>
        <el-button @click="registerDialog = true">账号密码注册</el-button>
        <el-button type="primary" @click="registerFace">人脸识别登录</el-button>
        <el-button>人脸识别注册</el-button>

        <!-- 登录对话框 -->
        <el-dialog title="LOGIN" :visible.sync="loginDialog" width="30%" center>
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" clearable prefix-icon="el-icon-user-solid"
                        placeholder="username" autofocus="true"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" clearable prefix-icon="el-icon-lock"
                        type="password" placeholder="password"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="loginDialog = false">取 消</el-button>
                <el-button type="primary" @click="login">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 注册对话框 -->
        <el-dialog title="REGISTER" :visible.sync="registerDialog" width="30%" center @closed="closeDialog">
            <el-form ref="registerFormRef" :model="registerForm" :rules="registerRules">
                <el-form-item>
                    <el-input v-model="registerForm.username" clearable prefix-icon="el-icon-user-solid" 
                        placeholder="username" autofocus="true" @keyup.native="checkUname" 
                        :class="isSuccess?'':'fail'" @blur="checkUname"></el-input>
                    <span class="check" :style="{color:validateForm.success?'#67C23A':'#F56C6C'}">
                        {{validateForm.value}}</span>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="registerForm.password" clearable prefix-icon="el-icon-lock" 
                        type="password" placeholder="password"></el-input>
                </el-form-item>
                <el-form-item prop="email">
                    <el-input v-model="registerForm.email" clearable prefix-icon="el-icon-message" 
                        placeholder="email"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="registerDialog = false">取 消</el-button>
                <el-button type="primary" @click="register">确 定</el-button>
            </span>
        </el-dialog>

        <video id="video"></video>
        <canvas id="canvas" style="display:none"></canvas>
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
            loginDialog:false,//隐藏登录对话框
            loginForm:{//登录表单数据
                username:'simon',
                password:'123456'
            },
            loginRules:{//登录表单验证规则
                username:[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 4, max: 10, message: '长度在 4 到 10 个字符', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }
                ]
            },
            registerDialog:false,//隐藏注册对话框
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
            mediaStreamTrack:null,
            image:''
        }
    },
    created(){
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
        //登录
        async login(){
            this.$refs.loginFormRef.validate( async valid => {
                if(!valid) return
                const {data:res} = await this.axios.post('login',this.loginForm)
                if(res.code != 200) return this.$message({message: `${res.tips}`,type: 'error',duration:1000})
                this.$message({message: `${res.tips}`,type: 'success',duration:1000})
                this.$refs.loginFormRef.resetFields()
                this.loginDialog = false
            })
        },
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
            this.$refs.registerFormRef.validate( async valid => {
                if(!valid || !this.isSuccess) return this.$message({message: `请按照规定注册账号`,type: 'error',duration:1000})
                const {data:res} = await this.axios.post('register',this.registerForm)
                if(res.code != 200) return this.$message({message: `${res.tips}`,type: 'error',duration:1000})
                this.$message({message: `${res.tips}`,type: 'success',duration:1000})
                this.$refs.registerFormRef.resetFields()
                this.registerDialog = false
            })
        },
        //所有触发关闭对话框的操作
        closeDialog(){
            this.$refs.registerFormRef.resetFields()
            this.validateForm.value = ''
            this.validateForm.success = ''
            this.registerForm.username = ''
            this.isSuccess = true
        },
        // getUserMediaToPhoto(constraints,success,error){
        //     if(navigator.mediaDevices.getUserMedia){
        //         //最新标准API
        //         navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error)
        //     }else if (navigator.webkitGetUserMedia) {
        //         //webkit核心浏览器
        //         navigator.webkitGetUserMedia(constraints,success,error)
        //     }else if(navigator.mozGetUserMedia){
        //         //firefox浏览器
        //         navigator.mozGetUserMedia(constraints,success,error)
        //     }else if(navigator.getUserMedia){
        //         //旧版API
        //         navigator.getUserMedia(constraints,success,error)
        //     }
        // },
        // getFace() {
        //     let video = document.getElementById('video')
        //     let canvas = document.getElementById('canvas')
        //     let context = canvas.getContext('2d')
        //     context.drawImage(video,0,0,480,320)
        //     let img=canvas.toDataURL('image/jpg')
        //     this.image=img.split(',')[1]
        // },
        // openUserMedia() {
        //     let video = document.getElementById('video')
        //     if(navigator.mediaDevices.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia){
        //         this.getUserMediaToPhoto({video:{width:480,height:320}},this.success,this.error)
        //     }else{
        //         alert('你的浏览器不支持访问用户媒体设备')
        //     }
        // },
        // offUserMedia() {
        //     if(this.mediaStreamTrack!=null)
        //     this.mediaStreamTrack.getTracks()[0].stop()
        // },
        // success(stream){
        //     let video = document.getElementById('video')
        //     this.mediaStreamTrack = stream
        //     try {
        //        video.srcObject=stream
        //     }catch (e) {
        //         console.log("访问用户媒体设备失败")
        //     }
        //     video.play()
        //     this.getFace()
        // },
        // error(){
        //     console.log('访问用户媒体失败')
        // },
        async registerFace(){
            let imageForm = {
                image:'027d8308a2ec665acb1bdf63e513bcb9',
                image_type:'FACE_TOKEN',
                group_id:'1',
                user_id:'simon'
            }
            const data = await this.axios.post('/api/rest/2.0/face/v3/faceset/user/add?access_token=24.1d63aaf10303338f16a04672f052c4b3.2592000.1609588862.282335-23089520',imageForm)
            console.log(data)
        }
    }
}
</script>

<style lang="less" scoped>
.check{
    position: absolute;
    top: 30px;
    left: 0;
    font-size: 12px;
}
</style>