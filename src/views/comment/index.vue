<template>
  <el-card>
      <bread-crumb slot="header">
        <template slot="title">评论列表</template>
      </bread-crumb>
      <el-table :data="list">
        <el-table-column width="600" label="标题" prop="title"></el-table-column>
        <el-table-column :formatter="formatter" label="评论状态" prop="comment_status"></el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column label="操作">
            <template slot-scope="obj">
                <el-button size="small" type="text">修改</el-button>
                <el-button @click="openOrClose(obj.row)" size="small" :style='{color:obj.row.comment_status ? "#E6A23C" : "#409EFF"}' type="text">{{obj.row.comment_status ? '关闭评论' : '打开评论'}}</el-button>
            </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="center" style="margin:10px 0">
        <el-pagination @current-change="changePage" :current-page="page.page" :page-size="page.pageSize" :total="page.total" background layout="prev, pager, next"></el-pagination>
      </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: {
        page: 1,
        pageSize: 10,
        total: 0
      }

    }
  },
  methods: {
    changePage (newPage) {
      this.page.page = newPage
      this.getComments()
    },
    openOrClose (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`是否要${mess}评论？`, '提示').then(() => {
        this.$axios({
          url: '/comments/status',
          method: 'put',
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status }
        }).then(result => {
          this.getComments()
        })
      })
    },
    formatter (row) {
      return row.comment_status ? '正常' : '关闭'
    },
    getComments () {
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.page, per_page: this.page.pageSize }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    }
  },
  created () {
    this.getComments()
  }
}
</script>

<style lang="less" scoped>

</style>
