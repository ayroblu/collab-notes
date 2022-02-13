import React from "react";
import { useRecoilValue } from "recoil";

import { EditorContext } from "../Contexts";
import { editorDidCreateState } from "../data-model";

export const useEditorHeight = () => {
  const { editorDivRef, editorRef } = React.useContext(EditorContext);
  const [editorHeight, setEditorHeight] = React.useState(window.innerHeight);
  const [editorDivHeight, setEditorDivHeight] = React.useState(
    window.innerHeight
  );
  const editorDidCreate = useRecoilValue(editorDidCreateState);
  React.useEffect(() => {
    const editor = editorRef.current;
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
  }, [editorDivRef, editorRef, editorDidCreate]);
  return { editorHeight, editorDivHeight };
};
