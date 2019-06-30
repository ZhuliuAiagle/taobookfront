<template>
    <div class="msg" style="width: 320px; margin-top: 20px;">
        <el-row>
            <el-col :span="4" style="padding-top:10px;">
                <el-avatar size="medium" :src="circleUrl" ></el-avatar>
            </el-col>
            <el-col :span="20">
                <span style="font-size:8px;">from {{msgData.sender_id}}, {{msgData.time}}</span>
                <br/>
                <span>{{msgData.content}}</span>
            </el-col>
        </el-row>
    </div>
</template>


<script>
export default {
    name: "MsgItem",
    props:{
        msgData: Object
    },
    data(){
        return{
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
        }
    }
}
</script>