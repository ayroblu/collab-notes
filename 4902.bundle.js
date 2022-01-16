"use strict";(self.webpackChunkcollab_notes=self.webpackChunkcollab_notes||[]).push([[4902],{4902:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "conf": () => (/* binding */ conf),\n/* harmony export */   "language": () => (/* binding */ language)\n/* harmony export */ });\n/* harmony import */ var _editor_editor_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4879);\n/*!-----------------------------------------------------------------------------\n * Copyright (c) Microsoft Corporation. All rights reserved.\n * Version: 0.31.1(337587859b1c171314b40503171188b6cea6a32a)\n * Released under the MIT license\n * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt\n *-----------------------------------------------------------------------------*/\n\nvar __defProp = Object.defineProperty;\nvar __getOwnPropDesc = Object.getOwnPropertyDescriptor;\nvar __getOwnPropNames = Object.getOwnPropertyNames;\nvar __hasOwnProp = Object.prototype.hasOwnProperty;\nvar __markAsModule = (target) => __defProp(target, "__esModule", { value: true });\nvar __reExport = (target, module, desc) => {\n  if (module && typeof module === "object" || typeof module === "function") {\n    for (let key of __getOwnPropNames(module))\n      if (!__hasOwnProp.call(target, key) && key !== "default")\n        __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });\n  }\n  return target;\n};\n\n// src/fillers/monaco-editor-core.ts\nvar monaco_editor_core_exports = {};\n__markAsModule(monaco_editor_core_exports);\n__reExport(monaco_editor_core_exports, _editor_editor_api_js__WEBPACK_IMPORTED_MODULE_0__);\n\n\n// src/basic-languages/xml/xml.ts\nvar conf = {\n  comments: {\n    blockComment: ["\x3c!--", "--\x3e"]\n  },\n  brackets: [["<", ">"]],\n  autoClosingPairs: [\n    { open: "<", close: ">" },\n    { open: "\'", close: "\'" },\n    { open: \'"\', close: \'"\' }\n  ],\n  surroundingPairs: [\n    { open: "<", close: ">" },\n    { open: "\'", close: "\'" },\n    { open: \'"\', close: \'"\' }\n  ],\n  onEnterRules: [\n    {\n      beforeText: new RegExp(`<([_:\\\\w][_:\\\\w-.\\\\d]*)([^/>]*(?!/)>)[^<]*$`, "i"),\n      afterText: /^<\\/([_:\\w][_:\\w-.\\d]*)\\s*>$/i,\n      action: {\n        indentAction: monaco_editor_core_exports.languages.IndentAction.IndentOutdent\n      }\n    },\n    {\n      beforeText: new RegExp(`<(\\\\w[\\\\w\\\\d]*)([^/>]*(?!/)>)[^<]*$`, "i"),\n      action: { indentAction: monaco_editor_core_exports.languages.IndentAction.Indent }\n    }\n  ]\n};\nvar language = {\n  defaultToken: "",\n  tokenPostfix: ".xml",\n  ignoreCase: true,\n  qualifiedName: /(?:[\\w\\.\\-]+:)?[\\w\\.\\-]+/,\n  tokenizer: {\n    root: [\n      [/[^<&]+/, ""],\n      { include: "@whitespace" },\n      [/(<)(@qualifiedName)/, [{ token: "delimiter" }, { token: "tag", next: "@tag" }]],\n      [\n        /(<\\/)(@qualifiedName)(\\s*)(>)/,\n        [{ token: "delimiter" }, { token: "tag" }, "", { token: "delimiter" }]\n      ],\n      [/(<\\?)(@qualifiedName)/, [{ token: "delimiter" }, { token: "metatag", next: "@tag" }]],\n      [/(<\\!)(@qualifiedName)/, [{ token: "delimiter" }, { token: "metatag", next: "@tag" }]],\n      [/<\\!\\[CDATA\\[/, { token: "delimiter.cdata", next: "@cdata" }],\n      [/&\\w+;/, "string.escape"]\n    ],\n    cdata: [\n      [/[^\\]]+/, ""],\n      [/\\]\\]>/, { token: "delimiter.cdata", next: "@pop" }],\n      [/\\]/, ""]\n    ],\n    tag: [\n      [/[ \\t\\r\\n]+/, ""],\n      [/(@qualifiedName)(\\s*=\\s*)("[^"]*"|\'[^\']*\')/, ["attribute.name", "", "attribute.value"]],\n      [\n        /(@qualifiedName)(\\s*=\\s*)("[^">?\\/]*|\'[^\'>?\\/]*)(?=[\\?\\/]\\>)/,\n        ["attribute.name", "", "attribute.value"]\n      ],\n      [/(@qualifiedName)(\\s*=\\s*)("[^">]*|\'[^\'>]*)/, ["attribute.name", "", "attribute.value"]],\n      [/@qualifiedName/, "attribute.name"],\n      [/\\?>/, { token: "delimiter", next: "@pop" }],\n      [/(\\/)(>)/, [{ token: "tag" }, { token: "delimiter", next: "@pop" }]],\n      [/>/, { token: "delimiter", next: "@pop" }]\n    ],\n    whitespace: [\n      [/[ \\t\\r\\n]+/, ""],\n      [/\x3c!--/, { token: "comment", next: "@comment" }]\n    ],\n    comment: [\n      [/[^<\\-]+/, "comment.content"],\n      [/--\x3e/, { token: "comment", next: "@pop" }],\n      [/\x3c!--/, "comment.content.invalid"],\n      [/[<\\-]/, "comment.content"]\n    ]\n  }\n};\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNDkwMi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtRUFBbUUsYUFBYTtBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxnR0FBZ0c7QUFDakk7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxrREFBdUI7QUFDUTs7QUFFdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLE1BQU0sdUJBQXVCO0FBQzdCLE1BQU0sdUJBQXVCO0FBQzdCLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTSx1QkFBdUI7QUFDN0IsTUFBTSx1QkFBdUI7QUFDN0IsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSx3QkFBd0I7QUFDaEMsaUNBQWlDLG9CQUFvQixJQUFJLDRCQUE0QjtBQUNyRjtBQUNBO0FBQ0EsV0FBVyxvQkFBb0IsSUFBSSxjQUFjLFFBQVEsb0JBQW9CO0FBQzdFO0FBQ0EsbUNBQW1DLG9CQUFvQixJQUFJLGdDQUFnQztBQUMzRixtQ0FBbUMsb0JBQW9CLElBQUksZ0NBQWdDO0FBQzNGLHlCQUF5QiwwQ0FBMEM7QUFDbkUsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQix3Q0FBd0M7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixrQ0FBa0M7QUFDbEQscUJBQXFCLGNBQWMsSUFBSSxrQ0FBa0M7QUFDekUsY0FBYyxrQ0FBa0M7QUFDaEQ7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLG9DQUFvQztBQUNyRDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsZ0NBQWdDO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJRSIsInNvdXJjZXMiOlsid2VicGFjazovL2NvbGxhYi1ub3Rlcy8uL25vZGVfbW9kdWxlcy9tb25hY28tZWRpdG9yL2VzbS92cy9iYXNpYy1sYW5ndWFnZXMveG1sL3htbC5qcz82ODdkIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFZlcnNpb246IDAuMzEuMSgzMzc1ODc4NTliMWMxNzEzMTRiNDA1MDMxNzExODhiNmNlYTZhMzJhKVxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L21vbmFjby1lZGl0b3IvYmxvYi9tYWluL0xJQ0VOU0UudHh0XG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxudmFyIF9fZGVmUHJvcCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbnZhciBfX2dldE93blByb3BEZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbnZhciBfX2dldE93blByb3BOYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzO1xudmFyIF9faGFzT3duUHJvcCA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgX19tYXJrQXNNb2R1bGUgPSAodGFyZ2V0KSA9PiBfX2RlZlByb3AodGFyZ2V0LCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBfX3JlRXhwb3J0ID0gKHRhcmdldCwgbW9kdWxlLCBkZXNjKSA9PiB7XG4gIGlmIChtb2R1bGUgJiYgdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgbW9kdWxlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBmb3IgKGxldCBrZXkgb2YgX19nZXRPd25Qcm9wTmFtZXMobW9kdWxlKSlcbiAgICAgIGlmICghX19oYXNPd25Qcm9wLmNhbGwodGFyZ2V0LCBrZXkpICYmIGtleSAhPT0gXCJkZWZhdWx0XCIpXG4gICAgICAgIF9fZGVmUHJvcCh0YXJnZXQsIGtleSwgeyBnZXQ6ICgpID0+IG1vZHVsZVtrZXldLCBlbnVtZXJhYmxlOiAhKGRlc2MgPSBfX2dldE93blByb3BEZXNjKG1vZHVsZSwga2V5KSkgfHwgZGVzYy5lbnVtZXJhYmxlIH0pO1xuICB9XG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG4vLyBzcmMvZmlsbGVycy9tb25hY28tZWRpdG9yLWNvcmUudHNcbnZhciBtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cyA9IHt9O1xuX19tYXJrQXNNb2R1bGUobW9uYWNvX2VkaXRvcl9jb3JlX2V4cG9ydHMpO1xuX19yZUV4cG9ydChtb25hY29fZWRpdG9yX2NvcmVfZXhwb3J0cywgbW9uYWNvX2VkaXRvcl9jb3JlX3N0YXIpO1xuaW1wb3J0ICogYXMgbW9uYWNvX2VkaXRvcl9jb3JlX3N0YXIgZnJvbSBcIi4uLy4uL2VkaXRvci9lZGl0b3IuYXBpLmpzXCI7XG5cbi8vIHNyYy9iYXNpYy1sYW5ndWFnZXMveG1sL3htbC50c1xudmFyIGNvbmYgPSB7XG4gIGNvbW1lbnRzOiB7XG4gICAgYmxvY2tDb21tZW50OiBbXCI8IS0tXCIsIFwiLS0+XCJdXG4gIH0sXG4gIGJyYWNrZXRzOiBbW1wiPFwiLCBcIj5cIl1dLFxuICBhdXRvQ2xvc2luZ1BhaXJzOiBbXG4gICAgeyBvcGVuOiBcIjxcIiwgY2xvc2U6IFwiPlwiIH0sXG4gICAgeyBvcGVuOiBcIidcIiwgY2xvc2U6IFwiJ1wiIH0sXG4gICAgeyBvcGVuOiAnXCInLCBjbG9zZTogJ1wiJyB9XG4gIF0sXG4gIHN1cnJvdW5kaW5nUGFpcnM6IFtcbiAgICB7IG9wZW46IFwiPFwiLCBjbG9zZTogXCI+XCIgfSxcbiAgICB7IG9wZW46IFwiJ1wiLCBjbG9zZTogXCInXCIgfSxcbiAgICB7IG9wZW46ICdcIicsIGNsb3NlOiAnXCInIH1cbiAgXSxcbiAgb25FbnRlclJ1bGVzOiBbXG4gICAge1xuICAgICAgYmVmb3JlVGV4dDogbmV3IFJlZ0V4cChgPChbXzpcXFxcd11bXzpcXFxcdy0uXFxcXGRdKikoW14vPl0qKD8hLyk+KVtePF0qJGAsIFwiaVwiKSxcbiAgICAgIGFmdGVyVGV4dDogL148XFwvKFtfOlxcd11bXzpcXHctLlxcZF0qKVxccyo+JC9pLFxuICAgICAgYWN0aW9uOiB7XG4gICAgICAgIGluZGVudEFjdGlvbjogbW9uYWNvX2VkaXRvcl9jb3JlX2V4cG9ydHMubGFuZ3VhZ2VzLkluZGVudEFjdGlvbi5JbmRlbnRPdXRkZW50XG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBiZWZvcmVUZXh0OiBuZXcgUmVnRXhwKGA8KFxcXFx3W1xcXFx3XFxcXGRdKikoW14vPl0qKD8hLyk+KVtePF0qJGAsIFwiaVwiKSxcbiAgICAgIGFjdGlvbjogeyBpbmRlbnRBY3Rpb246IG1vbmFjb19lZGl0b3JfY29yZV9leHBvcnRzLmxhbmd1YWdlcy5JbmRlbnRBY3Rpb24uSW5kZW50IH1cbiAgICB9XG4gIF1cbn07XG52YXIgbGFuZ3VhZ2UgPSB7XG4gIGRlZmF1bHRUb2tlbjogXCJcIixcbiAgdG9rZW5Qb3N0Zml4OiBcIi54bWxcIixcbiAgaWdub3JlQ2FzZTogdHJ1ZSxcbiAgcXVhbGlmaWVkTmFtZTogLyg/OltcXHdcXC5cXC1dKzopP1tcXHdcXC5cXC1dKy8sXG4gIHRva2VuaXplcjoge1xuICAgIHJvb3Q6IFtcbiAgICAgIFsvW148Jl0rLywgXCJcIl0sXG4gICAgICB7IGluY2x1ZGU6IFwiQHdoaXRlc3BhY2VcIiB9LFxuICAgICAgWy8oPCkoQHF1YWxpZmllZE5hbWUpLywgW3sgdG9rZW46IFwiZGVsaW1pdGVyXCIgfSwgeyB0b2tlbjogXCJ0YWdcIiwgbmV4dDogXCJAdGFnXCIgfV1dLFxuICAgICAgW1xuICAgICAgICAvKDxcXC8pKEBxdWFsaWZpZWROYW1lKShcXHMqKSg+KS8sXG4gICAgICAgIFt7IHRva2VuOiBcImRlbGltaXRlclwiIH0sIHsgdG9rZW46IFwidGFnXCIgfSwgXCJcIiwgeyB0b2tlbjogXCJkZWxpbWl0ZXJcIiB9XVxuICAgICAgXSxcbiAgICAgIFsvKDxcXD8pKEBxdWFsaWZpZWROYW1lKS8sIFt7IHRva2VuOiBcImRlbGltaXRlclwiIH0sIHsgdG9rZW46IFwibWV0YXRhZ1wiLCBuZXh0OiBcIkB0YWdcIiB9XV0sXG4gICAgICBbLyg8XFwhKShAcXVhbGlmaWVkTmFtZSkvLCBbeyB0b2tlbjogXCJkZWxpbWl0ZXJcIiB9LCB7IHRva2VuOiBcIm1ldGF0YWdcIiwgbmV4dDogXCJAdGFnXCIgfV1dLFxuICAgICAgWy88XFwhXFxbQ0RBVEFcXFsvLCB7IHRva2VuOiBcImRlbGltaXRlci5jZGF0YVwiLCBuZXh0OiBcIkBjZGF0YVwiIH1dLFxuICAgICAgWy8mXFx3KzsvLCBcInN0cmluZy5lc2NhcGVcIl1cbiAgICBdLFxuICAgIGNkYXRhOiBbXG4gICAgICBbL1teXFxdXSsvLCBcIlwiXSxcbiAgICAgIFsvXFxdXFxdPi8sIHsgdG9rZW46IFwiZGVsaW1pdGVyLmNkYXRhXCIsIG5leHQ6IFwiQHBvcFwiIH1dLFxuICAgICAgWy9cXF0vLCBcIlwiXVxuICAgIF0sXG4gICAgdGFnOiBbXG4gICAgICBbL1sgXFx0XFxyXFxuXSsvLCBcIlwiXSxcbiAgICAgIFsvKEBxdWFsaWZpZWROYW1lKShcXHMqPVxccyopKFwiW15cIl0qXCJ8J1teJ10qJykvLCBbXCJhdHRyaWJ1dGUubmFtZVwiLCBcIlwiLCBcImF0dHJpYnV0ZS52YWx1ZVwiXV0sXG4gICAgICBbXG4gICAgICAgIC8oQHF1YWxpZmllZE5hbWUpKFxccyo9XFxzKikoXCJbXlwiPj9cXC9dKnwnW14nPj9cXC9dKikoPz1bXFw/XFwvXVxcPikvLFxuICAgICAgICBbXCJhdHRyaWJ1dGUubmFtZVwiLCBcIlwiLCBcImF0dHJpYnV0ZS52YWx1ZVwiXVxuICAgICAgXSxcbiAgICAgIFsvKEBxdWFsaWZpZWROYW1lKShcXHMqPVxccyopKFwiW15cIj5dKnwnW14nPl0qKS8sIFtcImF0dHJpYnV0ZS5uYW1lXCIsIFwiXCIsIFwiYXR0cmlidXRlLnZhbHVlXCJdXSxcbiAgICAgIFsvQHF1YWxpZmllZE5hbWUvLCBcImF0dHJpYnV0ZS5uYW1lXCJdLFxuICAgICAgWy9cXD8+LywgeyB0b2tlbjogXCJkZWxpbWl0ZXJcIiwgbmV4dDogXCJAcG9wXCIgfV0sXG4gICAgICBbLyhcXC8pKD4pLywgW3sgdG9rZW46IFwidGFnXCIgfSwgeyB0b2tlbjogXCJkZWxpbWl0ZXJcIiwgbmV4dDogXCJAcG9wXCIgfV1dLFxuICAgICAgWy8+LywgeyB0b2tlbjogXCJkZWxpbWl0ZXJcIiwgbmV4dDogXCJAcG9wXCIgfV1cbiAgICBdLFxuICAgIHdoaXRlc3BhY2U6IFtcbiAgICAgIFsvWyBcXHRcXHJcXG5dKy8sIFwiXCJdLFxuICAgICAgWy88IS0tLywgeyB0b2tlbjogXCJjb21tZW50XCIsIG5leHQ6IFwiQGNvbW1lbnRcIiB9XVxuICAgIF0sXG4gICAgY29tbWVudDogW1xuICAgICAgWy9bXjxcXC1dKy8sIFwiY29tbWVudC5jb250ZW50XCJdLFxuICAgICAgWy8tLT4vLCB7IHRva2VuOiBcImNvbW1lbnRcIiwgbmV4dDogXCJAcG9wXCIgfV0sXG4gICAgICBbLzwhLS0vLCBcImNvbW1lbnQuY29udGVudC5pbnZhbGlkXCJdLFxuICAgICAgWy9bPFxcLV0vLCBcImNvbW1lbnQuY29udGVudFwiXVxuICAgIF1cbiAgfVxufTtcbmV4cG9ydCB7XG4gIGNvbmYsXG4gIGxhbmd1YWdlXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///4902\n')}}]);