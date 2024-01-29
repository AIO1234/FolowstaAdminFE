export default [
    {
      path: "/orders",
      name: "orders",
      component: () => import("@/views/Orders/orders.vue"),
      meta: {
        pageTitle: "Orders",
        breadcrumb: [
          {
            text: "Orders",
            active: true,
          },
        ],
      },
    },
  ];
  