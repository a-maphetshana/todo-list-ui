<template>
  <div class="RecycleBin">
    <div class="title is-4 has-text-centered">
      List of deleted tasks
    </div>
    <div class="RecycleBin__content">
      <div
        v-if="deletedItems.length"
        class="RecycleBin__items"
      >
        <recycled-todo-item
          v-for="item in deletedItems"
          :key="item.toDoListItemID"
          :item="item"
          @remove="removeFromBin"
          @restore="restore"
        />
      </div>
      <div
        v-else
        class="has-text-centered"
      >
        No deleted todo items
      </div>
    </div>
  </div>
</template>

<script>
import { ToDoService } from '@/services/ToDoService'
import RecycledTodoItem from '@/components/RecycledTodoItem'

/**
 * @module RecycleBin
 */
export default {
  name: 'RecycleBin',
  components: { RecycledTodoItem },
  data () {
    return {
      deletedItems: []
    }
  },
  mounted () {
    this.fetchDeletedItems()
  },
  methods: {
    /**
     * Fetches the list of deleted todo items
     */
    fetchDeletedItems () {
       ToDoService.fetchDeleted().then((response) => {
        this.deletedItems = response;
      });
    },
    /**
     * Restores a todo item from the recycling bin
     * @param {TodoItem} item
     */
    restore (item) {
      ToDoService.restoreItem(item.toDoListItemID, item).then(() => {
        this.fetchDeletedItems();
      });
    },
    removeFromBin (item) {
      ToDoService.removeItem(item.toDoListItemID).then(() => {
        this.fetchDeletedItems();
      });
    }
  }
}
</script>
