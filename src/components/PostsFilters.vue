<template lang="pug">
div
  h2.header Фильтры

  .filters
    Base-input(
      v-model="filters.id"
      placeholder="ID поста"
    )
    Base-input(
      v-model="filters.userId"
      placeholder="ID автора"
    )
    base-button(
      label="Применить"
      @click="applyFilters"
    )
</template>

<script setup lang="ts">
import { reactive, computed, watchEffect, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePostsStore } from '@/store';
import { IFilters } from '@/types/types';

const postsStore = usePostsStore();
const { getPosts, setPagination } = postsStore;

const router = useRouter();
const route = useRoute();

const filters = reactive<IFilters>({
  id: null,
  userId: null,
});

// Собираем фильтры для добавления в URL
const query = computed(() => ({
  ...(filters.id ? { id: filters.id } : {}),
  ...(filters.userId ? { userId: filters.userId } : {}),
}));

// Синхронизируем фильтры с URL
watchEffect(() => {
  router.replace({ query: query.value });
});

// Применяем фильтры и сбрасываем пагинацию
function applyFilters() {
  getPosts(filters);
  setPagination(1)
}

// На mount достаем фильтры из URL и применяем их
onMounted(() => {
  filters.id = (route.query.id as string) || null;
  filters.userId = (route.query.userId as string) || null;
  applyFilters();
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.header {
  margin-bottom: $space-sm;
}

.filters {
  display: flex;
  gap: 10px;
}

@media only screen and (max-width: 600px) {
.filters {
  flex-direction: column;
}
}
</style>
