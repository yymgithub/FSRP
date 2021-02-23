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
.el-scrollbar__wrap {
  margin-right: 0px!important;
}
.ant-card {
  box-shadow: 0 2px 10px 0 rgb(0 0 0 / 7%)!important;
}
table thead tr th {
  background-color: #f4f7fb!important;
  font-size: 13px!important;
  font-weight: 500!important;
}
.ivu-table-tbody td {
  font-size: 12px!important;
}
.ivu-btn-small {
  height:20px;
  font-size:12px;
}
.ivu-modal-header-inner {
  font-size: 14px;
}
.ivu-btn-primary {
  height: 25px;
}
</style>
