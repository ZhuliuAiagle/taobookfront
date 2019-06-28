<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Home from './views/Home';

export default {
  name: 'app',
  components: {
    Home
  }
}
</script>

<style scoped>
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  padding: 0px;
}
</style>
