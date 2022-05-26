YUI.add("graphics-canvas",function(y,t){var e,i,s,r,a,n,h="canvas",o="shape",l=/[a-z][^a-z]*/gi,u=/[\-]?[0-9]*[0-9|\.][0-9]*/g,c=y.config.doc,d=y.Lang,_=y.AttributeLite,p=y.DOM,f=y.Color,g=parseInt,v=parseFloat,m=d.isNumber,T=RegExp,C=f.toRGB,w=f.toHex,M=y.ClassNameManager.getClassName;function b(){}function S(){S.superclass.constructor.apply(this,arguments)}b.prototype={_pathSymbolToMethod:{M:"moveTo",m:"relativeMoveTo",L:"lineTo",l:"relativeLineTo",C:"curveTo",c:"relativeCurveTo",Q:"quadraticCurveTo",q:"relativeQuadraticCurveTo",z:"closePath",Z:"closePath"},_currentX:0,_currentY:0,_toRGBA:function(t,e){return e=e!==undefined?e:1,f.re_RGB.test(t)||(t=w(t)),t=f.re_hex.exec(t)?"rgba("+[g(T.$1,16),g(T.$2,16),g(T.$3,16)].join(",")+","+e+")":t},_toRGB:function(t){return C(t)},setSize:function(t,e){this.get("autoSize")&&(t>this.node.getAttribute("width")&&(this.node.style.width=t+"px",this.node.setAttribute("width",t)),e>this.node.getAttribute("height")&&(this.node.style.height=e+"px",this.node.setAttribute("height",e)))},_updateCoords:function(t,e){this._xcoords.push(t),this._ycoords.push(e),this._currentX=t,this._currentY=e},_clearAndUpdateCoords:function(){var t=this._xcoords.pop()||0,e=this._ycoords.pop()||0;this._updateCoords(t,e)},_updateNodePosition:function(){var t=this.get("node"),e=this.get("x"),i=this.get("y");t.style.position="absolute",t.style.left=e+this._left+"px",t.style.top=i+this._top+"px"},_updateDrawingQueue:function(t){this._methods.push(t)},lineTo:function(){return this._lineTo.apply(this,[y.Array(arguments),!1]),this},relativeLineTo:function(){return this._lineTo.apply(this,[y.Array(arguments),!0]),this},_lineTo:function(t,e){var i,s,r,a,n=t[0],h=this._stroke&&this._strokeWeight?this._strokeWeight:0,o=e?parseFloat(this._currentX):0,l=e?parseFloat(this._currentY):0;if(this._lineToMethods||(this._lineToMethods=[]),s=t.length-1,"string"==typeof n||"number"==typeof n)for(i=0;i<s;i+=2)r=parseFloat(t[i]),a=parseFloat(t[i+1]),this._updateDrawingQueue(["lineTo",r+=o,a+=l]),this._trackSize(r-h,a-h),this._trackSize(r+h,a+h),this._updateCoords(r,a);else for(i=0;i<s;i+=1)r=parseFloat(t[i][0]),a=parseFloat(t[i][1]),this._updateDrawingQueue(["lineTo",r,a]),this._lineToMethods[this._lineToMethods.length]=this._methods[this._methods.length-1],this._trackSize(r-h,a-h),this._trackSize(r+h,a+h),this._updateCoords(r,a);return this._drawingComplete=!1,this},moveTo:function(){return this._moveTo.apply(this,[y.Array(arguments),!1]),this},relativeMoveTo:function(){return this._moveTo.apply(this,[y.Array(arguments),!0]),this},_moveTo:function(t,e){var i=this._stroke&&this._strokeWeight?this._strokeWeight:0,s=e?parseFloat(this._currentX):0,e=e?parseFloat(this._currentY):0,s=parseFloat(t[0])+s,t=parseFloat(t[1])+e;return this._updateDrawingQueue(["moveTo",s,t]),this._trackSize(s-i,t-i),this._trackSize(s+i,t+i),this._updateCoords(s,t),this._drawingComplete=!1,this},curveTo:function(){return this._curveTo.apply(this,[y.Array(arguments),!1]),this},relativeCurveTo:function(){return this._curveTo.apply(this,[y.Array(arguments),!0]),this},_curveTo:function(t,e){for(var i,s,r,a,n,h,o,l,u,c,d=e?parseFloat(this._currentX):0,_=e?parseFloat(this._currentY):0,p=t.length-5,f=0;f<p;f+=6)i=parseFloat(t[f])+d,s=parseFloat(t[f+1])+_,r=parseFloat(t[f+2])+d,a=parseFloat(t[f+3])+_,n=parseFloat(t[f+4])+d,h=parseFloat(t[f+5])+_,this._updateDrawingQueue(["bezierCurveTo",i,s,r,a,n,h]),this._drawingComplete=!1,o=Math.max(n,Math.max(i,r)),u=Math.max(h,Math.max(s,a)),l=Math.min(n,Math.min(i,r)),c=Math.min(h,Math.min(s,a)),o=Math.abs(o-l),l=Math.abs(u-c),u=[[this._currentX,this._currentY],[i,s],[r,a],[n,h]],this._setCurveBoundingBox(u,o,l),this._currentX=n,this._currentY=h},quadraticCurveTo:function(){return this._quadraticCurveTo.apply(this,[y.Array(arguments),!1]),this},relativeQuadraticCurveTo:function(){return this._quadraticCurveTo.apply(this,[y.Array(arguments),!0]),this},_quadraticCurveTo:function(t,e){for(var i,s,r,a,n,h,o,l,u=t.length-3,c=e?parseFloat(this._currentX):0,d=e?parseFloat(this._currentY):0,_=0;_<u;_+=4)i=parseFloat(t[_])+c,s=parseFloat(t[_+1])+d,r=parseFloat(t[_+2])+c,a=parseFloat(t[_+3])+d,this._drawingComplete=!1,n=Math.max(r,i),o=Math.max(a,s),h=Math.min(r,i),l=Math.min(a,s),n=Math.abs(n-h),h=Math.abs(o-l),o=[[this._currentX,this._currentY],[i,s],[r,a]],this._setCurveBoundingBox(o,n,h),this._updateDrawingQueue(["quadraticCurveTo",i,s,r,a]),this._updateCoords(r,a);return this},drawCircle:function(t,e,i){var s=2*Math.PI,r=this._stroke&&this._strokeWeight?this._strokeWeight:0,a=2*i;return a+=r,this._drawingComplete=!1,this._trackSize(t+a,e+a),this._trackSize(t-r,e-r),this._updateCoords(t,e),this._updateDrawingQueue(["arc",t+i,e+i,i,0,s,!1]),this},drawDiamond:function(t,e,i,s){var r=.5*i,a=.5*s;return this.moveTo(t+r,e),this.lineTo(t+i,e+a),this.lineTo(t+r,e+s),this.lineTo(t,e+a),this.lineTo(t+r,e),this},drawEllipse:function(t,e,i,s){var r,a,n,h,o,l=-.25*Math.PI,u=0,c=i/2,d=s/2,_=t+c,p=e+d,f=this._stroke&&this._strokeWeight?this._strokeWeight:0,g=_+Math.cos(0)*c,v=p+Math.sin(0)*d;for(this.moveTo(g,v),r=0;r<8;r++)o=(u+=l)-l/2,a=_+Math.cos(u)*c,n=p+Math.sin(u)*d,h=_+Math.cos(o)*(c/Math.cos(l/2)),o=p+Math.sin(o)*(d/Math.cos(l/2)),this._updateDrawingQueue(["quadraticCurveTo",h,o,a,n]);return this._trackSize(t+i+f,e+s+f),this._trackSize(t-f,e-f),this._updateCoords(t,e),this},drawRect:function(t,e,i,s){return this._drawingComplete=!1,this.moveTo(t,e),this.lineTo(t+i,e),this.lineTo(t+i,e+s),this.lineTo(t,e+s),this.lineTo(t,e),this},drawRoundRect:function(t,e,i,s,r,a){return this._drawingComplete=!1,this.moveTo(t,e+a),this.lineTo(t,e+s-a),this.quadraticCurveTo(t,e+s,t+r,e+s),this.lineTo(t+i-r,e+s),this.quadraticCurveTo(t+i,e+s,t+i,e+s-a),this.lineTo(t+i,e+a),this.quadraticCurveTo(t+i,e,t+i-r,e),this.lineTo(t+r,e),this.quadraticCurveTo(t,e,t,e+a),this},drawWedge:function(t,e,i,s,r,a){var n,h,o,l,u,c,d,_=this._stroke&&this._strokeWeight?this._strokeWeight:0,p=0;if(a=a||r,this._drawingComplete=!1,
this._updateDrawingQueue(["moveTo",t,e]),a=a||r,h=-((s=360<Math.abs(s)?360:s)/(n=Math.ceil(Math.abs(s)/45)))/180*Math.PI,o=i/180*Math.PI,0<n){for(s=t+Math.cos(i/180*Math.PI)*r,i=e+Math.sin(i/180*Math.PI)*a,this.lineTo(s,i),p=0;p<n;++p)d=(o+=h)-h/2,l=t+Math.cos(o)*r,u=e+Math.sin(o)*a,c=t+Math.cos(d)*(r/Math.cos(h/2)),d=e+Math.sin(d)*(a/Math.cos(h/2)),this._updateDrawingQueue(["quadraticCurveTo",c,d,l,u]);this._updateDrawingQueue(["lineTo",t,e])}return this._trackSize(-_,-_),this._trackSize(2*r+_,2*r+_),this},end:function(){return this._closePath(),this},closePath:function(){return this._updateDrawingQueue(["closePath"]),this._updateDrawingQueue(["beginPath"]),this},clear:function(){return this._initProps(),this.node&&this._context.clearRect(0,0,this.node.width,this.node.height),this},_getLinearGradient:function(){var t,e,i,s,r,a,n,h,o,l=y.Lang.isNumber,u=this.get("fill"),c=u.stops,d=c.length,_=this.get("width"),p=this.get("height"),u=u.rotation||0,f=0+_/2,g=0+p/2,v=Math.PI/180,v=parseFloat(parseFloat(Math.tan(u*v)).toFixed(8));for(Math.abs(v)*_/2>=p/2?(h=u<180?(n=0)+p:(n=0+p,0),r=f-(g-n)/v,a=f-(g-h)/v):(a=90<u&&u<270?(r=0+_,0):(r=0)+_,n=-1*(v*(f-r)-g),h=-1*(v*(f-a)-g)),s=this._context.createLinearGradient(r,n,a,h),i=0;i<d;++i)o=(e=c[i]).opacity,t=e.color,e.offset,t=l(o)?(o=Math.max(0,Math.min(1,o)),this._toRGBA(t,o)):C(t),o=e.offset||i/(d-1),s.addColorStop(o,t);return s},_getRadialGradient:function(){var t,e,i,s,r,a,n=y.Lang.isNumber,h=this.get("fill"),o=h.r,l=h.fx,u=h.fy,c=h.stops,d=c.length,h=this.get("width"),_=this.get("height"),p=0+h/2,f=0+_/2,l=h*l,u=_*u,g=0+h/2,_=0+_/2,v=h*o,m=Math.sqrt(Math.pow(Math.abs(p-l),2)+Math.pow(Math.abs(f-u),2));for(v<=m&&(v=(u-f)/(m=1===(m=m/v)?1.01:m),l=p+(p=0<(p=(l-p)/m)?Math.floor(p):Math.ceil(p)),u=f+(v=0<v?Math.floor(v):Math.ceil(v))),a=.5<=o?(s=this._context.createRadialGradient(l,u,o,g,_,o*h),1):(s=this._context.createRadialGradient(l,u,o,g,_,h/2),2*o),i=0;i<d;++i)r=(e=c[i]).opacity,t=e.color,e.offset,t=n(r)?(r=Math.max(0,Math.min(1,r)),this._toRGBA(t,r)):C(t),r=e.offset||i/(d-1),(r*=a)<=1&&s.addColorStop(r,t);return s},_initProps:function(){this._methods=[],this._lineToMethods=[],this._xcoords=[0],this._ycoords=[0],this._width=0,this._height=0,this._left=0,this._top=0,this._right=0,this._bottom=0,this._currentX=0,this._currentY=0},_drawingComplete:!1,_createGraphic:function(){return y.config.doc.createElement("canvas")},getBezierData:function(t,e){for(var i,s=t.length,r=[],a=0;a<s;++a)r[a]=[t[a][0],t[a][1]];for(i=1;i<s;++i)for(a=0;a<s-i;++a)r[a][0]=(1-e)*r[a][0]+e*r[parseInt(a+1,10)][0],r[a][1]=(1-e)*r[a][1]+e*r[parseInt(a+1,10)][1];return[r[0][0],r[0][1]]},_setCurveBoundingBox:function(t,e,i){for(var s,r=0,a=this._currentX,n=a,h=this._currentY,o=h,l=Math.round(Math.sqrt(e*e+i*i)),u=1/l,e=this._stroke&&this._strokeWeight?this._strokeWeight:0,r=0;r<l;++r)s=this.getBezierData(t,u*r),a=isNaN(a)?s[0]:Math.min(s[0],a),n=isNaN(n)?s[0]:Math.max(s[0],n),h=isNaN(h)?s[1]:Math.min(s[1],h),o=isNaN(o)?s[1]:Math.max(s[1],o);a=Math.round(10*a)/10,n=Math.round(10*n)/10,h=Math.round(10*h)/10,o=Math.round(10*o)/10,this._trackSize(n+e,o+e),this._trackSize(a-e,h-e)},_trackSize:function(t,e){t>this._right&&(this._right=t),t<this._left&&(this._left=t),e<this._top&&(this._top=e),e>this._bottom&&(this._bottom=e),this._width=this._right-this._left,this._height=this._bottom-this._top}},y.CanvasDrawing=b,(e=function(){this._transforms=[],this.matrix=new y.Matrix,e.superclass.constructor.apply(this,arguments)}).NAME="shape",y.extend(e,y.GraphicBase,y.mix({init:function(){this.initializer.apply(this,arguments)},initializer:function(t){var e=this,t=t.graphic,i=this.get("data");e._initProps(),e.createNode(),e._xcoords=[0],e._ycoords=[0],t&&this._setGraphic(t),i&&e._parsePathData(i),e._updateHandler()},_setGraphic:function(t){t instanceof y.CanvasGraphic?this._graphic=t:((t=new y.CanvasGraphic({render:t}))._appendShape(this),this._graphic=t)},addClass:function(t){var e=this.get("node");y.DOM.addClass(e,t)},removeClass:function(t){var e=this.get("node");y.DOM.removeClass(e,t)},getXY:function(){var t=this.get("graphic").getXY(),e=this.get("x"),i=this.get("y");return[t[0]+e,t[1]+i]},setXY:function(t){var e=this.get("graphic").getXY(),i=t[0]-e[0],t=t[1]-e[1];this._set("x",i),this._set("y",t),this._updateNodePosition(i,t)},contains:function(t){return(t instanceof y.Node?t._node:t)===this.node},test:function(t){return y.Selector.test(this.node,t)},compareTo:function(t){return this.node===t},_getDefaultFill:function(){return{type:"solid",opacity:1,cx:.5,cy:.5,fx:.5,fy:.5,r:.5}},_getDefaultStroke:function(){return{weight:1,dashstyle:"none",color:"#000",opacity:1}},_left:0,_right:0,_top:0,_bottom:0,createNode:function(){var t=this,e=y.config.doc.createElement("canvas"),i=t.get("id"),s=t._camelCaseConcat,r=t.name;t._context=e.getContext("2d"),e.setAttribute("overflow","visible"),e.style.overflow="visible",t.get("visible")||(e.style.visibility="hidden"),e.setAttribute("id",i),t.node=e,t.addClass(M(o)+" "+M(s(h,o))+" "+M(r)+" "+M(s(h,r)))},on:function(t,e){return y.Node.DOM_EVENTS[t]?y.on(t,e,"#"+this.get("id")):y.on.apply(this,arguments)},_setStrokeProps:function(t){var e,i,s,r,a;t?(e=t.color,i=v(t.weight),s=v(t.opacity),r=t.linejoin||"round",a=t.linecap||"butt",t=t.dashstyle,this._miterlimit=null,this._dashstyle=t&&y.Lang.isArray(t)&&1<t.length?t:null,this._strokeWeight=i,m(i)&&0<i?this._stroke=1:this._stroke=0,m(s)?this._strokeStyle=this._toRGBA(e,s):this._strokeStyle=e,this._linecap=a,"round"===r||"bevel"===r?this._linejoin=r:(r=parseInt(r,10),m(r)&&(this._miterlimit=Math.max(r,1),this._linejoin="miter"))):this._stroke=0},set:function(){_.prototype.set.apply(this,arguments),this.initialized&&this._updateHandler()},_setFillProps:function(t){var e,i,s=m;t?(e=t.color,"linear"===(i=t.type)||"radial"===i?this._fillType=i:e?(e=s(i=t.opacity)?(i=Math.max(0,Math.min(1,i)),this._toRGBA(e,i)):C(e),this._fillColor=e,this._fillType="solid"):this._fillColor=null):(this._fillType=null,
this._fillColor=null)},translate:function(t,e){this._translateX+=t,this._translateY+=e,this._addTransform("translate",arguments)},translateX:function(t){this._translateX+=t,this._addTransform("translateX",arguments)},translateY:function(t){this._translateY+=t,this._addTransform("translateY",arguments)},skew:function(){this._addTransform("skew",arguments)},skewX:function(){this._addTransform("skewX",arguments)},skewY:function(){this._addTransform("skewY",arguments)},rotate:function(){this._addTransform("rotate",arguments)},scale:function(){this._addTransform("scale",arguments)},_transform:"",_addTransform:function(t,e){e=y.Array(e),this._transform=d.trim(this._transform+" "+t+"("+e.join(", ")+")"),e.unshift(t),this._transforms.push(e),this.initialized&&this._updateTransform()},_updateTransform:function(){var t,e,i,s=this.node,r=this.get("transformOrigin"),a=this.matrix,n=this._transforms.length;if(this._transforms&&0<this._transforms.length){for(i=0;i<n;++i)(t=this._transforms[i].shift())&&a[t].apply(a,this._transforms[i]);e=a.toCSSText()}this._graphic.addToRedrawQueue(this),r=100*r[0]+"% "+100*r[1]+"%",p.setStyle(s,"transformOrigin",r),e&&p.setStyle(s,"transform",e),this._transforms=[]},_updateHandler:function(){this._draw(),this._updateTransform()},_draw:function(){var t=this.node;this.clear(),this._closePath(),t.style.left=this.get("x")+"px",t.style.top=this.get("y")+"px"},_closePath:function(){if(this._methods){var t,e,i,s,r,a,n=this.get("node"),h=this._right-this._left,o=this._bottom-this._top,l=this._context,u=[],c=this._methods.concat();if(this._context.clearRect(0,0,n.width,n.height),this._methods&&(a=c.length)&&!(a<1)){for(t=0;t<a;++t)for(u[t]=c[t].concat(),r="quadraticCurveTo"===(s=u[t])[0]||"bezierCurveTo"===s[0]?s.length:3,e=1;e<r;++e)s[e]=e%2==0?s[e]-this._top:s[e]-this._left;for(n.setAttribute("width",Math.min(h,2e3)),n.setAttribute("height",Math.min(2e3,o)),l.beginPath(),t=0;t<a;++t)(s=u[t].concat())&&0<s.length&&(i=s.shift())&&("closePath"===i?(l.closePath(),this._strokeAndFill(l)):i&&"lineTo"===i&&this._dashstyle?(s.unshift(this._xcoords[t]-this._left,this._ycoords[t]-this._top),this._drawDashedLine.apply(this,s)):l[i].apply(l,s));this._strokeAndFill(l),this._drawingComplete=!0,this._clearAndUpdateCoords(),this._updateNodePosition(),this._methods=c}}},_strokeAndFill:function(t){this._fillType&&("linear"===this._fillType?t.fillStyle=this._getLinearGradient():"radial"===this._fillType?t.fillStyle=this._getRadialGradient():t.fillStyle=this._fillColor,t.closePath(),t.fill()),this._stroke&&(this._strokeWeight&&(t.lineWidth=this._strokeWeight),t.lineCap=this._linecap,t.lineJoin=this._linejoin,this._miterlimit&&(t.miterLimit=this._miterlimit),t.strokeStyle=this._strokeStyle,t.stroke())},_drawDashedLine:function(t,e,i,s){for(var r=this._context,a=this._dashstyle[0],n=a+this._dashstyle[1],h=i-t,o=s-e,l=Math.sqrt(Math.pow(h,2)+Math.pow(o,2)),u=Math.floor(Math.abs(l/n)),c=Math.atan2(o,h),d=t,_=e,h=Math.cos(c)*n,o=Math.sin(c)*n,p=0;p<u;++p)r.moveTo(d,_),r.lineTo(d+Math.cos(c)*a,_+Math.sin(c)*a),d+=h,_+=o;r.moveTo(d,_),a<(l=Math.sqrt((i-d)*(i-d)+(s-_)*(s-_)))?r.lineTo(d+Math.cos(c)*a,_+Math.sin(c)*a):0<l&&r.lineTo(d+Math.cos(c)*l,_+Math.sin(c)*l),r.moveTo(i,s)},getBounds:function(){var t=this._type,e=this.get("width"),i=this.get("height"),s=this.get("x"),r=this.get("y");return"path"===t&&(s+=this._left,r+=this._top,e=this._right-this._left,i=this._bottom-this._top),this._getContentRect(e,i,s,r)},_getContentRect:function(t,e,i,s){var r,a,n,h=this.get("transformOrigin"),o=h[0]*t,h=h[1]*e,l=this.matrix.getTransformArray(this.get("transform")),u=new y.Matrix,c=l.length;for("path"===this._type&&(o+=i,h+=s),o=isNaN(o)?0:o,h=isNaN(h)?0:h,u.translate(o,h),r=0;r<c;r+=1)(n=(a=l[r]).shift())&&u[n].apply(u,a);return u.translate(-o,-h),u.getContentRect(t,e,i,s)},toFront:function(){var t=this.get("graphic");t&&t._toFront(this)},toBack:function(){var t=this.get("graphic");t&&t._toBack(this)},_parsePathData:function(t){var e,i,s,r,a=y.Lang.trim(t.match(l)),n=this._pathSymbolToMethod;if(a){for(this.clear(),s=a.length||0,i=0;i<s;i+=1)e=(r=a[i]).substr(0,1),r=r.substr(1).match(u),(e=n[e])&&(r?this[e].apply(this,r):this[e].apply(this));this.end()}},destroy:function(){var t=this.get("graphic");t?t.removeShape(this):this._destroy()},_destroy:function(){this.node&&(y.Event.purgeElement(this.node,!0),this.node.parentNode&&(this.node.style.visibility="",this.node.parentNode.removeChild(this.node)),this._context=null,this.node=null)}},y.CanvasDrawing.prototype)),e.ATTRS={transformOrigin:{valueFn:function(){return[.5,.5]}},transform:{setter:function(t){return this.matrix.init(),this._transforms=this.matrix.getTransformArray(t),this._transform=t},getter:function(){return this._transform}},node:{readOnly:!0,getter:function(){return this.node}},id:{valueFn:function(){return y.guid()},setter:function(t){var e=this.node;return e&&e.setAttribute("id",t),t}},width:{value:0},height:{value:0},x:{value:0},y:{value:0},visible:{value:!0,setter:function(t){var e=this.get("node");return e&&(e.style.visibility=t?"visible":"hidden"),t}},fill:{valueFn:"_getDefaultFill",setter:function(t){var e=this.get("fill")||this._getDefaultFill(),e=t?y.merge(e,t):null;return e&&e.color&&(e.color!==undefined&&"none"!==e.color||(e.color=null)),this._setFillProps(e),e}},stroke:{valueFn:"_getDefaultStroke",setter:function(t){var e,i=this.get("stroke")||this._getDefaultStroke();return t&&t.hasOwnProperty("weight")&&(e=parseInt(t.weight,10),isNaN(e)||(t.weight=e)),t=t?y.merge(i,t):null,this._setStrokeProps(t),t}},autoSize:{value:!1},pointerEvents:{value:"visiblePainted"},data:{setter:function(t){return this.get("node")&&this._parsePathData(t),t}},graphic:{readOnly:!0,getter:function(){return this._graphic}}},y.CanvasShape=e,(i=function(){i.superclass.constructor.apply(this,arguments)}).NAME="path",y.extend(i,y.CanvasShape,{_type:"path",_draw:function(){this._closePath(),this._updateTransform()},createNode:function(){var t=this,
e=y.config.doc.createElement("canvas"),i=t.name,s=t._camelCaseConcat,r=t.get("id");t._context=e.getContext("2d"),e.setAttribute("overflow","visible"),e.setAttribute("pointer-events","none"),e.style.pointerEvents="none",e.style.overflow="visible",e.setAttribute("id",r),t.node=e,t.addClass(M(o)+" "+M(s(h,o))+" "+M(i)+" "+M(s(h,i)))},end:function(){return this._draw(),this}}),i.ATTRS=y.merge(y.CanvasShape.ATTRS,{width:{getter:function(){var t=this._stroke&&this._strokeWeight?2*this._strokeWeight:0;return this._width-t},setter:function(t){return this._width=t}},height:{getter:function(){var t=this._stroke&&this._strokeWeight?2*this._strokeWeight:0;return this._height-t},setter:function(t){return this._height=t}},path:{readOnly:!0,getter:function(){return this._path}}}),y.CanvasPath=i,(s=function(){s.superclass.constructor.apply(this,arguments)}).NAME="rect",y.extend(s,y.CanvasShape,{_type:"rect",_draw:function(){var t=this.get("width"),e=this.get("height");this.clear(),this.drawRect(0,0,t,e),this._closePath()}}),s.ATTRS=y.CanvasShape.ATTRS,y.CanvasRect=s,(r=function(){r.superclass.constructor.apply(this,arguments)}).NAME="ellipse",y.extend(r,e,{_type:"ellipse",_draw:function(){var t=this.get("width"),e=this.get("height");this.clear(),this.drawEllipse(0,0,t,e),this._closePath()}}),r.ATTRS=y.merge(e.ATTRS,{xRadius:{setter:function(t){this.set("width",2*t)},getter:function(){var t=this.get("width");return t&&(t*=.5),t}},yRadius:{setter:function(t){this.set("height",2*t)},getter:function(){var t=this.get("height");return t&&(t*=.5),t}}}),y.CanvasEllipse=r,(a=function(){a.superclass.constructor.apply(this,arguments)}).NAME="circle",y.extend(a,y.CanvasShape,{_type:"circle",_draw:function(){var t=this.get("radius");t&&(this.clear(),this.drawCircle(0,0,t),this._closePath())}}),a.ATTRS=y.merge(y.CanvasShape.ATTRS,{width:{setter:function(t){return this.set("radius",t/2),t},getter:function(){return 2*this.get("radius")}},height:{setter:function(t){return this.set("radius",t/2),t},getter:function(){return 2*this.get("radius")}},radius:{lazyAdd:!1}}),y.CanvasCircle=a,(n=function(){n.superclass.constructor.apply(this,arguments)}).NAME="canvasPieSlice",y.extend(n,y.CanvasShape,{_type:"path",_draw:function(){var t=this.get("cx"),e=this.get("cy"),i=this.get("startAngle"),s=this.get("arc"),r=this.get("radius");this.clear(),this._left=t,this._right=r,this._top=e,this._bottom=r,this.drawWedge(t,e,i,s,r),this.end()}}),n.ATTRS=y.mix({cx:{value:0},cy:{value:0},startAngle:{value:0},arc:{value:0},radius:{value:0}},y.CanvasShape.ATTRS),y.CanvasPieSlice=n,S.NAME="canvasGraphic",S.ATTRS={render:{},id:{valueFn:function(){return y.guid()},setter:function(t){var e=this._node;return e&&e.setAttribute("id",t),t}},shapes:{readOnly:!0,getter:function(){return this._shapes}},contentBounds:{readOnly:!0,getter:function(){return this._contentBounds}},node:{readOnly:!0,getter:function(){return this._node}},width:{setter:function(t){return this._node&&(this._node.style.width=t+"px"),t}},height:{setter:function(t){return this._node&&(this._node.style.height=t+"px"),t}},autoSize:{value:!1},preserveAspectRatio:{value:"xMidYMid"},resizeDown:{value:!1},x:{getter:function(){return this._x},setter:function(t){return this._x=t,this._node&&(this._node.style.left=t+"px"),t}},y:{getter:function(){return this._y},setter:function(t){return this._y=t,this._node&&(this._node.style.top=t+"px"),t}},autoDraw:{value:!0},visible:{value:!0,setter:function(t){return this._toggleVisible(t),t}}},y.extend(S,y.GraphicBase,{set:function(){var t,e=arguments[0],i={autoDraw:!0,autoSize:!0,preserveAspectRatio:!0,resizeDown:!0},s=!1;if(_.prototype.set.apply(this,arguments),!0===this._state.autoDraw&&0<y.Object.size(this._shapes))if(d.isString&&i[e])s=!0;else if(d.isObject(e))for(t in i)if(i.hasOwnProperty(t)&&e[t]){s=!0;break}s&&this._redraw()},_x:0,_y:0,getXY:function(){var t,e=this._node;return t=e?y.DOM.getXY(e):t},initializer:function(){var t=this.get("render"),e=this.get("visible")?"visible":"hidden",i=this.get("width")||0,s=this.get("height")||0;this._shapes={},this._redrawQueue={},this._contentBounds={left:0,top:0,right:0,bottom:0},this._node=c.createElement("div"),this._node.style.position="absolute",this._node.style.visibility=e,this.set("width",i),this.set("height",s),t&&this.render(t)},render:function(t){var e,i=t||c.body,s=this._node;return t instanceof y.Node?i=t._node:y.Lang.isString(t)&&(i=y.Selector.query(t,c.body,!0)),t=this.get("width")||parseInt(y.DOM.getComputedStyle(i,"width"),10),e=this.get("height")||parseInt(y.DOM.getComputedStyle(i,"height"),10),i.appendChild(s),s.style.display="block",s.style.position="absolute",s.style.left=this.get("x")+"px",s.style.top=this.get("y")+"px",this.set("width",t),this.set("height",e),this.parentNode=i,this},destroy:function(){this.removeAllShapes(),this._node&&(this._removeChildren(this._node),this._node.parentNode&&this._node.parentNode.removeChild(this._node),this._node=null)},addShape:function(t){(t.graphic=this).get("visible")||(t.visible=!1);t=new(this._getShapeClass(t.type))(t);return this._appendShape(t),t},_appendShape:function(t){var t=t.node,e=this._frag||this._node;(this.get("autoDraw")?e:this._getDocFrag()).appendChild(t)},removeShape:function(t){return t instanceof e||d.isString(t)&&(t=this._shapes[t]),t&&t instanceof e&&(t._destroy(),delete this._shapes[t.get("id")]),this.get("autoDraw")&&this._redraw(),t},removeAllShapes:function(){var t,e=this._shapes;for(t in e)e.hasOwnProperty(t)&&e[t].destroy();this._shapes={}},clear:function(){this.removeAllShapes()},_removeChildren:function(t){if(t&&t.hasChildNodes())for(var e;t.firstChild;)e=t.firstChild,this._removeChildren(e),t.removeChild(e)},_toggleVisible:function(t){var e,i=this._shapes,s=t?"visible":"hidden";if(i)for(e in i)i.hasOwnProperty(e)&&i[e].set("visible",t);this._node&&(this._node.style.visibility=s)},_getShapeClass:function(t){var e=this._shapeClass[t];return e||t},_shapeClass:{circle:y.CanvasCircle,rect:y.CanvasRect,path:y.CanvasPath,
ellipse:y.CanvasEllipse,pieslice:y.CanvasPieSlice},getShapeById:function(t){return this._shapes[t]},batch:function(t){var e=this.get("autoDraw");this.set("autoDraw",!1),t(),this.set("autoDraw",e)},_getDocFrag:function(){return this._frag||(this._frag=c.createDocumentFragment()),this._frag},_redraw:function(){var t,e,i,s,r,a,n=this.get("autoSize"),h=this.get("preserveAspectRatio"),o=this.get("resizeDown")?this._getUpdatedContentBounds():this._contentBounds,l=0,u=0,c=this.get("node");n&&("sizeContentToGraphic"===n?(n=o.right-o.left,t=o.bottom-o.top,e=parseFloat(p.getComputedStyle(c,"width")),i=parseFloat(p.getComputedStyle(c,"height")),a=new y.Matrix,"none"===h?(s=e/n,r=i/t):n/t!=e/i&&(e<n*i/t?(s=r=e/n,u=this._calculateTranslate(h.slice(5).toLowerCase(),t*e/n,i)):(s=r=i/t,l=this._calculateTranslate(h.slice(1,4).toLowerCase(),n*i/t,e))),p.setStyle(c,"transformOrigin","0% 0%"),l-=o.left*s,u-=o.top*r,a.translate(l,u),a.scale(s,r),p.setStyle(c,"transform",a.toCSSText())):(this.set("width",o.right),this.set("height",o.bottom))),this._frag&&(this._node.appendChild(this._frag),this._frag=null)},_calculateTranslate:function(t,e,i){var s,r=i-e;switch(t){case"mid":s=.5*r;break;case"max":s=r;break;default:s=0}return s},addToRedrawQueue:function(t){var e;this._shapes[t.get("id")]=t,this.get("resizeDown")||(t=t.getBounds(),(e=this._contentBounds).left=(e.left<t.left?e:t).left,e.top=(e.top<t.top?e:t).top,e.right=(e.right>t.right?e:t).right,e.bottom=(e.bottom>t.bottom?e:t).bottom,this._contentBounds=e),this.get("autoDraw")&&this._redraw()},_getUpdatedContentBounds:function(){var t,e,i=this._shapes,s={};for(e in i)i.hasOwnProperty(e)&&(t=i[e].getBounds(),s.left=d.isNumber(s.left)?Math.min(s.left,t.left):t.left,s.top=d.isNumber(s.top)?Math.min(s.top,t.top):t.top,s.right=d.isNumber(s.right)?Math.max(s.right,t.right):t.right,s.bottom=d.isNumber(s.bottom)?Math.max(s.bottom,t.bottom):t.bottom);return s.left=d.isNumber(s.left)?s.left:0,s.top=d.isNumber(s.top)?s.top:0,s.right=d.isNumber(s.right)?s.right:0,s.bottom=d.isNumber(s.bottom)?s.bottom:0,this._contentBounds=s},_toFront:function(t){var e=this.get("node");t instanceof y.CanvasShape&&(t=t.get("node")),e&&t&&e.appendChild(t)},_toBack:function(t){var e,i=this.get("node");t instanceof y.CanvasShape&&(t=t.get("node")),i&&t&&((e=i.firstChild)?i.insertBefore(t,e):i.appendChild(t))}}),y.CanvasGraphic=S},"@VERSION@",{requires:["graphics","color-base"]});