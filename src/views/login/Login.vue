<template>
  <div class="login" id="lg" >
    <el-container>
        <el-header><el-row>淘书网 - 登录</el-row></el-header>
        <el-main>
            <!-- login block -->
            <div class="login-block" v-if="mode==1">
                <div style="font-size: 50px;">
                <i class="el-icon-s-goods"></i>
                </div>
                <div style="font-size:20px; ">
                    欢迎来到淘书网
                </div>
                <div class = "login-input">
                    <el-row>
                        <el-input placeholder="请输入账号" v-model="username"></el-input>
                    </el-row>
                    <el-row>
                        <el-input placeholder="请输入密码" show-password v-model="password"></el-input>
                    </el-row>
                    <el-row>
                        <el-button type="primary" round @click="login">登录</el-button>
                        <el-button round  @click="mode=2;">我要注册</el-button>
                    </el-row>
                    <el-link href="https://element.eleme.io" target="_blank" type="primary">忘记密码？</el-link>
                </div>
            </div>
            <!-- register block -->
            <div class="register-block" v-if="mode==2">
                <div style="font-size: 50px;">
                <i class="el-icon-s-custom"></i>
                </div>
                <div style="font-size:20px; ">
                    欢迎加入淘书网
                </div>
                <div class = "login-input">
                    <el-row>
                        <el-input placeholder="id(6-12位字母数字)" v-model="usr_reg" minlength="6"  maxlength="12" show-word-limit></el-input>
                    </el-row>
                    <el-row>
                        <el-input placeholder="请输入密码(6位以上)" show-password v-model="pas_reg" minlength="6" show-word-limit></el-input>
                    </el-row>
                    <el-row>
                        <el-input placeholder="请确认密码" show-password v-model="pas_confirm"></el-input>
                    </el-row>
                    <el-row>
                        <el-input placeholder="请选择一个昵称" v-model="nickname"></el-input>
                    </el-row>
                    <el-row>
                        <el-select v-model="sex" placeholder="请选择你的性别">
                            <el-option label="男" value="male"></el-option>
                            <el-option label="女" value="female"></el-option>
                            <el-option label="保密" value="secret"></el-option>
                        </el-select>
                    </el-row>
                    <el-row>
                        <el-input placeholder="手机（必填）" v-model="phone"></el-input>
                    </el-row>
                    <el-row>
                        <el-input placeholder="邮箱（必填）" v-model="email"></el-input>
                    </el-row>
                    <el-row>
                        <el-date-picker placeholder="生日" v-model="birthday" style="width:260px;"></el-date-picker>
                    </el-row>
                    <el-row>
                        <el-button type="primary" round @click="register">注册并登录</el-button>
                        <el-button round @click="mode=1;">我有账号</el-button>
                    </el-row>
                </div>
            </div>
        </el-main>
    </el-container>
  </div>
</template>

<script>

import axios from 'axios';
import { escape } from 'querystring';
import { type } from 'os';

export default {
    name: 'login',
    data(){
        return{
            username: "",
            password: "",
            mode: 1, // mode 判断当前处于登录模式还是注册模式
            usr_reg:"",
            nickname:"",
            pas_reg:"",
            pas_confirm:"",
            sex:"",
            birthday:null,
            phone:"",
            email:""
        }
    },
    methods:{
        login:function(){
            var url = this.$store.state.server
            var that = this;
            if(this.username.length == 0 || this.password.length == 0) {this.$message("用户名和密码不能为空"); return -1;}
            axios.post(url + "/login", {
                username: that.username,
                password: that.password
            }).then(function(response){
                if(response.data == "SUCCESS"){
                    that.$message("登录成功")
                    that.$store.state.user = that.username
                    that.$router.push({path:"/index"});
                }else{
                    that.$message("用户名或密码错误！");
                }
            })
        },
        dateToString:function(d){
            var month = '' + (d.getMonth() + 1);
            var day = '' + d.getDate();
            var year = d.getFullYear();
            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            return [year, month, day].join('-');
        },
        register:function(){
            var that = this
            if(that.usr_reg.length == 0)  {this.$message("用户名不能为空"); return -1}
            if(that.birthday == null) {this.$message("生日不能为空"); return -1}
            if(that.sex.length == 0) {this.$message("请选择性别"); return -1}
            if(that.phone.length == 0) {this.$message("请输入电话或手机号"); return -1}
            if(that.pas_reg != that.pas_confirm) {this.$message("两次密码不一致"); return -1}
            if(that.pas_reg.length <= 6 ) {this.$message("密码强度不够"); return -1}
            var url = this.$store.state.server
            var sexy = 0
            console.log(that.birthday)
            console.log(typeof(that.birthday))
            console.log(this.dateToString(that.birthday))
            var bir = this.dateToString(that.birthday)
            if(that.sex == "male") sexy = 1
            else if(that.sex == "female") sexy = 0
            else sexy = 0
            if(that.email.indexOf("@") == -1) this.$message("邮箱格式不正确")
            else{
                axios.post(url + "/register",{
                    username: that.usr_reg,
                    role:1,
                    nickname: that.nickname,
                    password: that.pas_reg,
                    sex:sexy,
                    birthday: bir,
                    phone: that.phone,
                    email: that.email
                }).then(function(response){
                    if(response.data == "SUCCESS"){
                        that.$message("注册成功，已经为您进行自动登录")
                        that.$router.push({path:"/index"})
                    }else{
                        that.$message("注册失败: 表单中含有非法字符")
                    }
                })
            }
        }
    }
}
</script>



<style>
.login .register-block{
    background-color: #DCDFE6;
    margin-top:40px;
    padding-top: 50px;
    padding-bottom: 50px;
    width: 300px;
    margin-left: auto;
    margin-right: auto;
    align-self: center;
}
.login .login-block{
    background-color: #DCDFE6;
    margin-top:100px;
    padding-top: 50px;
    padding-bottom: 50px;
    width: 300px;
    margin-left: auto;
    margin-right: auto;
    align-self: center;
}
.login .login-input{
    text-align: center;
}
.login .el-input{
    width: 260px;
}
.login .el-header{
    background-color:transparent;
    color: #fff;
    text-align: left;
    line-height: 60px;
    font-size: 20px;
}
.login .el-main {
    color: #333;
    text-align: center;
    line-height: 60px;
    height: 100%;
    background-color:transparent;
}
.login .el-footer {
    background-color: #000;
    color: #fff;
    text-align: left;
    line-height: 60px;
}
.login{
    height:100%;
    background-image: url("../../assets/login_bg.jpg");
    background-repeat:repeat-y;
    background-size:cover;
}
</style>

