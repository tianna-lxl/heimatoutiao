<template>
  <el-card>
      <bread-crumb slot="header">
          <template slot="title">账户信息</template>
      </bread-crumb>
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
export default {
  data () {
    return {
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

<style>

</style>
