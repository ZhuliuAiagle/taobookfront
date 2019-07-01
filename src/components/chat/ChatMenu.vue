<template>
    <div class="chat-menu">
        <el-menu @select="handleSelect">
            <menu-item v-for="item in records" :key="item.id" :recordData="item"></menu-item>
            <el-menu-item style="text-align:center;" index="_new_">
                <span style="padding-top: 20px;">发起新聊天</span>
                <div v-if="inputVisible">
                    <br/>
                    <br/>
                    <el-input placeholder="请输入id" v-model="newChat"></el-input>
                    <br/>
                    <br/>
                    <el-button type="primary" @click="handleChat()">发起会话</el-button>
                </div>
            </el-menu-item>
        </el-menu>
    </div>
</template>



<script>
import MenuItem from './MenuItem'
export default {
    name:'ChatMenu',
    components:{
        MenuItem
    },
    props:{
        records: Array
    },
    data(){
        return{
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
            inputVisible: false,
            newChat:""
        }
    },
    methods:{
        handleSelect: function(index, indexPath){
            if(index == "_new_"){
                this.inputVisible = true;
            }else{

                this.$store.state.index = index
                this.inputVisible = false
                
            }
        },
        handleChat:function(){
            if(this.newChat.length > 0){
                var a = {
                    type: 1,
                    from_uid: this.$store.state.user,
                    to_uid: this.newChat,
                    content:"和你打了一个招呼"
                }
                const that = this;
                axios.post(this.$store.state.server + '/message/send',a).then(
                    function(response){
                        if(response.data == "SUCCESS"){
                            that.$message("创建成功");
                            that.inputVisible = false
                            that.newChat = ""
                            that.$emit('onNewSend')
                        }else{
                            that.$message("发送失败：无此用户");
                        }
                    }
                )
            }else{
                this.$message("id不能为空")
            }
        }
    }
}
</script>




<style>
.chat-menu .el-menu-item{
    height: 85px;
    line-height: 30px;
}
.chat-menu .nickname{
    font-size: 20px;
}
.chat-menu .id{
    color:rgb(0, 75, 19);
}
</style>