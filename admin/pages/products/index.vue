<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <div class="a-section">
            <div class="a-spacing-top-medium "></div>
            <h2 class="text-center">Add a new product</h2>
            <form>
              <!-- category  dropdowm-->
              <div>
                <label for="" class="">Category</label>
                <select
                  class="w-100 a-select-option"
                  name="category"
                  id="category"
                  v-model="category"
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
                  v-model="owner"
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
                <input type="text" class="w-100 a-input-text" v-model="title" />
              </div>

              <!-- stockQuantity -->
              <div>
                <label>stockQuantity</label>
                <input
                  v-model="stockQuantity"
                  type="number"
                  class="w-100 a-input-text"
                />
              </div>

              <!-- lastPrice -->
              <div>
                <label>lastPrice</label>
                <input
                  v-model="lastPrice"
                  type="number"
                  class="w-100 a-input-text"
                />
              </div>

              <!-- price -->
              <div>
                <label>Price</label>
                <input
                  v-model="price"
                  type="number"
                  class="w-100 a-input-text"
                />
              </div>

              <!-- discription area -->
              <div>
                <label for="" class="">Discription</label>
                <textarea
                  placeholder="write here details of your product"
                  class="w-100"
                  v-model="discription"
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
                    <span class="a-button-text" @click="onAddProduct"
                      >Add Product</span
                    >
                  </span>
                </span>
              </div>
              <div class="a-spacing-top-medium "></div>
              <div class="a-spacing-top-medium "></div>
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
  async asyncData({ $axios }) {
    try {
      let categories = $axios.$get("http://localhost:3000/api/categories");
      let owners = $axios.$get("http://localhost:3000/api/owners");

      const [catResponse, ownResponse] = await Promise.all([
        categories,
        owners
      ]);
      return {
        categories: catResponse.categories,
        owners: ownResponse.Owner
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
      category: null,
      owner: null,
      discription: "",
      selectedFile: null,
      fileName: "",
      stockQuantity: 1
    };
  },
  methods: {
    onFileSelected(e) {
      this.selectedFile = e.target.files[0];
      this.fileName = e.target.files[0].name;
    },
    async onAddProduct() {
      let data = new FormData();
      data.append("title", this.title);
      data.append("stockQuantity", this.stockQuantity);
      data.append("lastPrice", this.lastPrice);
      data.append("price", this.price);

      data.append("category", this.category);
      data.append("owner", this.owner);
      data.append("discription", this.discription);
      data.append("photo", this.selectedFile, this.selectedFile.name);

      let result = await this.$axios.$post(
        "http://localhost:3000/api/products",
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
