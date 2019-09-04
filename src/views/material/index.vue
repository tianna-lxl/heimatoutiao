<template>
  <el-card class="material">
      <bread-crumb slot="header">
            <template slot="title">素材管理</template>
      </bread-crumb>
      <el-tabs v-model="activeName" @tab-click="changeTab">
          <el-tab-pane label="全部素材" name="all">
              <div class="card-list">
                    <el-card class="img-card" v-for="item in list" :key="item.id">
                        <img :src="item.url" alt="">
                        <el-row class="operate" align="middle" type="flex" justify="space-around">
                            <i :style="{ color : item.is_collected ? 'red' : '' }" class="el-icon-star-on"></i>
                            <i class="el-icon-delete-solid"></i>
                        </el-row>
                    </el-card>
              </div>
          </el-tab-pane>
          <el-tab-pane label="收藏图片" name="collect">
              <div class="card-list">
                    <el-card class="img-card" v-for="item in list" :key="item.id">
                        <img :src="item.url" alt="">
                    </el-card>
              </div>
          </el-tab-pane>
      </el-tabs>
  </el-card>
</template>

<script>
// @tab-click="handleClick"
export default {
  data () {
    return {
      activeName: 'all',
      list: []
    }
  },
  methods: {
    changeTab () {
      // this.activeName是点击时最新的状态
      this.getMaterial()
    },
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect'
        }
      }).then(res => {
        this.list = res.data.results
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
    .material {
        .card-list {
            display: flex;
            flex-wrap: wrap;
            .img-card {
                width: 180px;
                height: 180px;
                margin: 30px;
                position: relative;
                img {
                    width: 100%;
                    height: 100%;
                }
                .operate {
                    font-size: 18px;
                    background-color: #f4f5f6;
                    position: absolute;
                    width: 100%;
                    height: 30px;
                    bottom: 0;
                    left: 0;
                }
            }
        }
    }
</style>
