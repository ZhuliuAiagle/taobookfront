<template>
    <div class = "info-item">
        <el-row>
            <el-col :span="4" style="padding-top:40px 0;">
                <el-avatar size="medium" :src="circleUrl"></el-avatar>&nbsp;
            </el-col>
            <el-col :span="20" style="padding-top:30px 0;">
                <span style="font-size: 25px;">{{requestInfo.user_id}}&nbsp;&nbsp;</span>
                <span style="font-size: 5px;">{{requestInfo.time}}</span>
            </el-col>
        </el-row>
        <el-row>
            <span>{{requestInfo.name}}</span>
        </el-row>
        <el-row>
            <span style="font-size: 12px;">{{requestInfo.description}}</span>
        </el-row>
        <el-divider></el-divider>
    </div>
</template>
    


<script>
export default {
    name: "InfoItem",
    props:{
        requestInfo: Object
    },
    data(){
        return {
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
        }
    }

}
</script>

<style>

</style>
