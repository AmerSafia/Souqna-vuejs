<template>
  <main>
    <div class="container-fluid middle_page">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <div class="a-section">
            <div class="a-spacing-top-medium "></div>
            <h2 class="text-center">Profile Page</h2>
            <form>
              <!--  name -->

              <a href="#" class="btn btn-dark" @click="onLogout">Logout</a>
              <div class="a-spacing-top-medium">
                <label>Name</label>
                <input
                  type="text"
                  class="w-100 a-input-text"
                  v-model="name"
                  :placeholder="$auth.$state.user.name"
                />
              </div>

              <!--  Email -->
              <div class="a-spacing-top-medium">
                <label>Email</label>

                <input
                  type="email"
                  class="w-100 a-input-text"
                  v-model="email"
                  :placeholder="$auth.$state.user.email"
                />
              </div>
              <!--  password -->
              <div class="a-spacing-top-medium">
                <label>Password</label>
                <input
                  type="password"
                  class="w-100 a-input-text"
                  v-model="password"
                />
              </div>
              <hr />
              <!-- button -->
              <div class="a-spacing-top-large">
                <span class="a-button-register">
                  <span class="a-button-inner">
                    <span class="a-button-text" @click="onUpdateProfile">
                      Update Profile</span
                    >
                  </span>
                </span>
              </div>
            </form>
            <br />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  middleware: "redirect_middleware",
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    async onUpdateProfile() {
      let data = {
        name: this.name,
        email: this.email,
        password: this.password
      };

      try {
        let response = await this.$axios.$put("api/auth/user", data);

        if (response.success) {
          this.name = "";
          this.email = "";
          this.password = "";

          // change localy page
          await this.$auth.fetchUser();
        }
      } catch (err) {
        console.log(err);
      }
    },
    async onLogout() {
      await this.$auth.logout();
    }
  }
};
</script>

<style></style>
