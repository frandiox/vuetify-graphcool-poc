<template>
  <v-container align-content-space-between>
    <v-layout class="mb-3">
      <v-flex xs12>
        <h1>Shipping Calculator</h1>
        Estimate shipping rates to your country.
      </v-flex>
    </v-layout>

    <v-form v-if="!showRates">
      <v-layout
        wrap
        justify-space-between
      >
        <v-flex xs12>
          <v-select
            autocomplete
            label="Country"
            v-model="country"
            :items="allCountries"
            :loading="allCountries.length === 0"
          />
        </v-flex>

        <v-flex xs12 sm3>
          <v-text-field
            label="Length"
            suffix="cm"
            v-model="length"
          />
        </v-flex>

        <v-spacer />

        <v-flex xs12 sm4>
          <v-text-field
            label="Width"
            suffix="cm"
            v-model="width"
          />
        </v-flex>

        <v-spacer />

        <v-flex xs12 sm3>
          <v-text-field
            label="Height"
            suffix="cm"
            v-model="height"
          />
        </v-flex>

        <v-flex xs12 sm6>
          <v-text-field
            label="Weight"
            suffix="gr"
            v-model="weight"
          />
        </v-flex>

        <v-flex sm3 offset-sm3>
          <v-btn
            color="primary"
            large
            block
            :loading="loadingRates > 0"
            :disabled="loadingRates > 0"
            @click="calculate"
          >
            <v-icon left>
              track_changes
            </v-icon>

            Get Rates
          </v-btn>
        </v-flex>
      </v-layout>
    </v-form>

    <div v-else>
      <v-btn
        color="primary"
        @click="showRates = false"
      >
        Back
      </v-btn>


      <v-data-table
        :items="summary"
        class="elevation-1"
        hide-actions
        hide-headers
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.label }}</td>
          <td>{{ props.item.value }}</td>
        </template>
      </v-data-table>

      <v-data-table
        :headers="headers"
        :items="items"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.calories }}</td>
          <td class="text-xs-right">{{ props.item.fat }}</td>
          <td class="text-xs-right">{{ props.item.carbs }}</td>
          <td class="text-xs-right">{{ props.item.protein }}</td>
          <td class="text-xs-right">{{ props.item.sodium }}</td>
          <td class="text-xs-right">{{ props.item.calcium }}</td>
          <td class="text-xs-right">{{ props.item.iron }}</td>
        </template>
      </v-data-table>

    </div>
  </v-container>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'MyShippingCalculator',

  data() {
    return {
      allCountries: [],
      length: '',
      width: '',
      height: '',
      weight: '',
      country: '',
      rates: [],
      loadingRates: 0,
      showRates: false,
      tableHeaders: [{
        text: 'Rate USD',
        sortable: true,
      }, {
        text: 'Shipping Method',
      }, {
        text: 'Delivery Time',
        sortable: true,
      }, {
        text: 'Max Length (cm)',
      }, {
        text: 'Max LWH (cm)',
      }],
    };
  },

  computed: {
    summary() {
      return [{
        label: 'Ship-to',
        value: this.country,
      }, {
        label: 'Weight',
        value: `${this.weight} grams`,
      }, {
        label: 'L x W x H',
        value: `${this.length} x ${this.width} x ${this.height} cm`,
      }];
    },
  },

  methods: {
    calculate() {
      if (this.loadingRates <= 0 && this.rates.length > 0) {
        this.showRates = true;
      }
    },
  },

  apollo: {
    allCountries: {
      query() {
        return gql`
          query {
            allCountries {
              countryName
            }
          }
        `;
      },
      update(data) {
        return data.allCountries.map(c => c.countryName);
      },
    },
    rates: {
      query() {
        return gql`
          query {
            Country(countryName: "${this.country}") {
              countryCode
              rates {
                maxLWH
                maxLength
                maxWeight
                minWeight
                method
                rate
              }
            }
          }
        `;
      },
      update(data) {
        return data.Country.rates;
      },
      skip() {
        return this.country === '';
      },
      loadingKey: 'loadingRates',
    },
  },
};
</script>

