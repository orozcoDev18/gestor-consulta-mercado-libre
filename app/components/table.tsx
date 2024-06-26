'use client';
import * as React from 'react';
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
import { Link } from '@mui/material';

interface Column {
    id: 'id' | 'title' | 'price' | 'permalink' | 'thumbnail';
    label: string;
    minWidth?: number;
    align?: 'right' | 'center' | 'left';
    format?: (value: any) => any;
}

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
        format: (value: any) => <Link href={value}>{value}</Link>
    },
    {
        id: 'thumbnail',
        label: 'Imagen',
        minWidth: 170,
        align: 'center',
        format: (value: any) => < Image src={value} alt={'imagen'} width={80} height={80} className='m-auto' />
    }
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: '#eeeeed',
    color: 'black',
    fontWeight: 'bold',
    fontSize: '1rem',
    borderBottom: `2px solid ${theme.palette.divider}`,
}));

export const TableList: React.FC<any> = ({ rows }) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 650 }} className='overflow-y-auto scrollbar-custom'>
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
                        {rows
                            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row: any) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
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
