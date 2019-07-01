<template>
<div class="chat">
    <el-container style="height: 100%; border: 1px solid #eee">
         <el-aside width="300px">
             <chat-menu :records="records" @onNewSend="refresh()"></chat-menu>
         </el-aside>
         <chat-area :id="$store.state.index" :records="records[getIdById].records" @onSend="refresh();"></chat-area>
    </el-container>
</div>
</template>



<script>
import ChatMenu from '../../components/chat/ChatMenu'
import ChatArea from '../../components/chat/ChatArea'
export default {
    name:'chat',
    components:{
        ChatMenu,
        ChatArea
    },
    mounted(){
        const that = this
        var int
        axios.post(that.$store.state.server + "/message/msglist",{
            user_id: that.$store.state.user
        }).then(function(response){
            if(response.data.status == "success"){
                console.log(response.data)
                that.records =  response.data.data
                /*setInterval(() => {
                    that.refresh()
                },20000)*/
            }else{
                that.$message("获取失败")
            }
        })
    },
    data(){
        return{
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
            records: []
        }
    },
    computed:{
        getIdById: function(){
            var ins = this.$store.state.index;
            for(var i = 0; i < this.records.length; i++){
                if(this.records[i].partner_id == ins) return i;
            }
            return 0;
        }
    },
    methods:{
        refresh: function(){
            const that = this
            axios.post(that.$store.state.server + "/message/msglist",{
                user_id: that.$store.state.user
            }).then(function(response){
                if(response.data.status == "success"){
                    console.log(response.data)
                    that.records =  response.data.data
                }else{
                    that.$message("刷新失败")
                }
            })
        }
    }
}
</script>





<style>
@media screen and (max-width: 600px){
   .chat .el-aside{
     display: none;
   }
}
.chat{
    height: 100%;
}
.chat .el-aside{
    background-color:rgb(254, 254, 255);
}

</style>