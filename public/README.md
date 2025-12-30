# Public Assets

This folder contains all static assets for the Red Flag Car Club website.

## Structure

```
public/
├── css/              # Stylesheets (plugins.css, style.css)
├── img/              # Images and videos
│   ├── about/        # About section images
│   ├── background/   # Background images
│   ├── contact/      # Contact section images
│   ├── drives/       # Drive gallery media
│   │   ├── drive-1/  # Individual drive folders
│   │   ├── drive-2/
│   │   └── ...
│   ├── effects/      # Effect images (film grain, etc.)
│   ├── logo/         # Logo files
│   ├── services/     # Gallery section videos
│   └── works/        # Works section images
├── fonts/            # Custom fonts (Ionicons, Autobahn, etc.)
└── js/               # Legacy JavaScript files

```

## Moving Assets

To complete the setup, copy the following from the original site:

1. **Copy CSS folder:**
   ```bash
   cp -r css/ public/css/
   ```

2. **Copy img folder:**
   ```bash
   cp -r img/ public/img/
   ```

3. **Copy fonts folder:**
   ```bash
   cp -r fonts/ public/fonts/
   ```

4. **Copy js folder (optional):**
   ```bash
   cp -r js/ public/js/
   ```

## Asset Optimization

For better performance, consider:
- ✅ Converting images to WebP format
- ✅ Compressing videos
- ✅ Removing unused assets
- ✅ Using Next.js Image component for images

The assets are already in the correct location from the original site, so Next.js will serve them from the `/public` directory automatically.

