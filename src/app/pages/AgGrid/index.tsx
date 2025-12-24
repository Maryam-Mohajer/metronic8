import { AgGridReact } from 'ag-grid-react'
import { ColDef, ModuleRegistry } from 'ag-grid-community'
import { ClientSideRowModelModule } from 'ag-grid-community'
import { useMemo, useState, useCallback } from 'react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

// 🔥 ثبت ماژول‌ها (ضروری)
ModuleRegistry.registerModules([ClientSideRowModelModule])

interface Transaction {
  id: number
  date: string
  description: string
  type: 'پرداخت' | 'دریافت'
  amount: number
}

const AccountingGrid = () => {
  const [rowData, setRowData] = useState<Transaction[]>([
    { id: 1, date: '1403/09/01', description: 'فروش محصول A', type: 'دریافت', amount: 120000 },
    { id: 2, date: '1403/09/02', description: 'خرید مواد اولیه', type: 'پرداخت', amount: 80000 },
    { id: 3, date: '1403/09/05', description: 'فروش محصول B', type: 'دریافت', amount: 95000 },
    { id: 4, date: '1403/09/06', description: 'پرداخت حقوق', type: 'پرداخت', amount: 40000 },
  ])

  const handleDelete = useCallback((id: number) => {
    if (window.confirm('آیا از حذف این تراکنش مطمئن هستید؟')) {
      setRowData(prev => prev.filter(row => row.id !== id))
    }
  }, [])

  const columnDefs = useMemo<ColDef[]>(() => [
    { field: 'id', headerName: 'شناسه', width: 80, sortable: true },
    { field: 'date', headerName: 'تاریخ', width: 120, sortable: true, filter: true },
    { field: 'description', headerName: 'شرح', flex: 1, filter: true },
    { 
      field: 'type', 
      headerName: 'نوع', 
      width: 120, 
      sortable: true, 
      filter: true,
      cellStyle: params => ({
        color: params.value === 'پرداخت' ? 'red' : 'green',
        fontWeight: 'bold'
      })
    },
    { 
      field: 'amount', 
      headerName: 'مبلغ', 
      width: 120, 
      sortable: true,
      valueFormatter: params => `${params.value.toLocaleString()} ریال`
    },
   {
  headerName: 'عملیات',
  width: 120,
  pinned: 'right',
  cellRendererFramework: params => {
    const handleClick = () => {
      if (window.confirm('آیا از حذف این تراکنش مطمئن هستید؟')) {
        params.api.applyTransaction({ remove: [params.data] });
      }
    }

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button className="btn btn-sm btn-danger" onClick={handleClick}>
          حذف
        </button>
      </div>
    )
  }
}
  ], [handleDelete])

  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        enableRtl
        defaultColDef={{
          resizable: true,
          sortable: true,
          filter: true,
        }}
        pagination={true}
        paginationPageSize={5}
      />
    </div>
  )
}

export default AccountingGrid
