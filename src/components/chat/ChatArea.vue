<template>
    <el-container class="chat-area" style="width: 100%; height: 100%;" v-if="areaVisible">
        <el-header>{{id}}</el-header>
        <el-main style="text-align:left;">
            <msg-item v-for="item in records" :key="item.id" :msgData="item"></msg-item>
        </el-main>
        <el-footer style="height: 100px;">
            <el-row>
                <el-col :span="18">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="textarea"
                        maxlength="100"
                        show-word-limit
                        style="padding-top: 5px; padding-right: 5px; width: 100%; padding-left: 10px;">
                    </el-input>
                </el-col>
                <el-col :span="6" style="padding: 5px;">
                    <el-button type="primary"
                    style="padding: 20px;" @click="onSend();"
                    >发送</el-button>
                </el-col>
            </el-row>
        </el-footer>
    </el-container>
</template>
    


<script>
import MsgItem from './MsgItem'
export default {
    name:'ChatArea',
    components:{
        MsgItem
    },
    props:{
        id: String,
        records: Array
    },
    data(){
        return{
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
            textarea:""
        }
    },
    computed:{
        areaVisible:function(){
            return this.$store.state.index == "" ? false : true;
        }
    },
    methods:{
        onSend: function(){
            var a = {
                type: 1,
                from_uid: this.$store.state.user,
                to_uid: this.$store.state.index,
                content:this.textarea
            }
            const that = this;
            if(this.textarea.length <= 0) this.$message("内容不能为空")
            
            else{
                axios.post(this.$store.state.server + '/message/send',a).then(
                    function(response){
                        if(response.data == "SUCCESS"){
                            that.textarea = ""
                            that.$emit('onSend')
                        }else{
                            that.$message("发送失败：" + response.data);
                        }
                    }
                )
            }
        }
    }
}
</script>

<style>
.chat-area .el-header{
    text-align: center; 
    padding: 13px 0;
    font-size: 12px; 
    background-color: rgb(255, 255, 255);
    font-size:25px;
}
.chat-area .el-footer{
    text-align: center; 
    padding: 13px 0;
    font-size: 12px; 
    background-color: white;
    font-size:25px;
}
.chat-area .input-area{
    padding: 2px 0;
}

.chat-area .el-main{
    background-color:#d6d5d3cc;
}
</style>
