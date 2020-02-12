<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片-->
    <el-card>
      <!--添加角色按钮-->
      <el-row>
        <el-button type="primary" @click="showAddRoleDialog()">添加角色</el-button>
      </el-row>
      <!--展示角色列表-->
      <el-row>
        <el-table :data="roleList" border>
          <!--角色列表下拉操作-->
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-row
                :class="['bdbottom',index1 === 0 ? 'bdtop' : '','v-center']"
                v-for="(item1,index1) in scope.row.children"
                :key="item1.id"
              >
                <el-col :span="5">
                  <el-tag closable @close="deletePermissionById(item2.id,scope.row)">{{item1.name}}</el-tag>
                  <i class="el-icon-caret-right"></i>
                </el-col>
                <el-col :span="19">
                  <el-row
                    :class="[index2 === 0 ? '' : 'bdtop','v-center']"
                    v-for="(item2,index2) in item1.children"
                    :key="item2.id"
                  >
                    <el-col :span="6">
                      <el-tag
                        type="success"
                        closable
                        @close="deletePermissionById(item2.id,scope.row)"
                      >{{item2.name}}</el-tag>
                      <i class="el-icon-caret-right"></i>
                    </el-col>
                    <el-col :span="18">
                      <el-tag
                        closable
                        :class="index3 === 0 ? '' : 'bdtop'"
                        v-for="(item3,index3) in item2.children"
                        :key="item3.id"
                        type="warning"
                        @close="deletePermissionById(item3.id,scope.row)"
                      >{{item3.name}}</el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column prop="name" label="角色名称"></el-table-column>
          <el-table-column prop="nameZh" label="角色描述"></el-table-column>
          <!--操作列表-->
          <el-table-column label="操作" width="300px">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="showEditRoleDialog(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="deleteRoleById(scope.row.id)">删除</el-button>
              <el-button size="mini" type="warning" @click="showDistributeDialog(scope.row)">分配权限</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-card>
    <!--添加角色对话框-->
    <el-dialog
      title="添加角色"
      :visible.sync="addRoledialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <!--添加角色表单-->
      <el-form ref="addRoleForm" :model="roleInfo" :rules="roleRules" label-width="100px">
        <el-form-item label="角色英文名" prop="name">
          <el-input v-model="roleInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="角色中文名" prop="nameZh">
          <el-input v-model="roleInfo.nameZh"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAddRole">取 消</el-button>
        <el-button
          type="primary"
          @click="submitRoleForm"
          :loading="loading"
        >{{loading ? '提交中...' :'确定'}}</el-button>
      </span>
    </el-dialog>
    <!--编辑角色对话框-->
    <el-dialog
      title="编辑角色"
      :visible.sync="editRoledialogVisible"
      width="30%"
      :before-close="handleCloseEditRole"
    >
      <!--添加角色表单-->
      <el-form ref="editRoleForm" :model="editRoleForm" :rules="roleRules" label-width="100px">
        <el-form-item label="角色英文名" prop="name">
          <el-input v-model="editRoleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色中文名" prop="nameZh">
          <el-input v-model="editRoleForm.nameZh"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelEditRole">取 消</el-button>
        <el-button
          type="primary"
          @click="submitEditRoleForm"
          :loading="loading"
        >{{loading ? '提交中...' :'确定'}}</el-button>
      </span>
    </el-dialog>
    <!--分配权限对话框-->
    <el-dialog title="分配权限" :visible.sync="dialogVisibleDistribute" width="50%">
      <el-tree
        show-checkbox
        :data="rightsList"
        :props="rightsProps"
        node-key="id"
        :default-expand-all="true"
        :default-checked-keys="defaultKeys"
        ref="treeRef"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="distributeRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    var checkRoleName = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z])+$/
      if (!value) {
        return callback(new Error('角色名不能为空'))
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('只能输入英文字符'))
        }
      }, 100)
    }
    var checkRoleNameZh = (rule, value, callback) => {
      const mailReg = /^[\u4e00-\u9fa5]+$/
      if (!value) {
        return callback(new Error('中文名不能为空'))
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('只能输入中文字符'))
        }
      }, 100)
    }
    return {
      roleList: [],
      addRoledialogVisible: false,
      editRoledialogVisible: false,
      dialogVisibleDistribute: false,
      roleInfo: {
        name: '',
        nameZh: ''
      },
      editRoleForm: {
        id: '',
        name: '',
        nameZh: ''
      },
      roleRules: {
        name: [{ validator: checkRoleName, trigger: 'blur' }],
        nameZh: [{ validator: checkRoleNameZh, trigger: 'blur' }]
      },
      loading: false,
      // 所有权限的数据
      rightsList: [],
      rightsProps: {
        children: 'children',
        label: 'name'
      },
      // 默认选中的Tree节点的数组
      defaultKeys: [],
      // 当前操作的角色id
      setRightsRoleId: 0
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { data: res } = await this.$http.get('role/listTree')
      if (res.statusCode !== 200) {
        this.$message.errot('查询角色信息失败')
      }
      this.roleList = res.data
    },
    async deletePermissionById(perId, role) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该角色下的权限, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      const { data: res } = await this.$http.delete(
        `role/delRolePermission/${perId}/${role.id}`
      )
      if (res.statusCode !== 200) {
        return this.$message.error('删除失败')
      }
      role.children = res.data
    },
    showAddRoleDialog() {
      this.addRoledialogVisible = true
    },
    cancelAddRole() {
      this.addRoledialogVisible = false
      this.$refs.addRoleForm.resetFields()
    },
    submitRoleForm() {
      this.loading = true
      this.$refs.addRoleForm.validate(async valid => {
        if (!valid) {
          this.loading = false
          return this.$message.error('请校验表单内容')
        }
        const { data: res } = await this.$http.post('role', this.roleInfo)
        if (res.statusCode === 401) {
          this.loading = false
          return this.$message.error('添加失败，角色名称重复！')
        }
        if (res.statusCode !== 200) {
          this.loading = false
          return this.$message.error('添加角色失败')
        }
        this.loading = false
        this.$message.success('添加成功')
        this.$refs.addRoleForm.resetFields()
      })
      this.addRoledialogVisible = false
      setTimeout(() => {
        this.getRoleList()
      }, 150)
    },
    handleClose() {
      this.addRoledialogVisible = false
      this.$refs.addRoleForm.resetFields()
    },
    // 根据角色id删除角色
    async deleteRoleById(id) {
      const result = await this.$confirm(
        '此操作将永久删除此角色，是否继续?',
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
      const { data: res } = await this.$http.delete(`/role/${id}`)
      if (res.statusCode !== 200) {
        return this.$message.error('删除角色失败')
      }
      this.$message.success('删除角色成功')
      this.getRoleList()
    },
    showEditRoleDialog(role) {
      this.editRoledialogVisible = true
      this.editRoleForm.id = role.id
      this.editRoleForm.name = role.name.substring(5)
      this.editRoleForm.nameZh = role.nameZh
    },
    cancelEditRole() {
      this.editRoledialogVisible = false
    },
    submitEditRoleForm() {
      this.$refs.editRoleForm.validate(async valid => {
        if (!valid) {
          return
        }
        const { data: res } = await this.$http.put('role', this.editRoleForm)
        if (res.statusCode !== 200) {
          return this.$message.error('修改失败')
        }
        this.$message.success('修改成功')
        this.editRoledialogVisible = false
        setTimeout(() => {
          this.getRoleList()
        }, 100)
      })
    },
    handleCloseEditRole() {
      this.editRoledialogVisible = false
    },
    async showDistributeDialog(role) {
      this.defaultKeys = []
      this.setRightsRoleId = role.id
      // 获取所有权限的数据
      const { data: res } = await this.$http.get('/rights/listTree')
      if (res.statusCode !== 200) {
        return this.$message.error('获取权限列表失败')
      }
      this.rightsList = res.data
      this.getRoleAllRights(role, this.defaultKeys)
      this.dialogVisibleDistribute = true
    },
    // 递归获取当前用户的所有三级权限
    getRoleAllRights(right, arr) {
      if (!right.children) {
        return arr.push(right.id)
      }
      right.children.forEach(element => {
        this.getRoleAllRights(element, arr)
      })
    },
    // 分配权限
    async distributeRights() {
      const permissionIds = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      if (permissionIds.length === 0) {
        return
      }
      const {
        data: res
      } = await this.$http.post(`/role/saveRights/${this.setRightsRoleId}`, {
        permissionIds
      })
      if (res.statusCode !== 200) {
        return this.$message.error('保存失败')
      }
      this.$message.success('保存成功')
      this.dialogVisibleDistribute = false
      this.getRoleList()
    }
  }
}
</script>
<style lang="less" scoped>
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.el-tag {
  margin: 7px;
}
.v-center {
  display: flex;
  align-items: center;
}
</style>
