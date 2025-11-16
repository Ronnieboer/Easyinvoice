import React, { useState } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function InvoiceForm({ customers, addInvoice, nextInvoiceNumber }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerId: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    notes: '',
    items: [
      {
        description: '',
        quantity: 1,
        price: 0,
        vatRate: 25
      }
    ]
  });

  const addItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        {
          description: '',
          quantity: 1,
          price: 0,
          vatRate: 25
        }
      ]
    });
  };

  const removeItem = (index) => {
    if (formData.items.length > 1) {
      setFormData({
        ...formData,
        items: formData.items.filter((_, i) => i !== index)
      });
    }
  };

  const updateItem = (index, field, value) => {
    const updatedItems = formData.items.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setFormData({ ...formData, items: updatedItems });
  };

  const calculateTotal = () => {
    return formData.items.reduce((sum, item) => {
      const subtotal = item.quantity * item.price;
      const vatAmount = subtotal * (item.vatRate / 100);
      return sum + subtotal + vatAmount;
    }, 0);
  };

  const calculateSubtotal = () => {
    return formData.items.reduce((sum, item) => {
      return sum + (item.quantity * item.price);
    }, 0);
  };

  const calculateTotalVAT = () => {
    return formData.items.reduce((sum, item) => {
      const subtotal = item.quantity * item.price;
      const vatAmount = subtotal * (item.vatRate / 100);
      return sum + vatAmount;
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.customerId) {
      alert('Please select a customer');
      return;
    }
    if (formData.items.some(item => !item.description || item.quantity <= 0 || item.price < 0)) {
      alert('Please fill in all item details correctly');
      return;
    }
    
    addInvoice(formData);
    alert('Invoice created successfully!');
    navigate('/invoices');
  };

  return (
    <div>
      <div className="page-header">
        <h2>Create Invoice</h2>
        <p>Invoice #{nextInvoiceNumber}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card">
          <h3>Invoice Details</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Customer *</label>
              <select
                required
                value={formData.customerId}
                onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
              >
                <option value="">Select a customer</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Invoice Date *</label>
              <input
                type="date"
                required
                value={formData.invoiceDate}
                onChange={(e) => setFormData({ ...formData, invoiceDate: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Due Date</label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional notes or terms..."
            />
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: 0 }}>Items</h3>
            <button type="button" className="btn btn-secondary btn-small" onClick={addItem}>
              <Plus size={18} />
              Add Item
            </button>
          </div>

          {formData.items.map((item, index) => (
            <div
              key={index}
              style={{
                padding: '1.5rem',
                background: '#f7fafc',
                borderRadius: '8px',
                marginBottom: '1rem'
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Description *</label>
                  <input
                    type="text"
                    required
                    value={item.description}
                    onChange={(e) => updateItem(index, 'description', e.target.value)}
                    placeholder="Item description"
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Quantity *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 1)}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Price *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={item.price}
                    onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value) || 0)}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>VAT Rate (%) *</label>
                  <select
                    value={item.vatRate}
                    onChange={(e) => updateItem(index, 'vatRate', parseFloat(e.target.value))}
                  >
                    <option value="0">0%</option>
                    <option value="5">5%</option>
                    <option value="10">10%</option>
                    <option value="15">15%</option>
                    <option value="20">20%</option>
                    <option value="25">25%</option>
                  </select>
                </div>

                <button
                  type="button"
                  className="btn btn-danger btn-small"
                  onClick={() => removeItem(index)}
                  disabled={formData.items.length === 1}
                  style={{ opacity: formData.items.length === 1 ? 0.5 : 1 }}
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div style={{ marginTop: '0.75rem', color: '#4a5568', fontSize: '0.9rem' }}>
                Subtotal: {(item.quantity * item.price).toFixed(2)} DKK | 
                VAT ({item.vatRate}%): {((item.quantity * item.price) * (item.vatRate / 100)).toFixed(2)} DKK | 
                Total: {((item.quantity * item.price) * (1 + item.vatRate / 100)).toFixed(2)} DKK
              </div>
            </div>
          ))}

          <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#f7fafc', borderRadius: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: '#4a5568', fontWeight: 500 }}>Subtotal:</span>
              <span style={{ color: '#2d3748', fontWeight: 600 }}>{calculateSubtotal().toFixed(2)} DKK</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: '#4a5568', fontWeight: 500 }}>Total VAT:</span>
              <span style={{ color: '#2d3748', fontWeight: 600 }}>{calculateTotalVAT().toFixed(2)} DKK</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '2px solid #cbd5e0' }}>
              <span style={{ color: '#2d3748', fontWeight: 600, fontSize: '1.2rem' }}>Total:</span>
              <span style={{ color: '#667eea', fontWeight: 700, fontSize: '1.2rem' }}>{calculateTotal().toFixed(2)} DKK</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="submit" className="btn btn-primary">
            <Save size={20} />
            Create Invoice
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/invoices')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default InvoiceForm;
