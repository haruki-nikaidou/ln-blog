<script lang="ts">
  import Fuse from 'fuse.js';
  import type { Novel, TagCategory } from '../utils/types';
  import NovelCard from './NovelCard.svelte';
  
  interface Tag {
    id: string;
    name: string;
    category: TagCategory;
  }
  
  interface Props {
    novels: Novel[];
    allTags: Tag[];
  }
  
  let { novels, allTags }: Props = $props();
  
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
    <NovelCard {novel} {allTags} />
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
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: $spacing-xl;
  }

  .no-results {
    text-align: center;
    padding: $spacing-2xl;
    color: var(--color-text-secondary);
  }
</style>

