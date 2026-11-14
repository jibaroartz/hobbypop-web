/* Hobby Pop · Tarjetas en venta (tienda con carrito, WhatsApp y Yappy).
   Bundle aislado con Shadow DOM. Los datos viven en tarjetas/datos.js (window.HP_TARJETAS).
   Uso: window.hpTarjetas(elementoAnfitrion) */
(function(){
var WA='50764437573',YAPPY='6443-7573',LS='hp_tarjetas_v1';
var CSS=`
:host{display:block;--pop:#7B2CFF;--uva:#461A95;--noche:#140B33;--hueso:#F3EFFA;--am:#FFC400;--am2:#FF9E1B;--cian:#4FE0FF;
--line:rgba(243,239,250,.2);--mut:rgba(243,239,250,.82);--glass:linear-gradient(145deg,rgba(243,239,250,.15),rgba(243,239,250,.04));
--f:'Sofia Sans Extra Condensed','Arial Narrow','Roboto Condensed',Impact,sans-serif;--hdr:76px;
font-family:var(--f);font-weight:700;color:var(--hueso);font-size:20px;line-height:1.2;color-scheme:dark;text-align:left}
*,*::before,*::after{box-sizing:border-box}
h1,h2,h3,p,ul,ol{margin:0}ul,ol{padding:0;list-style:none}
button,input,select{font:inherit;color:inherit}
button{cursor:pointer}
:focus-visible{outline:3px solid var(--am);outline-offset:2px}
[hidden]{display:none!important}
svg{display:block;flex:none}
.tj{display:flex;flex-direction:column;gap:22px;min-width:0;padding-bottom:96px}
.glass{background:var(--glass);border:1px solid var(--line);border-radius:24px;box-shadow:0 14px 36px rgba(8,3,24,.4),inset 0 1px 0 rgba(255,255,255,.18)}
.yel{background:linear-gradient(180deg,#FFD84D,var(--am));color:var(--noche);border:0;box-shadow:0 6px 18px rgba(255,170,0,.32),inset 0 2px 0 rgba(255,255,255,.55),inset 0 -3px 0 rgba(180,90,0,.25)}

/* Aviso */
.aviso{display:flex;gap:10px;align-items:center;justify-content:center;text-align:center;background:linear-gradient(90deg,var(--am),var(--am2));color:var(--noche);
font-weight:900;text-transform:uppercase;letter-spacing:.04em;font-size:17px;line-height:1.1;padding:11px 14px 9px;border-radius:16px}

/* Portada */
.hero{display:grid;gap:22px;grid-template-columns:minmax(0,1fr)}
.hl{display:flex;flex-direction:column;gap:14px;min-width:0}
.tag{align-self:flex-start;background:linear-gradient(180deg,#FFD84D,var(--am));color:var(--noche);font-weight:800;text-transform:uppercase;font-size:15px;line-height:1;letter-spacing:.08em;padding:7px 13px 6px;border-radius:999px}
h1{font-weight:900;text-transform:uppercase;font-size:clamp(54px,15vw,112px);line-height:.86;overflow-wrap:break-word}
.gt{background:linear-gradient(90deg,var(--am),var(--am2));-webkit-background-clip:text;background-clip:text;color:transparent}
.lead{font-size:clamp(21px,2.6vw,27px);line-height:1.16;max-width:40ch;color:rgba(243,239,250,.93)}
.stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;max-width:560px}
.st{padding:10px 12px;border-radius:16px;background:var(--glass);border:1px solid var(--line);display:flex;flex-direction:column;gap:2px;min-width:0}
.st b{font-weight:900;font-size:34px;line-height:1;color:var(--am)}
.st span{font-size:15px;line-height:1.05;text-transform:uppercase;letter-spacing:.04em;color:var(--mut)}
.how{padding:18px;display:flex;flex-direction:column;gap:14px;min-width:0}
.how h2{font-weight:900;font-size:28px;line-height:1;text-transform:uppercase;color:var(--am)}
.steps{display:flex;flex-direction:column;gap:12px}
.steps li{display:flex;gap:12px;align-items:flex-start}
.steps i{font-style:normal;flex:none;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:900}
.steps b{display:block;font-weight:900;font-size:22px;line-height:1;text-transform:uppercase}
.steps span{display:block;font-size:18px;line-height:1.12;color:var(--mut);margin-top:2px}
.rule{background:rgba(255,196,0,.15);border:1.5px solid var(--am);border-radius:14px;padding:10px 12px;font-size:18px;line-height:1.15}
.rule b{font-weight:900;color:var(--am)}

/* Herramientas */
.tools{display:flex;flex-direction:column;gap:10px;min-width:0}
.trow{display:flex;gap:10px;min-width:0}
.srch{flex:1;min-width:0;position:relative;display:flex;align-items:center}
.srch svg{position:absolute;left:14px;pointer-events:none;opacity:.8}
.srch input{width:100%;height:52px;border-radius:16px;border:1px solid var(--line);background:rgba(20,11,51,.55);padding:0 46px 0 44px;font-size:20px;font-weight:700}
.srch input::placeholder{color:rgba(243,239,250,.7)}
.srch button{position:absolute;right:4px;width:44px;height:44px;border:0;background:transparent;border-radius:50%;display:flex;align-items:center;justify-content:center}
.sort{flex:none;height:52px;border-radius:16px;border:1px solid var(--line);background:rgba(20,11,51,.55);padding:0 10px;font-size:18px;font-weight:800;text-transform:uppercase;max-width:46%}
.sort option{background:#1B0C4A;color:var(--hueso)}
.chips{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;padding:2px 0;-webkit-overflow-scrolling:touch;min-width:0}
.chips::-webkit-scrollbar{display:none}
.ch{flex:none;height:44px;padding:0 16px;border-radius:999px;border:1px solid var(--line);background:var(--glass);font-size:17px;font-weight:800;text-transform:uppercase;letter-spacing:.04em;white-space:nowrap}
.ch small{font-size:.85em;opacity:.75;margin-left:5px}
.ch.on{background:linear-gradient(180deg,#FFD84D,var(--am));color:var(--noche);border-color:transparent}
.res{font-size:18px;text-transform:uppercase;letter-spacing:.05em;color:var(--mut)}

/* Grilla */
.lay{display:grid;grid-template-columns:minmax(0,1fr);gap:24px;align-items:start}
.col{display:flex;flex-direction:column;gap:14px;min-width:0}
.sec{display:flex;flex-direction:column;gap:12px;min-width:0;margin-top:10px}
.sh{display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 12px}
.sh h2{font-weight:900;text-transform:uppercase;font-size:clamp(32px,5vw,44px);line-height:.95}
.sh p{font-size:18px;color:var(--mut);line-height:1.1}
.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;align-items:start}
.card{position:relative;display:flex;flex-direction:column;min-width:0;border-radius:20px;background:var(--glass);border:1px solid var(--line);overflow:hidden}
.card.sel{border-color:var(--cian);box-shadow:0 0 0 1px var(--cian)}
.ph{position:relative;display:block;width:100%;aspect-ratio:1/1;padding:0;border:0;background:#2a1a12;overflow:hidden}
.ph img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
.bds{position:absolute;left:7px;top:7px;right:7px;display:flex;flex-wrap:wrap;gap:4px;pointer-events:none}
.bd{font-weight:800;font-size:13px;line-height:1;letter-spacing:.06em;text-transform:uppercase;padding:5px 8px 4px;border-radius:999px;background:var(--hueso);color:var(--noche);box-shadow:0 2px 6px rgba(8,3,24,.5)}
.bd.n{background:var(--am)}.bd.r{background:var(--cian)}.bd.p{background:var(--pop);color:var(--hueso)}.bd.w{background:#FF6A3D;color:#1b0700}
.flip{position:absolute;right:6px;width:44px;height:44px;border-radius:50%;border:1px solid rgba(243,239,250,.35);background:rgba(20,11,51,.78);display:flex;align-items:center;justify-content:center;transform:translateY(-50px)}
.flipw{position:relative;height:0}
.inf{display:flex;flex-direction:column;gap:6px;padding:10px 10px 12px;min-width:0}
.nm{display:block;width:100%;padding:0;border:0;background:none;text-align:left;font-weight:900;font-size:21px;line-height:1;text-transform:uppercase;overflow-wrap:anywhere}
.dt{font-size:16px;line-height:1.12;color:var(--mut);display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.pr{display:flex;flex-wrap:wrap;align-items:baseline;gap:2px 8px;font-weight:900;font-size:30px;line-height:1;color:var(--am)}
.pr i{font-style:normal;font-size:.55em;letter-spacing:.06em;margin-right:3px}
.pr small{font-size:14px;font-weight:800;letter-spacing:.05em;text-transform:uppercase;color:var(--cian)}
.add{width:100%;min-height:46px;border-radius:999px;font-weight:900;font-size:17px;line-height:1;text-transform:uppercase;letter-spacing:.02em;padding:6px 8px 4px}
.add.on{background:rgba(79,224,255,.14);border:2px solid var(--cian);color:var(--cian);box-shadow:none}
.add:disabled{background:rgba(243,239,250,.08);border:1px solid var(--line);color:rgba(243,239,250,.75);box-shadow:none;cursor:not-allowed}
.card.sold .ph img{filter:grayscale(.85) brightness(.55)}
.soldtag{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none}
.soldtag span{background:var(--hueso);color:var(--noche);font-weight:900;font-size:20px;letter-spacing:.1em;text-transform:uppercase;padding:8px 16px 6px;border-radius:999px;transform:rotate(-6deg)}
.none{padding:22px;text-align:center;font-size:21px}

/* Carrito */
.side{display:none}
.cart{display:flex;flex-direction:column;gap:12px;min-width:0}
.chd{display:flex;align-items:center;justify-content:space-between;gap:10px}
.chd h2{font-weight:900;font-size:36px;line-height:1;text-transform:uppercase}
.ord{align-self:flex-start;border:1px solid var(--line);background:var(--glass);border-radius:999px;padding:7px 14px 5px;font-size:18px;letter-spacing:.05em;text-transform:uppercase}
.ord b{font-weight:900;color:var(--am)}
.emp{font-size:19px;line-height:1.15;color:var(--mut);padding:6px 0}
.its{display:flex;flex-direction:column;gap:10px}
.it{display:grid;grid-template-columns:54px minmax(0,1fr) auto;gap:10px;align-items:center}
.it img{width:54px;height:54px;border-radius:10px;object-fit:cover;display:block}
.it b{display:block;font-weight:900;font-size:19px;line-height:1;text-transform:uppercase;overflow-wrap:anywhere}
.it small{display:block;font-size:15px;color:var(--mut);margin-top:3px}
.itr{display:flex;align-items:center;gap:2px}
.itr strong{font-weight:900;font-size:22px;color:var(--am);white-space:nowrap}
.ib{width:44px;height:44px;border-radius:50%;border:0;background:transparent;display:flex;align-items:center;justify-content:center}
.qty{display:inline-flex;align-items:center;gap:2px;margin-top:4px;border:1px solid var(--line);border-radius:999px}
.qty button{width:40px;height:36px;border:0;background:transparent;font-size:22px;font-weight:900;line-height:1}
.qty button:disabled{opacity:.35;cursor:not-allowed}
.qty span{min-width:18px;text-align:center;font-weight:900}
.tot{display:flex;align-items:baseline;justify-content:space-between;border-top:1px solid var(--line);padding-top:10px}
.tot span{font-size:19px;text-transform:uppercase;letter-spacing:.05em;color:var(--mut)}
.tot strong{font-weight:900;font-size:42px;line-height:1;color:var(--am)}
.fld{display:flex;flex-direction:column;gap:4px;font-size:16px;text-transform:uppercase;letter-spacing:.05em;color:var(--mut)}
.fld input{height:50px;border-radius:14px;border:1px solid var(--line);background:rgba(20,11,51,.55);padding:0 14px;font-size:20px;font-weight:700;text-transform:none;letter-spacing:0;color:var(--hueso);width:100%}
.wa{display:flex;align-items:center;justify-content:center;gap:10px;min-height:56px;border-radius:999px;font-weight:900;font-size:21px;line-height:1;text-transform:uppercase;text-decoration:none;padding:8px 14px 6px;text-align:center}
.wa.dis{pointer-events:none;background:rgba(243,239,250,.08);color:rgba(243,239,250,.7);box-shadow:none;border:1px solid var(--line)}
.yap{border:1px solid var(--line);background:var(--glass);border-radius:18px;padding:12px 14px;display:flex;align-items:center;gap:12px;justify-content:space-between}
.yap span{display:block;font-size:15px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
.yap b{display:block;font-weight:900;font-size:34px;line-height:1}
.cpy{flex:none;height:44px;padding:0 16px;border-radius:999px;border:1px solid var(--line);background:var(--glass);display:flex;align-items:center;gap:8px;font-size:17px;font-weight:800;text-transform:uppercase}
.pay{display:flex;flex-direction:column;gap:6px;font-size:18px;line-height:1.15;color:var(--mut)}
.pay b{color:var(--hueso);font-weight:900}
.pick{font-size:18px;line-height:1.15;padding:10px 12px;border-radius:14px;border:1px solid rgba(79,224,255,.45);background:rgba(79,224,255,.1)}
.pick b{font-weight:900;color:var(--cian)}
.clr{align-self:center;min-height:44px;border:0;background:none;font-size:17px;text-transform:uppercase;letter-spacing:.05em;text-decoration:underline;color:var(--mut)}
.msg{min-height:20px;font-size:17px;color:var(--cian);text-align:center}

/* Barra inferior (celular) */
.bar{position:fixed;z-index:80;left:max(10px,env(safe-area-inset-left,0px));right:max(10px,env(safe-area-inset-right,0px));bottom:calc(10px + env(safe-area-inset-bottom,0px));
min-height:66px;border-radius:20px;padding:8px 8px 8px 16px;display:flex;align-items:center;justify-content:space-between;gap:10px;background:rgba(42,15,122,.96);border:1px solid rgba(243,239,250,.32);box-shadow:0 14px 34px rgba(8,3,24,.65)}
.bl{display:flex;align-items:center;gap:12px;min-width:0}
.bl svg{color:var(--am)}
.bl span{display:block;font-size:15px;text-transform:uppercase;letter-spacing:.05em;color:var(--mut);white-space:nowrap}
.bl b{display:block;font-weight:900;font-size:28px;line-height:1;color:var(--am);white-space:nowrap}
.bb{flex:none;height:50px;padding:2px 20px 0;border-radius:999px;font-weight:900;font-size:19px;text-transform:uppercase}

/* Capas */
.ov{position:fixed;z-index:90;inset:0;display:none;background:rgba(8,3,24,.72);align-items:flex-end;justify-content:center}
.ov.on{display:flex}
.dlg{position:relative;width:100%;max-width:980px;max-height:100%;overflow:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;background:linear-gradient(180deg,#2A1070,#1B0C4A);border:1px solid rgba(243,239,250,.3);border-bottom:0;border-radius:26px 26px 0 0;padding:16px 16px calc(22px + env(safe-area-inset-bottom,0px))}
.sheet .dlg{max-width:520px}
.x{position:sticky;top:0;float:right;z-index:2;width:46px;height:46px;border-radius:50%;border:1px solid var(--line);background:rgba(20,11,51,.85);display:flex;align-items:center;justify-content:center;margin:0 0 6px 8px}
.det{display:grid;grid-template-columns:minmax(0,1fr);gap:16px;clear:both}
.gal{display:flex;flex-direction:column;gap:10px;min-width:0}
.main{position:relative;display:block;width:100%;max-width:520px;margin:0 auto;aspect-ratio:1/1;padding:0;border:0;border-radius:18px;overflow:hidden;background:#120a26}
.main img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;display:block}
.main span{position:absolute;right:8px;bottom:8px;width:44px;height:44px;border-radius:50%;background:rgba(20,11,51,.78);border:1px solid rgba(243,239,250,.35);display:flex;align-items:center;justify-content:center}
.ths{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;justify-content:safe center;padding:2px}
.th{flex:none;min-height:44px;padding:0 16px;border-radius:999px;border:1px solid var(--line);background:var(--glass);font-size:17px;font-weight:800;text-transform:uppercase}
.th.on{background:linear-gradient(180deg,#FFD84D,var(--am));color:var(--noche);border-color:transparent}
.di{display:flex;flex-direction:column;gap:10px;min-width:0}
.di .bds{position:static}
.di h2{font-weight:900;font-size:clamp(34px,6vw,46px);line-height:.95;text-transform:uppercase;overflow-wrap:anywhere}
.di .dd{font-size:20px;line-height:1.15;color:var(--mut)}
.di .xx{font-size:20px;line-height:1.18}
.lst{display:grid;grid-template-columns:minmax(0,1fr);gap:4px;font-size:19px;line-height:1.15;padding:10px 12px;border-radius:14px;background:rgba(20,11,51,.45);border:1px solid var(--line)}
.lst li{padding-left:14px;position:relative}
.lst li::before{content:"";position:absolute;left:0;top:.45em;width:6px;height:6px;border-radius:50%;background:var(--am)}
.di .pr{font-size:44px}
.di .add{min-height:54px;font-size:21px}
.cod{font-size:16px;letter-spacing:.06em;text-transform:uppercase;color:var(--mut)}
.lb{position:fixed;z-index:95;inset:0;display:none;background:#07031a;overflow:auto;-webkit-overflow-scrolling:touch}
.lb.on{display:block}
.lb img{display:block;width:100%;height:auto;max-width:none;margin:0 auto;cursor:zoom-in}
.lb.fit img{width:auto;max-width:100%;max-height:100vh;max-height:100dvh}
.lb.zoom img{width:220%;cursor:zoom-out}
.lbx{position:fixed;z-index:96;top:calc(10px + env(safe-area-inset-top,0px));right:12px;width:48px;height:48px;border-radius:50%;border:1px solid rgba(243,239,250,.4);background:rgba(20,11,51,.85);display:flex;align-items:center;justify-content:center}
.lbh{position:fixed;z-index:96;left:50%;transform:translateX(-50%);bottom:calc(14px + env(safe-area-inset-bottom,0px));background:rgba(20,11,51,.85);border:1px solid var(--line);border-radius:999px;padding:8px 14px 6px;font-size:16px;text-transform:uppercase;letter-spacing:.05em;white-space:nowrap;pointer-events:none}

@media (min-width:600px){
 .grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
 .nm{font-size:23px}.dt{font-size:17px}.add{font-size:18px}
 .aviso{font-size:19px}
}
@media (min-width:760px){
 .hero{grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);align-items:start;gap:32px}
 .chips{flex-wrap:wrap;overflow:visible}
 .ov{align-items:center;padding:24px}
 .dlg{border-radius:26px;border-bottom:1px solid rgba(243,239,250,.3);padding:22px;max-height:calc(100vh - 48px)}
 .det{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:24px;align-items:start}
 .lst.two{grid-template-columns:repeat(2,minmax(0,1fr));column-gap:14px}
}
@media (min-width:1000px){
 .tj{padding-bottom:0}
 .lay{grid-template-columns:minmax(0,1fr) 340px;gap:28px}
 .side{display:block;position:sticky;top:calc(var(--hdr) + 14px);max-height:calc(100vh - var(--hdr) - 28px);overflow:auto;padding:18px;overscroll-behavior:contain}
 .bar{display:none}
 .grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
}
@media (min-width:1240px){.grid{grid-template-columns:repeat(4,minmax(0,1fr))}}
@media (hover:hover){
 .card{transition:transform .2s ease,border-color .2s ease}
 .card:hover{transform:translateY(-3px);border-color:rgba(255,196,0,.55)}
 .add:not(:disabled):hover,.bb:hover,.wa:hover{filter:brightness(1.06)}
 .ch:not(.on):hover,.th:not(.on):hover,.cpy:hover{border-color:rgba(255,196,0,.6)}
}
@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important;scroll-behavior:auto!important}}
`;
var IC={
 search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
 cart:'<path d="M3 4h2l2.4 11h10.2L20 7H6.2"/><circle cx="9" cy="19" r="1.5"/><circle cx="17" cy="19" r="1.5"/>',
 copy:'<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 012-2h9"/>',
 flip:'<path d="M4 12a8 8 0 0114-5.3M20 12a8 8 0 01-14 5.3"/><path d="M18 3v4h-4M6 21v-4h4"/>',
 close:'<path d="M6 6l12 12M18 6L6 18"/>',
 chat:'<path d="M4 5h16v11H9l-5 4z"/>',
 zoom:'<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5M11 8.5v5M8.5 11h5"/>'
};
function ic(n,s){return '<svg viewBox="0 0 24 24" width="'+(s||20)+'" height="'+(s||20)+'" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+IC[n]+'</svg>'}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function fm(v){return Math.abs(v-Math.round(v))<1e-9?String(Math.round(v)):v.toFixed(2)}
function usd(v){return 'US$ '+fm(v)}
function norm(s){return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'')}
function pl(n,a,b){return n+' '+(n===1?a:b)}

window.hpTarjetas=function(host){
 if(!host||host._hp)return;
 var SRC=window.HP_TARJETAS;
 if(!SRC||!SRC.items){host.innerHTML='<p class="small">No se pudo cargar la venta. Recarga la página.</p>';return}
 host._hp=1;host.innerHTML='';
 var BASE=window.HP_TARJETAS_BASE||'/tarjetas/img/';
 var root=host.attachShadow({mode:'open'});
 var ITEMS=SRC.items,CATS=SRC.cats,BY={};
 ITEMS.forEach(function(it,k){it.k=k;it.h=norm([it.id,it.n,it.d,it.x||'',(it.l||[]).join(' '),(it.b||[]).join(' ')].join(' '));BY[it.id]=it});
 var CN={};CATS.forEach(function(c){CN[c[0]]=c});
 function img(it,k,m){return BASE+it.id.toLowerCase()+'-'+k+(m?'m':'')+'.webp'}
 function backIx(it){return it.i>1?(it.g?it.g.length-1:1):0}
 function lbl(it,k){return it.g?it.g[k]:(k===0?'Frente':k===1?'Reverso':'Foto '+(k+1))}

 /* Estado */
 var S={cart:{},ord:null,sent:false,name:''};
 try{var sv=JSON.parse(localStorage.getItem(LS)||'null');if(sv&&typeof sv==='object'){S.cart=sv.cart||{};S.ord=sv.ord||null;S.sent=!!sv.sent;S.name=String(sv.name||'').slice(0,40)}}catch(e){}
 Object.keys(S.cart).forEach(function(id){var it=BY[id];if(!it||it.q<1)delete S.cart[id];else S.cart[id]=Math.max(1,Math.min(it.q,parseInt(S.cart[id],10)||1))});
 function save(){try{localStorage.setItem(LS,JSON.stringify(S))}catch(e){}}
 function ids(){return Object.keys(S.cart).sort(function(a,b){return BY[a].k-BY[b].k})}
 function units(){return ids().reduce(function(s,id){return s+S.cart[id]},0)}
 function total(){return ids().reduce(function(s,id){return s+BY[id].p*S.cart[id]},0)}
 function newOrd(){return String(1000+Math.floor(Math.random()*9000))}
 function touched(){ /* el carrito cambió: si ya se envió un pedido, el nuevo lleva otro número */
  if(!ids().length){S.ord=null;S.sent=false}
  else if(!S.ord||S.sent){S.ord=newOrd();S.sent=false}
  save();
 }
 if(ids().length&&!S.ord){S.ord=newOrd();save()}
 if(!ids().length){S.ord=null;S.sent=false}
 function waText(){
  var L=['*Pedido #'+S.ord+'* · Hobby Pop'];
  if(S.name.trim())L.push('Nombre: '+S.name.trim());
  L.push('');
  ids().forEach(function(id,i){var it=BY[id],q=S.cart[id];L.push((i+1)+'. ['+id+'] '+it.n+(q>1?' ×'+q:'')+' — '+usd(it.p*q))});
  L.push('','*Total: '+usd(total())+'* ('+pl(units(),'artículo','artículos')+')','Retiro en Swaptty Town Center: US$ 1 adicional.','',
   'Entiendo que este mensaje no reserva nada: el primero que paga por Yappy al '+YAPPY+' se lleva la pieza. Pondré «Orden '+S.ord+'» en la descripción del pago.');
  return L.join('\n');
 }
 function waURL(){return 'https://wa.me/'+WA+'?text='+encodeURIComponent(waText())}

 /* Vista */
 var V={q:'',cat:'all',sort:'dest'};
 var avail=ITEMS.filter(function(i){return i.q>0}).length;
 var minP=Math.min.apply(null,ITEMS.filter(function(i){return i.q>0}).map(function(i){return i.p}).concat([Infinity]));
 function bdCls(b){return /^Numerada/.test(b)?'n':/^(RC|SP|Raro)$/.test(b)?'r':/^(Set|Set completo|Lote)$/.test(b)?'':/^Detalle/.test(b)?'w':'p'}
 function bds(it){return (it.b||[]).map(function(b){return '<span class="bd '+bdCls(b)+'">'+esc(b)+'</span>'}).join('')}
 function addBtn(it){
  if(it.q<1)return '<button class="add" type="button" disabled>Vendido</button>';
  var on=!!S.cart[it.id];
  return '<button class="add '+(on?'on':'yel')+'" type="button" data-add="'+it.id+'" aria-pressed="'+on+'">'+(on?'En tu carrito · Quitar':'Añadir al carrito')+'</button>';
 }
 function price(it){return '<div class="pr"><span><i>US$</i>'+fm(it.p)+'</span>'+(it.q>1?'<small>'+it.q+' disponibles</small>':'')+'</div>'}
 function card(it){
  var sold=it.q<1;
  return '<article class="card'+(sold?' sold':'')+(S.cart[it.id]?' sel':'')+'" data-id="'+it.id+'">'+
   '<button class="ph" type="button" data-open="'+it.id+'" aria-label="Ver detalle: '+esc(it.n)+'"><img src="'+img(it,0,1)+'" alt="'+esc(it.n)+'" width="640" height="640" loading="lazy" decoding="async">'+
   '<span class="bds">'+bds(it)+'</span>'+(sold?'<span class="soldtag"><span>Vendido</span></span>':'')+'</button>'+
   (it.i>1?'<div class="flipw"><button class="flip" type="button" data-flip="'+it.id+'" aria-label="Voltear: ver reverso" aria-pressed="false">'+ic('flip',20)+'</button></div>':'')+
   '<div class="inf"><h3><button class="nm" type="button" data-open="'+it.id+'">'+esc(it.n)+'</button></h3><p class="dt">'+esc(it.d)+'</p>'+price(it)+addBtn(it)+'</div></article>';
 }
 function cartHTML(){
  var L=ids(),h='<div class="chd"><h2>Tu carrito</h2><span style="color:var(--am)">'+ic('cart',26)+'</span></div>';
  if(!L.length)h+='<p class="emp">Tu carrito está vacío. Toca «Añadir al carrito» en las piezas que quieras.</p>';
  else{
   h+='<span class="ord">Tu orden · <b>#'+S.ord+'</b></span><div class="its">'+L.map(function(id){var it=BY[id],q=S.cart[id];
    return '<div class="it"><img src="'+img(it,0,1)+'" alt="" width="54" height="54" loading="lazy"><div><b>'+esc(it.n)+'</b><small>Código '+id+' · '+usd(it.p)+(it.q>1?' c/u':'')+'</small>'+
     (it.q>1?'<span class="qty"><button type="button" data-dec="'+id+'" aria-label="Quitar una unidad"'+(q<=1?' disabled':'')+'>−</button><span>'+q+'</span><button type="button" data-inc="'+id+'" aria-label="Añadir una unidad"'+(q>=it.q?' disabled':'')+'>+</button></span>':'')+
     '</div><div class="itr"><strong>'+usd(it.p*q)+'</strong><button class="ib" type="button" data-rm="'+id+'" aria-label="Quitar '+esc(it.n)+' del carrito">'+ic('close',18)+'</button></div></div>'}).join('')+'</div>'+
    '<div class="tot"><span>Total · '+pl(units(),'artículo','artículos')+'</span><strong>'+usd(total())+'</strong></div>';
  }
  h+='<div class="rule"><b>El primero que haga el pago se lleva la pieza.</b> Enviar el mensaje por WhatsApp no reserva nada; solo el pago confirma tu compra.</div>'+
   '<label class="fld">Tu nombre (opcional)<input type="text" data-name maxlength="40" autocomplete="name" value="'+esc(S.name)+'"></label>'+
   '<a class="wa '+(L.length?'yel':'dis')+'" data-wa target="_blank" rel="noopener" '+(L.length?'href="'+esc(waURL())+'"':'aria-disabled="true" tabindex="-1"')+'>'+ic('chat',22)+'Enviar pedido por WhatsApp</a>'+
   '<div class="yap"><div><span>Paga por Yappy al</span><b>'+YAPPY+'</b></div><button class="cpy" type="button" data-copy>'+ic('copy',18)+'Copiar</button></div>'+
   '<p class="msg" role="status" data-msg></p>'+
   '<p class="pick"><b>Retiro en Swaptty Town Center</b> · costo de US$ 1</p>'+
   '<div class="pay"><p><b>1.</b> Envía tu pedido por WhatsApp.</p><p><b>2.</b> Paga por Yappy al '+YAPPY+(S.ord?' y escribe <b>Orden '+S.ord+'</b> en la descripción del pago.':' y escribe tu número de orden en la descripción del pago.')+'</p><p><b>3.</b> Envía el comprobante por WhatsApp para confirmar.</p></div>'+
   (L.length?'<button class="clr" type="button" data-clear>Vaciar carrito</button>':'');
  return '<div class="cart">'+h+'</div>';
 }

 root.innerHTML='<style>'+CSS+'</style><div class="tj">'+
  '<p class="aviso" role="note">El primero que paga se lleva la pieza. Enviar el mensaje no reserva nada.</p>'+
  '<header class="hero"><div class="hl"><span class="tag">Jibaro Sale · Hobby Pop</span><h1>Tarjetas <span class="gt">en venta</span></h1>'+
  '<p class="lead">Sets completos de Panamá, paralelas numeradas, GOATs, Marvel, TCG y béisbol. Todas sin graduar y en perfecto estado, salvo que la ficha diga lo contrario.</p>'+
  '<div class="stats"><div class="st"><b>'+avail+'</b><span>Disponibles</span></div><div class="st"><b>'+CATS.length+'</b><span>Categorías</span></div><div class="st"><b>'+(isFinite(minP)?usd(minP):'—')+'</b><span>Precios desde</span></div></div></div>'+
  '<section class="how glass" aria-label="Así funciona"><h2>Así funciona</h2><ol class="steps">'+
  '<li><i class="yel">1</i><div><b>Elige y añade al carrito</b><span>Toca una pieza para ver frente y reverso.</span></div></li>'+
  '<li><i class="yel">2</i><div><b>Envía el mensaje por WhatsApp</b><span>Sale con tu lista, el total y tu número de orden.</span></div></li>'+
  '<li><i class="yel">3</i><div><b>Paga por Yappy y confirma</b><span>Al '+YAPPY+', con tu número de orden en la descripción.</span></div></li></ol>'+
  '<p class="rule"><b>El primero que haga el pago se lleva la tarjeta o el lote.</b> Enviar el mensaje no reserva nada; solo el pago confirma.</p>'+
  '<p class="pick"><b>Retiro en Swaptty Town Center</b> · costo de US$ 1</p></section></header>'+
  '<div class="tools"><div class="trow"><label class="srch">'+ic('search',20)+'<input id="q" type="search" placeholder="Busca jugador, set o número" aria-label="Buscar piezas" autocomplete="off" enterkeyhint="search"><button id="qx" type="button" aria-label="Borrar búsqueda" hidden>'+ic('close',18)+'</button></label>'+
  '<select class="sort" id="sort" aria-label="Ordenar"><option value="dest">Destacados</option><option value="asc">Precio: menor</option><option value="desc">Precio: mayor</option></select></div>'+
  '<div class="chips" id="chips" role="group" aria-label="Categorías"></div></div>'+
  '<div class="lay"><div class="col"><p class="res" id="res" aria-live="polite"></p><div id="list"></div><p class="none glass" id="none" hidden>No hay piezas con esa búsqueda. Prueba con otro nombre o cambia de categoría.</p></div>'+
  '<aside class="side glass" id="side" aria-label="Carrito"></aside></div>'+
  '<div class="bar" id="bar"><div class="bl">'+ic('cart',26)+'<div><span id="bn"></span><b id="bt"></b></div></div><button class="bb yel" type="button" id="bo">Ver carrito</button></div>'+
  '<div class="ov sheet" id="sheet"><div class="dlg" role="dialog" aria-modal="true" aria-label="Tu carrito"><button class="x" type="button" data-close aria-label="Cerrar carrito">'+ic('close',20)+'</button><div id="sheetc" style="clear:both"></div></div></div>'+
  '<div class="ov" id="det"><div class="dlg" role="dialog" aria-modal="true" aria-label="Detalle de la pieza"><button class="x" type="button" data-close aria-label="Cerrar detalle">'+ic('close',20)+'</button><div id="detc"></div></div></div>'+
  '<div class="lb" id="lb" role="dialog" aria-modal="true" aria-label="Foto ampliada"><button class="lbx" type="button" id="lbx" aria-label="Cerrar foto">'+ic('close',22)+'</button><img id="lbi" alt=""><span class="lbh" id="lbh">Toca la foto para acercar</span></div>'+
  '</div>';
 var $=function(i){return root.getElementById(i)};
 var hdr=document.getElementById('hdr');host.style.setProperty('--hdr',((hdr&&hdr.offsetHeight)||0)+'px');

 function match(it){
  if(V.cat!=='all'&&it.c!==V.cat)return false;
  var tk=norm(V.q).split(/\s+/).filter(Boolean);
  return tk.every(function(t){return it.h.indexOf(t)>-1});
 }
 function renderChips(){
  var n={};ITEMS.forEach(function(i){n[i.c]=(n[i.c]||0)+1});
  $('chips').innerHTML='<button class="ch'+(V.cat==='all'?' on':'')+'" type="button" data-cat="all" aria-pressed="'+(V.cat==='all')+'">Todo<small>'+ITEMS.length+'</small></button>'+
   CATS.map(function(c){return '<button class="ch'+(V.cat===c[0]?' on':'')+'" type="button" data-cat="'+c[0]+'" aria-pressed="'+(V.cat===c[0])+'">'+esc(c[1])+'<small>'+(n[c[0]]||0)+'</small></button>'}).join('');
 }
 function renderList(){
  var L=ITEMS.filter(match),h='';
  if(V.sort!=='dest')L.sort(function(a,b){var sa=a.q<1,sb=b.q<1;if(sa!==sb)return sa?1:-1;return (V.sort==='asc'?a.p-b.p:b.p-a.p)||a.k-b.k});
  if(V.sort==='dest'){
   CATS.forEach(function(c){var g=L.filter(function(i){return i.c===c[0]});if(!g.length)return;
    h+='<section class="sec"><div class="sh"><h2>'+esc(c[1])+'</h2><p>'+esc(c[2])+' · '+pl(g.length,'artículo','artículos')+'</p></div><div class="grid">'+g.map(card).join('')+'</div></section>'});
  }else h='<div class="grid">'+L.map(card).join('')+'</div>';
  $('list').innerHTML=h;$('none').hidden=L.length>0;$('qx').hidden=!V.q;
  var d=L.filter(function(i){return i.q>0}).length;
  $('res').textContent=pl(L.length,'artículo','artículos')+' · '+pl(d,'disponible','disponibles');
 }
 function renderCart(){
  var h=cartHTML();$('side').innerHTML=h;$('sheetc').innerHTML=h;
  var u=units();$('bn').textContent=u?pl(u,'artículo','artículos'):'Carrito vacío';$('bt').textContent=usd(total());
 }
 function syncCards(){
  root.querySelectorAll('.card').forEach(function(c){var it=BY[c.getAttribute('data-id')],on=!!S.cart[it.id];c.classList.toggle('sel',on);
   var b=c.querySelector('[data-add]');if(b){b.className='add '+(on?'on':'yel');b.setAttribute('aria-pressed',on);b.textContent=on?'En tu carrito · Quitar':'Añadir al carrito'}});
  var d=$('detc').querySelector('[data-add]');if(d){var on=!!S.cart[d.getAttribute('data-add')];d.className='add '+(on?'on':'yel');d.setAttribute('aria-pressed',on);d.textContent=on?'En tu carrito · Quitar':'Añadir al carrito'}
 }
 function changed(){touched();renderCart();syncCards()}
 function toggle(id){var it=BY[id];if(!it||it.q<1)return;if(S.cart[id])delete S.cart[id];else S.cart[id]=1;changed()}

 /* Detalle */
 var cur=null,curK=0,lastFocus=null;
 function showImg(k){curK=k;var m=$('detc').querySelector('.main img');if(m){m.src=img(cur,k,0);m.alt=cur.n+' · '+lbl(cur,k)}
  $('detc').querySelectorAll('.th').forEach(function(t){var on=+t.getAttribute('data-k')===k;t.classList.toggle('on',on);t.setAttribute('aria-pressed',on)})}
 function openDet(id,k){
  var it=BY[id];if(!it)return;cur=it;curK=k||0;
  var ths='';for(var i=0;i<it.i;i++)ths+='<button class="th'+(i===curK?' on':'')+'" type="button" data-k="'+i+'" aria-pressed="'+(i===curK)+'">'+esc(lbl(it,i))+'</button>';
  $('detc').innerHTML='<div class="det"><div class="gal"><button class="main" type="button" data-zoom aria-label="Ampliar foto"><img src="'+img(it,curK,0)+'" alt="'+esc(it.n+' · '+lbl(it,curK))+'" width="1280" height="1280" decoding="async"><span>'+ic('zoom',20)+'</span></button>'+
   (it.i>1?'<div class="ths" role="group" aria-label="Fotos">'+ths+'</div>':'')+'</div>'+
   '<div class="di"><div class="bds">'+bds(it)+(it.q<1?'<span class="bd">Vendido</span>':'')+'</div><h2>'+esc(it.n)+'</h2><p class="dd">'+esc(it.d)+'</p>'+
   (it.x?'<p class="xx">'+esc(it.x)+'</p>':'')+
   (it.l&&it.l.length?'<ul class="lst'+(it.l.length>6?' two':'')+'">'+it.l.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul>':'')+
   price(it)+addBtn(it)+
   '<p class="rule"><b>El primero que paga se la lleva.</b> Enviar el mensaje no reserva nada.</p><p class="cod">Código '+it.id+' · '+esc(CN[it.c][1])+'</p></div></div>';
  openOv('det');
 }
 function lock(){var any=root.querySelector('.ov.on,.lb.on');document.documentElement.style.overflow=any?'hidden':''}
 function openOv(id){if(!root.querySelector('.ov.on,.lb.on'))lastFocus=root.activeElement||document.activeElement;var o=$(id);o.classList.add('on');lock();var d=o.querySelector('.dlg');if(d)d.scrollTop=0;var x=o.querySelector('[data-close]');if(x)x.focus({preventScroll:true})}
 function closeOv(id){$(id).classList.remove('on');lock();if(!root.querySelector('.ov.on,.lb.on')&&lastFocus&&lastFocus.focus){try{lastFocus.focus({preventScroll:true})}catch(e){}}}
 function openLb(){var l=$('lb');$('lbi').src=img(cur,curK,0);$('lbi').alt=cur.n+' · '+lbl(cur,curK);l.className='lb on fit';$('lbh').textContent='Toca la foto para acercar';lock();$('lbx').focus({preventScroll:true})}
 function closeLb(){$('lb').className='lb';$('lbi').removeAttribute('src');lock();var z=$('detc').querySelector('[data-zoom]');if(z)z.focus({preventScroll:true})}
 function say(el,m){var box=el.closest('.cart');var p=box&&box.querySelector('[data-msg]');if(p)p.textContent=m}
 function copyYappy(el){
  var tx=YAPPY.replace('-','');
  function fb(){var a=document.createElement('textarea');a.value=tx;a.setAttribute('readonly','');a.style.cssText='position:fixed;left:0;top:0;opacity:0';document.body.appendChild(a);a.select();var ok=false;try{ok=document.execCommand('copy')}catch(e){}a.remove();say(el,ok?'Número copiado: '+YAPPY:'No se pudo copiar. El número es '+YAPPY)}
  try{if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(tx).then(function(){say(el,'Número copiado: '+YAPPY)},fb);else fb()}catch(e){fb()}
 }

 /* Eventos */
 root.addEventListener('click',function(e){
  var t=e.target,b;
  if((b=t.closest('[data-add]'))){toggle(b.getAttribute('data-add'));return}
  if((b=t.closest('[data-flip]'))){var it=BY[b.getAttribute('data-flip')],c=b.closest('.card'),im=c.querySelector('.ph img'),back=b.getAttribute('aria-pressed')!=='true';
   im.src=img(it,back?backIx(it):0,1);b.setAttribute('aria-pressed',back);b.setAttribute('aria-label',back?'Voltear: ver frente':'Voltear: ver reverso');c._back=back;return}
  if((b=t.closest('[data-open]'))){var c2=b.closest('.card');openDet(b.getAttribute('data-open'),c2&&c2._back?backIx(BY[b.getAttribute('data-open')]):0);return}
  if((b=t.closest('[data-cat]'))){V.cat=b.getAttribute('data-cat');renderChips();renderList();return}
  if((b=t.closest('[data-k]'))){showImg(+b.getAttribute('data-k'));return}
  if(t.closest('[data-zoom]')){openLb();return}
  if((b=t.closest('[data-rm]'))){delete S.cart[b.getAttribute('data-rm')];changed();return}
  if((b=t.closest('[data-inc]'))){var i1=b.getAttribute('data-inc');if(S.cart[i1]<BY[i1].q){S.cart[i1]++;changed()}return}
  if((b=t.closest('[data-dec]'))){var i2=b.getAttribute('data-dec');if(S.cart[i2]>1){S.cart[i2]--;changed()}return}
  if(t.closest('[data-clear]')){S.cart={};changed();return}
  if((b=t.closest('[data-copy]'))){copyYappy(b);return}
  if((b=t.closest('[data-wa]'))){if(!ids().length){e.preventDefault();return}b.setAttribute('href',waURL());S.sent=true;save();return}
  if((b=t.closest('[data-close]'))){closeOv(b.closest('.ov').id);return}
  if(t.classList&&t.classList.contains('ov')){closeOv(t.id);return}
  if(t.id==='lbi'){var l=$('lb'),z=l.classList.contains('zoom');l.className='lb on '+(z?'fit':'zoom');$('lbh').textContent=z?'Toca la foto para acercar':'Desliza para moverte · toca para alejar';if(!z){l.scrollLeft=(l.scrollWidth-l.clientWidth)/2;l.scrollTop=(l.scrollHeight-l.clientHeight)/2}return}
  if(t.closest('#lbx')||t.id==='lb'){closeLb();return}
  if(t.closest('#bo')){openOv('sheet');return}
  if(t.closest('#qx')){$('q').value='';V.q='';renderList();$('q').focus();return}
 });
 root.addEventListener('input',function(e){
  var t=e.target;
  if(t.id==='q'){V.q=t.value;renderList();return}
  if(t.hasAttribute&&t.hasAttribute('data-name')){S.name=t.value.slice(0,40);save();
   root.querySelectorAll('[data-name]').forEach(function(i){if(i!==t)i.value=S.name});
   if(ids().length)root.querySelectorAll('[data-wa]').forEach(function(a){a.setAttribute('href',waURL())})}
 });
 $('sort').addEventListener('change',function(){V.sort=this.value;renderList()});
 $('q').addEventListener('keydown',function(e){if(e.key==='Enter')this.blur()});
 document.addEventListener('keydown',function(e){if(e.key!=='Escape')return;
  if($('lb').classList.contains('on'))closeLb();else if($('det').classList.contains('on'))closeOv('det');else if($('sheet').classList.contains('on'))closeOv('sheet')});

 renderChips();renderList();renderCart();
};
var h=document.getElementById('tarjetas-host');
if(h&&window.HP_TARJETAS&&!document.querySelector('main[data-page="tarjetas"][hidden]'))window.hpTarjetas(h);
})();
