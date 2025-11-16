import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import InvoiceForm from './components/InvoiceForm';
import CustomerManager from './components/CustomerManager';
import InvoiceList from './components/InvoiceList';
import Settings from './components/Settings';
import { FileText, Users, Home, List, Settings as SettingsIcon } from 'lucide-react';

function Navigation() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <FileText size={28} />
          <h1>easyinvoice</h1>
        </div>
        <div className="nav-links">
          <Link to="/" className={`nav-link ${isActive('/')}`}>
            <Home size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/invoices" className={`nav-link ${isActive('/invoices')}`}>
            <List size={20} />
            <span>Invoices</span>
          </Link>
          <Link to="/create-invoice" className={`nav-link ${isActive('/create-invoice')}`}>
            <FileText size={20} />
            <span>Create Invoice</span>
          </Link>
          <Link to="/customers" className={`nav-link ${isActive('/customers')}`}>
            <Users size={20} />
            <span>Customers</span>
          </Link>
          <Link to="/settings" className={`nav-link ${isActive('/settings')}`}>
            <SettingsIcon size={20} />
            <span>Settings</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

function App() {
  const [customers, setCustomers] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [nextInvoiceNumber, setNextInvoiceNumber] = useState(1000);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedCustomers = localStorage.getItem('customers');
    const savedInvoices = localStorage.getItem('invoices');
    const savedNextNumber = localStorage.getItem('nextInvoiceNumber');

    if (savedCustomers) {
      setCustomers(JSON.parse(savedCustomers));
    }
    if (savedInvoices) {
      setInvoices(JSON.parse(savedInvoices));
    }
    if (savedNextNumber) {
      setNextInvoiceNumber(parseInt(savedNextNumber));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('nextInvoiceNumber', nextInvoiceNumber.toString());
  }, [nextInvoiceNumber]);

  const addCustomer = (customer) => {
    const newCustomer = {
      ...customer,
      id: Date.now().toString()
    };
    setCustomers([...customers, newCustomer]);
    return newCustomer;
  };

  const updateCustomer = (id, updatedCustomer) => {
    setCustomers(customers.map(c => c.id === id ? { ...updatedCustomer, id } : c));
  };

  const deleteCustomer = (id) => {
    setCustomers(customers.filter(c => c.id !== id));
  };

  const addInvoice = (invoice) => {
    const newInvoice = {
      ...invoice,
      invoiceNumber: nextInvoiceNumber,
      createdAt: new Date().toISOString()
    };
    setInvoices([...invoices, newInvoice]);
    setNextInvoiceNumber(nextInvoiceNumber + 1);
    return newInvoice;
  };

  const deleteInvoice = (invoiceNumber) => {
    setInvoices(invoices.filter(inv => inv.invoiceNumber !== invoiceNumber));
  };

  return (
    <Router>
      <div className="App">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard invoices={invoices} customers={customers} />} />
            <Route path="/invoices" element={<InvoiceList invoices={invoices} customers={customers} deleteInvoice={deleteInvoice} />} />
            <Route path="/create-invoice" element={<InvoiceForm customers={customers} addInvoice={addInvoice} nextInvoiceNumber={nextInvoiceNumber} />} />
            <Route path="/customers" element={<CustomerManager customers={customers} addCustomer={addCustomer} updateCustomer={updateCustomer} deleteCustomer={deleteCustomer} />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
