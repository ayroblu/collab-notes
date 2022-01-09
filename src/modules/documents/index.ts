import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";

type Document = {
  provider: WebrtcProvider;
  type: Y.Text;
};
const docs: { [key: string]: Document } = {};

export function getDocument(name: string, password: string): Document {
  const myDoc = docs[name];
  if (myDoc) {
    return myDoc;
  }
  const ydoc = new Y.Doc();
  // @ts-expect-error - types are wrong
  const provider = new WebrtcProvider(name, ydoc, { password });
  const type = ydoc.getText(name);

  docs[name] = { provider, type };
  return { provider, type };
}
