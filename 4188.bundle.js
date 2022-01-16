"use strict";(self.webpackChunkcollab_notes=self.webpackChunkcollab_notes||[]).push([[4188],{14188:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "conf": () => (/* binding */ conf),\n/* harmony export */   "language": () => (/* binding */ language)\n/* harmony export */ });\n/*!-----------------------------------------------------------------------------\n * Copyright (c) Microsoft Corporation. All rights reserved.\n * Version: 0.31.1(337587859b1c171314b40503171188b6cea6a32a)\n * Released under the MIT license\n * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt\n *-----------------------------------------------------------------------------*/\n\n// src/basic-languages/flow9/flow9.ts\nvar conf = {\n  comments: {\n    blockComment: ["/*", "*/"],\n    lineComment: "//"\n  },\n  brackets: [\n    ["{", "}"],\n    ["[", "]"],\n    ["(", ")"]\n  ],\n  autoClosingPairs: [\n    { open: "{", close: "}", notIn: ["string"] },\n    { open: "[", close: "]", notIn: ["string"] },\n    { open: "(", close: ")", notIn: ["string"] },\n    { open: \'"\', close: \'"\', notIn: ["string"] },\n    { open: "\'", close: "\'", notIn: ["string"] }\n  ],\n  surroundingPairs: [\n    { open: "{", close: "}" },\n    { open: "[", close: "]" },\n    { open: "(", close: ")" },\n    { open: \'"\', close: \'"\' },\n    { open: "\'", close: "\'" },\n    { open: "<", close: ">" }\n  ]\n};\nvar language = {\n  defaultToken: "",\n  tokenPostfix: ".flow",\n  keywords: [\n    "import",\n    "require",\n    "export",\n    "forbid",\n    "native",\n    "if",\n    "else",\n    "cast",\n    "unsafe",\n    "switch",\n    "default"\n  ],\n  types: [\n    "io",\n    "mutable",\n    "bool",\n    "int",\n    "double",\n    "string",\n    "flow",\n    "void",\n    "ref",\n    "true",\n    "false",\n    "with"\n  ],\n  operators: [\n    "=",\n    ">",\n    "<",\n    "<=",\n    ">=",\n    "==",\n    "!",\n    "!=",\n    ":=",\n    "::=",\n    "&&",\n    "||",\n    "+",\n    "-",\n    "*",\n    "/",\n    "@",\n    "&",\n    "%",\n    ":",\n    "->",\n    "\\\\",\n    "$",\n    "??",\n    "^"\n  ],\n  symbols: /[@$=><!~?:&|+\\-*\\\\\\/\\^%]+/,\n  escapes: /\\\\(?:[abfnrtv\\\\"\']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,\n  tokenizer: {\n    root: [\n      [\n        /[a-zA-Z_]\\w*/,\n        {\n          cases: {\n            "@keywords": "keyword",\n            "@types": "type",\n            "@default": "identifier"\n          }\n        }\n      ],\n      { include: "@whitespace" },\n      [/[{}()\\[\\]]/, "delimiter"],\n      [/[<>](?!@symbols)/, "delimiter"],\n      [\n        /@symbols/,\n        {\n          cases: {\n            "@operators": "delimiter",\n            "@default": ""\n          }\n        }\n      ],\n      [/((0(x|X)[0-9a-fA-F]*)|(([0-9]+\\.?[0-9]*)|(\\.[0-9]+))((e|E)(\\+|-)?[0-9]+)?)/, "number"],\n      [/[;,.]/, "delimiter"],\n      [/"([^"\\\\]|\\\\.)*$/, "string.invalid"],\n      [/"/, "string", "@string"]\n    ],\n    whitespace: [\n      [/[ \\t\\r\\n]+/, ""],\n      [/\\/\\*/, "comment", "@comment"],\n      [/\\/\\/.*$/, "comment"]\n    ],\n    comment: [\n      [/[^\\/*]+/, "comment"],\n      [/\\*\\//, "comment", "@pop"],\n      [/[\\/*]/, "comment"]\n    ],\n    string: [\n      [/[^\\\\"]+/, "string"],\n      [/@escapes/, "string.escape"],\n      [/\\\\./, "string.escape.invalid"],\n      [/"/, "string", "@pop"]\n    ]\n  }\n};\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTQxODguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLE9BQU8sS0FBSztBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxRQUFRLFlBQVksc0JBQXNCO0FBQ2hELE1BQU0sMENBQTBDO0FBQ2hELE1BQU0sMENBQTBDO0FBQ2hELE1BQU0sMENBQTBDO0FBQ2hELE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTSxRQUFRLFlBQVksR0FBRztBQUM3QixNQUFNLHVCQUF1QjtBQUM3QixNQUFNLHVCQUF1QjtBQUM3QixNQUFNLHVCQUF1QjtBQUM3QixNQUFNLHVCQUF1QjtBQUM3QixNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLElBQUksY0FBYyxFQUFFLGNBQWMsRUFBRTtBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHdCQUF3QjtBQUNoQyxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJRSIsInNvdXJjZXMiOlsid2VicGFjazovL2NvbGxhYi1ub3Rlcy8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9iYXNpYy1sYW5ndWFnZXMvZmxvdzkvZmxvdzkuanM/YjI2ZSJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBWZXJzaW9uOiAwLjMxLjEoMzM3NTg3ODU5YjFjMTcxMzE0YjQwNTAzMTcxMTg4YjZjZWE2YTMyYSlcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICogaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9tb25hY28tZWRpdG9yL2Jsb2IvbWFpbi9MSUNFTlNFLnR4dFxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8vIHNyYy9iYXNpYy1sYW5ndWFnZXMvZmxvdzkvZmxvdzkudHNcbnZhciBjb25mID0ge1xuICBjb21tZW50czoge1xuICAgIGJsb2NrQ29tbWVudDogW1wiLypcIiwgXCIqL1wiXSxcbiAgICBsaW5lQ29tbWVudDogXCIvL1wiXG4gIH0sXG4gIGJyYWNrZXRzOiBbXG4gICAgW1wie1wiLCBcIn1cIl0sXG4gICAgW1wiW1wiLCBcIl1cIl0sXG4gICAgW1wiKFwiLCBcIilcIl1cbiAgXSxcbiAgYXV0b0Nsb3NpbmdQYWlyczogW1xuICAgIHsgb3BlbjogXCJ7XCIsIGNsb3NlOiBcIn1cIiwgbm90SW46IFtcInN0cmluZ1wiXSB9LFxuICAgIHsgb3BlbjogXCJbXCIsIGNsb3NlOiBcIl1cIiwgbm90SW46IFtcInN0cmluZ1wiXSB9LFxuICAgIHsgb3BlbjogXCIoXCIsIGNsb3NlOiBcIilcIiwgbm90SW46IFtcInN0cmluZ1wiXSB9LFxuICAgIHsgb3BlbjogJ1wiJywgY2xvc2U6ICdcIicsIG5vdEluOiBbXCJzdHJpbmdcIl0gfSxcbiAgICB7IG9wZW46IFwiJ1wiLCBjbG9zZTogXCInXCIsIG5vdEluOiBbXCJzdHJpbmdcIl0gfVxuICBdLFxuICBzdXJyb3VuZGluZ1BhaXJzOiBbXG4gICAgeyBvcGVuOiBcIntcIiwgY2xvc2U6IFwifVwiIH0sXG4gICAgeyBvcGVuOiBcIltcIiwgY2xvc2U6IFwiXVwiIH0sXG4gICAgeyBvcGVuOiBcIihcIiwgY2xvc2U6IFwiKVwiIH0sXG4gICAgeyBvcGVuOiAnXCInLCBjbG9zZTogJ1wiJyB9LFxuICAgIHsgb3BlbjogXCInXCIsIGNsb3NlOiBcIidcIiB9LFxuICAgIHsgb3BlbjogXCI8XCIsIGNsb3NlOiBcIj5cIiB9XG4gIF1cbn07XG52YXIgbGFuZ3VhZ2UgPSB7XG4gIGRlZmF1bHRUb2tlbjogXCJcIixcbiAgdG9rZW5Qb3N0Zml4OiBcIi5mbG93XCIsXG4gIGtleXdvcmRzOiBbXG4gICAgXCJpbXBvcnRcIixcbiAgICBcInJlcXVpcmVcIixcbiAgICBcImV4cG9ydFwiLFxuICAgIFwiZm9yYmlkXCIsXG4gICAgXCJuYXRpdmVcIixcbiAgICBcImlmXCIsXG4gICAgXCJlbHNlXCIsXG4gICAgXCJjYXN0XCIsXG4gICAgXCJ1bnNhZmVcIixcbiAgICBcInN3aXRjaFwiLFxuICAgIFwiZGVmYXVsdFwiXG4gIF0sXG4gIHR5cGVzOiBbXG4gICAgXCJpb1wiLFxuICAgIFwibXV0YWJsZVwiLFxuICAgIFwiYm9vbFwiLFxuICAgIFwiaW50XCIsXG4gICAgXCJkb3VibGVcIixcbiAgICBcInN0cmluZ1wiLFxuICAgIFwiZmxvd1wiLFxuICAgIFwidm9pZFwiLFxuICAgIFwicmVmXCIsXG4gICAgXCJ0cnVlXCIsXG4gICAgXCJmYWxzZVwiLFxuICAgIFwid2l0aFwiXG4gIF0sXG4gIG9wZXJhdG9yczogW1xuICAgIFwiPVwiLFxuICAgIFwiPlwiLFxuICAgIFwiPFwiLFxuICAgIFwiPD1cIixcbiAgICBcIj49XCIsXG4gICAgXCI9PVwiLFxuICAgIFwiIVwiLFxuICAgIFwiIT1cIixcbiAgICBcIjo9XCIsXG4gICAgXCI6Oj1cIixcbiAgICBcIiYmXCIsXG4gICAgXCJ8fFwiLFxuICAgIFwiK1wiLFxuICAgIFwiLVwiLFxuICAgIFwiKlwiLFxuICAgIFwiL1wiLFxuICAgIFwiQFwiLFxuICAgIFwiJlwiLFxuICAgIFwiJVwiLFxuICAgIFwiOlwiLFxuICAgIFwiLT5cIixcbiAgICBcIlxcXFxcIixcbiAgICBcIiRcIixcbiAgICBcIj8/XCIsXG4gICAgXCJeXCJcbiAgXSxcbiAgc3ltYm9sczogL1tAJD0+PCF+PzomfCtcXC0qXFxcXFxcL1xcXiVdKy8sXG4gIGVzY2FwZXM6IC9cXFxcKD86W2FiZm5ydHZcXFxcXCInXXx4WzAtOUEtRmEtZl17MSw0fXx1WzAtOUEtRmEtZl17NH18VVswLTlBLUZhLWZdezh9KS8sXG4gIHRva2VuaXplcjoge1xuICAgIHJvb3Q6IFtcbiAgICAgIFtcbiAgICAgICAgL1thLXpBLVpfXVxcdyovLFxuICAgICAgICB7XG4gICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgIFwiQGtleXdvcmRzXCI6IFwia2V5d29yZFwiLFxuICAgICAgICAgICAgXCJAdHlwZXNcIjogXCJ0eXBlXCIsXG4gICAgICAgICAgICBcIkBkZWZhdWx0XCI6IFwiaWRlbnRpZmllclwiXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgeyBpbmNsdWRlOiBcIkB3aGl0ZXNwYWNlXCIgfSxcbiAgICAgIFsvW3t9KClcXFtcXF1dLywgXCJkZWxpbWl0ZXJcIl0sXG4gICAgICBbL1s8Pl0oPyFAc3ltYm9scykvLCBcImRlbGltaXRlclwiXSxcbiAgICAgIFtcbiAgICAgICAgL0BzeW1ib2xzLyxcbiAgICAgICAge1xuICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICBcIkBvcGVyYXRvcnNcIjogXCJkZWxpbWl0ZXJcIixcbiAgICAgICAgICAgIFwiQGRlZmF1bHRcIjogXCJcIlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIFsvKCgwKHh8WClbMC05YS1mQS1GXSopfCgoWzAtOV0rXFwuP1swLTldKil8KFxcLlswLTldKykpKChlfEUpKFxcK3wtKT9bMC05XSspPykvLCBcIm51bWJlclwiXSxcbiAgICAgIFsvWzssLl0vLCBcImRlbGltaXRlclwiXSxcbiAgICAgIFsvXCIoW15cIlxcXFxdfFxcXFwuKSokLywgXCJzdHJpbmcuaW52YWxpZFwiXSxcbiAgICAgIFsvXCIvLCBcInN0cmluZ1wiLCBcIkBzdHJpbmdcIl1cbiAgICBdLFxuICAgIHdoaXRlc3BhY2U6IFtcbiAgICAgIFsvWyBcXHRcXHJcXG5dKy8sIFwiXCJdLFxuICAgICAgWy9cXC9cXCovLCBcImNvbW1lbnRcIiwgXCJAY29tbWVudFwiXSxcbiAgICAgIFsvXFwvXFwvLiokLywgXCJjb21tZW50XCJdXG4gICAgXSxcbiAgICBjb21tZW50OiBbXG4gICAgICBbL1teXFwvKl0rLywgXCJjb21tZW50XCJdLFxuICAgICAgWy9cXCpcXC8vLCBcImNvbW1lbnRcIiwgXCJAcG9wXCJdLFxuICAgICAgWy9bXFwvKl0vLCBcImNvbW1lbnRcIl1cbiAgICBdLFxuICAgIHN0cmluZzogW1xuICAgICAgWy9bXlxcXFxcIl0rLywgXCJzdHJpbmdcIl0sXG4gICAgICBbL0Blc2NhcGVzLywgXCJzdHJpbmcuZXNjYXBlXCJdLFxuICAgICAgWy9cXFxcLi8sIFwic3RyaW5nLmVzY2FwZS5pbnZhbGlkXCJdLFxuICAgICAgWy9cIi8sIFwic3RyaW5nXCIsIFwiQHBvcFwiXVxuICAgIF1cbiAgfVxufTtcbmV4cG9ydCB7XG4gIGNvbmYsXG4gIGxhbmd1YWdlXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///14188\n')}}]);