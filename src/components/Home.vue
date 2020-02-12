<template>
  <div class="div-home">
    <el-container class="container-home">
      <!--头部区域-->
      <el-header>
        <div>
          <img src="../assets/img/1212.jpg" style="height:60px; width:70px;border-radius:50%" />
          <span>Tutor-IT后台管理系统</span>
        </div>
        <el-button type="primary" @click="aboutMe" class="about-me" style="margin-left: 1050px;" round>关于我</el-button>
        <el-button type="info" @click="loginOut" round >退出</el-button>
      </el-header>
      <el-container>
        <!--左边菜单区域-->
        <el-aside :width="isMenuOpen ? '64px' : '200px'" >
          <div class="toggle-button" @click="toggleCollapse">|||</div>
          <el-menu
            background-color="#263238"
            text-color="#fff"
            active-text-color="#409EFF"
            unique-opened
            :default-active="adtiveMenu"
            :collapse="isMenuOpen"
            :collapse-transition="false"
            router
          >
            <!--一级菜单-->
            <el-submenu :index="menu.uri + ''" v-for="menu in menuList" :key="menu.id" >
              <template slot="title">
                <i :class="menu.icon"></i>
                <span>{{menu.name}}</span>
              </template>
              <!--一级菜单的子菜单-->
              <el-menu-item  :index="subMenu.uri" v-for="subMenu in menu.children" :key="subMenu.id">
                <template slot="title">
                  <i :class="subMenu.icon"></i>
                  <span>{{subMenu.name}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
    <!--关于我的展示-->
     <el-drawer
      title="河南工业大学"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
    >
      <span>河南工业大学2016级计算机科学与技术专业学生：魏全全</span>
    </el-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menuList: [],
      isMenuOpen: false,
      adtiveMenu: '/user',
      drawer: false,
      direction: 'ltr'
    }
  },
  created() {
    this.getMenuList()
  },
  methods: {
    loginOut() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList() {
      const { data: res } = await this.$http.get('/menu')
      if (res.statusCode !== 200) return this.$message.error(res.message)
      this.menuList = res.data
    },
    toggleCollapse() {
      var flag = this.isMenuOpen
      this.isMenuOpen = !flag
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    aboutMe() {
      this.drawer = true
    }
  }
}
</script>
<style lang="less" scoped>
.div-home {
  height: 100%;
}
.container-home {
  height: 100%;
}
.el-header {
  background-color:#47ACA1;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  font-size: 20px;
  align-items: center;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #263238;
  .el-menu{
    border-right: none;
  }
}
.el-main {
  background-color: aliceblue;
}
.toggle-button{
  line-height: 24px;
  color:#fff;
  letter-spacing: 0.2em;
  text-align: center;
  background-color: #263238;
  cursor: pointer;
  font-size: 12px;
}
.el-button{
  background-color: #47ACA1;
  border:1px solid #fff
}
.about-me{
  background-color: #47ACA1;
  border:1px solid #fff
}
.el-button:hover{
    background-color: #47ACA1;
  }
</style>
