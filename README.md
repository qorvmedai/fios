# F.I.I.S — First Independence Income System

A standalone landing page for the F.I.I.S program, a 30-day business mentorship system designed for Nigerian students.

## Project Structure

```
fiis/
├── index.html              # Main landing page
├── css/
│   └── styles.css          # Complete stylesheet with design system
├── js/
│   └── script.js           # Interactive functionality (vanilla JS)
├── assets/
│   ├── images/
│   │   ├── testimonials/   # Student testimonial screenshots
│   │   ├── founder/        # Founder photo(s)
│   │   ├── students/       # Group/program photos
│   │   └── general/        # General images
│   └── REQUIRED-ASSETS.md  # Documentation of required image assets
└── README.md               # This file
```

## How to Run Locally

### Option 1: Direct File Open
Simply open `index.html` in any modern web browser.

### Option 2: Local Server (Recommended)
Using Python:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`

Using Node.js:
```bash
npx serve .
```

Using VS Code:
Install the "Live Server" extension, right-click `index.html` → "Open with Live Server"

## How to Deploy

This is a static website. Deploy to any static hosting provider:

### Vercel
```bash
npx vercel
```

### Netlify
Drag and drop the project folder to [app.netlify.com](https://app.netlify.com)

### GitHub Pages
Push to a GitHub repository, then enable Pages in repository Settings → Pages → Source: main branch.

### Cloudflare Pages
Connect your GitHub repository at [pages.cloudflare.com](https://pages.cloudflare.com)

### Traditional Hosting
Upload all files via FTP to your web server's public directory.

## Configuration

All configurable values are centralized in `js/script.js` at the top of the file in the `CONFIG` object:

```javascript
const CONFIG = {
  currentPrice: '₦10,000',
  originalPrice: '₦65,000',
  spots: 100,
  countdownTarget: '2026-08-21T23:59:59',
  accountNumber: '9042447293',
  accountName: 'CHIDIEBUBE NICHOLAS DIVINE',
  // ... more options
};
```

### Updating the Countdown
Change `countdownTarget` to your desired end date/time.

### Updating Pricing
Change `currentPrice` and `originalPrice` values.

### Updating Payment Info
Change `accountNumber` and `accountName`.

## Adding Missing Images

See `assets/REQUIRED-ASSETS.md` for a complete list of images that need to be added manually from Google Drive.

1. Download images from the Google Drive folders listed in the asset doc
2. Rename them according to the naming convention in the doc
3. Place them in the appropriate subdirectory under `assets/images/`
4. The HTML already references the correct paths — no code changes needed

## Technology Stack

- **HTML5** — Semantic markup
- **CSS3** — Custom properties, Flexbox, Grid, animations
- **Vanilla JavaScript** — No frameworks or libraries
- **Google Fonts** — Inter & Outfit

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- Mobile browsers (iOS Safari, Chrome for Android)

## No External Dependencies

This website has **zero runtime dependencies**:
- No npm packages
- No frameworks
- No build step required
- No Lovable dependency
- No iframe embedding
- No external API calls (except Google Fonts)

## License

© Tehilla Amplify Solutions (TAS). All rights reserved.
