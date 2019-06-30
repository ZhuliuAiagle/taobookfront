<template>
    <div class="request">
        <div class="inner-class">
            <h1>求购信息发布</h1>
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}"
                placeholder="描述你的需求..." v-model="reqForm.reqText" maxlength="150" @focus="formVisible=true" show-word-limit>
            </el-input>
            <el-divider></el-divider>
            <div class = "form-collapse" v-show="formVisible">
                <el-input v-model="reqForm.reqDes" type="text" placeholder="请输入标题" maxlength="30" show-word-limit>
                </el-input>
                <el-select v-model="reqForm.clazz" placeholder="分类">
                    <el-option v-for="item in clazzes" :key="item.value" :label="item.label"
                    :value="item.value"></el-option>
                </el-select>
                <el-row class="input-group">
                    <el-input class="price-input" v-model="reqForm.priceUp" type="number" placeholder="预期高价"></el-input>
                    <el-input class="price-input" v-model="reqForm.priceDown" type="number" placeholder="预期低价"></el-input>
                </el-row>
                <el-date-picker placeholder="期望配送日期" v-model="reqForm.expDate" style="width: 335px;"></el-date-picker>
                <el-input v-model="reqForm.img" type="text" placeholder="图片链接">
                </el-input>
                <div class = "pub-button">
                    <el-button type="primary" style="margin-top: 10px;" @click="onSubmit()">发布</el-button>
                    <el-button style="margin-top: 10px;" @click="formVisible=false">收起</el-button>
                </div>
            </div>
            <div class="info-stream" style="text-align: left;">
                <info-item v-for="item in dt" :key="item.id" :requestInfo="item"></info-item>
            </div>
        </div>
    </div>
</template>
<script>
import InfoItem from "../../components/request/InfoItem"

export default {
    name: 'request',
    components:{
        InfoItem
    },
    mounted(){
        if(this.$store.state.user == "<undefined>"){
            this.$message("未登录，请先登录");
            this.$router.push('/login')
        }
        const that = this;
        axios.post(this.$store.state.server + "/request/timeline").then(
            function(response){
                if(response.data.status == "success"){
                    console.log(response.data.data);
                    that.dt = response.data.data
                }
                else{
                    that.$message("获取失败")
                }
            }
        )
    },
    data(){
        return {
            clazzes:this.$store.state.clazzes,
            reqForm:{
                reqText:"",
                reqDes:"",
                clazz:"",
                priceUp:0,
                priceDown:0,
                expDate:null,
                img: ""
            },
            formVisible: false,
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
            dt:[]
        }
    },
    methods:{
        onSubmit:function(){
            var a = {
                user_id: this.$store.state.user,
                name: this.reqForm.reqDes,
                clazz: this.reqForm.clazz,
                description: this.reqForm.reqText,
                price_ceil: this.reqForm.priceUp,
                price_floor: this.reqForm.priceDown,
                deli_time: this.dateToString(this.reqForm.expDate),
                img: this.reqForm.img
            }
            console.log(a)
            const that = this
            axios.post(this.$store.state.server + "/request/add",a).then(function(response){
                if(response.data = "SUCCESS"){
                    that.$message("发布成功")
                }else{
                    that.$message("发布失败："+response.data)
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
        }
    }
}

</script>

<style>
.inner-class{
    width: 335px;
    margin:0 auto;
    line-height: 50px;
}
.inner-class .el-select{
    width: 335px;
}
.inner-class .price-input{
    width: 167px;
}
</style>