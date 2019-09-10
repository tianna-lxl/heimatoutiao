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
              <quill-editor style="height:400px;width:800px"  v-model="formData.content" type="textarea"></quill-editor>
          </el-form-item>
          <el-form-item label="封面" style="margin-top:120px" prop="cover">
              <el-radio-group @change="changeCoverType" v-model="formData.cover.type">
                  <el-radio :label="1">单图</el-radio>
                  <el-radio :label="3">三图</el-radio>
                  <el-radio :label="0">无图</el-radio>
                  <el-radio :label="-1">自动</el-radio>
              </el-radio-group>
          </el-form-item>

          <el-form-item>
            <cover-image @onClickImg="receiveImg" :images="formData.cover.images"></cover-image>
          </el-form-item>

          <el-form-item prop="channel_id" label="频道">
              <el-select v-model="formData.channel_id">
                  <el-option :label="item.name" :value="item.id" v-for="item in channels" :key="item.id"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
              <el-button @click="publish(false)" type="primary">发表文章</el-button>
              <el-button @click="publish(true)">存入草稿</el-button>
          </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    let func = function (rule, value, callBack) {
      if (value.type === 1) {
        value.images.length === 1 && value.images[0] ? callBack() : callBack(new Error('请设置封面'))
      } else if (value.type === 3) {
        value.images.length === 3 && value.images.some((item, index) => { return item }) ? callBack() : callBack(new Error('请设置封面'))
        // value.images.length === 3 && value.images[0] && value.images[1] && value.images[2] ? callBack() : callBack(new Error('请设置封面'))
      } else {
        value.images.length > 0 ? callBack(new Error('弄啥嘞')) : callBack()
      }
    }
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
        }],
        cover: [{
          validator: func
        }]
      }
    }
  },
  methods: {
    receiveImg (url, index) {
      this.formData.cover.images = this.formData.cover.images.map((item, i) => i === index ? url : item)
    },
    changeCoverType () {
      if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', '']
      } else {
        this.formData.cover.images = []
      }
    },
    publish (draft) {
      this.$refs.publishFrom.validate(async isOk => {
        if (isOk) {
          let { articleId } = this.$route.params

          await this.$axios({
            url: articleId ? `/articles/${articleId}` : '/articles',
            method: articleId ? 'put' : 'post',
            params: { draft },
            data: this.formData
          })
          this.$router.push('/home/articles')
        }
      })
    },

    // publish (draft) {
    //   this.$refs.publishFrom.validate(isOk => {
    //     if (isOk) {
    //       let { articleId } = this.$route.params

    //       this.$axios({
    //         url: articleId ? `/articles/${articleId}` : '/articles',
    //         method: articleId ? 'put' : 'post',
    //         params: { draft },
    //         data: this.formData
    //       }).then(res => {
    //         this.$router.push('/home/articles')
    //       })
    //     }
    //   })
    // },
    async getChannels () {
      let res = await this.$axios({
        url: '/channels'
      })
      this.channels = res.data.channels
    },
    async getArticleById (articleId) {
      let res = await this.$axios({
        url: `/articles/${articleId}`
      })
      this.formData = res.data
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
