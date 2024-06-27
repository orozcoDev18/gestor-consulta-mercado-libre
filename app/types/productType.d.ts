type ProductItem = {
    id: string;
    title: string;
    condition: string;
    thumbnail_id: string;
    catalog_product_id: string;
    listing_type_id: string;
    permalink: string;
    buying_mode: string;
    site_id: string;
    category_id: string;
    domain_id: string;
    thumbnail: string;
    currency_id: string;
    order_backend: number;
    price: number;
    original_price: number;
    sale_price: {
        price_id: string;
        amount: number;
        conditions: {
            eligible: boolean;
            context_restrictions: string[];
            start_time: string;
            end_time: string;
        };
        currency_id: string;
        exchange_rate: null;
        payment_method_prices: any[];
        payment_method_type: string;
        regular_amount: number;
        type: string;
        metadata: {
            campaign_end_date: string;
            campaign_id: string;
            discount_meli_amount: number;
            funding_mode: string;
            order_item_price: number;
            promotion_id: string;
            promotion_type: string;
            campaign_discount_percentage: number;
        };
    };
    available_quantity: number;
    official_store_id: number;
    use_thumbnail_id: boolean;
    accepts_mercadopago: boolean;
    shipping: {
        store_pick_up: boolean;
        free_shipping: boolean;
        logistic_type: string;
        mode: string;
        tags: string[];
        benefits: null;
        promise: null;
        shipping_score: number;
    };
    stop_time: string;
    seller: {
        id: number;
        nickname: string;
    };
    attributes: {
        id: string;
        name: string;
        value_id: string | null;
        value_name: string;
        attribute_group_id: string;
        attribute_group_name: string;
        value_struct: null;
        values: {
            id: string | null;
            name: string;
            struct: null;
            source: number;
        }[];
        source: number;
        value_type: string;
    }[];
    installments: {
        quantity: number;
        amount: number;
        rate: number;
        currency_id: string;
    };
    winner_item_id: null;
    catalog_listing: boolean;
    discounts: null;
    promotions: any[];
    differential_pricing: {
        id: number;
    };
    inventory_id: string;
}

type OptionSort = {
    id: string;
    name: string;
}

export type ProductData = {
    rows: ProductItem[];
    isLoading: boolean;
    available_sorts?: OptionSort[];
    get_sort_products: (sort: string) => void;
};