function FindProxyForURL(url, host) {
  if('m.facebook.com'==host){
   return "PROXY 127.0.0.1:9"
  }
  return 'DIRECT';
}