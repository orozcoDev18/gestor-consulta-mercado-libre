/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect } from "react";
import { HomeC } from "./components";
import { UseStoreSeller } from '../../store/seller'
import { UseStoreProducts } from '../../store/products'
import { TableList } from "../components/table";

export default function Layout() {
  const data_seller = UseStoreSeller((state) => state.data_seller)
  const is_loading = UseStoreSeller((state) => state.isLoading)
  const products = UseStoreProducts((state) => state.products)
  const update_products = UseStoreProducts((state) => state.updateProducts)
  const is_loading_products = UseStoreProducts((state) => state.isLoadingProduct)
  const get_products_by_category = UseStoreProducts((state) => state.getProductsByCategory)
  const get_filter_products = UseStoreProducts((state) => state.getFilterProducts)
  const get_sort_products = UseStoreProducts((state) => state.getSortProducts)
  const get_seller_info = UseStoreSeller((state) => state.getSellerInfo)

  const loadInfo = async () => {
    const seller_info = await get_seller_info();
    update_products(seller_info?.results);
  }

  useEffect(() => {
    loadInfo();
  }, [data_seller])

  return (
    <HomeC
      dataSeller={data_seller}
      get_products_by_category={get_products_by_category}
      get_filter_products={get_filter_products}
    >
      <TableList
        rows={products}
        isLoading={is_loading || is_loading_products}
        available_sorts={data_seller.available_sorts}
        get_sort_products={get_sort_products}
      />
    </HomeC>
  );
}
