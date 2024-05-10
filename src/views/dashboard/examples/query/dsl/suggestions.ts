import * as monaco from 'monaco-editor'
import { languages } from 'monaco-editor'
import CompletionItemKind = languages.CompletionItemKind
import { parse2SearchParam } from '@/views/dashboard/examples/query/dsl/MsDslTransformer'
import MsDslLexer from '@/lib/MsDslLexer'
import type { Token } from 'antlr4'
import CompletionItem = languages.CompletionItem

export const allSuggestions = (model: monaco.editor.ITextModel, position: monaco.Position, prefix = ''): CompletionItem[] => {
  let lineContent = model.getLineContent(1)
  let parsed = parse2SearchParam(lineContent)

  let tokenStream = parsed.tokenStream

  let items: CompletionItem[] = []
  let column = position.column - 1
  let preToken: Token
  let currentToken: Token
  let tokenIndex = tokenStream.size
  for (let i = tokenStream.size - 1; i >= 0; i--) {
    let token = tokenStream.get(i)
    tokenIndex = i
    if (token.type != -1) {
      if (token.start <= column && column <= token.stop) {
        currentToken = token
      }
      if (token.stop < column) {
        preToken = token
        break
      }
    }
  }

  let positionColumn = position.column

  if (preToken) {

    let lastColumn = preToken.stop + 1
    let s = lineContent.substring(lastColumn, positionColumn)
    let trimStart = s.trimStart()

    


    let i = tokenIndex
    while (i > 0) {
      let prev = tokenStream.get(i)
      let symbolicName = MsDslLexer.symbolicNames[prev.type]
      switch (symbolicName) {
        case 'AT_SORT':
          items.push(
            {
              kind: CompletionItemKind.Keyword,
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              label: {
                label: '@sort : ',
                detail: '<attribute>',
                description: 'sort',
              },
              range: {
                startLineNumber: 1,
                startColumn: position.column,
                endLineNumber: 1,
                endColumn: position.column,
              },
              insertText: '@sort : ',
              documentation: 'sort on attribute',
            }
          )
          break
      }
      console.log(prev)
      i--
    }
  }

  if (!currentToken) {
    items.push(
      {
        kind: CompletionItemKind.Keyword,
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        label: {
          label: '@sort : ',
          detail: '<attribute>',
          description: 'sort',
        },
        range: {
          startLineNumber: 1,
          startColumn: position.column,
          endLineNumber: 1,
          endColumn: position.column,
        },
        insertText: '@sort : ',
        documentation: 'sort on attribute',
      },
      {
        kind: CompletionItemKind.Keyword,
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        label: {
          label: '@on : ',
          detail: '<attribute>',
          description: 'sort',
        },
        range: {
          startLineNumber: 1,
          startColumn: position.column,
          endLineNumber: 1,
          endColumn: position.column,

        },
        insertText: '@on : [\'*\']',
        documentation: 'search on attribute',

      },
      {
        kind: CompletionItemKind.Keyword,
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        label: {
          label: ' #',
          detail: '<attribute>',
          description: 'filter',
        },
        range: {
          startLineNumber: 1,
          startColumn: position.column,
          endLineNumber: 1,
          endColumn: position.column,
        },
        insertText: '#',
        documentation: 'sort on attribute',
      },
    )
  }

  if (preToken) {
    let tokenType = MsDslLexer.symbolicNames[preToken.type]
    if (tokenType && 0 < preToken.type && preToken.type < MsDslLexer.literalNames.length) {
      let literal = MsDslLexer.literalNames[tokenType]
    }

  } else {
    // all
  }

  return items
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