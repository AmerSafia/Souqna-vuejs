<template>
  <div>
    <header class="nav-opt-sprite nav-locate-us nav-lang-en nav-ssl nav-unrec">
      <div class="container-fluid dekstop-nav">
        <div class="row">
          <!-- LOGO -->
          <div class="col-sm-2 width-mobile">
            <div class="logo-area">
              <nuxt-link to="/">
                <img src="/img/souqnalogo1.png" alt="logo" class="img-fluid" />
              </nuxt-link>
            </div>
          </div>
          <!-- search bar -->
          <div class="col-sm-6 pt-0"><Search /></div>
        </div>
        <!-- delivery -->
        <div class="row">
          <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 mt-2">
            <div class="nav-globel-location">
              <nuxt-link to="/address" class="nav-a nav-a-2">
                <div class="nav-sprite" id="nav-packard-glow-loc-icon"></div>

                <div id="glow-ingress-block">
                  <span class="nav-line-1" id="glow-ingress-line1">
                    <i class="fas fa-map-marker-alt"></i>
                    deliver to
                  </span>
                  <template v-if="$auth.$state.user">
                    <template v-if="$auth.$state.user.address !== undefined">
                      <span class="nav-line-2" id="glow-ingress-line2">
                        {{ $auth.$state.user.address.city }}
                      </span>
                    </template>
                    <template v-else>
                      <span class="nav-line-2" id="glow-ingress-line2">
                        Address
                      </span>
                    </template>
                  </template>
                  <template v-else>
                    <span class="nav-line-2" id="glow-ingress-line2">
                      Address
                    </span>
                  </template>
                </div>
              </nuxt-link>
            </div>
          </div>
          <!-- shopping -->
          <div class="col-xl-6 col-lg-5 col-md-4 col-sm-6 pl-0">
            <div class="nav-fill">
              <div class="nav-shop">
                <nuxt-link
                  to="/history"
                  class="nav-a nav-a-2 nav-single-row-link"
                  git
                >
                  <span class="nav-line-2">
                    Browsing History
                    <span class="nav-icon nav-arrow icon-arrow"> </span>
                  </span>
                </nuxt-link>
              </div>

              <div class="nav-xshop-container">
                <div class="nav-xshop">
                  <a href="" class="nav-a">Today deals</a>
                  <a href="" class="nav-a">Your Souqna.com</a>
                  <a href="" class="nav-a">Gift cards</a>
                  <a href="" class="nav-a">Register</a>
                  <a href="" class="nav-a">Sell</a>
                </div>
              </div>
            </div>
          </div>
          <!-- Accounts and order -->
          <div class="col-xl-4 col-lg-5 col-md-6 col-sm-4 pl-0">
            <div class="nav-tools">
              <a
                href=""
                id="icp-nav-flyout"
                class="nav-a nav-a-2 icp-link-style-2"
              >
                <span class="icp-nav-link-inner">
                  <span class="nav-line-1">
                    <span class="icp-nav-globe-img-2"></span>
                    <span class="icp-nav-language">EN</span>
                  </span>

                  <span class="nav-line-2">
                    <span class="nav-icon nav-arrow icon-arrow"></span>
                  </span>
                </span>
              </a>
              <span class="icp-nav-link-border"></span>
              <template v-if="$auth.$state.loggedIn">
                <nuxt-link
                  to="/profile"
                  class="nav-a nav-a-2"
                  id="nav-link-accountList"
                  tabindex="0"
                >
                  <span class="nav-line-1">Hello </span>
                  <span class="nav-line-2">
                    {{ $auth.$state.user.name }}
                  </span>
                </nuxt-link>
              </template>
              <template v-else>
                <nuxt-link
                  to="/signup"
                  class="nav-a nav-a-2"
                  id="nav-link-accountList"
                  tabindex="0"
                >
                  <span class="nav-line-1">Hello Sign in</span>
                  <span class="nav-line-2">
                    Account &amp; Lints
                    <span class="nav-icon nav-arrow icon-arrow"></span>
                  </span>
                </nuxt-link>
              </template>

              <nuxt-link to="/orders" class="nav-a nav-a-2 nav-single-row-link">
                <span class="nav-line-1"></span>
                <span class="nav-line-2">Orders</span>
              </nuxt-link>

              <nuxt-link to="/cart" class="nav-a nav-a-2" id="nav-cart">
                <span aria-hidden="true" class="nav-line-1"></span>
                <span aria-hidden="true" class="nav-line-2">Cart</span>
                <span class="nav-cart-icon nav-sprite"></span>
                <span
                  id="nav-cart-count"
                  aria-hidden="true"
                  class="nav-cart-count nav-cart-0"
                  >{{ getCartLength }}</span
                >
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Search from "~/components/Search";
import Logo from "~/components/Logo";

export default {
  components: {
    Search,
    Logo
  },
  computed: {
    ...mapGetters(["getCartLength"])
  }
};
</script>

<style>

</style>
