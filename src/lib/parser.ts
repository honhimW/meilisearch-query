import MsDslParser from '@/lib/MsDslParser'
import { CharStreams, CommonTokenStream } from 'antlr4'
import MsDslLexer from '@/lib/MsDslLexer'
import MsDslErrorListener, { type MsDslError } from '@/lib/MsDslErrorListener'

export default function toAST(code: string): {
  ast?: MsDslParser,
  lexerErrors?: MsDslError[],
  parserErrors?: MsDslError[],
} {
  let ips = CharStreams.fromString(code)
  let lexer = new MsDslLexer(ips)
  let lexerErrorListener = new MsDslErrorListener()
  lexer.addErrorListener(lexerErrorListener)
  let tokenStream = new CommonTokenStream(lexer)
  let msDslParser = new MsDslParser(tokenStream)
  let parserErrorListener = new MsDslErrorListener()
  msDslParser.addErrorListener(parserErrorListener)
  return {
    ast: msDslParser,
    lexerErrors: lexerErrorListener.getErrors(),
    parserErrors: parserErrorListener.getErrors(),
  }
}
