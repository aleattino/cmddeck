import { shellArg } from './shell';

// Workflow commands reference parameters as {{key}}; values are entered once
// per workflow and substituted into every step.
const TOKEN = /\{\{(\w+)\}\}/g;

export function splitCommand(command) {
  const parts = [];
  let last = 0;
  for (const match of command.matchAll(TOKEN)) {
    if (match.index > last) parts.push({ type: 'text', value: command.slice(last, match.index) });
    parts.push({ type: 'param', key: match[1] });
    last = match.index + match[0].length;
  }
  if (last < command.length) parts.push({ type: 'text', value: command.slice(last) });
  return parts;
}

// status: 'filled' (typed and valid), 'default' (empty, falls back),
// 'missing' (empty, no fallback) or 'invalid' (typed but rejected).
export function paramState(param, raw) {
  const value = (raw ?? '').trim();
  if (value === '') {
    return param.default === undefined ? { status: 'missing' } : { status: 'default', value: param.default };
  }
  if (param.pattern && !param.pattern.test(value)) return { status: 'invalid', value };
  return { status: 'filled', value };
}

export function paramStates(workflow, values = {}) {
  const states = {};
  for (const param of workflow.params ?? []) states[param.key] = paramState(param, values[param.key]);
  return states;
}

// Builds the copyable text of one command. `blocking` lists the parameters
// that must be fixed first; `text` is null while any are.
export function resolveCommand(command, states) {
  const segments = splitCommand(command).map((part) => {
    if (part.type !== 'param') return part;
    // Unknown keys stay literal so a typo in the data shows up instead of vanishing.
    return states[part.key] ? { ...part, ...states[part.key] } : { type: 'text', value: `{{${part.key}}}` };
  });
  const blocking = [];
  for (const segment of segments) {
    if (segment.type === 'param' && (segment.status === 'missing' || segment.status === 'invalid') && !blocking.includes(segment.key)) {
      blocking.push(segment.key);
    }
  }
  const text = blocking.length
    ? null
    : segments.map((segment) => (segment.type === 'param' ? shellArg(segment.value) : segment.value)).join('');
  return { segments, blocking, text };
}
