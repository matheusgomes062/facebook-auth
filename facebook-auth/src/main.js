import Vue from "vue";
import App from "./App.vue";
import { LoaderPlugin } from "vue-google-login";

Vue.config.productionTip = false;

Vue.use(LoaderPlugin, {
  apiKey: "ZwBah22O3f0ux2fzSgquqJZs",
  client_id:
    "154764825379-as14670lqokolq295kibs9fk3pr886o6.apps.googleusercontent.com",
  cookiepolicy: "single_host_origin",
  discoveryDocs: [
    "https://people.googleapis.com/v1/{'resourceName'=people/me; 'personFields': 'birthdays'}",
  ],
  scope: "profile",
});

Vue.GoogleAuth.then((auth2) => {
  if (localStorage.getItem("authToken") !== 0) {
    console.log(auth2.result);
    return;
  }
  if (auth2.isSignedIn.get() === true) auth2.signOut();
});

new Vue({
  render: (h) => h(App),
}).$mount("#app");
