<template>
  <div class="login_container">
    <div class="login_box">
      <!--头像-->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <!--表单区域-->
      <div class="login_form">
        <el-form :model="loginForm">
          <el-form-item>
            <el-input prefix-icon="el-icon-user" v-model="loginForm.userName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input prefix-icon="el-icon-lock" v-model="loginForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary">登录</el-button>
            <el-button type="info">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loginForm: {
        userName: '',
        password: ''
      }
    }
  }
}
</script>
<style lang="less" scoped>
.login_container {
  background-color: rgba(104, 190, 240, 0.89);
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
  };
  .login_form{
    position: absolute;
    bottom: 0;
    padding: 0 20px;
    width: 100%;
    box-sizing: border-box;
  }
}
.btns{
  display: flex;
  justify-content: flex-end;
}
</style>
