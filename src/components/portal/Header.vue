<template>
  <div class="div-index">
    <!-- 回到顶部-->
    <el-backtop>🚀</el-backtop>
    <el-container class="index-container">
      <!-- 头部区域 -->
      <el-header height="85px" class="index-header">
        <div>
          <img src="../../assets/siteLogo.png" width="230px" height="73px" />
          <span>
            <a class="headerLink" href="#">首页</a>
          </span>
          <span>
            <a class="headerLink" href="#">免费课程</a>
          </span>
          <span>
            <a class="headerLink" href="#">实战课程</a>
          </span>
          <!-- 搜索 -->
          <span>
            <el-select
              v-model="value"
              multiple
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="loading"
              style="margin-left:55px"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </span>
          <!-- 我的课程-->
          <span>
            <div>
              <el-badge :value="1" is-dot class="item">
                <a class="headerLink" href="#">我的课程</a>
              </el-badge>
            </div>
          </span>
          <!--登录注册-->
          <span v-if="isLogin">
            <div>
              <a class="headerLink">登录 /</a>
              <a class="headerLink">注册</a>
            </div>
          </span>
          <!--头像-->
          <span v-else>
            <el-dropdown >
              <el-avatar :size="40" src="../../assets/img/1212.jpg" @error="errorHandler">
                <img src="../../assets/avatar.jpg" />
              </el-avatar>
              <el-dropdown-menu slot="dropdown" style="margin-top:-10px;">
                <el-dropdown-item icon="el-icon-user">个人中心</el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
          <span id="shopCar">
            <a class="headerLink"><i class="el-icon-shopping-cart-full"></i> 购物车</a>
          </span>

          <!-- 天气预报 -->
          <span style="margin-left:70px;">
            <div>
              <iframe
                name="weather_inc"
                src="http://i.tianqi.com/index.php?c=code&id=2&num=1"
                width="220"
                height="70"
                frameborder="0"
                marginwidth="0"
                marginheight="0"
                scrolling="no"
              ></iframe>
            </div>
          </span>
        </div>
      </el-header>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 判断用户是否登录标志位
      isLogin: false,
      options: [],
      value: [],
      list: [],
      // 搜索框的loading 标志位
      loading: false,
      states: [
        'Pennsylvania',
        'Rhode Island',
        'South Carolina',
        'South Dakota'
      ]
    }
  },
  mounted() {
    this.list = this.states.map(item => {
      return { value: `value:${item}`, label: `label:${item}` }
    })
  },
  methods: {
    errorHandler() {
      return true
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.options = this.list.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.options = []
      }
    }
  }
}
</script>
<style lang="less" >
// 整合body
.div-index {
  height: 5%;
}
// 容器
.index-container {
  position: relative;
}

#shopCar {
  width: 110px;
  height: 30px;
  line-height: 30px;
  border:solid 1px #e6e2e2;
  border-radius: 20px;
  text-align: center;
  > a:hover {
    color: red;
    cursor: pointer;
  }
}
// 头部区域
.index-header {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1;
  border-bottom: 1px solid #f6f6f6;
  background-color: #ffffff;
  font-size: 16px;
  box-shadow:0px 4px 5px #dbdae1;
  align-items: center;
  > div {
    display: flex;
    align-items: center;
    span {
      margin: 13px;
    }
  }
}
// el 链接
.headerLink {
  font-size: 16px;
  text-decoration: none;
  color: #4d555d;
  font: 16px/1.5 'PingFang SC', '微软雅黑', 'Microsoft YaHei', Helvetica,
    'Helvetica Neue', Tahoma, Arial, sans-serif;
}
.headerLink:hover {
  color: black;
}
</style>
