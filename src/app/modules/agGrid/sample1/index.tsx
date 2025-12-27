import {AgGridReact} from 'ag-grid-react'
import {ColDef, themeQuartz} from 'ag-grid-community'
import {useMemo, useState, useCallback} from 'react'

interface Transaction {
  id: number
  date: string
  description: string
  type: 'پرداخت' | 'دریافت'
  amount: number
}

const AccountingGridSample1 = () => {
  const [rowData, setRowData] = useState<Transaction[]>([
    {id: 1, date: '1403/09/01', description: 'فروش محصول A', type: 'دریافت', amount: 120000},
    {id: 2, date: '1403/09/02', description: 'خرید مواد اولیه', type: 'پرداخت', amount: 80000},
    {id: 3, date: '1403/09/05', description: 'فروش محصول B', type: 'دریافت', amount: 95000},
    {id: 4, date: '1403/09/06', description: 'پرداخت حقوق', type: 'پرداخت', amount: 40000},
    {id: 5, date: '1403/09/06', description: 'پرداخت حقوق', type: 'پرداخت', amount: 40000},
    {id: 6, date: '1403/09/06', description: 'پرداخت حقوق', type: 'پرداخت', amount: 40000},
    {id: 7, date: '1403/09/06', description: 'پرداخت حقوق', type: 'پرداخت', amount: 40000},
    {id: 8, date: '1403/09/06', description: 'پرداخت حقوق', type: 'پرداخت', amount: 40000},
  ])

  const handleDelete = useCallback((id: number) => {
    if (window.confirm('آیا از حذف این تراکنش مطمئن هستید؟')) {
      setRowData((prev) => prev.filter((row) => row.id !== id))
    }
  }, [])

  const columnDefs = useMemo<ColDef[]>(
    () => [
      {field: 'id', headerName: 'شناسه', width: 80, sortable: true},
      {field: 'date', headerName: 'تاریخ', width: 120, sortable: true, filter: true},
      {
        field: 'description',
        headerName: 'شرح',
        flex: 1,
        floatingFilter: true,
        editable: true,
      },
      {
        field: 'type',
        headerName: 'نوع',
        width: 120,
        sortable: true,
        filter: true,
        cellStyle: (params) => ({
          color: params.value === 'پرداخت' ? 'red' : 'green',
          fontWeight: 'bold',
        }),
        editable: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: ['پرداخت', 'دریافت'],
        },
      },
      {
        field: 'amount',
        headerName: 'مبلغ',
        width: 120,
        sortable: true,
        valueFormatter: (params) => `${params.value.toLocaleString()} ریال`,
        filter: "agNumberColumnFilter"
      },
      {
        headerName: 'عملیات',
        width: 120,
        pinned: 'left',
        cellRenderer: (params: any) => {
          const handleClick = () => {
            if (window.confirm('آیا از حذف این تراکنش مطمئن هستید؟')) {
              setRowData((prev) => prev.filter((row) => row.id !== params.data.id))
            }
          }

          return (
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <button className='btn btn-sm btn-danger' onClick={handleClick}>
                حذف
              </button>
            </div>
          )
        },
      },
    ],
    [handleDelete]
  )

  const rowSelection = useMemo(
    () => ({
      mode: 'multiRow' as const,
      headerCheckbox: false,
    }),
    []
  )

  const myTheme = themeQuartz.withParams({
    /* Low spacing = very compact */
    spacing: 2,
    /* Changes the colour of the grid text */
    foregroundColor: 'rgb(14, 68, 145)',
    /* Changes the colour of the grid background */
    backgroundColor: 'rgb(241, 247, 255)',
    /* Changes the header colour of the top row */
    headerBackgroundColor: 'rgba(114, 116, 117, 1)',
    /* Changes the hover colour of the row*/
    rowHoverColor: 'rgb(216, 226, 255)',
});

  return (
    <div  className='ag-theme-alpine' style={{height: 500, width: '100%'}}>
      <AgGridReact
      theme={myTheme}
        rowData={rowData}
        columnDefs={columnDefs}
        rowSelection={rowSelection}
        enableRtl
        defaultColDef={{
          resizable: true,
          sortable: true,
          filter: true,
        }}
        pagination={true}
        paginationPageSize={5}
        paginationPageSizeSelector ={[5,10,15]}
      />
    </div>
  )
}

export default AccountingGridSample1
