<template>
    <div class="index">
        <el-container ref="homePage" id="con1">
            <el-header :style="headerStyle">
              <el-row>
                  <el-button type = "primary" icon="el-icon-s-fold" v-if="!asideIsFolded" circle size="medium" class="upper-button"
                  @click="asideIsFolded = !asideIsFolded"></el-button>
                  <el-button type = "primary" icon="el-icon-s-unfold" v-if="asideIsFolded" circle size="medium" class="upper-button"
                  @click="asideIsFolded = !asideIsFolded"></el-button>
                  <span>&nbsp;&nbsp;&nbsp;淘书网 - 首页</span>
              </el-row>
            </el-header>
            <el-container>
                <el-aside width="auto" ref="asideLine" :style="asideStyle" class="big-aside">
                    <el-menu  :default-active="activeIndex" mode="vertical" @select="handleSelect_2" :collapse="false">
                        <el-menu-item index="4"><i class="el-icon-view"></i><span>发现</span></el-menu-item>
                        <el-menu-item index="5"><i class="el-icon-check"></i><span>发布新商品</span></el-menu-item>
                        <el-menu-item index="6"><i class="el-icon-search"></i><span>高级搜索</span></el-menu-item>
                        <el-menu-item index="7"><i class="el-icon-question"></i><span>求购</span></el-menu-item>
                        <el-menu-item index="8"><i class="el-icon-chat-line-square"></i><span>消息</span></el-menu-item>
                        
                    </el-menu>
                </el-aside>
                <el-aside width="auto" ref="asideLine" :style="asideStyle" class="small-aside" v-if="!asideIsFolded">
                    <el-menu  :default-active="activeIndex" mode="vertical" @select="handleSelect_2" :collapse="false">
                        <el-menu-item index="4"><i class="el-icon-view"></i><span>发现</span></el-menu-item>
                        <el-menu-item index="5"><i class="el-icon-check"></i><span>发布新商品</span></el-menu-item>
                        <el-menu-item index="6"><i class="el-icon-search"></i><span>高级搜索</span></el-menu-item>
                        <el-menu-item index="7"><i class="el-icon-question"></i><span>求购</span></el-menu-item>
                        <el-menu-item index="8"><i class="el-icon-chat-line-square"></i><span>消息</span></el-menu-item>
                        
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
                textAlign: 'left',
                lineHeight: '60px',
                fontSize: '20px'
            },
            mainStyle:{
                backgroundColor: '#E9EEF3',
                color: '#333',
                textAlign: 'center',
                lineHeight: '30px',
            },
            activeIndex: '4',
            screenWidth : document.body.clientWidth,
            asideIsFolded: true
        }
    },
    mounted(){
      // 获取浏览器可视区域高度
      if(this.$store.state.user == "<undefined>"){
        this.$message("未登录，请先登录");
        this.$router.push('/login')
      }
      const that = this
      window.onresize = () => {
        console.log("fff")
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      }
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
      },
      screenWidth (val) {
        this.screenWidth = val
        
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
      handleSelect_2:function(index, indexPath){
        this.asideIsFolded = !this.asideIsFolded;
        if(index == '4') this.$router.push('/index/frontpage')
        else if(index == '5') this.$router.push('/index/newitem')
        else if(index == '6') this.$router.push('/index/search')
        else if(index == '7') this.$router.push('/index/request')
        else if(index == '8') this.$router.push('/index/chat')
      },
      
    },
  }
</script>


<style>
@media screen and (max-width: 500px){
   .big-aside{
     display: none;
   }
}

@media screen and (min-width: 500px){
   .upper-button{
     display: none;
   }
   .small-aside{
     display: none;
   }
}
.el-aside {
  background-color: #FFFFFF;
  color: #333;
  text-align: left;
  line-height: 200px;
}
.small-aside{
  position:relative;
  z-index:999;
  top:0;
}
.index{
    height: 100%;
}
.el-container{
    height: 100%;
}
</style>