<template>
  <el-card v-loading="loading">
      <bread-crumb slot="header">
          <template slot="title">账户信息</template>
      </bread-crumb>
      <el-upload action="" :http-request="uploadHeadImg" :show-file-list="false">
                                        <!-- userInfo.photo ? userInfo.photo : defaultImg -->
          <img class="head-image" :src="userInfo.photo || defaultImg" alt="">
      </el-upload>
      <el-form ref="userForm" :model="userInfo" :rules="userRules">
          <el-form-item label="用户名" prop="name">
              <el-input v-model="userInfo.name" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="简介" prop="intro">
              <el-input v-model="userInfo.intro" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
              <el-input v-model="userInfo.email" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
              <el-input disabled v-model="userInfo.mobile" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button @click="saveUserInfo" type="primary">保存</el-button>
          </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
import eventBus from '../../utils/event'
export default {
  data () {
    return {
      defaultImg: require('../../assets/img/404.png'),
      loading: false,
      userInfo: {
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      },
      userRules: {
        name: [{
          required: true,
          message: '请输入用户名'
        }],
        email: [{
          pattern: /^\w+((.\w+)|(.\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/,
          message: '邮箱格式不对'
        }]
      }
    }
  },
  methods: {
    uploadHeadImg (params) {
      this.loading = true
      let data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        method: 'patch',
        url: '/user/photo',
        data
      }).then(() => {
        this.loading = false
        eventBus.$emit('updateUserInfo')
        this.getUserInfo()
      })
    },
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(res => {
        this.userInfo = res.data
      })
    },
    saveUserInfo () {
      this.$refs.userForm.validate((isOk) => {
        if (isOk) {
          this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.userInfo
          }).then(() => {
            this.$message({ type: 'success', message: '保存成功' })
            eventBus.$emit('updateUserInfo')
          })
        }
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
  .head-image {
    z-index: 1;
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    left: 620px;
  }
</style>
