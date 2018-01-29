<template>
  <div>
    <v-layout wrap>
      <v-flex
        md5
        sm5
        xs12
        class="mb-3"
      >

        <v-layout column fill-height>
          <v-flex sm3>
            <v-btn
              block
              color="primary"
              @click="$emit('back')"
            >
              <v-icon>arrow_back</v-icon>
              <span class="px-2">Back</span>
            </v-btn>
          </v-flex>

          <v-flex d-flex align-end>
            <v-card color="yellow lighten-4" light>
              <v-card-text class="text-xs-center">
                <v-icon left light class="mr-1">warning</v-icon>
                Not all shipping methods available for some products.
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>

      </v-flex>

      <v-spacer />

      <v-flex
        md5
        sm6
        class="mb-3"
      >
        <v-data-table
          :items="summary"
          class="elevation-1"
          hide-actions
          hide-headers
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.label }}</td>
            <td class="text-xs-right">{{ props.item.value }}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>

    <v-data-table
      :headers="tableHeaders"
      :items="rates"
      hide-actions
      class="elevation-1"
      must-sort
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.rate | usd }}</td>
        <td class="text-xs-left">{{ props.item.method }}</td>
        <td class="text-xs-left">7 to 9 business days</td>
        <td class="text-xs-left">{{ props.item.maxLength | length }}</td>
        <td class="text-xs-left">{{ props.item.maxLWH | length }}</td>
      </template>
    </v-data-table>

  </div>
</template>

<script>

export default {
  name: 'MyShippingCalculatorResult',

  filters: {
    usd(value) {
      return `$ ${(value / 100).toFixed(2)}`;
    },
    length(value) {
      return value ? `${value} cm` : '-';
    },
  },

  props: {
    rates: {
      type: Array,
      default() {
        return [];
      },
    },
    formInput: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  data() {
    return {
      tableHeaders: [
        {
          text: 'Rate USD',
          value: 'rate',
        }, {
          text: 'Shipping Method',
          value: 'method',
        }, {
          text: 'Delivery Time',
          value: '',
        }, {
          text: 'Max Length',
          value: 'maxLength',
        }, {
          text: 'Max LWH',
          value: 'maxLWH',
        },
      ],
    };
  },

  computed: {
    summary() {
      const { country, length, width, height, weight } = this.formInput;
      return [{
        label: 'Ship-to',
        value: country,
      }, {
        label: 'Weight',
        value: `${weight} grams`,
      }, {
        label: 'L x W x H',
        value: `${length} x ${width} x ${height} cm`,
      }];
    },
  },
};
</script>

