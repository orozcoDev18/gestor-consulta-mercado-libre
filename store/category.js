import { create } from 'zustand'
import { ApiClient } from '@/app/services/apiClient'
import { persist, createJSONStorage } from 'zustand/middleware'
import { encrypt_data } from '../app/common/utils'

const apiClient = new ApiClient()

export const UseStoreCategory = create(
    persist(
        (set, get) => ({
            controlOpenCategory: {},
            updateOpenCategory: (category_id) => {
                const { controlOpenCategory } = get()
                const controlOpen = {}
                controlOpen[category_id] = !controlOpenCategory[category_id]
                set({ controlOpenCategory: { ...controlOpenCategory, ...controlOpen } })
            }
        }),
        {
            name: encrypt_data('category_storage'),
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)