# Invoice Manager

A modern React-based invoice management application that allows you to create, manage, and export invoices to PDF.

## Features

- **Dashboard**: Overview of your invoices and customers with statistics
- **Invoice Creation**: Create detailed invoices with multiple line items
- **VAT Management**: Flexible VAT rates (0%, 5%, 10%, 15%, 20%, 25%) for each line item
- **Customer Management**: Add, edit, and manage customer information
- **Sequential Invoice Numbering**: Automatic numbering starting from 1000
- **PDF Export**: Convert invoices to PDF format for easy sharing via email
- **Data Persistence**: All data is saved in browser's localStorage

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The application will open in your browser at `http://localhost:3000`

## Usage

### Managing Customers

1. Navigate to the **Customers** page
2. Click **Add Customer** to create a new customer
3. Fill in customer details (name, email, phone, address, etc.)
4. Edit or delete customers as needed

### Creating Invoices

1. Navigate to **Create Invoice**
2. Select a customer from the dropdown
3. Set invoice date and optional due date
4. Add line items with:
   - Description
   - Quantity
   - Price
   - VAT rate (0-25%)
5. Add multiple items using the **Add Item** button
6. Review the calculated totals (subtotal, VAT, total)
7. Click **Create Invoice** to save

### Viewing and Exporting Invoices

1. Go to the **Invoices** page to see all invoices
2. Click the **eye icon** to view invoice details
3. Click the **download icon** to export as PDF
4. PDFs can be saved and sent to customers via email

### Dashboard

The dashboard provides:
- Total number of invoices
- Total number of customers
- Total revenue across all invoices
- Average invoice value
- List of recent invoices

## Technologies Used

- **React** - UI framework
- **React Router** - Navigation
- **jsPDF** - PDF generation
- **jsPDF-AutoTable** - PDF table formatting
- **Lucide React** - Icons
- **LocalStorage** - Data persistence

## Project Structure

```
src/
├── components/
│   ├── Dashboard.js
│   ├── InvoiceForm.js
│   ├── InvoiceList.js
│   └── CustomerManager.js
├── App.js
├── App.css
├── index.js
└── index.css
```

## Features in Detail

### VAT Calculation
Each line item can have its own VAT rate, and the system automatically calculates:
- Item subtotal (quantity × price)
- VAT amount (subtotal × VAT rate)
- Item total (subtotal + VAT)
- Invoice subtotal, total VAT, and grand total

### Invoice Numbering
Invoices are automatically numbered starting from 1000 and increment by 1 for each new invoice. The numbering is persistent across browser sessions.

### Data Persistence
All data (customers and invoices) is automatically saved to the browser's localStorage, ensuring your data persists even after closing the browser.

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## License

MIT License - feel free to use this project for personal or commercial purposes.
