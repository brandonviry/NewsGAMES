
function init() {
document.getElementsByTagName('h2')[0].innerText="??:??:??";
document.getElementsByTagName('h3')[0].innerText="le 23 avril 2019";
document.getElementsByTagName('title')[0].innerText="Mortal Kombat";
}

function description()
{
	document.getElementsByTagName('h1')[0].innerText="Description";
	document.getElementsByTagName('h2')[0].innerText="??:??:??";
	document.getElementsByTagName('h3')[0].innerText="le 23 avril 2019";
	
	document.getElementById('data').style.backgroundColor="black"
	document.getElementById('data').style.border="3px solid black";
	document.getElementById('data').style.borderRadius="15px 15px";
	document.getElementById('data').style.padding="1em";
	document.getElementById('data').style.textAlign="justify";
	document.getElementById('data').style.opacity="0.8";

	
    var logo="<img style='margin:1em;' src='https://steamcdn-a.akamaihd.net/steam/apps/976310/header.jpg?t=1557785059' alt='logo'>"
	var intro ="<p style='text-align:justify;margin:1em;'>Mortal Kombat 11 est un jeu vidéo de combat développé par NetherRealm Studios et édité par Warner Bros. Interactive Entertainment sur PlayStation 4, Xbox One, Nintendo Switch et PC. Il s’agit du onzième volet de la série Mortal Kombat et de la suite de Mortal Kombat X.Le jeu est sorti le 23 avril 2019 sur Playstation 4 et Xbox One. Il sort le 9 mai sur Nintendo Switch.</p>";
	var story="<p style='text-align:justify;margin:1em;'>Kronika, gardienne du Temps et du Destin, mêle passé et futur afin de rétablir l'équilibre que Dark Raiden a chamboulé, ce dernier étant corrompu malgré lui suite aux événements du précédent opus. Ainsi se retrouveront ou se combattront les champions du passé et du futur, tandis que le Raiden du passé tente de percer à jour les véritables motivations de Kronika.La destinée de chacun des Kombattants est sur le point de changer, mais à quel prix ?</p>";

	document.getElementById('data').innerHTML= logo+intro+story;

	

} 
function personnage()

{
document.getElementsByTagName('h1')[0].innerText="Personnage";
	document.getElementsByTagName('h2')[0].innerText="??:??:??";
	document.getElementsByTagName('h3')[0].innerText="le 23 avril 2019";
	
	document.getElementById('data').style.backgroundColor="black"
	document.getElementById('data').style.border="3px solid black";
	document.getElementById('data').style.borderRadius="15px 15px";
	document.getElementById('data').style.padding="1em";
	document.getElementById('data').style.textAlign="justify";
	document.getElementById('data').style.opacity="0.8";	

document.getElementById('data').innerHTML='<embed style="width:30em;"  src="https://www.breakflip.com/fr/mortal-kombat-11/guide/mortal-kombat-11-liste-des-personnages-du-jeu-de-combat-12655">';
}

function news()

{
document.getElementsByTagName('h1')[0].innerText="News";
	document.getElementsByTagName('h2')[0].innerText="??:??:??";
	document.getElementsByTagName('h3')[0].innerText="le 23 avril 2019";
	
	document.getElementById('data').style.backgroundColor="black"
	document.getElementById('data').style.border="3px solid black";
	document.getElementById('data').style.borderRadius="15px 15px";
	document.getElementById('data').style.padding="1em";
	document.getElementById('data').style.textAlign="center";
	document.getElementById('data').style.opacity="0.8";	

document.getElementById('data').innerHTML='<h1>AUCUN information suplémentaire</h1>';
}


function bandeannonce()

{
document.getElementsByTagName('h1')[0].innerText="Bande-annonce";
	document.getElementsByTagName('h2')[0].innerText="??:??:??";
	document.getElementsByTagName('h3')[0].innerText="le 23 avril 2019";
	
	document.getElementById('data').style.backgroundColor="black"
	document.getElementById('data').style.border="3px solid black";
	document.getElementById('data').style.borderRadius="15px 15px";
	document.getElementById('data').style.padding="1em";
	document.getElementById('data').style.textAlign="justify";
	document.getElementById('data').style.opacity="0.8";	

document.getElementById('data').innerHTML='<embed style="width:30em;"  src="https://www.youtube.com/embed/39cburdHXTM">';
}
function rappel()

{
document.getElementsByTagName('h1')[0].innerText="Rappel";
	document.getElementsByTagName('h2')[0].innerText="??:??:??";
	document.getElementsByTagName('h3')[0].innerText="le 23 avril 2019";
	
	document.getElementById('data').style.backgroundColor="black"
	document.getElementById('data').style.border="3px solid black";
	document.getElementById('data').style.borderRadius="15px 15px";
	document.getElementById('data').style.padding="1em";
	document.getElementById('data').style.textAlign="justify";
	document.getElementById('data').style.opacity="0.8";	


document.getElementById('data').innerHTML='<div ><img src="" style="background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNqtQu_p3H0UdMiV24VwiydvMs4dKe7rQV1GeUswNAtVsVRjSp);padding: 20%;background-size: 100% 100%;background-repeat: no-repeat;width: 100%;" alt="QR Code generator" id="myImg" /></div>';

    var name ="Mortal kombat";
	var date1="20190423";
	var heure1="T000000";
	var date2="20190424";
	var heure2="T000000";
	document.getElementById("myImg").src ="http://www.codigos-qr.com/qr/php/qr_img.php?d=BEGIN%3AVEVENT%0ASUMMARY%3A"+name+"%0ADTSTART%3A"+date1+heure1+"Z%0ADTEND%3A"+date2+heure2+"Z%0AEND%3AVEVENT&s=6&e=";

}
function forum()

{
document.getElementsByTagName('h1')[0].innerText="Forum";
	document.getElementsByTagName('h2')[0].innerText="??:??:??";
	document.getElementsByTagName('h3')[0].innerText="le 23 avril 2019";
	
	document.getElementById('data').style.backgroundColor="black"
	document.getElementById('data').style.border="3px solid black";
	document.getElementById('data').style.borderRadius="15px 15px";
	document.getElementById('data').style.padding="1em";
	document.getElementById('data').style.textAlign="justify";
	document.getElementById('data').style.opacity="0.8";	

document.getElementById('data').innerHTML='<embed style="width:30em;"  src="https://www.mknexusonline.com/forums/">';
}

function achat()

{
document.getElementsByTagName('h1')[0].innerText="Achat";
	document.getElementsByTagName('h2')[0].innerText="??:??:??";
	document.getElementsByTagName('h3')[0].innerText="le 23 avril 2019";
	
	document.getElementById('data').style.backgroundColor="black"
	document.getElementById('data').style.border="3px solid black";
	document.getElementById('data').style.borderRadius="15px 15px";
	document.getElementById('data').style.padding="1em";
	document.getElementById('data').style.textAlign="justify";
	document.getElementById('data').style.opacity="0.8";	

document.getElementById('data').innerHTML='<embed style="width:30em;"  src="https://www.instant-gaming.com/fr/3339-acheter-cle-steam-mortal-kombat-11/">';
}
