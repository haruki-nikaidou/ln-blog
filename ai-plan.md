# Project Plan

Write a light novel review website.

Tech-stack:

- Astro
- SCSS
- TypeScript
- Svelte

Requirements:

1. **The language of the site is Japanese.**

Mark the website as Japanese in HTML headers. Use Japanese in texts in website. The site's name should be エウレカの本棚.

The font should be Noto Serif Japanese.

2. **Implement dark mode and light mode. The theme color of dark mode should be brown while in light mode should be green.**

The palette of green color: `#06402B`, `#E3FFF5`, `#96D9C0`, `#51A687`.

The palette of brown color: `#635147`, `#4E3F39`, `#635E47`, `#746347`.

The dark mode should be based on [`mode-watcher`](https://github.com/svecosystem/mode-watcher).

3. **There are 4 content collections: novel, review, tag introduction, blog article.**

**Novel** is the metadata of light novel. All of the metadata of light novels are in a single JSON file in somewhere in the `src`. The novel content should have these fields:

- `name`: The official name of the book or book series.
- `hiragara`: The pronunciation of the book name. Used to sort the book.
- `authors`: The authors of the book, contains the writer and illustrator.
- `alterName`: The alter names of the book or book series. This is useful for searching.
- `tags`: The tags' IDs.
- `id`: A short unique ID of the book.
- `ratingTier`: The personal rating of the book. From `F` to `S+`, can be null.
- `cover`: The cover image (URL) of the book.

**Review** is for long review articles. They are markdown files.

A novel can have multiple reviews, while most of the novels don't have any review article. The path of the review article should be like `/review/{novel-id}/{sort-number}`. 

The metadata of review should have these fields:

- `novelId`: The novel to be reviewed.
- `title`: The title of the review article.
- `sortNumber`: The order of the review. Larger number means the review are logically later.
- `publishedAt`: The date that the review was written.
- `updatedAt`: The date that the review was edited. Can be null.
- `level`: Can be `spoilerSafe`, `spoilerAlert` (default) or `techniqueReview`.

**Tag Introduction** can be considered as a wiki page that explain what does that tag mean. Thus, they are also markdown files. The path of the tag should be like `/tags/intro/{id}`.

The metadata of tag should have these fields:

- `id`: A short unique ID for tag.
- `category`: An enum value about what kind the tag is. Can be `majorCategory`, `minorCategory`, `character`, `technique`, `pattern`, `publisher`, `review`.
- `name`: The name of the tag.

**Blog Article** is for general article that cannot be considered as a review article or tag introduction. As they are articles, they should have path like `/blog/{permanent-path}`

They should have these metadata:

- `title`
- `description`
- `publishedAt`
- `updatedAt`
- `isPinned`

4. **Well-indexed site structure**

There are 3 items in site's navigation bar:

- Home: The homepage. It shows latest updated review, novel and blog articles
- Bookshelf: The page that show all novels without pagination. It sort the book with あいうえお順, and display the cover, name, tags, rating and authors. It also provides a frontend only search implemented by `fuse.js` and svelte.
- Articles: The page that show all blog articles (not review articles).

User can click the cover or the title of the book in bookshelf page to enter the page of that book. In the book's page, there should be the book's metadata and a list of all the review articles.

No matter book page or bookshelf page, click the tag will always navigate the user to tag's introduction page.

5. **Simple and minimal Style**