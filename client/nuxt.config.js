const URL = "http://localhost:3000";

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "client",
    script: [{ src: "https://js.stripe.com/v3" }],
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "stylesheet", href: "/css/font-awesome/css/all.css" },
      { rel: "stylesheet", href: "/css/default.css" },
      {
        rel: "stylesheet",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: "~/plugins/localStorage.js", ssr: false },
    "~/plugins/vue-placeholders.js",
    "~/plugins/vue-observe-visibility.client.js"
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    // https://go.nuxtjs.dev/auth
    "@nuxtjs/auth"
  ],
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    proxy: true,
    baseURL: URL
  },
  proxy: {
    "/api": URL
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    exted(config, ctx) {}
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            propertyName: "token"
          },
          logout: true
        }
      }
    }
  },
  loadingIndicator: {
    name: "wandering-cubes",
    color: "#red ",
    background: "black"
  }
};
