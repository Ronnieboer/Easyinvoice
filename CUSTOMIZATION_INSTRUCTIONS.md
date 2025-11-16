# How to Add Your Company Logo and Details

## ✅ Changes Already Made

Your application has been customized with:
- ✅ Application name changed to "easyinvoice"
- ✅ Currency changed from USD ($) to DKK (Danish Krone)
- ✅ Company information section added to PDFs
- ✅ Logo placeholder added to PDF generation
- ✅ Danish date formatting (da-DK)

## 🎨 Adding Your Company Logo

### Step 1: Prepare Your Logo

1. **Recommended format**: PNG with transparent background
2. **Recommended size**: 400x200 pixels (width x height)
3. **File size**: Keep under 100KB for fast PDF generation

### Step 2: Convert Logo to Base64

**Option A - Online Converter (Easiest):**
1. Go to: https://www.base64-image.de/
2. Upload your logo image
3. Click "Copy image" to copy the base64 string
4. You'll get something like: `data:image/png;base64,iVBORw0KG...`

**Option B - Command Line:**
```bash
# On Mac/Linux
base64 -i your-logo.png | pbcopy

# On Windows PowerShell
[convert]::ToBase64String((Get-Content "your-logo.png" -Encoding Byte)) | clip
```

### Step 3: Add Logo to Application

Open `src/components/InvoiceList.js` and find this section (around line 12):

```javascript
const companyInfo = {
  name: 'Your Company Name',
  address: 'Your Business Address',
  city: 'City, Postal Code',
  country: 'Denmark',
  phone: '+45 12 34 56 78',
  email: 'contact@yourcompany.dk',
  cvr: 'CVR: 12345678',
  logo: null // <-- REPLACE THIS
};
```

**Replace with your details:**

```javascript
const companyInfo = {
  name: 'easyinvoice ApS',
  address: 'Hovedgaden 123',
  city: '2100 København Ø',
  country: 'Denmark',
  phone: '+45 12 34 56 78',
  email: 'info@easyinvoice.dk',
  cvr: 'CVR: 12345678',
  logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...' // PASTE YOUR BASE64 HERE
};
```

### Step 4: Test the Logo

1. Save the file
2. Create a test invoice
3. Generate PDF
4. Check if logo appears in top-right corner

## 📝 Customizing Company Information

Edit the `companyInfo` object in `src/components/InvoiceList.js`:

```javascript
const companyInfo = {
  name: 'Your Company Name',        // Your business name
  address: 'Your Business Address', // Street address
  city: 'City, Postal Code',        // City and postal code
  country: 'Denmark',                // Country
  phone: '+45 12 34 56 78',         // Phone number
  email: 'contact@yourcompany.dk',  // Email address
  cvr: 'CVR: 12345678',             // Danish CVR number
  logo: null                         // Base64 logo or null
};
```

### Example for a Real Company:

```javascript
const companyInfo = {
  name: 'Nordic Solutions ApS',
  address: 'Nørregade 42, 3. sal',
  city: '1165 København K',
  country: 'Danmark',
  phone: '+45 33 12 34 56',
  email: 'faktura@nordicsolutions.dk',
  cvr: 'CVR: 39876543',
  logo: 'data:image/png;base64,YOUR_LOGO_HERE'
};
```

## 🎨 Logo Positioning and Size

If you want to adjust the logo size or position, find this line in `InvoiceList.js` (around line 34):

```javascript
doc.addImage(companyInfo.logo, 'PNG', 150, 10, 40, 20);
//                                     X    Y   W   H
```

**Parameters:**
- **X (150)**: Horizontal position from left (increase to move right)
- **Y (10)**: Vertical position from top (increase to move down)
- **W (40)**: Width in mm
- **H (20)**: Height in mm

**Examples:**
```javascript
// Larger logo
doc.addImage(companyInfo.logo, 'PNG', 140, 10, 50, 25);

// Smaller logo
doc.addImage(companyInfo.logo, 'PNG', 155, 10, 30, 15);

// Move to left side
doc.addImage(companyInfo.logo, 'PNG', 20, 10, 40, 20);
```

## 🔧 Troubleshooting

### Logo doesn't appear
- Check that base64 string starts with `data:image/png;base64,`
- Ensure no line breaks in the base64 string
- Check browser console (F12) for errors
- Try a smaller image file

### Logo is too large/small
- Adjust the W (width) and H (height) parameters
- Maintain aspect ratio (if logo is 2:1, use 40x20 or 60x30)

### Logo quality is poor
- Use a higher resolution source image
- Ensure PNG format with transparent background
- Try SVG format converted to PNG first

### Base64 string too long
- Compress your image first
- Use online tools like TinyPNG.com
- Aim for under 100KB file size

## ✅ Quick Test Checklist

After adding your logo and company info:

- [ ] Save `InvoiceList.js`
- [ ] Refresh your browser (Ctrl+R or Cmd+R)
- [ ] Go to Invoices or create a new invoice
- [ ] Click "Download PDF"
- [ ] Open the PDF
- [ ] Check:
  - [ ] Logo appears in top-right
  - [ ] Logo is clear and properly sized
  - [ ] Company name appears
  - [ ] Address is correct
  - [ ] Phone and email are correct
  - [ ] CVR number is correct
  - [ ] Currency shows as DKK
  - [ ] Dates are in Danish format

## 📋 Example Complete Configuration

Here's a complete example you can copy and modify:

```javascript
const companyInfo = {
  name: 'easyinvoice ApS',
  address: 'Østerbrogade 55, 2. sal',
  city: '2100 København Ø',
  country: 'Danmark',
  phone: '+45 70 20 30 40',
  email: 'kontakt@easyinvoice.dk',
  cvr: 'CVR: 12345678',
  logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...' // Your logo here
};
```

## 🎓 Need More Help?

- Check the main CUSTOMIZATION_GUIDE.md for more options
- Review USER_GUIDE.md for general usage
- Test with sample data first (Settings → Load Sample Data)
- Make one change at a time and test

Your invoices will now show your company branding! 🎉
