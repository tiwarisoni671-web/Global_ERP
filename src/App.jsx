import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ComingSoon from './pages/ComingSoon';
import CustomerMaster from './pages/customers/CustomerMaster';
import BasicInfo from './pages/suppliers/BasicInfo';
import ContactAddress from './pages/suppliers/ContactAddress';
import TaxFinancial from './pages/suppliers/TaxFinancial';
import TransactionHistory from './pages/suppliers/TransactionHistory';
import Utilities from './pages/suppliers/Utilities';
import EmployeeProfile from './pages/employees/EmployeeProfile';
import JobInfo from './pages/employees/JobInfo';
import FinancialDocs from './pages/employees/FinancialDocs';
import EmployeeRecords from './pages/employees/EmployeeRecords';
import EmployeeUtilities from './pages/employees/Utilities';
import PriceList from './pages/pricelist/PriceList';
import PricingRules from './pages/pricelist/PricingRules';
import Mapping from './pages/pricelist/Mapping';
import PriceListUtilities from './pages/pricelist/Utilities';
import TaxConfig from './pages/tax/TaxConfig';
import TaxMapping from './pages/tax/TaxMapping';
import TaxUtilities from './pages/tax/TaxUtilities';
import CompanyProfile from './pages/company/CompanyProfile';
import TaxLegal from './pages/company/TaxLegal';
import BusinessSettings from './pages/company/BusinessSettings';
import BankStructure from './pages/company/BankStructure';
import CompanyStatus from './pages/company/CompanyStatus';
import BranchInfo from './pages/branch/BranchInfo';
import BranchManagement from './pages/branch/BranchManagement';
import BranchData from './pages/branch/BranchData';
import BranchUtilities from './pages/branch/BranchUtilities';
import DepartmentList from './pages/department/DepartmentList';
import DepartmentReportsStatus from './pages/department/DepartmentReportsStatus';
import DesignationList from './pages/designation/DesignationList';
import DesignationSalaryEmployees from './pages/designation/DesignationSalaryEmployees';
import DesignationUtilities from './pages/designation/DesignationUtilities';
import ReceiptList from './pages/receipts/ReceiptList';
import NewReceipt from './pages/receipts/NewReceipt';
import PaymentList from './pages/payments/PaymentList';
import NewPayment from './pages/payments/NewPayment';
import BankReceiptList from './pages/bank-receipts/BankReceiptList';
import NewBankReceipt from './pages/bank-receipts/NewBankReceipt';
import BankPaymentList from './pages/bank-payments/BankPaymentList';
import NewBankPayment from './pages/bank-payments/NewBankPayment';
import ContraList from './pages/contra/ContraList';
import NewContra from './pages/contra/NewContra';
import AddProduct from './pages/products/AddProduct';
import Brand from './pages/products/Brand';
import Category from './pages/products/Category';
import Unit from './pages/products/Unit';
import ProductList from './pages/products/ProductList';
import AddAdjustment from './pages/products/AddAdjustment';
import AdjustmentList from './pages/products/AdjustmentList';
import StockCount from './pages/products/StockCount';
import AddPurchase from './pages/purchases/AddPurchase';
import PurchaseList from './pages/purchases/PurchaseList';
import ImportPurchaseCSV from './pages/purchases/ImportPurchaseCSV';
import PurchaseReturn from './pages/purchases/PurchaseReturn';
import AddSale from './pages/sales/AddSale';
import SaleList from './pages/sales/SaleList';
import POS from './pages/sales/POS';
import PackingSlipList from './pages/sales/PackingSlipList';
import ChallanList from './pages/sales/ChallanList';
import DriverList from './pages/sales/DriverList';
import GiftCardList from './pages/sales/GiftCardList';
import CouponList from './pages/sales/CouponList';
import CourierList from './pages/sales/CourierList';
import SaleReturn from './pages/sales/SaleReturn';
import SaleExchangeList from './pages/sales/SaleExchangeList';
import JournalList from './pages/journal/JournalList';
import NewJournal from './pages/journal/NewJournal';
import StockEntryList from './pages/stock-entry/StockEntryList';
import NewStockEntry from './pages/stock-entry/NewStockEntry';
import TransferList from './pages/stock-transfer/TransferList';
import NewTransfer from './pages/stock-transfer/NewTransfer';
import DebitNoteList from './pages/debit-note/DebitNoteList';
import NewDebitNote from './pages/debit-note/NewDebitNote';
import CreditNoteList from './pages/credit-note/CreditNoteList';
import NewCreditNote from './pages/credit-note/NewCreditNote';
import LedgerVoucherReports from './pages/reports/LedgerVoucherReports';
import FinancialReports from './pages/reports/FinancialReports';
import AnalysisReports from './pages/reports/AnalysisReports';
import StockLedgerReports from './pages/reports/StockLedgerReports';
import ProductReports from './pages/reports/ProductReports';
import ControlReports from './pages/reports/ControlReports';
import SalesSummaryReports from './pages/reports/SalesSummaryReports';
import SalesAnalysisReports from './pages/reports/SalesAnalysisReports';
import SalesFinancialReports from './pages/reports/SalesFinancialReports';
import TopPerformanceReports from './pages/reports/TopPerformanceReports';
import PurchaseSummaryReports from './pages/reports/PurchaseSummaryReports';
import PurchaseAnalysisReports from './pages/reports/PurchaseAnalysisReports';
import PurchaseFinancialReports from './pages/reports/PurchaseFinancialReports';
import PurchasePerformanceReports from './pages/reports/PurchasePerformanceReports';
import DayBook from './pages/day-book/DayBook';
import ManagementDashboard from './pages/reports/mis/ManagementDashboard';
import PerformanceAnalysis from './pages/reports/mis/PerformanceAnalysis';
import BusinessAnalysis from './pages/reports/mis/BusinessAnalysis';
import KpiReports from './pages/reports/mis/KpiReports';
import GstSales from './pages/reports/gst/GstSales';
import GstPurchase from './pages/reports/gst/GstPurchase';
import TaxAnalysis from './pages/reports/gst/TaxAnalysis';
import GstReconciliation from './pages/reports/gst/Reconciliation';
import TdsSales from './pages/reports/tds/TdsSales';
import TdsPurchase from './pages/reports/tds/TdsPurchase';
import TdsTaxAnalysis from './pages/reports/tds/TaxAnalysis';
import TdsReconciliation from './pages/reports/tds/Reconciliation';
import BackupRestore from './pages/backup/BackupRestore';
import SystemSettings from './pages/setup/SystemSettings';
import SystemUtilities from './pages/setup/Utilities';
import UserMaster from './pages/setup/UserMaster';
import RoleMaster from './pages/setup/RoleMaster';
import HelpSupport from './pages/setup/HelpSupport';
import './App.css';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      const preventAndNavigate = (path) => {
        e.preventDefault();
        navigate(path);
      };

      if (e.key === 'F1') preventAndNavigate('/coming-soon');
      else if (e.key === 'F2') preventAndNavigate('/sales/add-sale');
      else if (e.key === 'F3') preventAndNavigate('/purchases/add-purchase');
      else if (e.key === 'F4') preventAndNavigate('/receipt/new');
      else if (e.key === 'F5') preventAndNavigate('/payment/new');
      else if (e.key === 'F6') preventAndNavigate('/bank-receipt/new');
      else if (e.key === 'F7') preventAndNavigate('/bank-payment/new');
      else if (e.key === 'F8') preventAndNavigate('/journal/new');
      else if (e.key === 'F9') preventAndNavigate('/products/product-list');
      else if (e.key === 'F10') preventAndNavigate('/stock-entry/new');
      else if (e.key === 'F11') preventAndNavigate('/stock-transfer/new');
      else if (e.ctrlKey && e.key.toLowerCase() === 'l') preventAndNavigate('/reports/accounts/ledger-voucher');
      else if (e.ctrlKey && e.key.toLowerCase() === 'o') preventAndNavigate('/reports/mis/kpi-reports');
    };

    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown, true);
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="customers/customer-master" element={<CustomerMaster />} />
        <Route path="suppliers/basic-info" element={<BasicInfo />} />
        <Route path="suppliers/contact-address" element={<ContactAddress />} />
        <Route path="suppliers/tax-financial" element={<TaxFinancial />} />
        <Route path="suppliers/transaction-history" element={<TransactionHistory />} />
        <Route path="suppliers/utilities" element={<Utilities />} />
        <Route path="employees/profile" element={<EmployeeProfile />} />
        <Route path="employees/job-info" element={<JobInfo />} />
        <Route path="employees/financial-docs" element={<FinancialDocs />} />
        <Route path="employees/records" element={<EmployeeRecords />} />
        <Route path="employees/utilities" element={<EmployeeUtilities />} />
        <Route path="price-list/list" element={<PriceList />} />
        <Route path="price-list/rules" element={<PricingRules />} />
        <Route path="price-list/mapping" element={<Mapping />} />
        <Route path="price-list/utilities" element={<PriceListUtilities />} />
        <Route path="tax/config" element={<TaxConfig />} />
        <Route path="tax/mapping" element={<TaxMapping />} />
        <Route path="tax/utilities" element={<TaxUtilities />} />
        <Route path="company/profile" element={<CompanyProfile />} />
        <Route path="company/tax-legal" element={<TaxLegal />} />
        <Route path="company/business-settings" element={<BusinessSettings />} />
        <Route path="company/bank-structure" element={<BankStructure />} />
        <Route path="company/status" element={<CompanyStatus />} />
        <Route path="branch/info" element={<BranchInfo />} />
        <Route path="branch/management" element={<BranchManagement />} />
        <Route path="branch/data" element={<BranchData />} />
        <Route path="branch/utilities" element={<BranchUtilities />} />
        <Route path="department/list" element={<DepartmentList />} />
        <Route path="department/reports-status" element={<DepartmentReportsStatus />} />
        <Route path="designation/list" element={<DesignationList />} />
        <Route path="designation/salary-employees" element={<DesignationSalaryEmployees />} />
        <Route path="designation/utilities" element={<DesignationUtilities />} />
        <Route path="products/add-product" element={<AddProduct />} />
        <Route path="products/brand" element={<Brand />} />
        <Route path="products/category" element={<Category />} />
        <Route path="products/unit" element={<Unit />} />
        <Route path="products/product-list" element={<ProductList />} />
        <Route path="products/add-adjustment" element={<AddAdjustment />} />
        <Route path="products/adjustment-list" element={<AdjustmentList />} />
        <Route path="products/stock-count" element={<StockCount />} />
        <Route path="purchases/add-purchase" element={<AddPurchase />} />
        <Route path="purchases/purchase-list" element={<PurchaseList />} />
        <Route path="purchases/import-purchase" element={<ImportPurchaseCSV />} />
        <Route path="purchases/purchase-return" element={<PurchaseReturn />} />
        <Route path="receipt/list" element={<ReceiptList />} />
        <Route path="receipt/new" element={<NewReceipt />} />
        <Route path="payment/list" element={<PaymentList />} />
        <Route path="payment/new" element={<NewPayment />} />
        <Route path="bank-receipt/list" element={<BankReceiptList />} />
        <Route path="bank-receipt/new" element={<NewBankReceipt />} />
        <Route path="bank-payment/list" element={<BankPaymentList />} />
        <Route path="bank-payment/new" element={<NewBankPayment />} />
        <Route path="contra/list" element={<ContraList />} />
        <Route path="contra/new" element={<NewContra />} />
        <Route path="journal/list" element={<JournalList />} />
        <Route path="journal/new" element={<NewJournal />} />
        <Route path="journal/edit/:id" element={<NewJournal />} />
        <Route path="stock-entry/list" element={<StockEntryList />} />
        <Route path="stock-entry/new" element={<NewStockEntry />} />
        <Route path="stock-entry/edit/:id" element={<NewStockEntry />} />
        <Route path="stock-transfer/list" element={<TransferList />} />
        <Route path="stock-transfer/new" element={<NewTransfer />} />
        <Route path="stock-transfer/edit/:id" element={<NewTransfer />} />
        <Route path="debit-note/list" element={<DebitNoteList />} />
        <Route path="debit-note/new" element={<NewDebitNote />} />
        <Route path="credit-note/list" element={<CreditNoteList />} />
        <Route path="credit-note/new" element={<NewCreditNote />} />
        <Route path="reports/accounts/ledger-voucher" element={<LedgerVoucherReports />} />
        <Route path="reports/accounts/financial" element={<FinancialReports />} />
        <Route path="reports/accounts/analysis" element={<AnalysisReports />} />
        <Route path="reports/stock/ledger" element={<StockLedgerReports />} />
        <Route path="reports/stock/product" element={<ProductReports />} />
        <Route path="reports/stock/control" element={<ControlReports />} />
        <Route path="reports/sales/summary" element={<SalesSummaryReports />} />
        <Route path="reports/sales/analysis" element={<SalesAnalysisReports />} />
        <Route path="reports/sales/financial" element={<SalesFinancialReports />} />
        <Route path="reports/sales/performance" element={<TopPerformanceReports />} />
        <Route path="reports/purchases/summary" element={<PurchaseSummaryReports />} />
        <Route path="reports/purchases/analysis" element={<PurchaseAnalysisReports />} />
        <Route path="reports/purchases/financial" element={<PurchaseFinancialReports />} />
        <Route path="reports/purchases/performance" element={<PurchasePerformanceReports />} />
        <Route path="reports/mis/management-dashboard" element={<ManagementDashboard />} />
        <Route path="reports/mis/performance-analysis" element={<PerformanceAnalysis />} />
        <Route path="reports/mis/business-analysis" element={<BusinessAnalysis />} />
        <Route path="reports/mis/kpi-reports" element={<KpiReports />} />
        <Route path="reports/gst/sales" element={<GstSales />} />
        <Route path="reports/gst/purchase" element={<GstPurchase />} />
        <Route path="reports/gst/tax-analysis" element={<TaxAnalysis />} />
        <Route path="reports/gst/reconciliation" element={<GstReconciliation />} />
        <Route path="reports/tds/sales" element={<TdsSales />} />
        <Route path="reports/tds/purchase" element={<TdsPurchase />} />
        <Route path="reports/tds/tax-analysis" element={<TdsTaxAnalysis />} />
        <Route path="reports/tds/reconciliation" element={<TdsReconciliation />} />
        <Route path="day-book" element={<DayBook />} />
        <Route path="sales/add-sale" element={<AddSale />} />
        <Route path="sales/sale-list" element={<SaleList />} />
        <Route path="sales/pos" element={<POS />} />
        <Route path="sales/packing-slip-list" element={<PackingSlipList />} />
        <Route path="sales/challan-list" element={<ChallanList />} />
        <Route path="sales/driver-list" element={<DriverList />} />
        <Route path="sales/gift-card-list" element={<GiftCardList />} />
        <Route path="sales/coupon-list" element={<CouponList />} />
        <Route path="sales/courier-list" element={<CourierList />} />
        <Route path="sales/sale-return" element={<SaleReturn />} />
        <Route path="sales/sale-exchange-list" element={<SaleExchangeList />} />
        <Route path="setup/backup-restore" element={<BackupRestore />} />
        <Route path="setup/system-settings" element={<SystemSettings />} />
        <Route path="setup/utilities" element={<SystemUtilities />} />
        <Route path="setup/user-master" element={<UserMaster />} />
        <Route path="setup/role-master" element={<RoleMaster />} />
        <Route path="setup/help-support" element={<HelpSupport />} />
        <Route path="coming-soon" element={<ComingSoon />} />
        <Route path="*" element={<ComingSoon />} />
      </Route>
    </Routes>
  );
}

export default App;
