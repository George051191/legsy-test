/* eslint-disable quote-props */
import React, {
  FC, useEffect, useMemo, useState,
} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import { ColumnSparklineOptions, SideBarDef } from '@ag-grid-community/core';

import { useDispatch, useSelector } from '../services/hooks';
import FotoRenderer from './CategoryFotoRenderer';
import getDataThunk from '../thunk/get-data-thunk';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const App:FC = () => {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.all);
  const [columnDefs, setColumnDefs] = useState([
    {
      field: 'photo', cellRenderer: FotoRenderer, sortable: true, headerName: 'Фото', filter: false, checkboxSelection: true, width: 100, floatingFilter: true,
    },
    {
      field: 'id', headerName: 'Номенклатура', sortable: true, filter: true, cellClass: 'border', floatingFilter: true,
    },
    {
      field: 'brand', headerName: 'Бренд', sortable: true, filter: true, width: 400, floatingFilter: true,
    },
    {
      field: 'priceU', headerName: 'Цена', sortable: true, width: 90, filter: true, floatingFilter: true,
    },
    {
      field: 'mockData',
      sortable: true,
      cellRenderer: 'agSparklineCellRenderer',
      headerName: 'График заказов',
      filter: false,
      floatingFilter: true,
      cellRendererParams: {
        sparklineOptions: {
          type: 'column',
          xKey: 'date',
          yKey: 'amount',
          fill: '#5c46c2',
          highlightStyle: {
            stroke: '#484ac2',
          },
        } as ColumnSparklineOptions,
      },
    },
  ]);
  const icons = useMemo<{
    [key: string]: string;
  }>(() => ({
    'settings': '<i class="ag-icon-custom"/>',
  }), []);
  const sideBar = useMemo<
  SideBarDef | string | string[] | boolean | null
  >(() => ({
    toolPanels: [
      {
        id: 'columns',
        labelDefault: 'Столбцы',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
      },
      {
        id: 'filters',
        labelDefault: 'Фильтры',
        labelKey: 'filters',
        iconKey: 'filter',
        toolPanel: 'agFiltersToolPanel',
      },
      {
        id: 'settings',
        labelDefault: 'Настройки',
        labelKey: 'settings',
        iconKey: 'settings',
        toolPanel: 'agFiltersToolPanel',
      },
    ],
  }), []);

  useEffect(() => {
    dispatch(getDataThunk());
  }, [dispatch]);
  return (
    <div>
      <div className='ag-theme-alpine' style={{ width: '100%', height: '100vh' }}>
        <AgGridReact
          rowData={categories}
          columnDefs={columnDefs}
          icons={icons}
          sideBar={sideBar}
          rowSelection='multiple' />
      </div>
    </div>
  );
};

export default App;
