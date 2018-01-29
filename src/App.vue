<template>
  <v-app id="app" dark>
    <my-menu v-model="openDrawer" />

    <v-toolbar
      app
      fixed
      clipped-left
    >
      <v-toolbar-side-icon @click.stop="openDrawer = !openDrawer" />
      <v-toolbar-title class="sometitle-logo" />
      <v-spacer />
      <v-toolbar-items>
        <v-btn flat>
          <v-icon left>account_circle</v-icon>
          Sign In
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <my-shipping-calculator />
    </v-content>

    <my-footer />

  </v-app>
</template>

<script>
import MyFooter from '@/components/MyFooter';
import MyMenu from '@/components/MyMenu';
import MyShippingCalculator from '@/components/MyShippingCalculator';

export default {
  name: 'App',
  components: {
    MyFooter,
    MyMenu,
    MyShippingCalculator,
  },
  data() {
    return {
      openDrawer: true,
    };
  },
};
</script>

