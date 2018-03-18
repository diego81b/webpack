<template>
  <div id="app">
    <custom-header></custom-header>
    <div class="container-fluid" id="container">
      <router-view></router-view>
        <div class="loading" v-if="isLoading">
          <ball-scale-ripple-multiple-loader color="#e83e8c" size="65px"></ball-scale-ripple-multiple-loader>
        </div>
    </div>
    <!-- <custom-footer></custom-footer> -->
  </div>
</template>

<script>
 import CustomHeader from '@/components/Header';
  import CustomFooter from '@/components/Footer';

  export default {
    name: "app",
    data() {
      return {
      };
    },
    computed: {
        isLoading() {
          return this.$store.getters.isLoading;
        }
    },
    components: {
      CustomHeader,
      CustomFooter
    }
  };
</script>

<style lang="scss">
  @import 'theme/variables';
  @import 'theme/bootswatch';
  @import 'theme/app';
  @import "~font-awesome/scss/font-awesome";
  @import '../node_modules/bootstrap/scss/bootstrap.scss';
</style>