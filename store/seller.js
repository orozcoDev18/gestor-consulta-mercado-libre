import { ApiClient } from '@/app/services/apiClient'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { encrypt_data } from '../app/common/utils'

const apiClient = new ApiClient()

const getSubCategory = async (categories) => {
    const newCategories = [];
    for (let index = 0; index < categories.length; index++) {
        const element = categories[index];
        const sub_category_response = await apiClient.get(`categories/${element?.id}`);
        let subCategories = sub_category_response?.children_categories || [];

        //Anida las subcategorias a cada categoría se comenta el código por temas de rendimiento y no
        //cargar toda la información de tope
        /* if (subCategories.length > 0) {
            subCategories = await getSubCategory(subCategories);
        } */

        newCategories.push({ ...element, subCategories });
    }

    return newCategories;
}

export const UseStoreSeller = create(
    persist(
        (set, get) => ({
            SELLER_ID: 179571326,
            isLoading: false,
            data_seller: {},
            getSellerInfo: async () => {
                const { SELLER_ID, data_seller } = get()
                if (data_seller?.seller) return data_seller

                set({ isLoading: true })
                const sellerData = await apiClient.get(`sites/MLA/search?seller_id=${SELLER_ID} `)
                if (sellerData) {
                    const seller_categories = sellerData?.available_filters?.find((x) => x?.id === 'category')?.values
                    const categories = await getSubCategory(seller_categories)
                    set({
                        data_seller: {
                            ...sellerData,
                            categories: {
                                id: 'category',
                                name: 'Categorías',
                                type: 'dropdown',
                                values: categories
                            },
                            available_filters: sellerData?.available_filters.filter((x) => x.id !== 'category')
                        },
                        isLoading: false
                    })
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