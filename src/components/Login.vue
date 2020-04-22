<template>
  <div class="login_container">
    <div class="login_box">
      <!--头像-->
      <div class="avatar_box">
        <img src="../assets/avatar.jpg" alt />
      </div>
      <!--表单区域-->
      <div class="login_form">
        <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef" size="small">
          <el-form-item prop="userName">
            <el-input prefix-icon="el-icon-user" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password" style="margin-top:34px">
            <el-input prefix-icon="el-icon-lock" v-model="loginForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item prop="result">
            <el-input
              style="width:60%"
              prefix-icon="el-icon-s-promotion"
              v-model="loginForm.result"
            ></el-input>
            <span style="margin-left:40px;" @click="refreshCaptcha" v-loading="loading">
              <img :src="img" alt />
            </span>
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
      img: '',
      loginForm: {
        username: 'sanmao',
        password: '123456',
        key: '',
        result: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        result: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      loading: false
    }
  },
  created() {
    this.getCaptcha()
  },
  methods: {
    resetForm() {
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('/login', this.loginForm)
        if (res.statusCode !== 200) {
          return this.$message.error(res.message)
        }
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
    // 获取验证码 获取到后端发来的key 和 图片验证码
    async getCaptcha() {
      this.loading = true
      const { data: res } = await this.$http.get('/captcha')
      if (res.statusCode === 200) {
        this.loginForm.key = res.data.key
        this.img = res.data.captcha
        this.loading = false
      } else {
        this.$message.error('获取验证码失败')
      }
    },
    async refreshCaptcha() {
      this.loading = true
      const { data: res } = await this.$http.get('/captcha')
      if (res.statusCode === 200) {
        this.loginForm.key = res.data.key
        this.img = res.data.captcha
        this.loading = false
      }
      this.loading = false
    }
  }
}
</script>
<style lang="less" scoped>
.login_container {
  background-color: #00bcd4;
  background-image: url('../assets/homebg.jpg');
  background-size: 100%;
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
    transform: translate(-50%, -60%);
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
