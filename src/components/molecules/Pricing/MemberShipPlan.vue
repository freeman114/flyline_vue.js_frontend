<template>
  <div
    v-if="plans"
    v-bind:class="[
      'membership-card-wrapper',
      `membership-card-wrapper--${type}`
    ]"
  >
    <div class="membership-card__title" v-if="type === 'premium'">
      Most Popular
    </div>
    <div class="membership-card">
      <div class="membership-card-trial-text">
        14 Day Free Trial
      </div>
      <div class="membership-card-type-text">FlyLine {{ plan.name }}</div>
      <diV class="membership-card-cost-text">
        <span class="price">${{ plan.price.value }}/yr</span>
        <span class="user">
          {{ type === "basic" ? "One User" : "Multiple Users" }}
        </span>
      </diV>
      <hr />
      <div class="membership-card-benefits">
        <div
          class="membership-card-benefit"
          v-for="benefit in benefits"
          :key="benefit"
        >
          <span>
            <img alt="basic check" :src="checkImage" />
          </span>
          <span>{{ benefit }}</span>
        </div>
      </div>
      <Button
        :class="{
          btn: true,
          'btn--primary': type === 'basic',
          'btn--secondary': type === 'premium'
        }"
      >
        Start 14 Day Free Trial
      </Button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Button from "@/components/atoms/Button";
import Vuex from "vuex";
Vue.use(Button);

const benefits = [
  "Flight Search and Book",
  "FlyLine Meta Search",
  "Automatic check in"
];

export default {
  name: "MemberShipPlan",
  props: {
    type: {
      type: String
    }
  },
  computed: {
    ...Vuex.mapState("plans", ["plans"]),
    checkImage() {
      return this.type === "basic"
        ? require("@/assets/images/basic_check.svg")
        : require("@/assets/images/popular_check.svg");
    },
    plan() {
      return this.plans[this.type];
    },
    benefits() {
      const bookingLimit = this.plan.limit;
      const bookings = bookingLimit
        ? `Max of ${bookingLimit} bookings`
        : `Unlimited bookings`;
      const dealAlerts = this.plan.deal_alerts ? ["Deal alerts"] : [];
      return [...benefits, bookings, ...dealAlerts];
    }
  }
};
</script>

<style lang="scss">
.membership-card-wrapper {
  border-radius: 20px;
}

.membership-card {
  width: 408px;
  border-radius: 20px;
  box-shadow: 10px 20px 38px 0 rgba(111, 130, 167, 0.2);
  background-color: #ffffff;
  margin: 30px 20px;
  padding: 40px;
  font-family: Gilroy-Regular;
  text-align: left;
  .membership-card-trial-text {
    height: 36px;
    width: 147px;
    border-radius: 18px;
    background-color: #cceffc;
    font-size: 14px;
    font-family: gilroy-medium;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.21;
    letter-spacing: normal;
    text-align: center;
    color: #00aeef;
    padding: 10px 20px;
    margin-bottom: 20px;
  }
  .membership-card-type-text {
    width: auto;
    height: 29px;
    font-size: 24px;
    font-family: gilroy-bold;
    line-height: 1.21;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
    margin-bottom: 24px;
  }
  .membership-card-cost-text {
    display: flex;
    span {
      width: auto;
      height: 22px;
      font-size: 18px;
      font-family: gilroy-medium;
      line-height: 1.22;
      letter-spacing: normal;
      color: #7b7b7b;
    }
    .price {
      color: #333333;
      font-family: gilroy-bold;
      margin-right: 6px;
    }
  }
  hr {
    margin: 28px 0px;
    background-color: #d8d8d8;
  }
  .btn {
    font-size: 14px;
    font-family: gilroy-bold;
    height: 48px;
    width: 100%;
  }
  .membership-card-benefits {
    margin-bottom: 20px;
    .membership-card-benefit {
      width: auto;
      font-size: 16px;
      line-height: 3;
      letter-spacing: normal;
      text-align: left;
      color: #7b7b7b;
      img {
        width: 20px;
        margin-right: 14.5px;
      }
    }
  }
}

.membership-card-wrapper--premium {
  background-color: #0e3178;
  margin: 0 20px;
  .membership-card__title {
    height: 19px;
    font-family: Gilroy-Bold;
    font-size: 16px;
    line-height: 1.19;
    letter-spacing: 3.2px;
    color: #ffffff;
    margin: 20px 0;
    text-transform: uppercase;
    text-align: center;
  }
  .membership-card {
    margin: 20px 2px 2px;
    .membership-card-trial-text {
      background-color: #e6eaf1;
      color: #0e3178;
    }
  }
}
</style>
