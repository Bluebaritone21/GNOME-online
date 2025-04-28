function loupe(file){
    var img = UIelmnt("img");
    var scrollbox = UIelmnt("div");
    if(typeof file != "string"){
        var blob = URL.createObjectURL(file);
    img.src = blob;
    }else{
        img.src = file;
    }
    repos(scrollbox,0,35);
    resize(scrollbox,"100%","calc(100% - 35px)");
    scrollbox.style.overflow = "scroll";
    scrollbox.appendChild(img)
    img.onload=function(){
    makeWindow(img.width<1000?img.width:1000,
              (img.height+40)<700?(img.height+40):700,scrollbox,
               function(){if(typeof file != "string")URL.revokeObjectURL(blob);});};
}

registerApp("apps/icons/loupe.svg",function(){loupe("icons/image-x-generic.svg");},"Loupe")