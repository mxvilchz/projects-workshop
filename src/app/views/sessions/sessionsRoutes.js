import { lazy } from "react";

const Signup = lazy(() => import("./Signup"));

const Signin = lazy(() => import("./Signin"));

const ForgotPassword = lazy(() => import("./ForgotPassword"));

const Error404 = lazy(() => import("./Error"));

const LandingPage = lazy(() => import("./../pages/LandingPage"));

const Signuptype = lazy(() => import("./Signuptype"));

const sessionsRoutes = [
  {
    path: "/",
    component: LandingPage,
    exact: true,
  },
  // {
  //   path: "/session/signup",
  //   component: Signup
  // },
  {
    path: "/session/signup-client",
    component: Signup,
    exact: true,
  },
  {
    path: "/session/signup-consultant",
    component: Signup,
    exact: true,
  },
  {
    path: "/signup/type",
    component: Signuptype,
    exact: true
  },
  {
    path: "/session/signin",
    component: Signin
  },
  {
    path: "/session/forgot-password",
    component: ForgotPassword
  },
  {
    path: "/session/404",
    component: Error404
  }
];

export default sessionsRoutes;
