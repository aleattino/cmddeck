import { snippetsData } from './snippets';
import { workflows } from './workflows';

export const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

// Ids derive from category + title, so favorites and recents survive edits
// to a command's text. Renaming a title or category changes its id.
export const allSnippets = Object.entries(snippetsData).flatMap(([category, commands]) =>
  commands.map((snippet) => ({
    ...snippet,
    category,
    id: `${slugify(category)}/${slugify(snippet.title)}`,
  }))
);

export const snippetsById = new Map(allSnippets.map((snippet) => [snippet.id, snippet]));

if (import.meta.env.DEV && snippetsById.size !== allSnippets.length) {
  console.warn('CmdDeck: duplicate snippet ids. Titles must be unique within a category.');
}

export const dataCategories = Object.keys(snippetsData);

const DISTRO_CATEGORIES = ['Flatpak', 'Ubuntu Specific', 'Fedora Specific'];

export const categoryGroups = [
  { label: 'Library', categories: ['All', 'Favorites', 'Recent'] },
  { label: 'Commands', categories: dataCategories.filter((c) => !DISTRO_CATEGORIES.includes(c)) },
  { label: 'Distro specific', categories: dataCategories.filter((c) => DISTRO_CATEGORIES.includes(c)) },
];

export const categories = categoryGroups.flatMap((group) => group.categories);

export const categoryBySlug = new Map(categories.map((category) => [slugify(category), category]));

export { workflows };

// Before v1.4 favorites and recents were stored as raw command strings.
export function migrateLegacyCommands(commands) {
  if (!Array.isArray(commands)) return [];
  const ids = [];
  for (const command of commands) {
    for (const snippet of allSnippets) {
      const texts = [snippet.command, ...Object.values(snippet.variants ?? {})];
      if (texts.includes(command) && !ids.includes(snippet.id)) ids.push(snippet.id);
    }
  }
  return ids;
}
