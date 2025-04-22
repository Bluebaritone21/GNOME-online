function loupe(path){
    var scrollbox = UIelmnt("div");
    var img = UIelmnt("img");
    img.src = path;
    repos(scrollbox,0,35);
    resize(scrollbox,"100%","calc(100% - 35px)");
    scrollbox.style.overflow = "scroll";
    scrollbox.appendChild(img)
    img.onload=function(){
    makeWindow(img.width<1000?img.width:1000,(img.height+40)<700?(img.height+40):700,scrollbox);};
}

registerApp("apps/icons/loupe.svg",function(){loupe("icons/image-x-generic.svg");},"Loupe")