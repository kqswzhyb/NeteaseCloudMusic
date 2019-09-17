const routes = [
  {
    path: "/",
    redirect: "/radio"
  },
  {
    path: "/login",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Login.vue"),
        meta: {
          title: "登录",
          back:true
        }
      }
    ]
  },
  {
    path: "/radio",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Radio.vue"),
        meta: {
          title: "热门电台",
          back:true
        }
      }
    ]
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
    children: [
      { path: "", component: () => import("pages/SongListDetail.vue") }
    ]
  },
  {
    path: "/player/:id",
    component: () => import("layouts/MyLayout.vue"),
    children: [{ path: "", component: () => import("pages/Player.vue") }]
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
