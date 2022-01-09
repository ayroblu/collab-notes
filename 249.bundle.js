"use strict";(self.webpackChunkcollab_notes=self.webpackChunkcollab_notes||[]).push([[249],{249:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "conf": () => (/* binding */ conf),\n/* harmony export */   "language": () => (/* binding */ language)\n/* harmony export */ });\n/*!-----------------------------------------------------------------------------\n * Copyright (c) Microsoft Corporation. All rights reserved.\n * Version: 0.31.1(337587859b1c171314b40503171188b6cea6a32a)\n * Released under the MIT license\n * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt\n *-----------------------------------------------------------------------------*/\n\n// src/basic-languages/go/go.ts\nvar conf = {\n  comments: {\n    lineComment: "//",\n    blockComment: ["/*", "*/"]\n  },\n  brackets: [\n    ["{", "}"],\n    ["[", "]"],\n    ["(", ")"]\n  ],\n  autoClosingPairs: [\n    { open: "{", close: "}" },\n    { open: "[", close: "]" },\n    { open: "(", close: ")" },\n    { open: "`", close: "`", notIn: ["string"] },\n    { open: \'"\', close: \'"\', notIn: ["string"] },\n    { open: "\'", close: "\'", notIn: ["string", "comment"] }\n  ],\n  surroundingPairs: [\n    { open: "{", close: "}" },\n    { open: "[", close: "]" },\n    { open: "(", close: ")" },\n    { open: "`", close: "`" },\n    { open: \'"\', close: \'"\' },\n    { open: "\'", close: "\'" }\n  ]\n};\nvar language = {\n  defaultToken: "",\n  tokenPostfix: ".go",\n  keywords: [\n    "break",\n    "case",\n    "chan",\n    "const",\n    "continue",\n    "default",\n    "defer",\n    "else",\n    "fallthrough",\n    "for",\n    "func",\n    "go",\n    "goto",\n    "if",\n    "import",\n    "interface",\n    "map",\n    "package",\n    "range",\n    "return",\n    "select",\n    "struct",\n    "switch",\n    "type",\n    "var",\n    "bool",\n    "true",\n    "false",\n    "uint8",\n    "uint16",\n    "uint32",\n    "uint64",\n    "int8",\n    "int16",\n    "int32",\n    "int64",\n    "float32",\n    "float64",\n    "complex64",\n    "complex128",\n    "byte",\n    "rune",\n    "uint",\n    "int",\n    "uintptr",\n    "string",\n    "nil"\n  ],\n  operators: [\n    "+",\n    "-",\n    "*",\n    "/",\n    "%",\n    "&",\n    "|",\n    "^",\n    "<<",\n    ">>",\n    "&^",\n    "+=",\n    "-=",\n    "*=",\n    "/=",\n    "%=",\n    "&=",\n    "|=",\n    "^=",\n    "<<=",\n    ">>=",\n    "&^=",\n    "&&",\n    "||",\n    "<-",\n    "++",\n    "--",\n    "==",\n    "<",\n    ">",\n    "=",\n    "!",\n    "!=",\n    "<=",\n    ">=",\n    ":=",\n    "...",\n    "(",\n    ")",\n    "",\n    "]",\n    "{",\n    "}",\n    ",",\n    ";",\n    ".",\n    ":"\n  ],\n  symbols: /[=><!~?:&|+\\-*\\/\\^%]+/,\n  escapes: /\\\\(?:[abfnrtv\\\\"\']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,\n  tokenizer: {\n    root: [\n      [\n        /[a-zA-Z_]\\w*/,\n        {\n          cases: {\n            "@keywords": { token: "keyword.$0" },\n            "@default": "identifier"\n          }\n        }\n      ],\n      { include: "@whitespace" },\n      [/\\[\\[.*\\]\\]/, "annotation"],\n      [/^\\s*#\\w+/, "keyword"],\n      [/[{}()\\[\\]]/, "@brackets"],\n      [/[<>](?!@symbols)/, "@brackets"],\n      [\n        /@symbols/,\n        {\n          cases: {\n            "@operators": "delimiter",\n            "@default": ""\n          }\n        }\n      ],\n      [/\\d*\\d+[eE]([\\-+]?\\d+)?/, "number.float"],\n      [/\\d*\\.\\d+([eE][\\-+]?\\d+)?/, "number.float"],\n      [/0[xX][0-9a-fA-F\']*[0-9a-fA-F]/, "number.hex"],\n      [/0[0-7\']*[0-7]/, "number.octal"],\n      [/0[bB][0-1\']*[0-1]/, "number.binary"],\n      [/\\d[\\d\']*/, "number"],\n      [/\\d/, "number"],\n      [/[;,.]/, "delimiter"],\n      [/"([^"\\\\]|\\\\.)*$/, "string.invalid"],\n      [/"/, "string", "@string"],\n      [/`/, "string", "@rawstring"],\n      [/\'[^\\\\\']\'/, "string"],\n      [/(\')(@escapes)(\')/, ["string", "string.escape", "string"]],\n      [/\'/, "string.invalid"]\n    ],\n    whitespace: [\n      [/[ \\t\\r\\n]+/, ""],\n      [/\\/\\*\\*(?!\\/)/, "comment.doc", "@doccomment"],\n      [/\\/\\*/, "comment", "@comment"],\n      [/\\/\\/.*$/, "comment"]\n    ],\n    comment: [\n      [/[^\\/*]+/, "comment"],\n      [/\\*\\//, "comment", "@pop"],\n      [/[\\/*]/, "comment"]\n    ],\n    doccomment: [\n      [/[^\\/*]+/, "comment.doc"],\n      [/\\/\\*/, "comment.doc.invalid"],\n      [/\\*\\//, "comment.doc", "@pop"],\n      [/[\\/*]/, "comment.doc"]\n    ],\n    string: [\n      [/[^\\\\"]+/, "string"],\n      [/@escapes/, "string.escape"],\n      [/\\\\./, "string.escape.invalid"],\n      [/"/, "string", "@pop"]\n    ],\n    rawstring: [\n      [/[^\\`]/, "string"],\n      [/`/, "string", "@pop"]\n    ]\n  }\n};\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjQ5LmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxPQUFPLEtBQUs7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sUUFBUSxZQUFZLEdBQUc7QUFDN0IsTUFBTSx1QkFBdUI7QUFDN0IsTUFBTSx1QkFBdUI7QUFDN0IsTUFBTSwwQ0FBMEM7QUFDaEQsTUFBTSwwQ0FBMEM7QUFDaEQsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNLFFBQVEsWUFBWSxHQUFHO0FBQzdCLE1BQU0sdUJBQXVCO0FBQzdCLE1BQU0sdUJBQXVCO0FBQzdCLE1BQU0sdUJBQXVCO0FBQzdCLE1BQU0sdUJBQXVCO0FBQzdCLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLElBQUksY0FBYyxFQUFFLGNBQWMsRUFBRTtBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIscUJBQXFCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSx3QkFBd0I7QUFDaEM7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY29sbGFiLW5vdGVzLy4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2Jhc2ljLWxhbmd1YWdlcy9nby9nby5qcz85NDcwIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFZlcnNpb246IDAuMzEuMSgzMzc1ODc4NTliMWMxNzEzMTRiNDA1MDMxNzExODhiNmNlYTZhMzJhKVxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L21vbmFjby1lZGl0b3IvYmxvYi9tYWluL0xJQ0VOU0UudHh0XG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLy8gc3JjL2Jhc2ljLWxhbmd1YWdlcy9nby9nby50c1xudmFyIGNvbmYgPSB7XG4gIGNvbW1lbnRzOiB7XG4gICAgbGluZUNvbW1lbnQ6IFwiLy9cIixcbiAgICBibG9ja0NvbW1lbnQ6IFtcIi8qXCIsIFwiKi9cIl1cbiAgfSxcbiAgYnJhY2tldHM6IFtcbiAgICBbXCJ7XCIsIFwifVwiXSxcbiAgICBbXCJbXCIsIFwiXVwiXSxcbiAgICBbXCIoXCIsIFwiKVwiXVxuICBdLFxuICBhdXRvQ2xvc2luZ1BhaXJzOiBbXG4gICAgeyBvcGVuOiBcIntcIiwgY2xvc2U6IFwifVwiIH0sXG4gICAgeyBvcGVuOiBcIltcIiwgY2xvc2U6IFwiXVwiIH0sXG4gICAgeyBvcGVuOiBcIihcIiwgY2xvc2U6IFwiKVwiIH0sXG4gICAgeyBvcGVuOiBcImBcIiwgY2xvc2U6IFwiYFwiLCBub3RJbjogW1wic3RyaW5nXCJdIH0sXG4gICAgeyBvcGVuOiAnXCInLCBjbG9zZTogJ1wiJywgbm90SW46IFtcInN0cmluZ1wiXSB9LFxuICAgIHsgb3BlbjogXCInXCIsIGNsb3NlOiBcIidcIiwgbm90SW46IFtcInN0cmluZ1wiLCBcImNvbW1lbnRcIl0gfVxuICBdLFxuICBzdXJyb3VuZGluZ1BhaXJzOiBbXG4gICAgeyBvcGVuOiBcIntcIiwgY2xvc2U6IFwifVwiIH0sXG4gICAgeyBvcGVuOiBcIltcIiwgY2xvc2U6IFwiXVwiIH0sXG4gICAgeyBvcGVuOiBcIihcIiwgY2xvc2U6IFwiKVwiIH0sXG4gICAgeyBvcGVuOiBcImBcIiwgY2xvc2U6IFwiYFwiIH0sXG4gICAgeyBvcGVuOiAnXCInLCBjbG9zZTogJ1wiJyB9LFxuICAgIHsgb3BlbjogXCInXCIsIGNsb3NlOiBcIidcIiB9XG4gIF1cbn07XG52YXIgbGFuZ3VhZ2UgPSB7XG4gIGRlZmF1bHRUb2tlbjogXCJcIixcbiAgdG9rZW5Qb3N0Zml4OiBcIi5nb1wiLFxuICBrZXl3b3JkczogW1xuICAgIFwiYnJlYWtcIixcbiAgICBcImNhc2VcIixcbiAgICBcImNoYW5cIixcbiAgICBcImNvbnN0XCIsXG4gICAgXCJjb250aW51ZVwiLFxuICAgIFwiZGVmYXVsdFwiLFxuICAgIFwiZGVmZXJcIixcbiAgICBcImVsc2VcIixcbiAgICBcImZhbGx0aHJvdWdoXCIsXG4gICAgXCJmb3JcIixcbiAgICBcImZ1bmNcIixcbiAgICBcImdvXCIsXG4gICAgXCJnb3RvXCIsXG4gICAgXCJpZlwiLFxuICAgIFwiaW1wb3J0XCIsXG4gICAgXCJpbnRlcmZhY2VcIixcbiAgICBcIm1hcFwiLFxuICAgIFwicGFja2FnZVwiLFxuICAgIFwicmFuZ2VcIixcbiAgICBcInJldHVyblwiLFxuICAgIFwic2VsZWN0XCIsXG4gICAgXCJzdHJ1Y3RcIixcbiAgICBcInN3aXRjaFwiLFxuICAgIFwidHlwZVwiLFxuICAgIFwidmFyXCIsXG4gICAgXCJib29sXCIsXG4gICAgXCJ0cnVlXCIsXG4gICAgXCJmYWxzZVwiLFxuICAgIFwidWludDhcIixcbiAgICBcInVpbnQxNlwiLFxuICAgIFwidWludDMyXCIsXG4gICAgXCJ1aW50NjRcIixcbiAgICBcImludDhcIixcbiAgICBcImludDE2XCIsXG4gICAgXCJpbnQzMlwiLFxuICAgIFwiaW50NjRcIixcbiAgICBcImZsb2F0MzJcIixcbiAgICBcImZsb2F0NjRcIixcbiAgICBcImNvbXBsZXg2NFwiLFxuICAgIFwiY29tcGxleDEyOFwiLFxuICAgIFwiYnl0ZVwiLFxuICAgIFwicnVuZVwiLFxuICAgIFwidWludFwiLFxuICAgIFwiaW50XCIsXG4gICAgXCJ1aW50cHRyXCIsXG4gICAgXCJzdHJpbmdcIixcbiAgICBcIm5pbFwiXG4gIF0sXG4gIG9wZXJhdG9yczogW1xuICAgIFwiK1wiLFxuICAgIFwiLVwiLFxuICAgIFwiKlwiLFxuICAgIFwiL1wiLFxuICAgIFwiJVwiLFxuICAgIFwiJlwiLFxuICAgIFwifFwiLFxuICAgIFwiXlwiLFxuICAgIFwiPDxcIixcbiAgICBcIj4+XCIsXG4gICAgXCImXlwiLFxuICAgIFwiKz1cIixcbiAgICBcIi09XCIsXG4gICAgXCIqPVwiLFxuICAgIFwiLz1cIixcbiAgICBcIiU9XCIsXG4gICAgXCImPVwiLFxuICAgIFwifD1cIixcbiAgICBcIl49XCIsXG4gICAgXCI8PD1cIixcbiAgICBcIj4+PVwiLFxuICAgIFwiJl49XCIsXG4gICAgXCImJlwiLFxuICAgIFwifHxcIixcbiAgICBcIjwtXCIsXG4gICAgXCIrK1wiLFxuICAgIFwiLS1cIixcbiAgICBcIj09XCIsXG4gICAgXCI8XCIsXG4gICAgXCI+XCIsXG4gICAgXCI9XCIsXG4gICAgXCIhXCIsXG4gICAgXCIhPVwiLFxuICAgIFwiPD1cIixcbiAgICBcIj49XCIsXG4gICAgXCI6PVwiLFxuICAgIFwiLi4uXCIsXG4gICAgXCIoXCIsXG4gICAgXCIpXCIsXG4gICAgXCJcIixcbiAgICBcIl1cIixcbiAgICBcIntcIixcbiAgICBcIn1cIixcbiAgICBcIixcIixcbiAgICBcIjtcIixcbiAgICBcIi5cIixcbiAgICBcIjpcIlxuICBdLFxuICBzeW1ib2xzOiAvWz0+PCF+PzomfCtcXC0qXFwvXFxeJV0rLyxcbiAgZXNjYXBlczogL1xcXFwoPzpbYWJmbnJ0dlxcXFxcIiddfHhbMC05QS1GYS1mXXsxLDR9fHVbMC05QS1GYS1mXXs0fXxVWzAtOUEtRmEtZl17OH0pLyxcbiAgdG9rZW5pemVyOiB7XG4gICAgcm9vdDogW1xuICAgICAgW1xuICAgICAgICAvW2EtekEtWl9dXFx3Ki8sXG4gICAgICAgIHtcbiAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgXCJAa2V5d29yZHNcIjogeyB0b2tlbjogXCJrZXl3b3JkLiQwXCIgfSxcbiAgICAgICAgICAgIFwiQGRlZmF1bHRcIjogXCJpZGVudGlmaWVyXCJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICB7IGluY2x1ZGU6IFwiQHdoaXRlc3BhY2VcIiB9LFxuICAgICAgWy9cXFtcXFsuKlxcXVxcXS8sIFwiYW5ub3RhdGlvblwiXSxcbiAgICAgIFsvXlxccyojXFx3Ky8sIFwia2V5d29yZFwiXSxcbiAgICAgIFsvW3t9KClcXFtcXF1dLywgXCJAYnJhY2tldHNcIl0sXG4gICAgICBbL1s8Pl0oPyFAc3ltYm9scykvLCBcIkBicmFja2V0c1wiXSxcbiAgICAgIFtcbiAgICAgICAgL0BzeW1ib2xzLyxcbiAgICAgICAge1xuICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICBcIkBvcGVyYXRvcnNcIjogXCJkZWxpbWl0ZXJcIixcbiAgICAgICAgICAgIFwiQGRlZmF1bHRcIjogXCJcIlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIFsvXFxkKlxcZCtbZUVdKFtcXC0rXT9cXGQrKT8vLCBcIm51bWJlci5mbG9hdFwiXSxcbiAgICAgIFsvXFxkKlxcLlxcZCsoW2VFXVtcXC0rXT9cXGQrKT8vLCBcIm51bWJlci5mbG9hdFwiXSxcbiAgICAgIFsvMFt4WF1bMC05YS1mQS1GJ10qWzAtOWEtZkEtRl0vLCBcIm51bWJlci5oZXhcIl0sXG4gICAgICBbLzBbMC03J10qWzAtN10vLCBcIm51bWJlci5vY3RhbFwiXSxcbiAgICAgIFsvMFtiQl1bMC0xJ10qWzAtMV0vLCBcIm51bWJlci5iaW5hcnlcIl0sXG4gICAgICBbL1xcZFtcXGQnXSovLCBcIm51bWJlclwiXSxcbiAgICAgIFsvXFxkLywgXCJudW1iZXJcIl0sXG4gICAgICBbL1s7LC5dLywgXCJkZWxpbWl0ZXJcIl0sXG4gICAgICBbL1wiKFteXCJcXFxcXXxcXFxcLikqJC8sIFwic3RyaW5nLmludmFsaWRcIl0sXG4gICAgICBbL1wiLywgXCJzdHJpbmdcIiwgXCJAc3RyaW5nXCJdLFxuICAgICAgWy9gLywgXCJzdHJpbmdcIiwgXCJAcmF3c3RyaW5nXCJdLFxuICAgICAgWy8nW15cXFxcJ10nLywgXCJzdHJpbmdcIl0sXG4gICAgICBbLygnKShAZXNjYXBlcykoJykvLCBbXCJzdHJpbmdcIiwgXCJzdHJpbmcuZXNjYXBlXCIsIFwic3RyaW5nXCJdXSxcbiAgICAgIFsvJy8sIFwic3RyaW5nLmludmFsaWRcIl1cbiAgICBdLFxuICAgIHdoaXRlc3BhY2U6IFtcbiAgICAgIFsvWyBcXHRcXHJcXG5dKy8sIFwiXCJdLFxuICAgICAgWy9cXC9cXCpcXCooPyFcXC8pLywgXCJjb21tZW50LmRvY1wiLCBcIkBkb2Njb21tZW50XCJdLFxuICAgICAgWy9cXC9cXCovLCBcImNvbW1lbnRcIiwgXCJAY29tbWVudFwiXSxcbiAgICAgIFsvXFwvXFwvLiokLywgXCJjb21tZW50XCJdXG4gICAgXSxcbiAgICBjb21tZW50OiBbXG4gICAgICBbL1teXFwvKl0rLywgXCJjb21tZW50XCJdLFxuICAgICAgWy9cXCpcXC8vLCBcImNvbW1lbnRcIiwgXCJAcG9wXCJdLFxuICAgICAgWy9bXFwvKl0vLCBcImNvbW1lbnRcIl1cbiAgICBdLFxuICAgIGRvY2NvbW1lbnQ6IFtcbiAgICAgIFsvW15cXC8qXSsvLCBcImNvbW1lbnQuZG9jXCJdLFxuICAgICAgWy9cXC9cXCovLCBcImNvbW1lbnQuZG9jLmludmFsaWRcIl0sXG4gICAgICBbL1xcKlxcLy8sIFwiY29tbWVudC5kb2NcIiwgXCJAcG9wXCJdLFxuICAgICAgWy9bXFwvKl0vLCBcImNvbW1lbnQuZG9jXCJdXG4gICAgXSxcbiAgICBzdHJpbmc6IFtcbiAgICAgIFsvW15cXFxcXCJdKy8sIFwic3RyaW5nXCJdLFxuICAgICAgWy9AZXNjYXBlcy8sIFwic3RyaW5nLmVzY2FwZVwiXSxcbiAgICAgIFsvXFxcXC4vLCBcInN0cmluZy5lc2NhcGUuaW52YWxpZFwiXSxcbiAgICAgIFsvXCIvLCBcInN0cmluZ1wiLCBcIkBwb3BcIl1cbiAgICBdLFxuICAgIHJhd3N0cmluZzogW1xuICAgICAgWy9bXlxcYF0vLCBcInN0cmluZ1wiXSxcbiAgICAgIFsvYC8sIFwic3RyaW5nXCIsIFwiQHBvcFwiXVxuICAgIF1cbiAgfVxufTtcbmV4cG9ydCB7XG4gIGNvbmYsXG4gIGxhbmd1YWdlXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///249\n')}}]);