Collab Notes
============

Uses Monaco (the editor from VS Code), WebRTC so that all communication happens peer to peer, and Yjs for synchronised editing. May should consider automerge? They already have an example that does exactly this

TODO
----
### v2
- keyboard shortcuts
  - ⌘B toggle left menu
- alternative storage adaptors server side for enterprise use
  - websocket choice
  - leveldb
    - https://github.com/Level/awesome
    - https://github.com/yjs/y-leveldb
- identity provider - e.g. okta

### Longer term
- mobile friendly
  - remove left lav
  - bottom nav
  - on top comments + menus
- better markdown support / rendering
  - image uploads?
- features
  - whiteboard?
  - spreadsheet / airtable?
- try have a really big editor, with normal scrolling?
- comments v3
  - what is "new" - has "focused" ever - only matters if you've ever commented before
  - scroll comments too as part of line restoration
  - Enlarge to modal
  - "show more" button for long comments
- gdoc / gdrive sync
- dropbox sync
- output files
- local file sync
- design language (hover v active / focused etc)
