<template lang="pug">
input(
  :placeholder="placeholder"
  :value="modelValue"
  @input="onInput"
)
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  placeholder: string;
  modelValue: string | null | undefined;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

input {
  flex: 1;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid $color-border;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: $color-accent;
  }
}
</style>
