const routes = [
  {
    path: "/",
    redirect: "/radio"
  },
  {
    path: "/login",
    component: () => import("layouts/MyLayout.vue"),
    children: [{ path: "", component: () => import("pages/Login.vue") }]
  },
  {
    path: "/radio",
    component: () => import("layouts/MyLayout.vue"),
    children: [{ path: "", component: () => import("pages/Radio.vue") }]
  },
  {
    path: "/radio/:id",
    component: () => import("layouts/MyLayout.vue"),
    children: [{ path: "", component: () => import("pages/RadioDetail.vue") }]
  },
  {
    path: "/songlist/:id",
    component: () => import("layouts/MyLayout.vue"),
    children: [{ path: "", component: () => import("pages/SongList.vue") }]
  },
  {
    path: "/songlistdetail/:id",
    component: () => import("layouts/MyLayout.vue"),
    children: [{ path: "", component: () => import("pages/SongListDetail.vue") }]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
