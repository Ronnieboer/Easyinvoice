# User Guide - Invoice Manager

## Table of Contents
1. [Getting Started](#getting-started)
2. [Managing Customers](#managing-customers)
3. [Creating Invoices](#creating-invoices)
4. [Viewing and Exporting Invoices](#viewing-and-exporting-invoices)
5. [Understanding VAT](#understanding-vat)
6. [Tips and Best Practices](#tips-and-best-practices)

---

## Getting Started

When you first open the Invoice Manager, you'll see the **Dashboard** which provides an overview of your business:

- **Total Invoices**: Number of invoices created
- **Total Customers**: Number of customers in your database
- **Total Revenue**: Sum of all invoice amounts
- **Average Invoice Value**: Mean invoice amount
- **Recent Invoices**: Last 5 invoices created

### Navigation

The top navigation bar contains links to:
- **Dashboard** (🏠): Overview and statistics
- **Invoices** (📄): View all invoices
- **Create Invoice** (➕): Create a new invoice
- **Customers** (👥): Manage customers

---

## Managing Customers

### Adding a New Customer

1. Click **Customers** in the navigation
2. Click the **Add Customer** button
3. Fill in the required fields:
   - **Name*** (required)
   - **Email*** (required)
   - Phone (optional)
   - Address (optional)
   - City (optional)
   - Zip Code (optional)
   - Country (optional)
4. Click **Save**

### Editing a Customer

1. Go to **Customers**
2. Find the customer in the list
3. Click the **Edit** button (pencil icon)
4. Update the information
5. Click **Update**

### Deleting a Customer

1. Go to **Customers**
2. Find the customer in the list
3. Click the **Delete** button (trash icon)
4. Confirm the deletion

⚠️ **Warning**: Deleting a customer doesn't delete their invoices, but the customer name will show as "Unknown" on those invoices.

---

## Creating Invoices

### Step 1: Basic Information

1. Click **Create Invoice** in the navigation
2. Select a **Customer** from the dropdown
   - If you haven't added customers yet, go to Customers first
3. Set the **Invoice Date** (defaults to today)
4. Optionally set a **Due Date**
5. Add any **Notes** (terms, payment instructions, etc.)

### Step 2: Adding Line Items

Each invoice needs at least one line item:

1. **Description**: What you're charging for (e.g., "Web Design Services")
2. **Quantity**: Number of units (e.g., 10 hours)
3. **Price**: Price per unit (e.g., $100/hour)
4. **VAT Rate**: Tax percentage (0%, 5%, 10%, 15%, 20%, or 25%)

The system automatically calculates:
- Item subtotal (quantity × price)
- VAT amount (subtotal × VAT rate)
- Item total (subtotal + VAT)

### Step 3: Multiple Items

To add more line items:
1. Click **Add Item**
2. Fill in the details for each item
3. Each item can have a different VAT rate
4. To remove an item, click the trash icon

### Step 4: Review and Save

Before saving, review:
- **Subtotal**: Total before VAT
- **Total VAT**: Sum of all VAT amounts
- **Total**: Final amount due

Click **Create Invoice** to save. The invoice will be assigned the next sequential number (starting from 1000).

---

## Viewing and Exporting Invoices

### Viewing All Invoices

1. Go to **Invoices** in the navigation
2. You'll see a table with:
   - Invoice number
   - Customer name
   - Invoice date
   - Due date (if set)
   - Total amount

Invoices are sorted by number (newest first).

### Viewing Invoice Details

Click the **eye icon** (👁️) to see full invoice details:
- Customer information
- All line items with calculations
- Totals breakdown
- Notes

### Exporting to PDF

To download an invoice as PDF:
1. Click the **download icon** (⬇️) in the invoice list, OR
2. View the invoice details and click **Download PDF**

The PDF includes:
- Professional invoice header
- Invoice number and dates
- Customer billing details
- Itemized list with VAT calculations
- Total amounts
- Notes (if any)

The PDF is automatically named `Invoice_[number].pdf` and downloads to your default download folder.

### Sending Invoices to Customers

After downloading the PDF:
1. Open your email client
2. Compose a new email to the customer
3. Attach the downloaded PDF
4. Include payment instructions and due date
5. Send!

### Deleting Invoices

To delete an invoice:
1. Click the **trash icon** (🗑️) in the invoice list
2. Confirm the deletion

⚠️ **Warning**: This action cannot be undone.

---

## Understanding VAT

**VAT (Value Added Tax)** is a consumption tax added to goods and services. Different countries and products have different VAT rates.

### Common VAT Rates

- **0%**: VAT-exempt items, exports, some food items
- **5%**: Reduced rate for essential items (some countries)
- **10%**: Reduced rate (books, newspapers in some countries)
- **15%**: Standard rate in some countries
- **20%**: Standard rate in UK and some EU countries
- **25%**: Standard rate in Nordic countries

### How VAT is Calculated

For an item with:
- Quantity: 5
- Price: $100
- VAT Rate: 20%

Calculation:
1. Subtotal = 5 × $100 = $500
2. VAT Amount = $500 × 20% = $100
3. Total = $500 + $100 = $600

### Mixed VAT Rates

You can have different VAT rates on the same invoice. For example:
- Item 1: Digital services (25% VAT)
- Item 2: Books (10% VAT)
- Item 3: Exports (0% VAT)

The system calculates VAT separately for each item and provides a total.

---

## Tips and Best Practices

### 1. Set Up Customers First
Before creating invoices, add all your customers. This makes invoice creation faster.

### 2. Use Consistent Descriptions
Use clear, professional descriptions:
- ✅ "Web Development - Homepage Redesign"
- ❌ "work done"

### 3. Include Payment Terms
Add payment terms in the Notes field:
- "Payment due within 30 days"
- "Bank transfer to: [account details]"
- "Late payment fee: 1.5% per month"

### 4. Set Due Dates
Always set a due date so customers know when payment is expected.

### 5. Keep Accurate Records
- Download and backup PDFs regularly
- Keep a separate record of payments received
- Match invoice numbers to payments

### 6. Regular Backups
Since data is stored in your browser:
- Don't clear browser cache/data without backing up
- Consider exporting data periodically
- Use the same browser/computer consistently

### 7. Professional Communication
When sending invoices via email:
- Use a professional subject line: "Invoice #1000 from [Your Company]"
- Include payment instructions
- Thank the customer for their business
- Provide contact info for questions

### 8. Track Your Invoices
Use the Dashboard to monitor:
- Outstanding invoices
- Total revenue
- Customer activity

### 9. Sequential Numbering
Invoice numbers automatically increment. Never skip numbers or create duplicate numbers - the system handles this for you.

### 10. VAT Compliance
Ensure you:
- Use the correct VAT rate for your country/product
- Include your VAT registration number on invoices (add to Notes)
- Keep records for tax reporting

---

## Keyboard Shortcuts

When creating invoices:
- **Tab**: Move between fields
- **Ctrl/Cmd + Enter**: Submit form (when cursor is in a field)
- **Esc**: Cancel/close modals

---

## Frequently Asked Questions

### Q: Can I edit an invoice after creating it?
A: Currently, invoices cannot be edited. If you need to make changes, delete the invoice and create a new one.

### Q: What happens if I clear my browser data?
A: All invoices and customers will be deleted. Always backup important data before clearing browser storage.

### Q: Can I use different currencies?
A: The current version uses USD ($). You can edit the code to change the currency symbol.

### Q: How do I track payments?
A: This is an invoice creation tool. You'll need to track payments separately (spreadsheet, accounting software, etc.).

### Q: Can multiple people use this at the same time?
A: Each browser/user has their own local data. The app doesn't sync between devices or users.

### Q: Is my data secure?
A: Data is stored locally in your browser. It never leaves your computer unless you share PDFs.

### Q: Can I customize the PDF layout?
A: The PDF layout is predefined. For custom layouts, you'll need to modify the code in `InvoiceList.js`.

### Q: What if I need more than 6 VAT rates?
A: You can add more options by editing the VAT dropdown in `InvoiceForm.js`.

---

## Need More Help?

- Review the README.md for technical details
- Check SETUP_GUIDE.md for installation help
- Review the code comments for customization options
