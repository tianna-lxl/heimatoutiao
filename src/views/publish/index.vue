<template>
  <el-card>
      <bread-crumb slot="header">
          <template slot="title">发布文章</template>
      </bread-crumb>
      <el-form ref="publishFrom" :model="formData" :rules="publishRules" style="margin-left:100px" label-width="100px">
          <el-form-item prop="title" label="标题">
              <el-input  v-model="formData.title" style="width:400px"></el-input>
          </el-form-item>
          <el-form-item prop="content" label="内容">
              <el-input  v-model="formData.content" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="封面">
              <el-radio-group  v-model="formData.cover.type">
                  <el-radio :label="1">单图</el-radio>
                  <el-radio :label="3">三图</el-radio>
                  <el-radio :label="0">无图</el-radio>
                  <el-radio :label="-1">自动</el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item prop="channel_id" label="频道">
              <el-select v-model="formData.channel_id">
                  <el-option :label="item.name" :value="item.id" v-for="item in channels" :key="item.id"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
              <el-button @click="publish" type="primary">发表文章</el-button>
              <el-button>存入草稿</el-button>
          </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [],
      formData: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      },
      publishRules: {
        title: [{
          required: true,
          message: '标题不能为空哦'
        }],
        content: [{
          required: true,
          message: '内容不能为空哦'
        }],
        channel_id: [{
          required: true,
          message: '频道不能为空哦'
        }]
      }
    }
  },
  methods: {
    publish () {
      this.$refs.publishFrom.validate(isOk => {
        if (isOk) {
          this.$axios({
            url: '/articles',
            method: 'post',
            params: { draft: false },
            data: this.formData
          }).then(() => {
            this.$router.push('/home/articles')
          })
        }
      })
    },
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    },
    getArticleById (articleId) {
      this.$axios({
        url: `/articles/${articleId}`
      }).then(res => {
        this.formData = res.data
      })
    }
  },
  created () {
    this.getChannels()
    let { articleId } = this.$route.params
    if (articleId) {
      this.getArticleById(articleId)
    }
  }
}
</script>

<style>

</style>
