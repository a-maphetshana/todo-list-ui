<template>
  <div
    class="BaseTodoItem"
    :class="{ 'BaseTodoItem--completed': item.isCompleted }"
  >
    <div class="BaseTodoItem__checkbox">
      <slot name="checkbox">
        <input
          type="checkbox"
          disabled
          :checked="!!item.isCompleted"
        >
      </slot>
    </div>
    <div class="BaseTodoItem__content">
      <slot name="name" >
        {{ item.name }}
      </slot>
      <slot name="date">
        {{ item.date }}
      </slot>
    </div>
    <div class="BaseTodoItem__actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<script>
/**
 * @module BaseTodoItem
 */
export default {
  name: 'BaseTodoItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../assets/styles/app";
.BaseTodoItem {
  display: flex;
  align-items: center;
  margin-bottom: $theme--spacing-m;
  background: $theme--color-white;
  padding: $theme--spacing-s;
  border-radius: 5px;

  &--completed {
    text-decoration: line-through;
    opacity: .5;
  }

  &__content {
    flex: 1 1 auto;
    padding: 0 $theme--spacing-m;
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
