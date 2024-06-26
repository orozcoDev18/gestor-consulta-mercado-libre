import { ApiClient } from '@/app/services/apiClient'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { encrypt_data } from '../app/common/utils'

const apiClient = new ApiClient()

export const UseStoreSeller = create(
    persist(
        (set, get) => ({
            SELLER_ID: 179571326,
            data_seller: {},
            getSellerInfo: async () => {
                const { SELLER_ID, data_seller } = get()

                if (data_seller?.seller) return data_seller

                const sellerData = await apiClient.get(`sites/MLA/search?seller_id=${SELLER_ID}`)
                if (sellerData) {
                    const seller_categories = sellerData?.available_filters?.find((x) => x?.id === 'category')?.values
                    const categories = []
                    for (let index = 0; index < seller_categories.length; index++) {
                        const element = seller_categories[index];
                        const sub_categories = await apiClient.get(`categories/${element?.id}`)
                        categories.push({ ...element, subCategories: sub_categories?.children_categories });
                    }
                    set({ data_seller: { ...sellerData, categories } })
                    return data_seller
                }
            }
        }),
        {
            name: encrypt_data('seller_storage'),
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)