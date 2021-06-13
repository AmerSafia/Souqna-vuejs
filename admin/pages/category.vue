<template>
  <main>
    <div class="container-fluid middle_page">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <div class="a-section">
            <div class="a-spacing-top-medium "></div>
            <h2 class="text-center">Add a New Category</h2>
            <form action="">
              <!-- title input -->
              <div>
                <label>type</label>
                <input type="text" class="w-100 a-input-text" v-model="type" />
              </div>

              <hr />
              <!-- button -->
              <div class="a-spacing-top-large">
                <span class="a-button-register">
                  <span class="a-button-inner">
                    <span class="a-button-text" @click="onAddCategory">
                      Add Category</span
                    >
                  </span>
                </span>
              </div>
            </form>
            <br />
            <ul>
              <li
                class="list-group-item"
                v-for="category in categories"
                :key="category._id"
              >
                {{ category.type }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get("http://localhost:3000/api/categories");
      return {
        categories: response.categories
      };
    } catch (err) {
      console.log(err);
    }
  },
  data() {
    return {
      type: ""
    };
  },
  methods: {
    async onAddCategory() {
      try {
        let data = { type: this.type };
        let result = await this.$axios.$post(
          "http://localhost:3000/api/categories",
          data
        );
        this.categories.push(data);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style></style>
