export type DataItem = {
    variant?: "rectangular" | "text" | "rounded" | "circular";
    width?: number | string;
    height?: number | string;
    sx?: any;
};


export type arrayVariant = {
    arrayVariant: DataItem[];
};


const data: DataItem[] = [
    {
        variant: "text",
        width: 100,
        height: 45,
        sx: {
            fontSize: "1rem"
        }
    }
];

export default data;