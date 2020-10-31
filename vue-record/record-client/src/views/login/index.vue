<template>
  <div class="wrapper">
    <div class="slanty-top">
      <img class="bg-img" src="@/assets/2.gif" />
    </div>
    <div class="like-logo">
      <img class="like" src="@/assets/like.png" />
    </div>
    <div class="talk">
          <div class="talk01">
          遇见你 是
        </div>
        <div class="talk02">
          最美的期待
        </div>
        </div>
    <div class="slanty-down">
      <div class="block">
      <div class="login-container">
        <van-cell-group class="box">
          <van-field 
            v-model="account"
            label-align="left"
            required
            clearable
            label="用户名"
            icon="question"
            placeholder="请输入用户名"
            @click-icon="handleQuestion"
          />

          <van-field 
            v-model="password"
            label-align="left"
            type="password"
            clearable
            label="密码"
            placeholder="请输入密码"
            required
          />

          <van-field 
            v-show="!isLogin"
            v-model="rePassword"
            label-align="left"
            type="password"
            clearable
            label="重复密码"
            placeholder="请再次输入密码"
            required
          />
        </van-cell-group>

        <van-row>
          <van-button size="small" @click="handleRegister">
            {{ isLogin ? "注 册" : "已有账号" }}
          </van-button>

          <van-button
            type="primary"
            class="btn-login"
            size="small"
            @click="handleLogin"
          >
            {{ isLogin ? "登 录" : "注册并登录" }}
          </van-button>
        </van-row>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      account: "",
      password: "",
      rePassword: "",
      isLogin: true,
    };
  },
  methods: {
    handleQuestion() {},
    handleRegister() {
      this.isLogin = !this.isLogin;
    },
    ...mapActions(["setUserInfo"]),
    login() {
      this.$http
        .login({
          account: this.account,
          password: this.password,
        })
        .then((res) => {
          console.log(res);
          this.$toast.clear(); // 登录加载消失

          // 存数据
          this.setUserInfo(res.data);

          this.$router.push("/home"); // 路由跳转到首页
        });
    },
    handleLogin() {
      if (this.account.trim() == "" || this.password.trim() == "") {
        this.$toast.fail("用户名或密码不能为空！");
        return;
      }
      if (this.isLogin) {
        // login 登录
        this.showLoginTip("登录中..."); // 登录加载
        this.login(); // 发起接口请求
      } else {
        // register 注册
        if (this.rePassword !== this.password) {
          this.$toast.fail("两次输入密码不一致！");
          return;
        }
        this.showLoginTip("注册中...");
        this.$http
          .register({
            account: this.account,
            password: this.password,
          })
          .then((res) => {
            console.log(res);
            this.$toast.clear(); // 注册加载消失
            // 存数据
            this.setUserInfo(res.data);
            this.$router.push("/home"); // 路由跳转到首页
          });
      }
    },
    showLoginTip(status) {
      this.$toast.loading({
        message: status,
        forbidClick: false,
        loadingType: "spinner",
        duration: 0,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.slanty-top {
  height: 300px;
  width: 100%;
  -webkit-transform: skew(0, 20deg);
  -ms-transform: skew(0, 10deg);
  transform: skew(0, 0deg);
  margin-bottom: -5em;
}
.bg-img {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -100;
}
.like {
  position: absolute;
  width: 55px;
  height: 55px;
  z-index: 1;
  margin-top: -30px;
  margin-left: 160px;
}
.slanty-down {
  background: white;
  -webkit-transform: skew(0, -10deg);
  -ms-transform: skew(0, -10deg);
  transform: skew(0, -10deg);
  height: 100vh;
  z-index: -10;
}
.block {
  background: linear-gradient(to bottom right, rgba(0,40,89, .5), rgba(35,109,134,.5));
  z-index: -1;
  height: 100vh;
}
.talk {
  // -webkit-transform: skew(0, 10deg);
  // -ms-transform: skew(0, 10deg);
  // transform: skew(0, 10deg);
  position: absolute;
  z-index: 10;
}
.talk01 {
  width: 2px;
  height: 16px;
  margin-left: 320px;
  font-size: 18px;
  // background:linear-gradient(#ff0592 50%, #ffbee3);
  // color:transparent;
  // background-clip:text;
  // -webkit-background-clip: text;
  // -webkit-text-fill-color: transparent
  color: #ff0592;
}
.talk02 {
  width: 2px;
  height: 18px;
  margin-left: 290px;
  font-size: 16px;
  color: #ffbee3;
}
.login-container {
  -webkit-transform: skew(0, 10deg);
  -ms-transform: skew(0, 10deg);
  transform: skew(0, 10deg);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 30vh;

  .logo {
    width: 300px;
    margin: 100px 0 20px;
  }

  .box {
    width: 280px;
    margin-bottom: 20px;
    background: linear-gradient(to bottom right, rgba(0,40,89, .5), rgba(35,109,134,.5));
  }
  .van-cell {
    background: linear-gradient(to bottom right, rgba(0,40,89, .5), rgba(35,109,134,.5));
  }
  .btn-login {
    margin-left: 20px;
    background: linear-gradient(to bottom right, rgba(0,40,89, .5), rgba(35,109,134,.5));
  }
}
</style>