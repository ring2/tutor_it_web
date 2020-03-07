<template>
  <div>
    课程分类详情
    <!-- 页面容器 -->
    <el-container>
      <!-- 头部区域 -->
      <el-header>Header</el-header>
      <!-- 主要区域 -->
      <el-main>
        <App-header></App-header>
      </el-main>
      <!-- 底部区域 -->
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>
<script>
import AppHeader from '@/components/portal/Test.vue'
export default {
  components: {
    AppHeader
  },
  data() {
    return {}
  }
}
</script>
