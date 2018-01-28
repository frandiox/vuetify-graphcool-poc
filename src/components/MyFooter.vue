<template>
  <v-footer
    app
    inset
    :fixed="false"
    :height="null"
    class="footer-fix"
  >
    <v-container>
      <v-layout
        wrap
        justify-space-between
        class="text-xs-center text-sm-left"
      >

        <v-flex xs12 sm2>
          <div class="my-3 primary--text">Questions?</div>
          <div class="grey--text">Lorem ipsum</div>
        </v-flex>

        <v-flex xs12 sm2 column>
          <div class="my-3">About</div>
          <div class="grey--text">
            <div>Service Fees</div>
            <div>Shipping Calculator</div>
            <div>Policies</div>
          </div>
        </v-flex>

        <v-flex xs12 sm4>
          <div class="my-3">Sister Company</div>
          <div class="primary--text">Lorem ipsum</div>
          <div class="grey--text">Lorem ipsum dolor sit amet</div>
        </v-flex>

        <v-flex xs12 sm3 column>
          <div class="sometitle-logo my-3" />
          <div class="grey--text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Phasellus eu nunc ut justo lacinia feugiat.
            Ut vel luctus sem, finibus luctus nunc.
            <div class="mt-2">@SomeTitle, LLC</div>
          </div>

        </v-flex>
      </v-layout>

    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: 'MyFooter',
};
</script>

<style>
.footer-fix {
  position: initial;
}
</style>
