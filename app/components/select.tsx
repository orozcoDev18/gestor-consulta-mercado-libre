import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Typography } from '@mui/material';

export const SelectCustom: React.FC<any> = ({ data, label, handleClick }) => {
    const [option, setOption] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setOption(event.target.value as string);
    };

    return (
        <Box className='w-100p flex flex-row items-center justify-around'>
            <Typography className='w-70p font-bold text-white' variant='subtitle1' >{label}:</Typography>
            <FormControl fullWidth>
                <Select
                    className='rounded bg-white'
                    size='small'
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={option}
                    label={label}
                    onChange={handleChange}
                    defaultValue={'0'}
                >
                    {data?.map((x: any, index: number) => (
                        <MenuItem key={index} value={x?.id} onClick={() => handleClick(x)}>{x?.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
