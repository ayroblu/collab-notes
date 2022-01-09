"use strict";(self.webpackChunkcollab_notes=self.webpackChunkcollab_notes||[]).push([[6489],{6489:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "conf": () => (/* binding */ conf),\n/* harmony export */   "language": () => (/* binding */ language)\n/* harmony export */ });\n/*!-----------------------------------------------------------------------------\n * Copyright (c) Microsoft Corporation. All rights reserved.\n * Version: 0.31.1(337587859b1c171314b40503171188b6cea6a32a)\n * Released under the MIT license\n * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt\n *-----------------------------------------------------------------------------*/\n\n// src/basic-languages/graphql/graphql.ts\nvar conf = {\n  comments: {\n    lineComment: "#"\n  },\n  brackets: [\n    ["{", "}"],\n    ["[", "]"],\n    ["(", ")"]\n  ],\n  autoClosingPairs: [\n    { open: "{", close: "}" },\n    { open: "[", close: "]" },\n    { open: "(", close: ")" },\n    { open: \'"""\', close: \'"""\', notIn: ["string", "comment"] },\n    { open: \'"\', close: \'"\', notIn: ["string", "comment"] }\n  ],\n  surroundingPairs: [\n    { open: "{", close: "}" },\n    { open: "[", close: "]" },\n    { open: "(", close: ")" },\n    { open: \'"""\', close: \'"""\' },\n    { open: \'"\', close: \'"\' }\n  ],\n  folding: {\n    offSide: true\n  }\n};\nvar language = {\n  defaultToken: "invalid",\n  tokenPostfix: ".gql",\n  keywords: [\n    "null",\n    "true",\n    "false",\n    "query",\n    "mutation",\n    "subscription",\n    "extend",\n    "schema",\n    "directive",\n    "scalar",\n    "type",\n    "interface",\n    "union",\n    "enum",\n    "input",\n    "implements",\n    "fragment",\n    "on"\n  ],\n  typeKeywords: ["Int", "Float", "String", "Boolean", "ID"],\n  directiveLocations: [\n    "SCHEMA",\n    "SCALAR",\n    "OBJECT",\n    "FIELD_DEFINITION",\n    "ARGUMENT_DEFINITION",\n    "INTERFACE",\n    "UNION",\n    "ENUM",\n    "ENUM_VALUE",\n    "INPUT_OBJECT",\n    "INPUT_FIELD_DEFINITION",\n    "QUERY",\n    "MUTATION",\n    "SUBSCRIPTION",\n    "FIELD",\n    "FRAGMENT_DEFINITION",\n    "FRAGMENT_SPREAD",\n    "INLINE_FRAGMENT",\n    "VARIABLE_DEFINITION"\n  ],\n  operators: ["=", "!", "?", ":", "&", "|"],\n  symbols: /[=!?:&|]+/,\n  escapes: /\\\\(?:["\\\\\\/bfnrt]|u[0-9A-Fa-f]{4})/,\n  tokenizer: {\n    root: [\n      [\n        /[a-z_][\\w$]*/,\n        {\n          cases: {\n            "@keywords": "keyword",\n            "@default": "key.identifier"\n          }\n        }\n      ],\n      [\n        /[$][\\w$]*/,\n        {\n          cases: {\n            "@keywords": "keyword",\n            "@default": "argument.identifier"\n          }\n        }\n      ],\n      [\n        /[A-Z][\\w\\$]*/,\n        {\n          cases: {\n            "@typeKeywords": "keyword",\n            "@default": "type.identifier"\n          }\n        }\n      ],\n      { include: "@whitespace" },\n      [/[{}()\\[\\]]/, "@brackets"],\n      [/@symbols/, { cases: { "@operators": "operator", "@default": "" } }],\n      [/@\\s*[a-zA-Z_\\$][\\w\\$]*/, { token: "annotation", log: "annotation token: $0" }],\n      [/\\d*\\.\\d+([eE][\\-+]?\\d+)?/, "number.float"],\n      [/0[xX][0-9a-fA-F]+/, "number.hex"],\n      [/\\d+/, "number"],\n      [/[;,.]/, "delimiter"],\n      [/"""/, { token: "string", next: "@mlstring", nextEmbedded: "markdown" }],\n      [/"([^"\\\\]|\\\\.)*$/, "string.invalid"],\n      [/"/, { token: "string.quote", bracket: "@open", next: "@string" }]\n    ],\n    mlstring: [\n      [/[^"]+/, "string"],\n      [\'"""\', { token: "string", next: "@pop", nextEmbedded: "@pop" }]\n    ],\n    string: [\n      [/[^\\\\"]+/, "string"],\n      [/@escapes/, "string.escape"],\n      [/\\\\./, "string.escape.invalid"],\n      [/"/, { token: "string.quote", bracket: "@close", next: "@pop" }]\n    ],\n    whitespace: [\n      [/[ \\t\\r\\n]+/, ""],\n      [/#.*$/, "comment"]\n    ]\n  }\n};\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNjQ4OS5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLE9BQU8sS0FBSztBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxRQUFRLFlBQVksR0FBRztBQUM3QixNQUFNLHVCQUF1QjtBQUM3QixNQUFNLHVCQUF1QjtBQUM3QixNQUFNLHlEQUF5RDtBQUMvRCxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU0sUUFBUSxZQUFZLEdBQUc7QUFDN0IsTUFBTSx1QkFBdUI7QUFDN0IsTUFBTSx1QkFBdUI7QUFDN0IsTUFBTSwyQkFBMkI7QUFDakMsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLEVBQUU7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsd0JBQXdCO0FBQ2hDLFdBQVc7QUFDWCxxQkFBcUIsU0FBUyw0Q0FBNEM7QUFDMUUsbUNBQW1DLGtEQUFrRDtBQUNyRjtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsZ0JBQWdCLDhEQUE4RDtBQUM5RTtBQUNBLGNBQWMsMERBQTBEO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixxREFBcUQ7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsd0RBQXdEO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb2xsYWItbm90ZXMvLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL2dyYXBocWwvZ3JhcGhxbC5qcz8xMjBlIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFZlcnNpb246IDAuMzEuMSgzMzc1ODc4NTliMWMxNzEzMTRiNDA1MDMxNzExODhiNmNlYTZhMzJhKVxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L21vbmFjby1lZGl0b3IvYmxvYi9tYWluL0xJQ0VOU0UudHh0XG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLy8gc3JjL2Jhc2ljLWxhbmd1YWdlcy9ncmFwaHFsL2dyYXBocWwudHNcbnZhciBjb25mID0ge1xuICBjb21tZW50czoge1xuICAgIGxpbmVDb21tZW50OiBcIiNcIlxuICB9LFxuICBicmFja2V0czogW1xuICAgIFtcIntcIiwgXCJ9XCJdLFxuICAgIFtcIltcIiwgXCJdXCJdLFxuICAgIFtcIihcIiwgXCIpXCJdXG4gIF0sXG4gIGF1dG9DbG9zaW5nUGFpcnM6IFtcbiAgICB7IG9wZW46IFwie1wiLCBjbG9zZTogXCJ9XCIgfSxcbiAgICB7IG9wZW46IFwiW1wiLCBjbG9zZTogXCJdXCIgfSxcbiAgICB7IG9wZW46IFwiKFwiLCBjbG9zZTogXCIpXCIgfSxcbiAgICB7IG9wZW46ICdcIlwiXCInLCBjbG9zZTogJ1wiXCJcIicsIG5vdEluOiBbXCJzdHJpbmdcIiwgXCJjb21tZW50XCJdIH0sXG4gICAgeyBvcGVuOiAnXCInLCBjbG9zZTogJ1wiJywgbm90SW46IFtcInN0cmluZ1wiLCBcImNvbW1lbnRcIl0gfVxuICBdLFxuICBzdXJyb3VuZGluZ1BhaXJzOiBbXG4gICAgeyBvcGVuOiBcIntcIiwgY2xvc2U6IFwifVwiIH0sXG4gICAgeyBvcGVuOiBcIltcIiwgY2xvc2U6IFwiXVwiIH0sXG4gICAgeyBvcGVuOiBcIihcIiwgY2xvc2U6IFwiKVwiIH0sXG4gICAgeyBvcGVuOiAnXCJcIlwiJywgY2xvc2U6ICdcIlwiXCInIH0sXG4gICAgeyBvcGVuOiAnXCInLCBjbG9zZTogJ1wiJyB9XG4gIF0sXG4gIGZvbGRpbmc6IHtcbiAgICBvZmZTaWRlOiB0cnVlXG4gIH1cbn07XG52YXIgbGFuZ3VhZ2UgPSB7XG4gIGRlZmF1bHRUb2tlbjogXCJpbnZhbGlkXCIsXG4gIHRva2VuUG9zdGZpeDogXCIuZ3FsXCIsXG4gIGtleXdvcmRzOiBbXG4gICAgXCJudWxsXCIsXG4gICAgXCJ0cnVlXCIsXG4gICAgXCJmYWxzZVwiLFxuICAgIFwicXVlcnlcIixcbiAgICBcIm11dGF0aW9uXCIsXG4gICAgXCJzdWJzY3JpcHRpb25cIixcbiAgICBcImV4dGVuZFwiLFxuICAgIFwic2NoZW1hXCIsXG4gICAgXCJkaXJlY3RpdmVcIixcbiAgICBcInNjYWxhclwiLFxuICAgIFwidHlwZVwiLFxuICAgIFwiaW50ZXJmYWNlXCIsXG4gICAgXCJ1bmlvblwiLFxuICAgIFwiZW51bVwiLFxuICAgIFwiaW5wdXRcIixcbiAgICBcImltcGxlbWVudHNcIixcbiAgICBcImZyYWdtZW50XCIsXG4gICAgXCJvblwiXG4gIF0sXG4gIHR5cGVLZXl3b3JkczogW1wiSW50XCIsIFwiRmxvYXRcIiwgXCJTdHJpbmdcIiwgXCJCb29sZWFuXCIsIFwiSURcIl0sXG4gIGRpcmVjdGl2ZUxvY2F0aW9uczogW1xuICAgIFwiU0NIRU1BXCIsXG4gICAgXCJTQ0FMQVJcIixcbiAgICBcIk9CSkVDVFwiLFxuICAgIFwiRklFTERfREVGSU5JVElPTlwiLFxuICAgIFwiQVJHVU1FTlRfREVGSU5JVElPTlwiLFxuICAgIFwiSU5URVJGQUNFXCIsXG4gICAgXCJVTklPTlwiLFxuICAgIFwiRU5VTVwiLFxuICAgIFwiRU5VTV9WQUxVRVwiLFxuICAgIFwiSU5QVVRfT0JKRUNUXCIsXG4gICAgXCJJTlBVVF9GSUVMRF9ERUZJTklUSU9OXCIsXG4gICAgXCJRVUVSWVwiLFxuICAgIFwiTVVUQVRJT05cIixcbiAgICBcIlNVQlNDUklQVElPTlwiLFxuICAgIFwiRklFTERcIixcbiAgICBcIkZSQUdNRU5UX0RFRklOSVRJT05cIixcbiAgICBcIkZSQUdNRU5UX1NQUkVBRFwiLFxuICAgIFwiSU5MSU5FX0ZSQUdNRU5UXCIsXG4gICAgXCJWQVJJQUJMRV9ERUZJTklUSU9OXCJcbiAgXSxcbiAgb3BlcmF0b3JzOiBbXCI9XCIsIFwiIVwiLCBcIj9cIiwgXCI6XCIsIFwiJlwiLCBcInxcIl0sXG4gIHN5bWJvbHM6IC9bPSE/OiZ8XSsvLFxuICBlc2NhcGVzOiAvXFxcXCg/OltcIlxcXFxcXC9iZm5ydF18dVswLTlBLUZhLWZdezR9KS8sXG4gIHRva2VuaXplcjoge1xuICAgIHJvb3Q6IFtcbiAgICAgIFtcbiAgICAgICAgL1thLXpfXVtcXHckXSovLFxuICAgICAgICB7XG4gICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgIFwiQGtleXdvcmRzXCI6IFwia2V5d29yZFwiLFxuICAgICAgICAgICAgXCJAZGVmYXVsdFwiOiBcImtleS5pZGVudGlmaWVyXCJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgIC9bJF1bXFx3JF0qLyxcbiAgICAgICAge1xuICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICBcIkBrZXl3b3Jkc1wiOiBcImtleXdvcmRcIixcbiAgICAgICAgICAgIFwiQGRlZmF1bHRcIjogXCJhcmd1bWVudC5pZGVudGlmaWVyXCJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgIC9bQS1aXVtcXHdcXCRdKi8sXG4gICAgICAgIHtcbiAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgXCJAdHlwZUtleXdvcmRzXCI6IFwia2V5d29yZFwiLFxuICAgICAgICAgICAgXCJAZGVmYXVsdFwiOiBcInR5cGUuaWRlbnRpZmllclwiXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgeyBpbmNsdWRlOiBcIkB3aGl0ZXNwYWNlXCIgfSxcbiAgICAgIFsvW3t9KClcXFtcXF1dLywgXCJAYnJhY2tldHNcIl0sXG4gICAgICBbL0BzeW1ib2xzLywgeyBjYXNlczogeyBcIkBvcGVyYXRvcnNcIjogXCJvcGVyYXRvclwiLCBcIkBkZWZhdWx0XCI6IFwiXCIgfSB9XSxcbiAgICAgIFsvQFxccypbYS16QS1aX1xcJF1bXFx3XFwkXSovLCB7IHRva2VuOiBcImFubm90YXRpb25cIiwgbG9nOiBcImFubm90YXRpb24gdG9rZW46ICQwXCIgfV0sXG4gICAgICBbL1xcZCpcXC5cXGQrKFtlRV1bXFwtK10/XFxkKyk/LywgXCJudW1iZXIuZmxvYXRcIl0sXG4gICAgICBbLzBbeFhdWzAtOWEtZkEtRl0rLywgXCJudW1iZXIuaGV4XCJdLFxuICAgICAgWy9cXGQrLywgXCJudW1iZXJcIl0sXG4gICAgICBbL1s7LC5dLywgXCJkZWxpbWl0ZXJcIl0sXG4gICAgICBbL1wiXCJcIi8sIHsgdG9rZW46IFwic3RyaW5nXCIsIG5leHQ6IFwiQG1sc3RyaW5nXCIsIG5leHRFbWJlZGRlZDogXCJtYXJrZG93blwiIH1dLFxuICAgICAgWy9cIihbXlwiXFxcXF18XFxcXC4pKiQvLCBcInN0cmluZy5pbnZhbGlkXCJdLFxuICAgICAgWy9cIi8sIHsgdG9rZW46IFwic3RyaW5nLnF1b3RlXCIsIGJyYWNrZXQ6IFwiQG9wZW5cIiwgbmV4dDogXCJAc3RyaW5nXCIgfV1cbiAgICBdLFxuICAgIG1sc3RyaW5nOiBbXG4gICAgICBbL1teXCJdKy8sIFwic3RyaW5nXCJdLFxuICAgICAgWydcIlwiXCInLCB7IHRva2VuOiBcInN0cmluZ1wiLCBuZXh0OiBcIkBwb3BcIiwgbmV4dEVtYmVkZGVkOiBcIkBwb3BcIiB9XVxuICAgIF0sXG4gICAgc3RyaW5nOiBbXG4gICAgICBbL1teXFxcXFwiXSsvLCBcInN0cmluZ1wiXSxcbiAgICAgIFsvQGVzY2FwZXMvLCBcInN0cmluZy5lc2NhcGVcIl0sXG4gICAgICBbL1xcXFwuLywgXCJzdHJpbmcuZXNjYXBlLmludmFsaWRcIl0sXG4gICAgICBbL1wiLywgeyB0b2tlbjogXCJzdHJpbmcucXVvdGVcIiwgYnJhY2tldDogXCJAY2xvc2VcIiwgbmV4dDogXCJAcG9wXCIgfV1cbiAgICBdLFxuICAgIHdoaXRlc3BhY2U6IFtcbiAgICAgIFsvWyBcXHRcXHJcXG5dKy8sIFwiXCJdLFxuICAgICAgWy8jLiokLywgXCJjb21tZW50XCJdXG4gICAgXVxuICB9XG59O1xuZXhwb3J0IHtcbiAgY29uZixcbiAgbGFuZ3VhZ2Vcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///6489\n')}}]);