function epiphany(){
    var urlBar=document.createElement(`input`);
    var iframe=document.createElement(`iframe`);
    var useCORS=false;
    var corsButton=document.createElement(`button`);
    corsButton.innerHTML='&#9776;';
    corsButton.style.position='absolute';
    corsButton.onclick = function(){useCORS=!useCORS;};
    corsButton.style.top='5px';
    corsButton.style.right='50px';
    corsButton.style.height='30px';
    corsButton.style.fontSize='15pt';
    corsButton.title='Disply URL using a cors proxy';
    urlBar.type=`text`;
    urlBar.style.height=`30px`;
    urlBar.style.position=`absolute`;
    urlBar.style.top=`5px`;
    urlBar.style.width=`80%`;
    urlBar.style.left=`10%`;
    urlBar.value=`https://www.gnome.org`;
    urlBar.onkeypress = function(e){
        if (!e) e = window.event;
        var keyCode = e.code || e.key;
        if (keyCode == 'Enter'){
            if(useCORS){
               var url = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(urlBar.value);
            }else{
               var url=urlBar.value;
            }
            iframe.src=url;
           }
    }
    iframe.src='https://www.gnome.org';
    iframe.style.width=`100%`;
    iframe.style.height=`calc(100% - 60px)`;
    iframe.style.border=`none`;
    iframe.allowFullscreen = "allow";
    var window = makeWindow(1000,600,iframe);
    window.appendChild(urlBar);
    window.appendChild(corsButton);
}

registerApp('https://apps.gnome.org/icons/scalable/org.gnome.Epiphany.svg',epiphany,"Epiphany");