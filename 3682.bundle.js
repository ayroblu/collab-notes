"use strict";(self.webpackChunkcollab_notes=self.webpackChunkcollab_notes||[]).push([[3682],{3682:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "conf": () => (/* binding */ conf),\n/* harmony export */   "language": () => (/* binding */ language)\n/* harmony export */ });\n/*!-----------------------------------------------------------------------------\n * Copyright (c) Microsoft Corporation. All rights reserved.\n * Version: 0.31.1(337587859b1c171314b40503171188b6cea6a32a)\n * Released under the MIT license\n * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt\n *-----------------------------------------------------------------------------*/\n\n// src/basic-languages/pla/pla.ts\nvar conf = {\n  comments: {\n    lineComment: "#"\n  },\n  brackets: [\n    ["[", "]"],\n    ["<", ">"],\n    ["(", ")"]\n  ],\n  autoClosingPairs: [\n    { open: "[", close: "]" },\n    { open: "<", close: ">" },\n    { open: "(", close: ")" }\n  ],\n  surroundingPairs: [\n    { open: "[", close: "]" },\n    { open: "<", close: ">" },\n    { open: "(", close: ")" }\n  ]\n};\nvar language = {\n  defaultToken: "",\n  tokenPostfix: ".pla",\n  brackets: [\n    { open: "[", close: "]", token: "delimiter.square" },\n    { open: "<", close: ">", token: "delimiter.angle" },\n    { open: "(", close: ")", token: "delimiter.parenthesis" }\n  ],\n  keywords: [\n    ".i",\n    ".o",\n    ".mv",\n    ".ilb",\n    ".ob",\n    ".label",\n    ".type",\n    ".phase",\n    ".pair",\n    ".symbolic",\n    ".symbolic-output",\n    ".kiss",\n    ".p",\n    ".e",\n    ".end"\n  ],\n  comment: /#.*$/,\n  identifier: /[a-zA-Z]+[a-zA-Z0-9_\\-]*/,\n  plaContent: /[01\\-~\\|]+/,\n  tokenizer: {\n    root: [\n      { include: "@whitespace" },\n      [/@comment/, "comment"],\n      [\n        /\\.([a-zA-Z_\\-]+)/,\n        {\n          cases: {\n            "@eos": { token: "keyword.$1" },\n            "@keywords": {\n              cases: {\n                ".type": { token: "keyword.$1", next: "@type" },\n                "@default": { token: "keyword.$1", next: "@keywordArg" }\n              }\n            },\n            "@default": { token: "keyword.$1" }\n          }\n        }\n      ],\n      [/@identifier/, "identifier"],\n      [/@plaContent/, "string"]\n    ],\n    whitespace: [[/[ \\t\\r\\n]+/, ""]],\n    type: [{ include: "@whitespace" }, [/\\w+/, { token: "type", next: "@pop" }]],\n    keywordArg: [\n      [\n        /[ \\t\\r\\n]+/,\n        {\n          cases: {\n            "@eos": { token: "", next: "@pop" },\n            "@default": ""\n          }\n        }\n      ],\n      [/@comment/, "comment", "@pop"],\n      [\n        /[<>()\\[\\]]/,\n        {\n          cases: {\n            "@eos": { token: "@brackets", next: "@pop" },\n            "@default": "@brackets"\n          }\n        }\n      ],\n      [\n        /\\-?\\d+/,\n        {\n          cases: {\n            "@eos": { token: "number", next: "@pop" },\n            "@default": "number"\n          }\n        }\n      ],\n      [\n        /@identifier/,\n        {\n          cases: {\n            "@eos": { token: "identifier", next: "@pop" },\n            "@default": "identifier"\n          }\n        }\n      ],\n      [\n        /[;=]/,\n        {\n          cases: {\n            "@eos": { token: "delimiter", next: "@pop" },\n            "@default": "delimiter"\n          }\n        }\n      ]\n    ]\n  }\n};\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMzY4Mi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLHVCQUF1QjtBQUM3QixNQUFNLHVCQUF1QjtBQUM3QixNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU0sdUJBQXVCO0FBQzdCLE1BQU0sdUJBQXVCO0FBQzdCLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLGtEQUFrRDtBQUN4RCxNQUFNLGlEQUFpRDtBQUN2RCxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsd0JBQXdCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IscUJBQXFCO0FBQzNDO0FBQ0E7QUFDQSwyQkFBMkIsb0NBQW9DO0FBQy9ELDhCQUE4QjtBQUM5QjtBQUNBLGFBQWE7QUFDYiwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLHdCQUF3QixZQUFZLDZCQUE2QjtBQUM5RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHlCQUF5QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0Isa0NBQWtDO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsK0JBQStCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsbUNBQW1DO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLHNCQUFzQixrQ0FBa0M7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJRSIsInNvdXJjZXMiOlsid2VicGFjazovL2NvbGxhYi1ub3Rlcy8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9iYXNpYy1sYW5ndWFnZXMvcGxhL3BsYS5qcz8yNGRiIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFZlcnNpb246IDAuMzEuMSgzMzc1ODc4NTliMWMxNzEzMTRiNDA1MDMxNzExODhiNmNlYTZhMzJhKVxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L21vbmFjby1lZGl0b3IvYmxvYi9tYWluL0xJQ0VOU0UudHh0XG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLy8gc3JjL2Jhc2ljLWxhbmd1YWdlcy9wbGEvcGxhLnRzXG52YXIgY29uZiA9IHtcbiAgY29tbWVudHM6IHtcbiAgICBsaW5lQ29tbWVudDogXCIjXCJcbiAgfSxcbiAgYnJhY2tldHM6IFtcbiAgICBbXCJbXCIsIFwiXVwiXSxcbiAgICBbXCI8XCIsIFwiPlwiXSxcbiAgICBbXCIoXCIsIFwiKVwiXVxuICBdLFxuICBhdXRvQ2xvc2luZ1BhaXJzOiBbXG4gICAgeyBvcGVuOiBcIltcIiwgY2xvc2U6IFwiXVwiIH0sXG4gICAgeyBvcGVuOiBcIjxcIiwgY2xvc2U6IFwiPlwiIH0sXG4gICAgeyBvcGVuOiBcIihcIiwgY2xvc2U6IFwiKVwiIH1cbiAgXSxcbiAgc3Vycm91bmRpbmdQYWlyczogW1xuICAgIHsgb3BlbjogXCJbXCIsIGNsb3NlOiBcIl1cIiB9LFxuICAgIHsgb3BlbjogXCI8XCIsIGNsb3NlOiBcIj5cIiB9LFxuICAgIHsgb3BlbjogXCIoXCIsIGNsb3NlOiBcIilcIiB9XG4gIF1cbn07XG52YXIgbGFuZ3VhZ2UgPSB7XG4gIGRlZmF1bHRUb2tlbjogXCJcIixcbiAgdG9rZW5Qb3N0Zml4OiBcIi5wbGFcIixcbiAgYnJhY2tldHM6IFtcbiAgICB7IG9wZW46IFwiW1wiLCBjbG9zZTogXCJdXCIsIHRva2VuOiBcImRlbGltaXRlci5zcXVhcmVcIiB9LFxuICAgIHsgb3BlbjogXCI8XCIsIGNsb3NlOiBcIj5cIiwgdG9rZW46IFwiZGVsaW1pdGVyLmFuZ2xlXCIgfSxcbiAgICB7IG9wZW46IFwiKFwiLCBjbG9zZTogXCIpXCIsIHRva2VuOiBcImRlbGltaXRlci5wYXJlbnRoZXNpc1wiIH1cbiAgXSxcbiAga2V5d29yZHM6IFtcbiAgICBcIi5pXCIsXG4gICAgXCIub1wiLFxuICAgIFwiLm12XCIsXG4gICAgXCIuaWxiXCIsXG4gICAgXCIub2JcIixcbiAgICBcIi5sYWJlbFwiLFxuICAgIFwiLnR5cGVcIixcbiAgICBcIi5waGFzZVwiLFxuICAgIFwiLnBhaXJcIixcbiAgICBcIi5zeW1ib2xpY1wiLFxuICAgIFwiLnN5bWJvbGljLW91dHB1dFwiLFxuICAgIFwiLmtpc3NcIixcbiAgICBcIi5wXCIsXG4gICAgXCIuZVwiLFxuICAgIFwiLmVuZFwiXG4gIF0sXG4gIGNvbW1lbnQ6IC8jLiokLyxcbiAgaWRlbnRpZmllcjogL1thLXpBLVpdK1thLXpBLVowLTlfXFwtXSovLFxuICBwbGFDb250ZW50OiAvWzAxXFwtflxcfF0rLyxcbiAgdG9rZW5pemVyOiB7XG4gICAgcm9vdDogW1xuICAgICAgeyBpbmNsdWRlOiBcIkB3aGl0ZXNwYWNlXCIgfSxcbiAgICAgIFsvQGNvbW1lbnQvLCBcImNvbW1lbnRcIl0sXG4gICAgICBbXG4gICAgICAgIC9cXC4oW2EtekEtWl9cXC1dKykvLFxuICAgICAgICB7XG4gICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgIFwiQGVvc1wiOiB7IHRva2VuOiBcImtleXdvcmQuJDFcIiB9LFxuICAgICAgICAgICAgXCJAa2V5d29yZHNcIjoge1xuICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgIFwiLnR5cGVcIjogeyB0b2tlbjogXCJrZXl3b3JkLiQxXCIsIG5leHQ6IFwiQHR5cGVcIiB9LFxuICAgICAgICAgICAgICAgIFwiQGRlZmF1bHRcIjogeyB0b2tlbjogXCJrZXl3b3JkLiQxXCIsIG5leHQ6IFwiQGtleXdvcmRBcmdcIiB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIkBkZWZhdWx0XCI6IHsgdG9rZW46IFwia2V5d29yZC4kMVwiIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBbL0BpZGVudGlmaWVyLywgXCJpZGVudGlmaWVyXCJdLFxuICAgICAgWy9AcGxhQ29udGVudC8sIFwic3RyaW5nXCJdXG4gICAgXSxcbiAgICB3aGl0ZXNwYWNlOiBbWy9bIFxcdFxcclxcbl0rLywgXCJcIl1dLFxuICAgIHR5cGU6IFt7IGluY2x1ZGU6IFwiQHdoaXRlc3BhY2VcIiB9LCBbL1xcdysvLCB7IHRva2VuOiBcInR5cGVcIiwgbmV4dDogXCJAcG9wXCIgfV1dLFxuICAgIGtleXdvcmRBcmc6IFtcbiAgICAgIFtcbiAgICAgICAgL1sgXFx0XFxyXFxuXSsvLFxuICAgICAgICB7XG4gICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgIFwiQGVvc1wiOiB7IHRva2VuOiBcIlwiLCBuZXh0OiBcIkBwb3BcIiB9LFxuICAgICAgICAgICAgXCJAZGVmYXVsdFwiOiBcIlwiXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgWy9AY29tbWVudC8sIFwiY29tbWVudFwiLCBcIkBwb3BcIl0sXG4gICAgICBbXG4gICAgICAgIC9bPD4oKVxcW1xcXV0vLFxuICAgICAgICB7XG4gICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgIFwiQGVvc1wiOiB7IHRva2VuOiBcIkBicmFja2V0c1wiLCBuZXh0OiBcIkBwb3BcIiB9LFxuICAgICAgICAgICAgXCJAZGVmYXVsdFwiOiBcIkBicmFja2V0c1wiXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAvXFwtP1xcZCsvLFxuICAgICAgICB7XG4gICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgIFwiQGVvc1wiOiB7IHRva2VuOiBcIm51bWJlclwiLCBuZXh0OiBcIkBwb3BcIiB9LFxuICAgICAgICAgICAgXCJAZGVmYXVsdFwiOiBcIm51bWJlclwiXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICAvQGlkZW50aWZpZXIvLFxuICAgICAgICB7XG4gICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgIFwiQGVvc1wiOiB7IHRva2VuOiBcImlkZW50aWZpZXJcIiwgbmV4dDogXCJAcG9wXCIgfSxcbiAgICAgICAgICAgIFwiQGRlZmF1bHRcIjogXCJpZGVudGlmaWVyXCJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgIC9bOz1dLyxcbiAgICAgICAge1xuICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICBcIkBlb3NcIjogeyB0b2tlbjogXCJkZWxpbWl0ZXJcIiwgbmV4dDogXCJAcG9wXCIgfSxcbiAgICAgICAgICAgIFwiQGRlZmF1bHRcIjogXCJkZWxpbWl0ZXJcIlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIF1cbiAgfVxufTtcbmV4cG9ydCB7XG4gIGNvbmYsXG4gIGxhbmd1YWdlXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///3682\n')}}]);