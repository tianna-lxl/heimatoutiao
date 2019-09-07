<template>
  <el-card>
      <bread-crumb slot="header">
        <template slot="title">内容管理</template>
      </bread-crumb>
      <el-form>
        <el-form-item label="文章状态:">
          <el-radio-group @change="changeCondition" v-model="searchForm.status">
            <el-radio :label="5">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">已发表</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表:">
          <el-select  @change="changeCondition" v-model="searchForm.channel_id">
            <el-option :label="item.name" :value="item.id" v-for="item in channels" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择:">
          <el-date-picker
          @change="changeCondition"
          value-format="yyyy-MM-dd"
          v-model="searchForm.dateRange"
            type="daterange"
            start-placeholder="开始日期"
           end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </el-form>

      <div class="total-info">
        共找到{{page.total}}条符合条件的内容
      </div>
      <div class="article-list">
        <div class="article-item" v-for="(item, index) in list" :key="index">
          <div class="left">
            <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt="">
            <div class="info">
              <span class="title">{{item.title}}</span>
              <el-tag :type="item.status | statusType" style="width:70px">{{item.status | statusText}}</el-tag>
              <span class="date">{{item.pubdate}}</span>
            </div>
          </div>
          <div class="right">
            <span @click="modifyItem(item)"><i class="el-icon-edit"></i>修改</span>
            <span @click="delItem(item)"><i class="el-icon-delete"></i>删除</span>
          </div>
        </div>
      </div>

      <el-row type="flex" justify="center" style="margin:10px 0">
        <el-pagination @current-change="changePage" :current-page="page.page" :page-size="page.pageSize" :total="page.total" background layout="prev, pager, next"></el-pagination>
      </el-row>

  </el-card>
</template>

<script>
export default {
  data () {
    return {
      page: {
        page: 1,
        pageSize: 10,
        total: 0
      },
      list: [],
      defaultImg: require('../../assets/img/404.png'),
      searchForm: {
        status: 5,
        channel_id: null,
        dateRange: []
      },
      channels: []
    }
  },
  methods: {
    modifyItem (item) {
      this.$router.push(`/home/publish/${item.id.toString()}`)
    },
    delItem (item) {
      this.$confirm('是否删除此文章?', '提示').then(() => {
        console.log(item.id.toString())
        this.$axios({
          method: 'delete',
          url: `/articles/${item.id.toString()}`
        }).then(() => {
          this.getCondition()
        })
      })
    },
    changePage (newPage) {
      this.page.page = newPage
      this.getCondition()
    },
    changeCondition () {
      this.page.page = 1
      this.getCondition()
    },
    getCondition () {
      let params = {
        status: this.searchForm.status === 5 ? null : this.searchForm.status,
        channel_id: this.searchForm.channel_id,
        begin_pubdate: this.searchForm.dateRange.length > 0 ? this.searchForm.dateRange[0] : null,
        end_pubdate: this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null,
        page: this.page.page,
        per_page: this.page.pageSize
      }
      this.getArticles(params)
    },
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then((res) => {
        this.channels = res.data.channels
      })
    },
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then((res) => {
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    }
  },
  created () {
    this.getArticles()
    this.getChannels()
  },
  filters: {
    statusText (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    statusType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return 'success'
        case 3:
          return 'danger'
        default:
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .total-info {
    border-bottom: 1px dashed #ccc;
    padding-bottom: 15px;
    color: #323745;
    font-size: 14px;
  }
  .article-list {
    .article-item {
      display: flex;
      justify-content: space-between;
      padding: 15px 0;
      border-bottom: 1px solid #f2f3f5;
      .left {
        display: flex;
        .info {
          display: flex;
          height: 100px;
          flex-direction: column;
          justify-content: space-around;
          margin-left: 10px;
          .date {
            font-size: 12px;
            color: #999;
          }
          .title {
            font-size: 14px;
            color: #333;
          }
        }
        img {
          border-radius: 4px;
          width: 180px;
          height: 100px;
        }
      }
      .right {
        font-size: 12px;
        span {
          margin-right: 8px;
          cursor: pointer;
          color: #333;
        }
      }
    }
  }
</style>
