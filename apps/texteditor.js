function texteditor(text,ttl){
    var textbox=UIelmnt(`textarea`);
    textbox.style.width='100%';
    textbox.style.height='calc(100%  - 65px)';
    textbox.style.resize='none';
    textbox.value=text;
    var win = makeWindow(600,500,textbox);
    win.style.backgroundColor=colour("light3");
    var title=UIelmnt('h3');
    title.innerText=ttl;
    title.style.position='absolute';
    title.style.top='-5px';
    title.style.textAlign="center";
    title.style.width="50%";
    title.style.left="25%";
    title.style.pointerEvents="none";
    win.appendChild(title);
}

registerApp("apps/icons/texteditor.svg",function(){texteditor("","Untitled Document")}, "Text Editor");