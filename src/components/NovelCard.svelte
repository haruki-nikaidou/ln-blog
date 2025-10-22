<script lang="ts">
  import type { Novel, TagCategory } from '../utils/types';
  import { compareTagCategories } from '../utils/sorting';
  import TagLink from './TagLink.svelte';
  import TierMark from './TierMark.svelte';
  
  interface Tag {
    id: string;
    name: string;
    category: TagCategory;
  }
  
  interface Props {
    novel: Novel;
    allTags: Tag[];
  }
  
  let { novel, allTags }: Props = $props();
  
  // Get tag details and sort them
  const novelTags = novel.tags
    .map((tagId) => {
      const tag = allTags.find((tag) => tag.id === tagId);
      if (!tag) {
        throw new Error(`Tag with id ${tagId} not found`);
      }
      return tag;
    })
    .sort((a, b) => compareTagCategories(a.category, b.category));
</script>

<article class="novel-card">
  <a href={`/novel/${novel.id}`} class="novel-link">
    <div class="cover-wrapper">
      <img src={novel.coverImage?.src} alt={`${novel.name}の表紙`} class="cover" />
      {#if novel.ratingTier}
        <div class="rating-badge">
          <TierMark tier={novel.ratingTier} />
        </div>
      {/if}
    </div>
  </a>

  <div class="novel-info">
    <h3 class="novel-title">
      <a href={`/novel/${novel.id}`}>{novel.name}</a>
    </h3>

    <div class="authors">
      <p class="author-line">
        <span class="author-label">著:</span>
        {novel.authors.writer}
      </p>
      <p class="author-line">
        <span class="author-label">絵:</span>
        {novel.authors.illustrator}
      </p>
    </div>

    {#if novelTags.length > 0}
      <div class="tags">
        {#each novelTags as tag}
          <TagLink tagId={tag.id} category={tag.category} name={tag.name} />
        {/each}
      </div>
    {/if}
  </div>
</article>

<style lang="scss">
  @use '../styles/variables' as *;

  .novel-card {
    display: flex;
    flex-direction: column;
    background-color: var(--color-card);
    border-radius: $radius-lg;
    overflow: hidden;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
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
  }

  .rating-badge {
    position: absolute;
    top: $spacing-sm;
    right: $spacing-sm;
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
        color: var(--color-primary);
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
</style>

