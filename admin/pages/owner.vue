<template>
  <main>
    <div class="container-fluid middle_page">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <div class="a-section">
            <div class="a-spacing-top-medium "></div>
            <h2 class="text-center">Add a New Owner</h2>
            <form>
              <!-- Name input -->
              <div>
                <label>Name</label>
                <input type="text" class="w-100 a-input-text" v-model="name" />
              </div>

              <!-- About input -->
              <div>
                <label>About</label>
                <input type="text" class="w-100 a-input-text" v-model="about" />
              </div>

              <!-- add photo file -->
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
                    <span class="a-button-text" @click="onAddOwner">
                      Add Owner</span
                    >
                  </span>
                </span>
              </div>
            </form>
            <br />
            <ul>
              <li
                class="list-group-item"
                v-for="owner in owners"
                :key="owner._id"
              >
                {{ owner.name }}
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
      let response = await $axios.$get("http://localhost:3000/api/owners");
      return {
        owners: response.Owner
      };
    } catch (err) {
      console.log(err);
    }
  },
  data() {
    return {
      name: "",
      about: "",
      selectedFile: null,
      fileName: ""
    };
  },
  methods: {
    onFileSelected(e) {
      this.selectedFile = e.target.files[0];
      this.fileName = e.target.files[0].name;
    },
    async onAddOwner() {
      let data = new FormData();
      data.append("name", this.name);
      data.append("about", this.about);
      data.append("photo", this.selectedFile, this.selectedFile.name);
      let result = await this.$axios.$post(
        "http://localhost:3000/api/owners",
        data
      );
      this.owners.push({ name: this.name });
    }
    // async onAddOwner() {
    //   try {
    //     let data = { name: this.name };
    //     let result = await this.$axios.$post(
    //       "http://localhost:3000/api/owners",
    //       data
    //     );
    //     this.owners.push(data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
  }
};
</script>

<style></style>
