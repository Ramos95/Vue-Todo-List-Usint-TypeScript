<template>
  <div class="container">
    <div class="addTodoForm">
      <img alt="Vue logo" src="../assets/logo.png" />
      <h1>To Do</h1>
      <input
        class="inputText"
        placeholder="Title"
        type="text"
        v-model="title"
      />
      <input
        class="inputText"
        placeholder="Description"
        type="text"
        v-model="description"
      />

      <div class="radioContainer">
        <RadioButton
          :optionList="optionRadioPriorityList"
          @updateSelection="updateSelectedPriority"
        />
      </div>
      <button @click="addToDo">Add to do</button>
    </div>
    <div class="todoContainer">
      <div class="selectOptions">
        <SelectComponent
          @handleOptionChange="updateStatusSelection"
          :optionsList="optionStatusList"
          :defaultOption="-1"
        />
        <SelectComponent
          @handleOptionChange="updatePrioritySelection"
          :optionsList="optionPriorityList"
          :defaultOption="-1"
        />
      </div>
      <div class="todoList">
        <TodoItem
          v-for="(todo, index) in filteredList"
          :key="todo.id"
          :todoItem="todo"
          :index="index"
          :currentStatus="todo.status"
          @updateStatusSelection="updateStatus"
          @deleteToDo="deleteToDo"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  TodoItemType,
  priority,
  status,
  filterOptions,
  SelectOptions,
} from "../types";

import TodoItem from "../components/TodoItem.vue";
import RadioButton from "../components/RadioButton.vue";
import SelectComponent from "../components/SelectComponent.vue";

export default defineComponent({
  name: "TodoList",
  components: {
    TodoItem,
    RadioButton,
    SelectComponent,
  },
  data() {
    return {
      todoItemList: [
        {
          id: 1,
          title: "To do",
          description: "do",
          priority: 0,
          status: 0,
        },
      ] as TodoItemType[],
      optionRadioPriorityList: [
        { text: "Alto", status: 2 },
        { text: "Medio", status: 1 },
        { text: "Bajo", status: 0 },
      ] as SelectOptions[],
      optionStatusList: [
        { text: "Todos", status: -1 },
        { text: "En Espera", status: 0 },
        { text: "En Progeso", status: 1 },
        { text: "Finalizado", status: 2 },
        { text: "Eliminado", status: 3 },
      ] as SelectOptions[],
      optionPriorityList: [
        { text: "Todos", status: -1 },
        { text: "Alto", status: 2 },
        { text: "Medio", status: 1 },
        { text: "Bajo", status: 0 },
      ] as SelectOptions[],
      title: "" as string,
      description: "" as string,
      picked: 0 as priority,
      status: 0 as status,
      filterStatus: -1 as filterOptions,
      filterPriority: -1 as filterOptions,
    };
  },
  computed: {
    filteredList: function(): TodoItemType[] {
      return this.filterTodoList();
    },
    /* filterStatus: "filterTodoList",
    filterPriority: "filterTodoList", */
  },
  methods: {
    addToDo: function() {
      this.todoItemList.push({
        id: Math.random(),
        title: this.title,
        description: this.description,
        priority: this.picked,
        status: 0,
      });
    },
    updateStatus: function(index: number, newStatus: number) {
      this.todoItemList[index].status = newStatus;
    },
    deleteToDo: function(index: number) {
      this.todoItemList[index].status = 3;
    },
    updateStatusSelection: function(index: number, status: filterOptions) {
      this.filterStatus = status;
    },
    updatePrioritySelection: function(index: number, priority: filterOptions) {
      this.filterPriority = priority;
    },
    updateSelectedPriority: function(priority: priority) {
      this.picked = priority;
    },
    filterTodoList: function(): TodoItemType[] {
      console.log("lol");
      if (this.filterPriority >= 0 && this.filterStatus >= 0) {
        return this.todoItemList.filter(
          (todo) =>
            todo.priority === this.filterPriority &&
            todo.status === this.filterStatus
        );
      } else if (this.filterPriority >= 0) {
        return this.todoItemList.filter((todo) => {
          return todo.priority === this.filterPriority;
        });
      } else if (this.filterStatus >= 0) {
        return this.todoItemList.filter((todo) => {
          return todo.status === this.filterStatus;
        });
      }
      return this.todoItemList;
    },
  },
});
</script>

<style scoped>
.addTodoForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 300px;
  width: 50%;
  margin-bottom: 10px;
  border: 3px solid grey;
  border-radius: 3px;
  padding: 15px;
}
.addTodoForm .inputText {
  width: 80%;
  height: 30px;
  margin: 10px;
}
.addTodoForm .inputRadio {
  width: 5%;
  height: 30px;
  margin: 10px;
}
.addTodoForm .radioContainer {
  height: 20%;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: row;
}
.todoContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  height: 50vh;
}

.selectOptions {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 50%;
  height: 30%;
}

.todoList {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 70%;
  overflow-y: auto;
}

.selectOptions select {
  width: 30%;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

img {
  height: 5em;
  width: 5em;
}
</style>
