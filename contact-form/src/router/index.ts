import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Forms from "@/views/Form.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Forms",
    component: Forms,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
