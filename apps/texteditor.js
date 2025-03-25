function texteditor(){
    var textbox=document.createElement(`textarea`);
    textbox.style.width='100%';
    textbox.style.height='calc(100% - 40px)';
    textbox.style.resize='none';
    var win = makeWindow(600,500,textbox);
    win.style.backgroundColor='#eaeaea';
    var title  =document.createElement('h3');
    title.innerText='Untitled Document';
    title.style.position='absolute';
    title.style.top='-5px';
    title.style.left='30%';
    win.appendChild(title);
}

registerApp("https://apps.gnome.org/icons/scalable/org.gnome.TextEditor.svg",texteditor, "Text Editor");