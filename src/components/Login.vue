<template>
  <div class="login_container">
    <div class="login_box">
      <!--头像-->
      <div class="avatar_box">
        <img src="../assets/avatar.jpg" alt />
      </div>
      <!--表单区域-->
      <div class="login_form">
        <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef">
          <el-form-item prop="userName">
            <el-input prefix-icon="el-icon-user" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock" v-model="loginForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        username: 'sanmao',
        password: '123456'
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetForm() {
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('/login', this.loginForm)
        if (res.statusCode !== 200) { return this.$message.error('用户名或者密码错误') }
        this.$message({
          type: 'success',
          message: '登录成功',
          duration: 2000
        })
        window.sessionStorage.setItem('token', res.data.token)
        window.sessionStorage.setItem('tokenHead', res.data.tokenHead)
        this.$router.push('/home')
      })
    },
    testMessage() {
      this.$message.success('成功了')
    }
  }
}
</script>
<style lang="less" scoped>
.login_container {
  background-color:#00bcd4;
  height: 100%;
}
.login_box {
  background-color: #fff;
  height: 300px;
  width: 450px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  .avatar_box {
    height: 130px;
    width: 130px;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    padding: 8px;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border: 1px solid #eee;
    box-shadow: 0 0 10px #ddd;
    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  .login_form {
    position: absolute;
    bottom: 0;
    padding: 0 20px;
    width: 100%;
    box-sizing: border-box;
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
