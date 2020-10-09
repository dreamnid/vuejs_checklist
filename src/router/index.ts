import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import ChecklistsIndex from "@/views/ChecklistsIndex.vue";
import ChecklistsShow from "@/views/ChecklistsShow.vue";
import ChecklistsNew from "@/views/ChecklistsNew.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'ChecklistsIndex',
    component: ChecklistsIndex,
  },
  {
    path: '/checklists/new',
    component: ChecklistsNew,
    name: 'ChecklistsNew'
  },
  {
    path: '/checklists/:slug',
    name: 'ChecklistsShow',
    component: ChecklistsShow,
  },

];

const router = new VueRouter({
  routes,
});

export default router;
