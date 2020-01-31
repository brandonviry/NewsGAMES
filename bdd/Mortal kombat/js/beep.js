
function playclip() {
if (navigator.appName == "Microsoft Internet Explorer" && (navigator.appVersion.indexOf("MSIE 7")!=-1) || (navigator.appVersion.indexOf("MSIE 8")!=-1)) {
if (document.all)
 {
  document.all.sound.src = "song effect/zapsplat_multimedia_alert_generic_mallet_wood_007_30075.mp3";
 }
}

else {
{
var audio = document.getElementsByTagName("audio")[0];
audio.play();
audio.volume=0.2;
audio.Stop();
audio.currentTime = 0;
}
}
}
