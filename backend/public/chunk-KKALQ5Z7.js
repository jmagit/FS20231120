import{A as pe,B as ge,D as ke,E as Te,F as Ie,G as Ae,K as Fe,O as Pe,P as Ne,Q as Oe,c as ye,g as J,i as Q,j as K,k as W,l as X,m as Y,n as Z,o as ee,p as te,q as ne,r as ie,s as oe,t as re,u as ae,v as le,w as de,x as se,y as me,z as ce}from"./chunk-4DFEVCWC.js";import"./chunk-KSVJUEXI.js";import{b as be,m as Se,o as N,p as we,t as G}from"./chunk-VEP4MZB5.js";import{$ as u,Ba as s,Ca as S,Db as M,Eb as V,Fb as D,Ma as m,N as B,O as Ce,Oa as E,S as k,Sa as w,Ta as y,V as I,Va as he,W as _e,Wa as xe,Xa as t,Ya as n,Z as H,Za as x,_ as g,bb as T,db as p,e as fe,eb as c,hb as q,ib as ve,jb as U,kb as Me,lb as _,mb as o,nb as v,ob as P,oc as Ve,qb as z,ta as j,vb as A,xb as Ee}from"./chunk-GTAAV37J.js";var ue=class{constructor(a=0,l,i,e,r,h,C="H",b,f,je=!1){this.id=a,this.tratamiento=l,this.nombre=i,this.apellidos=e,this.telefono=r,this.email=h,this.sexo=C,this.nacimiento=b,this.avatar=f,this.conflictivo=je}},$e=(()=>{let a=class a extends Oe{constructor(){super("contactos",{context:new be().set(Ie,!0)})}page(i,e=20){return new fe(r=>{let h=`${this.baseUrl}?_page=${i}&_rows=${e}&_sort=nombre,apellidos`;this.http.get(h,this.option).subscribe({next:C=>r.next({page:C.number,pages:C.totalPages,rows:C.totalElements,list:C.content}),error:C=>r.error(C)})})}};a.\u0275fac=function(e){return new(e||a)},a.\u0275prov=B({token:a,factory:a.\u0275fac,providedIn:"root"});let d=a;return d})(),F=(()=>{let a=class a{constructor(i,e,r,h,C,b){this.notify=i,this.out=e,this.dao=r,this.auth=h,this.router=C,this.navigation=b,this.modo="list",this.listado=[],this.elemento={},this.listURL="/contactos",this.page=0,this.totalPages=0,this.totalRows=0,this.rowsPerPage=8}get Modo(){return this.modo}get Listado(){return this.listado}get Elemento(){return this.elemento}list(){this.dao.query().subscribe({next:i=>{this.listado=i,this.modo="list"},error:i=>this.handleError(i)})}add(){this.elemento=new ue,this.modo="add"}edit(i){this.dao.get(i).subscribe({next:e=>{this.elemento=e,this.idOriginal=i,this.modo="edit"},error:e=>this.handleError(e)})}view(i){this.dao.get(i).subscribe({next:e=>{this.elemento=e,this.modo="view"},error:e=>this.handleError(e)})}delete(i){window.confirm("\xBFSeguro?")&&this.dao.remove(i).subscribe({next:()=>{this.load()},error:e=>this.handleError(e)})}clear(){this.elemento={},this.idOriginal=void 0,this.listado=[]}cancel(){this.clear(),this.navigation.back()}send(){switch(this.modo){case"add":this.dao.add(this.elemento).subscribe({next:()=>this.cancel(),error:i=>this.handleError(i)});break;case"edit":if(!this.idOriginal){this.out.error("Falta el identificador");return}this.dao.change(this.idOriginal,this.elemento).subscribe({next:()=>this.cancel(),error:i=>this.handleError(i)});break;case"view":this.cancel();break}}handleError(i){let e="";switch(i.status){case 0:e=i.message;break;case 404:e=`ERROR ${i.status}: ${i.statusText}`;break;default:e=`ERROR ${i.status}: ${i.error?.title??i.statusText}.${i.error?.detail?` Detalles: ${i.error.detail}`:""}`;break}this.notify.add(e)}load(i=-1){i<0&&(i=this.page),this.dao.page(i,this.rowsPerPage).subscribe({next:e=>{this.page=e.page,this.totalPages=e.pages,this.totalRows=e.rows,this.listado=e.list,this.modo="list"},error:e=>this.handleError(e)})}pageChange(i=0){this.router.navigate([],{queryParams:{page:i}})}imageErrorHandler(i,e){i.target.src=e.sexo==="H"?"/assets/user-not-found-male.png":"/assets/user-not-found-female.png"}};a.\u0275fac=function(e){return new(e||a)(k(ke),k(ye),k($e),k(Ae),k(N),k(Te))},a.\u0275prov=B({token:a,factory:a.\u0275fac,providedIn:"root"});let d=a;return d})();function He(d,a){d&1&&x(0,"app-contactos-add")}function qe(d,a){d&1&&x(0,"app-contactos-edit")}function Ue(d,a){d&1&&x(0,"app-contactos-view")}function ze(d,a){d&1&&x(0,"app-contactos-list")}var Ge=(d,a)=>a.id;function Je(d,a){d&1&&(t(0,"button",6),x(1,"i",7),o(2," A\xF1adir"),n())}var Qe=d=>[d,"edit"];function Ke(d,a){if(d&1){let l=T();t(0,"div",16)(1,"button",17),x(2,"i",18),n(),t(3,"button",19),p("click",function(){g(l);let e=c().$implicit,r=c();return u(r.VM.delete(e.id))}),x(4,"i",20),n()()}if(d&2){let l=c().$implicit;s(1),m("routerLink",Ee(1,Qe,l.id))}}function We(d,a){if(d&1&&(t(0,"tr")(1,"td")(2,"div",8)(3,"div",9)(4,"div",10),x(5,"img",11),n(),t(6,"div",12)(7,"a",13),o(8),n(),x(9,"br"),t(10,"b"),o(11,"Tlfn.:"),n(),o(12),t(13,"b"),o(14,"Correo:"),n(),o(15),n()()()(),t(16,"td",14),w(17,Ke,5,3,"div",15),n()()),d&2){let l=a.$implicit,i=c(),e;s(5),q("src",(e=l.avatar)!==null&&e!==void 0?e:l.sexo==="H"?"/assets/user-not-found-male.png":"/assets/user-not-found-female.png",j),U("alt","Foto de ",l.nombre," ",l.apellidos,""),s(2),Me("routerLink","",l.id,"/",l.nombre,"-",l.apellidos,""),s(1),z(" ",l.tratamiento," ",l.nombre," ",l.apellidos,""),s(4),P(" ",l.telefono," "),s(3),P(" ",l.email," "),s(2),y(17,i.VM.auth.isAutenticated?17:-1)}}function Xe(d,a){if(d&1){let l=T();t(0,"div",4)(1,"input",46,47),p("ngModelChange",function(e){g(l);let r=c(2);return u(r.VM.Elemento.id=e)}),n(),t(3,"label",48),o(4,"C\xF3digo:"),n(),t(5,"output",12),o(6),M(7,"errormsg"),n()()}if(d&2){let l=_(2);c();let i=_(1),e=c();s(1),E("is-invalid",l.invalid&&i.dirty),m("ngModel",e.VM.Elemento.id),s(4),m("hidden",l.valid),s(1),v(V(7,5,l.errors))}}function Ye(d,a){if(d&1&&(t(0,"div",49)(1,"label",50),o(2,"C\xF3digo:"),n(),x(3,"output",51),n()),d&2){let l=c(2);s(3),m("textContent",l.VM.Elemento.id)}}function Ze(d,a){if(d&1){let l=T();t(0,"form",1,2),w(2,Xe,8,7,"div",3)(3,Ye,4,1),t(4,"div",4)(5,"select",5,6),p("ngModelChange",function(e){g(l);let r=c();return u(r.VM.Elemento.tratamiento=e)}),t(7,"option"),o(8,"Sr."),n(),t(9,"option"),o(10,"Sra."),n(),t(11,"option"),o(12,"Srta."),n(),t(13,"option"),o(14,"Dr."),n(),t(15,"option"),o(16,"Dra."),n(),t(17,"option"),o(18,"Ilmo."),n(),t(19,"option"),o(20,"Ilma."),n(),t(21,"option"),o(22,"Excmo."),n(),t(23,"option"),o(24,"Excma."),n()(),t(25,"label",7),o(26,"Tratamiento:"),n()(),t(27,"div",8)(28,"input",9,10),p("ngModelChange",function(e){g(l);let r=c();return u(r.VM.Elemento.nombre=e)}),n(),t(30,"label",11),o(31,"Nombre:"),n(),t(32,"output",12),o(33),M(34,"errormsg"),n()(),t(35,"div",8)(36,"input",13,14),p("ngModelChange",function(e){g(l);let r=c();return u(r.VM.Elemento.apellidos=e)}),n(),t(38,"label",15),o(39,"Apellidos:"),n(),t(40,"output",12),o(41),M(42,"errormsg"),n()(),t(43,"div",16)(44,"input",17,18),p("ngModelChange",function(e){g(l);let r=c();return u(r.VM.Elemento.telefono=e)}),n(),t(46,"label",19),o(47,"Tel\xE9fono:"),n(),t(48,"output",12),o(49),M(50,"errormsg"),n()(),t(51,"div",20)(52,"input",21,22),p("ngModelChange",function(e){g(l);let r=c();return u(r.VM.Elemento.email=e)}),n(),t(54,"label",23),o(55,"Correo:"),n(),t(56,"output",12),o(57),M(58,"errormsg"),n()(),t(59,"div",16)(60,"input",24,25),p("ngModelChange",function(e){g(l);let r=c();return u(r.VM.Elemento.nacimiento=e)}),n(),t(62,"label",26),o(63,"F. Nacimiento:"),n(),t(64,"output",12),o(65),M(66,"errormsg"),n()(),t(67,"div",27)(68,"div",28),o(69,"Sexo:"),n(),t(70,"div",29)(71,"div",30)(72,"input",31),p("ngModelChange",function(e){g(l);let r=c();return u(r.VM.Elemento.sexo=e)}),n(),t(73,"label",32),o(74,"Hombre"),n()(),t(75,"div",30)(76,"input",33),p("ngModelChange",function(e){g(l);let r=c();return u(r.VM.Elemento.sexo=e)}),n(),t(77,"label",34),o(78,"Mujer"),n()()()(),t(79,"div",27)(80,"div",28),o(81,"Situaci\xF3n:"),n(),t(82,"div",35)(83,"input",36,37),p("ngModelChange",function(e){g(l);let r=c();return u(r.VM.Elemento.conflictivo=e)}),n(),t(85,"label",38),o(86,"Conflictivo"),n()()(),t(87,"div",39)(88,"input",40,41),p("ngModelChange",function(e){g(l);let r=c();return u(r.VM.Elemento.avatar=e)}),n(),t(90,"label",42),o(91,"Avatar:"),n(),t(92,"output",12),o(93),M(94,"errormsg"),n()(),t(95,"div",43)(96,"input",44),p("click",function(){g(l);let e=c();return u(e.VM.send())}),n(),t(97,"input",45),p("click",function(){g(l);let e=c();return u(e.VM.cancel())}),n()()()}if(d&2){let l=_(1),i=_(29),e=_(37),r=_(45),h=_(53),C=_(61),b=_(89),f=c();s(2),y(2,f.VM.Modo==="add"?2:3),s(3),m("ngModel",f.VM.Elemento.tratamiento),s(23),E("is-invalid",i.invalid),m("ngModel",f.VM.Elemento.nombre),s(4),m("hidden",i.valid),s(1),v(V(34,36,i.errors)),s(3),E("is-invalid",e.invalid),m("ngModel",f.VM.Elemento.apellidos),s(4),m("hidden",e.valid),s(1),v(V(42,38,e.errors)),s(3),E("is-invalid",r.invalid),m("ngModel",f.VM.Elemento.telefono),s(4),m("hidden",r.valid),s(1),v(D(50,40,r.errors,"El formato debe ser: 555 999 999")),s(3),E("is-invalid",h.invalid),m("ngModel",f.VM.Elemento.email),s(4),m("hidden",h.valid),s(1),v(V(58,43,h.errors)),s(3),E("is-invalid",C.invalid),m("ngModel",f.VM.Elemento.nacimiento),s(4),m("hidden",C.valid),s(1),v(V(66,45,C.errors)),s(7),m("ngModel",f.VM.Elemento.sexo),s(4),m("ngModel",f.VM.Elemento.sexo),s(7),m("ngModel",f.VM.Elemento.conflictivo),s(5),E("is-invalid",b.invalid),m("ngModel",f.VM.Elemento.avatar),s(4),m("hidden",b.valid),s(1),v(V(94,47,b.errors)),s(3),m("disabled",l.invalid)}}function et(d,a){d&1&&(t(0,"h2"),o(1,"Sin datos"),n())}function tt(d,a){if(d&1){let l=T();t(0,"div",4)(1,"input",46,47),p("ngModelChange",function(e){g(l);let r=c(2);return u(r.VM.Elemento.id=e)}),n(),t(3,"label",48),o(4,"C\xF3digo:"),n(),t(5,"output",12),o(6),M(7,"errormsg"),n()()}if(d&2){let l=_(2);c();let i=_(1),e=c();s(1),E("is-invalid",l.invalid&&i.dirty),m("ngModel",e.VM.Elemento.id),s(4),m("hidden",l.valid),s(1),v(V(7,5,l.errors))}}function nt(d,a){if(d&1&&(t(0,"div",49)(1,"label",50),o(2,"C\xF3digo:"),n(),x(3,"output",51),n()),d&2){let l=c(2);s(3),m("textContent",l.VM.Elemento.id)}}function it(d,a){if(d&1){let l=T();t(0,"form",1,2),w(2,tt,8,7,"div",3)(3,nt,4,1),t(4,"div",4)(5,"select",5,6),p("ngModelChange",function(e){g(l);let r=c();return u(r.VM.Elemento.tratamiento=e)}),t(7,"option"),o(8,"Sr."),n(),t(9,"option"),o(10,"Sra."),n(),t(11,"option"),o(12,"Srta."),n(),t(13,"option"),o(14,"Dr."),n(),t(15,"option"),o(16,"Dra."),n(),t(17,"option"),o(18,"Ilmo."),n(),t(19,"option"),o(20,"Ilma."),n(),t(21,"option"),o(22,"Excmo."),n(),t(23,"option"),o(24,"Excma."),n()(),t(25,"label",7),o(26,"Tratamiento:"),n()(),t(27,"div",8)(28,"input",9,10),p("ngModelChange",function(e){g(l);let r=c();return u(r.VM.Elemento.nombre=e)}),n(),t(30,"label",11),o(31,"Nombre:"),n(),t(32,"output",12),o(33),M(34,"errormsg"),n()(),t(35,"div",8)(36,"input",13,14),p("ngModelChange",function(e){g(l);let r=c();return u(r.VM.Elemento.apellidos=e)}),n(),t(38,"label",15),o(39,"Apellidos:"),n(),t(40,"output",12),o(41),M(42,"errormsg"),n()(),t(43,"div",16)(44,"input",17,18),p("ngModelChange",function(e){g(l);let r=c();return u(r.VM.Elemento.telefono=e)}),n(),t(46,"label",19),o(47,"Tel\xE9fono:"),n(),t(48,"output",12),o(49),M(50,"errormsg"),n()(),t(51,"div",20)(52,"input",21,22),p("ngModelChange",function(e){g(l);let r=c();return u(r.VM.Elemento.email=e)}),n(),t(54,"label",23),o(55,"Correo:"),n(),t(56,"output",12),o(57),M(58,"errormsg"),n()(),t(59,"div",16)(60,"input",24,25),p("ngModelChange",function(e){g(l);let r=c();return u(r.VM.Elemento.nacimiento=e)}),n(),t(62,"label",26),o(63,"F. Nacimiento:"),n(),t(64,"output",12),o(65),M(66,"errormsg"),n()(),t(67,"div",27)(68,"div",28),o(69,"Sexo:"),n(),t(70,"div",29)(71,"div",30)(72,"input",31),p("ngModelChange",function(e){g(l);let r=c();return u(r.VM.Elemento.sexo=e)}),n(),t(73,"label",32),o(74,"Hombre"),n()(),t(75,"div",30)(76,"input",33),p("ngModelChange",function(e){g(l);let r=c();return u(r.VM.Elemento.sexo=e)}),n(),t(77,"label",34),o(78,"Mujer"),n()()()(),t(79,"div",27)(80,"div",28),o(81,"Situaci\xF3n:"),n(),t(82,"div",35)(83,"input",36,37),p("ngModelChange",function(e){g(l);let r=c();return u(r.VM.Elemento.conflictivo=e)}),n(),t(85,"label",38),o(86,"Conflictivo"),n()()(),t(87,"div",39)(88,"input",40,41),p("ngModelChange",function(e){g(l);let r=c();return u(r.VM.Elemento.avatar=e)}),n(),t(90,"label",42),o(91,"Avatar:"),n(),t(92,"output",12),o(93),M(94,"errormsg"),n()(),t(95,"div",43)(96,"input",44),p("click",function(){g(l);let e=c();return u(e.VM.send())}),n(),t(97,"input",45),p("click",function(){g(l);let e=c();return u(e.VM.cancel())}),n()()()}if(d&2){let l=_(1),i=_(29),e=_(37),r=_(45),h=_(53),C=_(61),b=_(89),f=c();s(2),y(2,f.VM.Modo==="add"?2:3),s(3),m("ngModel",f.VM.Elemento.tratamiento),s(23),E("is-invalid",i.invalid),m("ngModel",f.VM.Elemento.nombre),s(4),m("hidden",i.valid),s(1),v(V(34,36,i.errors)),s(3),E("is-invalid",e.invalid),m("ngModel",f.VM.Elemento.apellidos),s(4),m("hidden",e.valid),s(1),v(V(42,38,e.errors)),s(3),E("is-invalid",r.invalid),m("ngModel",f.VM.Elemento.telefono),s(4),m("hidden",r.valid),s(1),v(D(50,40,r.errors,"El formato debe ser: 555 999 999")),s(3),E("is-invalid",h.invalid),m("ngModel",f.VM.Elemento.email),s(4),m("hidden",h.valid),s(1),v(V(58,43,h.errors)),s(3),E("is-invalid",C.invalid),m("ngModel",f.VM.Elemento.nacimiento),s(4),m("hidden",C.valid),s(1),v(V(66,45,C.errors)),s(7),m("ngModel",f.VM.Elemento.sexo),s(4),m("ngModel",f.VM.Elemento.sexo),s(7),m("ngModel",f.VM.Elemento.conflictivo),s(5),E("is-invalid",b.invalid),m("ngModel",f.VM.Elemento.avatar),s(4),m("hidden",b.valid),s(1),v(V(94,47,b.errors)),s(3),m("disabled",l.invalid)}}function ot(d,a){d&1&&(t(0,"h2"),o(1,"Sin datos"),n())}function rt(d,a){if(d&1){let l=T();t(0,"div",1)(1,"div",2)(2,"div",3)(3,"div",1)(4,"div",4)(5,"img",5),p("error",function(e){g(l);let r=c();return u(r.VM.imageErrorHandler(e,r.VM.Elemento))}),n()(),t(6,"div",6)(7,"h4"),o(8),n(),t(9,"p",7)(10,"small",8),x(11,"i",9),o(12,"Persona conflictiva"),n()(),t(13,"p"),x(14,"i",10),o(15),x(16,"br")(17,"i",11),t(18,"a",12),o(19),n(),x(20,"br")(21,"i",13),o(22),M(23,"date"),n(),t(24,"div",14)(25,"button",15),o(26," Social"),n(),t(27,"button",16),x(28,"span",17),t(29,"span",18),o(30,"Social"),n()(),t(31,"ul",19)(32,"li")(33,"a",20),o(34,"Twitter"),n()(),t(35,"li")(36,"a",21),o(37,"Google +"),n()(),t(38,"li")(39,"a",22),o(40,"Facebook"),n()(),x(41,"li",23),t(42,"li")(43,"a",20),o(44,"Github"),n()()(),t(45,"input",24),p("click",function(){g(l);let e=c();return u(e.VM.cancel())}),n()()()()()()()}if(d&2){let l=c();s(5),q("src",l.VM.Elemento.avatar,j),U("alt","Foto de ",l.VM.Elemento.nombre," ",l.VM.Elemento.apellidos,""),s(3),z("",l.VM.Elemento.tratamiento," ",l.VM.Elemento.nombre," ",l.VM.Elemento.apellidos,""),s(1),m("hidden",!l.VM.Elemento.conflictivo),s(6),P("",l.VM.Elemento.telefono," "),s(3),ve("href","mailto:",l.VM.Elemento.email,"",j),s(1),v(l.VM.Elemento.email),s(3),P("",D(23,11,l.VM.Elemento.nacimiento,"dd/MM/yyyy")," ")}}function at(d,a){d&1&&(t(0,"h2"),o(1,"Sin datos"),n())}var Le=(()=>{let a=class a{constructor(i){this.vm=i}get VM(){return this.vm}ngOnInit(){this.vm.load()}ngOnDestroy(){this.vm.clear()}};a.\u0275fac=function(e){return new(e||a)(S(F))},a.\u0275cmp=I({type:a,selectors:[["app-contactos"]],standalone:!0,features:[A],decls:4,vars:1,template:function(e,r){if(e&1&&w(0,He,1,0)(1,qe,1,0)(2,Ue,1,0)(3,ze,1,0),e&2){let h;y(0,(h=r.VM.Modo)==="add"?0:h==="edit"?1:h==="view"?2:3)}},dependencies:()=>[R,L,$,O]});let d=a;return d})(),O=(()=>{let a=class a{constructor(i){this.vm=i,this.page=0}get VM(){return this.vm}ngOnChanges(i){this.vm.load(this.page)}ngOnDestroy(){this.vm.clear()}};a.\u0275fac=function(e){return new(e||a)(S(F))},a.\u0275cmp=I({type:a,selectors:[["app-contactos-list"]],inputs:{page:"page"},standalone:!0,features:[H,A],decls:11,vars:5,consts:[[1,"table","table-striped","table-hover"],[1,"table-info"],[1,"display-4"],[1,"text-end"],["class","btn btn-success","routerLink","add"],[3,"first","rows","totalRecords","pageLinkSize","onPageChange"],["routerLink","add",1,"btn","btn-success"],[1,"fas","fa-plus"],[1,"container"],[1,"row"],[1,"col-md-2"],["width","75","height","75",1,"rounded-circle","float-left",3,"src","alt"],[1,"col-md-10"],[1,"btn","btn-link","btn-lg","px-0",3,"routerLink"],[1,"align-middle","text-end"],["class","btn-group","role","group"],["role","group",1,"btn-group"],[1,"btn","btn-success",3,"routerLink"],[1,"fas","fa-pen"],[1,"btn","btn-danger",3,"click"],[1,"far","fa-trash-alt"]],template:function(e,r){e&1&&(t(0,"table",0)(1,"thead")(2,"tr",1)(3,"th",2),o(4,"Lista de contactos"),n(),t(5,"th",3),w(6,Je,3,0,"button",4),n()()(),t(7,"tbody"),he(8,We,18,12,"tr",null,Ge),n()(),t(10,"p-paginator",5),p("onPageChange",function(C){return r.VM.pageChange(C.page)}),n()),e&2&&(s(6),y(6,r.VM.auth.isAutenticated?6:-1),s(2),xe(r.VM.Listado),s(2),m("first",r.VM.rowsPerPage*r.VM.page)("rows",r.VM.rowsPerPage)("totalRecords",r.VM.totalRows)("pageLinkSize",5))},dependencies:[we,Ne,Pe]});let d=a;return d})(),R=(()=>{let a=class a{constructor(i){this.vm=i}get VM(){return this.vm}ngOnInit(){this.vm.add()}};a.\u0275fac=function(e){return new(e||a)(S(F))},a.\u0275cmp=I({type:a,selectors:[["app-contactos-add"]],standalone:!0,features:[A],decls:4,vars:1,consts:[["class","row gy-2 gx-2 align-items-start"],[1,"row","gy-2","gx-2","align-items-start"],["miForm","ngForm"],["class","form-floating col-md-2"],[1,"form-floating","col-md-2"],["name","tratamiento","id","tratamiento",1,"form-control","form-select",3,"ngModel","ngModelChange"],["tratamiento","ngModel"],["for","tratamiento"],[1,"form-floating","col-md-4"],["type","text","name","nombre","id","nombre","required","","minlength","2","maxlength","50","placeholder"," ",1,"form-control",3,"ngModel","ngModelChange"],["nombre","ngModel"],["for","nombre"],[1,"invalid-feedback",3,"hidden"],["type","text","name","apellidos","id","apellidos","minlength","2","maxlength","50","placeholder"," ",1,"form-control",3,"ngModel","ngModelChange"],["apellidos","ngModel"],["for","apellidos"],[1,"form-floating","col-md-3","col-lg-2"],["type","tel","name","telefono","id","telefono","pattern","^(\\d{3}\\s){2}\\d{3}$","placeholder"," ",1,"form-control",3,"ngModel","ngModelChange"],["telefono","ngModel"],["for","telefono",1,"form-label"],[1,"form-floating","col-md-6","col-lg-4"],["type","email","name","email","id","email","email","","maxlength","100","placeholder"," ",1,"form-control",3,"ngModel","ngModelChange"],["email","ngModel"],["for","email",1,"form-label"],["type","date","name","nacimiento","id","nacimiento","placeholder"," ",1,"form-control",3,"ngModel","ngModelChange"],["nacimiento","ngModel"],["for","nacimiento",1,"form-label"],[1,"col-md-4","col-lg-2"],[1,"col-form-label-sm","d-inline","d-lg-block"],[1,"ms-2","d-inline"],[1,"form-check","form-check-inline"],["type","radio","name","sexo","id","sexo1","value","H",1,"form-check-input",3,"ngModel","ngModelChange"],["for","sexo1",1,"form-check-label"],["type","radio","name","sexo","id","sexo2","value","M",1,"form-check-input",3,"ngModel","ngModelChange"],["for","sexo2",1,"form-check-label"],[1,"ms-2","form-check","form-check-inline","form-switch"],["type","checkbox","id","conflictivo","name","conflictivo",1,"form-check-input",3,"ngModel","ngModelChange"],["conflictivo","ngModel"],["for","conflictivo",1,"form-check-label"],[1,"form-floating","col-md-12"],["type","url","name","avatar","id","avatar","maxlength","500","placeholder"," ",1,"form-control",3,"ngModel","ngModelChange"],["avatar","ngModel"],["for","avatar",1,"form-label"],[1,"mt-2"],["type","button","value","Enviar",1,"btn","btn-success",3,"disabled","click"],["type","button","value","Volver",1,"btn","btn-info",3,"click"],["type","number","name","id","id","id","required","","min","0","placeholder"," ",1,"form-control",3,"ngModel","ngModelChange"],["id","ngModel"],["for","id"],[1,"col-md-2"],["for","id",1,"form-label-sm"],[1,"d-block",3,"textContent"]],template:function(e,r){e&1&&(t(0,"h1"),o(1,"Contacto"),n(),w(2,Ze,98,49,"form",0)(3,et,2,0)),e&2&&(s(2),y(2,r.VM.Elemento?2:3))},dependencies:[pe,ee,oe,re,K,te,Q,ie,ne,W,X,le,se,me,ce,de,ae,Z,Y,ge,J]});let d=a;return d})(),L=(()=>{let a=class a{constructor(i,e,r){this.vm=i,this.route=e,this.router=r}get VM(){return this.vm}ngOnInit(){this.obs$=this.route.paramMap.subscribe(i=>{let e=parseInt(i?.get("id")??"");e?this.vm.edit(e):this.router.navigate(["/404.html"])})}ngOnDestroy(){this.obs$.unsubscribe()}};a.\u0275fac=function(e){return new(e||a)(S(F),S(Se),S(N))},a.\u0275cmp=I({type:a,selectors:[["app-contactos-edit"]],standalone:!0,features:[A],decls:4,vars:1,consts:[["class","row gy-2 gx-2 align-items-start"],[1,"row","gy-2","gx-2","align-items-start"],["miForm","ngForm"],["class","form-floating col-md-2"],[1,"form-floating","col-md-2"],["name","tratamiento","id","tratamiento",1,"form-control","form-select",3,"ngModel","ngModelChange"],["tratamiento","ngModel"],["for","tratamiento"],[1,"form-floating","col-md-4"],["type","text","name","nombre","id","nombre","required","","minlength","2","maxlength","50","placeholder"," ",1,"form-control",3,"ngModel","ngModelChange"],["nombre","ngModel"],["for","nombre"],[1,"invalid-feedback",3,"hidden"],["type","text","name","apellidos","id","apellidos","minlength","2","maxlength","50","placeholder"," ",1,"form-control",3,"ngModel","ngModelChange"],["apellidos","ngModel"],["for","apellidos"],[1,"form-floating","col-md-3","col-lg-2"],["type","tel","name","telefono","id","telefono","pattern","^(\\d{3}\\s){2}\\d{3}$","placeholder"," ",1,"form-control",3,"ngModel","ngModelChange"],["telefono","ngModel"],["for","telefono",1,"form-label"],[1,"form-floating","col-md-6","col-lg-4"],["type","email","name","email","id","email","email","","maxlength","100","placeholder"," ",1,"form-control",3,"ngModel","ngModelChange"],["email","ngModel"],["for","email",1,"form-label"],["type","date","name","nacimiento","id","nacimiento","placeholder"," ",1,"form-control",3,"ngModel","ngModelChange"],["nacimiento","ngModel"],["for","nacimiento",1,"form-label"],[1,"col-md-4","col-lg-2"],[1,"col-form-label-sm","d-inline","d-lg-block"],[1,"ms-2","d-inline"],[1,"form-check","form-check-inline"],["type","radio","name","sexo","id","sexo1","value","H",1,"form-check-input",3,"ngModel","ngModelChange"],["for","sexo1",1,"form-check-label"],["type","radio","name","sexo","id","sexo2","value","M",1,"form-check-input",3,"ngModel","ngModelChange"],["for","sexo2",1,"form-check-label"],[1,"ms-2","form-check","form-check-inline","form-switch"],["type","checkbox","id","conflictivo","name","conflictivo",1,"form-check-input",3,"ngModel","ngModelChange"],["conflictivo","ngModel"],["for","conflictivo",1,"form-check-label"],[1,"form-floating","col-md-12"],["type","url","name","avatar","id","avatar","maxlength","500","placeholder"," ",1,"form-control",3,"ngModel","ngModelChange"],["avatar","ngModel"],["for","avatar",1,"form-label"],[1,"mt-2"],["type","button","value","Enviar",1,"btn","btn-success",3,"disabled","click"],["type","button","value","Volver",1,"btn","btn-info",3,"click"],["type","number","name","id","id","id","required","","min","0","placeholder"," ",1,"form-control",3,"ngModel","ngModelChange"],["id","ngModel"],["for","id"],[1,"col-md-2"],["for","id",1,"form-label-sm"],[1,"d-block",3,"textContent"]],template:function(e,r){e&1&&(t(0,"h1"),o(1,"Contacto"),n(),w(2,it,98,49,"form",0)(3,ot,2,0)),e&2&&(s(2),y(2,r.VM.Elemento?2:3))},dependencies:[pe,ee,oe,re,K,te,Q,ie,ne,W,X,le,se,me,ce,de,ae,Z,Y,ge,J]});let d=a;return d})(),$=(()=>{let a=class a{constructor(i,e){this.vm=i,this.router=e}get VM(){return this.vm}ngOnChanges(i){this.id?this.vm.view(+this.id):this.router.navigate(["/404.html"])}};a.\u0275fac=function(e){return new(e||a)(S(F),S(N))},a.\u0275cmp=I({type:a,selectors:[["app-contactos-view"]],inputs:{id:"id"},standalone:!0,features:[H,A],decls:4,vars:1,consts:[["class","row"],[1,"row"],[1,"col-xs-12","col-sm-6","col-md-6"],[1,"well","well-sm"],[1,"col-sm-6","col-md-4"],[1,"rounded",3,"src","alt","error"],[1,"col-sm-6","col-md-8"],[3,"hidden"],[1,"text-danger"],[1,"fas","fa-skull-crossbones","mr-2"],[1,"fas","fa-phone-alt","mr-2"],[1,"fas","fa-envelope","mr-2"],[3,"href"],[1,"fas","fa-gifts","mr-2"],[1,"btn-group"],["type","button",1,"btn","btn-primary"],["type","button","data-toggle","dropdown",1,"btn","btn-primary","dropdown-toggle"],[1,"caret"],[1,"sr-only"],["role","menu",1,"dropdown-menu"],["href","#"],["href","https://plus.google.com/+Jquery2dotnet/posts"],["href","https://www.facebook.com/jquery2dotnet"],[1,"divider"],["type","button","value","Volver",1,"btn","btn-secondary",3,"click"]],template:function(e,r){e&1&&(t(0,"h1"),o(1,"Contacto"),n(),w(2,rt,46,14,"div",0)(3,at,2,0)),e&2&&(s(2),y(2,r.VM.Elemento?2:3))},dependencies:[Ve]});let d=a;return d})();var dt=[{path:"",component:O,canActivate:[Fe("Administradores")]},{path:"add",component:R},{path:":id/edit",component:L},{path:":id",component:$},{path:":id/:kk",component:$}],yt=(()=>{let a=class a{};a.\u0275fac=function(e){return new(e||a)},a.\u0275mod=_e({type:a}),a.\u0275inj=Ce({imports:[Le,O,R,L,G.forChild(dt),G]});let d=a;return d})();export{yt as ContactosModule,dt as routes};
