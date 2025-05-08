//wm.js: Window Manager and API definitions


// login manager

function lock(){
    if(localStorage.passwordHash){
        $("login-screen").style.display = "block";
        $("username-login").innerText = localStorage.username;
        $("activity-button").style.display = "none";
        $("activity-bar").style.backgroundColor = colour("dark4");
    }
}

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        lock();
    }
});

function validatePassword(){
    var box = $("password-box");
    passHashTo(box.value,function(hash){ 
        /*
        If you are here looking for a secure login manager, you won't find it.
        This WHOLE SCREEN can get deleted or hidden by a few keystrokes on the 
        client's computer, and the rest of the desktop is still visible below it.
        Plus, ANY PROGRAM can change or remove your password! (Though, it is still
        hashed.)
        YOU HAVE BEEN WARNED!
        ~BlueBaritone21
        */
        if(hash == localStorage.passwordHash){
            box.value =  "";
            $("login-screen").style.display = "none";
            $("activity-button").style.display = "block";
            $("activity-bar").style.backgroundColor=colour("dark5");
        }
    });
}

function removeLogin(){
    localStorage.passwordHash = "";
    return "Login removed.";
}

function addLogin(){
    var usernameBox = UIelmnt("input");
    usernameBox.type = "text";
    var passwordBox = UIelmnt("input");
    passwordBox.type = "password";
    var win = confirm("Enter your new username & password",function(){setUserDetails(usernameBox.value,passwordBox.value);});
    win.appendChild(UIelmnt("br"));
    win.appendChild(usernameBox);
    win.appendChild(UIelmnt("br"));
    win.appendChild(passwordBox);
    return "Please use the newly spawned window to set your username and password.";
}

function setUserDetails(username,pass){
    localStorage.username = username
    passHashTo(pass,function(h){localStorage.passwordHash=h})
}

function passHashTo(msg,f){
    var decoder = (new TextDecoder);
    window.crypto.subtle.digest("SHA-256", (new TextEncoder).encode(msg)).then(function(h){f(decoder.decode(h))});
}


// END login manager

var gensym = 0;
var activities = false;

fs = null;

function toggleActivities(){
    if(!activities){
        document.getElementsByTagName("desktop")[0].classList.add("small");
        $("activity-bar").style.backgroundColor="var(--dark4)";
    }else{
        document.getElementsByTagName("desktop")[0].classList.remove("small");
        $("activity-bar").style.backgroundColor="var(--dark5)";
    }
    activities = !activities;
}

var debugOn = false;

function debug(){
    if(!debugOn){
        var script = document.createElement('script');
        script.src='https://cdn.jsdelivr.net/npm/eruda';
        script.onload=function(e){eruda.init();}
        document.body.appendChild(script);
        $("debug-button").classList.remove("bg-dark");
        $("debug-button").classList.add("bg-accent");
        debugOn = true;
    }
}

//Functions for the quick-settings
quicksettings = false;

function toggleQuicksettings(){
    if(!quicksettings){
        $("quicksettings").style.display="block";
        $("quicksettings").style.opacity="1";
    }else{
        $("quicksettings").style.opacity="0";
        $("quicksettings").style.display="none";
    }
    quicksettings = !quicksettings;
}

function toggleFullscreen(){
    if(document.fullscreenElement===null){
        document.documentElement.requestFullscreen();
        $("fullscreen-button").classList.remove("bg-dark");
        $("fullscreen-button").classList.add("bg-accent");
    }else{
        document.exitFullscreen();
        $("fullscreen-button").classList.add("bg-dark");
        $("fullscreen-button").classList.remove("bg-accent");
    }
}

function toggleDarkStyle() {
    localStorage.darkStyle = document.documentElement.classList.toggle('dark-mode').toString();
    if(localStorage.darkStyle=="true"){
        $("darkmode-button").classList.remove("bg-dark");
        $("darkmode-button").classList.add("bg-accent");
    }else{
        $("darkmode-button").classList.add("bg-dark"); 
        $("darkmode-button").classList.remove("bg-accent");
    }
}

var lastheight = 0;

function dragElement(elmnt) {
  var deltaX = 0, deltaY = 0, X = 0, Y = 0;
  $(elmnt.id + "header").onmousedown = dragMouseDown;
  $(elmnt.id + "header").ondbclick = function(){repos(elmnt,0,30);resize(elmnt,"100%","calc(100% - 30px)");};
  
  function dragMouseDown(e) {
    elmnt.style.zIndex=lastheight;
    e = e || window.event;
    e.preventDefault();

    X = e.clientX;
    Y = e.clientY;
    lastheight++;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    deltaX = X - e.clientX;
    deltaY = Y - e.clientY;
    X = e.clientX;
    Y = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - deltaY) + "px";
    elmnt.style.left = (elmnt.offsetLeft - deltaX) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function online(){
    var wifi_button = $("network-button");
    wifi_button.src = getIcon("radiowaves-1");
    wifi_button.classList.add("white-icon");
    wifi_button.title="connected";
}

window.addEventListener("online",online)

window.addEventListener("offline",function(e){
    var wifi_button = $("network-button");
    wifi_button.src = getIcon("radiowaves-5");
    wifi_button.classList.add("white-icon");
    wifi_button.title="not connected";
})

window.onbeforeunload = function(e) {
    e.preventDefault();
}

function setAccent(clr){
    for(let i=1;i<=5;i++){
        document.documentElement.style.setProperty("--accent"+i,colour(clr+i));
    }
    localStorage.accentColour=clr;
}

window.onload = function() {
    online();
    function hideBoot(){$("boot-cover").style.display = "none";
        lock();}
    if(localStorage.darkStyle=="true"){
        d.documentElement.classList.add("dark-mode");
        $("darkmode-button").classList.remove("bg-dark");
        $("darkmode-button").classList.add("bg-accent");
        setTimeout(hideBoot,3000);
    }
    if(localStorage.accentColour){
        setAccent(localStorage.accentColour);
    }else{
        setAccent("blue");
    }
    try {
        navigator.getBattery().then(function(battery) {
            function updateIcon() {
                var battery_button = $("battery-button");
                battery_button.title = battery.level * 100 + "%" + (battery.charging ? " - charging" : "");
                if (!battery.charging) {
                    if (battery.level == 1) {
                        battery_button.classList.add("white-icon");
                        battery_button.src = getIcon("battery-level-100");
                    } else if (battery.level >= 0.3) {
                        battery_button.classList.add("white-icon");
                        battery_button.src = getIcon("battery-level-" + Math.round(battery.level * 10) * 10);
                    } else if (battery.level >= 0.2) {
                        battery_button.classList.add("white-icon");
                        battery_button.src = getIcon("battery-low");
                    } else {
                        battery_button.classList.remove("white-icon");
                        battery_button.src = getIcon("battery-action");
                    }
                } else {
                    if (battery.level >= 0.5) {
                        battery_button.classList.add("white-icon");
                        battery_button.src = getIcon("battery-level-100-charged");
                    } else {
                        battery_button.classList.add("white-icon");
                        battery_button.src = getIcon("battery-level-0-charging");
                    }
                }
            }
            updateIcon();
            battery.onlevelchange = updateIcon;
            battery.onchargingchange = updateIcon;
        });
    } catch {
        error("Your browser doesn't support the Battery API!");
    } finally {
        function time() {
            var d = new Date();
            var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][d.getMonth()];
            var date = d.getDate();
            var min = d.getMinutes();
            if (min.toString().length < 2) {
                min = "0" + min;
            }
            var hour = d.getHours();
            document.getElementsByClassName("activity-bar")[0].innerHTML = month + " " + date + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + hour + ":" + min;
        }

        time();
        setInterval(time, 1000);
        
        if(localStorage.darkStyle!="true"){
            hideBoot()
        }
    }
};

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

window.onerror = function(text,url,line,col,err){error("line "+line+", col "+col+": "+text)}

warn = function(text){makeAlert(text,"warning")};

alert = function(text){makeAlert(text,"")};
window.alert = alert;

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

function makeWindow(wdth,hght,contents,onClose=function(){}){
    gensym++;
    var currentGensym=gensym;
    var clone = $("window").cloneNode(true);
    clone.id = "window"+gensym;
    clone.querySelector("#windowheader").id = "window"+gensym+"header";
    document.getElementsByTagName("desktop")[0].appendChild(clone);
    clone.querySelector(".close").addEventListener("click",function(){this.parentNode.remove();onClose()});
    dragElement(clone);
    clone.style.width = wdth+"px";
    clone.style.height= hght+"px";
    clone.appendChild(contents);
    clone.style.zIndex = lastheight++;
    return clone;
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
