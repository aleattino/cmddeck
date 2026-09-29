import { useId } from 'react';
import { ChevronDownIcon } from './Icons';
import { categoryGroups } from '../data';
import { categoryIcons } from '../lib/categoryIcons';
import { SelectionGlide } from './SelectionGlide';

export function CategorySidebar({ selected, counts, onSelect }) {
  return (
    <nav aria-label="Categories" className="relative">
      <SelectionGlide selector='[aria-current="page"]' className="rounded-lg bg-surface-raised" />
      {categoryGroups.map((group, index) => (
        <div key={group.label} className={index > 0 ? 'mt-6' : undefined}>
          <h2 className="mb-1.5 px-2.5 text-xs font-medium text-fg-subtle">{group.label}</h2>
          <ul className="space-y-0.5">
            {group.categories.map((category) => {
              const Icon = categoryIcons[category];
              const current = category === selected;
              return (
                <li key={category}>
                  <button
                    type="button"
                    onClick={() => onSelect(category)}
                    aria-current={current ? 'page' : undefined}
                    className={`relative flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-sm transition-colors duration-150 ${
                      current ? 'font-medium text-fg' : 'text-fg-muted hover:bg-surface hover:text-fg'
                    }`}
                  >
                    <Icon
                      size={16}
                      aria-hidden="true"
                      className={`transition-colors duration-150 ${current ? 'text-accent' : 'text-fg-subtle'}`}
                    />
                    <span className="min-w-0 flex-1 truncate">{category}</span>
                    <span className="text-xs tabular-nums text-fg-subtle">{counts[category]}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

// Native select on small screens: the platform picker is the most usable list there.
export function CategorySelect({ selected, counts, onSelect }) {
  const id = useId();
  const Icon = categoryIcons[selected];
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        Category
      </label>
      <div className="relative">
        <Icon size={16} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-accent" />
        <select
          id={id}
          value={selected}
          onChange={(event) => onSelect(event.target.value)}
          className="h-11 w-full appearance-none rounded-lg border border-line bg-surface pl-9 pr-9 text-[0.9375rem] font-medium text-fg focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/25"
        >
          {categoryGroups.map((group) => (
            <optgroup key={group.label} label={group.label}>
              {group.categories.map((category) => (
                <option key={category} value={category}>
                  {category} ({counts[category]})
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <ChevronDownIcon
          size={16}
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-fg-subtle"
        />
      </div>
    </div>
  );
}
