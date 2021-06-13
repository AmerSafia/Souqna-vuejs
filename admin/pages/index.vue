<template>
  <main class="middle_page">
    <div class="a-spacing-large"></div>

    <div class="container-fluid browsing-history  ">
      <div class="row ">
        <div
          v-for="(product, index) in products"
          :key="product._id"
          class="col-xl-2 col-lg-2 col-md-3 col-sm-6 col-6 br bb fixed_button "
        >
          <div class="history-box">
            <div>
              <nuxt-link :to="`/products/${product._id}`" class="a-link-normal">
                <img :src="product.photo" class="img-fluid max-height" />
              </nuxt-link>
              <!-- product title -->
              <div class="a-spacing-top-base asin-title">
                <span class="a-text-normal">
                  <div class="pl3n-sc-truncated">{{ product.title }}</div>
                </span>
              </div>
              <!-- product rating -->
              <div class="a-row">
                <!-- Rating -->
                <client-only>
                  <star-rating
                    :rating="product.averageRating"
                    :show-rating="false"
                    :glow="1"
                    :border-width="1"
                    :rounded-corners="true"
                    :read-only="true"
                    :star-size="15"
                  >
                  </star-rating>
                </client-only>
                <span class="a-color-tertiary a-size-small asin-reviews">
                  Number reviews : ( {{ product.reviews.length }} )
                </span>
              </div>
              <!-- product price -->
              <div class="a-row ">
                <span class="a-size-base a-color-price">
                  <span class="pl3n-sc-price"> ${{ product.price }}</span>
                </span>
              </div>
            </div>
            <div class="a-row">
              <nuxt-link
                :to="`/products/${product._id}`"
                class="a-button-history margin-right-10"
              >
                Update
              </nuxt-link>
              <a
                href=""
                @click="deleteProduct(product._id, index)"
                class="a-button-history margin-right-10"
              >
                Delete
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import StarRating from "vue-star-rating";

export default {
  components: {
    StarRating
  },
  //asyncData is fetching data before nuxt page finished laoding on the browser
  //and its good for SEO because data is loaded first
  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get("http://Localhost:3000/api/products");
      return {
        products: response.products
      };
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    async deleteProduct(id, index) {
      try {
        let response = await this.$axios.$delete(
          `http://Localhost:3000/api/products/${id}`
        );
        if (response.status) {
          this.products, splice(index, 1);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style>
.max-height {
  height: 170px;
}
.middle_page {
  min-height: 877px;
}

.button_in_bottom {
  position: absolute;
  bottom: 0px;
}
.fixed_button {
  position: relative;
}
</style>
