// Generated from ./MsDsl.g4 by ANTLR 4.13.1
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
	ATN,
	ATNDeserializer, DecisionState, DFA, FailedPredicateException,
	RecognitionException, NoViableAltException, BailErrorStrategy,
	Parser, ParserATNSimulator,
	RuleContext, ParserRuleContext, PredictionMode, PredictionContextCache,
	TerminalNode, RuleNode,
	Token, TokenStream,
	Interval, IntervalSet
} from 'antlr4';
import MsDslListener from "./MsDslListener";
// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class MsDslParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly AT_SORT = 6;
	public static readonly ASC = 7;
	public static readonly DESC = 8;
	public static readonly HASH = 9;
	public static readonly FILTER_SYMBOLS = 10;
	public static readonly AT_ON = 11;
	public static readonly SINGLE_LINE_COMMENT = 12;
	public static readonly MULTI_LINE_COMMENT = 13;
	public static readonly LITERAL = 14;
	public static readonly STRING = 15;
	public static readonly NUMBER = 16;
	public static readonly NUMERIC_LITERAL = 17;
	public static readonly SYMBOL = 18;
	public static readonly IDENTIFIER = 19;
	public static readonly WS = 20;
	public static readonly EOF = Token.EOF;
	public static readonly RULE_line = 0;
	public static readonly RULE_single = 1;
	public static readonly RULE_multiple = 2;
	public static readonly RULE_content = 3;
	public static readonly RULE_sortContent = 4;
	public static readonly RULE_filterContent = 5;
	public static readonly RULE_queryContent = 6;
	public static readonly RULE_onContent = 7;
	public static readonly RULE_keys = 8;
	public static readonly RULE_key = 9;
	public static readonly RULE_value = 10;
	public static readonly RULE_number = 11;
	public static readonly literalNames: (string | null)[] = [ null, "':'", 
                                                            "'['", "','", 
                                                            "']'", "'.'", 
                                                            "'@sort'", "'+'", 
                                                            "'-'", "'#'", 
                                                            null, "'@on'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             "AT_SORT", 
                                                             "ASC", "DESC", 
                                                             "HASH", "FILTER_SYMBOLS", 
                                                             "AT_ON", "SINGLE_LINE_COMMENT", 
                                                             "MULTI_LINE_COMMENT", 
                                                             "LITERAL", 
                                                             "STRING", "NUMBER", 
                                                             "NUMERIC_LITERAL", 
                                                             "SYMBOL", "IDENTIFIER", 
                                                             "WS" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"line", "single", "multiple", "content", "sortContent", "filterContent", 
		"queryContent", "onContent", "keys", "key", "value", "number",
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
			this.state = 28;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 1, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 25;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1018432) !== 0)) {
					{
					this.state = 24;
					this.single();
					}
				}

				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 27;
				this.multiple();
				}
				break;
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
	public single(): SingleContext {
		let localctx: SingleContext = new SingleContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, MsDslParser.RULE_single);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 30;
			this.content();
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
	public multiple(): MultipleContext {
		let localctx: MultipleContext = new MultipleContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, MsDslParser.RULE_multiple);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 32;
			this.content();
			this.state = 34;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 33;
				this.content();
				}
				}
				this.state = 36;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1018432) !== 0));
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
		this.enterRule(localctx, 6, MsDslParser.RULE_content);
		try {
			this.state = 42;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 6:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 38;
				this.sortContent();
				}
				break;
			case 9:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 39;
				this.filterContent();
				}
				break;
			case 11:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 40;
				this.onContent();
				}
				break;
			case 15:
			case 16:
			case 17:
			case 18:
			case 19:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 41;
				this.queryContent();
				}
				break;
			default:
				throw new NoViableAltException(this);
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
		this.enterRule(localctx, 8, MsDslParser.RULE_sortContent);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 44;
			this.match(MsDslParser.AT_SORT);
			this.state = 45;
			this.match(MsDslParser.T__0);
			this.state = 46;
			_la = this._input.LA(1);
			if(!(_la===7 || _la===8)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 47;
			this.key();
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
		this.enterRule(localctx, 10, MsDslParser.RULE_filterContent);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 49;
			this.match(MsDslParser.HASH);
			this.state = 50;
			this.key();
			this.state = 51;
			this.match(MsDslParser.T__0);
			this.state = 52;
			this.match(MsDslParser.FILTER_SYMBOLS);
			this.state = 53;
			this.value();
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
		this.enterRule(localctx, 12, MsDslParser.RULE_queryContent);
		try {
			this.state = 58;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 15:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 55;
				this.match(MsDslParser.STRING);
				}
				break;
			case 19:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 56;
				this.match(MsDslParser.IDENTIFIER);
				}
				break;
			case 16:
			case 17:
			case 18:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 57;
				this.number_();
				}
				break;
			default:
				throw new NoViableAltException(this);
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
	public onContent(): OnContentContext {
		let localctx: OnContentContext = new OnContentContext(this, this._ctx, this.state);
		this.enterRule(localctx, 14, MsDslParser.RULE_onContent);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 60;
			this.match(MsDslParser.AT_ON);
			this.state = 61;
			this.match(MsDslParser.T__0);
			this.state = 62;
			this.keys();
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
	public keys(): KeysContext {
		let localctx: KeysContext = new KeysContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, MsDslParser.RULE_keys);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 64;
			this.match(MsDslParser.T__1);
			this.state = 65;
			this.key();
			this.state = 70;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===3) {
				{
				{
				this.state = 66;
				this.match(MsDslParser.T__2);
				this.state = 67;
				this.key();
				}
				}
				this.state = 72;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 73;
			this.match(MsDslParser.T__3);
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
	public key(): KeyContext {
		let localctx: KeyContext = new KeyContext(this, this._ctx, this.state);
		this.enterRule(localctx, 18, MsDslParser.RULE_key);
		let _la: number;
		try {
			this.state = 86;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 7, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 75;
				this.match(MsDslParser.STRING);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 76;
				this.match(MsDslParser.IDENTIFIER);
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 77;
				this.match(MsDslParser.LITERAL);
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 78;
				this.match(MsDslParser.NUMERIC_LITERAL);
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 79;
				this.match(MsDslParser.IDENTIFIER);
				this.state = 82;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 80;
					this.match(MsDslParser.T__4);
					this.state = 81;
					this.match(MsDslParser.IDENTIFIER);
					}
					}
					this.state = 84;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la===5);
				}
				break;
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
	public value(): ValueContext {
		let localctx: ValueContext = new ValueContext(this, this._ctx, this.state);
		this.enterRule(localctx, 20, MsDslParser.RULE_value);
		try {
			this.state = 91;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 15:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 88;
				this.match(MsDslParser.STRING);
				}
				break;
			case 19:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 89;
				this.match(MsDslParser.IDENTIFIER);
				}
				break;
			case 16:
			case 17:
			case 18:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 90;
				this.number_();
				}
				break;
			default:
				throw new NoViableAltException(this);
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
	public number_(): NumberContext {
		let localctx: NumberContext = new NumberContext(this, this._ctx, this.state);
		this.enterRule(localctx, 22, MsDslParser.RULE_number);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 94;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===18) {
				{
				this.state = 93;
				this.match(MsDslParser.SYMBOL);
				}
			}

			this.state = 96;
			_la = this._input.LA(1);
			if(!(_la===16 || _la===17)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
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

	public static readonly _serializedATN: number[] = [4,1,20,99,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,1,0,3,0,26,8,0,1,0,3,0,29,8,0,1,1,1,1,1,2,1,2,4,2,35,
	8,2,11,2,12,2,36,1,3,1,3,1,3,1,3,3,3,43,8,3,1,4,1,4,1,4,1,4,1,4,1,5,1,5,
	1,5,1,5,1,5,1,5,1,6,1,6,1,6,3,6,59,8,6,1,7,1,7,1,7,1,7,1,8,1,8,1,8,1,8,
	5,8,69,8,8,10,8,12,8,72,9,8,1,8,1,8,1,9,1,9,1,9,1,9,1,9,1,9,1,9,4,9,83,
	8,9,11,9,12,9,84,3,9,87,8,9,1,10,1,10,1,10,3,10,92,8,10,1,11,3,11,95,8,
	11,1,11,1,11,1,11,0,0,12,0,2,4,6,8,10,12,14,16,18,20,22,0,2,1,0,7,8,1,0,
	16,17,103,0,28,1,0,0,0,2,30,1,0,0,0,4,32,1,0,0,0,6,42,1,0,0,0,8,44,1,0,
	0,0,10,49,1,0,0,0,12,58,1,0,0,0,14,60,1,0,0,0,16,64,1,0,0,0,18,86,1,0,0,
	0,20,91,1,0,0,0,22,94,1,0,0,0,24,26,3,2,1,0,25,24,1,0,0,0,25,26,1,0,0,0,
	26,29,1,0,0,0,27,29,3,4,2,0,28,25,1,0,0,0,28,27,1,0,0,0,29,1,1,0,0,0,30,
	31,3,6,3,0,31,3,1,0,0,0,32,34,3,6,3,0,33,35,3,6,3,0,34,33,1,0,0,0,35,36,
	1,0,0,0,36,34,1,0,0,0,36,37,1,0,0,0,37,5,1,0,0,0,38,43,3,8,4,0,39,43,3,
	10,5,0,40,43,3,14,7,0,41,43,3,12,6,0,42,38,1,0,0,0,42,39,1,0,0,0,42,40,
	1,0,0,0,42,41,1,0,0,0,43,7,1,0,0,0,44,45,5,6,0,0,45,46,5,1,0,0,46,47,7,
	0,0,0,47,48,3,18,9,0,48,9,1,0,0,0,49,50,5,9,0,0,50,51,3,18,9,0,51,52,5,
	1,0,0,52,53,5,10,0,0,53,54,3,20,10,0,54,11,1,0,0,0,55,59,5,15,0,0,56,59,
	5,19,0,0,57,59,3,22,11,0,58,55,1,0,0,0,58,56,1,0,0,0,58,57,1,0,0,0,59,13,
	1,0,0,0,60,61,5,11,0,0,61,62,5,1,0,0,62,63,3,16,8,0,63,15,1,0,0,0,64,65,
	5,2,0,0,65,70,3,18,9,0,66,67,5,3,0,0,67,69,3,18,9,0,68,66,1,0,0,0,69,72,
	1,0,0,0,70,68,1,0,0,0,70,71,1,0,0,0,71,73,1,0,0,0,72,70,1,0,0,0,73,74,5,
	4,0,0,74,17,1,0,0,0,75,87,5,15,0,0,76,87,5,19,0,0,77,87,5,14,0,0,78,87,
	5,17,0,0,79,82,5,19,0,0,80,81,5,5,0,0,81,83,5,19,0,0,82,80,1,0,0,0,83,84,
	1,0,0,0,84,82,1,0,0,0,84,85,1,0,0,0,85,87,1,0,0,0,86,75,1,0,0,0,86,76,1,
	0,0,0,86,77,1,0,0,0,86,78,1,0,0,0,86,79,1,0,0,0,87,19,1,0,0,0,88,92,5,15,
	0,0,89,92,5,19,0,0,90,92,3,22,11,0,91,88,1,0,0,0,91,89,1,0,0,0,91,90,1,
	0,0,0,92,21,1,0,0,0,93,95,5,18,0,0,94,93,1,0,0,0,94,95,1,0,0,0,95,96,1,
	0,0,0,96,97,7,1,0,0,97,23,1,0,0,0,10,25,28,36,42,58,70,84,86,91,94];

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
	public single(): SingleContext {
		return this.getTypedRuleContext(SingleContext, 0) as SingleContext;
	}
	public multiple(): MultipleContext {
		return this.getTypedRuleContext(MultipleContext, 0) as MultipleContext;
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


export class SingleContext extends ParserRuleContext {
	constructor(parser?: MsDslParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public content(): ContentContext {
		return this.getTypedRuleContext(ContentContext, 0) as ContentContext;
	}
    public get ruleIndex(): number {
    	return MsDslParser.RULE_single;
	}
	public enterRule(listener: MsDslListener): void {
	    if(listener.enterSingle) {
	 		listener.enterSingle(this);
		}
	}
	public exitRule(listener: MsDslListener): void {
	    if(listener.exitSingle) {
	 		listener.exitSingle(this);
		}
	}
}


export class MultipleContext extends ParserRuleContext {
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
    	return MsDslParser.RULE_multiple;
	}
	public enterRule(listener: MsDslListener): void {
	    if(listener.enterMultiple) {
	 		listener.enterMultiple(this);
		}
	}
	public exitRule(listener: MsDslListener): void {
	    if(listener.exitMultiple) {
	 		listener.exitMultiple(this);
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
	public filterContent(): FilterContentContext {
		return this.getTypedRuleContext(FilterContentContext, 0) as FilterContentContext;
	}
	public onContent(): OnContentContext {
		return this.getTypedRuleContext(OnContentContext, 0) as OnContentContext;
	}
	public queryContent(): QueryContentContext {
		return this.getTypedRuleContext(QueryContentContext, 0) as QueryContentContext;
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


export class SortContentContext extends ParserRuleContext {
	constructor(parser?: MsDslParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public AT_SORT(): TerminalNode {
		return this.getToken(MsDslParser.AT_SORT, 0);
	}
	public key(): KeyContext {
		return this.getTypedRuleContext(KeyContext, 0) as KeyContext;
	}
	public ASC(): TerminalNode {
		return this.getToken(MsDslParser.ASC, 0);
	}
	public DESC(): TerminalNode {
		return this.getToken(MsDslParser.DESC, 0);
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


export class FilterContentContext extends ParserRuleContext {
	constructor(parser?: MsDslParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public HASH(): TerminalNode {
		return this.getToken(MsDslParser.HASH, 0);
	}
	public key(): KeyContext {
		return this.getTypedRuleContext(KeyContext, 0) as KeyContext;
	}
	public FILTER_SYMBOLS(): TerminalNode {
		return this.getToken(MsDslParser.FILTER_SYMBOLS, 0);
	}
	public value(): ValueContext {
		return this.getTypedRuleContext(ValueContext, 0) as ValueContext;
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


export class QueryContentContext extends ParserRuleContext {
	constructor(parser?: MsDslParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public STRING(): TerminalNode {
		return this.getToken(MsDslParser.STRING, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(MsDslParser.IDENTIFIER, 0);
	}
	public number_(): NumberContext {
		return this.getTypedRuleContext(NumberContext, 0) as NumberContext;
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


export class OnContentContext extends ParserRuleContext {
	constructor(parser?: MsDslParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public AT_ON(): TerminalNode {
		return this.getToken(MsDslParser.AT_ON, 0);
	}
	public keys(): KeysContext {
		return this.getTypedRuleContext(KeysContext, 0) as KeysContext;
	}
    public get ruleIndex(): number {
    	return MsDslParser.RULE_onContent;
	}
	public enterRule(listener: MsDslListener): void {
	    if(listener.enterOnContent) {
	 		listener.enterOnContent(this);
		}
	}
	public exitRule(listener: MsDslListener): void {
	    if(listener.exitOnContent) {
	 		listener.exitOnContent(this);
		}
	}
}


export class KeysContext extends ParserRuleContext {
	constructor(parser?: MsDslParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public key_list(): KeyContext[] {
		return this.getTypedRuleContexts(KeyContext) as KeyContext[];
	}
	public key(i: number): KeyContext {
		return this.getTypedRuleContext(KeyContext, i) as KeyContext;
	}
    public get ruleIndex(): number {
    	return MsDslParser.RULE_keys;
	}
	public enterRule(listener: MsDslListener): void {
	    if(listener.enterKeys) {
	 		listener.enterKeys(this);
		}
	}
	public exitRule(listener: MsDslListener): void {
	    if(listener.exitKeys) {
	 		listener.exitKeys(this);
		}
	}
}


export class KeyContext extends ParserRuleContext {
	constructor(parser?: MsDslParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public STRING(): TerminalNode {
		return this.getToken(MsDslParser.STRING, 0);
	}
	public IDENTIFIER_list(): TerminalNode[] {
	    	return this.getTokens(MsDslParser.IDENTIFIER);
	}
	public IDENTIFIER(i: number): TerminalNode {
		return this.getToken(MsDslParser.IDENTIFIER, i);
	}
	public LITERAL(): TerminalNode {
		return this.getToken(MsDslParser.LITERAL, 0);
	}
	public NUMERIC_LITERAL(): TerminalNode {
		return this.getToken(MsDslParser.NUMERIC_LITERAL, 0);
	}
    public get ruleIndex(): number {
    	return MsDslParser.RULE_key;
	}
	public enterRule(listener: MsDslListener): void {
	    if(listener.enterKey) {
	 		listener.enterKey(this);
		}
	}
	public exitRule(listener: MsDslListener): void {
	    if(listener.exitKey) {
	 		listener.exitKey(this);
		}
	}
}


export class ValueContext extends ParserRuleContext {
	constructor(parser?: MsDslParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public STRING(): TerminalNode {
		return this.getToken(MsDslParser.STRING, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(MsDslParser.IDENTIFIER, 0);
	}
	public number_(): NumberContext {
		return this.getTypedRuleContext(NumberContext, 0) as NumberContext;
	}
    public get ruleIndex(): number {
    	return MsDslParser.RULE_value;
	}
	public enterRule(listener: MsDslListener): void {
	    if(listener.enterValue) {
	 		listener.enterValue(this);
		}
	}
	public exitRule(listener: MsDslListener): void {
	    if(listener.exitValue) {
	 		listener.exitValue(this);
		}
	}
}


export class NumberContext extends ParserRuleContext {
	constructor(parser?: MsDslParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public NUMERIC_LITERAL(): TerminalNode {
		return this.getToken(MsDslParser.NUMERIC_LITERAL, 0);
	}
	public NUMBER(): TerminalNode {
		return this.getToken(MsDslParser.NUMBER, 0);
	}
	public SYMBOL(): TerminalNode {
		return this.getToken(MsDslParser.SYMBOL, 0);
	}
    public get ruleIndex(): number {
    	return MsDslParser.RULE_number;
	}
	public enterRule(listener: MsDslListener): void {
	    if(listener.enterNumber) {
	 		listener.enterNumber(this);
		}
	}
	public exitRule(listener: MsDslListener): void {
	    if(listener.exitNumber) {
	 		listener.exitNumber(this);
		}
	}
}
