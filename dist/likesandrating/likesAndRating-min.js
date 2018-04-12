"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};function _defineProperty(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function itemLike(t){var e=cookie.read("t");if(e){var r=e.replace(/\./g,"");r.replace(/\./g,""),db.ref(RTbase+"/"+t).once("value",function(e){var n=e.val();n?n[r]?getItemLikes(t):(db.ref(RTbase+"/"+t+"/UserLikes").update(_defineProperty({},r,1)),getItemLikes(t)):(db.ref(RTbase+"/"+t).update(_defineProperty({},"UserLikes",_defineProperty({},r,1))),getItemLikes(t))})}}function getItemLikes(t){db.ref(RTbase+"/"+t+"/UserLikes").once("value",function(e){var r=e.val();if(r){var n=0;Object.keys(r).forEach(function(){n+=1}),$("#likeN-"+t).html(n+" Likes")}else $("#likeN-"+t).html("0 Likes")})}function rateGame(t,e){e.rateYo().on("rateyo.set",function(){saveRating(t,e)})}function saveRating(t,e){var r=cookie.read("t");if(r){var n=r.replace(/\./g,"");n.replace(/\./g,""),db.ref(RTbase+"/"+t+"/rating").once("value",function(r){var a=r.val(),i=e.rateYo("rating");null!=a&&a.rating,db.ref(RTbase+"/"+t+"/rating").update(_defineProperty({},n,_defineProperty({},"rated",i)))})}}function getRating(t,e){db.ref(RTbase+"/"+t+"/rating").once("value",function(t){var r=t.val();if(r){var n=0,a=0;Object.keys(r).forEach(function(t){n+=r[t].rated,a+=1});var i=n/a;e.rateYo("rating",i)}})}!function(t){var e='<?xml version="1.0" encoding="utf-8"?><svg version="1.1"xmlns="http://www.w3.org/2000/svg"viewBox="0 12.705 512 486.59"x="0px" y="0px"xml:space="preserve"><polygon points="256.814,12.705 317.205,198.566 512.631,198.566 354.529,313.435 414.918,499.295 256.814,384.427 98.713,499.295 159.102,313.435 1,198.566 196.426,198.566 "/></svg>',r={starWidth:"20px",normalFill:"gray",ratedFill:"#FFD700",numStars:5,maxValue:5,precision:1,rating:0,fullStar:!1,halfStar:!1,readOnly:!1,spacing:"0px",rtl:!1,multiColor:null,onInit:null,onChange:null,onSet:null,starSvg:null},n={startColor:"#c0392b",endColor:"#f1c40f"};function a(t,e,r){return t===e?t=e:t===r&&(t=r),t}function i(t){return void 0!==t}var o=/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i,l=function(t){if(!o.test(t))return null;var e=o.exec(t);return{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}};function s(t,e,r){var n=r/100*(e-t);return 1===(n=Math.round(t+n).toString(16)).length&&(n="0"+n),n}function c(r,o){this.node=r.get(0);var u=this;r.empty().addClass("jq-ry-container");var f,p,d,g,m,h,v=t("<div/>").addClass("jq-ry-group-wrapper").appendTo(r),y=t("<div/>").addClass("jq-ry-normal-group").addClass("jq-ry-group").appendTo(v),b=t("<div/>").addClass("jq-ry-rated-group").addClass("jq-ry-group").appendTo(v),k=0,w=o.rating,x=!1;function S(t){i(t)||(t=o.rating),w=t;var e=t/f,r=e*d;e>1&&(r+=(Math.ceil(e)-1)*m),R(o.ratedFill),r=o.rtl?100-r:r,b.css("width",r+"%")}function C(){h=p*o.numStars+g*(o.numStars-1),d=p/h*100,m=g/h*100,r.width(h),S()}function F(t){var e=o.starWidth=t;return p=window.parseFloat(o.starWidth.replace("px","")),y.find("svg").attr({width:o.starWidth,height:e}),b.find("svg").attr({width:o.starWidth,height:e}),C(),r}function j(t){return o.spacing=t,g=parseFloat(o.spacing.replace("px","")),y.find("svg:not(:first-child)").css({"margin-left":t}),b.find("svg:not(:first-child)").css({"margin-left":t}),C(),r}function I(t){return o.normalFill=t,(o.rtl?b:y).find("svg").attr({fill:o.normalFill}),r}var q=o.ratedFill;function R(t){if(o.multiColor){var e=(w-k)/o.maxValue*100,a=o.multiColor||{};t=function(t,e,r){if(!t||!e)return null;r=i(r)?r:0,t=l(t),e=l(e);var n=s(t.r,e.r,r),a=s(t.b,e.b,r);return"#"+n+s(t.g,e.g,r)+a}(a.startColor||n.startColor,a.endColor||n.endColor,e)}else q=t;return o.ratedFill=t,(o.rtl?y:b).find("svg").attr({fill:o.ratedFill}),r}function z(t){t=!!t,o.rtl=t,I(o.normalFill),S()}function T(t){o.multiColor=t,R(t||q)}function L(n){o.numStars=n,f=o.maxValue/o.numStars,y.empty(),b.empty();for(var a=0;a<o.numStars;a++)y.append(t(o.starSvg||e)),b.append(t(o.starSvg||e));return F(o.starWidth),I(o.normalFill),j(o.spacing),S(),r}function V(t){return o.maxValue=t,f=o.maxValue/o.numStars,o.rating>t&&A(t),S(),r}function _(t){return o.precision=t,A(o.rating),r}function E(t){return o.halfStar=t,r}function O(t){return o.fullStar=t,r}function P(t){var e,r,n,a,i,l=y.offset().left,s=l+y.width(),c=o.maxValue,u=t.pageX,p=0;if(u<l)p=k;else if(u>s)p=c;else{var h=(u-l)/(s-l);if(g>0)for(var v=h*=100;v>0;)v>d?(p+=f,v-=d+m):(p+=v/d*f,v=0);else p=h*o.maxValue;r=(e=p)%f,n=f/2,a=o.halfStar,p=(i=o.fullStar)||a?(i||a&&r>n?e+=f-r:(e-=r,r>0&&(e+=n)),e):e}return o.rtl&&(p=c-p),p}function W(t){return o.readOnly=t,r.attr("readonly",!0),X(),t||(r.removeAttr("readonly"),r.on("mousemove",U).on("mouseenter",U).on("mouseleave",$).on("click",B).on("rateyo.init",D).on("rateyo.change",G).on("rateyo.set",Q)),r}function A(t){var e=t,n=o.maxValue;return"string"==typeof e&&("%"===e[e.length-1]&&(e=e.substr(0,e.length-1),V(n=100)),e=parseFloat(e)),function(t,e,r){if(!(t>=e&&t<=r))throw Error("Invalid Rating, expected value between "+e+" and "+r)}(e,k,n),e=parseFloat(e.toFixed(o.precision)),a(parseFloat(e),k,n),o.rating=e,S(),x&&r.trigger("rateyo.set",{rating:e}),r}function M(t){return o.onInit=t,r}function Y(t){return o.onSet=t,r}function N(t){return o.onChange=t,r}function U(t){var e=P(t).toFixed(o.precision),n=o.maxValue;S(e=a(parseFloat(e),k,n)),r.trigger("rateyo.change",{rating:e})}function $(){var t,e;(e=!1,t=navigator.userAgent||navigator.vendor||window.opera,(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(t)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0,4)))&&(e=!0),e)||(S(),r.trigger("rateyo.change",{rating:o.rating}))}function B(t){var e=P(t).toFixed(o.precision);e=parseFloat(e),u.rating(e)}function D(t,e){o.onInit&&"function"==typeof o.onInit&&o.onInit.apply(this,[e.rating,u])}function G(t,e){o.onChange&&"function"==typeof o.onChange&&o.onChange.apply(this,[e.rating,u])}function Q(t,e){o.onSet&&"function"==typeof o.onSet&&o.onSet.apply(this,[e.rating,u])}function X(){r.off("mousemove",U).off("mouseenter",U).off("mouseleave",$).off("click",B).off("rateyo.init",D).off("rateyo.change",G).off("rateyo.set",Q)}this.rating=function(t){return i(t)?(A(t),r):o.rating},this.destroy=function(){var e,n;return o.readOnly||X(),c.prototype.collection=(e=r.get(0),n=this.collection,t.each(n,function(t){if(e===this.node){var r=n.slice(0,t),a=n.slice(t+1,n.length);return n=r.concat(a),!1}}),n),r.removeClass("jq-ry-container").children().remove(),r},this.method=function(t){if(!t)throw Error("Method name not specified!");if(!i(this[t]))throw Error("Method "+t+" doesn't exist!");var e=Array.prototype.slice.apply(arguments,[]).slice(1);return this[t].apply(this,e)},this.option=function(t,e){if(!i(t))return o;var r;switch(t){case"starWidth":r=F;break;case"numStars":r=L;break;case"normalFill":r=I;break;case"ratedFill":r=R;break;case"multiColor":r=T;break;case"maxValue":r=V;break;case"precision":r=_;break;case"rating":r=A;break;case"halfStar":r=E;break;case"fullStar":r=O;break;case"readOnly":r=W;break;case"spacing":r=j;break;case"rtl":r=z;break;case"onInit":r=M;break;case"onSet":r=Y;break;case"onChange":r=N;break;default:throw Error("No such option as "+t)}return i(e)?r(e):o[t]},L(o.numStars),W(o.readOnly),o.rtl&&z(o.rtl),this.collection.push(this),this.rating(o.rating,!0),x=!0,r.trigger("rateyo.init",{rating:o.rating})}function u(e,r){var n;return t.each(r,function(){if(e===this.node)return n=this,!1}),n}c.prototype.collection=[],window.RateYo=c,t.fn.rateYo=function(){return function(e){var n=c.prototype.collection,a=t(this);if(0===a.length)return a;var i=Array.prototype.slice.apply(arguments,[]);if(0===i.length)e=i[0]={};else{if(1!==i.length||"object"!==_typeof(i[0])){if(i.length>=1&&"string"==typeof i[0]){var o=i[0],l=i.slice(1),s=[];return t.each(a,function(t,e){var r=u(e,n);if(!r)throw Error("Trying to set options before even initialization");var a=r[o];if(!a)throw Error("Method "+o+" does not exist!");var i=a.apply(r,l);s.push(i)}),s=1===s.length?s[0]:s}throw Error("Invalid Arguments")}e=i[0]}return e=t.extend({},r,e),t.each(a,function(){if(!u(this,n))return new c(t(this),t.extend({},e))})}.apply(this,Array.prototype.slice.apply(arguments,[]))}}(window.jQuery);