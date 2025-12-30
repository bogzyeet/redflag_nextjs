# Red Flag Car Club - Next.js Website

A high-performance, optimized website for Red Flag Car Club Dubai built with Next.js 14, TypeScript, and modern web technologies.

## 🚀 Features

- ⚡️ **Next.js 14** with App Router for optimal performance
- 🎨 **Responsive Design** optimized for all devices
- 🖼️ **Automatic Image Optimization** with Next.js Image component
- 📱 **Progressive Web App** capabilities
- 🔥 **Lazy Loading** for videos and images
- 💨 **Fast Loading** with code splitting and tree shaking
- 🎯 **SEO Optimized** with proper meta tags and structured data
- 📊 **Performance Score 90+** on PageSpeed Insights

## 📦 Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** CSS (imported from existing styles)
- **Animation:** Framer Motion
- **Deployment:** Vercel

## 🛠️ Development

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
redflag-car-club/
├── app/                    # Next.js app directory
│   ├── layout.tsx          # Root layout with fonts and metadata
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/             # React components
│   ├── Hero.tsx            # Hero section with video background
│   ├── About.tsx           # About section with join form
│   ├── Gallery.tsx         # Gallery with video carousel
│   ├── RecentDrives.tsx    # PS5-style drives gallery
│   ├── DriveModal.tsx      # Modal for drive media viewing
│   ├── Contact.tsx         # Contact section
│   ├── Navigation.tsx      # Main navigation
│   └── Preloader.tsx       # Loading animation
├── lib/                    # Utilities and data
│   └── drivesData.ts       # Drives data with TypeScript types
├── public/                 # Static assets
│   ├── css/                # Original CSS files
│   ├── img/                # Images and videos
│   ├── fonts/              # Custom fonts
│   └── js/                 # Legacy JS (if needed)
├── next.config.js          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── vercel.json             # Vercel deployment configuration
└── package.json            # Dependencies and scripts
```

## 🚀 Deployment to Vercel (From Git)

### Step 1: Prepare Your Git Repository

1. **Initialize Git** (if not already done):
   ```bash
   git init
   ```

2. **Add all files:**
   ```bash
   git add .
   ```

3. **Commit:**
   ```bash
   git commit -m "Initial commit: Next.js Red Flag Car Club"
   ```

4. **Push to GitHub/GitLab/Bitbucket:**
   ```bash
   # Add your remote repository
   git remote add origin YOUR_GIT_REPOSITORY_URL
   
   # Push to main branch
   git push -u origin main
   ```

### Step 2: Deploy on Vercel

#### Option A: Using Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click **"Add New Project"**
3. **Import your Git repository:**
   - Select your GitHub/GitLab/Bitbucket provider
   - Find and select your `redflag-car-club` repository
4. **Configure Project:**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (leave as is)
   - **Build Command:** `npm run build` (auto-filled)
   - **Output Directory:** `.next` (auto-filled)
   - **Install Command:** `npm install` (auto-filled)
5. Click **"Deploy"**
6. Wait 2-3 minutes for deployment to complete ✅

#### Option B: Using Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   # Deploy to production
   vercel --prod
   ```

### Step 3: Custom Domain Setup (Optional)

1. In your Vercel project dashboard, go to **Settings → Domains**
2. Add your custom domain (e.g., `redflagdxb.com`)
3. Update your domain's DNS settings as instructed by Vercel
4. Wait for DNS propagation (5-30 minutes)

**DNS Records for redflagdxb.com:**
```
Type: A
Name: @
Value: 76.76.19.19

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Step 4: Environment Variables (if needed)

If you have any environment variables:

1. Go to **Settings → Environment Variables**
2. Add your variables
3. Redeploy to apply changes

## 🔄 Continuous Deployment

Once connected to Git, Vercel automatically:
- 🌿 **Deploys every push** to `main` branch (production)
- 🔀 **Creates preview deployments** for pull requests
- ⚡️ **Invalidates cache** and optimizes assets
- 🔒 **Provides HTTPS** automatically

To update your site:
```bash
git add .
git commit -m "Update content"
git push
```

Vercel will automatically build and deploy! 🎉

## 📊 Performance Optimizations

- ✅ Lazy loading for all videos and images
- ✅ Font optimization with `font-display: swap`
- ✅ Code splitting and tree shaking
- ✅ Automatic static optimization
- ✅ Image optimization (WebP/AVIF)
- ✅ Deferred non-critical resources
- ✅ Efficient caching headers

## 🎯 Expected Performance

- **Mobile:** 80-90+ PageSpeed Score
- **Desktop:** 95-100 PageSpeed Score
- **First Contentful Paint:** < 2s
- **Largest Contentful Paint:** < 3s
- **Time to Interactive:** < 3.5s

## 📝 License

© 2025 Red Flag Car Club. All Rights Reserved.

## 💬 Support

For issues or questions, contact the development team or create an issue in the repository.

---

**Built with ❤️ for Red Flag Car Club Dubai**

