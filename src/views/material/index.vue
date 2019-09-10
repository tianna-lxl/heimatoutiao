<template>
  <el-card class="material">
      <bread-crumb slot="header">
            <template slot="title">素材管理</template>
      </bread-crumb>
      <el-upload action="" :show-file-list="false" :http-request="uploadImg" class="upload-btn">
          <el-button type="primary" size="small">上传图片</el-button>
      </el-upload>
      <el-tabs v-model="activeName" @tab-click="changeTab">
          <el-tab-pane label="全部素材" name="all">
              <div class="card-list">
                    <el-card class="img-card" v-for="item in list" :key="item.id">
                        <img :src="item.url" alt="">
                        <el-row class="operate" align="middle" type="flex" justify="space-around">
                            <i @click="collectOrCancel(item)" :style="{ color : item.is_collected ? 'red' : '' }" class="el-icon-star-on"></i>
                            <i @click="delImg(item)" class="el-icon-delete-solid"></i>
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

      <el-row type="flex" justify="center" style="margin:10px 0">
            <el-pagination @current-change="changePage" :current-page="page.page" :page-size="page.pageSize" :total="page.total" background layout="prev, pager, next"></el-pagination>
      </el-row>

  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [],
      page: {
        page: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  methods: {
    async uploadImg (params) {
      let obj = new FormData()
      obj.append('image', params.file)
      await this.$axios({
        url: '/user/images',
        method: 'post',
        data: obj
      })
      this.getMaterial()
    },
    async collectOrCancel (item) {
      let mess = item.is_collected ? '取消' : ''
      await this.$confirm(`确定要${mess}收藏吗？`, '提示')
      await this.$axios({
        url: `/user/images/${item.id}`,
        method: 'put',
        data: { collect: !item.is_collected }
      })
      this.getMaterial()
    },
    delImg (item) {
      this.$confirm('确定要删除吗？', '提示').then(() => {
        this.$axios({
          url: `/user/images/${item.id}`,
          method: 'delete'
        }).then(() => {
          this.getMaterial()
        })
      })
    },
    changePage (newPage) {
      this.page.page = newPage
      this.getMaterial()
    },
    changeTab () {
      // this.activeName是点击时最新的状态
      this.page.page = 1
      this.getMaterial()
    },
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          page: this.page.page,
          per_page: this.page.pageSize,
          collect: this.activeName === 'collect'
        }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
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
        .upload-btn {
          position: absolute;
          z-index: 1;
          top: 126px;
          right: 20px;
        }
        .card-list {
            display: flex;
            flex-wrap: wrap;
            .img-card {
                width: 180px;
                height: 180px;
                margin: 20px;
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
