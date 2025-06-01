//wm.js: Window Manager


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
        Array.from(document.getElementsByTagName("desktop")).forEach(function(doc){
            doc.classList.add("small");
        });
        $("activity-bar").style.backgroundColor="var(--dark4)";
    }else{
        Array.from(document.getElementsByTagName("desktop")).forEach(function(doc){
            doc.classList.remove("small");
        });
        $("activity-bar").style.backgroundColor="var(--dark5)";
    }
    activities = !activities;
}

var debugOn = false;

function debug(f=function(){}){
    if(!debugOn){
        var script = document.createElement('script');
        script.src='https://cdn.jsdelivr.net/npm/eruda';
        script.onload=function(e){eruda.init();f()}
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

/*window.onbeforeunload = function(e) {
    if(top===self){
        e.preventDefault();
    }
}*/

function setAccent(clr){
    for(let i=1;i<=5;i++){
        document.documentElement.style.setProperty("--accent"+i,colour(clr+i));
    }
    // $("col-meta").setAttribute('content', getComputedStyle(document.documentElement).getPropertyValue('--accent3').trim());
    localStorage.accentColour=clr;
}

window.onload = function(){
    
    online();
    
    function openWork(){
        let work = new Workspace();
        currentWork = work;
        work.desk.classList.remove('small');
        workspaces.push(work);
        switchWorkspace(work);
    }

    openWork();

    function hideBoot(){$("boot-cover").style.display = "none";
        lock();}
    if(localStorage.darkStyle=="true"){
        d.documentElement.classList.add("dark-mode");
        $("darkmode-button").classList.remove("bg-dark");
        $("darkmode-button").classList.add("bg-accent");
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
        
        const bgImage = UIelmnt('img');
        bgImage.src = localStorage.darkStyle=="true"?'wall-dk.webp':'wall-lt.webp';
        bgImage.onload = hideBoot;
    }
};

//Workspaces

currentWork = '';
var workspaces = [];
var isDelWork = false;

class Workspace {
    constructor(){
        this.desk = UIelmnt('desktop');
        document.body.appendChild(this.desk);
        this.desk.style.display = 'none';
        this.desk.classList.add('small');
        this.i = workspaces.length;
        this.button = UIelmnt('button');
        this.button.classList.add('workspace-button');
        $('workspace-buttons').appendChild(this.button);
        let work = this;
        this.button.onclick=function(){
            if(isDelWork){
                delWorkspace(work);
                isDelWork = false;
                $('del-workspace').classList.remove('bg-destructive');
                $('del-workspace').classList.add('bg-dark');
            }else{
                switchWorkspace(work)
            }
        };
    }
}

function switchWorkspace(newWork){
    currentWork.desk.style.display='none';
    newWork.desk.style.display='block';
    currentWork = newWork;
}

function delWorkspace(work){
    currentWork.desk.remove();
    currentWork.button.remove();
    if(currentWork==work){
        if(workspaces.length == 0){
            let work = new Workspace();
            work.desk.style.display = 'block';
            workspaces.push(work);
        }
    }
    workspaces.splice(work.i,1);
    for(let j=0;j<workspaces.length;j++){
        workspaces[j].i=j;
    }
    switchWorkspace(workspaces[0]);
}