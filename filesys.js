async function mountFS(){
    fs = await window.showDirectoryPicker({mode:"readwrite"});
}

async function readFS(){
  return await getFiles(fs,undefined)
}

const dir = {name:"",
             files:[]
            }

async function getFiles(dirHandle, path = dirHandle.name){
  const dirs = [];
  const files = [];
  for await (const entry of dirHandle.values()) {
    const nestedPath = `${path}/${entry.name}`;
    if (entry.kind === "file") {
      files.push(
        entry.getFile().then((file) => {
          file.directoryHandle = dirHandle;
          file.handle = entry;
          return Object.defineProperty(file, "webkitRelativePath", {
            configurable: true,
            enumerable: true,
            get: () => nestedPath,
          });
        })
      );
    } else if (entry.kind === "directory") {
      dirs.push(getFiles(entry, nestedPath));
    }
  }
  return (await Promise.all(dirs)).concat(await Promise.all(files));
}