import React from 'react';
import { FileText, Users, DollarSign, TrendingUp } from 'lucide-react';

function Dashboard({ invoices, customers }) {
  const totalInvoices = invoices.length;
  const totalCustomers = customers.length;
  
  const totalRevenue = invoices.reduce((sum, invoice) => {
    return sum + invoice.items.reduce((itemSum, item) => {
      const subtotal = item.quantity * item.price;
      const vatAmount = subtotal * (item.vatRate / 100);
      return itemSum + subtotal + vatAmount;
    }, 0);
  }, 0);

  const recentInvoices = [...invoices]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div>
      <div className="page-header">
        <h2>Dashboard</h2>
        <p>Overview of your invoice management system</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#ebf4ff', color: '#667eea' }}>
            <FileText size={28} />
          </div>
          <div className="stat-info">
            <h3>{totalInvoices}</h3>
            <p>Total Invoices</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#f0fff4', color: '#48bb78' }}>
            <Users size={28} />
          </div>
          <div className="stat-info">
            <h3>{totalCustomers}</h3>
            <p>Total Customers</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fffaf0', color: '#ed8936' }}>
            <DollarSign size={28} />
          </div>
          <div className="stat-info">
            <h3>{totalRevenue.toFixed(2)} DKK</h3>
            <p>Total Revenue</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fef5ff', color: '#764ba2' }}>
            <TrendingUp size={28} />
          </div>
          <div className="stat-info">
            <h3>{invoices.length > 0 ? (totalRevenue / invoices.length).toFixed(2) : '0.00'} DKK</h3>
            <p>Avg Invoice Value</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Recent Invoices</h3>
        {recentInvoices.length === 0 ? (
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
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentInvoices.map((invoice) => {
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
                    <td>{new Date(invoice.createdAt).toLocaleDateString()}</td>
                    <td>{total.toFixed(2)} DKK</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
