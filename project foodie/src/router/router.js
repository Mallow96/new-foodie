import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import Test from "../pages/home.vue";
import Account from "../pages/account.vue";
import RestaurantList from "../pages/fake_list.vue";
import RestaurantPage from "../pages/restaurant_page.vue";
import AccountSetting from "../pages/account_setting.vue";
import ReservationHistory from "../pages/reservation_history.vue";
import SearchResult from "../pages/search_result.vue";
import PageUnfinish from "../pages/page_unfinish.vue";
import Map from "../pages/search_map.vue";

const routes = [
  {
    path: "/",
    name: "test",
    component: Test,
    meta: { hideHeader: false, hideFooter: false },
  },
  {
    path: "/myaccount",
    name: "account",
    component: Account,
    meta: { hideHeader: false, hideFooter: false },
  },
  {
    path: "/fakelist",
    name: "fakelist",
    component: RestaurantList,
    meta: { hideHeader: false, hideFooter: false },
  },
  {
    path: "/restaurant/:id",
    component: RestaurantPage,
    props: true,
    meta: { hideHeader: false, hideFooter: false },
  }, // 動態路由
  {
    path: "/account-setting",
    name: "accountSetting",
    component: AccountSetting,
    meta: { hideHeader: false, hideFooter: false },
  },
  {
    path: "/reservation-history",
    name: "reservationHistory",
    component: ReservationHistory,
    meta: { hideHeader: false, hideFooter: false },
  },
  {
    path: "/search-result",
    name: "searchResult",
    component: SearchResult,
    meta: { hideHeader: false, hideFooter: false },
  },
  {
    path: "/this-page-is-developing",
    name: "developing",
    component: PageUnfinish,
    meta: { hideHeader: false, hideFooter: false },
  },
  {
    path: "/map",
    name: "map",
    component: Map,
    meta: { hideHeader: true, hideFooter: true },
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // 瀏覽器前進/後退，回復到上次的滾動位置
      return savedPosition;
    } else {
      // 否則回到頁面頂部
      return { top: 0 };
    }
  },
});

export default router;
