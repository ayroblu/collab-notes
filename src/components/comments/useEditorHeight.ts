import React from "react";

import { EditorContext } from "../Contexts";

export const useEditorHeight = () => {
  const { editor, editorDivRef } = React.useContext(EditorContext);
  const [editorHeight, setEditorHeight] = React.useState(
    window.innerHeight - 40,
  );
  const [editorDivHeight, setEditorDivHeight] = React.useState(
    window.innerHeight,
  );
  React.useEffect(() => {
    const editorDiv = editorDivRef.current;
    if (!editor || !editorDiv) return;
    const ro = new ResizeObserver(() => {
      const editorDivHeight = editorDiv.offsetHeight;
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
  }, [editorDivRef, editor]);
  return { editorHeight, editorDivHeight };
};
