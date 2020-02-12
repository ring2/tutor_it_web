<template>
  <!--面包屑-->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片-->
    <el-card class="box-card" shadow="hover">
      <el-table :data="rightsList">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="name" label="权限名称"></el-table-column>
        <el-table-column prop="uri" label="权限路径"></el-table-column>
        <el-table-column prop="pid" label="权限层级">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.pid == 0?'success':'warning'"
            >{{scope.row.pid == 0 ? '层级1' : '层级2'}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rightsList: []
    }
  },
  created() {
    this.getRightList()
  },
  methods: {
    async getRightList() {
      const { data: res } = await this.$http.get('/rights/list')
      if (res.statusCode !== 200) {
        return this.$message.error('获取权限列表失败')
      }
      this.rightsList = res.data
    }
  }
}
</script>
<style lang="less" scoped>
</style>
