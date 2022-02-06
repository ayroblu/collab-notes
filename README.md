Collab Notes
============

Uses Monaco (the editor from VS Code), WebRTC so that all communication happens peer to peer, and Yjs for synchronised editing

TODO
----
### MVP
- comments
  - on click if scroll required, scroll page to where comment actually is
  - seperate button to create comment into its own scoll section
- refactor new room, and new file experience, no longer autojoin
- scroll comments too as part of line restoration
- race condition for undo decorations
  - if commented text no longer exists on page - hide them
- comments v2
  - notifications for when you have new comments / threads
  - collapse comments
  - "resolve" comments - menu?
  - markdown comments
- changing left nav removes decorations
- creating file doesn't go to new file
- loading page has double flash

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
