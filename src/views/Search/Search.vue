<template>
    <div class="search">
        <h2 style="text-align: center">高级搜索</h2>
        <el-form :model="keyWordForm" class="search-form">
            <el-form-item>
                <el-input placeholder="请输入内容" v-model="keyWordForm.keyword" class="input-with-select">
                    <el-select v-model="keyWordForm.select">
                        <el-option label="书籍" value="1"></el-option>
                        <el-option label="用户" value="2"></el-option>
                        <el-option label="求购" value="3"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="onSubmit()"></el-button>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-checkbox-group v-model="keyWordForm.checkClazzList">
                    <el-checkbox v-for="item in clazzes" :key="item.value" :label="item.label"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <h2 style="text-align: center" v-if="searchFinish">搜索完毕，共{{result.length}}条结果</h2>
        <!-- <el-table :data="result" v-if="searchFinish" style="width: 100%;">
            <el-table-column prop="name" label="书名">
            </el-table-column>
            <el-table-column prop="publisher_id" label="发布者">
            </el-table-column>
            <el-table-column prop="clazz" label="类别">
            </el-table-column>
            <el-table-column prop="price" label="标价">
            </el-table-column>
            <el-table-column prop="stock" label="库存">
            </el-table-column>
        </el-table> -->
        <el-divider v-if="searchFinish"></el-divider>
        <item-short v-for="item in result" :key="item.id" :name="item.name" :clazz="item.clazz" :price="item.price" :detail="new Array(item)"></item-short>
    </div>
</template>

<script>
import itemShort from '../../components/itemShort/itemShort.vue'
export default {
    
    name: 'Search',
    components:{
        itemShort
    },
    mounted(){
        if(this.$store.state.user == "<undefined>"){
            this.$message("未登录，请先登录");
            this.$router.push('/login')
        }
    },
    data(){
        return {
            keyWordForm:{
                checkClazzList:[],
                select:"",
                keyword:""
            },
            clazzes:this.$store.state.clazzes,
            searchFinish:false,
            result:[]
        }
    },
    methods:{
        onSubmit:function(){
            var a = {
                clazz: this.keyWordForm.checkClazzList,
                keyword: this.keyWordForm.keyword
            }
            console.log(JSON.stringify(a))
            var url = this.$store.state.server
            var that = this
            axios.post(url + "/item/search", a).then(function(response){
                if(response.data.status == "success") {
                    that.searchFinish = true;
                    that.result = response.data.data;
                }else{
                    that.$message("查询出错，请稍后再试")
                }
            })
        }
    }
}
</script>

<style>
.search{
    text-align: center;
    width: 335px;
    margin: auto;
}
.el-select {
    width: 140px;
}
.el-input {
    width: 100%;
}
</style>