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
            getProductsByCategory: async (category_id) => {
                const { SELLER_ID } = get()
                set({ isLoadingProduct: true })
                const data = await apiClient.get(`sites/MLA/search?seller_id=${SELLER_ID}&category=${category_id}`)
                set({ products: data?.results })
                set({ isLoadingProduct: false })
                return data?.results
            }
        }),
        {
            name: encrypt_data('products_storage'),
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)