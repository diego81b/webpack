import Vue from 'vue';
import Vuex from "vuex";
import axios from "@/axios";
import authorization from '@/auth';

Vue.use(Vuex);

const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";
const LOADING = "LOADING";

const store = new Vuex.Store({
  state: {
    isAuth: authorization.isAuthorized(),
    isLoading: false
  },
  mutations: {
    [LOGIN_SUCCESS](state) {
      state.isAuth = authorization.isAuthorized();
    },
    [LOGOUT](state) {
      state.isAuth = authorization.isAuthorized();
    },
    [LOADING](state, value) {
      state.isLoading = value;
    }
  },
  actions: {
    login({ commit }) {
      commit(LOGIN_SUCCESS);
    },
    logout({ commit }) {
      commit(LOGOUT);
    }
  },
  getters: {
    isAuth: state => state.isAuth,
    isLoading: state => state.isLoading
  }
});

axios.interceptors.request.use(
  conf => {
    store.commit("LOADING", true);
    return conf;
  },
  error => {
    store.commit("LOADING", false);
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  response => {
    store.commit("LOADING", false);
    return response;
  },
  error => {
    store.commit("LOADING", false);
    return Promise.reject(error);
  }
);

export default store;
