import { defineStore } from 'pinia';
import { ref, computed, reactive } from 'vue';
import { BASE_URL, PER_PAGE } from '@/types/constants';
import { IPost, IFilters } from '@/types/types';
import qs from 'qs';

export const usePostsStore = defineStore('posts', () => {
  const posts = ref<IPost[]>([]);
  const filtersStore = ref();
  const pagination = reactive({
    page: 1,
    perPage: PER_PAGE,
  });

  async function getPosts(filters?: IFilters) {
    if (filters) filtersStore.value = filters;

    const query = qs.stringify(
      { ...filtersStore.value, pagination },
      {
        filter: (_, value) =>
          value === '' || value === null ? undefined : value,
      }
    );

    fetch(`${BASE_URL}/posts?${query}`)
      .then(response => response.json())
      .then(data => {
        posts.value = data;
      });
  }

  function setPagination(page: number) {
    pagination.page = page;
    pagination.perPage = PER_PAGE;
  }

  const paginationGetter = computed(() => {
    return {
      ...pagination,
      totalPages: Math.ceil(posts.value.length / pagination.perPage),
    };
  });

  const postsGetter = computed(() => {
    const start = (pagination.page - 1) * pagination.perPage;
    const end = pagination.page * pagination.perPage;

    return posts.value.slice(start, end);
  });

  return {
    postsGetter,
    getPosts,
    setPagination,
    paginationGetter,
    filtersStore,
  };
});
