# Deployment Guide

This guide covers deploying Invoice Manager to various hosting platforms.

## Table of Contents
1. [Building for Production](#building-for-production)
2. [Deploy to Netlify](#deploy-to-netlify)
3. [Deploy to Vercel](#deploy-to-vercel)
4. [Deploy to GitHub Pages](#deploy-to-github-pages)
5. [Deploy to AWS S3](#deploy-to-aws-s3)
6. [Deploy to Your Own Server](#deploy-to-your-own-server)
7. [Environment Configuration](#environment-configuration)
8. [Post-Deployment Checklist](#post-deployment-checklist)

---

## Building for Production

Before deploying, create an optimized production build:

```bash
npm run build
```

This command:
- Minifies JavaScript and CSS
- Optimizes images and assets
- Creates source maps
- Generates a `build` folder with production-ready files

The `build` folder contains:
- `index.html` - Entry point
- `static/` - JS, CSS, and media files
- `manifest.json` - PWA configuration
- Other assets

**Build folder size**: ~200-500 KB (compressed)

---

## Deploy to Netlify

### Method 1: Drag and Drop (Easiest)

1. Run `npm run build`
2. Go to [Netlify Drop](https://app.netlify.com/drop)
3. Drag the `build` folder onto the page
4. Your site will be deployed instantly!
5. You'll get a URL like `https://random-name.netlify.app`

### Method 2: GitHub Integration (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_URL
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Go to [Netlify](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and authorize
   - Select your repository

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `build`
   - Click "Deploy site"

4. **Custom Domain (Optional)**
   - Go to Site settings → Domain management
   - Add custom domain
   - Follow DNS configuration instructions

### Method 3: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
npm run build
netlify deploy --prod --dir=build
```

**Netlify Features:**
- Free SSL certificate
- Automatic HTTPS
- Global CDN
- Instant rollback
- Preview deployments

---

## Deploy to Vercel

### Method 1: Vercel CLI (Easiest)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel
```

Follow the prompts:
- Set up and deploy? Yes
- Which scope? Your account
- Link to existing project? No
- Project name? invoice-manager
- Directory? ./
- Want to override settings? No

### Method 2: GitHub Integration

1. **Push to GitHub** (see Netlify section)

2. **Import to Vercel**
   - Go to [Vercel](https://vercel.com/)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Vercel auto-detects React
   - Click "Deploy"

3. **Configure (if needed)**
   - Framework: Create React App
   - Build command: `npm run build`
   - Output directory: `build`

**Vercel Features:**
- Free SSL
- Automatic deployments
- Preview URLs for branches
- Analytics (optional)
- Edge Network

---

## Deploy to GitHub Pages

### Step 1: Install gh-pages

```bash
npm install --save-dev gh-pages
```

### Step 2: Update package.json

Add homepage and scripts:

```json
{
  "name": "invoice-manager",
  "version": "0.1.0",
  "homepage": "https://YOUR_USERNAME.github.io/invoice-manager",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

Replace `YOUR_USERNAME` with your GitHub username.

### Step 3: Deploy

```bash
npm run deploy
```

This will:
1. Build the project
2. Create a `gh-pages` branch
3. Push the build folder to GitHub Pages
4. Your site will be live at the homepage URL

### Step 4: Configure GitHub

1. Go to your repository on GitHub
2. Settings → Pages
3. Source: `gh-pages` branch
4. Click Save

**Note**: GitHub Pages is free but public only (for free accounts).

---

## Deploy to AWS S3

### Prerequisites
- AWS account
- AWS CLI installed
- AWS credentials configured

### Step 1: Build the Project

```bash
npm run build
```

### Step 2: Create S3 Bucket

```bash
aws s3 mb s3://invoice-manager-YOUR-UNIQUE-NAME
```

### Step 3: Configure Bucket for Website Hosting

```bash
aws s3 website s3://invoice-manager-YOUR-UNIQUE-NAME \
  --index-document index.html \
  --error-document index.html
```

### Step 4: Set Bucket Policy

Create `bucket-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::invoice-manager-YOUR-UNIQUE-NAME/*"
    }
  ]
}
```

Apply policy:

```bash
aws s3api put-bucket-policy \
  --bucket invoice-manager-YOUR-UNIQUE-NAME \
  --policy file://bucket-policy.json
```

### Step 5: Upload Build Files

```bash
aws s3 sync build/ s3://invoice-manager-YOUR-UNIQUE-NAME \
  --delete \
  --cache-control max-age=31536000,public
```

### Step 6: Access Your Site

Your site is now available at:
```
http://invoice-manager-YOUR-UNIQUE-NAME.s3-website-REGION.amazonaws.com
```

### Optional: CloudFront CDN

For better performance and HTTPS:
1. Create CloudFront distribution
2. Point to S3 bucket
3. Enable HTTPS
4. Add custom domain

**Cost**: ~$0.50-$2/month for basic usage

---

## Deploy to Your Own Server

### Requirements
- Web server (Apache, Nginx, etc.)
- SSH access
- Domain name (optional)

### Step 1: Build

```bash
npm run build
```

### Step 2: Upload Files

Using SCP:
```bash
scp -r build/* user@your-server.com:/var/www/html/invoice-manager/
```

Using FTP:
- Connect with FileZilla or similar
- Upload contents of `build` folder

### Step 3: Configure Web Server

#### Nginx Configuration

Create `/etc/nginx/sites-available/invoice-manager`:

```nginx
server {
    listen 80;
    server_name invoice.yourdomain.com;
    root /var/www/html/invoice-manager;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable and restart:
```bash
sudo ln -s /etc/nginx/sites-available/invoice-manager /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Apache Configuration

Create `.htaccess` in the build folder:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Step 4: SSL Certificate (Recommended)

Using Let's Encrypt:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d invoice.yourdomain.com
```

---

## Environment Configuration

### Custom Domain

After deployment, you may want to:
1. Purchase a domain (Namecheap, GoDaddy, etc.)
2. Configure DNS to point to your deployment
3. Enable HTTPS (usually automatic on Netlify/Vercel)

### Environment Variables

If you add backend features, create `.env`:

```env
REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_VERSION=1.0.0
```

Use in code:
```javascript
const apiUrl = process.env.REACT_APP_API_URL;
```

### Build Optimization

For smaller builds:

1. **Analyze Bundle Size**
   ```bash
   npm install --save-dev source-map-explorer
   npm run build
   npx source-map-explorer 'build/static/js/*.js'
   ```

2. **Remove Unused Dependencies**
   ```bash
   npm prune
   ```

3. **Enable Gzip** (usually automatic on hosting platforms)

---

## Post-Deployment Checklist

After deploying, verify:

- [ ] Site loads correctly
- [ ] All pages are accessible (Dashboard, Invoices, Customers, Settings)
- [ ] Navigation works properly
- [ ] Can create a customer
- [ ] Can create an invoice
- [ ] PDF generation works
- [ ] Data persists after refresh
- [ ] Export data works
- [ ] Import data works
- [ ] Mobile responsive design works
- [ ] HTTPS is enabled (if applicable)
- [ ] Custom domain works (if applicable)
- [ ] Browser console has no errors
- [ ] All images/icons load

### Test in Multiple Browsers

- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if on Mac)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Performance Testing

Use these tools:
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

Target scores:
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 80+ (not critical for this app)

---

## Continuous Deployment

### Automatic Deployments with GitHub

Both Netlify and Vercel support automatic deployments:

1. Connect repository (done during setup)
2. Every push to main branch triggers deployment
3. Pull requests get preview deployments
4. Merge to main deploys to production

### GitHub Actions (Advanced)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=build
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

---

## Monitoring and Maintenance

### Analytics (Optional)

Add Google Analytics:

1. Get tracking ID from Google Analytics
2. Add to `public/index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### Error Monitoring

Consider:
- [Sentry](https://sentry.io/) - Error tracking
- [LogRocket](https://logrocket.com/) - Session replay
- Browser console logs

### Uptime Monitoring

Free services:
- [UptimeRobot](https://uptimerobot.com/)
- [StatusCake](https://www.statuscake.com/)
- [Pingdom](https://www.pingdom.com/)

---

## Troubleshooting Deployment Issues

### Build Fails

```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Blank Page After Deploy

- Check browser console for errors
- Verify `homepage` in package.json is correct
- Check routing configuration
- Ensure all routes return index.html (SPA)

### Assets Not Loading

- Check relative paths in code
- Verify PUBLIC_URL environment variable
- Check browser network tab for 404s

### PDF Generation Fails

- Ensure jsPDF and jsPDF-autotable are in dependencies (not devDependencies)
- Check browser compatibility
- Verify no CORS issues

---

## Cost Comparison

| Platform | Free Tier | Paid Plans | Best For |
|----------|-----------|------------|----------|
| **Netlify** | 100 GB bandwidth/month | $19/mo | Most users |
| **Vercel** | 100 GB bandwidth/month | $20/mo | Developers |
| **GitHub Pages** | Unlimited (public repos) | N/A | Open source |
| **AWS S3** | 5 GB storage, 15 GB transfer | ~$1-5/mo | Control freaks |
| **Own Server** | Varies | $5-50/mo | Full control |

**Recommendation**: Start with Netlify or Vercel for easiest setup and best features.

---

## Security Considerations

Since this is a client-side app:
- ✅ No server means no server vulnerabilities
- ✅ Data stays in user's browser
- ✅ HTTPS protects data in transit
- ✅ No database to hack
- ⚠️ Users should backup data regularly
- ⚠️ Don't clear browser data without backup

---

## Conclusion

You now have everything you need to deploy Invoice Manager!

**Quick recommendation:**
1. Push code to GitHub
2. Connect to Netlify or Vercel
3. Get free HTTPS and automatic deployments
4. Share your invoice manager with the world!

For questions or issues, review the troubleshooting section or check the documentation files.

Happy deploying! 🚀
