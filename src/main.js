// main.js
import vuetify from "./plugins/vuetify";
import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
