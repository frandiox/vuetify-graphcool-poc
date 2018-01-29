<template>
  <v-container align-content-space-between>
    <v-layout class="mb-3">
      <v-flex xs12>
        <h1>Shipping Calculator</h1>
        Estimate shipping rates to your country.
      </v-flex>
    </v-layout>

    <transition name="slide-y-transition" mode="out-in">

      <my-shipping-calculator-form
        v-if="!showRates || rates.length === 0 || isLoading"
        key="form"
        :form-input.sync="formInput"
        :loading="isLoading"
        :all-countries="allCountries"
        @submit="showRates = true"
      />

      <my-shipping-calculator-result
        v-else
        key="result"
        :rates="rates"
        :form-input="formInput"
        @back="showRates = false"
      />

    </transition>

    <v-snackbar
      :timeout="4000"
      top
      right
      v-model="snackbar"
    >
      No results found for the current input
      <v-btn
        flat
        color="yellow"
        @click.native="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>

  </v-container>
</template>

<script>
import gql from 'graphql-tag';
import MyShippingCalculatorForm from './Form';
import MyShippingCalculatorResult from './Result';

export default {
  name: 'MyShippingCalculator',

  components: {
    MyShippingCalculatorForm,
    MyShippingCalculatorResult,
  },

  data() {
    return {
      allCountries: [],
      rates: [],
      formInput: {},
      loadingRates: 0,
      showRates: false,
      snackbar: false,
    };
  },

  computed: {
    isLoading() {
      return this.loadingRates > 0;
    },
    maxLWH() {
      const { length, width, height } = this.formInput;
      return length + width + height;
    },
    maxLength() {
      const { length, width, height } = this.formInput;
      return [length, width, height].sort().shift();
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
        const { country, weight } = this.formInput;
        return gql`
          query {
            Country(countryName: "${country}") {
              countryCode
              rates (
                filter: {
                  maxLWH_gt: ${this.maxLWH}
                  maxLength_gt: ${this.maxLength}
                  maxWeight_gt: ${weight}
                  minWeight_lt: ${weight}
                }
              ) {
                maxLWH
                maxLength
                method
                rate
              }
            }
          }
        `;
      },
      update(data) {
        if (data.Country.rates.length === 0) {
          this.snackbar = true;
          this.showRates = false;
        }

        return data.Country.rates;
      },
      skip() {
        return this.showRates === false;
      },
      loadingKey: 'loadingRates',
    },
  },
};
</script>

