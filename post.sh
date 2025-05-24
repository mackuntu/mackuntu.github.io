#!/bin/bash

# Function to display usage
function usage() {
    echo "Usage: $0 'Post Title' [category] [--featured] [--draft]"
    echo ""
    echo "Examples:"
    echo "  $0 'My New Blog Post'"
    echo "  $0 'Technical Deep Dive' technology"
    echo "  $0 'Important Announcement' startup --featured"
    echo "  $0 'Work in Progress' opinion --draft"
    echo ""
    echo "Options:"
    echo "  --featured    Mark post as featured"
    echo "  --draft       Create as draft (default is published post)"
    echo ""
    echo "Available categories: business, defense, life-event, management, opinion, startup, technology"
    exit 1
}

# Check for help flag first
if [[ "$1" == "--help" || "$1" == "-h" ]]; then
    usage
fi

# Check if at least one argument is provided
if [ $# -lt 1 ]; then
    usage
fi

# Parse arguments
POST_TITLE="$1"
CATEGORY=""
FEATURED="false"
IS_DRAFT="false"

# Parse additional arguments
shift
while [[ $# -gt 0 ]]; do
    case $1 in
        --featured)
            FEATURED="true"
            shift
            ;;
        --draft)
            IS_DRAFT="true"
            shift
            ;;
        --help|-h)
            usage
            ;;
        *)
            if [ -z "$CATEGORY" ]; then
                CATEGORY="$1"
            else
                echo "Unknown option: $1"
                usage
            fi
            shift
            ;;
    esac
done

# Generate date and filename
TODAY=$(date +%Y-%m-%d)
FILENAME_TITLE=$(echo "$POST_TITLE" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9 ]//g' | tr ' ' '-' | sed 's/--*/-/g' | sed 's/^-\|-$//g')
FILENAME="${TODAY}-${FILENAME_TITLE}.md"

# Determine directory
if [ "$IS_DRAFT" = "true" ]; then
    TARGET_DIR="_drafts"
    echo "Creating draft post..."
else
    TARGET_DIR="_posts"
    echo "Creating published post..."
fi

# Create target directory if it doesn't exist
mkdir -p "$TARGET_DIR"

# Generate categories array
if [ -n "$CATEGORY" ]; then
    CATEGORIES="[$CATEGORY]"
else
    CATEGORIES="[]"
fi

# Generate appropriate tags based on category
case "$CATEGORY" in
    "business")
        TAGS="[business, strategy]"
        ;;
    "technology")
        TAGS="[technology, development]"
        ;;
    "management")
        TAGS="[management, leadership]"
        ;;
    "startup")
        TAGS="[startup, entrepreneurship]"
        ;;
    "opinion")
        TAGS="[opinion, thoughts]"
        ;;
    "defense")
        TAGS="[defense, industry]"
        ;;
    "life-event")
        TAGS="[personal, life]"
        ;;
    *)
        TAGS="[]"
        ;;
esac

# Create the post file
cat << EOF > "$TARGET_DIR/$FILENAME"
---
layout: post
title: "$POST_TITLE"
categories: $CATEGORIES
tags: $TAGS
description: ""
author: martin
image: 
featured: $FEATURED
hidden: false
comments: true
---

Write your post content here...

<!-- You can use markdown syntax:

## Heading 2
### Heading 3

**Bold text** and *italic text*

- Bullet point 1
- Bullet point 2

1. Numbered list
2. Item 2

> This is a blockquote

\`\`\`javascript
// Code block
console.log("Hello, world!");
\`\`\`

[Link text](https://example.com)

![Image alt text](/path/to/image.jpg)

-->
EOF

echo "✅ Post created: $TARGET_DIR/$FILENAME"
echo "📝 Title: $POST_TITLE"
[ -n "$CATEGORY" ] && echo "📁 Category: $CATEGORY"
[ "$FEATURED" = "true" ] && echo "⭐ Featured: Yes"
echo ""
echo "🚀 Next steps:"
echo "   1. Edit the file: $TARGET_DIR/$FILENAME"
echo "   2. Add your content and description"
echo "   3. Add an image if needed"
if [ "$IS_DRAFT" = "true" ]; then
    echo "   4. Move to _posts/ when ready to publish"
else
    echo "   4. Commit and push to publish"
fi
