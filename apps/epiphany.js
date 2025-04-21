function epiphany(){
    var urlBar=document.createElement(`input`);
    var iframe=document.createElement(`iframe`);
    var useCORS=false;
    var corsButton=document.createElement(`button`);
    var icon=document.createElement("img");
    icon.src="symbolic/network-proxy-symbolic.svg";
    corsButton.appendChild(icon);
    corsButton.style.position='absolute';
    corsButton.onclick = function(){useCORS=!useCORS;
                                    if(useCORS){
                                        corsButton.classList.add("bg-success");
                                    }else{
                                        corsButton.classList.remove("bg-success");
                                    }
                                   };
    corsButton.style.top='5px';
    corsButton.style.right='50px';
    corsButton.style.height='30px';
    corsButton.style.fontSize='15pt';
    corsButton.title='Send Network requests through a CORS proxy (may fix some websites)';
    urlBar.type=`text`;
    urlBar.style.height=`30px`;
    urlBar.style.position=`absolute`;
    urlBar.style.top=`5px`;
    urlBar.style.width=`calc(100% - 120px)`;
    urlBar.style.right=`90px`;
    urlBar.value=`moogle.com.html`;
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
    iframe.src='moogle.com.html';
    iframe.style.width=`100%`;
    iframe.style.height=`calc(100% - 45px)`;
    iframe.style.border=`none`;
    iframe.style.position="absolute";
    iframe.style.top="45px";
    iframe.style.left="0px";
    iframe.allowFullscreen = "allow";
    var window = makeWindow(1000,600,iframe);
    window.appendChild(urlBar);
    window.appendChild(corsButton);
}

registerApp('apps/icons/epiphany.svg',epiphany,"Epiphany");