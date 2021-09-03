<template>
  <div class="ToDo">
    <div class="title is-4 has-text-centered">TODO tasks</div>    
    <div class="ToDo__addNew">
      <input
        v-model.trim="newTodoContent"
        class="input"
        type="text"
        name="new_todo"
        placeholder="Your new task"
        @keyup.enter.prevent="saveTodo"
      />
    </div>

<div class="ToDoFIlter is-4 has-text-right">
      Show:
      <select style="width: 100px">
        <option>All</option>
        <option>Pending</option>
        <option>Completed</option>
      </select>
      Sort by:
      <select style="width: 100px">
        <option>Date asc</option>
        <option>Date desc</option>
        <option>Description asc</option>
        <option>Description desc</option>
        <option>Status asc</option>
        <option>Status desc</option>
      </select>
    </div>
    <div class="ToDo__items">
      <draggable
        v-model="todoItems"
        handle=".TodoItem__reorderHandle"
        @end="todoItems"
      >
        <todo-item
          v-for="item in todoItems"
          :key="item.key"
          :item="item"
          @change="handleItemChange"
        />
      </draggable>
    </div>
  </div>
</template>

<script>
import Draggable from "vuedraggable";
import TodoItem from "@/components/TodoItem";
import { ToDoService } from "@/services/ToDoService";

/**
 * @module ToDo
 */
export default {
  name: "ToDo",
  components: { TodoItem, Draggable },
  data() {
    return {
      newTodoContent: "",
      todoItems: [],
    };
  },
  mounted() {
    this.fetchToDos();
  },
  methods: {
    /**
     * Fetches all the todo items
     */
    fetchToDos() {
      ToDoService.fetchAll().then((response) => {
        this.todoItems = response;
      });
    },
    /**
     * Saves a new todo item
     */
    saveTodo() {
      // do nothing if we have no content
      if (!this.newTodoContent) return;

      ToDoService.saveItem({
        toDoListItemID: 0,
        name: this.newTodoContent,
        date: new Date(),
        isCompleted: false,
        isDeleted: false,
      }).then(() => {
        this.fetchToDos();
      });
      // clear the form input
      this.newTodoContent = "";
    },
    /**
     * Saves the todo item, on each change
     * @param {TodoItem} item
     */
    handleItemChange(item) {
      if (item.isDeleted) {
        ToDoService.archiveItem(item.toDoListItemID).then(() => {
          this.fetchToDos();
        });
      } else {
        ToDoService.updateItem(item.toDoListItemID, item).then(() => {
          this.fetchToDos();
        });
      }
    },
  },
};
</script>
<style lang="scss">
@import "../assets/styles/app";
.ToDo {
  &__items {
    margin-top: $theme--spacing-l;
  }
}

.ToDoFIlter {
 margin-top: $theme--spacing-l;
}
</style>
