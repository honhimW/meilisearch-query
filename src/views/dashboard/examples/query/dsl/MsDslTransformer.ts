import type { SearchParams } from 'meilisearch/src/types/types'
import toAST from '@/lib/parser'
import { ContentContext, KeyContext, QueryContentContext, ValueContext } from '@/lib/MsDslParser'
import type { Filter } from 'meilisearch'
import type { MsDslError } from '@/lib/MsDslErrorListener'

export const checkLexer = (input: string): MsDslError[] | undefined => {
  let { lexerErrors } = toAST(input)
  if (lexerErrors) {
    return lexerErrors
  }
}

export const checkParser = (input: string): MsDslError[] | undefined => {
  let { parserErrors } = toAST(input)
  if (parserErrors) {
    return parserErrors
  }
}

export const parse2SearchParam = (input: string): SearchParams => {
  let { ast } = toAST(input)

  let lineContext = ast.line()
  let contentContexts: ContentContext[] = []
  if (lineContext.single()) {
    contentContexts.push(lineContext.single().content())
  } else if (lineContext.multiple()) {
    contentContexts = lineContext.multiple().content_list()
  }

  let filters: Filter = []
  let sorts: string[] = []
  let ons: string[] = []
  let searchParams: SearchParams = {
    q: input,
    attributesToHighlight: ['*'],
    facets: [],
    highlightPreTag: '<ais-highlight style="background-color: #ff5895; font-weight: bold">',
    highlightPostTag: '</ais-highlight>',
    limit: 20,
    offset: 0,
    showRankingScore: true,
    filter: filters,
    sort: sorts,
    attributesToSearchOn: ['*'],
  }

  for (let cc of contentContexts) {
    if (cc.filterContent()) {
      let filterContentContext = cc.filterContent()
      let keyContext = filterContentContext.key()
      let symbol = filterContentContext.FILTER_SYMBOLS()
      let valueContext = filterContentContext.value()
      let keyText = getKey(keyContext)
      let symbolText = symbol.getText()
      let valueText = getValue(valueContext)
      if (keyText && symbolText && valueText) {
        filters.push(`${keyText} ${symbolText} ${valueText}`)
      }
    } else if (cc.sortContent()) {
      let sortContentContext = cc.sortContent()
      let asc = sortContentContext.ASC()
      let desc = sortContentContext.DESC()
      let keyContext = sortContentContext.key()
      let keyText = getKey(keyContext)
      if (asc) {
        sorts.push(keyText + ':asc')
      } else if (desc) {
        sorts.push(keyText + ':desc')
      }
    } else if (cc.onContent()) {
      let onContentContext = cc.onContent()
      let keysContext = onContentContext.keys()
      let keyContexts = keysContext.key_list()
      for (let keyContext of keyContexts) {
        let key = getKey(keyContext)
        ons.push(key)
      }
      searchParams.attributesToSearchOn = ons
    } else if (cc.queryContent()) {
      let queryContentContext = cc.queryContent()
      let query = getQuery(queryContentContext)
      if (query) {
        searchParams.q = query
      }
    }
  }

  return searchParams
}

const getKey = (keyContext: KeyContext): string | undefined => {
  let keyText
  if (keyContext.IDENTIFIER_list()) {
    let ids = keyContext.IDENTIFIER_list()
    keyText = ids.map(id => id.getText()).join('.')
  } else if (keyContext.STRING()) {
    keyText = keyContext.STRING().getText()
    if (keyText.startsWith('"')) {
      keyText = keyText.slice(1, -1)
      keyText.replaceAll('\\"', '"')
    } else if (keyText.startsWith('\'')) {
      keyText = keyText.slice(1, -1)
      keyText.replaceAll('\\\'', '\'')
    }
  }
  return keyText
}

const getValue = (valueContext: ValueContext): string | undefined => {
  let value
  if (valueContext.IDENTIFIER()) {
    value = valueContext.IDENTIFIER().getText()
  } else if (valueContext.number_()) {
    value = valueContext.number_().NUMBER().getText()
  } else if (valueContext.STRING()) {
    value = valueContext.STRING().getText()
  }
  return value
}

const getQuery = (queryContentContext: QueryContentContext): string | undefined => {
  let query
  if (queryContentContext.IDENTIFIER()) {
    query = queryContentContext.IDENTIFIER().getText()
  } else if (queryContentContext.number_()) {
    query = queryContentContext.number_().NUMBER().getText()
  } else if (queryContentContext.STRING()) {
    query = queryContentContext.STRING().getText()
  }
  return query
}