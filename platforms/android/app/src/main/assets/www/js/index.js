$('ons-navigator#appNavigator').hide();
//INICIALIZO VARIAVEIS
var timeout = 5000;
var num_perg = 0;
var acertos = 0;
var erros = 0;
var pulos = 3;
var eliminar = 1;
var versiculos_do_dia = [
  'Mt||11.28',
  'Jo||15.7',
  'at||1.8',
  'Fp||1.6',
  '2Sm||22.31',
  'Mt||11.28',
  'Hb||10.23',
  'Fp||1.6',
  '2Pe||1.4',
  'Mt||5.8',
  'Rm||1.6',
  'Mt||10.32',
  'Is||44.3',
  'Jr||29.11',
  'Fp||4.19',
  'Ap||3.20',
  'Ef||1.4',
  'Ef||1.13',
  'Mt||28.19',
  'Jo||14.18',
  'Jo||8.32',
  'Mt||24.35',
  'Sl||126.5',
  'Jo||8.12',
  'Jo||15.16',
  'Hb||13.5',
  'Tg||4.7',
  'Mt||6.33',
  'Jo||10.10',
  'Jr||33.3',
  'at||1.8',
  '1Jo||5.4',
  'Js||1.9',
  'Js||1.9',
  'Rm||8.1',
  'Sl||31.24',
  'Sl||91.1',
  'Hb||12.1',
  '2Tm||4.7',
  'Rm||12.21',
  '1Ts||5.17',
  'Jo||14.18',
  '1Co||15.55',
  'Sl||41.1',
  'Rm||8.31',
  'Fp||4.6',
  'Fp||4.13',
  'Nm||23.19',
  'Js||21.45',
  'Js||23.14',
  '1Jo||2.25',
  'Ez||36.26',
  '1Jo||1.9',
  '1Rs||8.56',
  'Dt||28.9',
  'Jl||2.32',
  'Sl||145.13',
  '2||Pe||1.4',
  'Tg||1.12',
  'Sl||138.4',
  '2Co||7.1',
  'Sl||119.50',
  '2Pe||3.9',
  'Gl||3.16',
  'Jo||16.33',
  'Mt||6.26',
  'Sl||34.10',
  'Mt||6.11',
  'Sl||23.1',
  'Sl||4.8',
  'Is||40.31',
  'Jo||14.27',
  'Lc||12.15',
  'Dt||31.6',
  'Hb||13.6',
  'Rm||8.28',
  'Tg||1.5',
  'Sl||37.4',
  'Mt||17.20',
  'Is||41.10'
];
var id = '';
var usar_cores = 0;
var inicioLeitura = 0;
var velocidade = 0;
var tamanho = 826;
var pausar = 0;
var rolagem = 0;
var ultimo_livro_lido = localStorage.getItem('ultimo_livro_lido');
var ultimo_livro_lido_abr = localStorage.getItem('ultimo_livro_lido_abr');
var ultimo_capitulo_lido = localStorage.getItem('ultimo_capitulo_lido');
var fonte_versiculo = JSON.parse(localStorage.getItem('fonte-versiculo') || '20');
localStorage.setItem("fonte-versiculo", fonte_versiculo);
var modo_noturno = JSON.parse(localStorage.getItem('modo-noturno') || false);
var planos_marcados = JSON.parse(localStorage.getItem('planos-marcados') || '[]');
var lista_score = JSON.parse(localStorage.getItem('lista-score') || '[]');

if (localStorage.getItem('data_livro_dia')){
  var dataAtual = new Date(date());
  var dataVersiculoDia = new Date(localStorage.getItem('data_livro_dia'));
  if (dataAtual > dataVersiculoDia) {
      localStorage.removeItem("data_livro_dia");
  } 
}

function maxArray(array) {
    return Math.max.apply(Math, array);
};

window.fn = {};

$("#existeProximoCapitulo").val(0);

localStorage.setItem("modo-noturno", modo_noturno);
if (modo_noturno) {
    $('head').append('<link rel="stylesheet" type="text/css" href="css/onsenui/dark-onsen-css-components.min.css">');
    $('head').append('<link rel="stylesheet" type="text/css" href="css/index_dark.css">');
}
else {
    $('head').append('<link rel="stylesheet" type="text/css" href="css/onsenui/onsen-css-components.min.css">');
    $('head').append('<link rel="stylesheet" type="text/css" href="css/index_.css">');
}

if (!window.localStorage.getItem('lista-versiculos')) {
  localStorage.setItem("lista-versiculos", '[]'); 
}

if (!window.localStorage.getItem('versao-biblia')) {
  localStorage.setItem("versao-biblia", config.versao_biblia); 
}

var versaoId = window.localStorage.getItem('versao-biblia');

var lista_notificacao = JSON.parse(localStorage.getItem('lista-notificacoes') || '[]');
if (window.localStorage.getItem('userId')) {
  localStorage.removeItem('userId');
}

if (!window.localStorage.getItem('versao_pro')) {
  window.localStorage.setItem("versao_pro", 'NAO');
}

if (!window.localStorage.getItem('lista-favorito-hinario')) {
  localStorage.setItem("lista-favorito-hinario", '[]'); 
}

if (!window.localStorage.getItem('lista-orientacao-consolo')) {
  localStorage.setItem("lista-orientacao-consolo", '[]'); 
}

if (!window.localStorage.getItem('recompensa')) {
  localStorage.setItem("recompensa", 0); 
}
else {
  buscaPontos();
}

window.fn.toggleMenu = function () {
  document.getElementById('appSplitter').left.toggle();
};

window.fn.loadView = function (index) {
  document.getElementById('appTabbar').setActiveTab(index);
  document.getElementById('sidemenu').close();
};

window.fn.loadLink = function (url) {
  window.open(url, '_blank');
};

window.fn.pushPage = function (page, anim) {
  if (anim) {
    document.getElementById('appNavigator').pushPage(page.id, { data: { title: page.title }, animation: anim });
  } else {
    document.getElementById('appNavigator').pushPage(page.id, { data: { title: page.title } });
  }
};

// SCRIPT PARA CRIAR O MODAL DE AGUARDE
window.fn.showDialog = function (id) {
  var elem = document.getElementById(id);      
  elem.show();            
};

var showTemplateDialog = function() {
    var dialog = document.getElementById('my-dialog');
  if (dialog) {
    dialog.show();
  } else {
    ons.createElement('dialog.html', { append: true })
      .then(function(dialog) {
        dialog.show();
      });
  }
};

//SCRIPT PARA ESCONDER O MODAL DE AGUARDE
window.fn.hideDialog = function (id) {
  document.getElementById(id).hide();
};

async function admobConfig() {
  admob.start();
}

let banner;
async function anuncioAdmobBanner() {
  banner = new admob.BannerAd({
    adUnitId: config.banner,
    position: 'bottom',
  });
  banner.on('impression', async (evt) => {
    // await banner.hide()
  });
}

let interstitial;
async function anuncioAdmobInterstitial() {
  interstitial = new admob.InterstitialAd({
    adUnitId: config.interstitial,
  })
  interstitial.on('load', (evt) => {
  })
  await interstitial.load()
  await interstitial.show()
}

let rewarded

async function anuncioAdmobRewardedInterstitial() {
  rewarded = new admob.RewardedInterstitialAd({
    adUnitId: config.rewardedInterstitial,
    serverSideVerification: {
      customData: "recompensa",
      userId: window.localStorage.getItem('playerID'),
    }
  })
  rewarded.on('load', (evt) => {
  });
  await rewarded.load();
  await rewarded.show();

  rewarded.on('reward', (evt) => {
    var recompensa = parseInt(window.localStorage.getItem('recompensa'))+1;
    localStorage.setItem("recompensa", recompensa);
    if (parseInt(recompensa) < 100 ) {
      ons.notification.alert(
        'Voc?? possui '+recompensa+' ponto(s), acumule 100 pontos e ganhe 7 dias de vers??o PRO.',
        {title: 'Voc?? ganhou +1 ponto'}
      );
    }
    registraPontos();
  })
}

let rewardedad
async function anuncioAdmobRewarded() {
  rewardedad = new admob.RewardedAd({
    adUnitId: config.rewarded,
    serverSideVerification: {
      customData: "recompensa",
      userId: window.localStorage.getItem('playerID'),
    }
  })
  rewardedad.on('load', (evt) => {
  });
  await rewardedad.load();
  await rewardedad.show();

  rewardedad.on('reward', (evt) => {
    var recompensa = parseInt(window.localStorage.getItem('recompensa'))+1;
    localStorage.setItem("recompensa", recompensa);
    if (parseInt(recompensa) < 100 ) {
      ons.notification.alert(
        'Voc?? possui '+recompensa+' ponto(s), acumule 100 pontos e ganhe 7 dias de vers??o PRO.',
        {title: 'Voc?? ganhou +1 ponto'}
      );
    }
    registraPontos();
  })
}


function dateTime() {
  let now = new Date;
  let ano = now.getFullYear();
  let mes = now.getMonth() + 1;
  let dia = now.getDate();

  let hora = now.getHours();
  let min = now.getMinutes();
  let seg = now.getSeconds();

  if (parseInt(mes) < 10) {
    mes = '0'+mes;
  }
  if (parseInt(dia) < 10) {
    dia = '0'+dia;
  }
  if (parseInt(hora) < 10) {
    hora = '0'+hora;
  }
  if (parseInt(min) < 10) {
    min = '0'+min;
  }
  if (parseInt(seg) < 10) {
    seg = '0'+seg;
  }
  return ano+'-'+mes+'-'+dia+' '+hora+':'+min+':'+seg;
}

function date() {
  let now = new Date;
  let ano = now.getFullYear();
  let mes = now.getMonth() + 1;
  let dia = now.getDate();

  if (parseInt(mes) < 10) {
    mes = '0'+mes;
  }
  if (parseInt(dia) < 10) {
    dia = '0'+dia;
  }
  return ano+'-'+mes+'-'+dia;
}

function  registraPontos() {
  $.ajax({
    type : "GET",
    url : "https://innovatesoft.com.br/webservice/app/registraPontos.php",
    data: {
      'id_user': window.localStorage.getItem('id_user'),
      'userId': window.localStorage.getItem('playerID'),
      'pontos': parseInt(window.localStorage.getItem('recompensa')),
    },
    dataType : "json",
    async: true,
    error: function(e) {
      // console.log(JSON. stringify(e))        
    },
    success : function(data){
      if (data['status'] == 1) {
        if (parseInt(window.localStorage.getItem('recompensa')) >= 100 ) {
          localStorage.setItem("recompensa", 0);
          ons.notification.alert(
            'Voc?? atingiu 100 pontos, vamos remover os an??ncios por 7 dias, feche e abra o aplicativo novamente.',
            {title: 'Parab??ns'}
          );
        }
      }
    }
  });
}

function  buscaPontos() {
  $.ajax({
    type : "GET",
    url : "https://innovatesoft.com.br/webservice/app/buscaPontosUser.php",
    data: {
      'userId': window.localStorage.getItem('playerID')
    },
    dataType : "json",
    async: true,
    error: function(e) {
      // console.log(JSON. stringify(e))        
    },
    success : function(data){
      if (data['status'] == 1) {
        localStorage.setItem("recompensa", data['pontos']);
      }
    }
  });
}

var app = {
    // Application Constructor
    initialize: function() {
        // fn.showDialog('modal-aguarde');
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
    admobConfig();
    anuncioAdmobBanner();
    this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {  
    window.plugins.insomnia.keepAwake();  
    if (window.localStorage.getItem('playerID') && window.localStorage.getItem('uid')) {
      this.cadastraUser();
    }
    this.init();
    this.firebase();
    this.oneSignal();
    this.getIds();
    this.carregaPalavraDia();
    this.carregaQuiz();
    },

    init: function() {
    var timeoutID = 0;
    clearTimeout(timeoutID);
    timeoutID = setTimeout(function() { fn.hideDialog('modal-aguarde') }, 100);   
    if (JSON.parse(ultimo_capitulo_lido)) {
      fn.pushPage({'id': 'textoLivro.html', 'title': ultimo_livro_lido_abr+'||'+ultimo_livro_lido+'||200||'+ultimo_capitulo_lido});
    }
    else{
      fn.pushPage({'id': 'textoLivro.html', 'title': 'Gn||G??nesis||50||1'});
    }
    },

    oneSignal: function() {
        window.plugins.OneSignal
        .startInit(config.idonesignal)   
        .handleNotificationOpened(function(jsonData) {
          /*var mensagem = JSON.parse(JSON.stringify(jsonData['notification']['payload']['additionalData']['mensagem']));
          var titulo = JSON.parse(JSON.stringify(jsonData['notification']['payload']['additionalData']['titulo']));
          ons.notification.alert(
            mensagem,
            {title: titulo}
          );*/
        })
        .inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.Notification)
        .endInit();
    },

    //FUN????O DE BUSCA
    onSearchKeyDown: function(id) {
        if (id === '') {
          return false;
        }
    },

    retirarMarcadorVersiculo: function(livro, num_capitulo, num_versiculo, array) {
        for(var i=0; i<array.length; i++) {
      if (array[i]['livro']) {
        if((array[i]['livro'].toLowerCase() === livro.toLowerCase()) && (array[i]['num_capitulo'] === num_capitulo) && (array[i]['num_versiculo'] === num_versiculo)) {
          array.splice(i, 1);
        }
      }
        }
        var lista_versiculos = JSON.parse(localStorage.getItem('lista-versiculos') || '[]');
        localStorage.removeItem(lista_versiculos);
        localStorage.setItem("lista-versiculos", JSON.stringify(array));
    },

    incluirMarcadorVersiculo: function(livro, num_capitulo, num_versiculo) {
        array = JSON.parse(localStorage.getItem('lista-versiculos'));
        if (array) {
      for(var k=0; k < array.length; k++) {
        if (array[k]['livro']) {
          if((array[k]['livro'].toLowerCase() == livro.toLowerCase()) && (array[k]['num_capitulo'] == num_capitulo) && (array[k]['num_versiculo'] == num_versiculo)) {
            return array[k]['cor'];
          }
        }
      }   
        }
        return false;
    },

    retirarCapitulo: function(search_array, array) {
        for(var i=0; i<array.length; i++) {
            if(array[i] === search_array) {
        var indice = array.indexOf(search_array);
        array.splice(indice, 1);
            }
        }
        var lista_capitulos = JSON.parse(localStorage.getItem('lista-capitulos') || '[]');
        localStorage.removeItem(lista_capitulos);
        localStorage.setItem("lista-capitulos", JSON.stringify(array));
    },

    incluirCapitulo: function(search_array) {
        array = JSON.parse(localStorage.getItem('lista-capitulos'));
        if (array) {
      for(var i=0; i<array.length; i++) {
        if(array[i] === search_array) {
          return true;
        }
        return false;
      }   
      return false;   
        }
        return false;
    },

    buscaFavoritoHinario: function(hinario, id_hinario) {
        var array = JSON.parse(localStorage.getItem('lista-favorito-hinario'));
        if (array) {
      for(var k=0; k < array.length; k++) {
        if (array[k]['hinario']) {
          if((array[k]['hinario'].toLowerCase() == hinario.toLowerCase()) && (array[k]['id_hinario'] == id_hinario)) {
            return 'yellow';
          }
        }
      }   
        }
        return '#f5f5f5'
    },

    incluirFavoritoHinario: function(hinario, id_hinario, titulo) {
        var favorito_hinario = JSON.parse(localStorage.getItem('lista-favorito-hinario') || '[]');
        favorito_hinario.push({hinario: hinario, id_hinario: id_hinario, titulo: titulo});
        localStorage.setItem("lista-favorito-hinario", JSON.stringify(favorito_hinario));
        ons.notification.toast('Adicionado aos favoritos.', { buttonLabel: 'Ok', timeout: 1500 });
        return 'yellow';
    },

    retirarFavoritoHinario: function(hinario, id_hinario) {
        var array = JSON.parse(localStorage.getItem('lista-favorito-hinario') || '[]');
        for(var i=0; i<array.length; i++) {
      if (array[i]['hinario']) {
        if((array[i]['hinario'].toLowerCase() === hinario.toLowerCase()) && (array[i]['id_hinario'] === id_hinario)) {
          array.splice(i, 1);
        }
      }
        }
        var favorito_hinario = JSON.parse(localStorage.getItem('lista-favorito-hinario') || '[]');
        localStorage.removeItem(favorito_hinario);
        localStorage.setItem("lista-favorito-hinario", JSON.stringify(array));
        this.listaFavoritoHinario();
        ons.notification.toast('Removido dos favoritos.', { buttonLabel: 'Ok', timeout: 1500 });
    },

    listaFavoritoHinario: function() {
        var link = '';
        var descricao = '';
        var html_favoritos = '<p style="text-align: center">Nenhum favorito encontrado...</p>'
        var array = JSON.parse(localStorage.getItem('lista-favorito-hinario'));
        if (array) {
      html_favoritos = "";
      for(var k=0; k < array.length; k++) {
        if (array[k]['hinario']) {
          if (array[k]['hinario'] === 'harpa') {
            link = 'conteudoHarpa.html';
          }
          else{
            link = 'conteudoCantor.html';
          }
          descricao = array[k]['id_hinario']+'||'+array[k]['titulo'];

          html_favoritos += '<ons-list-item class="showAd list-item list-item--material" onclick="fn.pushPage({\'id\': \''+link+'\', \'title\': \''+descricao+'\'})" modifier="material">'+
          '<div class="center list-item__center list-item--material__center" style="font-size: 15px;">'+array[k]['id_hinario']+' - '+array[k]['titulo']+'</div>'+
          '<div class="left list-item__left list-item--material__left"></div>'+
          '<div class="right list-item__right list-item--material__right">'+
          '<ons-icon icon="fa-angle-right" class="ons-icon fa-angle-right fa" modifier="material"></ons-icon>'+
          '</div>'+
          '</ons-list-item>';
        }
      }   
        }
        $("#listaFavoritos").html(html_favoritos);
    },

    buscaTexto: function(versaoId,livro,capitulo, nome) {
        $('ons-navigator#appNavigator').show();
        inicioLeitura = 0;
        localStorage.setItem("ultimo_livro_lido", nome);
        localStorage.setItem("ultimo_livro_lido_abr", livro);
        localStorage.setItem("ultimo_capitulo_lido", capitulo);
        fonte_versiculo = JSON.parse(localStorage.getItem('fonte-versiculo'));
        $("#textoLivro").html('');
        var versaoId = versaoId || 'nvi';
        var selector = this;
        var texts = '';
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var data = JSON.parse(this.responseText);
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        if ( (data[i]['abbrev']).toLowerCase() === livro.toLowerCase()){ 
                            if ((parseInt(data[i]['chapter']) === parseInt(capitulo))) {
                                $("#existeProximoCapitulo").val(1);
                                var marcado = 0;
                                var txt_marcado = 0;
                                var capitulo_marcado = 0;
                                var existe_marcado = '';
                                var color = '';
                                var existe_marcado = app.incluirMarcadorVersiculo(livro, capitulo, (parseInt(data[i]['verse'])));
                                var existe_capitulo = app.incluirCapitulo(livro+' '+capitulo);

                                if (existe_capitulo) {
                                    capitulo_marcado = 1;
                                }

                                var texto = data[i]['text'];
                                texts += '<ons-list-item class="'+existe_marcado+'" id="txt_versiculo'+livro+'_'+capitulo+'_'+(parseInt(data[i]['verse']))+'_">'+
                                '<p style="font-size: '+fonte_versiculo+'px;text-align:justify;line-height: 35px;"  id="txt_versiculo'+livro+'_'+capitulo+'_'+(parseInt(data[i]['verse']))+'" class="txt_versiculo" livro="'+livro+'" num_capitulo="'+capitulo+'" num_versiculo="'+(parseInt(data[i]['verse']))+'" marcado="'+marcado+'" txt_marcado="'+txt_marcado+'" txt_versiculo="'+texto+'">'+
                                '<span style="font-weight:bold;">'+(parseInt(data[i]['verse']))+'</span>'+
                                '&nbsp;&nbsp;'+texto+ 
                                '</p>'+
                                '</ons-list-item>';
                            }
                        }
                    }
                    if (parseInt($("#existeProximoCapitulo").val()) == 1) {
                        texts += '<br><br><section style="margin: 16px"><ons-button capitulo_marcado="'+capitulo_marcado+'" modifier="large" class="button-margin marcar_capitulo" livro_marcar="'+livro+'" num_capitulo_marcar="'+capitulo+'">MARCAR CAP??TULO COMO LIDO</ons-button></section>'
                        $("#textoLivro").html(texts);
                    }
                    else{
                        $("#atual").val(parseInt($("#atual").val())-1);
                        localStorage.setItem("ultimo_capitulo_lido", parseInt($("#atual").val()));
                        $('#textoLivro_ div.center').html(ultimo_livro_lido+' '+parseInt($("#atual").val()));
                        app.buscaTexto(versaoId,ultimo_livro_lido_abr,parseInt($("#atual").val()), ultimo_livro_lido);
                    }
                    $("#existeProximoCapitulo").val(0);
                    $( ".marcar_capitulo" ).click(function() {
                        var capitulo_marcar = $(this).attr('livro_marcar')+" "+$(this).attr('num_capitulo_marcar');
                        capitulo = $(this).attr('capitulo_marcado');
                        if (capitulo == 0) {
                            $(this).attr('capitulo_marcado',1);
                            var lista_capitulos = JSON.parse(localStorage.getItem('lista-capitulos') || '[]');
                            lista_capitulos.push(capitulo_marcar);
                            localStorage.setItem("lista-capitulos", JSON.stringify(lista_capitulos));
                            ons.notification.toast('Cap??tulo marcado como lido.', { buttonLabel: 'Ok', timeout: 1500 });
                        }
                        else{
                            $(this).attr('capitulo_marcado',0);
                            lista_capitulos = JSON.parse(localStorage.getItem('lista-capitulos'));
                            app.retirarCapitulo(capitulo_marcar, lista_capitulos);
                            ons.notification.toast('Cap??tulo desmarcado como lido.', { buttonLabel: 'Ok', timeout: 1500 });
                        }
                    });
                    $( ".txt_versiculo" ).click(function() {
                        if (parseInt(rolagem) == 0) {
                            marcado = $(this).attr('marcado');
                            id = $(this).attr('id');          
                            var livro = $('#'+id).attr('livro');
                            var num_capitulo = $('#'+id).attr('num_capitulo');
                            var num_versiculo = $('#'+id).attr('num_versiculo');
                            if (marcado==0) {
                                usar_cores++;
                                if(parseInt(usar_cores) === 1){
                                    $(".cores").css("display","");
                                    $(".copiar").css("display","");
                                    $(".compartilha").css("display","");
                                }
                                else{
                                    $(".cores").css("display","none");
                                }
                                $('#'+id).attr('marcado',1);
                                $('#'+id).attr('txt_marcado',0);
                                $(".botao_controle").css("display","none");
                                $('#'+id).addClass( "grey" );
                                $('#'+id).removeClass( "green" );
                                $('#'+id).removeClass( "yellow" );
                                $('#'+id).removeClass( "orange" );
                                lista_versiculos = JSON.parse(localStorage.getItem('lista-versiculos'));
                                app.retirarMarcadorVersiculo(livro, num_capitulo, num_versiculo, lista_versiculos);
                            }
                            else{
                                usar_cores--;
                                $(this).attr('marcado',0);
                                $(this).attr('txt_marcado',0);
                                if(parseInt(usar_cores) === 1){
                                    $(".cores").css("display","");
                                    $(".botao_controle").css("display","none");
                                }
                                else{
                                    $(".cores").css("display","none");
                                    if(parseInt(usar_cores) > 1){
                                        $(".botao_controle").css("display","none");
                                    }
                                    else{
                                        $(".botao_controle").css("display","");
                                        $(".copiar").css("display","none");
                                        $(".compartilha").css("display","none");
                                    }
                                }
                                $('#'+id).removeClass( "grey" );
                                $('#'+id+'_').removeClass( "green" );
                                $('#'+id+'_').removeClass( "yellow" );
                                $('#'+id+'_').removeClass( "orange" );
                                lista_versiculos = JSON.parse(localStorage.getItem('lista-versiculos'));
                                app.retirarMarcadorVersiculo(livro, num_capitulo, num_versiculo, lista_versiculos);
                            }      
                        }      
                    });
                }
            }
        };
        xmlhttp.open("GET", "js/"+versaoId+"_.json", true);
        xmlhttp.send();
    },

    rolar: function() {
        tamanho = $("#textoLivro").height();
        document.getElementById('onsPageTextoLivro').scrollTop = inicioLeitura;
        inicioLeitura++;
        if (inicioLeitura != tamanho && velocidade != 0) {
            t = setTimeout(function() { app.rolar() }, velocidade);
        }
    },

    parar: function() {
    clearTimeout(t);
    },

    buscaVersiculo: function(versaoId,livro, capitulo, versiculo, id) {
        var versaoId = versaoId || 'nvi';
        versiculo = versiculo == 0 ? 1 : versiculo;
        var text = '';
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            if (data) {
              for (var i = 0; i < data.length; i++) {
                if ( (data[i]['abbrev']).toLowerCase() === livro.toLowerCase()){ 
                  if ((parseInt(data[i]['chapter']) == parseInt(capitulo)) && (parseInt(data[i]['verse']) == parseInt(versiculo)) ) {
                    text += '<ons-list-item onclick="fn.pushPage({\'id\': \'textoLivro.html\', \'title\': \''+data[i]['abbrev']+'||'+data[i]['name']+'||'+data[i]['caps']+'||'+(parseInt(capitulo))+'\'});">'+
                    '<p style="font-size: 20px;line-height:30px;text-align:justify">'+
                    data[i]['text'] +
                    '</p>'+
                    '<p style="font-size: 15px;">'+data[i]['abbrev'].toUpperCase()+' '+capitulo+':'+(parseInt(data[i]['verse']))+'</p>'+
                    '</ons-list-item>';

                  }
                }
              }
              $("#"+id).append(text);
            }
          }
        };
        xmlhttp.open("GET", "js/"+versaoId+"_.json", true);
        xmlhttp.send();
    },

    buscaVersiculoDia: function(livro_capitulo_versiculo, id) {
        var selector = this;
        var texts = [];
        var dados0 = livro_capitulo_versiculo.split('||');
        var livro = dados0[0];
        var dados1 = dados0[1].split('.');
        var capitulo = parseInt(dados1[0]);
        var versiculo = parseInt(dados1[1]);
        var text = "";
        var texto = "";
        var abbrev = "";
        var name = "";
        var chapters = "";

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
          fn.showDialog('modal-aguarde');
          if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            for (var i = 0; i < data.length; i++) {
              if (data[i]['abbrev'].toLowerCase() == livro.toLowerCase()) {
                if ((parseInt(data[i]['chapter']) == parseInt(capitulo)) && (parseInt(data[i]['verse']) == parseInt(versiculo)) ) {
                    abbrev = data[i]['abbrev'];
                    name = data[i]['name'];
                    chapters = data[i]['caps'];
                    text = data[i]['text'];
                }
              }
              
            }
            texto = '<ons-list-item onclick="fn.pushPage({\'id\': \'textoLivro.html\', \'title\': \''+abbrev+'||'+name+'||'+chapters+'||'+(parseInt(capitulo))+'\'});">'+

                      '<p style="font-size: 20px;line-height:30px;text-align:justify">'+
                        text+
                      '</p>'+
                      '<p style="font-size: 15px;">'+livro.toUpperCase()+' '+(parseInt(capitulo))+':'+(parseInt(versiculo))+'</p>'+
                    '</ons-list-item>';
            var timeoutID = 0;
            clearTimeout(timeoutID);
            timeoutID = setTimeout(function() { fn.hideDialog('modal-aguarde') }, 100);
            $("#"+id).html(texto);
          }
        };
        xmlhttp.open("GET", "js/"+config.versao_biblia+"_.json", true);
        xmlhttp.send();
    },

    buscaHinario: function(id) {
        var selector = this;
        var texto = "";

        $.ajax({
            type : "GET",
            url : "js/harpa.json",
            dataType : "json",
            success : function(data){
                $(selector).each(function(){
                    var myBook = null;
                    var refrao = "";
                    var obj = {
                        id : id,
                        text : ""
                    };
                    background = '';
                    color = '';

                    if (data) {
                        for(i in data){
                            if(data[i].id == obj.id){
                                myBook = data[i];
                            }
                        } 
                        for (var i = 0; i < myBook['hinario'].length; i++) {
                            texto = myBook['hinario'][i];
                            if(texto.substr(0, 1) == '*'){
                                refrao = texto.replace("*","");
                                obj.text += 
                                '<ons-list-item style="padding:0 16px;background:'+background+';color:#'+color+';font-weight:bold">'+
                                '<p style="line-height:31px;margin:0;font-weight:bold;font-size:20px;text-align:left;background:'+background+';color:#'+color+'">'+
                                '<i>'+refrao+ 
                                '</i></p>'+
                                '</ons-list-item>';
                            }
                            if(texto.substr(0, 1) != '*'){
                                obj.text += 
                                '<ons-list-item style="padding:0 16px;background:'+background+';color:#'+color+'">'+
                                '<p style="line-height:31px;margin:0;font-size:20px;text-align:left;background:'+background+';color:#'+color+'">'+
                                ''+texto+ 
                                '</p>'+
                                '</ons-list-item>';
                            }
                        }
                    }
                    $("#conteudoHarpa").html(obj.text);
                });
            }
        });
    },

  listaHinario: function() {
    var text = "";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        $("#listaharpa").html('');
        var data = JSON.parse(this.responseText);
        data.forEach(function (hinos) {
          text +=
          '<ons-list-item class="showAd" onclick="fn.pushPage({\'id\': \'conteudoHarpa.html\', \'title\': \''+hinos['id']+'||'+hinos['titulo']+'\'})">'+
          '  <div class="left"></div>'+
          '  <div class="center" style="font-size: 15px;">'+hinos['id']+' - '+hinos['titulo']+'</div>'+
          '  <div class="right"><ons-icon icon="fa-angle-right"></ons-icon></div>'+
          '</ons-list-item>';
        });
        $("#listaharpa").html(text);
      }
    };
    xmlhttp.open("GET", "js/harpa.json", true);
    xmlhttp.send();
  },

  pesquisaHarpa: function(term){
    if (term != '') {
      text = '';
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          $("#resultado_pesquisa_harpa").html('');
          var data = JSON.parse(this.responseText);

          data.forEach(function (hinos) {
            var achou = 0;

            //PESQUISA PELO NUMERO
            var str = hinos['id'];
            if (achou == 0) {
            if(parseInt(str) === parseInt(term)){
              achou = 1;
              text +=
              '<ons-list-item class="showAd" onclick="fn.pushPage({\'id\': \'conteudoHarpa.html\', \'title\': \''+hinos['id']+'||'+hinos['titulo']+'\'})">'+             
              '  <div class="center" style="font-size: 15px;display:block;"><span>'+hinos['id']+' - '+hinos['titulo']+'</span>'+
              '   <div><i style="font-size: 11px;">'+hinos['id']+" - "+hinos['titulo']+'</i></div>'+
              '  </div>'+
              '</ons-list-item>';
              }
            }

            //PESQUISA PELO TITULO SE NAO ACHAR PELO NUMERO
            if (achou == 0) {
              var str = hinos['titulo'].toLowerCase();
              term = term.toLowerCase();
              if(str.match(term) && achou == 0){
                achou = 1;
                text +=
                '<ons-list-item class="showAd" onclick="fn.pushPage({\'id\': \'conteudoHarpa.html\', \'title\': \''+hinos['id']+'||'+hinos['titulo']+'\'})">'+             
                '  <div class="center" style="font-size: 15px;display:block;"><span>'+hinos['id']+' - '+hinos['titulo']+'</span>'+
                '   <div><i style="font-size: 11px;">'+hinos['id']+" - "+hinos['titulo']+'</i></div>'+
                '  </div>'+
                '</ons-list-item>';
              }
            }

            //PESQUISA DENTRO DO HINARIO SE NAO ACHAR NO TITULO
            if (achou == 0) {
            hinos['hinario'].forEach(function (hino) {
              var str = hino.toLowerCase();
              term = term.toLowerCase();
              if(str.match(term) && achou == 0){
                achou = 1;
                text +=
                '<ons-list-item class="showAd" onclick="fn.pushPage({\'id\': \'conteudoHarpa.html\', \'title\': \''+hinos['id']+'||'+hinos['titulo']+'\'})">'+             
                '  <div class="center" style="font-size: 15px;display:block;"><span>'+hinos['id']+' - '+hinos['titulo']+'</span>'+
                '   <div><i style="font-size: 11px;">'+str+'</i></div>'+
                '  </div>'+
                '</ons-list-item>';
              }
            });
            }
          });


          if (text === '') {
            text = '<p style="text-align: center; margin: 0 0 10px 0;">Nenhum resultado encontrado</p>';
          }
          $("#resultado_pesquisa_harpa").html(text);
          $("#resultado_pesquisa_harpa").css("display","");
        }
      };
      xmlhttp.open("GET", "js/harpa.json", true);
      xmlhttp.send();
    }
  },

  pesquisaBiblia: function(term){
      var versaoId = versaoId || 'nvi';
      if (term != '') {
      term = term.toLowerCase();
      text = '';
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
        $("#resultado_pesquisa_biblia").html('');
        var data = JSON.parse(this.responseText);

        if (data) {
          for (var i = 0; i < data.length; i++) {
            str = (data[i]['text']).toLowerCase();
            if(str.match(term)){
              achou = true;
              text +=
              '<ons-list-item onclick="fn.pushPage({\'id\': \'textoLivro.html\', \'title\': \''+data[i]['abbrev']+'||'+data[i]['name']+'||'+data[i]['caps'].length+'||'+(parseInt(data[i]['chapter']))+'\'});">'+
              '<p style="font-size: 20px;line-height:30px;text-align:justify">'+
              data[i]['text'] +
              '</p>'+
              '<p style="font-size: 15px;">'+data[i]['abbrev'].toUpperCase()+' '+(parseInt(data[i]['chapter']))+':'+(parseInt(data[i]['verse']))+'</p>'+
              '</ons-list-item>';
            }
          }
        }

        if (text === '') {
          text = '<p style="text-align: center; margin: 0 0 10px 0;">Nenhum resultado encontrado</p>';
        }
        $("#resultado_pesquisa_biblia").html(text);
        // $("#resultado_pesquisa_biblia").css("display","");
          }
        };
      xmlhttp.open("GET", "js/"+versaoId+"_.json", true);
      xmlhttp.send();
      }
  },

  getIds: function() {
    window.plugins.OneSignal.getIds(function(ids) {
      window.localStorage.setItem('playerID', ids.userId);
      window.localStorage.setItem('pushToken', ids.pushToken);

      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          window.localStorage.setItem('uid',uid);
          app.cadastraUser();
        }
      });
    });
  },

  cadastraUser: function() {
    var playerID = window.localStorage.getItem('playerID');
    var pushToken = window.localStorage.getItem('pushToken');
    var uid = window.localStorage.getItem('uid');
      
      if (playerID && uid) {
      $.ajax({
            url: "https://www.innovatesoft.com.br/webservice/app/cadastraUser.php",
            dataType: 'json',
            type: 'POST',
            data: {
              'userId': playerID,
              'pushToken': pushToken,
              'uid': uid,
              'datacadastro': dateTime(),
              'ultimoacesso': dateTime(),
              'app': config.app_,
              'versao': config.versao,
            },
            error: function(e) {
          app.buscaPalavraOrientacaoTopico();
          app.buscaNotificacoes();
            },
        success: function(a) {
          if (a) {
            window.localStorage.setItem("id_user", a['id_user']);
            window.localStorage.setItem("nome", a['nome']);
            window.localStorage.setItem("usuario", a['usuario']);
            window.localStorage.setItem("email", a['email']);
            window.localStorage.setItem("celular", a['celular']);
            window.localStorage.setItem("religiao", a['religiao']);
            window.localStorage.setItem("conta", a['conta']);
            if (a['final_versao_pro'] == null) {
              a['final_versao_pro'] = 'NAO';
              window.localStorage.setItem("versao_pro", a['final_versao_pro']);
              banner.show();
              $("#btn_remover_anuncio").show();
            } else {
              window.localStorage.setItem("versao_pro", a['final_versao_pro']);
              banner.hide();
            }
            if (a['conta'] == 'google') {
              $("#tela_home").css("display","");
              $("#tela_login_google").css("display","none");
            }
          }
          app.buscaPalavraOrientacaoTopico();
          app.buscaNotificacoes();
        },
      });
      }
  },

    buscaCantor: function(id) {
        var selector = this;
        var texto = "";
        $.ajax({
            type : "GET",
            url : "js/cantor.json",
            dataType : "json",
            success : function(data){
                $(selector).each(function(){
                    var myBook = null;
                    var obj = {
                        id : id,
                        text : ""
                    };
                    background = '';
                    color = '';
                    if (data) {
                        for(i in data){
                            if(data[i].id == obj.id){
                                myBook = data[i];
                            }
                        }

                        for (var i = 0; i < myBook['hinario'].length; i++) {
                            texto = myBook['hinario'][i];
                            if(texto.substr(0, 1) == '*'){
                                refrao = texto.replace("*","");
                                obj.text += 
                                '<ons-list-item style="padding:0 16px;background:'+background+';color:#'+color+';font-weight:bold">'+
                                '<p style="line-height:31px;margin:0;font-weight:bold;font-size:20px;text-align:left;background:'+background+';color:#'+color+'">'+
                                '<i>'+refrao+ 
                                '</i></p>'+
                                '</ons-list-item>';
                            }
                            if(texto.substr(0, 1) != '*'){
                                obj.text += 
                                '<ons-list-item style="padding:0 16px;background:'+background+';color:#'+color+'">'+
                                '<p style="line-height:31px;margin:0;font-size:20px;text-align:left;background:'+background+';color:#'+color+'">'+
                                ''+texto+ 
                                '</p>'+
                                '</ons-list-item>';
                            }
                        }
                    }
                    $("#conteudoCantor").html(obj.text);
                });
            }
        });
    },

    listaCantor: function() {
        var text = "";
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              $("#listacantor").html('');
              var data = JSON.parse(this.responseText);
              data.forEach(function (hinos) {
          text +=
          '<ons-list-item class="showAd" onclick="fn.pushPage({\'id\': \'conteudoCantor.html\', \'title\': \''+hinos['id']+'||'+hinos['titulo']+'\'})">'+
          '  <div class="left"></div>'+
          '  <div class="center" style="font-size: 15px;">'+hinos['id']+' - '+hinos['titulo']+'</div>'+
          '  <div class="right"><ons-icon icon="fa-angle-right"></ons-icon></div>'+
          '</ons-list-item>';
              });
              $("#listacantor").html(text);
            }
        };
        xmlhttp.open("GET", "js/cantor.json", true);
        xmlhttp.send();
    },

    pesquisaCantor: function(term){
        if (term != '') {
      text = '';
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {
          $("#resultado_pesquisa_cantor").html('');
          var data = JSON.parse(this.responseText);
          var achou = 0;
          data.forEach(function (hinos) {
            //PESQUISA PELO NUMERO
            var str = hinos['id'];
            if (achou == 0) {
              if(parseInt(str) === parseInt(term)){
                achou = 1;
                text +=
                '<ons-list-item class="showAd" onclick="fn.pushPage({\'id\': \'conteudoCantor.html\', \'title\': \''+hinos['id']+'||'+hinos['titulo']+'\'})">'+             
                '  <div class="center" style="font-size: 15px;display:block;"><span>'+hinos['id']+' - '+hinos['titulo']+'</span>'+
                '   <div><i style="font-size: 11px;">'+hinos['id']+" - "+hinos['titulo']+'</i></div>'+
                '  </div>'+
                '</ons-list-item>';
              }
            }

            //PESQUISA PELO TITULO SE NAO ACHAR PELO NUMERO
            if (achou == 0) {
              var str = hinos['titulo'].toLowerCase();
              term = term.toLowerCase();
              if(str.match(term) && achou == 0){
                achou = 1;
                text +=
                '<ons-list-item class="showAd" onclick="fn.pushPage({\'id\': \'conteudoCantor.html\', \'title\': \''+hinos['id']+'||'+hinos['titulo']+'\'})">'+             
                '  <div class="center" style="font-size: 15px;display:block;"><span>'+hinos['id']+' - '+hinos['titulo']+'</span>'+
                '   <div><i style="font-size: 11px;">'+hinos['id']+" - "+hinos['titulo']+'</i></div>'+
                '  </div>'+
                '</ons-list-item>';
              }
            }

            //PESQUISA DENTRO DO HINARIO SE NAO ACHAR NO TITULO
            if (achou == 0) {
              hinos['hinario'].forEach(function (hino) {
                var str = hino.toLowerCase();
                term = term.toLowerCase();
                if(str.match(term) && achou == 0){
                  achou = 1;
                  text +=
                  '<ons-list-item class="showAd" onclick="fn.pushPage({\'id\': \'conteudoCantor.html\', \'title\': \''+hinos['id']+'||'+hinos['titulo']+'\'})">'+             
                  '  <div class="center" style="font-size: 15px;display:block;"><span>'+hinos['id']+' - '+hinos['titulo']+'</span>'+
                  '   <div><i style="font-size: 11px;">'+str+'</i></div>'+
                  '  </div>'+
                  '</ons-list-item>';
                }
              });
            }
            achou = 0;
                  });

                  if (text === '') {
                    text = '<p style="text-align: center; margin: 0 0 10px 0;">Nenhum resultado encontrado</p>';
                  }
                  $("#resultado_pesquisa_cantor").html(text);
                  $("#resultado_pesquisa_cantor").css("display","");
              }
            };
            xmlhttp.open("GET", "js/cantor.json", true);
            xmlhttp.send();
        }
    },

    buscaNotificacoes: function(){
        var id_user = window.localStorage.getItem('id_user');
        var playerID = window.localStorage.getItem('playerID');

        if (playerID && id_user) {
            $.ajax({
              url: "https://www.innovatesoft.com.br/webservice/app/buscaNotificacoes.php",
              dataType: 'JSON',
              type: 'GET',
              data: {
          'userId': playerID,
          'id_user': id_user,
          'app': config.app_,
              },
              async: true,
              error: function(e) {
              },
              success: function(notificacoes) {
          //localStorage.removeItem("lista-notificacoes");
          if (notificacoes) {
            var mensagem_ = '';
            $.each(notificacoes, function (key, item) {
              var hash = item['hash'];
              var titulo = item['titulo'];
              var mensagem = item['mensagem'];
              var lido = item['lido'];
              var data_notificacao = item['data_notificacao'];
              var link = item['link'];
              var app = item['app'];
              lista_notificacao.push({id: hash, titulo: titulo, mensagem: mensagem, lido: lido, data_notificacao: data_notificacao, link: link});
              localStorage.setItem("lista-notificacoes", JSON.stringify(lista_notificacao));
              if (lido == 'nao') {
                mensagem_ = mensagem;
                titulo_ = titulo;
              }
            });
            if (mensagem_ != '') {
              ons.notification.alert(
                mensagem_,
                {title: titulo_}
              ); 
            }
          }
              },
            });
        }
    },

    verificaExistenciaUsuario: function(usuario, religiao, nome, email, celular) {
        var uid = window.localStorage.getItem('uid');
        var playerID = window.localStorage.getItem('playerID');
        if (usuario != "") {
      fn.showDialog('modal-aguarde');
      $.ajax({
        url: "https://www.innovatesoft.com.br/webservice/app/verificaExistenciaUsuario.php?usuario="+usuario,
        dataType: 'json',
        type: 'POST',
        data: {
          'nome': nome,
          'email': email,
          'religiao': religiao,
          'celular': celular,
          'uid': uid,
          'userId': playerID,
        },
        error: function(e) {
          var timeoutID = 0;
          clearTimeout(timeoutID);
          timeoutID = setTimeout(function() { fn.hideDialog('modal-aguarde') }, 100);
          ons.notification.alert(
            'Verifique sua conex??o com a internet!',
            {title: 'Erro'}
          );
        },
        success: function(a) {
          var timeoutID = 0;
          clearTimeout(timeoutID);
          timeoutID = setTimeout(function() { fn.hideDialog('modal-aguarde') }, 100);
          if (a == true) {
            ons.notification.alert(
              'Escolha outro usu??rio!',
              {title: 'Erro'}
            );
          }
          else{
            window.localStorage.setItem("usuario", usuario);
            window.localStorage.setItem("nome", nome);
            window.localStorage.setItem("email", email);
            window.localStorage.setItem("religiao", religiao);
            window.localStorage.setItem("celular", celular);
            ons.notification.alert(
              'Dados atualizados com sucesso!',
              {title: 'Sucesso'}
            );
          }
        },
      });
        }
    },

    registraContato: function(assunto, email, celular, mensagem) {
        var playerID = window.localStorage.getItem('playerID');
        if (playerID != "") {
            fn.showDialog('modal-aguarde');
            $.ajax({
        url: "https://www.innovatesoft.com.br/registra-mensagem.php",
        dataType: 'json',
        type: 'POST',
        data: {
          'assunto': assunto,
          'email': email,
          'celular': celular,
          'mensagem': mensagem,
          'userId': playerID,
        },
        error: function(e) {
          var timeoutID = 0;
          clearTimeout(timeoutID);
          timeoutID = setTimeout(function() { fn.hideDialog('modal-aguarde') }, 100);
          ons.notification.alert(
            'Verifique sua conex??o com a internet!',
            {title: 'Erro'}
          );
        },
        success: function(a) {
          var timeoutID = 0;
          clearTimeout(timeoutID);
          timeoutID = setTimeout(function() { fn.hideDialog('modal-aguarde') }, 100);
          ons.notification.alert(
            'Mensagem enviada com sucesso!',
            {title: 'Sucesso'}
          );
          $("#assunto").val('');
          $("#email").val('');
          $("#celular").val('');
          $("#mensagem").val('');
        },
            });
        }
        else{
      ons.notification.alert(
        'Tente novamente mais tarde!',
        {title: 'Erro'}
      );
        }
    },

    validacaoEmail: function(field) {
        if (field.search("@") >= 0) {
          return true;
        }
        return false;
    },

    firebase: function(){
        var firebaseConfig = {
      apiKey: config.apiKey,
      authDomain: config.authDomain,
      projectId: config.projectId,
      storageBucket: config.storageBucket,
      messagingSenderId: config.messagingSenderId,
      appId: config.appId,
      measurementId: config.measurementId
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();

        firebase.auth().signInAnonymously().catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.debug(errorMessage)
        });
    },

    buscaPergunta: function(num_pergunta) {
        $("#textoquiz").html('');
        var selector = this;
        //BUSCO AS PERGUNTAS
        var data = JSON.parse(localStorage.getItem('lista-quiz'));
        //VERIFICO SE EXISTE PERGUNTAS
        if (data) {
          $(selector).each(function(){
              var pergunta = null;
              var respostas = null;
              var resposta = null;
              var obj = {
          id : num_pergunta,
          opcoes : ""
              };
              var total_perguntas = 0;

              for(i in data){
                total_perguntas++
                //CARREGO A PERGUNTA ATUAL
                if(i == obj.id){
                    pergunta = data[i]['pergunta'];
                    respostas = data[i]['opcoes'];
                    resposta = data[i]['resposta'];
                    //PASSO A PERGUNTA ATUAL PARA UMA VARIAVEL
                    var perguntaAtual = data[i];
                }
              }

              if (pergunta) {
                obj.opcoes = '<ons-list-header>'+(num_pergunta+1)+' - '+pergunta+'</ons-list-header>';
                  for (var i in respostas) {
                    if (respostas[i]) {
              obj.opcoes +=
              '<ons-list-item tappable style="font-size: 20px;">'+
              '    <label class="left">'+
              "      <ons-radio class='quiz_' input-id='quiz"+i+"' value='"+respostas[i]+"'></ons-radio>"+
              '    </label>'+
              '    <label for="quiz'+i+'" class="center">'+respostas[i]+'</label>'+
              '</ons-list-item>';
                    }
                  }
              }

              obj.opcoes +=
              '<ons-list-item tappable modifier="longdivider" style="display: none;">'+
              '    <label class="left">'+
              '      <ons-radio class="quiz_" input-id="quiz_" value=""></ons-radio>'+
              '    </label>'+
              '    <label for="quiz_" class="center">nenhum</label>'+
              '</ons-list-item>';

              obj.opcoes +=
              '<section style="margin: 20px">'+
              '  <ons-button modifier="large" class="button-margin responder">RESPONDER</ons-button>'+
              '  <ons-row>'+
              '      <ons-col style="margin-right: 10px;">'+
              '          <ons-button modifier="large" class="button-margin pular">PULAR ('+pulos+'X)</ons-button>'+
              '      </ons-col>'+
              '      <ons-col>'+
              '          <ons-button modifier="large" class="button-margin eliminar">ELIMINAR ('+eliminar+'X)</ons-button>'+
              '      </ons-col>'+
              '  </ons-row>'+
              '  <ons-button modifier="large" class="button-margin finalizar">FINALIZAR</ons-button>'+

              '</section>';

              $("#textoquiz").html(obj.opcoes);

              var currentId = 'quiz_';
              var currentValue = '';
              const radios = document.querySelectorAll('.quiz_');

              for (var i = 0; i < radios.length; i++) {
                var radio = radios[i];
                  radio.addEventListener('change', function (event) {
                    if (event.target.value !== currentValue) {
                        document.getElementById(currentId).checked = false;
                        currentId = event.target.id;
                        currentValue = event.target.value;
                    }
                  })
              }

              //BOTAO RESPONDER
              $( ".responder" ).click(function() {
                //VERIFICO SE SELECIONOU ALGUMA OPCAO
                if (currentValue != '') {
                  //SE A RESPOSTA ESTIVER ERRADA
                  if (currentValue != resposta) {
                    //PEGO A LISTA DE PERGUNTAS
                    var data = JSON.parse(localStorage.getItem('lista-quiz'));
                    //ACRESCENTO AO FINAL A PERGUNTA QUE O JOGADOR ERROU
                    data.push(perguntaAtual);
                    //SALVO A NOVA LISTA
                    localStorage.setItem("lista-quiz", JSON.stringify(data));
                    //INCREMENTO A QUANTIDADE DE PERGUNTAS
                    total_perguntas++;
                    //INCREMENTO OS ERROS
                    erros++
                    //EXIBO A MENSAGEM DE ERRO
                    ons.notification.alert({
                      message: 'A resposta correta ??: '+resposta,
                      title: 'Resposta errada!',

                      callback: function (index) {
                        if (0 == index) {
                          //INCREMENTO PARA A PROXIMA PERGUNTA
                          num_perg++;
                          //VERIFICO SE AINDA NAO CHEGOU AO FINAL DAS PERGUNTAS
                          if (num_perg < total_perguntas) {
                            //BUSCO A PROXIMA PERGUNTA
                            app.buscaPergunta(num_perg);
                          }
                          else{
                            //CASO TENHA ACERTADO ALGUMA PERGUNTA SALVO NO SCORE
                            if (acertos > 0) {
                              lista_score.push(acertos);
                              localStorage.setItem("lista-score", JSON.stringify(lista_score));
                            }
                            ons.notification.alert({
                              message: 'Parab??ns! Voc?? chegou ao fim do quiz.<br><br>Sua pontua????o: '+acertos,
                              title: 'Mensagem',
                              callback: function (index) {
                                if (0 == index) {
                                  location.href = 'index.html';
                                }
                              }
                            });
                          }
                        }
                      }
                    });
                  }
                  //RESPOSTA CERTA
                  else{
                    acertos++
                    ons.notification.alert({
                      message: 'Resposta certa!',
                      title: 'Mensagem',
                      callback: function (index) {
                        if (0 == index) {
                          num_perg++;
                          if (num_perg < total_perguntas) {
                            app.buscaPergunta(num_perg);
                          }
                          else{
                            ons.notification.alert({
                              message: 'Parab??ns! Voc?? chegou ao fim do quiz.<br><br>Sua pontua????o: '+acertos,
                              title: 'Mensagem',
                              callback: function (index) {
                                if (0 == index) {
                                  location.href = 'index.html';
                                }
                                else{}
                              }
                            });
                          }
                        }
                        else{}
                      }
                    });
                  }
                  currentId = 'quiz_';
                  currentValue = '';


                  if (acertos > 0) {
                    lista_score.push(acertos);
                    localStorage.setItem("lista-score", JSON.stringify(lista_score));
                  }
                  $('.quiz_').prop('checked', false);
                  $('#acerto').html('Acertos: '+acertos);
                  $('#erro').html('Erros: '+erros);
                }
                else{
                  ons.notification.alert({
                    message: 'Escolha uma op????o!',
                    title: 'Mensagem',
                  });
                }
              });

              //BOTAO PULAR
              $( ".pular" ).click(function() {
                //VERIFICO SE PODE PULAR
                if (pulos > 0) {
                  //PEGO A LISTA DE PERGUNTAS
                  var data = JSON.parse(localStorage.getItem('lista-quiz'));
                  //ACRESCENTO AO FINAL A PERGUNTA QUE O JOGADOR PULOU
                  data.push(perguntaAtual);
                  //SALVO A NOVA LISTA
                  localStorage.setItem("lista-quiz", JSON.stringify(data));
                  //INCREMENTO A QUANTIDADE DE PERGUNTAS
                  total_perguntas++;

                  currentId = 'quiz_';
                  currentValue = '';
                  num_perg++;
                  pulos--;

                  if (num_perg < total_perguntas) {
                    app.buscaPergunta(num_perg);
                  }
                  else{
                    //CASO TENHA ACERTADO ALGUMA PERGUNTA SALVO NO SCORE
                    if (acertos > 0) {
                      lista_score.push(acertos);
                      localStorage.setItem("lista-score", JSON.stringify(lista_score));
                    }
                    ons.notification.alert({
                      message: 'Parab??ns! Voc?? chegou ao fim do quiz.<br><br>Sua pontua????o: '+acertos,
                      title: 'Mensagem',
                      callback: function (index) {
                        if (0 == index) {
                          location.href = 'index.html';
                        }
                      }
                    });
                  }
                }
                else{
                  ons.notification.alert({
                    message: 'Voc?? n??o pode pular mais nenhuma pergunta.',
                    title: 'Aten????o'
                  });
                }
              });

              //BOTAO ELIMINAR
              $( ".eliminar" ).click(function() {
                //VERIFICO SE PODE ELIMINAR UMA PERGUNTA
                if (eliminar > 0) {
                  //INCREMENTO 1 ACERTO
                  acertos++
                  $('#acerto').html('Acertos: '+acertos);
                  currentId = 'quiz_';
                  currentValue = '';
                  num_perg++;
                  eliminar--;

                  if (num_perg < total_perguntas) {
                    app.buscaPergunta(num_perg);
                  }
                  else{
                    //CASO TENHA ACERTADO ALGUMA PERGUNTA SALVO NO SCORE
                    if (acertos > 0) {
                      lista_score.push(acertos);
                      localStorage.setItem("lista-score", JSON.stringify(lista_score));
                    }
                    ons.notification.alert({
                      message: 'Parab??ns! Voc?? chegou ao fim do quiz.<br><br>Sua pontua????o: '+acertos,
                      title: 'Mensagem',
                      callback: function (index) {
                        if (0 == index) {
                          location.href = 'index.html';
                        }
                      }
                    });
                  }
                }
                else{
                  ons.notification.alert({
                    message: 'Voc?? n??o pode eliminar mais nenhuma pergunta.',
                    title: 'Aten????o'
                  });
                }
              });

              $( ".finalizar" ).click(function() {
                if (acertos > 0) {
                  lista_score.push(acertos);
                  localStorage.setItem("lista-score", JSON.stringify(lista_score));
                }
                ons.notification.alert({
                  message: 'Sua pontua????o: '+acertos,
                  title: 'Mensagem',
                  callback: function (index) {
                    if (0 == index) {
                      location.href = 'index.html';
                    }
                    else{
                    }
                  }
                });
              });
          });
        }
        else{
            opcoes =
      '<section style="margin: 20px">'+
      '  <ons-list-header>'+
      '      <div class="left">'+
      '      </div>'+
      '      <div class="center intro">'+
      '          <p>Volte para carregar as perguntas!</p>'+
      '      </div>'+
      '  </ons-list-header>'+
      '</section>';

          $("#textoquiz").html(opcoes);
        }
    },

    carregaQuiz: function() {
        localStorage.removeItem('lista-quiz');
        var quiz = "quiz";
        $.ajax({
          type : "GET",
          url : "https://innovatesoft.com.br/webservice/app/buscaPerguntasQuiz.php",
          dataType : "json",
          async: true,
          error: function(e) {
            $.ajax({
              type : "GET",
              url : "js/"+quiz+".json",
              dataType : "json",
              success : function(data){
                if (data) {
                  lista_quiz = app.shuffleArray(data);
                  localStorage.setItem("lista-quiz", JSON.stringify(lista_quiz));
                }
                //app.buscaPergunta(num_perg);
              }
            });
          },
          success : function(data){
            if (data) {
              lista_quiz = app.shuffleArray(data);
              localStorage.setItem("lista-quiz", JSON.stringify(lista_quiz));
            }
            //app.buscaPergunta(num_perg);
          }
        });
    },

    shuffleArray: function(array) {
        for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
        return array;
    },

    cadastraScore: function() {
        var uid = window.localStorage.getItem('uid');
         var playerID = window.localStorage.getItem('playerID');
        var maxScore = null;
        var arr = localStorage.getItem('lista-score');
        if (arr) {
            maxScore = maxArray(JSON.parse(arr));
        }
        if (uid) {
          $.ajax({
            url: "https://www.innovatesoft.com.br/webservice/app/cadastraScoreQuiz.php",
            dataType: 'html',
            type: 'POST',
            data: {
              'uid': uid,
              'userId': playerID,
              'score': maxScore,
              'dataregistro': dateTime()
            },
            error: function(e) {
            },
            success: function(a) {
            },
          });
        }
    },

    buscaPalavraOrientacaoTopico: function() {
        var playerID = '';
        playerID = window.localStorage.getItem('playerID');
        $.ajax({
          url: "https://www.innovatesoft.com.br/webservice/app/palavraOrientacaoConsoloTopico.php",
          dataType: 'json',
          type: 'GET',
          data: {
            'userId': playerID
          },
          error: function(e) {
            console.log(e)
          },
          success: function(a) {
            if (a) {
              localStorage.setItem("lista-orientacao-consolo", JSON.stringify(a));
            }
          },
        });
    },

    buscaPalavraOrientacaoVersiculos: function(id_orientacaoconsolotopico) {
        var array = JSON.parse(localStorage.getItem('lista-orientacao-consolo'));
        var html_orientacao_consolo = '';
        var link = 'palavraOrientacaoConsoloVersiculos.html';
        var descricao = '';
        if (array) {
          for(var k=0; k < array.length; k++) {
            if (array[k]['id_orientacaoconsolotopico'] ==  id_orientacaoconsolotopico) {
              if (array[k]['versiculos']) {
                var versiculos = array[k]['versiculos'][0];
                for (var i = 0; i < versiculos.length; i++) {              
                  descricao = versiculos[i]['abbrev']+'||'+versiculos[i]['capitulo']+'.1';
                  var abbrev = versiculos[i]['abbrev'];
                  var name = versiculos[i]['name'];
                  var chapters = '0';
                  var capitulo = versiculos[i]['capitulo'];
                  html_orientacao_consolo += '<ons-list-item onclick="fn.pushPage({\'id\': \'textoLivro.html\', \'title\': \''+abbrev+'||'+name+'||'+chapters+'||'+capitulo+'\'});">'+
                      '<div class="center list-item__center list-item--material__center" style="font-size: 15px;">'+versiculos[i]['name']+' '+versiculos[i]['capitulo']+':'+versiculos[i]['versiculo']+'</div>'+
                      '<div class="left list-item__left list-item--material__left"></div>'+
                      '<div class="right list-item__right list-item--material__right">'+
                         '<ons-icon icon="fa-angle-right" class="ons-icon fa-angle-right fa" modifier="material"></ons-icon>'+
                      '</div>'+
                   '</ons-list-item>';
                }
                $("#lista_orientacao_consolo_versiculos").html(html_orientacao_consolo);
              }
            }
          }   
        }
    },

    carregaPalavraDia: function() {
      if (!localStorage.getItem('data_livro_dia')) {      
          $.ajax({
            type : "GET",
            url : "https://innovatesoft.com.br/webservice/app/buscaPalavraDiaAleatoria.php",
            dataType : "json",
            async: true,
            error: function(e) {
              app.buscaVersiculoDia(versiculos_do_dia[0],"versiculo_inicio");
            },
            success : function(data){
              if (data) {
                versiculos_do_dia = '[]';
                versiculos_do_dia = (data);
                localStorage.setItem("data_livro_dia", date()); 
                localStorage.setItem("livro_capitulo_versiculo", versiculos_do_dia[0]); 
                app.buscaVersiculoDia(versiculos_do_dia[0],"versiculo_inicio");
              }
            }
          });
    }
    else {
      app.buscaVersiculoDia(localStorage.getItem('livro_capitulo_versiculo'),"versiculo_inicio");
    }
    },

    listaPlanoLeituraAnualMes: function(mes) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
          // fn.showDialog('modal-aguarde');
          if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            if (data) {
              var planoMes = data[mes];
              var txtPlano = '';
              var link = 'planoLeituraAnualConteudoTexto.html';
              var versiculosPlano = '';
              var cap_marcado = '<i style="color:#77DD77" class="fas fa-check-double"></i>';
              var cap_desmarcado = '<i style="color:#DCDCDC" class="fas fa-check-double"></i>';
              for (var i = 1; i < 32; i++) {
                if (planoMes[i]) {
                  versiculosPlano =  planoMes[i];
                  var icon_marcado_descarmado = app.verificarVersiculosPlanoLeituraAnualConcluido(versiculosPlano) ? cap_marcado : cap_desmarcado;
                  txtPlano += '<ons-list-item class="showAd list-item list-item--material" onclick="fn.pushPage({\'id\': \''+link+'\', \'title\': \''+versiculosPlano+'||'+mes+'\'})" modifier="material">'+
                    '<div class="center list-item__center list-item--material__center" style="font-size: 15px;">Dia '+i+' - '+versiculosPlano+'</div>'+
                    '<div class="left list-item__left list-item--material__left">'+
                    icon_marcado_descarmado+
                    '</div>'+
                    '<div class="right list-item__right list-item--material__right">'+
                       '<ons-icon icon="fa-angle-right" class="ons-icon fa-angle-right fa" modifier="material"></ons-icon>'+
                    '</div>'+
                 '</ons-list-item>';
                }
              }
              $("#txtPlanoLeituraAnualConteudo").html(txtPlano);
            }
          }
        };
        xmlhttp.open("GET", "js/plano_leitura_anual.json", true);
        xmlhttp.send();
    },

    buscaVersiculosPlanoLeituraAnualMes: function(versiculos) {
        var dados = versiculos.split(' '); 
        var livro = dados[0];
        var capitulos = dados[1].split('-');
        var plano_versiculo_marcado = '';
        var text = '';
        var background = '';
        var color = '';
        var modo_noturno = JSON.parse(localStorage.getItem('modo-noturno'));
        var fonte_versiculo = JSON.parse(localStorage.getItem('fonte-versiculo'));
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var data = JSON.parse(this.responseText);
                if (data) {
                    for (var i = 0; i < data.length; i++) {            
                        if ((data[i]['abbrev']).toLowerCase() === livro.toLowerCase()) {
                            for (var j = parseInt(capitulos[0]); j <= parseInt(capitulos[(capitulos.length)-1]); j++) {
                                if (parseInt(data[i]['chapter']) == j) {
                                    var texto = data[i]['text'];
                                    var verse = data[i]['verse'];
                                    text += '<ons-list-item style="background:'+background+';color:#'+color+'">'+
                                    '<p style="font-size: '+fonte_versiculo+'px;text-align:justify;line-height: 35px;background:'+background+';color:#'+color+'" >'+
                                    '<span style="font-weight:bold;">'+(parseInt(j))+':'+(parseInt(verse))+'</span>'+
                                    '&nbsp;&nbsp;'+texto+ 
                                    '</p>'+
                                    '</ons-list-item>';
                                }
                            }
                        }
                    }
                    var classe_marcado_descarmado = app.verificarVersiculosPlanoLeituraAnualConcluido(versiculos) ? 'plano_desmarcar' : 'plano_marcar';
                    var nome_btn_marcado_descarmado = app.verificarVersiculosPlanoLeituraAnualConcluido(versiculos) ? 'DESMARCAR COMO CONCLU??DO' : 'MARCAR COMO CONCLU??DO';
                    text += '<br><br><section style="margin: 16px"><ons-button id="btn_marcado_descarmado" modifier="large" class="button-margin '+classe_marcado_descarmado+'"><span>'+nome_btn_marcado_descarmado+'</span></ons-button></section>';
                    $('#txtPlanoLeituraAnualConteudoTexto').html(text);
                    $( ".plano_marcar" ).click(function() {
                        app.marcarVersiculosPlanoLeituraAnualConcluido(versiculos)
                    });
                    $( ".plano_desmarcar" ).click(function() {
                        app.retirarVersiculosPlanoLeituraAnualConcluido(versiculos)
                    });
                }
            }
        };
        xmlhttp.open("GET", "js/"+versaoId+"_.json", true);
        xmlhttp.send();
    },

    marcarVersiculosPlanoLeituraAnualConcluido: function(plano_versiculo_marcado) {
        var planos_marcados = JSON.parse(localStorage.getItem('planos-marcados') || '[]');
        planos_marcados.push(plano_versiculo_marcado);
        localStorage.setItem("planos-marcados", JSON.stringify(planos_marcados));
        ons.notification.toast('Marcado como conclu??do.', { buttonLabel: 'Ok', timeout: 1500 });
        $( "#btn_marcado_descarmado" ).css("display","none");

    },

    verificarVersiculosPlanoLeituraAnualConcluido: function(versiculos) {
        var retorno = false;
        var array = JSON.parse(localStorage.getItem('planos-marcados'));
        if (array) {
          for(var k=0; k < array.length; k++) {
            if (array[k]) {
              if((array[k].toLowerCase() == versiculos.toLowerCase())) {
                retorno = true;
              }
            }
          }   
        }
        return retorno;
    },

    retirarVersiculosPlanoLeituraAnualConcluido: function(versiculos) {
        var array = JSON.parse(localStorage.getItem('planos-marcados'));
        if (array) {
            for(var i=0; i<array.length; i++) {
                if (array[i]) {
                    if((array[i].toLowerCase() == versiculos.toLowerCase())) {
                        array.splice(i, 1);
                    }
                }
            }
            var planos_marcados = JSON.parse(localStorage.getItem('planos-marcados') || '[]');
            localStorage.removeItem(planos_marcados);
            localStorage.setItem("planos-marcados", JSON.stringify(array));
            ons.notification.toast('Desmarcado como conclu??do.', { buttonLabel: 'Ok', timeout: 1500 });
            $( "#btn_marcado_descarmado" ).css("display","none");
        }
    },

    carregaLivros: function(testamento = 1, id) {
        var xmlhttp = new XMLHttpRequest();
        var text = "";
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var data = JSON.parse(this.responseText);
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        if (parseInt(data[i]['testament']) === testamento) {
                            var abbrev = data[i]['abbrev'];
                            var name = data[i]['name'];
                            var caps = data[i]['caps'];

                             text += '<ons-list-item class="showAd" onclick="fn.pushPage({\'id\': \'conteudoLivro.html\', \'title\': \''+abbrev+'||'+name+'||'+caps+'\'})">'+
                                '<div class="left"></div>'+
                                  '<div class="center" style="font-size: 20px;">'+name+'</div>'+
                                  '<div class="right"><ons-icon icon="fa-angle-right"></ons-icon></div>'+ 
                                '</ons-list-item>';

                        }

                    }
                    $('#'+id).html(text);
                }
            }
        };
        xmlhttp.open("GET", "js/livros.json", true);
        xmlhttp.send();
    },
};
app.initialize();