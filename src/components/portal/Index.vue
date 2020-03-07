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
        <div style="position:relative">
          <div style="width:100%;position:absolute">
            <!-- 轮播图 -->
            <el-carousel :interval="2600" height="400px" indicator-position type="card">
              <el-carousel-item style="width:90%;">
                <img src="../../assets/carousel/car1.jpg" />
              </el-carousel-item>
              <el-carousel-item style="width:90%">
                <img src="../../assets/carousel/car2.jpg" />
              </el-carousel-item>
              <el-carousel-item style="width:90%">
                <img src="../../assets/carousel/car3.jpg" />
              </el-carousel-item>
              <el-carousel-item style="width:90%">
                <img src="../../assets/carousel/car4.png" />
              </el-carousel-item>
            </el-carousel>
          </div>
          <ul class="cate-class" @mouseover="mouseOnUl()" @mouseleave="mouseLeaveUl">
            <li
              class="lihover"
              @mouseover="showSecond(item)"
              @mouseleave="shutdownChildren"
              v-for="item in optionss"
              :key="item.value"
            >
              <el-link style="color:#ffffff;font-size:14px">{{item.label}}</el-link>
              <span class="lispan">🚀</span>
            </li>
          </ul>
          <ul
            class="cate-children"
            :style="cateChildrenHeight"
            v-show="isShowCateChildren"
            @mouseover="mouseOnChildrenUl"
            @mouseleave="mouseLeaveChildrenUl"
          >
            <li class="lihover" v-for="item in childrenCate" :key="item.value">
              <el-link style="color:#ffffff;font-size:14px">{{item.label}}</el-link>
              <span class="lispan">🚀</span>
            </li>
          </ul>
        </div>
        <div class="goodVideo">
          <el-tag type="warning" style="margin-left: 48%; margin-top:15px">精品视频 :</el-tag>
          <div id="pic_list">
            <ul>
              <li
                v-for="(img ,index) in imgs"
                :key="img.label"
                @mouseover="mouseOverGoodVideo(index)"
                @mouseleave="mouseLeaveGoodVideo(index)"
              >
                <img
                  :class="{'showShadow':nowIndex == index}"
                  style="width: 330px; height: 210px"
                  :src="img.img"
                />
                <p style="text-align:center;margin-top:-1px">{{img.label}}</p>
              </li>
            </ul>
          </div>
        </div>
      </el-main>
      <div class="seaImage" @mouseover="showText" @mouseleave="shutdownText">
        <transition name="el-zoom-in-center">
          <div v-show="show">一入编程深似海、从此头秃地中海</div>
        </transition>
      </div>
      <!-- 底部区域 -->
      <el-footer height="126px" class="index-footer">
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
      show: false,
      // 精品视频是否显示阴影
      nowIndex: -1,
      // 判断鼠标是否在父级UL上
      isMouseOnUl: false,
      imgs: [
        { img: require('@/assets/goodVideo/java.jpg'), label: 'java' },
        { img: require('@/assets/goodVideo/android.jpg'), label: 'android' },
        { img: require('@/assets/goodVideo/bigdata.jpg'), label: 'bigdata' },
        { img: require('@/assets/goodVideo/go.jpg'), label: 'go' },
        { img: require('@/assets/goodVideo/hc.jpg'), label: 'hc' },
        { img: require('@/assets/goodVideo/linux.png'), label: 'linux' },
        { img: require('@/assets/goodVideo/mysql.jpg'), label: 'mysql' },
        { img: require('@/assets/goodVideo/android.jpg'), label: 'android1' },
        { img: require('@/assets/goodVideo/bigdata.jpg'), label: 'bigdata1' },
        { img: require('@/assets/goodVideo/hc.jpg'), label: 'hc1' },
        { img: require('@/assets/goodVideo/java.jpg'), label: 'java1' },
        { img: require('@/assets/goodVideo/python.jpg'), label: 'python1' }
      ],
      // 动态显示二级分类的ul高度
      cateChildrenHeight: 'height:120px',
      // 判断是否要显示二级分类
      isShowCateChildren: false,
      // 二级分类的节点数据
      childrenCate: [],
      // 一级分类的数据
      optionss: [
        {
          value: 'zhinan',
          label: 'Java EE',
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则',
              children: [
                {
                  value: 'yizhi',
                  label: '一致'
                },
                {
                  value: 'fankui',
                  label: '反馈'
                },
                {
                  value: 'xiaolv',
                  label: '效率'
                },
                {
                  value: 'kekong',
                  label: '可控'
                }
              ]
            },
            {
              value: 'daohang',
              label: '导航',
              children: [
                {
                  value: 'cexiangdaohang',
                  label: '侧向导航'
                },
                {
                  value: 'dingbudaohang',
                  label: '顶部导航'
                }
              ]
            }
          ]
        },
        {
          value: 'zhinan1',
          label: 'Java'
        },
        {
          value: 'zhinan2',
          label: 'Python + 人工智能'
        },
        {
          value: 'zhinan3',
          label: 'PHP'
        },
        {
          value: 'zhinan4',
          label: 'C语言'
        },
        {
          value: 'zhinan5',
          label: '前端HTML+CSS+JS'
        }
      ],
      // 轮播图图片数据
      carouselData: [
        '../assets/avatar.jpg',
        '../assets/avatar.jpg',
        '../assets/avatar.jpg',
        '../assets/avatar.jpg',
        '../assets/avatar.jpg',
        '../assets/avatar.jpg'
      ],
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
    },
    // 判断是否显示二级分类的函数
    showSecond(cate) {
      this.childrenCate = cate.children
      if (cate.children) {
        this.cateChildrenHeight = 'height:' + cate.children.length * 60 + 'px'
        return (this.isShowCateChildren = true)
      }
      this.isShowCateChildren = false
    },
    // 鼠标划开时判断是否在一级分类上再决定是否关闭二级分类
    shutdownChildren() {
      if (this.isMouseOnUl) {
        return
      }
      this.isShowCateChildren = false
    },
    // 鼠标在以及一级分类的ul上
    mouseOnUl() {
      this.isMouseOnUl = true
    },
    // 鼠标离开一级分类
    mouseLeaveUl() {
      this.isMouseOnUl = false
      this.isShowCateChildren = false
    },
    // 鼠标在二级分类上
    mouseOnChildrenUl() {
      this.isShowCateChildren = true
    },
    // 鼠标离开二级分类
    mouseLeaveChildrenUl() {
      this.isShowCateChildren = false
    },
    // 鼠标滑过精品视频
    mouseOverGoodVideo(index) {
      this.nowIndex = index
    },
    // 鼠标滑出精品视频
    mouseLeaveGoodVideo() {
      this.nowIndex = -1
    },
    showText() {
      this.show = true
    },
    shutdownText() {
      this.show = false
    }
  }
}
</script>
<style lang="less" >
// 整合body
.div-index {
  height: 260%;
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
  border-bottom: 1px solid #e6e2e2;
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
// 一级分类样式
.cate-class {
  margin-top: -21px;
  left: 141px;
  height: 406px;
  width: 229px;
  position: absolute;
  z-index: 2;
  list-style: none;
  background-color: rgba(55, 59, 60, 0.8); //#373b45;
  margin-left: 0;
  padding: 0;
  border-radius: 6px;
  > li {
    font-size: 14px;
    color: #ffffff;
    font-family: DFKai-SB;
    margin: 28px;
    width: 70%;
  }
}
// 二级分类样式
.cate-children {
  margin-top: -21px;
  left: 368px;
  height: 406px;
  width: 229px;
  position: absolute;
  z-index: 2;
  list-style: none;
  background-color: rgba(55, 59, 60, 0.8);
  margin-left: 0;
  padding: 0;
  border-radius: 6px;
  > li {
    font-size: 14px;
    color: #ffffff;
    font-family: DFKai-SB;
    margin: 28px;
    width: 70%;
  }
}
// 鼠标悬浮到分类项上
.lihover:hover {
  background-color: #6c6f76;
  padding-left: 5px;
}
// 🚀 分类中的样式
.lispan {
  float: right;
}
// 精品视频
.goodVideo {
  width: 100%;
  height: 67%;
  margin-top: 430px;
  background-color: #f6f6f6;
}
// 精品视频中ul li 样式
#pic_list {
  display: block;
  // white-space: nowrap; 此样式可以使图片全部为一整排
  width: 100%;
  overflow: auto;
}
#pic_list li {
  width: 23%;
  height: 200px;
  margin: 8px;
  margin-top: 30px;
  // background-color: red;
  display: inline-block;
}
// 展示精品视频的阴影
.showShadow {
  -webkit-box-shadow: 0px 3px 3px #c8c8c8;
  -moz-box-shadow: 0px 3px 3px #c8c8c8;
  box-shadow: 3px 5px 8px #c8c8c8;
}
// 中间地中海
.seaImage {
  color: gold;
  text-align: center;
  line-height: 320px;
  margin-top: 0%;
  height: 16%;
  position: relative;
  background-image: url(../../assets/bgimg.jpeg);
  background-attachment: fixed;
  background-position: center 0;
  background-repeat: no-repeat;
  background-size: cover;
}
.footer-link {
  width: 70%;
  border: 1px solid #c8c8c8;
  margin: 30px;
  margin-left: 12%;
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 14px;
  height: 16px;
  background-color:lightsalmon;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(111, 236, 215, 0.3);
  border-radius: 10px;
  background-color:paleturquoise;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.6);
  background-color:wheat;
  background-image: url('../../assets/scorll.jpg')
}
</style>
