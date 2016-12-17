 const TEMPLATE_PATH = "templates/"
 var indexIsLoad = false;
 var nav_current;

///!\ NE PAS CHANGER DE PLACE LES CONTINENTS EXISTANTS
// 	NE PAS AJOUTER DE NOUVEAU CONTINENT
var continents =[
	"Europe", 	//id 1
	"Asie",		//id 2
	"Oceanie",	//id 3
	"Amérique"	//id 4
];

//ordre important se réferer aux 
//index des pays de l'onglet gauche (id = i+1)
//avec i indice du tableau pays
///!\ NE PAS CHANGER DE PLACE LES PAYS EXISTANT
//AJOUTER LES NOUVEAUX PAYS A LA FIN DU TABLEAU
var pays = [
	"France", 	//id 1
	"Italy",  	//id 2
	"Russie", 	//id 3
	"Australie",//id 4
	"Mexique",	//id 5
	"Afrique du Sud", //id 6
	"Pérou",	//id 7
	"Alaska",	//id 8
	"Japon",	//id 9
	"Inde",		//id 10
	"Portugal",	//id 11
	"Nevada",	// id 12
	"Royaume-Uni", //id 13
	"Californie", //id 14
	"Tunisie",	//id 15
	"Suisse",	//id 16
	"Bolivie"	//id 17
];

 function basic_load(page, _callback){
 	var done = 2;
 	if(!indexIsLoad){
 		done = 3;
		$("nav").load(TEMPLATE_PATH+'nav.html', function()	{	
			$(".burger-menu").on('click', function(e) {
				e.preventDefault();
			  	$(this).toggleClass("burger-menu--opened");
			  	$(this).toggleClass("burger-menu--closed");	
			  	$("#menu").toggleClass("burger");
			});
			$('#menu a').on('click', function(e) {
				e.preventDefault();
				var id = $(this).attr('id');
				var tmp = id.split('_');
				var page =tmp[1];
				$(".se-pre-con").addClass('visible');

				nav_current = "#"+id;
				updateCurrent();

				setTimeout(function(){
					affArticle(page);
				}, 200);
			});

			$('#burger').click(function(e){
				e.preventDefault();
			})

			nav_current = '#nav_index';
			updateCurrent();

			console.log("load nav "+page+" OK");
			--done;
			if(done == 0){
				_callback();
			}
		});
	}
	
 	$("footer").load(TEMPLATE_PATH+'footer.html', function(){
		console.log("load footer "+page+" OK");
		--done;
		if(done == 0){
			_callback();
		}
	});

 	var title = $("header").attr("data-title");
 	if(title != undefined){
		$("header").load(TEMPLATE_PATH+'header.html', function(){
			$(".title_logo").append(title);
			console.log("load header "+page+" OK");
			--done;
			if(done == 0){
				_callback();
			}
		});
	}
	else{
		--done;
		if(done == 0){
			_callback();
		}
	}


		
}

 function load_template_page(page, title, _callback, refresh){
	document.title = title;
	var file = TEMPLATE_PATH+page+'.html';
    $('content').load(file, function(){	    	
		basic_load(page, function(){
		    console.log("bacic load "+page+" OK");
		    window.history.pushState({"page":page, "pageTitle":title},"", "");
	    	loadImgsBackGrounds(page, function(){
		    	_callback();
		    	$(document).scrollTop(0);
		    });	
	    });
	   	if(refresh !== undefined)
	   		return false;
    });
} 


window.onpopstate = function(e){
    if(e.state){
        $('content').load(TEMPLATE_PATH+e.state.page+'.html', function(){
    		affArticle(e.state.page);

    	});
        document.title = e.state.pageTitle;
    }
};

function updateCurrent(){
	if(nav_current != null){
		$('.current').removeClass('current');
		$(nav_current).addClass('current');
		console.log(nav_current + " is current");
	}
}

function affArticle(name){
	switch(name){
		case "index":
			
			load_template_page("index", "The Railway Chronicales", function(){
				setTimeout(function(){
				    $(".se-pre-con").removeClass("visible");
				}, 1000);
				console.log("Index chargé");
				indexIsLoad = true;
				animMouse();
				
			});
			break;

		case "sacha":
			/*nav_current = '#nav_sacha';
			updateCurrent();*/
			load_template_page("sacha", "Le Voyage de Sacha", function(){
				
				replaceSachaDots();
				setTimeout(function(){
				    $(".se-pre-con").removeClass("visible");
				}, 1000);
			});
			break;

		case "experiences":
			/*nav_current = '#nav_experiences';
			updateCurrent();*/
			load_template_page("experiences", "Experiences", function(){
				experienceAnim();
				clickCatExpAnim($("#cat_decouverte a li").first(), false);				
				setTimeout(function(){
				    $(".se-pre-con").removeClass("visible");
				}, 1000);
			});
			break;

		case "destinations":
			/*nav_current = '#nav_destinations';
			updateCurrent();*/
			load_template_page("destinations", "Destinations", function(){
				initMap(function(){
					destinationsLoad(function(){
						setTimeout(function(){
						    $(".se-pre-con").removeClass("visible");
						}, 1000);
					});
				});
				
			});
			break;

		case "about":
		var menuH = $('#menu').height();
			if(nav_current === '#nav_index' || nav_current === '#nav_contact'
					|| nav_current === '#ourteam'){
				$(".se-pre-con").fadeOut(1);
				$('html, body').animate({
					scrollTop: $("#ourteam").offset().top-menuH
				}, 2000, false);
				if($("#menu").hasClass('burger')){
					$(".burger-menu").click();
				}
			}
			else{
				load_template_page("index", "The Railway Chronicales", function(){
					$('html, body').animate({
						scrollTop: $("#ourteam").offset().top-menuH
					}, 2000, false);
					setTimeout(function(){
					    $(".se-pre-con").removeClass("visible");
					}, 1000);
				});
			}
			break;

		case "contact":
			var menuH = $('#menu').height();
			if(nav_current === '#nav_index' || nav_current === '#nav_about'
					|| nav_current === '#nav_contact'){
				$(".se-pre-con").fadeOut(1);
				$('html, body').animate({
					scrollTop: $("#contactus").offset().top - menuH
				}, 2000, false);
				//$(nav_current).removeClass('current');
				if($("#menu").hasClass('burger')){
					$(".burger-menu").click();
				}
			}
			else{
				load_template_page("index", "The Railway Chronicales", function(){
					$('html, body').animate({
						scrollTop: $("#contactus").offset().top - menuH
					}, 1500);
					setTimeout(function(){
					    $(".se-pre-con").removeClass("visible");
					}, 1000);
				}, false);
			}

			break;

		case "article":
			load_template_page("article", "Title", function(){
				loadCaroussel(function(){
					setTimeout(function(){
					    $(".se-pre-con").removeClass("visible");
					}, 1000);	
					nav_current='#nav_article';
				});			
			});
			break;
		case "El_Chepe":
			load_template_page("El_Chepe", "El Chepe - Mexique", function(){
				loadCaroussel(function(){
					setTimeout(function(){
					    $(".se-pre-con").removeClass("visible");
					}, 1000);
					nav_current='#nav_article';
				});
			});
			break;
		case "Blue_Train":
			load_template_page("Blue_Train", "Blue Train - South Africa", function(){
				loadCaroussel(function(){
					setTimeout(function(){
					    $(".se-pre-con").removeClass("visible");
					}, 1000);
					nav_current='#nav_article';
				});
			});
			break;
		case "Hiram_Bingham":
			load_template_page("Hiram_Bingham", "Hiram Bingham - Pérou", function(){
				loadCaroussel(function(){
					setTimeout(function(){
					    $(".se-pre-con").removeClass("visible");
					}, 1000);
					nav_current='#nav_article';		
				});
			});
			break;
		case "Petite_Ceinture":
			load_template_page("Petite_Ceinture", "Petite Ceinture - France", function(){
				loadCaroussel(function(){
					$(".se-pre-con").removeClass("visible");
				});
				nav_current='#nav_article';
			});
			break;
		case "White_Pass":
			load_template_page("White_Pass", "White Pass and Yukon Route - Alaska", function(){
				loadCaroussel(function(){
					setTimeout(function(){
					    $(".se-pre-con").removeClass("visible");
					}, 1000);
					nav_current='#nav_article';
				});
			});
			break;
		default :
			console.log("ERROR, page non reconnue.");
			break;
	}
	
	//alert(nav_current);
}



function loadImgsBackGrounds(page, _callback){
   	switch(page){
		case "article":
			loadBG(_callback);
			break;

		default :
			loadBG(_callback);
			break;
	}
}

function loadBG(_callback){
	var cpt =0, i=0;
	$(".bg").each(function(){
		var src = $(this).data('src');
		$(this).imagesLoaded( {background: true}, function() {
			console.log("img loaded");
			cpt++;
			if(cpt == i){
				console.log("img DONE");
				_callback();
				return;
			}	
		});	
		if (src != undefined){
			if($(this).hasClass('article_header') || $(this).attr('id')=="home"){
				$('#header').css('background-image', 'url('+src+')');
			}
			else
				$(this).css('background-image', 'url('+src+')');
			i++;
		}
	});
	if(i==0)
		_callback();
}

function clickCatExpAnim(current, scroll){
	//maj du current
	$("#cat_decouverte a li.current").removeClass('current');
	current.addClass('current');


	//tri des expériences
	var idExp = current.data('exp');
	$("#article_conteneur a").each(function(){
		/*$(this).css('display', 'none');*/
		$(this).removeClass('visible')
	});	


	$(".exp_"+idExp).each(function(){
		$(this).addClass('visible');
	});

	var srcLogoBlanc = current.find(".middle").children('img').prop('src');
	var srcLogoNoir = String (srcLogoBlanc.split('_')[0]+".png");

	$('#main_logo_cat').attr('src', srcLogoNoir);

	var titreExp = current.find(".middle").children('h2').text();
	$('#top_title').find('p').html(titreExp);

	if(scroll == false)
		return false;
	$('html, body').animate({
        scrollTop: $("#page").offset().top-50
    }, 1000);

	return false;
}

function experienceAnim(){
	$('.article_bloc').addClass('visible');
	$("#cat_decouverte a li").click(function(){
		clickCatExpAnim($(this), true);
		return false;
	});
}

function scrollToPage(){
	$('html,body').stop(true, false).animate({
        scrollTop: $("#page").offset().top-50
    }, 1000);
}

function scrollToDestTitle(){
	if($(window).width()<850){
		$('html,body').stop(true, false).animate({
	        scrollTop: $("#region_title").offset().top-50
	    }, 1000);
	}
	else{
		scrollToPage();
	}
}

function destinationsLoad(_callback){
	$('.article_bloc').addClass('visible');
	//initialisation des indicateurs de nombre 
	//le nb d'exp par région
	var nbExp = $('.article_bloc').size();
	$('.inject h2 a span').text(nbExp);
	$('#continent_0 span').text(nbExp);

	var exp = " Expérience"
	if(parseInt(nbExp)>1)
		exp +="s";

	$('#region_title').html("Tout "+"<span class='count'>"+ nbExp + exp +"</span>");
	$('.inject h2 a').html("Tout " + "<span class='count'>"+nbExp +"</span>");	

	var nbExpByContinents = [];
	for(var i=0; i < continents.length; i++){
		var nb = $(".continent_"+String(i+1)).size()
		nbExpByContinents[i] = nb;
		$('#continent_'+String(i+1)+' span').text(nb);
	}

	//le nb d'exp par pays
	var nbExpByPays = [];
	for(var i=0; i < pays.length; i++){
		var nb = $(".country_"+String(i+1)).size();
		nbExpByPays[i] = nb;
		$('#pays_'+String(i+1)+' a span').text(nb);
	}
	//on charge les pays correspondant au click sur un continent
	$('.id_continent').click(function(){
		//changement du curseur de selection
		$(".id_continent.selected").removeClass('selected');
		$(this).addClass('selected');
		resetSelectedCountry();

		var idContinent = $(this).data('id');

		//On copie les infos données par l'onglet continent
		var text = 	$(this).text();
		text = text.split(" ");
		var nom = text[0];
		var nb = text[1];

		var exp = " Expérience"
		if(parseInt(nb)>1)
			exp +="s";

		$('#region_title').html(nom + " <span class='count'>"+ nb + exp +"</span>");
		$('.inject h2 a').html(nom + " <span class='count'>"+nb+"</span>");
		$('.inject h2 a').data('cont', idContinent);

		if(idContinent == 0){
			$(".article_bloc").addClass('visible')
			$('.inject ul li').addClass('visible');
		}
		else{
			//on efface tous les blocs articles
			$(".article_bloc").removeClass('visible')
			/*$(".article_bloc").css("display", "none");*/
			
			//on efface tous les pays dans la fenetre de gauche
			$('.inject ul li').removeClass('visible');
			

			$(".continent_"+idContinent).each(function(){
				var idPays = $(this).data('pays');
				$('#pays_'+idPays).addClass('visible');
				//console.log($(' li').find("data-id='"+idPays+"'"));
				$(this).addClass('visible');
				/*$(this).css('display', 'inline-block');*/
			});

		}
		scrollToDestTitle();
		return false;
	});

	//clique sur pays dans l'onglet gauche
	$('.inject a').click(function(){
		var idPays = $(this).data('id');


		//on changer le current curseur
		resetSelectedCountry(this);

		//on change le titre et le nbExp
		var text = 	$(this).text();
		text = text.split(" ");
		var nom = text[0];
		var nb = text[1];

		var exp = " Expérience"
		if(parseInt(nb)>1)
			exp +="s";

		$('#region_title').html(nom + "<span class='count'>"+nb+exp+"</span>");

		/*$(".article_bloc").css("display", "none");*/
		$(".article_bloc").removeClass('visible');
		if(idPays == 0){
			var idCont = $(this).data('cont');
			if(idCont == 0)
				$(".article_bloc").addClass('visible');
				/*$(.article_bloc).css('display', 'inline-block');*/
			else
				$(".continent_"+idCont).each(function(){
				$(this).addClass('visible');
				/*$(this).css('display', 'inline-block');*/				});
		}
		else{
			//on efface tous les blocs articles
			$(".country_"+idPays).each(function(){
				$(this).addClass('visible');
				/*$(this).css('display', 'inline-block');*/			});
		}	
		scrollToDestTitle();
		return false;
	});
	_callback();
}

function resetSelectedCountry(selector){
	$('.inject a.selected').removeClass('selected');
	if(selector != undefined);
		$(selector).addClass('selected');	
	$('.inject .items').first().addClass('selected');
}

function markerClickEvent(id){
	if(id == undefined)
		return false;
	$("#pays_"+id + " a").click();
}

function loadCaroussel(_callback){
	var owl = $('#carousel');
/*	if(!$('#carousel').lenght){
		console.log('out');
		return;
		}*/
	owl.owlCarousel({
		items: 1,
		autoPlay: true,
		slideSpeed : 5000,
		singleItem: true,
		loop:true,
		lazyLoad : true,
		autoPlaySpeed: 5000,
    	autoPlayTimeout: 5000
	});
	owl.on('click', function (e) {
        owl.trigger('next.owl');
	    e.preventDefault();
	});
	$('.nextArrow').on('click', function (e) {
        owl.trigger('next.owl');
	    e.preventDefault();
	});
	$('.prevArrow').on('click', function (e) {
        owl.trigger('prev.owl');
	    e.preventDefault();
	});
	var cpt =0, i=0;
	$("#carousel .item").each(function(){
		$(this).imagesLoaded( function() {
			cpt++;
			if(cpt == i){
				makeResponsiveCarousel();
				_callback();
			}
		});
		i++;
	});
	if(i == 0){
		makeResponsiveCarousel();
		_callback();
	}
	owl.trigger('owl.play',6000);
}

function makeResponsiveCarousel(){
  var imgH = $(".owl-stage-outer").height();
  if(imgH == undefined)
    return ;
  /*var delta = imgH - $("#carousel").height();
  if(delta>0){
  	$("#articletitle").css("top", '37.5%');
  	return;
  }*/
  $("#articletitle").css("top", imgH/2);
}

function replaceSachaDots(){
	$(".chapter").each(function(){
		var id = $(this).data('id');
		var top = $(this).offset().top - $("#page").offset().top;
		$("#dot"+id).css('top', top);
	});
}

function animMouse(){
	$('.mouse').on('click', function(e){
		e.preventDefault();
		scrollToPage();
	});
}