import Vue from "vue";
import VueRouter from "vue-router";
import SignIn from "@/views/SignIn";
import Register from "@/views/Register";
import Results from "@/views/Results";
import Landing from "@/views/Landing";
import Trip from "@/views/Trip";
import Account from "@/views/Account";
import Showcase from "@/kit/Showcase";
import Components from "@/kit/Components";
import HowItWorks from "@/views/HowItWorks";
import FlyLine101 from "@/views/FlyLine101";
import ConfirmBooking from "@/views/ConfirmBooking";

import store from "../store";
import Pricing from "@/views/Pricing";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Landing
  },
  {
    path: "/pricing",
    name: "Pricing",
    component: Pricing
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/trip",
    name: "Trip",
    component: Trip
  },
  {
    path: "/components",
    name: "Components",
    component: Components
  },
  {
    path: "/kit",
    name: "UI Kit",
    component: Showcase
  },
  {
    path: "/results",
    name: "Results",
    component: Results
  },
  {
    path: "/how-it-works",
    name: "How it works",
    component: HowItWorks
  },
  {
    path: "/account",
    name: "Account",
    component: Account
  },
  {
    path: "/confirm-booking",
    name: "ConfirmBooking",
    component: ConfirmBooking
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: SignIn
  },
  {
    path: "/flyline-101",
    name: "FlyLine101",
    component: FlyLine101
  }
];

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

router.afterEach(() => {
  const user = store.state.user.user;
  if (user.anonymous) {
    window.Intercom("update");
  } else {
    window.Intercom("update", { email: user.email });
  }
});

export default router;
