<template>
  <div class="login">
    <el-card class="login-card">
      <div class="logo">
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
        <el-form-item prop="mobile" style="margin-top:20px;">
          <el-input placeholder="请输入手机号" v-model="loginForm.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" style="width:280px" placeholder="请输入验证码"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="check">
          <el-checkbox v-model="loginForm.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    let validator = function (rule, value, callback) {
      if (value) {
        callback()
      } else {
        callback(new Error('必须勾选'))
      }
    }
    return {
      loginForm: {
        mobile: '',
        code: '',
        check: false
      },
      loginRules: {
        mobile: [{
          required: true,
          message: '手机号必须输入'
        }, {
          pattern: /^1[3456789]\d{9}$/,
          message: '手机号格式不正确'
        }],
        code: [{
          required: true,
          message: '验证码必须输入'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码必须为六位数字'
        }],
        check: [{
          validator
        }]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate(isOk => {
        if (isOk) {
          this.$axios({
            url: '/authorizations',
            method: 'post',
            data: this.loginForm
          }).then(res => {
            window.localStorage.setItem('user-token', res.data.token)
            this.$router.push('/home')
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .login {
    height: 100vh;
    background-image : url(../../assets/img/login_bg.jpg);
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-card {
      width: 440px;
      height: 350px;
      .logo {
        text-align: center;
        img {
          height: 45px;
        }
      }

    }
  }
</style>
