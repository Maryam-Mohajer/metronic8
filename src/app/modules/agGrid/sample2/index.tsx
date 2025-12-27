import React, { useMemo, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { ColDef } from 'ag-grid-community'

const AccountingGridSample2 = () => {
  const rowSelection = useMemo(() => ({
    mode: 'multiRow' as const,
    headerCheckboxSelection: true, // checkbox در header
    checkboxSelection: true,       // checkbox در هر ردیف
  }), [])

  const [rowData] = useState([
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true, month: 'June' },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false, month: 'October' },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false, month: 'August' },
    { make: 'Mercedes', model: 'EQA', price: 48890, electric: true, month: 'February' },
    { make: 'Fiat', model: '500', price: 15774, electric: false, month: 'January' },
    { make: 'Nissan', model: 'Juke', price: 20675, electric: false, month: 'March' },
    { make: 'Vauxhall', model: 'Corsa', price: 18460, electric: false, month: 'July' },
    { make: 'Volvo', model: 'EX30', price: 33795, electric: true, month: 'September' },
  ])

  const [columnDefs] = useState<ColDef<any>[]>([
    {
      field: 'make',
      editable: true,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: [
          "Tesla",
          "Ford",
          "Toyota",
          "Mercedes",
          "Fiat",
          "Nissan",
          "Vauxhall",
          "Volvo",
          "Jaguar",
        ],
      },
    },
    {
      field: 'model',
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    {
      field: 'price',
      filter: 'agNumberColumnFilter',
      floatingFilter: true,
    },
    {
      field: 'electric',
      filter: 'agSetColumnFilter',
      floatingFilter: true,
    },
    {
      field: 'month',
      comparator: (a, b) => {
        const months = [
          'January','February','March','April','May','June','July','August',
          'September','October','November','December'
        ]
        return months.indexOf(a) - months.indexOf(b)
      },
      filter: 'agSetColumnFilter',
      floatingFilter: true,
    },
  ])

  const defaultColDef = useMemo(() => ({
    resizable: true,
    sortable: true,
  }), [])

  return (
    <div className='ag-theme-alpine' style={{ height: 500, width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection={rowSelection}
        pagination
        paginationPageSize={10}
        enableRtl
      />
    </div>
  )
}

export default AccountingGridSample2
