function settings(){
    var sidebar = UIelmnt('div');
    repos(sidebar, 0, 0);
    resize(sidebar, 200, '100%');
    sidebar.classList.add('bg-sidebar');
    sidebar.style.pointerEvents = 'none';
    var tabs = UIelmnt('div');
    var catTitle = label('G\'day','b');
    var content = UIelmnt('div');

    function Pane(icon, title, children){
        this.title = label('&nbsp;&nbsp;'+title,'font');
        this.tab = UIelmnt('li');
        this.icon = UIelmnt('img');
        this.icon.width = 16;
        this.icon.src = getIcon(icon);
        this.icon.classList.add('icon');
        this.tab.appendChild(this.icon);
        this.tab.appendChild(this.title);
        this.tab.height=45;
        tabs.appendChild(this.tab);
        this.tab.onclick = function(){
            catTitle.innerText = title
            content.innerHTML = '';
            children.forEach((child)=>{content.appendChild(child);});
        };

    }
    repos(tabs, 0, 45);
    resize(tabs, 200, 'calc(100% - 45px)');
    tabs.style.overflowY = 'scroll';
    var window = makeWindow(800, 500, sidebar);
    
    var appTitle = label('Settings','b');
    repos(appTitle,0,15);
    resize(appTitle,200,20);
    appTitle.style.pointerEvents = 'none';
    window.appendChild(appTitle);

    repos(content,250,45);
    resize(content,'calc(100% - 300px)','calc(100% - 45px)');
    content.style.overflow = 'scroll';
    content.style.textAlign = 'left';
    window.appendChild(content);

    repos(catTitle,200,15);
    resize(catTitle,'calc(100% - 200px',20);
    catTitle.style.pointerEvents = 'none';
    window.appendChild(catTitle);

    window.appendChild(tabs);

    var appearance = new Pane('brush-monitor','Appearance',[label('Style','b')]);
    var security = new Pane('padlock2','Security',[label('Login','b')]);
    appearance.tab.click();
}

registerApp('apps/icons/settings.svg',settings,'Settings');