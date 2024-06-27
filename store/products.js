import { ApiClient } from '@/app/services/apiClient'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { encrypt_data } from '../app/common/utils'

const apiClient = new ApiClient()

export const UseStoreProducts = create(
    persist(
        (set, get) => ({
            SELLER_ID: 179571326,
            products: [],
            isLoadingProduct: false,
            updateProducts: (products) => {
                set({ products })
            },
            setLoadingProduct: (value) => set({ isLoadingProduct: value }),
            getProductsByCategory: async (category_id) => {
                const { SELLER_ID, setLoadingProduct } = get()
                setLoadingProduct(true)
                const data = await apiClient.get(`sites/MLA/search?seller_id=${SELLER_ID}&category=${category_id}`)
                set({ products: data?.results })
                setLoadingProduct(false)
                return data?.results
            },
            getFilterProducts: async (shipping) => {
                const { SELLER_ID, setLoadingProduct } = get()
                setLoadingProduct(true)
                const data = await apiClient.get(`sites/MLA/search?seller_id=${SELLER_ID}&shipping=${shipping}`)
                set({ products: data?.results })
                setLoadingProduct(false)
                return data?.results
            },
            getSortProducts: async (sort) => {
                const { SELLER_ID, setLoadingProduct } = get()
                setLoadingProduct(true)
                const data = await apiClient.get(`sites/MLA/search?seller_id=${SELLER_ID}&sort=${sort?.id}`)
                set({ products: data?.results })
                setLoadingProduct(false)
                return data?.results
            },
        }),
        {
            name: encrypt_data('products_storage'),
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)