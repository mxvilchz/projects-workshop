import { lazy } from "react";

const PricingTable = lazy(() => import("./PricingTable"));

const SearchResults = lazy(() => import("./SearchResults"));

const UserProfile = lazy(() => import("./UserProfile"));

const BlankPage = lazy(() => import("./BlankPage"));

const FAQ = lazy(() => import("./FAQ"));

const ClientHome = lazy(() => import("./ClientHome"));

const ConsultantHome = lazy(() => import("./ConsultantHome"));

const Specialties = lazy(() => import("./Specialties"));

const pagesRoutes = [
  {
    path: "/client/home",
    component: ClientHome
  },
  {
    path: "/consultant/home",
    component: ConsultantHome
  },
  {
    path: "/specialties",
    component: Specialties
  },
  // {
  //   path: "/pages/pricing-table",
  //   component: PricingTable
  // },
  {
    path: "/princing",
    component: PricingTable
  },
  {
    path: "/pages/search-results",
    component: SearchResults
  },
  {
    path: "/pages/user-profile",
    component: UserProfile
  },
  {
    path: "/pages/faq",
    component: FAQ
  },
  {
    path: "/pages/blank-page",
    component: BlankPage
  }
];

export default pagesRoutes;
