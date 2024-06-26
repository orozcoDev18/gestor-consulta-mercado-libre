/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect } from "react";
import { HomeC } from "../home/components";
import { UseStoreSeller } from '../../store/seller'
import { UseStoreProducts } from '../../store/products'
import { useParams } from "next/navigation";
import { TableList } from "../components/table";

export default function Layout() {
  const { category_id } = useParams();
  const data_seller = UseStoreSeller((state) => state.data_seller)
  const products = UseStoreProducts((state) => state.products)
  const isLoading = UseStoreProducts((state) => state.isLoadingProduct)
  const update_products = UseStoreProducts((state) => state.updateProducts)
  const get_products_by_category = UseStoreProducts((state) => state.getProductsByCategory)

  const loadInfo = async () => {
    const products = await get_products_by_category(category_id);
    update_products(products);
  }

  useEffect(() => {
    loadInfo();
  }, [])

  return (
    <HomeC
      dataSeller={data_seller}
      get_products_by_category={get_products_by_category}
    >
      <TableList rows={products} isLoading={isLoading} />
    </HomeC>
  );
}
