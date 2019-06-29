<template>
    <div class="front-page">
        <el-carousel :interval="5000" arrow="always">
            <el-carousel-item v-for="item in imgList" :key="item.id" >
                <el-row>
	                <el-col :span="24"><img ref="imgHeight" :src="item.idView" class="banner_img"/></el-col>
	            </el-row>
            </el-carousel-item>
        </el-carousel>
        <br/>
        <div class="front-class">
            <item-short v-for="item in result" :key="item.id" :name="item.name" :clazz="item.clazz" :price="item.price" :detail="new Array(item)"></item-short>
        </div>
    </div>
</template>




<script>
import itemShort from '../../components/itemShort/itemShort.vue'
import TableComponent from '../../components/tableComponent/TableComponent.vue'

export default {
    name: 'frontPage',
    components:{
        itemShort,
        TableComponent
    },
    mounted(){
        var a = {
                clazz: [],
                keyword: ""
        }
        console.log(JSON.stringify(a))
        var url = this.$store.state.server
        var that = this
        axios.post(url + "/item/search", a).then(function(response){
            if(response.data.status == "success") {
                that.searchFinish = true;
                that.result = response.data.data;
            }else{
                alert("查询出错，请稍后再试")
            }
        })
    },
    data(){
        return{
            imgList: [
                {id: 0, idView: require('../../assets/1.jpg')},
                {id: 1, name: '详情', idView: require('../../assets/2.jpg')},
                {id: 2, name: '推荐', idView: require('../../assets/3.jpg')},
                {id: 3, name: '推荐', idView: require('../../assets/4.jpg')}
            ],
            searchFinish:false,
            result:[]
        }
    }
}
</script>

<style>
h2{
    text-align: left;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .front-class{
      width: 335px;
      margin:auto;
  }
</style>