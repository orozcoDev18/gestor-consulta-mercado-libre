import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import '../globals.css'
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Tooltip, Box, Button, AccordionDetails, Typography } from '@mui/material';
import { CategoryLink } from '../components/categoryLink'
import { UseStoreLayout } from '../../store/layout'
import { Category, CategoryListProps } from '../types/categoryType';

export const CategoryList: React.FC<CategoryListProps> = ({ Category, HandleClick }) => {
    const openControl = UseStoreLayout((state) => state.controlOpenCategory)
    const updateControl = UseStoreLayout((state) => state.updateOpenCategory)

    return (
        <Box>
            <Box bgcolor={'#6795d6'}>
                <Typography ml={1} className='text-base' textAlign={'left'} color={'#ffff'}>
                    {Category.name}
                </Typography>
            </Box>
            {Category?.values?.map((category, index: number) => (
                <Box key={category.id} >
                    {Category.type === 'dropdown' ?
                        <Box className='p-1'>
                            <Accordion expanded={openControl[category.id]} className='ml-2'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    onClick={() => updateControl(category.id)}
                                    aria-controls={`panel${index}-content`}
                                    id={`panel${index}-header`}
                                    className='font-bold'
                                >
                                    <CategoryLink category={category} />
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box className='h-80p'>
                                        {category?.subCategories?.map((subCategory: Category) => (
                                            <Box className='w-100p p-1 border-1' key={subCategory.id}>
                                                <Tooltip title={subCategory.name}>
                                                    <Button
                                                        onClick={() => HandleClick(subCategory.id)}
                                                        className='w-100p rounded-md text-xs bg-gray-100 hover:bg-gray-300 text-black overflow-hidden whitespace-nowrap text-ellipsis m-0 block'
                                                    >
                                                        {subCategory.name}
                                                    </Button>
                                                </Tooltip>
                                            </Box>
                                        ))}
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                        : <Box className='w-100p pl-1 border-1 p-1' key={category.id}>
                            <Tooltip title={category.name}>
                                <Button
                                    onClick={() => HandleClick(category.id)}
                                    className='w-100p rounded-md text-xs bg-gray-100 hover:bg-gray-300 text-black overflow-hidden whitespace-nowrap text-ellipsis m-0 block'
                                >
                                    {category.name}
                                </Button>
                            </Tooltip>
                        </Box>
                    }
                </Box>
            ))}
        </Box>
    );
}
