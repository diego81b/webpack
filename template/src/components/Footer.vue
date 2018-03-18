<template>
<footer class="footer">
  <div class="container-fluid">
    <div class="col-md-12 text-center">
        &copy; {{currentYear}} - Crafted with <span class="fa fa-heart"> by</span> <a target="_blank" 
        href="http://commitsoftware.it">Comm-it</a>
      </div>
  </div>
</footer>
  
</template>

<script>
export default {
  name: 'CustomFooter',
  data() {
    return {
      currentYear: this.$moment().year(),
    };
  },
};
</script>

<style lang="scss" scoped>
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  /* Set the fixed height of the footer here */
  height: 60px;
  line-height: 60px; /* Vertically center the text there */
}
</style>
