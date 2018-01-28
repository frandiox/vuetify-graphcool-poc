<template>
  <v-list-tile>
    <v-list-tile-content>
      <v-list-tile-title>{{ title }}</v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
export default {
  name: 'MyMenuItem',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
};
</script>
