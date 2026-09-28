const normalize = (value) => value.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '');

function haystack(snippet) {
  return normalize(
    [
      snippet.title,
      snippet.description,
      snippet.category,
      snippet.command,
      ...Object.values(snippet.variants ?? {}),
    ]
      .filter(Boolean)
      .join(' ')
  );
}

const cache = new WeakMap();

function indexed(snippet) {
  let text = cache.get(snippet);
  if (text === undefined) {
    text = haystack(snippet);
    cache.set(snippet, text);
  }
  return text;
}

export function queryTerms(query) {
  return normalize(query.trim()).split(/\s+/).filter(Boolean);
}

// Every term must appear somewhere: title, description, category, or any distro variant.
export function matches(snippet, terms) {
  if (terms.length === 0) return true;
  const text = indexed(snippet);
  return terms.every((term) => text.includes(term));
}

// Ranking for the command palette: title hits first, then commands, then the rest.
export function score(snippet, terms) {
  const title = normalize(snippet.title);
  const commands = normalize([snippet.command, ...Object.values(snippet.variants ?? {})].filter(Boolean).join(' '));
  let total = 0;
  for (const term of terms) {
    if (title.startsWith(term)) total += 6;
    else if (title.includes(term)) total += 4;
    else if (commands.includes(term)) total += 3;
    else total += 1;
  }
  return total;
}

// When a search names a distro-specific tool ("pacman", "dnf"), show that
// distro's variant instead of the default one.
export function matchingDistro(snippet, terms, fallback) {
  if (!snippet.variants || terms.length === 0) return fallback;
  const hits = (text) => terms.filter((term) => normalize(text ?? '').includes(term)).length;
  const own = hits(snippet.variants[fallback]);
  let best = fallback;
  let bestHits = own;
  for (const [distro, text] of Object.entries(snippet.variants)) {
    const count = hits(text);
    if (count > bestHits) {
      best = distro;
      bestHits = count;
    }
  }
  return best;
}
