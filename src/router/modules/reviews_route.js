export default [
    {
      path: "/reviews",
      name: "reviews",
      component: () => import("@/views/Reviews/AllReviews.vue"),
      meta: {
        pageTitle: "AllReviews",
        breadcrumb: [
          {
            text: "AllReviews",
            active: true,
          },
        ],
      },
    },
  ];
 