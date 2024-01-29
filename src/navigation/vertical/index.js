export default [
  {
    title: "Dashboard",
    route: "home",
    icon: "HomeIcon",
    role: "Admin",
  },
  {
    title: "Category",
    icon: "CheckCircleIcon",
    role: "Admin",
    children: [
      {
        title: "All categories",
        route: "categories",
      },
    ],
  },
  {
    title: "Servies",
    icon: "CheckCircleIcon",
    role: "Admin",
    children: [
      {
        title: "All Services",
        route: "services",
      },
    ],
  },
  {
    title: "Reviews",
    route: "reviews",
    icon: "ThumbsUpIcon",
    role: "Admin",
  },
  {
    title: "Orders",
    route: "orders",
    icon: "ShoppingCartIcon",
    role: "Admin",
  },
];
