<template>
  <select
    v-model="selectedOption"
    @change="handleOptionChange($event.target.options.selectedIndex)"
  >
    <option
      v-for="(option, index) in optionsList"
      :key="index"
      v-bind:value="option.status"
      >{{ option.text }}
    </option>
  </select>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { SelectOptions, filterOptions } from "../types";

export default defineComponent({
  props: {
    optionsList: {
      type: Object as PropType<SelectOptions[]>,
      required: true,
    },
    defaultOption: {
      type: Number as PropType<filterOptions>,
      required: true,
    },
  },
  emits: ["handleOptionChange"],
  data() {
    return {
      selectedOption: this.defaultOption as filterOptions,
    };
  },
  methods: {
    handleOptionChange: function(index: number) {
      this.$emit("handleOptionChange", index, this.selectedOption);
    },
  },
});
</script>
