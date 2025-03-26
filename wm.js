var gensym = 0;
var activities = false;
function toggleActivities(){
    if(!activities){
        document.getElementsByTagName("desktop")[0].classList.add("small");
    }else{
        document.getElementsByTagName("desktop")[0].classList.remove("small");
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
    var taskbar = document.getElementById("taskbar");
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

function makeWindow(wdth,hght,contents){
    gensym++;
    var currentGensym=gensym;
    var clone = document.getElementById("window").cloneNode(true);
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
  document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  
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

setInterval(time,1000);

navigator.getBattery().then(function(battery) {
  var battery_button = document.getElementById("battery-button");
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
  // ... and any subsequent updates.
  battery.onlevelchange = function() {
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
  };
});

window.addEventListener("online",function(e){
    var wifi_button = this.document.getElementById("network-button");
    wifi_button.src = getIcon("radiowaves-1");
    wifi_button.classList.add("white-icon");
    wifi_button.title="connected";
})

window.addEventListener("offline",function(e){
    var wifi_button = this.document.getElementById("network-button");
    wifi_button.src = getIcon("radiowaves-5");
    wifi_button.classList.add("white-icon");
    wifi_button.title="not connected";
})

function colour(clr){
    return "var(--"+clr+")";
}

function getIcon(name){
    return "https://teams.pages.gitlab.gnome.org/Design/icon-development-kit-www/img/symbolic/ait/"+name+"-symbolic.svg";
}