<template>
  <div class="app">
    <div class="login-component">
      <section class="title">See source code to learn how to implement this!</section>
      <div class="login-buttons-container">
        <v-facebook-login
          app-id="INSERT YOUR app-id HERE"
          @login="onLogin"
          @logout="onLogout"
          @get-initial-status="getUserData"
          @sdk-loaded="sdkLoaded"
        ></v-facebook-login>
        <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess"></GoogleLogin>
      </div>
      <section class="sub-title">
        <div>This is the info you give to us by logging in with facebook</div>
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
import GoogleLogin from "vue-google-login";

export default {
  name: "facebookLogin",
  components: {
    VFacebookLogin,
    GoogleLogin
  },
  data() {
    return {
      isConnected: false,
      name: "",
      email: "",
      personalID: "",
      birthday: "",
      FB: undefined,

      params: {
        client_id: "INSERT YOUR CLIENT_ID HERE"
      },
      renderParams: {
        width: 206,
        height: 50,
        longtitle: false
      }
    };
  },
  methods: {
    getUserData() {
      window.FB.api(
        "/me",
        "GET",
        { fields: "id,name,email,birthday" },
        user => {
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
    onSuccess(googleUser) {
      console.log(googleUser);

      // This only gets the user information: id, name, imageUrl and email
      console.log(googleUser.getBasicProfile());

      this.personalID = googleUser.getBasicProfile().getId();
      this.email = googleUser.getBasicProfile().getEmail();
      this.name = googleUser.getBasicProfile().getName();
      this.birthday = googleUser.getBirthdays();
    }
  }
};
</script>

<style lang="scss">
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
  div {
    font-family: system-ui;
    margin-bottom: 10px;
  }
}

.login-buttons-container {
  display: flex;
  flex-direction: row;
  width: 500px;
  justify-content: space-between;
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
