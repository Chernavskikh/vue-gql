import Vue from 'vue'
import Vuex from 'vuex'

import { defaultClient as apolloClient} from '@/main';
import { GET_POSTS, SIGNIN_USER } from '@/queries';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    loading: false,
  },
  mutations: {
    setPosts: (state, payload) => {
      state.posts = payload;
    },
    setLoading: (state, payload) => {
      state.loading = payload;
    },
  },
  actions: {
    getPosts: ({ commit }) => {
      commit('setLoading', true);
      //use ApolloClient to fire get posts query
      apolloClient
        .query({
            query: GET_POSTS,
          }).then(({ data }) => {
            commit('setPosts', data.getPosts);
            console.log(data.getPosts)
          })
          .catch(err => {
            console.error(err)
          })
          .finally(() => {
            commit('setLoading', false);
          })
    },
    signinUser: ({ commit }, payload) => {
      commit('setLoading', true);
      apolloClient
          .mutate({
            mutation: SIGNIN_USER,
            variables: payload
          })
          .then(({ data }) => {
            console.log(data.signinUser);
            localStorage.setItem('token', data.signinUser.token);
          })
          .catch(err => {
            console.error(err)
          })
          .finally(() => {
            commit('setLoading', false);
          })
    },
  },
  getters: {
    posts: state => state.posts,
    loading: state => state.loading,
  }
});
