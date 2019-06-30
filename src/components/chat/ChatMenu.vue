<template>
    <div class="chat-menu">
        <el-menu @select="handleSelect">
            <menu-item v-for="item in records" :key="item.id" :recordData="item"></menu-item>
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
        }
    },
    methods:{
        handleSelect: function(index, indexPath){
            this.$store.state.index = index
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