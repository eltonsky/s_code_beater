/* SiteCatalyst code version: H.24.4.
Copyright 1996-2012 Adobe, Inc. All Rights Reserved
More info available at http://www.omniture.com */

//Default report suite ID. This is updated automatically in the page tag using the s.un variable, do not change the value below
//var s_account="sportsbet-demo";
var s=s_gi(s_account);


/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
/* Link Tracking Config */
s.trackDownloadLinks=true
s.trackExternalLinks=true
s.trackInlineStats=true
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx"
s.linkLeaveQueryString=false
s.linkTrackVars="None"
s.linkTrackEvents="None"

/* Page Name Plugin Config */
s.defaultPage=""       // filename to add when none exists
s.queryVarsList=""     // query parameters to keep
s.pathExcludeDelim=";" // portion of the path to exclude
s.pathConcatDelim=":"   // page name component separator
s.pathExcludeList=""   // elements to exclude from the path

/* Plugin Config */
s.usePlugins=true

//Insert custom configuration and plugin calls in doPlugins
function s_doPlugins(s) {


//Page name call
if(!s.pageType && !s.pageName){
    page_name=s.getPageName();
    page_name=page_name.toLowerCase();
}

// Capture results page and pass ID Type in page name
var ev_type_id;
var action;
if(!action){
  action=s.getQueryParam('action');
  if(action=="GoMeetingResults"){
    ev_type_id=s.getQueryParam('ev_type_id');
    if(ev_type_id){
      page_name=s.siteID+":results:"+ev_type_id;
    }
  }
}


/* Page name clean up */
/* Reset URL values to correct channel names for IASBet and Sportsbet */
if(!s.pageType && page_name){
  if (page_name.indexOf(":next-races") != -1) page_name=page_name.replace(new RegExp(/:next-races/g),":racing:next-races");
  if (page_name.indexOf(":racing-schedule") != -1) page_name=page_name.replace(new RegExp(/:racing-schedule/g),":racing:racing-schedule");
  if (page_name.indexOf(":horse-racing") != -1) page_name=page_name.replace(new RegExp(/:horse-racing/g),":racing:horse-racing");
  if (page_name.indexOf(":tote-multiples") != -1) page_name=page_name.replace(new RegExp(/:tote-multiples/g),":racing:tote-multiples");
  if (page_name.indexOf(":lucky-loser") != -1) page_name=page_name.replace(new RegExp(/:lucky-loser/g),":racing:lucky-loser");
  if (page_name.indexOf("sb:betting") != -1) page_name=page_name.replace(new RegExp(/sb:betting/g),"sb:sport");
  if (page_name.indexOf(":harness-racing") != -1) page_name=page_name.replace(new RegExp(/:harness-racing/g),":racing:harness-racing");
  if (page_name.indexOf(":greyhound-racing") != -1) page_name=page_name.replace(new RegExp(/:greyhound-racing/g),":racing:greyhound-racing");
  if (page_name.indexOf("ias:betting") != -1) page_name=page_name.replace(new RegExp(/ias:betting/g),"ias:racing");
  if (page_name.indexOf(":live-betting") != -1) page_name=page_name.replace(new RegExp(/:live-betting/g),":sport:live-betting");
  if (page_name.indexOf("ias:bet:") != -1 || page_name.indexOf("ias:bet.") != -1) page_name=page_name.replace(new RegExp(/ias:bet/g),"ias:sport");
  if (page_name.indexOf("ias:super-exotics") != -1) page_name=page_name.replace(new RegExp(/ias:super-exotics/g),"ias:racing:super-exotics");
}

//clean page name remove '-' from the page name
if(!s.pageType && page_name) page_name=page_name.replace(new RegExp(/-/g)," ");


/* page name clean up - abbreviate words */
if(!s.pageType && page_name){

  }

/* page name clean up code set site section and hier values from page name */
  if(!s.pageType && page_name){
    pathArray=page_name.split(':');
    var pathLength=pathArray.length;
    //set the event ID and event name into props
    if(page_name.indexOf(".html") != -1){
      var eventName = pathArray[pathLength-1];
      urlArray = eventName.split('.');
      eventName = urlArray[0];
      eventArray=eventName.split(' ');
      s.prop16=eventArray[eventArray.length-1]; //event ID
      s.prop15=eventName; //event friendly name
      page_name=page_name.replace(s.prop15,s.prop16); //update page name to include only event ID
      page_name=page_name.replace(new RegExp(/.html/g),""); //remove .html from URL
      pathArray=page_name.split(':');
      }
    //set the hierarchy value
    if(!s.hier1) s.hier1=page_name.replace(new RegExp(/:/g),"|");//Site hierarchy value

    //set the content variables for Site Sections down to 8 levels
    var count=0;
    while (count < pathLength){
    switch (count){
      case 0: s.prop1=pathArray[count]; s.channel=s.prop1; s.prop2=s.prop1;s.prop3=s.prop1;s.prop4=s.prop1;s.prop5=s.prop1;s.prop6=s.prop1;s.prop7=s.prop1; s.prop8=s.prop1; break; //Site ID
      case 1: s.channel=s.prop1+":"+pathArray[count]; s.prop2=s.channel;s.prop3=s.channel;s.prop4=s.channel;s.prop5=s.channel;s.prop6=s.channel;s.prop7=s.channel; s.prop8=s.channel; break; //Site Section
      case 2: s.prop2 = s.channel+":"+pathArray[count]; s.prop3=s.prop2;s.prop4=s.prop2;s.prop5=s.prop2;s.prop6=s.prop2;s.prop7=s.prop2; s.prop8=s.prop2; break; //Site Section 2
      case 3: s.prop3 = s.prop2+":"+pathArray[count]; s.prop4=s.prop3;s.prop5=s.prop3;s.prop6=s.prop3;s.prop7=s.prop3; s.prop8=s.prop3; break; //Site Section 3
      case 4: s.prop4 = s.prop3+":"+pathArray[count]; s.prop5=s.prop4;s.prop6=s.prop4;s.prop7=s.prop4; s.prop8=s.prop4; break;//Site Section 4
      case 5: s.prop5 = s.prop4+":"+pathArray[count]; s.prop6=s.prop5;s.prop7=s.prop5; s.prop8=s.prop5; break;//Site Section 5
      case 6: s.prop6 = s.prop5+":"+pathArray[count]; s.prop7=s.prop6; s.prop8=s.prop6; break; //Site Section 6
      case 7: s.prop7 = s.prop6+":"+pathArray[count]; s.prop8=s.prop7; break; //Site Section 7
      case 8: s.prop8 = s.prop7+":"+pathArray[count]; break; //Site Section 8
    }
    count=count+1;
    }
  }

  //set the page name
  if(!s.pageType && page_name) s.pageName=page_name;

  //Pass the URL into a Prop
  var s_URL = document.URL;
  s.prop75 = s_URL; //Page URL

  /* Time Parting Maintenance: Need to obtain Start and End dates of Daylight Saving Time for the current year */
  //Start and end dates are being dynamically set based on the current date and the dates for future calendar years
  var tDate = new Date();
  var uDate= new Date();
  s.currentYear=tDate.getFullYear();
  if(s.currentYear){
    if(s.currentYear == "2012") uDate.setFullYear(2012,3,1);
    if(s.currentYear == "2013") uDate.setFullYear(2013,3,7);
    if(s.currentYear == "2014") uDate.setFullYear(2014,3,6);
    if(s.currentYear == "2015") uDate.setFullYear(2015,3,5);
    if(s.currentYear == "2016") uDate.setFullYear(2016,3,3);
  }
  if(s.currentYear == "2012"){
    s.dstEnd="04/01/2012";
    s.dstStart="10/02/2011";
  }
  if(s.currentYear == "2012" && uDate < tDate || s.currentYear == "2013"){
    s.dstEnd="04/07/2013";
    s.dstStart="10/07/2012";
  }
  if(s.currentYear == "2013" && uDate < tDate || s.currentYear == "2014"){
    s.dstEnd="04/06/2014";
    s.dstStart="10/06/2013";
  }
  if(s.currentYear == "2014" && uDate < tDate || s.currentYear == "2015"){
    s.dstEnd="04/05/2015";
    s.dstStart="10/05/2014";
  }
    if(s.currentYear == "2015" && uDate < tDate || s.currentYear == "2016"){
    s.dstEnd="04/03/2016";
    s.dstStart="10/04/2015";
  }
  //set the timeparting values
  s.prop17=s.getTimeParting('h','+10'); // Set hour
  s.prop18=s.getTimeParting('d','+10'); // Set day
  s.prop19=s.getTimeParting('w','+10'); // Set weekday weekend

  //Set the new and repeat visitor value
  s.prop20=s.getNewRepeat(); //new and repeat visitors

  /* Internal Campaign Tracking */
  if(!s.eVar21){
    s.eVar21=s.getQueryParam('intcmp')
    if(s.eVar21){
      s.eVar21=s.getValOnce(s.eVar21,'s_ev21',7) //capture internal promotion codes once and persist for 7 days
    }
  }
  //always set the internal campaign pathing
  s.prop21=s.eVar21+":"+s.pageName; //internal campaign pathing

  /* External Campaign Tracking */
  if(!s.campaign){
    s.campaign = s.getQueryParam('cmp') //capture the cmp url string parameter into the s.campaign variable
    if(s.campaign){
      s.campaign=s.getValOnce(s.campaign,'s_ev0',7); //capture external promotion codes once and persist for 7 days
      s.clickPast(s.campaign,'event10','event11'); //click through quality
      s.eVar23=s.crossVisitParticipation(s.campaign,'s_ev23','30','5','>','event8'); //cross visit participation of external promotions with an expiration of 30 days
    }else if (document.referrer){
      var seoBrand;
      var ref_domain = document.referrer;
      if(ref_domain.indexOf('google') > -1 || ref_domain.indexOf('yahoo') > -1 || ref_domain.indexOf('bing') > -1){
            if (ref_domain.indexOf('sportsbet') > -1) {
              seoBrand = "seo:sb";
            } else if (ref_domain.indexOf('ias') > -1) {
              seoBrand = "seo:ias";
            } else {
              seoBrand = "seo:non";
            }
      s.eVar23=s.crossVisitParticipation(seoBrand,'s_ev23','30','5','>','event8'); //cross visit participation of external promotions
      }
      }else{
      s.eVar23=s.crossVisitParticipation('direct','s_ev23','30','5','>','event8'); //cross visit participation of external promotions
      }
  }
  //always set the external campaign pathing
  s.prop22=s.campaign+":"+s.pageName; //external campaign pathing

  //insert channel manager code here

  // Time to complete registration
  if(s.eVar23) {
    s.prop24="start";
  }
  //if(s.events.indexOf('event5') > -1) {
    //s.prop24="stop";
  //}
  s.prop24=s.getTimeToComplete(s.prop24,'ttc',0); //set time to complete

  //Days since last visit
  s.prop25=s.getDaysSinceLastVisit();

  //Visit number
  s.prop26=s.getVisitNum(365);

  //Set Custom page view event
  if(!s.events){
  s.events="event9"; //custom page view event
  }else{
  s.events=s.apl(s.events,"event9",",",2);
  }

  /* append to list all events*/
  //s.events=s.apl(s.events,"event1",",",2)

  // TNT to SiteCatalyst Integration
  s.tnt=s.trackTNT();

  //SiteCatalyst to TNT
  if (typeof(mboxLoadSCPlugin) != "undefined" && s.events !="" && s.events !="event9") {
    mboxLoadSCPlugin(s);
  }

}

s.doPlugins=s_doPlugins

/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */

/*
 * Plugin: getPageName v2.1 - parse URL and return
 */
s.getPageName=new Function("u",""
+"var s=this,v=u?u:''+s.wd.location,x=v.indexOf(':'),y=v.indexOf('/',"
+"x+4),z=v.indexOf('?'),c=s.pathConcatDelim,e=s.pathExcludeDelim,g=s."
+"queryVarsList,d=s.siteID,n=d?d:'',q=z<0?'':v.substring(z+1),p=v.sub"
+"string(y+1,q?z:v.length);z=p.indexOf('#');p=z<0?p:s.fl(p,z);x=e?p.i"
+"ndexOf(e):-1;p=x<0?p:s.fl(p,x);p+=!p||p.charAt(p.length-1)=='/'?s.d"
+"efaultPage:'';y=c?c:'/';while(p){x=p.indexOf('/');x=x<0?p.length:x;"
+"z=s.fl(p,x);if(!s.pt(s.pathExcludeList,',','p_c',z))n+=n?y+z:z;p=p."
+"substring(x+1)}y=c?c:'?';while(g){x=g.indexOf(',');x=x<0?g.length:x"
+";z=s.fl(g,x);z=s.pt(q,'&','p_c',z);if(z){n+=n?y+z:z;y=c?c:'&'}g=g.s"
+"ubstring(x+1)}return n");

/*
 * Utility Function: p_c
 */
s.p_c=new Function("v","c",""
+"var x=v.indexOf('=');return c.toLowerCase()==v.substring(0,x<0?v.le"
+"ngth:x).toLowerCase()?v:0");

/*
 * Utility Function: split v1.5 (JS 1.0 compatible)
 */
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/*
 * Plugin Utility: apl v1.1
 */
s.apl=new Function("l","v","d","u",""
+"var s=this,m=0;if(!l)l='';if(u){var i,n,a=s.split(l,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)l=l?l+d+v:v;return l");

/*
 * s.join: 1.0 - Joins an array into a string
 */
s.join = new Function("v","p",""
+"var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+"se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");

/*
 * Plugin Utility: Replace v1.0
 */
s.repl=new Function("x","o","n",""
+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");

/*
 * Plugin Utility: s.p_fo
 */
s.p_fo=new Function("n",""
+"var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]="
+"new Object;return 1;}else {return 0;}");

/*
 * Plugin: getAndPersistValue 0.3 - get a value on every page
 */
s.getAndPersistValue=new Function("v","c","e",""
+"var s=this,a=new Date;e=e?e:0;a.setTime(a.getTime()+e*86400000);if("
+"v)s.c_w(c,v,e?a:0);return s.c_r(c);");

/*
 * Plugin: getQueryParam 2.4
 */
s.getQueryParam=new Function("p","d","u","h",""
+"var s=this,v='',i,j,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.loca"
+"tion);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0"
+"?p.length:i;t=s.p_gpv(p.substring(0,i),u+'',h);if(t){t=t.indexOf('#"
+"')>-1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substrin"
+"g(i==p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u","h",""
+"var s=this,v='',q;j=h==1?'#':'?';i=u.indexOf(j);if(k&&i>-1){q=u.sub"
+"string(i+1);v=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return''");

/*
 * Plugin: getTimeParting 2.0 - Set timeparting values based on time zone
 */
s.getTimeParting=new Function("t","z",""
+"var s=this,cy;dc=new Date('1/1/2000');"
+"if(dc.getDay()!=6||dc.getMonth()!=0){return'Data Not Available'}"
+"else{;z=parseFloat(z);var dsts=new Date(s.dstStart);"
+"var dste=new Date(s.dstEnd);fl=dste;cd=new Date();if(cd>dsts&&cd<fl)"
+"{z=z+1}else{z=z};utc=cd.getTime()+(cd.getTimezoneOffset()*60000);"
+"tz=new Date(utc + (3600000*z));thisy=tz.getFullYear();"
+"var days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday',"
+"'Saturday'];if(thisy!=s.currentYear){return'Data Not Available'}else{;"
+"thish=tz.getHours();thismin=tz.getMinutes();thisd=tz.getDay();"
+"var dow=days[thisd];var ap='AM';var dt='Weekday';var mint='00';"
+"if(thismin>30){mint='30'}if(thish>=12){ap='PM';thish=thish-12};"
+"if (thish==0){thish=12};if(thisd==6||thisd==0){dt='Weekend'};"
+"var timestring=thish+':'+mint+ap;if(t=='h'){return timestring}"
+"if(t=='d'){return dow};if(t=='w'){return dt}}};"
);

/*
 * Plugin: getNewRepeat 1.2 - Returns whether user is new or repeat
 */
s.getNewRepeat=new Function("d","cn",""
+"var s=this,e=new Date(),cval,sval,ct=e.getTime();d=d?d:30;cn=cn?cn:"
+"'s_nr';e.setTime(ct+d*24*60*60*1000);cval=s.c_r(cn);if(cval.length="
+"=0){s.c_w(cn,ct+'-New',e);return'New';}sval=s.split(cval,'-');if(ct"
+"-sval[0]<30*60*1000&&sval[1]=='New'){s.c_w(cn,ct+'-New',e);return'N"
+"ew';}else{s.c_w(cn,ct+'-Repeat',e);return'Repeat';}");

/*
 * Plugin: getValOnce_v1.1
 */
s.getValOnce=new Function("v","c","e","t",""
+"var s=this,a=new Date,v=v?v:'',c=c?c:'s_gvo',e=e?e:0,i=t=='m'?6000"
+"0:86400000;k=s.c_r(c);if(v){a.setTime(a.getTime()+e*i);s.c_w(c,v,e"
+"==0?0:a);}return v==k?'':v");

/*
 *  Plug-in: crossVisitParticipation v1.7 - stacks values from
 *  specified variable in cookie and returns value
 */
s.crossVisitParticipation=new Function("v","cn","ex","ct","dl","ev","dv",""
+"var s=this,ce;if(typeof(dv)==='undefined')dv=0;if(s.events&&ev){var"
+" ay=s.split(ev,',');var ea=s.split(s.events,',');for(var u=0;u<ay.l"
+"ength;u++){for(var x=0;x<ea.length;x++){if(ay[u]==ea[x]){ce=1;}}}}i"
+"f(!v||v==''){if(ce){s.c_w(cn,'');return'';}else return'';}v=escape("
+"v);var arry=new Array(),a=new Array(),c=s.c_r(cn),g=0,h=new Array()"
+";if(c&&c!=''){arry=s.split(c,'],[');for(q=0;q<arry.length;q++){z=ar"
+"ry[q];z=s.repl(z,'[','');z=s.repl(z,']','');z=s.repl(z,\"'\",'');arry"
+"[q]=s.split(z,',')}}var e=new Date();e.setFullYear(e.getFullYear()+"
+"5);if(dv==0&&arry.length>0&&arry[arry.length-1][0]==v)arry[arry.len"
+"gth-1]=[v,new Date().getTime()];else arry[arry.length]=[v,new Date("
+").getTime()];var start=arry.length-ct<0?0:arry.length-ct;var td=new"
+" Date();for(var x=start;x<arry.length;x++){var diff=Math.round((td."
+"getTime()-arry[x][1])/86400000);if(diff<ex){h[g]=unescape(arry[x][0"
+"]);a[g]=[arry[x][0],arry[x][1]];g++;}}var data=s.join(a,{delim:',',"
+"front:'[',back:']',wrap:\"'\"});s.c_w(cn,data,e);var r=s.join(h,{deli"
+"m:dl});if(ce)s.c_w(cn,'');return r;");

/*
 * Plugin: Days since last Visit 1.0.H - capture time from last visit
 */
s.getDaysSinceLastVisit=new Function(""
+"var s=this,e=new Date(),cval,ct=e.getTime(),c='s_lastvisit',day=24*"
+"60*60*1000;e.setTime(ct+3*365*day);cval=s.c_r(c);if(!cval){s.c_w(c,"
+"ct,e);return 'First page view or cookies not supported';}else{var d"
+"=ct-cval;if(d>30*60*1000){if(d>30*day){s.c_w(c,ct,e);return 'More t"
+"han 30 days';}if(d<30*day+1 && d>7*day){s.c_w(c,ct,e);return 'More "
+"than 7 days';}if(d<7*day+1 && d>day){s.c_w(c,ct,e);return 'Less tha"
+"n 7 days';}if(d<day+1){s.c_w(c,ct,e);return 'Less than 1 day';}}els"
+"e return '';}"
);

/*
 * Plugin: getTimeToComplete 0.4 - return the time from start to stop
 */
s.getTimeToComplete=new Function("v","cn","e",""
+"var s=this,d=new Date,x=d,k;if(!s.ttcr){e=e?e:0;if(v=='start'||v=='"
+"stop')s.ttcr=1;x.setTime(x.getTime()+e*86400000);if(v=='start'){s.c"
+"_w(cn,d.getTime(),e?x:0);return '';}if(v=='stop'){k=s.c_r(cn);if(!s"
+".c_w(cn,'',d)||!k)return '';v=(d.getTime()-k)/1000;var td=86400,th="
+"3600,tm=60,r=5,u,un;if(v>td){u=td;un='days';}else if(v>th){u=th;un="
+"'hours';}else if(v>tm){r=2;u=tm;un='minutes';}else{r=.2;u=1;un='sec"
+"onds';}v=v*r/u;return (Math.round(v)/r)+' '+un;}}return '';");

/*
* Plugin: getVisitNum - version 3.0
*/
s.getVisitNum=new Function("tp","c","c2",""
+"var s=this,e=new Date,cval,cvisit,ct=e.getTime(),d;if(!tp){tp='m';}"
+"if(tp=='m'||tp=='w'||tp=='d'){eo=s.endof(tp),y=eo.getTime();e.setTi"
+"me(y);}else {d=tp*86400000;e.setTime(ct+d);}if(!c){c='s_vnum';}if(!"
+"c2){c2='s_invisit';}cval=s.c_r(c);if(cval){var i=cval.indexOf('&vn="
+"'),str=cval.substring(i+4,cval.length),k;}cvisit=s.c_r(c2);if(cvisi"
+"t){if(str){e.setTime(ct+1800000);s.c_w(c2,'true',e);return str;}els"
+"e {return 'unknown visit number';}}else {if(str){str++;k=cval.substri"
+"ng(0,i);e.setTime(k);s.c_w(c,k+'&vn='+str,e);e.setTime(ct+1800000);"
+"s.c_w(c2,'true',e);return str;}else {s.c_w(c,e.getTime()+'&vn=1',e)"
+";e.setTime(ct+1800000);s.c_w(c2,'true',e);return 1;}}");
s.dimo=new Function("m","y",""
+"var d=new Date(y,m+1,0);return d.getDate();");
s.endof=new Function("x",""
+"var t=new Date;t.setHours(0);t.setMinutes(0);t.setSeconds(0);if(x=="
+"'m'){d=s.dimo(t.getMonth(),t.getFullYear())-t.getDate()+1;}else if("
+"x=='w'){d=7-t.getDay();}else {d=1;}t.setDate(t.getDate()+d);return "
+"t;");

/*
* Plugin: clickPast - version 1.0
*/
s.clickPast=new Function("scp","ct_ev","cp_ev","cpc",""
+"var s=this,scp,ct_ev,cp_ev,cpc,ev,tct;if(s.p_fo(ct_ev)==1){if(!cpc)"
+"{cpc='s_cpc';}ev=s.events?s.events+',':'';if(scp){s.events=ev+ct_ev"
+";s.c_w(cpc,1,0);}else{if(s.c_r(cpc)>=1){s.events=ev+cp_ev;s.c_w(cpc"
+",0,0);}}}");

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

/* Top 130 Search Engine List for channel manager plugin non custom*/
s.seList="altavista.co|q,r|AltaVista>aol.co.uk,search.aol.co.uk|query"
+"|AOL - United Kingdom>search.aol.com,search.aol.ca|query,q|AOL.com "
+"Search>ask.com,ask.co.uk|ask,q|Ask Jeeves>www.baidu.com|wd|Baidu>da"
+"um.net,search.daum.net|q|Daum>google.co,googlesyndication.com|q,as_"
+"q|Google>google.com.ar|q,as_q|Google - Argentina>google.com.au|q,as"
+"_q|Google - Australia>google.at|q,as_q|Google - Austria>google.com."
+"bh|q,as_q|Google - Bahrain>google.com.bd|q,as_q|Google - Bangladesh"
+">google.be|q,as_q|Google - Belgium>google.com.bo|q,as_q|Google - Bo"
+"livia>google.ba|q,as_q|Google - Bosnia-Hercegovina>google.com.br|q,"
+"as_q|Google - Brasil>google.bg|q,as_q|Google - Bulgaria>google.ca|q"
+",as_q|Google - Canada>google.cl|q,as_q|Google - Chile>google.cn|q,a"
+"s_q|Google - China>google.com.co|q,as_q|Google - Colombia>google.co"
+".cr|q,as_q|Google - Costa Rica>google.hr|q,as_q|Google - Croatia>go"
+"ogle.cz|q,as_q|Google - Czech Republic>google.dk|q,as_q|Google - De"
+"nmark>google.com.do|q,as_q|Google - Dominican Republic>google.com.e"
+"c|q,as_q|Google - Ecuador>google.com.eg|q,as_q|Google - Egypt>googl"
+"e.com.sv|q,as_q|Google - El Salvador>google.ee|q,as_q|Google - Esto"
+"nia>google.fi|q,as_q|Google - Finland>google.fr|q,as_q|Google - Fra"
+"nce>google.de|q,as_q|Google - Germany>google.gr|q,as_q|Google - Gre"
+"ece>google.com.gt|q,as_q|Google - Guatemala>google.hn|q,as_q|Google"
+" - Honduras>google.com.hk|q,as_q|Google - Hong Kong>google.hu|q,as_"
+"q|Google - Hungary>google.co.in|q,as_q|Google - India>google.co.id|"
+"q,as_q|Google - Indonesia>google.ie|q,as_q|Google - Ireland>google."
+"is|q,as_q|Google - Island>google.co.il|q,as_q|Google - Israel>googl"
+"e.it|q,as_q|Google - Italy>google.com.jm|q,as_q|Google - Jamaica>go"
+"ogle.co.jp|q,as_q|Google - Japan>google.jo|q,as_q|Google - Jordan>g"
+"oogle.co.ke|q,as_q|Google - Kenya>google.co.kr|q,as_q|Google - Kore"
+"a>google.lv|q,as_q|Google - Latvia>google.lt|q,as_q|Google - Lithua"
+"nia>google.com.my|q,as_q|Google - Malaysia>google.com.mt|q,as_q|Goo"
+"gle - Malta>google.mu|q,as_q|Google - Mauritius>google.com.mx|q,as_"
+"q|Google - Mexico>google.co.ma|q,as_q|Google - Morocco>google.nl|q,"
+"as_q|Google - Netherlands>google.co.nz|q,as_q|Google - New Zealand>"
+"google.com.ni|q,as_q|Google - Nicaragua>google.com.ng|q,as_q|Google"
+" - Nigeria>google.no|q,as_q|Google - Norway>google.com.pk|q,as_q|Go"
+"ogle - Pakistan>google.com.py|q,as_q|Google - Paraguay>google.com.p"
+"e|q,as_q|Google - Peru>google.com.ph|q,as_q|Google - Philippines>go"
+"ogle.pl|q,as_q|Google - Poland>google.pt|q,as_q|Google - Portugal>g"
+"oogle.com.pr|q,as_q|Google - Puerto Rico>google.com.qa|q,as_q|Googl"
+"e - Qatar>google.ro|q,as_q|Google - Romania>google.ru|q,as_q|Google"
+" - Russia>google.st|q,as_q|Google - Sao Tome and Principe>google.co"
+"m.sa|q,as_q|Google - Saudi Arabia>google.com.sg|q,as_q|Google - Sin"
+"gapore>google.sk|q,as_q|Google - Slovakia>google.si|q,as_q|Google -"
+" Slovenia>google.co.za|q,as_q|Google - South Africa>google.es|q,as_"
+"q|Google - Spain>google.lk|q,as_q|Google - Sri Lanka>google.se|q,as"
+"_q|Google - Sweden>google.ch|q,as_q|Google - Switzerland>google.com"
+".tw|q,as_q|Google - Taiwan>google.co.th|q,as_q|Google - Thailand>go"
+"ogle.bs|q,as_q|Google - The Bahamas>google.tt|q,as_q|Google - Trini"
+"dad and Tobago>google.com.tr|q,as_q|Google - Turkey>google.com.ua|q"
+",as_q|Google - Ukraine>google.ae|q,as_q|Google - United Arab Emirat"
+"es>google.co.uk|q,as_q|Google - United Kingdom>google.com.uy|q,as_q"
+"|Google - Uruguay>google.co.ve|q,as_q|Google - Venezuela>google.com"
+".vn|q,as_q|Google - Viet Nam>google.co.vi|q,as_q|Google - Virgin Is"
+"lands>icqit.com|q|icq>bing.com|q|Microsoft Bing>myway.com|searchfor"
+"|MyWay.com>naver.com,search.naver.com|query|Naver>netscape.com|quer"
+"y,search|Netscape Search>reference.com|q|Reference.com>seznam|w|Sez"
+"nam.cz>abcsok.no|q|Startsiden>tiscali.it|key|Tiscali>virgilio.it|qs"
+"|Virgilio>yahoo.com,search.yahoo.com|p|Yahoo!>ar.yahoo.com,ar.searc"
+"h.yahoo.com|p|Yahoo! - Argentina>au.yahoo.com,au.search.yahoo.com|p"
+"|Yahoo! - Australia>ca.yahoo.com,ca.search.yahoo.com|p|Yahoo! - Can"
+"ada>fr.yahoo.com,fr.search.yahoo.com|p|Yahoo! - France>de.yahoo.com"
+",de.search.yahoo.com|p|Yahoo! - Germany>hk.yahoo.com,hk.search.yaho"
+"o.com|p|Yahoo! - Hong Kong>in.yahoo.com,in.search.yahoo.com|p|Yahoo"
+"! - India>yahoo.co.jp,search.yahoo.co.jp|p,va|Yahoo! - Japan>kr.yah"
+"oo.com,kr.search.yahoo.com|p|Yahoo! - Korea>mx.yahoo.com,mx.search."
+"yahoo.com|p|Yahoo! - Mexico>ph.yahoo.com,ph.search.yahoo.com|p|Yaho"
+"o! - Philippines>sg.yahoo.com,sg.search.yahoo.com|p|Yahoo! - Singap"
+"ore>es.yahoo.com,es.search.yahoo.com|p|Yahoo! - Spain>telemundo.yah"
+"oo.com,espanol.search.yahoo.com|p|Yahoo! - Spanish (US : Telemundo)"
+">tw.yahoo.com,tw.search.yahoo.com|p|Yahoo! - Taiwan>uk.yahoo.com,uk"
+".search.yahoo.com|p|Yahoo! - UK and Ireland>yandex|text|Yandex.ru>s"
+"earch.cnn.com|query|CNN Web Search>search.earthlink.net|q|Earthlink"
+" Search>search.comcast.net|q|Comcast Search>search.rr.com|qs|RoadRu"
+"nner Search>optimum.net|q|Optimum Search";

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

/* Plugin: TNT Integration v1.0 */

s.trackTNT=new Function("v","p","b",""

+"var s=this,n='s_tnt',p=p?p:n,v=v?v:n,r='',pm=false,b=b?b:true;if(s."

+"getQueryParam){pm=s.getQueryParam(p);}if(pm){r+=(pm+',');}if(s.wd[v"

+"]!=undefined){r+=s.wd[v];}if(b){s.wd[v]='';}return r;");

/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.visitorNamespace="sportsbet";
/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',
    s_objectID;

function s_gi(un,pg,ss){
  var c="s.version='H.24.4';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(m,\"\\n\",\"\\\\n\"),\""
+"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){retur"
+"n x?(''+x).substring(0,l):x};s.co=function(o){if(!o)return o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.indexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for(var p=0;p"
+"<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toU"
+"pperCase():'';if(x){x=''+x;if(s.em==3)x=encodeURIComponent(x);else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h"
+".substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=escape(''+x);x=s.rep(x,'+','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('"
+"%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x)"
+"{var s=this;if(x){x=s.rep(''+x,'+',' ');return s.em==3?decodeURIComponent(x):unescape(x)}return x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substri"
+"ng(0,y);r=s[f](t,a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a"
+"=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var"
+" s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.mpc=function(m,a){var s=this,c,l,n,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(v&&v=='prerender'){if(!s.mpq){s.mpq=new Array;l="
+"s.sp('webkitvisibilitychange,visibilitychange',',');for(n=0;n<l.length;n++){s.d.addEventListener(l[n],new Function('var s=s_c_il['+s._in+'],c,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilitySta"
+"te;if(s.mpq&&v==\"visible\"){while(s.mpq.length>0){c=s.mpq.shift();s[c.m].apply(s,c.a)}s.mpq=0}'),false)}}c=new Object;c.m=m;c.a=a;s.mpq.push(c);return 1}return 0};s.si=function(){var s=this,i,k,v,"
+"c=s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'"
+"}}c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){v"
+"ar s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf"
+"('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':"
+"s.epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='N"
+"ONE'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString"
+"()+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i"
+"].o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.a"
+"pv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.w"
+"d,'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c"
+"=s.t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tf"
+"s=p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=thi"
+"s,l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=function(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s."
+"trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+(un),im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.ne"
+"t';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mob"
+"ile?'5.1':'1')+'/'+s.version+(s.tcn?'T':'')+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047)}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if"
+"(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;"
+"r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im.s_l=0;im.onload=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_"
+"il['+s._in+'];s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;if(s.debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dl"
//CAUS2: capture when SC <IMG> created
+"n<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)};s.wd.jsHub&&s.wd.jsHub.trigger('sc-event',{scObject:s});im.src=rs;if((!ta||ta=='_self'||ta=='_top'||(s.wd.name&&ta==s.wd.name))&&rs.indexOf('&pe=')>=0){b=e=new Date;while(!im.s_l&&e.getTime()-"
//+"n<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im.src=rs;if((!ta||ta=='_self'||ta=='_top'||(s.wd.name&&ta==s.wd.name))&&rs.indexOf('&pe=')>=0){b=e=new Date;while(!im.s_l&&e.getTime()-"
+"b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf="
+"function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l=0,q,a,b='"
+"',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='https://')j+="
+"8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',p,ei,';if"
+"(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c;else c='"
+"'}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData\")k=\"c\""
+";if(v){for(sk in v)if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>=0)&&(!Object||!Object.prototype||!Object.prototype[sk])){nfm=0;if(nfl)for(nfn=0;nfn<nf"
+"l.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.indexOf('.');if(nke>0){nk=sk.substr"
+"ing(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(sv){if(vfp=='retrieveLightData'&&f"
+".indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';else if(s.num(ss)){if(sp=='prop')s"
+"k='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}if(qs!='')qs+='&.'+k}return qs};s.hav=f"
+"unction(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType){fv=s.linkTrackVars;fe=s.linkTrac"
+"kEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;if(fe){fe=','+fe+',';if(fv)fv+=',e"
+"vents,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&e){v=e;e=''}if(v&&(!fv||fv.indexOf"
+"(','+k+',')>=0)&&k!='linkName'&&k!='linkType'){if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pageURL'){q='g';v=s.fl(v,255)}else if(k=="
+"'referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationServerSecure)v=''}else if(k=='visit"
+"orMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s.em==3)v='UTF-8'}else if(k=='visit"
+"orNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='cc';else if(k=='channel')q='ch';el"
+"se if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';else if(k=='javaEnabled')q='v';else i"
+"f(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else if(k=='plugins')q='p';else if(k=="
+"'events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q='mtp';else if(k=='lightStoreForSe"
+"conds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q='mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=='deleteLightProfiles')q='mtsd';els"
+"e if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k],fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier"
+"'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?');h=qi>=0"
+"?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s"
+".lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lf"
+"t,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring(0,1)!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e','v"
+"ar s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=s.co(this);s.t();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Function('e','var s=s_c_il['+s._in+'],f,tcf;if(s.d&&s.d.all&&s.d.all.cpp"
+"XYctnr)return;s.eo=e.srcElement?e.srcElement:e.target;tcf=new Function(\"s\",\"var e;try{if(s.eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t()}catch(e){}\");tcf(s);s.eo=0');s.oh=functi"
+"on(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l"
+".protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o)"
+"{var t=o.tagName;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type."
+"toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&("
+"!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o."
+"value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s="
+"this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return '"
+"'};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('="
+"'),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c"
+"_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s"
+".sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Funct"
+"ion('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0|"
+"|oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachE"
+"vent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamplin"
+"gGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=fu"
+"nction(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))re"
+"turn n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLower"
+"Case)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=function(un){var s=this;if(s.un&&s.mpc('sa',argument"
+"s))return;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s."
+"m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il"
+"','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]]"
+")r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(s.mpc(\"m_a\",a"
+"rguments))return;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if(("
+"\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)f"
+"or(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){"
+"if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g["
+"i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.subs"
+"tring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_"
+"c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.m"
+"axDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.t"
+"ype=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o"
+"=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=funct"
+"ion(vo,r){var s=this,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}"
+"}};s.vob=function(vo){var s=this,l=s.va_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s."
+"dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDel"
+"ay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s"
+".track=s.t=function(vo){var s=this,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt="
+"tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',v"
+"b=new Object;if(s.mpc('t',arguments))return;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn"
+"=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new "
+"Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v"
+"=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if("
+"s.apv>=5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage"
+"(tl)?\"Y\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}i"
+"f(s.pl)while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidt"
+"h=bw;s.browserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.vob(vb);s.voa(vo)}if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);var l=s.wd.location,r=tfs.documen"
+"t.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o"
+"),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(o){t=s.ot(o);n=s.oid(o);x=o.s_oidt}}if(!n||t=='BODY')o='';if(o){oc=o.onclick?''+o.o"
+"nclick:'';if((oc.indexOf('s_gs(')>=0&&oc.indexOf('.s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if(o){if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.link"
+"Name;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'?t:'o');s.pev1=(h?s.ape(h):'');s.pev2=(l?s.ape(l):'')}else trk=0;if(s.trackInlineStats){if(!p){p=s.pageUR"
+"L;w=0}t=s.ot(o);i=o.sourceIndex;if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape("
+"t)+(i?'&oi='+i:'')}}else trk=0}if(trk||qs){s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referre"
+"r=s.lightProfileID=s.retrieveLightProfiles=s.deleteLightProfiles=''}s.sq(qs)}}else s.dl(vo);if(vo)s.voa(vb,1);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if("
+"s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code};s.trackLink=s.tl=function(o,t,n,vo){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t(vo)};s.trackLight=function(p,ss,"
+"i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightIncrementBy=i;s.t(vo)};s.setTagContainer=function(n){var s=this,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l.length;i++){t=l[i"
+"];if(t&&t._c=='s_l'&&t.tagContainerName==n){s.voa(t);if(t.lmq)for(i=0;i<t.lmq.length;i++){x=t.lmq[i];y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n,x.u,x.d)}if(t.ml"
+")for(x in t.ml)if(s[x]){y=s[x];x=t.ml[x];for(i in x)if(!Object.prototype[i]){if(typeof(x[i])!='function'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if(t.mmq)for(i=0;i<t.mmq.length;i++){x=t.mmq[i];if"
+"(s[x.m]){y=s[x.m];if(y[x.f]&&typeof(y[x.f])=='function'){if(x.a)y[x.f].apply(y,x.a);else y[x.f].apply(y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq[i]);t.s=s;return}}};s.wd=window;s.ssl=(s.wd.loc"
+"ation.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6"
+"=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer')"
+";s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=par"
+"seFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpp"
+"erCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='timestamp,dynamicVariablePrefix,visitorID,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServer"
+"Secure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,contextData,currencyCode,lightProfileID,lightStoreForSeconds,lightIncrementBy,retrieveLightProfiles,"
+"deleteLightProfiles,retrieveLightData';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='timestamp,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreForSeconds,"
+"lightIncrementBy';s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,events2,products,linkName,linkType';var n;for(n=1;n<=75;n++){s.vl_t+=',"
+"prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,jav"
+"ascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,tra"
+"ckingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExte"
+"rnalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,lightTrackVars,_1_referrer,un';s.va_g=s."
+"sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){s_gi(\"_\",1,1).co(o)};s.wd.s_gs=function(un){s_gi(un,1,1).t("
+")};s.wd.s_dc=function(un){s_gi(un,1).t()}}",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,j,x,s;if(un){un=un.toLowerCase();if(l)for(j=0;j<2;j++)for(i=0;i<l.length;i++){s=l[i];x=s._c;if((!x||x=='s_c'||(j>0&&x=='s_l'))&&(s.oun==un||(s.fs&&s.sa&&s.fs(s.oun,un)))){if(s.sa)s.sa(un);if(x=='s_c')return s}else s=0}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");
w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a<5||v.indexOf('Opera')>=0||u.indexOf('Opera')>=0)c=s_ft(c);if(!s){s=new Object;if(!w.s_c_in){w.s_c_il=new Array;w.s_c_in=0}s._il=w.s_c_il;s._in=w.s_c_in;s._il[s._in]=s;w.s_c_in++;}s._c='s_c';(new Function("s","un","pg","ss",c))(s,un,pg,ss);return s}
function s_giqf(){var w=window,q=w.s_giq,i,t,s;if(q)for(i=0;i<q.length;i++){t=q[i];s=s_gi(t.oun);s.sa(t.un);s.setTagContainer(t.tagContainerName)}w.s_giq=0}s_giqf()


/*
CAUSATA PLUGIN CODE - primary jshub.js
*/

// debug/debug-min.js skipped
// hub/hub-min.js

/**
 * Core hub functionality for jsHub tag
 * @module hub
 * @class jsHub
 *//*--------------------------------------------------------------------------*/

;(function(){var c=window,b,a=function(){var h=[],i=[],f={},m=function(n,p){this.token=n;
this.callback=p;
},l=function(n,q,p){this.type=n;
this.timestamp=p||b.safe.getTimestamp();
this.data=q;
},g=function(){var n={},p=function(q){return n[q]||{"data-capture":[],"data-transport":[]};
};
this.bind=function(r,t,q,w){var v=p(r);
if(!v[q]){q="data-capture";
}for(var u=false,s=0;
s<v[q].length;
s++){if(v[q][s].token===t){v[q][s].callback=w;
u=true;
break;
}}if(!u){v[q].push(new m(t,w));
}n[r]=v;
};
this.listenersFor=function(u){var r=p(u),q=p("*");
var x=[],y=[].concat(r["data-capture"]).concat(q["data-capture"]).concat(r["data-transport"]).concat(q["data-transport"]);
o:for(var t=0,w=y.length;
t<w;
t++){for(var s=0,v=x.length;
s<v;
s++){if(x[s].token===y[t].token){continue o;
}}x.push(y[t]);
}return x;
};
},k=new g(),e=function(){var n=function(r,t){r=r.split(",");
for(var s=0;
s<r.length;
s++){if(t===b.util.trim(r[s])){return true;
}}return false;
},q=function(r,t){var s=b.util.trim(t.event_visibility);
if(s===undefined||s===""||s==="*"){return true;
}return n(s,r);
},p=function(s,t){var r={};
b.util.each(t,function(w,v){if(/_visibility$/.test(v)===false){var u=t[v+"_visibility"];
if(typeof u!=="string"||u===""||u==="*"||n(u,s)){r[v]=w;
}}});
return r;
};
this.dispatch=function(s,x,w,v){var r,u,t;
if(q(x.token,w)){u=p(x.token,w);
r=new l(s,u,v);
t=x.callback(r);
if(t){b.util.merge(w,t);
}}};
},j=new e();
this.bind=function(n,p){if(typeof n!=="string"||n===""){return;
}if(typeof p!=="object"){return;
}if(!p.id||!p.eventHandler){return;
}k.bind(n,p.id,p.type,p.eventHandler);
};
this.trigger=function(q,s,r){s=s||{};
var n=new l(q,s,r);
i.push(n);
var t=k.listenersFor(q);
for(var p=0;
p<t.length;
p++){j.dispatch(q,t[p],s,n.timestamp);
}if(q==="plugin-initialization-start"){h.push(s);
if(f[s.id]){this.configure(s.id,f[s.id]);
}}};
this.cachedEvents=function(){var s_wdpro=[],q;
for(q=0;
q<i.length;
q++){var p=i[q],n={};
n.type=p.type;
n.timestamp=p.timestamp;
n.data={};
for(var r in p.data){if(p.data.hasOwnProperty(r)){n.data[r]=p.data[r];
}}s_wdpro.push(n);
}return s_wdpro;
};
this.getPluginInfo=function(){var s_wdpro=[],n;
for(n=0;
n<h.length;
n++){var p=h[n],r={};
for(var q in p){if(typeof p[q]==="string"||typeof p[q]==="number"){r[q]=p[q];
}}s_wdpro.push(r);
}return s_wdpro;
};
this.configure=function(v,s){if(typeof v!=="string"){throw new Error("Invalid configuration key");
}var r,w,t,x=v.split("."),p=typeof s;
w=function(){var y,z=x.slice(1,x.length).join(".");
for(y=0;
y<h.length;
y++){if(r===h[y].id&&typeof h[y].configure==="function"){h[y].configure(z,s);
return;
}}};
r=x[0];
t=x[x.length-1];
for(var u=f,q=0;
q<x.length-1;
q++){u[x[q]]=u[x[q]]||{};
u=u[x[q]];
}if(p==="string"||p==="number"||p==="boolean"){u[t]=s;
w();
}else{if(s===null){delete u[t];
w();
}else{if(p==="object"){for(var n in s){if(s.hasOwnProperty(n)){this.configure(v+"."+n,s[n]);
}}}else{return u[t];
}}}};
};
b=c.jsHub=new a();
b.safe=function(f){var e;
if("document"===f){e={location:{hash:document.location.hash,host:document.location.host,hostname:document.location.hostname,href:document.location.href,pathname:document.location.pathname,port:document.location.port,protocol:document.location.protocol,search:document.location.search},title:document.title,referrer:(document.referrer===null)?"":document.referrer,cookies:document.cookies,domain:"Unsafe property"};
}else{e={};
}return e;
};
b.safe.getTimestamp=function(){return new Date().getTime();
};
var d=function(){var e=this;
e.trim=function(f){if(typeof f==="string"){f=f.replace(/(&nbsp;|\s)+/g," ").replace(/(^\s+)|(\s+$)/g,"");
}return f;
};
e.isArray=function(f){return Object.prototype.toString.call(f)==="[object Array]";
};
e.each=function(g,k){if(e.isArray(g)){for(var j=0,f=g.length;
j<f;
j++){k.call(b,g[j],j);
}}else{if(typeof g==="object"){for(var h in g){if(g.hasOwnProperty(h)){k.call(b,g[h],h);
}}}}return g;
};
e.merge=function(f,h){f=f||{};
h=h||{};
for(var g in h){if(h.hasOwnProperty(g)){f[g]=h[g];
}}return f;
};
};
b.util=new d();
})();


// form-transport/form-transport-min.js

(function(){var a=function(){this.dispatch=function(b,d,j){var l=+new Date(),n=document,m=(/MSIE/).test(navigator.userAgent),f,g="jshub-form-"+l,h,c="jshub-iframe-"+l,i;
if(!(/^POST|GET$/i.test(b))||!d||(/^javascript:|file:/i.test(d))){return false;
}j=j||{};
f=n.createElement("form");
f.id=g;
f.method=b;
f.action=d;
f.style.visibility="hidden";
f.style.position="absolute";
f.style.top=0;
f.style.cssClass="jshub-form";
while(f.hasChildNodes()){f.removeChild(f.lastChild);
}jsHub.util.each(j,function o(r,t){var q,p;
if(typeof r==="string"||typeof r==="number"){if(m){try{p=n.createElement('<input name="'+t+'" />');
}catch(s){p=n.createElement("input");
p.name=t;
}}else{p=n.createElement("input");
p.name=t;
}p.type="hidden";
p.value=r;
f.appendChild(p);
}else{if(jsHub.util.isArray(r)){for(q=0;
q<r.length;
q++){if(typeof r[q]==="string"||typeof r[q]==="number"){o(r[q],t);
}}}else{}}});
if(m){try{h=n.createElement('<iframe name="'+c+'" />');
}catch(k){h=n.createElement("iframe");
h.name=c;
}}else{h=n.createElement("iframe");
h.name=c;
}h.id=c;
h.src="#";
h.style.visibility="hidden";
h.style.position="absolute";
h.style.top=0;
h.style.cssClass="jshub-iframe";
if(m){try{if("ActiveXObject" in window){n=new ActiveXObject("htmlfile");
n.open();
n.write("<html><head></head><body></body></html>");
n.body.innerHTML=f.outerHTML+h.outerHTML;
n.close();
f=n.getElementById(f.id);
h=n.getElementById(h.id);
}}catch(k){}}else{n.body.appendChild(f);
n.body.appendChild(h);
}if(!f){}if(!h||typeof(h.nodeType)==="undefined"){}i={"doc":n,"form":f,"url":f.action,"iframe":h};
h.transportState=0;
h.onload=function(){jsHub.trigger("form-transport-complete",i);
if(f&&h.parentNode){f.parentNode.removeChild(f);
}if(h&&h.parentNode){h.parentNode.removeChild(h);
}};
h.onunload=function(){};
f.target=h.id;
f.submit();
jsHub.trigger("form-transport-sent",{method:b,url:d,data:j});
return i;
};
};
jsHub.dispatchViaForm=(new a()).dispatch;
})();


// jsonp-transport/jsonp-transport-min.js
(function(){var a=function(){this.request=function(g,e,h,f){var c=g+"?"+e+"&callback="+h;
if(f===true||f==="true"){document.write('<script type="text/javascript" src="',c,'"><\/script>');
}else{var b=document.createElement("script");
b.setAttribute("type","text/javascript");
b.setAttribute("src",c);
var d=document.getElementsByTagName("head")[0];
d.appendChild(b);
}};
this.response=function(b){jsHub.response=b;
};
};
jsHub.dispatchViaJsonp=(new a()).request;
jsHub.responseViaJsonp=(new a()).response;
})();



// lib/json2-min.js

(function(){function d(f){return f<10?"0"+f:f;
}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(f){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+d(this.getUTCMonth()+1)+"-"+d(this.getUTCDate())+"T"+d(this.getUTCHours())+":"+d(this.getUTCMinutes())+":"+d(this.getUTCSeconds())+"Z":null;
        };
String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(f){return this.valueOf();
};
}var c=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,g=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,h,b,j={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},i;
function a(f){g.lastIndex=0;
return g.test(f)?'"'+f.replace(g,function(k){var l=j[k];
return typeof l==="string"?l:"\\u"+("0000"+k.charCodeAt(0).toString(16)).slice(-4);
})+'"':'"'+f+'"';
}function e(r,o){var m,l,s,f,p=h,n,q=o[r];
if(q&&typeof q==="object"&&typeof q.toJSON==="function"){q=q.toJSON(r);
}if(typeof i==="function"){q=i.call(o,r,q);
}switch(typeof q){case"string":return a(q);
case"number":return isFinite(q)?String(q):"null";
case"boolean":case"null":return String(q);
case"object":if(!q){return"null";
}h+=b;
n=[];
if(Object.prototype.toString.apply(q)==="[object Array]"){f=q.length;
for(m=0;
m<f;
m+=1){n[m]=e(m,q)||"null";
}s=n.length===0?"[]":h?"[\n"+h+n.join(",\n"+h)+"\n"+p+"]":"["+n.join(",")+"]";
h=p;
return s;
}if(i&&typeof i==="object"){f=i.length;
for(m=0;
m<f;
m+=1){l=i[m];
if(typeof l==="string"){s=e(l,q);
if(s){n.push(a(l)+(h?": ":":")+s);
}}}}else{for(l in q){if(Object.hasOwnProperty.call(q,l)){s=e(l,q);
if(s){n.push(a(l)+(h?": ":":")+s);
}}}}s=n.length===0?"{}":h?"{\n"+h+n.join(",\n"+h)+"\n"+p+"}":"{"+n.join(",")+"}";
h=p;
return s;
}}jsHub.json=jsHub.json||{};
if(typeof jsHub.json.stringify!=="function"){jsHub.json.stringify=function(m,k,l){var f;
h="";
b="";
if(typeof l==="number"){for(f=0;
f<l;
f+=1){b+=" ";
}}else{if(typeof l==="string"){b=l;
}}i=k;
if(k&&typeof k!=="function"&&(typeof k!=="object"||typeof k.length!=="number")){throw new Error("JSON.stringify");
}return e("",{"":m});
};
}}());


// logger/logger-min.js skipped

// hub/utils-min.js

(function(){var a=jsHub.util;
a.qualifyHREF=function(b){var l=jsHub.safe("document").location;
var c=l.protocol+"//"+l.host;
if(/^(\.\/)([^\/]?)/.test(b)){b=b.replace(/^(\.\/)([^\/]?)/,"$2");
}if(/^([a-z]+)\:\/\//.test(b)){c=b;
}else{if(b.substr(0,1)==="/"){c+=b;
}else{if(/^((\.\.\/)+)([^\/].*$)/.test(b)){var h=b.match(/^((\.\.\/)+)([^\/].*$)/);
h=h[h.length-1];
var m=b.split("../").length-1;
var f=l.pathname.split("/");
f=f.splice(0,f.length-1);
for(var g=0;
g<m;
g++){f=f.splice(0,f.length-1);
}var n="";
for(var e=0;
e<f.length;
e++){if(f[e]!==""){n+="/"+f[e];
}}n+="/";
n+=h;
c+=n;
}else{n="";
f=l.pathname.split("/");
f=f.splice(0,f.length-1);
for(var d=0;
d<f.length;
d++){if(f[d]!==""){n+="/"+f[d];
}}n+="/";
c+=n+b;
}}}return c;
};
a.parseQueryString=function(c){var f,b={},e,h,d,g;
if(typeof c==="undefined"){c=window.location.search;
}if(c.charAt(0)==="?"){c=c.substring(1);
}if(c===""){return{};
}c=c.replace(/\+/g," ");
f=c.split(/[&;]/g);
for(e=0;
e<f.length;
e++){h=f[e].split("=");
d=decodeURIComponent(h[0]);
g=decodeURIComponent(h[1]||"");
if(!b[d]){b[d]=[];
}b[d].push(g);
}return b;
  };
a.readCookie=function(name){
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
  };
a.onReady=function(d, f){
      if (d.addEventListener) {
          d.addEventListener("DOMContentLoaded", f, false);
      } else if (d.attachEvent) {
          d.onreadystatechange = function () {
              if (/interactive|complete/.test(this.readyState)) {
                  f();
              }
          };
      } else if (/WebKit/i.test(navigator.userAgent)) {
          /* for older Safari */
          timer = setInterval(function () {
              if (/loaded|complete/.test(d.readyState)) {
                  f();
              }
          }, 50);
}};

})();

// hub/technographics-min.js

(function(){var c={name:"Technographics Plugin",id:"technographic",version:0.4,vendor:"jsHub.org",type:"data-capture"};
var a={"about.com":"terms","alice.com":"qs","alltheweb.com":"q","altavista.com":"q","aol\\.[^\\/]+":["encquery","q","query"],"ask.com":"q","bing.com":"q","cnn.com":"query","google\\.[^\\/]+":"q","lycos.com":"query","mamma.com":"query","msn.com":"q","netscape.com":"query","online.onetcenter.org":"qt","search.com":"q","terra.com":"query","yahoo.com":"p"};
jsHub.trigger("plugin-initialization-start",c);
c.eventHandler=function b(g){jsHub.trigger("technographic-parse-start",g);
var k=window,d=k.document,e=k.screen,i=g.data,h={};
h.url=d.location.href;
if(!i.url){i.url=h.url;i["page-url"]=h.url
}h.title=d.title;
if(!i.title){i["page-title"]=h.title;
}h.referrer=d.referrer;
if(!i.referrer){i.referrer=h.referrer;
}if(i.referrer){var f=i.referrer;
var j=function(o,n){var m=new RegExp("^http(s)?:\\/\\/(www\\.)?((.+\\.)?"+n+")\\/"),l=new RegExp("\\?(.+[&;])?"+o+"=([^&;]+)([&;].*)?$");
if(m.test(f)&&l.test(f)){jsHub.trigger("nat-search-ref",{"search-string":decodeURIComponent(f.match(l)[2].replace("+"," ")),"external-referrer":f,"search-engine":f.match(m)[3]});
}};
jsHub.util.each(a,function(m,l){if(typeof m==="string"){j(m,l);
}else{jsHub.util.each(m,function(n){j(n,l);
});
}});
}i.wW=k.innerWidth;
i.wH=k.innerHeight;
i.sW=e.width;
i.sH=e.height;
i.colors=e.colorDepth;
i.tzOffset=-(new Date()).getTimezoneOffset();
jsHub.trigger("technographic-parse-complete",h);
return i;
};
jsHub.bind("page-view",c);
jsHub.trigger("plugin-initialization-complete",c);
})();



// vendor-causata/causata-decision-min.js
(function(){var d={id:"causata-decision",name:"Causata Decision Plugin",version:"2.0.1",vendor:"Causata Inc",type:"data-transport"},b="string",a={server:null,account:null,locations:null,callback:"jsHub.responseViaJsonp",api:"",wait:false},c=function(){if(typeof a.server!==b){jsHub.trigger("plugin-error",{message:"Server hostname not specified",source:d.id});
return;
}if(typeof a.locations!==b){jsHub.trigger("plugin-error",{message:"Locations not specified",source:d.id});
return;
}var g,f=a.locations.split(/\s*,\s*/);
g="numRequests="+f.length;
for(i=0;
i<f.length;
i++){g+="&loc"+i+"="+f[i];
}g+=a.api;
var h=(("https:"===jsHub.safe("document").location.protocol)?"https://":"http://"),j=a.server.split(/\s*,\s*/);
for(i=0;
i<j.length;
i++){jsHub.dispatchViaJsonp(h+j[i],g,a.callback,a.wait);
}};
jsHub.trigger("plugin-initialization-start",d);
d.eventHandler=function e(f){c();
};
d.configure=function(f,g){a[f]=""+g;
};
jsHub.bind("make-decision",d);
jsHub.trigger("plugin-initialization-complete",d);
})();

// vendor-causata/causata-transport-min.js

(function(){var h={id:"causata-transport",name:"Causata Transport Plugin",version:"0.4.4",vendor:"Causata Inc",type:"data-transport"},a="authentication,checkout,download,nat-search-ref,page-view,product-view,site-exit,site-search,openbet-impression".split(","),f="string",e=/^url|tzOffset|sW|sH|wW|wH|colors|plugins$/,c={server:null,account:null},b=[],i=false,j=function(o,n,m){if(/-source$/.test(n)){return;
}var l=typeof m,k;
if(f===l||"number"===l){o.push({name:n,value:m});
}else{if(jsHub.util.isArray(m)){for(k=0;
k<m.length;
k++){j(o,n,m[k]);
}}}},g=function(){if(typeof c.server!==f){jsHub.trigger("plugin-error",{message:"Server hostname not specified",source:h.id});
return;
}var m,k,s,n,p,l;
var o={sender:h.name+" v"+h.version,event:[]};
for(m=0;
m<b.length;
m++){k=b[m];
if(k.data['cancel-events-all']===true){
b=[];
a=[];
return;
};
if(k.data['cancel-event']===true){
b=[];
return;
};
s={timestamp:k.timestamp,eventType:k.type};
if(typeof c.account===f){s.organization=c.account;
}l=[];
for(n in k.data){if(k.data.hasOwnProperty(n)){p=k.data[n];
if(e.test(n)){o[n]=p;
}else{if(n==="referrer"){if(p===""){p="(direct)";
}o.referrer=p;
}else{j(l,n,p);
}}}}if(l.length>0){s.attributes=l;
}o.event.push(jsHub.json.stringify(s));
}b=[];
var r=(("https:"===jsHub.safe("document").location.protocol)?"https://":"http://"),q=c.server.split(/\s*,\s*/);
for(m=0;
m<q.length;
m++){jsHub.dispatchViaForm("POST",r+q[m],o);
}};
jsHub.trigger("plugin-initialization-start",h);
h.eventHandler=function d(m){if(m.type==="data-capture-start"){i=true;
}if(m.type==="data-capture-complete"){i=false;
g();
}var l=false;
if(""+m.data["custom-event"]==="true"){l="custom";
}else{if(m.type.match(/^error-/)){l="standard";
}else{for(var k=0;
k<a.length;
k++){if(a[k]===m.type){l="standard";
break;
}}}}if(l){b.push(m);
if(!i){g();
}}};
h.configure=function(k,l){c[k]=""+l;
};
jsHub.bind("*",h);
jsHub.trigger("plugin-initialization-complete",h);
})();



// hub/load-triggers-min.js
/**
 * Fire the page lifecycle events when the page has loaded.
 *
 * Contains DOMContentLoaded code by Dean Edwards / Matthias Miller / John Resig
 * http://dean.edwards.name/weblog/2006/06/again/
 * http://javascript.nwbox.com/IEContentLoaded/
 *
 * @module load-triggers
 */
/*--------------------------------------------------------------------------*/

// JSLint options
/*global jsHub */

(function(){var c=null,b=document,c_c,jsh_c,jsh_cl,i,ci;
function a(){if(a.done){return;
}a.done=true;
if(c){clearInterval(c);
}jsHub.trigger("data-capture-start");
jsHub.trigger("page-view");
jsHub.trigger("data-capture-complete");
}if(b.addEventListener){b.addEventListener("DOMContentLoaded",a,false);
}else{if(b.attachEvent){b.onreadystatechange=function(){if(/interactive|complete/.test(this.readyState)){a();
}};
}else{if(/WebKit/i.test(navigator.userAgent)){c=setInterval(function(){if(/loaded|complete/.test(b.readyState)){a();
}},50);
};
}}
if((c_c=window.causata_config)&&(jsh_c=c_c.jshub_configure)){
jsh_cl=jsh_c.length;
for(i=0;i<jsh_cl;i++){
ci=jsh_c[i];
jsHub.configure(ci[0],ci[1]);
}
};
})();


// Causata Cookie checking/setting code - this is so we don't have a race condition between Openbet and the client-side calls

function setCausataCookie(cookieName,cookieValue,nDays) {
 var today = new Date();
 var expire = new Date();
 if (nDays==null || nDays==0) nDays=1;
 expire.setTime(today.getTime() + 3600000*24*nDays);
 document.cookie = cookieName+"="+escape(cookieValue)+";domain="+causataCookieDomain+";path=/;expires="+expire.toGMTString();
}

var aid = jsHub.util.readCookie('aid');
    if (!aid) {
        // Set new cookie value randomly
    	var causataCookieValue = Math.floor((Math.random()*30357180242473734)+1);
		console.log("New Causata cookie set: "+causataCookieValue);
      	setCausataCookie('aid',causataCookieValue,'730');
    }



// Causata SiteCatalyst Custom Plugin for Sportsbet
// Released 2nd May 2013
/*!
 * Custom plugin
 * Prepared by Causata consulting
 */

// JSLint options
/*global jsHub, s */
/*jslint white: true, browser: true, laxbreak: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, strict: true, newcap: true, immed: true, maxerr: 50, indent: 2 */

(function() {

  /*
   * Metadata about this plug-in for use by UI tools and the Hub
   */
  var metadata = {
    name: 'SiteCatalyst Data Plugin',
    id: 'sc-data-plugin',
    version: 1.0,
    vendor: 'Causata Inc',
    type: 'data-capture'
  };

  /**
   * Capture page data from the SiteCatalyst object in the page
   * @method capture
   * @param event {Object} Config object for the plugin, containing data found by other plugins, and
   * the context (DOM node) to start parsing from.
   * @property metadata
   */
  metadata.eventHandler = function capture( event ) {
    var data = event.data,
        type = event.type,
        isEventPV = ( type === "page-view" ),
        isEventOth = ( type === "sc-event" );


// expect to get correct SC global object for all custom events
// in case of "page-view", check for known custom SC object or standard SC object (s)
    var pageData = data.scObject || ( window.s_wdpro_doPlugins ? window.s_wdpro : window.s_doPlugins ? window.s : ( window.s_wdpro || window.s ) );
// do we have an "s" object from SC?
    if (!! pageData) {

// Check domain to make sure we only send requests for Sportsbet
    var current_domain = document.location.hostname;
    if( (/sb/).test(current_domain) && (current_domain != "m.sportsbet.com.au") && (current_domain.indexOf('ias') === -1) ){

        if (isEventPV || isEventOth) {

        // match the pagename, hier1, channel, props, evars
          var regAttributes = /^((pageName)|(currencyCode)|(c_id)|(campaign)|(server)|(pageType)|(hier1)|(channel)|(prop[0-9]+)|(eVar[0-9]+)|(state)|(zip))$/;
          var fieldValue;
          for (var field in pageData) {
            fieldValue = pageData[field];
            if(field.search(regAttributes) != -1) {
              if( fieldValue !== "") {
                // Name translations
                var attr = "sc-" + field.toLowerCase();
                if(field.match('pageName')) {
                  attr = "page-name";
                }
  			    // Capture hashed Customer ID from Openbet
  			    if(field.match('c_id')) {
                  if( !fieldValue ){ // false value ( 0/null/undefined )
                   continue;
                  }
                  attr = "customer-id-hash";
                }
                // Ensure we don't capture eVar13 (non-hashed Customer ID)
                if(field.match('eVar13')) {
                  if( !fieldValue ){ // false value ( 0/null/undefined )
                   continue;
                  }
                   continue;
                }
                // Add attributes
                data[attr] = pageData[field];
              }
            }
            data['page-url'] = document.location.href;
          }

          if(pageData.campaign) {
              data['campaign-id'] = pageData.campaign;
              data['custom-event'] = "true";
              jsHub.trigger('sc-campaign', data, event.timestamp);
              // delete data['custom-event'];
            }

          if (pageData["events"]) {
            var events = pageData["events"].split(',');
            for (var i = 0; i < events.length; i++) {
              var eventname = events[i];
              // superfluous pageview event
              if( isEventOth && (/^event9$/i).test(eventname) ){
                continue;
              };
              // Adding code to not call sc-event7/8 events on page-view, only on s.tl()
              if( isEventPV && (/^event7$/i).test(eventname) ){
                continue;
              };
              if( isEventPV && (/^event8$/i).test(eventname) ){
                continue;
              };
              // Ensure we don't fire 2 Login events
              if( isEventOth && (/^event1$/i).test(eventname) ){
                continue;
              };
              // Ensure we don't fire 2 First Deposit events
              if( isEventOth && (/^event6$/i).test(eventname) ){
                continue;
              };

              // superfluous generic page click event
//            if( (/^none$/i).test(eventname) ){
//              data[ 'cancel-events-all' ] = true;
//              return data;
//            };

              //bet event
              if((/event7/).test(eventname)){
                var betstrs = pageData.products && pageData.products.split(";").pop().split("=");
                if(betstrs && betstrs[0]=="event7"){
                  data['sc-bet-amount'] = (betstrs[1]/100).toFixed(2);
                }
                else{
                 // return data;
                }
              }

              // Ecommerce
              if(eventname.match(/purchase|prodView/)) {
                var prodStr = pageData["products"] || "";
                var prods = prodStr.split(",");
                var items = [];

                // Loop through products
                for (var p = 0; p < prods.length; p++) {
                  items = prods[p].split(";");
                  // Add eCommerce attributes
                  if(items[0]) data['product-category'] = items[0];
                  if(items[1]) data['product-name'] = items[1];
                  if(eventname.match(/purchase/)) {
                    if(items[2]) data['product-quantity'] = items[2];
                    if(items[3]) data['product-total-price'] = items[3];
                    if(pageData['purchaseID']) {data['sc-purchase-id'] = pageData['purchaseID'];}
                  }

                  // Add event
                  data['custom-event'] = "true";
                  if(eventname === "prodView") eventname = "sc-product-view";
                  jsHub.trigger(eventname, data, event.timestamp);

                  // Remove attributes for subsequent events
                  if(p == prods.length - 1) {
                    delete data['custom-event'];
                    if(data['product-category']) delete data['product-category'];
                    if(data['product-name']) delete data['product-name'];
                    if(eventname.match(/purchase/)) {
                      if(data['product-quantity']) delete data['product-quantity'];
                      if(data['product-total-price']) delete data['product-total-price'];
                      //if (data['sc-purchase-id'])
                      //delete data['sc-purchase-id'];
                    }
                  }
                }
              } else {
                data['custom-event'] = "true";
                jsHub.trigger('sc-' + eventname, data, event.timestamp);
                delete data['custom-event'];
              }
            }

          }

   // We've loaded the page. From now on, we will also listen for any events triggered in SC "doPlugins" method
        if (isEventPV) {
            jsHub.bind("sc-event", metadata);
          }
        };

        // Capture Omniture Cookie ID
        var cookie = jsHub.util.readCookie('s_vi');
        if (cookie) {
          var pattern = /\[CS\]v1\|(.+)\[CE\]/;
          if (pattern.test(cookie)) {
            cookie = pattern.exec(cookie)[1];
          }
          data['omniture-cookie-id'] = cookie;
        }

      }
      else {
        data[ 'cancel-events-all' ] = true;
      }
    };
    return data;
  };

  /*
   * Bind the plugin to the Hub to look for data to add to page view events
   */


    jsHub.bind("page-view", metadata);


}());

// Adding CryptoJS library in-line for cookie hashing

/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
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



// DoubleClick Decisioning Integration

(function () {
  var jsHub = window.jsHub;
  jsHub.causata = jsHub.causata || {};

  // The callback function that will be called by the Causata decision
  jsHub.causata.DClickCallback = function (data) {
    if (jsHub.causata.DClickTimeout) {
      window.clearTimeout(jsHub.causata.DClickTimeout);
      jsHub.causata.DClickTimeout = null;
    }

    function extractProperty(properties, key) {
      for (var i = properties.length - 1; i >= 0; i--) {
        if (properties[i].name === key) {
          return properties[i].value;
        }
      }
      return "";
    }

	// qs will be the query string we append onto the end of the DClick request
    var qs = "", i;

    // capture Causata cookie and encrypt to send to DClick
    var aid = jsHub.util.readCookie('aid');
    if (aid && window.CryptoJS) {
      var u12 = CryptoJS.SHA256(aid, { outputLength: 224 }).toString();
      qs += ";u12=" + encodeURIComponent(u12);
    }

    // capture Causata decisions
    if (data && data.decisions) {
      for (i = data.decisions.length - 1; i >= 0; i--) {
        var decision = data.decisions[i];
        // Location is in the format 'acq-u13'. From this we will use
        // 'u13' as the query param for Causata.
        if (decision.option && decision.option.properties) {
          var u = decision.location.substring(4);
          var v = extractProperty(decision.option.properties, "dclick-parameter");
          qs += ";" + encodeURIComponent(u) + "=" + encodeURIComponent(v);
        }
      }
    }

    // The DoubleClick iframes are in an array of strings of html <iframe> elements
    var tags = window.FL_TAGS || [];
    for (i = tags.length - 1; i >= 0; i--) {
      var tag = tags[i].replace("%CausataParams%", qs);
      jQuery('body').append(tag);
    }
    window.FL_TAGS = [];
  };

  // Make the call to the Causata server
  var decisionData = {
    "locations": "acq-u13, acq-u14, acq-u15, acq-u16, acq-u17, acq-u18, acq-u19, acq-u20, acq-u21, acq-u22",
    "callback": "jsHub.causata.DClickCallback"
  };

  jsHub.configure('causata-decision', decisionData);

  // bind to global function for when the doubleclick tags are ready
  jsHub.DClickDecision = function () {
    if (window.FL_TAGS && window.FL_TAGS.length > 0 && ! jsHub.causata.DClickTimeout) {
      jsHub.causata.DClickTimeout = setTimeout(jsHub.causata.DClickCallback, 3000);
      jsHub.trigger("make-decision");
    }
  };

})();

// Carousel Metadata Tracking
(function () {
  var jsHub = window.jsHub;
  jsHub.causata = jsHub.causata || {};

  jsHub.causata.trackCarousel = function (metaDataObj) {

      // SBT_Carousel_2
      var cmsData,
		      cauData = {},
          i, j = 1,
          carouselPrefix = "SBT_Carousel_";


    function getCarouselDataObject( cmsCarousel ){
      var causCarouselData = {},
          k, m, selectionData,
          cmsValue,
          carProperty,
           carouselStringProperties = [
            ['class-id', 'class-id'],
            ['event-category-name', 'category'],
            ['event-type-id', 'type_id'],
            ['event-id', 'ev_id'],
            ['event-name', 'event'],
            ['event-market-name', 'market'],
            ['external-referrer', 'refer_url'],
            ['page-url', 'url'],
            ['openbet-location', 'location'],
            ['region-id', 'region_id'],
            ['news-item-id', 'news_id'],
            ['carousel-small-image', 'small_image'],
            ['carousel-large-image', 'large_image'],
            ['default-content', 'default_content']
          ],
          len = carouselStringProperties.length;

      for( k=0; k < len; k++ ) {
        carProperty = carouselStringProperties[ k ][ 0 ];
        cmsValue = cmsCarousel[ carouselStringProperties[ k ][ 1 ] ];
        causCarouselData[ carProperty ] = (cmsValue !== "") ? cmsValue : "Null";
      }

        // Look through the selections to grab them
       if (typeof cmsCarousel.selections !== "undefined") {
		  for ( m = 0; m < cmsCarousel.selections.length; m++) {
					selectionData = cmsCarousel.selections[m];
					causCarouselData['carousel-selection-name-' + m ] = (selectionData.selection !== "") ? selectionData.selection : "Null";
					causCarouselData['carousel-selection-price-' + m] = (selectionData.price !== "") ? selectionData.price : "Null";
			}
		}

      return causCarouselData;
    }

    while( metaDataObj[ carouselPrefix + j ] ){
      cauData[ carouselPrefix + j ] = getCarouselDataObject( metaDataObj[ carouselPrefix + j ] );
      jsHub.trigger('openbet-impression', cauData[ carouselPrefix + j ]);
      j++;
    }

		return cauData;

  };
  // bind to global function called by Openbet when the CMS tags are ready
		jsHub.CarouselMetadataCall = function ( metaDataObj ) {
			if (typeof metaDataObj !== "undefined" && typeof jsHub !== "undefined") {
        jsHub.trigger("data-capture-start");
        jsHub.causata.trackCarousel(metaDataObj);
        jsHub.trigger("data-capture-complete");
      }
		};

})();
