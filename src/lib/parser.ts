import MsDslParser, { LineContext } from '@/lib/MsDslParser'
import { CharStreams, CommonTokenStream } from 'antlr4'
import MsDslLexer from '@/lib/MsDslLexer'

export default function parseAST(code: string): LineContext {
  let ips = CharStreams.fromString(code)
  let lexer = new MsDslLexer(ips)
  let tokenStream = new CommonTokenStream(lexer)
  let parser = new MsDslParser(tokenStream)
  return parser.line()
}
