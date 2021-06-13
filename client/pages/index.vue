<template>
  <main class="listingPage">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-2 col-lg-3 md-4 col-sm-4">
          <!-- sidebar -->
        </div>
        <!-- Main Content -->
        <div class="col-xl-10 col-lg-9 md-8 col-sm-8">
          <div class="s-result-list"></div>
          <div v-if="loading" class="loading-page">
            <div class="sk-cube-grid">
              <div class="sk-cube sk-cube1"></div>
              <div class="sk-cube sk-cube2"></div>
              <div class="sk-cube sk-cube3"></div>
              <div class="sk-cube sk-cube4"></div>
              <div class="sk-cube sk-cube5"></div>
              <div class="sk-cube sk-cube6"></div>
              <div class="sk-cube sk-cube7"></div>
              <div class="sk-cube sk-cube8"></div>
              <div class="sk-cube sk-cube9"></div>
            </div>
          </div>
          <div class="mainResults">
            <ul class="s-result-list">
              <li
                class="s-result-item celwidget"
                v-for="product in products"
                :key="product._id"
              >
                <div class="s-item-container">
                  <!-- Best seller -->
                  <div class="a-spacing-micro">
                    <div class="bestSeller">
                      <a href=""> Best Seller</a>
                    </div>
                  </div>

                  <div class="row">
                    <!-- image -->
                    <div class="col-sm-3 text-center">
                      <nuxt-link :to="`/products/${product._id}`">
                        <img
                          alt=""
                          :src="product.photo"
                          class="img-fluid width150"
                        />
                      </nuxt-link>
                    </div>

                    <div class="col-sm-9">
                      <div class="a-row a-spacing-small">
                        <!-- Title and Date -->
                        <nuxt-link
                          :to="`/products/${product._id}`"
                          class="a-link-normal"
                        >
                          <h2 class="a-size-medium">
                            {{ product.title }}
                            <span class="a-letter-space"></span>
                            <span class="a-letter-space"></span>
                          </h2>
                          <span class="a-size-small a-color-secondary">
                            {{ handleDate(product.date) }}
                          </span>
                        </nuxt-link>
                      </div>

                      <!-- Authors name -->
                      <div class="a-row a-spacing">
                        <span class="a-size-small a-color-secondary">by</span>
                        <span class="a-size-small a-color-secondary">
                          <a href="" class="a-link-normal a-text-normal">
                            {{ product.owner.name }}
                          </a>
                        </span>
                      </div>

                      <!-- shipment -->
                      <div class="a-row">
                        <template v-if="$auth.$state.user">
                          <template
                            v-if="$auth.$state.user.address !== undefined"
                          >
                            <span class="nav-line-2" id="glow-ingress-line2">
                              ship to {{ $auth.$state.user.address.city }}
                            </span>
                          </template>
                          <template v-else>
                            <span class="nav-line-2" id="glow-ingress-line2">
                              ship to Address
                            </span>
                          </template>
                        </template>
                        <template v-else>
                          <span class="nav-line-2" id="glow-ingress-line2">
                            ship to Address
                          </span>
                        </template>
                      </div>

                      <div class="row">
                        <div class="col-sm-7">
                          <div class="a-row a-spacing-none">
                            Category :
                            <a href="" class="a-link-normal a-text-normal">
                              {{ product.category.type }}
                            </a>
                          </div>

                          <!-- Price -->
                          <div class="a-row a-spacing-none">
                            <a href="" class="a-link-normal a-text-normal">
                              <span class="a-offscreen">
                                ${{ product.price }}
                              </span>
                              <span class="a-color-base sx-zero-spacing">
                                <span class="a-color-base sx-price-large">
                                  <sup class="sx-price-currency">$</sup>
                                  <span class="sx-price-whole">
                                    {{ product.price }}
                                  </span>
                                  <sup class="sx-price-farctional">00</sup>
                                </span>
                              </span>
                            </a>

                            <span class="a-letter-space"></span>
                            <span
                              class="a-size-base-plus a-color-secondary a-text-strike"
                              >${{ product.lastPrice }}</span
                            >
                          </div>
                        </div>

                        <!-- Rating -->
                        <div class="col-sm-5">
                          <div class="a-row a-spacing-top-mini">
                            <!-- Start Ratings -->
                            <client-only>
                              <star-rating
                                :rating="product.averageRating"
                                :show-rating="false"
                                :glow="1"
                                :border-width="1"
                                :rounded-corners="true"
                                :read-only="true"
                                :star-size="18"
                                :star-points="[
                                  23,
                                  2,
                                  14,
                                  17,
                                  0,
                                  19,
                                  10,
                                  34,
                                  7,
                                  50,
                                  23,
                                  43,
                                  38,
                                  34,
                                  46,
                                  19,
                                  31,
                                  17
                                ]"
                              >
                              </star-rating>
                            </client-only>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div v-observe-visibility="handleScrollToBottom"></div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import FeaturedProduct from "~/components/FeaturedProduct";
import StarRating from "vue-star-rating";
import { ObserveVisibility } from "vue-observe-visibility";

export default {
  components: {
    FeaturedProduct,
    StarRating,
    ObserveVisibility
  },
  data() {
    return { page: 0, products: [], loading: true };
  },
  methods: {
    handleDate(date) {
      const mydate = new Date(date);
      return mydate.toDateString();
    },
    async fetch() {
      try {
        let response = await this.$axios.$get(
          `/api/products?count=5&page=${this.page}`
        );
        this.products.push(...response.products);
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    handleScrollToBottom(isVisible) {
      if (!isVisible) return;

      this.page++;
      this.fetch();
    },
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    }
  }
};
</script>

<style>
.width150 {
  width: 150px;
}
.listingPage {
  min-height: 900px;
}

.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
}
.sk-cube-grid {
  width: 40px;
  height: 40px;
  margin: 100px auto;
}

.sk-cube-grid .sk-cube {
  width: 33%;
  height: 33%;
  background-color: #333;
  float: left;
  -webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
  animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
}
.sk-cube-grid .sk-cube1 {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}
.sk-cube-grid .sk-cube2 {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}
.sk-cube-grid .sk-cube3 {
  -webkit-animation-delay: 0.4s;
  animation-delay: 0.4s;
}
.sk-cube-grid .sk-cube4 {
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
}
.sk-cube-grid .sk-cube5 {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}
.sk-cube-grid .sk-cube6 {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}
.sk-cube-grid .sk-cube7 {
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
}
.sk-cube-grid .sk-cube8 {
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
}
.sk-cube-grid .sk-cube9 {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}

@-webkit-keyframes sk-cubeGridScaleDelay {
  0%,
  70%,
  100% {
    -webkit-transform: scale3D(1, 1, 1);
    transform: scale3D(1, 1, 1);
  }
  35% {
    -webkit-transform: scale3D(0, 0, 1);
    transform: scale3D(0, 0, 1);
  }
}

@keyframes sk-cubeGridScaleDelay {
  0%,
  70%,
  100% {
    -webkit-transform: scale3D(1, 1, 1);
    transform: scale3D(1, 1, 1);
  }
  35% {
    -webkit-transform: scale3D(0, 0, 1);
    transform: scale3D(0, 0, 1);
  }
}
</style>
