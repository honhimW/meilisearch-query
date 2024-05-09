import { worker } from 'monaco-editor'
import IWorkerContext = worker.IWorkerContext
import { checkLexer, checkParser } from '@/views/dashboard/examples/query/dsl/MsDslTransformer'
import type { MsDslError } from '@/lib/MsDslErrorListener'

export class MsDslWorker {
  private ctx: IWorkerContext

  public validLexer(input: string): MsDslError[] {
    return checkLexer(input)
  }

  public validParser(input: string): MsDslError[] {
    return checkParser(input)
  }
}