<script lang="ts">
  import type { Novel, TagCategory, RatingTier } from '../utils/types';
  import { compareTagCategories } from '../utils/sorting';
  
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
  
  // Helper function to get tier class
  function classForTier(tier: RatingTier): string {
    if (tier === null) {
      return 'tier-extra';
    }
    const firstLetter = tier.charAt(0);
    return `tier-${firstLetter}`;
  }
</script>

<article class="novel-card">
  <a href={`/novel/${novel.id}`} class="novel-link">
    <div class="cover-wrapper">
      <img src={novel.coverImage?.src} alt={`${novel.name}の表紙`} class="cover" />
      {#if novel.ratingTier}
        <div class="rating-badge">
          <span class={classForTier(novel.ratingTier)}>
            {novel.ratingTier || '?'}
          </span>
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
          <a href={`/tags/intro/${tag.id}`} class={`tag-category-${tag.category}`}>
            {tag.name}
          </a>
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

  /* Tag styles (from TagLink.astro) */
  $tag-color-category: #50b4e6;
  $tag-color-character: #db89e6;
  $tag-color-technique: #129424;
  $tag-color-publisher: #ffcc99;
  $tag-color-minor: #9e9e9e;

  .tags a {
    display: inline-block;
    padding: $spacing-xs $spacing-sm;
    color: var(--color-text);
    border-radius: $radius-sm;
    font-size: $font-size-xs;
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-1px);
      opacity: 0.85;
    }
  }

  .tag-category-majorCategory {
    background-color: rgba($tag-color-category, 0.35);
  }
  .tag-category-minorCategory {
    background-color: rgba($tag-color-category, 0.35);
  }
  .tag-category-character {
    background-color: rgba($tag-color-character, 0.35);
  }
  .tag-category-technique {
    background-color: rgba($tag-color-technique, 0.35);
  }
  .tag-category-pattern {
    background-color: rgba($tag-color-minor, 0.35);
  }
  .tag-category-publisher {
    background-color: rgba($tag-color-publisher, 0.35);
  }
  .tag-category-review {
    background-color: rgba($tag-color-minor, 0.35);
  }

  /* Tier mark styles (from TierMark.astro) */
  $color-tier-F: #880c0c;
  $color-tier-E: #880c0c;
  $color-tier-D: #b45304;
  $color-tier-C: #fdef2b;
  $color-tier-B: #30a50c;
  $color-tier-A: #1388be;
  $color-tier-S: #9522e2;
  $color-tier-extra: #d3d3d3;

  .rating-badge span {
    font-size: $font-size-2xl;
    border-radius: 100%;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: $shadow-md;
    font-weight: bold;
    font-family: monospace;
    border: 2px solid var(--color-border);
  }

  .tier-F {
    background-color: $color-tier-F;
    color: $dark-foreground;
  }

  .tier-E {
    background-color: $color-tier-E;
    color: $dark-foreground;
  }
  
  .tier-D {
    background-color: $color-tier-D;
    color: $dark-foreground;
  }

  .tier-C {
    background-color: $color-tier-C;
    color: $light-foreground;
  }
  
  .tier-B {
    background-color: $color-tier-B;
    color: $light-foreground;
  }

  .tier-A {
    background-color: $color-tier-A;
    color: $dark-foreground;
  }

  .tier-S {
    background-color: $color-tier-S;
    color: $dark-foreground;
  }

  .tier-extra {
    background-color: $color-tier-extra;
    color: $light-foreground;
  }
</style>

