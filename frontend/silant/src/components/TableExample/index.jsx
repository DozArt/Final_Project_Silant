import React, { useContext, useState, useEffect } from 'react';
import { useTable, useFilters, useSortBy } from 'react-table'
import axios from 'axios';
import s from './search.module.css'
import { observer } from 'mobx-react-lite'
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '@/main'
import ItemModel from '../searchMaintenance/itemModel';
import Menu from '../menu';
import TitlePage from '../titlePage';
import InputSample from '../inputText';



const TableExample = ({ columns, data }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({ columns, data }, useFilters, useSortBy)

    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th>
                                <div {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render('Header')}</div>
                                <span>
                                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                </span>
                                <div>{column.canFilter ? column.render('Filter') : null}</div>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => (
                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            ))}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default TableExample;