"use strict";(self.webpackChunkcollab_notes=self.webpackChunkcollab_notes||[]).push([[1960],{1960:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "conf": () => (/* binding */ conf),\n/* harmony export */   "language": () => (/* binding */ language)\n/* harmony export */ });\n/*!-----------------------------------------------------------------------------\n * Copyright (c) Microsoft Corporation. All rights reserved.\n * Version: 0.31.1(337587859b1c171314b40503171188b6cea6a32a)\n * Released under the MIT license\n * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt\n *-----------------------------------------------------------------------------*/\n\n// src/basic-languages/cpp/cpp.ts\nvar conf = {\n  comments: {\n    lineComment: "//",\n    blockComment: ["/*", "*/"]\n  },\n  brackets: [\n    ["{", "}"],\n    ["[", "]"],\n    ["(", ")"]\n  ],\n  autoClosingPairs: [\n    { open: "[", close: "]" },\n    { open: "{", close: "}" },\n    { open: "(", close: ")" },\n    { open: "\'", close: "\'", notIn: ["string", "comment"] },\n    { open: \'"\', close: \'"\', notIn: ["string"] }\n  ],\n  surroundingPairs: [\n    { open: "{", close: "}" },\n    { open: "[", close: "]" },\n    { open: "(", close: ")" },\n    { open: \'"\', close: \'"\' },\n    { open: "\'", close: "\'" }\n  ],\n  folding: {\n    markers: {\n      start: new RegExp("^\\\\s*#pragma\\\\s+region\\\\b"),\n      end: new RegExp("^\\\\s*#pragma\\\\s+endregion\\\\b")\n    }\n  }\n};\nvar language = {\n  defaultToken: "",\n  tokenPostfix: ".cpp",\n  brackets: [\n    { token: "delimiter.curly", open: "{", close: "}" },\n    { token: "delimiter.parenthesis", open: "(", close: ")" },\n    { token: "delimiter.square", open: "[", close: "]" },\n    { token: "delimiter.angle", open: "<", close: ">" }\n  ],\n  keywords: [\n    "abstract",\n    "amp",\n    "array",\n    "auto",\n    "bool",\n    "break",\n    "case",\n    "catch",\n    "char",\n    "class",\n    "const",\n    "constexpr",\n    "const_cast",\n    "continue",\n    "cpu",\n    "decltype",\n    "default",\n    "delegate",\n    "delete",\n    "do",\n    "double",\n    "dynamic_cast",\n    "each",\n    "else",\n    "enum",\n    "event",\n    "explicit",\n    "export",\n    "extern",\n    "false",\n    "final",\n    "finally",\n    "float",\n    "for",\n    "friend",\n    "gcnew",\n    "generic",\n    "goto",\n    "if",\n    "in",\n    "initonly",\n    "inline",\n    "int",\n    "interface",\n    "interior_ptr",\n    "internal",\n    "literal",\n    "long",\n    "mutable",\n    "namespace",\n    "new",\n    "noexcept",\n    "nullptr",\n    "__nullptr",\n    "operator",\n    "override",\n    "partial",\n    "pascal",\n    "pin_ptr",\n    "private",\n    "property",\n    "protected",\n    "public",\n    "ref",\n    "register",\n    "reinterpret_cast",\n    "restrict",\n    "return",\n    "safe_cast",\n    "sealed",\n    "short",\n    "signed",\n    "sizeof",\n    "static",\n    "static_assert",\n    "static_cast",\n    "struct",\n    "switch",\n    "template",\n    "this",\n    "thread_local",\n    "throw",\n    "tile_static",\n    "true",\n    "try",\n    "typedef",\n    "typeid",\n    "typename",\n    "union",\n    "unsigned",\n    "using",\n    "virtual",\n    "void",\n    "volatile",\n    "wchar_t",\n    "where",\n    "while",\n    "_asm",\n    "_based",\n    "_cdecl",\n    "_declspec",\n    "_fastcall",\n    "_if_exists",\n    "_if_not_exists",\n    "_inline",\n    "_multiple_inheritance",\n    "_pascal",\n    "_single_inheritance",\n    "_stdcall",\n    "_virtual_inheritance",\n    "_w64",\n    "__abstract",\n    "__alignof",\n    "__asm",\n    "__assume",\n    "__based",\n    "__box",\n    "__builtin_alignof",\n    "__cdecl",\n    "__clrcall",\n    "__declspec",\n    "__delegate",\n    "__event",\n    "__except",\n    "__fastcall",\n    "__finally",\n    "__forceinline",\n    "__gc",\n    "__hook",\n    "__identifier",\n    "__if_exists",\n    "__if_not_exists",\n    "__inline",\n    "__int128",\n    "__int16",\n    "__int32",\n    "__int64",\n    "__int8",\n    "__interface",\n    "__leave",\n    "__m128",\n    "__m128d",\n    "__m128i",\n    "__m256",\n    "__m256d",\n    "__m256i",\n    "__m64",\n    "__multiple_inheritance",\n    "__newslot",\n    "__nogc",\n    "__noop",\n    "__nounwind",\n    "__novtordisp",\n    "__pascal",\n    "__pin",\n    "__pragma",\n    "__property",\n    "__ptr32",\n    "__ptr64",\n    "__raise",\n    "__restrict",\n    "__resume",\n    "__sealed",\n    "__single_inheritance",\n    "__stdcall",\n    "__super",\n    "__thiscall",\n    "__try",\n    "__try_cast",\n    "__typeof",\n    "__unaligned",\n    "__unhook",\n    "__uuidof",\n    "__value",\n    "__virtual_inheritance",\n    "__w64",\n    "__wchar_t"\n  ],\n  operators: [\n    "=",\n    ">",\n    "<",\n    "!",\n    "~",\n    "?",\n    ":",\n    "==",\n    "<=",\n    ">=",\n    "!=",\n    "&&",\n    "||",\n    "++",\n    "--",\n    "+",\n    "-",\n    "*",\n    "/",\n    "&",\n    "|",\n    "^",\n    "%",\n    "<<",\n    ">>",\n    ">>>",\n    "+=",\n    "-=",\n    "*=",\n    "/=",\n    "&=",\n    "|=",\n    "^=",\n    "%=",\n    "<<=",\n    ">>=",\n    ">>>="\n  ],\n  symbols: /[=><!~?:&|+\\-*\\/\\^%]+/,\n  escapes: /\\\\(?:[abfnrtv\\\\"\']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,\n  integersuffix: /([uU](ll|LL|l|L)|(ll|LL|l|L)?[uU]?)/,\n  floatsuffix: /[fFlL]?/,\n  encoding: /u|u8|U|L/,\n  tokenizer: {\n    root: [\n      [/@encoding?R\\"(?:([^ ()\\\\\\t]*))\\(/, { token: "string.raw.begin", next: "@raw.$1" }],\n      [\n        /[a-zA-Z_]\\w*/,\n        {\n          cases: {\n            "@keywords": { token: "keyword.$0" },\n            "@default": "identifier"\n          }\n        }\n      ],\n      [/^\\s*#\\s*include/, { token: "keyword.directive.include", next: "@include" }],\n      [/^\\s*#\\s*\\w+/, "keyword.directive"],\n      { include: "@whitespace" },\n      [/\\[\\s*\\[/, { token: "annotation", next: "@annotation" }],\n      [/[{}()\\[\\]]/, "@brackets"],\n      [/[<>](?!@symbols)/, "@brackets"],\n      [\n        /@symbols/,\n        {\n          cases: {\n            "@operators": "delimiter",\n            "@default": ""\n          }\n        }\n      ],\n      [/\\d*\\d+[eE]([\\-+]?\\d+)?(@floatsuffix)/, "number.float"],\n      [/\\d*\\.\\d+([eE][\\-+]?\\d+)?(@floatsuffix)/, "number.float"],\n      [/0[xX][0-9a-fA-F\']*[0-9a-fA-F](@integersuffix)/, "number.hex"],\n      [/0[0-7\']*[0-7](@integersuffix)/, "number.octal"],\n      [/0[bB][0-1\']*[0-1](@integersuffix)/, "number.binary"],\n      [/\\d[\\d\']*\\d(@integersuffix)/, "number"],\n      [/\\d(@integersuffix)/, "number"],\n      [/[;,.]/, "delimiter"],\n      [/"([^"\\\\]|\\\\.)*$/, "string.invalid"],\n      [/"/, "string", "@string"],\n      [/\'[^\\\\\']\'/, "string"],\n      [/(\')(@escapes)(\')/, ["string", "string.escape", "string"]],\n      [/\'/, "string.invalid"]\n    ],\n    whitespace: [\n      [/[ \\t\\r\\n]+/, ""],\n      [/\\/\\*\\*(?!\\/)/, "comment.doc", "@doccomment"],\n      [/\\/\\*/, "comment", "@comment"],\n      [/\\/\\/.*\\\\$/, "comment", "@linecomment"],\n      [/\\/\\/.*$/, "comment"]\n    ],\n    comment: [\n      [/[^\\/*]+/, "comment"],\n      [/\\*\\//, "comment", "@pop"],\n      [/[\\/*]/, "comment"]\n    ],\n    linecomment: [\n      [/.*[^\\\\]$/, "comment", "@pop"],\n      [/[^]+/, "comment"]\n    ],\n    doccomment: [\n      [/[^\\/*]+/, "comment.doc"],\n      [/\\*\\//, "comment.doc", "@pop"],\n      [/[\\/*]/, "comment.doc"]\n    ],\n    string: [\n      [/[^\\\\"]+/, "string"],\n      [/@escapes/, "string.escape"],\n      [/\\\\./, "string.escape.invalid"],\n      [/"/, "string", "@pop"]\n    ],\n    raw: [\n      [\n        /(.*)(\\))(?:([^ ()\\\\\\t"]*))(\\")/,\n        {\n          cases: {\n            "$3==$S2": [\n              "string.raw",\n              "string.raw.end",\n              "string.raw.end",\n              { token: "string.raw.end", next: "@pop" }\n            ],\n            "@default": ["string.raw", "string.raw", "string.raw", "string.raw"]\n          }\n        }\n      ],\n      [/.*/, "string.raw"]\n    ],\n    annotation: [\n      { include: "@whitespace" },\n      [/using|alignas/, "keyword"],\n      [/[a-zA-Z0-9_]+/, "annotation"],\n      [/[,:]/, "delimiter"],\n      [/[()]/, "@brackets"],\n      [/\\]\\s*\\]/, { token: "annotation", next: "@pop" }]\n    ],\n    include: [\n      [\n        /(\\s*)(<)([^<>]*)(>)/,\n        [\n          "",\n          "keyword.directive.include.begin",\n          "string.include.identifier",\n          { token: "keyword.directive.include.end", next: "@pop" }\n        ]\n      ],\n      [\n        /(\\s*)(")([^"]*)(")/,\n        [\n          "",\n          "keyword.directive.include.begin",\n          "string.include.identifier",\n          { token: "keyword.directive.include.end", next: "@pop" }\n        ]\n      ]\n    ]\n  }\n};\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHdCQUF3QjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixtQ0FBbUM7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJRSIsInNvdXJjZXMiOlsid2VicGFjazovL2NvbGxhYi1ub3Rlcy8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9iYXNpYy1sYW5ndWFnZXMvY3BwL2NwcC5qcz83ZTFjIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFZlcnNpb246IDAuMzEuMSgzMzc1ODc4NTliMWMxNzEzMTRiNDA1MDMxNzExODhiNmNlYTZhMzJhKVxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L21vbmFjby1lZGl0b3IvYmxvYi9tYWluL0xJQ0VOU0UudHh0XG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLy8gc3JjL2Jhc2ljLWxhbmd1YWdlcy9jcHAvY3BwLnRzXG52YXIgY29uZiA9IHtcbiAgY29tbWVudHM6IHtcbiAgICBsaW5lQ29tbWVudDogXCIvL1wiLFxuICAgIGJsb2NrQ29tbWVudDogW1wiLypcIiwgXCIqL1wiXVxuICB9LFxuICBicmFja2V0czogW1xuICAgIFtcIntcIiwgXCJ9XCJdLFxuICAgIFtcIltcIiwgXCJdXCJdLFxuICAgIFtcIihcIiwgXCIpXCJdXG4gIF0sXG4gIGF1dG9DbG9zaW5nUGFpcnM6IFtcbiAgICB7IG9wZW46IFwiW1wiLCBjbG9zZTogXCJdXCIgfSxcbiAgICB7IG9wZW46IFwie1wiLCBjbG9zZTogXCJ9XCIgfSxcbiAgICB7IG9wZW46IFwiKFwiLCBjbG9zZTogXCIpXCIgfSxcbiAgICB7IG9wZW46IFwiJ1wiLCBjbG9zZTogXCInXCIsIG5vdEluOiBbXCJzdHJpbmdcIiwgXCJjb21tZW50XCJdIH0sXG4gICAgeyBvcGVuOiAnXCInLCBjbG9zZTogJ1wiJywgbm90SW46IFtcInN0cmluZ1wiXSB9XG4gIF0sXG4gIHN1cnJvdW5kaW5nUGFpcnM6IFtcbiAgICB7IG9wZW46IFwie1wiLCBjbG9zZTogXCJ9XCIgfSxcbiAgICB7IG9wZW46IFwiW1wiLCBjbG9zZTogXCJdXCIgfSxcbiAgICB7IG9wZW46IFwiKFwiLCBjbG9zZTogXCIpXCIgfSxcbiAgICB7IG9wZW46ICdcIicsIGNsb3NlOiAnXCInIH0sXG4gICAgeyBvcGVuOiBcIidcIiwgY2xvc2U6IFwiJ1wiIH1cbiAgXSxcbiAgZm9sZGluZzoge1xuICAgIG1hcmtlcnM6IHtcbiAgICAgIHN0YXJ0OiBuZXcgUmVnRXhwKFwiXlxcXFxzKiNwcmFnbWFcXFxccytyZWdpb25cXFxcYlwiKSxcbiAgICAgIGVuZDogbmV3IFJlZ0V4cChcIl5cXFxccyojcHJhZ21hXFxcXHMrZW5kcmVnaW9uXFxcXGJcIilcbiAgICB9XG4gIH1cbn07XG52YXIgbGFuZ3VhZ2UgPSB7XG4gIGRlZmF1bHRUb2tlbjogXCJcIixcbiAgdG9rZW5Qb3N0Zml4OiBcIi5jcHBcIixcbiAgYnJhY2tldHM6IFtcbiAgICB7IHRva2VuOiBcImRlbGltaXRlci5jdXJseVwiLCBvcGVuOiBcIntcIiwgY2xvc2U6IFwifVwiIH0sXG4gICAgeyB0b2tlbjogXCJkZWxpbWl0ZXIucGFyZW50aGVzaXNcIiwgb3BlbjogXCIoXCIsIGNsb3NlOiBcIilcIiB9LFxuICAgIHsgdG9rZW46IFwiZGVsaW1pdGVyLnNxdWFyZVwiLCBvcGVuOiBcIltcIiwgY2xvc2U6IFwiXVwiIH0sXG4gICAgeyB0b2tlbjogXCJkZWxpbWl0ZXIuYW5nbGVcIiwgb3BlbjogXCI8XCIsIGNsb3NlOiBcIj5cIiB9XG4gIF0sXG4gIGtleXdvcmRzOiBbXG4gICAgXCJhYnN0cmFjdFwiLFxuICAgIFwiYW1wXCIsXG4gICAgXCJhcnJheVwiLFxuICAgIFwiYXV0b1wiLFxuICAgIFwiYm9vbFwiLFxuICAgIFwiYnJlYWtcIixcbiAgICBcImNhc2VcIixcbiAgICBcImNhdGNoXCIsXG4gICAgXCJjaGFyXCIsXG4gICAgXCJjbGFzc1wiLFxuICAgIFwiY29uc3RcIixcbiAgICBcImNvbnN0ZXhwclwiLFxuICAgIFwiY29uc3RfY2FzdFwiLFxuICAgIFwiY29udGludWVcIixcbiAgICBcImNwdVwiLFxuICAgIFwiZGVjbHR5cGVcIixcbiAgICBcImRlZmF1bHRcIixcbiAgICBcImRlbGVnYXRlXCIsXG4gICAgXCJkZWxldGVcIixcbiAgICBcImRvXCIsXG4gICAgXCJkb3VibGVcIixcbiAgICBcImR5bmFtaWNfY2FzdFwiLFxuICAgIFwiZWFjaFwiLFxuICAgIFwiZWxzZVwiLFxuICAgIFwiZW51bVwiLFxuICAgIFwiZXZlbnRcIixcbiAgICBcImV4cGxpY2l0XCIsXG4gICAgXCJleHBvcnRcIixcbiAgICBcImV4dGVyblwiLFxuICAgIFwiZmFsc2VcIixcbiAgICBcImZpbmFsXCIsXG4gICAgXCJmaW5hbGx5XCIsXG4gICAgXCJmbG9hdFwiLFxuICAgIFwiZm9yXCIsXG4gICAgXCJmcmllbmRcIixcbiAgICBcImdjbmV3XCIsXG4gICAgXCJnZW5lcmljXCIsXG4gICAgXCJnb3RvXCIsXG4gICAgXCJpZlwiLFxuICAgIFwiaW5cIixcbiAgICBcImluaXRvbmx5XCIsXG4gICAgXCJpbmxpbmVcIixcbiAgICBcImludFwiLFxuICAgIFwiaW50ZXJmYWNlXCIsXG4gICAgXCJpbnRlcmlvcl9wdHJcIixcbiAgICBcImludGVybmFsXCIsXG4gICAgXCJsaXRlcmFsXCIsXG4gICAgXCJsb25nXCIsXG4gICAgXCJtdXRhYmxlXCIsXG4gICAgXCJuYW1lc3BhY2VcIixcbiAgICBcIm5ld1wiLFxuICAgIFwibm9leGNlcHRcIixcbiAgICBcIm51bGxwdHJcIixcbiAgICBcIl9fbnVsbHB0clwiLFxuICAgIFwib3BlcmF0b3JcIixcbiAgICBcIm92ZXJyaWRlXCIsXG4gICAgXCJwYXJ0aWFsXCIsXG4gICAgXCJwYXNjYWxcIixcbiAgICBcInBpbl9wdHJcIixcbiAgICBcInByaXZhdGVcIixcbiAgICBcInByb3BlcnR5XCIsXG4gICAgXCJwcm90ZWN0ZWRcIixcbiAgICBcInB1YmxpY1wiLFxuICAgIFwicmVmXCIsXG4gICAgXCJyZWdpc3RlclwiLFxuICAgIFwicmVpbnRlcnByZXRfY2FzdFwiLFxuICAgIFwicmVzdHJpY3RcIixcbiAgICBcInJldHVyblwiLFxuICAgIFwic2FmZV9jYXN0XCIsXG4gICAgXCJzZWFsZWRcIixcbiAgICBcInNob3J0XCIsXG4gICAgXCJzaWduZWRcIixcbiAgICBcInNpemVvZlwiLFxuICAgIFwic3RhdGljXCIsXG4gICAgXCJzdGF0aWNfYXNzZXJ0XCIsXG4gICAgXCJzdGF0aWNfY2FzdFwiLFxuICAgIFwic3RydWN0XCIsXG4gICAgXCJzd2l0Y2hcIixcbiAgICBcInRlbXBsYXRlXCIsXG4gICAgXCJ0aGlzXCIsXG4gICAgXCJ0aHJlYWRfbG9jYWxcIixcbiAgICBcInRocm93XCIsXG4gICAgXCJ0aWxlX3N0YXRpY1wiLFxuICAgIFwidHJ1ZVwiLFxuICAgIFwidHJ5XCIsXG4gICAgXCJ0eXBlZGVmXCIsXG4gICAgXCJ0eXBlaWRcIixcbiAgICBcInR5cGVuYW1lXCIsXG4gICAgXCJ1bmlvblwiLFxuICAgIFwidW5zaWduZWRcIixcbiAgICBcInVzaW5nXCIsXG4gICAgXCJ2aXJ0dWFsXCIsXG4gICAgXCJ2b2lkXCIsXG4gICAgXCJ2b2xhdGlsZVwiLFxuICAgIFwid2NoYXJfdFwiLFxuICAgIFwid2hlcmVcIixcbiAgICBcIndoaWxlXCIsXG4gICAgXCJfYXNtXCIsXG4gICAgXCJfYmFzZWRcIixcbiAgICBcIl9jZGVjbFwiLFxuICAgIFwiX2RlY2xzcGVjXCIsXG4gICAgXCJfZmFzdGNhbGxcIixcbiAgICBcIl9pZl9leGlzdHNcIixcbiAgICBcIl9pZl9ub3RfZXhpc3RzXCIsXG4gICAgXCJfaW5saW5lXCIsXG4gICAgXCJfbXVsdGlwbGVfaW5oZXJpdGFuY2VcIixcbiAgICBcIl9wYXNjYWxcIixcbiAgICBcIl9zaW5nbGVfaW5oZXJpdGFuY2VcIixcbiAgICBcIl9zdGRjYWxsXCIsXG4gICAgXCJfdmlydHVhbF9pbmhlcml0YW5jZVwiLFxuICAgIFwiX3c2NFwiLFxuICAgIFwiX19hYnN0cmFjdFwiLFxuICAgIFwiX19hbGlnbm9mXCIsXG4gICAgXCJfX2FzbVwiLFxuICAgIFwiX19hc3N1bWVcIixcbiAgICBcIl9fYmFzZWRcIixcbiAgICBcIl9fYm94XCIsXG4gICAgXCJfX2J1aWx0aW5fYWxpZ25vZlwiLFxuICAgIFwiX19jZGVjbFwiLFxuICAgIFwiX19jbHJjYWxsXCIsXG4gICAgXCJfX2RlY2xzcGVjXCIsXG4gICAgXCJfX2RlbGVnYXRlXCIsXG4gICAgXCJfX2V2ZW50XCIsXG4gICAgXCJfX2V4Y2VwdFwiLFxuICAgIFwiX19mYXN0Y2FsbFwiLFxuICAgIFwiX19maW5hbGx5XCIsXG4gICAgXCJfX2ZvcmNlaW5saW5lXCIsXG4gICAgXCJfX2djXCIsXG4gICAgXCJfX2hvb2tcIixcbiAgICBcIl9faWRlbnRpZmllclwiLFxuICAgIFwiX19pZl9leGlzdHNcIixcbiAgICBcIl9faWZfbm90X2V4aXN0c1wiLFxuICAgIFwiX19pbmxpbmVcIixcbiAgICBcIl9faW50MTI4XCIsXG4gICAgXCJfX2ludDE2XCIsXG4gICAgXCJfX2ludDMyXCIsXG4gICAgXCJfX2ludDY0XCIsXG4gICAgXCJfX2ludDhcIixcbiAgICBcIl9faW50ZXJmYWNlXCIsXG4gICAgXCJfX2xlYXZlXCIsXG4gICAgXCJfX20xMjhcIixcbiAgICBcIl9fbTEyOGRcIixcbiAgICBcIl9fbTEyOGlcIixcbiAgICBcIl9fbTI1NlwiLFxuICAgIFwiX19tMjU2ZFwiLFxuICAgIFwiX19tMjU2aVwiLFxuICAgIFwiX19tNjRcIixcbiAgICBcIl9fbXVsdGlwbGVfaW5oZXJpdGFuY2VcIixcbiAgICBcIl9fbmV3c2xvdFwiLFxuICAgIFwiX19ub2djXCIsXG4gICAgXCJfX25vb3BcIixcbiAgICBcIl9fbm91bndpbmRcIixcbiAgICBcIl9fbm92dG9yZGlzcFwiLFxuICAgIFwiX19wYXNjYWxcIixcbiAgICBcIl9fcGluXCIsXG4gICAgXCJfX3ByYWdtYVwiLFxuICAgIFwiX19wcm9wZXJ0eVwiLFxuICAgIFwiX19wdHIzMlwiLFxuICAgIFwiX19wdHI2NFwiLFxuICAgIFwiX19yYWlzZVwiLFxuICAgIFwiX19yZXN0cmljdFwiLFxuICAgIFwiX19yZXN1bWVcIixcbiAgICBcIl9fc2VhbGVkXCIsXG4gICAgXCJfX3NpbmdsZV9pbmhlcml0YW5jZVwiLFxuICAgIFwiX19zdGRjYWxsXCIsXG4gICAgXCJfX3N1cGVyXCIsXG4gICAgXCJfX3RoaXNjYWxsXCIsXG4gICAgXCJfX3RyeVwiLFxuICAgIFwiX190cnlfY2FzdFwiLFxuICAgIFwiX190eXBlb2ZcIixcbiAgICBcIl9fdW5hbGlnbmVkXCIsXG4gICAgXCJfX3VuaG9va1wiLFxuICAgIFwiX191dWlkb2ZcIixcbiAgICBcIl9fdmFsdWVcIixcbiAgICBcIl9fdmlydHVhbF9pbmhlcml0YW5jZVwiLFxuICAgIFwiX193NjRcIixcbiAgICBcIl9fd2NoYXJfdFwiXG4gIF0sXG4gIG9wZXJhdG9yczogW1xuICAgIFwiPVwiLFxuICAgIFwiPlwiLFxuICAgIFwiPFwiLFxuICAgIFwiIVwiLFxuICAgIFwiflwiLFxuICAgIFwiP1wiLFxuICAgIFwiOlwiLFxuICAgIFwiPT1cIixcbiAgICBcIjw9XCIsXG4gICAgXCI+PVwiLFxuICAgIFwiIT1cIixcbiAgICBcIiYmXCIsXG4gICAgXCJ8fFwiLFxuICAgIFwiKytcIixcbiAgICBcIi0tXCIsXG4gICAgXCIrXCIsXG4gICAgXCItXCIsXG4gICAgXCIqXCIsXG4gICAgXCIvXCIsXG4gICAgXCImXCIsXG4gICAgXCJ8XCIsXG4gICAgXCJeXCIsXG4gICAgXCIlXCIsXG4gICAgXCI8PFwiLFxuICAgIFwiPj5cIixcbiAgICBcIj4+PlwiLFxuICAgIFwiKz1cIixcbiAgICBcIi09XCIsXG4gICAgXCIqPVwiLFxuICAgIFwiLz1cIixcbiAgICBcIiY9XCIsXG4gICAgXCJ8PVwiLFxuICAgIFwiXj1cIixcbiAgICBcIiU9XCIsXG4gICAgXCI8PD1cIixcbiAgICBcIj4+PVwiLFxuICAgIFwiPj4+PVwiXG4gIF0sXG4gIHN5bWJvbHM6IC9bPT48IX4/OiZ8K1xcLSpcXC9cXF4lXSsvLFxuICBlc2NhcGVzOiAvXFxcXCg/OlthYmZucnR2XFxcXFwiJ118eFswLTlBLUZhLWZdezEsNH18dVswLTlBLUZhLWZdezR9fFVbMC05QS1GYS1mXXs4fSkvLFxuICBpbnRlZ2Vyc3VmZml4OiAvKFt1VV0obGx8TEx8bHxMKXwobGx8TEx8bHxMKT9bdVVdPykvLFxuICBmbG9hdHN1ZmZpeDogL1tmRmxMXT8vLFxuICBlbmNvZGluZzogL3V8dTh8VXxMLyxcbiAgdG9rZW5pemVyOiB7XG4gICAgcm9vdDogW1xuICAgICAgWy9AZW5jb2Rpbmc/UlxcXCIoPzooW14gKClcXFxcXFx0XSopKVxcKC8sIHsgdG9rZW46IFwic3RyaW5nLnJhdy5iZWdpblwiLCBuZXh0OiBcIkByYXcuJDFcIiB9XSxcbiAgICAgIFtcbiAgICAgICAgL1thLXpBLVpfXVxcdyovLFxuICAgICAgICB7XG4gICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgIFwiQGtleXdvcmRzXCI6IHsgdG9rZW46IFwia2V5d29yZC4kMFwiIH0sXG4gICAgICAgICAgICBcIkBkZWZhdWx0XCI6IFwiaWRlbnRpZmllclwiXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgWy9eXFxzKiNcXHMqaW5jbHVkZS8sIHsgdG9rZW46IFwia2V5d29yZC5kaXJlY3RpdmUuaW5jbHVkZVwiLCBuZXh0OiBcIkBpbmNsdWRlXCIgfV0sXG4gICAgICBbL15cXHMqI1xccypcXHcrLywgXCJrZXl3b3JkLmRpcmVjdGl2ZVwiXSxcbiAgICAgIHsgaW5jbHVkZTogXCJAd2hpdGVzcGFjZVwiIH0sXG4gICAgICBbL1xcW1xccypcXFsvLCB7IHRva2VuOiBcImFubm90YXRpb25cIiwgbmV4dDogXCJAYW5ub3RhdGlvblwiIH1dLFxuICAgICAgWy9be30oKVxcW1xcXV0vLCBcIkBicmFja2V0c1wiXSxcbiAgICAgIFsvWzw+XSg/IUBzeW1ib2xzKS8sIFwiQGJyYWNrZXRzXCJdLFxuICAgICAgW1xuICAgICAgICAvQHN5bWJvbHMvLFxuICAgICAgICB7XG4gICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgIFwiQG9wZXJhdG9yc1wiOiBcImRlbGltaXRlclwiLFxuICAgICAgICAgICAgXCJAZGVmYXVsdFwiOiBcIlwiXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgWy9cXGQqXFxkK1tlRV0oW1xcLStdP1xcZCspPyhAZmxvYXRzdWZmaXgpLywgXCJudW1iZXIuZmxvYXRcIl0sXG4gICAgICBbL1xcZCpcXC5cXGQrKFtlRV1bXFwtK10/XFxkKyk/KEBmbG9hdHN1ZmZpeCkvLCBcIm51bWJlci5mbG9hdFwiXSxcbiAgICAgIFsvMFt4WF1bMC05YS1mQS1GJ10qWzAtOWEtZkEtRl0oQGludGVnZXJzdWZmaXgpLywgXCJudW1iZXIuaGV4XCJdLFxuICAgICAgWy8wWzAtNyddKlswLTddKEBpbnRlZ2Vyc3VmZml4KS8sIFwibnVtYmVyLm9jdGFsXCJdLFxuICAgICAgWy8wW2JCXVswLTEnXSpbMC0xXShAaW50ZWdlcnN1ZmZpeCkvLCBcIm51bWJlci5iaW5hcnlcIl0sXG4gICAgICBbL1xcZFtcXGQnXSpcXGQoQGludGVnZXJzdWZmaXgpLywgXCJudW1iZXJcIl0sXG4gICAgICBbL1xcZChAaW50ZWdlcnN1ZmZpeCkvLCBcIm51bWJlclwiXSxcbiAgICAgIFsvWzssLl0vLCBcImRlbGltaXRlclwiXSxcbiAgICAgIFsvXCIoW15cIlxcXFxdfFxcXFwuKSokLywgXCJzdHJpbmcuaW52YWxpZFwiXSxcbiAgICAgIFsvXCIvLCBcInN0cmluZ1wiLCBcIkBzdHJpbmdcIl0sXG4gICAgICBbLydbXlxcXFwnXScvLCBcInN0cmluZ1wiXSxcbiAgICAgIFsvKCcpKEBlc2NhcGVzKSgnKS8sIFtcInN0cmluZ1wiLCBcInN0cmluZy5lc2NhcGVcIiwgXCJzdHJpbmdcIl1dLFxuICAgICAgWy8nLywgXCJzdHJpbmcuaW52YWxpZFwiXVxuICAgIF0sXG4gICAgd2hpdGVzcGFjZTogW1xuICAgICAgWy9bIFxcdFxcclxcbl0rLywgXCJcIl0sXG4gICAgICBbL1xcL1xcKlxcKig/IVxcLykvLCBcImNvbW1lbnQuZG9jXCIsIFwiQGRvY2NvbW1lbnRcIl0sXG4gICAgICBbL1xcL1xcKi8sIFwiY29tbWVudFwiLCBcIkBjb21tZW50XCJdLFxuICAgICAgWy9cXC9cXC8uKlxcXFwkLywgXCJjb21tZW50XCIsIFwiQGxpbmVjb21tZW50XCJdLFxuICAgICAgWy9cXC9cXC8uKiQvLCBcImNvbW1lbnRcIl1cbiAgICBdLFxuICAgIGNvbW1lbnQ6IFtcbiAgICAgIFsvW15cXC8qXSsvLCBcImNvbW1lbnRcIl0sXG4gICAgICBbL1xcKlxcLy8sIFwiY29tbWVudFwiLCBcIkBwb3BcIl0sXG4gICAgICBbL1tcXC8qXS8sIFwiY29tbWVudFwiXVxuICAgIF0sXG4gICAgbGluZWNvbW1lbnQ6IFtcbiAgICAgIFsvLipbXlxcXFxdJC8sIFwiY29tbWVudFwiLCBcIkBwb3BcIl0sXG4gICAgICBbL1teXSsvLCBcImNvbW1lbnRcIl1cbiAgICBdLFxuICAgIGRvY2NvbW1lbnQ6IFtcbiAgICAgIFsvW15cXC8qXSsvLCBcImNvbW1lbnQuZG9jXCJdLFxuICAgICAgWy9cXCpcXC8vLCBcImNvbW1lbnQuZG9jXCIsIFwiQHBvcFwiXSxcbiAgICAgIFsvW1xcLypdLywgXCJjb21tZW50LmRvY1wiXVxuICAgIF0sXG4gICAgc3RyaW5nOiBbXG4gICAgICBbL1teXFxcXFwiXSsvLCBcInN0cmluZ1wiXSxcbiAgICAgIFsvQGVzY2FwZXMvLCBcInN0cmluZy5lc2NhcGVcIl0sXG4gICAgICBbL1xcXFwuLywgXCJzdHJpbmcuZXNjYXBlLmludmFsaWRcIl0sXG4gICAgICBbL1wiLywgXCJzdHJpbmdcIiwgXCJAcG9wXCJdXG4gICAgXSxcbiAgICByYXc6IFtcbiAgICAgIFtcbiAgICAgICAgLyguKikoXFwpKSg/OihbXiAoKVxcXFxcXHRcIl0qKSkoXFxcIikvLFxuICAgICAgICB7XG4gICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgIFwiJDM9PSRTMlwiOiBbXG4gICAgICAgICAgICAgIFwic3RyaW5nLnJhd1wiLFxuICAgICAgICAgICAgICBcInN0cmluZy5yYXcuZW5kXCIsXG4gICAgICAgICAgICAgIFwic3RyaW5nLnJhdy5lbmRcIixcbiAgICAgICAgICAgICAgeyB0b2tlbjogXCJzdHJpbmcucmF3LmVuZFwiLCBuZXh0OiBcIkBwb3BcIiB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgXCJAZGVmYXVsdFwiOiBbXCJzdHJpbmcucmF3XCIsIFwic3RyaW5nLnJhd1wiLCBcInN0cmluZy5yYXdcIiwgXCJzdHJpbmcucmF3XCJdXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgWy8uKi8sIFwic3RyaW5nLnJhd1wiXVxuICAgIF0sXG4gICAgYW5ub3RhdGlvbjogW1xuICAgICAgeyBpbmNsdWRlOiBcIkB3aGl0ZXNwYWNlXCIgfSxcbiAgICAgIFsvdXNpbmd8YWxpZ25hcy8sIFwia2V5d29yZFwiXSxcbiAgICAgIFsvW2EtekEtWjAtOV9dKy8sIFwiYW5ub3RhdGlvblwiXSxcbiAgICAgIFsvWyw6XS8sIFwiZGVsaW1pdGVyXCJdLFxuICAgICAgWy9bKCldLywgXCJAYnJhY2tldHNcIl0sXG4gICAgICBbL1xcXVxccypcXF0vLCB7IHRva2VuOiBcImFubm90YXRpb25cIiwgbmV4dDogXCJAcG9wXCIgfV1cbiAgICBdLFxuICAgIGluY2x1ZGU6IFtcbiAgICAgIFtcbiAgICAgICAgLyhcXHMqKSg8KShbXjw+XSopKD4pLyxcbiAgICAgICAgW1xuICAgICAgICAgIFwiXCIsXG4gICAgICAgICAgXCJrZXl3b3JkLmRpcmVjdGl2ZS5pbmNsdWRlLmJlZ2luXCIsXG4gICAgICAgICAgXCJzdHJpbmcuaW5jbHVkZS5pZGVudGlmaWVyXCIsXG4gICAgICAgICAgeyB0b2tlbjogXCJrZXl3b3JkLmRpcmVjdGl2ZS5pbmNsdWRlLmVuZFwiLCBuZXh0OiBcIkBwb3BcIiB9XG4gICAgICAgIF1cbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgIC8oXFxzKikoXCIpKFteXCJdKikoXCIpLyxcbiAgICAgICAgW1xuICAgICAgICAgIFwiXCIsXG4gICAgICAgICAgXCJrZXl3b3JkLmRpcmVjdGl2ZS5pbmNsdWRlLmJlZ2luXCIsXG4gICAgICAgICAgXCJzdHJpbmcuaW5jbHVkZS5pZGVudGlmaWVyXCIsXG4gICAgICAgICAgeyB0b2tlbjogXCJrZXl3b3JkLmRpcmVjdGl2ZS5pbmNsdWRlLmVuZFwiLCBuZXh0OiBcIkBwb3BcIiB9XG4gICAgICAgIF1cbiAgICAgIF1cbiAgICBdXG4gIH1cbn07XG5leHBvcnQge1xuICBjb25mLFxuICBsYW5ndWFnZVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///1960\n')}}]);