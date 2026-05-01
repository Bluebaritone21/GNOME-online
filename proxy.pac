function FindProxyForURL(url, host) {
  return shExpMatch(host.toLowerCase(), "*facebook.com") ? "PROXY 127.0.0.1:9" : "DIRECT";
}
