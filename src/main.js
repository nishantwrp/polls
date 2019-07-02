import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

import Vuetify from "vuetify";
import colors from "vuetify/es5/util/colors";

Vue.use(Vuetify, {
  theme: {
    primary: colors.green.accent4,
    secondary: colors.green.accent3,
    accent: colors.green.accent2
  },
  iconfont: "fa"
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
