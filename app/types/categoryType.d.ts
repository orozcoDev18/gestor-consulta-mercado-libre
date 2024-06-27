export type SubCategory = {
    id: string;
    name: string;
    subCategories: any;
}

export type Category = {
    id: string;
    name: string;
    values?: SubCategory[];
    type: string;
    total_items_in_this_category?: number;
}

export type CategoryListProps = {
    Category: Category;
    HandleClick: (param: string | number) => void;
}
