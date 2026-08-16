import React from 'react';

const TableWidget = ({ title, columns, data, viewAllText, greenTotal = false }) => (
  <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800/80 rounded-lg shadow-sm p-4 flex flex-col transition-colors">
    <div className="text-sm font-bold text-blue-900 dark:text-slate-250 tracking-wide uppercase mb-4">{title}</div>
    <div className="flex-1 overflow-x-auto">
      <table className="w-full text-left text-[11px]">
        <thead>
          <tr className="border-b border-gray-200 dark:border-slate-800 text-gray-800 dark:text-slate-300 font-bold">
            {columns.map((col, idx) => (
              <th key={idx} className={`pb-2 ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : ''}`}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr key={rowIdx} className="border-b border-gray-50 dark:border-slate-800/40 last:border-0 hover:bg-gray-50 dark:hover:bg-slate-800/30 text-gray-700 dark:text-slate-350 font-medium">
              {columns.map((col, colIdx) => (
                <td key={colIdx} className={`py-2 ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : ''} ${row[col.key] === row.totalValue && greenTotal ? 'text-green-600 dark:text-green-400 font-bold' : ''}`}>
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="mt-3 text-center">
      <button className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline">{viewAllText}</button>
    </div>
  </div>
);

export const DashboardTables = () => {
  const lowStockData = [
    { id: '1.', name: 'ITEM X', stock: '12', reorder: '50' },
    { id: '2.', name: 'ITEM Y', stock: '8', reorder: '25' },
    { id: '3.', name: 'ITEM Z', stock: '5', reorder: '20' },
    { id: '4.', name: 'ITEM P', stock: '3', reorder: '15' },
    { id: '5.', name: 'ITEM Q', stock: '2', reorder: '10' },
  ];
  
  const expiryData = [
    { id: '1.', name: 'ITEM M', date: '31-05-2024', qty: '25' },
    { id: '2.', name: 'ITEM N', date: '15-06-2024', qty: '18' },
    { id: '3.', name: 'ITEM O', date: '20-06-2024', qty: '30' },
    { id: '4.', name: 'ITEM R', date: '30-06-2024', qty: '22' },
    { id: '5.', name: 'ITEM S', date: '05-07-2024', qty: '15' },
  ];

  const topSellingData = [
    { id: '1.', name: 'ITEM A', qty: '1250', amount: '₹ 18,75,230.00' },
    { id: '2.', name: 'ITEM B', qty: '980', amount: '₹ 14,20,450.00' },
    { id: '3.', name: 'ITEM C', qty: '875', amount: '₹ 12,45,320.00' },
    { id: '4.', name: 'ITEM D', qty: '620', amount: '₹ 8,75,120.00' },
    { id: '5.', name: 'ITEM E', qty: '540', amount: '₹ 6,25,430.00' },
  ];

  const recentActivities = [
    { activity: 'Sale Invoice Created', user: 'ADMIN', time: '11:20 AM' },
    { activity: 'Purchase Invoice', user: 'ADMIN', time: '11:10 AM' },
    { activity: 'Payment Received', user: 'ADMIN', time: '10:55 AM' },
    { activity: 'Receipt Entry', user: 'ADMIN', time: '10:40 AM' },
    { activity: 'Stock Transfer', user: 'ADMIN', time: '10:30 AM' },
  ];

  const bankBalanceData = [
    { particulars: 'Cash', amount: '₹ 1,25,430.00' },
    { particulars: 'HDFC Bank A/c', amount: '₹ 8,75,230.00' },
    { particulars: 'ICICI Bank A/c', amount: '₹ 6,25,430.00' },
    { particulars: 'SBI Bank A/c', amount: '₹ 2,35,120.00' },
    { particulars: 'Total Balance', amount: '₹ 18,61,210.00', totalValue: '₹ 18,61,210.00' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <TableWidget 
        title="Low Stock Items" 
        columns={[
          { label: '', key: 'id', align: 'left' },
          { label: 'Item Name', key: 'name', align: 'left' },
          { label: 'Stock', key: 'stock', align: 'center' },
          { label: 'Reorder Level', key: 'reorder', align: 'center' }
        ]} 
        data={lowStockData} 
        viewAllText="View All Low Stock Items" 
      />
      
      <TableWidget 
        title="Expiry Items" 
        columns={[
          { label: '', key: 'id', align: 'left' },
          { label: 'Item Name', key: 'name', align: 'left' },
          { label: 'Exp. Date', key: 'date', align: 'center' },
          { label: 'Qty', key: 'qty', align: 'center' }
        ]} 
        data={expiryData} 
        viewAllText="View All Expiry Items" 
      />

      <TableWidget 
        title="Top Selling Items" 
        columns={[
          { label: '', key: 'id', align: 'left' },
          { label: 'Item Name', key: 'name', align: 'left' },
          { label: 'Qty', key: 'qty', align: 'center' },
          { label: 'Amount', key: 'amount', align: 'right' }
        ]} 
        data={topSellingData} 
        viewAllText="View All Top Selling Items" 
      />

      <TableWidget 
        title="Recent Activities" 
        columns={[
          { label: 'Activity', key: 'activity', align: 'left' },
          { label: 'User', key: 'user', align: 'center' },
          { label: 'Time', key: 'time', align: 'right' }
        ]} 
        data={recentActivities} 
        viewAllText="View All Activities" 
      />

      <TableWidget 
        title="Cash & Bank Balance" 
        columns={[
          { label: 'Particulars', key: 'particulars', align: 'left' },
          { label: 'Amount', key: 'amount', align: 'right' }
        ]} 
        data={bankBalanceData} 
        viewAllText="View All Accounts"
        greenTotal={true}
      />
    </div>
  );
};
