import Vue from 'vue'
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false;

Vue.use(VueApollo);

export const defaultClient = new ApolloClient({
  // You should use an absolute URL here
  uri: 'http://localhost:4000/graphql',
  // include auth token with requests made to backend
  fetchOptions: {
    credentials: 'include'
  },
  request: operation => {
    if (!localStorage.token) {
      localStorage.setItem('token', '');
    }

    operation.setContext({
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
  },
  onError: ({ graphQlErrors, networkError}) => {
    if (networkError) {
      console.log('[networkError]', networkError);
    }

    if (graphQlErrors) {
      for (let err of graphQlErrors) {
        console.dir(err);
      }
    }
  }
});

const apolloProvider = new VueApollo({defaultClient});

new Vue({
  provide: apolloProvider.provide(),
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    // execute getCurrentUser query
    this.$store.dispatch('getCurrentUser');
  }
}).$mount('#app')
