<template>
  <el-container>
    <el-aside :style="{width: collapse ? '60px' : '200px'}" style="background-color:#323745;overflow:hidden">
      <layout-aside></layout-aside>
    </el-aside>
    <el-container>
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <el-main style="padding:0;">
        <router-view>

        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import eventBus from '../../utils/event'
export default {
  data () {
    return {
      collapse: false
    }
  },
  created () {
    eventBus.$on('openOrClose', (status) => {
      this.collapse = status
    })
  }
}
</script>

<style>

</style>
