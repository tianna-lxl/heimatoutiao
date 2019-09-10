<template>
  <el-card>
      <bread-crumb slot="header">
          <template slot="title">图文数据</template>
      </bread-crumb>
      <div ref="myECharts"></div>
  </el-card>
</template>

<script>
export default {
  mounted () {
    console.log(this.$refs.myECharts)
  }
}
</script>

<style>

</style>
