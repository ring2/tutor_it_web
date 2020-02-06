<template>
  <!--面包屑-->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片-->
    <el-card class="box-card">
      <div>
        <el-row :gutter="20">
          <el-col :span="8">
            <div style="margin-top: 13px;">
              <el-input
                placeholder="请输入用户名"
                v-model="queryUserList.username"
                @keyup.enter.native="getUserListBySearch"
                clearable
                @clear="getUserList"
              >
                <el-button slot="append" icon="el-icon-search" @click="getUserListBySearch"></el-button>
              </el-input>
            </div>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" style="margin-top: 13px;" @click="createUser">添加用户</el-button>
          </el-col>
        </el-row>
        <!--用户列表区域-->
        <el-table :data="userList" style="width: 100%" border stripe>
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column prop="createTime" label="日期" width="180"></el-table-column>
          <el-table-column prop="username" label="用户姓名" width="180"></el-table-column>
          <el-table-column prop="roleName" label="角色姓名"></el-table-column>
          <el-table-column prop="telephone" label="电话号码"></el-table-column>
          <el-table-column label="状态">
            <template v-slot="scope">
              <el-switch v-model="scope.row.status" @change="changeUserStatus(scope.row)"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="updateUserDialog(scope.$index, scope.row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteUser(scope.row.id)"
              ></el-button>
              <el-tooltip
                class="item"
                effect="dark"
                content="设置"
                placement="top"
                :enterable="false"
              >
                <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryUserList.pageNo"
            :page-sizes="[1, 2, 5, 10]"
            :page-size="queryUserList.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </el-card>
    <!--添加用户对话框-->
    <el-dialog title="添加用户" :visible.sync="showDialog" width="30%" :before-close="handleClose">
      <el-form :rules="rules" :model="createUserForm" ref="createUserForm" label-width="80px">
        <el-form-item label="姓名" prop="username">
          <el-input v-model="createUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="createUserForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="telephone">
          <el-input v-model="createUserForm.telephone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="createUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="createUserForm.status"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAddUser">取 消</el-button>
        <el-button type="primary" @click="addUser">添 加</el-button>
      </span>
    </el-dialog>
    <!--修改用户对话框-->
    <el-dialog
      title="修改用户信息"
      :visible.sync="showUpdateDialog"
      width="30%"
      :before-close="handleUpdateClose"
    >
      <el-form :rules="rules" :model="updaterUserForm" ref="updaterUserForm" label-width="80px">
        <el-form-item label="姓名" prop="username" disabled>
          <el-input v-model="updaterUserForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="telephone">
          <el-input v-model="updaterUserForm.telephone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="updaterUserForm.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelUpdateUser">取 消</el-button>
        <el-button type="primary" @click="updateUser">添 加</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
      if (!value) {
        return callback(new Error('电话号码不能为空'))
      }
      setTimeout(() => {
        // Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
        // 所以我就在前面加了一个+实现隐式转换

        if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (phoneReg.test(value)) {
            callback()
          } else {
            callback(new Error('电话号码格式不正确'))
          }
        }
      }, 100)
    }
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    }
    return {
      queryUserList: {
        username: '',
        pageNo: 1,
        pageSize: 10
      },
      createUserForm: {
        username: '',
        password: '',
        telephone: '',
        email: '',
        status: true
      },
      updaterUserForm: {
        id: '',
        username: '',
        telephone: '',
        email: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        telephone: [{ validator: checkPhone, trigger: 'blur' }],
        email: [{ validator: checkEmail, trigger: 'blur' }]
      },
      userList: [],
      total: 0,
      showDialog: false,
      showUpdateDialog: false
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList(flag) {
      if (flag) {
        this.queryUserList.pageNo = 1
      }
      const { data: res } = await this.$http.get('/user/list', {
        params: this.queryUserList
      })
      if (res.statusCode !== 200) {
        return this.$message.error('获取用户列表失败')
      }
      this.userList = res.data.userList
      this.total = res.data.total
    },
    async getUserListBySearch() {
      this.queryUserList.pageNo = 1
      const { data: res } = await this.$http.get('/user/list', {
        params: this.queryUserList
      })
      if (res.statusCode !== 200) {
        return this.$message.error('获取用户列表失败')
      }
      this.userList = res.data.userList
      this.total = res.data.total
    },
    handleSizeChange(size) {
      console.log(size)
      this.queryUserList.pageSize = size
      this.getUserList()
    },
    handleCurrentChange(pageNo) {
      this.queryUserList.pageNo = pageNo
      this.getUserList()
    },
    async changeUserStatus(userInfo) {
      const { data: res } = await this.$http.put(
        `user/${userInfo.id}/${userInfo.status}`
      )
      if (res.statusCode !== 200) {
        userInfo.status = !userInfo.status
        return this.$message.error('用户状态更改失败')
      }
      this.$message({
        type: 'success',
        message: '更新用户状态成功',
        duration: 2000
      })
    },
    handleClose() {
      this.$refs.createUserForm.resetFields()
      this.showDialog = false
    },
    handleUpdateClose() {
      this.$refs.updaterUserForm.resetFields()
      this.showUpdateDialog = false
    },
    cancelAddUser() {
      this.$refs.createUserForm.resetFields()
      this.showDialog = false
    },
    cancelUpdateUser() {
      this.showDialog = false
    },
    createUser() {
      this.showDialog = true
    },
    addUser() {
      this.$refs.createUserForm.validate(async valid => {
        if (!valid) {
          return
        }
        const { data: res } = await this.$http.post('user', this.createUserForm)
        if (res.statusCode !== 200) {
          return this.$message.error('添加用户失败！')
        }
        this.$message({
          type: 'success',
          message: '添加成功',
          duration: 2000
        })
        this.$refs.createUserForm.resetFields()
      })
      this.getUserList()

      this.showDialog = false
    },
    updateUserDialog(index, row) {
      this.updaterUserForm = row
      this.showUpdateDialog = true
    },
    updateUser() {
      this.$refs.updaterUserForm.validate(async valid => {
        if (!valid) {
          return this.$message.error('表单校验不通过！')
        }
        const { data: res } = await this.$http.put(
          '/user',
          this.updaterUserForm
        )
        if (res.statusCode !== 200) {
          return this.$message.error('修改失败')
        }
        this.$message.success('修改成功！')
        this.showUpdateDialog = false
      })
    },
    async deleteUser(id) {
      const result = await this.$confirm(
        '此操作将永久删除此用户，是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      if (result === 'cancel') {
        return this.$message.info('已取消删除')
      }
      const { data: res } = await this.$http.delete(`/user/${id}`)
      if (res.statusCode !== 200) {
        return this.$message.error('删除用户失败!')
      }
      this.$message.success('删除成功')
      const flag = true
      this.getUserList(flag)
    }
  }
}
</script>
<style lang="less" scoped>
.breadcrumb {
  font-size: 14px;
}
</style>
