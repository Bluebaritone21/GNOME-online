async function mountFS(){
  if(fs==null){
    fs = await window.showDirectoryPicker({mode:"readwrite"});
    $("loadfs-button").classList.add("bg-accent");
    $("loadfs-button").classList.remove("bg-dark");
  }
}

function passDirTo(dir,fnc,err=error){
  getFiles(dir).then(fnc,err);
}

class dir{constructor(path,files,handle,name){
                                 this.path=path;
                                 this.files=files;
                                 this.handle=handle;
                                 this.name=name;
                                 this.kind="dir";
                                }}

async function getFiles(dirHandle, path = dirHandle.name, name = dirHandle.name){
  const dirs = [];
  const files = [];
  for await (const entry of dirHandle.values()) {
    let nestedPath = `${path}/${entry.name}`;
    if (entry.kind === "file") {
      files.push(
        entry.getFile().then((file) => {
          file.directoryHandle = dirHandle;
          file.handle = entry;
          file.kind = entry.kind;
          file.path = nestedPath;
          return file;
        })
      );
    } else if (entry.kind === "directory") {
      dirs.push(getFiles(entry, nestedPath, entry.name));
    }
  }
  return new dir(path, (await Promise.all(dirs)).concat(await Promise.all(files)), dirHandle, name);
}