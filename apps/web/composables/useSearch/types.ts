import { Ref } from 'vue';
import type { ItemSearchResult, ItemSearchParams } from '@plentymarkets/shop-api';

export interface UseSearchState {
  data: ItemSearchResult;
  loading: boolean;
  productsPerPage: number;
}

export type GetSearch = (params: ItemSearchParams) => Promise<ItemSearchResult>;

export interface UseSearch {
  data: Readonly<Ref<UseSearchState['data']>>;
  loading: Readonly<Ref<boolean>>;
  productsPerPage: Readonly<Ref<number>>;
  getSearch: GetSearch;
}

export type UseSearchReturn = () => UseSearch;
