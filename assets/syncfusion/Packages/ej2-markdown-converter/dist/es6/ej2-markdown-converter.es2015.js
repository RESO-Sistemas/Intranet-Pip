/* eslint-disable security/detect-non-literal-regexp */
/* eslint-disable security/detect-unsafe-regex */
const noopTest = { exec: () => null };
function edit(regex, opt = '') {
    let source = typeof regex === 'string' ? regex : regex.source;
    const obj = {
        replace: (name, val) => {
            let valSource = typeof val === 'string' ? val : val.source;
            valSource = valSource.replace(other.caret, '$1');
            source = source.replace(name, valSource);
            return obj;
        },
        getRegex: () => {
            return new RegExp(source, opt);
        }
    };
    return obj;
}
const other = {
    codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm,
    // eslint-disable-next-line no-useless-escape
    outputLinkReplace: /\\([\[\]])/g,
    indentCodeCompensation: /^(\s+)(?:```)/,
    beginningSpace: /^\s+/,
    endingHash: /#$/,
    startingSpaceChar: /^ /,
    endingSpaceChar: / $/,
    nonSpaceChar: /[^ ]/,
    newLineCharGlobal: /\n/g,
    tabCharGlobal: /\t/g,
    multipleSpaceGlobal: /\s+/g,
    blankLine: /^[ \t]*$/,
    doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
    blockquoteStart: /^ {0,3}>/,
    blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
    blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
    listReplaceTabs: /^\t+/,
    listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
    listIsTask: /^\[[ xX]\] /,
    listReplaceTask: /^\[[ xX]\] +/,
    anyLine: /\n.*\n/,
    hrefBrackets: /^<(.*)>$/,
    tableDelimiter: /[:|]/,
    tableAlignChars: /^\||\| *$/g,
    tableRowBlankLine: /\n[ \t]*$/,
    tableAlignRight: /^ *-+: *$/,
    tableAlignCenter: /^ *:-+: *$/,
    tableAlignLeft: /^ *:-+ *$/,
    startATag: /^<a /i,
    endATag: /^<\/a>/i,
    startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
    endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
    startAngleBracket: /^</,
    endAngleBracket: />$/,
    pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
    unicodeAlphaNumeric: /[a-zA-Z0-9\u00C0-\u017F\u0100-\u024F]/,
    escapeTest: /[&<>"']/,
    escapeReplace: /[&<>"']/g,
    escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
    escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
    unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,
    // eslint-disable-next-line no-useless-escape
    caret: /(^|[^\[])\^/g,
    percentDecode: /%25/g,
    findPipe: /\|/g,
    splitPipe: / \|/,
    slashPipe: /\\\|/g,
    carriageReturn: /\r\n|\r/g,
    spaceLine: /^ +$/gm,
    notSpaceStart: /^\S*/,
    endingNewline: /\n$/,
    listItemRegex: (bull) => new RegExp(`^( {0,3}${bull})((?:[\t ][^\\n]*)?(?:\\n|$))`),
    nextBulletRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`),
    hrRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),
    fencesBeginRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:\`\`\`|~~~)`),
    headingBeginRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}#`),
    htmlBeginRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}<(?:[a-z].*>|!--)`, 'i')
};
/**
 * Block-Level Grammar
 */
const newline = /^(?:[ \t]*(?:\n|$))+/;
const blockCode = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/;
const fences = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
const hr = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
const heading = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;
const bullet = /(?:[*+-]|\d{1,9}[.)])/;
const lheadingCore = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/;
const lheading = edit(lheadingCore)
    .replace(/bull/g, bullet) // lists can interrupt
    .replace(/blockCode/g, /(?: {4}| {0,3}\t)/) // indented code blocks can interrupt
    .replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/) // fenced code blocks can interrupt
    .replace(/blockquote/g, / {0,3}>/) // blockquote can interrupt
    .replace(/heading/g, / {0,3}#{1,6}/) // ATX heading can interrupt
    .replace(/html/g, / {0,3}<[^\n>]+>\n/) // block html can interrupt
    .replace(/\|table/g, '') // table not in commonmark
    .getRegex();
const lheadingGfm = edit(lheadingCore)
    .replace(/bull/g, bullet) // lists can interrupt
    .replace(/blockCode/g, /(?: {4}| {0,3}\t)/) // indented code blocks can interrupt
    .replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/) // fenced code blocks can interrupt
    .replace(/blockquote/g, / {0,3}>/) // blockquote can interrupt
    .replace(/heading/g, / {0,3}#{1,6}/) // ATX heading can interrupt
    .replace(/html/g, / {0,3}<[^\n>]+>\n/) // block html can interrupt
    // eslint-disable-next-line no-useless-escape
    .replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/) // table can interrupt
    .getRegex();
const _paragraph = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/;
const blockText = /^[^\n]+/;
// eslint-disable-next-line no-useless-escape
const _blockLabel = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
const def = edit(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/)
    .replace('label', _blockLabel)
    .replace('title', /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/)
    .getRegex();
const list = edit(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/)
    .replace(/bull/g, bullet)
    .getRegex();
const _tag = 'address|article|aside|base|basefont|blockquote|body|caption'
    + '|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption'
    + '|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe'
    + '|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option'
    + '|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title'
    + '|tr|track|ul';
const _comment = /<!--(?:-?>|[\s\S]*?(?:-->|$))/;
const html = edit('^ {0,3}(?:' // optional indentation
    + '<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)' // (1)
    + '|comment[^\\n]*(\\n+|$)' // (2)
    + '|<\\?[\\s\\S]*?(?:\\?>\\n*|$)' // (3)
    + '|<![A-Z][\\s\\S]*?(?:>\\n*|$)' // (4)
    + '|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)' // (5)
    + '|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$)' // (6)
    + '|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$)' // (7) open tag
    + '|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$)' // (7) closing tag
    + ')', 'i')
    .replace('comment', _comment)
    .replace('tag', _tag)
    .replace('attribute', / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/)
    .getRegex();
const paragraph = edit(_paragraph)
    .replace('hr', hr)
    .replace('heading', ' {0,3}#{1,6}(?:\\s|$)')
    .replace('|lheading', '') // setext headings don't interrupt commonmark paragraphs
    .replace('|table', '')
    .replace('blockquote', ' {0,3}>')
    .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
    .replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
    .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)')
    .replace('tag', _tag) // pars can be interrupted by type (6) html blocks
    .getRegex();
const blockquote = edit(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/)
    .replace('paragraph', paragraph)
    .getRegex();
/**
 * Normal Block Grammar
 */
const blockNormal = {
    blockquote,
    code: blockCode,
    def,
    fences,
    heading,
    hr,
    html,
    lheading,
    list,
    newline,
    paragraph,
    table: noopTest,
    text: blockText
};
/**
 * GFM Block Grammar
 */
const gfmTable = edit('^ *([^\\n ].*)\\n' // Header
    + ' {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)' // Align
    + '(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)') // Cells
    .replace('hr', hr)
    .replace('heading', ' {0,3}#{1,6}(?:\\s|$)')
    .replace('blockquote', ' {0,3}>')
    .replace('code', '(?: {4}| {0,3}\t)[^\\n]')
    .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
    .replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
    .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)')
    .replace('tag', _tag) // tables can be interrupted by type (6) html blocks
    .getRegex();
const blockGfm = Object.assign({}, blockNormal, {
    lheading: lheadingGfm,
    table: gfmTable,
    paragraph: edit(_paragraph)
        .replace('hr', hr)
        .replace('heading', ' {0,3}#{1,6}(?:\\s|$)')
        .replace('|lheading', '') // setext headings don't interrupt commonmark paragraphs
        .replace('table', gfmTable) // interrupt paragraphs with table
        .replace('blockquote', ' {0,3}>')
        .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
        .replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
        .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)')
        .replace('tag', _tag) // pars can be interrupted by type (6) html blocks
        .getRegex()
});
/**
 * Pedantic grammar (original John Gruber's loose markdown specification)
 */
const blockPedantic = Object.assign({}, blockNormal, {
    html: edit('^ *(?:comment *(?:\\n|\\s*$)'
        + '|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)' // closed tag
        + '|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))')
        .replace('comment', _comment)
        .replace(/tag/g, '(?!(?:'
        + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub'
        + '|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)'
        + '\\b)\\w+(?!:|[^\\w\\s@]*@)\\b')
        .getRegex(),
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
    heading: /^(#{1,6})(.*)(?:\n+|$)/,
    fences: noopTest,
    lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
    paragraph: edit(_paragraph)
        .replace('hr', hr)
        .replace('heading', ' *#{1,6} *[^\n]')
        .replace('lheading', lheading)
        .replace('|table', '')
        .replace('blockquote', ' {0,3}>')
        .replace('|fences', '')
        .replace('|list', '')
        .replace('|html', '')
        .replace('|tag', '')
        .getRegex()
});
/**
 * Inline-Level Grammar
 */
// eslint-disable-next-line no-useless-escape
const escape = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
const inlineCode = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
const br = /^( {2,}|\\)\n(?!\s*$)/;
// eslint-disable-next-line no-useless-escape
const inlineText = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/;
// list of unicode punctuation marks, plus any missing characters from CommonMark spec
// eslint-disable-next-line no-useless-escape
const _punctuation = /[!"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~]/;
// eslint-disable-next-line no-useless-escape
const _punctuationOrSpace = /[\s!"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~]/;
// eslint-disable-next-line no-useless-escape
const _notPunctuationOrSpace = /[^\s!"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~]/;
const punctuation = edit(/^((?![*_])punctSpace)/)
    .replace(/punctSpace/g, _punctuationOrSpace).getRegex();
// GFM allows ~ inside strong and em for strikethrough
// eslint-disable-next-line no-useless-escape
const _punctuationGfmStrongEm = /(?!~)[!"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}]/;
// eslint-disable-next-line no-useless-escape
const _punctuationOrSpaceGfmStrongEm = /(?!~)[\s!"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}]/;
// eslint-disable-next-line no-useless-escape
const _notPunctuationOrSpaceGfmStrongEm = /(?:[^\s!"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}]|~)/;
// sequences em should skip over [title](link), `code`, <html>
// eslint-disable-next-line no-useless-escape
const blockSkip = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g;
const emStrongLDelimCore = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/;
const emStrongLDelim = edit(emStrongLDelimCore)
    .replace(/punct/g, _punctuation)
    .getRegex();
const emStrongLDelimGfm = edit(emStrongLDelimCore)
    .replace(/punct/g, _punctuationGfmStrongEm)
    .getRegex();
const emStrongRDelimAstCore = '^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)' // Skip orphan inside strong
    + '|[^*]+(?=[^*])' // Consume to delim
    + '|(?!\\*)punct(\\*+)(?=[\\s]|$)' // (1) #*** can only be a Right Delimiter
    + '|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)' // (2) a***#, a*** can only be a Right Delimiter
    + '|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)' // (3) #***a, ***a can only be Left Delimiter
    + '|[\\s](\\*+)(?!\\*)(?=punct)' // (4) ***# can only be Left Delimiter
    + '|(?!\\*)punct(\\*+)(?!\\*)(?=punct)' // (5) #***# can be either Left or Right Delimiter
    + '|notPunctSpace(\\*+)(?=notPunctSpace)'; // (6) a***a can be either Left or Right Delimiter
const emStrongRDelimAst = edit(emStrongRDelimAstCore, 'g')
    .replace(/notPunctSpace/g, _notPunctuationOrSpace)
    .replace(/punctSpace/g, _punctuationOrSpace)
    .replace(/punct/g, _punctuation)
    .getRegex();
const emStrongRDelimAstGfm = edit(emStrongRDelimAstCore, 'g')
    .replace(/notPunctSpace/g, _notPunctuationOrSpaceGfmStrongEm)
    .replace(/punctSpace/g, _punctuationOrSpaceGfmStrongEm)
    .replace(/punct/g, _punctuationGfmStrongEm)
    .getRegex();
// (6) Not allowed for _
const emStrongRDelimUnd = edit('^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)' // Skip orphan inside strong
    + '|[^_]+(?=[^_])' // Consume to delim
    + '|(?!_)punct(_+)(?=[\\s]|$)' // (1) #___ can only be a Right Delimiter
    + '|notPunctSpace(_+)(?!_)(?=punctSpace|$)' // (2) a___#, a___ can only be a Right Delimiter
    + '|(?!_)punctSpace(_+)(?=notPunctSpace)' // (3) #___a, ___a can only be Left Delimiter
    + '|[\\s](_+)(?!_)(?=punct)' // (4) ___# can only be Left Delimiter
    + '|(?!_)punct(_+)(?!_)(?=punct)', 'g') // (5) #___# can be either Left or Right Delimiter
    .replace(/notPunctSpace/g, _notPunctuationOrSpace)
    .replace(/punctSpace/g, _punctuationOrSpace)
    .replace(/punct/g, _punctuation)
    .getRegex();
const anyPunctuation = edit(/\\(punct)/, 'g')
    .replace(/punct/g, _punctuation)
    .getRegex();
// eslint-disable-next-line no-control-regex
const autolink = edit(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/)
    .replace('scheme', /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/)
    .replace('email', /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/)
    .getRegex();
const _inlineComment = edit(_comment).replace('(?:-->|$)', '-->').getRegex();
const tag = edit('^comment'
    + '|^</[a-zA-Z][\\w:-]*\\s*>' // self-closing tag
    + '|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>' // open tag
    + '|^<\\?[\\s\\S]*?\\?>' // processing instruction, e.g. <?php ?>
    + '|^<![a-zA-Z]+\\s[\\s\\S]*?>' // declaration, e.g. <!DOCTYPE html>
    + '|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>') // CDATA section
    .replace('comment', _inlineComment)
    .replace('attribute', /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/)
    .getRegex();
// eslint-disable-next-line no-useless-escape
const _inlineLabel = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
const link = edit(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/)
    .replace('label', _inlineLabel)
    // eslint-disable-next-line no-control-regex
    .replace('href', /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/)
    .replace('title', /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/)
    .getRegex();
const reflink = edit(/^!?\[(label)\]\[(ref)\]/)
    .replace('label', _inlineLabel)
    .replace('ref', _blockLabel)
    .getRegex();
const nolink = edit(/^!?\[(ref)\](?:\[\])?/)
    .replace('ref', _blockLabel)
    .getRegex();
const reflinkSearch = edit('reflink|nolink(?!\\()', 'g')
    .replace('reflink', reflink)
    .replace('nolink', nolink)
    .getRegex();
/**
 * Normal Inline Grammar
 */
const inlineNormal = {
    _backpedal: noopTest,
    anyPunctuation,
    autolink,
    blockSkip,
    br,
    code: inlineCode,
    del: noopTest,
    emStrongLDelim,
    emStrongRDelimAst,
    emStrongRDelimUnd,
    escape,
    link,
    nolink,
    punctuation,
    reflink,
    reflinkSearch,
    tag,
    text: inlineText,
    url: noopTest
};
/**
 * Pedantic Inline Grammar
 */
const inlinePedantic = Object.assign({}, inlineNormal, {
    link: edit(/^!?\[(label)\]\((.*?)\)/)
        .replace('label', _inlineLabel)
        .getRegex(),
    reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/)
        .replace('label', _inlineLabel)
        .getRegex()
});
/**
 * GFM Inline Grammar
 */
const inlineGfm = Object.assign({}, inlineNormal, {
    emStrongRDelimAst: emStrongRDelimAstGfm,
    emStrongLDelim: emStrongLDelimGfm,
    // eslint-disable-next-line no-useless-escape
    url: edit(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, 'i')
        .replace('email', /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/)
        .getRegex(),
    _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
    del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
    // eslint-disable-next-line no-useless-escape
    text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
});
/**
 * GFM + Line Breaks Inline Grammar
 */
const inlineBreaks = Object.assign({}, inlineGfm, {
    br: edit(br).replace('{2,}', '*').getRegex(),
    text: edit(inlineGfm.text)
        .replace('\\b_', '\\b_| {2,}\\n')
        .replace(/\{2,\}/g, '*')
        .getRegex()
});
/**
 * exports
 */
const block = {
    normal: blockNormal,
    gfm: blockGfm,
    pedantic: blockPedantic
};
const inline = {
    normal: inlineNormal,
    gfm: inlineGfm,
    breaks: inlineBreaks,
    pedantic: inlinePedantic
};

/**
 * Helpers
 */
const escapeReplacements = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;'
};
const getEscapeReplacement = (ch) => escapeReplacements[ch];
function escape$1(html, encode) {
    if (encode) {
        if (other.escapeTest.test(html)) {
            return html.replace(other.escapeReplace, getEscapeReplacement);
        }
    }
    else {
        if (other.escapeTestNoEncode.test(html)) {
            return html.replace(other.escapeReplaceNoEncode, getEscapeReplacement);
        }
    }
    return html;
}
function cleanUrl(href) {
    try {
        href = encodeURI(href).replace(other.percentDecode, '%');
    }
    catch (_a) {
        return null;
    }
    return href;
}
function splitCells(tableRow, count) {
    // ensure that every cell-delimiting pipe has a space
    // before it to distinguish it from an escaped pipe
    const row = tableRow.replace(other.findPipe, (match, offset, str) => {
        let escaped = false;
        let curr = offset;
        while (--curr >= 0 && str[curr] === '\\') {
            escaped = !escaped;
        }
        if (escaped) {
            // odd number of slashes means | is escaped
            // so we leave it alone
            return '|';
        }
        else {
            // add space before unescaped |
            return ' |';
        }
    });
    const cells = row.split(other.splitPipe);
    let i = 0;
    // First/last cell in a row cannot be empty if it has no leading/trailing pipe
    if (!cells[0].trim()) {
        cells.shift();
    }
    if (cells.length > 0 && cells[cells.length - 1].trim() === '') {
        cells.pop();
    }
    if (count) {
        if (cells.length > count) {
            cells.splice(count);
        }
        else {
            while (cells.length < count) {
                cells.push('');
            }
        }
    }
    for (; i < cells.length; i++) {
        // leading or trailing whitespace is ignored per the gfm spec
        cells[i] = cells[i].trim().replace(other.slashPipe, '|');
    }
    return cells;
}
/**
 * Remove trailing 'c's. Equivalent to str.replace(/c*$/, '').
 * /c*$/ is vulnerable to REDOS.
 *
 * @param {string} str The string
 * @param {string} c The character to trim
 * @param  {boolean} invert Remove suffix of non-c chars instead. Default falsey.
 * @returns {string} The trimmed string
 */
function removeTrailingSpace(str, c, invert) {
    const l = str.length;
    if (l === 0) {
        return '';
    }
    // Length of suffix matching the invert condition.
    let suffLen = 0;
    // Step left until we fail to match the invert condition.
    while (suffLen < l) {
        const currChar = str.charAt(l - suffLen - 1);
        if (currChar === c && !invert) {
            suffLen++;
        }
        else if (currChar !== c && invert) {
            suffLen++;
        }
        else {
            break;
        }
    }
    return str.slice(0, l - suffLen);
}
function findClosingBracket(str, b) {
    if (str.indexOf(b[1]) === -1) {
        return -1;
    }
    let level = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '\\') {
            i++;
        }
        else if (str[i] === b[0]) {
            level++;
        }
        else if (str[i] === b[1]) {
            level--;
            if (level < 0) {
                return i;
            }
        }
    }
    if (level > 0) {
        return -2;
    }
    return -1;
}
// Gets the original marked default options.
function getDefaults() {
    return {
        async: false,
        lineBreak: false,
        gfm: true,
        silent: false
    };
}
function stringTrimStart(value) {
    return value.replace(/^\s+/, '');
}
function stringTrimEnd(value) {
    return value.replace(/\s+$/, '');
}
function arrayAt(arr, index) {
    // Normalize negative index
    if (index < 0) {
        index = arr.length + index;
    }
    // Return undefined if index is out of bounds
    if (index < 0 || index >= arr.length) {
        return undefined;
    }
    return arr[index];
}

/**
 * Tokenizer
 */
class Tokenizer {
    constructor(options) {
        this.options = options || getDefaults();
    }
    /**
     * Parses one or more newline characters into a space token.
     *
     * @param {string} mdSource - Markdown source beginning at current position.
     * @returns {TokenSpace | undefined} A space token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseSpace(mdSource) {
        const newlineMatch = this.rules.block.newline.exec(mdSource);
        if (newlineMatch && newlineMatch[0].length > 0) {
            return { type: 'space', raw: newlineMatch[0] };
        }
        return undefined;
    }
    /**
     * Parses an ATX heading (e.g., "# H1").
     *
     * @param {string} mdSource - Markdown source.
     * @returns {TokenHeading | undefined} A heading token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseAtxHeading(mdSource) {
        const match = this.rules.block.heading.exec(mdSource);
        if (match) {
            let text = match[2].trim();
            if (this.rules.other.endingHash.test(text)) {
                const trimmedText = removeTrailingSpace(text, '#');
                text = trimmedText.trim();
            }
            return {
                type: 'heading',
                raw: match[0],
                depth: match[1].length,
                text,
                tokens: this.lexer.inline(text)
            };
        }
        return undefined;
    }
    /**
     * Parses a paragraph block.
     *
     * @param {string} mdSource - Markdown source.
     * @returns {TokenParagraph | undefined} A paragraph token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseParagraph(mdSource) {
        const match = this.rules.block.paragraph.exec(mdSource);
        if (match) {
            const text = match[1].charAt(match[1].length - 1) === '\n' ? match[1].slice(0, -1) : match[1];
            return { type: 'paragraph', raw: match[0], text, tokens: this.lexer.inline(text) };
        }
        return undefined;
    }
    /**
     * Parses a raw text block (fallback when no other block matches).
     *
     * @param {string} mdSource - Markdown source.
     * @returns {TokenText | undefined} A text token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseText(mdSource) {
        const match = this.rules.block.text.exec(mdSource);
        if (match) {
            return { type: 'text', raw: match[0], text: match[0], tokens: this.lexer.inline(match[0]) };
        }
        return undefined;
    }
    /**
     * Parses an inline text segment.
     *
     * @param {string} mdSource - Markdown source.
     * @returns {TokenText | undefined} A text token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseInlineText(mdSource) {
        const match = this.rules.inline.text.exec(mdSource);
        if (match) {
            const escaped = this.lexer.state.inRawBlock;
            return { type: 'text', raw: match[0], text: match[0], escaped };
        }
        return undefined;
    }
    /**
     * Parses emphasis or strong emphasis (e.g., "*em*", "**strong**", "_em_", "__strong__").
     *
     * @param {string} src - Inline source starting at a delimiter.
     * @param {string} maskedSrc - Masked inline source to aid delimiter scanning.
     * @param {string} [prevChar] - Previous character to help with intraword checks.
     * @returns {TokenEm | TokenStrong | undefined} An emphasis/strong token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseEmphasisOrStrong(src, maskedSrc, prevChar = '') {
        let openingDelimMatch = this.rules.inline.emStrongLDelim.exec(src);
        if (!openingDelimMatch) {
            return undefined;
        }
        // _ can't be between two alphanumerics. \p{L}\p{N} includes non-english alphabet/numbers as well
        if (openingDelimMatch[3] && prevChar.match(this.rules.other.unicodeAlphaNumeric)) {
            return undefined;
        }
        const nextChar = openingDelimMatch[1] || openingDelimMatch[2] || '';
        if (!nextChar || !prevChar || this.rules.inline.punctuation.exec(prevChar)) {
            // unicode Regex counts emoji as 1 char; spread into array for proper count (used multiple times below)
            const leftLen = Array.from(openingDelimMatch[0]).length - 1;
            let rightDelim;
            let rightLen;
            let delimTotal = leftLen;
            let midBalancing = 0;
            const closeRegex = openingDelimMatch[0][0] === '*'
                ? this.rules.inline.emStrongRDelimAst
                : this.rules.inline.emStrongRDelimUnd;
            closeRegex.lastIndex = 0;
            // Clip masked source to same section of string as src
            maskedSrc = maskedSrc.slice(-1 * src.length + leftLen);
            // Scan for closing delimiters
            // eslint-disable-next-line no-cond-assign
            while ((openingDelimMatch = closeRegex.exec(maskedSrc)) != null) {
                rightDelim = openingDelimMatch[1] || openingDelimMatch[2] || openingDelimMatch[3] || openingDelimMatch[4] ||
                    openingDelimMatch[5] || openingDelimMatch[6];
                if (!rightDelim) {
                    continue; // skip single * in __abc*abc__
                }
                rightLen = Array.from(rightDelim).length;
                if (openingDelimMatch[3] || openingDelimMatch[4]) {
                    // Found another Left Delim
                    delimTotal += rightLen;
                    continue;
                }
                else if (openingDelimMatch[5] || openingDelimMatch[6]) {
                    // Either Left or Right Delim
                    if (leftLen % 3 && !((leftLen + rightLen) % 3)) {
                        midBalancing += rightLen;
                        continue; // CommonMark Emphasis Rules 9-10
                    }
                }
                delimTotal -= rightLen;
                if (delimTotal > 0) {
                    continue; // Haven't found enough closing delimiters
                }
                // Remove extra characters. *a*** -> *a*
                rightLen = Math.min(rightLen, rightLen + delimTotal + midBalancing);
                // char length can be >1 for unicode characters
                const lastCharLength = Array.from(openingDelimMatch[0])[0].length;
                const raw = src.slice(0, leftLen + openingDelimMatch.index + lastCharLength + rightLen);
                // Create `em` if smallest delimiter has odd char count. *a***
                if (Math.min(leftLen, rightLen) % 2) {
                    const inner = raw.slice(1, -1);
                    return {
                        type: 'em',
                        raw,
                        text: inner,
                        tokens: this.lexer.tokenizeInline(inner)
                    };
                }
                // Create 'strong' if smallest delimiter has even char count. **a***
                const inner = raw.slice(2, -2);
                return {
                    type: 'strong',
                    raw,
                    text: inner,
                    tokens: this.lexer.tokenizeInline(inner)
                };
            }
        }
        return undefined;
    }
    /**
     * Parses strikethrough (GFM) e.g., "~~del~~".
     *
     * @param {string} mdSource - Inline markdown source.
     * @returns {TokenDel | undefined} A strikethrough token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseStrikethrough(mdSource) {
        const match = this.rules.inline.del.exec(mdSource);
        if (match) {
            return {
                type: 'del',
                raw: match[0],
                text: match[2],
                tokens: this.lexer.tokenizeInline(match[2])
            };
        }
        return undefined;
    }
    /**
     * Parses a horizontal rule (---, ***, ___).
     *
     * @param {string} mdSource - Markdown source.
     * @returns {TokenHr | undefined} An <hr> token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    ParseHorizontalRule(mdSource) {
        const match = this.rules.block.hr.exec(mdSource);
        if (match) {
            return {
                type: 'hr',
                raw: removeTrailingSpace(match[0], '\n')
            };
        }
        return undefined;
    }
    /**
     * Parses a hard line break.
     *
     * @param {string} mdSource - Inline markdown source.
     * @returns {TokenBr | undefined} A break token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseBreak(mdSource) {
        const match = this.rules.inline.br.exec(mdSource);
        if (match) {
            return {
                type: 'br',
                raw: match[0]
            };
        }
        return undefined;
    }
    /**
     * Parses an indented code block (4-space).
     *
     * @param {string} mdSource - Markdown source.
     * @returns {TokenCode | undefined} A code block token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseIndentedCode(mdSource) {
        const match = this.rules.block.code.exec(mdSource);
        if (match) {
            const text = match[0].replace(this.rules.other.codeRemoveIndent, '');
            return {
                type: 'code',
                raw: match[0],
                codeBlockStyle: 'indented',
                text: this.options.gfm
                    ? removeTrailingSpace(text, '\n')
                    : text
            };
        }
        return undefined;
    }
    /**
     * Parses an inline code span (e.g., "`code`").
     *
     * @param {string} mdSource - Inline markdown source.
     * @returns {TokenCodespan | undefined} A code span token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseCodespan(mdSource) {
        const match = this.rules.inline.code.exec(mdSource);
        if (match) {
            let text = match[2].replace(this.rules.other.newLineCharGlobal, ' ');
            const hasNonSpaceChars = this.rules.other.nonSpaceChar.test(text);
            const hasSpaceCharsOnBothEnds = this.rules.other.startingSpaceChar.test(text) &&
                this.rules.other.endingSpaceChar.test(text);
            if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
                text = text.substring(1, text.length - 1);
            }
            return {
                type: 'codespan',
                raw: match[0],
                text
            };
        }
        return undefined;
    }
    indentCodeCompensation(raw, text, rules) {
        const matchIndentToCode = raw.match(rules.other.indentCodeCompensation);
        if (matchIndentToCode === null) {
            return text;
        }
        const indentToCode = matchIndentToCode[1];
        return text
            .split('\n')
            .map((line) => {
            const matchIndentInLine = line.match(rules.other.beginningSpace);
            if (matchIndentInLine === null) {
                return line;
            }
            const [indentInLine] = matchIndentInLine;
            if (indentInLine.length >= indentToCode.length) {
                return line.slice(indentToCode.length);
            }
            return line;
        })
            .join('\n');
    }
    outputLink(cap, link, raw, lexer, rules) {
        const href = link.href;
        const title = link.title || null;
        const text = cap[1].replace(rules.other.outputLinkReplace, '$1');
        lexer.state.inLink = true;
        const token = {
            type: cap[0].charAt(0) === '!' ? 'image' : 'link',
            raw,
            href,
            title,
            text,
            tokens: lexer.tokenizeInline(text)
        };
        lexer.state.inLink = false;
        return token;
    }
    /**
     * Parses a fenced code block (``` or ~~~).
     *
     * @param {string} mdSource - Markdown source.
     * @returns {TokenCode | undefined} A fenced code block token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseFencedCode(mdSource) {
        const match = this.rules.block.fences.exec(mdSource);
        if (match) {
            const raw = match[0];
            const text = this.indentCodeCompensation(raw, match[3] || '', this.rules);
            return {
                type: 'code',
                raw,
                lang: match[2] ? match[2].trim().replace(this.rules.inline.anyPunctuation, '$1') : match[2],
                text
            };
        }
        return undefined;
    }
    /**
     * Parses a blockquote block (prefix ">").
     *
     * @param {string} mdSource - Markdown source.
     * @returns {TokenBlockquote | undefined} A blockquote token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseBlockquote(mdSource) {
        const match = this.rules.block.blockquote.exec(mdSource);
        if (match) {
            let lines = removeTrailingSpace(match[0], '\n').split('\n');
            let raw = '';
            let text = '';
            const tokens = [];
            while (lines.length > 0) {
                let inBlockquote = false;
                const currentLines = [];
                let i;
                for (i = 0; i < lines.length; i++) {
                    // get lines up to a continuation
                    if (this.rules.other.blockquoteStart.test(lines[i])) {
                        currentLines.push(lines[i]);
                        inBlockquote = true;
                    }
                    else if (!inBlockquote) {
                        currentLines.push(lines[i]);
                    }
                    else {
                        break;
                    }
                }
                lines = lines.slice(i);
                const currentRaw = currentLines.join('\n');
                const currentText = currentRaw
                    // precede setext continuation with 4 spaces so it isn't a setext
                    .replace(this.rules.other.blockquoteSetextReplace, '\n    $1')
                    .replace(this.rules.other.blockquoteSetextReplace2, '');
                raw = raw ? `${raw}\n${currentRaw}` : currentRaw;
                text = text ? `${text}\n${currentText}` : currentText;
                // parse blockquote lines as top level tokens
                // merge paragraphs if this is a continuation
                const top = this.lexer.state.top;
                this.lexer.state.top = true;
                this.lexer.tokenizeBlocks(currentText, tokens, true);
                this.lexer.state.top = top;
                // if there is no continuation then we are done
                if (lines.length === 0) {
                    break;
                }
                const lastToken = arrayAt(tokens, -1);
                if (lastToken && lastToken.type === 'code') {
                    // blockquote continuation cannot be preceded by a code block
                    break;
                }
                else if (lastToken && lastToken.type === 'blockquote') {
                    // include continuation in nested blockquote
                    const oldToken = lastToken;
                    const newText = oldToken.raw + '\n' + lines.join('\n');
                    const newToken = this.parseBlockquote(newText);
                    tokens[tokens.length - 1] = newToken;
                    raw = raw.substring(0, raw.length - oldToken.raw.length) + newToken.raw;
                    text = text.substring(0, text.length - oldToken.text.length) + newToken.text;
                    break;
                }
                else if (lastToken && lastToken.type === 'list') {
                    // include continuation in nested list
                    const oldToken = lastToken;
                    const newText = oldToken.raw + '\n' + lines.join('\n');
                    const newToken = this.parseList(newText);
                    tokens[tokens.length - 1] = newToken;
                    raw = raw.substring(0, raw.length - lastToken.raw.length) + newToken.raw;
                    text = text.substring(0, text.length - oldToken.raw.length) + newToken.raw;
                    lines = newText.substring(arrayAt(tokens, -1).raw.length).split('\n');
                    continue;
                }
            }
            return {
                type: 'blockquote',
                raw,
                tokens,
                text
            };
        }
        return undefined;
    }
    /**
     * Parses a Setext heading (underline-style, "=== / ---").
     *
     * @param {string} mdSource - Markdown source.
     * @returns {TokenHeading | undefined} A heading token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseSetextHeading(mdSource) {
        const match = this.rules.block.lheading.exec(mdSource);
        if (match) {
            return {
                type: 'heading',
                raw: match[0],
                depth: match[2].charAt(0) === '=' ? 1 : 2,
                text: match[1],
                tokens: this.lexer.inline(match[1])
            };
        }
        return undefined;
    }
    /**
     * Parses a standard inline link or image (e.g., "[text](url)" or "![alt](src)").
     *
     * @param {string} mdSource - Inline markdown source.
     * @returns {TokenLink | TokenImage | undefined} A link/image token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseLink(mdSource) {
        const match = this.rules.inline.link.exec(mdSource);
        if (match) {
            const trimmedUrl = match[2].trim();
            if (this.options.gfm && this.rules.other.startAngleBracket.test(trimmedUrl)) {
                // commonmark requires matching angle brackets
                if (!(this.rules.other.endAngleBracket.test(trimmedUrl))) {
                    return undefined;
                }
                // ending angle bracket cannot be escaped
                const rtrimSlash = removeTrailingSpace(trimmedUrl.slice(0, -1), '\\');
                if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
                    return undefined;
                }
            }
            else {
                // find closing parenthesis
                const lastParenIndex = findClosingBracket(match[2], '()');
                if (lastParenIndex === -2) {
                    // more open parens than closed
                    return undefined;
                }
                if (lastParenIndex > -1) {
                    const start = match[0].indexOf('!') === 0 ? 5 : 4;
                    const linkLen = start + match[1].length + lastParenIndex;
                    match[2] = match[2].substring(0, lastParenIndex);
                    match[0] = match[0].substring(0, linkLen).trim();
                    match[3] = '';
                }
            }
            let href = match[2];
            let title = '';
            if (!this.options.gfm) {
                // split pedantic href and title
                const link = this.rules.other.pedanticHrefTitle.exec(href);
                if (link) {
                    href = link[1];
                    title = link[3];
                }
            }
            else {
                title = match[3] ? match[3].slice(1, -1) : '';
            }
            href = href.trim();
            if (this.rules.other.startAngleBracket.test(href)) {
                if (!this.options.gfm && !(this.rules.other.endAngleBracket.test(trimmedUrl))) {
                    // pedantic allows starting angle bracket without ending angle bracket
                    href = href.slice(1);
                }
                else {
                    href = href.slice(1, -1);
                }
            }
            return this.outputLink(match, {
                href: href ? href.replace(this.rules.inline.anyPunctuation, '$1') : href,
                title: title ? title.replace(this.rules.inline.anyPunctuation, '$1') : title
            }, match[0], this.lexer, this.rules);
        }
        return undefined;
    }
    /**
     * Parses a reference-style link or image (reflink).
     *
     * @param {string} mdSource - Inline markdown source.
     * @param {Links} links - Collected link definitions map.
     * @returns {TokenLink | TokenImage | TokenText | undefined} A link/image or fallback text token; otherwise undefined.
     * @hidden
     * @private
     */
    parseReferenceLink(mdSource, links) {
        if (!links) {
            return undefined;
        }
        let match;
        // eslint-disable-next-line no-cond-assign
        if ((match = this.rules.inline.reflink.exec(mdSource))
            // eslint-disable-next-line no-cond-assign
            || (match = this.rules.inline.nolink.exec(mdSource))) {
            const linkString = (match[2] || match[1]).replace(this.rules.other.multipleSpaceGlobal, ' ');
            const link = links[linkString.toLowerCase()];
            if (!link) {
                const text = match[0].charAt(0);
                return {
                    type: 'text',
                    raw: text,
                    text
                };
            }
            return this.outputLink(match, link, match[0], this.lexer, this.rules);
        }
        return undefined;
    }
    /**
     * Parses an angle-bracket autolink (e.g., "<https://...>", "<user@example.com>").
     *
     * @param {string} mdSource - Inline markdown source.
     * @returns {TokenLink | undefined} A link token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseAutoLink(mdSource) {
        const match = this.rules.inline.autolink.exec(mdSource);
        if (match) {
            let text;
            let href;
            if (match[2] === '@') {
                text = match[1];
                href = 'mailto:' + text;
            }
            else {
                text = match[1];
                href = text;
            }
            return {
                type: 'link',
                raw: match[0],
                text,
                href,
                tokens: [
                    {
                        type: 'text',
                        raw: text,
                        text
                    }
                ]
            };
        }
        return undefined;
    }
    /**
     * Parses a bare URL (GFM autolink) outside of an existing link.
     *
     * @param {string} mdSource - Inline markdown source.
     * @returns {TokenLink | undefined} A link token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseBareUrl(mdSource) {
        // Only GFM supports bare URL auto-linking
        if (!this.options.gfm) {
            return undefined;
        }
        // Do not autolink inside an existing link
        if (this.lexer && this.lexer.state.inLink) {
            return undefined;
        }
        let match;
        // eslint-disable-next-line no-cond-assign
        if (match = this.rules.inline.url.exec(mdSource)) {
            let text;
            let href;
            if (match[2] === '@') {
                text = match[0];
                href = 'mailto:' + text;
            }
            else {
                // do extended autolink path validation
                let prevCapZero;
                do {
                    prevCapZero = match[0];
                    match[0] = this.rules.inline._backpedal.exec(match[0]) ? this.rules.inline._backpedal.exec(match[0])[0] : '';
                } while (prevCapZero !== match[0]);
                text = match[0];
                if (match[1] === 'www.') {
                    href = 'http://' + match[0];
                }
                else {
                    href = match[0];
                }
            }
            return {
                type: 'link',
                raw: match[0],
                text,
                href,
                tokens: [
                    {
                        type: 'text',
                        raw: text,
                        text
                    }
                ]
            };
        }
        return undefined;
    }
    /**
     * Parses a reference definition line (e.g., "[id]: url 'title'").
     *
     * @param {string} mdSource - Markdown source.
     * @returns {TokenDef | undefined} A definition token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseDefinition(mdSource) {
        const match = this.rules.block.def.exec(mdSource);
        if (match) {
            const tag = match[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, ' ');
            const href = match[2] ? match[2].replace(this.rules.other.hrefBrackets, '$1').replace(this.rules.inline.anyPunctuation, '$1') : '';
            const title = match[3] ? match[3].substring(1, match[3].length - 1).replace(this.rules.inline.anyPunctuation, '$1') : match[3];
            return {
                type: 'def',
                tag,
                raw: match[0],
                href,
                title
            };
        }
        return undefined;
    }
    /**
     * Parses an inline escape (e.g., "\*").
     *
     * @param {string} mdSource - Inline markdown source.
     * @returns {TokenEscape | undefined} An escape token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseEscape(mdSource) {
        const match = this.rules.inline.escape.exec(mdSource);
        if (match) {
            return {
                type: 'escape',
                raw: match[0],
                text: match[1]
            };
        }
        return undefined;
    }
    /**
     * Parses an ordered/unordered list block.
     *
     * @param {string} mdSource - Markdown source.
     * @returns {TokenList | undefined} A list token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseList(mdSource) {
        let match = this.rules.block.list.exec(mdSource);
        if (match) {
            let bullet = match[1].trim();
            const isordered = bullet.length > 1;
            const list = {
                type: 'list',
                raw: '',
                ordered: isordered,
                start: isordered ? +bullet.slice(0, -1) : '',
                loose: false,
                items: []
            };
            bullet = isordered ? `\\d{1,9}\\${bullet.slice(-1)}` : `\\${bullet}`;
            if (!this.options.gfm) {
                bullet = isordered ? bullet : '[*+-]';
            }
            // Get next list item
            const itemRegex = this.rules.other.listItemRegex(bullet);
            let endsWithBlankLine = false;
            // Check if current bullet point can start a new List Item
            while (mdSource) {
                let endEarly = false;
                let raw = '';
                let itemContents = '';
                // eslint-disable-next-line no-cond-assign
                if (!(match = itemRegex.exec(mdSource))) {
                    break;
                }
                if (this.rules.block.hr.test(mdSource)) { // End list if bullet was actually HR (possibly move into itemRegex?)
                    break;
                }
                raw = match[0];
                mdSource = mdSource.substring(raw.length);
                let line = match[2].split('\n', 1)[0].replace(this.rules.other.listReplaceTabs, (t) => ' '.repeat(3 * t.length));
                let nextLine = mdSource.split('\n', 1)[0];
                let blankLine = !line.trim();
                let indent = 0;
                if (!this.options.gfm) {
                    indent = 2;
                    itemContents = stringTrimStart(line);
                }
                else if (blankLine) {
                    indent = match[1].length + 1;
                }
                else {
                    indent = match[2].search(this.rules.other.nonSpaceChar); // Find first non-space char
                    indent = indent > 4 ? 1 : indent; // Treat indented code blocks (> 4 spaces) as having only 1 indent
                    itemContents = line.slice(indent);
                    indent += match[1].length;
                }
                if (blankLine && this.rules.other.blankLine.test(nextLine)) { // Items begin with at most one blank line
                    raw += nextLine + '\n';
                    mdSource = mdSource.substring(nextLine.length + 1);
                    endEarly = true;
                }
                if (!endEarly) {
                    const nextBulletRegex = this.rules.other.nextBulletRegex(indent);
                    const hrRegex = this.rules.other.hrRegex(indent);
                    const fencesBeginRegex = this.rules.other.fencesBeginRegex(indent);
                    const headingBeginRegex = this.rules.other.headingBeginRegex(indent);
                    const htmlBeginRegex = this.rules.other.htmlBeginRegex(indent);
                    // Check if following lines should be included in List Item
                    while (mdSource) {
                        const rawLine = mdSource.split('\n', 1)[0];
                        let nextLineWithoutTabs;
                        nextLine = rawLine;
                        // Re-align to follow commonmark nesting rules
                        if (!this.options.gfm) {
                            nextLine = nextLine.replace(this.rules.other.listReplaceNesting, '  ');
                            nextLineWithoutTabs = nextLine;
                        }
                        else {
                            nextLineWithoutTabs = nextLine.replace(this.rules.other.tabCharGlobal, '    ');
                        }
                        // End list item if found code fences
                        if (fencesBeginRegex.test(nextLine)) {
                            break;
                        }
                        // End list item if found start of new heading
                        if (headingBeginRegex.test(nextLine)) {
                            break;
                        }
                        // End list item if found start of html block
                        if (htmlBeginRegex.test(nextLine)) {
                            break;
                        }
                        // End list item if found start of new bullet
                        if (nextBulletRegex.test(nextLine)) {
                            break;
                        }
                        // Horizontal rule found
                        if (hrRegex.test(nextLine)) {
                            break;
                        }
                        if (nextLineWithoutTabs.search(this.rules.other.nonSpaceChar) >= indent || !nextLine.trim()) { // Dedent if possible
                            itemContents += '\n' + nextLineWithoutTabs.slice(indent);
                        }
                        else {
                            // not enough indentation
                            if (blankLine) {
                                break;
                            }
                            // Treat a 4-space indented line as continuation inside a tight list item,
                            // unless it starts a known block boundary (fence/heading/hr/html).
                            if (fencesBeginRegex.test(nextLine) ||
                                headingBeginRegex.test(nextLine) ||
                                hrRegex.test(nextLine) ||
                                htmlBeginRegex.test(nextLine)) {
                                break;
                            }
                            // Continuation: keep the indented line inside the current list item
                            itemContents += '\n' + nextLine;
                        }
                        if (!blankLine && !nextLine.trim()) { // Check if current line is blank
                            blankLine = true;
                        }
                        raw += rawLine + '\n';
                        mdSource = mdSource.substring(rawLine.length + 1);
                        line = nextLineWithoutTabs.slice(indent);
                    }
                }
                if (!list.loose) {
                    // If the previous item ended with a blank line, the list is loose
                    if (endsWithBlankLine) {
                        list.loose = true;
                    }
                    else if (this.rules.other.doubleBlankLine.test(raw)) {
                        endsWithBlankLine = true;
                    }
                }
                let istask = null;
                let ischecked;
                // Check for task list items
                if (this.options.gfm) {
                    istask = this.rules.other.listIsTask.exec(itemContents);
                    if (istask) {
                        ischecked = istask[0] !== '[ ] ';
                        itemContents = itemContents.replace(this.rules.other.listReplaceTask, '');
                    }
                }
                list.items.push({
                    type: 'list_item',
                    raw,
                    task: !!istask,
                    checked: ischecked,
                    loose: false,
                    text: itemContents,
                    tokens: []
                });
                list.raw += raw;
            }
            // Do not consume newlines at end of final item. Alternatively, make itemRegex *start* with any newlines to simplify/speed up endsWithBlankLine logic
            const lastItem = arrayAt(list.items, -1);
            if (lastItem) {
                lastItem.raw = stringTrimEnd(lastItem.raw);
                lastItem.text = stringTrimEnd(lastItem.text);
            }
            else {
                // not a list since there were no items
                return undefined;
            }
            list.raw = stringTrimEnd(list.raw);
            // Item child tokens handled here at end because we needed to have the final item to trim it first
            for (let i = 0; i < list.items.length; i++) {
                this.lexer.state.top = false;
                list.items[i].tokens = this.lexer.tokenizeBlocks(list.items[i].text, []);
                if (!list.loose) {
                    // Check if list should be loose
                    const spacers = list.items[i].tokens.filter((t) => t.type === 'space');
                    const hasMultipleLineBreaks = spacers.length > 0 &&
                        spacers.some((t) => this.rules.other.anyLine.test(t.raw));
                    list.loose = hasMultipleLineBreaks;
                }
            }
            // Set all items to loose if list is loose
            if (list.loose) {
                for (let i = 0; i < list.items.length; i++) {
                    list.items[i].loose = true;
                }
            }
            return list;
        }
        return undefined;
    }
    /**
     * Parses a raw HTML block.
     *
     * @param {string} mdSource - Markdown source.
     * @returns {TokenHTML | undefined} An HTML token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseHtmlBlock(mdSource) {
        const match = this.rules.block.html.exec(mdSource);
        if (match) {
            const token = {
                type: 'html',
                block: true,
                raw: match[0],
                pre: match[1] === 'pre' || match[1] === 'script' || match[1] === 'style',
                text: match[0]
            };
            return token;
        }
        return undefined;
    }
    /**
     * Parses an inline HTML tag and updates inLink/inRawBlock state.
     *
     * @param {string} mdSource - Inline markdown source.
     * @returns {TokenTag | undefined} An HTML tag token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseHtmlTag(mdSource) {
        const match = this.rules.inline.tag.exec(mdSource);
        if (match) {
            if (!this.lexer.state.inLink && this.rules.other.startATag.test(match[0])) {
                this.lexer.state.inLink = true;
            }
            else if (this.lexer.state.inLink && this.rules.other.endATag.test(match[0])) {
                this.lexer.state.inLink = false;
            }
            if (!this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(match[0])) {
                this.lexer.state.inRawBlock = true;
            }
            else if (this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(match[0])) {
                this.lexer.state.inRawBlock = false;
            }
            return {
                type: 'html',
                raw: match[0],
                inLink: this.lexer.state.inLink,
                inRawBlock: this.lexer.state.inRawBlock,
                block: false,
                text: match[0]
            };
        }
        return undefined;
    }
    /**
     * Parses a GFM table.
     *
     * @param {string} mdSource - Markdown source.
     * @returns {TokenTable | undefined} A table token when matched; otherwise undefined.
     * @hidden
     * @private
     */
    parseTable(mdSource) {
        const match = this.rules.block.table.exec(mdSource);
        if (!match) {
            return undefined;
        }
        if (!this.rules.other.tableDelimiter.test(match[2])) {
            // delimiter row must have a pipe (|) or colon (:) otherwise it is a setext heading
            return undefined;
        }
        const headers = splitCells(match[1]);
        const aligns = match[2].replace(this.rules.other.tableAlignChars, '').split('|');
        const rows = match[3] && match[3].trim() ? match[3].replace(this.rules.other.tableRowBlankLine, '').split('\n') : [];
        const item = {
            type: 'table',
            raw: match[0],
            header: [],
            align: [],
            rows: []
        };
        if (headers.length !== aligns.length) {
            // header and align columns must be equal, rows can be different.
            return undefined;
        }
        for (const align of aligns) {
            if (this.rules.other.tableAlignRight.test(align)) {
                item.align.push('right');
            }
            else if (this.rules.other.tableAlignCenter.test(align)) {
                item.align.push('center');
            }
            else if (this.rules.other.tableAlignLeft.test(align)) {
                item.align.push('left');
            }
            else {
                item.align.push(null);
            }
        }
        for (let i = 0; i < headers.length; i++) {
            item.header.push({
                text: headers[i],
                tokens: this.lexer.inline(headers[i]),
                header: true,
                align: item.align[i]
            });
        }
        for (const row of rows) {
            item.rows.push(splitCells(row, item.header.length).map((cell, i) => {
                return {
                    text: cell,
                    tokens: this.lexer.inline(cell),
                    header: false,
                    align: item.align[i]
                };
            }));
        }
        return item;
    }
}

/**
 * Block Lexer
 */
class Lexer {
    constructor(options) {
        this.rules = {
            other: other,
            block: block.normal,
            inline: inline.normal
        };
        // TokenList cannot be created in one go
        this.tokens = [];
        this.tokens.links = Object.create(null);
        this.options = options || getDefaults();
        this.tokenizer = new Tokenizer();
        this.tokenizer.options = this.options;
        this.tokenizer.lexer = this;
        this.inlineQueue = [];
        this.state = {
            inLink: false,
            inRawBlock: false,
            top: true
        };
        const rules = {
            other,
            block: block.normal,
            inline: inline.normal
        };
        if (this.options.gfm) {
            rules.block = block.gfm;
            rules.inline = this.options.lineBreak ? inline.breaks : inline.gfm;
        }
        else {
            rules.block = block.pedantic;
            rules.inline = inline.pedantic;
        }
        this.tokenizer.rules = rules;
    }
    /**
     * Tokenizes the full markdown source into a top-level token list.
     *
     * @param {string} src - Markdown source text.
     * @param {MarkdownConverterOptions} [options] - Optional options overriding defaults.
     * @returns {TokensList} A list of tokens representing block structure.
     * @hidden
     * @private
     */
    static lex(src, options) {
        const lexer = new Lexer(options);
        return lexer.lex(src);
    }
    /**
     * Tokenizes the full markdown source and resolves any deferred inline queues.
     *
     * @param {string} mdSource - Markdown source text.
     * @returns {TokensList} Finalized top-level token list.
     * @hidden
     * @private
     */
    lex(mdSource) {
        mdSource = mdSource.replace(other.carriageReturn, '\n');
        this.tokens = [];
        this.tokens.links = Object.create(null);
        this.tokenizeBlocks(mdSource, this.tokens);
        for (let i = 0; i < this.inlineQueue.length; i++) {
            const next = this.inlineQueue[i];
            this.tokenizeInline(next.src, next.tokens);
        }
        this.inlineQueue = [];
        return this.tokens;
    }
    /**
     * Tokenizes block-level constructs from the source into the provided collection.
     *
     * @param {string} mdSource - Markdown source.
     * @param {Token[] | TokensList} [tokens] - Target collection for tokens.
     * @param {boolean} [lastParagraphClipped] - Internal paragraph merge hint.
     * @returns {Token[] | TokensList} The updated token collection.
     * @hidden
     * @private
     */
    tokenizeBlocks(mdSource, tokens, lastParagraphClipped) {
        if (!this.options.gfm) {
            mdSource = mdSource.replace(other.tabCharGlobal, '    ').replace(other.spaceLine, '');
        }
        while (mdSource) {
            const spaceToken = this.tokenizer.parseSpace(mdSource);
            if (spaceToken) {
                mdSource = mdSource.substring(spaceToken.raw.length);
                const lastToken = arrayAt(tokens, -1);
                if (spaceToken.raw.length === 1 && lastToken !== undefined) {
                    // if there's a single \n as a spacer, it's terminating the last line,
                    // so move it there so that we don't get unnecessary paragraph tags
                    lastToken.raw += '\n';
                }
                else {
                    tokens.push(spaceToken);
                }
                continue;
            }
            // heading
            const headingToken = this.tokenizer.parseAtxHeading(mdSource);
            if (headingToken) {
                mdSource = mdSource.substring(headingToken.raw.length);
                tokens.push(headingToken);
                continue;
            }
            // hr
            const hrToken = this.tokenizer.ParseHorizontalRule(mdSource);
            if (hrToken) {
                mdSource = mdSource.substring(hrToken.raw.length);
                tokens.push(hrToken);
                continue;
            }
            // code
            const codeToken = this.tokenizer.parseIndentedCode(mdSource);
            if (codeToken) {
                mdSource = mdSource.substring(codeToken.raw.length);
                const lastToken = arrayAt(tokens, -1);
                // An indented code block cannot interrupt a paragraph.
                if (lastToken && (lastToken.type === 'paragraph' || lastToken.type === 'text') && ('text' in lastToken)) {
                    lastToken.raw += '\n' + codeToken.raw;
                    lastToken.text += '\n' + codeToken.text;
                    arrayAt(this.inlineQueue, -1).src = lastToken.text;
                }
                else {
                    tokens.push(codeToken);
                }
                continue;
            }
            // fences
            const fenceToken = this.tokenizer.parseFencedCode(mdSource);
            if (fenceToken) {
                mdSource = mdSource.substring(fenceToken.raw.length);
                tokens.push(fenceToken);
                continue;
            }
            // blockquote
            const blockquoteToken = this.tokenizer.parseBlockquote(mdSource);
            if (blockquoteToken) {
                mdSource = mdSource.substring(blockquoteToken.raw.length);
                tokens.push(blockquoteToken);
                continue;
            }
            // lheading
            const levelHeadingToken = this.tokenizer.parseSetextHeading(mdSource);
            if (levelHeadingToken) {
                mdSource = mdSource.substring(levelHeadingToken.raw.length);
                tokens.push(levelHeadingToken);
                continue;
            }
            // def
            const defToken = this.tokenizer.parseDefinition(mdSource);
            if (defToken) {
                mdSource = mdSource.substring(defToken.raw.length);
                const lastToken = arrayAt(tokens, -1);
                if (lastToken && (lastToken.type === 'paragraph' || lastToken.type === 'text') && ('text' in lastToken)) {
                    lastToken.raw += '\n' + defToken.raw;
                    lastToken.text += '\n' + defToken.raw;
                    arrayAt(this.inlineQueue, -1).src = lastToken.text;
                }
                else if (!this.tokens.links[defToken.tag]) {
                    this.tokens.links[defToken.tag] = {
                        href: defToken.href,
                        title: defToken.title
                    };
                }
                continue;
            }
            // list
            const listToken = this.tokenizer.parseList(mdSource);
            if (listToken) {
                mdSource = mdSource.substring(listToken.raw.length);
                tokens.push(listToken);
                continue;
            }
            // html
            const htmlToken = this.tokenizer.parseHtmlBlock(mdSource);
            if (htmlToken) {
                mdSource = mdSource.substring(htmlToken.raw.length);
                tokens.push(htmlToken);
                continue;
            }
            // table (gfm)
            const tableToken = this.tokenizer.parseTable(mdSource);
            if (tableToken) {
                mdSource = mdSource.substring(tableToken.raw.length);
                tokens.push(tableToken);
                continue;
            }
            if (this.state.top) {
                const paragraphToken = this.tokenizer.parseParagraph(mdSource);
                if (paragraphToken) {
                    const lastToken = arrayAt(tokens, -1);
                    if (lastParagraphClipped && lastToken && lastToken.type === 'paragraph' && ('text' in lastToken)) {
                        lastToken.raw += '\n' + paragraphToken.raw;
                        lastToken.text += '\n' + paragraphToken.text;
                        this.inlineQueue.pop();
                        arrayAt(this.inlineQueue, -1).mdSource = lastToken.text;
                    }
                    else {
                        tokens.push(paragraphToken);
                    }
                    lastParagraphClipped = mdSource.length !== mdSource.length;
                    mdSource = mdSource.substring(paragraphToken.raw.length);
                    continue;
                }
            }
            // text
            const textToken = this.tokenizer.parseText(mdSource);
            if (textToken) {
                mdSource = mdSource.substring(textToken.raw.length);
                const lastToken = arrayAt(tokens, -1);
                if (lastToken && lastToken.type === 'text' && ('text' in lastToken)) {
                    lastToken.raw += '\n' + textToken.raw;
                    lastToken.text += '\n' + textToken.text;
                    this.inlineQueue.pop();
                    arrayAt(this.inlineQueue, -1).src = lastToken.text;
                }
                else {
                    tokens.push(textToken);
                }
                continue;
            }
            if (mdSource) {
                const errMsg = 'Infinite loop on byte: ' + mdSource.charCodeAt(0);
                if (this.options.silent) {
                    console.error(errMsg);
                    break;
                }
                else {
                    throw new Error(errMsg);
                }
            }
        }
        this.state.top = true;
        return tokens;
    }
    /**
     * Schedules inline tokenization for chained contexts (e.g., headings, paragraphs).
     *
     * @param {string} src - Inline source text to queue.
     * @param {Token[]} [tokens=[]] - Token array to receive inline tokens.
     * @returns {Token[]} The queued token collection.
     * @hidden
     * @private
     */
    inline(src, tokens = []) {
        this.inlineQueue.push({ src, tokens });
        return tokens;
    }
    /**
     * Tokenizes inline constructs from the provided inline source.
     *
     * @param {string} mdSource - Inline markdown source.
     * @param {Token[]} [tokens=[]] - Target inline token array.
     * @returns {Token[]} The updated inline token array.
     * @hidden
     * @private
     */
    tokenizeInline(mdSource, tokens = []) {
        // String with links masked to avoid interference with em and strong
        let maskedSrc = mdSource;
        let match = null;
        // Mask out reflinks
        if (this.tokens.links) {
            const links = Object.keys(this.tokens.links);
            if (links.length > 0) {
                let reflinkMatch = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc);
                while (reflinkMatch != null) {
                    if (links.indexOf(reflinkMatch[0].slice(reflinkMatch[0].lastIndexOf('[') + 1, -1)) !== -1) {
                        maskedSrc = maskedSrc.slice(0, reflinkMatch.index)
                            + '[' + 'a'.repeat(reflinkMatch[0].length - 2) + ']'
                            + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
                    }
                    reflinkMatch = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc);
                }
            }
        }
        // Mask out escaped characters
        match = this.tokenizer.rules.inline.anyPunctuation.exec(maskedSrc);
        while (match != null) {
            maskedSrc = maskedSrc.slice(0, match.index) + '++' + maskedSrc.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
            match = this.tokenizer.rules.inline.anyPunctuation.exec(maskedSrc);
        }
        // Mask out other blocks
        match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc);
        while (match != null) {
            maskedSrc = maskedSrc.slice(0, match.index) + '[' + 'a'.repeat(match[0].length - 2) + ']' + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
            match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc);
        }
        let keepPrevChar = false;
        let prevChar = '';
        while (mdSource) {
            if (!keepPrevChar) {
                prevChar = '';
            }
            keepPrevChar = false;
            // em & strong
            const boldToken = this.tokenizer.parseEmphasisOrStrong(mdSource, maskedSrc, prevChar);
            if (boldToken) {
                mdSource = mdSource.substring(boldToken.raw.length);
                tokens.push(boldToken);
                continue;
            }
            // del (gfm)
            const delToken = this.tokenizer.parseStrikethrough(mdSource);
            if (delToken) {
                mdSource = mdSource.substring(delToken.raw.length);
                tokens.push(delToken);
                continue;
            }
            // br
            const brToken = this.tokenizer.parseBreak(mdSource);
            if (brToken) {
                mdSource = mdSource.substring(brToken.raw.length);
                tokens.push(brToken);
                continue;
            }
            // code
            const codeToken = this.tokenizer.parseCodespan(mdSource);
            if (codeToken) {
                mdSource = mdSource.substring(codeToken.raw.length);
                tokens.push(codeToken);
                continue;
            }
            // link
            const linkToken = this.tokenizer.parseLink(mdSource);
            if (linkToken) {
                mdSource = mdSource.substring(linkToken.raw.length);
                tokens.push(linkToken);
                continue;
            }
            // reflink, nolink
            const refLinkToken = this.tokenizer.
                parseReferenceLink(mdSource, this.tokens.links);
            if (refLinkToken) {
                mdSource = mdSource.substring(refLinkToken.raw.length);
                const lastToken = arrayAt(tokens, -1);
                if (refLinkToken.type === 'text' && lastToken && lastToken.type === 'text' && ('text' in lastToken)) {
                    lastToken.raw += refLinkToken.raw;
                    lastToken.text += refLinkToken.text;
                }
                else {
                    tokens.push(refLinkToken);
                }
                continue;
            }
            // autolink
            const autoLinkToken = this.tokenizer.parseAutoLink(mdSource);
            if (autoLinkToken) {
                mdSource = mdSource.substring(autoLinkToken.raw.length);
                tokens.push(autoLinkToken);
                continue;
            }
            // url (gfm)
            const urlToken = this.tokenizer.parseBareUrl(mdSource);
            if (!this.state.inLink && urlToken) {
                mdSource = mdSource.substring(urlToken.raw.length);
                tokens.push(urlToken);
                continue;
            }
            // escape
            const escapeToken = this.tokenizer.parseEscape(mdSource);
            if (escapeToken) {
                mdSource = mdSource.substring(escapeToken.raw.length);
                tokens.push(escapeToken);
                continue;
            }
            // tag
            const tagToken = this.tokenizer.parseHtmlTag(mdSource);
            if (tagToken) {
                mdSource = mdSource.substring(tagToken.raw.length);
                tokens.push(tagToken);
                continue;
            }
            // text
            // prevent inlineText consuming extensions by clipping 'src' to extension start
            const inlineTextToken = this.tokenizer.parseInlineText(mdSource);
            if (inlineTextToken) {
                mdSource = mdSource.substring(inlineTextToken.raw.length);
                if (inlineTextToken.raw.slice(-1) !== '_') { // Track prevChar before string of ____ started
                    prevChar = inlineTextToken.raw.slice(-1);
                }
                keepPrevChar = true;
                const lastToken = arrayAt(tokens, -1);
                if (lastToken && lastToken.type === 'text' && ('text' in lastToken)) {
                    lastToken.raw += inlineTextToken.raw;
                    lastToken.text += inlineTextToken.text;
                }
                else {
                    tokens.push(inlineTextToken);
                }
                continue;
            }
        }
        return tokens;
    }
}

class Renderer {
    constructor(parser, options) {
        this.rules = {
            other: other,
            block: block.normal,
            inline: inline.normal
        };
        this.parser = parser || undefined;
        this.options = options || getDefaults();
        this.rules = { other, block: block.normal, inline: inline.normal };
    }
    /**
     * Renders whitespace (no output).
     *
     * @param {TokenSpace} token - Space token.
     * @returns {string} An empty string.
     * @hidden
     * @private
     */
    renderSpace(token) {
        return '';
    }
    /**
     * Renders a heading element (<h1>.. <h6>).
     *
     * @param {TokenHeading} token - Heading token with tokens/depth.
     * @returns {string} Rendered HTML heading.
     * @hidden
     * @private
     */
    renderHeading({ tokens, depth }) {
        return `<h${depth}>${this.parser.parseInline(tokens)}</h${depth}>\n`;
    }
    /**
     * Renders a paragraph.
     *
     * @param {TokenParagraph} token - Paragraph token with child tokens.
     * @returns {string} Rendered HTML paragraph.
     * @hidden
     * @private
     */
    renderParagraph({ tokens }) {
        return `<p>${this.parser.parseInline(tokens)}</p>\n`;
    }
    /**
     * Renders plain or escaped inline text.
     *
     * @param {TokenText | TokenEscape} token - Text or escape token.
     * @returns {string} Rendered text HTML.
     * @hidden
     * @private
     */
    renderText(token) {
        return 'tokens' in token && token.tokens
            ? this.parser.parseInline(token.tokens)
            : ('escaped' in token && token.escaped ? token.text : escape$1(token.text));
    }
    /**
     * Renders bold (strong) inline content.
     *
     * @param {TokenStrong} token - Strong token with child tokens.
     * @returns {string} Rendered HTML strong element.
     * @hidden
     * @private
     */
    renderStrong({ tokens }) {
        return `<strong>${this.parser.parseInline(tokens)}</strong>`;
    }
    /**
     * Renders emphasis (em) inline content.
     *
     * @param {TokenEm} token - Em token with child tokens.
     * @returns {string} Rendered HTML em element.
     * @hidden
     * @private
     */
    renderEm({ tokens }) {
        return `<em>${this.parser.parseInline(tokens)}</em>`;
    }
    /**
     * Renders strikethrough (del) inline content.
     *
     * @param {TokenDel} token - Del token with child tokens.
     * @returns {string} Rendered HTML del element.
     * @hidden
     * @private
     */
    renderStrikethrough({ tokens }) {
        return `<del>${this.parser.parseInline(tokens)}</del>`;
    }
    /**
     * Renders a horizontal rule.
     *
     * @param {TokenHr} token - HR token.
     * @returns {string} Rendered <hr> element.
     * @hidden
     * @private
     */
    renderHorizontalRule(token) {
        return '<hr>\n';
    }
    /**
     * Renders a hard line break.
     *
     * @param {TokenBr} token - Break token.
     * @returns {string} Rendered <br> element.
     * @hidden
     * @private
     */
    renderHardBreak(token) {
        return '<br>';
    }
    /**
     * Renders a fenced or indented code block.
     *
     * @param {TokenCode} token - Code token with text/lang info.
     * @returns {string} Rendered HTML code block.
     * @hidden
     * @private
     */
    renderCodeBlock({ text, lang, escaped }) {
        const langString = (lang || '').match(other.notSpaceStart) ? (lang || '').match(other.notSpaceStart)[0] : undefined;
        const code = text.replace(other.endingNewline, '') + '\n';
        if (!langString) {
            return '<pre><code>'
                + (escaped ? code : escape$1(code, true))
                + '</code></pre>\n';
        }
        return '<pre><code class="language-'
            + escape$1(langString)
            + '">'
            + (escaped ? code : escape$1(code, true))
            + '</code></pre>\n';
    }
    /**
     * Renders an inline code span.
     *
     * @param {TokenCodespan} token - Code span token.
     * @returns {string} Rendered HTML code element.
     * @hidden
     * @private
     */
    renderCodeSpan({ text }) {
        return `<code>${escape$1(text, true)}</code>`;
    }
    /**
     * Renders a blockquote element with child tokens.
     *
     * @param {TokenBlockquote} token - Blockquote token.
     * @returns {string} Rendered HTML blockquote.
     * @hidden
     * @private
     */
    renderBlockquote({ tokens }) {
        const body = this.parser.parseBlocks(tokens);
        return `<blockquote>\n${body}</blockquote>\n`;
    }
    /**
     * Renders an anchor tag with inline content.
     *
     * @param {TokenLink} token - Link token with href/title/tokens.
     * @returns {string} Rendered anchor element or raw text for unsafe URL.
     * @hidden
     * @private
     */
    renderLink({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        const cleanHref = cleanUrl(href);
        if (cleanHref === null) {
            return text;
        }
        href = cleanHref;
        let out = '<a href="' + href + '"';
        if (title) {
            out += ' title="' + (escape$1(title)) + '"';
        }
        out += '>' + text + '</a>';
        return out;
    }
    /**
     * Renders an image tag.
     *
     * @param {TokenImage} token - Image token with href/title/alt.
     * @returns {string} Rendered image element or escaped alt text for unsafe URL.
     * @hidden
     * @private
     */
    renderImage({ href, title, text, tokens }) {
        if (tokens) {
            text = this.parser.parseInline(tokens);
        }
        const cleanHref = cleanUrl(href);
        if (cleanHref === null) {
            return escape$1(text);
        }
        href = cleanHref;
        let out = `<img src="${href}" alt="${text}"`;
        if (title) {
            out += ` title="${escape$1(title)}"`;
        }
        out += '>';
        return out;
    }
    /**
     * Renders an ordered/unordered list with list items.
     *
     * @param {TokenList} token - List token containing list items.
     * @returns {string} Rendered HTML list.
     * @hidden
     * @private
     */
    renderList(token) {
        const ordered = token.ordered;
        const start = token.start;
        let body = '';
        for (let j = 0; j < token.items.length; j++) {
            const item = token.items[j];
            body += this.renderListItem(item);
        }
        const type = ordered ? 'ol' : 'ul';
        const startAttr = (ordered && start !== 1) ? (' start="' + start + '"') : '';
        return '<' + type + startAttr + '>\n' + body + '</' + type + '>\n';
    }
    /**
     * Renders a single list item, including task list checkbox output.
     *
     * @param {TokenListItem} item - List item token with child tokens.
     * @returns {string} Rendered list item HTML.
     * @hidden
     * @private
     */
    renderListItem(item) {
        let itemBody = '';
        if (item.task) {
            const checkbox = this.renderCheckbox({ checked: !!item.checked });
            if (item.loose) {
                if (item.tokens[0] && item.tokens[0].type === 'paragraph') {
                    item.tokens[0].text = checkbox + ' ' + item.tokens[0].text;
                    if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === 'text') {
                        item.tokens[0].tokens[0].text = checkbox + ' ' + escape$1(item.tokens[0].tokens[0].text);
                        item.tokens[0].tokens[0].escaped = true;
                    }
                }
                else {
                    item.tokens.unshift({
                        type: 'text',
                        raw: checkbox + ' ',
                        text: checkbox + ' ',
                        escaped: true
                    });
                }
            }
            else {
                itemBody += checkbox + ' ';
            }
        }
        itemBody += this.parser.parseBlocks(item.tokens, !!item.loose);
        return `<li>${itemBody}</li>\n`;
    }
    /**
     * Renders a disabled checkbox for task list items.
     *
     * @param {TokenCheckbox} token - Checkbox state (checked/unchecked).
     * @returns {string} Rendered input checkbox element.
     * @hidden
     * @private
     */
    renderCheckbox({ checked }) {
        return '<input '
            + (checked ? 'checked="" ' : '')
            + 'disabled="" type="checkbox">';
    }
    /**
     * Renders raw HTML (passthrough).
     *
     * @param {TokenHTML | TokenTag} token - Raw HTML token.
     * @returns {string} Raw HTML content.
     * @hidden
     * @private
     */
    renderHtml({ text }) {
        return text;
    }
    /**
     * Renders a GFM table.
     *
     * @param {TokenTable} token - Table token.
     * @returns {string} Rendered HTML table.
     * @hidden
     * @private
     */
    renderTable(token) {
        let header = '';
        // header
        let cell = '';
        for (let j = 0; j < token.header.length; j++) {
            cell += this.renderTableCell(token.header[j]);
        }
        header += this.renderTableRow({ text: cell });
        let body = '';
        for (let j = 0; j < token.rows.length; j++) {
            const row = token.rows[j];
            cell = '';
            for (let k = 0; k < row.length; k++) {
                cell += this.renderTableCell(row[k]);
            }
            body += this.renderTableRow({ text: cell });
        }
        if (body) {
            body = `<tbody>${body}</tbody>`;
        }
        return '<table>\n'
            + '<thead>\n'
            + header
            + '</thead>\n'
            + body
            + '</table>\n';
    }
    /**
     * Renders a table row.
     *
     * @param {TokenTableRow} token - Table row token.
     * @returns {string} Rendered HTML row.
     * @hidden
     * @private
     */
    renderTableRow({ text }) {
        return `<tr>\n${text}</tr>\n`;
    }
    /**
     * Renders a table cell (th/td).
     *
     * @param {TokenTableCell} token - Table cell token with alignment and inline tokens.
     * @returns {string} Rendered HTML table cell.
     * @hidden
     * @private
     */
    renderTableCell(token) {
        const content = this.parser.parseInline(token.tokens);
        const type = token.header ? 'th' : 'td';
        const tag = token.align
            ? `<${type} align="${token.align}">`
            : `<${type}>`;
        return tag + content + `</${type}>\n`;
    }
}

class Parser {
    constructor(options, renderer) {
        this.renderer = renderer || new Renderer(); // Initialize Renderer instance
        this.options = options || getDefaults();
        this.renderer.options = this.options;
        this.renderer.parser = this;
    }
    /**
     * Static Parse Method
     *
     * @param {Token[]} tokens - Array of tokens
     * @param {MarkdownConverterOptions} options - Parsing options
     * @returns {string} Parsed HTML
     * @hidden
     * @private
     */
    static parse(tokens, options) {
        const parser = new Parser(options);
        return parser.parseBlocks(tokens);
    }
    /**
     * Parses a top-level token list (blocks) to HTML.
     *
     * @param {Token[]} tokens - Array of block tokens.
     * @param {boolean} [top=true] - Indicates top-level rendering (paragraph wrapping of text blocks).
     * @returns {string} Parsed HTML string.
     * @hidden
     * @private
     */
    parseBlocks(tokens, top = true) {
        let out = '';
        for (let i = 0; i < tokens.length; i++) {
            const anyToken = tokens[i];
            const token = anyToken;
            switch (token.type) {
                case 'space': {
                    out += this.renderer.renderSpace(token);
                    continue;
                }
                case 'heading': {
                    out += this.renderer.renderHeading(token);
                    continue;
                }
                case 'paragraph': {
                    out += this.renderer.renderParagraph(token);
                    continue;
                }
                case 'hr': {
                    out += this.renderer.renderHorizontalRule(token);
                    continue;
                }
                case 'code': {
                    out += this.renderer.renderCodeBlock(token);
                    continue;
                }
                case 'blockquote': {
                    out += this.renderer.renderBlockquote(token);
                    continue;
                }
                case 'list': {
                    out += this.renderer.renderList(token);
                    continue;
                }
                case 'html': {
                    out += this.renderer.renderHtml(token);
                    continue;
                }
                case 'table': {
                    out += this.renderer.renderTable(token);
                    continue;
                }
                case 'text': {
                    let textToken = token;
                    let body = this.renderer.renderText(textToken);
                    while (i + 1 < tokens.length && tokens[i + 1].type === 'text') {
                        textToken = tokens[++i];
                        body += '\n' + this.renderer.renderText(textToken);
                    }
                    if (top) {
                        out += this.renderer.renderParagraph({
                            type: 'paragraph',
                            raw: body,
                            text: body,
                            tokens: [{ type: 'text', raw: body, text: body, escaped: true }]
                        });
                    }
                    else {
                        out += body;
                    }
                    continue;
                }
            }
        }
        return out;
    }
    /**
     * Parses inline tokens to HTML using the provided or default renderer.
     *
     * @param {Token[]} tokens - Array of inline tokens.
     * @param {Renderer} [renderer=this.renderer] - Renderer used to render inline nodes.
     * @returns {string} Parsed inline HTML string.
     * @hidden
     * @private
     */
    parseInline(tokens, renderer = this.renderer) {
        let out = '';
        for (let i = 0; i < tokens.length; i++) {
            const anyToken = tokens[i];
            const token = anyToken;
            switch (token.type) {
                case 'escape': {
                    out += renderer.renderText(token);
                    break;
                }
                case 'text': {
                    out += renderer.renderText(token);
                    break;
                }
                case 'strong': {
                    out += renderer.renderStrong(token);
                    break;
                }
                case 'em': {
                    out += renderer.renderEm(token);
                    break;
                }
                case 'del': {
                    out += renderer.renderStrikethrough(token);
                    break;
                }
                case 'br': {
                    out += renderer.renderHardBreak(token);
                    break;
                }
                case 'codespan': {
                    out += renderer.renderCodeSpan(token);
                    break;
                }
                case 'link': {
                    out += this.renderer.renderLink(token);
                    break;
                }
                case 'image': {
                    out += this.renderer.renderImage(token);
                    break;
                }
                case 'html': {
                    out += renderer.renderHtml(token);
                    break;
                }
            }
        }
        return out;
    }
}

/**
 * @class MarkdownConverterPlugin
 * @private
 * @hidden
 *
 * A class for parsing Markdown content and converting it into HTML.
 * This class provides methods to handle Markdown syntax and generate
 * corresponding HTML output.
 *
 */
class MarkdownConverterPlugin {
    /**
     * Creates a new MarkdownConverter instance.
     *
     * @param {MarkdownConverterOptions} [options] - Component model passed to the base Component.
     */
    constructor(options) {
        this.defaults = getDefaults();
        this.lexerInstance = new Lexer(this.defaults);
        this.rendererInst = new Renderer();
        this.options = this.setOptions(options);
    }
    /**
     * Parse markdown with full lifecycle support.
     * Handles both sync and async markdown-to-HTML conversion.
     *
     * @private
     * @param {string} src - Markdown source to parse
     * @param {MarkdownConverterOptions} [options] - Override options for this parse call
     * @returns {string | Promise<string>} HTML output (string if sync, Promise<string> if async)
     */
    parseMarkdown(src, options) {
        // Merge options: defaults → instance options → override options
        const origOpt = Object.assign({}, options);
        const opt = Object.assign({}, this.defaults, this.options, origOpt);
        const throwError = this.onError(!!opt.silent, !!opt.async);
        // Validate input parameter
        if (typeof src === 'undefined' || src === null) {
            return throwError(new Error('input parameter is undefined or null'));
        }
        if (typeof src !== 'string') {
            return throwError(new Error('input parameter is of type ' +
                Object.prototype.toString.call(src) +
                ', string expected'));
        }
        // Select lexer and parser based on blockType
        const lexer = Lexer.lex;
        const parser = Parser.parse;
        // Async pipeline
        if (opt.async) {
            return Promise.resolve(src)
                .then((preSrc) => lexer(preSrc, opt))
                .then((tokens) => parser(tokens, opt))
                .catch(throwError);
        }
        // Sync pipeline
        try {
            const tokens = lexer(src, opt);
            const html = parser(tokens, opt);
            return html;
        }
        catch (e) {
            return throwError(e);
        }
    }
    /**
     * Converts a markdown string to HTML using the instance’s current options.
     *
     * @param {string} markdownContent - Markdown source text.
     * @returns {string | Promise<string>} HTML string or a Promise resolving to HTML in async mode.
     * @hidden
     * @private
     */
    convertMarkdownToHtml(markdownContent) {
        const html = this.parseMarkdown(markdownContent, this.options);
        return html;
    }
    /**
     * Merges incoming options into the instance defaults and rebuilds the pipeline.
     *
     * @private
     * @param {MarkdownConverterOptions} incomingOptions - Options to merge into current defaults.
     * @returns {this} The MarkdownConverter instance for chaining.
     */
    setOptions(incomingOptions) {
        const previousOptions = this.defaults;
        const mergedOptions = Object.assign({}, previousOptions, incomingOptions);
        this.defaults = mergedOptions;
        this.rebindPipeline();
        return this.defaults;
    }
    /**
     * Creates an error handler that throws, rejects, or returns a formatted HTML error
     * depending on the 'silent' and 'async' flags.
     *
     * @param {boolean} silent - When true, returns an HTML error message instead of throwing.
     * @param {boolean} async - When true, returns Promises instead of synchronous values.
     * @returns {function(Error): (string|Promise.<string>)} Error handler function.
     * @private
     */
    onError(silent, async) {
        return (e) => {
            if (silent) {
                const msg = '<p>An error occurred:</p><pre>'
                    + escape$1(e.message + '', true)
                    + '</pre>';
                if (async) {
                    return Promise.resolve(msg);
                }
                return msg;
            }
            if (async) {
                return Promise.reject(e);
            }
            throw e;
        };
    }
    /**
     * Rebinds renderer and parser instances based on the current option set.
     *
     * @private
     * @returns {void}
     */
    rebindPipeline() {
        const activeOptions = (this.options);
        // Renderer: use options.renderer if provided; otherwise create a default one
        this.rendererInst = new Renderer();
        // Parser: re-instantiate with latest options + renderer (even if you use static Parser.parse)
        this.parserInstance = new Parser(activeOptions, this.rendererInst);
        this.lexerInstance = new Lexer(activeOptions);
    }
    /**
     * Disposes resources associated with this instance and invokes the base destroy.
     *
     * @hidden
     * @private
     * @returns {void}
     */
    destroy() {
        this.lexerInstance = undefined;
        this.rendererInst = undefined;
        this.parserInstance = undefined;
    }
}
/**
 * Provides utilities for converting Markdown content to HTML.
 *
 * @namespace MarkdownConverter
 *
 * This namespace contains methods related to Markdown-to-HTML conversion.
 * It internally uses the `MarkdownConverter` class to perform the conversion.
 */
// eslint-disable-next-line
var MarkdownConverter;
(function (MarkdownConverter) {
    /**
     * Converts Markdown content to HTML.
     *
     * @param {string} markdownContent - Markdown source text.
     * @param {MarkdownConverterOptions} options - Optional configuration for the Markdown conversion process.
     * @returns {string | Promise<string>} HTML string or a Promise resolving to HTML in async mode.
     */
    function toHtml(markdownContent, options) {
        const converter = new MarkdownConverterPlugin(options);
        const htmlContent = converter.convertMarkdownToHtml(markdownContent);
        converter.destroy();
        return htmlContent;
    }
    MarkdownConverter.toHtml = toHtml;
})(MarkdownConverter || (MarkdownConverter = {}));

export { MarkdownConverter };
//# sourceMappingURL=ej2-markdown-converter.es2015.js.map
