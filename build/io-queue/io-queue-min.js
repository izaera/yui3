YUI.add("io-queue",function(n,t){var i=n.io._map["io:0"]||new n.IO;function e(t,e){return i.queue.apply(i,[t,e])}n.mix(n.IO.prototype,{_q:new n.Queue,_qActiveId:null,_qInit:!1,_qState:1,_qShift:function(){var t=this,e=t._q.next();t._qActiveId=e.id,t._qState=0,t.send(e.uri,e.cfg,e.id)},queue:function(t,e){var i=this,t={uri:t,cfg:e,id:this._id++};return i._qInit||(n.on("io:complete",function(t,e){i._qNext(t)},i),i._qInit=!0),i._q.add(t),1===i._qState&&i._qShift(),t},_qNext:function(t){var e=this;e._qState=1,e._qActiveId===t&&0<e._q.size()&&e._qShift()},qPromote:function(t){this._q.promote(t)},qRemove:function(t){this._q.remove(t)},qEmpty:function(){this._q=new n.Queue},qStart:function(){var t=this;t._qState=1,0<t._q.size()&&t._qShift()},qStop:function(){this._qState=0},qSize:function(){return this._q.size()}},!0),e.start=function(){i.qStart()},e.stop=function(){i.qStop()},e.promote=function(t){i.qPromote(t)},e.remove=function(t){i.qRemove(t)},e.size=function(){i.qSize()},e.empty=function(){i.qEmpty()},n.io.queue=e},"@VERSION@",{requires:["io-base","queue-promote"]});