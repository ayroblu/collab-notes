"use strict";(self.webpackChunkcollab_notes=self.webpackChunkcollab_notes||[]).push([[525],{525:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "conf": () => (/* binding */ conf),\n/* harmony export */   "language": () => (/* binding */ language)\n/* harmony export */ });\n/*!-----------------------------------------------------------------------------\n * Copyright (c) Microsoft Corporation. All rights reserved.\n * Version: 0.31.1(337587859b1c171314b40503171188b6cea6a32a)\n * Released under the MIT license\n * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt\n *-----------------------------------------------------------------------------*/\n\n// src/basic-languages/scss/scss.ts\nvar conf = {\n  wordPattern: /(#?-?\\d*\\.\\d\\w*%?)|([@$#!.:]?[\\w-?]+%?)|[@#!.]/g,\n  comments: {\n    blockComment: ["/*", "*/"],\n    lineComment: "//"\n  },\n  brackets: [\n    ["{", "}"],\n    ["[", "]"],\n    ["(", ")"]\n  ],\n  autoClosingPairs: [\n    { open: "{", close: "}", notIn: ["string", "comment"] },\n    { open: "[", close: "]", notIn: ["string", "comment"] },\n    { open: "(", close: ")", notIn: ["string", "comment"] },\n    { open: \'"\', close: \'"\', notIn: ["string", "comment"] },\n    { open: "\'", close: "\'", notIn: ["string", "comment"] }\n  ],\n  surroundingPairs: [\n    { open: "{", close: "}" },\n    { open: "[", close: "]" },\n    { open: "(", close: ")" },\n    { open: \'"\', close: \'"\' },\n    { open: "\'", close: "\'" }\n  ],\n  folding: {\n    markers: {\n      start: new RegExp("^\\\\s*\\\\/\\\\*\\\\s*#region\\\\b\\\\s*(.*?)\\\\s*\\\\*\\\\/"),\n      end: new RegExp("^\\\\s*\\\\/\\\\*\\\\s*#endregion\\\\b.*\\\\*\\\\/")\n    }\n  }\n};\nvar language = {\n  defaultToken: "",\n  tokenPostfix: ".scss",\n  ws: "[ \t\\n\\r\\f]*",\n  identifier: "-?-?([a-zA-Z]|(\\\\\\\\(([0-9a-fA-F]{1,6}\\\\s?)|[^[0-9a-fA-F])))([\\\\w\\\\-]|(\\\\\\\\(([0-9a-fA-F]{1,6}\\\\s?)|[^[0-9a-fA-F])))*",\n  brackets: [\n    { open: "{", close: "}", token: "delimiter.curly" },\n    { open: "[", close: "]", token: "delimiter.bracket" },\n    { open: "(", close: ")", token: "delimiter.parenthesis" },\n    { open: "<", close: ">", token: "delimiter.angle" }\n  ],\n  tokenizer: {\n    root: [{ include: "@selector" }],\n    selector: [\n      { include: "@comments" },\n      { include: "@import" },\n      { include: "@variabledeclaration" },\n      { include: "@warndebug" },\n      ["[@](include)", { token: "keyword", next: "@includedeclaration" }],\n      [\n        "[@](keyframes|-webkit-keyframes|-moz-keyframes|-o-keyframes)",\n        { token: "keyword", next: "@keyframedeclaration" }\n      ],\n      ["[@](page|content|font-face|-moz-document)", { token: "keyword" }],\n      ["[@](charset|namespace)", { token: "keyword", next: "@declarationbody" }],\n      ["[@](function)", { token: "keyword", next: "@functiondeclaration" }],\n      ["[@](mixin)", { token: "keyword", next: "@mixindeclaration" }],\n      ["url(\\\\-prefix)?\\\\(", { token: "meta", next: "@urldeclaration" }],\n      { include: "@controlstatement" },\n      { include: "@selectorname" },\n      ["[&\\\\*]", "tag"],\n      ["[>\\\\+,]", "delimiter"],\n      ["\\\\[", { token: "delimiter.bracket", next: "@selectorattribute" }],\n      ["{", { token: "delimiter.curly", next: "@selectorbody" }]\n    ],\n    selectorbody: [\n      ["[*_]?@identifier@ws:(?=(\\\\s|\\\\d|[^{;}]*[;}]))", "attribute.name", "@rulevalue"],\n      { include: "@selector" },\n      ["[@](extend)", { token: "keyword", next: "@extendbody" }],\n      ["[@](return)", { token: "keyword", next: "@declarationbody" }],\n      ["}", { token: "delimiter.curly", next: "@pop" }]\n    ],\n    selectorname: [\n      ["#{", { token: "meta", next: "@variableinterpolation" }],\n      ["(\\\\.|#(?=[^{])|%|(@identifier)|:)+", "tag"]\n    ],\n    selectorattribute: [{ include: "@term" }, ["]", { token: "delimiter.bracket", next: "@pop" }]],\n    term: [\n      { include: "@comments" },\n      ["url(\\\\-prefix)?\\\\(", { token: "meta", next: "@urldeclaration" }],\n      { include: "@functioninvocation" },\n      { include: "@numbers" },\n      { include: "@strings" },\n      { include: "@variablereference" },\n      ["(and\\\\b|or\\\\b|not\\\\b)", "operator"],\n      { include: "@name" },\n      ["([<>=\\\\+\\\\-\\\\*\\\\/\\\\^\\\\|\\\\~,])", "operator"],\n      [",", "delimiter"],\n      ["!default", "literal"],\n      ["\\\\(", { token: "delimiter.parenthesis", next: "@parenthizedterm" }]\n    ],\n    rulevalue: [\n      { include: "@term" },\n      ["!important", "literal"],\n      [";", "delimiter", "@pop"],\n      ["{", { token: "delimiter.curly", switchTo: "@nestedproperty" }],\n      ["(?=})", { token: "", next: "@pop" }]\n    ],\n    nestedproperty: [\n      ["[*_]?@identifier@ws:", "attribute.name", "@rulevalue"],\n      { include: "@comments" },\n      ["}", { token: "delimiter.curly", next: "@pop" }]\n    ],\n    warndebug: [["[@](warn|debug)", { token: "keyword", next: "@declarationbody" }]],\n    import: [["[@](import)", { token: "keyword", next: "@declarationbody" }]],\n    variabledeclaration: [\n      ["\\\\$@identifier@ws:", "variable.decl", "@declarationbody"]\n    ],\n    urldeclaration: [\n      { include: "@strings" },\n      ["[^)\\r\\n]+", "string"],\n      ["\\\\)", { token: "meta", next: "@pop" }]\n    ],\n    parenthizedterm: [\n      { include: "@term" },\n      ["\\\\)", { token: "delimiter.parenthesis", next: "@pop" }]\n    ],\n    declarationbody: [\n      { include: "@term" },\n      [";", "delimiter", "@pop"],\n      ["(?=})", { token: "", next: "@pop" }]\n    ],\n    extendbody: [\n      { include: "@selectorname" },\n      ["!optional", "literal"],\n      [";", "delimiter", "@pop"],\n      ["(?=})", { token: "", next: "@pop" }]\n    ],\n    variablereference: [\n      ["\\\\$@identifier", "variable.ref"],\n      ["\\\\.\\\\.\\\\.", "operator"],\n      ["#{", { token: "meta", next: "@variableinterpolation" }]\n    ],\n    variableinterpolation: [\n      { include: "@variablereference" },\n      ["}", { token: "meta", next: "@pop" }]\n    ],\n    comments: [\n      ["\\\\/\\\\*", "comment", "@comment"],\n      ["\\\\/\\\\/+.*", "comment"]\n    ],\n    comment: [\n      ["\\\\*\\\\/", "comment", "@pop"],\n      [".", "comment"]\n    ],\n    name: [["@identifier", "attribute.value"]],\n    numbers: [\n      ["(\\\\d*\\\\.)?\\\\d+([eE][\\\\-+]?\\\\d+)?", { token: "number", next: "@units" }],\n      ["#[0-9a-fA-F_]+(?!\\\\w)", "number.hex"]\n    ],\n    units: [\n      [\n        "(em|ex|ch|rem|vmin|vmax|vw|vh|vm|cm|mm|in|px|pt|pc|deg|grad|rad|turn|s|ms|Hz|kHz|%)?",\n        "number",\n        "@pop"\n      ]\n    ],\n    functiondeclaration: [\n      ["@identifier@ws\\\\(", { token: "meta", next: "@parameterdeclaration" }],\n      ["{", { token: "delimiter.curly", switchTo: "@functionbody" }]\n    ],\n    mixindeclaration: [\n      ["@identifier@ws\\\\(", { token: "meta", next: "@parameterdeclaration" }],\n      ["@identifier", "meta"],\n      ["{", { token: "delimiter.curly", switchTo: "@selectorbody" }]\n    ],\n    parameterdeclaration: [\n      ["\\\\$@identifier@ws:", "variable.decl"],\n      ["\\\\.\\\\.\\\\.", "operator"],\n      [",", "delimiter"],\n      { include: "@term" },\n      ["\\\\)", { token: "meta", next: "@pop" }]\n    ],\n    includedeclaration: [\n      { include: "@functioninvocation" },\n      ["@identifier", "meta"],\n      [";", "delimiter", "@pop"],\n      ["(?=})", { token: "", next: "@pop" }],\n      ["{", { token: "delimiter.curly", switchTo: "@selectorbody" }]\n    ],\n    keyframedeclaration: [\n      ["@identifier", "meta"],\n      ["{", { token: "delimiter.curly", switchTo: "@keyframebody" }]\n    ],\n    keyframebody: [\n      { include: "@term" },\n      ["{", { token: "delimiter.curly", next: "@selectorbody" }],\n      ["}", { token: "delimiter.curly", next: "@pop" }]\n    ],\n    controlstatement: [\n      [\n        "[@](if|else|for|while|each|media)",\n        { token: "keyword.flow", next: "@controlstatementdeclaration" }\n      ]\n    ],\n    controlstatementdeclaration: [\n      ["(in|from|through|if|to)\\\\b", { token: "keyword.flow" }],\n      { include: "@term" },\n      ["{", { token: "delimiter.curly", switchTo: "@selectorbody" }]\n    ],\n    functionbody: [\n      ["[@](return)", { token: "keyword" }],\n      { include: "@variabledeclaration" },\n      { include: "@term" },\n      { include: "@controlstatement" },\n      [";", "delimiter"],\n      ["}", { token: "delimiter.curly", next: "@pop" }]\n    ],\n    functioninvocation: [["@identifier\\\\(", { token: "meta", next: "@functionarguments" }]],\n    functionarguments: [\n      ["\\\\$@identifier@ws:", "attribute.name"],\n      ["[,]", "delimiter"],\n      { include: "@term" },\n      ["\\\\)", { token: "meta", next: "@pop" }]\n    ],\n    strings: [\n      [\'~?"\', { token: "string.delimiter", next: "@stringenddoublequote" }],\n      ["~?\'", { token: "string.delimiter", next: "@stringendquote" }]\n    ],\n    stringenddoublequote: [\n      ["\\\\\\\\.", "string"],\n      [\'"\', { token: "string.delimiter", next: "@pop" }],\n      [".", "string"]\n    ],\n    stringendquote: [\n      ["\\\\\\\\.", "string"],\n      ["\'", { token: "string.delimiter", next: "@pop" }],\n      [".", "string"]\n    ]\n  }\n};\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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azovL2NvbGxhYi1ub3Rlcy8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9iYXNpYy1sYW5ndWFnZXMvc2Nzcy9zY3NzLmpzPzQwOTkiXSwic291cmNlc0NvbnRlbnQiOlsiLyohLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVmVyc2lvbjogMC4zMS4xKDMzNzU4Nzg1OWIxYzE3MTMxNGI0MDUwMzE3MTE4OGI2Y2VhNmEzMmEpXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvbW9uYWNvLWVkaXRvci9ibG9iL21haW4vTElDRU5TRS50eHRcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vLyBzcmMvYmFzaWMtbGFuZ3VhZ2VzL3Njc3Mvc2Nzcy50c1xudmFyIGNvbmYgPSB7XG4gIHdvcmRQYXR0ZXJuOiAvKCM/LT9cXGQqXFwuXFxkXFx3KiU/KXwoW0AkIyEuOl0/W1xcdy0/XSslPyl8W0AjIS5dL2csXG4gIGNvbW1lbnRzOiB7XG4gICAgYmxvY2tDb21tZW50OiBbXCIvKlwiLCBcIiovXCJdLFxuICAgIGxpbmVDb21tZW50OiBcIi8vXCJcbiAgfSxcbiAgYnJhY2tldHM6IFtcbiAgICBbXCJ7XCIsIFwifVwiXSxcbiAgICBbXCJbXCIsIFwiXVwiXSxcbiAgICBbXCIoXCIsIFwiKVwiXVxuICBdLFxuICBhdXRvQ2xvc2luZ1BhaXJzOiBbXG4gICAgeyBvcGVuOiBcIntcIiwgY2xvc2U6IFwifVwiLCBub3RJbjogW1wic3RyaW5nXCIsIFwiY29tbWVudFwiXSB9LFxuICAgIHsgb3BlbjogXCJbXCIsIGNsb3NlOiBcIl1cIiwgbm90SW46IFtcInN0cmluZ1wiLCBcImNvbW1lbnRcIl0gfSxcbiAgICB7IG9wZW46IFwiKFwiLCBjbG9zZTogXCIpXCIsIG5vdEluOiBbXCJzdHJpbmdcIiwgXCJjb21tZW50XCJdIH0sXG4gICAgeyBvcGVuOiAnXCInLCBjbG9zZTogJ1wiJywgbm90SW46IFtcInN0cmluZ1wiLCBcImNvbW1lbnRcIl0gfSxcbiAgICB7IG9wZW46IFwiJ1wiLCBjbG9zZTogXCInXCIsIG5vdEluOiBbXCJzdHJpbmdcIiwgXCJjb21tZW50XCJdIH1cbiAgXSxcbiAgc3Vycm91bmRpbmdQYWlyczogW1xuICAgIHsgb3BlbjogXCJ7XCIsIGNsb3NlOiBcIn1cIiB9LFxuICAgIHsgb3BlbjogXCJbXCIsIGNsb3NlOiBcIl1cIiB9LFxuICAgIHsgb3BlbjogXCIoXCIsIGNsb3NlOiBcIilcIiB9LFxuICAgIHsgb3BlbjogJ1wiJywgY2xvc2U6ICdcIicgfSxcbiAgICB7IG9wZW46IFwiJ1wiLCBjbG9zZTogXCInXCIgfVxuICBdLFxuICBmb2xkaW5nOiB7XG4gICAgbWFya2Vyczoge1xuICAgICAgc3RhcnQ6IG5ldyBSZWdFeHAoXCJeXFxcXHMqXFxcXC9cXFxcKlxcXFxzKiNyZWdpb25cXFxcYlxcXFxzKiguKj8pXFxcXHMqXFxcXCpcXFxcL1wiKSxcbiAgICAgIGVuZDogbmV3IFJlZ0V4cChcIl5cXFxccypcXFxcL1xcXFwqXFxcXHMqI2VuZHJlZ2lvblxcXFxiLipcXFxcKlxcXFwvXCIpXG4gICAgfVxuICB9XG59O1xudmFyIGxhbmd1YWdlID0ge1xuICBkZWZhdWx0VG9rZW46IFwiXCIsXG4gIHRva2VuUG9zdGZpeDogXCIuc2Nzc1wiLFxuICB3czogXCJbIFx0XFxuXFxyXFxmXSpcIixcbiAgaWRlbnRpZmllcjogXCItPy0/KFthLXpBLVpdfChcXFxcXFxcXCgoWzAtOWEtZkEtRl17MSw2fVxcXFxzPyl8W15bMC05YS1mQS1GXSkpKShbXFxcXHdcXFxcLV18KFxcXFxcXFxcKChbMC05YS1mQS1GXXsxLDZ9XFxcXHM/KXxbXlswLTlhLWZBLUZdKSkpKlwiLFxuICBicmFja2V0czogW1xuICAgIHsgb3BlbjogXCJ7XCIsIGNsb3NlOiBcIn1cIiwgdG9rZW46IFwiZGVsaW1pdGVyLmN1cmx5XCIgfSxcbiAgICB7IG9wZW46IFwiW1wiLCBjbG9zZTogXCJdXCIsIHRva2VuOiBcImRlbGltaXRlci5icmFja2V0XCIgfSxcbiAgICB7IG9wZW46IFwiKFwiLCBjbG9zZTogXCIpXCIsIHRva2VuOiBcImRlbGltaXRlci5wYXJlbnRoZXNpc1wiIH0sXG4gICAgeyBvcGVuOiBcIjxcIiwgY2xvc2U6IFwiPlwiLCB0b2tlbjogXCJkZWxpbWl0ZXIuYW5nbGVcIiB9XG4gIF0sXG4gIHRva2VuaXplcjoge1xuICAgIHJvb3Q6IFt7IGluY2x1ZGU6IFwiQHNlbGVjdG9yXCIgfV0sXG4gICAgc2VsZWN0b3I6IFtcbiAgICAgIHsgaW5jbHVkZTogXCJAY29tbWVudHNcIiB9LFxuICAgICAgeyBpbmNsdWRlOiBcIkBpbXBvcnRcIiB9LFxuICAgICAgeyBpbmNsdWRlOiBcIkB2YXJpYWJsZWRlY2xhcmF0aW9uXCIgfSxcbiAgICAgIHsgaW5jbHVkZTogXCJAd2FybmRlYnVnXCIgfSxcbiAgICAgIFtcIltAXShpbmNsdWRlKVwiLCB7IHRva2VuOiBcImtleXdvcmRcIiwgbmV4dDogXCJAaW5jbHVkZWRlY2xhcmF0aW9uXCIgfV0sXG4gICAgICBbXG4gICAgICAgIFwiW0BdKGtleWZyYW1lc3wtd2Via2l0LWtleWZyYW1lc3wtbW96LWtleWZyYW1lc3wtby1rZXlmcmFtZXMpXCIsXG4gICAgICAgIHsgdG9rZW46IFwia2V5d29yZFwiLCBuZXh0OiBcIkBrZXlmcmFtZWRlY2xhcmF0aW9uXCIgfVxuICAgICAgXSxcbiAgICAgIFtcIltAXShwYWdlfGNvbnRlbnR8Zm9udC1mYWNlfC1tb3otZG9jdW1lbnQpXCIsIHsgdG9rZW46IFwia2V5d29yZFwiIH1dLFxuICAgICAgW1wiW0BdKGNoYXJzZXR8bmFtZXNwYWNlKVwiLCB7IHRva2VuOiBcImtleXdvcmRcIiwgbmV4dDogXCJAZGVjbGFyYXRpb25ib2R5XCIgfV0sXG4gICAgICBbXCJbQF0oZnVuY3Rpb24pXCIsIHsgdG9rZW46IFwia2V5d29yZFwiLCBuZXh0OiBcIkBmdW5jdGlvbmRlY2xhcmF0aW9uXCIgfV0sXG4gICAgICBbXCJbQF0obWl4aW4pXCIsIHsgdG9rZW46IFwia2V5d29yZFwiLCBuZXh0OiBcIkBtaXhpbmRlY2xhcmF0aW9uXCIgfV0sXG4gICAgICBbXCJ1cmwoXFxcXC1wcmVmaXgpP1xcXFwoXCIsIHsgdG9rZW46IFwibWV0YVwiLCBuZXh0OiBcIkB1cmxkZWNsYXJhdGlvblwiIH1dLFxuICAgICAgeyBpbmNsdWRlOiBcIkBjb250cm9sc3RhdGVtZW50XCIgfSxcbiAgICAgIHsgaW5jbHVkZTogXCJAc2VsZWN0b3JuYW1lXCIgfSxcbiAgICAgIFtcIlsmXFxcXCpdXCIsIFwidGFnXCJdLFxuICAgICAgW1wiWz5cXFxcKyxdXCIsIFwiZGVsaW1pdGVyXCJdLFxuICAgICAgW1wiXFxcXFtcIiwgeyB0b2tlbjogXCJkZWxpbWl0ZXIuYnJhY2tldFwiLCBuZXh0OiBcIkBzZWxlY3RvcmF0dHJpYnV0ZVwiIH1dLFxuICAgICAgW1wie1wiLCB7IHRva2VuOiBcImRlbGltaXRlci5jdXJseVwiLCBuZXh0OiBcIkBzZWxlY3RvcmJvZHlcIiB9XVxuICAgIF0sXG4gICAgc2VsZWN0b3Jib2R5OiBbXG4gICAgICBbXCJbKl9dP0BpZGVudGlmaWVyQHdzOig/PShcXFxcc3xcXFxcZHxbXns7fV0qWzt9XSkpXCIsIFwiYXR0cmlidXRlLm5hbWVcIiwgXCJAcnVsZXZhbHVlXCJdLFxuICAgICAgeyBpbmNsdWRlOiBcIkBzZWxlY3RvclwiIH0sXG4gICAgICBbXCJbQF0oZXh0ZW5kKVwiLCB7IHRva2VuOiBcImtleXdvcmRcIiwgbmV4dDogXCJAZXh0ZW5kYm9keVwiIH1dLFxuICAgICAgW1wiW0BdKHJldHVybilcIiwgeyB0b2tlbjogXCJrZXl3b3JkXCIsIG5leHQ6IFwiQGRlY2xhcmF0aW9uYm9keVwiIH1dLFxuICAgICAgW1wifVwiLCB7IHRva2VuOiBcImRlbGltaXRlci5jdXJseVwiLCBuZXh0OiBcIkBwb3BcIiB9XVxuICAgIF0sXG4gICAgc2VsZWN0b3JuYW1lOiBbXG4gICAgICBbXCIje1wiLCB7IHRva2VuOiBcIm1ldGFcIiwgbmV4dDogXCJAdmFyaWFibGVpbnRlcnBvbGF0aW9uXCIgfV0sXG4gICAgICBbXCIoXFxcXC58Iyg/PVtee10pfCV8KEBpZGVudGlmaWVyKXw6KStcIiwgXCJ0YWdcIl1cbiAgICBdLFxuICAgIHNlbGVjdG9yYXR0cmlidXRlOiBbeyBpbmNsdWRlOiBcIkB0ZXJtXCIgfSwgW1wiXVwiLCB7IHRva2VuOiBcImRlbGltaXRlci5icmFja2V0XCIsIG5leHQ6IFwiQHBvcFwiIH1dXSxcbiAgICB0ZXJtOiBbXG4gICAgICB7IGluY2x1ZGU6IFwiQGNvbW1lbnRzXCIgfSxcbiAgICAgIFtcInVybChcXFxcLXByZWZpeCk/XFxcXChcIiwgeyB0b2tlbjogXCJtZXRhXCIsIG5leHQ6IFwiQHVybGRlY2xhcmF0aW9uXCIgfV0sXG4gICAgICB7IGluY2x1ZGU6IFwiQGZ1bmN0aW9uaW52b2NhdGlvblwiIH0sXG4gICAgICB7IGluY2x1ZGU6IFwiQG51bWJlcnNcIiB9LFxuICAgICAgeyBpbmNsdWRlOiBcIkBzdHJpbmdzXCIgfSxcbiAgICAgIHsgaW5jbHVkZTogXCJAdmFyaWFibGVyZWZlcmVuY2VcIiB9LFxuICAgICAgW1wiKGFuZFxcXFxifG9yXFxcXGJ8bm90XFxcXGIpXCIsIFwib3BlcmF0b3JcIl0sXG4gICAgICB7IGluY2x1ZGU6IFwiQG5hbWVcIiB9LFxuICAgICAgW1wiKFs8Pj1cXFxcK1xcXFwtXFxcXCpcXFxcL1xcXFxeXFxcXHxcXFxcfixdKVwiLCBcIm9wZXJhdG9yXCJdLFxuICAgICAgW1wiLFwiLCBcImRlbGltaXRlclwiXSxcbiAgICAgIFtcIiFkZWZhdWx0XCIsIFwibGl0ZXJhbFwiXSxcbiAgICAgIFtcIlxcXFwoXCIsIHsgdG9rZW46IFwiZGVsaW1pdGVyLnBhcmVudGhlc2lzXCIsIG5leHQ6IFwiQHBhcmVudGhpemVkdGVybVwiIH1dXG4gICAgXSxcbiAgICBydWxldmFsdWU6IFtcbiAgICAgIHsgaW5jbHVkZTogXCJAdGVybVwiIH0sXG4gICAgICBbXCIhaW1wb3J0YW50XCIsIFwibGl0ZXJhbFwiXSxcbiAgICAgIFtcIjtcIiwgXCJkZWxpbWl0ZXJcIiwgXCJAcG9wXCJdLFxuICAgICAgW1wie1wiLCB7IHRva2VuOiBcImRlbGltaXRlci5jdXJseVwiLCBzd2l0Y2hUbzogXCJAbmVzdGVkcHJvcGVydHlcIiB9XSxcbiAgICAgIFtcIig/PX0pXCIsIHsgdG9rZW46IFwiXCIsIG5leHQ6IFwiQHBvcFwiIH1dXG4gICAgXSxcbiAgICBuZXN0ZWRwcm9wZXJ0eTogW1xuICAgICAgW1wiWypfXT9AaWRlbnRpZmllckB3czpcIiwgXCJhdHRyaWJ1dGUubmFtZVwiLCBcIkBydWxldmFsdWVcIl0sXG4gICAgICB7IGluY2x1ZGU6IFwiQGNvbW1lbnRzXCIgfSxcbiAgICAgIFtcIn1cIiwgeyB0b2tlbjogXCJkZWxpbWl0ZXIuY3VybHlcIiwgbmV4dDogXCJAcG9wXCIgfV1cbiAgICBdLFxuICAgIHdhcm5kZWJ1ZzogW1tcIltAXSh3YXJufGRlYnVnKVwiLCB7IHRva2VuOiBcImtleXdvcmRcIiwgbmV4dDogXCJAZGVjbGFyYXRpb25ib2R5XCIgfV1dLFxuICAgIGltcG9ydDogW1tcIltAXShpbXBvcnQpXCIsIHsgdG9rZW46IFwia2V5d29yZFwiLCBuZXh0OiBcIkBkZWNsYXJhdGlvbmJvZHlcIiB9XV0sXG4gICAgdmFyaWFibGVkZWNsYXJhdGlvbjogW1xuICAgICAgW1wiXFxcXCRAaWRlbnRpZmllckB3czpcIiwgXCJ2YXJpYWJsZS5kZWNsXCIsIFwiQGRlY2xhcmF0aW9uYm9keVwiXVxuICAgIF0sXG4gICAgdXJsZGVjbGFyYXRpb246IFtcbiAgICAgIHsgaW5jbHVkZTogXCJAc3RyaW5nc1wiIH0sXG4gICAgICBbXCJbXilcXHJcXG5dK1wiLCBcInN0cmluZ1wiXSxcbiAgICAgIFtcIlxcXFwpXCIsIHsgdG9rZW46IFwibWV0YVwiLCBuZXh0OiBcIkBwb3BcIiB9XVxuICAgIF0sXG4gICAgcGFyZW50aGl6ZWR0ZXJtOiBbXG4gICAgICB7IGluY2x1ZGU6IFwiQHRlcm1cIiB9LFxuICAgICAgW1wiXFxcXClcIiwgeyB0b2tlbjogXCJkZWxpbWl0ZXIucGFyZW50aGVzaXNcIiwgbmV4dDogXCJAcG9wXCIgfV1cbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uYm9keTogW1xuICAgICAgeyBpbmNsdWRlOiBcIkB0ZXJtXCIgfSxcbiAgICAgIFtcIjtcIiwgXCJkZWxpbWl0ZXJcIiwgXCJAcG9wXCJdLFxuICAgICAgW1wiKD89fSlcIiwgeyB0b2tlbjogXCJcIiwgbmV4dDogXCJAcG9wXCIgfV1cbiAgICBdLFxuICAgIGV4dGVuZGJvZHk6IFtcbiAgICAgIHsgaW5jbHVkZTogXCJAc2VsZWN0b3JuYW1lXCIgfSxcbiAgICAgIFtcIiFvcHRpb25hbFwiLCBcImxpdGVyYWxcIl0sXG4gICAgICBbXCI7XCIsIFwiZGVsaW1pdGVyXCIsIFwiQHBvcFwiXSxcbiAgICAgIFtcIig/PX0pXCIsIHsgdG9rZW46IFwiXCIsIG5leHQ6IFwiQHBvcFwiIH1dXG4gICAgXSxcbiAgICB2YXJpYWJsZXJlZmVyZW5jZTogW1xuICAgICAgW1wiXFxcXCRAaWRlbnRpZmllclwiLCBcInZhcmlhYmxlLnJlZlwiXSxcbiAgICAgIFtcIlxcXFwuXFxcXC5cXFxcLlwiLCBcIm9wZXJhdG9yXCJdLFxuICAgICAgW1wiI3tcIiwgeyB0b2tlbjogXCJtZXRhXCIsIG5leHQ6IFwiQHZhcmlhYmxlaW50ZXJwb2xhdGlvblwiIH1dXG4gICAgXSxcbiAgICB2YXJpYWJsZWludGVycG9sYXRpb246IFtcbiAgICAgIHsgaW5jbHVkZTogXCJAdmFyaWFibGVyZWZlcmVuY2VcIiB9LFxuICAgICAgW1wifVwiLCB7IHRva2VuOiBcIm1ldGFcIiwgbmV4dDogXCJAcG9wXCIgfV1cbiAgICBdLFxuICAgIGNvbW1lbnRzOiBbXG4gICAgICBbXCJcXFxcL1xcXFwqXCIsIFwiY29tbWVudFwiLCBcIkBjb21tZW50XCJdLFxuICAgICAgW1wiXFxcXC9cXFxcLysuKlwiLCBcImNvbW1lbnRcIl1cbiAgICBdLFxuICAgIGNvbW1lbnQ6IFtcbiAgICAgIFtcIlxcXFwqXFxcXC9cIiwgXCJjb21tZW50XCIsIFwiQHBvcFwiXSxcbiAgICAgIFtcIi5cIiwgXCJjb21tZW50XCJdXG4gICAgXSxcbiAgICBuYW1lOiBbW1wiQGlkZW50aWZpZXJcIiwgXCJhdHRyaWJ1dGUudmFsdWVcIl1dLFxuICAgIG51bWJlcnM6IFtcbiAgICAgIFtcIihcXFxcZCpcXFxcLik/XFxcXGQrKFtlRV1bXFxcXC0rXT9cXFxcZCspP1wiLCB7IHRva2VuOiBcIm51bWJlclwiLCBuZXh0OiBcIkB1bml0c1wiIH1dLFxuICAgICAgW1wiI1swLTlhLWZBLUZfXSsoPyFcXFxcdylcIiwgXCJudW1iZXIuaGV4XCJdXG4gICAgXSxcbiAgICB1bml0czogW1xuICAgICAgW1xuICAgICAgICBcIihlbXxleHxjaHxyZW18dm1pbnx2bWF4fHZ3fHZofHZtfGNtfG1tfGlufHB4fHB0fHBjfGRlZ3xncmFkfHJhZHx0dXJufHN8bXN8SHp8a0h6fCUpP1wiLFxuICAgICAgICBcIm51bWJlclwiLFxuICAgICAgICBcIkBwb3BcIlxuICAgICAgXVxuICAgIF0sXG4gICAgZnVuY3Rpb25kZWNsYXJhdGlvbjogW1xuICAgICAgW1wiQGlkZW50aWZpZXJAd3NcXFxcKFwiLCB7IHRva2VuOiBcIm1ldGFcIiwgbmV4dDogXCJAcGFyYW1ldGVyZGVjbGFyYXRpb25cIiB9XSxcbiAgICAgIFtcIntcIiwgeyB0b2tlbjogXCJkZWxpbWl0ZXIuY3VybHlcIiwgc3dpdGNoVG86IFwiQGZ1bmN0aW9uYm9keVwiIH1dXG4gICAgXSxcbiAgICBtaXhpbmRlY2xhcmF0aW9uOiBbXG4gICAgICBbXCJAaWRlbnRpZmllckB3c1xcXFwoXCIsIHsgdG9rZW46IFwibWV0YVwiLCBuZXh0OiBcIkBwYXJhbWV0ZXJkZWNsYXJhdGlvblwiIH1dLFxuICAgICAgW1wiQGlkZW50aWZpZXJcIiwgXCJtZXRhXCJdLFxuICAgICAgW1wie1wiLCB7IHRva2VuOiBcImRlbGltaXRlci5jdXJseVwiLCBzd2l0Y2hUbzogXCJAc2VsZWN0b3Jib2R5XCIgfV1cbiAgICBdLFxuICAgIHBhcmFtZXRlcmRlY2xhcmF0aW9uOiBbXG4gICAgICBbXCJcXFxcJEBpZGVudGlmaWVyQHdzOlwiLCBcInZhcmlhYmxlLmRlY2xcIl0sXG4gICAgICBbXCJcXFxcLlxcXFwuXFxcXC5cIiwgXCJvcGVyYXRvclwiXSxcbiAgICAgIFtcIixcIiwgXCJkZWxpbWl0ZXJcIl0sXG4gICAgICB7IGluY2x1ZGU6IFwiQHRlcm1cIiB9LFxuICAgICAgW1wiXFxcXClcIiwgeyB0b2tlbjogXCJtZXRhXCIsIG5leHQ6IFwiQHBvcFwiIH1dXG4gICAgXSxcbiAgICBpbmNsdWRlZGVjbGFyYXRpb246IFtcbiAgICAgIHsgaW5jbHVkZTogXCJAZnVuY3Rpb25pbnZvY2F0aW9uXCIgfSxcbiAgICAgIFtcIkBpZGVudGlmaWVyXCIsIFwibWV0YVwiXSxcbiAgICAgIFtcIjtcIiwgXCJkZWxpbWl0ZXJcIiwgXCJAcG9wXCJdLFxuICAgICAgW1wiKD89fSlcIiwgeyB0b2tlbjogXCJcIiwgbmV4dDogXCJAcG9wXCIgfV0sXG4gICAgICBbXCJ7XCIsIHsgdG9rZW46IFwiZGVsaW1pdGVyLmN1cmx5XCIsIHN3aXRjaFRvOiBcIkBzZWxlY3RvcmJvZHlcIiB9XVxuICAgIF0sXG4gICAga2V5ZnJhbWVkZWNsYXJhdGlvbjogW1xuICAgICAgW1wiQGlkZW50aWZpZXJcIiwgXCJtZXRhXCJdLFxuICAgICAgW1wie1wiLCB7IHRva2VuOiBcImRlbGltaXRlci5jdXJseVwiLCBzd2l0Y2hUbzogXCJAa2V5ZnJhbWVib2R5XCIgfV1cbiAgICBdLFxuICAgIGtleWZyYW1lYm9keTogW1xuICAgICAgeyBpbmNsdWRlOiBcIkB0ZXJtXCIgfSxcbiAgICAgIFtcIntcIiwgeyB0b2tlbjogXCJkZWxpbWl0ZXIuY3VybHlcIiwgbmV4dDogXCJAc2VsZWN0b3Jib2R5XCIgfV0sXG4gICAgICBbXCJ9XCIsIHsgdG9rZW46IFwiZGVsaW1pdGVyLmN1cmx5XCIsIG5leHQ6IFwiQHBvcFwiIH1dXG4gICAgXSxcbiAgICBjb250cm9sc3RhdGVtZW50OiBbXG4gICAgICBbXG4gICAgICAgIFwiW0BdKGlmfGVsc2V8Zm9yfHdoaWxlfGVhY2h8bWVkaWEpXCIsXG4gICAgICAgIHsgdG9rZW46IFwia2V5d29yZC5mbG93XCIsIG5leHQ6IFwiQGNvbnRyb2xzdGF0ZW1lbnRkZWNsYXJhdGlvblwiIH1cbiAgICAgIF1cbiAgICBdLFxuICAgIGNvbnRyb2xzdGF0ZW1lbnRkZWNsYXJhdGlvbjogW1xuICAgICAgW1wiKGlufGZyb218dGhyb3VnaHxpZnx0bylcXFxcYlwiLCB7IHRva2VuOiBcImtleXdvcmQuZmxvd1wiIH1dLFxuICAgICAgeyBpbmNsdWRlOiBcIkB0ZXJtXCIgfSxcbiAgICAgIFtcIntcIiwgeyB0b2tlbjogXCJkZWxpbWl0ZXIuY3VybHlcIiwgc3dpdGNoVG86IFwiQHNlbGVjdG9yYm9keVwiIH1dXG4gICAgXSxcbiAgICBmdW5jdGlvbmJvZHk6IFtcbiAgICAgIFtcIltAXShyZXR1cm4pXCIsIHsgdG9rZW46IFwia2V5d29yZFwiIH1dLFxuICAgICAgeyBpbmNsdWRlOiBcIkB2YXJpYWJsZWRlY2xhcmF0aW9uXCIgfSxcbiAgICAgIHsgaW5jbHVkZTogXCJAdGVybVwiIH0sXG4gICAgICB7IGluY2x1ZGU6IFwiQGNvbnRyb2xzdGF0ZW1lbnRcIiB9LFxuICAgICAgW1wiO1wiLCBcImRlbGltaXRlclwiXSxcbiAgICAgIFtcIn1cIiwgeyB0b2tlbjogXCJkZWxpbWl0ZXIuY3VybHlcIiwgbmV4dDogXCJAcG9wXCIgfV1cbiAgICBdLFxuICAgIGZ1bmN0aW9uaW52b2NhdGlvbjogW1tcIkBpZGVudGlmaWVyXFxcXChcIiwgeyB0b2tlbjogXCJtZXRhXCIsIG5leHQ6IFwiQGZ1bmN0aW9uYXJndW1lbnRzXCIgfV1dLFxuICAgIGZ1bmN0aW9uYXJndW1lbnRzOiBbXG4gICAgICBbXCJcXFxcJEBpZGVudGlmaWVyQHdzOlwiLCBcImF0dHJpYnV0ZS5uYW1lXCJdLFxuICAgICAgW1wiWyxdXCIsIFwiZGVsaW1pdGVyXCJdLFxuICAgICAgeyBpbmNsdWRlOiBcIkB0ZXJtXCIgfSxcbiAgICAgIFtcIlxcXFwpXCIsIHsgdG9rZW46IFwibWV0YVwiLCBuZXh0OiBcIkBwb3BcIiB9XVxuICAgIF0sXG4gICAgc3RyaW5nczogW1xuICAgICAgWyd+P1wiJywgeyB0b2tlbjogXCJzdHJpbmcuZGVsaW1pdGVyXCIsIG5leHQ6IFwiQHN0cmluZ2VuZGRvdWJsZXF1b3RlXCIgfV0sXG4gICAgICBbXCJ+PydcIiwgeyB0b2tlbjogXCJzdHJpbmcuZGVsaW1pdGVyXCIsIG5leHQ6IFwiQHN0cmluZ2VuZHF1b3RlXCIgfV1cbiAgICBdLFxuICAgIHN0cmluZ2VuZGRvdWJsZXF1b3RlOiBbXG4gICAgICBbXCJcXFxcXFxcXC5cIiwgXCJzdHJpbmdcIl0sXG4gICAgICBbJ1wiJywgeyB0b2tlbjogXCJzdHJpbmcuZGVsaW1pdGVyXCIsIG5leHQ6IFwiQHBvcFwiIH1dLFxuICAgICAgW1wiLlwiLCBcInN0cmluZ1wiXVxuICAgIF0sXG4gICAgc3RyaW5nZW5kcXVvdGU6IFtcbiAgICAgIFtcIlxcXFxcXFxcLlwiLCBcInN0cmluZ1wiXSxcbiAgICAgIFtcIidcIiwgeyB0b2tlbjogXCJzdHJpbmcuZGVsaW1pdGVyXCIsIG5leHQ6IFwiQHBvcFwiIH1dLFxuICAgICAgW1wiLlwiLCBcInN0cmluZ1wiXVxuICAgIF1cbiAgfVxufTtcbmV4cG9ydCB7XG4gIGNvbmYsXG4gIGxhbmd1YWdlXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///525\n')}}]);