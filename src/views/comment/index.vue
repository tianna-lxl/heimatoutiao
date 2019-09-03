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
                <el-button size="small" :style='{color:obj.row.comment_status ? "#E6A23C" : "#409EFF"}' type="text">{{obj.row.comment_status ? '关闭评论' : '打开评论'}}</el-button>
            </template>
        </el-table-column>
      </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    formatter (row) {
      return row.comment_status ? '正常' : '关闭'
    },
    getComments () {
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment' }
      }).then(res => {
        this.list = res.data.results
      })
    }
  },
  created () {
    this.getComments()
  }
}
</script>

<style>

</style>
