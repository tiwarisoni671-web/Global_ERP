import React, { useState } from 'react';
import { Building, CreditCard, ShieldCheck, Edit2, DollarSign, X, Check, Award, Percent, Calendar } from 'lucide-react';

const TaxFinancial = () => {
  const [suppliers, setSuppliers] = useState([
    {
      id: 'SUP-001',
      name: 'Rathi Steel Traders',
      gstin: '08RATHI1234A1Z0',
      pan: 'RATHI1234A',
      bankName: 'Punjab National Bank',
      bankAccount: '01234567890123',
      bankIfsc: 'PUNB0012300',
      openingBalance: 75000,
      balanceType: 'Cr',
      creditPeriod: 60,
      paymentTerms: 'Net 60'
    },
    {
      id: 'SUP-002',
      name: 'Krishna Enterprises',
      gstin: '08KRISH5566B2Z9',
      pan: 'KRISH5566B',
      bankName: 'HDFC Bank',
      bankAccount: '50200012345678',
      bankIfsc: 'HDFC0000012',
      openingBalance: 15000,
      balanceType: 'Cr',
      creditPeriod: 30,
      paymentTerms: 'Net 30'
    },
    {
      id: 'SUP-003',
      name: 'Vikas Logistics & Co',
      gstin: '08VIKAS9999C3Z1',
      pan: 'VIKAS9999C',
      bankName: 'Bank of Baroda',
      bankAccount: '112233445566',
      bankIfsc: 'BARB0TRANSP',
      openingBalance: 0,
      balanceType: 'Dr',
      creditPeriod: 15,
      paymentTerms: 'Due on Receipt'
    }
  ]);

  const [selectedId, setSelectedId] = useState('SUP-001');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    gstin: '', pan: '', bankName: '', bankAccount: '', bankIfsc: '',
    openingBalance: 0, balanceType: 'Cr', creditPeriod: 30, paymentTerms: 'Net 30'
  });

  const activeSupplier = suppliers.find(s => s.id === selectedId) || suppliers[0];

  const handleEditClick = () => {
    setEditForm({
      gstin: activeSupplier.gstin,
      pan: activeSupplier.pan,
      bankName: activeSupplier.bankName,
      bankAccount: activeSupplier.bankAccount,
      bankIfsc: activeSupplier.bankIfsc,
      openingBalance: activeSupplier.openingBalance,
      balanceType: activeSupplier.balanceType,
      creditPeriod: activeSupplier.creditPeriod,
      paymentTerms: activeSupplier.paymentTerms
    });
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSuppliers(suppliers.map(s => s.id === selectedId ? { ...s, ...editForm } : s));
    setIsEditing(false);
  };

  return (
    <div className="bg-[#f8fafc] p-4 sm:p-6 rounded-2xl min-h-screen space-y-6">
      {/* Financial Master Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-2xl shadow-lg border border-slate-800 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="z-10">
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">Accounting Center</span>
          <h1 className="text-sm sm:text-lg font-black text-slate-100 tracking-tight mt-2 flex items-center gap-2">
            <CreditCard className="text-emerald-400" size={22} /> Tax & Credit Settings
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">Configure legal GSTIN codes, verify bank clearance channels, and control supplier credit parameters.</p>
        </div>
        <div className="z-10 bg-white/10 backdrop-blur-md border border-white/10 text-white px-4 py-2 rounded-xl text-xs font-mono shadow-sm">
          Selected Code: {activeSupplier.id}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Modern Financial Directory */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col h-[220px] lg:h-[500px]">
          <div className="p-3.5 border-b bg-slate-50 font-bold text-[10px] sm:text-xs text-slate-600 uppercase tracking-wider">Financial Directory</div>
          <div className="divide-y divide-slate-100 overflow-y-auto flex-1 no-scrollbar text-xs">
            {suppliers.map(s => (
              <div
                key={s.id}
                onClick={() => { setSelectedId(s.id); setIsEditing(false); }}
                className={`p-3.5 cursor-pointer transition-all flex items-center justify-between ${selectedId === s.id ? 'bg-indigo-50/70 text-indigo-700 font-bold border-l-4 border-indigo-600 shadow-sm' : 'hover:bg-slate-50 text-slate-600'}`}
              >
                <div>
                  <div className="font-bold text-slate-800">{s.name}</div>
                  <div className="text-[9px] text-slate-400 font-mono mt-0.5">{s.id}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-800">₹{s.openingBalance.toLocaleString()}</div>
                  <span className="text-[9px] text-slate-400 uppercase font-bold">{s.balanceType}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Professional Details Panel */}
        <div className="lg:col-span-8">
          {activeSupplier ? (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md p-6 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex justify-between items-center border-b pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border font-bold">{activeSupplier.id}</span>
                  <h2 className="text-xs sm:text-sm font-extrabold text-slate-800 truncate max-w-[200px] sm:max-w-none">{activeSupplier.name}</h2>
                </div>
                {!isEditing && (
                  <button
                    onClick={handleEditClick}
                    className="flex items-center gap-1.5 text-xs text-indigo-600 hover:text-white font-bold border border-indigo-200 hover:border-indigo-600 px-4 py-2 rounded-xl hover:bg-indigo-600 transition-all duration-300 shadow-sm"
                  >
                    <Edit2 size={13} /> Update Parameters
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">GSTIN Registration</label>
                      <input
                        type="text"
                        value={editForm.gstin}
                        onChange={(e) => setEditForm({ ...editForm, gstin: e.target.value })}
                        className="w-full border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">PAN Card Number</label>
                      <input
                        type="text"
                        value={editForm.pan}
                        onChange={(e) => setEditForm({ ...editForm, pan: e.target.value })}
                        className="w-full border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
                    <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-1"><Building size={14} /> Banking Coordinates</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="Bank Name"
                        value={editForm.bankName}
                        onChange={(e) => setEditForm({ ...editForm, bankName: e.target.value })}
                        className="border border-slate-200 p-2.5 rounded-xl focus:outline-none bg-white text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Account Number"
                        value={editForm.bankAccount}
                        onChange={(e) => setEditForm({ ...editForm, bankAccount: e.target.value })}
                        className="border border-slate-200 p-2.5 rounded-xl focus:outline-none bg-white text-xs font-mono"
                      />
                      <input
                        type="text"
                        placeholder="IFSC Code"
                        value={editForm.bankIfsc}
                        onChange={(e) => setEditForm({ ...editForm, bankIfsc: e.target.value })}
                        className="border border-slate-200 p-2.5 rounded-xl focus:outline-none bg-white text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Opening Bal (₹)</label>
                      <input
                        type="number"
                        value={editForm.openingBalance}
                        onChange={(e) => setEditForm({ ...editForm, openingBalance: Number(e.target.value) })}
                        className="w-full border border-slate-200 p-3 rounded-xl focus:outline-none text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Balance Type</label>
                      <select
                        value={editForm.balanceType}
                        onChange={(e) => setEditForm({ ...editForm, balanceType: e.target.value })}
                        className="w-full border border-slate-200 p-3 rounded-xl focus:outline-none bg-white text-xs"
                      >
                        <option value="Cr">Cr (Payable)</option>
                        <option value="Dr">Dr (Advance)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Credit Period (Days)</label>
                      <input
                        type="number"
                        value={editForm.creditPeriod}
                        onChange={(e) => setEditForm({ ...editForm, creditPeriod: Number(e.target.value) })}
                        className="w-full border border-slate-200 p-3 rounded-xl focus:outline-none text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Payment Protocol</label>
                      <select
                        value={editForm.paymentTerms}
                        onChange={(e) => setEditForm({ ...editForm, paymentTerms: e.target.value })}
                        className="w-full border border-slate-200 p-3 rounded-xl focus:outline-none bg-white text-xs"
                      >
                        <option value="Due on Receipt">Due on Receipt</option>
                        <option value="Net 15">Net 15</option>
                        <option value="Net 30">Net 30</option>
                        <option value="Net 45">Net 45</option>
                        <option value="Net 60">Net 60</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end pt-3 border-t">
                    <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-xs font-semibold">Cancel</button>
                    <button type="submit" className="px-5 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors text-xs shadow-sm">Save Changes</button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6 text-xs sm:text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Tax Passport block */}
                    <div className="bg-gradient-to-br from-indigo-550 to-blue-600 text-white p-5 rounded-2xl shadow-md space-y-4 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none"></div>
                      <h4 className="font-extrabold text-[11px] sm:text-xs uppercase tracking-wider flex items-center gap-1.5 opacity-90">
                        <ShieldCheck size={16} /> Tax Registrations
                      </h4>
                      <div className="space-y-3 font-mono">
                        <div>
                          <div className="text-[10px] opacity-75">GSTIN</div>
                          <div className="font-bold text-sm tracking-wider mt-0.5">{activeSupplier.gstin || 'N/A'}</div>
                        </div>
                        <div>
                          <div className="text-[10px] opacity-75">PAN CARD</div>
                          <div className="font-bold text-sm tracking-wider mt-0.5">{activeSupplier.pan || 'N/A'}</div>
                        </div>
                      </div>
                    </div>

                    {/* Bank Card block */}
                    <div className="bg-gradient-to-br from-slate-800 to-slate-950 text-white p-5 rounded-2xl shadow-md space-y-4 relative overflow-hidden border border-slate-700">
                      <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl pointer-events-none"></div>
                      <div className="flex justify-between items-center">
                        <h4 className="font-extrabold text-[11px] sm:text-xs uppercase tracking-wider flex items-center gap-1.5 opacity-90">
                          <Building size={15} /> bank credentials
                        </h4>
                        <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded font-bold">{activeSupplier.bankName.split(' ')[0]}</span>
                      </div>
                      <div className="space-y-2.5 font-mono">
                        <div>
                          <div className="text-[10px] text-slate-400">Account Number</div>
                          <div className="font-bold text-sm tracking-wider mt-0.5">{activeSupplier.bankAccount ? `•••• •••• ${activeSupplier.bankAccount.slice(-4)}` : 'N/A'}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-400">IFSC / Routing Code</div>
                          <div className="font-bold text-xs tracking-wider mt-0.5">{activeSupplier.bankIfsc || 'N/A'}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Credit Protocol Parameters */}
                  <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
                    <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <CreditCard size={15} className="text-emerald-600" /> Credit Terms & Ledger opening
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-4 rounded-xl border border-slate-250/50 shadow-inner">
                      <div className="space-y-1">
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"><DollarSign size={11} /> Opening Balance</span>
                        <p className="font-black text-slate-850 text-sm sm:text-base">₹ {activeSupplier.openingBalance.toLocaleString()} <span className="text-xs font-bold text-indigo-650">({activeSupplier.balanceType})</span></p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"><Calendar size={11} /> Credit Period</span>
                        <p className="font-black text-slate-850 text-sm sm:text-base">{activeSupplier.creditPeriod} Days</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"><Percent size={11} /> Payment Protocol</span>
                        <p className="font-black text-slate-850 text-sm sm:text-base">{activeSupplier.paymentTerms}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500 border border-dashed rounded-2xl bg-white shadow-sm">Select a supplier to display details.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaxFinancial;
