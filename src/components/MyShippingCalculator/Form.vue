<template>
  <v-form ref="form">
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
          :rules="[requiredField]"
        />
      </v-flex>

      <v-flex xs12 sm3>
        <v-text-field
          label="Length"
          suffix="cm"
          v-model.number="length"
          :rules="[requiredField, ...numberRules]"
          @keyup.enter="submit"
        />
      </v-flex>

      <v-spacer />

      <v-flex xs12 sm4>
        <v-text-field
          label="Width"
          suffix="cm"
          v-model.number="width"
          :rules="[requiredField, ...numberRules]"
          @keyup.enter="submit"
        />
      </v-flex>

      <v-spacer />

      <v-flex xs12 sm3>
        <v-text-field
          label="Height"
          suffix="cm"
          v-model.number="height"
          :rules="[requiredField, ...numberRules]"
          @keyup.enter="submit"
        />
      </v-flex>

      <v-flex xs12 sm6>
        <v-text-field
          label="Weight"
          suffix="gr"
          v-model.number="weight"
          :rules="[requiredField, ...numberRules]"
          @keyup.enter="submit"
        />
      </v-flex>

      <v-flex sm3 offset-sm3>
        <v-btn
          color="primary"
          large
          block
          :loading="loading"
          :disabled="loading"
          @click="submit"
        >
          <v-icon left>
            track_changes
          </v-icon>

          Get Rates
        </v-btn>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>

export default {
  name: 'MyShippingCalculatorForm',

  props: {
    formInput: {
      type: Object,
      default() {
        return {};
      },
    },
    allCountries: {
      type: Array,
      default() {
        return [];
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      country: this.formInput.country,
      height: this.formInput.height,
      length: this.formInput.length,
      width: this.formInput.width,
      weight: this.formInput.weight,

      numberRules: [
        v => !isNaN(Number(v)) || 'Must be number',
      ],
      requiredField: v => !!v || 'Required field',
    };
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$emit('update:formInput', {
          country: this.country,
          height: this.height,
          length: this.length,
          width: this.width,
          weight: this.weight,
        });

        this.$emit('submit');
      }
    },
  },
};
</script>

