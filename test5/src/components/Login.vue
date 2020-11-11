<template>
  <div class="login">
    <div class="login_bg"></div>
    <div class="login_info">
      <div class="logo">
        <img src="../assets/logo.png" alt="">
      </div>
      <div class="user_info">
        <p>
<!--          <i><img src="../assets/user.png" alt=""></i>-->
          <el-input
            prefix-icon="el-icon-user"
            placeholder="请输入用户名"
            v-model="userName">
          </el-input>
        </p>
        <p>
          <el-input
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            show-password
            v-model="userPwd">
          </el-input>
        </p>
        <div class="identify">
            <span class="identify_input">
              <el-input
                placeholder="请输入验证码"
                v-model="loginCode">
            </el-input>
            </span>
          <span class="identify_code" @click="Refresh">
              <identify :identifyCode="identifyCode" ></identify>
            </span>
        </div>

      </div>
      <div class="login_btn">
        <el-button type="primary" style="width: 100%;background-color: #2A66F2;" @click="userLogin">立即登录<i class="el-icon-right"></i></el-button>
      </div>
    </div>

  </div>
</template>

<script>
import identify from '../components/identify/Identify'
export default {
  name: "Login",
  components: {
    identify: identify
  },
  data() {
    return {
      userName: null,
      userPwd: null,
      loginCode:null,
      identifyCode: '',
      identifyCodes:[],
    }
  },
  created() {
  },
  beforeCreate() {
  },
  mounted() {
    this.makeCode()
  },
  methods: {
    //登陆
    userLogin(){
      this.$router.replace('/home');
    },
    //随机生成26个大写字母
    randomNum() {
      let result = [];
      for (let i = 0; i < 4; i++) {
        let ranNum = Math.ceil(Math.random() * 25); //生成一个0到25的数字
        //大写字母'A'的ASCII是65,A~Z的ASCII码就是65 + 0~25;然后调用String.fromCharCode()传入ASCII值返回相应的字符并push进数组里
        result.push(String.fromCharCode(65 + ranNum));
      }
      return result
    },
    makeCode() {
      this.identifyCodes = this.randomNum();
      for (let i = 0; i < 4; i++) {
        this.identifyCode += this.identifyCodes[i];
      }
    },
    Refresh(){
      this.identifyCode = '';
      this.makeCode();
    }
  }
}
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;
  position: relative;

  .login_bg {
    background: url("../assets/bg.png") 100% 100% no-repeat;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-width: 1360px;
    z-index: -10;
    zoom: 1;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    background-position: center 0;
  }

  .login_info {
    width: 490px;
    //height: 620px;
    background-color: #fff;
    border-radius: 5px;
    position: absolute;
    top: 50%;
    margin-top: -310px;
    right: 315px;
    padding: 48px 78px 78px;
    box-sizing: border-box;

    .logo {
      img {
        width: 200px;
        height: 120px;
      }
    }
    .user_info{
      p{
        position: relative;
        margin-top: 20px;
        height: 56px;
        width: 350px;
        //background-color: skyblue;
        i{
          position: absolute;
          //width: 50px;
          //height: 56px;
          top: 0;
          left: 0;
          z-index: 99;
          background-color: #F6F9FC;

        }
      }
      .identify {
        display: flex;
        flex-direction: row;
        justify-content: left;
        align-items: center;
        margin-top: 20px;
        .identify_input {
          width: 200px;
          height: 42px;
          margin-right: 20px;
        }

      }
    }
    .login_btn{
      margin-top: 58px;
      //background-color: skyblue;
    }
  }
}
</style>
