<template>
    <div class="cover-img">
      <div @click="showDialog(index)" class="img-item" v-for="(item, index) in images" :key="index">
          <img :src="item ? item : defaultImg" alt="">
      </div>

      <el-dialog @close="hideDialog" :visible="dialogVisbile">
          <select-image @onSelectImg="receiveImg"></select-image>
      </el-dialog>
    </div>
</template>

<script>
export default {
  props: [ 'images' ],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'), // 定义一个变量 图片的base64字符串
      dialogVisbile: false,
      selectIndex: -1
    }
  },
  methods: {

    receiveImg (url) {
      this.$emit('onClickImg', url, this.selectIndex)
    },
    //   显示弹层
    showDialog (index) {
      this.selectIndex = index
      this.dialogVisbile = true
    },
    hideDialog () {
      this.dialogVisbile = false
    }
  }
}
</script>

<style lang="less" scoped>
    .cover-img {
        display: flex;
        max-width: 650px;
        .img-item {
            padding: 10px;
            width: 200px;
            height: 200px;
            border: 1px solid #ccc;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }

</style>
