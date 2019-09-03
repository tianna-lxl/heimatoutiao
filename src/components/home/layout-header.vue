<template>
    <el-row type="flex" justify="space-between" class="layout-header">
        <el-col :span="7" class="left">
            <i class="el-icon-s-unfold icon"></i>
            <span>江苏传智播客教育科技股份有限公司</span>
        </el-col>
        <el-col :span="3" class="right">
            <img :src="userInfo.photo ? userInfo.photo : defaultImg" style="border-radius:50%">
            <el-dropdown trigger="click" @command="handleMenuItem">
                <span class="el-dropdown-link">
                    {{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="account">个人信息</el-dropdown-item>
                    <el-dropdown-item command="git">git地址</el-dropdown-item>
                    <el-dropdown-item command="lgout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>
    </el-row>

</template>

<script>
export default {
  data () {
    return {
      userInfo: {},
      defaultImg: require('../../assets/img/avatar.jpg') // 转成base64位字符串
    }
  },
  methods: {
    getUserInfo () {
      // let token = window.localStorage.getItem('user-token')
      this.$axios({
        url: '/user/profile'
        // headers: { 'Authorization': `Bearer ${token}` }
      }).then(res => {
        this.userInfo = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    handleMenuItem (command) {
      // alert(command)
      if (command === 'account') {

      } else if (command === 'git') {
        // window.location.href = ''
      } else {
        window.localStorage.clear()
        this.$router.push('/login')
      }
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
    .layout-header {
        padding: 8px 0;
        .left {
            display: flex;
            align-items: center;
            .icon {
                font-size: 22px;
                margin-right: 3px;
            }
        }
        .right {
            display: flex;
            align-items: center;
            img {
                width: 40px;
                height: 40px;
                margin-right: 5px;
            }
        }

    }
</style>
