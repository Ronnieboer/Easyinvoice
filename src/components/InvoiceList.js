import React, { useState } from 'react';
import { Download, Trash2, Eye, X } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function InvoiceList({ invoices, customers, deleteInvoice }) {
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Company information - CUSTOMIZE THIS WITH YOUR DETAILS
  const companyInfo = {
    name: 'Your Company Name',
    address: 'Your Business Address',
    city: 'City, Postal Code',
    country: 'Denmark',
    phone: '+45 12 34 56 78',
    email: 'contact@yourcompany.dk',
    cvr: 'CVR: 12345678',
    // Add your logo as base64 string here (optional)
    // You can convert your logo to base64 at: https://www.base64-image.de/
    logo: null // Set to base64 string or keep null
  };

  const generatePDF = (invoice) => {
    const customer = customers.find(c => c.id === invoice.customerId);
    if (!customer) {
      alert('Customer not found');
      return;
    }

    const doc = new jsPDF();

    // Add company logo if available
    if (companyInfo.logo) {
      try {
        doc.addImage(companyInfo.logo, 'PNG', 150, 10, 40, 20);
      } catch (error) {
        console.error('Error adding logo:', error);
      }
    }

    // Header
    doc.setFontSize(24);
    doc.setTextColor(102, 126, 234);
    doc.text('INVOICE', 20, 20);

    // Company details (From)
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text('From:', 20, 35);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(10);
    doc.text(companyInfo.name, 20, 42);
    doc.text(companyInfo.address, 20, 48);
    doc.text(companyInfo.city, 20, 54);
    doc.text(companyInfo.country, 20, 60);
    if (companyInfo.phone) doc.text(companyInfo.phone, 20, 66);
    if (companyInfo.email) doc.text(companyInfo.email, 20, 72);
    if (companyInfo.cvr) doc.text(companyInfo.cvr, 20, 78);

    // Invoice details (right side)
    doc.setFontSize(10);
    doc.text(`Invoice #: ${invoice.invoiceNumber}`, 120, 35);
    doc.text(`Date: ${new Date(invoice.invoiceDate).toLocaleDateString('da-DK')}`, 120, 42);
    if (invoice.dueDate) {
      doc.text(`Due Date: ${new Date(invoice.dueDate).toLocaleDateString('da-DK')}`, 120, 49);
    }

    // Customer details
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text('Bill To:', 20, 95);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(10);
    doc.text(customer.name, 20, 102);
    if (customer.email) doc.text(customer.email, 20, 108);
    if (customer.phone) doc.text(customer.phone, 20, 114);
    if (customer.address) doc.text(customer.address, 20, 120);
    if (customer.city || customer.zipCode) {
      doc.text(`${customer.city || ''} ${customer.zipCode || ''}`, 20, 126);
    }
    if (customer.country) doc.text(customer.country, 20, 132);

    // Items table
    const tableData = invoice.items.map(item => {
      const subtotal = item.quantity * item.price;
      const vatAmount = subtotal * (item.vatRate / 100);
      const total = subtotal + vatAmount;
      
      return [
        item.description,
        item.quantity.toString(),
        `${item.price.toFixed(2)} DKK`,
        `${item.vatRate}%`,
        `${subtotal.toFixed(2)} DKK`,
        `${vatAmount.toFixed(2)} DKK`,
        `${total.toFixed(2)} DKK`
      ];
    });

    doc.autoTable({
      startY: 145,
      head: [['Description', 'Qty', 'Price', 'VAT Rate', 'Subtotal', 'VAT', 'Total']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [102, 126, 234] },
      styles: { fontSize: 9 }
    });

    // Totals
    const finalY = doc.lastAutoTable.finalY + 10;
    const subtotal = invoice.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const totalVAT = invoice.items.reduce((sum, item) => {
      const itemSubtotal = item.quantity * item.price;
      return sum + (itemSubtotal * (item.vatRate / 100));
    }, 0);
    const total = subtotal + totalVAT;

    doc.setFontSize(10);
    doc.text(`Subtotal: ${subtotal.toFixed(2)} DKK`, 135, finalY);
    doc.text(`Total VAT: ${totalVAT.toFixed(2)} DKK`, 135, finalY + 7);
    doc.setFontSize(12);
    doc.setTextColor(102, 126, 234);
    doc.text(`Total: ${total.toFixed(2)} DKK`, 135, finalY + 17);

    // Notes
    if (invoice.notes) {
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text('Notes:', 20, finalY + 30);
      const splitNotes = doc.splitTextToSize(invoice.notes, 170);
      doc.text(splitNotes, 20, finalY + 37);
    }

    // Save PDF
    doc.save(`Invoice_${invoice.invoiceNumber}.pdf`);
  };

  const handleDelete = (invoiceNumber) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      deleteInvoice(invoiceNumber);
      if (selectedInvoice && selectedInvoice.invoiceNumber === invoiceNumber) {
        setSelectedInvoice(null);
      }
    }
  };

  const InvoiceModal = ({ invoice, onClose }) => {
    const customer = customers.find(c => c.id === invoice.customerId);
    const subtotal = invoice.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const totalVAT = invoice.items.reduce((sum, item) => {
      const itemSubtotal = item.quantity * item.price;
      return sum + (itemSubtotal * (item.vatRate / 100));
    }, 0);
    const total = subtotal + totalVAT;

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '2rem'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          maxWidth: '800px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          padding: '2rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ margin: 0, color: '#2d3748' }}>Invoice #{invoice.invoiceNumber}</h2>
            <button onClick={onClose} className="btn btn-secondary btn-small">
              <X size={18} />
            </button>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>Customer Details</h3>
            <div style={{ background: '#f7fafc', padding: '1rem', borderRadius: '8px' }}>
              <p><strong>Name:</strong> {customer?.name || 'Unknown'}</p>
              {customer?.email && <p><strong>Email:</strong> {customer.email}</p>}
              {customer?.phone && <p><strong>Phone:</strong> {customer.phone}</p>}
              {customer?.address && <p><strong>Address:</strong> {customer.address}</p>}
              {(customer?.city || customer?.zipCode) && (
                <p><strong>City/Zip:</strong> {customer.city} {customer.zipCode}</p>
              )}
              {customer?.country && <p><strong>Country:</strong> {customer.country}</p>}
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>Invoice Details</h3>
            <div style={{ background: '#f7fafc', padding: '1rem', borderRadius: '8px' }}>
              <p><strong>Invoice Date:</strong> {new Date(invoice.invoiceDate).toLocaleDateString('da-DK')}</p>
              {invoice.dueDate && (
                <p><strong>Due Date:</strong> {new Date(invoice.dueDate).toLocaleDateString('da-DK')}</p>
              )}
              <p><strong>Created:</strong> {new Date(invoice.createdAt).toLocaleString('da-DK')}</p>
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>Items</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>VAT</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, index) => {
                  const itemSubtotal = item.quantity * item.price;
                  const itemVAT = itemSubtotal * (item.vatRate / 100);
                  const itemTotal = itemSubtotal + itemVAT;
                  
                  return (
                    <tr key={index}>
                      <td>{item.description}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price.toFixed(2)} DKK</td>
                      <td>{item.vatRate}%</td>
                      <td>{itemTotal.toFixed(2)} DKK</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={{ background: '#f7fafc', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: '#4a5568', fontWeight: 500 }}>Subtotal:</span>
              <span style={{ color: '#2d3748', fontWeight: 600 }}>{subtotal.toFixed(2)} DKK</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: '#4a5568', fontWeight: 500 }}>Total VAT:</span>
              <span style={{ color: '#2d3748', fontWeight: 600 }}>{totalVAT.toFixed(2)} DKK</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '2px solid #cbd5e0' }}>
              <span style={{ color: '#2d3748', fontWeight: 600, fontSize: '1.2rem' }}>Total:</span>
              <span style={{ color: '#667eea', fontWeight: 700, fontSize: '1.2rem' }}>{total.toFixed(2)} DKK</span>
            </div>
          </div>

          {invoice.notes && (
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>Notes</h3>
              <div style={{ background: '#f7fafc', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ whiteSpace: 'pre-wrap' }}>{invoice.notes}</p>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={() => generatePDF(invoice)} className="btn btn-success">
              <Download size={18} />
              Download PDF
            </button>
            <button onClick={onClose} className="btn btn-secondary">
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="page-header">
        <h2>Invoices</h2>
        <p>View and manage all your invoices</p>
      </div>

      <div className="card">
        <h3>All Invoices</h3>
        
        {invoices.length === 0 ? (
          <p style={{ color: '#718096', textAlign: 'center', padding: '2rem' }}>
            No invoices yet. Create your first invoice to get started!
          </p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Due Date</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...invoices]
                .sort((a, b) => b.invoiceNumber - a.invoiceNumber)
                .map((invoice) => {
                  const customer = customers.find(c => c.id === invoice.customerId);
                  const total = invoice.items.reduce((sum, item) => {
                    const subtotal = item.quantity * item.price;
                    const vatAmount = subtotal * (item.vatRate / 100);
                    return sum + subtotal + vatAmount;
                  }, 0);

                  return (
                    <tr key={invoice.invoiceNumber}>
                      <td>#{invoice.invoiceNumber}</td>
                      <td>{customer ? customer.name : 'Unknown'}</td>
                      <td>{new Date(invoice.invoiceDate).toLocaleDateString('da-DK')}</td>
                      <td>{invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString('da-DK') : '-'}</td>
                      <td>{total.toFixed(2)} DKK</td>
                      <td>
                        <div className="table-actions">
                          <button
                            className="btn btn-secondary btn-small"
                            onClick={() => setSelectedInvoice(invoice)}
                            title="View Invoice"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            className="btn btn-success btn-small"
                            onClick={() => generatePDF(invoice)}
                            title="Download PDF"
                          >
                            <Download size={16} />
                          </button>
                          <button
                            className="btn btn-danger btn-small"
                            onClick={() => handleDelete(invoice.invoiceNumber)}
                            title="Delete Invoice"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>

      {selectedInvoice && (
        <InvoiceModal 
          invoice={selectedInvoice} 
          onClose={() => setSelectedInvoice(null)} 
        />
      )}
    </div>
  );
}

export default InvoiceList;
