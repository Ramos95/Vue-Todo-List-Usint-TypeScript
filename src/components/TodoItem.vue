<template>
  <div :class="['todo-card', setPriorityClassName(todoItem.priority)]">
    <div class="title">{{ todoItem.title }}</div>
    <div class="description">{{ todoItem.description }}</div>
    <div>
      <button @click="handleRemoveClick">Remove</button>
      <SelectComponent
        @handleOptionChange="handleUpdateStatus"
        :optionsList="options"
        :defaultOption="todoItem.status"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { TodoItemType, status, SelectOptions, filterOptions } from "../types";
import SelectComponent from "../components/SelectComponent.vue";

export default defineComponent({
  components: {
    SelectComponent,
  },
  props: {
    todoItem: {
      type: Object as PropType<TodoItemType>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    currentStatus: {
      type: Number as PropType<status>,
      required: true,
    },
  },
  data() {
    return {
      selectedOption: 0,
      options: [
        { text: "Espera", status: 0 },
        { text: "En Progreso", status: 1 },
        { text: "Finalizado", status: 2 },
        { text: "Eliminado", status: 3 },
      ] as SelectOptions[],
    };
  },
  methods: {
    handleUpdateStatus(selectedOption: filterOptions) {
      this.$emit("updateStatusSelection", this.index, selectedOption);
    },
    handleRemoveClick() {
      this.$emit("deleteToDo", this.index);
    },
    setPriorityClassName(priority: number) {
      switch (priority) {
        case 0:
          return "low";
        case 1:
          return "medium";
        case 2:
          return "high";
      }
    },
  },
});
</script>

<style scoped>
.high {
  border: 5px solid rgb(252, 74, 74);
}
.high .title {
  background-color: rgb(252, 74, 74);
}
.medium {
  border: 5px solid rgb(255, 255, 96);
}
.medium .title {
  background-color: rgb(255, 255, 96);
}
.low {
  border: 5px solid rgb(57, 57, 255);
}
.low .title {
  background-color: rgb(57, 57, 255);
}
.done {
  border: 5px solid rgb(111, 231, 111);
}
.todo-card {
  margin-top: 10px;
  width: 500px;
  height: 200px;
  border-radius: 5px;
  /* box-shadow: 0px 5px 5px rgba(97, 97, 97, 0.8); */
}
.todo-card select {
  /* border-radius: 5px;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  border: none;
  background-color: rgb(112, 186, 255);

  padding: 9px 0px 9px 9px; */
  padding-top: 9px;
  padding-bottom: 9px;
  border-radius: 5px;
  border: 0px;
  text-transform: uppercase;
  font-weight: bold;
  color: white;
  background-color: rgb(112, 186, 255);
}
.title {
  height: 25%;
  color: white;
  text-transform: uppercase;
  font-weight: bolder;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.description {
  height: 45%;
  padding: 5px;
}
button {
  border: none;
  width: 80px;
  padding: 10px;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
}
button:first-child {
  background-color: rgb(250, 96, 96);
  margin-right: 10px;
}
button:last-child {
  background-color: rgb(94, 223, 94);
}
</style>
