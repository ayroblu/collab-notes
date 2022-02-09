Collab Notes
============

Uses Monaco (the editor from VS Code), WebRTC so that all communication happens peer to peer, and Yjs for synchronised editing

TODO
----
### MVP
- refactor new room, and new file experience, no longer autojoin
- seperate button to create comment into its own scoll section
- race condition for undo decorations
  - if commented text no longer exists on page - hide them
- changing left nav removes decorations
- creating file doesn't go to new file
- loading page has double flash
- comments v2
  - on click if scroll required, scroll page to where comment actually is
  - notifications for when you have new comments / threads
  - collapse comments
  - "resolve" comments - menu?
  - scroll comments too as part of line restoration

### Longer term
- migrate to create react app
- rollback history
- gdoc / gdrive sync
- dropbox sync
- output files
- local file sync
- whiteboard?
- image uploads?
- design language (hover v active / focused etc)
- try have a really big editor, with normal scrolling?
- performance
