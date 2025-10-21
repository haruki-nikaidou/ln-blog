<script lang="ts">
  import Fuse from 'fuse.js';
  import type { Novel } from '../utils/types';
  
  interface Props {
    novels: Novel[];
  }
  
  let { novels }: Props = $props();
  
  let searchQuery = $state('');
  let filteredNovels = $state<Novel[]>(novels);
  
  // Configure Fuse.js for Japanese text search
  const fuse = new Fuse(novels, {
    keys: ['name', 'hiragana', 'alterName', 'authors.writer', 'authors.illustrator', 'tags'],
    threshold: 0.3,
    ignoreLocation: true,
  });
  
  function handleSearch() {
    if (!searchQuery.trim()) {
      filteredNovels = novels;
    } else {
      const results = fuse.search(searchQuery);
      filteredNovels = results.map((result) => result.item);
    }
  }
  
  $effect(() => {
    handleSearch();
  });
</script>

<div class="search-container">
  <input
    type="text"
    bind:value={searchQuery}
    placeholder="作品名、著者名、タグなどで検索..."
    class="search-input"
  />
  <p class="search-results">
    {filteredNovels.length} 件の作品
  </p>
</div>

<div class="novels-grid">
  {#each filteredNovels as novel (novel.id)}
    <div class="novel-item">
      <a href={`/novel/${novel.id}`} class="novel-link">
        <div class="cover-wrapper">
          <img src={novel.cover} alt={`${novel.name}の表紙`} class="cover" />
          {#if novel.ratingTier}
            <div class="rating-badge">{novel.ratingTier}</div>
          {/if}
        </div>
      </a>
      
      <div class="novel-info">
        <h3 class="novel-title">
          <a href={`/novel/${novel.id}`}>{novel.name}</a>
        </h3>
        
        <div class="authors">
          <p class="author-line">
            <span class="author-label">著:</span> {novel.authors.writer}
          </p>
          <p class="author-line">
            <span class="author-label">絵:</span> {novel.authors.illustrator}
          </p>
        </div>
        
        {#if novel.tags.length > 0}
          <div class="tags">
            {#each novel.tags as tagId}
              <a href={`/tags/intro/${tagId}`} class="tag-link">
                {tagId}
              </a>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  {/each}
</div>

{#if filteredNovels.length === 0}
  <div class="no-results">
    <p>検索結果が見つかりませんでした。</p>
  </div>
{/if}

<style lang="scss">
  @use '../styles/variables' as *;

  .search-container {
    margin-bottom: $spacing-2xl;
  }

  .search-input {
    width: 100%;
    padding: $spacing-md;
    font-size: $font-size-lg;
    border: 2px solid var(--color-border);
    border-radius: $radius-md;
    background-color: var(--color-bg);
    color: var(--color-text);
    font-family: $font-family;
    transition: border-color 0.2s ease;

    &:focus {
      outline: none;
      border-color: var(--color-highlight);
    }

    &::placeholder {
      color: var(--color-text-secondary);
    }
  }

  .search-results {
    margin-top: $spacing-sm;
    font-size: $font-size-sm;
    color: var(--color-text-secondary);
  }

  .novels-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: $spacing-xl;
  }

  .novel-item {
    display: flex;
    flex-direction: column;
    background-color: var(--color-secondary);
    border-radius: $radius-lg;
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    border: 1px solid var(--color-border);

    &:hover {
      transform: translateY(-4px);
      box-shadow: $shadow-lg;
    }
  }

  .novel-link {
    text-decoration: none;
  }

  .cover-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 3 / 4;
    overflow: hidden;
  }

  .cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;

    .novel-item:hover & {
      transform: scale(1.05);
    }
  }

  .rating-badge {
    position: absolute;
    top: $spacing-sm;
    right: $spacing-sm;
    background-color: var(--color-highlight);
    color: var(--color-secondary);
    padding: $spacing-xs $spacing-md;
    border-radius: $radius-md;
    font-weight: 700;
    font-size: $font-size-sm;
    box-shadow: $shadow-md;
  }

  .novel-info {
    padding: $spacing-md;
  }

  .novel-title {
    font-size: $font-size-lg;
    margin-bottom: $spacing-sm;

    a {
      color: var(--color-text);
      text-decoration: none;

      &:hover {
        color: var(--color-highlight);
      }
    }
  }

  .authors {
    margin-bottom: $spacing-md;
    font-size: $font-size-sm;
    color: var(--color-text-secondary);
  }

  .author-line {
    margin-bottom: $spacing-xs;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .author-label {
    font-weight: 600;
    margin-right: $spacing-xs;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-sm;
  }

  .tag-link {
    display: inline-block;
    padding: $spacing-xs $spacing-sm;
    background-color: var(--color-accent);
    color: var(--color-text);
    border-radius: $radius-sm;
    font-size: $font-size-sm;
    text-decoration: none;
    transition: all 0.2s ease;
    border: 1px solid var(--color-border);

    &:hover {
      background-color: var(--color-highlight);
      color: var(--color-secondary);
      text-decoration: none;
      transform: translateY(-1px);
    }
  }

  .no-results {
    text-align: center;
    padding: $spacing-2xl;
    color: var(--color-text-secondary);
  }
</style>

