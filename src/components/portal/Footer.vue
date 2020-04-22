<template>
  <div class="div-index">
    <el-container class="index-container">
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
          <!--备案号等信息-->
          <div class="beian">
            <a
              href="#"
              style="text-decoration:none;"
            >ring2.com 京ICP备 12003892号-11 京公网安备11010802030151号</a>
          </div>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
  methods: {}
}
</script>
<style lang="less" >
// 整合body
.div-index {
  height: 100%;
}
// 底部样式
.index-footer {
  background-color: rgb(52, 59, 67);
  position: absolute;
  bottom: 0;
  width: 100%;
}
.footer-link {
  height: 80px;
  width: 70%;
  border: 1px solid #c8c8c8;
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
