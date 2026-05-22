# Kwaku Karikari Manu — Personal Website

A clean, fast, static personal website for an academic profile. No build step, no Jekyll, no dependencies — just HTML, CSS, and a tiny bit of JavaScript. Hosted free on GitHub Pages.

## Live site

https://kwakumanu.github.io  *(replace once published)*

## Structure

```
.
├── index.html           # Homepage (About + recent publications)
├── publications.html    # Full publications list
├── cv.html              # Curriculum Vitae
├── talks.html           # Conference presentations
├── teaching.html        # Teaching experience
├── assets/
│   ├── css/style.css    # All styling
│   └── js/main.js       # Mobile menu + copyright year
├── images/
│   └── profile.jpg      # Profile photo (add this file)
└── files/
    └── MANU_CV.pdf      # Downloadable CV (add this file)
```

## How to update the site

Everything is plain HTML — open any `.html` file in a text editor and edit. No build commands.

### Adding a new publication

Open `publications.html`, find the `<div class="pub-list">` section, and add a new block:

```html
<article class="pub-item">
  <div class="pub-year">2026</div>
  <div class="pub-content">
    <p class="pub-title">Paper title here</p>
    <p class="pub-authors"><strong>Manu, K. K.</strong>, Co-Author, A.</p>
    <p class="pub-venue"><em>Journal Name</em>, vol(issue), pages.</p>
  </div>
</article>
```

If it's also recent, copy the same block into the "Selected publications" section of `index.html`.

### Adding a new talk

Open `talks.html` and add a new `<article class="talk-item">` block at the top of the list — same pattern.

### Updating the CV

Edit `cv.html` directly. Each role uses the `cv-item` structure.

To replace the downloadable PDF, save your new CV as `files/MANU_CV.pdf` (overwrite the old one).

### Changing the profile photo

Save a square photo (recommended: 600x600 px or larger) as `images/profile.jpg`. The site automatically falls back to "KM" initials if the file is missing.

### Changing colors

All colors live at the top of `assets/css/style.css` in the `:root` block. Edit those variables to rebrand the whole site at once.

## Deploying to GitHub Pages

1. Create a new GitHub repository named `<your-username>.github.io` (this is the magic name for a personal site).
2. Upload all the files in this folder to that repo (drag-and-drop in the GitHub web UI works fine).
3. Go to **Settings → Pages**, set the source to "Deploy from a branch", branch `main`, folder `/ (root)`.
4. Wait 1–2 minutes. Your site will be live at `https://<your-username>.github.io`.

### Using a custom domain (e.g. kwakumanu.com)

1. Buy the domain from a registrar (Namecheap, Cloudflare, Google Domains, etc.).
2. In your repo, create a file called `CNAME` containing just your domain (e.g. `kwakumanu.com`).
3. At your registrar, add these DNS records:
   - Four A records pointing to: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - One CNAME record `www` → `<your-username>.github.io`
4. In GitHub repo Settings → Pages, enter your custom domain. Wait for DNS to propagate (usually under an hour).

## Browser support

Works in all modern browsers (Chrome, Firefox, Safari, Edge). Fully responsive — looks good on phones, tablets, and desktops.

## License

Content © Kwaku Karikari Manu. Site template free to use.
