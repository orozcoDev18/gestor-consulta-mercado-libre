'use client';
import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { Box, InputAdornment, Link, TextField, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { ProductData, ProductItem } from '../types/productType';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { SelectCustom } from './select';

interface Column {
    id: 'id' | 'title' | 'price' | 'permalink' | 'thumbnail';
    label: string;
    minWidth?: number;
    align?: 'right' | 'center' | 'left';
    format?: ((value: unknown | string | number) => string | null) | any
}

const escapeRegExp = (value: any) => value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

const columns: readonly Column[] = [
    { id: 'id', label: 'Producto Id', minWidth: 170, align: 'center' },
    { id: 'title', label: 'Nombre producto', minWidth: 100, align: 'center' },
    {
        id: 'price',
        label: 'Precio',
        minWidth: 170,
        align: 'center',
        format: (value: number) => `$ ${value.toLocaleString('en-US')}`,
    },
    {
        id: 'permalink',
        label: 'Mercado enlace',
        minWidth: 170,
        align: 'center',
        format: (value: string) => <Link href={value} target='blank'>{value}</Link>
    },
    {
        id: 'thumbnail',
        label: 'Imagen',
        minWidth: 170,
        align: 'center',
        format: (value: string) => < Image src={value} alt={'imagen'} width={80} height={80} className='m-auto' />
    }
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: '#E3EDFB',
    color: 'black',
    fontWeight: 'bold',
    fontSize: '1rem',
    borderBottom: `2px solid ${theme.palette.divider}`,
}));

export const TableList: React.FC<ProductData> = ({ rows: data, isLoading, available_sorts, get_sort_products }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchText, setSearchText] = useState('');
    const [rows, setRows] = useState<ProductItem[]>([]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const requestSearch = (searchValue: string) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
        const filteredRows = data.filter((row: any) => {
            // eslint-disable-next-line array-callback-return
            return Object.keys(row).some((field: any) => {
                if (row[field] !== null) {
                    return searchRegex.test(row[field].toString());
                }
            });
        });
        setRows(filteredRows);
    };

    useEffect(() => {
        setRows(data)
    }, [data])

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Box bgcolor={'#6795D6'} className='w-full flex flex-row items-center justify-between  p-2'>
                <Box className='w-25p flex flex-row justify-around items-center'>
                    <Typography variant='subtitle1' className='font-bold text-white'>BUSCAR: </Typography>
                    <TextField
                        className='bg-white rounded'
                        value={searchText}
                        onChange={({ target }) => requestSearch(target.value)}
                        size='small'
                        InputProps={{
                            endAdornment: (<InputAdornment position='end'>
                                <SearchOffIcon className='cursor-pointer' onClick={() => requestSearch('')} />
                            </InputAdornment>)
                        }}
                    />
                </Box>
                <Box className={'w-25p'}>
                    <SelectCustom data={available_sorts} label={'Ordenar por'} handleClick={get_sort_products} />
                </Box>
            </Box>
            <TableContainer sx={{ maxHeight: 380 }} className='overflow-y-auto scrollbar-custom'>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ? <TableRow hover role="checkbox" tabIndex={-1}>
                            <TableCell align={'center'} colSpan={5}><LinearProgress /></TableCell>
                        </TableRow>
                            : !rows?.length ? <TableRow hover role="checkbox" tabIndex={-1}>
                                <TableCell align={'center'} colSpan={5}> <Typography variant='h6'>No hay productos para mostrar</Typography></TableCell>
                            </TableRow>
                                : rows
                                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row: any) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={'center'}>
                                                            {column.format
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                labelRowsPerPage="Filas por página"
                rowsPerPageOptions={[25, 100]}
                component="div"
                count={rows?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
