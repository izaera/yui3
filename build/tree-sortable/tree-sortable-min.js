YUI.add("tree-sortable",function(n,r){function u(){}function t(){}u.prototype={sortReverse:!1,initializer:function(r){this.nodeExtensions=this.nodeExtensions.concat(n.Tree.Node.Sortable),r&&(r.sortComparator&&(this.sortComparator=r.sortComparator),"sortReverse"in r&&(this.sortReverse=r.sortReverse))},sort:function(r){return this.sortNode(this.rootNode,n.merge(r,{deep:!0}))},sortComparator:function(r){return r.index()},sortNode:function(r,t){var e,o,s;return r.children.length&&((t=t||{}).deep?(t=n.merge(t,{deep:!1}),(e=this).traverseNode(r,function(r){e.sortNode(r,t)})):(o=this._getSortComparator(r,t),s="sortReverse"in t?r.sortReverse=t.sortReverse:("sortReverse"in r?r:this).sortReverse,r.children.sort(n.rbind(this._sort,this,o,s)),r._isIndexStale=!0,t.silent||this.fire("sort",{node:r,reverse:!!s,src:t.src}))),this},_compare:function(r,t){return r<t?-1:t<r?1:0},_compareReverse:function(r,t){return t<r?-1:r<t?1:0},_getDefaultNodeIndex:function(r,t){var e,o,s,n=r.children,i=this._getSortComparator(r),a=n.length,p=0,r=("sortReverse"in r?r:this).sortReverse;if(!a)return a;if(i._unboundComparator===u.prototype.sortComparator)return r?0:a;for(e=r?this._compareReverse:this._compare,o=i(t);p<a;)e(i(n[s=p+a>>1]),o)<0?p=1+s:a=s;return p},_getSortComparator:function(r,t){var e,o;return t&&t.sortComparator?e=r.sortComparator=t.sortComparator:o=r.sortComparator?(e=r.sortComparator,r):(e=this.sortComparator,this),(t=function(){return e.apply(o,arguments)})._unboundComparator=e,t},_sort:function(r,t,e,o){return this[o?"_compareReverse":"_compare"](e(r),e(t))}},n.Tree.Sortable=u,t.prototype={sort:function(r){return this.tree.sortNode(this,r),this}},n.Tree.Node.Sortable=t},"@VERSION@",{requires:["tree"]});