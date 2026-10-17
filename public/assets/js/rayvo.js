/* Rayvo course shell — منو، پیشرفت، کپی کد، تم، فهرست (تولیدشده از curriculum.py) */
(function(){
"use strict";
var BRAND={name:"Rayvo",author:"رایبد اکبرلو",authorLatin:"Raybod Akbarlou",course:"دوره‌ی جامع Laravel",tagline:"از صفر تا مارکت‌پلیس",
  links:[["وب‌سایت","https://rayvo.vercel.app/"],["تلگرام","https://t.me/Rayvoak"],["بله","https://ble.ir/rayvo"],["یوتیوب","https://www.youtube.com/@raybod-akbarlou-Rayvo"],["آپارات","https://www.aparat.com/Rayvo"],["گیت‌هاب","https://github.com/raybod179"]]};
var LEVELS=[{"k":"level","n":0,"title":"شروع از صفر","sub":"برای کسی که هیچ‌چیز نمی‌داند: ابزارها، PHP، SQL","items":[["intro.html","مقدمه، هدف و مرور کلی دوره",20],["setup-environment.html","راه‌اندازی محیط کار: VS Code، XAMPP، Laragon و phpMyAdmin",60],["php-1-basics.html","مبانی PHP ۱: متغیر، شرط و حلقه",50],["php-2-arrays-functions.html","مبانی PHP ۲: آرایه و تابع",55],["php-3-oop.html","مبانی PHP ۳: شی‌گرایی (OOP)",60],["sql-basics.html","مبانی SQL و MySQL با phpMyAdmin",55],["l0-composer-git.html","Composer و Git در عمل",40]]},{"k":"level","n":1,"title":"مقدماتی لاراول","sub":"روت، کنترلر، Blade، دیتابیس، فرم، ورود و امنیت","items":[["01-مقدمه-و-نصب.html","مقدمه و نصب لاراول",45],["02-روتینگ.html","روتینگ",61],["03-کنترلرها.html","کنترلرها",62],["04-درخواست-پاسخ-فلش.html","درخواست، پاسخ و فلش",55],["05-Blade-پایه.html","Blade پایه",81],["06-Blade-چیدمان-و-کامپوننت.html","Blade: چیدمان و کامپوننت",52],["07-Migration.html","Migration و شِمای دیتابیس",37],["08-Eloquent-CRUD.html","Eloquent و CRUD",65],["09-Eloquent-روابط.html","روابط Eloquent و Tinker",57],["10-فرم-ها-Validation.html","فرم‌ها و Validation",49],["11-Middleware.html","Middleware",54],["12-Auth.html","احراز هویت",58],["13-Seeder-Factory-Pagination.html","Seeder، Factory و Pagination",46],["14-Storage-و-آپلود.html","Storage و آپلود فایل",62],["15-امنیت.html","امنیت پایه‌ی وب",66]]},{"k":"project","n":1,"title":"پروژه‌ی اول: فروشگاه لاراول","sub":"ساخت قدم‌به‌قدم + سورس کامل و آماده","items":[["project-shop.html","پروژه‌ی اول: فروشگاه لاراول",75]]},{"k":"level","n":2,"title":"متوسط","sub":"تست، API، صف، رویداد، ایمیل و پرداخت","items":[["l2-eloquent-advanced.html","Eloquent پیشرفته: Scope، Accessor و Eager Loading",65],["l2-testing.html","تست‌نویسی (Feature و Unit)",55],["l2-api-resources.html","ساخت API و Resource",55],["l2-sanctum.html","احراز هویت API با Sanctum",55],["l2-queues.html","صف (Queue) و Job",55],["l2-events-notifications.html","Event، Listener و Notification",55],["l2-mail-sms.html","ایمیل و پیامک",55],["l2-scheduler.html","Scheduler و کارهای زمان‌بندی‌شده",55],["l2-persian-rtl.html","فارسی‌سازی: RTL و تاریخ شمسی",55],["l2-payment-gateway.html","اتصال درگاه پرداخت",55]]},{"k":"project","n":2,"title":"پروژه‌ی دوم: سایت خبری","sub":"نویسنده، ادمین، دسته‌بندی، کامنت و کاربران","items":[["project-news.html","پروژه‌ی دوم: سایت خبری",75]]},{"k":"project","n":3,"title":"پروژه‌ی سوم: سیستم رزرو وقت","sub":"پنل ادمین و کاربر، زمان‌بندی و نوبت‌دهی","items":[["project-booking.html","پروژه‌ی سوم: سیستم رزرو وقت",80]]},{"k":"level","n":3,"title":"پیشرفته","sub":"معماری، بهینه‌سازی، Docker، دیپلوی و مارکت‌پلیس","items":[["l3-policies-permissions.html","نقش‌ها و دسترسی‌ها (Policy و Permission)",70],["l3-clean-code.html","Service و Repository و کد تمیز",70],["l3-query-optimization.html","بهینه‌سازی کوئری و رفع N+1",70],["l3-livewire.html","Livewire: مقدمه",70],["l3-broadcasting.html","بلادرنگ (Broadcasting)",70],["l3-docker.html","Docker و محیط توسعه",70],["l3-deploy.html","دیپلوی روی هاست و VPS",70],["l3-cicd.html","CI/CD و GitHub Actions",70],["l3-advanced-security.html","امنیت پیشرفته",70],["l3-package.html","ساخت پکیج لاراول",70]]},{"k":"project","n":4,"title":"پروژه‌ی پایانی: مارکت‌پلیس چندفروشنده","sub":"کیف پول، کمیسیون، چند فروشنده","items":[["project-marketplace.html","پروژه‌ی پایانی: مارکت‌پلیس چندفروشنده",120]]},{"k":"level","n":4,"title":"کار و درآمد","sub":"پورتفولیو، فریلنس و مصاحبه","items":[["l4-portfolio.html","ساخت پورتفولیو و GitHub",45],["l4-freelance.html","شروع فریلنسری و قیمت‌گذاری پروژه",45],["l4-interview.html","آمادگی مصاحبه‌ی کاری",45]]}];
var doc=document,body=doc.body,root=doc.documentElement;
var path=decodeURIComponent(location.pathname.split("/").pop()||"");
var IMG="../assets/img/";
var LS={get:function(k){try{return localStorage.getItem(k)}catch(e){return null}},set:function(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
function el(t,c,h){var e=doc.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e}
function fa(n){return String(n).replace(/\d/g,function(d){return "۰۱۲۳۴۵۶۷۸۹"[d]})}
function isDone(f){return LS.get("rayvo:done:"+f)==="1"}
function setTheme(t){root.setAttribute("data-theme",t)}
setTheme(LS.get("rayvo:theme")||"light");

/* ---- مدل داده ---- */
var FLAT=[];           // فقط درس‌های موجود، به ترتیب
var INFO={};           // file -> {level, idx, title, min}
LEVELS.forEach(function(L,li){L.items.forEach(function(it,ii){
  if(it[0]){var r={file:it[0],title:it[1],min:it[2],level:L,idx:ii};FLAT.push(r);INFO[it[0]]=r}
})});
function labelOf(r){return r.level.k==="project"?("پروژه‌ی "+fa(r.level.n)):("سطح "+fa(r.level.n)+" · درس "+fa(r.idx+1))}
function doneCount(){return FLAT.filter(function(r){return isDone(r.file)}).length}
function firstTodo(){for(var i=0;i<FLAT.length;i++){if(!isDone(FLAT[i].file))return FLAT[i]}return FLAT[0]}
var CUR=INFO[path]||null;

/* ---- آیکن صفحه ---- */
if(!doc.querySelector('link[rel="icon"]')){var ic=doc.createElement("link");ic.rel="icon";ic.href=IMG+"favicon.png";doc.head.appendChild(ic)}

function levelLabel(L){return L.k==="project"?(" "+L.title):("سطح "+fa(L.n)+" · "+L.title)}

function build(){
  body.classList.add("rv-has-side");
  var top=el("header","rv-top");
  top.innerHTML='<button class="rv-btn rv-menu" aria-label="منوی دوره"> <span>فهرست</span></button>'+
   '<a class="rv-logo" href="00-%D9%81%D9%87%D8%B1%D8%B3%D8%AA.html"><img class="rv-mark" src="'+IMG+'rayvo-logo-96.png" alt="Rayvo" width="38" height="38"><span><b>'+BRAND.name+'</b><small>'+BRAND.course+'</small></span></a>'+
   '<span class="rv-spacer"></span>'+
   '<a class="rv-btn rv-hide-sm" href="'+BRAND.links[3][1]+'" target="_blank" rel="noopener">یوتیوب</a>'+
   '<button class="rv-btn rv-theme" aria-label="تغییر تم"></button><div class="rv-bar"><i></i></div>';
  body.insertBefore(top,body.firstChild);

  var side=el("aside","rv-side");side.setAttribute("aria-label","فهرست دوره");
  var n=doneCount(),pct=FLAT.length?Math.round(n/FLAT.length*100):0;
  var h='<div class="rv-prog"><div class="t"><span>پیشرفت شما</span><b>'+fa(pct)+'٪</b></div><div class="track"><i style="width:'+pct+'%"></i></div><div class="t sm"><span>'+fa(n)+' از '+fa(FLAT.length)+' درس</span></div></div>';
  LEVELS.forEach(function(L){
    var avail=L.items.filter(function(i){return i[0]}).length;
    var open=CUR&&CUR.level===L;
    if(L.k==="project"){
      var it=L.items[0];
      h+= it[0] ? '<a class="rv-proj'+(open?" on":"")+'" href="'+encodeURI(it[0])+'"> <span>'+L.title+'</span></a>'
                : '<span class="rv-proj soon"> <span>'+L.title+'</span><em>به‌زودی</em></span>';
    }else{
      var dn=L.items.filter(function(i){return i[0]&&isDone(i[0])}).length;
      h+='<details class="rv-lvl"'+(open?" open":"")+'><summary><span>'+levelLabel(L)+'</span><small>'+(avail?fa(dn)+"/"+fa(avail):"به‌زودی")+'</small></summary><ul class="rv-list">';
      L.items.forEach(function(it,i){
        if(it[0]){var on=it[0]===path,d=isDone(it[0]);
          h+='<li><a href="'+encodeURI(it[0])+'" class="'+(on?"on ":"")+(d?"done":"")+'"><span class="n">'+(d?"":fa(i+1))+'</span><span>'+it[1]+'</span></a></li>'}
        else h+='<li><span class="soon"><span class="n">'+fa(i+1)+'</span><span>'+it[1]+'</span></span></li>';
      });
      h+='</ul></details>';
    }
  });
  h+='<div class="rv-side-foot">تهیه‌شده توسط <b>'+BRAND.name+'</b> — '+BRAND.author+'<br><a href="'+BRAND.links[0][1]+'" target="_blank" rel="noopener">rayvo.vercel.app</a></div>';
  side.innerHTML=h;body.appendChild(side);
  var cur=side.querySelector("a.on");if(cur&&cur.offsetTop>520){side.scrollTop=cur.offsetTop-220}

  var menu=top.querySelector(".rv-menu");
  menu.addEventListener("click",function(){body.classList.toggle("rv-open")});
  doc.addEventListener("click",function(e){if(body.classList.contains("rv-open")&&!side.contains(e.target)&&!menu.contains(e.target))body.classList.remove("rv-open")});
  side.addEventListener("click",function(e){if(e.target.closest("a"))body.classList.remove("rv-open")});
  top.querySelector(".rv-theme").addEventListener("click",function(){var t=root.getAttribute("data-theme")==="dark"?"light":"dark";setTheme(t);LS.set("rayvo:theme",t)});

  var bar=top.querySelector(".rv-bar i");
  var up=el("button","rv-top-btn","↑");up.setAttribute("aria-label","بازگشت به بالا");body.appendChild(up);
  up.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})});
  function onScroll(){var h=root.scrollHeight-root.clientHeight;bar.style.width=(h>0?Math.min(100,root.scrollTop/h*100):0)+"%";up.classList.toggle("show",root.scrollTop>700)}
  window.addEventListener("scroll",onScroll,{passive:true});onScroll();
}

function heroMeta(){
  var hdr=doc.querySelector(".course-header");if(!hdr||!CUR)return;
  var badge=hdr.querySelector(".badge");if(badge)badge.textContent=labelOf(CUR);
  var meta=el("div","rv-meta");
  meta.innerHTML='<span class="rv-chip">حدود '+fa(CUR.min)+' دقیقه مطالعه و تمرین</span>';
  hdr.appendChild(meta);
}

function dynamicNav(){
  var nav=doc.querySelector(".lesson-nav");if(!nav||!CUR)return;
  var i=FLAT.indexOf(CUR),p=FLAT[i-1],nx=FLAT[i+1];
  nav.innerHTML='<a href="00-%D9%81%D9%87%D8%B1%D8%B3%D8%AA.html">فهرست دوره</a>'+
    (p?'<a href="'+encodeURI(p.file)+'">→ '+p.title+'</a>':'<span></span>')+
    (nx?'<a href="'+encodeURI(nx.file)+'">'+nx.title+' ←</a>':'<a href="00-%D9%81%D9%87%D8%B1%D8%B3%D8%AA.html">به‌زودی: درس‌های بعدی ←</a>');
}

function copyButtons(){
  doc.querySelectorAll(".demo-code").forEach(function(box){
    var pre=box.querySelector("pre");if(!pre||box.querySelector(".rv-copy"))return;
    var b=el("button","rv-copy","کپی");b.type="button";
    b.addEventListener("click",function(){
      var text=pre.innerText;
      function ok(){b.textContent="کپی شد";b.classList.add("ok");setTimeout(function(){b.textContent="کپی";b.classList.remove("ok")},1500)}
      function fb(){var t=doc.createElement("textarea");t.value=text;t.style.position="fixed";t.style.opacity="0";body.appendChild(t);t.select();try{doc.execCommand("copy");ok()}catch(e){}body.removeChild(t)}
      if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(text).then(ok,fb)}else{fb()}
    });
    var lab=box.querySelector(".demo-label");(lab||box).appendChild(b);
  });
}

function refreshProgress(){
  var n=doneCount(),pct=FLAT.length?Math.round(n/FLAT.length*100):0;
  var p=doc.querySelector(".rv-prog");
  if(p){p.querySelector("b").textContent=fa(pct)+"٪";p.querySelector(".track i").style.width=pct+"%";p.querySelector(".t.sm span").textContent=fa(n)+" از "+fa(FLAT.length)+" درس"}
  doc.querySelectorAll(".rv-list a").forEach(function(a){
    var f=decodeURIComponent(a.getAttribute("href"));var d=isDone(f);a.classList.toggle("done",d);
    var r=INFO[f];if(r)a.querySelector(".n").textContent=d?"":fa(r.idx+1);
  });
}
function doneButton(){
  var nav=doc.querySelector(".lesson-nav");if(!CUR||!nav)return;
  var wrap=el("div","rv-done"),b=el("button","");
  function paint(){var d=isDone(path);b.className=d?"is-done":"";b.textContent=d?"✓ تمام شد":"این درس را تمام کردم"}
  b.addEventListener("click",function(){LS.set("rayvo:done:"+path,isDone(path)?"0":"1");paint();refreshProgress()});
  paint();wrap.appendChild(b);nav.parentNode.insertBefore(wrap,nav);
}

/* ---- صفحه‌ی فهرست ---- */
function renderIndex(){
  var box=doc.getElementById("rv-index");if(!box)return;
  var t=firstTodo(),n=doneCount();
  var totalMin=FLAT.reduce(function(s,r){return s+r.min},0);
  var allItems=0,projects=0;LEVELS.forEach(function(L){allItems+=L.items.length;if(L.k==="project")projects++});
  var go=doc.getElementById("rv-go");
  if(go){go.href=encodeURI(t.file);go.textContent=n? "ادامه‌ی دوره: "+t.title : "شروع دوره ←"}
  var st=doc.getElementById("rv-stats");
  if(st)st.innerHTML='<div><b>'+fa(allItems-projects)+'</b><span>درس در مسیر کامل</span></div><div><b>'+fa(projects)+'</b><span>پروژه‌ی واقعی</span></div><div><b>'+fa(FLAT.length)+'</b><span>درس آماده‌ی مطالعه</span></div><div><b>'+fa(Math.round(totalMin/60))+'</b><span>ساعت مطالعه و تمرین آماده</span></div>';
  var h='';
  LEVELS.forEach(function(L){
    var avail=L.items.filter(function(i){return i[0]}).length;
    if(L.k==="project"){
      var it=L.items[0];
      h+='<'+(it[0]?'a href="'+encodeURI(it[0])+'"':'div')+' class="ix-proj'+(it[0]?'':' soon')+'"><span class="ix-star"></span><span class="ix-body"><b>'+L.title+'</b><small>'+L.sub+'</small></span><span class="ix-tag">'+(it[0]?(' '+fa(it[2])+' دقیقه'):'به‌زودی')+'</span></'+(it[0]?'a':'div')+'>';
    }else{
      h+='<details class="ix-level"'+(avail?' open':'')+'><summary><span class="ix-num">'+fa(L.n)+'</span><span class="ix-body"><b>سطح '+fa(L.n)+' · '+L.title+'</b><small>'+L.sub+'</small></span><span class="ix-tag">'+(avail?fa(avail)+' درس آماده':'به‌زودی')+'</span></summary><ul>';
      L.items.forEach(function(it,i){
        if(it[0])h+='<li><a href="'+encodeURI(it[0])+'"><span class="n">'+(isDone(it[0])?"":fa(i+1))+'</span><span class="tt">'+it[1]+'</span><span class="mn">'+fa(it[2])+' دقیقه</span></a></li>';
        else h+='<li class="soon"><span class="n">'+fa(i+1)+'</span><span class="tt">'+it[1]+'</span><span class="mn">به‌زودی</span></li>';
      });
      h+='</ul></details>';
    }
  });
  box.innerHTML=h;
}

function footer(){
  var f=el("footer","rv-footer");
  f.innerHTML='<div class="by">این دوره با ❤️ توسط <b>'+BRAND.name+'</b> تهیه و طراحی شده است</div>'+
   '<div class="sub">نویسنده و مدرس: '+BRAND.author+' ('+BRAND.authorLatin+') · '+BRAND.tagline+'</div>'+
   '<div class="rv-links">'+BRAND.links.map(function(l){return '<a href="'+l[1]+'" target="_blank" rel="noopener">'+l[0]+'</a>'}).join("")+'</div>'+
   '<div class="rv-copy-right">© '+BRAND.name+' — کپی و بازنشر محتوای دوره بدون اجازه ممنوع است.</div>';
  var page=doc.querySelector(".course-page");(page&&page.parentNode?page.parentNode:body).appendChild(f);
}

/* ---- محافظت: واترمارک اختصاصی هر خریدار + جلوگیری از کپی ساده ---- */
var FREE=["00-فهرست.html","intro.html","setup-environment.html","php-1-basics.html"];
var BUY="https://t.me/RayvoSupport";
function guestMode(){
  if(location.protocol==="file:"||/[?&]dev\b/.test(location.search))return;
  fetch("/api/me",{credentials:"same-origin"}).then(function(r){
    if(r.ok)return;
    body.classList.add("rv-guest");
    doc.querySelectorAll(".rv-list a,.ix-level li a,.rv-proj,a.ix-proj").forEach(function(a){
      var f=decodeURIComponent((a.getAttribute("href")||"").split("/").pop());
      if(f&&FREE.indexOf(f)<0){a.classList.add("lock");a.setAttribute("href","../login.html")}
    });
    var up=doc.querySelector(".course-page");
    if(up&&CUR&&FREE.indexOf(path)>=0&&path!=="00-فهرست.html"){
      var b=el("div","rv-guest-bar",'<span>این درس رایگان است. برای دسترسی به همه‌ی درس‌ها، پروژه‌ها و سورس‌ها دوره را بخر.</span><span><a class="rv-btn" href="'+BUY+'" target="_blank" rel="noopener">خرید از تلگرام</a><a class="rv-btn" href="../login.html">ورود با کد</a></span>');
      up.insertBefore(b,up.firstChild);
    }
  }).catch(function(){});
}

function protect(){
  if(location.protocol==="file:"||/[?&]dev\b/.test(location.search))return;
  root.classList.add("rv-protect");
  function inCode(n){while(n&&n.nodeType!==1)n=n.parentNode;return !!(n&&n.closest&&n.closest("pre,.demo-code"))}
  doc.addEventListener("contextmenu",function(e){if(!inCode(e.target))e.preventDefault()});
  doc.addEventListener("copy",function(e){var sel=window.getSelection();if(sel&&sel.rangeCount&&!inCode(sel.anchorNode))e.preventDefault()});
  doc.addEventListener("dragstart",function(e){e.preventDefault()});
  doc.addEventListener("keydown",function(e){if((e.ctrlKey||e.metaKey)&&/^[spu]$/i.test(e.key))e.preventDefault()});
  fetch("/api/me",{credentials:"same-origin"}).then(function(r){return r.ok?r.json():null}).then(function(d){
    if(!d||!d.name)return;
    var c=doc.createElement("canvas");c.width=420;c.height=260;var x=c.getContext("2d");
    x.translate(210,130);x.rotate(-Math.PI/9);x.textAlign="center";x.font="600 15px Vazirmatn,Tahoma,sans-serif";
    x.fillStyle="rgba(128,128,128,.16)";x.fillText(d.name+" · Rayvo",0,-8);x.font="12px Vazirmatn,Tahoma,sans-serif";x.fillText(d.id||"",0,16);
    var w=el("div","rv-wm");w.style.backgroundImage="url("+c.toDataURL()+")";body.appendChild(w);
  }).catch(function(){});
}

function init(){build();heroMeta();dynamicNav();copyButtons();doneButton();renderIndex();footer();protect();guestMode()}
if(doc.readyState==="loading")doc.addEventListener("DOMContentLoaded",init);else init();
})();
