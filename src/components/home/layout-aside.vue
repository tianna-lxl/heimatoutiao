<template>
    <div class="layout-aside" :style="{width: collapse ? '60px' : '200px'}">
        <div class="title">
            <img :src="collapse ? smallImg : bigImg">
        </div>
        <el-menu
        :style="{width: collapse ? '61px' : '201px'}"
        background-color="#323745"
        text-color="#adafb5"
        active-text-color="#ffd04b"
        :collapse="collapse"
        router>
            <el-menu-item index="/">
                <i class="el-icon-s-home"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="content">
                <template slot="title">
                    <i class="el-icon-s-order"></i>
                    <span slot="title">内容管理</span>
                </template>
                <el-menu-item index="/home/publish">发布文章</el-menu-item>
                <el-menu-item index="/home/articles">内容列表</el-menu-item>
                <el-menu-item index="/home/comment">评论管理</el-menu-item>
                <el-menu-item index="/home/material">素材管理</el-menu-item>
            </el-submenu>
            <el-submenu index="fans">
                <template slot="title">
                    <i class="el-icon-s-custom"></i>
                    <span slot="title">粉丝管理</span>
                </template>
                <el-menu-item index="/home/fansdata">图文数据</el-menu-item>
                <el-menu-item index="/home/fansinfo">粉丝概况</el-menu-item>
                <el-menu-item index="/home/fanslist">粉丝列表</el-menu-item>
                <el-menu-item index="/home/fansimg">粉丝画像</el-menu-item>
            </el-submenu>
            <el-menu-item index="/home/account">
                <i class="el-icon-s-tools"></i>
                <span slot="title">账户信息</span>
            </el-menu-item>
        </el-menu>
    </div>

</template>

<script>
import eventBus from '../../utils/event'
export default {
  data () {
    return {
      smallImg: require('../../assets/img/toutiao.png'),
      bigImg: require('../../assets/img/logo_admin.png'),
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

<style lang="less" scoped>
    .layout-aside {
        // width: 200px;
        height: 100vh;
        background-color: #323745;
        .title {
            background-color: #2e2f32;
            text-align: center;
            padding: 10px 0;
            img {
                height: 30px;
            }
        }

    }
</style>
