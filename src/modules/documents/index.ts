import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";

type Document = {
  provider: WebrtcProvider;
  type: Y.Text;
};
const docs: { [key: string]: Document } = {};

export function getDocument(name: string) {
  if (docs[name]) {
    return docs[name];
  }
  const ydoc = new Y.Doc();
  const provider = new WebrtcProvider("monaco", ydoc);
  const type = ydoc.getText("monaco");
  docs[name] = { provider, type };
  return docs[name];
}
