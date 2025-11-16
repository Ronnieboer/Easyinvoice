// Sample data for testing and demonstration purposes
// This file can be used to populate the app with example data

export const sampleCustomers = [
  {
    id: 'cust_001',
    name: 'Acme Corporation',
    email: 'billing@acme.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business Park Drive',
    city: 'San Francisco',
    zipCode: '94102',
    country: 'United States'
  },
  {
    id: 'cust_002',
    name: 'Tech Solutions Ltd',
    email: 'accounts@techsolutions.com',
    phone: '+44 20 7123 4567',
    address: '456 Innovation Street',
    city: 'London',
    zipCode: 'EC1A 1BB',
    country: 'United Kingdom'
  },
  {
    id: 'cust_003',
    name: 'Global Enterprises',
    email: 'finance@globalent.com',
    phone: '+49 30 12345678',
    address: '789 Enterprise Avenue',
    city: 'Berlin',
    zipCode: '10115',
    country: 'Germany'
  },
  {
    id: 'cust_004',
    name: 'Nordic Design AS',
    email: 'post@nordicdesign.no',
    phone: '+47 22 34 56 78',
    address: 'Designveien 12',
    city: 'Oslo',
    zipCode: '0150',
    country: 'Norway'
  },
  {
    id: 'cust_005',
    name: 'Startup Ventures Inc',
    email: 'hello@startupventures.com',
    phone: '+1 (415) 555-9876',
    address: '321 Startup Lane',
    city: 'Palo Alto',
    zipCode: '94301',
    country: 'United States'
  }
];

export const sampleInvoices = [
  {
    invoiceNumber: 1000,
    customerId: 'cust_001',
    invoiceDate: '2024-01-15',
    dueDate: '2024-02-14',
    createdAt: '2024-01-15T10:30:00.000Z',
    notes: 'Payment due within 30 days. Bank transfer preferred.',
    items: [
      {
        description: 'Web Development Services',
        quantity: 40,
        price: 150,
        vatRate: 20
      },
      {
        description: 'UI/UX Design',
        quantity: 20,
        price: 120,
        vatRate: 20
      },
      {
        description: 'Project Management',
        quantity: 10,
        price: 100,
        vatRate: 20
      }
    ]
  },
  {
    invoiceNumber: 1001,
    customerId: 'cust_002',
    invoiceDate: '2024-01-20',
    dueDate: '2024-02-19',
    createdAt: '2024-01-20T14:15:00.000Z',
    notes: 'Thank you for your business!',
    items: [
      {
        description: 'Software License - Annual',
        quantity: 5,
        price: 299,
        vatRate: 25
      },
      {
        description: 'Technical Support Package',
        quantity: 1,
        price: 500,
        vatRate: 25
      }
    ]
  },
  {
    invoiceNumber: 1002,
    customerId: 'cust_003',
    invoiceDate: '2024-01-25',
    dueDate: '2024-02-24',
    createdAt: '2024-01-25T09:00:00.000Z',
    notes: 'Includes consultation and implementation services.',
    items: [
      {
        description: 'Business Consultation',
        quantity: 15,
        price: 200,
        vatRate: 20
      },
      {
        description: 'System Integration',
        quantity: 30,
        price: 175,
        vatRate: 20
      }
    ]
  },
  {
    invoiceNumber: 1003,
    customerId: 'cust_004',
    invoiceDate: '2024-02-01',
    dueDate: '2024-03-02',
    createdAt: '2024-02-01T11:45:00.000Z',
    notes: 'Design assets included. Payment terms: Net 30.',
    items: [
      {
        description: 'Logo Design',
        quantity: 1,
        price: 1500,
        vatRate: 25
      },
      {
        description: 'Brand Guidelines Document',
        quantity: 1,
        price: 800,
        vatRate: 25
      },
      {
        description: 'Social Media Templates',
        quantity: 10,
        price: 50,
        vatRate: 25
      }
    ]
  },
  {
    invoiceNumber: 1004,
    customerId: 'cust_005',
    invoiceDate: '2024-02-05',
    dueDate: '2024-03-07',
    createdAt: '2024-02-05T16:20:00.000Z',
    notes: 'MVP development phase 1. Milestone payment.',
    items: [
      {
        description: 'Frontend Development',
        quantity: 80,
        price: 125,
        vatRate: 20
      },
      {
        description: 'Backend API Development',
        quantity: 60,
        price: 140,
        vatRate: 20
      },
      {
        description: 'Database Setup',
        quantity: 20,
        price: 130,
        vatRate: 20
      },
      {
        description: 'Testing & QA',
        quantity: 15,
        price: 110,
        vatRate: 20
      }
    ]
  }
];

// Function to load sample data into the app
export const loadSampleData = () => {
  localStorage.setItem('customers', JSON.stringify(sampleCustomers));
  localStorage.setItem('invoices', JSON.stringify(sampleInvoices));
  localStorage.setItem('nextInvoiceNumber', '1005');
  window.location.reload();
};

// Function to clear all data
export const clearAllData = () => {
  if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
    localStorage.removeItem('customers');
    localStorage.removeItem('invoices');
    localStorage.removeItem('nextInvoiceNumber');
    window.location.reload();
  }
};

// Function to export data as JSON
export const exportData = () => {
  const data = {
    customers: JSON.parse(localStorage.getItem('customers') || '[]'),
    invoices: JSON.parse(localStorage.getItem('invoices') || '[]'),
    nextInvoiceNumber: localStorage.getItem('nextInvoiceNumber') || '1000',
    exportedAt: new Date().toISOString()
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `invoice-manager-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Function to import data from JSON
export const importData = (file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.customers && data.invoices && data.nextInvoiceNumber) {
        localStorage.setItem('customers', JSON.stringify(data.customers));
        localStorage.setItem('invoices', JSON.stringify(data.invoices));
        localStorage.setItem('nextInvoiceNumber', data.nextInvoiceNumber);
        alert('Data imported successfully!');
        window.location.reload();
      } else {
        alert('Invalid data format');
      }
    } catch (error) {
      alert('Error importing data: ' + error.message);
    }
  };
  reader.readAsText(file);
};
