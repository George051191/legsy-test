import React, { FC, useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useDispatch, useSelector } from '../services/hooks';
import FotoRenderer from './CategoryFotoRenderer';
import getDataThunk from '../thunk/get-data-thunk';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const App:FC = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.all);
  const [columnDefs, setColumnDefs] = useState([
    { field: 'photo',cellRenderer: FotoRenderer, headerName: 'Фото', filter: false },
    { field: 'id', headerName: 'Номенклатура', filter: true },
    { field: 'brand', headerName: 'Бренд', filter: true },
    { field: 'priceU', headerName: 'Цена', filter: true },
    { field: 'График', headerName: 'График', filter: false },
  ]);
  useEffect(() => {
    dispatch(getDataThunk());
  },[]);
  return (
    <div>
      <div className='ag-theme-alpine' style={{ width: '100vw', height: '100vh' }}>
        <AgGridReact
          rowData={categories} // Row Data for Rows
          columnDefs={columnDefs} 
          rowSelection='multiple' />
      </div>
    </div>
  );
};

export default App;
