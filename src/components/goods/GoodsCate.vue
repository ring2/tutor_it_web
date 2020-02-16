<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片-->
    <el-card>
      <!--添加商品按钮-->
      <el-row>
        <el-col>
          <el-button type="primary" @click="showAddGoodsDialog()">添加商品</el-button>
        </el-col>
      </el-row>
      <!--表格-->
      <el-row style="margin-top:20px">
        <tree-table
          :data="categoryList"
          :selection-type="false"
          :expand-type="false"
          show-index
          :columns="columns"
        >
          <template v-slot:isok="scope">
            <i class="el-icon-success" v-if="!scope.row.cateDeleted" style="color: lightgreen"></i>
            <i class="el-icon-error" v-else style="color: red"></i>
          </template>
          <template v-slot:level="scope">
            <el-tag v-if="scope.row.cateLevel === 0">一级</el-tag>
            <el-tag v-else-if="scope.row.cateLevel === 1" type="success">二级</el-tag>
            <el-tag v-else type="warning">三级</el-tag>
          </template>
          <template v-slot:ops="scope">
            <el-button size="mini" type="primary" @click="showEditCateDialog(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="delGoodsCate(scope.row)">删除</el-button>
          </template>
        </tree-table>
      </el-row>

      <!--分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.pageNum"
        :page-sizes="[2, 5, 10, 15]"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!--添加分类对话框-->
    <el-dialog title="添加分类" :visible.sync="addCatedialogVisible" width="30%">
      <el-form ref="addCateRef" :model="addCateInfo" label-width="80px" :rules="cateRules">
        <el-form-item label="分类名称" prop="cateName">
          <el-input v-model="addCateInfo.cateName"></el-input>
        </el-form-item>
        <el-form-item label="父级分类" prop="cateName">
          <el-cascader
            style="width:100%"
            v-model="selectedPid"
            :options="parentCateList"
            @change="handleChangeSelected"
            :props="{ expandTrigger: 'hover', label:'cateName', value: 'id',disabled:'cateDeleted',checkStrictly: true }"
            placeholder="不选则默认为一级分类"
            clearable
            filterable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCatedialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addGoodsCate()">确 定</el-button>
      </span>
    </el-dialog>
    <!--编辑分类名称对话框-->
    <el-dialog
      title="编辑分类名称"
      :visible.sync="editCatedialogVisible"
      width="30%"
    >
      <el-form ref="editRef" :model="updateCateInfo" :rules="cateRules" label-width="80px">
        <el-form-item label="分类名称" prop="cateName">
          <el-input v-model="updateCateInfo.cateName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCatedialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateGoodsCateName">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageInfo: {
        pageNum: 1,
        pageSize: 2,
        type: 3
      },
      addCateInfo: {
        cateName: '',
        catePid: 0,
        cateLevel: 0
      },
      updateCateInfo: {
        id: 0,
        cateName: ''
      },
      updateCateId: 0,
      cateRules: {
        cateName: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      },
      total: 0,
      categoryList: [],
      columns: [
        {
          label: '分类名称',
          prop: 'cateName'
        },
        {
          label: '是否有效',
          type: 'template',
          template: 'isok'
        },
        {
          label: '层级',
          type: 'template',
          template: 'level'
        },
        {
          label: '操作',
          type: 'template',
          template: 'ops'
        }
      ],
      addCatedialogVisible: false,
      editCatedialogVisible: false,
      parentCateList: [],
      selectedPid: 0
    }
  },
  created() {
    this.getCategoryList()
  },
  methods: {
    handleSizeChange(pageSize) {
      this.pageInfo.pageSize = pageSize
      this.getCategoryList()
    },
    handleCurrentChange(pageNum) {
      this.pageInfo.pageNum = pageNum
      this.getCategoryList()
    },
    showAddGoodsDialog() {
      this.selectedPid = 0
      this.addCateInfo.catePid = 0
      this.addCateInfo.cateLevel = 0
      this.addCatedialogVisible = true
      this.addCateInfo.cateName = ''
      this.getParentGoodsCate()
    },
    async getCategoryList() {
      const { data: res } = await this.$http.get('/goods/categories', {
        params: this.pageInfo
      })
      if (res.statusCode !== 200) {
        return this.$message.error('分类列表查询失败')
      }
      this.categoryList = res.data.data
      this.total = res.data.total
    },
    async delGoodsCate(goodsCate) {
      console.log(goodsCate)
      if (goodsCate.cateDeleted) {
        return this.$message.error('该分类已删除')
      }
      const result = await this.$confirm(
        '此操作将删除此分类，是否继续?',
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
      const { data: res } = await this.$http.delete(
        '/goods?id=' + goodsCate.id + '&cateDeleted=' + goodsCate.cateDeleted
      )
      if (res.statusCode !== 200) {
        return this.$message.error('删除分类失败!')
      }
      this.getCategoryList()
      this.$message.success('删除成功')
    },
    async getParentGoodsCate() {
      const { data: res } = await this.$http.get('/goods/categories/', {
        params: {
          type: 2
        }
      })
      if (res.statusCode !== 200) {
        return this.$message.error('获取父级分类列表失败')
      }
      this.parentCateList = res.data.data
    },
    handleChangeSelected() {
      var arr = this.selectedPid
      this.addCateInfo.catePid = arr[arr.length - 1]
      this.addCateInfo.cateLevel = arr.length - 1
    },
    // 添加分类
    addGoodsCate() {
      this.$refs.addCateRef.validate(async valid => {
        if (!valid) {
          return
        }
        console.log(this.addCateInfo)
        const { data: res } = await this.$http.post('/goods', this.addCateInfo)
        if (res.statusCode !== 200) {
          return this.$message.error(res.message)
        }
        this.$message.success('添加分类成功')
        this.getCategoryList()
        this.addCatedialogVisible = false
      })
    },
    // 显示编辑分类对话框
    showEditCateDialog(goodsCate) {
      this.updateCateId = goodsCate.id
      this.updateCateInfo.cateName = goodsCate.cateName
      this.editCatedialogVisible = true
    },
    updateGoodsCateName() {
      this.updateCateInfo.id = this.updateCateId
      this.$refs.editRef.validate(async valid => {
        if (!valid) {
          return
        }
        const { data: res } = await this.$http.put('/goods', this.updateCateInfo)
        if (res.statusCode !== 200) {
          return this.$message.err(res.message)
        }
        this.addCateInfo.cateName = ''
        this.getCategoryList()
        this.editCatedialogVisible = false
        this.$message.success('修改成功')
      })
    }
  }
}
</script>
<style scoped>
</style>
