<template>
  <div id="app" class="app">
    <div class="header">
      <img src="@\assets\logopaymin.png" />
      <nav>
        <button v-if="is_auth" v-on:click="loadHome">Home</button>
        <button v-if="is_auth" v-on:click="loadProfile">My profile</button>
        <button v-if="is_auth" v-on:click="loadTransaction">
          Make a transaction
        </button>
        
        
        <button v-if="!is_auth" v-on:click="loadLogIn">LogIn</button>
        <button v-if="!is_auth" v-on:click="loadSignUp">SignUp</button>
        <button v-if="is_auth" v-on:click="logOut">Logout</button>
      </nav>
    </div>
    <div class="main-component">
      <router-view
        v-on:completedLogIn="completedLogIn"
        v-on:completedSignUp="completedSignUp"
        v-on:logOut="logOut"
      >
      </router-view>
    </div>
    <div class="footer">
      <h2>PayMin - Misión TIC 2022</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data: function () {
    return {
      is_auth: false,
    };
  },
  components: {},
  methods: {
    verifyAuth: function () {
      this.is_auth = localStorage.getItem("isAuth") || false;
      if (this.is_auth == false) this.$router.push({ name: "logIn" });
      else this.$router.push({ name: "home" });
    },
    loadLogIn: function () {
      this.$router.push({ name: "logIn" });
    },
    loadSignUp: function () {
      this.$router.push({ name: "signUp" });
    },
    loadHome: function () {
      this.$router.push({ name: "home" });
    },
    completedLogIn: function (data) {
      localStorage.setItem("isAuth", true);
      localStorage.setItem("username", data.username);
      localStorage.setItem("token_access", data.token_access);
      localStorage.setItem("token_refresh", data.token_refresh);
      alert("Succesful authentication");
      this.verifyAuth();
    },
    completedSignUp: function (data) {
      alert("Succesful registration");
      this.completedLogIn(data);
    },
    loadProfile: function () {
      this.$router.push({ name: "profile" });
    },
    loadTransaction: function () {
      this.$router.push({ name: "transaction" });
    },
    logOut: function () {
      localStorage.clear();
      alert("Log Out");
      this.verifyAuth();
    },
  },
  created: function () {
    this.verifyAuth();
  },
};
</script>

<style>
body {
  margin: 0 0 0 0;
}
.header {
  margin: 0%;
  padding: 0;
  width: 100%;
  height: 10vh;
  min-height: 100px;

  background-color: #ffffff;

  border-top: 3px solid #3a90cb;
  border-bottom: 1px solid rgba(53, 110, 124, 0.5);
  color: #e5e7e9;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header img {
  height: 70%;
  padding-left: 50px;
  align-self: center;
}
.header h1 {
  width: 20%;
  text-align: center;
}
.header nav {
  height: 100%;
  width: 20%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 20px;
}

.header nav button {
  color: #e5e7e9;
  background: #283747;
  border: 1px solid #e5e7e9;

  border-radius: 35px;
  padding: 10px 20px;
  font-family: monospace;
}

.header nav button:hover {
  color: #12181f;
  background: #3a90cb;
  border: 1px solid #e5e7e9;
}

.main-component {
  height: 75vh;
  margin: 0%;
  padding: 0%;

  background: #fdfefe;
}

.footer {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 10vh;
  min-height: 100px;

  background-color: #283747;
  color: #e5e7e9;
}

.footer h2 {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>