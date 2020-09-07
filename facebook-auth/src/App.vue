<template>
  <div class="app">
    <div class="login-component">
      <section class="title">
        See source code to learn how to implement this!
      </section>
      <v-facebook-login
        app-id="2903441363095044"
        @login="onLogin"
        @logout="onLogout"
        @get-initial-status="getUserData"
        @sdk-loaded="sdkLoaded"
      ></v-facebook-login>
      <section class="sub-title">
        This is the info you give to us by logging in with facebook
        <p>Name: {{ name }}</p>
        <p>Email: {{ email }}</p>
        <p>ID: {{ personalID }}</p>
        <p>birthday: {{ birthday }}</p>
      </section>
    </div>
  </div>
</template>

<script>
import VFacebookLogin from "vue-facebook-login-component";

export default {
  name: "facebookLogin",
  components: {
    VFacebookLogin,
  },
  data() {
    return {
      isConnected: false,
      name: "",
      email: "",
      personalID: "",
      birthday: "",
      FB: undefined,
    };
  },
  methods: {
    getUserData() {
      window.FB.api(
        "/me",
        "GET",
        { fields: "id,name,email,birthday" },
        (user) => {
          this.personalID = user.id;
          this.email = user.email;
          this.name = user.name;
          this.birthday = user.birthday;
        }
      );
    },
    sdkLoaded(payload) {
      this.isConnected = payload.isConnected;
      this.FB = payload.FB;
      if (this.isConnected) this.getUserData();
    },
    onLogin() {
      this.isConnected = true;
      this.getUserData();
    },
    onLogout() {
      this.isConnected = false;
    },
  },
};
</script>

<style>
.app {
  height: 100%;
  max-height: 100%;
}

.login-component {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.title {
  font-family: "Courier New", Courier, monospace;
  font-weight: bold;
  font-size: 1.5em;
  margin-bottom: 100px;
}

.sub-title {
  font-family: "Courier New", Courier, monospace;
  font-weight: bold;
  font-size: 1em;
  margin-top: 100px;
}

.button {
  color: white;
  min-width: 150px;
  background-color: #3b5998;
  height: 2.5rem;
  border-style: none;
  border-radius: 2rem;
  font-weight: 400;
  font-size: 0.8rem;
  box-shadow: 0 7px 15px 0px rgba(0, 0, 0, 0.2);
  outline: none;
  cursor: pointer;
}

.button:hover {
  box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
}
</style>
