<template>
  <base-todo-item
    class="TodoItem"
    :item="item"
  >
    <template #checkbox>
      <input
        v-model="completedLocal"
        type="checkbox"
        class="checkbox"
        data-testid="completeCheckbox"
      >
    </template>
    <template #name>
      <div
        v-if="!isEditing"
        class="break-all"
        data-testid="contentEditTrigger"
        @dblclick="enableEdit"
      >
        {{ item.name }}
      </div>
      <input
        v-if="isEditing"
        ref="editInput"
        v-model="contentLocal"
        type="text"
        class="input"
        data-testid="editInput"
        @keyup.enter="saveEdit"
        @blur="saveEdit"
        @keyup.esc="stopEdit"
      >
    </template>
    <template #actions>
      <button
        class="TodoItem__delete button is-inverted is-danger is-small"
        data-testid="deleteTrigger"
        @click.prevent="deleteItem"
      >
        <span class="icon"><i class="fa fa-trash fa-lg" /></span>
      </button>
      <div class="TodoItem__reorderHandle">
        <i class="fa fa-bars" />
      </div>
    </template>
  </base-todo-item>
</template>

<script>
import BaseTodoItem from '@/components/BaseTodoItem'

/**
 * @module TodoItem
 */
export default {
  name: 'TodoItem',
  components: { BaseTodoItem },
  props: {
    /**
     *  @type TodoItem
     */
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isEditing: false,
      contentLocal: ''
    }
  },
  computed: {
    completedLocal: {
      /**
       * Transforms isCompleted
       */
      get () {
        return this.item.isCompleted
      },
      /**
       * Converts isCompleted
       * Emits the entire changed item
       * @param {Boolean} value
       */
      set (value) {
        this.emitChange({
          isCompleted: !!value
        })
      }
    }
  },
  methods: {
    /**
     * Deletes a todo item
     */
    deleteItem () {
      this.emitChange({
        isDeleted: true
      })
    },
    /**
     * Emits the changes to the TODO item up to the parent.
     * @param {Object} updatedItem - the todo item
     */
    emitChange (updatedItem) {
      this.$emit('change', {
        ...this.item,
        ...updatedItem
      })
    },
    /**
     * Starts the editing of a todo item.
     * Focuses the input item immediately
     * @return {Promise<void>}
     */
    async enableEdit () {
      this.contentLocal = this.item.name
      this.isEditing = true
      await this.$nextTick()
      this.$refs.editInput.focus()
    },
    /**
     * Saves the editing changes.
     * If no name is provided, just closes
     */
    saveEdit () {
      if (this.contentLocal) {
        this.emitChange({
          name: this.contentLocal
        })
      }
      this.stopEdit()
    },
    /**
     * Stops the editing, without saving anything
     */
    stopEdit () {
      this.isEditing = false
      this.contentLocal = ''
    }
  }
}
</script>

<style lang='scss' scoped>
@import "../assets/styles/app";
.TodoItem {
  &:hover {
    .TodoItem__delete {
      opacity: 1;
    }
  }

  &__delete {
    opacity: 0;
    margin-right: $theme--spacing-s;
    border-radius: 100%;
  }

  &__reorderHandle {
    &:hover {
      cursor: grab;
    }

    &:active {
      cursor: grabbing;
    }
  }
}
</style>
