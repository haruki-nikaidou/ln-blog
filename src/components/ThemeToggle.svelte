<script lang="ts">
  import { onMount } from 'svelte';
  
  let isDark = $state(false);
  
  onMount(() => {
    // Check initial theme
    isDark = document.documentElement.classList.contains('dark');
  });
  
  function toggleTheme() {
    isDark = !isDark;
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
  }
</script>

<button 
  onclick={toggleTheme}
  class="theme-toggle"
  aria-label={isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
>
  {#if isDark}
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  {:else}
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  {/if}
</button>

<style lang="scss">
  @use '../styles/variables' as *;

  .theme-toggle {
    background: transparent;
    border: 2px solid var(--color-secondary);
    border-radius: $radius-md;
    padding: $spacing-sm;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-secondary);
    transition: all 0.2s ease;

    &:hover {
      background-color: var(--color-accent);
      border-color: var(--color-accent);
      color: var(--color-primary);
    }

    svg {
      display: block;
    }
  }
</style>

