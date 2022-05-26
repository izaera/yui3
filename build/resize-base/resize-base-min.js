YUI.add("resize-base",function(o,w){var e=o.Lang,X=e.isArray,t=e.isBoolean,n=e.isNumber,B=e.isString,i=o.Array,G=e.trim,D=i.indexOf,e="{handle}",a="activeHandle",r="activeHandleNode",s="autoHide",d="border",l="handle",u="handles",h="handlesWrapper",f="inner",g="left",c="node",p="offsetHeight",_="offsetWidth",v="parentNode",H="resize",E="resizing",b="static",S="top",z="wrap",A="wrapper",I="resize:mouseUp",m="resize:resize",R="resize:align",L="resize:end",P="resize:start",x=function(){return Array.prototype.slice.call(arguments).join(" ")},T=function(e){return Math.round(parseFloat(e))||0},y=function(e,t){return e.getComputedStyle(t)},Y=function(e){return l+e.toUpperCase()},V=function(e){return e instanceof o.Node},O=o.cached(function(e){return e.substring(0,1).toUpperCase()+e.substring(1)}),N=o.cached(function(){var n=[],e=i(arguments,0,!0);return i.each(e,function(e,t){0<t&&(e=O(e)),n.push(e)}),n.join("")}),W=o.ClassNameManager.getClassName,k=W(H),U=W(H,l),C=W(H,l,"active"),$=W(H,l,f),f=W(H,l,f,e),e=W(H,l,e),M=W(H,"hidden",u),j=W(H,u,A),q=W(H,A);function F(){F.superclass.constructor.apply(this,arguments)}o.mix(F,{NAME:H,ATTRS:{activeHandle:{value:null,validator:function(e){return o.Lang.isString(e)||o.Lang.isNull(e)}},activeHandleNode:{value:null,validator:V},autoHide:{value:!1,validator:t},defMinHeight:{value:15,validator:n},defMinWidth:{value:15,validator:n},handles:{setter:"_setHandles",value:"all"},handlesWrapper:{readOnly:!0,setter:o.one,valueFn:"_valueHandlesWrapper"},node:{setter:o.one},resizing:{value:!1,validator:t},wrap:{setter:"_setWrap",value:!1,validator:t},wrapTypes:{readOnly:!0,value:/^canvas|textarea|input|select|button|img|iframe|table|embed$/i},wrapper:{readOnly:!0,valueFn:"_valueWrapper",writeOnce:!0}},RULES:{b:function(e,t,n){var i=e.info,e=e.originalInfo;i.offsetHeight=e.offsetHeight+n},l:function(e,t){var n=e.info,e=e.originalInfo;n.left=e.left+t,n.offsetWidth=e.offsetWidth-t},r:function(e,t){var n=e.info,e=e.originalInfo;n.offsetWidth=e.offsetWidth+t},t:function(e,t,n){var i=e.info,e=e.originalInfo;i.top=e.top+n,i.offsetHeight=e.offsetHeight-n},tr:function(){this.t.apply(this,arguments),this.r.apply(this,arguments)},bl:function(){this.b.apply(this,arguments),this.l.apply(this,arguments)},br:function(){this.b.apply(this,arguments),this.r.apply(this,arguments)},tl:function(){this.t.apply(this,arguments),this.l.apply(this,arguments)}},capitalize:N}),o.Resize=o.extend(F,o.Base,{ALL_HANDLES:["t","tr","r","br","b","bl","l","tl"],REGEX_CHANGE_HEIGHT:/^(t|tr|b|bl|br|tl)$/i,REGEX_CHANGE_LEFT:/^(tl|l|bl)$/i,REGEX_CHANGE_TOP:/^(tl|t|tr)$/i,REGEX_CHANGE_WIDTH:/^(bl|br|l|r|tl|tr)$/i,HANDLES_WRAP_TEMPLATE:'<div class="'+j+'"></div>',WRAP_TEMPLATE:'<div class="'+q+'"></div>',HANDLE_TEMPLATE:'<div class="'+x(U,e)+'"><div class="'+x($,f)+'">&nbsp;</div></div>',totalHSurrounding:0,totalVSurrounding:0,nodeSurrounding:null,wrapperSurrounding:null,changeHeightHandles:!1,changeLeftHandles:!1,changeTopHandles:!1,changeWidthHandles:!1,delegate:null,info:null,lastInfo:null,originalInfo:null,initializer:function(){this._eventHandles=[],this.renderer()},renderUI:function(){this._renderHandles()},bindUI:function(){this._createEvents(),this._bindDD(),this._bindHandle()},syncUI:function(){this.get(c).addClass(k),this._setHideHandlesUI(this.get(s))},destructor:function(){var t=this,e=t.get(c),n=t.get(A),i=n.get(v);o.each(t._eventHandles,function(e){e.detach()}),t._eventHandles.length=0,t.eachHandle(function(e){t.delegate.dd.destroy(),e.remove(!0)}),t.delegate.destroy(),t.get(z)&&(t._copyStyles(n,e),i&&i.insertBefore(e,n),n.remove(!0)),e.removeClass(k),e.removeClass(M)},renderer:function(){this.renderUI(),this.bindUI(),this.syncUI()},eachHandle:function(i){var a=this;o.each(a.get(u),function(e,t){var n=a.get(Y(e));i.apply(a,[n,e,t])})},_bindDD:function(){var e=this;e.delegate=new o.DD.Delegate({bubbleTargets:e,container:e.get(h),dragConfig:{clickPixelThresh:0,clickTimeThresh:0,useShim:!0,move:!1},nodes:"."+U,target:!1}),e._eventHandles.push(e.on("drag:drag",e._handleResizeEvent),e.on("drag:dropmiss",e._handleMouseUpEvent),e.on("drag:end",e._handleResizeEndEvent),e.on("drag:start",e._handleResizeStartEvent))},_bindHandle:function(){var e=this,t=e.get(A);e._eventHandles.push(t.on("mouseenter",o.bind(e._onWrapperMouseEnter,e)),t.on("mouseleave",o.bind(e._onWrapperMouseLeave,e)),t.delegate("mouseenter",o.bind(e._onHandleMouseEnter,e),"."+U),t.delegate("mouseleave",o.bind(e._onHandleMouseLeave,e),"."+U))},_createEvents:function(){var n=this,e=function(e,t){n.publish(e,{defaultFn:t,queuable:!1,emitFacade:!0,bubbles:!0,prefix:H})};e(P,this._defResizeStartFn),e(m,this._defResizeFn),e(R,this._defResizeAlignFn),e(L,this._defResizeEndFn),e(I,this._defMouseUpFn)},_renderHandles:function(){var e=this.get(A),t=this.get(h);this.eachHandle(function(e){t.append(e)}),e.append(t)},_buildHandle:function(e){return o.Node.create(o.Lang.sub(this.HANDLE_TEMPLATE,{handle:e}))},_calcResize:function(){var e=this.handle,t=this.info,n=this.originalInfo,i=t.actXY[0]-n.actXY[0],t=t.actXY[1]-n.actXY[1];e&&o.Resize.RULES[e]&&o.Resize.RULES[e](this,i,t)},_checkSize:function(e,t){var n=this.info,i=this.originalInfo,a=e===p?S:g;n[e]=t,(a==g&&this.changeLeftHandles||a==S&&this.changeTopHandles)&&(n[a]=i[a]+i[e]-t)},_copyStyles:function(e,t){var n=e.getStyle("position").toLowerCase(),i=this._getBoxSurroundingInfo(e),n={position:n=n===b?"relative":n,left:y(e,g),top:y(e,S)};o.mix(n,i.margin),o.mix(n,i.border),t.setStyles(n),e.setStyles({border:0,margin:0}),t.sizeTo(e.get(_)+i.totalHBorder,e.get(p)+i.totalVBorder)},_extractHandleName:o.cached(function(e){e=e.get("className").match(new RegExp(W(H,l,"(\\w{1,2})\\b")));return e?e[1]:null}),_getInfo:function(e,t){var n=[0,0],i=t.dragEvent.target,a=e.getXY(),r=a[0],a=a[1],s=e.get(p),e=e.get(_);return{actXY:n=t?i.actXY.length?i.actXY:i.lastXY:n,bottom:a+s,left:r,offsetHeight:s,offsetWidth:e,right:r+e,top:a}},_getBoxSurroundingInfo:function(r){var s={padding:{},margin:{},border:{}};return V(r
)&&o.each([S,"right","bottom",g],function(e){var t=N("padding",e),n=N("margin",e),i=N(d,e,"width"),a=N(d,e,"color"),e=N(d,e,"style");s.border[a]=y(r,a),s.border[e]=y(r,e),s.border[i]=y(r,i),s.margin[n]=y(r,n),s.padding[t]=y(r,t)}),s.totalHBorder=T(s.border.borderLeftWidth)+T(s.border.borderRightWidth),s.totalHPadding=T(s.padding.paddingLeft)+T(s.padding.paddingRight),s.totalVBorder=T(s.border.borderBottomWidth)+T(s.border.borderTopWidth),s.totalVPadding=T(s.padding.paddingBottom)+T(s.padding.paddingTop),s},_syncUI:function(){var e=this,t=e.info,n=e.wrapperSurrounding,i=e.get(A),a=e.get(c);i.sizeTo(t.offsetWidth,t.offsetHeight),(e.changeLeftHandles||e.changeTopHandles)&&i.setXY([t.left,t.top]),i.compareTo(a)||a.sizeTo(t.offsetWidth-n.totalHBorder,t.offsetHeight-n.totalVBorder),o.UA.webkit&&a.setStyle(H,"none")},_updateChangeHandleInfo:function(e){var t=this;t.changeHeightHandles=t.REGEX_CHANGE_HEIGHT.test(e),t.changeLeftHandles=t.REGEX_CHANGE_LEFT.test(e),t.changeTopHandles=t.REGEX_CHANGE_TOP.test(e),t.changeWidthHandles=t.REGEX_CHANGE_WIDTH.test(e)},_updateInfo:function(e){this.info=this._getInfo(this.get(A),e)},_updateSurroundingInfo:function(){var e=this,t=e.get(c),n=e.get(A),t=e._getBoxSurroundingInfo(t),n=e._getBoxSurroundingInfo(n);e.nodeSurrounding=t,e.wrapperSurrounding=n,e.totalVSurrounding=t.totalVPadding+n.totalVBorder,e.totalHSurrounding=t.totalHPadding+n.totalHBorder},_setActiveHandlesUI:function(e){var t=this.get(r);t&&(e?(this.eachHandle(function(e){e.removeClass(C)}),t.addClass(C)):t.removeClass(C))},_setHandles:function(e){var t=this,n=[];return X(e)?n=e:B(e)&&("all"===e.toLowerCase()?n=t.ALL_HANDLES:o.each(e.split(","),function(e){e=G(e);-1<D(t.ALL_HANDLES,e)&&n.push(e)})),n},_setHideHandlesUI:function(e){var t=this.get(A);this.get(E)||(e?t.addClass(M):t.removeClass(M))},_setWrap:function(e){var t=this.get(c).get("nodeName");return e=this.get("wrapTypes").test(t)?!0:e},_defMouseUpFn:function(){this.set(E,!1)},_defResizeFn:function(e){this._resize(e)},_resize:function(e){this._handleResizeAlignEvent(e.dragEvent),this._syncUI()},_defResizeAlignFn:function(e){this._resizeAlign(e)},_resizeAlign:function(e){var t,n,i=this;i.lastInfo=i.info,i._updateInfo(e),e=i.info,i._calcResize(),i.con||(t=i.get("defMinHeight")+i.totalVSurrounding,n=i.get("defMinWidth")+i.totalHSurrounding,e.offsetHeight<=t&&i._checkSize(p,t),e.offsetWidth<=n&&i._checkSize(_,n))},_defResizeEndFn:function(e){this._resizeEnd(e)},_resizeEnd:function(e){var t=this;e.dragEvent.target.actXY=[],t._syncUI(),t._setActiveHandlesUI(!1),t.set(a,null),t.set(r,null),t.handle=null},_defResizeStartFn:function(e){this._resizeStart(e)},_resizeStart:function(e){var t=this,n=t.get(A);t.handle=t.get(a),t.set(E,!0),t._updateSurroundingInfo(),t.originalInfo=t._getInfo(n,e),t._updateInfo(e)},_handleMouseUpEvent:function(e){this.fire(I,{dragEvent:e,info:this.info})},_handleResizeEvent:function(e){this.fire(m,{dragEvent:e,info:this.info})},_handleResizeAlignEvent:function(e){this.fire(R,{dragEvent:e,info:this.info})},_handleResizeEndEvent:function(e){this.fire(L,{dragEvent:e,info:this.info})},_handleResizeStartEvent:function(e){this.get(a)||this._setHandleFromNode(e.target.get("node")),this.fire(P,{dragEvent:e,info:this.info})},_onWrapperMouseEnter:function(){this.get(s)&&this._setHideHandlesUI(!1)},_onWrapperMouseLeave:function(){this.get(s)&&this._setHideHandlesUI(!0)},_setHandleFromNode:function(e){var t=this,n=t._extractHandleName(e);t.get(E)||(t.set(a,n),t.set(r,e),t._setActiveHandlesUI(!0),t._updateChangeHandleInfo(n))},_onHandleMouseEnter:function(e){this._setHandleFromNode(e.currentTarget)},_onHandleMouseLeave:function(){this.get(E)||this._setActiveHandlesUI(!1)},_valueHandlesWrapper:function(){return o.Node.create(this.HANDLES_WRAP_TEMPLATE)},_valueWrapper:function(){var e=this.get(c),t=e.get(v),n=e;return this.get(z)&&(n=o.Node.create(this.WRAP_TEMPLATE),t&&t.insertBefore(n,e),n.append(e),this._copyStyles(e,n),e.setStyles({position:b,left:0,top:0})),n}}),o.each(o.Resize.prototype.ALL_HANDLES,function(e){o.Resize.ATTRS[Y(e)]={setter:function(){return this._buildHandle(e)},value:null,writeOnce:!0}})},"@VERSION@",{requires:["base","widget","event","oop","dd-drag","dd-delegate","dd-drop"],skinnable:!0});