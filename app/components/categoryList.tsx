import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import '../globals.css'
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Tooltip, Box, Button, AccordionDetails } from '@mui/material';
import { CategoryLink } from '../components/categoryLink'
import { UseStoreLayout } from '../../store/layout'

export const CategoryList: React.FC<any> = ({ categories, get_products_by_category }) => {

    const openControl = UseStoreLayout((state) => state.controlOpenCategory)
    const updateControl = UseStoreLayout((state) => state.updateOpenCategory)

    return (
        <Box>
            {categories?.map((category: any, index: number) => (
                <Accordion key={category.id} expanded={openControl[category.id]}>
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
                            {category?.subCategories?.map((subCategory: any) => (
                                <Box className='w-100p pl-1' key={subCategory.id}>
                                    <Tooltip title={subCategory.name}>
                                        <Button
                                            onClick={() => get_products_by_category(subCategory.id)}
                                            className='w-100p rounded-none bg-gray-100 hover:bg-gray-300 text-black overflow-hidden whitespace-nowrap text-ellipsis m-0 block'
                                        >
                                            {subCategory.name}
                                        </Button>
                                    </Tooltip>
                                </Box>
                            ))}
                        </Box>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
}
