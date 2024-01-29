export default [
    {
      path: "/services",
      name: "services",
      component: () => import("@/views/Services/AllServices.vue"),
      meta: {
        pageTitle: "Services",
        breadcrumb: [
          {
            text: "Services",
            active: true,
          },
        ],
      },
    },
    {
      path: "/categories",
      name: "categories",
      component: () => import("@/views/Category/Allcategories.vue"),
      meta: {
        pageTitle: "Categories",
        breadcrumb: [
          {
            text: "Categories",
            active: true,
          },
        ],
      },
    },
  ];
  