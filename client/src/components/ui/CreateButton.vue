<template>
  <v-btn
    @click="() => this.$emit('click')"
    :disabled="disabled"
    class="mx-2"
    fab
    dark
    color="indigo"
  >
    <v-icon dark>mdi-plus</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>
