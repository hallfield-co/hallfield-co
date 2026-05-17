# SEO Launch Notes

Before launch, replace `https://example.com/` in `robots.txt` and `sitemap.xml` with the final production domain.

After launch, update `index.html` social image tags to absolute URLs if desired:

```html
<meta property="og:image" content="https://yourdomain.com/assets/icons/icon-512.png">
<meta name="twitter:image" content="https://yourdomain.com/assets/icons/icon-512.png">
```

Recommended launch checks:

- Add the final domain to Google Search Console.
- Submit `https://yourdomain.com/sitemap.xml`.
- Run the page through PageSpeed Insights.
- Compress PNGs with ImageOptim or a similar lossless PNG optimizer.
