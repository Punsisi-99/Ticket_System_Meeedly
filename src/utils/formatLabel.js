export function formatLabel(value) {
  if (!value) {
    return ''
  }

  return value
    .split('_')
    .join(' ')
    .replace(/\b\w/g, (character) => character.toUpperCase())
}
