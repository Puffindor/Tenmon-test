<template lang="pug">
button(:class="mode") {{ label }}
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  label: string;
  mode?: 'outline';
}>();
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

button {
  padding: 10px 16px;
  background-color: $color-accent;
  color: white;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: $color-accent-hover;
  }

  &.outline {
    border: 1px solid $color-border;
    background: $color-surface;
    color: $color-text-primary;

    &:hover {
      background-color: $color-border;
    }
  }
}
</style>
