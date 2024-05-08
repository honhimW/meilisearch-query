// Generated from ./MsDsl.g4 by ANTLR 4.13.1
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
	ATN,
	ATNDeserializer, DFA, FailedPredicateException,
	RecognitionException, NoViableAltException, BailErrorStrategy,
	Parser, ParserATNSimulator,
	RuleContext, ParserRuleContext, PredictionMode, PredictionContextCache,
	TerminalNode, RuleNode,
	Token,
	Interval, IntervalSet
} from 'antlr4';

import MsDslListener from "./MsDslListener";
// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export declare class DecisionState {
	atn: ATN;
	stateNumber: number;
	decision: number;
	nonGreedy: boolean;
}

export declare class TokenStream {

	index: number;
	size: number;

	LA(i: number): number;
	LT(k: number): Token;
	getText(interval?: Interval): string;
	// channelIndex can be retrieved using: lexer.channelNames().findIndex(channelName)
	getHiddenTokensToLeft(tokenIndex: number, channelIndex?: number): Token[];
	getHiddenTokensToRight(tokenIndex: number, channelIndex?: number): Token[];
	get(idx: number): Token;
}

export default class MsDslParser extends Parser {
	public static readonly AT_SORT_ASC = 1;
	public static readonly AT_SORT_DESC = 2;
	public static readonly HASH = 3;
	public static readonly COLON = 4;
	public static readonly SP = 5;
	public static readonly TAB = 6;
	public static readonly OPERATOR = 7;
	public static readonly ATTRIBUTE_NAME = 8;
	public static readonly PLAIN_VALUE = 9;
	public static readonly JSON_KEY = 10;
	public static readonly JSON_VALUE = 11;
	public static readonly TEXT = 12;
	public static readonly TEXT_SINGLE_QUOTE = 13;
	public static readonly TEXT_DOUBLE_QUOTE = 14;
	public static readonly SINGLE_QUOTE = 15;
	public static readonly DOUBLE_QUOTE = 16;
	public static readonly ALPHA = 17;
	public static readonly DIGIT = 18;
	public static readonly NUMBER = 19;
	public static readonly PLAIN = 20;
	public static readonly STRING = 21;
	public static readonly LITERAL = 22;
	public static readonly IDENTIFIER = 23;
	public static readonly EOF = Token.EOF;
	public static readonly RULE_line = 0;
	public static readonly RULE_content = 1;
	public static readonly RULE_filterContent = 2;
	public static readonly RULE_sortContent = 3;
	public static readonly RULE_queryContent = 4;
	public static readonly literalNames: (string | null)[] = [ null, "'@sort+'", 
                                                            "'@sort-'", 
                                                            "'#'", "':'", 
                                                            "' '", "'\\t'", 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            "'''", "'\"'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, "AT_SORT_ASC", 
                                                             "AT_SORT_DESC", 
                                                             "HASH", "COLON", 
                                                             "SP", "TAB", 
                                                             "OPERATOR", 
                                                             "ATTRIBUTE_NAME", 
                                                             "PLAIN_VALUE", 
                                                             "JSON_KEY", 
                                                             "JSON_VALUE", 
                                                             "TEXT", "TEXT_SINGLE_QUOTE", 
                                                             "TEXT_DOUBLE_QUOTE", 
                                                             "SINGLE_QUOTE", 
                                                             "DOUBLE_QUOTE", 
                                                             "ALPHA", "DIGIT", 
                                                             "NUMBER", "PLAIN", 
                                                             "STRING", "LITERAL", 
                                                             "IDENTIFIER" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"line", "content", "filterContent", "sortContent", "queryContent",
	];
	public get grammarFileName(): string { return "MsDsl.g4"; }
	public get literalNames(): (string | null)[] { return MsDslParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return MsDslParser.symbolicNames; }
	public get ruleNames(): string[] { return MsDslParser.ruleNames; }
	public get serializedATN(): number[] { return MsDslParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, MsDslParser._ATN, MsDslParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public line(): LineContext {
		let localctx: LineContext = new LineContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, MsDslParser.RULE_line);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 13;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===1 || _la===2) {
				{
				{
				this.state = 10;
				this.content();
				}
				}
				this.state = 15;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public content(): ContentContext {
		let localctx: ContentContext = new ContentContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, MsDslParser.RULE_content);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 16;
			this.sortContent();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public filterContent(): FilterContentContext {
		let localctx: FilterContentContext = new FilterContentContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, MsDslParser.RULE_filterContent);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 18;
			this.match(MsDslParser.HASH);
			this.state = 19;
			this.match(MsDslParser.ATTRIBUTE_NAME);
			this.state = 20;
			this.match(MsDslParser.COLON);
			this.state = 21;
			this.match(MsDslParser.OPERATOR);
			this.state = 22;
			this.match(MsDslParser.PLAIN_VALUE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public sortContent(): SortContentContext {
		let localctx: SortContentContext = new SortContentContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, MsDslParser.RULE_sortContent);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 24;
			_la = this._input.LA(1);
			if(!(_la===1 || _la===2)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 25;
			this.match(MsDslParser.COLON);
			this.state = 26;
			this.match(MsDslParser.ATTRIBUTE_NAME);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public queryContent(): QueryContentContext {
		let localctx: QueryContentContext = new QueryContentContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, MsDslParser.RULE_queryContent);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 28;
			this.match(MsDslParser.PLAIN_VALUE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public static readonly _serializedATN: number[] = [4,1,23,31,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,1,0,5,0,12,8,0,10,0,12,0,15,9,0,1,1,1,1,1,
	2,1,2,1,2,1,2,1,2,1,2,1,3,1,3,1,3,1,3,1,4,1,4,1,4,0,0,5,0,2,4,6,8,0,1,1,
	0,1,2,26,0,13,1,0,0,0,2,16,1,0,0,0,4,18,1,0,0,0,6,24,1,0,0,0,8,28,1,0,0,
	0,10,12,3,2,1,0,11,10,1,0,0,0,12,15,1,0,0,0,13,11,1,0,0,0,13,14,1,0,0,0,
	14,1,1,0,0,0,15,13,1,0,0,0,16,17,3,6,3,0,17,3,1,0,0,0,18,19,5,3,0,0,19,
	20,5,8,0,0,20,21,5,4,0,0,21,22,5,7,0,0,22,23,5,9,0,0,23,5,1,0,0,0,24,25,
	7,0,0,0,25,26,5,4,0,0,26,27,5,8,0,0,27,7,1,0,0,0,28,29,5,9,0,0,29,9,1,0,
	0,0,1,13];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!MsDslParser.__ATN) {
			MsDslParser.__ATN = new ATNDeserializer().deserialize(MsDslParser._serializedATN);
		}

		return MsDslParser.__ATN;
	}


	static DecisionsToDFA = MsDslParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class LineContext extends ParserRuleContext {
	constructor(parser?: MsDslParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public content_list(): ContentContext[] {
		return this.getTypedRuleContexts(ContentContext) as ContentContext[];
	}
	public content(i: number): ContentContext {
		return this.getTypedRuleContext(ContentContext, i) as ContentContext;
	}
    public get ruleIndex(): number {
    	return MsDslParser.RULE_line;
	}
	public enterRule(listener: MsDslListener): void {
	    if(listener.enterLine) {
	 		listener.enterLine(this);
		}
	}
	public exitRule(listener: MsDslListener): void {
	    if(listener.exitLine) {
	 		listener.exitLine(this);
		}
	}
}


export class ContentContext extends ParserRuleContext {
	constructor(parser?: MsDslParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public sortContent(): SortContentContext {
		return this.getTypedRuleContext(SortContentContext, 0) as SortContentContext;
	}
    public get ruleIndex(): number {
    	return MsDslParser.RULE_content;
	}
	public enterRule(listener: MsDslListener): void {
	    if(listener.enterContent) {
	 		listener.enterContent(this);
		}
	}
	public exitRule(listener: MsDslListener): void {
	    if(listener.exitContent) {
	 		listener.exitContent(this);
		}
	}
}


export class FilterContentContext extends ParserRuleContext {
	constructor(parser?: MsDslParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public HASH(): TerminalNode {
		return this.getToken(MsDslParser.HASH, 0);
	}
	public ATTRIBUTE_NAME(): TerminalNode {
		return this.getToken(MsDslParser.ATTRIBUTE_NAME, 0);
	}
	public COLON(): TerminalNode {
		return this.getToken(MsDslParser.COLON, 0);
	}
	public OPERATOR(): TerminalNode {
		return this.getToken(MsDslParser.OPERATOR, 0);
	}
	public PLAIN_VALUE(): TerminalNode {
		return this.getToken(MsDslParser.PLAIN_VALUE, 0);
	}
    public get ruleIndex(): number {
    	return MsDslParser.RULE_filterContent;
	}
	public enterRule(listener: MsDslListener): void {
	    if(listener.enterFilterContent) {
	 		listener.enterFilterContent(this);
		}
	}
	public exitRule(listener: MsDslListener): void {
	    if(listener.exitFilterContent) {
	 		listener.exitFilterContent(this);
		}
	}
}


export class SortContentContext extends ParserRuleContext {
	constructor(parser?: MsDslParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public COLON(): TerminalNode {
		return this.getToken(MsDslParser.COLON, 0);
	}
	public ATTRIBUTE_NAME(): TerminalNode {
		return this.getToken(MsDslParser.ATTRIBUTE_NAME, 0);
	}
	public AT_SORT_ASC(): TerminalNode {
		return this.getToken(MsDslParser.AT_SORT_ASC, 0);
	}
	public AT_SORT_DESC(): TerminalNode {
		return this.getToken(MsDslParser.AT_SORT_DESC, 0);
	}
    public get ruleIndex(): number {
    	return MsDslParser.RULE_sortContent;
	}
	public enterRule(listener: MsDslListener): void {
	    if(listener.enterSortContent) {
	 		listener.enterSortContent(this);
		}
	}
	public exitRule(listener: MsDslListener): void {
	    if(listener.exitSortContent) {
	 		listener.exitSortContent(this);
		}
	}
}


export class QueryContentContext extends ParserRuleContext {
	constructor(parser?: MsDslParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public PLAIN_VALUE(): TerminalNode {
		return this.getToken(MsDslParser.PLAIN_VALUE, 0);
	}
    public get ruleIndex(): number {
    	return MsDslParser.RULE_queryContent;
	}
	public enterRule(listener: MsDslListener): void {
	    if(listener.enterQueryContent) {
	 		listener.enterQueryContent(this);
		}
	}
	public exitRule(listener: MsDslListener): void {
	    if(listener.exitQueryContent) {
	 		listener.exitQueryContent(this);
		}
	}
}
