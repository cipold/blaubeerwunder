import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueMeta from "vue-meta";
import {
  CardPlugin,
  FormInputPlugin,
  InputGroupPlugin,
  LinkPlugin,
  ListGroupPlugin,
  LayoutPlugin,
  ModalPlugin,
  BIconCheckCircle,
  BIconCheckCircleFill,
  BIconChevronExpand,
  BIconHeart,
  BIconPencil,
  BIconPlusCircle,
  BIconSlashCircle,
  BIconTrash,
} from "bootstrap-vue";

Vue.use(VueMeta);

Vue.use(CardPlugin);
Vue.use(FormInputPlugin);
Vue.use(InputGroupPlugin);
Vue.use(LinkPlugin);
Vue.use(ListGroupPlugin);
Vue.use(LayoutPlugin);
Vue.use(ModalPlugin);

Vue.component("BIconCheckCircle", BIconCheckCircle);
Vue.component("BIconCheckCircleFill", BIconCheckCircleFill);
Vue.component("BIconChevronExpand", BIconChevronExpand);
Vue.component("BIconHeart", BIconHeart);
Vue.component("BIconPencil", BIconPencil);
Vue.component("BIconPlusCircle", BIconPlusCircle);
Vue.component("BIconSlashCircle", BIconSlashCircle);
Vue.component("BIconTrash", BIconTrash);

import "./app.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
