//texFORTH
size  =Math.floor((1<<16)/3/2);
ram   =new ArrayBuffer(1<<16);
datStk=new Int16Array(ram,0,size);
retStk=new Int16Array(ram,size*2,size);
heap  =new Uint8Array(ram,size*4,(size*2));
  //has to overlap so @ can access pad
pad   =new Uint8Array(ram,(size*6)-128,128);
ptrs  =new Uint16Array(ram,size*6,2);

ithrow=(e)   =>{throw e} //inline throw

pop   =(s)   =>(s?retStk:datStk)[ptrs[s]>0
                                 ?--ptrs[s]
                                 :ithrow('STACK UNDERFLOW')];
push  =(s,v) =>(s?retStk:datStk)[ptrs[s]<size
                                 ?ptrs[s]++
                                 :ithrow('STACK OVERFLOW')]=v;

dpush =v =>push(0,v);
dpop  =()=>pop (0);

rpush =v =>push(1,v);
rpop  =()=>pop (1);

Object.defineProperty(window,'HERE',{
 get:()=>heap[0]<<8|heap[1],
 set:v =>{
  heap[0]=v>>8;
  heap[1]=v&0xff;
 },
 configurable: true,
 enumerable: true
});

HERE = 6;

Object.defineProperty(window,'LATEST',{
 get:()=>heap[2]<<8|heap[3],
 set:v =>{
  heap[2]=v>>8;
  heap[3]=v&0xff;
 },
 configurable: true,
 enumerable: true
});

Object.defineProperty(window,'STATE',{
 get:()=>heap[4]<<8|heap[5],
 set:v =>{
  heap[4]=v>>8;
  heap[5]=v&0xff;
 },
 configurable: true,
 enumerable: true
});

CAT   =()=>dpush(heap[dpop()]);
AT    =()=>{
 var adr=dpop();
 dpush(heap[adr]<<8|heap[adr+1]);
}
CEXCM =()=>{var a=dpop();heap[a]=dpop()}
EXCM  =()=>{
 var adr=dpop();
 var val=dpop();
 heap[adr]  =(val&0xff00)>>8
 heap[adr+1]=(val&0x00ff);
}
COMMA =()=>{
 var val=dpop();
 heap[HERE]=((val&0xff00)>>8);
 HERE++;
 heap[HERE]=( val&0x00ff);
 HERE++;
}
COMMA_B=()=>{
 heap[HERE]=dpop()&0xff;
 HERE++;
}
CREATE=(name,immediate)=>{
 var thisword = HERE
 dpush(LATEST);
 COMMA();
 var ascii=name.split('')
               .map(c=>c.codePointAt(0));
 dpush((ascii.length&0x3f)|(immediate?0x80:0x0))
 COMMA_B();
 ascii.forEach(i=>{dpush(i);COMMA_B()});
 dpush(0);
 COMMA();//xt
 dpush(0);
 COMMA();//parameters, however they work
 //TODO:Finish the rest of CREATE
 LATEST = thisword;
 dpush(LATEST);
}
DUP=()=>{var x=dpop();dpush(x);dpush(x)}
FIND=()=>{
 DUP();
 CAT();
 var nameLen=dpop();
 var namePtr=dpop();
 var name   =String.fromCodePoint(...heap.slice(namePtr+1,namePtr+nameLen+1));
 console.log(name);
 var loc=LATEST;
 var addr=-1; 
 while(addr==-1){
  dpush(heap[loc+2]);
  if((dpop()&0x3f)==nameLen){
   var works=true;
   for(var i=3;i<nameLen+3;i++){
    if(heap[loc+i]!=heap[namePtr+i-2]){
     works=false;break;
    }
   }
   if(!works){
    dpush(loc);
    AT();
    loc=dpop();
    if(!loc)break;
    continue;
   }
   addr=loc;
  }else{
   dpush(loc);
   AT();
   loc=dpop();
   if(!loc)break;
  }
 }
 if(loc){
  dpush(addr+3+nameLen);
  AT();
 }else{
  dpush(0);
 }
}
WORD=()=>{
 var next = words.shift();
 pad[0]   = next.length;
 for(var i= 0;i<pad[0];i++){
  pad[i+1]= next.charCodeAt(i)&0x7f;
 }
 dpush(size*2-128);
}

primitives=[
 AT,
 null,//future:DOCOL
 FIND,
 WORD,
 DUP,
 EXCM,
 CEXCM,
 CAT,
 
]

words=[];

forth =code=>{
 words.push(...(code
           .replaceAll('\n',' ')      
           .split(' ')
           .filter(w=>w.length>0)))
 //TODO: actual compilier/VM
}
