<template>
<b-navbar toggleable="md"  class="navbar navbar-expand-lg navbar-dark bg-primary">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand href="#">NavBar</b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav>
      <b-nav-item href="#">Link</b-nav-item>
      <b-nav-item href="#" disabled>Disabled</b-nav-item>
    </b-navbar-nav>

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">

      <b-nav-form>
        <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
      </b-nav-form>

      <b-nav-item-dropdown right>
        <!-- Using button-content slot -->
        <template slot="button-content">
          <em>User</em>
        </template>
        <b-dropdown-item :to="{ name: 'Login' }" v-if="!isAuth"> Signin </b-dropdown-item>
        <b-dropdown-item @click="logout()" v-if="isAuth"> Signout </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-collapse>
</b-navbar>
</template>

<script>
import auth from '@/auth';

export default {
  name: "CustomHeader",
  data() {
    return {
    };
  },
  methods: {
    logout() {
        auth.logout();
        this.$store.commit('LOGOUT');
        this.goToLogin();
    },
    signin() {
      this.goToLogin();
    },
    goToLogin() {
      this.$router.push({ name: 'Login' });
    }
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    }
  }
};
</script>

<style lang="scss" scoped>
#logo {
  height: 50px;
}
</style>
