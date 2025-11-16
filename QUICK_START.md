# Quick Start Guide

Get up and running with Invoice Manager in 5 minutes!

## Prerequisites

- Node.js (v14 or higher) - [Download here](https://nodejs.org/)
- A modern web browser (Chrome, Firefox, Safari, or Edge)

## Installation

### Step 1: Install Dependencies

Open a terminal in the project directory and run:

```bash
npm install
```

This will install all required packages. It may take 1-2 minutes.

### Step 2: Start the Application

```bash
npm start
```

The application will automatically open in your browser at `http://localhost:3000`

## First Time Setup

### Option 1: Start Fresh

1. Navigate to **Customers** in the menu
2. Click **Add Customer** and create your first customer
3. Go to **Create Invoice**
4. Select your customer and add invoice items
5. Click **Create Invoice**
6. View your invoice in the **Invoices** section
7. Click the download icon to generate a PDF

### Option 2: Use Sample Data

1. Go to **Settings** in the navigation menu
2. Click **Load Sample Data**
3. Explore the dashboard with pre-loaded customers and invoices
4. Create new invoices or modify existing data
5. When ready to start fresh, click **Clear All Data** in Settings

## Basic Workflow

### Creating Your First Invoice

1. **Add a Customer** (one-time setup)
   - Click **Customers** → **Add Customer**
   - Enter name and email (required)
   - Optionally add phone, address, city, zip, country
   - Click **Save**

2. **Create an Invoice**
   - Click **Create Invoice**
   - Select customer from dropdown
   - Set invoice date (defaults to today)
   - Optionally set due date
   - Add line items:
     - Description (e.g., "Web Development")
     - Quantity (e.g., 10 hours)
     - Price per unit (e.g., 150)
     - VAT rate (0%, 5%, 10%, 15%, 20%, or 25%)
   - Add more items with **Add Item** button
   - Review totals (automatically calculated)
   - Add notes if needed (payment terms, etc.)
   - Click **Create Invoice**

3. **Generate PDF**
   - Go to **Invoices**
   - Find your invoice in the list
   - Click the download icon (⬇️)
   - PDF will download automatically
   - Send the PDF to your customer via email

## Key Features at a Glance

### Dashboard (🏠)
- See total invoices, customers, and revenue
- View recent invoices
- Monitor average invoice value

### Invoices (📄)
- View all invoices
- Click eye icon to see details
- Click download icon to get PDF
- Click trash icon to delete

### Create Invoice (➕)
- Select customer
- Add unlimited line items
- Different VAT rates per item
- Real-time calculation
- Notes for payment terms

### Customers (👥)
- Add new customers
- Edit existing customers (pencil icon)
- Delete customers (trash icon)
- Store complete contact information

### Settings (⚙️)
- Export data (backup)
- Import data (restore)
- Load sample data (for testing)
- Clear all data (start over)

## Tips for New Users

### 1. Set Up Customers First
Before creating invoices, add all your regular customers. This saves time later.

### 2. Use Descriptive Names
Write clear descriptions for line items:
- ✅ "Website Design - Homepage Mockups"
- ❌ "work"

### 3. Include Payment Terms
In the Notes field, add:
- "Payment due within 30 days"
- "Bank details: [your account info]"
- "Thank you for your business!"

### 4. Set Due Dates
Always include a due date so customers know when to pay.

### 5. Backup Regularly
Go to Settings → Export Data to save a backup JSON file.

### 6. Check VAT Rates
Make sure you're using the correct VAT rate for your country/product:
- 0% for exports or VAT-exempt items
- 20% for standard goods in UK
- 25% for standard goods in Nordic countries
- etc.

## Common Tasks

### Edit a Customer
1. Go to **Customers**
2. Find the customer in the table
3. Click the pencil icon
4. Update information
5. Click **Update**

### Delete an Invoice
1. Go to **Invoices**
2. Find the invoice in the table
3. Click the trash icon
4. Confirm deletion

### Backup Your Data
1. Go to **Settings**
2. Click **Export Data**
3. Save the JSON file somewhere safe
4. Store it on your computer, cloud drive, or external drive

### Restore from Backup
1. Go to **Settings**
2. Click **Import Data**
3. Select your backup JSON file
4. Data will be restored automatically

### Start Over
1. Go to **Settings**
2. Click **Clear All Data**
3. Confirm the action
4. All data will be permanently deleted

## Understanding VAT Calculations

Invoice Manager calculates VAT (Value Added Tax) for each line item:

**Example:**
- Service: Web Development
- Quantity: 10 hours
- Price: $100/hour
- VAT Rate: 20%

**Calculation:**
1. Subtotal = 10 × $100 = $1,000
2. VAT Amount = $1,000 × 20% = $200
3. Total = $1,000 + $200 = $1,200

The invoice shows:
- Subtotal: $1,000.00
- Total VAT: $200.00
- **Grand Total: $1,200.00**

You can have different VAT rates for different items on the same invoice!

## Keyboard Shortcuts

- **Tab**: Move between form fields
- **Shift + Tab**: Move backwards through fields
- **Enter**: Submit forms (when in a field)
- **Esc**: Close modals and dialogs

## Troubleshooting

### Application Won't Start
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

### Port 3000 Already in Use
```bash
# On Mac/Linux
lsof -ti:3000 | xargs kill -9

# On Windows
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F

# Or use a different port
PORT=3001 npm start
```

### Data Disappeared
- Check if you cleared browser data/cache
- Look for your backup JSON file
- Restore using Settings → Import Data

### PDF Not Downloading
- Check browser's download settings
- Allow downloads for localhost
- Check browser console for errors (F12)
- Try a different browser

### Can't See Recent Changes
- Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache
- Restart the development server

## Getting Help

### Documentation
- `README.md` - Project overview
- `USER_GUIDE.md` - Detailed usage instructions
- `FEATURES.md` - Complete feature list
- `CUSTOMIZATION_GUIDE.md` - How to customize
- `SETUP_GUIDE.md` - Detailed setup instructions

### Browser Console
Press F12 to open developer tools and check the Console tab for error messages.

### Common Questions

**Q: Can I use this on multiple computers?**
A: Data is stored locally in your browser. To use on multiple devices, export from one and import to another.

**Q: Is my data backed up automatically?**
A: No. Use Settings → Export Data to create backups manually.

**Q: Can multiple people use this at once?**
A: Each browser/user has separate data. No real-time collaboration.

**Q: Can I change the currency?**
A: Yes! See `CUSTOMIZATION_GUIDE.md` for instructions.

**Q: What happens if I delete a customer who has invoices?**
A: The invoices remain but show "Unknown" for the customer name.

## Next Steps

Now that you're set up:

1. ✅ Create 2-3 customers
2. ✅ Create a test invoice
3. ✅ Generate a PDF and review it
4. ✅ Experiment with different VAT rates
5. ✅ Export your data as backup
6. ✅ Customize colors/branding (see CUSTOMIZATION_GUIDE.md)
7. ✅ Read USER_GUIDE.md for advanced features

## Production Deployment

When ready to deploy for real use:

```bash
# Build optimized production version
npm run build

# Deploy the 'build' folder to:
# - Netlify
# - Vercel
# - GitHub Pages
# - Your own server
```

See `SETUP_GUIDE.md` for detailed deployment instructions.

---

## Summary

**To create your first invoice:**
1. `npm install` (one time)
2. `npm start`
3. Add a customer
4. Create an invoice
5. Download as PDF
6. Send to your client

**That's it!** You're ready to start managing invoices professionally.

For more details, check the other documentation files in this project.

Happy invoicing! 🎉
