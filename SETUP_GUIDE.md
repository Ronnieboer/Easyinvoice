# Setup Guide - Invoice Manager

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**

To check if you have Node.js installed:
```bash
node --version
npm --version
```

## Installation Steps

### 1. Navigate to the project directory
```bash
cd /path/to/invoice-manager
```

### 2. Install dependencies
```bash
npm install
```

This will install all required packages:
- react & react-dom (^18.2.0)
- react-router-dom (^6.20.0)
- jspdf (^2.5.1)
- jspdf-autotable (^3.8.2)
- lucide-react (^0.294.0)

### 3. Start the development server
```bash
npm start
```

The application will automatically open in your browser at `http://localhost:3000`

### 4. Build for production (optional)
```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Deployment

### Deploy to Netlify
1. Push your code to GitHub
2. Go to [Netlify](https://www.netlify.com/)
3. Click "Add new site" → "Import an existing project"
4. Select your repository
5. Build command: `npm run build`
6. Publish directory: `build`

### Deploy to Vercel
1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/)
3. Click "Import Project"
4. Select your repository
5. Vercel will auto-detect React and deploy

### Deploy to GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
   ```json
   "homepage": "https://yourusername.github.io/invoice-manager",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
3. Run: `npm run deploy`

## Troubleshooting

### Port 3000 is already in use
```bash
# Kill the process using port 3000
# On Mac/Linux:
lsof -ti:3000 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Dependencies not installing
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Application not loading
- Check browser console for errors (F12)
- Ensure you're using a modern browser (Chrome, Firefox, Safari, Edge)
- Clear browser cache and reload

## Browser Compatibility

The application works on:
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)

## Data Storage

All data is stored locally in your browser's localStorage. To backup your data:
1. Open browser DevTools (F12)
2. Go to Application/Storage → Local Storage
3. Export the data from the `customers`, `invoices`, and `nextInvoiceNumber` keys

## Support

For issues or questions:
- Check the README.md for feature documentation
- Review the USER_GUIDE.md for usage instructions
- Check browser console for error messages
