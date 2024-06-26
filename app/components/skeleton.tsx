import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

type props = {
    arrayVariant: Array<any>
}

export const SkeletonCustom: React.FC<props> = ({ arrayVariant }) => {
    return (
        <Stack spacing={1} ml={1}>
            {arrayVariant.map((x: any, i) => (
                <Skeleton key={i} variant={x?.variant} width={x?.width} height={x?.height} sx={{ ...x?.sx }} />
            ))}
        </Stack>
    );
}
