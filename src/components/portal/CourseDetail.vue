<template>
  <div>
    <headers></headers>
    <div class="course_intro">
      <!--面包屑导航-->
      <div class="bread">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: 'course_list' }">课程</el-breadcrumb-item>
          <el-breadcrumb-item>
            <a href="#">后端开发</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item>Java</el-breadcrumb-item>
          <el-breadcrumb-item>使用Prometheus实践基于Spring Boot监控告警体系</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!--课程大标题-->
      <p class="big_title">使用Prometheus实践基于Spring Boot监控告警体系</p>
      <!--作者信息 -难度、学习人数u、综合评分-->
      <div class="base_info">
        <a href="#" target="_blank">
          <img class="avatar" src="../../assets/avatar.jpg" />
        </a>
        <span>Ring2</span>
        <span class="course_base_info">
          <span>
            难度
            <span style="color:#4D5581;font-size:12px;padding-left:5px;">中级</span>
          </span>
          <span>
            学习人数
            <span style="color:#4D5581;font-size:12px;padding-left:5px;">1638人</span>
          </span>
          <span>
            综合评分
            <span style="color:#4D5581;font-size:12px;padding-left:5px;">8.7分</span>
          </span>
        </span>
      </div>
    </div>
    <!--tab  章节、课程评论-->
    <div class="course_tab">
      <div class="tab_content">
        <span>
          <span :class="checkTab === '课程章节'?'check_tab':''" @click="tapTab('课程章节')">课程章节</span>
        </span>
        <span>
          <span :class="checkTab === '用户评价'?'check_tab':''" @click="tapTab('用户评价')">用户评价</span>
        </span>
      </div>
    </div>
    <!--课程章节-->
    <div class="course_chaper">
      <div></div>
    </div>
    <!--课程评价-->
    <div class="course_evaluate">
      <el-card class="box-card">
        <div>
          简介：本课程采用理论结合实践方式实现监控系统Prometheus。介绍CNCF云原生及微服务实际监控需求，
          介绍Devops、MDD、CNCF、Prometheus等概念，然后手把手带大家搭建基于Spring Boot2的实战监控体系，
          让大家体会企业项目面向DevOps开发的监控情景。
        </div>
      </el-card>
      <el-card class="box-card">
        <div>
          简介：本课程采用理论结合实践方式实现监控系统Prometheus。介绍CNCF云原生及微服务实际监控需求，
          介绍Devops、MDD、CNCF、Prometheus等概念，然后手把手带大家搭建基于Spring Boot2的实战监控体系，
          让大家体会企业项目面向DevOps开发的监控情景。
        </div>
      </el-card>
      <el-card class="box-card">
        <div>
          简介：本课程采用理论结合实践方式实现监控系统Prometheus。介绍CNCF云原生及微服务实际监控需求，
          介绍Devops、MDD、CNCF、Prometheus等概念，然后手把手带大家搭建基于Spring Boot2的实战监控体系，
          让大家体会企业项目面向DevOps开发的监控情景。
        </div>
      </el-card>
      <el-card class="box-card">
        <div>
          简介：本课程采用理论结合实践方式实现监控系统Prometheus。介绍CNCF云原生及微服务实际监控需求，
          介绍Devops、MDD、CNCF、Prometheus等概念，然后手把手带大家搭建基于Spring Boot2的实战监控体系，
          让大家体会企业项目面向DevOps开发的监控情景。
        </div>
      </el-card>
      <el-card class="box-card">
        <div>
          简介：本课程采用理论结合实践方式实现监控系统Prometheus。介绍CNCF云原生及微服务实际监控需求，
          介绍Devops、MDD、CNCF、Prometheus等概念，然后手把手带大家搭建基于Spring Boot2的实战监控体系，
          让大家体会企业项目面向DevOps开发的监控情景。
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import headers from './Header'
export default {
  data() {
    return {
      checkTab: '课程章节'
    }
  },
  methods: {
    tapTab(tab) {
      this.checkTab = tab
    }
  },
  components: {
    headers
  }
}
</script>

<style lang="less" scoped>
.course_intro {
  width: 100%;
  height: 220px;
  margin-top: 2px;
  background-color: #f1d013c2;
}
.el-breadcrumb {
  padding-left: 220px;
  padding-top: 15px;
  font-size: 12px;
  color: rgba(253, 251, 251, 0.5);
}
.big_title {
  position: relative;
  z-index: 1;
  margin-bottom: 8px;
  line-height: 48px;
  font-size: 32px;
  color: rgb(49, 39, 39);
  padding-left: 220px;
}
.base_info {
  padding-left: 220px;
  padding-top: 20px;
  float: left;
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50px;
  position: relative;
}
.author_name {
  font-size: 14px;
  line-height: 25px;
  font-weight: 700;
}
.author_exp {
  font-size: 14px;
  line-height: 14px;
}
.course_base_info {
  margin-left: 70px;
  font-size: 12px;
  > span {
    padding: 0px 30px;
    font-weight: 700;
  }
}
// course_tab
.course_tab {
  width: 100%;
  height: 60px;
  background: #fff;
  box-shadow: 2px 4px 7px #ccc;
}
.tab_content {
  height: 60px;
  padding-left: 220px;
  line-height: 60px;
  > span {
    padding-right: 100px;
    > span {
      cursor: pointer;
      padding-bottom: 5px;
    }
  }
}
.check_tab {
  font-size: 16px;
  font-weight: 700;
  color: red;
  border-bottom: 3px solid red;
}
// 课程章节
.course_evaluate {
  margin-top: 30px;
  padding-left: 220px;
  padding-right: 520px;
}
.box-card {
  margin-bottom: 20px;
  font: 14px/1.5 "PingFang SC","微软雅黑","Microsoft YaHei",Helvetica,"Helvetica Neue",Tahoma,Arial,sans-serif;
}
</style>
