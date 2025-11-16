# Customization Guide

This guide explains how to customize the Invoice Manager to fit your specific needs.

## Table of Contents
1. [Changing Colors and Branding](#changing-colors-and-branding)
2. [Modifying Currency](#modifying-currency)
3. [Adding Custom VAT Rates](#adding-custom-vat-rates)
4. [Customizing PDF Layout](#customizing-pdf-layout)
5. [Changing Invoice Number Start](#changing-invoice-number-start)
6. [Adding Your Company Information](#adding-your-company-information)
7. [Adding More Customer Fields](#adding-more-customer-fields)
8. [Modifying Invoice Fields](#modifying-invoice-fields)

---

## Changing Colors and Branding

### Primary Color Scheme

Edit `src/index.css` to change the background gradient:

```css
body {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

Replace with your brand colors:
```css
body {
  background: linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%);
}
```

### Navigation and Button Colors

Edit `src/App.css`:

**Navigation active state:**
```css
.nav-link.active {
  background: #667eea; /* Change this */
  color: white;
}
```

**Primary button:**
```css
.btn-primary {
  background: #667eea; /* Change this */
  color: white;
}
```

### Application Title

Edit `src/App.js`, line ~19:
```javascript
<h1>Invoice Manager</h1>
```

Change to:
```javascript
<h1>Your Company Name</h1>
```

Also update `public/index.html`, line ~11:
```html
<title>Invoice Manager</title>
```

---

## Modifying Currency

### Change Currency Symbol

Search for `$` in the following files and replace with your currency symbol (€, £, ¥, etc.):

1. `src/components/Dashboard.js`
2. `src/components/InvoiceForm.js`
3. `src/components/InvoiceList.js`

Example in `InvoiceForm.js` line ~95:
```javascript
// Before
<span>${calculateTotal().toFixed(2)}</span>

// After
<span>€{calculateTotal().toFixed(2)}</span>
```

### Format Numbers for Different Locales

For European number formatting (comma as decimal separator):

```javascript
// Before
total.toFixed(2)

// After
total.toFixed(2).replace('.', ',')
```

For thousand separators:
```javascript
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

// Usage
<span>{formatCurrency(total)}</span>
```

Change `'en-US'` and `'USD'` to your locale and currency.

---

## Adding Custom VAT Rates

Edit `src/components/InvoiceForm.js`, lines ~101-107:

```javascript
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
  <option value="27">27%</option> {/* Add more rates */}
</select>
```

Or change default VAT rate (line ~17):
```javascript
vatRate: 20 // Change from 25 to your default
```

---

## Customizing PDF Layout

Edit `src/components/InvoiceList.js`, starting at line ~8 (the `generatePDF` function):

### Add Your Company Logo

```javascript
// After line ~13 (const doc = new jsPDF();)
const imgData = 'data:image/png;base64,...'; // Your logo as base64
doc.addImage(imgData, 'PNG', 150, 10, 40, 20);
```

### Add Your Company Information

```javascript
// After line ~23 (invoice date)
doc.setFontSize(10);
doc.text('From:', 120, 35);
doc.text('Your Company Name', 120, 42);
doc.text('123 Business Street', 120, 49);
doc.text('City, State 12345', 120, 56);
doc.text('contact@yourcompany.com', 120, 63);
doc.text('Tax ID: 123456789', 120, 70);
```

### Change PDF Colors

```javascript
// Line ~56 (table head styles)
headStyles: { fillColor: [102, 126, 234] } // RGB values

// Change to your brand color
headStyles: { fillColor: [255, 0, 0] } // Red example
```

### Add Footer to PDF

```javascript
// Before doc.save() line
const pageCount = doc.internal.getNumberOfPages();
doc.setPage(pageCount);
doc.setFontSize(8);
doc.text('Thank you for your business!', 105, 285, { align: 'center' });
doc.text('Page ' + pageCount, 105, 290, { align: 'center' });
```

---

## Changing Invoice Number Start

Edit `src/App.js`, line ~42:

```javascript
const [nextInvoiceNumber, setNextInvoiceNumber] = useState(1000);
```

Change `1000` to any starting number you want.

**Note**: This only affects new installations. If you've already created invoices, you'll need to clear localStorage or manually update it:

```javascript
// In browser console:
localStorage.setItem('nextInvoiceNumber', '5000');
```

---

## Adding Your Company Information

### Option 1: Add to Invoice Notes (Manual)

When creating an invoice, add your company info in the Notes field.

### Option 2: Add Company Field to App State

Edit `src/App.js`:

1. Add company info state:
```javascript
const [companyInfo] = useState({
  name: 'Your Company Name',
  address: '123 Business Street',
  city: 'City, State 12345',
  phone: '(555) 123-4567',
  email: 'billing@yourcompany.com',
  taxId: 'TAX-123456'
});
```

2. Pass to components:
```javascript
<Route path="/create-invoice" element={
  <InvoiceForm 
    customers={customers} 
    addInvoice={addInvoice} 
    nextInvoiceNumber={nextInvoiceNumber}
    companyInfo={companyInfo}
  />
} />
```

3. Update PDF generation to include company info (see previous section).

---

## Adding More Customer Fields

Edit `src/components/CustomerManager.js`:

1. Add to initial state (line ~9):
```javascript
const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  zipCode: '',
  country: '',
  taxId: '', // New field
  website: '' // New field
});
```

2. Add form fields (around line ~80):
```javascript
<div className="form-group">
  <label>Tax ID</label>
  <input
    type="text"
    value={formData.taxId}
    onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
  />
</div>
```

3. Update table columns (line ~140):
```javascript
<thead>
  <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Tax ID</th> {/* New column */}
    <th>Actions</th>
  </tr>
</thead>
```

4. Update table data:
```javascript
<td>{customer.taxId || '-'}</td>
```

---

## Modifying Invoice Fields

### Add Purchase Order Number

Edit `src/components/InvoiceForm.js`:

1. Add to state (line ~11):
```javascript
const [formData, setFormData] = useState({
  customerId: '',
  invoiceDate: new Date().toISOString().split('T')[0],
  dueDate: '',
  poNumber: '', // New field
  notes: '',
  items: [...]
});
```

2. Add form field (after line ~46):
```javascript
<div className="form-group">
  <label>PO Number</label>
  <input
    type="text"
    value={formData.poNumber}
    onChange={(e) => setFormData({ ...formData, poNumber: e.target.value })}
    placeholder="Purchase Order Number"
  />
</div>
```

3. Update PDF to show PO number in `InvoiceList.js`:
```javascript
if (invoice.poNumber) {
  doc.text(`PO Number: ${invoice.poNumber}`, 20, 56);
}
```

---

## Advanced Customizations

### Add Email Sending Functionality

You'll need a backend service or email API (like SendGrid, Mailgun, or EmailJS).

Example with EmailJS:

1. Install: `npm install @emailjs/browser`

2. In `InvoiceList.js`:
```javascript
import emailjs from '@emailjs/browser';

const sendEmail = (invoice, pdfBlob) => {
  const formData = new FormData();
  formData.append('invoice_number', invoice.invoiceNumber);
  formData.append('customer_email', customer.email);
  formData.append('pdf', pdfBlob);

  emailjs.send('service_id', 'template_id', formData, 'public_key')
    .then(() => alert('Email sent!'))
    .catch((err) => alert('Error: ' + err));
};
```

### Add Search and Filter

In `InvoiceList.js`, add above the table:

```javascript
const [searchTerm, setSearchTerm] = useState('');

const filteredInvoices = invoices.filter(invoice => {
  const customer = customers.find(c => c.id === invoice.customerId);
  return (
    invoice.invoiceNumber.toString().includes(searchTerm) ||
    customer?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
});

// In JSX:
<input
  type="text"
  placeholder="Search invoices..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
```

### Add Invoice Status (Paid/Unpaid)

1. Add status to invoice structure in `App.js`:
```javascript
const addInvoice = (invoice) => {
  const newInvoice = {
    ...invoice,
    invoiceNumber: nextInvoiceNumber,
    createdAt: new Date().toISOString(),
    status: 'unpaid' // Add this
  };
  // ...
};
```

2. Add toggle in `InvoiceList.js`:
```javascript
const toggleStatus = (invoiceNumber) => {
  // Implement status toggle
};
```

---

## Testing Your Customizations

After making changes:

1. Save all files
2. If the dev server is running, it will auto-reload
3. If not, restart with `npm start`
4. Test thoroughly:
   - Create a customer
   - Create an invoice
   - Generate PDF
   - Check all calculations
   - Verify styling

---

## Need Help?

- Check React documentation: https://react.dev/
- jsPDF documentation: https://github.com/parallax/jsPDF
- React Router: https://reactrouter.com/

Remember to test all changes thoroughly before using in production!
