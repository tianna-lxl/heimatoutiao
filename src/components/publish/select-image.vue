<template>
    <el-tabs v-model="activeName">
        <el-tab-pane label="全部素材" name="all">
            <div class="img-list">
                <el-card  class="img-item" v-for="item in list" :key="item.id">
                <img @click="selectImg(item)" :src="item.url" alt />
                </el-card>
            </div>
            <el-row type="flex" justify="center">
                <el-pagination @current-change="changePage" :current-page="page.page" :page-size="page.pageSize" background layout="prev, pager, next" :total="page.total"></el-pagination>
            </el-row>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
            <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :http-request="uploadImg">
                <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [],
      page: {
        page: 1,
        pageSize: 8,
        total: 0
      }

    }
  },
  methods: {
    uploadImg (params) {
      let formData = new FormData()
      formData.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data: formData
      }).then(res => {
        this.$emit('onSelectImg', res.data.url)
      })
    },

    selectImg (item) {
      this.$emit('onSelectImg', item.url)
    },

    changePage (newPage) {
      this.page.page = newPage
      this.getMaterial()
    },
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false,
          page: this.page.page,
          per_page: this.page.pageSize
        }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>

.img-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .img-item {
        margin: 20px 10px;
        width: 130px;
        height: 120px;
        img {
            width: 100%;
            height: 100%;
        }
    }
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
