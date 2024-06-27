import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { arrayVariant, DataItem } from '../types/skeletonTypes';

export const SkeletonCustom: React.FC<arrayVariant> = ({ arrayVariant }) => {
    return (
        <Stack spacing={1} ml={1}>
            {arrayVariant.map((x, i: number) => (
                <Skeleton key={i} variant={x?.variant} width={x?.width} height={x?.height} sx={{ ...x?.sx }} />
            ))}
        </Stack>
    );
}
