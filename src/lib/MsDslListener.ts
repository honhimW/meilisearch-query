// Generated from ./MsDsl.g4 by ANTLR 4.13.1

import {ParseTreeListener} from "antlr4";


import { LineContext } from "./MsDslParser";
import { ContentContext } from "./MsDslParser";
import { FilterContentContext } from "./MsDslParser";
import { SortContentContext } from "./MsDslParser";
import { QueryContentContext } from "./MsDslParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `MsDslParser`.
 */
export default class MsDslListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `MsDslParser.line`.
	 * @param ctx the parse tree
	 */
	enterLine?: (ctx: LineContext) => void;
	/**
	 * Exit a parse tree produced by `MsDslParser.line`.
	 * @param ctx the parse tree
	 */
	exitLine?: (ctx: LineContext) => void;
	/**
	 * Enter a parse tree produced by `MsDslParser.content`.
	 * @param ctx the parse tree
	 */
	enterContent?: (ctx: ContentContext) => void;
	/**
	 * Exit a parse tree produced by `MsDslParser.content`.
	 * @param ctx the parse tree
	 */
	exitContent?: (ctx: ContentContext) => void;
	/**
	 * Enter a parse tree produced by `MsDslParser.filterContent`.
	 * @param ctx the parse tree
	 */
	enterFilterContent?: (ctx: FilterContentContext) => void;
	/**
	 * Exit a parse tree produced by `MsDslParser.filterContent`.
	 * @param ctx the parse tree
	 */
	exitFilterContent?: (ctx: FilterContentContext) => void;
	/**
	 * Enter a parse tree produced by `MsDslParser.sortContent`.
	 * @param ctx the parse tree
	 */
	enterSortContent?: (ctx: SortContentContext) => void;
	/**
	 * Exit a parse tree produced by `MsDslParser.sortContent`.
	 * @param ctx the parse tree
	 */
	exitSortContent?: (ctx: SortContentContext) => void;
	/**
	 * Enter a parse tree produced by `MsDslParser.queryContent`.
	 * @param ctx the parse tree
	 */
	enterQueryContent?: (ctx: QueryContentContext) => void;
	/**
	 * Exit a parse tree produced by `MsDslParser.queryContent`.
	 * @param ctx the parse tree
	 */
	exitQueryContent?: (ctx: QueryContentContext) => void;
}

