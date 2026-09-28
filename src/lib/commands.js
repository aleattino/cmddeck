import { shellArg } from './shell';

export const hasCustomValues = (values) => Object.values(values).some((value) => value.trim() !== '');

// The command a card shows and copies: the distro variant, or the template
// filled with the user's values (each one shell-quoted unless marked raw).
export function resolveCommand(snippet, distro, values = {}) {
  const base = snippet.variants ? snippet.variants[distro] ?? snippet.variants.ubuntu : snippet.command;
  if (!snippet.commandTemplate || !hasCustomValues(values)) return base;
  const params = {};
  for (const input of snippet.inputs ?? []) {
    const value = (values[input.param] ?? '').trim();
    params[input.param] = value === '' ? '' : input.raw ? value : shellArg(value);
  }
  try {
    return snippet.commandTemplate(params, distro);
  } catch {
    return base;
  }
}
