import React from "react";

import { EditorContext } from "../Contexts";

export const useEditorHeight = () => {
  const { editorDivRef, editorRef } = React.useContext(EditorContext);
  const [editorHeight, setEditorHeight] = React.useState(window.innerHeight);
  const [editorDivHeight, setEditorDivHeight] = React.useState(
    window.innerHeight
  );
  const editor = editorRef.current;
  const editorDiv = editorDivRef.current;
  // return editor.getContentHeight();
  React.useEffect(() => {
    if (!editor || !editorDiv) return;
    const ro = new ResizeObserver(() => {
      const editorDivHeight = editorDiv.getBoundingClientRect().height;
      const editorHeight = editor.getContentHeight();
      setEditorDivHeight(editorDivHeight);

      const alteredEditorHeight =
        editorHeight < editorDivHeight ? editorDivHeight : editorHeight;
      setEditorHeight(alteredEditorHeight);
    });

    // Observe the scrollingElement for when the window gets resized
    ro.observe(editorDiv);
    return () => {
      ro.unobserve(editorDiv);
    };
  }, [editor, editorDiv]);
  return { editorHeight, editorDivHeight };
};
