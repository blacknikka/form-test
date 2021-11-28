import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Forms from "@/views/Form.vue";
import Done from "@/views/Done.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Forms",
    component: Forms,
  },
  {
    path: "/confirm",
    name: "Confirm",
    component: Done,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
