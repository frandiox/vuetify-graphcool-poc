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
      <v-container align-content-space-between>
        <v-layout class="mb-3">
          <v-flex xs12>
            <h1>Shipping Calculator</h1>
            Estimate shipping rates to your country.
          </v-flex>
        </v-layout>

        <v-form>
          <v-layout
            wrap
            justify-space-between
          >
            <v-flex xs12>
              <v-select
                label="Country"
              />
            </v-flex>

            <v-flex xs12 sm3>
              <v-text-field
                label="Length"
                suffix="cm"
              />
            </v-flex>

            <v-spacer />

            <v-flex xs12 sm4>
              <v-text-field
                label="Width"
                suffix="cm"
              />
            </v-flex>

            <v-spacer />

            <v-flex xs12 sm3>
              <v-text-field
                label="Height"
                suffix="cm"
              />
            </v-flex>

            <v-flex xs12 sm6>
              <v-text-field
                label="Weight"
                suffix="gr"
              />
            </v-flex>

            <v-flex sm3 offset-sm3>
              <v-btn
                color="primary"
                large
                block
              >
                <v-icon left>
                  track_changes
                </v-icon>

                Get Rates
              </v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-container>
    </v-content>

    <my-footer />

  </v-app>
</template>

<script>
import MyFooter from '@/components/MyFooter';
import MyMenu from '@/components/MyMenu';

export default {
  name: 'App',
  components: {
    MyFooter,
    MyMenu,
  },
  data() {
    return {
      openDrawer: false,
    };
  },
};
</script>

<style>
.icon-fix .list__group__header__prepend-icon {
  display: none;
}
</style>
