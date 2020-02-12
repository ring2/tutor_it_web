<template>
  <div>
    <el-carousel :interval="1600" type="card" height="400px">
      <el-carousel-item v-for="(item) in 6" :key="item">
        <!-- <h3 class="medium">{{ item }}</h3> -->
        <!-- <img src="../assets/img/1212.jpg" style="width: 648px" /> -->
        {{carouselData[item-1]}}
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      carouselData: ['河', '南', '工', '业', '大', '学']
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 40px;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  font-size: 250px;
  text-align: center;
  color: antiquewhite;
  font-family: 'SimSun';
  background-image: url('../assets/img/111.jpg');

}

.el-carousel__item:nth-child(2n + 1) {
  font-size: 250px;
  text-align: center;
  font-family: 'SimSun';
  color: antiquewhite;
  background-image: url('../assets/img/111.jpg');
}
</style>
