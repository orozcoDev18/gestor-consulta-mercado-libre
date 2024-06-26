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
  const get_products_by_category = UseStoreProducts((state) => state.getProductsByCategory)
  const get_seller_info = UseStoreSeller((state) => state.getSellerInfo)
  const loadInfo = async () => {
    const seller_info = await get_seller_info();
    update_products(seller_info?.results);
  }

  useEffect(() => {
    loadInfo();
  }, [])

  console.log(data_seller)
  return (
    <HomeC
      dataSeller={data_seller}
      get_products_by_category={get_products_by_category}
    >
      <TableList rows={products} isLoading={is_loading} />
    </HomeC>
  );
}
