"use strict";(self.webpackChunkcollab_notes=self.webpackChunkcollab_notes||[]).push([[4129],{4129:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "conf": () => (/* binding */ conf),\n/* harmony export */   "language": () => (/* binding */ language)\n/* harmony export */ });\n/*!-----------------------------------------------------------------------------\n * Copyright (c) Microsoft Corporation. All rights reserved.\n * Version: 0.31.1(337587859b1c171314b40503171188b6cea6a32a)\n * Released under the MIT license\n * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt\n *-----------------------------------------------------------------------------*/\n\n// src/basic-languages/bat/bat.ts\nvar conf = {\n  comments: {\n    lineComment: "REM"\n  },\n  brackets: [\n    ["{", "}"],\n    ["[", "]"],\n    ["(", ")"]\n  ],\n  autoClosingPairs: [\n    { open: "{", close: "}" },\n    { open: "[", close: "]" },\n    { open: "(", close: ")" },\n    { open: \'"\', close: \'"\' }\n  ],\n  surroundingPairs: [\n    { open: "[", close: "]" },\n    { open: "(", close: ")" },\n    { open: \'"\', close: \'"\' }\n  ],\n  folding: {\n    markers: {\n      start: new RegExp("^\\\\s*(::\\\\s*|REM\\\\s+)#region"),\n      end: new RegExp("^\\\\s*(::\\\\s*|REM\\\\s+)#endregion")\n    }\n  }\n};\nvar language = {\n  defaultToken: "",\n  ignoreCase: true,\n  tokenPostfix: ".bat",\n  brackets: [\n    { token: "delimiter.bracket", open: "{", close: "}" },\n    { token: "delimiter.parenthesis", open: "(", close: ")" },\n    { token: "delimiter.square", open: "[", close: "]" }\n  ],\n  keywords: /call|defined|echo|errorlevel|exist|for|goto|if|pause|set|shift|start|title|not|pushd|popd/,\n  symbols: /[=><!~?&|+\\-*\\/\\^;\\.,]+/,\n  escapes: /\\\\(?:[abfnrtv\\\\"\']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,\n  tokenizer: {\n    root: [\n      [/^(\\s*)(rem(?:\\s.*|))$/, ["", "comment"]],\n      [/(\\@?)(@keywords)(?!\\w)/, [{ token: "keyword" }, { token: "keyword.$2" }]],\n      [/[ \\t\\r\\n]+/, ""],\n      [/setlocal(?!\\w)/, "keyword.tag-setlocal"],\n      [/endlocal(?!\\w)/, "keyword.tag-setlocal"],\n      [/[a-zA-Z_]\\w*/, ""],\n      [/:\\w*/, "metatag"],\n      [/%[^%]+%/, "variable"],\n      [/%%[\\w]+(?!\\w)/, "variable"],\n      [/[{}()\\[\\]]/, "@brackets"],\n      [/@symbols/, "delimiter"],\n      [/\\d*\\.\\d+([eE][\\-+]?\\d+)?/, "number.float"],\n      [/0[xX][0-9a-fA-F_]*[0-9a-fA-F]/, "number.hex"],\n      [/\\d+/, "number"],\n      [/[;,.]/, "delimiter"],\n      [/"/, "string", \'@string."\'],\n      [/\'/, "string", "@string.\'"]\n    ],\n    string: [\n      [\n        /[^\\\\"\'%]+/,\n        {\n          cases: {\n            "@eos": { token: "string", next: "@popall" },\n            "@default": "string"\n          }\n        }\n      ],\n      [/@escapes/, "string.escape"],\n      [/\\\\./, "string.escape.invalid"],\n      [/%[\\w ]+%/, "variable"],\n      [/%%[\\w]+(?!\\w)/, "variable"],\n      [\n        /["\']/,\n        {\n          cases: {\n            "$#==$S2": { token: "string", next: "@pop" },\n            "@default": "string"\n          }\n        }\n      ],\n      [/$/, "string", "@popall"]\n    ]\n  }\n};\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNDEyOS5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLE9BQU8sS0FBSztBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxRQUFRLFlBQVksR0FBRztBQUM3QixNQUFNLHVCQUF1QjtBQUM3QixNQUFNLHVCQUF1QjtBQUM3QixNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU0sdUJBQXVCO0FBQzdCLE1BQU0sdUJBQXVCO0FBQzdCLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sb0NBQW9DLFlBQVksR0FBRztBQUN6RCxNQUFNLHVEQUF1RDtBQUM3RCxNQUFNO0FBQ047QUFDQTtBQUNBLDhCQUE4QjtBQUM5Qiw0Q0FBNEMsSUFBSSxjQUFjLEVBQUUsY0FBYyxFQUFFO0FBQ2hGO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxrQkFBa0IsSUFBSSxxQkFBcUI7QUFDL0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixrQ0FBa0M7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLCtCQUErQjtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb2xsYWItbm90ZXMvLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL2JhdC9iYXQuanM/ZWVjZCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBWZXJzaW9uOiAwLjMxLjEoMzM3NTg3ODU5YjFjMTcxMzE0YjQwNTAzMTcxMTg4YjZjZWE2YTMyYSlcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICogaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9tb25hY28tZWRpdG9yL2Jsb2IvbWFpbi9MSUNFTlNFLnR4dFxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8vIHNyYy9iYXNpYy1sYW5ndWFnZXMvYmF0L2JhdC50c1xudmFyIGNvbmYgPSB7XG4gIGNvbW1lbnRzOiB7XG4gICAgbGluZUNvbW1lbnQ6IFwiUkVNXCJcbiAgfSxcbiAgYnJhY2tldHM6IFtcbiAgICBbXCJ7XCIsIFwifVwiXSxcbiAgICBbXCJbXCIsIFwiXVwiXSxcbiAgICBbXCIoXCIsIFwiKVwiXVxuICBdLFxuICBhdXRvQ2xvc2luZ1BhaXJzOiBbXG4gICAgeyBvcGVuOiBcIntcIiwgY2xvc2U6IFwifVwiIH0sXG4gICAgeyBvcGVuOiBcIltcIiwgY2xvc2U6IFwiXVwiIH0sXG4gICAgeyBvcGVuOiBcIihcIiwgY2xvc2U6IFwiKVwiIH0sXG4gICAgeyBvcGVuOiAnXCInLCBjbG9zZTogJ1wiJyB9XG4gIF0sXG4gIHN1cnJvdW5kaW5nUGFpcnM6IFtcbiAgICB7IG9wZW46IFwiW1wiLCBjbG9zZTogXCJdXCIgfSxcbiAgICB7IG9wZW46IFwiKFwiLCBjbG9zZTogXCIpXCIgfSxcbiAgICB7IG9wZW46ICdcIicsIGNsb3NlOiAnXCInIH1cbiAgXSxcbiAgZm9sZGluZzoge1xuICAgIG1hcmtlcnM6IHtcbiAgICAgIHN0YXJ0OiBuZXcgUmVnRXhwKFwiXlxcXFxzKig6OlxcXFxzKnxSRU1cXFxccyspI3JlZ2lvblwiKSxcbiAgICAgIGVuZDogbmV3IFJlZ0V4cChcIl5cXFxccyooOjpcXFxccyp8UkVNXFxcXHMrKSNlbmRyZWdpb25cIilcbiAgICB9XG4gIH1cbn07XG52YXIgbGFuZ3VhZ2UgPSB7XG4gIGRlZmF1bHRUb2tlbjogXCJcIixcbiAgaWdub3JlQ2FzZTogdHJ1ZSxcbiAgdG9rZW5Qb3N0Zml4OiBcIi5iYXRcIixcbiAgYnJhY2tldHM6IFtcbiAgICB7IHRva2VuOiBcImRlbGltaXRlci5icmFja2V0XCIsIG9wZW46IFwie1wiLCBjbG9zZTogXCJ9XCIgfSxcbiAgICB7IHRva2VuOiBcImRlbGltaXRlci5wYXJlbnRoZXNpc1wiLCBvcGVuOiBcIihcIiwgY2xvc2U6IFwiKVwiIH0sXG4gICAgeyB0b2tlbjogXCJkZWxpbWl0ZXIuc3F1YXJlXCIsIG9wZW46IFwiW1wiLCBjbG9zZTogXCJdXCIgfVxuICBdLFxuICBrZXl3b3JkczogL2NhbGx8ZGVmaW5lZHxlY2hvfGVycm9ybGV2ZWx8ZXhpc3R8Zm9yfGdvdG98aWZ8cGF1c2V8c2V0fHNoaWZ0fHN0YXJ0fHRpdGxlfG5vdHxwdXNoZHxwb3BkLyxcbiAgc3ltYm9sczogL1s9Pjwhfj8mfCtcXC0qXFwvXFxeO1xcLixdKy8sXG4gIGVzY2FwZXM6IC9cXFxcKD86W2FiZm5ydHZcXFxcXCInXXx4WzAtOUEtRmEtZl17MSw0fXx1WzAtOUEtRmEtZl17NH18VVswLTlBLUZhLWZdezh9KS8sXG4gIHRva2VuaXplcjoge1xuICAgIHJvb3Q6IFtcbiAgICAgIFsvXihcXHMqKShyZW0oPzpcXHMuKnwpKSQvLCBbXCJcIiwgXCJjb21tZW50XCJdXSxcbiAgICAgIFsvKFxcQD8pKEBrZXl3b3JkcykoPyFcXHcpLywgW3sgdG9rZW46IFwia2V5d29yZFwiIH0sIHsgdG9rZW46IFwia2V5d29yZC4kMlwiIH1dXSxcbiAgICAgIFsvWyBcXHRcXHJcXG5dKy8sIFwiXCJdLFxuICAgICAgWy9zZXRsb2NhbCg/IVxcdykvLCBcImtleXdvcmQudGFnLXNldGxvY2FsXCJdLFxuICAgICAgWy9lbmRsb2NhbCg/IVxcdykvLCBcImtleXdvcmQudGFnLXNldGxvY2FsXCJdLFxuICAgICAgWy9bYS16QS1aX11cXHcqLywgXCJcIl0sXG4gICAgICBbLzpcXHcqLywgXCJtZXRhdGFnXCJdLFxuICAgICAgWy8lW14lXSslLywgXCJ2YXJpYWJsZVwiXSxcbiAgICAgIFsvJSVbXFx3XSsoPyFcXHcpLywgXCJ2YXJpYWJsZVwiXSxcbiAgICAgIFsvW3t9KClcXFtcXF1dLywgXCJAYnJhY2tldHNcIl0sXG4gICAgICBbL0BzeW1ib2xzLywgXCJkZWxpbWl0ZXJcIl0sXG4gICAgICBbL1xcZCpcXC5cXGQrKFtlRV1bXFwtK10/XFxkKyk/LywgXCJudW1iZXIuZmxvYXRcIl0sXG4gICAgICBbLzBbeFhdWzAtOWEtZkEtRl9dKlswLTlhLWZBLUZdLywgXCJudW1iZXIuaGV4XCJdLFxuICAgICAgWy9cXGQrLywgXCJudW1iZXJcIl0sXG4gICAgICBbL1s7LC5dLywgXCJkZWxpbWl0ZXJcIl0sXG4gICAgICBbL1wiLywgXCJzdHJpbmdcIiwgJ0BzdHJpbmcuXCInXSxcbiAgICAgIFsvJy8sIFwic3RyaW5nXCIsIFwiQHN0cmluZy4nXCJdXG4gICAgXSxcbiAgICBzdHJpbmc6IFtcbiAgICAgIFtcbiAgICAgICAgL1teXFxcXFwiJyVdKy8sXG4gICAgICAgIHtcbiAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgXCJAZW9zXCI6IHsgdG9rZW46IFwic3RyaW5nXCIsIG5leHQ6IFwiQHBvcGFsbFwiIH0sXG4gICAgICAgICAgICBcIkBkZWZhdWx0XCI6IFwic3RyaW5nXCJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBbL0Blc2NhcGVzLywgXCJzdHJpbmcuZXNjYXBlXCJdLFxuICAgICAgWy9cXFxcLi8sIFwic3RyaW5nLmVzY2FwZS5pbnZhbGlkXCJdLFxuICAgICAgWy8lW1xcdyBdKyUvLCBcInZhcmlhYmxlXCJdLFxuICAgICAgWy8lJVtcXHddKyg/IVxcdykvLCBcInZhcmlhYmxlXCJdLFxuICAgICAgW1xuICAgICAgICAvW1wiJ10vLFxuICAgICAgICB7XG4gICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgIFwiJCM9PSRTMlwiOiB7IHRva2VuOiBcInN0cmluZ1wiLCBuZXh0OiBcIkBwb3BcIiB9LFxuICAgICAgICAgICAgXCJAZGVmYXVsdFwiOiBcInN0cmluZ1wiXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgWy8kLywgXCJzdHJpbmdcIiwgXCJAcG9wYWxsXCJdXG4gICAgXVxuICB9XG59O1xuZXhwb3J0IHtcbiAgY29uZixcbiAgbGFuZ3VhZ2Vcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///4129\n')}}]);