<template lang="pug">
.list
  h2.header Список постов

  .pagination
    base-button(
      mode="outline"
      label="Назад"
      @click="onPagination('prev')"
    )
    p.page {{ paginationGetter.page }}
    base-button(
      mode="outline"
      label="Вперед"
      @click="onPagination('next')"
    )

  ul(v-if="postsGetter?.length")
    li.post(
      v-for="post in postsGetter"
      :key="post.id"
    )
      .title
        h3 Title
        p {{ post.title }}

      .body
        h3 Body
        p {{ post.body }}

      .meta
        p User ID: {{ post.userId }}
        p Post ID: {{ post.id }}
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePostsStore } from '@/store';

const postsStore = usePostsStore();

const { postsGetter, paginationGetter } = storeToRefs(postsStore);
const { setPagination, getPosts } = postsStore;

type PaginationDirection = 'next' | 'prev';

async function onPagination(direction: PaginationDirection) {
  const { page, totalPages } = paginationGetter.value;

  const nextPage =
    direction === 'next'
      ? Math.min(page + 1, totalPages)
      : Math.max(page - 1, 1);

  if (nextPage === page) return;

  setPagination(nextPage);
  await getPosts();
}
</script>

<style lang="scss">
@import '@/assets/styles/variables';

.header {
  margin-bottom: $space-sm;
}

.pagination {
  display: flex;
  align-items: center;
  gap: $space-sm;
  margin-bottom: $space-lg;

  .page {
    padding: 10px;
    color: $color-text-secondary;
    font-size: 14px;
    background: $color-surface;
    border-radius: $radius-sm;
  }
}

.list {
  .post {
    background: $color-surface;
    padding: $space-md;
    border-radius: $radius-md;
    box-shadow: $shadow-card;
    margin-bottom: $space-md;
    list-style: none;

    .title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: $space-sm;
    }

    .body {
      font-size: 14px;
      color: $color-text-primary;
      margin-bottom: $space-sm;
    }

    .meta {
      display: flex;
      font-size: 12px;
      justify-content: space-between;
    }
  }
}
</style>
