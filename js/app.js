(function(){
  var D=window.DATA;
  /* Datos de ejemplo. Reemplázalos con los reales. */
  var LINKS=D.grupos;
  var NOMBRES={comunidad:'la comunidad',house:'Hobby House',tcg:'Hobby TCG',fans:'Zona Fans',breaks:'Hobby Breaks',venta:'Venta',intercambio:'Intercambio y Búsqueda',avisos:'Avisos'};
  var STORES=D.tiendas;
  var SELLERS=D.vendedores;
  var CHECK='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  var IMG='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-8 9"/></svg>';
  var USER='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/></svg>';
  function $(s,r){return (r||document).querySelector(s)}
  function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
  function igURL(s){return s.ejemplo?'https://www.instagram.com/':'https://www.instagram.com/'+String(s.ig).replace(/^@/,'').replace(/^https?:\/\/(www\.)?instagram\.com\//,'').replace(/\/$/,'')+'/'}
  function waURL(s){return s.wa?'https://wa.me/'+String(s.wa).replace(/\D/g,''):''}
  function slotHTML(s,cls,icon,txt,lbl){return s.logo?'<div class="slot has '+cls+'"><img src="'+s.logo+'" alt="'+lbl+'" loading="lazy"></div>':'<div class="slot '+cls+'" aria-label="'+lbl+'">'+icon+txt+'</div>'}
  var toastT;
  function toast(m){var t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(toastT);toastT=setTimeout(function(){t.classList.remove('show')},2600)}
  var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;

  /* Rutas */
  var PAGES=['inicio','tiendas','vendedores','comunidad','blog','venta','tarjetas','contacto','reglas'];
  var ventaOn=false;
  function loadVenta(){if(ventaOn)return;ventaOn=true;var sc=document.createElement('script');sc.src='/venta/venta.js?v='+(D.ventav||'');sc.onload=function(){if(window.hpVenta)window.hpVenta($('#venta-host'))};sc.onerror=function(){ventaOn=false;var h=$('#venta-host');if(h)h.innerHTML='<p class="small">No se pudo cargar la venta. Recarga la página.</p>'};document.head.appendChild(sc)}
  var tjOn=false;
  function loadTarjetas(){if(tjOn)return;tjOn=true;var v='?v='+(D.tjv||''),fail=function(){tjOn=false;var h=$('#tarjetas-host');if(h)h.innerHTML='<p class="small">No se pudieron cargar las tarjetas. Recarga la página.</p>'};
    var a=document.createElement('script');a.src='/tarjetas/datos.js'+v;a.onerror=fail;a.onload=function(){var b=document.createElement('script');b.src='/tarjetas/tarjetas.js'+v;b.onerror=fail;b.onload=function(){if(window.hpTarjetas)window.hpTarjetas($('#tarjetas-host'))};document.head.appendChild(b)};document.head.appendChild(a)}
  function closeMenu(){$('#hdr').classList.remove('open');$('#menu-btn').setAttribute('aria-expanded','false')}
  function findStore(h){for(var k=0;k<STORES.length;k++)if('tienda-'+STORES[k].s===h)return STORES[k];return null}
  function findSeller(h){for(var k=0;k<SELLERS.length;k++)if('vendedor-'+SELLERS[k].s===h)return SELLERS[k];return null}
  function route(){
    if(window.RUTA&&location.hash){location.replace('/'+location.hash);return}
    var h=window.RUTA||(location.hash||'').slice(1),page=h,nav=h;
    var CF=D.config||{};
    if(CF.tiendas===false&&(h==='tiendas'||h.indexOf('tienda-')===0))h='inicio';
    if(CF.vendedores===false&&(h==='vendedores'||h.indexOf('vendedor-')===0))h='inicio';
    if(CF.venta===false&&h==='venta')h='inicio';
    if(CF.tarjetas===false&&h==='tarjetas')h='inicio';
    page=nav=h;
    if(h.indexOf('tienda-')===0){var st=findStore(h);if(st){renderTienda(st);page='perfil-tienda';nav='tiendas'}else{page=nav='tiendas'}}
    else if(h.indexOf('vendedor-')===0){var s=findSeller(h);if(s){renderPerfil(s);page='perfil';nav='vendedores'}else{page=nav='vendedores'}}
    else if(h.indexOf('blog-')===0){page='entrada';nav='blog'}
    else if(PAGES.indexOf(h)<0)page=nav='inicio';
    $$('[data-page]').forEach(function(p){p.hidden=p.getAttribute('data-page')!==page});
    $$('[data-nav]').forEach(function(a){var on=a.getAttribute('data-nav')===nav;a.classList.toggle('on',on);if(on)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
    if(page==='venta')loadVenta();
    if(page==='tarjetas')loadTarjetas();
    closeMenu();window.scrollTo(0,0);setTimeout(reveal,60);
  }
  var navs=0;
  window.addEventListener('hashchange',function(){navs++;route()});
  document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('[data-back]');if(!a)return;if(navs>0){e.preventDefault();history.back()}});
  $('#menu-btn').addEventListener('click',function(){var o=$('#hdr').classList.toggle('open');this.setAttribute('aria-expanded',o?'true':'false')});

  /* Enlaces */
  $$('[data-join]').forEach(function(a){
    var k=a.getAttribute('data-join');
    if(LINKS[k]){a.href=LINKS[k];a.target='_blank';a.rel='noopener'}else if(k!=='comunidad'){a.hidden=true}
    else a.addEventListener('click',function(e){e.preventDefault();toast('Aquí irá el enlace de invitación a '+NOMBRES[k])});
  });
  var YT='https://www.youtube.com/@jibarocards';
  $$('[data-yt]').forEach(function(a){
    if(YT){a.href=YT;a.target='_blank';a.rel='noopener'}
    else a.addEventListener('click',function(e){e.preventDefault();toast('Aquí irá el enlace al canal de YouTube')});
  });
  function copy(text,ok,node){
    function fb(){if(node){var r=document.createRange();r.selectNodeContents(node);var s=getSelection();s.removeAllRanges();s.addRange(r);toast('Selecciona y copia el texto')}else toast(text)}
    try{navigator.clipboard.writeText(text).then(function(){toast(ok)},fb)}catch(e){fb()}
  }
  $$('[data-copy-el]').forEach(function(b){b.addEventListener('click',function(){var n=document.getElementById(b.getAttribute('data-copy-el'));copy(n.textContent,'Plantilla copiada. Pégala en WhatsApp o Instagram.',n)})});
  /* WhatsApp: pon aquí el número de Hobby Pop con código de país, sin + ni espacios (ej. 507XXXXXXXX) */
  /* Contacto: paneles "Soy tienda / Soy vendedor" */
  $$('[data-open]').forEach(function(btn){btn.addEventListener('click',function(){
    var id=btn.getAttribute('data-open'),open=btn.getAttribute('aria-expanded')!=='true';
    $$('[data-open]').forEach(function(x){var on=x===btn&&open;x.setAttribute('aria-expanded',on?'true':'false');x.classList.toggle('on',on);document.getElementById(x.getAttribute('data-open')).hidden=!on});
  })});
  var WA_NUM='50764437573';
  $$('[data-wa]').forEach(function(a){
    var id=a.getAttribute('data-wa'),n=id?document.getElementById(id):null;
    var txt=n?n.textContent:'Hola, quiero escribirle a Hobby Pop.';
    a.href='https://wa.me/'+WA_NUM+'?text='+encodeURIComponent(txt);
    a.target='_blank';a.rel='noopener';
  });

  /* Mapa ilustrativo */
  function mapSVG(list,sel){
    var grid='';for(var i=1;i<12;i++)grid+='<line class="m-grid" x1="'+i*50+'" y1="0" x2="'+i*50+'" y2="400"/>';for(i=1;i<8;i++)grid+='<line class="m-grid" x1="0" y1="'+i*50+'" x2="600" y2="'+i*50+'"/>';
    var pins=list.map(function(s,i){return '<g class="pin'+(sel===i?' on':'')+'" data-i="'+i+'" transform="translate('+s.x+' '+s.y+')" tabindex="0" role="button" aria-label="'+s.n+'"><circle class="halo" r="26"/><circle class="pc" r="17"/><text>'+(i+1)+'</text></g>'}).join('');
    return '<svg viewBox="0 0 600 400" role="img" aria-label="Mapa ilustrativo"><rect class="m-bg" width="600" height="400"/>'+grid+
      '<path class="m-land" d="M-10 70 C70 30 170 80 260 55 C360 28 460 70 610 18 L610 300 C520 335 470 285 390 318 C300 352 250 305 170 335 C100 360 40 335 -10 355Z"/>'+
      '<path class="m-road" d="M20 330 C120 250 230 225 320 150 S480 70 580 60"/><path class="m-road" d="M90 70 C140 140 200 200 230 300"/><path class="m-road" d="M300 60 C340 130 380 190 430 300"/><path class="m-road" d="M30 200 C180 215 380 190 590 235"/>'+pins+'</svg>';
  }

  /* Tiendas */
  var state={z:'',t:'',sel:-1};
  var mapHome=$('#mapa-home'),mapT=$('#mapa-tiendas'),listT=$('#lista-tiendas');
  mapHome.innerHTML=mapSVG(STORES,-1);mapHome.style.cursor='pointer';
  mapHome.addEventListener('click',function(){location.hash='tiendas'});
  function storeCard(s,i){
    var q=encodeURIComponent('tienda de cartas coleccionables Panamá'),c='c'+(i%3+1);
    return '<article class="card glass hov" data-i="'+i+'" id="st-'+i+'">'+
      '<div class="cbody"><div class="nm">'+slotHTML(s,'',IMG,'Logo','Logo de '+s.n)+(s.ejemplo?'<span class="tag p">Ejemplo</span>':'')+(s.v?'<span class="tag p ver">'+CHECK+'Verificada</span>':'')+'</div>'+
      '<div><h3>'+s.n+'</h3><p class="sub">'+s.b+' · '+s.z+'</p></div>'+
      '<div class="chips">'+s.t.map(function(t){return '<span class="chip st">'+t+'</span>'}).join('')+'</div>'+
      '<div class="datos"><div><b>Horario</b><span>'+s.h+'</span></div><div><b>Redes</b><span>'+s.ig+'</span></div></div>'+
      '<div class="row"><a class="btn sm" href="/tienda/'+s.s+'/">Ver perfil</a><a class="btn g sm" href="https://www.google.com/maps/search/?api=1&query='+q+'" target="_blank" rel="noopener">Maps</a><a class="btn g sm" href="https://waze.com/ul?q='+q+'" target="_blank" rel="noopener">Waze</a></div></div></article>';
  }
  listT.innerHTML=STORES.map(storeCard).join('');
  function match(s){return (!state.z||s.z===state.z)&&(!state.t||s.t.indexOf(state.t)>-1)}
  function pick(i){
    state.sel=i;
    $$('.card',listT).forEach(function(c){c.classList.toggle('sel',+c.getAttribute('data-i')===i)});
    $$('.pin',mapT).forEach(function(p){p.classList.toggle('on',+p.getAttribute('data-i')===i)});
    var c=document.getElementById('st-'+i);if(c&&!c.hidden)c.scrollIntoView({behavior:reduce?'auto':'smooth',block:'center'});
  }
  function applyT(){
    var n=0;
    STORES.forEach(function(s,i){var ok=match(s);if(ok)n++;var c=document.getElementById('st-'+i);if(c)c.hidden=!ok;var p=$('.pin[data-i="'+i+'"]',mapT);if(p)p.style.display=ok?'':'none'});
    $('#cuenta-tiendas').textContent=n+(n===1?' tienda de ejemplo':' tiendas de ejemplo');
    $('#vacio-tiendas').hidden=n>0;
  }
  mapT.innerHTML=mapSVG(STORES,-1);
  mapT.addEventListener('click',function(e){var p=e.target.closest('.pin');if(p)pick(+p.getAttribute('data-i'))});
  mapT.addEventListener('keydown',function(e){if((e.key==='Enter'||e.key===' ')&&e.target.closest('.pin')){e.preventDefault();pick(+e.target.closest('.pin').getAttribute('data-i'))}});
  listT.addEventListener('click',function(e){var c=e.target.closest('.card');if(c&&!e.target.closest('a'))pick(+c.getAttribute('data-i'))});
  listT.addEventListener('dblclick',function(e){var c=e.target.closest('.card');if(c)location.href='/tienda/'+STORES[+c.getAttribute('data-i')].s+'/'});
  $('#f-tiendas').addEventListener('click',function(e){
    var b=e.target.closest('.chip');if(!b)return;
    var k=b.getAttribute('data-key');state[k]=b.getAttribute('data-val');
    $$('.chip[data-key="'+k+'"]',this).forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});
    applyT();
  });
  applyT();

  /* Vendedores */
  function sellerCard(s){
    return '<article class="card glass hov" data-c="'+s.c.join('|')+'" data-s="'+s.s+'"><div class="sbody">'+
      '<div class="sttop">'+slotHTML(s,'round',USER,'Foto','Foto de '+s.n)+'<div><h3>'+s.n+'</h3><p class="sub">'+s.z+' · Ejemplo</p></div></div>'+
      '<div class="chips">'+s.do.map(function(d){return '<span class="tag p">'+d+'</span>'}).join('')+s.c.map(function(c){return '<span class="chip st">'+c+'</span>'}).join('')+'</div>'+
      '<p class="txt" style="font-size:20px">'+s.d+'</p>'+
      '<div class="caps"><div class="cap"><span class="etq">Referencias</span><b class="gt">'+s.r+'</b></div><div class="cap"><span class="etq">En la comunidad</span><b class="gt" style="font-size:32px;padding-top:7px">'+s.a+'</b></div></div>'+
      '<div class="row"><a class="btn sm" href="/vendedor/'+s.s+'/">Ver perfil</a><a class="btn g sm" href="'+igURL(s)+'" target="_blank" rel="noopener">'+s.ig+'</a></div></div></article>';
  }
  function renderTienda(s){
    var url=location.origin+'/tienda/'+s.s+'/',q=encodeURIComponent('tienda de cartas coleccionables Panamá'),i=STORES.indexOf(s);
    var fotos='';for(var k=0;k<3;k++)fotos+=(s.fotos&&s.fotos[k])?'<div class="shot has"><img src="'+s.fotos[k]+'" alt="Foto del local de '+s.n+'" loading="lazy"></div>':'<div class="shot">Foto del local</div>';
    $('#tienda-box').innerHTML='<article class="tp glass"><div class="tp-body">'+
      '<div class="stack" style="gap:18px">'+slotHTML(s,'',IMG,'Logo','Logo de '+s.n)+
      (s.ejemplo?'<span class="tag p">Perfil de ejemplo</span>':'')+(s.v?'<span class="tag p ver">'+CHECK+'Verificada</span>':'')+
      '<h1 class="h1" style="font-size:clamp(40px,9vw,76px)">'+s.n+'</h1><p class="sub">'+s.b+' · '+s.z+'</p>'+
      '<div class="glass box" style="gap:10px"><h3 class="h3">Qué manejan</h3><div class="chips">'+s.t.map(function(t){return '<span class="chip st">'+t+'</span>'}).join('')+'</div><p class="txt">Aquí va la descripción de la tienda: qué venden, qué eventos hacen y lo que quieran contar.</p></div>'+
      '<div class="glass box" style="gap:10px"><h3 class="h3">Visítalos</h3><div class="datos"><div><b>Horario</b><span>'+s.h+'</span></div><div><b>Redes</b><span>'+s.ig+'</span></div><div><b>Zona</b><span>'+s.b+', '+s.z+'</span></div></div>'+
      '<div class="row"><a class="btn sm" href="https://www.google.com/maps/search/?api=1&query='+q+'" target="_blank" rel="noopener">Google Maps</a><a class="btn g sm" href="https://waze.com/ul?q='+q+'" target="_blank" rel="noopener">Waze</a></div></div></div>'+
      '<div class="stack" style="gap:18px"><div class="mapbox glass" id="mapa-tienda"></div>'+
      '<div class="glass box"><h3 class="h3">Fotos del local</h3><div class="fotos">'+fotos+'</div></div>'+
      '<div class="glass box"><h3 class="h3">Comparte esta tienda</h3><div class="link" id="tp-link">'+url+'</div><div class="row"><button class="btn sm" type="button" id="tp-copy">Copiar enlace</button><a class="btn g sm" id="tp-wa" href="#" target="_blank" rel="noopener">Compartir por WhatsApp</a></div></div></div>'+
      '</div></article>';
    var one=[{n:s.n,x:300,y:200}];$('#mapa-tienda').innerHTML=mapSVG(one,0);
    $('#tp-wa').href='https://wa.me/?text='+encodeURIComponent('Visita '+s.n+' en Hobby Pop: '+url);
    $('#tp-copy').addEventListener('click',function(){copy(url,'Enlace copiado',$('#tp-link'))});
  }
  function renderPerfil(s){
    var url=location.origin+'/vendedor/'+s.s+'/';
    var shots='';for(var k=0;k<3;k++)shots+=(s.fotos&&s.fotos[k])?'<div class="shot has"><img src="'+s.fotos[k]+'" alt="Tarjeta de '+s.n+'" loading="lazy"></div>':'<div class="shot">Foto de tarjeta</div>';
    var refs=s.refs||[];var nref=refs.length?refs.length:s.r;
    var refHTML=refs.length?refs.map(function(r){return '<figure class="refq"><blockquote>\u201c'+r.t+'\u201d</blockquote><figcaption>'+r.n+'</figcaption></figure>'}).join(''):'<p class="txt">Aún no hay referencias publicadas.</p>';
    var wa=waURL(s);
    $('#perfil-box').innerHTML='<article class="pf glass"><div class="stack" style="gap:18px">'+
      '<div class="pf-top">'+slotHTML(s,'round',USER,'Foto','Foto de '+s.n)+'<div class="stack" style="gap:10px"><span class="tag p ver">'+CHECK+'Lo conoce Hobby Pop</span>'+(s.ejemplo?'<span class="tag p">Perfil de ejemplo</span>':'')+'<h1 class="h1" style="font-size:clamp(40px,9vw,76px)">'+s.n+'</h1><p class="sub">'+s.z+'</p></div></div>'+
      '<div class="chips">'+s.do.map(function(d){return '<span class="tag p">'+d+'</span>'}).join('')+s.c.map(function(c){return '<span class="chip st">'+c+'</span>'}).join('')+'</div>'+
      '<p class="lead">'+s.d+'</p>'+
      '<div class="caps"><div class="cap"><span class="etq">Referencias</span><b class="gt">'+nref+'</b></div><div class="cap"><span class="etq">En la comunidad</span><b class="gt">'+s.a+'</b></div><div class="cap"><span class="etq">Zona</span><b class="gt" style="font-size:24px;padding-top:8px">'+s.z.split(' ')[0]+'</b></div></div>'+
      '<div class="row">'+(wa?'<a class="btn" href="'+wa+'" target="_blank" rel="noopener">WhatsApp</a>':'<span class="btn dis" aria-disabled="true">WhatsApp</span>')+'<a class="btn g" href="'+igURL(s)+'" target="_blank" rel="noopener">'+s.ig+'</a></div></div>'+
      '<div class="stack" style="gap:18px"><div class="glass box"><h3 class="h3">Tarjetas que vende</h3><div class="shots">'+shots+'</div></div>'+
      '<div class="glass box"><h3 class="h3">Referencias</h3><p class="txt">Lo que dicen personas que ya compraron, vendieron o cambiaron con '+s.n+'.</p><div class="refs">'+refHTML+'</div></div>'+
      '<div class="glass box"><h3 class="h3">Comparte este perfil</h3><p class="txt">Es tu enlace de confianza. Mándalo a quien quieras para que vea tus referencias.</p><div class="link" id="pf-link">'+url+'</div>'+
      '<div class="row"><button class="btn sm" type="button" id="pf-copy">Copiar enlace</button><a class="btn g sm" id="pf-wa" href="#" target="_blank" rel="noopener">Compartir por WhatsApp</a></div></div>'+
      '<p class="small">Hobby Pop conoce a esta persona hace tiempo, pero no interviene en sus compras, ventas ni cambios. Cada trato es un acuerdo entre las partes.</p></div></article>';
    $('#pf-wa').href='https://wa.me/?text='+encodeURIComponent('Mira mi perfil en Hobby Pop: '+url);
    $('#pf-copy').addEventListener('click',function(){copy(url,'Enlace copiado',$('#pf-link'))});
  }
  $('#home-vend').innerHTML=SELLERS.slice(0,3).map(sellerCard).join('');
  var listV=$('#lista-vend');listV.innerHTML=SELLERS.map(sellerCard).join('');
  function goPerfil(e){var c=e.target.closest('.card[data-s]');if(c&&!e.target.closest('a'))location.href='/vendedor/'+c.getAttribute('data-s')+'/'}
  listV.addEventListener('click',goPerfil);$('#home-vend').addEventListener('click',goPerfil);
  $('#f-vend').addEventListener('click',function(e){
    var b=e.target.closest('.chip');if(!b)return;
    $$('.chip',this).forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});
    var v=b.getAttribute('data-val'),n=0;
    $$('.card',listV).forEach(function(c){var ok=!v||c.getAttribute('data-c').split('|').indexOf(v)>-1;c.hidden=!ok;if(ok)n++});
    $('#vacio-vend').hidden=n>0;
  });

  /* Blog */
  var POSTS=D.posts.slice().sort(function(x,y){return y.publicar.localeCompare(x.publicar)||y.f.localeCompare(x.f)});
  var MESES=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  function fechaES(f){var a=f.split('-');return +a[2]+' de '+MESES[+a[1]-1]+' de '+a[0]}
  function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')}
  function postCard(p){
    var cls=p.c==='Noticia'?'n':(p.c==='Historia'?'v':'');
    return '<a class="post glass hov" href="/blog/'+p.s+'/" data-k="'+p.c+'"><div class="thumb has '+cls+'"'+(p.img?' style="background-image:url(\''+esc(p.img)+'\')"':'')+'></div>'+
      '<div class="pbody"><span class="meta">'+p.c+' \u00b7 '+fechaES(p.f)+' \u00b7 '+p.min+' min</span><h3>'+esc(p.t)+'</h3><p class="txt" style="font-size:20px">'+esc(p.r)+'</p></div></a>';
  }
  $('#home-posts').innerHTML=POSTS.slice(0,3).map(postCard).join('');
  var lp=$('#lista-posts');lp.innerHTML=POSTS.map(postCard).join('');
  var bq='';
  function applyB(){
    var n=0;
    $$('.post',lp).forEach(function(p){
      var ok=!bq||p.textContent.toLowerCase().indexOf(bq)>-1;
      p.hidden=!ok;if(ok)n++;
    });
    $('#vacio-blog').hidden=n>0;
  }
  $('#q-blog').addEventListener('input',function(){bq=this.value.trim().toLowerCase();applyB()});

  /* Formulario de contacto.
     FORM_ENDPOINT: si se llena (p. ej. https://formspree.io/f/XXXX), el mensaje llega al correo.
     Mientras este vacio, se abre WhatsApp con el mensaje ya escrito. */
  var FORM_ENDPOINT='';
  $('#contact-form').addEventListener('submit',function(e){
    e.preventDefault();var n=$('#cf-n'),m=$('#cf-m'),t=$('#cf-t'),out=$('#cf-msg');
    if(!n.value.trim()){out.textContent='Escribe tu nombre.';n.focus();return}
    if(!m.value||m.value.indexOf('@')<1||m.value.indexOf('.')<0){out.textContent='Revisa tu correo. Debe tener el formato nombre@correo.com.';m.focus();return}
    if(!t.value.trim()){out.textContent='Escribe tu mensaje.';t.focus();return}
    if(FORM_ENDPOINT){
      out.textContent='Enviando...';
      fetch(FORM_ENDPOINT,{method:'POST',headers:{'Accept':'application/json','Content-Type':'application/json'},body:JSON.stringify({nombre:n.value.trim(),correo:m.value.trim(),mensaje:t.value.trim()})})
        .then(function(r){if(!r.ok)throw 0;out.textContent='Listo, recibimos tu mensaje. Te respondemos pronto.';e.target.reset()})
        .catch(function(){out.textContent='No pudimos enviarlo. Inténtalo otra vez o escríbenos por WhatsApp.'});
    }else{
      var txt='Hola, soy '+n.value.trim()+' ('+m.value.trim()+').\n'+t.value.trim();
      window.open('https://wa.me/'+WA_NUM+'?text='+encodeURIComponent(txt),'_blank','noopener');
      out.textContent='Se abrió WhatsApp con tu mensaje. Solo falta darle enviar.';
    }
  });

  /* Newsletter (demo) */
  $('#nl-form').addEventListener('submit',function(e){
    e.preventDefault();var m=$('#nl-mail'),out=$('#nl-msg');
    if(!m.value||m.value.indexOf('@')<1||m.value.indexOf('.')<0){out.textContent='Revisa tu correo. Debe tener el formato nombre@correo.com.';m.focus();return}
    out.textContent='Listo. En la página real este correo se guardará para el boletín.';m.value='';
  });

  /* Slider con barras de progreso */
  var slides=$$('.slide'),segs=[],cur=0,prog=$('#sl-prog'),sl=$('#slider');
  if(slides.length<2){prog.hidden=true;$('.sl-nav').hidden=true}
  slides.forEach(function(s,i){
    var b=document.createElement('button');b.type='button';b.className='seg';b.setAttribute('aria-label','Ir a la diapositiva '+(i+1));b.innerHTML='<i></i>';
    b.addEventListener('click',function(){go(i)});prog.appendChild(b);segs.push(b);
    if(!reduce&&slides.length>1)b.firstChild.addEventListener('animationend',function(){if(b.classList.contains('on'))go(cur+1)});
  });
  function go(i){
    cur=(i+slides.length)%slides.length;
    slides.forEach(function(s,k){s.classList.toggle('on',k===cur);s.setAttribute('aria-hidden',k===cur?'false':'true')});
    segs.forEach(function(b,k){b.classList.remove('on','done');void b.offsetWidth;if(k<cur)b.classList.add('done');if(k===cur){b.classList.add('on');if(reduce)b.firstChild.style.width='100%'}});
  }
  $('#sl-prev').addEventListener('click',function(){go(cur-1)});
  $('#sl-next').addEventListener('click',function(){go(cur+1)});
  ['mouseenter','focusin','touchstart'].forEach(function(ev){sl.addEventListener(ev,function(){sl.classList.add('paused')},{passive:true})});
  ['mouseleave','focusout','touchend'].forEach(function(ev){sl.addEventListener(ev,function(){sl.classList.remove('paused')},{passive:true})});
  go(0);

  /* Cifras animadas */
  function counts(el){
    var n=+el.getAttribute('data-count'),pre=el.getAttribute('data-pre')||'';
    if(reduce){el.textContent=pre+n;return}
    var t0=null;function f(t){if(!t0)t0=t;var p=Math.min((t-t0)/1200,1);el.textContent=pre+Math.round(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f);
  }

  /* Revelado al desplazar */
  var io=null;
  function reveal(){
    if(!io)return;
    $$('main:not([hidden]) .rv:not(.vis):not(.seen), .foot .rv:not(.vis):not(.seen)').forEach(function(el){el.classList.add('seen');io.observe(el)});
  }
  if('IntersectionObserver' in window){
    document.documentElement.classList.add('js');
    io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('vis');var c=e.target.querySelector('[data-count]');if(c&&!c.done){c.done=1;counts(c)}io.unobserve(e.target)}})},{threshold:.08,rootMargin:'0px 0px -5% 0px'});
    $$('main .sh, main .bento > *, main .stats > *, main .lista > *, main .posts > *, main .split > *, main .nl, main .glist > *, main .three > *, main .rgrid > *, main .faq > *, main .stack > .lead, main .stack > .h1, main .soon > *, .foot-grid > *').forEach(function(el,i){el.classList.add('rv');el.style.transitionDelay=(i%4)*80+'ms'});
    reveal();
  }

  /* Luces de fondo con paralaje */
  var blobs=$$('.blob'),tick=false;
  if(!reduce)window.addEventListener('scroll',function(){if(tick)return;tick=true;requestAnimationFrame(function(){var y=scrollY;blobs.forEach(function(b){b.style.translate='0 '+(y*parseFloat(b.getAttribute('data-p')))+'px'});tick=false})},{passive:true});

  route();
})();
/* barra de lectura y copiar enlace en entradas */
(function(){
  var bar=document.createElement('div');bar.className='readbar';document.body.appendChild(bar);
  function upd(){var m=document.querySelector('main[data-page="entrada"]');
    if(!m||m.hidden){bar.style.width='0';return}
    var h=document.documentElement.scrollHeight-innerHeight;bar.style.width=(h>0?Math.min(100,scrollY/h*100):0)+'%'}
  addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);addEventListener('hashchange',upd);upd();
  document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-copy]');if(!b)return;
    var t=b.getAttribute('data-copy'),old=b.textContent;
    function ok(){b.textContent='¡Enlace copiado!';setTimeout(function(){b.textContent=old},2000)}
    try{navigator.clipboard.writeText(t).then(ok,function(){prompt('Copia el enlace:',t)})}catch(x){prompt('Copia el enlace:',t)}});
})();
