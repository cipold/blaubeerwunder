import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueMeta from "vue-meta";
import {
  CardPlugin,
  CollapsePlugin,
  FormInputPlugin,
  InputGroupPlugin,
  LinkPlugin,
  ListGroupPlugin,
  LayoutPlugin,
  BIconCheckCircle,
  BIconCheckCircleFill,
  BIconChevronExpand,
  BIconHeart,
  BIconPencil,
  BIconPlusCircle,
  BIconSlashCircle,
  BIconTrash,
  BIconXCircle,
} from "bootstrap-vue";
import ContentDivider from "@/components/ContentDivider";
import PageIntro from "@/components/PageIntro";

Vue.use(VueMeta);

Vue.use(CardPlugin);
Vue.use(CollapsePlugin);
Vue.use(FormInputPlugin);
Vue.use(InputGroupPlugin);
Vue.use(LinkPlugin);
Vue.use(ListGroupPlugin);
Vue.use(LayoutPlugin);

Vue.component("BIconCheckCircle", BIconCheckCircle);
Vue.component("BIconCheckCircleFill", BIconCheckCircleFill);
Vue.component("BIconChevronExpand", BIconChevronExpand);
Vue.component("BIconHeart", BIconHeart);
Vue.component("BIconPencil", BIconPencil);
Vue.component("BIconPlusCircle", BIconPlusCircle);
Vue.component("BIconSlashCircle", BIconSlashCircle);
Vue.component("BIconTrash", BIconTrash);
Vue.component("BIconXCircle", BIconXCircle);

Vue.component("ContentDivider", ContentDivider);
Vue.component("PageIntro", PageIntro);

import "./app.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
