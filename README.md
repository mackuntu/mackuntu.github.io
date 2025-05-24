# MartinNotes Blog

A personal Jekyll blog by Martin Qian featuring thoughts on management, technology, life pro tips, and life events. Built with Jekyll and deployed on GitHub Pages.

## 🚀 Features

- **Jekyll-powered** static site generator
- **Responsive design** with custom Sass styling
- **SEO optimized** with jekyll-seo-tag
- **Syntax highlighting** with Rouge
- **Google Analytics** integration
- **Disqus comments** system
- **Category archives** and pagination
- **RSS feed** generation
- **Sitemap** auto-generation
- **Docker support** for containerized development

## 📋 Prerequisites

### Native Development
- Ruby (2.7+ recommended)
- Bundler gem: `gem install bundler`

### Docker Development (Alternative)
- Docker and Docker Compose

## 🛠 Installation & Setup

### Option 1: Native Ruby Environment

1. Clone the repository:
   ```bash
   git clone https://github.com/mackuntu/mackuntu.github.io.git
   cd mackuntu.github.io
   ```

2. Install dependencies:
   ```bash
   bundle install
   ```

3. Serve the site locally:
   ```bash
   bundle exec jekyll serve
   ```

4. Open your browser to `http://localhost:4000`

### Option 2: Docker Environment

1. Clone the repository:
   ```bash
   git clone https://github.com/mackuntu/mackuntu.github.io.git
   cd mackuntu.github.io
   ```

2. Start the Docker container:
   ```bash
   docker-compose up
   ```

3. Open your browser to `http://localhost:4000`

## ✍️ Content Creation

### Creating New Posts

Use the provided script for quick post creation:

```bash
./post.sh "your post title"
```

This creates a new draft in `_drafts/` with the current date and standardized front matter:
- Layout: post
- Categories: empty (to be filled)
- Tags: [green] (default)
- Author: martin
- Comments: enabled

### Manual Post Creation

1. Create a new file in `_posts/` with format: `YYYY-MM-DD-title.markdown`
2. Add the required front matter:
   ```yaml
   ---
   layout: post
   title: "Your Post Title"
   categories: [category1, category2]
   tags: [tag1, tag2]
   description: "Brief description"
   author: martin
   image: assets/images/your-image.jpg
   featured: true
   hidden: false
   rating: 4.5
   comments: true
   ---
   ```
3. Write your content in Markdown below the front matter

### Working with Drafts

- Drafts are stored in `_drafts/`
- To preview drafts locally: `bundle exec jekyll serve --drafts`
- Move drafts to `_posts/` when ready to publish

## 📁 Project Structure

```
├── _drafts/          # Unpublished posts
├── _includes/        # Reusable page components
├── _layouts/         # Page templates
├── _pages/           # Static pages
├── _posts/           # Published blog posts
├── _sass/            # Sass stylesheets
├── _templates/       # Post templates
├── assets/           # Static assets
│   ├── css/         # Compiled CSS
│   ├── fonts/       # Web fonts
│   ├── images/      # Images and media
│   ├── js/          # JavaScript files
│   └── touch-icons/ # Favicon variations
├── _config.yml       # Jekyll configuration
├── docker-compose.yml # Docker setup
├── Gemfile          # Ruby dependencies
├── post.sh          # Post creation script
└── README.md        # This file
```

## ⚙️ Configuration

### Site Settings (`_config.yml`)

Key configurations include:
- **Title**: MartinNotes
- **Author**: Martin Qian
- **Analytics**: Google Analytics (G-MK0NRFNRDN)
- **Comments**: Disqus (mackuntu)
- **Pagination**: 6 posts per page
- **Markdown**: Kramdown with GFM input

### Author Profile

The author information is configured in `_config.yml`:
```yaml
authors:
  martin:
    name: Martin
    email: mackuntu@gmail.com
    web: https://www.mackuntu.com
    twitter: https://twitter.com/martin_qian
```

## 🚀 Deployment

This blog is automatically deployed to [GitHub Pages](https://pages.github.com/) when changes are pushed to the main branch.

### Custom Domain
The site uses a custom domain configured via the `CNAME` file.

### Manual Deployment
No manual deployment steps required - GitHub Pages handles the Jekyll build process automatically.

## 🧰 Development Commands

```bash
# Serve locally
bundle exec jekyll serve

# Serve with drafts
bundle exec jekyll serve --drafts

# Build for production
bundle exec jekyll build

# Update dependencies
bundle update

# Create new post
./post.sh "Post Title"
```

## 📝 Writing Guidelines

- Use Markdown for content formatting
- Include featured images in `assets/images/`
- Categorize posts appropriately
- Add relevant tags for better discoverability
- Set `featured: true` for important posts
- Use `hidden: true` to exclude from main listings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## 📄 License

This project is licensed under the terms specified in `LICENSE.txt`.

---

**Martin Qian** | [Website](https://www.mackuntu.com) | [Twitter](https://twitter.com/martin_qian)
Updated
