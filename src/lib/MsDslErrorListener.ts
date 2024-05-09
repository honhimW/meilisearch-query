import { ErrorListener, DiagnosticErrorListener, Recognizer, type RecognitionException } from 'antlr4'

export interface MsDslError {
  line: number
  startColumn: number
  endColumn: number
  message: string
  e?: Error
}



export default class MsDslErrorListener implements ErrorListener<any> {

  private errors: MsDslError[] = []

  syntaxError(recognizer: Recognizer<any>, offendingSymbol: any, line: number, column: number, msg: string, e: RecognitionException | undefined): void {
    console.log(recognizer)
    this.errors.push({
      line: line,
      startColumn: column,
      endColumn: column,
      message: msg,
      e: e,
    })

  }

  public getErrors() {
    return this.errors
  }

}