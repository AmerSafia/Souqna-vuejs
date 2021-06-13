<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#"> Dashboard</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <nuxt-link to="/">Home</nuxt-link>
          </b-nav-item>

          <b-nav-item>
            <nuxt-link to="/products">New Product</nuxt-link>
          </b-nav-item>

          <b-nav-item>
            <nuxt-link to="/category">New Category</nuxt-link>
          </b-nav-item>
          <b-nav-item>
            <nuxt-link to="/owner">New Owner</nuxt-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
      </b-collapse>
    </b-navbar>
  </div>
</template>
<style>
.navbar-brand {
  margin-left: 10px;
}
a {
  text-decoration: none;
  color: #727272;
  font-weight: bold;
}
a:hover {
  color: rgba(255, 255, 255, 0.55);
}
</style>
