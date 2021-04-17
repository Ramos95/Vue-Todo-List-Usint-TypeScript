<template>
  <div v-for="(option, index) in optionList" :key="index">
    <input
      :id="option.text"
      :key="index"
      class="inputRadio"
      type="radio"
      :value="option.status"
      v-model.number="selectedOption"
      @change="handleOptionChange"
    />
    <label :for="option.text">{{ option.text }}</label>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { SelectOptions } from "../types";

export default defineComponent({
  props: {
    optionList: {
      type: Object as PropType<SelectOptions[]>,
    },
  },
  emits: ["updateSelection"],

  data() {
    return {
      selectedOption: 0,
    };
  },
  methods: {
    handleOptionChange: function() {
      this.$emit("updateSelection", this.selectedOption);
    },
  },
});
</script>
