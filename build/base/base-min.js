YUI.add("base",function(C){var M=C.Lang;function F(B){this._plugins={};this.after("init",function(L){this._initPlugins(L.cfg);});this.after("destroy",this._destroyPlugins);}F.prototype={plug:function(R,B){if(R){if(M.isFunction(R)){this._plug(R,B);}else{if(M.isArray(R)){for(var L=0,O=R.length;L<O;L++){this.plug(R[L]);}}else{this._plug(R.fn,R.cfg);}}}return this;},unplug:function(L){if(L){this._unplug(L);}else{var B;for(B in this._plugins){if(this._plugins.hasOwnProperty(B)){this._unplug(B);}}}return this;},hasPlugin:function(B){return(this._plugins[B]&&this[B]);},_initPlugins:function(B){var O=this._getClasses(),R,L;for(L=O.length-1;L>=0;L--){R=O[L];if(R.PLUGINS){this.plug(R.PLUGINS);}}if(B&&B.plugins){this.plug(B.plugins);}},_destroyPlugins:function(){this._unplug();},_plug:function(O,B){if(O&&O.NS){var L=O.NS;B=B||{};B.host=this;if(this.hasPlugin(L)){this[L].setAttrs(B);}else{this[L]=new O(B);this._plugins[L]=O;}}},_unplug:function(O){var L=O,B=this._plugins;if(M.isFunction(O)){L=O.NS;if(L&&(!B[L]||B[L]!==O)){L=null;}}if(L){if(this[L]){this[L].destroy();delete this[L];}if(B[L]){delete B[L];}}}};C.namespace("Plugin").Host=F;var J=C.Object,K=".",H="destroy",Q="init",P="initialized",I="destroyed",E="initializer",D=Object.prototype.constructor,N="destructor";function G(){C.Attribute.call(this);this.init.apply(this,arguments);}G.NAME="base";G.ATTRS={initialized:{readOnly:true,value:false},destroyed:{readOnly:true,value:false}};G.prototype={init:function(B){this._yuievt.config.prefix=this.name=this.constructor.NAME;this.publish(Q,{queuable:false,defaultFn:this._defInitFn});C.Plugin.Host.call(this);this.fire(Q,{cfg:B});return this;},destroy:function(){this.publish(H,{queuable:false,defaultFn:this._defDestroyFn});this.fire(H);return this;},_defInitFn:function(B){this._initHierarchy(B.cfg);this._set(P,true);},_defDestroyFn:function(B){this._destroyHierarchy();this._set(I,true);},_getClasses:function(){if(!this._classes){this._initHierarchyData();}return this._classes;},_getAttrCfgs:function(){if(!this._attrs){this._initHierarchyData();}return this._attrs;},_filterAttrCfgs:function(O,B){var L={};if(O.ATTRS){C.each(O.ATTRS,function(S,R){if(B[R]){L[R]=B[R];delete B[R];}});}return L;},_initHierarchyData:function(){var O=this.constructor,L=[],B=[];while(O&&O.prototype){L[L.length]=O;if(O.ATTRS){B[B.length]=O.ATTRS;}O=O.superclass?O.superclass.constructor:null;}this._classes=L;this._attrs=this._aggregateAttrs(B);},_aggregateAttrs:function(S){var B,O,L,V,U,R,T={};if(S){for(R=S.length-1;R>=0;--R){O=S[R];for(B in O){if(O.hasOwnProperty(B)){L=C.merge(O[B]);V=L.value;if(V&&!L.useRef&&(D===V.constructor||M.isArray(V))){L.value=C.clone(V);}U=null;if(B.indexOf(K)!==-1){U=B.split(K);B=U.shift();}if(U&&T[B]&&T[B].value){J.setValue(T[B].value,U,V);}else{if(!U){if(!T[B]){T[B]=L;}else{T[B]=C.mix(T[B],L,true);}}}}}}}return T;},_initHierarchy:function(T){var S,B,O,V,R,L=this._getClasses(),U=this._getAttrCfgs();for(O=L.length-1;O>=0;O--){S=L[O];B=S.prototype;if(S._yuibuild&&S._yuibuild.exts&&!S._yuibuild.dynamic){for(V=0,R=S._yuibuild.exts.length;V<R;V++){S._yuibuild.exts[V].apply(this,arguments);}}this.addAttrs(this._filterAttrCfgs(S,U),T);if(B.hasOwnProperty(E)){B[E].apply(this,arguments);}}},_destroyHierarchy:function(){var S,L,R,B,O=this._getClasses();for(R=0,B=O.length;R<B;R++){S=O[R];L=S.prototype;if(L.hasOwnProperty(N)){L[N].apply(this,arguments);}}},toString:function(){return this.constructor.NAME+"["+C.stamp(this)+"]";}};C.mix(G,C.Attribute,false,null,1);C.mix(G,C.Plugin.Host,false,null,1);G.prototype.constructor=G;C.Base=G;var A=C.Base;A._buildCfg={aggregates:["ATTRS","PLUGINS"]};A.build=function(B,T,X,W){var Z=A.build,L=Z._getClass(T,W),V=Z._getAggregates(T,W),R=L._yuibuild.dynamic,U,S,O,Y;if(R){if(V){for(U=0,S=V.length;U<S;++U){O=V[U];if(T.hasOwnProperty(O)){L[O]=M.isArray(T[O])?[]:{};}}C.aggregate(L,T,true,V);}}for(U=0,S=X.length;U<S;U++){Y=X[U];if(V){C.aggregate(L,Y,true,V);}C.mix(L,Y,true,null,1);L._yuibuild.exts.push(Y);}L.prototype.hasImpl=Z._hasImpl;if(R){L.NAME=B;L.prototype.constructor=L;}return L;};C.mix(A.build,{_template:function(B){function L(){L.superclass.constructor.apply(this,arguments);var S=L._yuibuild.exts,O=S.length,R;for(R=0;R<O;R++){S[R].apply(this,arguments);}return this;}C.extend(L,B);return L;},_hasImpl:function(L){if(this.constructor._yuibuild){var R=this.constructor._yuibuild.exts,B=R.length,O;for(O=0;O<B;O++){if(R[O]===L){return true;}}}return false;},_getClass:function(B,L){var O=(L&&false===L.dynamic)?false:true,R=(O)?A.build._template(B):B;R._yuibuild={id:null,exts:[],dynamic:O};return R;},_getAggregates:function(B,L){var O=[],S=(L&&L.aggregates),T=B,R;while(T&&T.prototype){R=T._buildCfg&&T._buildCfg.aggregates;if(R){O=O.concat(R);}T=T.superclass?T.superclass.constructor:null;}if(S){O=O.concat(S);}return O;}});},"@VERSION@",{requires:["attribute"]});