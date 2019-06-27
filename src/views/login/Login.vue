<template>
  <div class="login">
    <el-container>
        <el-header><el-row>淘书网 - 登录</el-row></el-header>
        <el-main>
            <div class="login-block">
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
                        <el-button round>我要注册</el-button>
                    </el-row>
                </div>
            </div>
            <div class="fulfill">

            </div>
        </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'home',
    data(){
        return{
            username: "",
            password: ""
        }
    },
    methods:{
        login:function(){
            var url = this.$store.state.server
            var that = this
            axios.get(url + "/login").then(function(response){

            })
        }
    }
}
</script>



<style>
.fulfill{
    height: 100%;
    height: 346px;
}
.login-block{
    background-color: #DCDFE6;
    margin-top:100px;
    padding-top: 50px;
    padding-bottom: 50px;
    width: 300px;
    margin-left: auto;
    margin-right: auto;
    align-self: center;
}
.login-input{
    text-align: center;
}
.el-input{
    width: 260px;
}
.el-header{
    background-color:transparent;
    color: #fff;
    text-align: left;
    line-height: 60px;
    z-index: 999;
    font-size: 20px;
}
.el-main {
    color: #333;
    text-align: center;
    line-height: 60px;
    height: 100%;
}

.el-footer {
    background-color: #000;
    color: #fff;
    text-align: left;
    line-height: 60px;
}
.login{
    background-image: url("../../assets/login_bg.jpg");
    background-repeat:repeat-y;
}
</style>

