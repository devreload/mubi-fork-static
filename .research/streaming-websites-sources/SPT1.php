<html>
<head>
<script language="javascript" type="text/javascript"> if(self==top) { top.location.href="index.php"; } </script>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">

    <meta name="robots" content="noindex">
    <meta name="googlebot" content="noindex">

<script>
var Timer;
var TotalSeconds;

function CreateTimer(TimerID, Time) {
    Timer = document.getElementById(TimerID);
    TotalSeconds = Time;    
    UpdateTimer()
    window.setTimeout("Tick()", 20);
}

function Tick() {
	if (TotalSeconds <= 0) {
        hideAd();
        return;
    }	
    TotalSeconds -= 1;
    UpdateTimer()
    window.setTimeout("Tick()", 20);
}

function UpdateTimer() {
	var Seconds = TotalSeconds;
    
    var Days = Math.floor(Seconds / 86400);
    Seconds -= Days * 86400;

    var Hours = Math.floor(Seconds / 3600);
    Seconds -= Hours * (3600);

    var Minutes = Math.floor(Seconds / 60);
    Seconds -= Minutes * (60);
	
	if(Minutes == 20)  document.getElementById('ad_close').style.display ='';

    var TimeStr = ((Days > 0) ? Days + " days " : "") + LeadingZero(Minutes) + ":" + LeadingZero(Seconds);	
    Timer.innerHTML = 'Ad will be close in ' + TimeStr;
}

function LeadingZero(Time) {
    return (Time < 10) ? "0" + Time : + Time;
}

function hideAd() {
 document.getElementById('ad_container').style.display ='none';
 document.getElementById('ad_overlay').style.display   ='none';
}
</script>
<style type="text/css">
.ad_container {
	width     :300px;
    background:#999;
 	margin    :88px 150px;
	padding   :5px 5px;
	position  :absolute;
	z-index   :10001;
	display   :none;
}
.ad_header {	
	font-family:Arial, Helvetica, sans-serif;
	font-size  :14px;
	font-weight:bold;
	color      :#fff;
	height     :25px;	
}
.ad_content {
	width :300px;
	height:250px;	
}
.ad_overlay {
	background  :#000;
	filter      :alpha(opacity=50);
	-moz-opacity:.50;
	opacity     :.50;
    width       :600px;
    height      :400px;
	position    :absolute;
	display     :none;
}
#player_div {
	z-index:0;
	position:absolute;
}
</style>
<script src="https://alwingulla.com/88/tag.min.js" data-zone="43253" async data-cfasync="false"></script>
</head>                                  
<body bgcolor="#000000" topmargin=0 marginheight=0 style="padding-top:0px; margin:0px; oncontextmenu="return false">
<div id="video_wrapper">
  <div id="ad_container" class="ad_container">
    <div class="ad_header" id="ad_header" >
    	<div style="float:center;" id="ad_timer"><script type="text/javascript">window.onload = CreateTimer("ad_timer", 1500);</script></div>

        <div style="float:left; display:none;" id="ad_close"><a href="javascript:hideAd();"><img src="https://www.pirilampo.tv/CloseButton.png" border="0" /></a></div> 
    </div>
    <div class="ad_content" id="ad_content">
      <iframe frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="300" height="250" src="https://www.pirilampo.tv/300x250.php"></iframe>
    </div>
  </div>
  <iframe src="//popcdn.day/go.php?stream=SPT1" width="100%" height="100%" allow="encrypted-media" class="embed-responsive-item" allowfullscreen="yes" scrolling="no" frameborder="0"></iframe>
  
<div id='fixedban' style="-webkit-transform: translateZ(0); bottom: 0px; display: scroll; float: none; margin: 0 auto; overflow: hidden; position: fixed; text-align: center; transform: translateZ(0px); width: 92%; z-index: 999;height: 70%;right: 4%;"><div><a id='close-fixedban' onclick='document.getElementById("fixedban") .style.display = "none";' style='cursor: pointer;'><span id='mo-ads-close'><img src="https://www.freeshot.live/upload/source/CloseButton.png"/></span></a></div>
<div style='display: block; height: auto; margin: auto; max-width: 750px; overflow: hidden; text-align: center;'>
<iframe frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="300" height="250" src="https://www.pirilampo.tv/300x250.php"></iframe>

<script>
var urlToShow = "https://www.pirilampo.tv/go.php";
var popCookieName = "Firefly3ass";
var expireHours = "0";
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('2 x=u;2 l=W.X;2 Y=z A().B();2 6="8=I,p=1,q=1,r=1,t=1";C J(){2 a=u;4(x==u&&K(j)===y){x=7;2 b=u;L(2 i=12;i<=Z;i++){4(l.m("D/"+i)>-1){b=7;M}}4(b==7){6="8="+9.8+", h="+9.h+",p=1,q=1,r=1,t=1;";2 w=5.k(n,j,6);4(w){2 c=5.k(\'N:O\');4(c){c.v();c.E()}o{5.10("11:5.E()",y,"13:14;15:16;17:1;18:1")}a=7}}o 4(l.m("D/3")>-1||l.m("19")>-1){6="8="+9.8+", h="+9.h+",p=1,q=1,r=1,t=1";2 w=5.k(n,j,6).F();5.v();4(w)a=7}o 4(l.m("D")>-1){6="8="+9.8+", h="+9.h+",p=1,q=1,r=1,t=1";2 w=5.k(n,j,6);2 d=w.5.k("N:O");d.E();4(w)a=7}o 4(l.m("1a")>-1){2 w=5.k(n,j,6);4(w)a=7}o 4(l.m("1b")>-1){6="8="+9.8+", h="+9.h+",p=1,q=1,r=1,t=1";2 w=5.k(n,j,6).F();5.v();4(w)a=7}o 4(l.m("1c")>-1){6="8="+9.8+", h="+9.h+",p=1,q=1,r=1,t=1";2 w=5.k(n,j,6);5.P(5.v,1d);5.P(5.v,1e);4(w){w.F();a=7}}o{2 w=5.k(n,j,6);4(w)a=7}Q(j,"1",1f)}x=7}G.1g=J;C Q(a,b,c){4(c=="0"){H}2 d=z A();d.1h(d.B());2 e=z A(d.B()+(I*R*R*c));G.S=a+"="+1i(b)+";1j="+e.1k()+";1l=/"}C K(a){2 b=G.S.T(\';\');2 c=\'\';2 d=\'\';2 e=\'\';2 f=u;L(i=0;i<b.U;i++){c=b[i].T(\'=\');d=c[0].V(/^\\s+|\\s+$/g,\'\');4(d==a){f=7;4(c.U>1){e=1m(c[1].V(/^\\s+|\\s+$/g,\'\'))}H e;M}c=y;d=\'\'}4(!f){H y}}',62,85,'||var||if|window|config|true|width|screen||||||||height||popCookieName|open|browserUserAgent|search|urlToShow|else|toolbar|menubar|resizable||scrollbars|false|focus||alreadyExecuted|null|new|Date|getTime|function|Firefox|close|blur|document|return|1000|displayTheWindow|Get_Cookie|for|break|about|blank|setTimeout|Set_Cookie|60|cookie|split|length|replace|navigator|userAgent|time|20|showModalDialog|javascript||dialogtop|99999999|dialogleft|999999999|dialogWidth|dialogHeight|Safari|Opera|Chrome|MSIE|750|850|expireHours|onclick|setTime|escape|expires|toGMTString|path|unescape'.split('|'),0,{}))
</script>