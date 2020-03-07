<template>
  <div class="div-index">
    <!-- 回到顶部-->
    <el-backtop>🚀</el-backtop>
    <el-container class="index-container">
      <!-- 头部区域 -->
      <el-header height="90px" class="index-header">
        <div>
          <img src="../../assets/siteLogo.png" />
          <span>
            <el-link :underline="false" href="#">首页</el-link>
          </span>
          <span>
            <el-link :underline="false" href="#">课程</el-link>
          </span>
          <span>
            <el-link :underline="false" href="#">职业规划</el-link>
          </span>
          <!-- 搜索 -->
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
          <i class="el-icon-search" style="margin-left:12px" size="mini"></i>
          <div style="margin-left:90px" v-if="isLogin">
            <el-link style="font-size:15px" :underline="false">登录 /</el-link>
            <el-link style="font-size:15px" :underline="false">注册</el-link>
          </div>
          <div style="margin-left:80px" v-if="!isLogin">
            <el-badge :value="1" is-dot class="item">
              <el-link :underline="false" style="font-size:17px;line-height:20px;">我的课程</el-link>
            </el-badge>
          </div>
          <div v-if="!isLogin">
            <el-avatar :size="40" src="../../assets/img/1212.jpg" @error="errorHandler">
              <img src="../../assets/avatar.jpg" />
            </el-avatar>
          </div>
          <!-- 天气预报 -->
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
              style="margin-left:100px"
            ></iframe>
          </div>
        </div>
      </el-header>
      <!-- 主体区域 -->
      <el-main class="index-main">
        <!-- 一级分类 -->
        <div>
          <ul style="list-style:none; display:block">
            <li v-for="item in firstCate" :key="item.value">
              <span style="font-size:20px;color:black;float:left;margin-left:50px;">{{item.name}}</span>
            </li>
          </ul>
        </div>
        <!-- 二级分类-->

        <!-- 视频教程 -->

        <!-- 分页区域 -->
      </el-main>
      <!-- 底部区域 -->
      <el-footer height="120px" class="index-footer">
        <div class="footer-link">
          <ul style="list-style:none;display:inline-block;color:#ffffff">
            <li style="float:left;" v-for="(item,index) in footerLink" :key="index">
              <el-link
                style="font-size:14px;margin:5px;color:#C8CDD2;"
                :underline="false"
              >{{item.siteName}}</el-link>
            </li>
            <li style="float:left;margin-left:75px;">
              <el-popover placement="right" width="220px" trigger="hover">
                <img width="200px" height="230px" src="../../assets/weixin.png" />
                <el-button type="info" slot="reference" size="mini" style="line-height:5px">
                  联系方式
                  <i class="el-icon-chat-dot-round"></i>
                </el-button>
              </el-popover>
            </li>
          </ul>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 一级分类列表
      firstCate: [
        { name: '全部', value: 0 },
        { name: '前端开发', value: 1 },
        { name: '后端开发', value: 2 },
        { name: '移动开发', value: 3 },
        { name: '计算机基础', value: 4 },
        { name: '人工智能', value: 5 },
        { name: '数据库', value: 6 },
        { name: 'UI设计', value: 7 },
        { name: '云计算&大数据', value: 8 }
      ],
      // 二级分类列表
      secondCate: [],
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
      ],
      footerLink: [
        { siteName: '网站首页', url: '' },
        { siteName: '企业合作', url: '' },
        { siteName: '人才招聘', url: '' },
        { siteName: '联系我们', url: '' },
        { siteName: '教师招募', url: '' },
        { siteName: '企业招募', url: '' },
        { siteName: '帮助中心', url: '' },
        { siteName: '友情链接', url: '' }
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
  height: 160%;
}
// 容器
.index-container {
  height: 100%;
  position: relative;
}
// 头部区域
.index-header {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1;
  border-bottom: 1px solid #f6f6f6;
  background-color: #ffffff;
  font-size: 20px;
  align-items: center;
  > div {
    display: flex;
    align-items: center;
    span {
      margin: 10px;
    }
  }
}
// 主要区域
.el-main {
  background-color: #ffffff;
  height: 1000px;
  position: relative;
}
// 底部样式
.index-footer {
  background-color: rgb(52, 59, 67);
}
// el 链接
.el-link {
  font-size: 20px;
}
.footer-link {
  width: 70%;
  border: 1px solid #c8c8c8;
  margin: 30px;
  margin-left: 12%;
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 12px;
  height: 16px;
  background-color: lightsalmon;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(111, 236, 215, 0.3);
  border-radius: 10px;
  background-color: paleturquoise;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.6);
  background-color: wheat;
  background-image: url('../../assets/scorll.jpg');
}
</style>
