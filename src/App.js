import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import InvoiceForm from './components/InvoiceForm';
import CustomerManager from './components/CustomerManager';
import InvoiceList from './components/InvoiceList';
import Settings from './components/Settings';
import { FileText, Users, Home, List, Settings as SettingsIcon, Languages } from 'lucide-react';
import { getTranslation } from './utils/translations';

function Navigation({ language, setLanguage }) {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };
  
  const t = (key) => getTranslation(language, key);

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <FileText size={28} />
          <h1>{t('appName')}</h1>
        </div>
        <div className="nav-links">
          <Link to="/" className={`nav-link ${isActive('/')}`}>
            <Home size={20} />
            <span>{t('dashboard')}</span>
          </Link>
          <Link to="/invoices" className={`nav-link ${isActive('/invoices')}`}>
            <List size={20} />
            <span>{t('invoices')}</span>
          </Link>
          <Link to="/quotes" className={`nav-link ${isActive('/quotes')}`}>
            <FileText size={20} />
            <span>{t('quotes')}</span>
          </Link>
          <Link to="/customers" className={`nav-link ${isActive('/customers')}`}>
            <Users size={20} />
            <span>{t('customers')}</span>
          </Link>
          <Link to="/settings" className={`nav-link ${isActive('/settings')}`}>
            <SettingsIcon size={20} />
            <span>{t('settings')}</span>
          </Link>
          <div className="language-selector">
            <Languages size={18} />
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="language-dropdown"
            >
              <option value="en">English</option>
              <option value="da">Dansk</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  const [customers, setCustomers] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [nextInvoiceNumber, setNextInvoiceNumber] = useState(1000);
  const [nextQuoteNumber, setNextQuoteNumber] = useState(1000);
  const [language, setLanguage] = useState('en');
  const [appSettings, setAppSettings] = useState({
    paymentTerms: 'Payment due within 30 days.\nBank transfer preferred.\nThank you for your business!',
    companyName: 'Your Company Name',
    companyAddress: 'Your Business Address',
    companyCity: 'City, Postal Code',
    companyCountry: 'Denmark',
    companyPhone: '+45 12 34 56 78',
    companyEmail: 'contact@yourcompany.dk',
    companyCVR: 'CVR: 12345678',
    companyLogo: null
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedCustomers = localStorage.getItem('customers');
    const savedInvoices = localStorage.getItem('invoices');
    const savedQuotes = localStorage.getItem('quotes');
    const savedNextNumber = localStorage.getItem('nextInvoiceNumber');
    const savedNextQuoteNumber = localStorage.getItem('nextQuoteNumber');
    const savedLanguage = localStorage.getItem('language');
    const savedSettings = localStorage.getItem('appSettings');

    if (savedCustomers) {
      setCustomers(JSON.parse(savedCustomers));
    }
    if (savedInvoices) {
      setInvoices(JSON.parse(savedInvoices));
    }
    if (savedQuotes) {
      setQuotes(JSON.parse(savedQuotes));
    }
    if (savedNextNumber) {
      setNextInvoiceNumber(parseInt(savedNextNumber));
    }
    if (savedNextQuoteNumber) {
      setNextQuoteNumber(parseInt(savedNextQuoteNumber));
    }
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
    if (savedSettings) {
      setAppSettings(JSON.parse(savedSettings));
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

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }, [quotes]);

  useEffect(() => {
    localStorage.setItem('nextQuoteNumber', nextQuoteNumber.toString());
  }, [nextQuoteNumber]);

  useEffect(() => {
    localStorage.setItem('appSettings', JSON.stringify(appSettings));
  }, [appSettings]);

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
      createdAt: new Date().toISOString(),
      status: invoice.status || 'draft' // draft, sent, paid, overdue
    };
    setInvoices([...invoices, newInvoice]);
    setNextInvoiceNumber(nextInvoiceNumber + 1);
    return newInvoice;
  };

  const updateInvoice = (invoiceNumber, updatedData) => {
    setInvoices(invoices.map(inv => 
      inv.invoiceNumber === invoiceNumber 
        ? { ...inv, ...updatedData, updatedAt: new Date().toISOString() }
        : inv
    ));
  };

  const deleteInvoice = (invoiceNumber) => {
    setInvoices(invoices.filter(inv => inv.invoiceNumber !== invoiceNumber));
  };

  const addQuote = (quote) => {
    const newQuote = {
      ...quote,
      quoteNumber: nextQuoteNumber,
      createdAt: new Date().toISOString(),
      status: quote.status || 'draft' // draft, sent, accepted, rejected, converted
    };
    setQuotes([...quotes, newQuote]);
    setNextQuoteNumber(nextQuoteNumber + 1);
    return newQuote;
  };

  const updateQuote = (quoteNumber, updatedData) => {
    setQuotes(quotes.map(q => 
      q.quoteNumber === quoteNumber 
        ? { ...q, ...updatedData, updatedAt: new Date().toISOString() }
        : q
    ));
  };

  const deleteQuote = (quoteNumber) => {
    setQuotes(quotes.filter(q => q.quoteNumber !== quoteNumber));
  };

  const convertQuoteToInvoice = (quote) => {
    const newInvoice = {
      customerId: quote.customerId,
      invoiceDate: new Date().toISOString().split('T')[0],
      dueDate: quote.validUntil || '',
      notes: quote.notes,
      items: quote.items,
      status: 'draft',
      convertedFromQuote: quote.quoteNumber
    };
    const invoice = addInvoice(newInvoice);
    updateQuote(quote.quoteNumber, { status: 'converted', convertedToInvoice: invoice.invoiceNumber });
    return invoice;
  };

  return (
    <Router>
      <div className="App">
        <Navigation language={language} setLanguage={setLanguage} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard invoices={invoices} quotes={quotes} customers={customers} language={language} />} />
            <Route path="/invoices" element={<InvoiceList invoices={invoices} customers={customers} deleteInvoice={deleteInvoice} updateInvoice={updateInvoice} language={language} appSettings={appSettings} />} />
            <Route path="/invoices/new" element={<InvoiceForm customers={customers} addInvoice={addInvoice} nextInvoiceNumber={nextInvoiceNumber} language={language} appSettings={appSettings} />} />
            <Route path="/invoices/edit/:invoiceNumber" element={<InvoiceForm customers={customers} addInvoice={addInvoice} updateInvoice={updateInvoice} invoices={invoices} language={language} appSettings={appSettings} />} />
            <Route path="/quotes" element={<InvoiceList invoices={quotes} customers={customers} deleteInvoice={deleteQuote} updateInvoice={updateQuote} language={language} appSettings={appSettings} isQuote={true} convertQuoteToInvoice={convertQuoteToInvoice} />} />
            <Route path="/quotes/new" element={<InvoiceForm customers={customers} addInvoice={addQuote} nextInvoiceNumber={nextQuoteNumber} language={language} appSettings={appSettings} isQuote={true} />} />
            <Route path="/customers" element={<CustomerManager customers={customers} addCustomer={addCustomer} updateCustomer={updateCustomer} deleteCustomer={deleteCustomer} language={language} />} />
            <Route path="/settings" element={<Settings language={language} appSettings={appSettings} setAppSettings={setAppSettings} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
