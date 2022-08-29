import { derived, type Readable } from 'svelte/store'

// dedupe updates so our store only notifies when changes happen
export function dedupe<T>(store: Readable<T>): Readable<T> {
  let previous: T

  return derived(store, ($value, set) => {
    if ($value !== previous) {
      previous = $value
      set($value)
    }
  })
}