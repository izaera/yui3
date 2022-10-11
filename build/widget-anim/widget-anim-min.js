YUI.add("widget-anim",function(n,i){var s="boundingBox",o="host",a="opacity",d="duration",t="animShow",e="animHide";function u(i){u.superclass.constructor.apply(this,arguments)}u.NS="anim",u.NAME="pluginWidgetAnim",u.ATTRS={duration:{value:.2},animShow:{valueFn:(u.ANIMATIONS={fadeIn:function(){var i=this.get(o),t=i.get(s),e=new n.Anim({node:t,to:{opacity:1},duration:this.get(d)});return i.get("visible")||t.setStyle(a,0),e.on("destroy",function(){this.get("node").setStyle(a,n.UA.ie?1:"")}),e},fadeOut:function(){return new n.Anim({node:this.get(o).get(s),to:{opacity:0},duration:this.get(d)})}}).fadeIn},animHide:{valueFn:u.ANIMATIONS.fadeOut}},n.extend(u,n.Plugin.Base,{initializer:function(i){this._bindAnimShow(),this._bindAnimHide(),this.after("animShowChange",this._bindAnimShow),this.after("animHideChange",this._bindAnimHide),this.beforeHostMethod("_uiSetVisible",this._uiAnimSetVisible)},destructor:function(){this.get(t).destroy(),this.get(e).destroy()},_uiAnimSetVisible:function(i){if(this.get(o).get("rendered"))return(i?(this.get(e).stop(),this.get(t)):(this.get(t).stop(),this.get(e))).run(),new n.Do.Prevent},_uiSetVisible:function(i){var t=this.get(o),e=t.getClassName("hidden");t.get(s).toggleClass(e,!i)},_bindAnimShow:function(){this.get(t).on("start",n.bind(function(){this._uiSetVisible(!0)},this))},_bindAnimHide:function(){this.get(e).after("end",n.bind(function(){this._uiSetVisible(!1)},this))}}),n.namespace("Plugin").WidgetAnim=u},"@VERSION@",{requires:["anim-base","plugin","widget"]});