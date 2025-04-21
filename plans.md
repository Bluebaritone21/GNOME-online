# Plans for GNOME Online

1. Multiple Workspaces
    a. Drop-down in Activities for switching Workspaces
    b. Buttons in Activities to create a new Workspace and delete the one you are on.
    c. Modify `makeWindow()` to open on the current Workspace.
    d. Build styling system for multiple Desktops
2. Build filesystem apps
    a. Build filesystem API (`filesys.js`)
    b. Nautilus App
    c. Modify Text Editor to work with the filesystem
3. Enhanced Console
    a. Terminal mode (formats function calls like how they would be in Unix)
    b. Get rid of that annoying text box
        (I.E. Make it *act* like a terminal, with `onkeypress`.)
4. Build Calculator App
5. Better APIs
    a. Web App version of `makeWindow(w,h,children)`, `makeWebFrame(w,h,url)`
    b. Move the API to a separate file from `wm.js`.
    c. Better functions for 
        * creating, 
        * moving, and
        * styling (or colouring) 
        elements (hereby called widgets)
    d. Redo makeWindow to take a *list* of children, **not** a single child.
6. Add multi-tab functionality to Epiphany
7. Markdown Editor App
8. Manage the remote mirrors of this
    a. Copy this to the Github mirror (minus Minecraft)
    b. *Possibly* clone this to Glitch.me (minus Minecraft)

🄯2025-04-21 Matthew Allison. Few Rights Reserved. Do what you want, within the confines of 
   the GPL v2.0.