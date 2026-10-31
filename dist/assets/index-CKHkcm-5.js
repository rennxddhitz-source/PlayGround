(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const Zo="187",Cu=0,Xl=1,Pu=2,Bs=1,Lu=2,Ns=3,Ei=0,nn=1,We=2,Si=0,zs=1,en=2,ql=3,Yl=4,Du=5,es=100,Iu=101,Nu=102,Uu=103,Fu=104,Ou=200,Bu=201,zu=202,ku=203,mh=204,gh=205,Gu=206,Hu=207,Vu=208,Wu=209,Xu=210,qu=211,Yu=212,Zu=213,Ku=214,ja=0,to=1,eo=2,Xs=3,no=4,io=5,so=6,ro=7,_h=0,Ju=1,$u=2,Xn=0,Ko=1,Jo=2,$o=3,fa=4,Qo=5,jo=6,tl=7,xh=300,as=301,qs=302,qr=303,va=304,wi=1e3,En=1001,ao=1002,Xe=1003,Qu=1004,lr=1005,qe=1006,Ma=1007,Wn=1008,fn=1009,vh=1010,Mh=1011,Ys=1012,el=1013,In=1014,wn=1015,on=1016,nl=1017,il=1018,os=1020,Sh=35902,yh=35899,bh=1021,Eh=1022,dn=1023,ci=1026,oi=1027,sl=1028,rl=1029,Ti=1030,al=1031,ol=1033,Yr=33776,Zr=33777,Kr=33778,Jr=33779,oo=35840,lo=35841,co=35842,ho=35843,uo=36196,fo=37492,po=37496,mo=37488,go=37489,ta=37490,_o=37491,xo=37808,vo=37809,Mo=37810,So=37811,yo=37812,bo=37813,Eo=37814,wo=37815,To=37816,Ao=37817,Ro=37818,Co=37819,Po=37820,Lo=37821,Do=36492,Io=36494,No=36495,Uo=36283,Fo=36284,ea=36285,Oo=36286,ju=3200,Bo=0,tf=1,ri="",He="srgb",na="srgb-linear",ia="linear",_e="srgb",Sa=7680,ef=519,nf=512,sf=513,rf=514,wh=515,af=516,of=517,Th=518,Ah=519,Rh=35044,Zl="300 es",Tn=2e3,Zs=2001;function lf(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function sa(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function cf(){const i=sa("canvas");return i.style.display="block",i}const Kl={};function ra(...i){const t="THREE."+i.shift();console.log(t,...i)}function Ch(i){const t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Zt(...i){i=Ch(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function he(...i){i=Ch(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function $r(...i){const t=i.join(" ");t in Kl||(Kl[t]=!0,Zt(...i))}function hf(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const uf={[ja]:ja,[eo]:so,[no]:no,[Xs]:io,[to]:to,[so]:eo,[ro]:ro,[io]:Xs};class Ci{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Ke=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Jl=1234567;const ks=Math.PI/180,Ks=180/Math.PI;function Kn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ke[i&255]+Ke[i>>8&255]+Ke[i>>16&255]+Ke[i>>24&255]+"-"+Ke[t&255]+Ke[t>>8&255]+"-"+Ke[t>>16&15|64]+Ke[t>>24&255]+"-"+Ke[e&63|128]+Ke[e>>8&255]+"-"+Ke[e>>16&255]+Ke[e>>24&255]+Ke[n&255]+Ke[n>>8&255]+Ke[n>>16&255]+Ke[n>>24&255]).toLowerCase()}function se(i,t,e){return Math.max(t,Math.min(e,i))}function ll(i,t){return(i%t+t)%t}function ff(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function df(i,t,e){return i!==t?(e-i)/(t-i):0}function Gs(i,t,e){return(1-e)*i+e*t}function pf(i,t,e,n){return Gs(i,t,1-Math.exp(-e*n))}function mf(i,t=1){return t-Math.abs(ll(i,t*2)-t)}function gf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function _f(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function xf(i,t){return i+Math.floor(Math.random()*(t-i+1))}function vf(i,t){return i+Math.random()*(t-i)}function Mf(i){return i*(.5-Math.random())}function Sf(i){i!==void 0&&(Jl=i);let t=Jl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function yf(i){return i*ks}function bf(i){return i*Ks}function Ef(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function wf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Ph(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Tf(i,t,e,n,s){const r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),h=a((t+n)/2),u=r((t-n)/2),f=a((t-n)/2),d=r((n-t)/2),g=a((n-t)/2);switch(s){case"XYX":i.set(o*h,l*u,l*f,o*c);break;case"YZY":i.set(l*f,o*h,l*u,o*c);break;case"ZXZ":i.set(l*u,l*f,o*h,o*c);break;case"XZX":i.set(o*h,l*g,l*d,o*c);break;case"YXY":i.set(l*d,o*h,l*g,o*c);break;case"ZYZ":i.set(l*g,l*d,o*h,o*c);break;default:Zt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function da(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function cl(i,t){if(t.constructor===Float32Array)return i;const e=da(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/e,-1)}function hl(i,t){if(t.constructor===Float32Array)return i;const e=da(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*e)}const Cn={DEG2RAD:ks,RAD2DEG:Ks,generateUUID:Kn,clamp:se,euclideanModulo:ll,mapLinear:ff,inverseLerp:df,lerp:Gs,damp:pf,pingpong:mf,smoothstep:gf,smootherstep:_f,randInt:xf,randFloat:vf,randFloatSpread:Mf,seededRandom:Sf,degToRad:yf,radToDeg:bf,isPowerOfTwo:Ef,ceilPowerOfTwo:wf,floorPowerOfTwo:Ph,setQuaternionFromProperEuler:Tf,normalize:hl,denormalize:cl},Cl=class Cl{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=se(this.x,t.x,e.x),this.y=se(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=se(this.x,t,e),this.y=se(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(se(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(se(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Cl.prototype.isVector2=!0;let ft=Cl;class fs{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3],f=r[a+0],d=r[a+1],g=r[a+2],M=r[a+3];if(u!==M||l!==f||c!==d||h!==g){let m=l*f+c*d+h*g+u*M;m<0&&(f=-f,d=-d,g=-g,M=-M,m=-m);let p=1-o;if(m<.9995){const S=Math.acos(m),w=Math.sin(S);p=Math.sin(p*S)/w,o=Math.sin(o*S)/w,l=l*p+f*o,c=c*p+d*o,h=h*p+g*o,u=u*p+M*o}else{l=l*p+f*o,c=c*p+d*o,h=h*p+g*o,u=u*p+M*o;const S=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=S,c*=S,h*=S,u*=S}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[a],f=r[a+1],d=r[a+2],g=r[a+3];return t[e]=o*g+h*u+l*d-c*f,t[e+1]=l*g+h*f+c*u-o*d,t[e+2]=c*g+h*d+o*f-l*u,t[e+3]=h*g-o*u-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),u=o(r/2),f=l(n/2),d=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=f*h*u+c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u+f*d*g;break;case"YZX":this._x=f*h*u+c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u-f*d*g;break;case"XZY":this._x=f*h*u-c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u+f*d*g;break;default:Zt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=n+o+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(a-s)*d}else if(n>o&&n>u){const d=2*Math.sqrt(1+n-o-u);this._w=(h-l)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+c)/d}else if(o>u){const d=2*Math.sqrt(1+o-n-u);this._w=(r-c)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(l+h)/d}else{const d=2*Math.sqrt(1+u-n-o);this._w=(a-s)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(se(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Pl=class Pl{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion($l.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion($l.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),h=2*(o*e-r*s),u=2*(r*n-a*e);return this.x=e+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=s+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=se(this.x,t.x,e.x),this.y=se(this.y,t.y,e.y),this.z=se(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=se(this.x,t,e),this.y=se(this.y,t,e),this.z=se(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(se(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return ya.copy(this).projectOnVector(t),this.sub(ya)}reflect(t){return this.sub(ya.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(se(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Pl.prototype.isVector3=!0;let C=Pl;const ya=new C,$l=new fs,Ll=class Ll{constructor(t,e,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],d=n[5],g=n[8],M=s[0],m=s[3],p=s[6],S=s[1],w=s[4],v=s[7],A=s[2],T=s[5],_=s[8];return r[0]=a*M+o*S+l*A,r[3]=a*m+o*w+l*T,r[6]=a*p+o*v+l*_,r[1]=c*M+h*S+u*A,r[4]=c*m+h*w+u*T,r[7]=c*p+h*v+u*_,r[2]=f*M+d*S+g*A,r[5]=f*m+d*w+g*T,r[8]=f*p+d*v+g*_,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,f=o*l-h*r,d=c*r-a*l,g=e*u+n*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/g;return t[0]=u*M,t[1]=(s*c-h*n)*M,t[2]=(o*n-s*a)*M,t[3]=f*M,t[4]=(h*e-s*l)*M,t[5]=(s*r-o*e)*M,t[6]=d*M,t[7]=(n*l-c*e)*M,t[8]=(a*e-n*r)*M,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return $r("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ba.makeScale(t,e)),this}rotate(t){return $r("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ba.makeRotation(-t)),this}translate(t,e){return $r("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ba.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Ll.prototype.isMatrix3=!0;let Jt=Ll;const ba=new Jt,Ql=new Jt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),jl=new Jt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Af(){const i={enabled:!0,workingColorSpace:na,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===_e&&(s.r=qn(s.r),s.g=qn(s.g),s.b=qn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===_e&&(s.r=is(s.r),s.g=is(s.g),s.b=is(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ri?ia:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[na]:{primaries:t,whitePoint:n,transfer:ia,toXYZ:Ql,fromXYZ:jl,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:He},outputColorSpaceConfig:{drawingBufferColorSpace:He}},[He]:{primaries:t,whitePoint:n,transfer:_e,toXYZ:Ql,fromXYZ:jl,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:He}}}),i}const oe=Af();function qn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function is(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Ii;class Rf{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Ii===void 0&&(Ii=sa("canvas")),Ii.width=t.width,Ii.height=t.height;const s=Ii.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Ii}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=sa("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=qn(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(qn(e[n]/255)*255):e[n]=qn(e[n]);return{data:e,width:t.width,height:t.height}}else return Zt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Cf=0;class ul{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Cf++}),this.uuid=Kn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ea(s[a].image)):r.push(Ea(s[a]))}else r=Ea(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Ea(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Rf.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Zt("Texture: Unable to serialize Texture."),{})}let Pf=0;const wa=new C;class $e extends Ci{constructor(t=$e.DEFAULT_IMAGE,e=$e.DEFAULT_MAPPING,n=En,s=En,r=qe,a=Wn,o=dn,l=fn,c=$e.DEFAULT_ANISOTROPY,h=ri){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Pf++}),this.uuid=Kn(),this.name="",this.source=new ul(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ft(0,0),this.repeat=new ft(1,1),this.center=new ft(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Jt,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(wa).x}get height(){return this.source.getSize(wa).y}get depth(){return this.source.getSize(wa).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){Zt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Zt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==xh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case wi:t.x=t.x-Math.floor(t.x);break;case En:t.x=t.x<0?0:1;break;case ao:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case wi:t.y=t.y-Math.floor(t.y);break;case En:t.y=t.y<0?0:1;break;case ao:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}$e.DEFAULT_IMAGE=null;$e.DEFAULT_MAPPING=xh;$e.DEFAULT_ANISOTROPY=1;const Dl=class Dl{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],d=l[5],g=l[9],M=l[2],m=l[6],p=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-M)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+M)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const w=(c+1)/2,v=(d+1)/2,A=(p+1)/2,T=(h+f)/4,_=(u+M)/4,b=(g+m)/4;return w>v&&w>A?w<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(w),s=T/n,r=_/n):v>A?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=T/s,r=b/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=_/r,s=b/r),this.set(n,s,r,e),this}let S=Math.sqrt((m-g)*(m-g)+(u-M)*(u-M)+(f-h)*(f-h));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(u-M)/S,this.z=(f-h)/S,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=se(this.x,t.x,e.x),this.y=se(this.y,t.y,e.y),this.z=se(this.z,t.z,e.z),this.w=se(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=se(this.x,t,e),this.y=se(this.y,t,e),this.z=se(this.z,t,e),this.w=se(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(se(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Dl.prototype.isVector4=!0;let Re=Dl;class Lf extends Ci{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:qe,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Re(0,0,t,e),this.scissorTest=!1,this.viewport=new Re(0,0,t,e),this.textures=[];const s=n.count;for(let r=0;r<s;r++)this.textures[r]=new $e({width:t,height:e,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:qe,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new ul(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ln extends Lf{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Lh extends $e{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Xe,this.minFilter=Xe,this.wrapR=En,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Df extends $e{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Xe,this.minFilter=Xe,this.wrapR=En,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}const ua=class ua{constructor(t,e,n,s,r,a,o,l,c,h,u,f,d,g,M,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,h,u,f,d,g,M,m)}set(t,e,n,s,r,a,o,l,c,h,u,f,d,g,M,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=g,p[11]=M,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ua().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,n=t.elements,s=1/Ni.setFromMatrixColumn(t,0).length(),r=1/Ni.setFromMatrixColumn(t,1).length(),a=1/Ni.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=a*h,d=a*u,g=o*h,M=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=d+g*c,e[5]=f-M*c,e[9]=-o*l,e[2]=M-f*c,e[6]=g+d*c,e[10]=a*l}else if(t.order==="YXZ"){const f=l*h,d=l*u,g=c*h,M=c*u;e[0]=f+M*o,e[4]=g*o-d,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=d*o-g,e[6]=M+f*o,e[10]=a*l}else if(t.order==="ZXY"){const f=l*h,d=l*u,g=c*h,M=c*u;e[0]=f-M*o,e[4]=-a*u,e[8]=g+d*o,e[1]=d+g*o,e[5]=a*h,e[9]=M-f*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const f=a*h,d=a*u,g=o*h,M=o*u;e[0]=l*h,e[4]=g*c-d,e[8]=f*c+M,e[1]=l*u,e[5]=M*c+f,e[9]=d*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const f=a*l,d=a*c,g=o*l,M=o*c;e[0]=l*h,e[4]=M-f*u,e[8]=g*u+d,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=d*u+g,e[10]=f-M*u}else if(t.order==="XZY"){const f=a*l,d=a*c,g=o*l,M=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+M,e[5]=a*h,e[9]=d*u-g,e[2]=g*u-d,e[6]=o*h,e[10]=M*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(If,t,Nf)}lookAt(t,e,n){const s=this.elements;return cn.subVectors(t,e),cn.lengthSq()===0&&(cn.z=1),cn.normalize(),jn.crossVectors(n,cn),jn.lengthSq()===0&&(Math.abs(n.z)===1?cn.x+=1e-4:cn.z+=1e-4,cn.normalize(),jn.crossVectors(n,cn)),jn.normalize(),cr.crossVectors(cn,jn),s[0]=jn.x,s[4]=cr.x,s[8]=cn.x,s[1]=jn.y,s[5]=cr.y,s[9]=cn.y,s[2]=jn.z,s[6]=cr.z,s[10]=cn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],d=n[13],g=n[2],M=n[6],m=n[10],p=n[14],S=n[3],w=n[7],v=n[11],A=n[15],T=s[0],_=s[4],b=s[8],L=s[12],R=s[1],D=s[5],z=s[9],W=s[13],N=s[2],H=s[6],J=s[10],k=s[14],j=s[3],$=s[7],nt=s[11],lt=s[15];return r[0]=a*T+o*R+l*N+c*j,r[4]=a*_+o*D+l*H+c*$,r[8]=a*b+o*z+l*J+c*nt,r[12]=a*L+o*W+l*k+c*lt,r[1]=h*T+u*R+f*N+d*j,r[5]=h*_+u*D+f*H+d*$,r[9]=h*b+u*z+f*J+d*nt,r[13]=h*L+u*W+f*k+d*lt,r[2]=g*T+M*R+m*N+p*j,r[6]=g*_+M*D+m*H+p*$,r[10]=g*b+M*z+m*J+p*nt,r[14]=g*L+M*W+m*k+p*lt,r[3]=S*T+w*R+v*N+A*j,r[7]=S*_+w*D+v*H+A*$,r[11]=S*b+w*z+v*J+A*nt,r[15]=S*L+w*W+v*k+A*lt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],d=t[14],g=t[3],M=t[7],m=t[11],p=t[15],S=l*d-c*f,w=o*d-c*u,v=o*f-l*u,A=a*d-c*h,T=a*f-l*h,_=a*u-o*h;return e*(M*S-m*w+p*v)-n*(g*S-m*A+p*T)+s*(g*w-M*A+p*_)-r*(g*v-M*T+m*_)}determinantAffine(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-n*(r*h-o*l)+s*(r*c-a*l)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],d=t[11],g=t[12],M=t[13],m=t[14],p=t[15],S=e*o-n*a,w=e*l-s*a,v=e*c-r*a,A=n*l-s*o,T=n*c-r*o,_=s*c-r*l,b=h*M-u*g,L=h*m-f*g,R=h*p-d*g,D=u*m-f*M,z=u*p-d*M,W=f*p-d*m,N=S*W-w*z+v*D+A*R-T*L+_*b;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const H=1/N;return t[0]=(o*W-l*z+c*D)*H,t[1]=(s*z-n*W-r*D)*H,t[2]=(M*_-m*T+p*A)*H,t[3]=(f*T-u*_-d*A)*H,t[4]=(l*R-a*W-c*L)*H,t[5]=(e*W-s*R+r*L)*H,t[6]=(m*v-g*_-p*w)*H,t[7]=(h*_-f*v+d*w)*H,t[8]=(a*z-o*R+c*b)*H,t[9]=(n*R-e*z-r*b)*H,t[10]=(g*T-M*v+p*S)*H,t[11]=(u*v-h*T-d*S)*H,t[12]=(o*L-a*D-l*b)*H,t[13]=(e*D-n*L+s*b)*H,t[14]=(M*w-g*A-m*S)*H,t[15]=(h*A-u*w+f*S)*H,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,f=r*c,d=r*h,g=r*u,M=a*h,m=a*u,p=o*u,S=l*c,w=l*h,v=l*u,A=n.x,T=n.y,_=n.z;return s[0]=(1-(M+p))*A,s[1]=(d+v)*A,s[2]=(g-w)*A,s[3]=0,s[4]=(d-v)*T,s[5]=(1-(f+p))*T,s[6]=(m+S)*T,s[7]=0,s[8]=(g+w)*_,s[9]=(m-S)*_,s[10]=(1-(f+M))*_,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=Ni.set(s[0],s[1],s[2]).length();const o=Ni.set(s[4],s[5],s[6]).length(),l=Ni.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Mn.copy(this);const c=1/a,h=1/o,u=1/l;return Mn.elements[0]*=c,Mn.elements[1]*=c,Mn.elements[2]*=c,Mn.elements[4]*=h,Mn.elements[5]*=h,Mn.elements[6]*=h,Mn.elements[8]*=u,Mn.elements[9]*=u,Mn.elements[10]*=u,e.setFromRotationMatrix(Mn),n.x=a,n.y=o,n.z=l,this}makePerspective(t,e,n,s,r,a,o=Tn,l=!1){const c=this.elements,h=2*r/(e-t),u=2*r/(n-s),f=(e+t)/(e-t),d=(n+s)/(n-s);let g,M;if(l)g=r/(a-r),M=a*r/(a-r);else if(o===Tn)g=-(a+r)/(a-r),M=-2*a*r/(a-r);else if(o===Zs)g=-a/(a-r),M=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=M,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=Tn,l=!1){const c=this.elements,h=2/(e-t),u=2/(n-s),f=-(e+t)/(e-t),d=-(n+s)/(n-s);let g,M;if(l)g=1/(a-r),M=a/(a-r);else if(o===Tn)g=-2/(a-r),M=-(a+r)/(a-r);else if(o===Zs)g=-1/(a-r),M=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=u,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=g,c[14]=M,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};ua.prototype.isMatrix4=!0;let me=ua;const Ni=new C,Mn=new me,If=new C(0,0,0),Nf=new C(1,1,1),jn=new C,cr=new C,cn=new C,tc=new me,ec=new fs;class Nn{constructor(t=0,e=0,n=0,s=Nn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(se(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-se(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(se(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-se(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(se(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-se(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:Zt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return tc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(tc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ec.setFromEuler(this),this.setFromQuaternion(ec,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Nn.DEFAULT_ORDER="XYZ";class fl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Uf=0;const nc=new C,Ui=new fs,On=new me,hr=new C,Ms=new C,Ff=new C,Of=new fs,ic=new C(1,0,0),sc=new C(0,1,0),rc=new C(0,0,1),ac={type:"added"},Bf={type:"removed"},Fi={type:"childadded",child:null},Ta={type:"childremoved",child:null};class Pe extends Ci{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Uf++}),this.uuid=Kn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Pe.DEFAULT_UP.clone();const t=new C,e=new Nn,n=new fs,s=new C(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new me},normalMatrix:{value:new Jt}}),this.matrix=new me,this.matrixWorld=new me,this.matrixAutoUpdate=Pe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new fl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ui.setFromAxisAngle(t,e),this.quaternion.multiply(Ui),this}rotateOnWorldAxis(t,e){return Ui.setFromAxisAngle(t,e),this.quaternion.premultiply(Ui),this}rotateX(t){return this.rotateOnAxis(ic,t)}rotateY(t){return this.rotateOnAxis(sc,t)}rotateZ(t){return this.rotateOnAxis(rc,t)}translateOnAxis(t,e){return nc.copy(t).applyQuaternion(this.quaternion),this.position.add(nc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ic,t)}translateY(t){return this.translateOnAxis(sc,t)}translateZ(t){return this.translateOnAxis(rc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(On.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?hr.copy(t):hr.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ms.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?On.lookAt(Ms,hr,this.up):On.lookAt(hr,Ms,this.up),this.quaternion.setFromRotationMatrix(On),s&&(On.extractRotation(s.matrixWorld),Ui.setFromRotationMatrix(On),this.quaternion.premultiply(Ui.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(he("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ac),Fi.child=t,this.dispatchEvent(Fi),Fi.child=null):he("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Bf),Ta.child=t,this.dispatchEvent(Ta),Ta.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),On.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),On.multiply(t.parent.matrixWorld)),t.applyMatrix4(On),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ac),Fi.child=t,this.dispatchEvent(Fi),Fi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ms,t,Ff),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ms,Of,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),f=a(t.skeletons),d=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Pe.DEFAULT_UP=new C(0,1,0);Pe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class be extends Pe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const zf={type:"move"};class Aa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new be,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new be,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new be,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const M of t.hand.values()){const m=e.getJointPose(M,n),p=this._getHandJoint(c,M);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.quaternion,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;c.inputState.pinching&&f>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(zf)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new be;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Dh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ti={h:0,s:0,l:0},ur={h:0,s:0,l:0};function Ra(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class qt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=He){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,oe.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=oe.workingColorSpace){return this.r=t,this.g=e,this.b=n,oe.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=oe.workingColorSpace){if(t=ll(t,1),e=se(e,0,1),n=se(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Ra(a,r,t+1/3),this.g=Ra(a,r,t),this.b=Ra(a,r,t-1/3)}return oe.colorSpaceToWorking(this,s),this}setStyle(t,e=He){function n(r){r!==void 0&&parseFloat(r)<1&&Zt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,e);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Zt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Zt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=He){const n=Dh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Zt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=qn(t.r),this.g=qn(t.g),this.b=qn(t.b),this}copyLinearToSRGB(t){return this.r=is(t.r),this.g=is(t.g),this.b=is(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=He){return oe.workingToColorSpace(Je.copy(this),t),Math.round(se(Je.r*255,0,255))*65536+Math.round(se(Je.g*255,0,255))*256+Math.round(se(Je.b*255,0,255))}getHexString(t=He){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=oe.workingColorSpace){oe.workingToColorSpace(Je.copy(this),e);const n=Je.r,s=Je.g,r=Je.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=oe.workingColorSpace){return oe.workingToColorSpace(Je.copy(this),e),t.r=Je.r,t.g=Je.g,t.b=Je.b,t}getStyle(t=He){oe.workingToColorSpace(Je.copy(this),t);const e=Je.r,n=Je.g,s=Je.b;return t!==He?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(ti),this.setHSL(ti.h+t,ti.s+e,ti.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ti),t.getHSL(ur);const n=Gs(ti.h,ur.h,e),s=Gs(ti.s,ur.s,e),r=Gs(ti.l,ur.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Je=new qt;qt.NAMES=Dh;class dl{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new qt(t),this.density=e}clone(){return new dl(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class kf extends Pe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Nn,this.environmentIntensity=1,this.environmentRotation=new Nn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}}const Sn=new C,Bn=new C,Ca=new C,zn=new C,Oi=new C,Bi=new C,oc=new C,Pa=new C,La=new C,Da=new C,Ia=new Re,Na=new Re,Ua=new Re;class xn{constructor(t=new C,e=new C,n=new C){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Sn.subVectors(t,e),s.cross(Sn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Sn.subVectors(s,e),Bn.subVectors(n,e),Ca.subVectors(t,e);const a=Sn.dot(Sn),o=Sn.dot(Bn),l=Sn.dot(Ca),c=Bn.dot(Bn),h=Bn.dot(Ca),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(c*l-o*h)*f,g=(a*h-o*l)*f;return r.set(1-d-g,g,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,zn)===null?!1:zn.x>=0&&zn.y>=0&&zn.x+zn.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,zn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,zn.x),l.addScaledVector(a,zn.y),l.addScaledVector(o,zn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return Ia.setScalar(0),Na.setScalar(0),Ua.setScalar(0),Ia.fromBufferAttribute(t,e),Na.fromBufferAttribute(t,n),Ua.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Ia,r.x),a.addScaledVector(Na,r.y),a.addScaledVector(Ua,r.z),a}static isFrontFacing(t,e,n,s){return Sn.subVectors(n,e),Bn.subVectors(t,e),Sn.cross(Bn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Sn.subVectors(this.c,this.b),Bn.subVectors(this.a,this.b),Sn.cross(Bn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return xn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return xn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return xn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return xn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return xn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;Oi.subVectors(s,n),Bi.subVectors(r,n),Pa.subVectors(t,n);const l=Oi.dot(Pa),c=Bi.dot(Pa);if(l<=0&&c<=0)return e.copy(n);La.subVectors(t,s);const h=Oi.dot(La),u=Bi.dot(La);if(h>=0&&u<=h)return e.copy(s);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0&&l-h>0)return a=l/(l-h),e.copy(n).addScaledVector(Oi,a);Da.subVectors(t,r);const d=Oi.dot(Da),g=Bi.dot(Da);if(g>=0&&d<=g)return e.copy(r);const M=d*c-l*g;if(M<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(Bi,o);const m=h*g-d*u;if(m<=0&&u-h>=0&&d-g>=0)return oc.subVectors(r,s),o=(u-h)/(u-h+(d-g)),e.copy(s).addScaledVector(oc,o);const p=1/(m+M+f);return a=M*p,o=f*p,e.copy(n).addScaledVector(Oi,a).addScaledVector(Bi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Pi{constructor(t=new C(1/0,1/0,1/0),e=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(yn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(yn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=yn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,yn):yn.fromBufferAttribute(r,a),yn.applyMatrix4(t.matrixWorld),this.expandByPoint(yn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),fr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),fr.copy(n.boundingBox)),fr.applyMatrix4(t.matrixWorld),this.union(fr)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,yn),yn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ss),dr.subVectors(this.max,Ss),zi.subVectors(t.a,Ss),ki.subVectors(t.b,Ss),Gi.subVectors(t.c,Ss),ei.subVectors(ki,zi),ni.subVectors(Gi,ki),mi.subVectors(zi,Gi);let e=[0,-ei.z,ei.y,0,-ni.z,ni.y,0,-mi.z,mi.y,ei.z,0,-ei.x,ni.z,0,-ni.x,mi.z,0,-mi.x,-ei.y,ei.x,0,-ni.y,ni.x,0,-mi.y,mi.x,0];return!Fa(e,zi,ki,Gi,dr)||(e=[1,0,0,0,1,0,0,0,1],!Fa(e,zi,ki,Gi,dr))?!1:(pr.crossVectors(ei,ni),e=[pr.x,pr.y,pr.z],Fa(e,zi,ki,Gi,dr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,yn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(yn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(kn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),kn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),kn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),kn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),kn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),kn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),kn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),kn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(kn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const kn=[new C,new C,new C,new C,new C,new C,new C,new C],yn=new C,fr=new Pi,zi=new C,ki=new C,Gi=new C,ei=new C,ni=new C,mi=new C,Ss=new C,dr=new C,pr=new C,gi=new C;function Fa(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){gi.fromArray(i,r);const o=s.x*Math.abs(gi.x)+s.y*Math.abs(gi.y)+s.z*Math.abs(gi.z),l=t.dot(gi),c=e.dot(gi),h=n.dot(gi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Ne=new C,mr=new ft;let Gf=0;class sn extends Ci{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Gf++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Rh,this.updateRanges=[],this.gpuType=wn,this.version=0,this._normalizationScale=t!==void 0?da(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)mr.fromBufferAttribute(this,e),mr.applyMatrix3(t),this.setXY(e,mr.x,mr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.applyMatrix3(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.applyMatrix4(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.applyNormalMatrix(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.transformDirection(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){const e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):cl(t,this.array)}_normalize(t){const e=this._normalizationScale;return e!==void 0?Math.round(t*e):hl(t,this.array)}}class Ih extends sn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Nh extends sn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class le extends sn{constructor(t,e,n){super(new Float32Array(t),e,n)}}const Hf=new Pi,ys=new C,Oa=new C;class Li{constructor(t=new C,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Hf.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ys.subVectors(t,this.center);const e=ys.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(ys,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Oa.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ys.copy(t.center).add(Oa)),this.expandByPoint(ys.copy(t.center).sub(Oa))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let Vf=0;const pn=new me,Ba=new Pe,Hi=new C,hn=new Pi,bs=new Pi,Ge=new C;class Ee extends Ci{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Vf++}),this.uuid=Kn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(lf(t)?Nh:Ih)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Jt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return pn.makeRotationFromQuaternion(t),this.applyMatrix4(pn),this}rotateX(t){return pn.makeRotationX(t),this.applyMatrix4(pn),this}rotateY(t){return pn.makeRotationY(t),this.applyMatrix4(pn),this}rotateZ(t){return pn.makeRotationZ(t),this.applyMatrix4(pn),this}translate(t,e,n){return pn.makeTranslation(t,e,n),this.applyMatrix4(pn),this}scale(t,e,n){return pn.makeScale(t,e,n),this.applyMatrix4(pn),this}lookAt(t){return Ba.lookAt(t),Ba.updateMatrix(),this.applyMatrix4(Ba.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Hi).negate(),this.translate(Hi.x,Hi.y,Hi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new le(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Zt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Pi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){he("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];hn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ge.addVectors(this.boundingBox.min,hn.min),this.boundingBox.expandByPoint(Ge),Ge.addVectors(this.boundingBox.max,hn.max),this.boundingBox.expandByPoint(Ge)):(this.boundingBox.expandByPoint(hn.min),this.boundingBox.expandByPoint(hn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&he('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Li);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){he("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(t){const n=this.boundingSphere.center;if(hn.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];bs.setFromBufferAttribute(o),this.morphTargetsRelative?(Ge.addVectors(hn.min,bs.min),hn.expandByPoint(Ge),Ge.addVectors(hn.max,bs.max),hn.expandByPoint(Ge)):(hn.expandByPoint(bs.min),hn.expandByPoint(bs.max))}hn.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Ge.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ge));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ge.fromBufferAttribute(o,c),l&&(Hi.fromBufferAttribute(t,c),Ge.add(Hi)),s=Math.max(s,n.distanceToSquared(Ge))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&he('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){he("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new sn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],l=[],c=new Uint8Array(n.count);for(let L=0;L<n.count;L++)o[L]=new C,l[L]=new C;const h=new C,u=new C,f=new C,d=new ft,g=new ft,M=new ft,m=new C,p=new C;function S(L,R,D){c[L]=c[R]=c[D]=1,h.fromBufferAttribute(n,L),u.fromBufferAttribute(n,R),f.fromBufferAttribute(n,D),d.fromBufferAttribute(r,L),g.fromBufferAttribute(r,R),M.fromBufferAttribute(r,D),u.sub(h),f.sub(h),g.sub(d),M.sub(d);const z=1/(g.x*M.y-M.x*g.y);isFinite(z)&&(m.copy(u).multiplyScalar(M.y).addScaledVector(f,-g.y).multiplyScalar(z),p.copy(f).multiplyScalar(g.x).addScaledVector(u,-M.x).multiplyScalar(z),o[L].add(m),o[R].add(m),o[D].add(m),l[L].add(p),l[R].add(p),l[D].add(p))}let w=this.groups;w.length===0&&(w=[{start:0,count:t.count}]);for(let L=0,R=w.length;L<R;++L){const D=w[L],z=D.start,W=D.count;for(let N=z,H=z+W;N<H;N+=3)S(t.getX(N+0),t.getX(N+1),t.getX(N+2))}const v=new C,A=new C,T=new C,_=new C;function b(L){T.fromBufferAttribute(s,L),_.copy(T);const R=o[L];v.copy(R),v.sub(T.multiplyScalar(T.dot(R))).normalize(),A.crossVectors(_,R);const z=A.dot(l[L])<0?-1:1;a.setXYZW(L,v.x,v.y,v.z,z)}for(let L=0,R=n.count;L<R;++L)c[L]&&b(L);this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new sn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const s=new C,r=new C,a=new C,o=new C,l=new C,c=new C,h=new C,u=new C;if(t)for(let f=0,d=t.count;f<d;f+=3){const g=t.getX(f+0),M=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,M),a.fromBufferAttribute(e,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,M),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(M,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ge.fromBufferAttribute(t,e),Ge.normalize(),t.setXYZ(e,Ge.x,Ge.y,Ge.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,u=o.normalized,f=new c.constructor(l.length*h);let d=0,g=0;for(let M=0,m=l.length;M<m;M++){o.isInterleavedBufferAttribute?d=l[M]*o.data.stride+o.offset:d=l[M]*h;for(let p=0;p<h;p++)f[g++]=c[d++]}return new sn(f,h,u)}if(this.index===null)return Zt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ee,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const f=c[h],d=t(f,n);l.push(d)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const d=c[u];h.push(d.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Wf{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Rh,this.updateRanges=[],this.version=0,this.uuid=Kn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={});const e=lc(this.array);t.arrayBuffers[e]===void 0&&(t.arrayBuffers[e]=this.array.slice(0).buffer);const n=new this.array.constructor(t.arrayBuffers[e]),s=new this.constructor(n,this.stride);return s.setUsage(this.usage),s}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){t.arrayBuffers===void 0&&(t.arrayBuffers={});const e=lc(this.array);t.arrayBuffers[e]===void 0&&(t.arrayBuffers[e]=Array.from(new Uint32Array(this.array.slice(0).buffer)));const n={uuid:this.uuid,buffer:e,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}}function lc(i){return i.buffer._uuid===void 0&&(i.buffer._uuid=Kn()),i.byteOffset===0&&i.byteLength===i.buffer.byteLength?i.buffer._uuid:i.buffer._uuid+":"+i.byteOffset+":"+i.byteLength}const je=new C;class aa{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s,this._normalizationScale=t!==void 0?da(t.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)je.fromBufferAttribute(this,e),je.applyMatrix4(t),this.setXYZ(e,je.x,je.y,je.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)je.fromBufferAttribute(this,e),je.applyNormalMatrix(t),this.setXYZ(e,je.x,je.y,je.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)je.fromBufferAttribute(this,e),je.transformDirection(t),this.setXYZ(e,je.x,je.y,je.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=this._denormalize(e)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=this._denormalize(e)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=this._denormalize(e)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=this._denormalize(e)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){ra("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new sn(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new aa(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){ra("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(t){const e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):cl(t,this.data.array)}_normalize(t){const e=this._normalizationScale;return e!==void 0?Math.round(t*e):hl(t,this.data.array)}}const za=new C,Xf=new C,qf=new Jt;class si{constructor(t=new C(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=za.subVectors(n,e).cross(Xf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){const s=t.delta(za),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||qf.getNormalMatrix(t),s=this.coplanarPoint(za).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let Yf=0;class ui extends Ci{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Yf++}),this.uuid=Kn(),this.name="",this.type="Material",this.blending=zs,this.side=Ei,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=mh,this.blendDst=gh,this.blendEquation=es,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qt(0,0,0),this.blendAlpha=0,this.depthFunc=Xs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ef,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Sa,this.stencilZFail=Sa,this.stencilZPass=Sa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){Zt(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Zt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new qt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new si().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new ft().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ft().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class yi extends ui{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new qt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Vi;const Es=new C,Wi=new C,Xi=new C,qi=new ft,ws=new ft,Uh=new me,gr=new C,Ts=new C,_r=new C,cc=new ft,ka=new ft,hc=new ft;class bi extends Pe{constructor(t=new yi){if(super(),this.isSprite=!0,this.type="Sprite",Vi===void 0){Vi=new Ee;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Wf(e,5);Vi.setIndex([0,1,2,0,2,3]),Vi.setAttribute("position",new aa(n,3,0,!1)),Vi.setAttribute("uv",new aa(n,2,3,!1))}this.geometry=Vi,this.material=t,this.center=new ft(.5,.5),this.count=1}intersectsFrustum(t){return t.intersectsSprite(this)}raycast(t,e){t.camera===null&&he('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Wi.setFromMatrixScale(this.matrixWorld),Uh.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Xi.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Wi.multiplyScalar(-Xi.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;xr(gr.set(-.5,-.5,0),Xi,a,Wi,s,r),xr(Ts.set(.5,-.5,0),Xi,a,Wi,s,r),xr(_r.set(.5,.5,0),Xi,a,Wi,s,r),cc.set(0,0),ka.set(1,0),hc.set(1,1);let o=t.ray.intersectTriangle(gr,Ts,_r,!1,Es);if(o===null&&(xr(Ts.set(-.5,.5,0),Xi,a,Wi,s,r),ka.set(0,1),o=t.ray.intersectTriangle(gr,_r,Ts,!1,Es),o===null))return;const l=t.ray.origin.distanceTo(Es);l<t.near||l>t.far||e.push({distance:l,point:Es.clone(),uv:xn.getInterpolation(Es,gr,Ts,_r,cc,ka,hc,new ft),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}toJSON(t){const e=super.toJSON(t);return e.object.center=this.center.toArray(),e}}function xr(i,t,e,n,s,r){qi.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(ws.x=r*qi.x-s*qi.y,ws.y=s*qi.x+r*qi.y):ws.copy(qi),i.copy(t),i.x+=ws.x,i.y+=ws.y,i.applyMatrix4(Uh)}const Gn=new C,Ga=new C,vr=new C,Mr=new C;class pa{constructor(t=new C,e=new C(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Gn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Gn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Gn.copy(this.origin).addScaledVector(this.direction,e),Gn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Ga.copy(t).add(e).multiplyScalar(.5),vr.copy(e).sub(t).normalize(),Mr.copy(this.origin).sub(Ga);const r=t.distanceTo(e)*.5,a=-this.direction.dot(vr),o=Mr.dot(this.direction),l=-Mr.dot(vr),c=Mr.lengthSq(),h=Math.abs(1-a*a);let u,f,d,g;if(h>0)if(u=a*l-o,f=a*o-l,g=r*h,u>=0)if(f>=-g)if(f<=g){const M=1/h;u*=M,f*=M,d=u*(u+a*f+2*o)+f*(a*u+f+2*l)+c}else f=r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Ga).addScaledVector(vr,f),d}intersectSphere(t,e){if(t.radius<0)return null;Gn.subVectors(t.center,this.origin);const n=Gn.dot(this.direction),s=Gn.dot(Gn)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,a=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,a=(t.min.y-f.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(o=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Gn)!==null}intersectTriangle(t,e,n,s,r){const a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,u=t.x-a.x,f=t.y-a.y,d=t.z-a.z,g=e.x-a.x,M=e.y-a.y,m=e.z-a.z,p=n.x-a.x,S=n.y-a.y,w=n.z-a.z,v=Math.abs(l),A=Math.abs(c),T=Math.abs(h);let _,b,L,R,D,z,W,N,H,J,k,j;if(v>=A&&v>=T?(L=l,z=u,H=g,j=p,l>=0?(_=c,b=h,R=f,D=d,W=M,N=m,J=S,k=w):(_=h,b=c,R=d,D=f,W=m,N=M,J=w,k=S)):A>=T?(L=c,z=f,H=M,j=S,c>=0?(_=h,b=l,R=d,D=u,W=m,N=g,J=w,k=p):(_=l,b=h,R=u,D=d,W=g,N=m,J=p,k=w)):(L=h,z=d,H=m,j=w,h>=0?(_=l,b=c,R=u,D=f,W=g,N=M,J=p,k=S):(_=c,b=l,R=f,D=u,W=M,N=g,J=S,k=p)),L===0)return null;const $=_/L,nt=b/L,lt=1/L,Nt=R-$*z,pt=D-nt*z,X=W-$*H,St=N-nt*H,At=J-$*j,Rt=k-nt*j,mt=At*St-Rt*X,Bt=Nt*Rt-pt*At,de=X*pt-St*Nt;if(s){if(mt<0||Bt<0||de<0)return null}else if((mt<0||Bt<0||de<0)&&(mt>0||Bt>0||de>0))return null;const Ht=mt+Bt+de;if(Ht===0)return null;const Qt=lt*(mt*z+Bt*H+de*j);return(Ht>0?Qt<0:Qt>0)?null:this.at(Qt/Ht,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class rn extends ui{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Nn,this.combine=_h,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const uc=new me,_i=new pa,Sr=new Li,fc=new C,yr=new C,br=new C,Er=new C,Ha=new C,wr=new C,dc=new C,Tr=new C;class Dt extends Pe{constructor(t=new Ee,e=new rn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){wr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(Ha.fromBufferAttribute(u,t),a?wr.addScaledVector(Ha,h):wr.addScaledVector(Ha.sub(e),h))}e.add(wr)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Sr.copy(n.boundingSphere),Sr.applyMatrix4(r),_i.copy(t.ray).recast(t.near),!(Sr.containsPoint(_i.origin)===!1&&(_i.intersectSphere(Sr,fc)===null||_i.origin.distanceToSquared(fc)>(t.far-t.near)**2))&&(uc.copy(r).invert(),_i.copy(t.ray).applyMatrix4(uc),!(n.boundingBox!==null&&_i.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,_i)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,M=f.length;g<M;g++){const m=f[g],p=a[m.materialIndex],S=Math.max(m.start,d.start),w=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let v=S,A=w;v<A;v+=3){const T=o.getX(v),_=o.getX(v+1),b=o.getX(v+2);s=Ar(this,p,t,n,c,h,u,T,_,b),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),M=Math.min(o.count,d.start+d.count);for(let m=g,p=M;m<p;m+=3){const S=o.getX(m),w=o.getX(m+1),v=o.getX(m+2);s=Ar(this,a,t,n,c,h,u,S,w,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,M=f.length;g<M;g++){const m=f[g],p=a[m.materialIndex],S=Math.max(m.start,d.start),w=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let v=S,A=w;v<A;v+=3){const T=v,_=v+1,b=v+2;s=Ar(this,p,t,n,c,h,u,T,_,b),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),M=Math.min(l.count,d.start+d.count);for(let m=g,p=M;m<p;m+=3){const S=m,w=m+1,v=m+2;s=Ar(this,a,t,n,c,h,u,S,w,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Zf(i,t,e,n,s,r,a,o){let l;if(t.side===nn?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===Ei,o),l===null)return null;Tr.copy(o),Tr.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Tr);return c<e.near||c>e.far?null:{distance:c,point:Tr.clone(),object:i}}function Ar(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,yr),i.getVertexPosition(l,br),i.getVertexPosition(c,Er);const h=Zf(i,t,e,n,yr,br,Er,dc);if(h){const u=new C;xn.getBarycoord(dc,yr,br,Er,u),s&&(h.uv=xn.getInterpolatedAttribute(s,o,l,c,u,new ft)),r&&(h.uv1=xn.getInterpolatedAttribute(r,o,l,c,u,new ft)),a&&(h.normal=xn.getInterpolatedAttribute(a,o,l,c,u,new C),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new C,materialIndex:0};xn.getNormal(yr,br,Er,f.normal),h.face=f,h.barycoord=u}return h}class ir extends $e{constructor(t=null,e=1,n=1,s,r,a,o,l,c=Xe,h=Xe,u,f){super(null,a,o,l,c,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class pc extends sn{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Yi=new me,mc=new me,Rr=[],gc=new Pi,Kf=new me,As=new Dt,Rs=new Li;class Fh extends Dt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new pc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Kf)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Pi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Yi),gc.copy(t.boundingBox).applyMatrix4(Yi),this.boundingBox.union(gc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Li),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Yi),Rs.copy(t.boundingSphere).applyMatrix4(Yi),this.boundingSphere.union(Rs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),this.morphTexture=t.morphTexture!==null?t.morphTexture.clone():null,this.instanceColor=t.instanceColor!==null?t.instanceColor.clone():null,this.count=t.count,this.boundingBox=t.boundingBox!==null?t.boundingBox.clone():null,this.boundingSphere=t.boundingSphere!==null?t.boundingSphere.clone():null,this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(As.geometry=this.geometry,As.material=this.material,As.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Rs.copy(this.boundingSphere),Rs.applyMatrix4(n),t.ray.intersectsSphere(Rs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Yi),mc.multiplyMatrices(n,Yi),As.matrixWorld=mc,As.raycast(t,Rr);for(let a=0,o=Rr.length;a<o;a++){const l=Rr[a];l.instanceId=r,l.object=this,e.push(l)}Rr.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new pc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new ir(new Float32Array(s*this.count),s,this.count,sl,wn));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*t;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const xi=new Li,Jf=new ft(.5,.5),Cr=new C;class Js{constructor(t=new si,e=new si,n=new si,s=new si,r=new si,a=new si){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Tn,n=!1){const s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],u=r[5],f=r[6],d=r[7],g=r[8],M=r[9],m=r[10],p=r[11],S=r[12],w=r[13],v=r[14],A=r[15];if(s[0].setComponents(c-a,d-h,p-g,A-S).normalize(),s[1].setComponents(c+a,d+h,p+g,A+S).normalize(),s[2].setComponents(c+o,d+u,p+M,A+w).normalize(),s[3].setComponents(c-o,d-u,p-M,A-w).normalize(),n)s[4].setComponents(l,f,m,v).normalize(),s[5].setComponents(c-l,d-f,p-m,A-v).normalize();else if(s[4].setComponents(c-l,d-f,p-m,A-v).normalize(),e===Tn)s[5].setComponents(c+l,d+f,p+m,A+v).normalize();else if(e===Zs)s[5].setComponents(l,f,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),xi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),xi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(xi)}intersectsSprite(t){xi.center.set(0,0,0);const e=Jf.distanceTo(t.center);return xi.radius=.7071067811865476+e,xi.applyMatrix4(t.matrixWorld),this.intersectsSphere(xi)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Cr.x=s.normal.x>0?t.max.x:t.min.x,Cr.y=s.normal.y>0?t.max.y:t.min.y,Cr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Cr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const _c=new me;class pl{constructor(){this.coordinateSystem=Tn,this._frustums=[],this._count=0}setFromArrayCamera(t){const e=t.cameras,n=this._frustums;for(let s=0;s<e.length;s++){const r=e[s];_c.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new Js),n[s].setFromProjectionMatrix(_c,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsObject(t))return!0;return!1}intersectsSprite(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSprite(t))return!0;return!1}intersectsSphere(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSphere(t))return!0;return!1}intersectsBox(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsBox(t))return!0;return!1}containsPoint(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;const e=this._frustums,n=t._frustums;for(let s=0;s<t._count;s++)e[s]===void 0&&(e[s]=new Js),e[s].copy(n[s]);return this._count=t._count,this}clone(){return new pl().copy(this)}}class Oh extends ui{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new qt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const oa=new C,la=new C,xc=new me,Cs=new pa,Pr=new Li,Va=new C,vc=new C;class $f extends Pe{constructor(t=new Ee,e=new Oh){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)oa.fromBufferAttribute(e,s-1),la.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=oa.distanceTo(la);t.setAttribute("lineDistance",new le(n,1))}else Zt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Pr.copy(n.boundingSphere),Pr.applyMatrix4(s),Pr.radius+=r,t.ray.intersectsSphere(Pr)===!1)return;xc.copy(s).invert(),Cs.copy(t.ray).applyMatrix4(xc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){const d=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let M=d,m=g-1;M<m;M+=c){const p=h.getX(M),S=h.getX(M+1),w=Lr(this,t,Cs,l,p,S,M);w&&e.push(w)}if(this.isLineLoop){const M=h.getX(g-1),m=h.getX(d),p=Lr(this,t,Cs,l,M,m,g-1);p&&e.push(p)}}else{const d=Math.max(0,a.start),g=Math.min(f.count,a.start+a.count);for(let M=d,m=g-1;M<m;M+=c){const p=Lr(this,t,Cs,l,M,M+1,M);p&&e.push(p)}if(this.isLineLoop){const M=Lr(this,t,Cs,l,g-1,d,g-1);M&&e.push(M)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Lr(i,t,e,n,s,r,a){const o=i.geometry.attributes.position;if(oa.fromBufferAttribute(o,s),la.fromBufferAttribute(o,r),e.distanceSqToSegment(oa,la,Va,vc)>n)return;Va.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Va);if(!(c<t.near||c>t.far))return{distance:c,point:vc.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}class $s extends ui{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new qt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Mc=new me,zo=new pa,Dr=new Li,Ir=new C;class ca extends Pe{constructor(t=new Ee,e=new $s){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Dr.copy(n.boundingSphere),Dr.applyMatrix4(s),Dr.radius+=r,t.ray.intersectsSphere(Dr)===!1)return;Mc.copy(s).invert(),zo.copy(t.ray).applyMatrix4(Mc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const f=Math.max(0,a.start),d=Math.min(c.count,a.start+a.count);for(let g=f,M=d;g<M;g++){const m=c.getX(g);Ir.fromBufferAttribute(u,m),Sc(Ir,m,l,s,t,e,this)}}else{const f=Math.max(0,a.start),d=Math.min(u.count,a.start+a.count);for(let g=f,M=d;g<M;g++)Ir.fromBufferAttribute(u,g),Sc(Ir,g,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Sc(i,t,e,n,s,r,a){const o=zo.distanceSqToPoint(i);if(o<e){const l=new C;zo.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class Bh extends $e{constructor(t=[],e=as,n,s,r,a,o,l,c,h){super(t,e,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class zh extends $e{constructor(t,e,n,s,r,a,o,l,c){super(t,e,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ls extends $e{constructor(t,e,n=In,s,r,a,o=Xe,l=Xe,c,h=ci,u=1){if(h!==ci&&h!==oi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:t,height:e,depth:u};super(f,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new ul(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}}class kh extends ls{constructor(t,e=In,n=as,s,r,a=Xe,o=Xe,l,c=ci){const h={width:t,height:t,depth:1},u=[h,h,h,h,h,h];super(t,t,e,n,s,r,a,o,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Gh extends $e{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Yt extends Ee{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let f=0,d=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new le(c,3)),this.setAttribute("normal",new le(h,3)),this.setAttribute("uv",new le(u,2));function g(M,m,p,S,w,v,A,T,_,b,L){const R=v/_,D=A/b,z=v/2,W=A/2,N=T/2,H=_+1,J=b+1;let k=0,j=0;const $=new C;for(let nt=0;nt<J;nt++){const lt=nt*D-W;for(let Nt=0;Nt<H;Nt++){const pt=Nt*R-z;$[M]=pt*S,$[m]=lt*w,$[p]=N,c.push($.x,$.y,$.z),$[M]=0,$[m]=0,$[p]=T>0?1:-1,h.push($.x,$.y,$.z),u.push(Nt/_),u.push(1-nt/b),k+=1}}for(let nt=0;nt<b;nt++)for(let lt=0;lt<_;lt++){const Nt=f+lt+H*nt,pt=f+lt+H*(nt+1),X=f+(lt+1)+H*(nt+1),St=f+(lt+1)+H*nt;l.push(Nt,pt,St),l.push(pt,X,St),j+=6}o.addGroup(d,j,L),d+=j,f+=k}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Yt(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class Vn extends Ee{constructor(t=1,e=1,n=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:n,radialSegments:s,heightSegments:r},e=Math.max(0,e),n=Math.max(1,Math.floor(n)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));const a=[],o=[],l=[],c=[],h=e/2,u=Math.PI/2*t,f=e,d=2*u+f,g=n*2+r,M=s+1,m=new C,p=new C;for(let S=0;S<=g;S++){let w=0,v=0,A=0,T=0;if(S<=n){const L=S/n,R=L*Math.PI/2;v=-h-t*Math.cos(R),A=t*Math.sin(R),T=-t*Math.cos(R),w=L*u}else if(S<=n+r){const L=(S-n)/r;v=-h+L*e,A=t,T=0,w=u+L*f}else{const L=(S-n-r)/n,R=L*Math.PI/2;v=h+t*Math.sin(R),A=t*Math.cos(R),T=t*Math.sin(R),w=u+f+L*u}const _=Math.max(0,Math.min(1,w/d));let b=0;S===0?b=.5/s:S===g&&(b=-.5/s);for(let L=0;L<=s;L++){const R=L/s,D=R*Math.PI*2,z=Math.sin(D),W=Math.cos(D);p.x=-A*W,p.y=v,p.z=A*z,o.push(p.x,p.y,p.z),m.set(-A*W,T,A*z),m.normalize(),l.push(m.x,m.y,m.z),c.push(R+b,_)}if(S>0){const L=(S-1)*M;for(let R=0;R<s;R++){const D=L+R,z=L+R+1,W=S*M+R,N=S*M+R+1;a.push(D,z,W),a.push(z,N,W)}}}this.setIndex(a),this.setAttribute("position",new le(o,3)),this.setAttribute("normal",new le(l,3)),this.setAttribute("uv",new le(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Vn(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}}class ss extends Ee{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],a=[],o=[],l=[],c=new C,h=new ft;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){const d=n+u/e*s;c.x=t*Math.cos(d),c.y=t*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[f]/t+1)/2,h.y=(a[f+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new le(a,3)),this.setAttribute("normal",new le(o,3)),this.setAttribute("uv",new le(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ss(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Ue extends Ee{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],d=[];let g=0;const M=[],m=n/2;let p=0;S(),a===!1&&(t>0&&w(!0),e>0&&w(!1)),this.setIndex(h),this.setAttribute("position",new le(u,3)),this.setAttribute("normal",new le(f,3)),this.setAttribute("uv",new le(d,2));function S(){const v=new C,A=new C;let T=0;const _=(e-t)/n;for(let b=0;b<=r;b++){const L=[],R=b/r,D=R*(e-t)+t;for(let z=0;z<=s;z++){const W=z/s,N=W*l+o,H=Math.sin(N),J=Math.cos(N);A.x=D*H,A.y=-R*n+m,A.z=D*J,u.push(A.x,A.y,A.z),v.set(H,_,J).normalize(),f.push(v.x,v.y,v.z),d.push(W,1-R),L.push(g++)}M.push(L)}for(let b=0;b<s;b++)for(let L=0;L<r;L++){const R=M[L][b],D=M[L+1][b],z=M[L+1][b+1],W=M[L][b+1];(t>0||L!==0)&&(h.push(R,D,W),T+=3),(e>0||L!==r-1)&&(h.push(D,z,W),T+=3)}c.addGroup(p,T,0),p+=T}function w(v){const A=g,T=new ft,_=new C;let b=0;const L=v===!0?t:e,R=v===!0?1:-1;for(let z=1;z<=s;z++)u.push(0,m*R,0),f.push(0,R,0),d.push(.5,.5),g++;const D=g;for(let z=0;z<=s;z++){const N=z/s*l+o,H=Math.cos(N),J=Math.sin(N);_.x=L*J,_.y=m*R,_.z=L*H,u.push(_.x,_.y,_.z),f.push(0,R,0),T.x=H*.5+.5,T.y=J*.5*R+.5,d.push(T.x,T.y),g++}for(let z=0;z<s;z++){const W=A+z,N=D+z;v===!0?h.push(N,N+1,W):h.push(N+1,N,W),b+=3}c.addGroup(p,b,v===!0?1:2),p+=b}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ue(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ml extends Ue{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new ml(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class gl extends Ee{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],a=[];o(s),c(n),h(),this.setAttribute("position",new le(r,3)),this.setAttribute("normal",new le(r.slice(),3)),this.setAttribute("uv",new le(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(S){const w=new C,v=new C,A=new C;for(let T=0;T<e.length;T+=3)d(e[T+0],w),d(e[T+1],v),d(e[T+2],A),l(w,v,A,S)}function l(S,w,v,A){const T=A+1,_=[];for(let b=0;b<=T;b++){_[b]=[];const L=S.clone().lerp(v,b/T),R=w.clone().lerp(v,b/T),D=T-b;for(let z=0;z<=D;z++)z===0&&b===T?_[b][z]=L:_[b][z]=L.clone().lerp(R,z/D)}for(let b=0;b<T;b++)for(let L=0;L<2*(T-b)-1;L++){const R=Math.floor(L/2);L%2===0?(f(_[b][R+1]),f(_[b+1][R]),f(_[b][R])):(f(_[b][R+1]),f(_[b+1][R+1]),f(_[b+1][R]))}}function c(S){const w=new C;for(let v=0;v<r.length;v+=3)w.x=r[v+0],w.y=r[v+1],w.z=r[v+2],w.normalize().multiplyScalar(S),r[v+0]=w.x,r[v+1]=w.y,r[v+2]=w.z}function h(){const S=new C;for(let w=0;w<r.length;w+=3){S.x=r[w+0],S.y=r[w+1],S.z=r[w+2];const v=m(S)/2/Math.PI+.5,A=p(S)/Math.PI+.5;a.push(v,1-A)}g(),u()}function u(){for(let S=0;S<a.length;S+=6){const w=a[S+0],v=a[S+2],A=a[S+4],T=Math.max(w,v,A),_=Math.min(w,v,A);T>.9&&_<.1&&(w<.2&&(a[S+0]+=1),v<.2&&(a[S+2]+=1),A<.2&&(a[S+4]+=1))}}function f(S){r.push(S.x,S.y,S.z)}function d(S,w){const v=S*3;w.x=t[v+0],w.y=t[v+1],w.z=t[v+2]}function g(){const S=new C,w=new C,v=new C,A=new C,T=new ft,_=new ft,b=new ft;for(let L=0,R=0;L<r.length;L+=9,R+=6){S.set(r[L+0],r[L+1],r[L+2]),w.set(r[L+3],r[L+4],r[L+5]),v.set(r[L+6],r[L+7],r[L+8]),T.set(a[R+0],a[R+1]),_.set(a[R+2],a[R+3]),b.set(a[R+4],a[R+5]),A.copy(S).add(w).add(v).divideScalar(3);const D=m(A);M(T,R+0,S,D),M(_,R+2,w,D),M(b,R+4,v,D)}}function M(S,w,v,A){A<0&&S.x===1&&(a[w]=S.x-1),v.x===0&&v.z===0&&(a[w]=A/2/Math.PI+.5)}function m(S){return Math.atan2(S.z,-S.x)}function p(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new gl(t.vertices,t.indices,t.radius,t.detail)}}class _l extends gl{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new _l(t.radius,t.detail)}}class Un{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Zt("Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let s=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);const h=n[s],f=n[s+1]-h,d=(a-h)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new ft:new C);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new C,s=[],r=[],a=[],o=new C,l=new me;for(let d=0;d<=t;d++){const g=d/t;s[d]=this.getTangentAt(g,new C)}r[0]=new C,a[0]=new C;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),f<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(s[d-1],s[d]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(se(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(o,g))}a[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(se(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(d=-d);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],d*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}}class xl extends Un{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new ft){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*h-d*u+this.aX,c=f*u+d*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Qf extends xl{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function vl(){let i=0,t=0,e=0,n=0;function s(r,a,o,l){i=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let f=(a-r)/c-(o-r)/(c+h)+(o-a)/h,d=(o-a)/h-(l-a)/(h+u)+(l-o)/u;f*=h,d*=h,s(a,o,f,d)},calc:function(r){const a=r*r,o=a*r;return i+t*r+e*a+n*o}}}const yc=new C,bc=new C,Wa=new vl,Xa=new vl,qa=new vl;class ko extends Un{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new C){const n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(bc.subVectors(s[0],s[1]).add(s[0]),c=bc);const u=s[o%r],f=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(yc.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=yc),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),d),M=Math.pow(u.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(h),d);M<1e-4&&(M=1),g<1e-4&&(g=M),m<1e-4&&(m=M),Wa.initNonuniformCatmullRom(c.x,u.x,f.x,h.x,g,M,m),Xa.initNonuniformCatmullRom(c.y,u.y,f.y,h.y,g,M,m),qa.initNonuniformCatmullRom(c.z,u.z,f.z,h.z,g,M,m)}else this.curveType==="catmullrom"&&(Wa.initCatmullRom(c.x,u.x,f.x,h.x,this.tension),Xa.initCatmullRom(c.y,u.y,f.y,h.y,this.tension),qa.initCatmullRom(c.z,u.z,f.z,h.z,this.tension));return n.set(Wa.calc(l),Xa.calc(l),qa.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new C().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Ec(i,t,e,n,s){const r=(n-t)*.5,a=(s-e)*.5,o=i*i,l=i*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*i+e}function jf(i,t){const e=1-i;return e*e*t}function td(i,t){return 2*(1-i)*i*t}function ed(i,t){return i*i*t}function Hs(i,t,e,n){return jf(i,t)+td(i,e)+ed(i,n)}function nd(i,t){const e=1-i;return e*e*e*t}function id(i,t){const e=1-i;return 3*e*e*i*t}function sd(i,t){return 3*(1-i)*i*i*t}function rd(i,t){return i*i*i*t}function Vs(i,t,e,n,s){return nd(i,t)+id(i,e)+sd(i,n)+rd(i,s)}class Hh extends Un{constructor(t=new ft,e=new ft,n=new ft,s=new ft){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new ft){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Vs(t,s.x,r.x,a.x,o.x),Vs(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class ad extends Un{constructor(t=new C,e=new C,n=new C,s=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new C){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Vs(t,s.x,r.x,a.x,o.x),Vs(t,s.y,r.y,a.y,o.y),Vs(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Vh extends Un{constructor(t=new ft,e=new ft){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ft){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ft){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class od extends Un{constructor(t=new C,e=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new C){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new C){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Wh extends Un{constructor(t=new ft,e=new ft,n=new ft){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ft){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Hs(t,s.x,r.x,a.x),Hs(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Xh extends Un{constructor(t=new C,e=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new C){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Hs(t,s.x,r.x,a.x),Hs(t,s.y,r.y,a.y),Hs(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class qh extends Un{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ft){const n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],u=s[a>s.length-3?s.length-1:a+2];return n.set(Ec(o,l.x,c.x,h.x,u.x),Ec(o,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new ft().fromArray(s))}return this}}var ha=Object.freeze({__proto__:null,ArcCurve:Qf,CatmullRomCurve3:ko,CubicBezierCurve:Hh,CubicBezierCurve3:ad,EllipseCurve:xl,LineCurve:Vh,LineCurve3:od,QuadraticBezierCurve:Wh,QuadraticBezierCurve3:Xh,SplineCurve:qh});class ld extends Un{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ha[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this.cacheLengths=null,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new ha[s.type]().fromJSON(s))}return this.cacheLengths=null,this}}class wc extends ld{constructor(t){super(),this.type="Path",this.currentPoint=new ft,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Vh(this.currentPoint.clone(),new ft(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new Wh(this.currentPoint.clone(),new ft(t,e),new ft(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,a){const o=new Hh(this.currentPoint.clone(),new ft(t,e),new ft(n,s),new ft(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new qh(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,s,r,a),this}absarc(t,e,n,s,r,a){return this.absellipse(t,e,n,n,s,r,a),this}ellipse(t,e,n,s,r,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,a,o,l),this}absellipse(t,e,n,s,r,a,o,l){const c=new xl(t,e,n,s,r,a,o,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Yh extends wc{constructor(t){super(t),this.uuid=Kn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new wc().fromJSON(s))}return this}}function cd(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let r=Zh(i,0,s,e,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=pd(i,t,r,e)),i.length>80*e){o=i[0],l=i[1];let h=o,u=l;for(let f=e;f<s;f+=e){const d=i[f],g=i[f+1];d<o&&(o=d),g<l&&(l=g),d>h&&(h=d),g>u&&(u=g)}c=Math.max(h-o,u-l),c=c!==0?32767/c:0}return Qs(r,a,e,o,l,c,0),a}function Zh(i,t,e,n,s){let r;if(s===wd(i,t,e,n)>0)for(let a=t;a<e;a+=n)r=Tc(a/n|0,i[a],i[a+1],r);else for(let a=e-n;a>=t;a-=n)r=Tc(a/n|0,i[a],i[a+1],r);return r&&cs(r,r.next)&&(tr(r),r=r.next),r}function Ai(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(cs(e,e.next)||Ce(e.prev,e,e.next)===0)){if(tr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Qs(i,t,e,n,s,r,a){if(!i)return;!a&&r&&vd(i,n,s,r);let o=i;for(;i.prev!==i.next;){const l=i.prev,c=i.next;if(r?ud(i,n,s,r):hd(i)){t.push(l.i,i.i,c.i),tr(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=fd(Ai(i),t),Qs(i,t,e,n,s,r,2)):a===2&&dd(i,t,e,n,s,r):Qs(Ai(i),t,e,n,s,r,1);break}}}function hd(i){const t=i.prev,e=i,n=i.next;if(Ce(t,e,n)>=0)return!1;const s=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=Math.min(s,r,a),u=Math.min(o,l,c),f=Math.max(s,r,a),d=Math.max(o,l,c);let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=f&&g.y>=u&&g.y<=d&&Us(s,o,r,l,a,c,g.x,g.y)&&Ce(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function ud(i,t,e,n){const s=i.prev,r=i,a=i.next;if(Ce(s,r,a)>=0)return!1;const o=s.x,l=r.x,c=a.x,h=s.y,u=r.y,f=a.y,d=Math.min(o,l,c),g=Math.min(h,u,f),M=Math.max(o,l,c),m=Math.max(h,u,f),p=Go(d,g,t,e,n),S=Go(M,m,t,e,n);let w=i.prevZ,v=i.nextZ;for(;w&&w.z>=p&&v&&v.z<=S;){if(w.x>=d&&w.x<=M&&w.y>=g&&w.y<=m&&w!==s&&w!==a&&Us(o,h,l,u,c,f,w.x,w.y)&&Ce(w.prev,w,w.next)>=0||(w=w.prevZ,v.x>=d&&v.x<=M&&v.y>=g&&v.y<=m&&v!==s&&v!==a&&Us(o,h,l,u,c,f,v.x,v.y)&&Ce(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;w&&w.z>=p;){if(w.x>=d&&w.x<=M&&w.y>=g&&w.y<=m&&w!==s&&w!==a&&Us(o,h,l,u,c,f,w.x,w.y)&&Ce(w.prev,w,w.next)>=0)return!1;w=w.prevZ}for(;v&&v.z<=S;){if(v.x>=d&&v.x<=M&&v.y>=g&&v.y<=m&&v!==s&&v!==a&&Us(o,h,l,u,c,f,v.x,v.y)&&Ce(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function fd(i,t){let e=i;do{const n=e.prev,s=e.next.next;!cs(n,s)&&Jh(n,e,e.next,s)&&js(n,s)&&js(s,n)&&(t.push(n.i,e.i,s.i),tr(e),tr(e.next),e=i=s),e=e.next}while(e!==i);return Ai(e)}function dd(i,t,e,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&yd(a,o)){let l=$h(a,o);a=Ai(a,a.next),l=Ai(l,l.next),Qs(a,t,e,n,s,r,0),Qs(l,t,e,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function pd(i,t,e,n){const s=[];for(let r=0,a=t.length;r<a;r++){const o=t[r]*n,l=r<a-1?t[r+1]*n:i.length,c=Zh(i,o,l,n,!1);c===c.next&&(c.steiner=!0),s.push(Sd(c))}s.sort(md);for(let r=0;r<s.length;r++)e=gd(s[r],e);return e}function md(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function gd(i,t){const e=_d(i,t);if(!e)return t;const n=$h(e,i);return Ai(n,n.next),Ai(e,e.next)}function _d(i,t){let e=t;const n=i.x,s=i.y;let r=-1/0,a;if(cs(i,e))return e;do{if(cs(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){const u=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=n&&u>r&&(r=u,a=e.x<e.next.x?e:e.next,u===n))return a}e=e.next}while(e!==t);if(!a)return null;const o=a,l=a.x,c=a.y;let h=1/0;e=a;do{if(n>=e.x&&e.x>=l&&n!==e.x&&Kh(s<c?n:r,s,l,c,s<c?r:n,s,e.x,e.y)){const u=Math.abs(s-e.y)/(n-e.x);js(e,i)&&(u<h||u===h&&(e.x>a.x||e.x===a.x&&xd(a,e)))&&(a=e,h=u)}e=e.next}while(e!==o);return a}function xd(i,t){return Ce(i.prev,i,t.prev)<0&&Ce(t.next,i,i.next)<0}function vd(i,t,e,n){let s=i;do s.z===0&&(s.z=Go(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Md(s)}function Md(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let a=n,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let l=e;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,e*=2}while(t>1);return i}function Go(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function Sd(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Kh(i,t,e,n,s,r,a,o){return(s-a)*(t-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(n-o)}function Us(i,t,e,n,s,r,a,o){return!(i===a&&t===o)&&Kh(i,t,e,n,s,r,a,o)}function yd(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!bd(i,t)&&(js(i,t)&&js(t,i)&&Ed(i,t)&&(Ce(i.prev,i,t.prev)||Ce(i,t.prev,t))||cs(i,t)&&Ce(i.prev,i,i.next)>0&&Ce(t.prev,t,t.next)>0)}function Ce(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function cs(i,t){return i.x===t.x&&i.y===t.y}function Jh(i,t,e,n){const s=Ur(Ce(i,t,e)),r=Ur(Ce(i,t,n)),a=Ur(Ce(e,n,i)),o=Ur(Ce(e,n,t));return!!(s!==r&&a!==o||s===0&&Nr(i,e,t)||r===0&&Nr(i,n,t)||a===0&&Nr(e,i,n)||o===0&&Nr(e,t,n))}function Nr(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Ur(i){return i>0?1:i<0?-1:0}function bd(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&Jh(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function js(i,t){return Ce(i.prev,i,i.next)<0?Ce(i,t,i.next)>=0&&Ce(i,i.prev,t)>=0:Ce(i,t,i.prev)<0||Ce(i,i.next,t)<0}function Ed(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function $h(i,t){const e=Ho(i.i,i.x,i.y),n=Ho(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Tc(i,t,e,n){const s=Ho(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function tr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Ho(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function wd(i,t,e,n){let s=0;for(let r=t,a=e-n;r<e;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}class Td{static triangulate(t,e,n=2){return cd(t,e,n)}}class ns{static area(t){const e=t.length;let n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return ns.area(t)<0}static triangulateShape(t,e){const n=[],s=[],r=[];Ac(t),Rc(n,t);let a=t.length;e.forEach(Ac);for(let l=0;l<e.length;l++)s.push(a),a+=e[l].length,Rc(n,e[l]);const o=Td.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function Ac(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Rc(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class Ml extends Ee{constructor(t=new Yh([new ft(.5,.5),new ft(-.5,.5),new ft(-.5,-.5),new ft(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],r=[];for(let o=0,l=t.length;o<l;o++){const c=t[o];a(c)}this.setAttribute("position",new le(s,3)),this.setAttribute("uv",new le(r,2)),this.computeVertexNormals();function a(o){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:d-.1,M=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,S=e.UVGenerator!==void 0?e.UVGenerator:Ad;let w,v=!1,A,T,_,b;if(p){w=p.getSpacedPoints(h),v=!0,f=!1;const ct=p.isCatmullRomCurve3?p.closed:!1;A=p.computeFrenetFrames(h,ct),T=new C,_=new C,b=new C}f||(m=0,d=0,g=0,M=0);const L=o.extractPoints(c);let R=L.shape;const D=L.holes;if(!ns.isClockWise(R)){R=R.reverse();for(let ct=0,vt=D.length;ct<vt;ct++){const Mt=D[ct];ns.isClockWise(Mt)&&(D[ct]=Mt.reverse())}}function W(ct){const Mt=10000000000000001e-36;let It=ct[0];for(let yt=1;yt<=ct.length;yt++){const Kt=yt%ct.length,zt=ct[Kt],te=zt.x-It.x,Vt=zt.y-It.y,ce=te*te+Vt*Vt,O=Math.max(Math.abs(zt.x),Math.abs(zt.y),Math.abs(It.x),Math.abs(It.y)),Le=Mt*O*O;if(ce<=Le){ct.splice(Kt,1),yt--;continue}It=zt}}W(R),D.forEach(W);const N=D.length,H=R;for(let ct=0;ct<N;ct++){const vt=D[ct];R=R.concat(vt)}function J(ct,vt,Mt){return vt||he("ExtrudeGeometry: vec does not exist"),ct.clone().addScaledVector(vt,Mt)}const k=R.length;function j(ct,vt,Mt){let It,yt,Kt;const zt=ct.x-vt.x,te=ct.y-vt.y,Vt=Mt.x-ct.x,ce=Mt.y-ct.y,O=zt*zt+te*te,Le=zt*ce-te*Vt;if(Math.abs(Le)>Number.EPSILON){const G=Math.sqrt(O),st=Math.sqrt(Vt*Vt+ce*ce),B=vt.x-te/G,ot=vt.y+zt/G,it=Mt.x-ce/st,q=Mt.y+Vt/st,y=((it-B)*ce-(q-ot)*Vt)/(zt*ce-te*Vt);It=B+zt*y-ct.x,yt=ot+te*y-ct.y;const x=It*It+yt*yt;if(x<=2)return new ft(It,yt);Kt=Math.sqrt(x/2)}else{let G=!1;zt>Number.EPSILON?Vt>Number.EPSILON&&(G=!0):zt<-Number.EPSILON?Vt<-Number.EPSILON&&(G=!0):Math.sign(te)===Math.sign(ce)&&(G=!0),G?(It=-te,yt=zt,Kt=Math.sqrt(O)):(It=zt,yt=te,Kt=Math.sqrt(O/2))}return new ft(It/Kt,yt/Kt)}const $=[];for(let ct=0,vt=H.length,Mt=vt-1,It=ct+1;ct<vt;ct++,Mt++,It++)Mt===vt&&(Mt=0),It===vt&&(It=0),$[ct]=j(H[ct],H[Mt],H[It]);const nt=[];let lt,Nt=$.concat();for(let ct=0,vt=N;ct<vt;ct++){const Mt=D[ct];lt=[];for(let It=0,yt=Mt.length,Kt=yt-1,zt=It+1;It<yt;It++,Kt++,zt++)Kt===yt&&(Kt=0),zt===yt&&(zt=0),lt[It]=j(Mt[It],Mt[Kt],Mt[zt]);nt.push(lt),Nt=Nt.concat(lt)}let pt;if(m===0)pt=ns.triangulateShape(H,D);else{const ct=[],vt=[];for(let Mt=0;Mt<m;Mt++){const It=Mt/m,yt=d*Math.cos(It*Math.PI/2),Kt=g*Math.sin(It*Math.PI/2)+M;for(let zt=0,te=H.length;zt<te;zt++){const Vt=J(H[zt],$[zt],Kt);Bt(Vt.x,Vt.y,-yt),It===0&&ct.push(Vt)}for(let zt=0,te=N;zt<te;zt++){const Vt=D[zt];lt=nt[zt];const ce=[];for(let O=0,Le=Vt.length;O<Le;O++){const G=J(Vt[O],lt[O],Kt);Bt(G.x,G.y,-yt),It===0&&ce.push(G)}It===0&&vt.push(ce)}}pt=ns.triangulateShape(ct,vt)}const X=pt.length,St=g+M;for(let ct=0;ct<k;ct++){const vt=f?J(R[ct],Nt[ct],St):R[ct];v?(_.copy(A.normals[0]).multiplyScalar(vt.x),T.copy(A.binormals[0]).multiplyScalar(vt.y),b.copy(w[0]).add(_).add(T),Bt(b.x,b.y,b.z)):Bt(vt.x,vt.y,0)}for(let ct=1;ct<=h;ct++)for(let vt=0;vt<k;vt++){const Mt=f?J(R[vt],Nt[vt],St):R[vt];v?(_.copy(A.normals[ct]).multiplyScalar(Mt.x),T.copy(A.binormals[ct]).multiplyScalar(Mt.y),b.copy(w[ct]).add(_).add(T),Bt(b.x,b.y,b.z)):Bt(Mt.x,Mt.y,u/h*ct)}for(let ct=m-1;ct>=0;ct--){const vt=ct/m,Mt=d*Math.cos(vt*Math.PI/2),It=g*Math.sin(vt*Math.PI/2)+M;for(let yt=0,Kt=H.length;yt<Kt;yt++){const zt=J(H[yt],$[yt],It);Bt(zt.x,zt.y,u+Mt)}for(let yt=0,Kt=D.length;yt<Kt;yt++){const zt=D[yt];lt=nt[yt];for(let te=0,Vt=zt.length;te<Vt;te++){const ce=J(zt[te],lt[te],It);v?Bt(ce.x,ce.y+w[h-1].y,w[h-1].x+Mt):Bt(ce.x,ce.y,u+Mt)}}}At(),Rt();function At(){const ct=s.length/3;if(f){let vt=0,Mt=k*vt;for(let It=0;It<X;It++){const yt=pt[It];de(yt[2]+Mt,yt[1]+Mt,yt[0]+Mt)}vt=h+m*2,Mt=k*vt;for(let It=0;It<X;It++){const yt=pt[It];de(yt[0]+Mt,yt[1]+Mt,yt[2]+Mt)}}else{for(let vt=0;vt<X;vt++){const Mt=pt[vt];de(Mt[2],Mt[1],Mt[0])}for(let vt=0;vt<X;vt++){const Mt=pt[vt];de(Mt[0]+k*h,Mt[1]+k*h,Mt[2]+k*h)}}n.addGroup(ct,s.length/3-ct,0)}function Rt(){const ct=s.length/3;let vt=0;mt(H,vt),vt+=H.length;for(let Mt=0,It=D.length;Mt<It;Mt++){const yt=D[Mt];mt(yt,vt),vt+=yt.length}n.addGroup(ct,s.length/3-ct,1)}function mt(ct,vt){let Mt=ct.length;for(;--Mt>=0;){const It=Mt;let yt=Mt-1;yt<0&&(yt=ct.length-1);for(let Kt=0,zt=h+m*2;Kt<zt;Kt++){const te=k*Kt,Vt=k*(Kt+1),ce=vt+It+te,O=vt+yt+te,Le=vt+yt+Vt,G=vt+It+Vt;Ht(ce,O,Le,G)}}}function Bt(ct,vt,Mt){l.push(ct),l.push(vt),l.push(Mt)}function de(ct,vt,Mt){Qt(ct),Qt(vt),Qt(Mt);const It=s.length/3,yt=S.generateTopUV(n,s,It-3,It-2,It-1);ie(yt[0]),ie(yt[1]),ie(yt[2])}function Ht(ct,vt,Mt,It){Qt(ct),Qt(vt),Qt(It),Qt(vt),Qt(Mt),Qt(It);const yt=s.length/3,Kt=S.generateSideWallUV(n,s,yt-6,yt-3,yt-2,yt-1);ie(Kt[0]),ie(Kt[1]),ie(Kt[3]),ie(Kt[1]),ie(Kt[2]),ie(Kt[3])}function Qt(ct){s.push(l[ct*3+0]),s.push(l[ct*3+1]),s.push(l[ct*3+2])}function ie(ct){r.push(ct.x),r.push(ct.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Rd(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,a=t.shapes.length;r<a;r++){const o=e[t.shapes[r]];n.push(o)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new ha[s.type]().fromJSON(s)),new Ml(n,t.options)}}const Ad={generateTopUV:function(i,t,e,n,s){const r=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],c=t[s*3],h=t[s*3+1];return[new ft(r,a),new ft(o,l),new ft(c,h)]},generateSideWallUV:function(i,t,e,n,s,r){const a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],u=t[n*3+2],f=t[s*3],d=t[s*3+1],g=t[s*3+2],M=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new ft(a,1-l),new ft(c,1-u),new ft(f,1-g),new ft(M,1-p)]:[new ft(o,1-l),new ft(h,1-u),new ft(d,1-g),new ft(m,1-p)]}};function Rd(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class un extends Ee{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,u=t/o,f=e/l,d=[],g=[],M=[],m=[];for(let p=0;p<h;p++){const S=p*f-a;for(let w=0;w<c;w++){const v=w*u-r;g.push(v,-S,0),M.push(0,0,1),m.push(w/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let S=0;S<o;S++){const w=S+c*p,v=S+c*(p+1),A=S+1+c*(p+1),T=S+1+c*p;d.push(w,v,T),d.push(v,A,T)}this.setIndex(d),this.setAttribute("position",new le(g,3)),this.setAttribute("normal",new le(M,3)),this.setAttribute("uv",new le(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new un(t.width,t.height,t.widthSegments,t.heightSegments)}}class An extends Ee{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new C,f=new C,d=[],g=[],M=[],m=[];for(let p=0;p<=n;p++){const S=[],w=p/n,v=a+w*o,A=t*Math.cos(v),T=Math.sqrt(t*t-A*A);let _=0;p===0&&a===0?_=.5/e:p===n&&l===Math.PI&&(_=-.5/e);for(let b=0;b<=e;b++){const L=b/e,R=s+L*r;u.x=-T*Math.cos(R),u.y=A,u.z=T*Math.sin(R),g.push(u.x,u.y,u.z),f.copy(u).normalize(),M.push(f.x,f.y,f.z),m.push(L+_,1-w),S.push(c++)}h.push(S)}for(let p=0;p<n;p++)for(let S=0;S<e;S++){const w=h[p][S+1],v=h[p][S],A=h[p+1][S],T=h[p+1][S+1];(p!==0||a>0)&&d.push(w,v,T),(p!==n-1||l<Math.PI)&&d.push(v,A,T)}this.setIndex(d),this.setAttribute("position",new le(g,3)),this.setAttribute("normal",new le(M,3)),this.setAttribute("uv",new le(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new An(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class ds extends Ee{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);const l=[],c=[],h=[],u=[],f=new C,d=new C,g=new C;for(let M=0;M<=n;M++){const m=a+M/n*o;for(let p=0;p<=s;p++){const S=p/s*r;d.x=(t+e*Math.cos(m))*Math.cos(S),d.y=(t+e*Math.cos(m))*Math.sin(S),d.z=e*Math.sin(m),c.push(d.x,d.y,d.z),f.x=t*Math.cos(S),f.y=t*Math.sin(S),g.subVectors(d,f).normalize(),h.push(g.x,g.y,g.z),u.push(p/s),u.push(M/n)}}for(let M=1;M<=n;M++)for(let m=1;m<=s;m++){const p=(s+1)*M+m-1,S=(s+1)*(M-1)+m-1,w=(s+1)*(M-1)+m,v=(s+1)*M+m;l.push(p,S,v),l.push(S,w,v)}this.setIndex(l),this.setAttribute("position",new le(c,3)),this.setAttribute("normal",new le(h,3)),this.setAttribute("uv",new le(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ds(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}}class Sl extends Ee{constructor(t=new Xh(new C(-1,-1,0),new C(-1,1,0),new C(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};const a=t.computeFrenetFrames(e,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new C,l=new C,c=new ft;let h=new C;const u=[],f=[],d=[],g=[];M(),this.setIndex(g),this.setAttribute("position",new le(u,3)),this.setAttribute("normal",new le(f,3)),this.setAttribute("uv",new le(d,2));function M(){for(let w=0;w<e;w++)m(w);m(r===!1?e:0),S(),p()}function m(w){h=t.getPointAt(w/e,h);const v=a.normals[w],A=a.binormals[w];for(let T=0;T<=s;T++){const _=T/s*Math.PI*2,b=Math.sin(_),L=-Math.cos(_);l.x=L*v.x+b*A.x,l.y=L*v.y+b*A.y,l.z=L*v.z+b*A.z,l.normalize(),f.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,u.push(o.x,o.y,o.z)}}function p(){for(let w=1;w<=e;w++)for(let v=1;v<=s;v++){const A=(s+1)*(w-1)+(v-1),T=(s+1)*w+(v-1),_=(s+1)*w+v,b=(s+1)*(w-1)+v;g.push(A,T,b),g.push(T,_,b)}}function S(){for(let w=0;w<=e;w++)for(let v=0;v<=s;v++)c.x=w/e,c.y=v/s,d.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Sl(new ha[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}function hs(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];if(Cc(s))s.isRenderTargetTexture?(Zt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(Cc(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function tn(i){const t={};for(let e=0;e<i.length;e++){const n=hs(i[e]);for(const s in n)t[s]=n[s]}return t}function Cc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Cd(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Qh(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:oe.workingColorSpace}const er={clone:hs,merge:tn};var Pd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ld=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class an extends ui{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Pd,this.fragmentShader=Ld,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=hs(t.uniforms),this.uniformsGroups=Cd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const n in t.uniforms){const s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new qt().setHex(s.value);break;case"v2":this.uniforms[n].value=new ft().fromArray(s.value);break;case"v3":this.uniforms[n].value=new C().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Re().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Jt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new me().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class jh extends an{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Gt extends ui{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new qt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Bo,this.normalScale=new ft(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Nn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Dd extends ui{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ju,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Id extends ui{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class yl extends Pe{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new qt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class Nd extends yl{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Pe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new qt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const Ya=new me,Pc=new C,Lc=new C;class tu{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ft(512,512),this.mapType=fn,this.map=null,this.mapPass=null,this.matrix=new me,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Js,this._frameExtents=new ft(1,1),this._viewportCount=1,this._viewports=[new Re(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera;Pc.setFromMatrixPosition(t.matrixWorld),e.position.copy(Pc),Lc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Lc),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){Ya.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(Ya,t.coordinateSystem,t.reversedDepth);const r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;t.coordinateSystem===Zs||t.reversedDepth?e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),e.multiply(Ya)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Fr=new C,Or=new fs,Pn=new C;class eu extends Pe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new me,this.projectionMatrix=new me,this.projectionMatrixInverse=new me,this.coordinateSystem=Tn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Fr,Or,Pn),Pn.x===1&&Pn.y===1&&Pn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Fr,Or,Pn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(Fr,Or,Pn),Pn.x===1&&Pn.y===1&&Pn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Fr,Or,Pn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ii=new C,Dc=new ft,Ic=new ft;class _n extends eu{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ks*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ks*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ks*2*Math.atan(Math.tan(ks*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ii.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ii.x,ii.y).multiplyScalar(-t/ii.z),ii.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ii.x,ii.y).multiplyScalar(-t/ii.z)}getViewSize(t,e){return this.getViewBounds(t,Dc,Ic),e.subVectors(Ic,Dc)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ks*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class Ud extends tu{constructor(){super(new _n(90,1,.5,500)),this.isPointLightShadow=!0}}class ai extends yl{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Ud}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}}class bl extends eu{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Fd extends tu{constructor(){super(new bl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Nc extends yl{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Pe.DEFAULT_UP),this.updateMatrix(),this.target=new Pe,this.shadow=new Fd}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}const Zi=-90,Ki=1;class Vo extends Pe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new _n(Zi,Ki,t,e);s.layers=this.layers,this.add(s);const r=new _n(Zi,Ki,t,e);r.layers=this.layers,this.add(r);const a=new _n(Zi,Ki,t,e);a.layers=this.layers,this.add(a);const o=new _n(Zi,Ki,t,e);o.layers=this.layers,this.add(o);const l=new _n(Zi,Ki,t,e);l.layers=this.layers,this.add(l);const c=new _n(Zi,Ki,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===Tn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Zs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const M=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.mipmapsAutoUpdate=M,t.setRenderTarget(n,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Od extends _n{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}}class Bd{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(t){this._document=t,t.hidden!==void 0&&(this._pageVisibilityHandler=zd.bind(this),t.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(t){return this._timescale=t,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(t){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(t!==void 0?t:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function zd(){this._document.hidden===!1&&this.reset()}const Uc=new me;class nu{constructor(t,e,n=0,s=1/0){this.ray=new pa(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new fl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):he("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Uc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Uc),this}intersectObject(t,e=!0,n=[]){return Wo(t,this,n,e),n.sort(Fc),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Wo(t[s],this,n,e);return n.sort(Fc),n}}function Fc(i,t){return i.distance-t.distance}function Wo(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)Wo(r[a],t,e,!0)}}const Il=class Il{constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){const r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};Il.prototype.isMatrix2=!0;let Oc=Il;function Bc(i,t,e,n){const s=kd(n);switch(e){case bh:return i*t;case sl:return i*t/s.components*s.byteLength;case rl:return i*t/s.components*s.byteLength;case Ti:return i*t*2/s.components*s.byteLength;case al:return i*t*2/s.components*s.byteLength;case Eh:return i*t*3/s.components*s.byteLength;case dn:return i*t*4/s.components*s.byteLength;case ol:return i*t*4/s.components*s.byteLength;case Yr:case Zr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Kr:case Jr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case lo:case ho:return Math.max(i,16)*Math.max(t,8)/4;case oo:case co:return Math.max(i,8)*Math.max(t,8)/2;case uo:case fo:case mo:case go:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case po:case ta:case _o:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case xo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case vo:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Mo:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case So:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case yo:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case bo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Eo:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case wo:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case To:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Ao:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Ro:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Co:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Po:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Lo:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Do:case Io:case No:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Uo:case Fo:return Math.ceil(i/4)*Math.ceil(t/4)*8;case ea:case Oo:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function kd(i){switch(i){case fn:case vh:return{byteLength:1,components:1};case Ys:case Mh:case on:return{byteLength:2,components:1};case nl:case il:return{byteLength:2,components:4};case In:case el:case wn:return{byteLength:4,components:1};case Sh:case yh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Zo}}));typeof window<"u"&&(window.__THREE__?Zt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Zo);function iu(){let i=null,t=!1,e=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Gd(i){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,u=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,h),o.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const h=l.array,u=l.updateRanges;if(i.bindBuffer(c,o),u.length===0)i.bufferSubData(c,0,h);else{u.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<u.length;d++){const g=u[f],M=u[d];M.start<=g.start+g.count+1?g.count=Math.max(g.count,M.start+M.count-g.start):(++f,u[f]=M)}u.length=f+1;for(let d=0,g=u.length;d<g;d++){const M=u[d];i.bufferSubData(c,M.start*h.BYTES_PER_ELEMENT,h,M.start,M.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Hd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Vd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Wd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Xd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,qd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Yd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Zd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Kd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Jd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,$d=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Qd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,jd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,tp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,ep=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,np=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,ip=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,sp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,rp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ap=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,op=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,lp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,cp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,hp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,up=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,fp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,dp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,pp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,mp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,gp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,_p="gl_FragColor = linearToOutputTexel( gl_FragColor );",xp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,vp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Mp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,Sp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,yp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,bp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Ep=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,wp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Tp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ap=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Rp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Cp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Pp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Lp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Dp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Ip=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Np=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Up=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Fp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Op=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Bp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,zp=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,kp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Gp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Hp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Vp=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Wp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Xp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Yp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Zp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Kp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Jp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,$p=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Qp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,jp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,t0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,e0=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,n0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,i0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,s0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,r0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,a0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,o0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,l0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,c0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,h0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,u0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,f0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,d0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,p0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,m0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,g0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,_0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,x0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,v0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,M0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,S0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,y0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,b0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,E0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,w0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,T0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,A0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,R0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,C0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,P0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,L0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,D0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,I0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,N0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,U0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,F0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,O0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,B0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,z0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,k0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const G0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,H0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,V0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,W0=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,X0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,q0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Y0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Z0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,K0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,J0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,$0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Q0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,j0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,tm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,em=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,nm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,im=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,sm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,am=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,om=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,lm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,cm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,um=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,fm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,pm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,gm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,_m=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,vm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Mm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ne={alphahash_fragment:Hd,alphahash_pars_fragment:Vd,alphamap_fragment:Wd,alphamap_pars_fragment:Xd,alphatest_fragment:qd,alphatest_pars_fragment:Yd,aomap_fragment:Zd,aomap_pars_fragment:Kd,batching_pars_vertex:Jd,batching_vertex:$d,begin_vertex:Qd,beginnormal_vertex:jd,bsdfs:tp,iridescence_fragment:ep,bumpmap_pars_fragment:np,clipping_planes_fragment:ip,clipping_planes_pars_fragment:sp,clipping_planes_pars_vertex:rp,clipping_planes_vertex:ap,color_fragment:op,color_pars_fragment:lp,color_pars_vertex:cp,color_vertex:hp,common:up,defaultnormal_vertex:fp,displacementmap_pars_vertex:dp,displacementmap_vertex:pp,emissivemap_fragment:mp,emissivemap_pars_fragment:gp,colorspace_fragment:_p,colorspace_pars_fragment:xp,envmap_fragment:vp,envmap_common_pars_fragment:Mp,envmap_pars_fragment:Sp,envmap_pars_vertex:yp,envmap_physical_pars_fragment:Ip,envmap_vertex:bp,fog_vertex:Ep,fog_pars_vertex:wp,fog_fragment:Tp,fog_pars_fragment:Ap,gradientmap_pars_fragment:Rp,lightmap_pars_fragment:Cp,lights_lambert_fragment:Pp,lights_lambert_pars_fragment:Lp,lights_pars_begin:Dp,lights_toon_fragment:Np,lights_toon_pars_fragment:Up,lights_phong_fragment:Fp,lights_phong_pars_fragment:Op,lights_physical_fragment:Bp,lights_physical_pars_fragment:zp,lights_fragment_begin:kp,lights_fragment_maps:Gp,lights_fragment_end:Hp,lightprobes_pars_fragment:Vp,logdepthbuf_fragment:Wp,logdepthbuf_pars_fragment:Xp,logdepthbuf_pars_vertex:qp,logdepthbuf_vertex:Yp,map_fragment:Zp,map_pars_fragment:Kp,map_particle_fragment:Jp,map_particle_pars_fragment:$p,metalnessmap_fragment:Qp,metalnessmap_pars_fragment:jp,morphinstance_vertex:t0,morphcolor_vertex:e0,morphnormal_vertex:n0,morphtarget_pars_vertex:i0,morphtarget_vertex:s0,normal_fragment_begin:r0,normal_fragment_maps:a0,normal_pars_fragment:o0,normal_pars_vertex:l0,normal_vertex:c0,normalmap_pars_fragment:h0,clearcoat_normal_fragment_begin:u0,clearcoat_normal_fragment_maps:f0,clearcoat_pars_fragment:d0,iridescence_pars_fragment:p0,opaque_fragment:m0,packing:g0,premultiplied_alpha_fragment:_0,project_vertex:x0,dithering_fragment:v0,dithering_pars_fragment:M0,roughnessmap_fragment:S0,roughnessmap_pars_fragment:y0,shadowmap_pars_fragment:b0,shadowmap_pars_vertex:E0,shadowmap_vertex:w0,shadowmask_pars_fragment:T0,skinbase_vertex:A0,skinning_pars_vertex:R0,skinning_vertex:C0,skinnormal_vertex:P0,specularmap_fragment:L0,specularmap_pars_fragment:D0,tonemapping_fragment:I0,tonemapping_pars_fragment:N0,transmission_fragment:U0,transmission_pars_fragment:F0,uv_pars_fragment:O0,uv_pars_vertex:B0,uv_vertex:z0,worldpos_vertex:k0,background_vert:G0,background_frag:H0,backgroundCube_vert:V0,backgroundCube_frag:W0,cube_vert:X0,cube_frag:q0,depth_vert:Y0,depth_frag:Z0,distance_vert:K0,distance_frag:J0,equirect_vert:$0,equirect_frag:Q0,linedashed_vert:j0,linedashed_frag:tm,meshbasic_vert:em,meshbasic_frag:nm,meshlambert_vert:im,meshlambert_frag:sm,meshmatcap_vert:rm,meshmatcap_frag:am,meshnormal_vert:om,meshnormal_frag:lm,meshphong_vert:cm,meshphong_frag:hm,meshphysical_vert:um,meshphysical_frag:fm,meshtoon_vert:dm,meshtoon_frag:pm,points_vert:mm,points_frag:gm,shadow_vert:_m,shadow_frag:xm,sprite_vert:vm,sprite_frag:Mm},Pt={common:{diffuse:{value:new qt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Jt},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Jt}},envmap:{envMap:{value:null},envMapRotation:{value:new Jt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Jt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Jt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Jt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Jt},normalScale:{value:new ft(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Jt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Jt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Jt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Jt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new qt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0},uvTransform:{value:new Jt}},sprite:{diffuse:{value:new qt(16777215)},opacity:{value:1},center:{value:new ft(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Jt},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0}}},Dn={basic:{uniforms:tn([Pt.common,Pt.specularmap,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.fog]),vertexShader:ne.meshbasic_vert,fragmentShader:ne.meshbasic_frag},lambert:{uniforms:tn([Pt.common,Pt.specularmap,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.fog,Pt.lights,{emissive:{value:new qt(0)},envMapIntensity:{value:1}}]),vertexShader:ne.meshlambert_vert,fragmentShader:ne.meshlambert_frag},phong:{uniforms:tn([Pt.common,Pt.specularmap,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.fog,Pt.lights,{emissive:{value:new qt(0)},specular:{value:new qt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ne.meshphong_vert,fragmentShader:ne.meshphong_frag},standard:{uniforms:tn([Pt.common,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.roughnessmap,Pt.metalnessmap,Pt.fog,Pt.lights,{emissive:{value:new qt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ne.meshphysical_vert,fragmentShader:ne.meshphysical_frag},toon:{uniforms:tn([Pt.common,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.gradientmap,Pt.fog,Pt.lights,{emissive:{value:new qt(0)}}]),vertexShader:ne.meshtoon_vert,fragmentShader:ne.meshtoon_frag},matcap:{uniforms:tn([Pt.common,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.fog,{matcap:{value:null}}]),vertexShader:ne.meshmatcap_vert,fragmentShader:ne.meshmatcap_frag},points:{uniforms:tn([Pt.points,Pt.fog]),vertexShader:ne.points_vert,fragmentShader:ne.points_frag},dashed:{uniforms:tn([Pt.common,Pt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ne.linedashed_vert,fragmentShader:ne.linedashed_frag},depth:{uniforms:tn([Pt.common,Pt.displacementmap]),vertexShader:ne.depth_vert,fragmentShader:ne.depth_frag},normal:{uniforms:tn([Pt.common,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,{opacity:{value:1}}]),vertexShader:ne.meshnormal_vert,fragmentShader:ne.meshnormal_frag},sprite:{uniforms:tn([Pt.sprite,Pt.fog]),vertexShader:ne.sprite_vert,fragmentShader:ne.sprite_frag},background:{uniforms:{uvTransform:{value:new Jt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ne.background_vert,fragmentShader:ne.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Jt}},vertexShader:ne.backgroundCube_vert,fragmentShader:ne.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ne.cube_vert,fragmentShader:ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ne.equirect_vert,fragmentShader:ne.equirect_frag},distance:{uniforms:tn([Pt.common,Pt.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ne.distance_vert,fragmentShader:ne.distance_frag},shadow:{uniforms:tn([Pt.lights,Pt.fog,{color:{value:new qt(0)},opacity:{value:1}}]),vertexShader:ne.shadow_vert,fragmentShader:ne.shadow_frag}};Dn.physical={uniforms:tn([Dn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Jt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Jt},clearcoatNormalScale:{value:new ft(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Jt},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Jt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Jt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Jt},sheen:{value:0},sheenColor:{value:new qt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Jt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Jt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Jt},transmissionSamplerSize:{value:new ft},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Jt},attenuationDistance:{value:0},attenuationColor:{value:new qt(0)},specularColor:{value:new qt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Jt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Jt},anisotropyVector:{value:new ft},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Jt}}]),vertexShader:ne.meshphysical_vert,fragmentShader:ne.meshphysical_frag};const Br={r:0,b:0,g:0},Sm=new me,su=new Jt;su.set(-1,0,0,0,1,0,0,0,1);function ym(i,t,e,n,s,r){const a=new qt(0);let o=s===!0?0:1,l,c,h=null,u=0,f=null;function d(S){let w=S.isScene===!0?S.background:null;if(w&&w.isTexture){const v=S.backgroundBlurriness>0;w=t.get(w,v)}return w}function g(S){let w=!1;const v=d(S);v===null?m(a,o):v&&v.isColor&&(m(v,1),w=!0);const A=i.xr.getEnvironmentBlendMode();A==="additive"?e.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||w)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function M(S,w){const v=d(w);v&&v.isCubeTexture?(c===void 0&&(c=new Dt(new Yt(1,1,1),new an({name:"BackgroundCubeMaterial",uniforms:hs(Dn.backgroundCube.uniforms),vertexShader:Dn.backgroundCube.vertexShader,fragmentShader:Dn.backgroundCube.fragmentShader,side:nn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(A,T,_){this.matrixWorld.copyPosition(_.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Sm.makeRotationFromEuler(w.backgroundRotation)).transpose(),v.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(su),c.material.toneMapped=oe.getTransfer(v.colorSpace)!==_e,(h!==v||u!==v.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,h=v,u=v.version,f=i.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new Dt(new un(2,2),new an({name:"BackgroundMaterial",uniforms:hs(Dn.background.uniforms),vertexShader:Dn.background.vertexShader,fragmentShader:Dn.background.fragmentShader,side:Ei,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=oe.getTransfer(v.colorSpace)!==_e,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||u!==v.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,h=v,u=v.version,f=i.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function m(S,w){S.getRGB(Br,Qh(i)),e.buffers.color.setClear(Br.r,Br.g,Br.b,w,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,w=1){a.set(S),o=w,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(S){o=S,m(a,o)},render:g,addToRenderList:M,dispose:p}}function bm(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,a=!1;function o(D,z,W,N,H){let J=!1;const k=u(D,N,W,z);r!==k&&(r=k,c(r.object)),J=d(D,N,W,H),J&&g(D,N,W,H),H!==null&&t.update(H,i.ELEMENT_ARRAY_BUFFER),(J||a)&&(a=!1,v(D,z,W,N),H!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function l(){return i.createVertexArray()}function c(D){return i.bindVertexArray(D)}function h(D){return i.deleteVertexArray(D)}function u(D,z,W,N){const H=N.wireframe===!0;let J=n[z.id];J===void 0&&(J={},n[z.id]=J);const k=D.isInstancedMesh===!0?D.id:0;let j=J[k];j===void 0&&(j={},J[k]=j);let $=j[W.id];$===void 0&&($={},j[W.id]=$);let nt=$[H];return nt===void 0&&(nt=f(l()),$[H]=nt),nt}function f(D){const z=[],W=[],N=[];for(let H=0;H<e;H++)z[H]=0,W[H]=0,N[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:W,attributeDivisors:N,object:D,attributes:{},index:null}}function d(D,z,W,N){const H=r.attributes,J=z.attributes;let k=0;const j=W.getAttributes();for(const $ in j)if(j[$].location>=0){const lt=H[$];let Nt=J[$];if(Nt===void 0&&($==="instanceMatrix"&&D.instanceMatrix&&(Nt=D.instanceMatrix),$==="instanceColor"&&D.instanceColor&&(Nt=D.instanceColor)),lt===void 0||lt.attribute!==Nt||Nt&&lt.data!==Nt.data)return!0;k++}return r.attributesNum!==k||r.index!==N}function g(D,z,W,N){const H={},J=z.attributes;let k=0;const j=W.getAttributes();for(const $ in j)if(j[$].location>=0){let lt=J[$];lt===void 0&&($==="instanceMatrix"&&D.instanceMatrix&&(lt=D.instanceMatrix),$==="instanceColor"&&D.instanceColor&&(lt=D.instanceColor));const Nt={};Nt.attribute=lt,lt&&lt.data&&(Nt.data=lt.data),H[$]=Nt,k++}r.attributes=H,r.attributesNum=k,r.index=N}function M(){const D=r.newAttributes;for(let z=0,W=D.length;z<W;z++)D[z]=0}function m(D){p(D,0)}function p(D,z){const W=r.newAttributes,N=r.enabledAttributes,H=r.attributeDivisors;W[D]=1,N[D]===0&&(i.enableVertexAttribArray(D),N[D]=1),H[D]!==z&&(i.vertexAttribDivisor(D,z),H[D]=z)}function S(){const D=r.newAttributes,z=r.enabledAttributes;for(let W=0,N=z.length;W<N;W++)z[W]!==D[W]&&(i.disableVertexAttribArray(W),z[W]=0)}function w(D,z,W,N,H,J,k){k===!0?i.vertexAttribIPointer(D,z,W,H,J):i.vertexAttribPointer(D,z,W,N,H,J)}function v(D,z,W,N){M();const H=N.attributes,J=W.getAttributes(),k=z.defaultAttributeValues;for(const j in J){const $=J[j];if($.location>=0){let nt=H[j];if(nt===void 0&&(j==="instanceMatrix"&&D.instanceMatrix&&(nt=D.instanceMatrix),j==="instanceColor"&&D.instanceColor&&(nt=D.instanceColor)),nt!==void 0){const lt=nt.normalized,Nt=nt.itemSize,pt=t.get(nt);if(pt===void 0)continue;const X=pt.buffer,St=pt.type,At=pt.bytesPerElement,Rt=St===i.INT||St===i.UNSIGNED_INT||nt.gpuType===el;if(nt.isInterleavedBufferAttribute){const mt=nt.data,Bt=mt.isInterleavedBuffer===!0?mt.stride:mt.itemSize,de=nt.offset;if(mt.isInstancedInterleavedBuffer||mt.isInstancedBufferAttribute){for(let Ht=0;Ht<$.locationSize;Ht++)p($.location+Ht,mt.meshPerAttribute);D.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=mt.meshPerAttribute*mt.count)}else for(let Ht=0;Ht<$.locationSize;Ht++)m($.location+Ht);i.bindBuffer(i.ARRAY_BUFFER,X);for(let Ht=0;Ht<$.locationSize;Ht++)w($.location+Ht,Nt/$.locationSize,St,lt,Bt*At,(de+Nt/$.locationSize*Ht)*At,Rt)}else{if(nt.isInstancedBufferAttribute){for(let mt=0;mt<$.locationSize;mt++)p($.location+mt,nt.meshPerAttribute);D.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let mt=0;mt<$.locationSize;mt++)m($.location+mt);i.bindBuffer(i.ARRAY_BUFFER,X);for(let mt=0;mt<$.locationSize;mt++)w($.location+mt,Nt/$.locationSize,St,lt,Nt*At,Nt/$.locationSize*mt*At,Rt)}}else if(k!==void 0){const lt=k[j];if(lt!==void 0)switch(lt.length){case 2:i.vertexAttrib2fv($.location,lt);break;case 3:i.vertexAttrib3fv($.location,lt);break;case 4:i.vertexAttrib4fv($.location,lt);break;default:i.vertexAttrib1fv($.location,lt)}}}}S()}function A(){L();for(const D in n){const z=n[D];for(const W in z){const N=z[W];for(const H in N){const J=N[H];for(const k in J)h(J[k].object),delete J[k];delete N[H]}}delete n[D]}}function T(D){if(n[D.id]===void 0)return;const z=n[D.id];for(const W in z){const N=z[W];for(const H in N){const J=N[H];for(const k in J)h(J[k].object),delete J[k];delete N[H]}}delete n[D.id]}function _(D){for(const z in n){const W=n[z];for(const N in W){const H=W[N];if(H[D.id]===void 0)continue;const J=H[D.id];for(const k in J)h(J[k].object),delete J[k];delete H[D.id]}}}function b(D){for(const z in n){const W=n[z],N=D.isInstancedMesh===!0?D.id:0,H=W[N];if(H!==void 0){for(const J in H){const k=H[J];for(const j in k)h(k[j].object),delete k[j];delete H[J]}delete W[N],Object.keys(W).length===0&&delete n[z]}}}function L(){R(),a=!0,r!==s&&(r=s,c(r.object))}function R(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:L,resetDefaultState:R,dispose:A,releaseStatesOfGeometry:T,releaseStatesOfObject:b,releaseStatesOfProgram:_,initAttributes:M,enableAttribute:m,disableUnusedAttributes:S}}function Em(i,t,e){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),e.update(c,n,1)}function a(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let f=0;for(let d=0;d<h;d++)f+=c[d];e.update(f,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function wm(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const _=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(_.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(_){return!(_!==dn&&n.convert(_)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(_){const b=_===on&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(_!==fn&&_!==wn&&!b&&n.convert(_)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(_){if(_==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";_="mediump"}return _==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(Zt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=e.logarithmicDepthBuffer===!0&&u===!1;e.reversedDepthBuffer===!0&&u===!1&&Zt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&u===!0&&Zt("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");const d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=i.getParameter(i.MAX_SAMPLES),T=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:d,maxVertexTextures:g,maxTextureSize:M,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:S,maxVaryings:w,maxFragmentUniforms:v,maxSamples:A,samples:T}}function Tm(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new si,o=new Jt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){const g=u.clippingPlanes,M=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{const S=r?0:n,w=S*4;let v=p.clippingState||null;l.value=v,v=h(g,f,w,d);for(let A=0;A!==w;++A)v[A]=e[A];p.clippingState=v,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,g){const M=u!==null?u.length:0;let m=null;if(M!==0){if(m=l.value,g!==!0||m===null){const p=d+M*4,S=f.matrixWorldInverse;o.getNormalMatrix(S),(m===null||m.length<p)&&(m=new Float32Array(p));for(let w=0,v=d;w!==M;++w,v+=4)a.copy(u[w]).applyMatrix4(S,o),a.normal.toArray(m,v),m[v+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=M,t.numIntersection=0,m}}class El extends ln{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Bh(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Yt(5,5,5),r=new an({name:"CubemapFromEquirect",uniforms:hs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:nn,blending:Si});r.uniforms.tEquirect.value=e;const a=new Dt(s,r),o=e.minFilter;return e.minFilter===Wn&&(e.minFilter=qe),new Vo(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}const zc=256,Am=3,Rm=20,ru=256,au=16,Cm=3,Pm=new C,Lm=new qt;class nr{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Vo(1,10,null),this._boxMesh=new Dt(new Yt(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){const{size:a=256,position:o=Pm}=r,l=this._renderer;this._setSize(a);const c=this._allocateTarget(),h=this._getSourceTarget(!0);e>0&&(h.texture.mipmapsAutoUpdate=!1);const u=l.autoClear,f=l.autoClearColor,d=l.autoClearDepth,g=l.autoClearStencil,M=t.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,M===null&&(t.background=l.getClearColor(Lm));const m=new Vo(n,s,h);return m.position.copy(o),m.update(l,t),l.autoClear=u,l.autoClearColor=f,l.autoClearDepth=d,l.autoClearStencil=g,t.background=M,e>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(c,e)),this._applyPMREM(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Hc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Gc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(zc,Ph(t))}_fromTexture(t,e){t.mapping===as||t.mapping===qs?this._setSize(t.image.length===0?zc:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);const n=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(n),n}_allocateTarget(){const t=this._cubeSize,e=kc(t,!1,!1),n=Math.log2(t)-Am;for(let s=0;s<=n;s++)e.texture.mipmaps.push({width:t>>s,height:t>>s});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){const e=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==e||t&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=kc(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,n){const s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=t,r.activeMipmapLevel=e;const a=t.width>>e;t.viewport.set(0,0,a,a),r.update(this._renderer,s),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===as||t.mapping===qs?(this._cubemapMaterial===null&&(this._cubemapMaterial=Hc()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Gc()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=Dm(),this._integrationMaterial=Im());const e=this._cubeSize,n=t.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;const r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(e/au);for(let a=0;a<=n;a++){const o=nr.lodToRoughness(a,n);if(a>n-Cm)r.roughness.value=o,this._renderCube(t,a,this._integrationMaterial);else{const l=o>0?Math.log2(e)+.5*Math.log2(6/(ru*Math.pow(o,4)))+.5:0;s.roughness.value=o,s.lodBias.value=l,this._renderCube(t,a,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=Nm());const n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(t,0,n),s.envMap.value=t.texture,this._renderCube(r,0,n)}}function kc(i,t,e){return new El(i,{minFilter:Wn,generateMipmaps:t,type:on,colorSpace:na,depthBuffer:e})}function sr(i,t,e){return new an({name:i,uniforms:t,vertexShader:ne.cube_vert,fragmentShader:e,side:nn,blending:Si,depthTest:!1,depthWrite:!1})}function Dm(){return sr("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${ru}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Im(){return sr("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:au}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Nm(){return sr("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${Rm}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function Gc(){return sr("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function Hc(){return sr("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function Um(i){let t=new WeakMap,e=new WeakMap,n=null;function s(f,d=!1){return f==null?null:d?a(f):r(f)}function r(f){if(f&&f.isTexture){const d=f.mapping;if(d===qr||d===va)if(t.has(f)){const g=t.get(f).texture;return o(g,f.mapping)}else{const g=f.image;if(g&&g.height>0){const M=new El(g.height);return M.fromEquirectangularTexture(i,f),t.set(f,M),f.addEventListener("dispose",c),o(M.texture,f.mapping)}else return null}}return f}function a(f){if(f&&f.isTexture&&f.isPMREMTexture!==!0){const d=f.mapping,g=d===qr||d===va,M=d===as||d===qs;if(g||M){let m=e.get(f);const p=m!==void 0?m.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==p)return n===null&&(n=new nr(i)),m=g?n.fromEquirectangular(f,m):n.fromCubemap(f,m),m.texture.pmremVersion=f.pmremVersion,e.set(f,m),m.texture;if(m!==void 0)return m.texture;{const S=f.image;return g&&S&&S.height>0||M&&S&&l(S)?(n===null&&(n=new nr(i)),m=g?n.fromEquirectangular(f):n.fromCubemap(f),m.texture.pmremVersion=f.pmremVersion,e.set(f,m),f.addEventListener("dispose",h),m.texture):null}}}return f}function o(f,d){return d===qr?f.mapping=as:d===va&&(f.mapping=qs),f}function l(f){let d=0;const g=6;for(let M=0;M<g;M++)f[M]!==void 0&&d++;return d===g}function c(f){const d=f.target;d.removeEventListener("dispose",c);const g=t.get(d);g!==void 0&&(t.delete(d),g.dispose())}function h(f){const d=f.target;d.removeEventListener("dispose",h);const g=e.get(d);g!==void 0&&(e.delete(d),g.dispose())}function u(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function Fm(i){const t={};function e(n){if(t[n]!==void 0)return t[n];const s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&$r("WebGLRenderer: "+n+" extension not supported."),s}}}function Om(i,t,e,n){const s={},r=new WeakMap,a=new FinalizationRegistry(g=>delete s[g]);function o(g){l(g.target)}function l(g){g.index!==null&&t.remove(g.index);for(const m in g.attributes)t.remove(g.attributes[m]);g.removeEventListener("dispose",o),delete s[g.id],a.unregister(g);const M=r.get(g);M&&(t.remove(M),r.delete(g)),n.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,e.memory.geometries--}function c(g,M){return s[M.id]!==void 0||(M.addEventListener("dispose",o),s[M.id]=new WeakRef(M),a.register(M,M.id,M),e.memory.geometries++),M}function h(g){const M=g.attributes;for(const m in M)t.update(M[m],i.ARRAY_BUFFER)}function u(g){const M=g.index,m=g.attributes.position;let p=0;if(m===void 0)return;const S=M!==null?M.array.length:m.array.length/3-1,w=m.count>=65535?Nh:Ih,v=new w(Math.ceil(S/3)*6,1),A=v.array;if(M!==null){const _=M.array;p=M.version;for(let b=0,L=0;b<S;b+=3){const R=_[b+0],D=_[b+1],z=_[b+2];A[L++]=R,A[L++]=D,A[L++]=D,A[L++]=z,A[L++]=z,A[L++]=R}}else{p=m.version;for(let _=0,b=0;_<S;_+=3){const L=_+0,R=_+1,D=_+2;A[b++]=L,A[b++]=R,A[b++]=R,A[b++]=D,A[b++]=D,A[b++]=L}}v.version=p;const T=r.get(g);T&&t.remove(T),r.set(g,v)}function f(g){const M=r.get(g);if(M){const m=g.index;m!==null&&M.version<m.version&&u(g)}else u(g);return r.get(g)}function d(){for(const g in s){const M=s[g].deref();M!==void 0&&l(M)}}return{get:c,update:h,getWireframeAttribute:f,dispose:d}}function Bm(i,t,e){let n;function s(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function l(u,f){i.drawElements(n,f,r,u*a),e.update(f,n,1)}function c(u,f,d){d!==0&&(i.drawElementsInstanced(n,f,r,u*a,d),e.update(f,n,d))}function h(u,f,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,d);let M=0;for(let m=0;m<d;m++)M+=f[m];e.update(M,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function zm(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:he("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function km(i,t,e){const n=new WeakMap,s=new Re;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(o);if(f===void 0||f.count!==u){let R=function(){b.dispose(),n.delete(o),o.removeEventListener("dispose",R)};var d=R;f!==void 0&&f.texture.dispose();const g=o.morphAttributes.position!==void 0,M=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],S=o.morphAttributes.normal||[],w=o.morphAttributes.color||[];let v=0;g===!0&&(v=1),M===!0&&(v=2),m===!0&&(v=3);let A=o.attributes.position.count*v,T=1;A>t.maxTextureSize&&(T=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);const _=new Float32Array(A*T*4*u),b=new Lh(_,A,T,u);b.type=wn,b.needsUpdate=!0;const L=v*4;for(let D=0;D<u;D++){const z=p[D],W=S[D],N=w[D],H=A*T*4*D;for(let J=0;J<z.count;J++){const k=J*L;g===!0&&(s.fromBufferAttribute(z,J),_[H+k+0]=s.x,_[H+k+1]=s.y,_[H+k+2]=s.z,_[H+k+3]=0),M===!0&&(s.fromBufferAttribute(W,J),_[H+k+4]=s.x,_[H+k+5]=s.y,_[H+k+6]=s.z,_[H+k+7]=0),m===!0&&(s.fromBufferAttribute(N,J),_[H+k+8]=s.x,_[H+k+9]=s.y,_[H+k+10]=s.z,_[H+k+11]=N.itemSize===4?s.w:1)}}f={count:u,texture:b,size:new ft(A,T)},n.set(o,f),o.addEventListener("dispose",R)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const M=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",M),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function Gm(i,t,e,n,s){let r=new WeakMap;function a(c){const h=s.render.frame,u=c.geometry,f=t.get(c,u);if(r.get(f)!==h&&(t.update(f),r.set(f,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){const d=c.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return f}function o(){r=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}const Hm={[Ko]:"LINEAR_TONE_MAPPING",[Jo]:"REINHARD_TONE_MAPPING",[$o]:"CINEON_TONE_MAPPING",[fa]:"ACES_FILMIC_TONE_MAPPING",[jo]:"AGX_TONE_MAPPING",[tl]:"NEUTRAL_TONE_MAPPING",[Qo]:"CUSTOM_TONE_MAPPING"};function Vm(i,t,e,n,s,r){const a=new ln(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null,c=null;const h=new Ee;h.setAttribute("position",new le([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new le([0,2,0,0,2,0],2));const u=new jh({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new Dt(h,u),d=new bl(-1,1,1,-1,0,1);let g=null,M=null,m=!1,p,S=null,w=[],v=!1;this.setSize=function(A,T){a.setSize(A,T),o!==null&&o.setSize(A,T),l!==null&&l.setSize(A,T);for(let _=0;_<w.length;_++){const b=w[_];b.setSize&&b.setSize(A,T)}},this.setEffects=function(A){w=A,v=w.length>0&&w[0].isRenderPass===!0;const T=a.width,_=a.height;w.length>0&&o===null&&(o=new ln(T,_,{type:on,depthBuffer:!1,stencilBuffer:!1}),l=new ln(T,_,{type:on,depthBuffer:!1,stencilBuffer:!1}));const b=s===!0&&w.some(L=>L.needsDepthTexture===!0);b!==(a.depthTexture!==null)&&(b===!0&&c===null&&(c=new ls(T,_),r===!0&&(c.format=oi,c.type=os)),a.dispose(),a.depthTexture=b?c:null,a.resolveDepthBuffer=b,a.storeMultisampledDepthBuffer=b);for(let L=0;L<w.length;L++){const R=w[L];R.setSize&&R.setSize(T,_),b&&R.needsDepthTexture===!0&&R.setDepthTexture&&R.setDepthTexture(c)}},this.begin=function(A,T){if(m||A.toneMapping===Xn&&w.length===0)return!1;if(S=T,T!==null){const _=T.width,b=T.height;(a.width!==_||a.height!==b)&&this.setSize(_,b)}return v===!1&&A.setRenderTarget(a),p=A.toneMapping,A.toneMapping=Xn,!0},this.hasRenderPass=function(){return v},this.end=function(A,T){A.toneMapping=p,m=!0;let _=a,b=o;for(let L=0;L<w.length;L++){const R=w[L];R.enabled!==!1&&(R.render(A,b,_,T),R.needsSwap!==!1&&(_=b,b=b===o?l:o))}if(g!==A.outputColorSpace||M!==A.toneMapping){g=A.outputColorSpace,M=A.toneMapping,u.defines={},oe.getTransfer(g)===_e&&(u.defines.SRGB_TRANSFER="");const L=Hm[M];L&&(u.defines[L]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=_.texture,A.setRenderTarget(S),A.render(f,d),S=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),h.dispose(),u.dispose()}}const ou=new $e,lu=new ls(1,1),cu=new kh(1),hu=new Lh,uu=new Df,fu=new Bh,Vc=[],Wc=[],Xc=new Float32Array(16),qc=new Float32Array(9),Yc=new Float32Array(4);function ps(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Vc[s];if(r===void 0&&(r=new Float32Array(s),Vc[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Oe(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Be(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function ma(i,t){let e=Wc[t];e===void 0&&(e=new Int32Array(t),Wc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Wm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Xm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Oe(e,t))return;i.uniform2fv(this.addr,t),Be(e,t)}}function qm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Oe(e,t))return;i.uniform3fv(this.addr,t),Be(e,t)}}function Ym(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Oe(e,t))return;i.uniform4fv(this.addr,t),Be(e,t)}}function Zm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Oe(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Be(e,t)}else{if(Oe(e,n))return;Yc.set(n),i.uniformMatrix2fv(this.addr,!1,Yc),Be(e,n)}}function Km(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Oe(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Be(e,t)}else{if(Oe(e,n))return;qc.set(n),i.uniformMatrix3fv(this.addr,!1,qc),Be(e,n)}}function Jm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Oe(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Be(e,t)}else{if(Oe(e,n))return;Xc.set(n),i.uniformMatrix4fv(this.addr,!1,Xc),Be(e,n)}}function $m(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Qm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Oe(e,t))return;i.uniform2iv(this.addr,t),Be(e,t)}}function jm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Oe(e,t))return;i.uniform3iv(this.addr,t),Be(e,t)}}function tg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Oe(e,t))return;i.uniform4iv(this.addr,t),Be(e,t)}}function eg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function ng(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Oe(e,t))return;i.uniform2uiv(this.addr,t),Be(e,t)}}function ig(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Oe(e,t))return;i.uniform3uiv(this.addr,t),Be(e,t)}}function sg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Oe(e,t))return;i.uniform4uiv(this.addr,t),Be(e,t)}}function ga(i){return i.version===0&&(i.compareFunction=Ah,i.needsUpdate=!0),i}function rg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=ga(lu):r=ou,e.setTexture2D(t||r,s)}function ag(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||uu,s)}function og(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=ga(cu):r=fu,e.setTextureCube(t||r,s)}function lg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||hu,s)}function cg(i){switch(i){case 5126:return Wm;case 35664:return Xm;case 35665:return qm;case 35666:return Ym;case 35674:return Zm;case 35675:return Km;case 35676:return Jm;case 5124:case 35670:return $m;case 35667:case 35671:return Qm;case 35668:case 35672:return jm;case 35669:case 35673:return tg;case 5125:return eg;case 36294:return ng;case 36295:return ig;case 36296:return sg;case 35678:case 36198:case 36298:case 36306:case 35682:return rg;case 35679:case 36299:case 36307:return ag;case 35680:case 36300:case 36308:case 36293:return og;case 36289:case 36303:case 36311:case 36292:return lg}}function hg(i,t){i.uniform1fv(this.addr,t)}function ug(i,t){const e=ps(t,this.size,2);i.uniform2fv(this.addr,e)}function fg(i,t){const e=ps(t,this.size,3);i.uniform3fv(this.addr,e)}function dg(i,t){const e=ps(t,this.size,4);i.uniform4fv(this.addr,e)}function pg(i,t){const e=ps(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function mg(i,t){const e=ps(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function gg(i,t){const e=ps(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function _g(i,t){i.uniform1iv(this.addr,t)}function xg(i,t){i.uniform2iv(this.addr,t)}function vg(i,t){i.uniform3iv(this.addr,t)}function Mg(i,t){i.uniform4iv(this.addr,t)}function Sg(i,t){i.uniform1uiv(this.addr,t)}function yg(i,t){i.uniform2uiv(this.addr,t)}function bg(i,t){i.uniform3uiv(this.addr,t)}function Eg(i,t){i.uniform4uiv(this.addr,t)}function wg(i,t,e){const n=this.cache,s=t.length,r=ma(e,s);Oe(n,r)||(i.uniform1iv(this.addr,r),Be(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=ga(lu):a=ou;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function Tg(i,t,e){const n=this.cache,s=t.length,r=ma(e,s);Oe(n,r)||(i.uniform1iv(this.addr,r),Be(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||uu,r[a])}function Ag(i,t,e){const n=this.cache,s=t.length,r=ma(e,s);Oe(n,r)||(i.uniform1iv(this.addr,r),Be(n,r));let a;this.type===i.SAMPLER_CUBE_SHADOW?a=ga(cu):a=fu;for(let o=0;o!==s;++o)e.setTextureCube(t[o]||a,r[o])}function Rg(i,t,e){const n=this.cache,s=t.length,r=ma(e,s);Oe(n,r)||(i.uniform1iv(this.addr,r),Be(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||hu,r[a])}function Cg(i){switch(i){case 5126:return hg;case 35664:return ug;case 35665:return fg;case 35666:return dg;case 35674:return pg;case 35675:return mg;case 35676:return gg;case 5124:case 35670:return _g;case 35667:case 35671:return xg;case 35668:case 35672:return vg;case 35669:case 35673:return Mg;case 5125:return Sg;case 36294:return yg;case 36295:return bg;case 36296:return Eg;case 35678:case 36198:case 36298:case 36306:case 35682:return wg;case 35679:case 36299:case 36307:return Tg;case 35680:case 36300:case 36308:case 36293:return Ag;case 36289:case 36303:case 36311:case 36292:return Rg}}class Pg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=cg(e.type)}}class Lg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Cg(e.type)}}class Dg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const Za=/(\w+)(\])?(\[|\.)?/g;function Zc(i,t){i.seq.push(t),i.map[t.id]=t}function Ig(i,t,e){const n=i.name,s=n.length;for(Za.lastIndex=0;;){const r=Za.exec(n),a=Za.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Zc(e,c===void 0?new Pg(o,i,t):new Lg(o,i,t));break}else{let u=e.map[o];u===void 0&&(u=new Dg(o),Zc(e,u)),e=u}}}class Qr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);Ig(o,l,this)}const s=[],r=[];for(const a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function Kc(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Ng=37297;let Ug=0;function Fg(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const Jc=new Jt;function Og(i){oe._getMatrix(Jc,oe.workingColorSpace,i);const t=`mat3( ${Jc.elements.map(e=>e.toFixed(4))} )`;switch(oe.getTransfer(i)){case ia:return[t,"LinearTransferOETF"];case _e:return[t,"sRGBTransferOETF"];default:return Zt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function $c(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+Fg(i.getShaderSource(t),o)}else return r}function Bg(i,t){const e=Og(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}const zg={[Ko]:"Linear",[Jo]:"Reinhard",[$o]:"Cineon",[fa]:"ACESFilmic",[jo]:"AgX",[tl]:"Neutral",[Qo]:"Custom"};function kg(i,t){const e=zg[t];return e===void 0?(Zt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const zr=new C;function Gg(){oe.getLuminanceCoefficients(zr);const i=zr.x.toFixed(4),t=zr.y.toFixed(4),e=zr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Hg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Fs).join(`
`)}function Vg(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Wg(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Fs(i){return i!==""}function Qc(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function jc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Xg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Xo(i){return i.replace(Xg,qg)}function qg(i,t){const e=ne[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return Xo(e)}const Yg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function th(i){return i.replace(Yg,Zg)}function Zg(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function eh(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const Kg={[Bs]:"SHADOWMAP_TYPE_PCF",[Ns]:"SHADOWMAP_TYPE_VSM"};function Jg(i){return Kg[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const $g={[qs]:"ENVMAP_MODE_REFRACTION"};function Qg(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":$g[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const jg={[_h]:"ENVMAP_BLENDING_MULTIPLY",[Ju]:"ENVMAP_BLENDING_MIX",[$u]:"ENVMAP_BLENDING_ADD"};function t_(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":jg[i.combine]||"ENVMAP_BLENDING_NONE"}function e_(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=Jg(e),c=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=Qg(e),u=t_(e),f=Hg(e),d=Vg(r),g=s.createProgram();let M,m,p=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(M=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d].filter(Fs).join(`
`),M.length>0&&(M+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d].filter(Fs).join(`
`),m.length>0&&(m+=`
`)):(M=[eh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Fs).join(`
`),m=[eh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Xn?"#define TONE_MAPPING":"",e.toneMapping!==Xn?ne.tonemapping_pars_fragment:"",e.toneMapping!==Xn?kg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ne.colorspace_pars_fragment,Bg("linearToOutputTexel",e.outputColorSpace),Gg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Fs).join(`
`)),a=Xo(a),a=Qc(a,e),a=jc(a,e),o=Xo(o),o=Qc(o,e),o=jc(o,e),a=th(a),o=th(o),e.isRawShaderMaterial!==!0&&(p=`#version 300 es
`,M=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+M,m=["#define varying in",e.glslVersion===Zl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Zl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const S=p+M+a,w=p+m+o,v=Kc(s,s.VERTEX_SHADER,S),A=Kc(s,s.FRAGMENT_SHADER,w);s.attachShader(g,v),s.attachShader(g,A),e.index0AttributeName!==void 0?s.bindAttribLocation(g,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function T(R){if(i.debug.checkShaderErrors){const D=s.getProgramInfoLog(g)||"",z=s.getShaderInfoLog(v)||"",W=s.getShaderInfoLog(A)||"",N=D.trim(),H=z.trim(),J=W.trim();let k=!0,j=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(k=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,g,v,A);else{const $=$c(s,v,"vertex"),nt=$c(s,A,"fragment");he("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+N+`
`+$+`
`+nt)}else N!==""?Zt("WebGLProgram: Program Info Log:",N):(H===""||J==="")&&(j=!1);j&&(R.diagnostics={runnable:k,programLog:N,vertexShader:{log:H,prefix:M},fragmentShader:{log:J,prefix:m}})}s.deleteShader(v),s.deleteShader(A),_=new Qr(s,g),b=Wg(s,g)}let _;this.getUniforms=function(){return _===void 0&&T(this),_};let b;this.getAttributes=function(){return b===void 0&&T(this),b};let L=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=s.getProgramParameter(g,Ng)),L},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Ug++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=v,this.fragmentShader=A,this}let n_=0;class i_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){const s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new s_(t),e.set(t,n)),n}}class s_{constructor(t){this.id=n_++,this.code=t,this.usedTimes=0}}function r_(i){return i===Ti||i===ta||i===ea}function a_(i,t,e,n,s,r){const a=new fl,o=new i_,l=new Set,c=[],h=new Map,u=n.logarithmicDepthBuffer,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function d(_){return l.add(_),_===0?"uv":`uv${_}`}function g(_,b,L,R,D,z){const W=R.fog,N=D.geometry,H=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?R.environment:null,J=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,k=t.get(_.envMap||H,J),j=f[_.type];let $=n.precision;_.precision!==null&&($=n.getMaxPrecision(_.precision),$!==_.precision&&Zt("WebGLProgram.getParameters:",_.precision,"not supported, using",$,"instead."));const nt=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,lt=nt!==void 0?nt.length:0;let Nt=0;N.morphAttributes.position!==void 0&&(Nt=1),N.morphAttributes.normal!==void 0&&(Nt=2),N.morphAttributes.color!==void 0&&(Nt=3);let pt,X,St,At;if(j){const Ct=Dn[j];pt=Ct.vertexShader,X=Ct.fragmentShader}else{pt=_.vertexShader,X=_.fragmentShader;const Ct=o.getVertexShaderStage(_),xe=o.getFragmentShaderStage(_);o.update(_,Ct,xe),St=Ct.id,At=xe.id}const Rt=i.getRenderTarget(),mt=i.state.buffers.depth.getReversed(),Bt=D.isInstancedMesh===!0,de=D.isBatchedMesh===!0,Ht=!!_.map,Qt=!!_.matcap,ie=!!k,ct=ie&&k.isPMREMTexture===!0,vt=!!_.aoMap,Mt=!!_.lightMap,It=!!_.bumpMap&&_.wireframe===!1,yt=!!_.normalMap,Kt=!!_.displacementMap,zt=!!_.emissiveMap,te=!!_.metalnessMap,Vt=!!_.roughnessMap,ce=_.anisotropy>0,O=_.clearcoat>0,Le=_.diffuseRoughness>0,G=_.dispersion>0,st=_.retroreflectivity>0,B=_.iridescence>0,ot=_.sheen>0,it=_.transmission>0,q=ce&&!!_.anisotropyMap,y=O&&!!_.clearcoatMap,x=O&&!!_.clearcoatNormalMap,U=O&&!!_.clearcoatRoughnessMap,tt=Le&&!!_.diffuseRoughnessMap,Z=B&&!!_.iridescenceMap,ut=B&&!!_.iridescenceThicknessMap,dt=ot&&!!_.sheenColorMap,Q=ot&&!!_.sheenRoughnessMap,at=!!_.specularMap,_t=!!_.specularColorMap,P=!!_.specularIntensityMap,rt=it&&!!_.transmissionMap,et=it&&!!_.thicknessMap,Et=!!_.gradientMap,xt=!!_.alphaMap,bt=_.alphaTest>0,Wt=!!_.alphaHash,ee=!!_.extensions;let gt=Xn;_.toneMapped&&(Rt===null||Rt.isXRRenderTarget===!0)&&(gt=i.toneMapping);const Xt=ct?k.isCompressedCubeTexture?k.image[0].mipmaps:k.mipmaps:null,jt={shaderID:j,shaderType:_.type,shaderName:_.name,vertexShader:pt,fragmentShader:X,defines:_.defines,customVertexShaderID:St,customFragmentShaderID:At,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:$,batching:de,batchingColor:de&&D._colorsTexture!==null,instancing:Bt,instancingColor:Bt&&D.instanceColor!==null,instancingMorph:Bt&&D.morphTexture!==null,outputColorSpace:Rt===null?i.outputColorSpace:Rt.isXRRenderTarget===!0?Rt.texture.colorSpace:oe.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:Ht,matcap:Qt,envMap:ie,envMapMode:ie&&k.mapping,envMapPMREM:ct,envMapMaxLod:ct?Xt.length-1:null,envMapSize:ct?Xt[0].width:null,aoMap:vt,lightMap:Mt,bumpMap:It,normalMap:yt,displacementMap:Kt,emissiveMap:zt,normalMapObjectSpace:yt&&_.normalMapType===tf,normalMapTangentSpace:yt&&_.normalMapType===Bo,packedNormalMap:yt&&_.normalMapType===Bo&&r_(_.normalMap.format),metalnessMap:te,roughnessMap:Vt,anisotropy:ce,anisotropyMap:q,clearcoat:O,clearcoatMap:y,clearcoatNormalMap:x,clearcoatRoughnessMap:U,diffuseRoughness:Le,diffuseRoughnessMap:tt,dispersion:G,retroreflection:st,iridescence:B,iridescenceMap:Z,iridescenceThicknessMap:ut,sheen:ot,sheenColorMap:dt,sheenRoughnessMap:Q,specularMap:at,specularColorMap:_t,specularIntensityMap:P,transmission:it,transmissionMap:rt,thicknessMap:et,gradientMap:Et,opaque:_.transparent===!1&&_.blending===zs&&_.alphaToCoverage===!1,alphaMap:xt,alphaTest:bt,alphaHash:Wt,combine:_.combine,mapUv:Ht&&d(_.map.channel),aoMapUv:vt&&d(_.aoMap.channel),lightMapUv:Mt&&d(_.lightMap.channel),bumpMapUv:It&&d(_.bumpMap.channel),normalMapUv:yt&&d(_.normalMap.channel),displacementMapUv:Kt&&d(_.displacementMap.channel),emissiveMapUv:zt&&d(_.emissiveMap.channel),metalnessMapUv:te&&d(_.metalnessMap.channel),roughnessMapUv:Vt&&d(_.roughnessMap.channel),anisotropyMapUv:q&&d(_.anisotropyMap.channel),clearcoatMapUv:y&&d(_.clearcoatMap.channel),clearcoatNormalMapUv:x&&d(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:U&&d(_.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:tt&&d(_.diffuseRoughnessMap.channel),iridescenceMapUv:Z&&d(_.iridescenceMap.channel),iridescenceThicknessMapUv:ut&&d(_.iridescenceThicknessMap.channel),sheenColorMapUv:dt&&d(_.sheenColorMap.channel),sheenRoughnessMapUv:Q&&d(_.sheenRoughnessMap.channel),specularMapUv:at&&d(_.specularMap.channel),specularColorMapUv:_t&&d(_.specularColorMap.channel),specularIntensityMapUv:P&&d(_.specularIntensityMap.channel),transmissionMapUv:rt&&d(_.transmissionMap.channel),thicknessMapUv:et&&d(_.thicknessMap.channel),alphaMapUv:xt&&d(_.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(yt||ce),vertexNormals:!!N.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!N.attributes.uv&&(Ht||xt),fog:!!W,useFog:_.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||N.attributes.normal===void 0&&yt===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:mt,skinning:D.isSkinnedMesh===!0,hasPositionAttribute:N.attributes.position!==void 0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:lt,morphTextureStride:Nt,numSunLights:b.sun.length,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numSunLightShadows:b.sunShadowMap.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numLightProbeGrids:z.filter(Ct=>Ct.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:gt,decodeVideoTexture:Ht&&_.map.isVideoTexture===!0&&oe.getTransfer(_.map.colorSpace)===_e,decodeVideoTextureEmissive:zt&&_.emissiveMap.isVideoTexture===!0&&oe.getTransfer(_.emissiveMap.colorSpace)===_e,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===We,flipSided:_.side===nn,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:ee&&_.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ee&&_.extensions.multiDraw===!0||de)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return jt.vertexUv1s=l.has(1),jt.vertexUv2s=l.has(2),jt.vertexUv3s=l.has(3),l.clear(),jt}function M(_){const b=[];if(_.shaderID?b.push(_.shaderID):(b.push(_.customVertexShaderID),b.push(_.customFragmentShaderID)),_.defines!==void 0)for(const L in _.defines)b.push(L),b.push(_.defines[L]);return _.isRawShaderMaterial===!1&&(m(b,_),p(b,_),b.push(i.outputColorSpace)),b.push(_.customProgramCacheKey),b.join()}function m(_,b){_.push(b.precision),_.push(b.outputColorSpace),_.push(b.envMapMode),_.push(b.envMapPMREM),_.push(b.envMapMaxLod),_.push(b.envMapSize),_.push(b.mapUv),_.push(b.alphaMapUv),_.push(b.lightMapUv),_.push(b.aoMapUv),_.push(b.bumpMapUv),_.push(b.normalMapUv),_.push(b.displacementMapUv),_.push(b.emissiveMapUv),_.push(b.metalnessMapUv),_.push(b.roughnessMapUv),_.push(b.anisotropyMapUv),_.push(b.clearcoatMapUv),_.push(b.clearcoatNormalMapUv),_.push(b.clearcoatRoughnessMapUv),_.push(b.diffuseRoughnessMapUv),_.push(b.iridescenceMapUv),_.push(b.iridescenceThicknessMapUv),_.push(b.sheenColorMapUv),_.push(b.sheenRoughnessMapUv),_.push(b.specularMapUv),_.push(b.specularColorMapUv),_.push(b.specularIntensityMapUv),_.push(b.transmissionMapUv),_.push(b.thicknessMapUv),_.push(b.combine),_.push(b.fogExp2),_.push(b.sizeAttenuation),_.push(b.morphTargetsCount),_.push(b.numSunLights),_.push(b.numDirLights),_.push(b.numPointLights),_.push(b.numSpotLights),_.push(b.numSpotLightMaps),_.push(b.numHemiLights),_.push(b.numRectAreaLights),_.push(b.numSunLightShadows),_.push(b.numDirLightShadows),_.push(b.numPointLightShadows),_.push(b.numSpotLightShadows),_.push(b.numSpotLightShadowsWithMaps),_.push(b.numLightProbes),_.push(b.numLightProbeGrids),_.push(b.shadowMapType),_.push(b.toneMapping),_.push(b.numClippingPlanes),_.push(b.numClipIntersection),_.push(b.depthPacking)}function p(_,b){a.disableAll(),b.instancing&&a.enable(0),b.instancingColor&&a.enable(1),b.instancingMorph&&a.enable(2),b.matcap&&a.enable(3),b.envMap&&a.enable(4),b.normalMapObjectSpace&&a.enable(5),b.normalMapTangentSpace&&a.enable(6),b.clearcoat&&a.enable(7),b.iridescence&&a.enable(8),b.alphaTest&&a.enable(9),b.vertexColors&&a.enable(10),b.vertexAlphas&&a.enable(11),b.vertexUv1s&&a.enable(12),b.vertexUv2s&&a.enable(13),b.vertexUv3s&&a.enable(14),b.vertexTangents&&a.enable(15),b.anisotropy&&a.enable(16),b.alphaHash&&a.enable(17),b.batching&&a.enable(18),b.dispersion&&a.enable(19),b.retroreflection&&a.enable(24),b.diffuseRoughness&&a.enable(25),b.batchingColor&&a.enable(20),b.gradientMap&&a.enable(21),b.packedNormalMap&&a.enable(22),b.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),b.numLightProbeGrids>0&&a.enable(22),b.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function S(_){const b=f[_.type];let L;if(b){const R=Dn[b];L=er.clone(R.uniforms)}else L=_.uniforms;return L}function w(_,b){let L=h.get(b);return L!==void 0?++L.usedTimes:(L=new e_(i,b,_,s),c.push(L),h.set(b,L)),L}function v(_){if(--_.usedTimes===0){const b=c.indexOf(_);c[b]=c[c.length-1],c.pop(),h.delete(_.cacheKey),_.destroy()}}function A(_){o.remove(_)}function T(){o.dispose()}return{getParameters:g,getProgramCacheKey:M,getUniforms:S,acquireProgram:w,releaseProgram:v,releaseShaderCache:A,programs:c,dispose:T}}function o_(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function l_(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function nh(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function ih(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(f){let d=0;return f.isInstancedMesh&&(d+=2),f.isSkinnedMesh&&(d+=1),d}function o(f,d,g,M,m,p){let S=i[t];return S===void 0?(S={id:f.id,object:f,geometry:d,material:g,materialVariant:a(f),groupOrder:M,renderOrder:f.renderOrder,z:m,group:p},i[t]=S):(S.id=f.id,S.object=f,S.geometry=d,S.material=g,S.materialVariant=a(f),S.groupOrder=M,S.renderOrder=f.renderOrder,S.z=m,S.group=p),t++,S}function l(f,d,g,M,m,p,S){S.reversedDepth===!0&&(m=-m);const w=o(f,d,g,M,m,p);g.transmission>0?n.push(w):g.transparent===!0?s.push(w):e.push(w)}function c(f,d,g,M,m,p){const S=o(f,d,g,M,m,p);g.transmission>0?n.unshift(S):g.transparent===!0?s.unshift(S):e.unshift(S)}function h(f,d){e.length>1&&e.sort(f||l_),n.length>1&&n.sort(d||nh),s.length>1&&s.sort(d||nh)}function u(){for(let f=t,d=i.length;f<d;f++){const g=i[f];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:u,sort:h}}function c_(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new ih,i.set(n,[a])):s>=r.length?(a=new ih,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function h_(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new C,color:new qt};break;case"SpotLight":e={position:new C,direction:new C,color:new qt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new C,color:new qt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new C,skyColor:new qt,groundColor:new qt};break;case"RectAreaLight":e={color:new qt,position:new C,halfWidth:new C,halfHeight:new C};break}return i[t.id]=e,e}}}function u_(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ft};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ft};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ft,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let f_=0;function d_(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function p_(i){const t=new h_,e=u_(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new C);const s=new C,r=new me,a=new me;function o(c){let h=0,u=0,f=0;for(let z=0;z<9;z++)n.probe[z].set(0,0,0);let d=0,g=0,M=0,m=0,p=0,S=0,w=0,v=0,A=0,T=0,_=0,b=0,L=0,R=0;c.sort(d_);for(let z=0,W=c.length;z<W;z++){const N=c[z],H=N.color,J=N.intensity,k=N.distance;let j=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===Ti?j=N.shadow.map.texture:j=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)h+=H.r*J,u+=H.g*J,f+=H.b*J;else if(N.isLightProbe){for(let $=0;$<9;$++)n.probe[$].addScaledVector(N.sh.coefficients[$],J);R++}else if(N.isSunLight){const $=t.get(N);if($.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const nt=N.shadow,lt=e.get(N);lt.shadowIntensity=nt.intensity,lt.shadowBias=nt.bias,lt.shadowNormalBias=nt.normalBias,lt.shadowRadius=nt.radius,lt.shadowMapSize.copy(nt.mapSize).multiply(nt.getFrameExtents()),n.sunShadow[g]=lt,n.sunShadowMap[g]=j;const Nt=nt.getViewportCount();for(let pt=0;pt<Nt;pt++)n.sunShadowMatrix[M+pt]=nt.getMatrix(pt),n.sunShadowCascade[M+pt]=nt._cascadeData[pt];M+=Nt,g++}n.sun[d]=$,d++}else if(N.isDirectionalLight){const $=t.get(N);if($.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const nt=N.shadow,lt=e.get(N);lt.shadowIntensity=nt.intensity,lt.shadowBias=nt.bias,lt.shadowNormalBias=nt.normalBias,lt.shadowRadius=nt.radius,lt.shadowMapSize=nt.mapSize,n.directionalShadow[m]=lt,n.directionalShadowMap[m]=j,n.directionalShadowMatrix[m]=N.shadow.matrix,A++}n.directional[m]=$,m++}else if(N.isSpotLight){const $=t.get(N);$.position.setFromMatrixPosition(N.matrixWorld),$.color.copy(H).multiplyScalar(J),$.distance=k,$.coneCos=Math.cos(N.angle),$.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),$.decay=N.decay,n.spot[S]=$;const nt=N.shadow;if(N.map&&(n.spotLightMap[b]=N.map,b++,nt.updateMatrices(N),N.castShadow&&L++),n.spotLightMatrix[S]=nt.matrix,N.castShadow){const lt=e.get(N);lt.shadowIntensity=nt.intensity,lt.shadowBias=nt.bias,lt.shadowNormalBias=nt.normalBias,lt.shadowRadius=nt.radius,lt.shadowMapSize=nt.mapSize,n.spotShadow[S]=lt,n.spotShadowMap[S]=j,_++}S++}else if(N.isRectAreaLight){const $=t.get(N);$.color.copy(H).multiplyScalar(J),$.halfWidth.set(N.width*.5,0,0),$.halfHeight.set(0,N.height*.5,0),n.rectArea[w]=$,w++}else if(N.isPointLight){const $=t.get(N);if($.color.copy(N.color).multiplyScalar(N.intensity),$.distance=N.distance,$.decay=N.decay,N.castShadow){const nt=N.shadow,lt=e.get(N);lt.shadowIntensity=nt.intensity,lt.shadowBias=nt.bias,lt.shadowNormalBias=nt.normalBias,lt.shadowRadius=nt.radius,lt.shadowMapSize=nt.mapSize,lt.shadowCameraNear=nt.camera.near,lt.shadowCameraFar=nt.camera.far,n.pointShadow[p]=lt,n.pointShadowMap[p]=j,n.pointShadowMatrix[p]=N.shadow.matrix,T++}n.point[p]=$,p++}else if(N.isHemisphereLight){const $=t.get(N);$.skyColor.copy(N.color).multiplyScalar(J),$.groundColor.copy(N.groundColor).multiplyScalar(J),n.hemi[v]=$,v++}}w>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Pt.LTC_FLOAT_1,n.rectAreaLTC2=Pt.LTC_FLOAT_2):(n.rectAreaLTC1=Pt.LTC_HALF_1,n.rectAreaLTC2=Pt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const D=n.hash;(D.sunLength!==d||D.directionalLength!==m||D.pointLength!==p||D.spotLength!==S||D.rectAreaLength!==w||D.hemiLength!==v||D.numSunShadows!==g||D.numDirectionalShadows!==A||D.numPointShadows!==T||D.numSpotShadows!==_||D.numSpotMaps!==b||D.numLightProbes!==R)&&(n.sun.length=d,n.directional.length=m,n.spot.length=S,n.rectArea.length=w,n.point.length=p,n.hemi.length=v,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=M,n.sunShadowCascade.length=M,n.directionalShadow.length=A,n.directionalShadowMap.length=A,n.directionalShadowMatrix.length=A,n.pointShadow.length=T,n.pointShadowMap.length=T,n.pointShadowMatrix.length=T,n.spotShadow.length=_,n.spotShadowMap.length=_,n.spotLightMatrix.length=_+b-L,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=L,n.numLightProbes=R,D.sunLength=d,D.directionalLength=m,D.pointLength=p,D.spotLength=S,D.rectAreaLength=w,D.hemiLength=v,D.numSunShadows=g,D.numDirectionalShadows=A,D.numPointShadows=T,D.numSpotShadows=_,D.numSpotMaps=b,D.numLightProbes=R,n.version=f_++)}function l(c,h){let u=0,f=0,d=0,g=0,M=0,m=0;const p=h.matrixWorldInverse;for(let S=0,w=c.length;S<w;S++){const v=c[S];if(v.isSunLight){const A=n.sun[u];A.direction.setFromMatrixPosition(v.matrixWorld),A.direction.transformDirection(p),u++}else if(v.isDirectionalLight){const A=n.directional[f];A.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(p),f++}else if(v.isSpotLight){const A=n.spot[g];A.position.setFromMatrixPosition(v.matrixWorld),A.position.applyMatrix4(p),A.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(p),g++}else if(v.isRectAreaLight){const A=n.rectArea[M];A.position.setFromMatrixPosition(v.matrixWorld),A.position.applyMatrix4(p),a.identity(),r.copy(v.matrixWorld),r.premultiply(p),a.extractRotation(r),A.halfWidth.set(v.width*.5,0,0),A.halfHeight.set(0,v.height*.5,0),A.halfWidth.applyMatrix4(a),A.halfHeight.applyMatrix4(a),M++}else if(v.isPointLight){const A=n.point[d];A.position.setFromMatrixPosition(v.matrixWorld),A.position.applyMatrix4(p),d++}else if(v.isHemisphereLight){const A=n.hemi[m];A.direction.setFromMatrixPosition(v.matrixWorld),A.direction.transformDirection(p),m++}}}return{setup:o,setupView:l,state:n}}function sh(i){const t=new p_(i),e=[],n=[],s=[];function r(u){h.camera=u,e.length=0,n.length=0,s.length=0}function a(u){u.isLightProbeGrid?s.push(u):e.push(u)}function o(u){n.push(u)}function l(){t.setup(e),s.sort((u,f)=>u.priority-f.priority||u.id-f.id)}function c(u){t.setupView(e,u)}const h={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function m_(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new sh(i),t.set(s,[o])):r>=a.length?(o=new sh(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const g_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,__=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,x_=[new C(1,0,0),new C(-1,0,0),new C(0,1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1)],v_=[new C(0,-1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1),new C(0,-1,0),new C(0,-1,0)],rh=new me,Ps=new C,Ka=new C;function M_(i,t,e){let n=new Js;const s=new ft,r=new ft,a=new Re,o=new Dd,l=new Id,c={},h=e.maxTextureSize,u={[Ei]:nn,[nn]:Ei,[We]:We},f=new an({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ft},radius:{value:4}},vertexShader:g_,fragmentShader:__}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new Ee;g.setAttribute("position",new sn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new Dt(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Bs;let p=this.type;this.render=function(T,_,b){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;this.type===Lu&&(Zt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Bs);const L=i.getRenderTarget(),R=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),z=i.state;z.setBlending(Si),z.buffers.depth.getReversed()===!0?z.buffers.color.setClear(0,0,0,0):z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const W=p!==this.type;W&&_.traverse(function(N){N.material&&(Array.isArray(N.material)?N.material.forEach(H=>H.needsUpdate=!0):N.material.needsUpdate=!0)});for(let N=0,H=T.length;N<H;N++){const J=T[N],k=J.shadow;if(k===void 0){Zt("WebGLShadowMap:",J,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);const j=k.getFrameExtents();s.multiply(j),r.copy(k.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/j.x),s.x=r.x*j.x,k.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/j.y),s.y=r.y*j.y,k.mapSize.y=r.y));const $=i.state.buffers.depth.getReversed();if(k.camera._reversedDepth=$,k.map===null||W===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===Ns){if(J.isPointLight){Zt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new ln(s.x,s.y,{format:Ti,type:on,minFilter:qe,magFilter:qe,generateMipmaps:!1}),k.map.texture.name=J.name+".shadowMap",k.map.depthTexture=new ls(s.x,s.y,wn),k.map.depthTexture.name=J.name+".shadowMapDepth",k.map.depthTexture.format=ci,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Xe,k.map.depthTexture.magFilter=Xe}else J.isPointLight?(k.map=new El(s.x),k.map.depthTexture=new kh(s.x,In)):(k.map=new ln(s.x,s.y),k.map.depthTexture=new ls(s.x,s.y,In)),k.map.depthTexture.name=J.name+".shadowMap",k.map.depthTexture.format=ci,this.type===Bs?(k.map.depthTexture.compareFunction=$?Th:wh,k.map.depthTexture.minFilter=qe,k.map.depthTexture.magFilter=qe):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Xe,k.map.depthTexture.magFilter=Xe);k.camera.updateProjectionMatrix()}k.map.isWebGLCubeRenderTarget!==!0&&(k.map.width!==s.x||k.map.height!==s.y)&&k.map.setSize(s.x,s.y);const nt=k.map.isWebGLCubeRenderTarget?6:k.getViewportCount();J.isPointLight!==!0&&k.updateMatrices(J,b);const lt=(k.camera.layers.mask&4294967294)!==0?k.camera.layers:b.layers;for(let Nt=0;Nt<nt;Nt++){const pt=k.getCamera(Nt);if(J.isPointLight){const X=k.camera,St=k.matrix,At=J.distance||X.far;At!==X.far&&(X.far=At,X.updateProjectionMatrix()),Ps.setFromMatrixPosition(J.matrixWorld),X.position.copy(Ps),Ka.copy(X.position),Ka.add(x_[Nt]),X.up.copy(v_[Nt]),X.lookAt(Ka),X.updateMatrixWorld(),St.makeTranslation(-Ps.x,-Ps.y,-Ps.z),rh.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),k._frustum.setFromProjectionMatrix(rh,X.coordinateSystem,X.reversedDepth)}if(k.map.isWebGLCubeRenderTarget)i.setRenderTarget(k.map,Nt),i.clear();else{Nt===0&&(i.setRenderTarget(k.map),i.clear());const X=k.getViewport(Nt);a.set(r.x*X.x,r.y*X.y,r.x*X.z,r.y*X.w),z.viewport(a)}n=k.getFrustum(Nt),v(_,b,pt,J,lt,this.type)}k.isPointLightShadow!==!0&&this.type===Ns&&S(k,b),k.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(L,R,D)};function S(T,_){const b=t.update(M);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,d.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),T.mapPass===null?T.mapPass=new ln(s.x,s.y,{format:Ti,type:on}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),f.uniforms.shadow_pass.value=T.map.depthTexture,f.uniforms.resolution.value.set(T.map.width,T.map.height),f.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(_,null,b,f,M,null),d.uniforms.shadow_pass.value=T.mapPass.texture,d.uniforms.resolution.value.set(T.map.width,T.map.height),d.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(_,null,b,d,M,null)}function w(T,_,b,L){let R=null;const D=b.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(D!==void 0)R=D;else if(R=b.isPointLight===!0?l:o,i.localClippingEnabled&&_.clipShadows===!0&&Array.isArray(_.clippingPlanes)&&_.clippingPlanes.length!==0||_.displacementMap&&_.displacementScale!==0||_.alphaMap&&_.alphaTest>0||_.map&&_.alphaTest>0||_.alphaToCoverage===!0){const z=R.uuid,W=_.uuid;let N=c[z];N===void 0&&(N={},c[z]=N);let H=N[W];H===void 0&&(H=R.clone(),N[W]=H,_.addEventListener("dispose",A)),R=H}if(R.visible=_.visible,R.wireframe=_.wireframe,L===Ns?R.side=_.shadowSide!==null?_.shadowSide:_.side:R.side=_.shadowSide!==null?_.shadowSide:u[_.side],R.alphaMap=_.alphaMap,R.alphaTest=_.alphaToCoverage===!0?.5:_.alphaTest,R.map=_.map,R.clipShadows=_.clipShadows,R.clippingPlanes=_.clippingPlanes,R.clipIntersection=_.clipIntersection,R.displacementMap=_.displacementMap,R.displacementScale=_.displacementScale,R.displacementBias=_.displacementBias,R.wireframeLinewidth=_.wireframeLinewidth,R.linewidth=_.linewidth,b.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const z=i.properties.get(R);z.light=b}return R}function v(T,_,b,L,R,D){if(T.visible===!1)return;if(T.layers.test(R)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&D===Ns)&&(!T.frustumCulled||T.intersectsFrustum(n))){T.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,T.matrixWorld);const N=t.update(T),H=T.material;if(Array.isArray(H)){const J=N.groups;for(let k=0,j=J.length;k<j;k++){const $=J[k],nt=H[$.materialIndex];if(nt&&nt.visible){const lt=w(T,nt,L,D);T.onBeforeShadow(i,T,_,b,N,lt,$),i.renderBufferDirect(b,null,N,lt,T,$),T.onAfterShadow(i,T,_,b,N,lt,$)}}}else if(H.visible){const J=w(T,H,L,D);T.onBeforeShadow(i,T,_,b,N,J,null),i.renderBufferDirect(b,null,N,J,T,null),T.onAfterShadow(i,T,_,b,N,J,null)}}const W=T.children;for(let N=0,H=W.length;N<H;N++)v(W[N],_,b,L,R,D)}function A(T){T.target.removeEventListener("dispose",A);for(const b in c){const L=c[b],R=T.target.uuid;R in L&&(L[R].dispose(),delete L[R])}}}function S_(i,t){function e(){let P=!1;const rt=new Re;let et=null;const Et=new Re(0,0,0,0);return{setMask:function(xt){et!==xt&&!P&&(i.colorMask(xt,xt,xt,xt),et=xt)},setLocked:function(xt){P=xt},setClear:function(xt,bt,Wt,ee,gt){gt===!0&&(xt*=ee,bt*=ee,Wt*=ee),rt.set(xt,bt,Wt,ee),Et.equals(rt)===!1&&(i.clearColor(xt,bt,Wt,ee),Et.copy(rt))},reset:function(){P=!1,et=null,Et.set(-1,0,0,0)}}}function n(){let P=!1,rt=!1,et=null,Et=null,xt=null;return{setReversed:function(bt){if(rt!==bt){const Wt=t.get("EXT_clip_control");bt?Wt.clipControlEXT(Wt.LOWER_LEFT_EXT,Wt.ZERO_TO_ONE_EXT):Wt.clipControlEXT(Wt.LOWER_LEFT_EXT,Wt.NEGATIVE_ONE_TO_ONE_EXT),rt=bt;const ee=xt;xt=null,this.setClear(ee)}},getReversed:function(){return rt},setTest:function(bt){bt?mt(i.DEPTH_TEST):Bt(i.DEPTH_TEST)},setMask:function(bt){et!==bt&&!P&&(i.depthMask(bt),et=bt)},setFunc:function(bt){if(rt&&(bt=uf[bt]),Et!==bt){switch(bt){case ja:i.depthFunc(i.NEVER);break;case to:i.depthFunc(i.ALWAYS);break;case eo:i.depthFunc(i.LESS);break;case Xs:i.depthFunc(i.LEQUAL);break;case no:i.depthFunc(i.EQUAL);break;case io:i.depthFunc(i.GEQUAL);break;case so:i.depthFunc(i.GREATER);break;case ro:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Et=bt}},setLocked:function(bt){P=bt},setClear:function(bt){xt!==bt&&(xt=bt,rt&&(bt=1-bt),i.clearDepth(bt))},reset:function(){P=!1,et=null,Et=null,xt=null,rt=!1}}}function s(){let P=!1,rt=null,et=null,Et=null,xt=null,bt=null,Wt=null,ee=null,gt=null;return{setTest:function(Xt){P||(Xt?mt(i.STENCIL_TEST):Bt(i.STENCIL_TEST))},setMask:function(Xt){rt!==Xt&&!P&&(i.stencilMask(Xt),rt=Xt)},setFunc:function(Xt,jt,Ct){(et!==Xt||Et!==jt||xt!==Ct)&&(i.stencilFunc(Xt,jt,Ct),et=Xt,Et=jt,xt=Ct)},setOp:function(Xt,jt,Ct){(bt!==Xt||Wt!==jt||ee!==Ct)&&(i.stencilOp(Xt,jt,Ct),bt=Xt,Wt=jt,ee=Ct)},setLocked:function(Xt){P=Xt},setClear:function(Xt){gt!==Xt&&(i.clearStencil(Xt),gt=Xt)},reset:function(){P=!1,rt=null,et=null,Et=null,xt=null,bt=null,Wt=null,ee=null,gt=null}}}const r=new e,a=new n,o=new s;let l={};const c=new WeakMap;let h={},u={},f={},d=new WeakMap,g=[],M=null,m=!1,p=null,S=null,w=null,v=null,A=null,T=null,_=null,b=new qt(0,0,0),L=0,R=!1,D=null,z=null,W=null,N=null,H=null;const J=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,j=0;const $=i.getParameter(i.VERSION);$.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec($)[1]),k=j>=1):$.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),k=j>=2);let nt=null,lt={};const Nt=i.getParameter(i.SCISSOR_BOX),pt=i.getParameter(i.VIEWPORT),X=new Re().fromArray(Nt),St=new Re().fromArray(pt);function At(P,rt,et,Et){const xt=new Uint8Array(4),bt=i.createTexture();i.bindTexture(P,bt),i.texParameteri(P,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(P,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Wt=0;Wt<et;Wt++)P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY?i.texImage3D(rt,0,i.RGBA,1,1,Et,0,i.RGBA,i.UNSIGNED_BYTE,xt):i.texImage2D(rt+Wt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,xt);return bt}const Rt={};Rt[i.TEXTURE_2D]=At(i.TEXTURE_2D,i.TEXTURE_2D,1),Rt[i.TEXTURE_CUBE_MAP]=At(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Rt[i.TEXTURE_2D_ARRAY]=At(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Rt[i.TEXTURE_3D]=At(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),mt(i.DEPTH_TEST),a.setFunc(Xs),It(!1),yt(Xl),mt(i.CULL_FACE),vt(Si);function mt(P){h[P]!==!0&&(i.enable(P),h[P]=!0)}function Bt(P){h[P]!==!1&&(i.disable(P),h[P]=!1)}function de(P,rt){return f[P]!==rt?(i.bindFramebuffer(P,rt),f[P]=rt,P===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=rt),P===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=rt),!0):!1}function Ht(P,rt){let et=g,Et=!1;if(P){et=d.get(rt),et===void 0&&(et=[],d.set(rt,et));const xt=P.textures;if(et.length!==xt.length||et[0]!==i.COLOR_ATTACHMENT0){for(let bt=0,Wt=xt.length;bt<Wt;bt++)et[bt]=i.COLOR_ATTACHMENT0+bt;et.length=xt.length,Et=!0}}else et[0]!==i.BACK&&(et[0]=i.BACK,Et=!0);Et&&i.drawBuffers(et)}function Qt(P){return M!==P?(i.useProgram(P),M=P,!0):!1}const ie={[es]:i.FUNC_ADD,[Iu]:i.FUNC_SUBTRACT,[Nu]:i.FUNC_REVERSE_SUBTRACT};ie[Uu]=i.MIN,ie[Fu]=i.MAX;const ct={[Ou]:i.ZERO,[Bu]:i.ONE,[zu]:i.SRC_COLOR,[mh]:i.SRC_ALPHA,[Xu]:i.SRC_ALPHA_SATURATE,[Vu]:i.DST_COLOR,[Gu]:i.DST_ALPHA,[ku]:i.ONE_MINUS_SRC_COLOR,[gh]:i.ONE_MINUS_SRC_ALPHA,[Wu]:i.ONE_MINUS_DST_COLOR,[Hu]:i.ONE_MINUS_DST_ALPHA,[qu]:i.CONSTANT_COLOR,[Yu]:i.ONE_MINUS_CONSTANT_COLOR,[Zu]:i.CONSTANT_ALPHA,[Ku]:i.ONE_MINUS_CONSTANT_ALPHA};function vt(P,rt,et,Et,xt,bt,Wt,ee,gt,Xt){if(P===Si){m===!0&&(Bt(i.BLEND),m=!1);return}if(m===!1&&(mt(i.BLEND),m=!0),P!==Du){if(P!==p||Xt!==R){if((S!==es||A!==es)&&(i.blendEquation(i.FUNC_ADD),S=es,A=es),Xt)switch(P){case zs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case en:i.blendFunc(i.ONE,i.ONE);break;case ql:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Yl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:he("WebGLState: Invalid blending: ",P);break}else switch(P){case zs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case en:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case ql:he("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Yl:he("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:he("WebGLState: Invalid blending: ",P);break}w=null,v=null,T=null,_=null,b.set(0,0,0),L=0,p=P,R=Xt}return}xt=xt||rt,bt=bt||et,Wt=Wt||Et,(rt!==S||xt!==A)&&(i.blendEquationSeparate(ie[rt],ie[xt]),S=rt,A=xt),(et!==w||Et!==v||bt!==T||Wt!==_)&&(i.blendFuncSeparate(ct[et],ct[Et],ct[bt],ct[Wt]),w=et,v=Et,T=bt,_=Wt),(ee.equals(b)===!1||gt!==L)&&(i.blendColor(ee.r,ee.g,ee.b,gt),b.copy(ee),L=gt),p=P,R=!1}function Mt(P,rt){P.side===We?Bt(i.CULL_FACE):mt(i.CULL_FACE);let et=P.side===nn;rt&&(et=!et),It(et),P.blending===zs&&P.transparent===!1?vt(Si):vt(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),a.setFunc(P.depthFunc),a.setTest(P.depthTest),a.setMask(P.depthWrite),r.setMask(P.colorWrite);const Et=P.stencilWrite;o.setTest(Et),Et&&(o.setMask(P.stencilWriteMask),o.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),o.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),zt(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?mt(i.SAMPLE_ALPHA_TO_COVERAGE):Bt(i.SAMPLE_ALPHA_TO_COVERAGE)}function It(P){D!==P&&(P?i.frontFace(i.CW):i.frontFace(i.CCW),D=P)}function yt(P){P!==Cu?(mt(i.CULL_FACE),P!==z&&(P===Xl?i.cullFace(i.BACK):P===Pu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Bt(i.CULL_FACE),z=P}function Kt(P){P!==W&&(k&&i.lineWidth(P),W=P)}function zt(P,rt,et){P?(mt(i.POLYGON_OFFSET_FILL),(N!==rt||H!==et)&&(N=rt,H=et,a.getReversed()&&(rt=-rt,et=-et),i.polygonOffset(rt,et))):Bt(i.POLYGON_OFFSET_FILL)}function te(P){P?mt(i.SCISSOR_TEST):Bt(i.SCISSOR_TEST)}function Vt(P){P===void 0&&(P=i.TEXTURE0+J-1),nt!==P&&(i.activeTexture(P),nt=P)}function ce(P,rt,et){et===void 0&&(nt===null?et=i.TEXTURE0+J-1:et=nt);let Et=lt[et];Et===void 0&&(Et={type:void 0,texture:void 0},lt[et]=Et),(Et.type!==P||Et.texture!==rt)&&(nt!==et&&(i.activeTexture(et),nt=et),i.bindTexture(P,rt||Rt[P]),Et.type=P,Et.texture=rt)}function O(){const P=lt[nt];P!==void 0&&P.type!==void 0&&(i.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function Le(){try{i.compressedTexImage2D(...arguments)}catch(P){he("WebGLState:",P)}}function G(){try{i.compressedTexImage3D(...arguments)}catch(P){he("WebGLState:",P)}}function st(){try{i.texSubImage2D(...arguments)}catch(P){he("WebGLState:",P)}}function B(){try{i.texSubImage3D(...arguments)}catch(P){he("WebGLState:",P)}}function ot(){try{i.compressedTexSubImage2D(...arguments)}catch(P){he("WebGLState:",P)}}function it(){try{i.compressedTexSubImage3D(...arguments)}catch(P){he("WebGLState:",P)}}function q(){try{i.texStorage2D(...arguments)}catch(P){he("WebGLState:",P)}}function y(){try{i.texStorage3D(...arguments)}catch(P){he("WebGLState:",P)}}function x(){try{i.texImage2D(...arguments)}catch(P){he("WebGLState:",P)}}function U(){try{i.texImage3D(...arguments)}catch(P){he("WebGLState:",P)}}function tt(P){return u[P]!==void 0?u[P]:i.getParameter(P)}function Z(P,rt){u[P]!==rt&&(i.pixelStorei(P,rt),u[P]=rt)}function ut(P){X.equals(P)===!1&&(i.scissor(P.x,P.y,P.z,P.w),X.copy(P))}function dt(P){St.equals(P)===!1&&(i.viewport(P.x,P.y,P.z,P.w),St.copy(P))}function Q(P,rt){let et=c.get(rt);et===void 0&&(et=new WeakMap,c.set(rt,et));let Et=et.get(P);Et===void 0&&(Et=i.getUniformBlockIndex(rt,P.name),i.uniformBlockBinding(rt,Et,Et),et.set(P,Et))}function at(P,rt,et){const xt=c.get(rt).get(P);l[xt]!==et&&(i.bindBufferBase(i.UNIFORM_BUFFER,xt,et),l[xt]=et)}function _t(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},u={},nt=null,lt={},f={},l={},d=new WeakMap,g=[],M=null,m=!1,p=null,S=null,w=null,v=null,A=null,T=null,_=null,b=new qt(0,0,0),L=0,R=!1,D=null,z=null,W=null,N=null,H=null,X.set(0,0,i.canvas.width,i.canvas.height),St.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:mt,disable:Bt,bindFramebuffer:de,drawBuffers:Ht,useProgram:Qt,setBlending:vt,setMaterial:Mt,setFlipSided:It,setCullFace:yt,setLineWidth:Kt,setPolygonOffset:zt,setScissorTest:te,activeTexture:Vt,bindTexture:ce,unbindTexture:O,compressedTexImage2D:Le,compressedTexImage3D:G,texImage2D:x,texImage3D:U,pixelStorei:Z,getParameter:tt,updateUBOMapping:Q,uniformBlockBinding:at,texStorage2D:q,texStorage3D:y,texSubImage2D:st,texSubImage3D:B,compressedTexSubImage2D:ot,compressedTexSubImage3D:it,scissor:ut,viewport:dt,reset:_t}}function y_(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ft,h=new WeakMap,u=new Set;let f;const d=new WeakMap,g=new Set,M=new FinalizationRegistry(y=>g.delete(y));let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(y,x){return m?new OffscreenCanvas(y,x):sa("canvas")}function S(y,x,U){let tt=1;const Z=q(y);if((Z.width>U||Z.height>U)&&(tt=U/Math.max(Z.width,Z.height)),tt<1)if(typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&y instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&y instanceof ImageBitmap||typeof VideoFrame<"u"&&y instanceof VideoFrame){const ut=Math.floor(tt*Z.width),dt=Math.floor(tt*Z.height);f===void 0&&(f=p(ut,dt));const Q=x?p(ut,dt):f;return Q.width=ut,Q.height=dt,Q.getContext("2d").drawImage(y,0,0,ut,dt),Zt("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+ut+"x"+dt+")."),Q}else return"data"in y&&Zt("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),y;return y}function w(y){return y.generateMipmaps}function v(y){i.generateMipmap(y)}function A(y){return y.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:y.isWebGL3DRenderTarget?i.TEXTURE_3D:y.isWebGLArrayRenderTarget||y.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function T(y,x,U,tt,Z,ut=!1){if(y!==null){if(i[y]!==void 0)return i[y];Zt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+y+"'")}let dt;tt&&(dt=t.get("EXT_texture_norm16"),dt||Zt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=x;if(x===i.RED&&(U===i.FLOAT&&(Q=i.R32F),U===i.HALF_FLOAT&&(Q=i.R16F),U===i.UNSIGNED_BYTE&&(Q=i.R8),U===i.UNSIGNED_SHORT&&dt&&(Q=dt.R16_EXT),U===i.SHORT&&dt&&(Q=dt.R16_SNORM_EXT)),x===i.RED_INTEGER&&(U===i.UNSIGNED_BYTE&&(Q=i.R8UI),U===i.UNSIGNED_SHORT&&(Q=i.R16UI),U===i.UNSIGNED_INT&&(Q=i.R32UI),U===i.BYTE&&(Q=i.R8I),U===i.SHORT&&(Q=i.R16I),U===i.INT&&(Q=i.R32I)),x===i.RG&&(U===i.FLOAT&&(Q=i.RG32F),U===i.HALF_FLOAT&&(Q=i.RG16F),U===i.UNSIGNED_BYTE&&(Q=i.RG8),U===i.UNSIGNED_SHORT&&dt&&(Q=dt.RG16_EXT),U===i.SHORT&&dt&&(Q=dt.RG16_SNORM_EXT)),x===i.RG_INTEGER&&(U===i.UNSIGNED_BYTE&&(Q=i.RG8UI),U===i.UNSIGNED_SHORT&&(Q=i.RG16UI),U===i.UNSIGNED_INT&&(Q=i.RG32UI),U===i.BYTE&&(Q=i.RG8I),U===i.SHORT&&(Q=i.RG16I),U===i.INT&&(Q=i.RG32I)),x===i.RGB_INTEGER&&(U===i.UNSIGNED_BYTE&&(Q=i.RGB8UI),U===i.UNSIGNED_SHORT&&(Q=i.RGB16UI),U===i.UNSIGNED_INT&&(Q=i.RGB32UI),U===i.BYTE&&(Q=i.RGB8I),U===i.SHORT&&(Q=i.RGB16I),U===i.INT&&(Q=i.RGB32I)),x===i.RGBA_INTEGER&&(U===i.UNSIGNED_BYTE&&(Q=i.RGBA8UI),U===i.UNSIGNED_SHORT&&(Q=i.RGBA16UI),U===i.UNSIGNED_INT&&(Q=i.RGBA32UI),U===i.BYTE&&(Q=i.RGBA8I),U===i.SHORT&&(Q=i.RGBA16I),U===i.INT&&(Q=i.RGBA32I)),x===i.RGB&&(U===i.UNSIGNED_SHORT&&dt&&(Q=dt.RGB16_EXT),U===i.SHORT&&dt&&(Q=dt.RGB16_SNORM_EXT),U===i.UNSIGNED_INT_5_9_9_9_REV&&(Q=i.RGB9_E5),U===i.UNSIGNED_INT_10F_11F_11F_REV&&(Q=i.R11F_G11F_B10F)),x===i.RGBA){const at=ut?ia:oe.getTransfer(Z);U===i.FLOAT&&(Q=i.RGBA32F),U===i.HALF_FLOAT&&(Q=i.RGBA16F),U===i.UNSIGNED_BYTE&&(Q=at===_e?i.SRGB8_ALPHA8:i.RGBA8),U===i.UNSIGNED_SHORT&&dt&&(Q=dt.RGBA16_EXT),U===i.SHORT&&dt&&(Q=dt.RGBA16_SNORM_EXT),U===i.UNSIGNED_SHORT_4_4_4_4&&(Q=i.RGBA4),U===i.UNSIGNED_SHORT_5_5_5_1&&(Q=i.RGB5_A1)}return(Q===i.R16F||Q===i.R32F||Q===i.RG16F||Q===i.RG32F||Q===i.RGBA16F||Q===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Q}function _(y,x){let U;return y?x===null||x===In||x===os?U=i.DEPTH24_STENCIL8:x===wn?U=i.DEPTH32F_STENCIL8:x===Ys&&(U=i.DEPTH24_STENCIL8,Zt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===In||x===os?U=i.DEPTH_COMPONENT24:x===wn?U=i.DEPTH_COMPONENT32F:x===Ys&&(U=i.DEPTH_COMPONENT16),U}function b(y,x){return w(y)===!0||y.isFramebufferTexture&&y.minFilter!==Xe&&y.minFilter!==qe?Math.log2(Math.max(x.width,x.height))+1:y.mipmaps.length>0?y.mipmaps.length:y.isCompressedTexture&&Array.isArray(y.image)?x.mipmaps.length:1}function L(y){const x=new WeakRef(y);n.get(y).__ref=x,g.add(x),M.register(y,x,x)}function R(y){const x=n.get(y).__ref;x!==void 0&&(g.delete(x),M.unregister(x))}function D(y){W(y.target)}function z(y){N(y.target)}function W(y){y.removeEventListener("dispose",D),R(y),J(y),y.isVideoTexture&&h.delete(y),y.isHTMLTexture&&u.delete(y)}function N(y){y.removeEventListener("dispose",z),R(y),j(y)}function H(){for(const y of g){const x=y.deref();x!==void 0&&(x.isRenderTarget===!0?N(x):W(x))}g.clear(),u.clear()}function J(y){const x=n.get(y);if(x.__webglInit===void 0)return;const U=y.source,tt=d.get(U);if(tt){const Z=tt[x.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&k(y),Object.keys(tt).length===0&&d.delete(U)}n.remove(y)}function k(y){const x=n.get(y);i.deleteTexture(x.__webglTexture);const U=y.source,tt=d.get(U);delete tt[x.__cacheKey],a.memory.textures--}function j(y){const x=n.get(y);x.__depthDisposeCallback&&x.__depthDisposeCallback();const U=y.depthTexture;if(U&&U.renderTarget===y&&W(U),y.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(x.__webglFramebuffer[Z]))for(let ut=0;ut<x.__webglFramebuffer[Z].length;ut++)i.deleteFramebuffer(x.__webglFramebuffer[Z][ut]);else i.deleteFramebuffer(x.__webglFramebuffer[Z]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[Z])}else{if(Array.isArray(x.__webglFramebuffer))for(let Z=0;Z<x.__webglFramebuffer.length;Z++)i.deleteFramebuffer(x.__webglFramebuffer[Z]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let Z=0;Z<x.__webglColorRenderbuffer.length;Z++)x.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[Z]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const tt=y.textures;for(let Z=0,ut=tt.length;Z<ut;Z++){const dt=n.get(tt[Z]);dt.__webglTexture&&(i.deleteTexture(dt.__webglTexture),a.memory.textures--),n.remove(tt[Z])}n.remove(y)}let $=0;function nt(){$=0}function lt(){return $}function Nt(y){$=y}function pt(){const y=$;return y>=s.maxTextures&&Zt("WebGLTextures: Trying to use "+(y+1)+" texture units while this GPU supports only "+s.maxTextures),$+=1,y}function X(y){const x=[];return x.push(y.wrapS),x.push(y.wrapT),x.push(y.wrapR||0),x.push(y.magFilter),x.push(y.minFilter),x.push(y.anisotropy),x.push(y.internalFormat),x.push(y.format),x.push(y.type),x.push(y.generateMipmaps),x.push(y.mipmapsAutoUpdate),x.push(y.premultiplyAlpha),x.push(y.flipY),x.push(y.unpackAlignment),x.push(y.colorSpace),x.join()}function St(y,x){const U=n.get(y);if(y.isVideoTexture&&ot(y),y.isRenderTargetTexture===!1&&y.isExternalTexture!==!0&&y.version>0&&U.__version!==y.version){const tt=y.image;if(tt===null)Zt("WebGLRenderer: Texture marked for update but no image data found.");else if(tt.complete===!1)Zt("WebGLRenderer: Texture marked for update but image is incomplete");else{Mt(U,y,x);return}}else y.isExternalTexture&&(U.__webglTexture=y.sourceTexture?y.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,U.__webglTexture,i.TEXTURE0+x)}function At(y,x){const U=n.get(y);if(y.isRenderTargetTexture===!1&&y.version>0&&U.__version!==y.version){Mt(U,y,x);return}else y.isExternalTexture&&(U.__webglTexture=y.sourceTexture?y.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,U.__webglTexture,i.TEXTURE0+x)}function Rt(y,x){const U=n.get(y);if(y.isRenderTargetTexture===!1&&y.version>0&&U.__version!==y.version){Mt(U,y,x);return}e.bindTexture(i.TEXTURE_3D,U.__webglTexture,i.TEXTURE0+x)}function mt(y,x){const U=n.get(y);if(y.version>0&&U.__version!==y.version){It(U,y,x);return}e.bindTexture(i.TEXTURE_CUBE_MAP,U.__webglTexture,i.TEXTURE0+x)}const Bt={[wi]:i.REPEAT,[En]:i.CLAMP_TO_EDGE,[ao]:i.MIRRORED_REPEAT},de={[Xe]:i.NEAREST,[Qu]:i.NEAREST_MIPMAP_NEAREST,[lr]:i.NEAREST_MIPMAP_LINEAR,[qe]:i.LINEAR,[Ma]:i.LINEAR_MIPMAP_NEAREST,[Wn]:i.LINEAR_MIPMAP_LINEAR},Ht={[nf]:i.NEVER,[Ah]:i.ALWAYS,[sf]:i.LESS,[wh]:i.LEQUAL,[rf]:i.EQUAL,[Th]:i.GEQUAL,[af]:i.GREATER,[of]:i.NOTEQUAL};function Qt(y,x){if(x.type===wn&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===qe||x.magFilter===Ma||x.magFilter===lr||x.magFilter===Wn||x.minFilter===qe||x.minFilter===Ma||x.minFilter===lr||x.minFilter===Wn)&&Zt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(y,i.TEXTURE_WRAP_S,Bt[x.wrapS]),i.texParameteri(y,i.TEXTURE_WRAP_T,Bt[x.wrapT]),(y===i.TEXTURE_3D||y===i.TEXTURE_2D_ARRAY)&&i.texParameteri(y,i.TEXTURE_WRAP_R,Bt[x.wrapR]),i.texParameteri(y,i.TEXTURE_MAG_FILTER,de[x.magFilter]),i.texParameteri(y,i.TEXTURE_MIN_FILTER,de[x.minFilter]),x.compareFunction&&(i.texParameteri(y,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(y,i.TEXTURE_COMPARE_FUNC,Ht[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Xe||x.minFilter!==lr&&x.minFilter!==Wn||x.type===wn&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const U=t.get("EXT_texture_filter_anisotropic");i.texParameterf(y,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function ie(y,x){let U=!1;y.__webglInit===void 0&&(y.__webglInit=!0,x.addEventListener("dispose",D),L(x));const tt=x.source;let Z=d.get(tt);Z===void 0&&(Z={},d.set(tt,Z));const ut=X(x);if(ut!==y.__cacheKey){Z[ut]===void 0&&(Z[ut]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,U=!0),Z[ut].usedTimes++;const dt=Z[y.__cacheKey];dt!==void 0&&(Z[y.__cacheKey].usedTimes--,dt.usedTimes===0&&k(x)),y.__cacheKey=ut,y.__webglTexture=Z[ut].texture}return U}function ct(y,x,U){return Math.floor(Math.floor(y/U)/x)}function vt(y,x,U,tt){const ut=y.updateRanges;if(ut.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,U,tt,x.data);else{ut.sort((P,rt)=>P.start-rt.start);let dt=0;for(let P=1;P<ut.length;P++){const rt=ut[dt],et=ut[P],Et=rt.start+rt.count,xt=ct(et.start,x.width,4),bt=ct(rt.start,x.width,4);et.start<=Et+1&&xt===bt&&ct(et.start+et.count-1,x.width,4)===xt?rt.count=Math.max(rt.count,et.start+et.count-rt.start):(++dt,ut[dt]=et)}ut.length=dt+1;const Q=e.getParameter(i.UNPACK_ROW_LENGTH),at=e.getParameter(i.UNPACK_SKIP_PIXELS),_t=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let P=0,rt=ut.length;P<rt;P++){const et=ut[P],Et=Math.floor(et.start/4),xt=Math.ceil(et.count/4),bt=Et%x.width,Wt=Math.floor(Et/x.width),ee=xt,gt=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,bt),e.pixelStorei(i.UNPACK_SKIP_ROWS,Wt),e.texSubImage2D(i.TEXTURE_2D,0,bt,Wt,ee,gt,U,tt,x.data)}y.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,Q),e.pixelStorei(i.UNPACK_SKIP_PIXELS,at),e.pixelStorei(i.UNPACK_SKIP_ROWS,_t)}}function Mt(y,x,U){let tt=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(tt=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(tt=i.TEXTURE_3D);const Z=ie(y,x),ut=x.source;e.bindTexture(tt,y.__webglTexture,i.TEXTURE0+U);const dt=n.get(ut);if(ut.version!==dt.__version||Z===!0){if(e.activeTexture(i.TEXTURE0+U),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){const gt=oe.getPrimaries(oe.workingColorSpace),Xt=x.colorSpace===ri?null:oe.getPrimaries(x.colorSpace),jt=x.colorSpace===ri||gt===Xt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,jt)}e.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment);let at=S(x.image,!1,s.maxTextureSize);at=it(x,at);const _t=r.convert(x.format,x.colorSpace),P=r.convert(x.type);let rt=T(x.internalFormat,_t,P,x.normalized,x.colorSpace,x.isVideoTexture);Qt(tt,x);let et;const Et=x.mipmaps,xt=x.isVideoTexture!==!0,bt=dt.__version===void 0||Z===!0,Wt=ut.dataReady,ee=b(x,at);if(x.isDepthTexture)rt=_(x.format===oi,x.type),bt&&(xt?e.texStorage2D(i.TEXTURE_2D,1,rt,at.width,at.height):e.texImage2D(i.TEXTURE_2D,0,rt,at.width,at.height,0,_t,P,null));else if(x.isDataTexture)if(Et.length>0){xt&&bt&&e.texStorage2D(i.TEXTURE_2D,ee,rt,Et[0].width,Et[0].height);for(let gt=0,Xt=Et.length;gt<Xt;gt++)et=Et[gt],xt?Wt&&e.texSubImage2D(i.TEXTURE_2D,gt,0,0,et.width,et.height,_t,P,et.data):e.texImage2D(i.TEXTURE_2D,gt,rt,et.width,et.height,0,_t,P,et.data);x.generateMipmaps=!1}else xt?(bt&&e.texStorage2D(i.TEXTURE_2D,ee,rt,at.width,at.height),Wt&&vt(x,at,_t,P)):e.texImage2D(i.TEXTURE_2D,0,rt,at.width,at.height,0,_t,P,at.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){xt&&bt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ee,rt,Et[0].width,Et[0].height,at.depth);for(let gt=0,Xt=Et.length;gt<Xt;gt++)if(et=Et[gt],x.format!==dn)if(_t!==null)if(xt){if(Wt)if(x.layerUpdates.size>0){const jt=Bc(et.width,et.height,x.format,x.type);for(const Ct of x.layerUpdates){const xe=et.data.subarray(Ct*jt/et.data.BYTES_PER_ELEMENT,(Ct+1)*jt/et.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,gt,0,0,Ct,et.width,et.height,1,_t,xe)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,gt,0,0,0,et.width,et.height,at.depth,_t,et.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,gt,rt,et.width,et.height,at.depth,0,et.data,0,0);else Zt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else xt?Wt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,gt,0,0,0,et.width,et.height,at.depth,_t,P,et.data):e.texImage3D(i.TEXTURE_2D_ARRAY,gt,rt,et.width,et.height,at.depth,0,_t,P,et.data);x.layerUpdates.size>0&&x.clearLayerUpdates()}else{xt&&bt&&e.texStorage2D(i.TEXTURE_2D,ee,rt,Et[0].width,Et[0].height);for(let gt=0,Xt=Et.length;gt<Xt;gt++)et=Et[gt],x.format!==dn?_t!==null?xt?Wt&&e.compressedTexSubImage2D(i.TEXTURE_2D,gt,0,0,et.width,et.height,_t,et.data):e.compressedTexImage2D(i.TEXTURE_2D,gt,rt,et.width,et.height,0,et.data):Zt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):xt?Wt&&e.texSubImage2D(i.TEXTURE_2D,gt,0,0,et.width,et.height,_t,P,et.data):e.texImage2D(i.TEXTURE_2D,gt,rt,et.width,et.height,0,_t,P,et.data)}else if(x.isDataArrayTexture)if(xt){if(bt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ee,rt,at.width,at.height,at.depth),Wt)if(x.layerUpdates.size>0){const gt=Bc(at.width,at.height,x.format,x.type);for(const Xt of x.layerUpdates){const jt=at.data.subarray(Xt*gt/at.data.BYTES_PER_ELEMENT,(Xt+1)*gt/at.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Xt,at.width,at.height,1,_t,P,jt)}x.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,at.width,at.height,at.depth,_t,P,at.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,rt,at.width,at.height,at.depth,0,_t,P,at.data);else if(x.isData3DTexture)xt?(bt&&e.texStorage3D(i.TEXTURE_3D,ee,rt,at.width,at.height,at.depth),Wt&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,at.width,at.height,at.depth,_t,P,at.data)):e.texImage3D(i.TEXTURE_3D,0,rt,at.width,at.height,at.depth,0,_t,P,at.data);else if(x.isFramebufferTexture){if(bt)if(xt)e.texStorage2D(i.TEXTURE_2D,ee,rt,at.width,at.height);else{let gt=at.width,Xt=at.height;for(let jt=0;jt<ee;jt++)e.texImage2D(i.TEXTURE_2D,jt,rt,gt,Xt,0,_t,P,null),gt>>=1,Xt>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in i){const gt=i.canvas;if(gt.hasAttribute("layoutsubtree")||gt.setAttribute("layoutsubtree","true"),at.parentNode!==gt){gt.appendChild(at),u.add(x),gt.onpaint=Xt=>{const jt=Xt.changedElements;for(const Ct of u)jt.includes(Ct.image)&&(Ct.needsUpdate=!0)},gt.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,at);else{const jt=i.RGBA,Ct=i.RGBA,xe=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,jt,Ct,xe,at)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Et.length>0){if(xt&&bt){const gt=q(Et[0]);e.texStorage2D(i.TEXTURE_2D,ee,rt,gt.width,gt.height)}for(let gt=0,Xt=Et.length;gt<Xt;gt++)et=Et[gt],xt?Wt&&e.texSubImage2D(i.TEXTURE_2D,gt,0,0,_t,P,et):e.texImage2D(i.TEXTURE_2D,gt,rt,_t,P,et);x.generateMipmaps=!1}else if(xt){if(bt){const gt=q(at);e.texStorage2D(i.TEXTURE_2D,ee,rt,gt.width,gt.height)}Wt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,_t,P,at)}else e.texImage2D(i.TEXTURE_2D,0,rt,_t,P,at);w(x)&&x.mipmapsAutoUpdate===!0&&v(tt),dt.__version=ut.version,x.onUpdate&&x.onUpdate(x)}y.__version=x.version}function It(y,x,U){if(x.image.length!==6)return;const tt=ie(y,x),Z=x.source;e.bindTexture(i.TEXTURE_CUBE_MAP,y.__webglTexture,i.TEXTURE0+U);const ut=n.get(Z);if(Z.version!==ut.__version||tt===!0){e.activeTexture(i.TEXTURE0+U);const dt=oe.getPrimaries(oe.workingColorSpace),Q=x.colorSpace===ri?null:oe.getPrimaries(x.colorSpace),at=x.colorSpace===ri||dt===Q?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,at);const _t=x.isCompressedTexture||x.image[0].isCompressedTexture,P=x.image[0]&&x.image[0].isDataTexture,rt=[];for(let Ct=0;Ct<6;Ct++)!_t&&!P?rt[Ct]=S(x.image[Ct],!0,s.maxCubemapSize):rt[Ct]=P?x.image[Ct].image:x.image[Ct],rt[Ct]=it(x,rt[Ct]);const et=rt[0],Et=r.convert(x.format,x.colorSpace),xt=r.convert(x.type);let bt=T(x.internalFormat,Et,xt,x.normalized,x.colorSpace);const Wt=x.isVideoTexture!==!0,ee=ut.__version===void 0||tt===!0,gt=Z.dataReady;let Xt=b(x,et);Qt(i.TEXTURE_CUBE_MAP,x);let jt;if(x.isDepthTexture){if(bt=_(x.format===oi,x.type),ee)if(Wt)e.texStorage2D(i.TEXTURE_CUBE_MAP,1,bt,et.width,et.height);else for(let Ct=0;Ct<6;Ct++)e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,0,bt,et.width,et.height,0,Et,xt,null)}else if(_t){Wt&&ee&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Xt,bt,et.width,et.height);for(let Ct=0;Ct<6;Ct++){jt=rt[Ct].mipmaps;for(let xe=0;xe<jt.length;xe++){const ze=jt[xe];x.format!==dn?Et!==null?Wt?gt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,xe,0,0,ze.width,ze.height,Et,ze.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,xe,bt,ze.width,ze.height,0,ze.data):Zt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Wt?gt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,xe,0,0,ze.width,ze.height,Et,xt,ze.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,xe,bt,ze.width,ze.height,0,Et,xt,ze.data)}}}else{if(jt=x.mipmaps,Wt&&ee){jt.length>0&&Xt++;const Ct=q(rt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Xt,bt,Ct.width,Ct.height)}for(let Ct=0;Ct<6;Ct++)if(P){Wt?gt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,0,0,0,rt[Ct].width,rt[Ct].height,Et,xt,rt[Ct].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,0,bt,rt[Ct].width,rt[Ct].height,0,Et,xt,rt[Ct].data);for(let xe=0;xe<jt.length;xe++){const $n=jt[xe].image[Ct].image;Wt?gt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,xe+1,0,0,$n.width,$n.height,Et,xt,$n.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,xe+1,bt,$n.width,$n.height,0,Et,xt,$n.data)}}else{Wt?gt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,0,0,0,Et,xt,rt[Ct]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,0,bt,Et,xt,rt[Ct]);for(let xe=0;xe<jt.length;xe++){const ze=jt[xe];Wt?gt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,xe+1,0,0,Et,xt,ze.image[Ct]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,xe+1,bt,Et,xt,ze.image[Ct])}}}w(x)&&x.mipmapsAutoUpdate===!0&&v(i.TEXTURE_CUBE_MAP),ut.__version=Z.version,x.onUpdate&&x.onUpdate(x)}y.__version=x.version}function yt(y,x,U,tt,Z,ut){const dt=r.convert(U.format,U.colorSpace),Q=r.convert(U.type),at=T(U.internalFormat,dt,Q,U.normalized,U.colorSpace),_t=n.get(x),P=n.get(U);if(P.__renderTarget=x,!_t.__hasExternalTextures){const rt=Math.max(1,x.width>>ut),et=Math.max(1,x.height>>ut);Z===i.TEXTURE_3D||Z===i.TEXTURE_2D_ARRAY?e.texImage3D(Z,ut,at,rt,et,x.depth,0,dt,Q,null):e.texImage2D(Z,ut,at,rt,et,0,dt,Q,null)}e.bindFramebuffer(i.FRAMEBUFFER,y),B(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,tt,Z,P.__webglTexture,0,st(x)):(Z===i.TEXTURE_2D||Z>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,tt,Z,P.__webglTexture,ut),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Kt(y,x,U){if(i.bindRenderbuffer(i.RENDERBUFFER,y),x.depthBuffer){const tt=x.depthTexture,Z=tt&&tt.isDepthTexture?tt.type:null,ut=_(x.stencilBuffer,Z),dt=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;B(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,st(x),ut,x.width,x.height):U?i.renderbufferStorageMultisample(i.RENDERBUFFER,st(x),ut,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,ut,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,dt,i.RENDERBUFFER,y)}else{const tt=x.textures;for(let Z=0;Z<tt.length;Z++){const ut=tt[Z],dt=r.convert(ut.format,ut.colorSpace),Q=r.convert(ut.type),at=T(ut.internalFormat,dt,Q,ut.normalized,ut.colorSpace);B(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,st(x),at,x.width,x.height):U?i.renderbufferStorageMultisample(i.RENDERBUFFER,st(x),at,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,at,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function zt(y,x,U){const tt=x.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,y),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Z=n.get(x.depthTexture);Z.__renderTarget=x;const ut=tt?x.depthTexture.image[0]:x.depthTexture.image;(!Z.__webglTexture||ut.width!==x.width||ut.height!==x.height)&&(ut.width=x.width,ut.height=x.height,x.depthTexture.needsUpdate=!0),tt?mt(x.depthTexture,0):St(x.depthTexture,0);const dt=Z.__webglTexture,Q=st(x),at=tt?i.TEXTURE_CUBE_MAP_POSITIVE_X+U:i.TEXTURE_2D,_t=x.depthTexture.format===oi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(x.depthTexture.format===ci)B(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,_t,at,dt,0,Q):i.framebufferTexture2D(i.FRAMEBUFFER,_t,at,dt,0);else if(x.depthTexture.format===oi)B(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,_t,at,dt,0,Q):i.framebufferTexture2D(i.FRAMEBUFFER,_t,at,dt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function te(y){const x=n.get(y),U=y.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==y.depthTexture){const tt=y.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),tt){const Z=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,tt.removeEventListener("dispose",Z)};tt.addEventListener("dispose",Z),x.__depthDisposeCallback=Z}x.__boundDepthTexture=tt}if(y.depthTexture&&!x.__autoAllocateDepthBuffer)if(U)for(let tt=0;tt<6;tt++)zt(x.__webglFramebuffer[tt],y,tt);else y.texture.mipmaps.length>0?zt(x.__webglFramebuffer[0],y,0):zt(x.__webglFramebuffer,y,0);else if(U){x.__webglDepthbuffer=[];for(let tt=0;tt<6;tt++)if(e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[tt]),x.__webglDepthbuffer[tt]===void 0)x.__webglDepthbuffer[tt]=i.createRenderbuffer(),Kt(x.__webglDepthbuffer[tt],y,!1);else{const Z=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ut=x.__webglDepthbuffer[tt];i.bindRenderbuffer(i.RENDERBUFFER,ut),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,ut)}}else if(y.texture.mipmaps.length>0?e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),Kt(x.__webglDepthbuffer,y,!1);else{const Z=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ut=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ut),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,ut)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Vt(y,x,U){const tt=n.get(y);x!==void 0&&yt(tt.__webglFramebuffer,y,y.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),U!==void 0&&te(y)}function ce(y){const x=y.texture,U=n.get(y),tt=n.get(x);y.addEventListener("dispose",z),L(y);const Z=y.textures,ut=y.isWebGLCubeRenderTarget===!0,dt=Z.length>1;if(dt||(tt.__webglTexture===void 0&&(tt.__webglTexture=i.createTexture()),tt.__version=x.version,a.memory.textures++),ut){U.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(x.mipmaps.length>0){U.__webglFramebuffer[Q]=[];for(let at=0;at<x.mipmaps.length;at++)U.__webglFramebuffer[Q][at]=i.createFramebuffer()}else U.__webglFramebuffer[Q]=i.createFramebuffer()}else{if(x.mipmaps.length>0){U.__webglFramebuffer=[];for(let Q=0;Q<x.mipmaps.length;Q++)U.__webglFramebuffer[Q]=i.createFramebuffer()}else U.__webglFramebuffer=i.createFramebuffer();if(dt)for(let Q=0,at=Z.length;Q<at;Q++){const _t=n.get(Z[Q]);_t.__webglTexture===void 0&&(_t.__webglTexture=i.createTexture(),a.memory.textures++)}if(y.samples>0&&B(y)===!1){U.__webglMultisampledFramebuffer=i.createFramebuffer(),U.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let Q=0;Q<Z.length;Q++){const at=Z[Q];U.__webglColorRenderbuffer[Q]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,U.__webglColorRenderbuffer[Q]);const _t=r.convert(at.format,at.colorSpace),P=r.convert(at.type),rt=T(at.internalFormat,_t,P,at.normalized,at.colorSpace,y.isXRRenderTarget===!0),et=st(y);i.renderbufferStorageMultisample(i.RENDERBUFFER,et,rt,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Q,i.RENDERBUFFER,U.__webglColorRenderbuffer[Q])}i.bindRenderbuffer(i.RENDERBUFFER,null),y.depthBuffer&&(U.__webglDepthRenderbuffer=i.createRenderbuffer(),Kt(U.__webglDepthRenderbuffer,y,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ut){e.bindTexture(i.TEXTURE_CUBE_MAP,tt.__webglTexture),Qt(i.TEXTURE_CUBE_MAP,x);for(let Q=0;Q<6;Q++)if(x.mipmaps.length>0)for(let at=0;at<x.mipmaps.length;at++)yt(U.__webglFramebuffer[Q][at],y,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,at);else yt(U.__webglFramebuffer[Q],y,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);w(x)?v(i.TEXTURE_CUBE_MAP):x.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,x.mipmaps.length-1),e.unbindTexture()}else if(dt){for(let Q=0,at=Z.length;Q<at;Q++){const _t=Z[Q],P=n.get(_t);let rt=i.TEXTURE_2D;(y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(rt=y.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(rt,P.__webglTexture),Qt(rt,_t),yt(U.__webglFramebuffer,y,_t,i.COLOR_ATTACHMENT0+Q,rt,0),w(_t)&&v(rt)}e.unbindTexture()}else{let Q=i.TEXTURE_2D;if((y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(Q=y.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Q,tt.__webglTexture),Qt(Q,x),x.mipmaps.length>0)for(let at=0;at<x.mipmaps.length;at++)yt(U.__webglFramebuffer[at],y,x,i.COLOR_ATTACHMENT0,Q,at);else yt(U.__webglFramebuffer,y,x,i.COLOR_ATTACHMENT0,Q,0);w(x)?v(Q):x.mipmaps.length>0&&i.texParameteri(Q,i.TEXTURE_MAX_LEVEL,x.mipmaps.length-1),e.unbindTexture()}y.depthBuffer&&te(y)}function O(y){const x=y.textures;for(let U=0,tt=x.length;U<tt;U++){const Z=x[U];if(w(Z)&&Z.mipmapsAutoUpdate===!0){const ut=A(y),dt=n.get(Z).__webglTexture;e.bindTexture(ut,dt),v(ut),e.unbindTexture()}}}const Le=[];function G(y){if(y.samples>0){if(B(y)===!1){const x=y.textures,U=y.width,tt=y.height;let Z=i.COLOR_BUFFER_BIT;const ut=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,dt=n.get(y),Q=x.length>1;if(Q)for(let _t=0;_t<x.length;_t++)e.bindFramebuffer(i.FRAMEBUFFER,dt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_t,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,dt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+_t,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,dt.__webglMultisampledFramebuffer),y.texture.mipmaps.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,dt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,dt.__webglFramebuffer);for(let _t=0;_t<x.length;_t++){if(y.resolveDepthBuffer&&(y.depthBuffer&&(Z|=i.DEPTH_BUFFER_BIT),y.stencilBuffer&&y.resolveStencilBuffer&&(Z|=i.STENCIL_BUFFER_BIT)),Q){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,dt.__webglColorRenderbuffer[_t]);const P=n.get(x[_t]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,P,0)}i.blitFramebuffer(0,0,U,tt,0,0,U,tt,Z,i.NEAREST),l===!0&&(Le.length=0,Le.push(i.COLOR_ATTACHMENT0+_t),y.depthBuffer&&y.storeMultisampledDepthBuffer===!1&&Le.push(ut),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Le))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Q)for(let _t=0;_t<x.length;_t++){e.bindFramebuffer(i.FRAMEBUFFER,dt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_t,i.RENDERBUFFER,dt.__webglColorRenderbuffer[_t]);const P=n.get(x[_t]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,dt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+_t,i.TEXTURE_2D,P,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,dt.__webglMultisampledFramebuffer)}else if(y.depthBuffer&&y.storeMultisampledDepthBuffer===!1&&l){const x=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function st(y){return Math.min(s.maxSamples,y.samples)}function B(y){const x=n.get(y);return y.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function ot(y){const x=a.render.frame;h.get(y)!==x&&(h.set(y,x),y.update())}function it(y,x){const U=y.colorSpace,tt=y.format,Z=y.type;return y.isCompressedTexture===!0||y.isVideoTexture===!0||U!==na&&U!==ri&&(oe.getTransfer(U)===_e?(tt!==dn||Z!==fn)&&Zt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):he("WebGLTextures: Unsupported texture color space:",U)),x}function q(y){return typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement?(c.width=y.naturalWidth||y.width,c.height=y.naturalHeight||y.height):typeof VideoFrame<"u"&&y instanceof VideoFrame?(c.width=y.displayWidth,c.height=y.displayHeight):(c.width=y.width,c.height=y.height),c}this.allocateTextureUnit=pt,this.resetTextureUnits=nt,this.getTextureUnits=lt,this.setTextureUnits=Nt,this.setTexture2D=St,this.setTexture2DArray=At,this.setTexture3D=Rt,this.setTextureCube=mt,this.rebindTextures=Vt,this.setupRenderTarget=ce,this.updateRenderTargetMipmap=O,this.updateMultisampleRenderTarget=G,this.setupDepthRenderbuffer=te,this.setupFrameBufferTexture=yt,this.useMultisampledRTT=B,this.dispose=H}function b_(i,t){function e(n,s=ri){let r;const a=oe.getTransfer(s);if(n===fn)return i.UNSIGNED_BYTE;if(n===nl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===il)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Sh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===yh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===vh)return i.BYTE;if(n===Mh)return i.SHORT;if(n===Ys)return i.UNSIGNED_SHORT;if(n===el)return i.INT;if(n===In)return i.UNSIGNED_INT;if(n===wn)return i.FLOAT;if(n===on)return i.HALF_FLOAT;if(n===bh)return i.ALPHA;if(n===Eh)return i.RGB;if(n===dn)return i.RGBA;if(n===ci)return i.DEPTH_COMPONENT;if(n===oi)return i.DEPTH_STENCIL;if(n===sl)return i.RED;if(n===rl)return i.RED_INTEGER;if(n===Ti)return i.RG;if(n===al)return i.RG_INTEGER;if(n===ol)return i.RGBA_INTEGER;if(n===Yr||n===Zr||n===Kr||n===Jr)if(a===_e)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Yr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Zr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Kr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Jr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Yr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Zr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Kr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Jr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===oo||n===lo||n===co||n===ho)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===oo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===lo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===co)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ho)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===uo||n===fo||n===po||n===mo||n===go||n===ta||n===_o)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===uo||n===fo)return a===_e?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===po)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===mo)return r.COMPRESSED_R11_EAC;if(n===go)return r.COMPRESSED_SIGNED_R11_EAC;if(n===ta)return r.COMPRESSED_RG11_EAC;if(n===_o)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===xo||n===vo||n===Mo||n===So||n===yo||n===bo||n===Eo||n===wo||n===To||n===Ao||n===Ro||n===Co||n===Po||n===Lo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===xo)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===vo)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Mo)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===So)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===yo)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===bo)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Eo)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===wo)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===To)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ao)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ro)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Co)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Po)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Lo)return a===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Do||n===Io||n===No)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Do)return a===_e?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Io)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===No)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Uo||n===Fo||n===ea||n===Oo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Uo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Fo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ea)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Oo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===os?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const E_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,w_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class T_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Gh(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new an({vertexShader:E_,fragmentShader:w_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Dt(new un(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class A_ extends Ci{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,f=null,d=null,g=null;const M=typeof XRWebGLBinding<"u",m=new T_,p={},S=e.getContextAttributes();let w=null,v=null;const A=[],T=[],_=new ft;let b=null,L=null;const R=new _n;R.viewport=new Re;const D=new _n;D.viewport=new Re;const z=[R,D],W=new Od;let N=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let St=A[X];return St===void 0&&(St=new Aa,A[X]=St),St.getTargetRaySpace()},this.getControllerGrip=function(X){let St=A[X];return St===void 0&&(St=new Aa,A[X]=St),St.getGripSpace()},this.getHand=function(X){let St=A[X];return St===void 0&&(St=new Aa,A[X]=St),St.getHandSpace()};function J(X){const St=T.indexOf(X.inputSource);if(St===-1)return;const At=A[St];At!==void 0&&(At.update(X.inputSource,X.frame,c||a),At.dispatchEvent({type:X.type,data:X.inputSource}))}function k(){s.removeEventListener("select",J),s.removeEventListener("selectstart",J),s.removeEventListener("selectend",J),s.removeEventListener("squeeze",J),s.removeEventListener("squeezestart",J),s.removeEventListener("squeezeend",J),s.removeEventListener("end",k),s.removeEventListener("inputsourceschange",j);for(let X=0;X<A.length;X++){const St=T[X];St!==null&&(T[X]=null,A[X].disconnect(St))}N=null,H=null,m.reset();for(const X in p)delete p[X];if(t.setRenderTarget(w),d=null,f=null,u=null,s=null,v=null,pt.stop(),n.isPresenting=!1,t.setPixelRatio(b),t.setSize(_.width,_.height,!1),L!==null){const X=L.camera;X.fov=L.fov,X.zoom=L.zoom,X.updateProjectionMatrix(),L=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&Zt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,n.isPresenting===!0&&Zt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&M&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(w=t.getRenderTarget(),s.addEventListener("select",J),s.addEventListener("selectstart",J),s.addEventListener("selectend",J),s.addEventListener("squeeze",J),s.addEventListener("squeezestart",J),s.addEventListener("squeezeend",J),s.addEventListener("end",k),s.addEventListener("inputsourceschange",j),S.xrCompatible!==!0&&await e.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(_),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let At=null,Rt=null,mt=null;S.depth&&(mt=S.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,At=S.stencil?oi:ci,Rt=S.stencil?os:In);const Bt={colorFormat:e.RGBA8,depthFormat:mt,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(Bt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),v=new ln(f.textureWidth,f.textureHeight,{format:dn,type:fn,depthTexture:new ls(f.textureWidth,f.textureHeight,Rt,void 0,void 0,void 0,void 0,void 0,void 0,At),stencilBuffer:S.stencil,colorSpace:t.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{const At={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,At),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),v=new ln(d.framebufferWidth,d.framebufferHeight,{format:dn,type:fn,colorSpace:t.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),pt.setContext(s),pt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function j(X){for(let St=0;St<X.removed.length;St++){const At=X.removed[St],Rt=T.indexOf(At);Rt>=0&&(T[Rt]=null,A[Rt].disconnect(At))}for(let St=0;St<X.added.length;St++){const At=X.added[St];let Rt=T.indexOf(At);if(Rt===-1){for(let Bt=0;Bt<A.length;Bt++)if(Bt>=T.length){T.push(At),Rt=Bt;break}else if(T[Bt]===null){T[Bt]=At,Rt=Bt;break}if(Rt===-1)break}const mt=A[Rt];mt&&mt.connect(At)}}function $(X,St){St===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(St.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let St=X.near,At=X.far;m.texture!==null&&(m.depthNear>0&&(St=m.depthNear),m.depthFar>0&&(At=m.depthFar)),W.near=D.near=R.near=St,W.far=D.far=R.far=At,(N!==W.near||H!==W.far)&&(s.updateRenderState({depthNear:W.near,depthFar:W.far}),N=W.near,H=W.far),W.layers.mask=X.layers.mask|6,R.layers.mask=W.layers.mask&-5,D.layers.mask=W.layers.mask&-3;const Rt=X.parent,mt=W.cameras;$(W,Rt);for(let Bt=0;Bt<mt.length;Bt++)$(mt[Bt],Rt);W.projectionMatrix.copy(R.projectionMatrix),W.projectionMatrixInverse.copy(R.projectionMatrixInverse),L===null&&X.isPerspectiveCamera&&(L={camera:X,fov:X.fov,zoom:X.zoom}),nt(X,W,Rt)};function nt(X,St,At){At===null?X.matrix.copy(St.matrixWorld):(X.matrix.copy(At.matrixWorld),X.matrix.invert(),X.matrix.multiply(St.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(St.projectionMatrix),X.projectionMatrixInverse.copy(St.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Ks*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return W},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(X){l=X,f!==null&&(f.fixedFoveation=X),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=X)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(W)},this.getCameraTexture=function(X){return p[X]};let lt=null;function Nt(X,St){if(h=St.getViewerPose(c||a),g=St,h!==null){const At=h.views;d!==null&&(t.setRenderTargetFramebuffer(v,d.framebuffer),t.setRenderTarget(v));let Rt=!1;At.length!==W.cameras.length&&(W.cameras.length=0,Rt=!0);for(let Ht=0;Ht<At.length;Ht++){const Qt=At[Ht];let ie=null;if(d!==null)ie=d.getViewport(Qt);else{const vt=u.getViewSubImage(f,Qt);ie=vt.viewport,Ht===0&&(t.setRenderTargetTextures(v,vt.colorTexture,vt.depthStencilTexture),t.setRenderTarget(v))}let ct=z[Ht];ct===void 0&&(ct=new _n,ct.layers.enable(Ht),ct.viewport=new Re,z[Ht]=ct),ct.matrix.fromArray(Qt.transform.matrix),ct.matrix.decompose(ct.position,ct.quaternion,ct.scale),ct.projectionMatrix.fromArray(Qt.projectionMatrix),ct.projectionMatrixInverse.copy(ct.projectionMatrix).invert(),ct.viewport.set(ie.x,ie.y,ie.width,ie.height),Ht===0&&(W.matrix.copy(ct.matrix),W.matrix.decompose(W.position,W.quaternion,W.scale)),Rt===!0&&W.cameras.push(ct)}const mt=s.enabledFeatures;if(mt&&mt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&M){u=n.getBinding();const Ht=u.getDepthInformation(At[0]);Ht&&Ht.isValid&&Ht.texture&&m.init(Ht,s.renderState)}if(mt&&mt.includes("camera-access")&&M){t.state.unbindTexture(),u=n.getBinding();for(let Ht=0;Ht<At.length;Ht++){const Qt=At[Ht].camera;if(Qt){let ie=p[Qt];ie||(ie=new Gh,p[Qt]=ie);const ct=u.getCameraImage(Qt);ie.sourceTexture=ct}}}}for(let At=0;At<A.length;At++){const Rt=T[At],mt=A[At];Rt!==null&&mt!==void 0&&mt.update(Rt,St,c||a)}lt&&lt(X,St),St.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:St}),g=null}const pt=new iu;pt.setAnimationLoop(Nt),this.setAnimationLoop=function(X){lt=X},this.dispose=function(){}}}const R_=new me,du=new Jt;du.set(-1,0,0,0,1,0,0,0,1);function C_(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Qh(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,S,w,v){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,v)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),M(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,S,w):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===nn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===nn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const S=t.get(p),w=S.envMap,v=S.envMapRotation;w&&(m.envMap.value=w,m.envMapRotation.value.setFromMatrix4(R_.makeRotationFromEuler(v)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(du),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,S,w){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*S,m.scale.value=w*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,S){m.ior.value=p.ior,p.diffuseRoughness>0&&(m.diffuseRoughness.value=p.diffuseRoughness,p.diffuseRoughnessMap&&(m.diffuseRoughnessMap.value=p.diffuseRoughnessMap,e(p.diffuseRoughnessMap,m.diffuseRoughnessMapTransform))),p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===nn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessMinimum,m.iridescenceThicknessMaximum.value=p.iridescenceThicknessMaximum,p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function M(m,p){const S=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function P_(i,t,e,n){let s={},r={};function a(S,w){const v=w.program;n.uniformBlockBinding(S,v,s[S.id])}function o(S,w){let v=s[S.id];v===void 0&&(g(S),v=l(S),s[S.id]=v,S.addEventListener("dispose",m));const A=w.program;n.updateUBOMapping(S,A);const T=t.render.frame;r[S.id]!==T&&(c(S),r[S.id]=T)}function l(S){const w=i.createBuffer(),v=S.__size,A=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,v,A),i.bindBuffer(i.UNIFORM_BUFFER,null),w}function c(S){const w=s[S.id],v=S.uniforms,A=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let T=0,_=v.length;T<_;T++){const b=v[T];if(Array.isArray(b))for(let L=0,R=b.length;L<R;L++)h(b[L],T,L,A);else h(b,T,0,A)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(S,w,v,A){if(f(S,w,v,A)===!0){const T=S.__offset,_=S.value;if(Array.isArray(_)){let b=0;for(let L=0;L<_.length;L++){const R=_[L],D=M(R,!0);u(R,S.__data,b),b+=D.storage/Float32Array.BYTES_PER_ELEMENT}}else u(_,S.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,T,S.__data)}}function u(S,w,v){typeof S=="number"||typeof S=="boolean"?w[v]=S:S.isMatrix3?(w[v]=S.elements[0],w[v+1]=S.elements[1],w[v+2]=S.elements[2],w[v+3]=0,w[v+4]=S.elements[3],w[v+5]=S.elements[4],w[v+6]=S.elements[5],w[v+7]=0,w[v+8]=S.elements[6],w[v+9]=S.elements[7],w[v+10]=S.elements[8],w[v+11]=0):ArrayBuffer.isView(S)?w.set(S.subarray(0,w.length-v),v):S.toArray(w,v)}function f(S,w,v,A){const T=S.value,_=w+"_"+v;if(Array.isArray(T)){A[_]===void 0&&(A[_]=[]);const b=A[_];let L=!1;for(let R=0;R<T.length;R++)d(T[R],b,R)===!0&&(L=!0);return L}return d(T,A,_)}function d(S,w,v){if(w[v]===void 0)return typeof S=="number"||typeof S=="boolean"?w[v]=S:ArrayBuffer.isView(S)?w[v]=S.slice():w[v]=S.clone(),!0;{const A=w[v];if(typeof S=="number"||typeof S=="boolean"){if(A!==S)return w[v]=S,!0}else{if(ArrayBuffer.isView(S))return!0;if(A.equals(S)===!1)return A.copy(S),!0}}return!1}function g(S){const w=S.uniforms;let v=0;const A=16;for(let _=0,b=w.length;_<b;_++){const L=Array.isArray(w[_])?w[_]:[w[_]];for(let R=0,D=L.length;R<D;R++){const z=L[R],W=Array.isArray(z.value)?z.value:[z.value],N=Array.isArray(w[_])||Array.isArray(z.value);let H=v;for(let k=0,j=W.length;k<j;k++){const $=W[k],nt=M($,N),lt=v%A,Nt=lt%nt.boundary,pt=lt+Nt;v+=Nt,pt!==0&&A-pt<nt.storage&&(v+=A-pt),k===0&&(H=v),v+=nt.storage}const J=z.type==="int"?Int32Array:z.type==="uint"?Uint32Array:Float32Array;z.__data=new J((v-H)/Float32Array.BYTES_PER_ELEMENT),z.__offset=H}}const T=v%A;return T>0&&(v+=A-T),S.__size=v,S.__cache={},this}function M(S,w){const v={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(v.boundary=4,v.storage=4):S.isVector2?(v.boundary=8,v.storage=8):S.isVector3||S.isColor?(v.boundary=16,v.storage=12):S.isVector4?(v.boundary=16,v.storage=16):S.isMatrix3?(v.boundary=16,v.storage=48):S.isMatrix4?(v.boundary=16,v.storage=64):S.isTexture?Zt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(v.boundary=16,v.storage=S.byteLength):Zt("WebGLRenderer: Unsupported uniform value type.",S),w===!0&&(v.boundary=16,v.storage=Math.ceil(v.storage/16)*16),v}function m(S){const w=S.target;w.removeEventListener("dispose",m),i.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function p(){for(const S in s)i.deleteBuffer(s[S]);s={},r={}}return{bind:a,update:o,dispose:p}}const L_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Ln=null;function D_(){return Ln===null&&(Ln=new ir(L_,16,16,Ti,on),Ln.name="DFG_LUT",Ln.minFilter=qe,Ln.magFilter=qe,Ln.wrapS=En,Ln.wrapT=En,Ln.generateMipmaps=!1,Ln.needsUpdate=!0),Ln}class I_{constructor(t={}){const{canvas:e=cf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1,outputBufferType:d=fn}=t;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const M=d,m=new Set([ol,al,rl]),p=new Set([fn,In,Ys,os,nl,il]),S=new Uint32Array(4),w=new Int32Array(4),v={textures:[],min:[],max:[],resolution:[]};let A=null,T=null;const _=[],b=[];let L=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Xn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const R=this;let D=!1,z=null,W=null,N=null,H=null;this._outputColorSpace=He;let J=0,k=0,j=null,$=-1,nt=null;const lt=new Re,Nt=new Re;let pt=null;const X=new qt(0);let St=0,At=e.width,Rt=e.height,mt=1,Bt=null,de=null;const Ht=new Re(0,0,At,Rt),Qt=new Re(0,0,At,Rt);let ie=!1;const ct=new Js,vt=new pl;let Mt=!1,It=!1;const yt=new me,Kt=new C,zt=new Re,te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Vt=!1;function ce(){return j===null?mt:1}let O=n;function Le(E,F){return e.getContext(E,F)}let G,st,B,ot,it,q,y,x,U,tt,Z,ut,dt,Q,at,_t,P,rt,et,Et,xt,bt,Wt;try{const E={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Zo}`),e.addEventListener("webglcontextlost",Xt,!1),e.addEventListener("webglcontextrestored",jt,!1),e.addEventListener("webglcontextcreationerror",Ct,!1),O===null){const F="webgl2";if(O=Le(F,E),O===null)throw Le(F)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}ee()}catch(E){throw e.removeEventListener("webglcontextlost",Xt,!1),e.removeEventListener("webglcontextrestored",jt,!1),e.removeEventListener("webglcontextcreationerror",Ct,!1),he("WebGLRenderer: "+E.message),E}function ee(){G=new Fm(O),G.init(),xt=new b_(O,G),st=new wm(O,G,t,xt),B=new S_(O,G),st.reversedDepthBuffer&&f&&B.buffers.depth.setReversed(!0),W=O.createFramebuffer(),N=O.createFramebuffer(),H=O.createFramebuffer(),ot=new zm(O),it=new o_,q=new y_(O,G,B,it,st,xt,ot),y=new Um(R),x=new Gd(O),bt=new bm(O,x),U=new Om(O,x,ot,bt),tt=new Gm(O,U,x,bt,ot),rt=new km(O,st,q),at=new Tm(it),Z=new a_(R,y,G,st,bt,at),ut=new C_(R,it),dt=new c_,Q=new m_(G),P=new ym(R,y,B,tt,g,l),_t=new M_(R,tt,st),Wt=new P_(O,ot,st,B),et=new Em(O,G,ot),Et=new Bm(O,G,ot),ot.programs=Z.programs,R.capabilities=st,R.extensions=G,R.properties=it,R.renderLists=dt,R.shadowMap=_t,R.state=B,R.info=ot}M!==fn&&(L=new Vm(M,e.width,e.height,o,s,r));const gt=new A_(R,O);this.xr=gt,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const E=G.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=G.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return mt},this.setPixelRatio=function(E){E!==void 0&&(mt=E,this.setSize(At,Rt,!1))},this.getSize=function(E){return E.set(At,Rt)},this.setSize=function(E,F,K=!0){if(gt.isPresenting){Zt("WebGLRenderer: Can't change size while VR device is presenting.");return}At=E,Rt=F,e.width=Math.floor(E*mt),e.height=Math.floor(F*mt),K===!0&&(e.style.width=E+"px",e.style.height=F+"px"),L!==null&&L.setSize(e.width,e.height),this.setViewport(0,0,E,F)},this.getDrawingBufferSize=function(E){return E.set(At*mt,Rt*mt).floor()},this.setDrawingBufferSize=function(E,F,K){At=E,Rt=F,mt=K,e.width=Math.floor(E*K),e.height=Math.floor(F*K),this.setViewport(0,0,E,F)},this.setEffects=function(E){if(M===fn){he("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let F=0;F<E.length;F++)if(E[F].isOutputPass===!0){Zt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}L.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(lt)},this.getViewport=function(E){return E.copy(Ht)},this.setViewport=function(E,F,K,V){E.isVector4?Ht.set(E.x,E.y,E.z,E.w):Ht.set(E,F,K,V),B.viewport(lt.copy(Ht).multiplyScalar(ce()).round())},this.getScissor=function(E){return E.copy(Qt)},this.setScissor=function(E,F,K,V){E.isVector4?Qt.set(E.x,E.y,E.z,E.w):Qt.set(E,F,K,V),B.scissor(Nt.copy(Qt).multiplyScalar(ce()).round())},this.getScissorTest=function(){return ie},this.setScissorTest=function(E){B.setScissorTest(ie=E)},this.setOpaqueSort=function(E){Bt=E},this.setTransparentSort=function(E){de=E},this.getClearColor=function(E){return E.copy(P.getClearColor())},this.setClearColor=function(){P.setClearColor(...arguments)},this.getClearAlpha=function(){return P.getClearAlpha()},this.setClearAlpha=function(){P.setClearAlpha(...arguments)},this.clear=function(E=!0,F=!0,K=!0){let V=0;if(E){let Y=!1;if(j!==null){const Tt=j.texture.format;Y=m.has(Tt)}if(Y){const Tt=j.texture.type,Ut=p.has(Tt),wt=P.getClearColor(),Lt=P.getClearAlpha(),kt=wt.r,$t=wt.g,re=wt.b;Ut?(S[0]=kt,S[1]=$t,S[2]=re,S[3]=Lt,O.clearBufferuiv(O.COLOR,0,S)):(w[0]=kt,w[1]=$t,w[2]=re,w[3]=Lt,O.clearBufferiv(O.COLOR,0,w))}else V|=O.COLOR_BUFFER_BIT}F&&(V|=O.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),K&&(V|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&O.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),z=E},this.dispose=function(){e.removeEventListener("webglcontextlost",Xt,!1),e.removeEventListener("webglcontextrestored",jt,!1),e.removeEventListener("webglcontextcreationerror",Ct,!1),P.dispose(),dt.dispose(),Q.dispose(),q.dispose(),it.dispose(),y.dispose(),tt.dispose(),U.dispose(),bt.dispose(),Wt.dispose(),Z.dispose(),gt.dispose(),gt.removeEventListener("sessionstart",Ul),gt.removeEventListener("sessionend",Fl),fi.stop()};function Xt(E){E.preventDefault(),ra("WebGLRenderer: Context Lost."),D=!0}function jt(){ra("WebGLRenderer: Context Restored."),D=!1;const E=ot.autoReset,F=_t.enabled,K=_t.autoUpdate,V=_t.needsUpdate,Y=_t.type;ee(),ot.autoReset=E,_t.enabled=F,_t.autoUpdate=K,_t.needsUpdate=V,_t.type=Y}function Ct(E){he("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function xe(E){const F=E.target;F.removeEventListener("dispose",xe),ze(F)}function ze(E){$n(E),it.remove(E)}function $n(E){const F=it.get(E).programs;F!==void 0&&(F.forEach(function(K){Z.releaseProgram(K)}),E.isShaderMaterial&&Z.releaseShaderCache(E))}this.renderBufferDirect=function(E,F,K,V,Y,Tt){F===null&&(F=te);const Ut=Y.isMesh&&Y.matrixWorld.determinantAffine()<0,wt=Tu(E,F,K,V,Y);B.setMaterial(V,Ut);let Lt=K.index,kt=1;if(V.wireframe===!0){if(Lt=U.getWireframeAttribute(K),Lt===void 0)return;kt=2}const $t=K.drawRange,re=K.attributes.position;let Ft=$t.start*kt,ae=($t.start+$t.count)*kt;Tt!==null&&(Ft=Math.max(Ft,Tt.start*kt),ae=Math.min(ae,(Tt.start+Tt.count)*kt)),Lt!==null?(Ft=Math.max(Ft,0),ae=Math.min(ae,Lt.count)):re!=null&&(Ft=Math.max(Ft,0),ae=Math.min(ae,re.count));const Ie=ae-Ft;if(Ie<0||Ie===1/0)return;bt.setup(Y,V,wt,K,Lt);let ye,ve=et;if(Lt!==null&&(ye=x.get(Lt),ve=Et,ve.setIndex(ye)),Y.isMesh)V.wireframe===!0?(B.setLineWidth(V.wireframeLinewidth*ce()),ve.setMode(O.LINES)):ve.setMode(O.TRIANGLES);else if(Y.isLine){let Ye=V.linewidth;Ye===void 0&&(Ye=1),B.setLineWidth(Ye*ce()),Y.isLineSegments?ve.setMode(O.LINES):Y.isLineLoop?ve.setMode(O.LINE_LOOP):ve.setMode(O.LINE_STRIP)}else Y.isPoints?ve.setMode(O.POINTS):Y.isSprite&&ve.setMode(O.TRIANGLES);if(Y.isBatchedMesh)if(G.get("WEBGL_multi_draw"))ve.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else{const Ye=Y._multiDrawStarts,Ot=Y._multiDrawCounts,Qe=Y._multiDrawCount,pe=Lt?x.get(Lt).bytesPerElement:1,di=it.get(V).currentProgram.getUniforms();for(let Ze=0;Ze<Qe;Ze++)di.setValue(O,"_gl_DrawID",Ze),ve.render(Ye[Ze]/pe,Ot[Ze])}else if(Y.isInstancedMesh)ve.renderInstances(Ft,Ie,Y.count);else if(K.isInstancedBufferGeometry){const Ye=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,Ot=Math.min(K.instanceCount,Ye);ve.renderInstances(Ft,Ie,Ot)}else ve.render(Ft,Ie)};function Nl(E,F,K,V){z!==null&&E.isNodeMaterial&&z.setObject(V,E),Mt===!0&&at.setState(E,K,!1),E.transparent===!0&&E.side===We&&E.forceSinglePass===!1?(E.side=nn,E.needsUpdate=!0,vs(E,F,V),E.side=Ei,E.needsUpdate=!0,vs(E,F,V),E.side=We):vs(E,F,V)}this.compile=function(E,F,K=null){K===null&&(K=E),z!==null&&z.renderStart(E,F,K),T=Q.get(K),T.init(F),b.push(T),K.traverseVisible(function(Y){Y.isLight&&Y.layers.test(F.layers)&&(T.pushLight(Y),Y.castShadow&&T.pushShadow(Y))}),E!==K&&E.traverseVisible(function(Y){Y.isLight&&Y.layers.test(F.layers)&&(T.pushLight(Y),Y.castShadow&&T.pushShadow(Y))}),T.setupLights(),z!==null&&z.updateLights(T.state.lightsArray),It=this.localClippingEnabled,Mt=at.init(this.clippingPlanes,It),Mt===!0&&at.setGlobalState(this.clippingPlanes,F),z!==null&&_t.render(T.state.shadowsArray,K,F);const V=new Set;return E.traverse(function(Y){if(!(Y.isMesh||Y.isPoints||Y.isLine||Y.isSprite))return;const Tt=Y.material;if(Tt)if(Array.isArray(Tt))for(let Ut=0;Ut<Tt.length;Ut++){const wt=Tt[Ut];Nl(wt,K,F,Y),V.add(wt)}else Nl(Tt,K,F,Y),V.add(Tt)}),T=b.pop(),z!==null&&z.renderEnd(),V},this.compileAsync=function(E,F,K=null){const V=this.compile(E,F,K);return new Promise(Y=>{function Tt(){if(V.forEach(function(Ut){const Lt=it.get(Ut).currentProgram;(Lt===void 0||Lt.isReady())&&V.delete(Ut)}),V.size===0){Y(E);return}setTimeout(Tt,10)}G.get("KHR_parallel_shader_compile")!==null?Tt():setTimeout(Tt,10)})};let _a=null;function Eu(E){_a&&_a(E)}function Ul(){fi.stop()}function Fl(){fi.start()}const fi=new iu;fi.setAnimationLoop(Eu),typeof self<"u"&&fi.setContext(self),this.setAnimationLoop=function(E){_a=E,gt.setAnimationLoop(E),E===null?fi.stop():fi.start()},gt.addEventListener("sessionstart",Ul),gt.addEventListener("sessionend",Fl),this.render=function(E,F){if(F!==void 0&&F.isCamera!==!0){he("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;z!==null&&z.renderStart(E,F);const K=gt.enabled===!0&&gt.isPresenting===!0,V=L!==null&&(j===null||K)&&L.begin(R,j);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),gt.enabled===!0&&gt.isPresenting===!0&&(L===null||L.isCompositing()===!1)&&(gt.cameraAutoUpdate===!0&&gt.updateCamera(F),F=gt.getCamera()),E.isScene===!0&&E.onBeforeRender(R,E,F,j),T=Q.get(E,b.length),T.init(F),T.state.textureUnits=q.getTextureUnits(),b.push(T),yt.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),F.isArrayCamera?vt.setFromArrayCamera(F):ct.setFromProjectionMatrix(yt,Tn,F.reversedDepth),It=this.localClippingEnabled,Mt=at.init(this.clippingPlanes,It),A=dt.get(E,_.length),A.init(),_.push(A),this.info.render.frame++,gt.enabled===!0&&gt.isPresenting===!0){const Ut=R.xr.getDepthSensingMesh();Ut!==null&&xa(Ut,F,-1/0,R.sortObjects)}xa(E,F,0,R.sortObjects),A.finish(),z!==null&&z.updateLights(T.state.lightsArray),R.sortObjects===!0&&A.sort(Bt,de),Vt=gt.enabled===!1||gt.isPresenting===!1||gt.hasDepthSensing()===!1,Vt&&P.addToRenderList(A,E),this.info.autoReset===!0&&this.info.reset(),Mt===!0&&at.beginShadows();const Y=T.state.shadowsArray;if(_t.render(Y,E,F),Mt===!0&&at.endShadows(),(V&&L.hasRenderPass())===!1){const Ut=A.opaque,wt=A.transmissive;if(T.setupLights(),F.isArrayCamera){const Lt=F.cameras;if(wt.length>0)for(let kt=0,$t=Lt.length;kt<$t;kt++){const re=Lt[kt];Bl(Ut,wt,E,re)}Vt&&P.render(E);for(let kt=0,$t=Lt.length;kt<$t;kt++){const re=Lt[kt];Ol(A,E,re,re.viewport)}}else wt.length>0&&Bl(Ut,wt,E,F),Vt&&P.render(E),Ol(A,E,F)}j!==null&&k===0&&(q.updateMultisampleRenderTarget(j),q.updateRenderTargetMipmap(j)),V&&L.end(R),E.isScene===!0&&E.onAfterRender(R,E,F),bt.resetDefaultState(),$=-1,nt=null,b.pop(),b.length>0?(T=b[b.length-1],q.setTextureUnits(T.state.textureUnits),Mt===!0&&at.setGlobalState(R.clippingPlanes,T.state.camera)):T=null,_.pop(),_.length>0?A=_[_.length-1]:A=null,z!==null&&z.renderEnd()};function xa(E,F,K,V){if(E.visible===!1)return;if(E.layers.test(F.layers)){if(E.isGroup)K=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(F);else if(E.isLight)T.pushLight(E),E.castShadow&&T.pushShadow(E);else if(E.isSprite){const Ut=F.isArrayCamera?vt:ct;if(!E.frustumCulled||E.intersectsFrustum(Ut)){V&&zt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(yt);const wt=tt.update(E),Lt=E.material;Lt.visible&&A.push(E,wt,Lt,K,zt.z,null,F)}}else if(E.isMesh||E.isLine||E.isPoints){const Ut=F.isArrayCamera?vt:ct;if(!E.frustumCulled||E.intersectsFrustum(Ut)){const wt=tt.update(E),Lt=E.material;if(V&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),zt.copy(E.boundingSphere.center)):(wt.boundingSphere===null&&wt.computeBoundingSphere(),zt.copy(wt.boundingSphere.center)),zt.applyMatrix4(E.matrixWorld).applyMatrix4(yt)),Array.isArray(Lt)){const kt=wt.groups;for(let $t=0,re=kt.length;$t<re;$t++){const Ft=kt[$t],ae=Lt[Ft.materialIndex];ae&&ae.visible&&A.push(E,wt,ae,K,zt.z,Ft,F)}}else Lt.visible&&A.push(E,wt,Lt,K,zt.z,null,F)}}}const Tt=E.children;for(let Ut=0,wt=Tt.length;Ut<wt;Ut++)xa(Tt[Ut],F,K,V)}function Ol(E,F,K,V){const{opaque:Y,transmissive:Tt,transparent:Ut}=E;T.setupLightsView(K),Mt===!0&&at.setGlobalState(R.clippingPlanes,K),V&&B.viewport(lt.copy(V)),Y.length>0&&ar(Y,F,K),Tt.length>0&&ar(Tt,F,K),Ut.length>0&&ar(Ut,F,K),B.buffers.depth.setTest(!0),B.buffers.depth.setMask(!0),B.buffers.color.setMask(!0),B.setPolygonOffset(!1)}function Bl(E,F,K,V){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[V.id]===void 0){const Ft=G.has("EXT_color_buffer_half_float")||G.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[V.id]=new ln(1,1,{generateMipmaps:!0,type:Ft?on:fn,minFilter:Wn,samples:Math.max(4,st.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:oe.workingColorSpace})}const Tt=T.state.transmissionRenderTarget[V.id],Ut=V.viewport||lt;Tt.setSize(Ut.z*R.transmissionResolutionScale,Ut.w*R.transmissionResolutionScale);const wt=R.getRenderTarget(),Lt=R.getActiveCubeFace(),kt=R.getActiveMipmapLevel();R.setRenderTarget(Tt),R.getClearColor(X),St=R.getClearAlpha(),St<1&&R.setClearColor(16777215,.5),R.clear(),Vt&&P.render(K);const $t=R.toneMapping;R.toneMapping=Xn;const re=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),T.setupLightsView(V),Mt===!0&&at.setGlobalState(R.clippingPlanes,V),ar(E,K,V),q.updateMultisampleRenderTarget(Tt),q.updateRenderTargetMipmap(Tt),G.has("WEBGL_multisampled_render_to_texture")===!1){let Ft=!1;for(let ae=0,Ie=F.length;ae<Ie;ae++){const ye=F[ae],{object:ve,geometry:Ye,material:Ot,group:Qe}=ye;if(Ot.side===We&&ve.layers.test(V.layers)){const pe=Ot.side;Ot.side=nn,Ot.needsUpdate=!0,zl(ve,K,V,Ye,Ot,Qe),Ot.side=pe,Ot.needsUpdate=!0,Ft=!0}}Ft===!0&&(q.updateMultisampleRenderTarget(Tt),q.updateRenderTargetMipmap(Tt))}R.setRenderTarget(wt,Lt,kt),R.setClearColor(X,St),re!==void 0&&(V.viewport=re),R.toneMapping=$t}function ar(E,F,K){const V=F.isScene===!0?F.overrideMaterial:null;for(let Y=0,Tt=E.length;Y<Tt;Y++){const Ut=E[Y],{object:wt,geometry:Lt,group:kt}=Ut;let $t=Ut.material;$t.allowOverride===!0&&V!==null&&($t=V),wt.layers.test(K.layers)&&zl(wt,F,K,Lt,$t,kt)}}function zl(E,F,K,V,Y,Tt){z!==null&&Y.isNodeMaterial&&z.setObject(E,Y),E.onBeforeRender(R,F,K,V,Y,Tt),E.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),Y.onBeforeRender(R,F,K,V,E,Tt),Y.transparent===!0&&Y.side===We&&Y.forceSinglePass===!1?(Y.side=nn,Y.needsUpdate=!0,R.renderBufferDirect(K,F,V,Y,E,Tt),Y.side=Ei,Y.needsUpdate=!0,R.renderBufferDirect(K,F,V,Y,E,Tt),Y.side=We):R.renderBufferDirect(K,F,V,Y,E,Tt),E.onAfterRender(R,F,K,V,Y,Tt)}function kl(E){let F=0;for(const K of E)K.texture!==null&&F++;return F}function vs(E,F,K){F.isScene!==!0&&(F=te);const V=it.get(E),Y=T.state.lights,Tt=T.state.shadowsArray,Ut=Y.state.version,wt=Z.getParameters(E,Y.state,Tt,F,K,T.state.lightProbeGridArray),Lt=Z.getProgramCacheKey(wt);let kt=V.programs;V.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?F.environment:null,V.fog=F.fog;const $t=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;V.envMap=y.get(E.envMap||V.environment,$t),V.envMapRotation=V.environment!==null&&E.envMap===null?F.environmentRotation:E.envMapRotation,kt===void 0&&(E.addEventListener("dispose",xe),kt=new Map,V.programs=kt,V.programVariants=new Map);let re=kt.get(Lt);if(re!==void 0){if(V.currentProgram===re&&V.lightsStateVersion===Ut)return Hl(E,wt),re}else wt.uniforms=Z.getUniforms(E),z!==null&&E.isNodeMaterial&&z.build(E,K,wt),E.onBeforeCompile(wt,R),re=Z.acquireProgram(wt,Lt),kt.set(Lt,re),V.uniforms=wt.uniforms;const Ft=V.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ft.clippingPlanes=at.uniform),Hl(E,wt),V.needsLights=Ru(E),V.lightsStateVersion=Ut,V.needsLights&&(Ft.ambientLightColor.value=Y.state.ambient,Ft.lightProbe.value=Y.state.probe,Ft.sunLights.value=Y.state.sun,Ft.sunLightShadows.value=Y.state.sunShadow,Ft.directionalLights.value=Y.state.directional,Ft.directionalLightShadows.value=Y.state.directionalShadow,Ft.spotLights.value=Y.state.spot,Ft.spotLightShadows.value=Y.state.spotShadow,Ft.rectAreaLights.value=Y.state.rectArea,Ft.ltc_1.value=Y.state.rectAreaLTC1,Ft.ltc_2.value=Y.state.rectAreaLTC2,Ft.pointLights.value=Y.state.point,Ft.pointLightShadows.value=Y.state.pointShadow,Ft.hemisphereLights.value=Y.state.hemi,Ft.sunShadowMatrix.value=Y.state.sunShadowMatrix,Ft.sunShadowCascade.value=Y.state.sunShadowCascade,Ft.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,Ft.spotLightMatrix.value=Y.state.spotLightMatrix,Ft.spotLightMap.value=Y.state.spotLightMap,Ft.pointShadowMatrix.value=Y.state.pointShadowMatrix),V.numLightProbeGrids=kl(T.state.lightProbeGridArray),V.currentProgram=re,V.uniformsList=null,re}function wu(E,F,K,V,Y){const Tt=it.get(E),Ut=Tt.currentProgram.id+","+V+","+Y;let wt=Tt.programVariants.get(Ut);return wt===void 0?(wt=vs(E,F,K),Tt.programVariants.set(Ut,wt)):(Tt.currentProgram=wt,Tt.uniformsList=null,Tt.outputColorSpace=V,Tt.toneMapping=Y),wt}function Gl(E){if(E.uniformsList===null){const F=E.currentProgram.getUniforms();E.uniformsList=Qr.seqWithValue(F.seq,E.uniforms)}return E.uniformsList}function Hl(E,F){const K=it.get(E);K.outputColorSpace=F.outputColorSpace,K.batching=F.batching,K.batchingColor=F.batchingColor,K.instancing=F.instancing,K.instancingColor=F.instancingColor,K.instancingMorph=F.instancingMorph,K.skinning=F.skinning,K.morphTargets=F.morphTargets,K.morphNormals=F.morphNormals,K.morphColors=F.morphColors,K.morphTargetsCount=F.morphTargetsCount,K.numClippingPlanes=F.numClippingPlanes,K.numIntersection=F.numClipIntersection,K.vertexAlphas=F.vertexAlphas,K.vertexTangents=F.vertexTangents,K.toneMapping=F.toneMapping}function Tu(E,F,K,V,Y){F.isScene!==!0&&(F=te),q.resetTextureUnits();const Tt=F.fog,Ut=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?F.environment:null,wt=j===null?R.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:oe.workingColorSpace,Lt=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,kt=y.get(V.envMap||Ut,Lt),$t=V.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,re=!!K.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Ft=!!K.morphAttributes.position,ae=!!K.morphAttributes.normal,Ie=!!K.morphAttributes.color;let ye=Xn;V.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(ye=R.toneMapping);const ve=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,Ye=ve!==void 0?ve.length:0,Ot=it.get(V),Qe=T.state.lights;if(Mt===!0&&(It===!0||E!==nt)){const Te=E===nt&&V.id===$;at.setState(V,E,Te)}let pe=!1,di=!1;V.version===Ot.__version?Ot.needsLights&&Ot.lightsStateVersion!==Qe.state.version||Y.isBatchedMesh&&Ot.batching===!1||!Y.isBatchedMesh&&Ot.batching===!0||Y.isBatchedMesh&&Ot.batchingColor===!0&&Y._colorsTexture===null||Y.isBatchedMesh&&Ot.batchingColor===!1&&Y._colorsTexture!==null||Y.isInstancedMesh&&Ot.instancing===!1||!Y.isInstancedMesh&&Ot.instancing===!0||Y.isSkinnedMesh&&Ot.skinning===!1||!Y.isSkinnedMesh&&Ot.skinning===!0||Y.isInstancedMesh&&Ot.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&Ot.instancingColor===!1&&Y.instanceColor!==null||Y.isInstancedMesh&&Ot.instancingMorph===!0&&Y.morphTexture===null||Y.isInstancedMesh&&Ot.instancingMorph===!1&&Y.morphTexture!==null||Ot.envMap!==kt||V.fog===!0&&Ot.fog!==Tt||Ot.numClippingPlanes!==void 0&&(Ot.numClippingPlanes!==at.numPlanes||Ot.numIntersection!==at.numIntersection)||Ot.vertexAlphas!==$t||Ot.vertexTangents!==re||Ot.morphTargets!==Ft||Ot.morphNormals!==ae||Ot.morphColors!==Ie||Ot.morphTargetsCount!==Ye||Ot.numLightProbeGrids!==kl(T.state.lightProbeGridArray)?pe=!0:(Ot.outputColorSpace!==wt||Ot.toneMapping!==ye)&&(di=!0):(pe=!0,Ot.__version=V.version);let Ze=Ot.currentProgram;(pe===!0||di===!0)&&(Ze=di===!0?wu(V,F,Y,wt,ye):vs(V,F,Y),z&&V.isNodeMaterial&&z.onUpdateProgram(V,Ze,Ot));let or=!1,Qn=!1,pi=!1;const ue=Ze.getUniforms(),Ve=Ot.uniforms;if(B.useProgram(Ze.program)&&(or=!0,Qn=!0,pi=!0),V.id!==$&&($=V.id,Qn=!0),or||nt!==E){B.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),ue.setValue(O,"projectionMatrix",E.projectionMatrix),ue.setValue(O,"viewMatrix",E.matrixWorldInverse);const ke=ue.map.cameraPosition;ke!==void 0&&ke.setValue(O,Kt.setFromMatrixPosition(E.matrixWorld)),st.logarithmicDepthBuffer&&ue.setValue(O,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&ue.setValue(O,"isOrthographic",E.isOrthographicCamera===!0),nt!==E&&(nt=E,Qn=!0,pi=!0)}if(Ot.needsLights&&(Qe.state.sunShadowMap.length>0&&ue.setValue(O,"sunShadowMap",Qe.state.sunShadowMap,q),Qe.state.directionalShadowMap.length>0&&ue.setValue(O,"directionalShadowMap",Qe.state.directionalShadowMap,q),Qe.state.spotShadowMap.length>0&&ue.setValue(O,"spotShadowMap",Qe.state.spotShadowMap,q),Qe.state.pointShadowMap.length>0&&ue.setValue(O,"pointShadowMap",Qe.state.pointShadowMap,q)),Y.isSkinnedMesh){ue.setOptional(O,Y,"bindMatrix"),ue.setOptional(O,Y,"bindMatrixInverse");const Te=Y.skeleton;Te&&(Te.boneTexture===null&&Te.computeBoneTexture(),ue.setValue(O,"boneTexture",Te.boneTexture,q))}Y.isBatchedMesh&&(ue.setOptional(O,Y,"batchingTexture"),ue.setValue(O,"batchingTexture",Y._matricesTexture,q),ue.setOptional(O,Y,"batchingIdTexture"),ue.setValue(O,"batchingIdTexture",Y._indirectTexture,q),ue.setOptional(O,Y,"batchingColorTexture"),Y._colorsTexture!==null&&ue.setValue(O,"batchingColorTexture",Y._colorsTexture,q));const vn=K.morphAttributes;if((vn.position!==void 0||vn.normal!==void 0||vn.color!==void 0)&&rt.update(Y,K,Ze),(Qn||Ot.receiveShadow!==Y.receiveShadow)&&(Ot.receiveShadow=Y.receiveShadow,ue.setValue(O,"receiveShadow",Y.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&F.environment!==null&&(Ve.envMapIntensity.value=F.environmentIntensity),Ve.dfgLUT!==void 0&&(Ve.dfgLUT.value=D_()),Qn){if(ue.setValue(O,"toneMappingExposure",R.toneMappingExposure),Ot.needsLights&&Au(Ve,pi),Tt&&V.fog===!0&&ut.refreshFogUniforms(Ve,Tt),ut.refreshMaterialUniforms(Ve,V,mt,Rt,T.state.transmissionRenderTarget[E.id]),Ot.needsLights&&Ot.numLightProbeGrids>0){const Te=v;let ke=0;for(const Fn of T.state.lightProbeGridArray)Fn.texture!==null&&(Te.textures[ke]=Fn.texture,Te.min[ke]=Fn.boundingBox.min,Te.max[ke]=Fn.boundingBox.max,Te.resolution[ke]=Fn.resolution,ke++);for(const Fn in Te)Te[Fn].length=ke;Ve.probesSH.value=Te.textures,Ve.probesMin.value=Te.min,Ve.probesMax.value=Te.max,Ve.probesResolution.value=Te.resolution}Qr.upload(O,Gl(Ot),Ve,q)}if(V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Qr.upload(O,Gl(Ot),Ve,q),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&ue.setValue(O,"center",Y.center),ue.setValue(O,"modelViewMatrix",Y.modelViewMatrix),ue.setValue(O,"normalMatrix",Y.normalMatrix),ue.setValue(O,"modelMatrix",Y.matrixWorld),V.uniformsGroups!==void 0){const Te=V.uniformsGroups;for(let ke=0,Fn=Te.length;ke<Fn;ke++){const Wl=Te[ke];Wt.update(Wl,Ze),Wt.bind(Wl,Ze)}}return Ze}function Au(E,F){E.ambientLightColor.needsUpdate=F,E.lightProbe.needsUpdate=F,E.sunLights.needsUpdate=F,E.sunLightShadows.needsUpdate=F,E.directionalLights.needsUpdate=F,E.directionalLightShadows.needsUpdate=F,E.pointLights.needsUpdate=F,E.pointLightShadows.needsUpdate=F,E.spotLights.needsUpdate=F,E.spotLightShadows.needsUpdate=F,E.rectAreaLights.needsUpdate=F,E.hemisphereLights.needsUpdate=F}function Ru(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return J},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(E,F,K){const V=it.get(E);V.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),it.get(E.texture).__webglTexture=F,it.get(E.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:K,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,F){const K=it.get(E);K.__webglFramebuffer=F,K.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(E,F=0,K=0){j=E,J=F,k=K;let V=null,Y=!1,Tt=!1;if(E){const wt=it.get(E);if(wt.__useDefaultFramebuffer!==void 0){B.bindFramebuffer(O.FRAMEBUFFER,wt.__webglFramebuffer),lt.copy(E.viewport),Nt.copy(E.scissor),pt=E.scissorTest,B.viewport(lt),B.scissor(Nt),B.setScissorTest(pt),$=-1;return}else if(wt.__webglFramebuffer===void 0)q.setupRenderTarget(E);else if(wt.__hasExternalTextures)q.rebindTextures(E,it.get(E.texture).__webglTexture,it.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const $t=E.depthTexture;if(wt.__boundDepthTexture!==$t){if($t!==null&&it.has($t)&&(E.width!==$t.image.width||E.height!==$t.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");q.setupDepthRenderbuffer(E)}}const Lt=E.texture;(Lt.isData3DTexture||Lt.isDataArrayTexture||Lt.isCompressedArrayTexture)&&(Tt=!0);const kt=it.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(kt[F])?V=kt[F][K]:V=kt[F],Y=!0):E.samples>0&&q.useMultisampledRTT(E)===!1?V=it.get(E).__webglMultisampledFramebuffer:Array.isArray(kt)?V=kt[K]:V=kt,lt.copy(E.viewport),Nt.copy(E.scissor),pt=E.scissorTest}else lt.copy(Ht).multiplyScalar(mt).floor(),Nt.copy(Qt).multiplyScalar(mt).floor(),pt=ie;if(K!==0&&(V=W),B.bindFramebuffer(O.FRAMEBUFFER,V)&&B.drawBuffers(E,V),B.viewport(lt),B.scissor(Nt),B.setScissorTest(pt),Y){const wt=it.get(E.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+F,wt.__webglTexture,K)}else if(Tt){const wt=F;for(let Lt=0;Lt<E.textures.length;Lt++){const kt=it.get(E.textures[Lt]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+Lt,kt.__webglTexture,K,wt)}}else if(E!==null&&K!==0){const wt=it.get(E.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,wt.__webglTexture,K)}$=-1};function Vl(E){const F=it.get(E);return(F.__readFormat!==E.format||F.__readType!==E.type)&&(F.__readFormat=E.format,F.__readType=E.type,F.__formatReadable=st.textureFormatReadable(E.format),F.__typeReadable=st.textureTypeReadable(E.type)),F}this.readRenderTargetPixels=function(E,F,K,V,Y,Tt,Ut,wt=0){if(!(E&&E.isWebGLRenderTarget)){he("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Lt=it.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ut!==void 0&&(Lt=Lt[Ut],Array.isArray(Lt)&&(Lt=Lt[0])),Lt){B.bindFramebuffer(O.FRAMEBUFFER,Lt);try{const kt=E.textures[wt],$t=kt.format,re=kt.type;E.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+wt);const Ft=Vl(kt);if(Ft.__formatReadable===!1){he("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ft.__typeReadable===!1){he("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=E.width-V&&K>=0&&K<=E.height-Y&&O.readPixels(F,K,V,Y,xt.convert($t),xt.convert(re),Tt)}finally{const kt=j!==null?it.get(j).__webglFramebuffer:null;B.bindFramebuffer(O.FRAMEBUFFER,kt)}}},this.readRenderTargetPixelsAsync=async function(E,F,K,V,Y,Tt,Ut,wt=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Lt=it.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ut!==void 0&&(Lt=Lt[Ut],Array.isArray(Lt)&&(Lt=Lt[0])),Lt)if(F>=0&&F<=E.width-V&&K>=0&&K<=E.height-Y){B.bindFramebuffer(O.FRAMEBUFFER,Lt);const kt=E.textures[wt],$t=kt.format,re=kt.type;E.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+wt);const Ft=Vl(kt);if(Ft.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ft.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ae=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,ae),O.bufferData(O.PIXEL_PACK_BUFFER,Tt.byteLength,O.STREAM_READ),O.readPixels(F,K,V,Y,xt.convert($t),xt.convert(re),0),O.bindBuffer(O.PIXEL_PACK_BUFFER,null);const Ie=j!==null?it.get(j).__webglFramebuffer:null;B.bindFramebuffer(O.FRAMEBUFFER,Ie);const ye=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await hf(O,ye,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,ae),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,Tt),O.bindBuffer(O.PIXEL_PACK_BUFFER,null),O.deleteBuffer(ae),O.deleteSync(ye),Tt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,F=null,K=0){const V=Math.pow(2,-K),Y=Math.floor(E.image.width*V),Tt=Math.floor(E.image.height*V),Ut=F!==null?F.x:0,wt=F!==null?F.y:0;q.setTexture2D(E,0),O.copyTexSubImage2D(O.TEXTURE_2D,K,0,0,Ut,wt,Y,Tt),B.unbindTexture()},this.copyTextureToTexture=function(E,F,K=null,V=null,Y=0,Tt=0){let Ut,wt,Lt,kt,$t,re,Ft,ae,Ie;const ye=E.isCompressedTexture?E.mipmaps[Tt]:E.image;if(K!==null)Ut=K.max.x-K.min.x,wt=K.max.y-K.min.y,Lt=K.isBox3?K.max.z-K.min.z:1,kt=K.min.x,$t=K.min.y,re=K.isBox3?K.min.z:0;else{const ue=Math.pow(2,-Y);Ut=Math.floor(ye.width*ue),wt=Math.floor(ye.height*ue),E.isDataArrayTexture?Lt=ye.depth:E.isData3DTexture?Lt=Math.floor(ye.depth*ue):Lt=1,kt=0,$t=0,re=0}V!==null?(Ft=V.x,ae=V.y,Ie=V.z):(Ft=0,ae=0,Ie=0);const ve=xt.convert(F.format),Ye=xt.convert(F.type);let Ot;F.isData3DTexture?(q.setTexture3D(F,0),Ot=O.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(q.setTexture2DArray(F,0),Ot=O.TEXTURE_2D_ARRAY):(q.setTexture2D(F,0),Ot=O.TEXTURE_2D),B.activeTexture(O.TEXTURE0),B.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,F.flipY),B.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),B.pixelStorei(O.UNPACK_ALIGNMENT,F.unpackAlignment);const Qe=B.getParameter(O.UNPACK_ROW_LENGTH),pe=B.getParameter(O.UNPACK_IMAGE_HEIGHT),di=B.getParameter(O.UNPACK_SKIP_PIXELS),Ze=B.getParameter(O.UNPACK_SKIP_ROWS),or=B.getParameter(O.UNPACK_SKIP_IMAGES);B.pixelStorei(O.UNPACK_ROW_LENGTH,ye.width),B.pixelStorei(O.UNPACK_IMAGE_HEIGHT,ye.height),B.pixelStorei(O.UNPACK_SKIP_PIXELS,kt),B.pixelStorei(O.UNPACK_SKIP_ROWS,$t),B.pixelStorei(O.UNPACK_SKIP_IMAGES,re);const Qn=E.isDataArrayTexture||E.isData3DTexture,pi=F.isDataArrayTexture||F.isData3DTexture;if(E.isDepthTexture){const ue=it.get(E),Ve=it.get(F),vn=it.get(ue.__renderTarget),Te=it.get(Ve.__renderTarget);B.bindFramebuffer(O.READ_FRAMEBUFFER,vn.__webglFramebuffer),B.bindFramebuffer(O.DRAW_FRAMEBUFFER,Te.__webglFramebuffer);for(let ke=0;ke<Lt;ke++)Qn&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,it.get(E).__webglTexture,Y,re+ke),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,it.get(F).__webglTexture,Tt,Ie+ke)),O.blitFramebuffer(kt,$t,kt+Ut,$t+wt,Ft,ae,Ft+Ut,ae+wt,O.DEPTH_BUFFER_BIT,O.NEAREST);B.bindFramebuffer(O.READ_FRAMEBUFFER,null),B.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(Y!==0||E.isRenderTargetTexture||it.has(E)){const ue=it.get(E),Ve=it.get(F);B.bindFramebuffer(O.READ_FRAMEBUFFER,N),B.bindFramebuffer(O.DRAW_FRAMEBUFFER,H);for(let vn=0;vn<Lt;vn++)Qn?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,ue.__webglTexture,Y,re+vn):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,ue.__webglTexture,Y),pi?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ve.__webglTexture,Tt,Ie+vn):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Ve.__webglTexture,Tt),Y!==0?O.blitFramebuffer(kt,$t,kt+Ut,$t+wt,Ft,ae,Ft+Ut,ae+wt,O.COLOR_BUFFER_BIT,O.NEAREST):pi?O.copyTexSubImage3D(Ot,Tt,Ft,ae,Ie+vn,kt,$t,Ut,wt):O.copyTexSubImage2D(Ot,Tt,Ft,ae,kt,$t,Ut,wt);B.bindFramebuffer(O.READ_FRAMEBUFFER,null),B.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else pi?E.isDataTexture||E.isData3DTexture?O.texSubImage3D(Ot,Tt,Ft,ae,Ie,Ut,wt,Lt,ve,Ye,ye.data):F.isCompressedArrayTexture?O.compressedTexSubImage3D(Ot,Tt,Ft,ae,Ie,Ut,wt,Lt,ve,ye.data):O.texSubImage3D(Ot,Tt,Ft,ae,Ie,Ut,wt,Lt,ve,Ye,ye):E.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,Tt,Ft,ae,Ut,wt,ve,Ye,ye.data):E.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,Tt,Ft,ae,ye.width,ye.height,ve,ye.data):O.texSubImage2D(O.TEXTURE_2D,Tt,Ft,ae,Ut,wt,ve,Ye,ye);B.pixelStorei(O.UNPACK_ROW_LENGTH,Qe),B.pixelStorei(O.UNPACK_IMAGE_HEIGHT,pe),B.pixelStorei(O.UNPACK_SKIP_PIXELS,di),B.pixelStorei(O.UNPACK_SKIP_ROWS,Ze),B.pixelStorei(O.UNPACK_SKIP_IMAGES,or),Tt===0&&F.generateMipmaps===!0&&F.mipmapsAutoUpdate===!0&&O.generateMipmap(Ot),B.unbindTexture()},this.initRenderTarget=function(E){it.get(E).__webglFramebuffer===void 0&&q.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?q.setTextureCube(E,0):E.isData3DTexture?q.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?q.setTexture2DArray(E,0):q.setTexture2D(E,0),B.unbindTexture()},this.resetState=function(){J=0,k=0,j=null,B.reset(),bt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Tn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=oe._getDrawingBufferColorSpace(t),e.unpackColorSpace=oe._getUnpackColorSpace()}}const jr={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class ms{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const N_=new bl(-1,1,1,-1,0,1);class U_ extends Ee{constructor(){super(),this.setAttribute("position",new le([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new le([0,2,0,0,2,0],2))}}const F_=new U_;class wl{constructor(t){this._mesh=new Dt(F_,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,N_)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class pu extends ms{constructor(t,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,t instanceof an?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=er.clone(t.uniforms),this.material=new an({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new wl(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class ah extends ms{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){const s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class O_ extends ms{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class B_{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const n=t.getSize(new ft);this._width=n.width,this._height=n.height,e=new ln(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:on}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new pu(jr),this.copyPass.material.blending=Si,this.timer=new Bd}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){this.timer.update(),t===void 0&&(t=this.timer.getDelta());const e=this.renderer.getRenderTarget();let n=!1;for(let s=0,r=this.passes.length;s<r;s++){const a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),a.needsSwap){if(n){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}ah!==void 0&&(a instanceof ah?n=!0:a instanceof O_&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new ft);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class z_ extends ms{constructor(t,e,n=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new qt}render(t,e,n){const s=t.autoClear;t.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),t.autoClear=s}}const k_={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new qt(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class us extends ms{constructor(t,e=1,n,s){super(),this.strength=e,this.radius=n,this.threshold=s,this.resolution=t!==void 0?new ft(t.x,t.y):new ft(256,256),this.clearColor=new qt(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new ln(r,a,{type:on,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const u=new ln(r,a,{type:on,depthBuffer:!1});u.texture.name="UnrealBloomPass.h"+h,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const f=new ln(r,a,{type:on,depthBuffer:!1});f.texture.name="UnrealBloomPass.v"+h,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),a=Math.round(a/2)}const o=k_;this.highPassUniforms=er.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new an({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[6,10,14,18,22];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new ft(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=er.clone(jr.uniforms),this.blendMaterial=new an({uniforms:this.copyUniforms,vertexShader:jr.vertexShader,fragmentShader:jr.fragmentShader,premultipliedAlpha:!0,blending:en,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new qt,this._oldClearAlpha=1,this._basic=new rn,this._fsQuad=new wl(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new ft(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(t,e,n,s,r){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();const a=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=us.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=us.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this._fsQuad.render(t),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(n),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=a}_getSeparableBlurMaterial(t){const e=[],n=t/3;for(let a=0;a<t;a++)e.push(.39894*Math.exp(-.5*a*a/(n*n))/n);const s=[],r=[];for(let a=1;a<t;a+=2){const o=e[a],l=a+1<t?e[a+1]:0,c=o+l;s.push((a*o+(a+1)*l)/c),r.push(c)}return new an({defines:{KERNEL_PAIRS:s.length},uniforms:{colorTexture:{value:null},invSize:{value:new ft(.5,.5)},direction:{value:new ft(.5,.5)},centerWeight:{value:e[0]},gaussianOffsets:{value:s},gaussianWeights:{value:r}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(t){return new an({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}us.BlurDirectionX=new ft(1,0);us.BlurDirectionY=new ft(0,1);const kr={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class G_ extends ms{constructor(){super(),this.isOutputPass=!0,this.uniforms=er.clone(kr.uniforms),this.material=new jh({name:kr.name,uniforms:this.uniforms,vertexShader:kr.vertexShader,fragmentShader:kr.fragmentShader}),this._fsQuad=new wl(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},oe.getTransfer(this._outputColorSpace)===_e&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Ko?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Jo?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===$o?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===fa?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===jo?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===tl?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Qo&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const Yn=new Map;function Jn(i){const t=document.createElement("canvas");return t.width=t.height=i,t}function Di(i){let t=i>>>0;return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}function Os(i,t,e){const n=Math.sin(i*127.1+t*311.7+e*74.7)*43758.5453;return n-Math.floor(n)}function oh(i){return i*i*(3-2*i)}function H_(i,t,e){const n=Math.floor(i),s=Math.floor(t),r=oh(i-n),a=oh(t-s),o=Os(n,s,e),l=Os(n+1,s,e),c=Os(n,s+1,e),h=Os(n+1,s+1,e);return(o+(l-o)*r)*(1-a)+(c+(h-c)*r)*a}function Zn(i,t,e,n=4,s=.5){let r=0,a=.5,o=1;for(let l=0;l<n;l++)r+=a*H_(i*o,t*o,e+l*17),o*=2.03,a*=s;return r}function V_(i,t=2.2){const e=i.width,n=Jn(e),s=n.getContext("2d"),a=i.getContext("2d").getImageData(0,0,e,e).data,o=s.createImageData(e,e),l=(c,h)=>(c=(c+e)%e,h=(h+e)%e,a[(h*e+c)*4]/255);for(let c=0;c<e;c++)for(let h=0;h<e;h++){const u=(l(h+1,c)-l(h-1,c))*t,f=(l(h,c+1)-l(h,c-1))*t,d=-u,g=-f,M=1,m=Math.hypot(d,g,M),p=(c*e+h)*4;o.data[p]=(d/m*.5+.5)*255,o.data[p+1]=(g/m*.5+.5)*255,o.data[p+2]=(M/m*.5+.5)*255,o.data[p+3]=255}return s.putImageData(o,0,0),n}function Ws(i,{srgb:t=!0,repeat:e=1,aniso:n=8}={}){const s=new zh(i);return s.wrapS=s.wrapT=wi,s.repeat.set(e,e),s.anisotropy=n,t&&(s.colorSpace=He),s.needsUpdate=!0,s}function W_(i=11){const e=Jn(256),n=e.getContext("2d"),s=Di(i),r=n.createImageData(256,256);for(let a=0;a<256;a++)for(let o=0;o<256;o++){const l=Zn(o/21,a/21,i,3),c=Math.sin(o*.055+Zn(o/30,a/30,i+3)*5.5)*.045,h=(s()-.5)*.16,u=.55+l*.28+c+h,f=(a*256+o)*4;r.data[f]=Math.min(255,180*u+38),r.data[f+1]=Math.min(255,142*u+28),r.data[f+2]=Math.min(255,98*u+18),r.data[f+3]=255}n.putImageData(r,0,0);for(let a=0;a<180;a++){const o=s()*256,l=s()*256,c=.6+s()*2.6;n.fillStyle=s()>.55?"rgba(60,44,30,0.30)":"rgba(220,190,145,0.28)",n.beginPath(),n.ellipse(o,l,c,c*(.6+s()*.6),s()*6,0,Math.PI*2),n.fill()}n.lineWidth=.8;for(let a=0;a<16;a++){let o=s()*256,l=s()*256;n.strokeStyle=`rgba(58,40,26,${.1+s()*.18})`,n.beginPath(),n.moveTo(o,l);for(let c=0;c<30;c++)o+=(s()-.5)*16,l+=(s()-.5)*16,n.lineTo(o,l);n.stroke()}return e}function X_(i=5,t="#8b8374"){const n=Jn(256),s=n.getContext("2d"),r=Di(i),a=new qt(t),o=s.createImageData(256,256);for(let l=0;l<256;l++)for(let c=0;c<256;c++){const h=Zn(c/28,l/28,i,3),u=(r()-.5)*.11,f=Math.sin(c*.02+Zn(c/90,l/24,i+7)*7)*.02,d=.74+h*.24+u+f,g=(l*256+c)*4;o.data[g]=a.r*255*d,o.data[g+1]=a.g*255*d,o.data[g+2]=a.b*255*d,o.data[g+3]=255}s.putImageData(o,0,0),s.strokeStyle="rgba(40,36,30,0.18)",s.lineWidth=1.4;for(let l=64;l<256;l+=128)s.beginPath(),s.moveTo(0,l),s.lineTo(256,l),s.stroke();for(let l=0;l<28;l++){const c=r()*256,h=r()*256,u=8+r()*55,f=s.createRadialGradient(c,h,0,c,h,u);f.addColorStop(0,`rgba(38,34,27,${.04+r()*.12})`),f.addColorStop(1,"rgba(38,34,27,0)"),s.fillStyle=f,s.fillRect(c-u,h-u,u*2,u*2)}for(let l=0;l<11;l++){let c=r()*256,h=r()*256;s.strokeStyle=`rgba(30,27,22,${.22+r()*.25})`,s.lineWidth=.7+r(),s.beginPath(),s.moveTo(c,h);for(let u=0;u<24;u++)c+=(r()-.5)*22,h+=(r()-.45)*18,s.lineTo(c,h);s.stroke()}return n}function q_(i=21,t="#4c5546"){const n=Jn(256),s=n.getContext("2d"),r=Di(i),a=new qt(t),o=s.createImageData(256,256);for(let l=0;l<256;l++)for(let c=0;c<256;c++){const h=Math.sin(c*Math.PI*2/32),u=Zn(c/30,l/30,i,3),f=r()>.997?-.25:0,d=.82+h*.075+(u-.5)*.18+f,g=(l*256+c)*4;o.data[g]=a.r*255*d,o.data[g+1]=a.g*255*d,o.data[g+2]=a.b*255*d,o.data[g+3]=255}s.putImageData(o,0,0);for(let l=0;l<26;l++){const c=r()*256,h=r()*256*.75,u=20+r()*150,f=s.createLinearGradient(0,h,0,h+u);f.addColorStop(0,`rgba(96,52,24,${.16+r()*.28})`),f.addColorStop(1,"rgba(96,52,24,0)"),s.fillStyle=f,s.fillRect(c,h,2+r()*7,u)}for(let l=0;l<70;l++)s.fillStyle=`rgba(120,112,96,${.1+r()*.25})`,s.fillRect(r()*256,r()*256,1+r()*4,1+r()*2);return n}function Y_(i=31,t="#5d6062"){const n=Jn(256),s=n.getContext("2d"),r=Di(i),a=new qt(t),o=s.createImageData(256,256);for(let l=0;l<256;l++)for(let c=0;c<256;c++){const h=(Os(0,l,i)-.5)*.09+(r()-.5)*.06,u=Zn(c/40,l/20,i,3),f=.8+h+(u-.5)*.22,d=(l*256+c)*4;o.data[d]=a.r*255*f,o.data[d+1]=a.g*255*f,o.data[d+2]=a.b*255*f,o.data[d+3]=255}s.putImageData(o,0,0);for(let l=0;l<55;l++){s.strokeStyle=`rgba(210,205,195,${.05+r()*.16})`,s.lineWidth=.5+r();const c=r()*256,h=r()*256;s.beginPath(),s.moveTo(h,c),s.lineTo(h+10+r()*60,c+(r()-.5)*2),s.stroke()}for(let l=0;l<14;l++){const c=r()*256,h=r()*256,u=4+r()*26,f=s.createRadialGradient(c,h,0,c,h,u);f.addColorStop(0,`rgba(92,48,20,${.12+r()*.22})`),f.addColorStop(1,"rgba(92,48,20,0)"),s.fillStyle=f,s.fillRect(c-u,h-u,u*2,u*2)}return n}function Z_(i=41){const e=Jn(256),n=e.getContext("2d"),s=Di(i),r=n.createImageData(256,256);for(let a=0;a<256;a++)for(let o=0;o<256;o++){const l=Math.sin((o+Zn(o/60,a/12,i)*55)*.09)*.09,h=.58+Zn(o/15,a/45,i,3)*.34+l,u=(a*256+o)*4;r.data[u]=112*h+32,r.data[u+1]=78*h+20,r.data[u+2]=46*h+12,r.data[u+3]=255}n.putImageData(r,0,0),n.strokeStyle="rgba(30,18,10,0.45)",n.lineWidth=2;for(let a=0;a<256;a+=128)n.beginPath(),n.moveTo(0,a),n.lineTo(256,a),n.stroke();for(let a=0;a<12;a++)n.fillStyle="rgba(25,15,8,0.35)",n.beginPath(),n.ellipse(s()*256,s()*256,3+s()*6,1+s()*3,0,0,6),n.fill();return e}function K_(i=51,t="#9a8567"){const n=Jn(256),s=n.getContext("2d"),r=new qt(t),a=Di(i),o=s.createImageData(256,256);for(let l=0;l<256;l++)for(let c=0;c<256;c++){const h=Zn(c/14,l/14,i,3),u=a()>.94?.13:0,f=.72+h*.3+u,d=(l*256+c)*4;o.data[d]=r.r*255*f,o.data[d+1]=r.g*255*f,o.data[d+2]=r.b*255*f,o.data[d+3]=255}s.putImageData(o,0,0),s.strokeStyle="rgba(55,45,32,0.38)",s.lineWidth=2;for(let l=0;l<256;l+=128)s.beginPath(),s.moveTo(0,l),s.lineTo(256,l),s.stroke();for(let l=0;l<256;l+=128)s.beginPath(),s.moveTo(l,0),s.lineTo(l,256),s.stroke();s.strokeStyle="rgba(40,36,30,0.15)",s.lineWidth=1;for(let l=-256;l<256;l+=26)s.beginPath(),s.moveTo(l,0),s.lineTo(l+256,256),s.stroke(),s.beginPath(),s.moveTo(l,256),s.lineTo(l+256,0),s.stroke();return n}function qo(i="stain",t=61){const e=`decal:${i}:${t}`;if(Yn.has(e))return Yn.get(e);const n=256,s=Jn(n),r=s.getContext("2d"),a=Di(t);if(r.clearRect(0,0,n,n),i==="stain")for(let l=0;l<8;l++){const c=n/2+(a()-.5)*70,h=n/2+(a()-.5)*70,u=30+a()*55,f=r.createRadialGradient(c,h,0,c,h,u);f.addColorStop(0,"rgba(22,18,14,0.55)"),f.addColorStop(.65,"rgba(28,23,18,0.22)"),f.addColorStop(1,"rgba(28,23,18,0)"),r.fillStyle=f,r.fillRect(0,0,n,n)}else if(i==="crack")for(let l=0;l<5;l++){let c=a()*n,h=a()*n;r.strokeStyle=`rgba(15,12,9,${.5+a()*.4})`,r.lineWidth=1+a()*2,r.beginPath(),r.moveTo(c,h);for(let u=0;u<40;u++)c+=(a()-.5)*20,h+=(a()-.5)*20,r.lineTo(c,h);r.stroke()}else if(i==="scorch"){const l=r.createRadialGradient(n/2,n/2,5,n/2,n/2,n/2);l.addColorStop(0,"rgba(8,7,6,0.85)"),l.addColorStop(.55,"rgba(14,12,10,0.45)"),l.addColorStop(1,"rgba(20,18,15,0)"),r.fillStyle=l,r.fillRect(0,0,n,n)}const o=Ws(s,{srgb:!0,repeat:1});return o.wrapS=o.wrapT=En,Yn.set(e,o),o}function gs(i,t,e,n){if(Yn.has(i))return Yn.get(i);const s={map:Ws(t,{srgb:!0}),normalMap:Ws(V_(t,e),{srgb:!1}),roughnessMap:Ws(t,{srgb:!1})};return Yn.set(i,s),s}function J_(){return gs("sand",W_(),1.4)}function lh(i="#8b8374",t=5){return gs(`concrete:${i}:${t}`,X_(t,i),2)}function $_(i="#4c5546",t=21){return gs(`container:${i}:${t}`,q_(t,i),3.4)}function Q_(i="#5d6062",t=31){return gs(`metal:${i}:${t}`,Y_(t,i),.7)}function j_(){return gs("wood",Z_(),1.2)}function tx(i="#9a8567",t=51){return gs(`hesco:${i}:${t}`,K_(t,i),2.6)}function vi(i,t,e=t){const n={};for(const[s,r]of Object.entries(i)){const a=r.clone();a.wrapS=a.wrapT=wi,a.repeat.set(t,e),a.needsUpdate=!0,n[s]=a}return n}function Yo(){if(Yn.has("puff"))return Yn.get("puff");const i=128,t=Jn(i),e=t.getContext("2d"),n=e.createRadialGradient(i/2,i/2,2,i/2,i/2,i/2);n.addColorStop(0,"rgba(255,255,255,0.9)"),n.addColorStop(.45,"rgba(255,255,255,0.35)"),n.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=n,e.fillRect(0,0,i,i);const s=Ws(t,{srgb:!0});return s.wrapS=s.wrapT=En,Yn.set("puff",s),s}const mu=new C(-.62,.16,-.77).normalize(),fe=(i,t,e)=>new C(i,t,e);function ex(i,t){const e=[],n=[],s=[],r=[],a=ix(1337);i.fog=new dl(10189405,.0105),i.background=new qt(8219480);const o=nx();i.add(o.mesh);try{const G=new nr(t),st=document.createElement("canvas");st.width=256,st.height=128;const B=st.getContext("2d"),ot=B.createLinearGradient(0,0,0,128);ot.addColorStop(0,"#243a56"),ot.addColorStop(.42,"#b47b50"),ot.addColorStop(.52,"#e2a169"),ot.addColorStop(.56,"#7a6045"),ot.addColorStop(1,"#3a2c1f"),B.fillStyle=ot,B.fillRect(0,0,256,128);const it=B.createRadialGradient(196,66,0,196,66,34);it.addColorStop(0,"rgba(255,226,176,1)"),it.addColorStop(.22,"rgba(255,178,100,0.85)"),it.addColorStop(1,"rgba(255,150,80,0)"),B.fillStyle=it,B.fillRect(150,20,100,92);const q=new zh(st);q.mapping=qr,q.colorSpace=He,i.environment=G.fromEquirectangular(q).texture,i.environmentIntensity=.55,G.dispose(),q.dispose()}catch(G){console.warn("Environment map skipped",G)}const l=new Nc(16756855,3.1);l.position.copy(mu).multiplyScalar(95),l.castShadow=!0,l.shadow.mapSize.set(1024,1024),l.shadow.camera.near=10,l.shadow.camera.far=190,l.shadow.camera.left=-58,l.shadow.camera.right=58,l.shadow.camera.top=58,l.shadow.camera.bottom=-58,l.shadow.bias=-35e-5,l.shadow.normalBias=.035,i.add(l),i.add(l.target);const c=new Nd(10271195,5980715,.95);i.add(c);const h=new Nc(7903172,.5);h.position.set(38,24,46),i.add(h);const u=vi(J_(),30,30),f=new Gt({map:u.map,normalMap:u.normalMap,roughnessMap:u.roughnessMap,color:14268813,roughness:.97,metalness:0,normalScale:new ft(1.1,1.1)}),d=new Dt(new un(190,190,1,1),f);d.rotation.x=-Math.PI/2,d.receiveShadow=!0,d.userData.solid=!0,i.add(d),n.push(d);const g=vi(lh("#8d8373",5),3,2),M=new Gt({map:g.map,normalMap:g.normalMap,roughnessMap:g.roughnessMap,color:12760220,roughness:.92,metalness:.02}),m=vi(lh("#6f675b",9),3,2),p=new Gt({map:m.map,normalMap:m.normalMap,roughnessMap:m.roughnessMap,color:11049864,roughness:.94,metalness:.02}),S=vi(Q_("#565a5c",31),2,2),w=new Gt({map:S.map,normalMap:S.normalMap,roughnessMap:S.roughnessMap,color:9145742,roughness:.55,metalness:.78}),v=new Gt({color:2369322,roughness:.5,metalness:.7}),A=new Gt({color:7027490,roughness:.92,metalness:.2}),T=vi(j_(),2,2),_=new Gt({map:T.map,normalMap:T.normalMap,roughnessMap:T.roughnessMap,color:11569758,roughness:.88,metalness:.02}),b=vi(tx("#9d8769",51),2,1),L=new Gt({map:b.map,normalMap:b.normalMap,roughnessMap:b.roughnessMap,color:12626054,roughness:.96,metalness:0}),R=new Gt({color:9271640,roughness:.98,metalness:0}),D=new Gt({color:659734,roughness:.12,metalness:.65,emissive:662564,emissiveIntensity:.7}),z=new Gt({color:1182469,emissive:16752714,emissiveIntensity:3.2,roughness:.4}),W=new Gt({color:1311491,emissive:16722456,emissiveIntensity:2.4,roughness:.4}),N=new Gt({color:2761756,emissive:16742942,emissiveIntensity:.35,roughness:.8}),H=new Gt({color:1513498,roughness:.7,metalness:.3});function J(G,st=!0){return G.castShadow=!0,G.receiveShadow=!0,st&&(G.userData.solid=!0,n.push(G)),i.add(G),G}function k(G,st,B,ot,it=3){e.push({minX:G-B/2,maxX:G+B/2,minZ:st-ot/2,maxZ:st+ot/2,height:it})}function j(G,st,B,ot,it,q,y,x={}){const U=new Dt(new Yt(G,st,B),ot);if(U.position.set(it,q,y),x.rotY&&(U.rotation.y=x.rotY),x.rotX&&(U.rotation.x=x.rotX),x.rotZ&&(U.rotation.z=x.rotZ),J(U,x.solid!==!1),x.collider!==!1){const tt=Math.abs(Math.cos(x.rotY||0)),Z=Math.abs(Math.sin(x.rotY||0));k(it,y,G*tt+B*Z,B*tt+G*Z,q+st/2)}return U}function $(G,st,B,ot,it,q=.7,y=0){const x=qo(G,it),U=new Dt(new un(ot,ot),new rn({map:x,transparent:!0,opacity:q,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2}));return U.rotation.x=-Math.PI/2,U.rotation.z=y,U.position.set(st,.012,B),U.receiveShadow=!1,i.add(U),U}for(let G=0;G<46;G++){const st=(a()-.5)*72,B=(a()-.5)*72;Math.abs(st)<11&&Math.abs(B)<9||$(a()>.55?"stain":"crack",st,B,3+a()*7,100+G,.25+a()*.35,a()*6)}for(const G of[-.9,.9]){const B=new ko([fe(-34,0,24+G),fe(-16,0,18+G),fe(-4,0,6+G),fe(4,0,-4+G),fe(20,0,-12+G),fe(34,0,-16+G)]).getPoints(80);for(let ot=0;ot<B.length-1;ot+=2){const it=B[ot],q=new Dt(new un(.55,1.1),new rn({color:3878692,transparent:!0,opacity:.24,depthWrite:!1}));q.rotation.x=-Math.PI/2,q.position.set(it.x,.014,it.z),q.rotation.z=Math.atan2(B[ot+1].x-it.x,B[ot+1].z-it.z),i.add(q)}}const nt=38;for(let G=-nt;G<=nt;G+=5.2)for(const st of[-1,1]){if(Math.abs(G)>nt-2)continue;const B=(a()-.5)*.18;j(5.05,2.55,1.35,L,G,1.275,st*nt,{rotY:B,collider:!1}),k(G,st*nt,5.05,1.35,2.55)}for(let G=-nt+2.6;G<=nt-2.6;G+=5.2)for(const st of[-1,1])j(1.35,2.55,5.05,L,st*nt,1.275,G,{rotY:(a()-.5)*.18,collider:!1}),k(st*nt,G,1.35,5.05,2.55);const lt=new Oh({color:2236444,transparent:!0,opacity:.75});for(const G of[-1,1])for(const st of["x","z"]){const B=[];for(let it=-nt;it<=nt;it+=1.1){const q=Math.sin((it+nt)*.75)*.06;st==="x"?B.push(fe(it,2.62+q,G*nt)):B.push(fe(G*nt,2.62+q,it))}const ot=new Ee().setFromPoints(B);i.add(new $f(ot,lt))}Nt();function Nt(){j(22,.35,17,p,0,.175,-1,{collider:!1,solid:!1}),j(8.4,3.8,.55,M,-6.2,1.9,7.5,{collider:!1}),j(8.4,3.8,.55,M,6.2,1.9,7.5,{collider:!1}),j(4.4,1,.55,M,0,3.3,7.5,{collider:!1}),k(-6.2,7.5,8.4,.55,3.8),k(6.2,7.5,8.4,.55,3.8),j(.55,3.8,17,M,-11,1.9,-1,{collider:!1}),j(.55,3.8,17,M,11,1.9,-1,{collider:!1}),j(22.55,3.8,.55,M,0,1.9,-9.5,{collider:!1}),k(-11,-1,.55,17,3.8),k(11,-1,.55,17,3.8),k(0,-9.5,22.55,.55,3.8),j(22.6,.55,17.6,M,0,4.05,-1,{collider:!1,solid:!1});for(const[x,U,tt,Z]of[[0,8.2,22.6,.5],[0,-10.2,22.6,.5],[-11.2,-1,.5,17.6],[11.2,-1,.5,17.6]])j(tt,.85,Z,p,x,4.75,U,{collider:!1,solid:!1});for(const x of[-5.4,5.4])for(const U of[-4.4,3.2])j(.55,3.5,.55,M,x,1.75,U,{collider:!0});for(const x of[-7.2,-3.2,3.2,7.2])j(1.7,1.15,.08,D,x,2.5,7.8,{collider:!1,solid:!1}),j(1.95,.16,.3,p,x,1.88,7.78,{collider:!1,solid:!1});for(const x of[-7.2,-3.2,3.2,7.2])j(1.5,.85,.08,D,x,3.55,7.8,{collider:!1,solid:!1});for(const x of[-6.2,-1,4.2])j(.08,.95,1.5,D,-11.28,2.45,x,{collider:!1,solid:!1}),j(.08,.95,1.5,D,11.28,2.45,x,{collider:!1,solid:!1});j(.25,3.1,.75,v,-2.15,1.55,7.5,{collider:!1,solid:!1}),j(.25,3.1,.75,v,2.15,1.55,7.5,{collider:!1,solid:!1}),j(4.55,.22,.75,v,0,3.1,7.5,{collider:!1,solid:!1});const B=new ai(16753242,22,16,2);B.position.set(0,2.7,6.4),i.add(B);const ot=new ai(16761466,30,20,2);ot.position.set(0,3.1,0),i.add(ot);const it=new Dt(new Yt(2.4,.08,.5),z);it.position.set(0,3.62,2.5),i.add(it),Rt(-4.5,12.5,7,.15),Rt(5.2,11.8,5,-.1),j(3.2,1.5,2.4,w,5.5,5.05,-4.5,{collider:!1}),j(1.2,.9,1,v,-6.5,4.8,-6,{collider:!1}),j(.6,2.4,.6,w,-8.6,5.8,2.5,{collider:!1,solid:!1});const q=new Dt(new An(.9,16,8,0,Math.PI*2,0,Math.PI/2.4),w);q.rotation.x=Math.PI*.42,q.rotation.z=.4,q.position.set(-8.6,6.5,2.5),J(q,!1),Rt(3.5,6.9,4,0,4.5),Rt(-4.8,6.8,3,0,4.5),j(.08,5.5,.08,w,8.2,7,-7.4,{collider:!1,solid:!1});const y=new Dt(new An(.1,8,8),W);y.position.set(8.2,9.8,-7.4),i.add(y),j(2.4,.9,1.1,_,-4,.62,-2,{collider:!0});for(let x=0;x<3;x++)j(.62,.42,.08,new Gt({color:593168,emissive:3112862,emissiveIntensity:1.4}),-4.9+x*.9,1.15,-2,{collider:!1,solid:!1,rotX:-.1});j(1.1,.65,1.1,v,4.5,.5,2,{collider:!0}),j(1,.08,.75,v,4.5,.86,2,{collider:!1,solid:!1}),j(.5,1.25,.45,A,7.8,.8,-4,{collider:!0}),j(1.8,.9,.8,_,7.2,.62,-6.2,{collider:!0,rotY:.3}),pt([fe(-10.6,3.4,6.8),fe(-3,3.1,3),fe(3,3.35,-1),fe(10.6,3.2,-6)],.035),pt([fe(-10.6,3.1,-6),fe(0,3.35,-3.5),fe(10.6,3,-7.5)],.03)}function pt(G,st=.04){const B=new ko(G),ot=new Sl(B,24,st,5,!1),it=new Dt(ot,H);return it.castShadow=!1,i.add(it),it}function X(G,st,B,ot,it,q={}){const y=vi($_(ot,it),2.2,1.4),x=new Gt({map:y.map,normalMap:y.normalMap,roughnessMap:y.roughnessMap,color:16777215,roughness:.72,metalness:.45}),U=6.2,tt=2.6,Z=2.5,ut=new be;ut.position.set(G,q.y||tt/2,st),ut.rotation.y=B,i.add(ut);const dt=new Dt(new Yt(U,tt,Z),x);dt.castShadow=dt.receiveShadow=!0,dt.userData.solid=!0,ut.add(dt),n.push(dt);for(const P of[-1,1])for(const rt of[-1,1]){const et=new Dt(new Yt(.34,tt,.34),v);et.position.set(P*(U/2-.1),0,rt*(Z/2-.1)),et.castShadow=!0,ut.add(et)}for(const P of[-1,1]){const rt=new Dt(new Yt(U,.12,.12),v);rt.position.set(0,tt/2-.04,P*Z/2),ut.add(rt)}const Q=new Dt(new Yt(.08,tt*.82,Z*.86),x);Q.position.set(U/2+.02,-.05,0),ut.add(Q);for(const P of[-.3,.3]){const rt=new Dt(new Ue(.045,.045,tt*.7,6),w);rt.position.set(U/2+.09,-.05,P),ut.add(rt)}for(let P=0;P<3;P++){const rt=new Dt(new un(1+a()*1.4,.8+a()*1.2),new rn({map:qo("scorch",70+P),transparent:!0,opacity:.35,depthWrite:!1}));rt.rotation.x=-Math.PI/2,rt.position.set((a()-.5)*4.5,tt/2+.011,(a()-.5)*1.6),ut.add(rt)}const at=Math.abs(Math.cos(B)),_t=Math.abs(Math.sin(B));return k(G,st,U*at+Z*_t,Z*at+U*_t,(q.y||tt/2)+tt/2),ut}X(-19,12,.08,"#4d5547",21),X(-19,8.9,.08,"#5c4636",22,{y:2.6+1.3}),X(19,10,-.12,"#4a4f53",23),X(19.6,6.6,.22,"#5f5a44",24),X(-21,-14,.5,"#57503d",25),X(20,-16,-.35,"#3f4c4f",26),X(-22,-20,1.2,"#5a4438",27),X(24,-4,.02,"#465044",28,{y:4});function St(G,st){const B=w;for(const y of[-1.6,1.6])for(const x of[-1.6,1.6])j(.28,5.6,.28,B,G+y,2.8,st+x,{collider:!1}),k(G+y,st+x,.4,.4,5.6);j(4.4,.3,4.4,p,G,5.75,st,{collider:!1,solid:!1});for(const[y,x,U,tt]of[[0,2.1,4.4,.12],[0,-2.1,4.4,.12],[-2.1,0,.12,4.4],[2.1,0,.12,4.4]])j(U,1.05,tt,v,G+y,6.45,st+x,{collider:!1,solid:!1});j(5,.18,5,A,G,8.1,st,{collider:!1,solid:!1});for(const y of[-2.2,2.2])for(const x of[-2.2,2.2])j(.16,2.2,.16,w,G+y,7,st+x,{collider:!1,solid:!1});for(let y=0;y<12;y++)j(.7,.06,.06,w,G-2.25,.5+y*.45,st,{collider:!1,solid:!1});j(.06,5.4,.06,w,G-2.55,2.8,st-.35,{collider:!1,solid:!1}),j(.06,5.4,.06,w,G-2.55,2.8,st+.35,{collider:!1,solid:!1});const ot=new Dt(new Ue(.32,.38,.5,12),v);ot.rotation.z=Math.PI/2,ot.position.set(G+.5,6.9,st),J(ot,!1);const it=new Dt(new ss(.3,16),z);it.rotation.y=-Math.PI/2,it.position.set(G+.78,6.9,st),i.add(it);const q=new ai(16756838,18,24,2);q.position.set(G+.9,6.9,st),i.add(q),Rt(G,st+1.5,3,0,6.05)}St(25.5,-24.5);function At(G,st){const B=new Dt(new Ue(.12,.22,14,8),w);B.position.set(G,7,st),J(B,!0),k(G,st,.7,.7,14);for(let q=0;q<5;q++){const y=new Dt(new Yt(1.6-q*.15,.06,.06),w);y.position.set(G,3.2+q*2.1,st),i.add(y)}const ot=new Dt(new An(1.5,18,10,0,Math.PI*2,0,Math.PI/3.2),w);ot.position.set(G+.8,9.2,st),ot.rotation.set(.2,0,Math.PI*.7),J(ot,!1);const it=new Dt(new An(.13,8,8),W);it.position.set(G,14.1,st),i.add(it),s.push({type:"blink",mesh:it,phase:0})}At(-27,-27);function Rt(G,st,B,ot=0,it=0){const q=new Vn(.19,.42,3,7);q.rotateZ(Math.PI/2);const y=new Fh(q,R,B*4+8);y.castShadow=y.receiveShadow=!0,y.frustumCulled=!1;const x=new Pe;let U=0;const tt=3;for(let dt=0;dt<tt;dt++){const Q=B-dt;for(let at=0;at<Q;at++)x.position.set((at-(Q-1)/2)*.62+dt%2*.14+(a()-.5)*.05,it+.19+dt*.33,(a()-.5)*.1),x.rotation.set((a()-.5)*.08,ot+(a()-.5)*.16,(a()-.5)*.1),x.scale.set(1,.88+a()*.2,.9),x.updateMatrix(),y.setMatrixAt(U++,x.matrix)}y.count=U,y.instanceMatrix.needsUpdate=!0,y.position.set(G,0,st),i.add(y);const Z=Math.abs(Math.cos(ot)),ut=Math.abs(Math.sin(ot));return k(G,st,B*.62*Z+.7*ut,.7*Z+B*.62*ut,it+1.1),y}Rt(-24,22,6,.35),Rt(23,20,6,-.3),Rt(-30,2,5,Math.PI/2),Rt(30,-2,5,Math.PI/2),Rt(-13,-20,5,.2),Rt(13,-22,5,-.2),Rt(2,20,7,.02);function mt(G,st,B=0){const ot=new be;ot.position.set(G,0,st),ot.rotation.y=B;const it=new Dt(new Yt(3.2,.35,1),p);it.position.y=.175;const q=new Dt(new Yt(3.2,.55,.62),M);q.position.y=.62;const y=new Dt(new Yt(3.2,.42,.42),M);y.position.y=1.05;const x=new Dt(new un(1.4,.26),N);x.position.set(0,.62,.315);for(const Z of[it,q,y])Z.castShadow=Z.receiveShadow=!0,Z.userData.solid=!0,ot.add(Z),n.push(Z);ot.add(x),i.add(ot);const U=Math.abs(Math.cos(B)),tt=Math.abs(Math.sin(B));k(G,st,3.2*U+1*tt,1*U+3.2*tt,1.25)}mt(-8,18,.1),mt(9,17,-.08),mt(-17,1,Math.PI/2),mt(16,-8,Math.PI/2+.1),mt(-5,-16,.2),mt(8,-19,-.15);function Bt(G,st,B=1.15,ot=0,it=0){const q=new be;q.position.set(G,it+B/2,st),q.rotation.y=ot;const y=new Dt(new Yt(B,B,B),_);y.castShadow=y.receiveShadow=!0,y.userData.solid=!0,q.add(y),n.push(y);for(const U of[-.34,.34]){const tt=new Dt(new Yt(B*1.02,.09,B*1.02),v);tt.position.y=U*B,q.add(tt)}const x=new Dt(new un(B*.55,B*.22),new rn({color:13222054,transparent:!0,opacity:.55}));return x.position.set(0,0,B/2+.006),q.add(x),i.add(q),k(G,st,B*1.1,B*1.1,it+B),q}const de=[[-13,8,1.3,.2],[-11.4,8.4,.95,-.3],[-13.1,9.4,.9,.6],[14,13,1.2,-.2],[15.2,12.6,.8,.4],[13.2,12,.7,.1],[-7,-13,1.2,.1],[-5.7,-13.4,.85,-.4],[8.5,22,1.1,.3],[-11,22,1.25,-.2],[21,1.5,.95,.5],[-26,-8,1.2,.2],[27,8,1.1,-.3],[-2,-20,1.15,.1]];for(const[G,st,B,ot]of de)Bt(G,st,B,ot);function Ht(G,st,B=4020806,ot=!1){const it=new be;it.position.set(G,0,st);const q=new Gt({color:B,roughness:.55,metalness:.65}),y=new Dt(new Ue(.36,.36,1,14),q);y.position.y=.5,y.castShadow=y.receiveShadow=!0,y.userData.solid=!0,it.add(y),n.push(y);for(const U of[.22,.78]){const tt=new Dt(new ds(.365,.035,6,18),v);tt.rotation.x=Math.PI/2,tt.position.y=U,it.add(tt)}const x=new Dt(new Ue(.35,.35,.04,14),w);return x.position.y=1.01,it.add(x),i.add(it),k(G,st,.85,.85,1.05),ot&&Mt(G,st),it}Ht(-12.5,15.5,8010532,!0),Ht(17.5,4.5,4020806),Ht(18.2,3.7,5397570),Ht(-23,18,4865838),Ht(26,-10,4020806),Ht(-17.5,-7.5,7027490),Ht(3.5,13.5,4869971);function Qt(G,st,B){const ot=new be;ot.position.set(G,0,st),ot.rotation.y=B;const it=new Gt({color:4999994,roughness:.78,metalness:.3}),q=new Dt(new Yt(2.1,.45,4.5),v);q.position.y=.62;const y=new Dt(new Yt(1.95,.72,2.3),it);y.position.set(0,1.05,-.4);const x=new Dt(new Yt(1.85,.55,1.35),it);x.position.set(0,1,1.55);const U=new Dt(new Yt(1.8,.62,1),it);U.position.set(0,1.58,.65);const tt=new Dt(new Yt(1.65,.42,.06),D);tt.position.set(0,1.62,1.14),tt.rotation.x=-.25;const Z=new Dt(new Yt(1.95,.16,1.6),v);Z.position.set(0,1.32,-1.3);const ut=new Dt(new Ue(.16,.2,.5,8),v);ut.position.set(0,1.65,-1.1);const dt=new Dt(new Yt(.12,.12,1.1),v);dt.position.set(0,1.95,-.7);for(const Q of[q,y,x,U,Z,ut,dt])Q.castShadow=Q.receiveShadow=!0,ot.add(Q),Q!==Z&&(Q.userData.solid=!0,n.push(Q));ot.add(tt);for(const Q of[-1,1])for(const at of[-1.5,1.5]){const _t=new Dt(new Ue(.42,.42,.28,14),new Gt({color:1184274,roughness:.95}));_t.rotation.z=Math.PI/2,_t.position.set(Q*1.02,.42,at),_t.castShadow=!0,ot.add(_t)}i.add(ot),k(G,st,2.6,5.2,1.7)}Qt(-14,13,.4);const ie=new Gt({color:7232840,roughness:1});for(let G=0;G<42;G++){const st=.12+a()*.45,B=new Dt(new _l(st,0),ie);B.position.set((a()-.5)*72,st*.6,(a()-.5)*72),B.rotation.set(a()*3,a()*3,a()*3),B.scale.y=.55+a()*.5,B.castShadow=B.receiveShadow=!0,i.add(B)}for(let G=0;G<30;G++){const st=new Dt(new un(.18+a()*.2,.12+a()*.18),new Gt({color:11576714,roughness:1,side:We}));st.rotation.x=-Math.PI/2,st.rotation.z=a()*6,st.position.set((a()-.5)*60,.015,(a()-.5)*60),i.add(st)}function ct(G,st,B=7,ot=16762762,it=!0){const q=new Dt(new Ue(.08,.11,B,8),v);q.position.set(G,B/2,st),q.castShadow=!0,i.add(q),k(G,st,.3,.3,B);const y=new Dt(new Yt(1.4,.08,.08),v);y.position.set(G+.6,B-.1,st),i.add(y);const x=new Dt(new Yt(.6,.12,.3),z);if(x.position.set(G+1.2,B-.2,st),i.add(x),!it)return null;const U=new ai(ot,26,20,2);return U.position.set(G+1.2,B-.4,st),i.add(U),U}const vt=[];vt.push({light:ct(-14,20,7.5),base:26,phase:0}),ct(14,-10,8,16762762,!1),ct(-20,-12,6.5,16762762,!1);function Mt(G,st){const B=new be;B.position.set(G,.95,st),i.add(B);const ot=[],it=Yo();for(let U=0;U<9;U++){const tt=new yi({map:it,color:U<4?16765562:16742948,transparent:!0,blending:en,depthWrite:!1,opacity:.8}),Z=new bi(tt);Z.scale.setScalar(.4+a()*.5),B.add(Z),ot.push({sprite:Z,phase:a()*Math.PI*2,speed:.6+a()*.8,ox:(a()-.5)*.2,oz:(a()-.5)*.2})}const q=[];for(let U=0;U<8;U++){const tt=new yi({map:it,color:3813674,transparent:!0,depthWrite:!1,opacity:.22}),Z=new bi(tt);Z.scale.setScalar(1+a()*1.2),B.add(Z),q.push({sprite:Z,phase:a()*6,speed:.3+a()*.3,ox:(a()-.5)*.5})}const y=new ai(16742954,26,16,2);y.position.set(G,1.4,st),i.add(y);const x=new ca(new Ee().setAttribute("position",new sn(new Float32Array(90),3)),new $s({color:16752704,size:.05,transparent:!0,opacity:.8,blending:en,depthWrite:!1}));x.position.set(G,1,st),i.add(x),s.push({type:"fire",group:B,flames:ot,smoke:q,light:y,embers:x,phase:0})}for(const[G,st,B]of[[-70,-80,18],[72,-64,12]])for(let ot=0;ot<B;ot++){const it=new yi({map:Yo(),color:5917244,transparent:!0,depthWrite:!1,opacity:.16}),q=new bi(it);q.position.set(G+(a()-.5)*22,10+ot*3+a()*6,st+(a()-.5)*16),q.scale.setScalar(12+a()*16),i.add(q)}const It=700,yt=new Float32Array(It*3);for(let G=0;G<It;G++)yt[G*3]=(a()-.5)*80,yt[G*3+1]=a()*9,yt[G*3+2]=(a()-.5)*80;const Kt=new Ee;Kt.setAttribute("position",new sn(yt,3));const zt=new ca(Kt,new $s({color:16767400,size:.035,transparent:!0,opacity:.38,depthWrite:!1,blending:en,sizeAttenuation:!0}));i.add(zt);function te(G,st,B,ot){const it=new Dt(new Ue(.05,.05,5,6),w);it.position.set(G,2.5,st),it.castShadow=!0,i.add(it);const q=new Dt(new un(1.5,2.2,10,8),new Gt({color:ot,roughness:.9,side:We}));q.position.set(G+.75*Math.cos(B),3.7,st-.75*Math.sin(B)),q.rotation.y=B,q.castShadow=!0,i.add(q),s.push({type:"flag",cloth:q,base:q.geometry.attributes.position.array.slice(),phase:a()*6})}te(-3,-10.5,0,8007202),te(8,8.6,.2,3095857),r.push(fe(-30,0,-30),fe(0,0,-32),fe(30,0,-30),fe(32,0,-8),fe(-32,0,6),fe(28,0,22),fe(-28,0,22),fe(-34,0,-12),fe(33,0,8),fe(10,0,-31),fe(-12,0,-31),fe(15,0,1),fe(-15,0,3),fe(0,0,-18),fe(-9,0,-13),fe(10,0,-13),fe(-17,0,16),fe(17,0,15));let Vt=0;function ce(G,st){Vt+=G,o.material.uniforms.uTime.value=Vt;const B=Kt.attributes.position.array;for(let ot=0;ot<It;ot++)B[ot*3]+=G*(.18+ot%5*.02),B[ot*3+1]+=Math.sin(Vt*.4+ot)*G*.03,st&&Math.abs(B[ot*3]-st.x)>42&&(B[ot*3]=st.x-42*Math.sign(B[ot*3]-st.x)),B[ot*3+1]>9&&(B[ot*3+1]=.2);Kt.attributes.position.needsUpdate=!0;for(const ot of s)if(ot.type==="fire"){for(const q of ot.flames){const y=(Vt*q.speed+q.phase)%1;q.sprite.position.set(q.ox+Math.sin(Vt*2+q.phase)*.06,y*1.1,q.oz+Math.cos(Vt*1.7+q.phase)*.06),q.sprite.scale.setScalar(.28+(1-y)*.5+Math.sin(Vt*9+q.phase)*.05),q.sprite.material.opacity=.75*(1-y)*(.7+.3*Math.sin(Vt*12+q.phase))}for(const q of ot.smoke){const y=(Vt*q.speed+q.phase)%1;q.sprite.position.set(q.ox+y*.9+Math.sin(Vt+q.phase)*.2,.8+y*5.5,q.ox+Math.cos(Vt*.7+q.phase)*.2),q.sprite.scale.setScalar(1+y*3.4),q.sprite.material.opacity=.24*(1-y)*Math.min(1,y*4)}const it=ot.embers.geometry.attributes.position.array;for(let q=0;q<it.length/3;q++){const y=(Vt*(.4+q%7*.08)+q*.13)%1;it[q*3]=Math.sin(q*2.4+Vt)*.5*(1-y),it[q*3+1]=y*3.2,it[q*3+2]=Math.cos(q*1.9+Vt*.8)*.5*(1-y)}ot.embers.geometry.attributes.position.needsUpdate=!0,ot.light.intensity=22+Math.sin(Vt*13)*5+Math.sin(Vt*7.3)*4}else if(ot.type==="blink")ot.mesh.material.emissiveIntensity=1.2+(Math.sin(Vt*3+ot.phase)>.3?2.8:0);else if(ot.type==="flag"){const it=ot.cloth.geometry.attributes.position;for(let q=0;q<it.count;q++){const y=ot.base[q*3],x=ot.base[q*3+1];it.setZ(q,Math.sin(Vt*2.2+y*2.6+x*.8+ot.phase)*.12*(.5+y+.75))}it.needsUpdate=!0,ot.cloth.geometry.computeVertexNormals()}for(const ot of vt)ot.light.intensity=ot.base*(.82+.12*Math.sin(Vt*11+ot.phase)+.06*Math.sin(Vt*27+ot.phase*2))}function O(G,st){for(const B of e){const ot=Math.max(B.minX,Math.min(G.x,B.maxX)),it=Math.max(B.minZ,Math.min(G.z,B.maxZ));let q=G.x-ot,y=G.z-it;const x=q*q+y*y;if(!(x>st*st))if(x>1e-8){const U=Math.sqrt(x),tt=(st-U)/U;G.x+=q*tt,G.z+=y*tt}else{const U=G.x-B.minX,tt=B.maxX-G.x,Z=G.z-B.minZ,ut=B.maxZ-G.z,dt=Math.min(U,tt,Z,ut);dt===U?G.x=B.minX-st:dt===tt?G.x=B.maxX+st:dt===Z?G.z=B.minZ-st:G.z=B.maxZ+st}}return G.x=Math.max(-nt+1.5,Math.min(nt-1.5,G.x)),G.z=Math.max(-nt+1.5,Math.min(nt-1.5,G.z)),G}function Le(){return 0}return{colliders:e,raycastMeshes:n,spawnPoints:r,sun:l,sky:o,update:ce,collide:O,groundHeight:Le,bounds:nt}}function nx(){const i={uSunDir:{value:mu.clone()},uTime:{value:0},uZenith:{value:new qt(1518150)},uHorizon:{value:new qt(14257493)},uHaze:{value:new qt(15839347)},uSunColor:{value:new qt(16765601)}},t=new an({uniforms:i,side:nn,depthWrite:!1,fog:!1,vertexShader:`
      varying vec3 vWorld;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorld = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,fragmentShader:`
      precision highp float;
      uniform vec3 uSunDir, uZenith, uHorizon, uHaze, uSunColor;
      uniform float uTime;
      varying vec3 vWorld;

      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }
      float noise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i), b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }
      float fbm(vec2 p) {
        float v = 0.0, a = 0.5;
        for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.02 + 11.7; a *= 0.5; }
        return v;
      }

      void main() {
        vec3 dir = normalize(vWorld - cameraPosition);
        float h = clamp(dir.y, 0.0, 1.0);
        vec3 col = mix(uHorizon, uZenith, pow(h, 0.58));

        float sunDot = max(dot(dir, uSunDir), 0.0);
        // atmospheric glow around the sun
        col += uSunColor * pow(sunDot, 6.0) * 0.34;
        col += uSunColor * pow(sunDot, 42.0) * 0.8;
        // sun disc
        col += uSunColor * smoothstep(0.99955, 0.99985, sunDot) * 3.6;

        // warm horizon haze
        float haze = exp(-max(dir.y, 0.0) * 7.0);
        col = mix(col, uHaze, haze * 0.46);

        // high cirrus clouds, lit from below by the setting sun
        if (dir.y > 0.015) {
          vec2 uv = dir.xz / (dir.y + 0.16) * 0.5;
          uv += vec2(uTime * 0.0016, uTime * 0.0007);
          float cloud = fbm(uv * 2.6 + vec2(3.1, 1.7));
          cloud = smoothstep(0.52, 0.78, cloud);
          float wisp = fbm(uv * 7.0 + 8.0) * 0.35;
          cloud *= smoothstep(0.0, 0.18, dir.y) * (0.65 + wisp);
          vec3 cloudCol = mix(vec3(0.24, 0.20, 0.23), vec3(1.05, 0.62, 0.38), pow(sunDot, 2.5));
          col = mix(col, cloudCol, cloud * 0.58);
        }

        // horizon dust band
        col = mix(col, vec3(0.55, 0.38, 0.26), smoothstep(0.02, -0.05, dir.y) * 0.5);

        // filmic-ish dithering to avoid banding
        float d = hash(gl_FragCoord.xy) / 255.0;
        gl_FragColor = vec4(col + d, 1.0);
      }
    `}),e=new Dt(new An(450,48,32),t);return e.frustumCulled=!1,{mesh:e,material:t}}function ix(i){return function(){i|=0,i=i+1831565813|0;let t=Math.imul(i^i>>>15,1|i);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}const ht={gunmetal:new Gt({color:3356477,metalness:.86,roughness:.34}),gunmetalDark:new Gt({color:1645342,metalness:.9,roughness:.3}),steel:new Gt({color:4869975,metalness:.94,roughness:.26}),black:new Gt({color:921361,metalness:.5,roughness:.62}),rubber:new Gt({color:1184533,metalness:.08,roughness:.94}),tan:new Gt({color:11110240,metalness:.08,roughness:.68}),tanDark:new Gt({color:8414023,metalness:.08,roughness:.76}),tanFlat:new Gt({color:10387032,metalness:.1,roughness:.72,flatShading:!0}),glove:new Gt({color:3027512,metalness:.05,roughness:.82}),gloveDark:new Gt({color:1711136,metalness:.05,roughness:.88}),sleeve:new Gt({color:8218443,metalness:.02,roughness:.92}),sleeveDark:new Gt({color:6114103,metalness:.02,roughness:.96}),brass:new Gt({color:13014588,metalness:.95,roughness:.28}),lens:new rn({color:9357528,transparent:!0,opacity:.1,side:We,depthWrite:!1,toneMapped:!1}),reticle:new rn({color:16722454,transparent:!0,opacity:.95,blending:en,depthTest:!1,depthWrite:!1,side:We,toneMapped:!1}),reticleRing:new rn({color:16726813,transparent:!0,opacity:.42,blending:en,depthTest:!1,depthWrite:!1,side:We,toneMapped:!1}),flashCore:new rn({color:16774095,transparent:!0,opacity:.95,blending:en,depthWrite:!1,depthTest:!1,side:We,toneMapped:!1}),flashWarm:new rn({color:16751671,transparent:!0,opacity:.78,blending:en,depthWrite:!1,depthTest:!1,side:We,toneMapped:!1}),flashEdge:new rn({color:16734738,transparent:!0,opacity:.42,blending:en,depthWrite:!1,depthTest:!1,side:We,toneMapped:!1})},sx=new C(0,1,0);function rx(i,t,e){const n=Math.min(e,i*.45,t*.45),s=-i*.5,r=-t*.5,a=new Yh;return a.moveTo(s+n,r),a.lineTo(s+i-n,r),a.quadraticCurveTo(s+i,r,s+i,r+n),a.lineTo(s+i,r+t-n),a.quadraticCurveTo(s+i,r+t,s+i-n,r+t),a.lineTo(s+n,r+t),a.quadraticCurveTo(s,r+t,s,r+t-n),a.lineTo(s,r+n),a.quadraticCurveTo(s,r,s+n,r),a.closePath(),a}function ax(i,t,e,n,s=.004){const r=rx(i,t,s*2.2),a=new Ml(r,{depth:e,bevelEnabled:!0,bevelSegments:2,bevelSize:s,bevelThickness:s,curveSegments:3,steps:1});return a.translate(0,0,-e*.5),new Dt(a,n)}function bn(i,t,e,n,s,r=0,a=0,o=0){return t.position.set(e,n,s),t.rotation.set(r,a,o),i.add(t),t}function ge(i,t,e,n,s,r,a,o,l=0,c=0,h=0,u=.004){return bn(i,ax(t,e,n,s,u),r,a,o,l,c,h)}function Ae(i,t,e,n,s,r,a,o,l=0,c=0,h=0){return bn(i,new Dt(new Yt(t,e,n),s),r,a,o,l,c,h)}function we(i,t,e,n,s,r,a,o,l=16,c=0,h=0,u=0,f=!1){const d=new Ue(t,e,n,l,1,f);return bn(i,new Dt(d,s),r,a,o,c,h,u)}function Ji(i,t,e,n,s,r,a,o=0,l=0,c=0){const h=new Vn(t,e,4,10);return bn(i,new Dt(h,n),s,r,a,o,l,c)}function Ls(i,t,e,n,s,r,a,o=0,l=0,c=0){const h=new ds(t,e,6,20);return bn(i,new Dt(h,n),s,r,a,o,l,c)}function $i(i,t,e,n,s,r,a=12){const o=new C().subVectors(e,t),l=o.length(),c=new Ue(s,n,l,a,1,!1),h=new Dt(c,r);return h.position.copy(t).add(e).multiplyScalar(.5),h.quaternion.setFromUnitVectors(sx,o.normalize()),i.add(h),h}function Qi(i,t,e,n){const s=new Fh(t,e,n.length),r=new Pe;for(let a=0;a<n.length;a+=1){const o=n[a];r.position.set(o[0],o[1],o[2]),r.rotation.set(o[3]||0,o[4]||0,o[5]||0);const l=o[6]||1;r.scale.set(l,o[7]||l,o[8]||l),r.updateMatrix(),s.setMatrixAt(a,r.matrix)}return s.instanceMatrix.needsUpdate=!0,i.add(s),s}function ox(){const t=new Uint8Array(16384);for(let n=0;n<64;n+=1)for(let s=0;s<64;s+=1){const r=(s+.5)/64*2-1,a=(n+.5)/64*2-1,o=Math.min(1,Math.sqrt(r*r+a*a)),l=Math.atan2(a,r),c=Math.pow(1-o,2.4)*.85,h=Math.pow(Math.abs(Math.cos(l*3)),10)*Math.pow(1-o,1.5),u=Math.min(1,Math.max(c,h)),f=(n*64+s)*4;t[f]=255,t[f+1]=225,t[f+2]=170,t[f+3]=Math.round(u*255)}const e=new ir(t,64,64,dn);return e.colorSpace=He,e.needsUpdate=!0,e}const lx=ox();class cx{constructor(){this.group=new be,this.group.name="FirstPersonWeapon",this.group.rotation.order="YXZ",this.group.frustumCulled=!1,this.hipPosition=new C(.26,-.27,-.52),this.hipRotation=new Nn(.02,.15,-.018,"YXZ"),this.adsPosition=new C(0,-.172,-.18),this.adsRotation=new Nn(0,0,0,"YXZ"),this.group.position.copy(this.hipPosition),this.group.rotation.copy(this.hipRotation),this.adsProgress=0,this.isReloading=!1,this.ammoInMag=30,this.reserveAmmo=120,this.rpm=700,this._adsTarget=!1,this._elapsed=0,this._bobPhase=0,this._sprintAmount=0,this._swayX=0,this._swayY=0,this._recoilZ=0,this._recoilVelZ=0,this._recoilPitch=0,this._recoilVelPitch=0,this._recoilYaw=0,this._recoilVelYaw=0,this._recoilRoll=0,this._recoilVelRoll=0,this._flashTimer=0,this._reloadTime=0,this._reloadRefilled=!1,this._shells=[],this._build(),this._buildHands(),this._buildMuzzleFlash(),this.group.traverse(t=>{t.frustumCulled=!1,t.castShadow=!1,t.receiveShadow=!1}),this._magBaseY=this.magazine.position.y,this._magBaseZ=this.magazine.position.z,this._magBaseRotX=this.magazine.rotation.x}_build(){const t=this.group;ge(t,.072,.078,.27,ht.gunmetal,0,-.004,-.06,0,0,0,.006),ge(t,.079,.07,.32,ht.gunmetal,0,.058,-.085,0,0,0,.006),ge(t,.08,.058,.105,ht.gunmetalDark,0,-.052,-.102,0,0,0,.005),ge(t,.002,.036,.14,ht.gunmetalDark,-.0385,.028,-.075,0,0,0,.002),ge(t,.002,.03,.11,ht.gunmetalDark,.0385,.03,-.07,0,0,0,.002),Ae(t,.046,.012,.61,ht.black,0,.102,-.225);const e=[];for(let n=.072;n>=-.505;n-=.028)e.push([0,.111,n]);Qi(t,new Yt(.044,.007,.011),ht.black,e),Qi(t,new Ue(.0038,.0038,.008,8),ht.steel,[[-.039,.005,.02,0,0,Math.PI/2],[.039,.005,.02,0,0,Math.PI/2],[-.039,.005,-.09,0,0,Math.PI/2],[.039,.005,-.09,0,0,Math.PI/2]]),we(t,.009,.009,.012,ht.steel,-.044,.028,.018,12,0,0,Math.PI/2),Ae(t,.012,.007,.032,ht.gunmetalDark,-.049,.02,.025,.5,0,0),Ae(t,.008,.018,.05,ht.gunmetalDark,-.042,.008,-.04,0,0,0),we(t,.009,.009,.012,ht.steel,.043,-.02,-.08,12,0,0,Math.PI/2),we(t,.011,.011,.03,ht.steel,.045,.056,-.008,12,0,0,Math.PI/2),we(t,.014,.014,.008,ht.gunmetalDark,.062,.056,-.008,12,0,0,Math.PI/2),ge(t,.004,.028,.075,ht.black,.041,.062,-.052,0,0,0,.001),Ae(t,.003,.03,.006,ht.gunmetalDark,.042,.062,-.092,.35,0,0),Ae(t,.003,.006,.07,ht.gunmetalDark,.042,.078,-.05,0,0,.35),Ae(t,.002,.011,.032,ht.brass,.0435,.06,-.055,0,0,0),Ae(t,.012,.012,.075,ht.gunmetalDark,0,.095,.112),ge(t,.046,.012,.018,ht.gunmetalDark,0,.095,.148,0,0,0,.002),Ae(t,.014,.016,.02,ht.steel,.026,.095,.148,0,0,.2),Ae(t,.013,.035,.008,ht.gunmetalDark,0,-.073,-.045),Ae(t,.013,.008,.068,ht.gunmetalDark,0,-.092,-.012),Ae(t,.013,.038,.008,ht.gunmetalDark,0,-.076,.022,-.22,0,0),Ae(t,.008,.028,.009,ht.steel,0,-.06,-.004,.35,0,0),we(t,.004,.004,.016,ht.steel,0,-.056,.002,8,0,0,Math.PI/2),this._buildHandguard(),this._buildBarrel(),this._buildStock(),this._buildGrip(),this._buildMagazine(),this._buildOptic(),this._buildIronSights()}_buildHandguard(){const t=this.group;we(t,.033,.033,.032,ht.gunmetalDark,0,.015,-.25,12,Math.PI/2),we(t,.051,.054,.27,ht.tanFlat,0,.015,-.386,8,Math.PI/2),we(t,.056,.056,.012,ht.tanDark,0,.015,-.522,8,Math.PI/2),ge(t,.046,.028,.265,ht.black,0,.079,-.386,0,0,0,.003);const e=[];for(const n of[-.285,-.33,-.375,-.42,-.465])e.push([.052,.006,n,0,0,0],[-.052,.006,n,0,0,0]);Qi(t,new Yt(.003,.015,.031),ht.black,e),Ae(t,.034,.01,.18,ht.black,0,-.043,-.39),ge(t,.03,.042,.022,ht.tanDark,0,-.06,-.49,-.18,0,0,.002),we(t,.009,.009,.012,ht.steel,-.054,.022,-.292,10,0,0,Math.PI/2),Ls(t,.011,.0028,ht.steel,-.056,.022,-.31,0,Math.PI/2,0)}_buildBarrel(){const t=this.group;we(t,.012,.012,.17,ht.steel,0,.02,-.58,14,Math.PI/2),ge(t,.034,.04,.042,ht.gunmetalDark,0,.037,-.545,0,0,0,.003),we(t,.0045,.0045,.12,ht.steel,0,.04,-.46,8,Math.PI/2),we(t,.028,.028,.19,ht.gunmetalDark,0,.02,-.73,20,Math.PI/2),we(t,.031,.031,.012,ht.steel,0,.02,-.637,20,Math.PI/2),we(t,.03,.03,.012,ht.steel,0,.02,-.831,20,Math.PI/2);for(const e of[-.69,-.73,-.77])we(t,.0292,.0292,.005,ht.steel,0,.02,e,20,Math.PI/2)}_buildStock(){const t=this.group;we(t,.019,.019,.29,ht.gunmetalDark,0,.055,.165,14,Math.PI/2),we(t,.024,.024,.018,ht.steel,0,.055,.045,12,Math.PI/2),ge(t,.066,.098,.16,ht.tan,0,.024,.3,0,0,0,.006),ge(t,.06,.028,.105,ht.tanDark,0,.088,.288,0,0,0,.004),ge(t,.069,.108,.018,ht.rubber,0,.02,.39,0,0,0,.004),Ae(t,.02,.034,.06,ht.tanDark,0,-.03,.302,.1,0,0),Ae(t,.018,.008,.045,ht.rubber,0,-.048,.305,.1,0,0),Ls(t,.011,.0028,ht.steel,-.038,.005,.355,0,Math.PI/2,0),we(t,.008,.008,.014,ht.steel,-.036,.042,.34,10,0,0,Math.PI/2)}_buildGrip(){const t=new be;t.position.set(0,-.115,.035),t.rotation.x=-.32,this.group.add(t),this.grip=t,ge(t,.052,.105,.062,ht.gloveDark,0,-.05,0,0,0,0,.007),ge(t,.05,.018,.058,ht.rubber,0,-.108,0,0,0,0,.003),ge(t,.036,.018,.035,ht.gunmetalDark,0,.006,-.008,.1,0,0,.003),Qi(t,new Yt(.039,.005,.004),ht.rubber,[[0,-.028,-.032],[0,-.044,-.032],[0,-.06,-.032],[0,-.076,-.032]])}_buildMagazine(){const t=new be;t.position.set(0,-.085,-.108),this.group.add(t),this.magazine=t,ge(t,.058,.08,.085,ht.gunmetalDark,0,-.022,-.003,.04,0,0,.004),ge(t,.056,.08,.082,ht.gunmetalDark,0,-.088,-.018,.14,0,0,.004),ge(t,.054,.072,.078,ht.gunmetalDark,0,-.15,-.045,.25,0,0,.004),ge(t,.062,.013,.088,ht.tanDark,0,-.192,-.068,.25,0,0,.003),Ae(t,.02,.008,.026,ht.tan,0,-.202,-.068,.25,0,0),Qi(t,new Yt(.002,.009,.014),ht.steel,[[.0295,-.05,-.012,.1,0,0],[.0295,-.095,-.03,.14,0,0],[.0295,-.14,-.052,.2,0,0]])}_buildOptic(){const t=this.group,e=.152;ge(t,.042,.018,.105,ht.black,0,.115,-.1,0,0,0,.003),ge(t,.034,.05,.014,ht.black,0,.14,-.058,0,0,0,.002),ge(t,.034,.05,.014,ht.black,0,.14,-.142,0,0,0,.002),we(t,.026,.026,.125,ht.black,0,e,-.1,24,Math.PI/2,0,0,!0),we(t,.032,.03,.022,ht.black,0,e,-.032,24,Math.PI/2,0,0,!0),we(t,.032,.034,.022,ht.black,0,e,-.168,24,Math.PI/2,0,0,!0),Ls(t,.0275,.0035,ht.gunmetalDark,0,e,-.057,0,0,0),Ls(t,.0275,.0035,ht.gunmetalDark,0,e,-.143,0,0,0);const n=bn(t,new Dt(new ss(.027,28),ht.lens),0,e,-.024),s=bn(t,new Dt(new ss(.028,28),ht.lens),0,e,-.176);n.renderOrder=2,s.renderOrder=2,we(t,.013,.013,.019,ht.gunmetalDark,0,e+.036,-.1,16),we(t,.014,.014,.005,ht.steel,0,e+.047,-.1,16),we(t,.012,.012,.019,ht.gunmetalDark,.033,e,-.1,16,0,0,Math.PI/2),we(t,.013,.013,.005,ht.steel,.044,e,-.1,16,0,0,Math.PI/2),Qi(t,new Ue(.0022,.0022,.005,6),ht.steel,[[-.016,.126,-.07,0,0,0],[.016,.126,-.07,0,0,0],[-.016,.126,-.13,0,0,0],[.016,.126,-.13,0,0,0]]);const r=bn(t,new Dt(new ss(.0018,14),ht.reticle),0,e,-.092),a=bn(t,new Dt(new ds(.0065,7e-4,6,24),ht.reticleRing),0,e,-.092),o=bn(t,new Dt(new An(.0018,8,6),ht.reticle),0,e,-.092);r.renderOrder=30,a.renderOrder=29,o.renderOrder=30,this.reticle=r}_buildIronSights(){const t=this.group;ge(t,.028,.012,.04,ht.black,0,.118,-.475,0,0,0,.002),Ae(t,.023,.005,.028,ht.gunmetalDark,0,.124,-.475,.2,0,0),Ae(t,.005,.015,.006,ht.gunmetalDark,0,.125,-.475),Ae(t,.004,.017,.008,ht.gunmetalDark,-.013,.124,-.475,0,0,.12),Ae(t,.004,.017,.008,ht.gunmetalDark,.013,.124,-.475,0,0,-.12),ge(t,.03,.012,.04,ht.black,0,.118,.036,0,0,0,.002),Ls(t,.0065,.0016,ht.gunmetalDark,0,.123,.036,0,0,0),Ae(t,.004,.014,.009,ht.gunmetalDark,-.012,.121,.036,0,0,.1),Ae(t,.004,.014,.009,ht.gunmetalDark,.012,.121,.036,0,0,-.1)}_buildHands(){const t=this.group,e=new be;e.position.set(.024,-.145,.03),e.rotation.set(-.32,.08,-.05),t.add(e),ge(e,.05,.072,.058,ht.glove,.012,0,.008,0,0,0,.006),ge(e,.038,.016,.042,ht.tanDark,.018,.026,.012,0,0,0,.004);for(let h=0;h<4;h+=1){const u=.022-h*.019;Ji(e,.0085,.032,ht.glove,-.008,u,-.03,0,0,Math.PI/2)}Ji(e,.009,.038,ht.gloveDark,.034,.026,.006,0,0,.55),Ji(e,.023,.028,ht.gloveDark,.025,-.05,.03,.18,0,0);const n=new C(.035,-.198,.058),s=new C(.205,-.43,.19);$i(t,n,s,.033,.047,ht.sleeve,12);const r=new C().subVectors(s,n).normalize();$i(t,n.clone().addScaledVector(r,-.01),n.clone().addScaledVector(r,.042),.04,.04,ht.sleeveDark,12),$i(t,n.clone().addScaledVector(r,-.035),n.clone().addScaledVector(r,.012),.028,.03,ht.gloveDark,10);const a=new be;a.position.set(.065,-.055,-.36),a.rotation.set(.12,.05,.08),t.add(a),ge(a,.06,.048,.08,ht.glove,0,-.018,0,0,0,0,.006),ge(a,.046,.014,.054,ht.tanDark,.012,.012,.004,0,0,0,.004),Ae(a,.005,.034,.044,ht.tanDark,.033,-.006,0,0,0,0),ge(a,.05,.012,.058,ht.gloveDark,-.004,-.042,.004,0,0,0,.004);for(let h=0;h<4;h+=1){const u=.028-h*.019;Ji(a,.009,.036,ht.glove,.044,.002,u,0,0,-.12)}Ji(a,.0095,.044,ht.gloveDark,-.028,-.006,.014,Math.PI/2,0,0),Ji(a,.022,.026,ht.gloveDark,.008,-.062,.02,.1,0,.1);const o=new C(.05,-.098,-.342),l=new C(-.205,-.36,-.19);$i(t,o,l,.031,.044,ht.sleeve,12);const c=new C().subVectors(l,o).normalize();$i(t,o.clone().addScaledVector(c,-.008),o.clone().addScaledVector(c,.04),.037,.037,ht.sleeveDark,12),$i(t,o.clone().addScaledVector(c,-.032),o.clone().addScaledVector(c,.01),.026,.028,ht.gloveDark,10)}_buildMuzzleFlash(){const t=this.group;this.muzzle=new Pe,this.muzzle.position.set(0,.02,-.845),t.add(this.muzzle),this.flash=new be,this.flash.position.copy(this.muzzle.position),this.flash.visible=!1,t.add(this.flash);const e=[[.046,.14,ht.flashEdge,-.055],[.031,.11,ht.flashWarm,-.052],[.017,.075,ht.flashCore,-.045]];for(const[o,l,c,h]of e){const u=new ml(o,l,10,1,!0);bn(this.flash,new Dt(u,c),0,0,h,-Math.PI/2,0,0)}const n=new yi({map:lx,color:16761724,transparent:!0,opacity:.92,blending:en,depthTest:!1,depthWrite:!1,toneMapped:!1}),s=new bi(n);s.position.set(0,0,-.018),s.scale.set(.2,.2,1),this.flash.add(s);const r=n.clone();r.color.setHex(16774098),r.opacity=.75,r.rotation=Math.PI*.25;const a=new bi(r);a.position.set(0,0,-.045),a.scale.set(.13,.13,1),this.flash.add(a),this.flashLight=new ai(16753229,0,7,2),this.flashLight.position.copy(this.muzzle.position),this.flashLight.castShadow=!1,t.add(this.flashLight)}setADS(t){this._adsTarget=!!t}fire(){if(this.isReloading||this.ammoInMag<=0)return!1;this.ammoInMag-=1,this.addRecoil(1),this._flashTimer=.045,this.flash.visible=!0;const t=.82+Math.random()*.5;return this.flash.scale.set(t,t*(.82+Math.random()*.32),t),this.flash.rotation.set(0,0,Math.random()*Math.PI*2),this.flashLight.intensity=25,this._ejectShell(),!0}reload(){return this.isReloading||this.ammoInMag>=30||this.reserveAmmo<=0?!1:(this.isReloading=!0,this._reloadTime=0,this._reloadRefilled=!1,!0)}addRecoil(t=1){const e=Math.max(0,Number(t)||0);if(e<=0)return;const n=e*(1-this.adsProgress*.4);this._recoilVelZ+=.36*n,this._recoilVelPitch+=.6*n,this._recoilVelYaw+=(Math.random()-.5)*.25*n,this._recoilVelRoll+=(Math.random()-.5)*.2*n}getMuzzleWorldPosition(t){const e=t||new C;return this.muzzle.getWorldPosition(e),e}reset(){for(const t of this._shells)this.group.remove(t),t.geometry.dispose(),t.material.dispose();this._shells.length=0,this.ammoInMag=30,this.reserveAmmo=120,this.isReloading=!1,this._reloadTime=0,this._reloadRefilled=!1,this._adsTarget=!1,this.adsProgress=0,this._sprintAmount=0,this._swayX=0,this._swayY=0,this._bobPhase=0,this._elapsed=0,this._flashTimer=0,this.flash.visible=!1,this.flash.scale.set(1,1,1),this.flashLight.intensity=0,this._recoilZ=0,this._recoilVelZ=0,this._recoilPitch=0,this._recoilVelPitch=0,this._recoilYaw=0,this._recoilVelYaw=0,this._recoilRoll=0,this._recoilVelRoll=0,this.magazine.position.set(0,this._magBaseY,this._magBaseZ),this.magazine.rotation.x=this._magBaseRotX,this.group.position.copy(this.hipPosition),this.group.rotation.copy(this.hipRotation)}update(t,e={}){const n=Math.min(Math.max(Number(t)||0,0),.033);this._elapsed+=n;const s=!!e.moving,r=!!e.sprinting&&s,a=e.grounded!==!1,o=Number(e.lookDeltaX)||0,l=Number(e.lookDeltaY)||0;this.adsProgress=Cn.clamp(Cn.damp(this.adsProgress,this._adsTarget?1:0,14,n),0,1);const c=this.adsProgress;this._sprintAmount=Cn.damp(this._sprintAmount,r?1:0,8,n);const h=this._sprintAmount*(1-c*.8),u=1-c*.78,f=Cn.clamp(-o*55e-5,-.017,.017),d=Cn.clamp(-l*55e-5,-.013,.013);this._swayX=Cn.damp(this._swayX,f,9,n),this._swayY=Cn.damp(this._swayY,d,9,n);const g=(1-c*.87)*(r?1.5:1);s&&a&&(this._bobPhase+=n*(r?10.8:7.2));const M=s&&a?Math.cos(this._bobPhase)*.0072*g:0,m=s&&a?Math.sin(this._bobPhase*2)*.0056*g:0,p=s&&a?Math.cos(this._bobPhase)*.009*g:0,S=Math.sin(this._elapsed*1.7)*.0013*(1-c*.7),w=Math.max(1,Math.ceil(n/.016)),v=n/w;for(let N=0;N<w;N+=1)this._recoilVelZ+=(-150*this._recoilZ-18*this._recoilVelZ)*v,this._recoilZ+=this._recoilVelZ*v,this._recoilVelPitch+=(-180*this._recoilPitch-20*this._recoilVelPitch)*v,this._recoilPitch+=this._recoilVelPitch*v,this._recoilVelYaw+=(-140*this._recoilYaw-18*this._recoilVelYaw)*v,this._recoilYaw+=this._recoilVelYaw*v,this._recoilVelRoll+=(-140*this._recoilRoll-18*this._recoilVelRoll)*v,this._recoilRoll+=this._recoilVelRoll*v;let A=0,T=0,_=0,b=0,L=0,R=0,D=0;if(this.isReloading){this._reloadTime+=n;const N=Math.min(this._reloadTime/2.1,1),H=Math.sin(Math.PI*Math.min(N/.98,1));if(A=-.06*H,T=.05*H,_=.02*H,b=-.18*H,L=.2*H,R=.62*H,N>.12&&N<.72){const J=(N-.12)/.6;D=Math.sin(J*Math.PI)*.14}if(!this._reloadRefilled&&this._reloadTime>=1.6){const J=Math.min(30-this.ammoInMag,this.reserveAmmo);this.ammoInMag+=J,this.reserveAmmo-=J,this._reloadRefilled=!0}this._reloadTime>=2.1&&(this.isReloading=!1,this._reloadTime=0)}this.magazine.position.y=this._magBaseY-D,this.magazine.position.z=this._magBaseZ+D*.28,this.magazine.rotation.x=this._magBaseRotX+D*2.4;const z=this.group.position;z.copy(this.hipPosition).lerp(this.adsPosition,c),z.x+=-.034*h+M+this._swayX*u+A,z.y+=-.085*h+m+S+this._swayY*u+T,z.z+=.03*h+_+this._recoilZ,this.group.rotation.set(Cn.lerp(this.hipRotation.x,this.adsRotation.x,c)-.34*h+this._recoilPitch+this._swayY*2.2*u+b,Cn.lerp(this.hipRotation.y,this.adsRotation.y,c)-.16*h+this._recoilYaw-this._swayX*2*u+L,Cn.lerp(this.hipRotation.z,this.adsRotation.z,c)-.34*h+this._recoilRoll+p+R),this._updateFlash(n),this._updateShells(n)}_updateFlash(t){this._flashTimer<=0||(this._flashTimer-=t,this._flashTimer<=0&&(this._flashTimer=0,this.flash.visible=!1,this.flashLight.intensity=0))}_ejectShell(){const t=new Ue(.0055,.0062,.024,8),e=ht.brass.clone();e.transparent=!0;const n=new Dt(t,e);n.position.set(.048,.07,-.035),n.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI),n.userData.velocity=new C(.7+Math.random()*.35,.75+Math.random()*.35,.08+Math.random()*.22),n.userData.spin=new C((Math.random()-.5)*16,(Math.random()-.5)*16,(Math.random()-.5)*16),n.userData.life=0,this.group.add(n),this._shells.push(n)}_updateShells(t){for(let e=this._shells.length-1;e>=0;e-=1){const n=this._shells[e],s=n.userData;s.life+=t,s.velocity.y-=3.2*t,n.position.addScaledVector(s.velocity,t),n.rotation.x+=s.spin.x*t,n.rotation.y+=s.spin.y*t,n.rotation.z+=s.spin.z*t,n.position.y<-.32&&(n.position.y=-.32,s.velocity.y<0&&(s.velocity.y*=-.32),s.velocity.x*=.72,s.velocity.z*=.72,s.spin.multiplyScalar(.7)),s.life>1&&(n.material.opacity=Math.max(0,1-(s.life-1)/.5)),s.life>=1.5&&(this.group.remove(n),n.geometry.dispose(),n.material.dispose(),this._shells.splice(e,1))}}}const li=Math.PI*2,Gr=Math.PI/180,ch=new C(0,1,0);function gu(i){let t=i>>>0;return function(){t=t+1831565813>>>0;let n=t;return n=Math.imul(n^n>>>15,n|1),n^=n+Math.imul(n^n>>>7,n|61),((n^n>>>14)>>>0)/4294967296}}function gn(i,t,e){return i<t?t:i>e?e:i}function hx(i,t,e,n){let s=(t-i)%li;return s>Math.PI&&(s-=li),s<-Math.PI&&(s+=li),i+s*(1-Math.exp(-9*n))}function hh(i){return i=gn(i,0,1),i*i*(3-2*i)}function ux(){const t=new Uint8Array(4096);for(let n=0;n<32;n++)for(let s=0;s<32;s++){const r=(s+.5)/32*2-1,a=(n+.5)/32*2-1,o=Math.sqrt(r*r+a*a),l=(n*32+s)*4;if(o>=1)t[l+3]=0;else{const c=Math.pow(1-o,2.1),h=Math.pow(1-o,7);t[l]=255,t[l+1]=135+120*h,t[l+2]=40+200*h,t[l+3]=gn(c*255,0,255)}}const e=new ir(t,32,32,dn);return e.colorSpace=He,e.magFilter=qe,e.minFilter=qe,e.needsUpdate=!0,e}function fx(){const i=new Ee,t=new Float32Array([-.175,-.15,-.115,.175,-.15,-.115,.175,-.15,.115,-.175,-.15,.115,-.155,.15,-.105,.155,.15,-.105,.155,.15,.105,-.155,.15,.105]);return i.setAttribute("position",new sn(t,3)),i.setIndex([0,1,2,0,2,3,4,6,5,4,7,6,0,5,1,0,4,5,2,7,3,2,6,7,0,3,7,0,7,4,1,6,2,1,5,6]),i.computeVertexNormals(),i}function dx(){const i=new Ee,t=new Float32Array([-.071,-.0775,-.14,.071,-.0775,-.14,.071,-.0775,.17,-.071,-.0775,.17,-.06,.0775,-.11,.06,.0775,-.11,.06,.0775,.07,-.06,.0775,.07]);return i.setAttribute("position",new sn(t,3)),i.setIndex([0,1,2,0,2,3,4,6,5,4,7,6,0,5,1,0,4,5,2,7,3,2,6,7,0,3,7,0,7,4,1,6,2,1,5,6]),i.computeVertexNormals(),i}function Ja(i,t,e){const s=new Uint8Array(16384),r=gu(e);for(let o=0;o<4096;o++){const l=o*4;s[l]=i[0],s[l+1]=i[1],s[l+2]=i[2],s[l+3]=255}for(let o=0;o<190;o++){const l=t[r()*t.length|0],c=r()*64,h=r()*64,u=1.2+r()*4.4,f=1.2+r()*4.4,d=r()*Math.PI,g=Math.cos(d),M=Math.sin(d),m=Math.max(0,Math.floor(c-u-f)),p=Math.min(63,Math.ceil(c+u+f)),S=Math.max(0,Math.floor(h-u-f)),w=Math.min(63,Math.ceil(h+u+f));for(let v=S;v<=w;v++)for(let A=m;A<=p;A++){const T=A-c,_=v-h,b=T*g+_*M,L=-T*M+_*g;if(b*b/(u*u)+L*L/(f*f)<=1){const R=(v*64+A)*4;s[R]=l[0],s[R+1]=l[1],s[R+2]=l[2]}}}for(let o=0;o<4096;o++){const l=(r()-.5)*12,c=o*4;s[c]=gn(s[c]+l,0,255),s[c+1]=gn(s[c+1]+l,0,255),s[c+2]=gn(s[c+2]+l,0,255)}const a=new ir(s,64,64,dn);return a.wrapS=wi,a.wrapT=wi,a.repeat.set(3,3),a.colorSpace=He,a.magFilter=qe,a.minFilter=Wn,a.generateMipmaps=!0,a.needsUpdate=!0,a}let Hr=null;function px(){if(Hr)return Hr;const i=Ja([58,60,48],[[52,55,44],[66,67,53],[47,50,40],[73,71,56]],1715004),t=Ja([76,70,56],[[68,63,51],[85,78,62],[59,55,45],[92,83,66]],5357790),e=Ja([46,53,45],[[40,47,40],[54,62,51],[36,41,35],[62,68,55]],8262058),n=o=>new Gt({map:o,color:16777215,roughness:.94,metalness:0}),r={gearSets:[{uniform:n(i),vest:new Gt({color:3882288,roughness:.88,metalness:.02}),pouch:new Gt({color:4145202,roughness:.9}),helmet:new Gt({map:i,color:11053214,roughness:.82,metalness:.04})},{uniform:n(t),vest:new Gt({color:7036487,roughness:.9,metalness:.02}),pouch:new Gt({color:6839109,roughness:.92}),helmet:new Gt({map:t,color:11577492,roughness:.84,metalness:.04})},{uniform:n(e),vest:new Gt({color:3358003,roughness:.87,metalness:.02}),pouch:new Gt({color:3621430,roughness:.9}),helmet:new Gt({map:e,color:10134423,roughness:.8,metalness:.04})}],balaclava:new Gt({color:1842457,roughness:.97}),glove:new Gt({color:2368542,roughness:.9}),boot:new Gt({color:1316111,roughness:.95}),rubber:new Gt({color:921356,roughness:1}),kneepad:new Gt({color:2106140,roughness:.8}),strap:new Gt({color:2829604,roughness:.85}),helmetRim:new Gt({color:1908506,roughness:.7,metalness:.15}),nvg:new Gt({color:1645336,roughness:.55,metalness:.35}),lens:new Gt({color:1053969,roughness:.18,metalness:.6}),rifle:new Gt({color:1776924,roughness:.42,metalness:.62}),rifleFurniture:new Gt({color:4472882,roughness:.76,metalness:.14}),visorAmber:new Gt({color:3808261,emissive:16742942,emissiveIntensity:1.55,roughness:.24,metalness:.45}),visorRed:new Gt({color:3475207,emissive:16720914,emissiveIntensity:1.45,roughness:.24,metalness:.45}),patchAmber:new Gt({color:6040072,emissive:16742942,emissiveIntensity:.24,roughness:.7}),patchRed:new Gt({color:4853257,emissive:14232343,emissiveIntensity:.2,roughness:.7}),flash:new yi({map:ux(),color:16767392,transparent:!0,opacity:.95,blending:en,depthWrite:!1,toneMapped:!1})};return Hr={geo:{pelvis:new Yt(.285,.17,.195),torso:new Vn(.155,.15,6,14),vest:fx(),pouch:new Yt(.085,.105,.048),belt:new Yt(.315,.062,.22),backpack:new Yt(.235,.25,.13),strap:new Yt(.068,.21,.05),holster:new Yt(.075,.16,.065),thigh:new Vn(.1,.205,5,10),shin:new Vn(.078,.185,5,10),boot:dx(),knee:new Yt(.14,.125,.055),upperArm:new Vn(.061,.17,5,9),forearm:new Vn(.053,.165,5,9),hand:new Yt(.075,.095,.09),shoulderPad:new An(.082,10,7),neck:new Ue(.055,.062,.11,8),head:new An(.115,16,12),helmet:new An(.138,16,9,0,li,0,Math.PI*.58),helmetRim:new ds(.131,.01,5,18),nvgMount:new Yt(.052,.055,.05),nvgTube:new Ue(.026,.029,.075,8),visor:new Yt(.14,.029,.032),patch:new Yt(.045,.055,.012),receiver:new Yt(.07,.095,.3),handguard:new Yt(.066,.08,.21),barrel:new Ue(.017,.017,.19,7),stock:new Yt(.058,.085,.17),magazine:new Yt(.05,.145,.085),grip:new Yt(.044,.1,.06),sight:new Yt(.05,.052,.11)},mats:r},Hr}function mx(i,t){const{geo:e,mats:n}=px(),s=gu(i),r=n.gearSets[t%n.gearSets.length],a=new be;a.name="soldier";const o=new be;a.add(o);const l=.955+s()*.085,c=.95+s()*.1;o.scale.set(c,l,c);const h=(pt,X,St,At,Rt,mt,Bt)=>{const de=new Dt(X,St);return de.position.set(At,Rt,mt),Bt&&(de.name=Bt),pt.add(de),de},u=pt=>(pt.castShadow=!0,pt.receiveShadow=!0,pt),f=new be;f.position.y=.94,o.add(f),u(h(f,e.pelvis,r.uniform,0,.03,0,"pelvis"));const d=h(f,e.belt,n.strap,0,.075,0,"belt");d.castShadow=!1;const g=[];for(let pt=-1;pt<=1;pt+=2){const X=new be;X.position.set(pt*.105,.94,0),o.add(X);const St=u(h(X,e.thigh,r.uniform,0,-.21,0,pt<0?"thighL":"thighR"));St.scale.set(1.02,1,.96);const At=new be;At.position.y=-.42,At.rotation.x=.035,X.add(At);const Rt=u(h(At,e.shin,r.uniform,0,-.175,0,pt<0?"shinL":"shinR"));Rt.scale.set(1,1,.98),u(h(At,e.knee,n.kneepad,0,.005,.082,"kneePad"));const mt=u(h(At,e.boot,n.boot,0,-.4425,.047,"boot"));if(mt.rotation.x=-.015,pt>0){const Bt=h(X,e.holster,n.strap,.098,-.25,.015,"holster");Bt.rotation.z=-.08}g.push({side:pt,group:X,knee:At,thigh:St,shin:Rt})}const M=new be;M.position.y=.94,o.add(M);const m=u(h(M,e.torso,r.uniform,0,.3,0,"torso"));m.scale.set(1.12,1,.79);const p=u(h(M,e.vest,r.vest,0,.29,.008,"plateCarrier"));p.scale.set(1.02,1,1),p.rotation.x=-.015;for(let pt=-1;pt<=1;pt++){const X=h(M,e.pouch,r.pouch,pt*.095,.205,.142,"pouch");X.rotation.x=-.04,X.castShadow=!1}for(let pt=-1;pt<=1;pt+=2){const X=h(M,e.strap,n.strap,pt*.118,.425,.035,"vestStrap");X.rotation.z=pt*.1,X.rotation.x=-.1,X.castShadow=!1}const S=u(h(M,e.backpack,r.vest,0,.31,-.205,"backpack"));S.scale.set(.95,1,1),u(h(M,e.neck,n.balaclava,0,.555,0,"neck"));const w=[];for(let pt=-1;pt<=1;pt+=2){const X=new be;X.position.set(pt*.215,.45,.012),M.add(X),u(h(X,e.shoulderPad,r.vest,0,-.012,0,"shoulderPad")).scale.set(.82,.62,.95);const At=u(h(X,e.upperArm,r.uniform,0,-.147,0,pt<0?"upperArmL":"upperArmR"));At.scale.set(1,1,1);const Rt=new be;Rt.position.y=-.294,X.add(Rt),u(h(Rt,e.forearm,r.uniform,0,-.14,0,pt<0?"forearmL":"forearmR")),u(h(Rt,e.hand,n.glove,0,-.285,.018,pt<0?"handL":"handR"));const mt=h(X,e.patch,n.patchAmber,pt*.062,-.105,.002,"patch");mt.rotation.y=Math.PI*.5,mt.scale.set(.82,.82,1),mt.castShadow=!1,w.push({side:pt,group:X,elbow:Rt,upper:At,hand:Rt.children[1],patch:mt})}const v=w[1],A=w[0];v.group.rotation.set(-.55,.02,-.18),v.elbow.rotation.set(-.9,0,.02),A.group.rotation.set(-.75,-.02,.18),A.elbow.rotation.set(-.75,0,-.02);const T=new be;T.position.y=.58,T.userData.part="head",M.add(T);const _=h(T,e.head,n.balaclava,0,.085,.008,"head");_.scale.set(.94,1.04,.96),_.castShadow=!0,_.userData.part="head";const b=h(T,e.helmet,r.helmet,0,.118,0,"helmet");b.scale.set(1,.84,1.02),b.castShadow=!0,b.userData.part="head";const L=h(T,e.helmetRim,n.helmetRim,0,.105,0,"helmetRim");L.rotation.x=Math.PI*.5,L.scale.set(1,1,1.04),L.castShadow=!1,L.userData.part="head";const R=h(T,e.nvgMount,n.nvg,0,.176,.118,"nvgMount");R.userData.part="head";const D=h(T,e.nvgTube,n.lens,0,.181,.158,"nvgTube");D.rotation.x=Math.PI*.5,D.userData.part="head";const z=h(T,e.visor,s()<.58?n.visorAmber:n.visorRed,0,.105,.126,"visor");z.rotation.x=-.04,z.castShadow=!1,z.userData.part="head",T.scale.set(.96+s()*.08,.97+s()*.06,.96+s()*.08);const W=new be;W.position.set(.055,.27,.285),W.rotation.set(.015,-.12,0),M.add(W);const N=h(W,e.receiver,n.rifle,0,0,0,"receiver"),H=h(W,e.handguard,n.rifleFurniture,0,.002,.245,"handguard"),J=h(W,e.barrel,n.rifle,0,.004,.435,"barrel");J.rotation.x=Math.PI*.5;const k=h(W,e.stock,n.rifleFurniture,0,-.006,-.232,"stock"),j=h(W,e.magazine,n.rifle,0,-.105,.055,"magazine");j.rotation.x=.28;const $=h(W,e.grip,n.rifleFurniture,0,-.088,-.085,"grip");$.rotation.x=-.16;const nt=h(W,e.sight,n.lens,0,.074,.025,"sight"),lt=new bi(n.flash);lt.name="muzzleFlash",lt.position.set(0,.004,.552),lt.scale.set(.24,.24,1),lt.visible=!1,lt.userData.ignoreHit=!0,W.add(lt),W.traverse(pt=>{pt.isMesh&&(pt.castShadow=!0,pt.receiveShadow=!1,pt.userData.ignoreHit=!0)}),N.castShadow=!0,H.castShadow=!0,J.castShadow=!0,k.castShadow=!0,j.castShadow=!0,$.castShadow=!0,nt.castShadow=!0;const Nt=s()<.5?n.patchAmber:n.patchRed;return w[0].patch.material=Nt,w[1].patch.material=Nt,s()<.3&&(S.visible=!1),{group:a,rig:o,torso:M,hips:f,headGroup:T,head:_,helmet:b,visor:z,chest:m,vest:p,weapon:W,flash:lt,arms:w,legs:g,parts:{head:_,torso:m,vest:p,pelvis:f.children[0],helmet:b,visor:z,weapon:W,flash:lt,leftArm:A.group,rightArm:v.group,leftLeg:g[0].group,rightLeg:g[1].group}}}function uh(i,t,e,n){for(let s=0;s<n.length;s++){const r=n[s];if(i>r.minX-e&&i<r.maxX+e&&t>r.minZ-e&&t<r.maxZ+e)return!0}return!1}function gx(i,t,e){for(let n=0;n<2;n++)for(let s=0;s<e.length;s++){const r=e[s];if(i.x>r.minX-t&&i.x<r.maxX+t&&i.z>r.minZ-t&&i.z<r.maxZ+t){const a=i.x-(r.minX-t),o=r.maxX+t-i.x,l=i.z-(r.minZ-t),c=r.maxZ+t-i.z,h=Math.min(a,o,l,c);h===a?i.x=r.minX-t:h===o?i.x=r.maxX+t:h===l?i.z=r.minZ-t:i.z=r.maxZ+t}}}const Mi=new C,ji=new C,fh=new C,Ds=new C,_x=new C,Is=new C,Vr=new C,xx=new C,Wr=new C,ts=new C;class vx{constructor(t,e={}){this.scene=t,this.config=e||{},this.world=this.config.world||{},this.spawnPoints=Array.isArray(this.config.spawnPoints)?this.config.spawnPoints:[],this.onPlayerDamage=typeof this.config.onPlayerDamage=="function"?this.config.onPlayerDamage:()=>{},this.onKill=typeof this.config.onKill=="function"?this.config.onKill:()=>{},this.onEnemyShoot=typeof this.config.onEnemyShoot=="function"?this.config.onEnemyShoot:()=>{},this.onImpact=typeof this.config.onImpact=="function"?this.config.onImpact:()=>{},this._enemies=[],this._targets=[],this._spawnQueue=[],this._waveNumber=0,this._nextId=1,this._elapsed=0,this._playerPosition=new C,this._hasPlayerPosition=!1,this._raycaster=new nu,this._raycaster.far=100,this._muzzleLights=[],this._muzzleLightCursor=0,this._createMuzzleLights()}get aliveCount(){let t=0;for(let e=0;e<this._enemies.length;e++)this._enemies[e].alive&&t++;return t}get waveNumber(){return this._waveNumber}getTargets(){return this._targets}spawnWave(t){this._waveNumber++;const n=Number.isFinite(t)?Math.max(0,Math.floor(t)):4+this._waveNumber*2,s=Math.min(3,Math.floor((this._waveNumber-1)/2)),r=n>0?n+s:0;if(r<=0)return 0;const a=2;for(let o=0;o<r;o++){const l=r===1?0:o/(r-1)*a;this._spawnQueue.push({delay:l+(o===0?0:Math.random()*.07),wave:this._waveNumber})}return r}reset(){for(let t=0;t<this._enemies.length;t++){const e=this._enemies[t];e.group&&e.group.parent&&e.group.parent.remove(e.group),this._disposeDeathMaterials(e)}this._enemies.length=0,this._targets.length=0,this._spawnQueue.length=0,this._waveNumber=0,this._nextId=1,this._elapsed=0;for(let t=0;t<this._muzzleLights.length;t++){const e=this._muzzleLights[t];e.life=0,e.light.intensity=0}}damage(t,e,n){if(!t||!t.alive)return;if(t.lastHitPart=e,t.flinch=Math.min(1.25,t.flinch+.8),t.flinchDir=Math.random()<.5?-1:1,e==="head"){t.health=0,this._kill(t,!0);return}const s=Number.isFinite(n)?Math.max(0,n):34;t.health-=s,t.health<=0&&(t.health=0,this._kill(t,!1))}_createMuzzleLights(){if(this.scene)for(let t=0;t<2;t++){const e=new ai(16752714,0,7,2);e.name="enemyMuzzleLight",e.castShadow=!1,this.scene.add(e),this._muzzleLights.push({light:e,life:0})}}_processSpawnQueue(t){for(let e=this._spawnQueue.length-1;e>=0;e--){const n=this._spawnQueue[e];n.delay-=t,n.delay<=0&&(this._spawnQueue.splice(e,1),this._spawnOne(n.wave))}}_spawnOne(t){const e=this._pickSpawnPosition(),n=Math.random()*3|0,s=(Math.random()*2147483647|0)^t*7919^this._nextId*104729,r=mx(s,n),a={id:this._nextId++,group:r.group,rig:r.rig,model:r,parts:r.parts,position:e.clone(),baseY:e.y,velocity:new C,health:100,maxHealth:100,alive:!0,removed:!1,wave:t,aggression:1+(t-1)*.045,speedBase:1.95+Math.random()*.5,yaw:Math.random()*li,walkPhase:Math.random()*li,phase:Math.random()*li,time:Math.random()*12,distance:99,hasLOS:!1,losTimer:Math.random()*.3,strafeDir:Math.random()<.5?-1:1,strafeTimer:1.4+Math.random()*2.4,repositionTimer:0,repositionCooldown:3.5+Math.random()*3.5,fireCooldown:.75+Math.random()*1.5,burstShots:0,shotTimer:0,flashTimer:0,recoil:0,flinch:0,flinchDir:1,aimBlend:.55,animSpeed:0,deathTime:0,deathSide:Math.random()<.5?-1:1,deathTwist:(Math.random()-.5)*.45,deathMaterials:null,deathFadeStarted:!1,lastHitPart:null};a.group.position.copy(a.position),a.group.rotation.y=a.yaw;const o=[];r.group.traverse(l=>{l.isMesh&&!l.userData.ignoreHit&&(l.userData.enemy=a,l.userData.part!=="head"&&(l.userData.part="body"),o.push(l))}),a.hitMeshes=o,this.scene&&this.scene.add(a.group),this._enemies.push(a);for(let l=0;l<o.length;l++)this._targets.push(o[l])}_pickSpawnPosition(){const t=this.spawnPoints,e=this.world.colliders||[];let n=null,s=-1/0;for(let r=0;r<8;r++){let a,o,l=0;if(t.length>0){const u=t[Math.random()*t.length|0];a=u.x+(Math.random()-.5)*3.2,o=u.z+(Math.random()-.5)*3.2,l=u.y||0}else{const u=Math.random()*li,f=17+Math.random()*6;a=Math.cos(u)*f,o=Math.sin(u)*f}const c=new C(a,l,o);this._collide(c,.38);let h=1/0;for(let u=0;u<this._enemies.length;u++){const f=this._enemies[u];if(!f.alive)continue;const d=f.position.x-c.x,g=f.position.z-c.z;h=Math.min(h,Math.sqrt(d*d+g*g))}if(this._hasPlayerPosition){const u=this._playerPosition.x-c.x,f=this._playerPosition.z-c.z;Math.sqrt(u*u+f*f)<7&&(h-=10)}if(uh(c.x,c.z,.36,e)||(h+=4),h>s&&(s=h,n=c),h>6)break}return n||new C(0,0,18)}_collide(t,e){typeof this.world.collide=="function"?this.world.collide(t,e):gx(t,e,this.world.colliders||[])}_kill(t,e){t.alive&&(t.alive=!1,t.health=0,t.deathTime=0,t.burstShots=0,t.flashTimer=0,t.model.flash.visible=!1,t.model.weapon.visible=!0,this._targets=this._targets.filter(n=>n.userData.enemy!==t),this._cloneDeathMaterials(t),this.onKill(t,e))}_cloneDeathMaterials(t){const e=new Map;t.group.traverse(n=>{if(!n.isMesh)return;const s=n.material;if(!s)return;let r=e.get(s);r||(r=s.clone(),r.transparent=!1,r.opacity=1,e.set(s,r)),n.material=r}),t.deathMaterials=Array.from(e.values())}_disposeDeathMaterials(t){if(t.deathMaterials){for(let e=0;e<t.deathMaterials.length;e++)t.deathMaterials[e].dispose();t.deathMaterials=null}}update(t,e,n){if(t=Number.isFinite(t)?gn(t,0,.1):0,t<=0)return;this._elapsed+=t,e&&Number.isFinite(e.x)?(this._playerPosition.copy(e),this._hasPlayerPosition=!0):this._hasPlayerPosition||this._playerPosition.set(0,0,0),n&&n.position?Vr.copy(n.position):(Vr.copy(this._playerPosition),Vr.y+=1.6),this._processSpawnQueue(t),this._updateMuzzleLights(t);let s=!1;for(let r=0;r<this._enemies.length;r++){const a=this._enemies[r];if(a.removed){s=!0;continue}if(!a.alive){this._updateDeath(a,t),a.removed&&(s=!0);continue}a.time+=t,this._updateEnemy(a,t,this._playerPosition,Vr)}s&&(this._enemies=this._enemies.filter(r=>!r.removed))}_updateEnemy(t,e,n,s){const r=n.x-t.position.x,a=n.z-t.position.z,o=Math.sqrt(r*r+a*a);t.distance=o;const l=Math.atan2(r,a);t.yaw=hx(t.yaw,l,9,e),t.group.rotation.y=t.yaw,t.losTimer-=e,t.losTimer<=0&&(t.hasLOS=this._hasLineOfSight(t,s),t.losTimer=.22+Math.random()*.2);const c=xx.set(0,0,0),h=t.hasLOS;if(o>16||!h&&o>6.5){c.set(r,0,a),c.lengthSq()>1e-4&&c.normalize();const v=Mi.set(a,0,-r);v.lengthSq()>1e-4&&(v.normalize().multiplyScalar(t.strafeDir*.18),c.add(v))}else if(o<8){c.set(-r,0,-a),c.lengthSq()>1e-4&&c.normalize();const v=Mi.set(a,0,-r);v.lengthSq()>1e-4&&(v.normalize().multiplyScalar(t.strafeDir*.45),c.add(v))}else{const v=Mi.set(a,0,-r);v.lengthSq()>1e-4&&v.normalize().multiplyScalar(t.strafeDir);const A=ji.set(r,0,a);if(A.lengthSq()>1e-4&&A.normalize().multiplyScalar(gn((o-12)*.07,-.35,.35)),c.copy(v).add(A),t.repositionTimer>0){const T=fh.set(r,0,a);T.lengthSq()>1e-4&&(T.normalize().multiplyScalar(o>12?.85:-.6),c.add(T))}}ts.set(0,0,0);for(let v=0;v<this._enemies.length;v++){const A=this._enemies[v];if(A===t||!A.alive)continue;const T=t.position.x-A.position.x,_=t.position.z-A.position.z,b=T*T+_*_;if(b<2.56&&b>1e-4){const L=Math.sqrt(b),R=(1.6-L)/1.6;ts.x+=T/L*R,ts.z+=_/L*R}}o<2.2&&o>.001&&(ts.x-=r/o*.9,ts.z-=a/o*.9),c.addScaledVector(ts,.85),c.y=0,c.lengthSq()>1e-4&&c.normalize();const u=this._avoidObstacles(t.position,c,.42,1.15);let f;o>16?(f=t.speedBase*1.05*t.aggression,o>28&&(f*=1.12)):o<8?f=1.45+(8-o)*.06:(f=1.25+.15*t.aggression,h||(f=t.speedBase*t.aggression)),t.repositionTimer>0&&(f*=1.12);const d=1-Math.exp(-7*e);t.velocity.x+=(u.x*f-t.velocity.x)*d,t.velocity.z+=(u.z*f-t.velocity.z)*d;const g=t.position.x,M=t.position.z;t.position.x+=t.velocity.x*e,t.position.z+=t.velocity.z*e,this._collide(t.position,.38),t.position.y=t.baseY;const m=t.position.x-g,p=t.position.z-M,S=Math.sqrt(m*m+p*p)/e;t.animSpeed+=(Math.min(S,4)-t.animSpeed)*(1-Math.exp(-10*e)),t.group.position.copy(t.position),t.strafeTimer-=e,t.strafeTimer<=0&&(t.strafeDir*=-1,t.strafeTimer=1.5+Math.random()*2.5),t.repositionCooldown-=e,t.repositionCooldown<=0&&o<26&&h&&(t.repositionTimer=.65+Math.random()*.9,t.repositionCooldown=3.2+Math.random()*4,t.strafeDir*=-1),t.repositionTimer=Math.max(0,t.repositionTimer-e);const w=h&&o<34?1:o<12?.9:.35;t.aimBlend+=(w-t.aimBlend)*(1-Math.exp(-3.2*e)),this._updateCombat(t,e,s,o),this._animateAlive(t,e)}_avoidObstacles(t,e,n,s){if(e.lengthSq()<1e-4)return Wr.set(0,0,0);const r=this.world.colliders||[];if(!r.length)return Wr.copy(e).normalize();const a=[0,35*Gr,-35*Gr,70*Gr,-70*Gr];for(let o=0;o<a.length;o++){Ds.copy(e).applyAxisAngle(ch,a[o]);let l=!0;const c=[.55,s];for(let h=0;h<c.length;h++){const u=c[h];if(uh(t.x+Ds.x*u,t.z+Ds.z*u,n,r)){l=!1;break}}if(l)return Wr.copy(Ds).normalize()}return Wr.copy(e).normalize()}_hasLineOfSight(t,e){const n=this.world.raycastMeshes;if(!Array.isArray(n)||n.length===0)return!0;Mi.set(t.position.x,t.position.y+1.35,t.position.z),ji.copy(e).sub(Mi);const s=ji.length();return s<.1?!0:(ji.multiplyScalar(1/s),this._raycaster.set(Mi,ji),this._raycaster.far=Math.max(.1,s-.4),this._raycaster.intersectObjects(n,!0).length===0)}_updateCombat(t,e,n,s){if(t.flashTimer=Math.max(0,t.flashTimer-e),t.flashTimer<=0&&(t.model.flash.visible=!1),t.recoil=Math.max(0,t.recoil-e*14),t.fireCooldown-=e,t.burstShots>0){if(!t.hasLOS||s>42){t.burstShots=0,t.fireCooldown=Math.max(t.fireCooldown,.35);return}t.shotTimer-=e,t.shotTimer<=0&&(this._fireShot(t,n,s),t.burstShots--,t.shotTimer=.095+Math.random()*.06)}else if(t.fireCooldown<=0&&t.hasLOS&&s<40){t.burstShots=2+(Math.random()*3|0),t.shotTimer=.01+Math.random()*.035;const r=1+Math.random()*1.2;t.fireCooldown=r/Math.min(1.16,t.aggression)}}_fireShot(t,e,n){t.flashTimer=.055,t.recoil=1;const s=t.model.flash;s.visible=!0,s.scale.setScalar(.18+Math.random()*.11),s.getWorldPosition(Is),this._flashMuzzle(Is);const r=gn((n-6)/20,0,1),a=gn(.36-r*.1+(t.aggression-1)*.05,.22,.36),o=Math.random()<a,l=Mi.copy(e);if(o)l.x+=(Math.random()-.5)*.22,l.y+=(Math.random()-.5)*.16,l.z+=(Math.random()-.5)*.22;else{const c=ji.copy(e).sub(Is);c.lengthSq()>1e-4&&c.normalize();const h=fh.set(-c.z,0,c.x),u=Math.random()<.5?-1:1,f=.55+Math.random()*1.75;l.copy(e).addScaledVector(h,u*f).addScaledVector(ch,(Math.random()-.35)*1).addScaledVector(c,.5+Math.random()*3);const d=this._findImpact(Is,l);d&&(l.copy(d.point),this.onImpact(d.point,d.normal))}if(this.onEnemyShoot(Is.clone(),l.clone()),o){const c=5+Math.random()*4,h=Ds.copy(t.position);h.y+=1.2,this.onPlayerDamage(c,h.clone())}}_findImpact(t,e){const n=this.world.raycastMeshes;if(!Array.isArray(n)||n.length===0)return null;const s=_x.copy(e).sub(t),r=s.length();if(r<.05)return null;s.multiplyScalar(1/r),this._raycaster.set(t,s),this._raycaster.far=r;const a=this._raycaster.intersectObjects(n,!0);if(a.length===0)return null;const o=a[0],l=new C(0,1,0);return o.face&&o.face.normal&&l.copy(o.face.normal).transformDirection(o.object.matrixWorld).normalize(),{point:o.point.clone(),normal:l}}_flashMuzzle(t){if(this._muzzleLights.length===0)return;const e=this._muzzleLightCursor%this._muzzleLights.length;this._muzzleLightCursor++;const n=this._muzzleLights[e];n.light.position.copy(t),n.light.intensity=18,n.life=.065}_updateMuzzleLights(t){for(let e=0;e<this._muzzleLights.length;e++){const n=this._muzzleLights[e];n.life<=0||(n.life-=t,n.life<=0?(n.life=0,n.light.intensity=0):n.light.intensity=n.life/.065*18)}}_animateAlive(t,e){const n=t.model,s=t.animSpeed,r=gn(s/2.6,0,1),a=gn((s-1.55)/1.25,0,1);t.walkPhase+=e*(2.4+s*3.2);const o=t.walkPhase,l=1-r*.85,c=Math.sin(t.time*1.7+t.phase)*l;t.flinch=Math.max(0,t.flinch-e*4);const h=t.flinch,u=t.aimBlend;for(let M=0;M<n.legs.length;M++){const m=n.legs[M],p=o+(m.side>0?Math.PI:0),S=Math.sin(p)*(.44+a*.25)*r,w=(1-r)*.045;m.group.rotation.x=-S+(m.side<0?-w:w*.75),m.group.rotation.z=m.side*(.018+(1-r)*.018),m.knee.rotation.x=.035+(1-r)*.045+Math.max(0,-Math.sin(p))*(.55+a*.42)*r}const f=Math.abs(Math.sin(o*2))*(.015+a*.028)*r;n.rig.position.y=f,n.rig.position.z=-.035*h,n.torso.position.y=.94+c*.006,n.torso.rotation.x=-.035-h*.16+a*.035,n.torso.rotation.z=Math.sin(t.time*.8+t.phase)*.008+h*.05*t.flinchDir,n.torso.rotation.y=Math.sin(t.time*.5+t.phase)*.012,n.headGroup.rotation.x=-.02-h*.1,n.headGroup.rotation.y=Math.sin(t.time*.55+t.phase)*.06*(1-u*.7),n.headGroup.rotation.z=h*.2*t.flinchDir;const d=Math.sin(o)*(.045+a*.1)*r;n.arms[1].group.rotation.x=-.55-d+(1-u)*.1+c*.006,n.arms[1].group.rotation.z=-.18,n.arms[1].elbow.rotation.x=-.9+d*.45,n.arms[0].group.rotation.x=-.75+d*.75+(1-u)*.12+c*.006,n.arms[0].group.rotation.z=.18,n.arms[0].elbow.rotation.x=-.75-d*.35;const g=t.recoil;n.weapon.position.y=.27-(1-u)*.025,n.weapon.position.z=.285-g*.022,n.weapon.rotation.x=.015+(1-u)*.08-g*.055,n.weapon.rotation.y=-.12+Math.sin(t.time*.9+t.phase)*.006}_updateDeath(t,e){t.deathTime+=e;const n=t.deathTime,s=t.model,r=hh(n/1.05),a=hh(n/.85);if(s.rig.rotation.x=-1.48*r,s.rig.rotation.z=t.deathSide*.42*r,s.rig.rotation.y=t.deathTwist*r,s.rig.position.y=-.02*r,s.rig.position.z=-.1*r,s.arms[0].group.rotation.x=-.75+.62*a,s.arms[0].group.rotation.z=.18+.32*a,s.arms[0].elbow.rotation.x=-.75+.55*a,s.arms[1].group.rotation.x=-.55+.48*a,s.arms[1].group.rotation.z=-.18-.28*a,s.arms[1].elbow.rotation.x=-.9+.65*a,s.legs[0].group.rotation.x=-.1*a,s.legs[0].knee.rotation.x=.035+.22*a,s.legs[1].group.rotation.x=.12*a,s.legs[1].knee.rotation.x=.035+.32*a,s.headGroup.rotation.x=-.02+.35*a,s.headGroup.rotation.z=t.deathSide*.22*a,s.torso.rotation.x=-.035+.08*a,s.torso.rotation.z=0,s.weapon.rotation.x=.015,s.weapon.rotation.y=-.12,n>8){if(!t.deathFadeStarted){if(t.deathFadeStarted=!0,t.deathMaterials)for(let l=0;l<t.deathMaterials.length;l++){const c=t.deathMaterials[l];c.transparent=!0,c.depthWrite=!1,c.needsUpdate=!0}s.group.traverse(l=>{l.isMesh&&(l.castShadow=!1,l.receiveShadow=!1)})}const o=gn((n-8)/1.6,0,1);if(t.group.position.y=t.baseY-1.25*o,t.deathMaterials){const l=1-o;for(let c=0;c<t.deathMaterials.length;c++)t.deathMaterials[c].opacity=l}}n>10&&(t.group.parent&&t.group.parent.remove(t.group),this._disposeDeathMaterials(t),t.removed=!0)}}class Mx{constructor(t){this.scene=t,this.time=0,this.tracers=[],this.sparks=[],this.puffs=[],this.decals=[],this.flashes=[];const e=new Yt(.018,.018,1);e.translate(0,0,-.5);const n=new rn({color:16765066,transparent:!0,opacity:.9,blending:en,depthWrite:!1});for(let f=0;f<32;f++){const d=new Dt(e,n.clone());d.visible=!1,d.frustumCulled=!1,t.add(d),this.tracers.push({mesh:d,life:0,max:.06})}const s=260,r=new Ee,a=new Float32Array(s*3);a.fill(-9999),r.setAttribute("position",new sn(a,3));const o=new $s({color:16757086,size:.045,transparent:!0,opacity:.95,blending:en,depthWrite:!1,sizeAttenuation:!0});this.sparkPoints=new ca(r,o),this.sparkPoints.frustumCulled=!1,t.add(this.sparkPoints),this.sparkData=Array.from({length:s},()=>({life:0,max:1,vel:new C,pos:new C})),this.sparkIndex=0;const l=new Ee,c=new Float32Array(360);c.fill(-9999),l.setAttribute("position",new sn(c,3));const h=new $s({color:9379090,size:.06,transparent:!0,opacity:.9,depthWrite:!1,sizeAttenuation:!0});this.bloodPoints=new ca(l,h),this.bloodPoints.frustumCulled=!1,t.add(this.bloodPoints),this.bloodData=Array.from({length:120},()=>({life:0,max:1,vel:new C,pos:new C})),this.bloodIndex=0;const u=Yo();for(let f=0;f<24;f++){const d=new yi({map:u,color:10325108,transparent:!0,opacity:0,depthWrite:!1}),g=new bi(d);g.visible=!1,t.add(g),this.puffs.push({sprite:g,life:0,max:1,vel:new C,grow:1})}this.puffIndex=0;for(let f=0;f<2;f++){const d=new ai(16756832,0,9,2);d.visible=!1,t.add(d),this.flashes.push({light:d,life:0})}this.flashIndex=0,this.decalIndex=0,this.maxDecals=36}tracer(t,e,n=16765066,s=1){const r=this.tracers.find(o=>o.life<=0)||this.tracers[0],a=t.distanceTo(e);a<.2||(r.mesh.position.copy(t),r.mesh.lookAt(e),r.mesh.scale.set(s,s,a),r.mesh.material.color.setHex(n),r.mesh.material.opacity=.95,r.mesh.visible=!0,r.life=.055,r.max=.055)}sparksAt(t,e,n=10,s=16757086){const r=this.sparkPoints.geometry.attributes.position.array;for(let a=0;a<n;a++){const o=this.sparkData[this.sparkIndex];o.pos.copy(t),o.vel.set(e.x*2.2+(Math.random()-.5)*4.5,e.y*2.2+Math.random()*4.5,e.z*2.2+(Math.random()-.5)*4.5),o.life=o.max=.22+Math.random()*.45;const l=this.sparkIndex*3;r[l]=t.x,r[l+1]=t.y,r[l+2]=t.z,this.sparkIndex=(this.sparkIndex+1)%this.sparkData.length}this.sparkPoints.material.color.setHex(s),this.sparkPoints.geometry.attributes.position.needsUpdate=!0}bloodAt(t,e,n=8){const s=this.bloodPoints.geometry.attributes.position.array;for(let r=0;r<n;r++){const a=this.bloodData[this.bloodIndex];a.pos.copy(t),a.vel.copy(e).multiplyScalar(.8).add(new C((Math.random()-.5)*2.4,Math.random()*1.8,(Math.random()-.5)*2.4)),a.life=a.max=.35+Math.random()*.4;const o=this.bloodIndex*3;s[o]=t.x,s[o+1]=t.y,s[o+2]=t.z,this.bloodIndex=(this.bloodIndex+1)%this.bloodData.length}this.bloodPoints.geometry.attributes.position.needsUpdate=!0}puff(t,e=.4,n=10325108,s=.4,r=.8){const a=this.puffs[this.puffIndex];this.puffIndex=(this.puffIndex+1)%this.puffs.length,a.sprite.position.copy(t),a.sprite.scale.setScalar(e),a.sprite.material.color.setHex(n),a.sprite.material.opacity=s,a.sprite.visible=!0,a.life=a.max=r,a.grow=e,a.vel.set((Math.random()-.5)*.5,.5+Math.random()*.4,(Math.random()-.5)*.5)}impact(t,e,n="concrete"){if(this.sparksAt(t,e,8,n==="metal"?16769696:16757086),this.puff(t,.22,n==="metal"?8223346:10851450,.5,.55),this.flash(t,16752720,6),this.decals.length<this.maxDecals){const s=new Dt(new un(.22,.22),new rn({map:qo("scorch",88),transparent:!0,opacity:.75,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-3}));s.position.copy(t).addScaledVector(e,.012),s.lookAt(t.clone().add(e)),this.scene.add(s),this.decals.push({mesh:s,life:20})}else{const s=this.decals[this.decalIndex];this.decalIndex=(this.decalIndex+1)%this.maxDecals,s.mesh.position.copy(t).addScaledVector(e,.012),s.mesh.lookAt(t.clone().add(e)),s.life=20}}flash(t,e=16752720,n=12,s=7){const r=this.flashes[this.flashIndex];this.flashIndex=(this.flashIndex+1)%this.flashes.length,r.light.position.copy(t),r.light.color.setHex(e),r.light.distance=s,r.light.intensity=n,r.light.visible=!0,r.life=.07}explosion(t){this.flash(t,16742948,140,24),this.sparksAt(t,new C(0,1,0),70,16752704);for(let e=0;e<10;e++){const n=t.clone().add(new C((Math.random()-.5)*1.4,Math.random()*.8,(Math.random()-.5)*1.4));this.puff(n,1+Math.random()*1.6,3812901,.55,1.8)}}update(t){this.time+=t;for(const s of this.tracers)s.life>0&&(s.life-=t,s.mesh.material.opacity=Math.max(0,s.life/s.max)*.95,s.life<=0&&(s.mesh.visible=!1));const e=this.sparkPoints.geometry.attributes.position.array;for(let s=0;s<this.sparkData.length;s++){const r=this.sparkData[s];if(r.life<=0)continue;r.life-=t,r.vel.y-=11*t,r.pos.addScaledVector(r.vel,t);const a=s*3;e[a]=r.pos.x,e[a+1]=r.pos.y,e[a+2]=r.pos.z}this.sparkPoints.geometry.attributes.position.needsUpdate=!0,this.sparkPoints.material.opacity=.9;const n=this.bloodPoints.geometry.attributes.position.array;for(let s=0;s<this.bloodData.length;s++){const r=this.bloodData[s];if(r.life<=0)continue;r.life-=t,r.vel.y-=9*t,r.pos.addScaledVector(r.vel,t);const a=s*3;n[a]=r.pos.x,n[a+1]=r.pos.y,n[a+2]=r.pos.z}this.bloodPoints.geometry.attributes.position.needsUpdate=!0;for(const s of this.puffs){if(s.life<=0)continue;s.life-=t;const r=1-s.life/s.max;s.sprite.position.addScaledVector(s.vel,t),s.sprite.scale.setScalar(s.grow+r*1.3),s.sprite.material.opacity=Math.max(0,(1-r)*.5),s.life<=0&&(s.sprite.visible=!1)}for(const s of this.flashes)s.life>0&&(s.life-=t,s.life<=0&&(s.light.intensity=0,s.light.visible=!1));for(const s of this.decals)s.life-=t,s.life<=0&&(s.mesh.visible=!1)}}class Sx{constructor(){this.el={hud:document.getElementById("hud"),healthValue:document.getElementById("health-value"),healthFill:document.getElementById("health-fill"),status:document.getElementById("status-text"),ammoMag:document.getElementById("ammo-mag"),ammoReserve:document.getElementById("ammo-reserve"),reloadHint:document.getElementById("reload-hint"),wave:document.getElementById("wave-label"),enemyCount:document.getElementById("enemy-count"),objective:document.getElementById("objective-text"),score:document.getElementById("score"),killfeed:document.getElementById("killfeed"),crosshair:document.getElementById("crosshair"),hitmarker:document.getElementById("hitmarker"),damage:document.getElementById("damage"),lowHealth:document.getElementById("low-health"),banner:document.getElementById("banner"),bannerKicker:document.getElementById("banner-kicker"),bannerTitle:document.getElementById("banner-title"),bannerSub:document.getElementById("banner-sub"),compass:document.getElementById("compass-strip"),heading:document.getElementById("heading"),minimap:document.getElementById("minimap"),hint:document.getElementById("hint"),fps:document.getElementById("fps")},this.mapCtx=this.el.minimap.getContext("2d"),this.kills=[],this.bannerTimer=0,this.damageTimer=0,this.hitTimer=0,this.mapTimer=0,this.buildCompass(),this.setHealth(100),this.setAmmo(30,120)}show(){this.el.hud.classList.remove("hidden")}hide(){this.el.hud.classList.add("hidden")}buildCompass(){const t=document.createDocumentFragment(),e={0:"N",45:"NE",90:"E",135:"SE",180:"S",225:"SW",270:"W",315:"NW"};for(let n=-360;n<=720;n+=15){const s=(n%360+360)%360,r=document.createElement("div");r.className="compass-tick"+(s%90===0?" major":""),r.textContent=e[s]||(s%45===0?String(s).padStart(3,"0"):""),t.appendChild(r)}this.el.compass.appendChild(t),this.tickWidth=34}updateCompass(t){const e=(-t*180/Math.PI%360+360)%360,n=-(e/15+24)*this.tickWidth;this.el.compass.style.transform=`translateX(${n.toFixed(1)}px)`,this.el.heading.textContent=String(Math.round(e)%360).padStart(3,"0")}setHealth(t){const e=Math.max(0,Math.min(100,t));this.el.healthValue.textContent=String(Math.ceil(e)),this.el.healthFill.style.width=`${e}%`,this.el.healthFill.classList.toggle("low",e<35),this.el.lowHealth.classList.toggle("active",e>0&&e<30),this.el.status.textContent=e<30?"CRITICAL":e<60?"WOUNDED":"COMBAT READY"}setAmmo(t,e){this.el.ammoMag.textContent=String(t),this.el.ammoReserve.textContent=String(e),this.el.ammoMag.classList.toggle("empty",t===0),this.el.reloadHint.classList.toggle("show",t===0&&e>0)}setReloading(t){this.el.reloadHint.classList.toggle("show",t)}setWave(t,e){this.el.wave.textContent=`WAVE ${String(t).padStart(2,"0")}`,this.el.enemyCount.textContent=`HOSTILES ${String(e).padStart(2,"0")}`,this.el.objective.textContent=t>3?"BREAK THE FINAL ASSAULT":"HOLD THE COMPOUND"}setScore(t){this.el.score.textContent=String(t).padStart(6,"0")}setSpread(t){this.el.crosshair.style.setProperty("--spread",`${(5+t*420).toFixed(1)}px`)}setADS(t){this.el.crosshair.classList.toggle("ads",t)}hit(t=!1){const e=this.el.hitmarker;e.classList.remove("active","kill"),e.offsetWidth,e.classList.add("active"),t&&e.classList.add("kill"),this.hitTimer=t?.3:.18}damage(t){this.damageTimer=Math.min(.65,.18+t*.035),this.el.damage.style.opacity=String(Math.min(.95,.28+t*.06))}banner(t,e,n,s=2.6){this.el.bannerKicker.textContent=t,this.el.bannerTitle.textContent=e,this.el.bannerSub.textContent=n,this.el.banner.classList.add("show"),this.bannerTimer=s}killfeed(t=!1,e="HOSTILE"){const n=document.createElement("div");for(n.className="kill-entry",n.innerHTML=`YOU <b>›</b> ${e}${t?'<span class="hs">HEADSHOT</span>':""}`,this.el.killfeed.prepend(n),this.kills.push({el:n,life:4.2});this.el.killfeed.children.length>5;)this.el.killfeed.lastChild.remove()}hint(t){this.el.hint.textContent=t}update(t,e,n,s,r){this.updateCompass(r),this.bannerTimer>0&&(this.bannerTimer-=t,this.bannerTimer<=0&&this.el.banner.classList.remove("show")),this.damageTimer>0&&(this.damageTimer-=t,this.damageTimer<=0&&(this.el.damage.style.opacity="0")),this.hitTimer>0&&(this.hitTimer-=t);for(const a of this.kills)a.life-=t,a.life<=0&&a.el.remove();this.kills=this.kills.filter(a=>a.life>0),this.mapTimer-=t,this.mapTimer<=0&&e&&(this.mapTimer=.08,this.drawMap(e,n,s,r))}drawMap(t,e,n,s){const r=this.mapCtx,a=190,o=190,l=2.25,c=a/2,h=o/2;r.clearRect(0,0,a,o),r.fillStyle="rgba(6,9,8,0.72)",r.fillRect(0,0,a,o),r.strokeStyle="rgba(216,196,162,0.12)",r.lineWidth=1;for(const g of[26,52,78])r.beginPath(),r.arc(c,h,g,0,Math.PI*2),r.stroke();r.beginPath(),r.moveTo(c,8),r.lineTo(c,o-8),r.moveTo(8,h),r.lineTo(a-8,h),r.stroke(),r.fillStyle="rgba(190,170,136,0.17)";for(const g of n){const M=c+g.minX*l,m=h+g.minZ*l,p=(g.maxX-g.minX)*l,S=(g.maxZ-g.minZ)*l;M+p<0||M>a||m+S<0||m>o||r.fillRect(M,m,p,S)}for(const g of e){if(!g||!g.alive)continue;const M=c+g.group.position.x*l,m=h+g.group.position.z*l;r.fillStyle="#ff3f30",r.beginPath(),r.arc(M,m,2.4,0,Math.PI*2),r.fill(),r.strokeStyle="rgba(255,63,48,0.25)",r.beginPath(),r.arc(M,m,5.5,0,Math.PI*2),r.stroke()}const u=c+t.x*l,f=h+t.z*l;r.save(),r.translate(u,f),r.rotate(-s),r.fillStyle="#ffc46b",r.beginPath(),r.moveTo(0,-7),r.lineTo(5,5),r.lineTo(0,2.5),r.lineTo(-5,5),r.closePath(),r.fill(),r.restore(),r.save(),r.translate(u,f),r.rotate(-s);const d=r.createLinearGradient(0,0,0,-44);d.addColorStop(0,"rgba(245,167,66,0.20)"),d.addColorStop(1,"rgba(245,167,66,0)"),r.fillStyle=d,r.beginPath(),r.moveTo(0,0),r.lineTo(-24,-44),r.lineTo(24,-44),r.closePath(),r.fill(),r.restore()}}class yx{constructor(){this.ctx=null,this.master=null,this.started=!1,this.stepTimer=0,this.enemyShotCooldown=0}start(){if(this.ctx){this.ctx.state==="suspended"&&this.ctx.resume();return}const t=window.AudioContext||window.webkitAudioContext;if(!t)return;this.ctx=new t,this.master=this.ctx.createGain(),this.master.gain.value=.55;const e=this.ctx.createDynamicsCompressor();e.threshold.value=-18,e.knee.value=20,e.ratio.value=6,e.attack.value=.003,e.release.value=.18,this.master.connect(e).connect(this.ctx.destination),this.noise=this.makeNoise(2),this.started=!0,this.ambient()}makeNoise(t=1){const e=Math.floor(this.ctx.sampleRate*t),n=this.ctx.createBuffer(1,e,this.ctx.sampleRate),s=n.getChannelData(0);for(let r=0;r<e;r++)s[r]=Math.random()*2-1;return n}ambient(){const t=this.ctx,e=t.createBufferSource();e.buffer=this.noise,e.loop=!0;const n=t.createBiquadFilter();n.type="lowpass",n.frequency.value=380,n.Q.value=.4;const s=t.createGain();s.gain.value=.05,e.connect(n).connect(s).connect(this.master),e.start();const r=t.createOscillator();r.frequency.value=.07;const a=t.createGain();a.gain.value=.025,r.connect(a).connect(s.gain),r.start()}noiseBurst({duration:t=.12,gain:e=.5,freq:n=900,q:s=.7,type:r="bandpass",pan:a=0}={}){if(!this.started)return;const o=this.ctx,l=o.createBufferSource();l.buffer=this.noise;const c=o.createBiquadFilter();c.type=r,c.frequency.value=n,c.Q.value=s;const h=o.createGain(),u=o.currentTime;h.gain.setValueAtTime(1e-4,u),h.gain.exponentialRampToValueAtTime(e,u+.005),h.gain.exponentialRampToValueAtTime(1e-4,u+t);const f=o.createStereoPanner();f.pan.value=a,l.connect(c).connect(h).connect(f).connect(this.master),l.start(u),l.stop(u+t+.02)}tone({freq:t=200,end:e=60,duration:n=.2,gain:s=.4,type:r="sine",pan:a=0}={}){if(!this.started)return;const o=this.ctx,l=o.createOscillator();l.type=r;const c=o.createGain(),h=o.currentTime;l.frequency.setValueAtTime(t,h),l.frequency.exponentialRampToValueAtTime(Math.max(20,e),h+n),c.gain.setValueAtTime(s,h),c.gain.exponentialRampToValueAtTime(1e-4,h+n);const u=o.createStereoPanner();u.pan.value=a,l.connect(c).connect(u).connect(this.master),l.start(h),l.stop(h+n+.02)}shot(){this.started&&(this.noiseBurst({duration:.16,gain:.75,freq:1400,q:.6}),this.noiseBurst({duration:.5,gain:.25,freq:500,q:.4}),this.tone({freq:150,end:42,duration:.18,gain:.55,type:"triangle"}),this.tone({freq:2400,end:600,duration:.05,gain:.09,type:"square"}))}enemyShot(t=20){if(!this.started||this.enemyShotCooldown>0)return;this.enemyShotCooldown=.05;const e=Math.max(.08,.5-t*.012),n=(Math.random()-.5)*.7;this.noiseBurst({duration:.13,gain:e,freq:900,q:.5,pan:n}),this.tone({freq:120,end:45,duration:.16,gain:e*.7,type:"triangle",pan:n})}hit(){this.tone({freq:1600,end:1200,duration:.045,gain:.15,type:"square"})}headshot(){this.tone({freq:2400,end:1800,duration:.06,gain:.18,type:"square"}),this.tone({freq:1200,end:900,duration:.08,gain:.12,type:"sine"})}kill(){this.tone({freq:520,end:720,duration:.09,gain:.1,type:"sine"})}hurt(){this.noiseBurst({duration:.2,gain:.35,freq:220,q:.8}),this.tone({freq:90,end:55,duration:.25,gain:.3,type:"sine"})}reload(){if(!this.started)return;const t=(e,n,s)=>{window.setTimeout(()=>this.noiseBurst({duration:.035,gain:s,freq:n,q:3}),e*1e3)};t(.12,2200,.18),t(.55,1400,.22),t(1.15,900,.3),t(1.55,1800,.2)}empty(){this.noiseBurst({duration:.04,gain:.22,freq:2600,q:4})}footstep(){this.noiseBurst({duration:.08,gain:.12,freq:240,q:.8})}impact(){this.noiseBurst({duration:.06,gain:.1,freq:1800,q:1})}explosion(){this.noiseBurst({duration:.8,gain:.9,freq:180,q:.4}),this.tone({freq:80,end:30,duration:.9,gain:.7,type:"sine"})}ui(){this.tone({freq:900,end:1100,duration:.05,gain:.08,type:"sine"})}update(t){this.enemyShotCooldown>0&&(this.enemyShotCooldown-=t)}}const _s=document.getElementById("scene"),Rn=new I_({canvas:_s,antialias:!0,powerPreference:"high-performance"});Rn.setPixelRatio(1);Rn.setSize(window.innerWidth,window.innerHeight);Rn.shadowMap.enabled=!0;Rn.shadowMap.type=Bs;Rn.toneMapping=fa;Rn.toneMappingExposure=1.08;Rn.outputColorSpace=He;const rr=new kf,Fe=new _n(72,window.innerWidth/window.innerHeight,.03,600);Fe.rotation.order="YXZ";rr.add(Fe);const Ri=ex(rr,Rn),rs=new Mx(rr),Se=new Sx,De=new yx,Me=new cx;Me.group.visible=!1;Fe.add(Me.group);let hi;hi=new vx(rr,{world:Ri,spawnPoints:Ri.spawnPoints,onPlayerDamage:(i,t)=>Lx(i),onKill:(i,t)=>Px(i,t),onEnemyShoot:(i,t)=>{rs.tracer(i,t,16753230,.75),De.enemyShot(i.distanceTo(Fe.position))},onImpact:(i,t)=>rs.impact(i,t)});const xs=new B_(Rn);xs.addPass(new z_(rr,Fe));const bx=new us(new ft(window.innerWidth,window.innerHeight),.46,.62,.86);xs.addPass(bx);xs.addPass(new G_);const Ex={uniforms:{tDiffuse:{value:null},uTime:{value:0},uResolution:{value:new ft(window.innerWidth,window.innerHeight)}},vertexShader:`
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform vec2 uResolution;
    varying vec2 vUv;
    float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    void main() {
      vec2 uv = vUv;
      vec2 d = uv - 0.5;
      float r = length(d);
      vec2 ca = d * r * 0.0022;
      vec3 col;
      col.r = texture2D(tDiffuse, uv + ca).r;
      col.g = texture2D(tDiffuse, uv).g;
      col.b = texture2D(tDiffuse, uv - ca).b;
      float l = dot(col, vec3(0.299, 0.587, 0.114));
      col = mix(vec3(l), col, 1.07);
      col = (col - 0.5) * 1.045 + 0.5;
      col += vec3(0.012, 0.007, 0.003) * (1.0 - l);
      float vig = smoothstep(0.86, 0.26, r);
      col *= mix(0.68, 1.0, vig);
      float grain = hash(uv * uResolution + fract(uTime) * 91.7) - 0.5;
      col += grain * 0.016;
      gl_FragColor = vec4(max(col, 0.0), 1.0);
    }
  `},Tl=new pu(Ex);xs.addPass(Tl);const _u=new C(0,0,27),I={mode:"menu",time:0,menuTime:0,health:100,score:0,kills:0,wave:0,waveActive:!1,waveGrace:0,waveCooldown:0,playerPos:_u.clone(),velocity:new C,yaw:0,pitch:-.035,lookDX:0,lookDY:0,jumpY:0,vy:0,onGround:!0,crouch:!1,sprinting:!1,ads:!1,firing:!1,shotCooldown:0,emptyCooldown:0,recoilPitch:0,recoilYaw:0,shake:0,bobTime:0,stepTimer:0,lastDamage:-99,dead:!1,pointerLocked:!1,hadLock:!1,eyeHeight:1.68,spread:.012,fps:0,fpsTimer:0,frames:0},mn=Object.create(null),$a=new nu,wx=new C,Tx=new C,Hn=new C,Qa=new C,dh=new C,Xr=new C;window.addEventListener("keydown",i=>{i.repeat||(mn[i.code]=!0,i.code==="KeyR"&&I.mode==="playing"&&Rl(),i.code==="Escape"&&(I.mode==="playing"?vu():I.mode==="paused"&&Mu()),i.code==="KeyM"&&De.master&&(De.master.gain.value=De.master.gain.value>0?0:.55))});window.addEventListener("keyup",i=>{mn[i.code]=!1});window.addEventListener("mousemove",i=>{if(I.mode!=="playing"||!I.pointerLocked)return;const t=I.ads?.0015:.0021;I.yaw-=i.movementX*t,I.pitch-=i.movementY*t,I.pitch=Math.max(-1.42,Math.min(1.42,I.pitch)),I.lookDX+=i.movementX,I.lookDY+=i.movementY});_s.addEventListener("mousedown",i=>{I.mode==="playing"&&(i.button===0&&(I.pointerLocked||Al(),I.firing=!0),i.button===2&&(I.ads=!0))});window.addEventListener("mouseup",i=>{i.button===0&&(I.firing=!1),i.button===2&&(I.ads=!1)});window.addEventListener("contextmenu",i=>i.preventDefault());document.addEventListener("pointerlockchange",()=>{const i=document.pointerLockElement===_s;I.pointerLocked=i,i?I.hadLock=!0:I.hadLock&&I.mode==="playing"&&vu()});function Al(){try{const i=_s.requestPointerLock();i&&i.catch&&i.catch(()=>{})}catch{}}document.getElementById("play").addEventListener("click",()=>{De.start(),xu()});document.getElementById("resume").addEventListener("click",()=>{De.ui(),Mu()});document.getElementById("restart").addEventListener("click",()=>{De.ui(),Su()});document.getElementById("restart-pause").addEventListener("click",()=>{De.ui(),Su()});function xu(){I.mode="playing",I.health=100,I.score=0,I.kills=0,I.wave=0,I.waveActive=!1,I.waveCooldown=.6,I.dead=!1,I.playerPos.copy(_u),I.velocity.set(0,0,0),I.yaw=0,I.pitch=-.035,I.jumpY=0,I.vy=0,I.onGround=!0,I.recoilPitch=0,I.recoilYaw=0,I.shake=0,I.lastDamage=-99,I.crouch=!1,I.ads=!1,I.firing=!1,Me.reset(),Me.group.visible=!0,hi.reset(),Se.show(),Se.setHealth(100),Se.setAmmo(Me.ammoInMag,Me.reserveAmmo),Se.setScore(0),Se.setWave(1,0),Se.banner("OPERATION ZERO HOUR","MOVE OUT","SECURE THE COMPOUND",3);const i=document.getElementById("menu");i.classList.add("closing"),window.setTimeout(()=>{i.style.display="none"},600),Fe.fov=72,Fe.updateProjectionMatrix(),Al(),De.start(),window.setTimeout(()=>{I.mode==="playing"&&yu()},700)}function vu(){I.mode==="playing"&&(I.mode="paused",I.firing=!1,I.ads=!1,Me.setADS(!1),document.getElementById("pause").classList.remove("hidden"),document.pointerLockElement===_s&&document.exitPointerLock())}function Mu(){I.mode==="paused"&&(I.mode="playing",document.getElementById("pause").classList.add("hidden"),Al())}function Su(){document.getElementById("death").classList.add("hidden"),document.getElementById("pause").classList.add("hidden"),I.mode="menu",xu()}function Ax(){I.mode!=="dead"&&(I.mode="dead",I.dead=!0,I.firing=!1,I.ads=!1,Me.setADS(!1),document.pointerLockElement===_s&&document.exitPointerLock(),Se.hide(),Me.group.visible=!1,document.getElementById("death-score").textContent=String(I.score),document.getElementById("death-kills").textContent=String(I.kills),document.getElementById("death-wave").textContent=String(I.wave),document.getElementById("death").classList.remove("hidden"))}function yu(){if(I.mode!=="playing")return;I.wave++,I.waveActive=!0,I.waveGrace=3.5;const i=Math.min(4+I.wave*2,14);hi.spawnWave(i),Se.setWave(I.wave,i),Se.banner("HOSTILE CONTACT",`WAVE ${String(I.wave).padStart(2,"0")}`,"ENGAGE AT WILL",2.8),De.ui()}function Rx(i){if(!I.waveActive){I.waveCooldown>0&&(I.waveCooldown-=i,I.waveCooldown<=0&&yu());return}if(I.waveGrace>0){I.waveGrace-=i;return}if(hi.aliveCount===0){I.waveActive=!1,I.waveCooldown=6;const t=250*I.wave;I.score+=t,Se.setScore(I.score),Se.setWave(I.wave,0),Se.banner("SECTOR CLEAR",`WAVE ${String(I.wave).padStart(2,"0")} CLEARED`,`+${t} // REGROUP`,3.4),De.ui()}else Se.setWave(I.wave,hi.aliveCount)}function Rl(){Me.isReloading||Me.ammoInMag>=30||Me.reserveAmmo<=0||Me.reload()&&(Se.setReloading(!0),De.reload())}function Cx(){if(I.shotCooldown>0||Me.isReloading)return;if(Me.ammoInMag<=0){I.emptyCooldown<=0&&(De.empty(),I.emptyCooldown=.35),Rl();return}if(!Me.fire())return;I.shotCooldown=60/Me.rpm,De.shot();const i=I.ads?.65:1;I.recoilPitch+=(.01+Math.random()*.006)*i,I.recoilYaw+=(Math.random()-.5)*.009*i,I.shake=Math.min(.07,I.shake+.006);const t=Me.getMuzzleWorldPosition(wx);Fe.getWorldPosition(Qa),Fe.getWorldDirection(Hn);let e=.011;I.ads&&(e=.0022),Math.hypot(I.velocity.x,I.velocity.z)>.5&&(e+=I.ads?.004:.01),I.sprinting&&(e+=.028),I.onGround||(e+=.022),I.crouch&&(e*=.7),Hn.x+=(Math.random()-.5)*e,Hn.y+=(Math.random()-.5)*e,Hn.z+=(Math.random()-.5)*e,Hn.normalize(),$a.set(Qa,Hn),$a.far=140;const s=[...hi.getTargets(),...Ri.raycastMeshes],a=$a.intersectObjects(s,!1).find(l=>l.object.visible);let o=Qa.clone().addScaledVector(Hn,90);if(a){o=a.point.clone();const l=a.object.userData?.enemy;if(l){const c=a.object.userData.part||"body",h=l.alive!==!1,u=hi.damage(l,c,c==="head"?130:36),f=u?.dead??(h&&l.alive===!1),d=u?.headshot??c==="head";rs.bloodAt(a.point,Hn,d?14:8),Se.hit(f),f?De.headshot():De.hit()}else{const c=a.face?.normal?a.face.normal.clone().transformDirection(a.object.matrixWorld):Hn.clone().negate(),h=(a.object.material?.metalness||0)>.45?"metal":"concrete";rs.impact(a.point,c,h),De.impact()}}rs.tracer(t,o,16765066,1)}function Px(i,t){I.kills++,I.score+=t?150:100,Se.setScore(I.score),Se.killfeed(t,"INSURGENT"),De.kill()}function Lx(i,t){I.mode==="playing"&&(I.health-=i,I.lastDamage=I.time,I.shake=Math.min(.18,I.shake+.045),Se.damage(i),Se.setHealth(I.health),De.hurt(),I.health<=0&&(I.health=0,Se.setHealth(0),Ax()))}function Dx(i){const t=(mn.KeyW?1:0)-(mn.KeyS?1:0),e=(mn.KeyD?1:0)-(mn.KeyA?1:0);I.crouch=!!(mn.ControlLeft||mn.ControlRight||mn.KeyC),I.sprinting=!!(mn.ShiftLeft||mn.ShiftRight)&&t>0&&!I.ads&&!I.crouch,dh.set(-Math.sin(I.yaw),0,-Math.cos(I.yaw)),Xr.set(Math.cos(I.yaw),0,-Math.sin(I.yaw));const n=Tx.set(0,0,0);n.addScaledVector(dh,t).addScaledVector(Xr,e),n.lengthSq()>0&&n.normalize();let s=5.1;I.crouch?s=2.5:I.sprinting?s=7.8:I.ads&&(s=3.2),I.sprinting&&I.ads&&(s=3.2),n.multiplyScalar(s);const r=I.onGround?13:3.5,a=1-Math.exp(-r*i);I.velocity.x+=(n.x-I.velocity.x)*a,I.velocity.z+=(n.z-I.velocity.z)*a,I.playerPos.x+=I.velocity.x*i,I.playerPos.z+=I.velocity.z*i,Ri.collide(I.playerPos,.34),mn.Space&&I.onGround&&!I.crouch&&(I.vy=5.3,I.onGround=!1),I.onGround||(I.jumpY+=I.vy*i,I.vy-=17*i,I.jumpY<=0&&(I.jumpY=0,I.vy=0,I.onGround=!0));const o=I.crouch?1.08:1.68;I.eyeHeight+=(o-I.eyeHeight)*(1-Math.exp(-12*i));const l=Math.hypot(I.velocity.x,I.velocity.z);I.bobTime+=i*(2.4+l*1.35);const c=Math.min(1,l/7)*(I.ads?.18:1)*(I.onGround?1:.25),h=Math.sin(I.bobTime*2)*.026*c,u=Math.cos(I.bobTime)*.019*c,f=I.eyeHeight+I.jumpY;Fe.position.set(I.playerPos.x+Xr.x*u,f+h,I.playerPos.z+Xr.z*u),I.shake*=Math.exp(-5.5*i),I.recoilPitch*=Math.exp(-8.5*i),I.recoilYaw*=Math.exp(-9.5*i);const d=(Math.random()-.5)*I.shake,g=(Math.random()-.5)*I.shake;Fe.rotation.set(I.pitch+I.recoilPitch+d,I.yaw+I.recoilYaw+g,-e*.012*Math.min(1,l/5));const M=I.ads?52:I.sprinting?80:72;Fe.fov+=(M-Fe.fov)*(1-Math.exp(-10*i)),Fe.updateProjectionMatrix(),I.onGround&&l>1.1?(I.stepTimer-=i*(I.sprinting?1.6:1),I.stepTimer<=0&&(De.footstep(),I.stepTimer=.42)):I.stepTimer=.1,Me.ammoInMag===0&&Me.reserveAmmo>0&&!Me.isReloading&&I.firing&&Rl(),Me.isReloading||Se.setReloading(!1),I.shotCooldown=Math.max(0,I.shotCooldown-i),I.emptyCooldown=Math.max(0,I.emptyCooldown-i),I.firing&&I.mode==="playing"&&Cx(),Me.setADS(I.ads),Me.update(i,{moving:l>.4,sprinting:I.sprinting,grounded:I.onGround,ads:I.ads,lookDeltaX:I.lookDX,lookDeltaY:I.lookDY}),I.lookDX=0,I.lookDY=0,I.health>0&&I.health<100&&I.time-I.lastDamage>4.2&&(I.health=Math.min(100,I.health+17*i),Se.setHealth(I.health)),Se.setAmmo(Me.ammoInMag,Me.reserveAmmo),Se.setADS(I.ads),I.spread=I.ads?.0022:.011+Math.min(.03,l*.0035)+(I.sprinting?.02:0),Se.setSpread(I.spread),Se.update(i,I.playerPos,Ix(),Ri.colliders,I.yaw)}function Ix(){const i=new Set,t=[];for(const e of hi.getTargets()){const n=e.userData?.enemy;n&&!i.has(n)&&(i.add(n),t.push(n))}return t}function Nx(i){I.menuTime+=i;const t=I.menuTime*.055+.7,e=33;Fe.position.set(Math.sin(t)*e,10.5+Math.sin(t*.7)*.6,Math.cos(t)*e),Fe.lookAt(0,2.6,0),Fe.fov=56,Fe.updateProjectionMatrix(),Ri.update(i,null)}let ph=performance.now();function bu(i){requestAnimationFrame(bu);const t=Math.min(.05,Math.max(1e-4,(i-ph)/1e3));ph=i,I.time+=t,I.mode==="playing"?(Dx(t),Rx(t)):I.mode==="menu"?Nx(t):(Ri.update(t,I.playerPos),I.mode==="paused"&&Me.update(t,{moving:!1,sprinting:!1,grounded:!0,ads:!1,lookDeltaX:0,lookDeltaY:0})),rs.update(t),De.update(t),Tl.uniforms.uTime.value=I.time,xs.render(),I.frames++,I.fpsTimer+=t,I.fpsTimer>.5&&(I.fps=Math.round(I.frames/I.fpsTimer),I.frames=0,I.fpsTimer=0,I.mode==="playing"&&(Se.el.fps.textContent=`${I.fps} FPS`))}window.addEventListener("resize",()=>{const i=window.innerWidth,t=window.innerHeight;Rn.setPixelRatio(1),Rn.setSize(i,t),xs.setSize(i,t),Fe.aspect=i/t,Fe.updateProjectionMatrix(),Tl.uniforms.uResolution.value.set(i,t)});function Ux(){const i=document.getElementById("loading");i.classList.add("done"),window.setTimeout(()=>i.classList.add("hidden"),550),requestAnimationFrame(bu)}window.setTimeout(Ux,80);
