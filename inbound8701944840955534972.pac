function FindProxyForURL(url, host) {
  if('facebook.com'==host){
   return "PROXY 127.0.0.1:9"
  }
  return 'DIRECT';
}