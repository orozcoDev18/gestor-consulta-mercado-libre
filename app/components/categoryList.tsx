import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import '../globals.css'
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Tooltip, Box, Button } from '@mui/material';

export const CategoryList: React.FC<any> = ({ categories, get_products_by_category }) => {
    return (
        <Box>
            {categories?.map((x: any, i: number) => (
                <Accordion key={i}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        className='font-bold'
                    >
                        {x?.name}
                    </AccordionSummary>
                    <Box className='h-80p'>
                        {x?.subCategories?.map((y: any, z: number) => (
                            <Box className='w-100p pl-1 ' key={z} >
                                <Tooltip title={`${y?.name}`}>
                                    <Button onClick={() => get_products_by_category(y.id)} className='w-100p rounded-none bg-gray-100 hover:bg-gray-300 text-black overflow-hidden whitespace-nowrap text-ellipsis m-0 '>{y?.name}</Button>
                                </Tooltip>
                            </Box>
                        ))}
                    </Box>
                </Accordion>
            ))}
        </Box>
    );
}
