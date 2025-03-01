<template>
  <NuxtLayout name="default" :breadcrumbs="breadcrumbs">
    <CategoryPageContent
      v-if="productsCatalog"
      :title="categoryGetters.getCategoryName(productsCatalog.category)"
      :total-products="productsCatalog.pagination.totals"
      :products="productsCatalog.products"
      :items-per-page="Number(productsPerPage)"
    >
      <template #sidebar>
        <CategoryTree :category="category" />
        <CategorySorting />
        <CategoryItemsPerPage class="mt-6" :total-products="productsCatalog.pagination.totals" />
        <CategoryFilters :facets="productsCatalog.facets" />
      </template>
    </CategoryPageContent>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app';
import { categoryGetters, categoryTreeGetters } from '@plentymarkets/shop-sdk';

definePageMeta({
  layout: false,
});

const { t } = useI18n();
const route = useRoute();
const { getFacetsFromURL } = useCategoryFilter();
const { fetchProducts, data: productsCatalog, productsPerPage } = useProducts();
const { data: categoryTree } = useCategoryTree();

const handleQueryUpdate = async () => {
  await fetchProducts(getFacetsFromURL());
};

await handleQueryUpdate();

const category = ref(productsCatalog.value.category);

const breadcrumbs = computed(() => {
  const breadcrumb = categoryTreeGetters.generateBreadcrumbFromCategory(
    categoryTree.value,
    categoryGetters.getId(category.value),
  );
  breadcrumb.unshift({ name: t('home'), link: '/' });

  return breadcrumb;
});

watch(
  () => route.query,
  async () => {
    handleQueryUpdate();
  },
);
</script>
