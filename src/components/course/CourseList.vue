<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的课程</el-breadcrumb-item>
      <el-breadcrumb-item>课程列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 添加课程按钮 -->
      <el-row>
        <el-button type="primary" @click="addCourse">添加课程</el-button>
      </el-row>
      <!-- 课程列表 -->
      <el-row :gutter="70" style="margin-top:20px;" v-show="isListVisible">
        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <img width="250px" height="200px" src="../../assets/avatar.jpg" />
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <el-button style="float:right;margin:14px" size="mini" type="danger">删除</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }">
            <img width="250px" height="200px" src="../../assets/avatar.jpg" />
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }">
            <img width="250px" height="200px" src="../../assets/avatar.jpg" />
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }">
            <img width="250px" height="200px" src="../../assets/avatar.jpg" />
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <!-- 步骤条 -->
      <el-row v-show="!isListVisible" style="margin-top:20px;">
        <el-steps :active="stepIndex" simple>
          <el-step title="基本信息" icon="el-icon-edit"></el-step>
          <el-step title="课程图片" icon="el-icon-picture"></el-step>
          <el-step title="课程计划" icon="el-icon-s-promotion"></el-step>
          <el-step title="教师信息" icon="el-icon-s-custom"></el-step>
          <el-step title="课程视频" icon="el-icon-upload"></el-step>
        </el-steps>
      </el-row>
      <!-- 基本信息 -->
      <el-row v-show="isListVisible==false&&stepIndex==0" style="margin-top:20px">
        <el-form ref="courseRef" :model="courseBaseInfo" label-width="80px">
          <el-form-item label="课程名称:">
            <el-input v-model="courseBaseInfo.courseName" style="width:40%"></el-input>
          </el-form-item>
          <el-form-item label="适用人群:">
            <el-input v-model="courseBaseInfo.courseName" style="width:40%"></el-input>
          </el-form-item>
          <el-form-item label="课程分类:">
            <el-input v-model="courseBaseInfo.courseName" style="width:40%"></el-input>
          </el-form-item>
          <el-form-item label="课程等级:">
            <el-input v-model="courseBaseInfo.courseName" style="width:40%"></el-input>
          </el-form-item>
          <el-form-item label="课程介绍:">
            <el-input v-model="courseBaseInfo.courseName" style="width:40%"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" style="margin-left:45%" @click="nextStep()">下一步</el-button>
      </el-row>
      <!-- 课程图片 -->
      <el-row v-show="stepIndex==1" style="margin:20px;">
        <el-upload
          class="upload-demo"
          drag
          action="http://localhost:8082/uploadImg"
          :headers="header"
          multiple
          style="margin-left:35%"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-button type="primary" style="margin-left:45%;margin-top:5%" @click="nextStep()">下一步</el-button>
      </el-row>
      <!-- 课程营销 -->
      <el-row v-show="stepIndex==2" style="margin:20px;">
        <el-form ref="courseRef" :model="courseBaseInfo" label-width="100px">
          <el-form-item label="课程价格">
            <el-radio-group v-model="courseBaseInfo.courseName">
              <el-radio label="免费"></el-radio>
              <el-radio label="收费"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="课程有效期">
            <el-radio-group v-model="courseBaseInfo.courseName">
              <el-radio label="永久"></el-radio>
              <el-radio label="有效期限">dee</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="课程计划:">
            <el-input type="textarea" v-model="courseBaseInfo.courseName" style="width:40%"></el-input>
          </el-form-item>
          <el-form-item label="服务咨询QQ:">
            <el-input v-model="courseBaseInfo.courseName" style="width:40%"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" style="margin-left:45%" @click="nextStep()">下一步</el-button>
      </el-row>
      <!-- 教师信息 -->
      <el-row v-show="stepIndex==3" style="margin:20px;">
        <el-form ref="courseRef" :model="courseBaseInfo" label-width="90px">
          <el-form-item label="教师姓名:">
            <el-input v-model="courseBaseInfo.courseName" style="width:40%"></el-input>
          </el-form-item>
          <el-form-item label="职业及经验:">
            <el-input v-model="courseBaseInfo.courseName" style="width:40%"></el-input>
          </el-form-item>
          <el-form-item label="个人简介:">
            <el-input v-model="courseBaseInfo.courseName" style="width:40%"></el-input>
          </el-form-item>
          <el-button type="primary" style="margin-left:45%" @click="nextStep()">下一步</el-button>
        </el-form>
      </el-row>
      <!-- 课程视频 -->
      <el-row v-show="stepIndex==4" style="margin:20px;">
        <el-button type="primary" style="margin-left:45%" @click="nextStep()">完成</el-button>
      </el-row>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      header: {
        Authorization: ''
      },
      currentDate: new Date(),
      isListVisible: true,
      stepIndex: 0,
      courseBaseInfo: {
        courseName: ''
      }
    }
  },
  created() {
    this.header.Authorization = window.sessionStorage.getItem('tokenHead') + window.sessionStorage.getItem('token')
  },
  methods: {
    // 步骤 下一步
    nextStep() {
      // 首先校验
      this.stepIndex++
    },
    addCourse() {
      this.isListVisible = false
    }
  }
}
</script>
<style lang="less" scoped>
</style>
