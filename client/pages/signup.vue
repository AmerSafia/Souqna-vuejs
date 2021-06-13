<template>
  <div class="registerPage">
    <div class="container">
      <div class="row">
        <div class="col-sm-4"></div>
        <div class="col-lg-4 col-md-6 col-sm-8">
          <div class="text-center">
            <nuxt-link to="/">
              <img src="img/souqnalogo1.png" alt="" />
            </nuxt-link>
          </div>
          <div class="mt-4">
            <div class="a-box a-spacing-extra-large">
              <div class="a-box-inner">
                <h1 class="a-spacing-small">Create account</h1>

                <!-- Your name -->
                <div class="a-row a-spacing-base">
                  <label for="ap_customer_name" class="a-form-label">
                    Your name
                  </label>
                  <input
                    type="text"
                    id="ap_customer_name"
                    class="a-input-text form-control auth-autofocus auth-required-feiled auth-contant-verification-request-info"
                    v-model="name"
                  />
                </div>

                <!-- email -->
                <div class="a-row a-spacing-base">
                  <label for="ap_customer_name" class="a-form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="ap_customer_name"
                    class="a-input-text form-control auth-autofocus auth-required-feiled auth-contant-verification-request-info"
                    v-model="email"
                  />
                </div>

                <!-- password -->
                <div class="a-row a-spacing-base">
                  <label for="ap_customer_name" class="a-form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="ap_customer_name"
                    class="a-input-text form-control auth-autofocus auth-required-feiled auth-contant-verification-request-info"
                    v-model="password"
                  />

                  <div class="a-alert-container">
                    <div class="a-alert-content error">
                      {{ message }}
                    </div>
                  </div>

                  <!-- button -->
                  <div class="a-row a-spacing-extra-large mb-4">
                    <span class="a-button-primary">
                      <span class="a-button-inner">
                        <span class="a-button-text" @click="OnSignup"
                          >Create Your Souqna account</span
                        >
                      </span>
                    </span>
                    <div class="a-row a-spacing-top-medium  a-size-small">
                      <b>
                        By creating an account, you agree to Souqna
                        <a href="">condtion of Use </a> and
                        <a href="">Privacy Notice</a>
                      </b>
                    </div>
                  </div>
                  <hr />
                  <div class="a-row">
                    <b>
                      Already have an account
                      <nuxt-link to="/login" class="a-link-emphasis"
                        >Sign in
                      </nuxt-link>
                      <!-- <nuxt-link to="/login"></nuxt-link>  -->
                    </b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "none",
  middleware: "auth",
  auth: "guest",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      message: ""
    };
  },
  methods: {
    async OnSignup() {
      try {
        let data = {
          name: this.name,
          email: this.email,
          password: this.password
        };
        let response = await this.$axios.$post("/api/auth/signup", data);
        if (response.success) {
          this.$auth.loginWith("local", {
            data: {
              email: this.email,
              password: this.password
            }
          });
          this.$router.push("/");
        } else {
          this.message = response.message;
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style></style>
