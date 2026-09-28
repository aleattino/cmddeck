// Characters that never need quoting in a POSIX shell word.
const SAFE_WORD = /^[A-Za-z0-9_@%+=:,./-]+$/;

function singleQuote(value) {
  return `'${value.replace(/'/g, `'\\''`)}'`;
}

// Quotes a user-supplied value so it reaches the command as one argument.
// A leading ~/ stays unquoted so the shell still expands the home directory.
export function shellArg(value) {
  if (value === '' || SAFE_WORD.test(value)) return value;
  if (value === '~') return value;
  if (value.startsWith('~/')) {
    const rest = value.slice(2);
    return rest === '' || SAFE_WORD.test(rest) ? value : `~/${singleQuote(rest)}`;
  }
  return singleQuote(value);
}
