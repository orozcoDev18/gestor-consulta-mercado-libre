import React, { ReactNode } from 'react';
import { Category } from './categoryType';
import { OptionSort } from './productType';

export type typeHomeC = {
    children: ReactNode;
    dataSeller: {
        seller: {
            nickname: string
        }
        categories: Category,
        available_filters: Category[]
        available_sorts: OptionSort[]
    };
    get_products_by_category: (category: string | number) => void;
    get_filter_products: (shipping: string | number) => void;
}
