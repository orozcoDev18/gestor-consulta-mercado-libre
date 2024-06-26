import React from 'react'
import '../../globals.css'
import { CategoryList } from '@/app/components/categoryList'
import { TableList } from '@/app/components/table'
import { Typography } from '@mui/material'
import { SkeletonCustom } from '@/app/components/skeleton'

export const HomeC: React.FC<any> = ({ dataSeller, products, get_products_by_category }) => {
    console.log(dataSeller, '🎶🎶🎶')
    const arrayVariants = [
        { variant: 'rectangular', width: '100%', height: 40, sx: {} }
    ]

    return (
        <div className="w-screen h-screen flex flex-col max-h-avail">
            <div className="w-full bg-gray-200 h-16 flex flex-row justify-center items-center">
                <Typography variant='h6' className='flex flex-row content-center items-center justify-between'>
                    CLIENTE {dataSeller?.seller?.nickname || <SkeletonCustom arrayVariant={[{ variant: 'text', width: 100, height: 45, sx: { fontSize: '1rem' } }]} />}
                </Typography>
            </div>
            <div className="w-full h-5/6 max-h-full flex flex-row justify-between">
                <div className='w-15p max-h-avail overflow-y-auto scrollbar-custom p-1'>
                    {dataSeller.categories ?
                        <CategoryList categories={dataSeller?.categories} get_products_by_category={get_products_by_category} />
                        :
                        <SkeletonCustom arrayVariant={arrayVariants.concat([...arrayVariants, ...arrayVariants])} />
                    }
                </div>
                <div className='w-84p bg-white p-2'><TableList rows={products} /></div>
            </div>
        </div>
    )
}

