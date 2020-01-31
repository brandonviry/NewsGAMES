$("[href='#annee']").click(function(){
$("img[title]").hide();
var a =(date.substring(date.length-4));
console.log(a);
$("[alt$='"+a+"']").show();
});

$("[href='#mois']").click(function(){
$("img[title]").hide();
var a =(date.substring(date.length-7,date.length-4));
console.log(a);
$("[alt*='"+a+"']").show(); 
  
});

$("[href='#jour']").click(function(){
$("img[title]").hide();
var a =(date.substring(0,2));
console.log(a);
$("[alt^='"+a+"']").show(); 
  
});

$("[href='#demain']").click(function(){
$("img[title]").hide();
var a =(ladate.getDate()+1);
console.log(a);
$("[alt^='"+a+"']").show(); 
  
});


$("[id='img']").click(function()
{
window.location.href='bdd/'+$(this).attr("title")+'/index.html'

});



   