var gensym = 0;
var activities = false;
function toggleActivities(){
    if(!activities){
        document.getElementsByTagName("desktop")[0].classList.add("small");
        $("activity-bar").style.backgroundColor="var(--dark3)";
    }else{
        document.getElementsByTagName("desktop")[0].classList.remove("small");
        $("activity-bar").style.backgroundColor="var(--dark5)";
    }
    activities = !activities;
}
function debug(){
        var script = document.createElement('script');
        script.src='https://cdn.jsdelivr.net/npm/eruda';
        script.onload=function(e){eruda.init();}
        document.body.appendChild(script);

}

function registerApp(icon, openfunction ,titleText) {
    var taskbar = $("taskbar");
    var button = document.createElement("button");
    button.classList.add("app-button");
    button.onclick = openfunction;
    var image = document.createElement("img");
    image.src = icon;
    image.style.height = "50px";
    image.style.width = "50px";
    image.title = titleText;
    button.appendChild(image);
    taskbar.appendChild(button);
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

function makeWindow(wdth,hght,contents){
    gensym++;
    var currentGensym=gensym;
    var clone = $("window").cloneNode(true);
    clone.id = "window"+gensym;
    clone.querySelector("#windowheader").id = "window"+gensym+"header";
    document.getElementsByTagName("desktop")[0].appendChild(clone);
    clone.querySelector(".close").addEventListener("click",function(){this.parentNode.remove()});
    dragElement(clone);
    clone.style.width = wdth+"px";
    clone.style.height= hght+"px";
    clone.appendChild(contents);
    return clone;
}
var lastheight = 0;

function dragElement(elmnt) {
  var deltaX = 0, deltaY = 0, X = 0, Y = 0;
  $(elmnt.id + "header").onmousedown = dragMouseDown;
  
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

window.onload = function(){
    window.addEventListener("online",function(e){
        var wifi_button = $("network-button");
        wifi_button.src = getIcon("radiowaves-1");
        wifi_button.classList.add("white-icon");
        wifi_button.title="connected";
    })

    window.addEventListener("offline",function(e){
        var wifi_button = $("network-button");
        wifi_button.src = getIcon("radiowaves-5");
        wifi_button.classList.add("white-icon");
        wifi_button.title="not connected";
    })

    navigator.getBattery().then(function(battery) {
        function updateIcon(){
        var battery_button = $("battery-button");
        battery_button.title = battery.level * 100 + "%";
        if(battery.level == 1){
            battery_button.classList.add("white-icon");
            battery_button.src= getIcon("battery-level-100");
        }else if(battery.level >=0.3){
            battery_button.classList.add("white-icon");
            battery_button.src = getIcon("battery-level-"+Math.round(battery.level*10)*10);
        }else if(battery.level >= 0.2){
            battery_button.classList.add("white-icon");
            battery_button.src = getIcon("battery-low");
        }else{
            battery_button.classList.remove("white-icon");
            battery_button.src = getIcon("battery-action");
        }
    function time(){
        var d = new Date();
        var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][d.getMonth()];
        var date = d.getDate();
        var min = d.getMinutes();
        if(min.toString().length<2){
            min = "0" + min;
        }
        var hour = d.getHours();
        document.getElementsByClassName("activity-bar")[0].innerHTML = month + " " + date + " " + hour + ":" + min
    }
    time()
    setInterval(time,1000);
}
  updateIcon();
  // ... and any subsequent updates.
  battery.onlevelchange = updateIcon;
});
}

function $(id){
    return document.getElementById(id);
}

function colour(clr){
    return "var(--"+clr+")";
}

function getIcon(name){
    return "https://teams.pages.gitlab.gnome.org/Design/icon-development-kit-www/img/symbolic/ait/"+name+"-symbolic.svg";
}