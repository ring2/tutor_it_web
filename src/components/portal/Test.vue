<template>
  <div>
    <el-container >
      <!-- 头部区域 -->
      <headers></headers>
      <!--主体内容-->
      <!-- 主体区域 -->
      <el-main >
        <div style="position:relative;">
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
        <!--地中海图片-->
        <div class="seaImage" @mouseover="showText" @mouseleave="shutdownText">
          <transition name="el-zoom-in-center">
            <div v-show="show">一入编程深似海、从此头秃地中海</div>
          </transition>
        </div>
      </el-main>
      <!--底部区域-->
      <footers></footers>
    </el-container>
  </div>
</template>
<script>
import headers from './Header'
import footers from './Footer'
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
      states: ['Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota']
    }
  },
  methods: {
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
  },
  components: {
    headers,
    footers
  }
}
</script>
<style lang="less" scoped>
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
</style>
