import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isDeveloper: false,
    loggedUserId: 1,

    users: undefined,
    tweets: undefined,
    replies: undefined,
  },
  getters: {
    isDeveloper(state) {
      return state.isDeveloper;
    },
    loggedUserId(state) {
      return state.loggedUserId;
    },
    user(state) {
      return state.users.filter((user) => user.id == state.loggedUserId)[0];
    },
    users(state) {
      return state.users;
    },
    tweets(state) {
      return state.tweets;
    },
    replies(state) {
      return state.replies;
    },
  },
  actions: {
    toggleIsDeveloper(context) {
      context.commit('TOGGLE_IS_DEVELOPER');
    },
    setLoggedUserId(context, payload) {
      context.commit('SET_LOGGED_USER_ID', payload);
    },
    setUsers(context, payload) {
      context.commit('SET_USERS', payload);
    },
    setTweets(context, payload) {
      context.commit('SET_TWEETS', payload);
    },
    setReplies(context, payload) {
      context.commit('SET_REPLIES', payload);
    },
  },
  mutations: {
    TOGGLE_IS_DEVELOPER(state) {
      state.isDeveloper = !state.isDeveloper;
    },
    SET_LOGGED_USER_ID(state, payload) {
      state.loggedUserId = payload;
    },
    SET_USERS(state, payload) {
      state.users = payload;
    },
    SET_TWEETS(state, payload) {
      state.tweets = payload;
    },
    SET_REPLIES(state, payload) {
      state.replies = payload;
    },
  },
});
