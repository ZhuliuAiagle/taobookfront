<template>
    <el-menu-item :index="recordData.partner_id">
        <div style="padding: 6px 0;">
            <el-row>
                <el-col :span="6" style="padding-top: 16px; text-align:center;">
                    <el-avatar size="medium" :src="circleUrl"></el-avatar>&nbsp;
                </el-col>
                <el-col :span="18" style="padding-top: 6px;">
                        <span class="nickname">{{recordData.partner_nick}}</span>
                        <br/>
                        <span class="id">{{recordData.partner_id}}</span>
                </el-col>
            </el-row>
        </div>
    </el-menu-item>
</template>




<script>

export default {
    name: "MenuItem",
    props:{
        recordData: Object
    },
    data(){
        return{
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
        }
    }
}
</script>
