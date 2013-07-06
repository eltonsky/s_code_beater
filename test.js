  /************************** PLUGINS SECTION *************************/
  /* You may insert any plugins you wish to use here.                 */

  /*
   * Plugin: getPageName v2.1 - parse URL and return
    */
  //Set Custom page view event
  if(!s.events){
  s.events="event9"; //custom page view event
  }else{
  s.events=s.apl(s.events,"event9",",",2);
  }

  (function(){var c=window,b,a=function(){var h=[],i=[],f={},m=function(n,p){this.token=n;
  this.callback=p;
  },l=function(n,q,p){this.type=n;
  this.timestamp=p||b.safe.getTimestamp();
  this.data=q;
  },g=function(){var n={},p=function(q){return n[q]||{"data-capture":[],"data-transport":[]};
  };
