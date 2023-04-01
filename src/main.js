import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import moment from "moment";
import "moment/locale/ru";
moment.locale("ru");
import Mainstyle from "@/assets/main.css";

Vue.prototype.$moment = moment;

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
