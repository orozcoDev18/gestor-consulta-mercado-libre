import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { encrypt_data } from '../app/common/utils'


export const UseStoreLayout = create(
    persist(
        (set, get) => ({
            controlOpenCategory: {},
            updateOpenCategory: (category_id) => {
                const { controlOpenCategory } = get()
                const controlOpen = {}
                controlOpen[category_id] = !controlOpenCategory[category_id]
                set({ controlOpenCategory: { ...controlOpenCategory, ...controlOpen } })
            },
        }),
        {
            name: encrypt_data('layout_storage'),
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)