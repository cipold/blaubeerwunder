import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueMeta from "vue-meta";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

Vue.use(VueMeta);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

import "./app.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
