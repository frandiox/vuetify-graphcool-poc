<template>
  <v-navigation-drawer
    app
    clipped
    fixed
    :value="value"
    @input="$emit('input', $event)"
  >
    <v-list>

      <template v-for="item in items">
        <my-menu-item
          v-if="!item.subitems || item.subitems.length === 0"
          :key="item.title"
          :title="item.title"
        />

        <v-list-group
          v-else
          :key="item.title"
          class="icon-fix"
        >

          <my-menu-item
            slot="activator"
            :title="item.title"
          />
          <my-menu-item
            v-for="subitem in item.subitems"
            :key="subitem.title"
            :title="subitem.title"
          />

        </v-list-group>

      </template>

    </v-list>
  </v-navigation-drawer>
</template>

<script>
import MyMenuItem from './Item';

export default {
  name: 'App',
  components: {
    MyMenuItem,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      items: [
        {
          title: 'Mailbox',
          href: '#',
        },
        {
          title: 'My address',
          href: '#',
        },
        {
          title: 'In progress',
          href: '#',
          subitems: [
            {
              title: 'Consolidation',
              href: '#',
            },
            {
              title: 'Repacking',
              href: '#',
            },
            {
              title: 'Shipping',
              href: '#',
            },
          ],
        },
        {
          title: 'Registration',
          href: '#',
        },
        {
          title: 'Account',
          href: '#',
        },
        {
          title: 'Shipped',
          href: '#',
        },
      ],
    };
  },
};
</script>

<style>
/* See: https://github.com/vuetifyjs/vuetify/issues/3022  */
.icon-fix .list__group__header__prepend-icon {
  display: none;
}
</style>
