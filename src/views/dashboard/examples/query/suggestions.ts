import * as monaco from 'monaco-editor'
import { languages } from 'monaco-editor'
import CompletionItemKind = languages.CompletionItemKind

export interface Matcher {
  fullMatch: string
  type: 'q' | 'sort' | 'filter'
  field?: string
  operator?: string
  value?: string
}

export const parseInput = (input: string): Matcher[] => {
  const filterRegex = /#([a-zA-Z0-9\\._]+):(=|!=|>|<|>=|<=)[ \t]*('([^']+)'|"([^"]+)"|([^'" \t]+))/g;
  const sortRegex = /@sort:([+-])[ \t]*([a-zA-Z0-9\\._]+)/g;

  const matches: Matcher[] = [];
  let match;

  // 使用 filterRegex 提取匹配的内容
  while ((match = filterRegex.exec(input)) !== null) {
    matches.push({
      fullMatch: match[0],
      type: 'filter',
      field: match[1],
      operator: match[2],
      value: match[4] || match[5] || match[6]  // 根据匹配的情况选择正确的值
    });
  }

  // 使用 sortRegex 提取匹配的内容
  while ((match = sortRegex.exec(input)) !== null) {
    matches.push({
      fullMatch: match[0],
      type: 'sort',
      field: match[2],  // 根据匹配的情况选择正确的值
      operator: match[1],
    });
  }

  let _input = input
  for (const match of matches) {
    _input = _input.replace(match.fullMatch, '');
  }

  matches.push({
    fullMatch: _input.trim(),
    type: 'q',
  });

  return matches;
}

export const allSuggestions = (position: monaco.Position, prefix = '') => {
  return [
    atSortAsc(position),
    atSortDesc(position),
  ]
    .filter(value => {
      const startsWith = value?.insertText?.startsWith(prefix)
      return startsWith
    })
    .map(value => {
      return {
        ...value,
        range: {
          startColumn: position.column - prefix.length,
          endColumn: position.column,
          startLineNumber: 1,
          endLineNumber: 1,
        },
      }
    })
}


export const suggestionBase = {
  kind: monaco.languages.CompletionItemKind.Snippet,
  insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
}

export const atSortAsc = (position: monaco.Position) => {
  return {
    ...suggestionBase,
    label: {
      label: '@sort:+',
      detail: '<attribute>',
      description: 'sort asc',
    },
    kind: CompletionItemKind.Keyword,
    range: {
      startLineNumber: 1,
      startColumn: position.column,
      endLineNumber: 1,
      endColumn: position.column,
    },
    insertText: '@sort:+',
    documentation: 'sort on attribute asc',
  }
}

export const atSortDesc = (position: monaco.Position) => {
  return {
    ...suggestionBase,
    label: {
      label: '@sort:-',
      detail: '<attribute>',
      description: 'sort desc'
    },
    kind: CompletionItemKind.Keyword,
    range: {
      startLineNumber: 1,
      startColumn: position.column,
      endLineNumber: 1,
      endColumn: position.column,
    },
    insertText: '@sort:-',
    documentation: 'sort on attribute desc',
  }
}

export const hash = (position: monaco.Position) => {

}