function nautilus(dir){
    var sidebar = document.createElement('div');
    var hist = [];
    hist.push(dir);
    repos(sidebar,0,0);
    resize(sidebar,200,"100%");
    sidebar.classList.add("bg-sidebar");
    sidebar.style.pointerEvents="none";
    var win = makeWindow(800,500,sidebar);
    var list = UIelmnt("div");
    //Quick-access buttons
    var shortcuts = UIelmnt("div");
    repos(shortcuts,5,30);
    resize(shortcuts,190,"calc(100% - 30px)");
    var shortdirs=dir.files.filter((f) => f.kind=="dir")
    win.appendChild(shortcuts);
    //Back Button
    var backButton = UIelmnt("button");
    repos(backButton,205,5);
    resize(backButton,30,30);
    var backIcon = UIelmnt("img");
    backButton.title="Go Back";
    backIcon.src = "symbolic/left-large-symbolic.svg";
    backButton.appendChild(backIcon);
    backButton.onclick = function(){if(hist.length>=1){draw(hist.pop())}else{draw(dir)}}
    win.appendChild(backButton);
    //Directory path display
    var dirPath = UIelmnt("div");
    var dirText = UIelmnt("h4");
    repos(dirText,245,-14);
    dirText.style.pointerEvents = "none";
    repos(dirPath,240,5);
    resize(dirPath,"calc(100% - 275px)",30);
    dirPath.style.backgroundColor = colour("light2");
    dirPath.style.textAlign = "left";
    dirPath.style.borderRadius = "10px";
    dirPath.style.pointerEvents = "none";
    win.appendChild(dirPath);
    win.appendChild(dirText)
    repos(list,205,45);
    resize(list,"calc(100% - 210px)","calc(100% - 45px)");
    list.style.overflowY = "scroll";
    try{
        win.appendChild(list);
        var title = UIelmnt("h3");
        title.innerText="Files";
        title.pointerEvents = "none";
        repos(title, 0,-14);
        resize(title, 200, "20");
        sidebar.appendChild(title);
    }catch(e){
        error(e);
    }
    function draw(dr){try{
        shortcuts.innerHTML = "";
        for(i in shortdirs){
            let fld=shortdirs[i]
            let blt=UIelmnt("li");
            blt.innerText=" "+fld.name;
            blt.height="40px";
            blt.display="block";
            blt.onclick=function(){
                if(dr!=fld){
                    hist.push(fld);
                    draw(fld);
                }
            }
            shortcuts.appendChild(blt);
        }
        dirText.innerText = " "+dr.path;
        list.innerHTML="";
        for(i in dr.files){
            let blt=UIelmnt("li");
            let file = dr.files[i];
            var span = UIelmnt("span");
        var text = UIelmnt("inline");
        var icn = UIelmnt("img");
        icn.src = file.kind==="dir"?(file.name==".Trash"?"icons/user-trash.svg":
                                    (file.name=="GNOME"?"icons/user-home.svg":
                                    (file.name=="Camera"?"icons/folder-pictures.svg":
                                    (file.name=="Downloads"?"icons/folder-download.svg":
                                    (file.name=="Documents"?"icons/folder-documents.svg":"icons/folder.svg"))))):
                  (file.type.includes("image")?"icons/image-x-generic.svg":
                  (file.type.includes("video")?"icons/video-x-generic.svg":
                  (file.type==="text/html"?"icons/text-html.svg":
                  (file.type=="text/javascript"?"icons/application-x-executable.svg":
                  (file.type.includes("text")?"icons/text.svg":
                  (file.type==="application/pdf"?"icons/x-office-document.svg":
                  "icons/application-x-generic.svg"))))));
        icn.width = 32;
        span.appendChild(icn);
        text.innerText = file.name;
        span.appendChild(text);
        blt.appendChild(span);
        list.appendChild(blt);
        blt.style.height="32px"
        blt.onclick = function(){
            if(file.kind === "file"){
                if(file.type.includes("image")){
                    loupe("../../"+file.path);
                }else if(file.type==="text/html"){
                    epiphany("../../"+file.path);
                }else if(file.type==="text/javascript"){
                    confirm("Are you sure you want to run this?",function(){const reader = new FileReader();
                        reader.onload = () => {
                            eval(reader.result,file.path);
                        };
                        reader.onerror = () => {
                            showMessage("Error reading the file. Please try again.", "error");
                        };
                        reader.readAsText(file);})
                }else if(file.type.includes("text")){const reader = new FileReader();
                    reader.onload = () => {
                        texteditor(reader.result,file.path);
                    };
                    reader.onerror = () => {
                        showMessage("Error reading the file. Please try again.", "error");
                    };
                    reader.readAsText(file);
                }else if(file.type==="application/pdf"){
                    epiphany("../../"+file.path);
                }else{
                    let title = UIelmnt("h3");
                    title.innerText = "What App do you want to open this?";
                    title.classList.add("fg-success")
                    let win = makeWindow(300,400,title);
                    let options = UIelmnt("div");
                    win.appendChild(options);
                    let txtbutton = UIelmnt("li");
                    txtbutton.innerText = "Text Editor";
                    txtbutton.onclick = function(){const reader = new FileReader();
                        reader.onload = () => {
                            texteditor(reader.result,file.path);win.remove()
                        };
                        reader.onerror = () => {
                            showMessage("Error reading the file. Please try again.", "error");
                        };
                        reader.readAsText(file);
                    }
                    options.appendChild(txtbutton);
                    let webbutton = UIelmnt("li");
                    webbutton.innerText = "Epiphany";
                    webbutton.onclick = function(){epiphany("../../"+file.path);win.remove()}
                    options.appendChild(webbutton);
                    let imgbutton = UIelmnt("li");
                    imgbutton.innerText = "Loupe";
                    imgbutton.onclick = function(){loupe("../../"+file.path);win.remove()}
                    options.appendChild(imgbutton)

                }
            }else if(file.kind === "dir"){
                hist.push(dr);
                draw(file);
            }else{
                error("Expected a file or Directory, got "+file.kind+". If you are not Matthew, please tell him.");
            }
        }}
    }catch(e){
        error(e);
    }}
    draw(dir);
}

registerApp("apps/icons/nautilus.svg",function(){passDirTo(fs,nautilus,function(){error("Filesystem not mounted!")})},"Nautilus");