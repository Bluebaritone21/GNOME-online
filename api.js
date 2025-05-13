//api.js: Public API

function makeWindow(wdth,hght,contents,onClose=function(){}){
    gensym++;
    var clone = $("window").cloneNode(true);
    clone.id = "window"+gensym;
    clone.querySelector("#windowheader").id = "window"+gensym+"header";
    currentWork.desk.appendChild(clone);
    clone.querySelector(".close").addEventListener("click",function(){this.parentNode.remove();onClose()});
    dragElement(clone);
    if (window.innerHeight > window.innerWidth) {
        resize(clone, '100%', 'calc(100% - 30px)');
        repos(clone, 0, 30);
    } else {
        resize(clone, wdth, hght);
    }
    clone.appendChild(contents);
    clone.style.zIndex = lastheight++;
    return clone;
}

function makeWebviewWindow(w,h,url){
    var iframe=document.createElement(`iframe`);
    iframe.style.position=`absolute`;
    iframe.style.top=`40px`;
    iframe.style.left=`0px`;
    iframe.src=url;
    iframe.style.width=`100%`;
    iframe.style.height=`calc(100% - 40px)`;
    iframe.style.border=`none`;
    iframe.allowFullscreen = "allow";
    makeWindow(w,h,iframe);
}

function registerApp(icon, openfunction ,titleText) {
    var taskbar = $("taskbar");
    var button = document.createElement("button");
    button.classList.add("app-button");
    button.onclick = function(){try{openfunction()}catch(e){error(e)}};
    var image = document.createElement("img");
    image.src = icon;
    image.style.height = "70px";
    image.style.width = "70px";
    image.title = titleText;
    button.appendChild(image);
    taskbar.appendChild(button);
}

d = document;

function UIelmnt(type){
    return d.createElement(type);
}

function repos(elmt,x,y){
    elmt.style.position="absolute";
    elmt.style.left=(typeof(x) == "string")?x:x+"px";
    elmt.style.top=(typeof(y) == "string")?y:y+"px";
}

function resize(elmt,w,h){
    elmt.style.width=(typeof(w) == "string")?w:w+"px";
    elmt.style.height=(typeof(h) == "string")?h:h+"px";
}

function $(id){
    return document.getElementById(id);
}


function label(text,type="p",cls=""){
    var lbl = UIelmnt(type);
    lbl.innerHTML = text;
    if(cls){lbl.classList.add(cls);}
    return lbl;
}

function confirm(text, callback,level="success"){
    var buttonCancel = UIelmnt("button");
    var buttonOk = UIelmnt("button");
    buttonOk.innerText="Ok";
    buttonCancel.innerText="Cancel";
    buttonOk.classList.add("bg-accent");
    buttonCancel.style.fontWeight="bold";
    buttonCancel.style.fontSize="10pt";
    buttonCancel.style.padding="10px";
    buttonCancel.onclick = function(e){
        win.remove();
    }
    buttonOk.style.fontWeight="bold";
    buttonOk.style.fontSize="10pt";
    buttonOk.style.padding="10px";
    buttonOk.onclick = function(e){
        win.remove();
        callback();
    }
    var lb = label(text,"h4","fg-"+level);
    lb.style.whiteSpace = "nowrap";
    repos(lb,0,5);
    lb.style.overflowX="scroll"
    resize(lb,"100%","unset")
    var win = makeWindow(300,145,lb);
    win.querySelector(".close").remove();
    win.appendChild(buttonCancel);
    win.appendChild(buttonOk);
    win.style.textAlign = "center"; // 'cuz CSS is dumb and can't spell centre.
    return win;
}

function rclickMenu(elmnt,options){
    elmnt.addEventListener('contextmenu', function(e) {
        try{
            var list = [...options,{l:"Cancel",f:function(){}}];
            e.preventDefault();
            var lst = UIelmnt("div");
            var menu = makeWindow(200, 30 + ((options.length + 1) * 35),lst);
            menu.style.resize = "none";
            repos(menu,e.x,e.y);
            $(`${menu.id}header`).remove();
            menu.querySelector(".close").remove();
            menu.style.overflowY = "scroll";
            list.forEach(function(item){
                let blt = UIelmnt("li");
                blt.innerText = item.l;
                blt.onclick = function(){item.f();menu.remove();}
                lst.appendChild(blt);
            });
        }catch(er){error(er)}
    }); 
}

function makeAlert(text,level="success"){
    var button = UIelmnt("button");
    button.innerText="Ok";
    button.classList.add("bg-accent");
    button.style.fontWeight="bold";
    button.style.fontSize="10pt";
    button.style.padding="10px";
    button.onclick = function(e){
        win.remove();
    }
    var lb = label(text,"h4","fg-"+level);
    lb.style.whiteSpace = "nowrap";
    repos(lb,0,5);
    lb.style.overflowX="scroll"
    resize(lb,"100%","unset")
    var win = makeWindow(300,145,lb);
    win.querySelector(".close").remove();
    win.appendChild(button);
    win.style.textAlign = "center"; // 'cuz CSS is dumb and can't spell centre.
    return win;
}

function colour(clr){
    return "var(--"+clr+")";
}

function getIcon(name){
    return "symbolic/"+name+"-symbolic.svg";
}

error = function(text){makeAlert(text,"destructive")};
console.error = error;

window.onerror = function(text,url,line,col,err){window.alerterror("line "+line+", col "+col+": "+text)}

warn = function(text){makeAlert(text,"warning")};

alert = function(text){makeAlert(text,"")};
window.alert = alert;

