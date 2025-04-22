# Plans for GNOME Online

1. Multiple Workspaces
    a. Drop-down in Activities for switching Workspaces
    b. Buttons in Activities to create a new Workspace and delete the one you are on.
    c. Modify `makeWindow()` to open on the current Workspace.
    d. Build styling system for multiple Desktops
2. Build filesystem apps
    a. Nautilus App
        i.   Add the drop-down menu for creating directories and moving directories and files
        ii.  Add better detection of certain filetypes like `md`
        iii. Add the option to edit JS files, instead of just executing them.
        iv. Add an argument to Nautilus to make it function as a file picker (I.E. Pass the file 
             selected back to the program that called it, instead of opening it normally)
    b. Modify Text Editor to work with the filesystem
        i.   Add a save button
        ii.  Add the option to switch to a monospace font and disable spellchecking
        iii. Add an open button
        iv. Modify the command-line args to just take a file.
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
        elements
    d. Redo makeWindow to take a *list* of children, **not** a single child.
6. Add multi-tab functionality to Epiphany and make it take a File OR a URL.
7. Markdown Editor App
8. Manage the remote mirrors of this
    a. Copy this to the Github mirror (minus Minecraft)
    b. *Possibly* clone this to Glitch.me (minus Minecraft)
9. Make Loupe take a file as an argument, and when called without them, show an open menu.

🄯2025-04-21 Matthew Allison. Few Rights Reserved. Do what you want, within the confines of 
   the GPL v2.0.