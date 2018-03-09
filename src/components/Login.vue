<template>
    <div class='login_container'>
        <div class="background_layer"></div>
        <div class='color_layer'></div>
        <div class="login_layer">
           <div class='company_label'>
               <div class='tencent_logo_container'>
                   <img class='tencent_logo' src='http://smartdata.b0.upaiyun.com/thinkmark/login-logo.png' alt='腾讯云'></img>
               </div>
               <div class='td_logo_container'>
                   <img class='td_logo' src='http://smartdata.b0.upaiyun.com/thinkmark/td-logo.png' alt='TalkingData'></img>
               </div>
               <div class='clear_float'></div>
           </div>
           <div class='product'>
               <div class='name'>智选</div>
               <div class='describe'>大数据地域进驻和选址平台</div>
           </div>
           <div class='form'>
                <form @keyup.enter="submit">
                    <Input class='username' v-model="loginModel.username" @on-focus='focusName' placeholder="输入注册邮箱" ></Input>
                    <span class='name_error'>{{nameError}}</span>
                    <Input class='password' type='password' v-model="loginModel.password" @on-focus='focusPassword'placeholder="6-32位密码" ></Input>
                    <span class='password_error'>{{passwordError}}</span>
                    <Checkbox class='check' v-model="isCheck">自动登录</Checkbox>
                    <Button type='info' @click='submit' class='submit_btn'>登录</Button>
                </form>
           </div>
                   <!--  <form @keyup.enter="submit">
                        <input v-model="loginModel.username" type="text" class="login-user" placeholder="请输入用户名" @focus="focus">
                        <input v-model="loginModel.password" type="password" class="login-pw" placeholder="请输入密码" @focus="focus">
                        <div v-show="login_error" class="login-error">{{ error }}</div>
                        <div class="find-div clearfix">
                            <div v-show="rememberMe" class="rem-label">
                                <label> <Checkbox v-model="single">记住我</Checkbox></label>
                            </div>
                            <a v-show="findPw" class="forget-pw">忘记密码?</a>
                            <a v-show="register" class="register-pw">注册</a>
                        </div>
                        <i-button type="success" long @click="submit" @keyup.enter="submit" :disabled="waitBtn">{{ submitBtn }}</i-button>
                    </form> -->
            <div class="login_foot">2011-2018 © TalkingData.com</div>
        </div>
      
    </div>
</template>
<script>
    import util from '@/assets/js/util'
    import _resource from '@/assets/js/resource'
    
    export default {
        name:'login',
        props: {
            findPw: { // true 保留忘记密码功能  false 删除忘记密码功能
                type: Boolean,
                default: false
            },
            rememberMe: { // true 保留记住我功能  false 删除记住我功能
                type: Boolean,
                default: false
            },
            register: { // true 保留注册功能  false 删除注册功能
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                loginError:false,
                nameError:'',
                passwordError:'',
                isCheck:true,
                msg: '',
                loginModel: {
                    username: 'demo@tendcloud.com',
                    password: 'demo'
                },

            }
        },
        methods: {
            focusName() {
                let vm = this
                vm.loginError = false
                vm.nameError = ''
            },
            focusPassword() {
                let vm = this
                vm.loginError = false
                vm.passwordError = ''
            },
            submit(event) {
                event.preventDefault()
                if (!this.loginModel.username) {
                    this.loginError = true
                    this.nameError = '请输入用户名'
                } else if(!this.loginModel.password){
                    this.loginError = true
                    this.passwordError = '请输入密码'
                }
                else { 
                    if(this.loginModel.username === 'demo@tendcloud.com' && this.loginModel.password === 'demo'){
                        this.loginError = false;
                        this.$router.push('/map');
                    }
                    else{
                        this.passwordError = '用户名或密码错误';
                    }

                    // const form = new FormData()
                    // form.append('userCertificate', this.loginModel.username)
                    // form.append('password', this.loginModel.password)

                    // let requestList = [];
                    // requestList.push(this.$axios(util.makeRequest({
                    //     url: _resource.userLogin,
                    //     data: form,
                    //     method: 'post'
                    // })))

                    // this.$axios.all(requestList)
                    //     .then(this.$axios.spread((acct,perm,para) => {
                    //         if (acct) {
                    //             
                    //         }
                    //     })).catch((response) => {
                    //     if (response.response) {
                    //         if (response.response.status === 400) {
                    //             this.login_error = true
                    //             this.error = '用户名或密码错误，请重新输入'
                    //         }
                    //     } else {
                    //         this.login_error = true
                    //         this.error = '与服务器连接超时，请重试'
                    //     }
                    // })





                    // var url = 'http://127.0.0.1:3000/test';
                    // this.$axios({
                    //     method: 'get',
                    //     url: url,
                    //     // headers: {
                    //     //     'Authorization': 'Basic d2ViX2FwcDo='
                    //     // },
                    //     //data: form
                    // }).then((response) => {
                    //     if (response) {
                    //         console.log('response is ',response)
                    //         //localStorage.setItem('access_token', response.data.access_token)
                    //         //this.$router.push('/')
                    //     }
                    // }).catch((response) => {
                    //     if (response.response) {
                    //         if (response.response.status === 400) {
                    //             this.login_error = true
                    //             this.error = '用户名或密码错误，请重新输入'
                    //         }
                    //     } else {
                    //         this.login_error = true
                    //         this.error = '与服务器连接超时，请重试'
                    //     }
                    // })
                }
            },
        },
        mounted() {}
    }
</script>

<style scoped>
@import './login.css';
</style>

<style>
.login_container{
    .username,.password{
        .ivu-input{
            height:40px;
            font-size:14px;
            line-height:22px;
        }
    }

}
    

</style>

