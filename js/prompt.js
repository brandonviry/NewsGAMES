


    $("[id='sub1']").click(function(){
	$("[id='prompt']").css("display","none");
	var recherche = $("[name='recherche']").val();
	$("img[title]").hide();
	$("[title*='"+recherche+"']").show();
	


});

$("[id='recherche']").click(function(){
	$("[id='prompt']").css("display","grid");


});

$("[id='reload']").click(function(){
	window.location.reload()


});



