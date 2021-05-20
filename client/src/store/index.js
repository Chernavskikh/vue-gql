import Vue from 'vue'
import Vuex from 'vuex'

import { defaultClient as apolloClient} from '@/main';
import { GET_POSTS, SIGNIN_USER, GET_CURRENT_USER } from '@/queries';
import router from '@/router';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    loading: false,
    user: null,
  },
  mutations: {
    setPosts: (state, payload) => {
      state.posts = payload;
    },
    setLoading: (state, payload) => {
      state.loading = payload;
    },
    setUser: (state, payload) => {
      state.user = payload;
    },
    clearUser: (state) => {
      state.user = null;
    }
  },
  actions: {
    getCurrentUser: ({ commit }) => {
      apolloClient.query({
        query: GET_CURRENT_USER,
      })
        .then((res)=> {
          commit('setLoading', true);
          commit('setUser', res.data.getCurrentUser);
        })
        .catch(err => {
          console.error(err)
        })
        .finally(() => {
          commit('setLoading', false);
        })
    },
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
            localStorage.setItem('token', data.signinUser.token);
            router.go();
          })
          .catch(err => {
            console.error(err)
          })
          .finally(() => {
            commit('setLoading', false);
          })
    },
    signoutUser: ({ commit}) => {
      commit('clearUser')
      localStorage.removeItem('token', '')
      apolloClient.resetStore()
      router.go('/')
    },
  },
  getters: {
    posts: state => state.posts,
    loading: state => state.loading,
    user: state => state.user
  }
});
