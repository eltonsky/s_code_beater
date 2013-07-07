  //Set Custom page view event
  if(!s.events){
  s.events="event9"; //custom page view event
  }else{
  s.events=s.apl(s.events,"event9",",",2);
  }


/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.visitorNamespace="sportsbet";
/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',
    s_objectID;


/*
 * Plugin: getPreviousValue v1.0 - return previous value of designated
  *   variable (requires split utility)
   */
   s.getPreviousValue=new Function("v","c","el",""
   +"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
   +"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
   +"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
   +":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
   +"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");



/*
 * channelManager v2.5 - Tracking External Traffic
  */
  s.channelManager=new Function("a","b","c","d","e","f",""
  +"var s=this,A,B,g,l,m,M,p,q,P,h,k,u,S,i,O,T,j,r,t,D,E,F,G,H,N,U,v=0,"
  +"X,Y,W,n=new Date;n.setTime(n.getTime()+1800000);if(e){v=1;if(s.c_r("
  +"e))v=0;if(!s.c_w(e,1,n))s.c_w(e,1,0);if(!s.c_r(e))v=0;}g=s.referrer"
  +"?s.referrer:document.referrer;g=g.toLowerCase();if(!g)h=1;i=g.index"
  +"Of('?')>-1?g.indexOf('?'):g.length;j=g.substring(0,i);k=s.linkInter"
  +"nalFilters.toLowerCase();k=s.split(k,',');for(m=0;m<k.length;m++){B"
  +"=j.indexOf(k[m])==-1?'':g;if(B)O=B;}if(!O&&!h){p=g;U=g.indexOf('//'"
  +");q=U>-1?U+2:0;Y=g.indexOf('/',q);r=Y>-1?Y:i;u=t=g.substring(q,r).t"
  +"oLowerCase();P='Other Natural Referrers';S=s.seList+'>'+s._extraSea"
  +"rchEngines;if(d==1){j=s.repl(j,'oogle','%');j=s.repl(j,'ahoo','^');"
  +"g=s.repl(g,'as_q','*')}A=s.split(S,'>');for(i=0;i<A.length;i++){D=A"
  +"[i];D=s.split(D,'|');E=s.split(D[0],',');for(G=0;G<E.length;G++){H="
  +"j.indexOf(E[G]);if(H>-1){i=s.split(D[1],',');for(k=0;k<i.length;k++"
  +"){l=s.getQueryParam(i[k],'',g).toLowerCase();if(l){M=l;if(D[2])N=u="
  +"D[2];else N=t;if(d==1){N=s.repl(N,'#','-');g=s.repl(g,'*','as_q');N"
  +"=s.repl(N,'^','ahoo');N=s.repl(N,'%','oogle');}}}}}}}if(!O||f!='1')"
  +"{O=s.getQueryParam(a,b);if(O){u=O;if(M)P='Paid Search';else P='Unkn"
  +"own Paid Channel';}if(!O&&M){u=N;P='Natural Search';}}if(h==1&&!O&&"
  +"v==1)u=P=t=p='Typed/Bookmarked';g=s._channelDomain;if(g){k=s.split("
  +"g,'>');;for(m=0;m<k.length;m++){q=s.split(k[m],'|');r=s.split(q[1],"
  +"',');S=r.length;for(T=0;T<S;T++){Y=r[T];Y=Y.toLowerCase();i=j.index"
  +"Of(Y);if(i>-1)P=q[0];}}}g=s._channelParameter;if(g){k=s.split(g,'>'"
  +");h;for(m=0;m<k.length;m++){q=s.split(k[m],'|');r=s.split(q[1],',')"
  +";S=r.length;for(T=0;T<S;T++){U=s.getQueryParam(r[T]);if(U)P=q[0];}}"
  +"}g=s._channelPattern;if(g){k=s.split(g,'>');for(m=0;m<k.length;m++)"
  +"{q=s.split(k[m],'|');r=s.split(q[1],',');S=r.length;for(T=0;T<S;T++"
  +"){Y=r[T];Y=Y.toLowerCase();i=O.toLowerCase();H=i.indexOf(Y);if(H==0"
  +")P=q[0];}}}X=P+M+t;c=c?c:'c_m';if(c!='0')X=s.getValOnce(X,c,0);if(X"
  +"){s._referrer=p?p:'n/a';s._referringDomain=t?t:'n/a';s._partner=N?N"
  +":'n/a';s._campaignID=O?O:'n/a';s._campaign=u?u:'n/a';s._keywords=M?"
  +"M:'n/a';s._channel=P?P:'n/a';}");




  (function(){var c=window,b,a=function(){var h=[],i=[],f={},m=function(n,p){this.token=n;
  this.callback=p;
  },l=function(n,q,p){this.type=n;
  this.timestamp=p||b.safe.getTimestamp();
  this.data=q;
  },g=function(){var n={},p=function(q){return n[q]||{"data-capture":[],"data-transport":[]};
  };


var CryptoJS=CryptoJS||function(h,s){var f={},t=f.lib={},g=function(){},j=t.Base={extend:function(a){g.prototype=this;var c=new g;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
  q=t.WordArray=j.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=s?c:4*a.length},toString:function(a){return(a||u).stringify(this)},concat:function(a){var c=this.words,d=a.words,b=this.sigBytes;a=a.sigBytes;this.clamp();if(b%4)for(var e=0;e<a;e++)c[b+e>>>2]|=(d[e>>>2]>>>24-8*(e%4)&255)<<24-8*((b+e)%4);else if(65535<d.length)for(e=0;e<a;e+=4)c[b+e>>>2]=d[e>>>2];else c.push.apply(c,d);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
  32-8*(c%4);a.length=h.ceil(c/4)},clone:function(){var a=j.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],d=0;d<a;d+=4)c.push(4294967296*h.random()|0);return new q.init(c,a)}}),v=f.enc={},u=v.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var d=[],b=0;b<a;b++){var e=c[b>>>2]>>>24-8*(b%4)&255;d.push((e>>>4).toString(16));d.push((e&15).toString(16))}return d.join("")},parse:function(a){for(var c=a.length,d=[],b=0;b<c;b+=2)d[b>>>3]|=parseInt(a.substr(b,
  2),16)<<24-4*(b%8);return new q.init(d,c/2)}},k=v.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var d=[],b=0;b<a;b++)d.push(String.fromCharCode(c[b>>>2]>>>24-8*(b%4)&255));return d.join("")},parse:function(a){for(var c=a.length,d=[],b=0;b<c;b++)d[b>>>2]|=(a.charCodeAt(b)&255)<<24-8*(b%4);return new q.init(d,c)}},l=v.Utf8={stringify:function(a){try{return decodeURIComponent(escape(k.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return k.parse(unescape(encodeURIComponent(a)))}},
  x=t.BufferedBlockAlgorithm=j.extend({reset:function(){this._data=new q.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=l.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,d=c.words,b=c.sigBytes,e=this.blockSize,f=b/(4*e),f=a?h.ceil(f):h.max((f|0)-this._minBufferSize,0);a=f*e;b=h.min(4*a,b);if(a){for(var m=0;m<a;m+=e)this._doProcessBlock(d,m);m=d.splice(0,a);c.sigBytes-=b}return new q.init(m,b)},clone:function(){var a=j.clone.call(this);
  a._data=this._data.clone();return a},_minBufferSize:0});t.Hasher=x.extend({cfg:j.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){x.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(c,d){return(new a.init(d)).finalize(c)}},_createHmacHelper:function(a){return function(c,d){return(new w.HMAC.init(a,
  d)).finalize(c)}}});var w=f.algo={};return f}(Math);
  (function(h){for(var s=CryptoJS,f=s.lib,t=f.WordArray,g=f.Hasher,f=s.algo,j=[],q=[],v=function(a){return 4294967296*(a-(a|0))|0},u=2,k=0;64>k;){var l;a:{l=u;for(var x=h.sqrt(l),w=2;w<=x;w++)if(!(l%w)){l=!1;break a}l=!0}l&&(8>k&&(j[k]=v(h.pow(u,0.5))),q[k]=v(h.pow(u,1/3)),k++);u++}var a=[],f=f.SHA256=g.extend({_doReset:function(){this._hash=new t.init(j.slice(0))},_doProcessBlock:function(c,d){for(var b=this._hash.words,e=b[0],f=b[1],m=b[2],h=b[3],p=b[4],j=b[5],k=b[6],l=b[7],n=0;64>n;n++){if(16>n)a[n]=
  c[d+n]|0;else{var r=a[n-15],g=a[n-2];a[n]=((r<<25|r>>>7)^(r<<14|r>>>18)^r>>>3)+a[n-7]+((g<<15|g>>>17)^(g<<13|g>>>19)^g>>>10)+a[n-16]}r=l+((p<<26|p>>>6)^(p<<21|p>>>11)^(p<<7|p>>>25))+(p&j^~p&k)+q[n]+a[n];g=((e<<30|e>>>2)^(e<<19|e>>>13)^(e<<10|e>>>22))+(e&f^e&m^f&m);l=k;k=j;j=p;p=h+r|0;h=m;m=f;f=e;e=r+g|0}b[0]=b[0]+e|0;b[1]=b[1]+f|0;b[2]=b[2]+m|0;b[3]=b[3]+h|0;b[4]=b[4]+p|0;b[5]=b[5]+j|0;b[6]=b[6]+k|0;b[7]=b[7]+l|0},_doFinalize:function(){var a=this._data,d=a.words,b=8*this._nDataBytes,e=8*a.sigBytes;
  d[e>>>5]|=128<<24-e%32;d[(e+64>>>9<<4)+14]=h.floor(b/4294967296);d[(e+64>>>9<<4)+15]=b;a.sigBytes=4*d.length;this._process();return this._hash},clone:function(){var a=g.clone.call(this);a._hash=this._hash.clone();return a}});s.SHA256=g._createHelper(f);s.HmacSHA256=g._createHmacHelper(f)})(Math);

