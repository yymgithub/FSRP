<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  height: auto;
}
h1 {
  color: white;
}
.el-scrollbar__wrap{
  margin-right: 0px!important;
}
.ant-card{
    box-shadow: 0 2px 10px 0 rgb(0 0 0 / 7%)!important;
}
</style>
