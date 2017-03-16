$(document).ready(init);
var arrays =new Array(9);
var turno='x';
var turnx=0;
var turnO=0;
function init(){
    //*alert('hola');*//
   $('td').click(clickCelda);
    getHistorial();
    
    $('#lista-juegos').on('click', ' button', clickGoComentarios)
}
function onClickBtnItemJuego()
{
	var idGame = $(this).parent().data('idgame');
	console.log(idGame);
	gotoSection('historial-detalle');
	getComentarios(idGame);
	currentGameID = idGame;
	//getSingleGame(idGame);
}

function clickCelda(evt){
    var celda =evt.target;
    var identificador=evt.target.id;
    //alert(identificador);
    var numberId = identificador[1]-1;
    //console.log(numberId);
    if(turno=="o"){
        celda.innerHTML="o";
        arrays[identificador]="o";
        turno="x";
        posibleGanador(turnO);
        console.log("ganador");
    }else{
        celda.innerHTML="x";
        arrays[identificador]="x";
        posibleGanador(turnx);
        turno="o";
        
    }
    
    
}
function posibleGanador(_text){
        if(arrays[0]==_text && arrays[1]==_text && arrays[2] || arrays[3]==_text && arrays[4]==_text && arrays[5] || arrays[6]==_text && arrays[7]==_text && arrays[8] || arrays[0]==_text && arrays[3]==_text && arrays[6] || arrays[1]==_text && arrays[4]==_text && arrays[7] || arrays[2]==_text && arrays[5]==_text && arrays[8] || arrays[0]==_text && arrays[4]==_text && arrays[8] || arrays[2]==_text && arrays[4]==_text && arrays[6]){
            clickCelda(_text);
            console.log(_text);
        }
    }
function getHistorial(){
    $.ajax({
        url:'http://test-ta.herokuapp.com/games'
    }).done(function(_data){
        console.log(_data);
        dibujarHistorial(_data);
    });
}
function getComentarios(_idGame){
    $.ajax({
        url:'http://test-ta.herokuapp.com/games/'+_idGame+'/comments'
    }).done(function(_data){
        alert(_data);
    });
}
function dibujarHistorial(_datos){
    var lista = $('#lista-juegos');
    for(var i in _datos){
        console.log(_datos[i].winner_player);
        var html = '<li>'+_datos[i].winner_player+' gano a '+_datos[i].loser_player+' en '+_datos[i].number_of_turns_to_win+' movimientos '+'<button class="btn"><a href="comentarios.html">ver</a></button>' +'</li>';
        lista.append(html);
    }
}
function clickGoComentarios(){
   // alert('jabhdss');
    
}

function enviarComentario(_idGame, _name, _content)
{
	$.ajax({
		url:'http://test-ta.herokuapp.com/games/:game_id/comments',
		type:'POST',
		data:{comment:{ name:_name, content:_content, game_id:_idGame }}
	}).done(function(_data){
		console.log(_data);
		getComentarios(_idGame);
	});
}
function dibujarComentarios(_datos)
{
	var lista = $('#lista-comentarios');
	lista.empty();
	for(var i in _datos)
	{
		var html = '<li class="list-group-item">'+_datos[i].name+' dice: <p>'+ _datos[i].content +'</p></li>';
		lista.append(html);
	}
}
