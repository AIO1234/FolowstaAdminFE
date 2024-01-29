import Vue from "vue";
import VueRouter from "vue-router";
import mainRoute from "./modules/home_route";
import servicesRoute from "./modules/services_route";
import ordersRoute from "./modules/orders_route";
import reviewsRoute from "./modules/reviews_route";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [...mainRoute, ...servicesRoute, ...ordersRoute, ...reviewsRoute],
});

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});

export default router;
