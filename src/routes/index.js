import express from "express";
import userRoute from "./user.route";
import signUpRoute from "./signup.route";
import signInRoute from "./signin.route";
import filmListRoute from "./filmList.route";
import filmDetailRoute from "./filmDetail.route";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/signin",
    route: signInRoute,
  },
  {
    path: "/signup",
    route: signUpRoute,
  },
  {
    path: "/danh-sach",
    route: filmListRoute,
  },
  {
    path: "/phim/thong-tin",
    route: filmDetailRoute,
  }
];

// set router for defaultRoutes
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

router.route("/").get((req, res) => {
  res.render("index", { title: "Express" });
});

export default router;
