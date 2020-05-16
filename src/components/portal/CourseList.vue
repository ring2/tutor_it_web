<template>
  <div>
    <headers></headers>
    <div class="cate_box">
      <div class="index_title">
        <img src="../../assets/logo-course.png" />
      </div>

      <div class="index_subtitle">
        <ul class="direction_ul" style="width:100%">
          <li class="direction_title">方向:</li>
          <li class="direction_li">
            <a
              href="#"
              :class="checkLink==-1?'direction_link checkLink':'direction_link'"
              @click="checkLink=-1"
            >全部</a>
          </li>
          <li class="direction_li" v-for="(item,index) in cateList" :key="index">
            <a
              href="#"
              :class="checkLink==index?'direction_link checkLink':'direction_link'"
              @click="checkLink=index"
            >{{item.direction}}</a>
          </li>
        </ul>
      </div>
      <div class="index_subtitle">
        <ul class="direction_ul" style="width:100%">
          <li class="direction_title">分类:</li>
          <li class="direction_li">
            <a href="#" class="direction_link">全部</a>
          </li>
          <li class="direction_li" v-for="(item,index) in cateList" :key="index">
            <a class="direction_link">{{item.direction}}</a>
          </li>
        </ul>
      </div>
      <div class="index_subtitle">
        <ul class="direction_ul" style="width:100%">
          <li class="direction_title">难度:</li>
          <li class="direction_li">
            <a class="direction_link">全部</a>
          </li>
          <li class="direction_li" v-for="(item,index) in cateList" :key="index">
            <a class="direction_link">{{item.direction}}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="goodVideo">
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
              style="width: 200px; height: 150px"
              :src="img.img"
            />
            <p style="text-align:center;margin-top:-1px">{{img.label}}</p>
          </li>
        </ul>
      </div>
    </div>
    <!-- <div class="pageFenye">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[6, 10, 12]"
        :page-size="6"
        layout="total, sizes, prev, pager, next, jumper"
        :total="20"
      ></el-pagination>
    </div> -->
    <footer>
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
        <!--备案号等信息-->
        <div class="beian">
          <a
            href="#"
            style="text-decoration:none;"
          >ring2.com 京ICP备 12003892号-11 京公网安备11010802030151号</a>
        </div>
      </div>
    </el-footer>
    </footer>
  </div>
</template>
<script>
import headers from './Header'
export default {
  data() {
    return {
      checkLink: -1,
      nowIndex: -1,
      cateList: [
        {
          direction: 'java',
          children: [
            { direction: 'java基础1' },
            { direction: 'java基础2' },
            { direction: 'java基础3' }
          ]
        },
        {
          direction: 'php',
          children: [
            { direction: 'java基础5' },
            { direction: 'java基础6' },
            { direction: 'java基础7' }
          ]
        },
        {
          direction: '前端',
          children: [
            { direction: '入门' },
            { direction: '初级' },
            { direction: '中级' },
            { direction: '高级' }
          ]
        }
      ],
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
  methods: {
    // 鼠标滑过精品视频
    mouseOverGoodVideo(index) {
      this.nowIndex = index
    },
    // 鼠标滑出精品视频
    mouseLeaveGoodVideo() {
      this.nowIndex = -1
    }
  },
  components: {
    headers
  }
}
</script>
<style scoped lang="less">
.index_title {
  margin: 20px 120px;
  border-bottom: 1px solid #ccc;
}
.index_subtitle {
  margin: 20px 150px;
  border-bottom: 1px solid rgb(230, 227, 227);
}
.direction_ul {
  list-style: none;
  display: inline-block;
}
.direction_li {
  float: left;
  padding: 0 15px;
}
.direction_title {
  font-size: 15px;
  color: black;
  font-weight: 550;
  padding-right: 25px;
  float: left;
}
.direction_link {
  padding: 5px 10px;
  text-decoration: none;
  color: #4d555d;
  font: 14px/1.5 'PingFang SC', '微软雅黑', 'Microsoft YaHei', Helvetica,
    'Helvetica Neue', Tahoma, Arial, sans-serif;
}
.direction_link:hover {
  color: red;
  cursor: pointer;
}
.cate_box {
  box-shadow: 2px 4px 6px #ccc;
}
.goodVideo {
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-left: 10%;
  width: 80%;
  height: 67%;
  background-color: #f6f6f6;
}

#pic_list {
  display: block;
  width: 100%;
  overflow: auto;
}
#pic_list li {
  width: 20%;
  height: 200px;
  margin: 8px;
  margin-top: 30px;
  display: inline-block;
}
.showShadow {
  -webkit-box-shadow: 0px 3px 3px #c8c8c8;
  -moz-box-shadow: 0px 3px 3px #c8c8c8;
  box-shadow: 5px 7px 8px #c8c8c8;
}
.checkLink {
  background: rgba(242, 13, 13, 0.06);
  border-radius: 6px;
  font-weight: 600;
  color: #f20d0d;
}
.pageFenye {
  margin-top: 20px;
  text-align: center;
}
// 底部样式
.div-index {

}
// 底部样式
.index-footer {
  background-color: rgb(52, 59, 67);
  bottom: 0;
  width: 100%;
}
.footer-link {
  height: 80px;
  width: 70%;
  margin: 30px;
  margin-left: 12%;
}
.beian {
  margin-left: 60px;
  font-size: 12px;
  margin-top: -10px;
  > a {
    color: #c8c8c8;
  }
}
</style>
