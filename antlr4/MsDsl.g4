grammar MsDsl;

line
    : none
    | single
    | multiple
    ;

none
    : WS*
    ;

single
    : content?
    ;

multiple
    : content+
    ;

content: sortContent ;

sortContent
    : (AT_SORT_ASC | AT_SORT_DESC) ':' key
    ;

//filterContent: HASH key COLON OPERATOR PLAIN_VALUE;
//queryContent: PLAIN_VALUE;

AT_SORT_ASC: '@sort+';
AT_SORT_DESC: '@sort-';
HASH: '#';
COLON: ':';
OPERATOR: '=' | '!=' | '>' | '<' | '>=' | '<=';
ATTRIBUTE_NAME: NONE_QUOTE_CHAR+ ('.' NONE_QUOTE_CHAR+)*;

key
    : STRING
    | IDENTIFIER
    | LITERAL
    ;

NUMBER
    : INT ('.' [0-9]*)? // 1234, 1234.5
    ;

STRING
    : '"' DOUBLE_QUOTE_CHAR* '"'
    | '\'' SINGLE_QUOTE_CHAR* '\''
    ;

LITERAL
    : 'true'
    | 'false'
    | 'null'
    ;

fragment NONE_QUOTE_CHAR
    : ~["'\\\r\n]
    | ESCAPE_SEQUENCE
    ;

fragment DOUBLE_QUOTE_CHAR
    : ~["\\\r\n]
    | ESCAPE_SEQUENCE
    ;

fragment SINGLE_QUOTE_CHAR
    : ~['\\\r\n]
    | ESCAPE_SEQUENCE
    ;

fragment ESCAPE_SEQUENCE
    : '\\' (
        UNICODE_SEQUENCE         // \u1234
        | ['"\\/bfnrtv]          // single escape char
        | ~['"\\bfnrtv0-9xu\r\n] // non escape char
        | '0'                    // \0
        | 'x' HEX HEX            // \x3a
    )
    ;

fragment HEX
    : [0-9a-fA-F]
    ;

fragment INT
    : '0'
    | [1-9] [0-9]*
    ;

IDENTIFIER
    : IDENTIFIER_START IDENTIFIER_PART*
    ;

fragment IDENTIFIER_START
    : [\p{L}]
    | '$'
    | '_'
    | '\\' UNICODE_SEQUENCE
    ;

fragment IDENTIFIER_PART
    : IDENTIFIER_START
    | [\p{M}]
    | [\p{N}]
    | [\p{Pc}]
    | '\u200C'
    | '\u200D'
    ;

fragment UNICODE_SEQUENCE
    : 'u' HEX HEX HEX HEX
    ;

WS
    : [ \t\n\r\u00A0\uFEFF\u2003]+ -> skip
    ;