<template>
  <main>
    <div class="container-fluid middle_page">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <div class="a-section">
            <div class="a-spacing-top-medium "></div>
            <h2 class="text-center">Update {{ product.title }}</h2>
            <form>
              <!-- category  dropdowm-->
              <div>
                <label for="" class="">Category</label>
                <select
                  class="w-100 a-select-option"
                  name="category"
                  id="category"
                  v-model="categoryID"
                >
                  <option
                    v-for="category in categories"
                    :value="category._id"
                    :key="category._id"
                    >{{ category.type }}
                  </option>
                </select>
              </div>
              <!-- Owmer dropdowm -->

              <div>
                <label class="">Owner</label>
                <select
                  class="w-100 a-select-option"
                  name="owner"
                  id="owner"
                  v-model="ownerID"
                >
                  <option
                    v-for="owner in owners"
                    :value="owner._id"
                    :key="owner._id"
                  >
                    {{ owner.name }}
                  </option>
                </select>
              </div>

              <!-- title input -->
              <div>
                <label>Title</label>
                <input
                  type="text"
                  class="w-100 a-input-text"
                  v-model="title"
                  :placeholder="product.title"
                />
              </div>

              <!-- stockQuantity -->
              <div>
                <label>stockQuantity</label>
                <input
                  v-model="stockQuantity"
                  type="number"
                  class="w-100 a-input-text"
                  :placeholder="product.stockQuantity"
                />
              </div>

              <!-- lastPrice -->
              <div>
                <label>lastPrice</label>
                <input
                  v-model="lastPrice"
                  type="number"
                  class="w-100 a-input-text"
                  :placeholder="product.lastPrice"
                />
              </div>

              <!-- price -->
              <div>
                <label>Price</label>
                <input
                  v-model="price"
                  type="number"
                  class="w-100 a-input-text"
                  :placeholder="product.price"
                />
              </div>

              <!-- discription area -->
              <div>
                <label for="" class="">Discription</label>
                <textarea
                  class="w-100"
                  v-model="discription"
                  :placeholder="product.discription"
                ></textarea>
              </div>

              <!-- photo file -->
              <div>
                <label for="" class="">Add Photo</label>
                <div class="a-row a-spacing-top-medium">
                  <label class="choosefile-button">
                    <i class="fal fa-plus"></i>
                    <input type="file" @change="onFileSelected" />
                    <p>{{ fileName }}</p>
                  </label>
                </div>
              </div>
              <hr />
              <!-- button -->
              <div class="a-spacing-top-large">
                <span class="a-button-register">
                  <span class="a-button-inner">
                    <span class="a-button-text" @click="onUpdataProduct"
                      >Updata Product</span
                    >
                  </span>
                </span>
              </div>
              <div class="a-spacing-top-medium "></div>
            </form>
          </div>
        </div>

        <div class="col-sm-3"></div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    try {
      let categories = $axios.$get("http://localhost:3000/api/categories");
      let owners = $axios.$get("http://localhost:3000/api/owners");
      let product = $axios.$get(
        `http://localhost:3000/api/products/${params.id}`
      );

      const [catResponse, ownResponse, prodResponse] = await Promise.all([
        categories,
        owners,
        product
      ]);
      return {
        categories: catResponse.categories,
        owners: ownResponse.Owner,
        product: prodResponse.product
      };
    } catch (err) {
      console.log(err);
    }
  },
  data() {
    return {
      title: "",
      price: "",
      lastPrice: "",
      categoryID: null,
      ownerID: null,
      discription: "",
      selectedFile: null,
      fileName: "",
      stockQuantity: ""
    };
  },
  methods: {
    onFileSelected(e) {
      this.selectedFile = e.target.files[0];
      console.log(this.selectedFile);
      this.fileName = e.target.files[0].name;
    },
    async onUpdataProduct() {
      let data = new FormData();
      data.append("title", this.title);
      data.append("stockQuantity", this.stockQuantity);
      data.append("price", this.price);
      data.append("lastPrice", this.lastPrice);
      data.append("category", this.categoryID);
      data.append("owner", this.ownerID);
      data.append("discription", this.discription);
      data.append("photo", this.selectedFile, this.selectedFile.name);

      let result = await this.$axios.$put(
        `http://localhost:3000/api/products/${this.$route.params.id}`,
        data
      );
      this.$router.push("/");
    }
  }
};
</script>

<style>
label {
  margin-top: 5px;
}
</style>
