<template>
    <div class="cover-img">
      <!-- 我司图片{{images}} -->
      <div class="img-item" v-for="(item, index) in images" :key="index">
          <img src="../../assets/img/pic_bg.png" alt="">
      </div>
    </div>
</template>

<script>
export default {
  props: [ 'images' ]
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
