import React from 'react'
import '../../globals.css'
import { CategoryList } from '@/app/components/categoryList'
import { Box, Typography } from '@mui/material'
import { SkeletonCustom } from '@/app/components/skeleton'
import { typeHomeC } from '@/app/types/homeCType'
import { DataItem } from '@/app/types/skeletonTypes'

export const HomeC: React.FC<typeHomeC> = ({ children, dataSeller, get_products_by_category, get_filter_products }) => {
    const arrayVariants: DataItem[] = [
        { variant: 'rectangular', width: '100%', height: 40, sx: {} }
    ]

    return (
        <div className="w-screen h-screen flex flex-col max-h-avail">
            <div className="w-full bg-yellow-400 h-16 flex flex-row justify-center items-center shadow-lg mb-2">
                <Typography variant='h5' className='text-blue-800 flex flex-row content-center font-bold items-center justify-between'>
                    {dataSeller?.seller?.nickname || <SkeletonCustom arrayVariant={[{ variant: 'text', width: 100, height: 45, sx: { fontSize: '1rem' } }]} />}
                </Typography>
            </div>
            <div className="w-full h-5/6 max-h-full flex flex-row justify-between">
                <div className='w-20p max-h-avail overflow-y-auto scrollbar-custom p-1'>
                    {dataSeller.categories ?
                        <Box>
                            <CategoryList Category={dataSeller?.categories} HandleClick={get_products_by_category} />
                            {dataSeller?.available_filters?.map((filter, idx) => (
                                <Box key={idx}>
                                    <CategoryList Category={filter} HandleClick={get_filter_products} />
                                </Box>
                            ))}
                        </Box>
                        :
                        <SkeletonCustom arrayVariant={arrayVariants.concat([...arrayVariants, ...arrayVariants])} />
                    }
                </div>
                <div className='w-79p bg-white p-2'>
                    {children}
                </div>
            </div>
        </div>
    )
}

