# Plans for GNOME Online

1. Multiple Workspaces
    1. Drop-down in Activities for switching Workspaces
    2. Buttons in Activities to create a new Workspace and delete the one you are on.
    3. Modify `makeWindow()` to open on the current Workspace.
    4. Build styling system for multiple Desktops
2. Build filesystem apps
    1. Nautilus App
        1.   Add the drop-down menu for creating directories and moving directories and files
        2.  Add better detection of certain filetypes like `md`
        3. Add the option to edit JS files, instead of just executing them.
        4. Add an argument to Nautilus to make it function as a file picker (I.E. Pass the file 
             selected back to the program that called it, instead of opening it normally)
    2. Modify Text Editor to work with the filesystem
        1.   Add a save button
        2.  Add the option to switch to a monospace font and disable spellchecking
        4. Add an open button
        4. Modify the command-line args to just take a file.
3. Enhanced Console
    1. Terminal mode (formats function calls like how they would be in Unix)
    2. Get rid of that annoying text box
        (I.E. Make it *act* like a terminal, with `onkeypress`.)
4. Build Calculator App
5. Better APIs
    1. Web App version of `makeWindow(w,h,children)`, `makeWebFrame(w,h,url)`
    2. Move the API to a separate file from `wm.js`.
    3. Better functions for 
        * creating, 
        * moving, and
        * styling (or colouring) 
        elements

    4. Redo makeWindow to take a *list* of children, **not** a single child.
6. Add multi-tab functionality to Epiphany and make it take a File OR a URL.
7. Markdown Editor App
8. Manage the remote mirrors of this
    1. Copy this to the Github mirror (minus Minecraft)
    2. *Possibly* clone this to Glitch.me (minus Minecraft)
9. Make Loupe take a file as an argument, and when called without them, show an open menu.

🄯2025-04-21 Matthew Allison. Few Rights Reserved. Do what you want, within the confines of 
   the GPL v2.0.