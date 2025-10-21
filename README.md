# エウレカの本棚

ライトノベル書評サイト

## Tech Stack

- **Astro** - Static site generator
- **Svelte** - Interactive components
- **TypeScript** - Type safety
- **SCSS** - Styling
- **Fuse.js** - Client-side search

## Features

- 📚 **本棚 (Bookshelf)**: すべての作品をあいうえお順で表示、検索機能付き
- ✍️ **レビュー (Reviews)**: 詳細な書評記事
- 🏷️ **タグ (Tags)**: ジャンルやテーマ別の分類
- 📝 **ブログ (Blog)**: ライトノベルに関する雑記
- 🌓 **ダークモード**: グリーン（ライト）とブラウン（ダーク）のテーマ

## Project Structure

```
/
├── content/               # Content collections (outside src)
│   ├── blog/             # Blog articles
│   ├── review/           # Review articles
│   ├── tag/              # Tag introduction pages
│   └── novels.json       # Novel metadata
├── src/
│   ├── components/       # Astro & Svelte components
│   ├── layouts/          # Page layouts
│   ├── pages/            # Route pages
│   ├── styles/           # Global SCSS styles
│   ├── utils/            # Utility functions
│   └── content/
│       └── config.ts     # Content collections schema
└── public/               # Static assets
```

## Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

## Content Collections

### Novels
Location: `content/novels.json`

Contains metadata for all light novels including:
- Name, hiragana reading, authors
- Alternative names, tags
- Rating tier (F to S+)
- Cover image URL

### Reviews
Location: `content/review/{novel-id}/{sort-number}.md`

Review articles with frontmatter:
- `novelId`, `title`, `sortNumber`
- `publishedAt`, `updatedAt`
- `level`: spoilerSafe | spoilerAlert | techniqueReview

### Tags
Location: `content/tag/{id}.md`

Tag introduction pages with frontmatter:
- `id`, `name`
- `category`: majorCategory | minorCategory | character | technique | pattern | publisher | review

### Blog
Location: `content/blog/{slug}.md`

General articles with frontmatter:
- `title`, `description`
- `publishedAt`, `updatedAt`
- `isPinned`: boolean

## Navigation

- **ホーム**: Latest reviews, novels, and blog posts
- **本棚**: All novels with search functionality
- **記事**: Blog articles list
