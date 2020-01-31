/*
Projet:NewsGAME
auteur: Louis-Alexis MALBROUQUI
titre:heurre
*/ 

setInterval(function(){
    document.getElementById('afficherheure').innerHTML = new Date().toLocaleTimeString();
}, 1000);
console.log(event.toLocaleTimeString(""));


