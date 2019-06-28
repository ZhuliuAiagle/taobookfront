<template>
    <div class="index">
        <el-container ref="homePage" id="con1">
            <el-header :style="headerStyle">淘书网 - 首页</el-header>
            <el-container>
                <el-aside width="auto" ref="asideLine">
                    <el-menu  :default-active="activeIndex" mode="vertical" @select="handleSelect" :collapse="false">
                        <el-menu-item index="4"><i class="el-icon-platform-eleme"></i><span>发现</span></el-menu-item>
                        <el-menu-item index="5"><i class="el-icon-platform-eleme"></i><span>发布新商品</span></el-menu-item>
                        <el-menu-item index="6"><i class="el-icon-platform-eleme"></i><span>分类检索</span></el-menu-item>
                        <el-menu-item index="7"><i class="el-icon-platform-eleme"></i><span>求购</span></el-menu-item>
                        <el-menu-item index="8"><i class="el-icon-platform-eleme"></i><span>个人中心</span></el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main ref="mainLine" :style="mainStyle">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'Index',
    data(){
        const item = {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
        };
        return {
            clientHeight:'',
            tableData: Array(20).fill(item),
            headerStyle:{
                backgroundColor: '#409EFF',
                color: '#fff',
                textAlign: 'center',
                lineHeight: '60px',
            },
            mainStyle:{
                backgroundColor: '#E9EEF3',
                color: '#333',
                textAlign: 'center',
                lineHeight: '30px',
            },
            activeIndex: '4',
        }
    },
    mounted(){
      // 获取浏览器可视区域高度
      var el = document.getElementById("con1");
      el.id = "con2";
      this.clientHeight =   `${document.documentElement.clientHeight}`              
      //document.body.clientWidth;
      //console.log(self.clientHeight);
      window.onresize = function temp() {
        this.clientHeight = `${document.documentElement.clientHeight}`;
      };
    },
    watch: {
      // 如果 `clientHeight` 发生改变，这个函数就会运行
      clientHeight: function () {
        this.changeFixed(this.clientHeight)
      }
    },

    methods:{
      changeFixed: function(clientHeight){ //动态修改样式
        // console.log(clientHeight);
        // console.log(this.$refs.homePage.$el.style.height);
        this.$refs.homePage.$el.style.height = clientHeight  +'px';
        this.$refs.asideLine.$el.style.height = clientHeight -60 +'px';
        this.$refs.mainLine.$el.style.height = clientHeight -60 +'px';
      },
      handleSelect:function(index, indexPath){
        if(index == '4') this.$router.push('/index/frontpage')
        else if(index == '5') this.$router.push('/index/newitem')
        else if(index == '6') this.$router.push('/index/search')
      }
    },
  }
</script>


<style>

  .el-aside {
    background-color: #FFFFFF;
    color: #333;
    text-align: left;
    line-height: 200px;
  }
  .index{
      height: 100%;
  }
  .el-container{
      height: 100%;
  }
</style>