
    /**
     * Provides the ability to drag a Node.
     * @module dd
     * @submodule dd-drag
     */
    /**
     * Provides the ability to drag a Node.
     * @class Drag
     * @extends Base
     * @constructor
     * @namespace DD
     */

    var DDM = Y.DD.DDM,
        NODE = 'node',
        DRAGGING = 'dragging',
        DRAG_NODE = 'dragNode',
        OFFSET_HEIGHT = 'offsetHeight',
        OFFSET_WIDTH = 'offsetWidth',
        /**
        * Handles the mouseup DOM event, does nothing internally just fires.
        * @event drag:mouseup
        * @bubbles DDM
        * @type {CustomEvent}
        */
        /**
        * Handles the mousedown DOM event, checks to see if you have a valid handle then starts the drag timers.
        * @event drag:mouseDown
        * @preventable _defMouseDownFn
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl><dt>ev</dt><dd>The original mousedown event.</dd></dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        EV_MOUSE_DOWN = 'drag:mouseDown',
        /**
        * Fires after the mousedown event has been cleared.
        * @event drag:afterMouseDown
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl><dt>ev</dt><dd>The original mousedown event.</dd></dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        EV_AFTER_MOUSE_DOWN = 'drag:afterMouseDown',
        /**
        * Fires after a handle is removed.
        * @event drag:removeHandle
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl><dt>handle</dt><dd>The handle that was removed.</dd></dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        EV_REMOVE_HANDLE = 'drag:removeHandle',
        /**
        * Fires after a handle is added.
        * @event drag:addHandle
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl><dt>handle</dt><dd>The handle that was added.</dd></dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        EV_ADD_HANDLE = 'drag:addHandle',
        /**
        * Fires after an invalid selector is removed.
        * @event drag:removeInvalid
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl><dt>handle</dt><dd>The handle that was removed.</dd></dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        EV_REMOVE_INVALID = 'drag:removeInvalid',
        /**
        * Fires after an invalid selector is added.
        * @event drag:addInvalid
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl><dt>handle</dt><dd>The handle that was added.</dd></dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        EV_ADD_INVALID = 'drag:addInvalid',
        /**
        * Fires at the start of a drag operation.
        * @event drag:start
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl>
        * <dt>pageX</dt><dd>The original node position X.</dd>
        * <dt>pageY</dt><dd>The original node position Y.</dd>
        * <dt>startTime</dt><dd>The startTime of the event. getTime on the current Date object.</dd>
        * </dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        EV_START = 'drag:start',
        /**
        * Fires at the end of a drag operation.
        * @event drag:end
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl>
        * <dt>pageX</dt><dd>The current node position X.</dd>
        * <dt>pageY</dt><dd>The current node position Y.</dd>
        * <dt>startTime</dt><dd>The startTime of the event, from the start event.</dd>
        * <dt>endTime</dt><dd>The endTime of the event. getTime on the current Date object.</dd>
        * </dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        EV_END = 'drag:end',
        /**
        * Fires every mousemove during a drag operation.
        * @event drag:drag
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl>
        * <dt>pageX</dt><dd>The current node position X.</dd>
        * <dt>pageY</dt><dd>The current node position Y.</dd>
        * <dt>scroll</dt><dd>Should a scroll action occur.</dd>
        * <dt>info</dt><dd>Object hash containing calculated XY arrays: start, xy, delta, offset</dd>
        * </dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        EV_DRAG = 'drag:drag',
        /**
        * Fires when this node is aligned.
        * @event drag:align
        * @preventable _defAlignFn
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl>
        * <dt>pageX</dt><dd>The current node position X.</dd>
        * <dt>pageY</dt><dd>The current node position Y.</dd>
        * </dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        EV_ALIGN = 'drag:align',
        /**
        * Fires when this node is over a Drop Target. (Fired from dd-drop)
        * @event drag:over
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl>
        * <dt>drop</dt><dd>The drop object at the time of the event.</dd>
        * <dt>drag</dt><dd>The drag object at the time of the event.</dd>
        * </dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        /**
        * Fires when this node enters a Drop Target. (Fired from dd-drop)
        * @event drag:enter
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl>
        * <dt>drop</dt><dd>The drop object at the time of the event.</dd>
        * <dt>drag</dt><dd>The drag object at the time of the event.</dd>
        * </dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        /**
        * Fires when this node exits a Drop Target. (Fired from dd-drop)
        * @event drag:exit
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl>
        * <dt>drop</dt><dd>The drop object at the time of the event.</dd>
        * </dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        /**
        * Fires when this node is dropped on a valid Drop Target. (Fired from dd-ddm-drop)
        * @event drag:drophit
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl>
        * <dt>drop</dt><dd>The best guess on what was dropped on.</dd>
        * <dt>drag</dt><dd>The drag object at the time of the event.</dd>
        * <dt>others</dt><dd>An array of all the other drop targets that was dropped on.</dd>
        * </dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */
        /**
        * Fires when this node is dropped on an invalid Drop Target. (Fired from dd-ddm-drop)
        * @event drag:dropmiss
        * @param {EventFacade} event An Event Facade object with the following specific property added:
        * <dl>
        * <dt>pageX</dt><dd>The current node position X.</dd>
        * <dt>pageY</dt><dd>The current node position Y.</dd>
        * </dl>
        * @bubbles DDM
        * @type {CustomEvent}
        */

    Drag = function(o) {
        this._lazyAddAttrs = false;
        Drag.superclass.constructor.apply(this, arguments);

        var valid = DDM._regDrag(this);
        if (!valid) {
            Y.error('Failed to register node, already in use: ' + o.node);
        }
    };

    Drag.NAME = 'drag';

    /**
    * This property defaults to "mousedown", but when drag-gestures is loaded, it is changed to "gesturemovestart"
    * @static
    * @property START_EVENT
    */
    Drag.START_EVENT = 'mousedown';

    Drag.ATTRS = {
        /**
        * Y.Node instance to use as the element to initiate a drag operation
        * @attribute node
        * @type Node
        */
        node: {
            setter: function(node) {
                if (this._canDrag(node)) {
                    return node;
                }
                var n = Y.one(node);
                if (!n) {
                    Y.error('DD.Drag: Invalid Node Given: ' + node);
                }
                return n;
            }
        },
        /**
        * Y.Node instance to use as the draggable element, defaults to node
        * @attribute dragNode
        * @type Node
        */
        dragNode: {
            setter: function(node) {
                if (this._canDrag(node)) {
                    return node;
                }
                var n = Y.one(node);
                if (!n) {
                    Y.error('DD.Drag: Invalid dragNode Given: ' + node);
                }
                return n;
            }
        },
        /**
        * Offset the drag element by the difference in cursor position: default true
        * @attribute offsetNode
        * @type Boolean
        */
        offsetNode: {
            value: true
        },
        /**
        * Center the dragNode to the mouse position on drag:start: default false
        * @attribute startCentered
        * @type Boolean
        */
        startCentered: {
            value: false
        },
        /**
        * The number of pixels to move to start a drag operation, default is 3.
        * @attribute clickPixelThresh
        * @type Number
        */
        clickPixelThresh: {
            value: DDM.get('clickPixelThresh')
        },
        /**
        * The number of milliseconds a mousedown has to pass to start a drag operation, default is 1000.
        * @attribute clickTimeThresh
        * @type Number
        */
        clickTimeThresh: {
            value: DDM.get('clickTimeThresh')
        },
        /**
        * Set to lock this drag element so that it can't be dragged: default false.
        * @attribute lock
        * @type Boolean
        */
        lock: {
            value: false,
            setter: function(lock) {
                if (lock) {
                    this.get(NODE).addClass(DDM.CSS_PREFIX + '-locked');
                } else {
                    this.get(NODE).removeClass(DDM.CSS_PREFIX + '-locked');
                }
                return lock;
            }
        },
        /**
        * A payload holder to store arbitrary data about this drag object, can be used to store any value.
        * @attribute data
        * @type Mixed
        */
        data: {
            value: false
        },
        /**
        * If this is false, the drag element will not move with the cursor: default true. Can be used to "resize" the element.
        * @attribute move
        * @type Boolean
        */
        move: {
            value: true
        },
        /**
        * Use the protective shim on all drag operations: default true. Only works with dd-ddm, not dd-ddm-base.
        * @attribute useShim
        * @type Boolean
        */
        useShim: {
            value: true
        },
        /**
        * Config option is set by Drag to inform you of which handle fired the drag event (in the case that there are several handles): default false.
        * @attribute activeHandle
        * @type Node
        */
        activeHandle: {
            value: false
        },
        /**
        * By default a drag operation will only begin if the mousedown occurred with the primary mouse button.
        * Setting this to false will allow for all mousedown events to trigger a drag.
        * @attribute primaryButtonOnly
        * @type Boolean
        */
        primaryButtonOnly: {
            value: true
        },
        /**
        * This attribute is not meant to be used by the implementor, it is meant to be used as an Event tracker so you can listen for it to change.
        * @attribute dragging
        * @type Boolean
        */
        dragging: {
            value: false
        },
        parent: {
            value: false
        },
        /**
        * This attribute only works if the dd-drop module has been loaded. It will make this node a drop target as well as draggable.
        * @attribute target
        * @type Boolean
        */
        target: {
            value: false,
            setter: function(config) {
                this._handleTarget(config);
                return config;
            }
        },
        /**
        * This attribute only works if the dd-drop module is active. It will set the dragMode (point, intersect, strict) of this Drag instance.
        * @attribute dragMode
        * @type String
        */
        dragMode: {
            value: null,
            setter: function(mode) {
                return DDM._setDragMode(mode);
            }
        },
        /**
        * Array of groups to add this drag into.
        * @attribute groups
        * @type Array
        */
        groups: {
            value: ['default'],
            getter: function() {
                if (!this._groups) {
                    this._groups = {};
                    return [];
                }

                return Y.Object.keys(this._groups);
            },
            setter: function(g) {
                this._groups = Y.Array.hash(g);
                return g;
            }
        },
        /**
        * Array of valid handles to add. Adding something here will set all handles, even if previously added with addHandle
        * @attribute handles
        * @type Array
        */
        handles: {
            value: null,
            setter: function(g) {
                if (g) {
                    this._handles = {};
                    Y.Array.each(g, function(v) {
                        var key = v;
                        if (v instanceof Y.Node || v instanceof Y.NodeList) {
                            key = v._yuid;
                        }
                        this._handles[key] = v;
                        this._fixUserSelect(v);
                    }, this);
                } else {
                    this._handles = null;
                }
                return g;
            }
        },
        /**
        * Controls the default bubble parent for this Drag instance. Default: Y.DD.DDM. Set to false to disable bubbling. Use bubbleTargets in config
        * @deprecated
        * @attribute bubbles
        * @type Object
        */
        bubbles: {
            setter: function(t) {
                Y.log('bubbles is deprecated use bubbleTargets: HOST', 'warn', 'dd');
                this.addTarget(t);
                return t;
            }
        },
        /**
        * Should the mousedown event be halted. Default: true
        * @attribute haltDown
        * @type Boolean
        */
        haltDown: {
            value: true
        }
    };

    Y.extend(Drag, Y.Base, {
        /**
        * Checks the object for the methods needed to drag the object around.
        * Normally this would be a node instance, but in the case of Graphics, it
        * may be an SVG node or something similar.
        * @method _canDrag
        * @private
        * @param {Object} n The object to check
        * @return {Boolean} True or false if the Object contains the methods needed to Drag
        */
        _canDrag: function(n) {
            if (n && n.setXY && n.getXY && n.test && n.contains) {
                return true;
            }
            return false;
        },
        /**
        * The default bubbleTarget for this object. Default: Y.DD.DDM
        * @private
        * @property _bubbleTargets
        */
        _bubbleTargets: Y.DD.DDM,
        /**
        * Add this Drag instance to a group, this should be used for on-the-fly group additions.
        * @method addToGroup
        * @param {String} g The group to add this Drag Instance to.
        * @chainable
        */
        addToGroup: function(g) {
            this._groups[g] = true;
            DDM._activateTargets();
            return this;
        },
        /**
        * Remove this Drag instance from a group, this should be used for on-the-fly group removals.
        * @method removeFromGroup
        * @param {String} g The group to remove this Drag Instance from.
        * @chainable
        */
        removeFromGroup: function(g) {
            delete this._groups[g];
            DDM._activateTargets();
            return this;
        },
        /**
        * This will be a reference to the Drop instance associated with this drag if the target: true config attribute is set..
        * @property target
        * @type {Object}
        */
        target: null,
        /**
        * Attribute handler for the target config attribute.
        * @private
        * @method _handleTarget
        * @param {Boolean/Object} config The Config
        */
        _handleTarget: function(config) {
            if (Y.DD.Drop) {
                if (config === false) {
                    if (this.target) {
                        DDM._unregTarget(this.target);
                        this.target = null;
                    }
                } else {
                    if (!Y.Lang.isObject(config)) {
                        config = {};
                    }
                    config.bubbleTargets = config.bubbleTargets || this.getTargets();
                    config.node = this.get(NODE);
                    config.groups = config.groups || this.get('groups');
                    this.target = new Y.DD.Drop(config);
                }
            }
        },
        /**
        * Storage Array for the groups this drag belongs to.
        * @private
        * @property _groups
        * @type {Array}
        */
        _groups: null,
        /**
        * This method creates all the events for this Event Target and publishes them so we get Event Bubbling.
        * @private
        * @method _createEvents
        */
        _createEvents: function() {

            this.publish(EV_MOUSE_DOWN, {
                defaultFn: this._defMouseDownFn,
                queuable: false,
                emitFacade: true,
                bubbles: true,
                prefix: 'drag'
            });

            this.publish(EV_ALIGN, {
                defaultFn: this._defAlignFn,
                queuable: false,
                emitFacade: true,
                bubbles: true,
                prefix: 'drag'
            });

            this.publish(EV_DRAG, {
                defaultFn: this._defDragFn,
                queuable: false,
                emitFacade: true,
                bubbles: true,
                prefix: 'drag'
            });

            this.publish(EV_END, {
                defaultFn: this._defEndFn,
                preventedFn: this._prevEndFn,
                queuable: false,
                emitFacade: true,
                bubbles: true,
                prefix: 'drag'
            });

            var ev = [
                EV_AFTER_MOUSE_DOWN,
                EV_REMOVE_HANDLE,
                EV_ADD_HANDLE,
                EV_REMOVE_INVALID,
                EV_ADD_INVALID,
                EV_START,
                'drag:drophit',
                'drag:dropmiss',
                'drag:over',
                'drag:enter',
                'drag:exit'
            ];

            Y.Array.each(ev, function(v) {
                this.publish(v, {
                    type: v,
                    emitFacade: true,
                    bubbles: true,
                    preventable: false,
                    queuable: false,
                    prefix: 'drag'
                });
            }, this);
        },
        /**
        * A private reference to the mousedown DOM event
        * @private
        * @property _ev_md
        * @type {EventFacade}
        */
        _ev_md: null,
        /**
        * The getTime of the mousedown event. Not used, just here in case someone wants/needs to use it.
        * @private
        * @property _startTime
        * @type Date
        */
        _startTime: null,
        /**
        * The getTime of the mouseup event. Not used, just here in case someone wants/needs to use it.
        * @private
        * @property _endTime
        * @type Date
        */
        _endTime: null,
        /**
        * A private hash of the valid drag handles
        * @private
        * @property _handles
        * @type {Object}
        */
        _handles: null,
        /**
        * A private hash of the invalid selector strings
        * @private
        * @property _invalids
        * @type {Object}
        */
        _invalids: null,
        /**
        * A private hash of the default invalid selector strings: {'textarea': true, 'input': true, 'a': true, 'button': true, 'select': true}
        * @private
        * @property _invalidsDefault
        * @type {Object}
        */
        _invalidsDefault: {'textarea': true, 'input': true, 'a': true, 'button': true, 'select': true },
        /**
        * Private flag to see if the drag threshhold was met
        * @private
        * @property _dragThreshMet
        * @type {Boolean}
        */
        _dragThreshMet: null,
        /**
        * Flag to determine if the drag operation came from a timeout
        * @private
        * @property _fromTimeout
        * @type {Boolean}
        */
        _fromTimeout: null,
        /**
        * Holder for the setTimeout call
        * @private
        * @property _clickTimeout
        * @type {Boolean}
        */
        _clickTimeout: null,
        /**
        * The offset of the mouse position to the element's position
        * @property deltaXY
        * @type {Array}
        */
        deltaXY: null,
        /**
        * The initial mouse position
        * @property startXY
        * @type {Array}
        */
        startXY: null,
        /**
        * The initial element position
        * @property nodeXY
        * @type {Array}
        */
        nodeXY: null,
        /**
        * The position of the element as it's moving (for offset calculations)
        * @property lastXY
        * @type {Array}
        */
        lastXY: null,
        /**
        * The xy that the node will be set to. Changing this will alter the position as it's dragged.
        * @property actXY
        * @type {Array}
        */
        actXY: null,
        /**
        * The real xy position of the node.
        * @property realXY
        * @type {Array}
        */
        realXY: null,
        /**
        * The XY coords of the mousemove
        * @property mouseXY
        * @type {Array}
        */
        mouseXY: null,
        /**
        * A region object associated with this drag, used for checking regions while dragging.
        * @property region
        * @type Object
        */
        region: null,
        /**
        * Handler for the mouseup DOM event
        * @private
        * @method _handleMouseUp
        * @param {EventFacade} ev The Event
        */
        _handleMouseUp: function() {
            this.fire('drag:mouseup');
            this._fixIEMouseUp();
            if (DDM.activeDrag) {
                DDM._end();
            }
        },
        /**
        * The function we use as the ondragstart and ontouchmove handler when we start a drag or touch
        * in Internet Explorer. This keeps IE from blowing up on images as drag handles.
        * This keeps mobile browsers from scrolling on drag:drag.
        * @private
        * @method _fixDragStart
        * @param {Event} e The Event
        */
        _fixDragStart: function(e) {
            if (this.validClick(e)) {
                e.preventDefault();
            }
        },
        /**
        * The function we use to prevent user selection on drag:drag.
        * @private
        * @method _fixUserSelect
        * @param {String|Node} handles Handle(s) for dragging.
        */
        _fixUserSelect: function(handles, undo) {
            var nodeList = Y.all(handles);
            if (nodeList) {
                if (undo) {
                    nodeList.setStyles({
                        '-moz-user-select': 'auto',
                        '-ms-user-select': 'auto',
                        '-webkit-user-select': 'auto',
                        'user-select': 'auto'
                    });
                } else {
                    nodeList.setStyles({
                        '-moz-user-select': 'none',
                        '-ms-user-select': 'none',
                        '-webkit-user-select': 'none',
                        'user-select': 'none'
                    });
                }
            }
        },
        /**
        * The function we use as the onselectstart handler when we start a drag in Internet Explorer
        * @private
        * @method _ieSelectFix
        */
        _ieSelectFix: function() {
            return false;
        },
        /**
        * We will hold a copy of the current "onselectstart" method on this property, and reset it after we are done using it.
        * @private
        * @property _ieSelectBack
        */
        _ieSelectBack: null,
        /**
        * This method copies the onselectstart listner on the document to the _ieSelectFix property
        * @private
        * @method _fixIEMouseDown
        */
        _fixIEMouseDown: function() {
            if (Y.UA.ie) {
                this._ieSelectBack = Y.config.doc.body.onselectstart;
                Y.config.doc.body.onselectstart = this._ieSelectFix;
            }
        },
        /**
        * This method copies the _ieSelectFix property back to the onselectstart listner on the document.
        * @private
        * @method _fixIEMouseUp
        */
        _fixIEMouseUp: function() {
            if (Y.UA.ie) {
                Y.config.doc.body.onselectstart = this._ieSelectBack;
            }
        },
        /**
        * Handler for the mousedown DOM event
        * @private
        * @method _handleMouseDownEvent
        * @param {EventFacade} ev  The Event
        */
        _handleMouseDownEvent: function(ev) {
            if (this.validClick(ev)) {
                ev.preventDefault();
            }
            this.fire(EV_MOUSE_DOWN, { ev: ev });
        },
        /**
        * Handler for the mousedown DOM event
        * @private
        * @method _defMouseDownFn
        * @param {EventFacade} e  The Event
        */
        _defMouseDownFn: function(e) {
            var ev = e.ev;

            this._dragThreshMet = false;
            this._ev_md = ev;

            if (this.get('primaryButtonOnly') && ev.button > 1) {
                return false;
            }
            if (this.validClick(ev)) {
                this._fixIEMouseDown(ev);
                if (!ev.touches) {
                    //Only do these if it's not a touch
                    if (this.get('haltDown')) {
                        Y.log('Halting MouseDown', 'info', 'drag');
                        ev.halt();
                    } else {
                        Y.log('Preventing Default on MouseDown', 'info', 'drag');
                        ev.preventDefault();
                    }
                }

                this._setStartPosition([ev.pageX, ev.pageY]);

                DDM.activeDrag = this;

                var clickTimeThresh = this.get('clickTimeThresh');

                if (ev.touches) {
                    clickTimeThresh = Math.max(750, clickTimeThresh);
                }

                this._clickTimeout = Y.later(clickTimeThresh, this, this._timeoutCheck);
            }
            this.fire(EV_AFTER_MOUSE_DOWN, { ev: ev });
        },
        /**
        * Method first checks to see if we have handles, if so it validates the click
        * against the handle. Then if it finds a valid handle, it checks it against
        * the invalid handles list. Returns true if a good handle was used, false otherwise.
        * @method validClick
        * @param {EventFacade} ev  The Event
        * @return {Boolean}
        */
        validClick: function(ev) {
            var r = false, n = false,
            tar = ev.target,
            hTest = null,
            els = null,
            nlist = null,
            set = false;
            if (this._handles) {
                Y.Object.each(this._handles, function(i, n) {
                    if (i instanceof Y.Node || i instanceof Y.NodeList) {
                        if (!r) {
                            nlist = i;
                            if (nlist instanceof Y.Node) {
                                nlist = new Y.NodeList(i._node);
                            }
                            nlist.each(function(nl) {
                                if (nl.contains(tar)) {
                                    r = true;
                                }
                            });
                        }
                    } else if (Y.Lang.isString(n)) {
                        //Am I this or am I inside this
                        if (tar.test(n + ', ' + n + ' *') && !hTest) {
                            hTest = n;
                            r = true;
                        }
                    }
                });
            } else {
                n = this.get(NODE);
                if (n.contains(tar) || n.compareTo(tar)) {
                    r = true;
                }
            }
            if (r) {
                if (this._invalids) {
                    Y.Object.each(this._invalids, function(i, n) {
                        if (Y.Lang.isString(n)) {
                            //Am I this or am I inside this
                            if (tar.test(n + ', ' + n + ' *')) {
                                r = false;
                            }
                        }
                    });
                }
            }
            if (r) {
                if (hTest) {
                    els = ev.currentTarget.all(hTest);
                    set = false;
                    els.each(function(n) {
                        if ((n.contains(tar) || n.compareTo(tar)) && !set) {
                            set = true;
                            this.set('activeHandle', n);
                        }
                    }, this);
                } else {
                    this.set('activeHandle', this.get(NODE));
                }
            }
            return r;
        },
        /**
        * Sets the current position of the Element and calculates the offset
        * @private
        * @method _setStartPosition
        * @param {Array} xy The XY coords to set the position to.
        */
        _setStartPosition: function(xy) {
            this.startXY = xy;

            this.nodeXY = this.lastXY = this.realXY = this.get(NODE).getXY();

            if (this.get('offsetNode')) {
                this.deltaXY = [(this.startXY[0] - this.nodeXY[0]), (this.startXY[1] - this.nodeXY[1])];
            } else {
                this.deltaXY = [0, 0];
            }
        },
        /**
        * The method passed to setTimeout to determine if the clickTimeThreshold was met.
        * @private
        * @method _timeoutCheck
        */
        _timeoutCheck: function() {
            if (!this.get('lock') && !this._dragThreshMet && this._ev_md) {
                this._fromTimeout = this._dragThreshMet = true;
                this.start();
                this._alignNode([this._ev_md.pageX, this._ev_md.pageY], true);
            }
        },
        /**
        * Remove a Selector added by addHandle
        * @method removeHandle
        * @param {String} str The selector for the handle to be removed.
        * @chainable
        */
        removeHandle: function(str) {
            var key = str;
            if (str instanceof Y.Node || str instanceof Y.NodeList) {
                key = str._yuid;
            }
            if (this._handles[key]) {
                delete this._handles[key];
                this._fixUserSelect(str, true);
                this.fire(EV_REMOVE_HANDLE, { handle: str });
            }
            return this;
        },
        /**
        * Add a handle to a drag element. Drag only initiates when a mousedown happens on this element.
        * @method addHandle
        * @param {String} str The selector to test for a valid handle. Must be a child of the element.
        * @chainable
        */
        addHandle: function(str) {
            if (!this._handles) {
                this._handles = {};
            }
            var key = str;
            if (str instanceof Y.Node || str instanceof Y.NodeList) {
                key = str._yuid;
            }
            this._handles[key] = str;
            this._fixUserSelect(str);
            this.fire(EV_ADD_HANDLE, { handle: str });
            return this;
        },
        /**
        * Remove an invalid handle added by addInvalid
        * @method removeInvalid
        * @param {String} str The invalid handle to remove from the internal list.
        * @chainable
        */
        removeInvalid: function(str) {
            if (this._invalids[str]) {
                this._invalids[str] = null;
                delete this._invalids[str];
                this.fire(EV_REMOVE_INVALID, { handle: str });
            }
            return this;
        },
        /**
        * Add a selector string to test the handle against. If the test passes the drag operation will not continue.
        * @method addInvalid
        * @param {String} str The selector to test against to determine if this is an invalid drag handle.
        * @chainable
        */
        addInvalid: function(str) {
            if (Y.Lang.isString(str)) {
                this._invalids[str] = true;
                this.fire(EV_ADD_INVALID, { handle: str });
            }
            return this;
        },
        /**
        * Internal init handler
        * @private
        * @method initializer
        */
        initializer: function() {

            this.get(NODE).dd = this;

            if (!this.get(NODE).get('id')) {
                var id = Y.stamp(this.get(NODE));
                this.get(NODE).set('id', id);
            }

            this.actXY = [];

            this._invalids = Y.clone(this._invalidsDefault, true);

            this._createEvents();

            if (!this.get(DRAG_NODE)) {
                this.set(DRAG_NODE, this.get(NODE));
            }

            //Fix for #2528096
            //Don't prep the DD instance until all plugins are loaded.
            this.on('initializedChange', Y.bind(this._prep, this));

            //Shouldn't have to do this..
            this.set('groups', this.get('groups'));
        },
        /**
        * Attach event listners and add classname
        * @private
        * @method _prep
        */
        _prep: function() {
            this._dragThreshMet = false;
            var node = this.get(NODE);
            node.addClass(DDM.CSS_PREFIX + '-draggable');
            node.on(Drag.START_EVENT, Y.bind(this._handleMouseDownEvent, this));
            node.on('mouseup', Y.bind(this._handleMouseUp, this));
            node.on(['dragstart', 'touchmove'], Y.bind(this._fixDragStart, this));
        },
        /**
        * Detach event listeners and remove classname
        * @private
        * @method _unprep
        */
        _unprep: function() {
            var node = this.get(NODE);
            node.removeClass(DDM.CSS_PREFIX + '-draggable');
            node.detachAll('mouseup');
            node.detachAll('dragstart');
            node.detachAll(Drag.START_EVENT);
            this.mouseXY = [];
            this.deltaXY = [0,0];
            this.startXY = [];
            this.nodeXY = [];
            this.lastXY = [];
            this.actXY = [];
            this.realXY = [];
        },
        /**
        * Starts the drag operation
        * @method start
        * @chainable
        */
        start: function() {
            if (!this.get('lock') && !this.get(DRAGGING)) {
                var node = this.get(NODE), ow, oh, xy;
                this._startTime = (new Date()).getTime();

                DDM._start();
                node.addClass(DDM.CSS_PREFIX + '-dragging');
                this.fire(EV_START, {
                    pageX: this.nodeXY[0],
                    pageY: this.nodeXY[1],
                    startTime: this._startTime
                });
                node = this.get(DRAG_NODE);
                xy = this.nodeXY;

                ow = node.get(OFFSET_WIDTH);
                oh = node.get(OFFSET_HEIGHT);

                if (this.get('startCentered')) {
                    this._setStartPosition([xy[0] + (ow / 2), xy[1] + (oh / 2)]);
                }


                this.region = {
                    '0': xy[0],
                    '1': xy[1],
                    area: 0,
                    top: xy[1],
                    right: xy[0] + ow,
                    bottom: xy[1] + oh,
                    left: xy[0]
                };
                this.set(DRAGGING, true);
            }
            return this;
        },
        /**
        * Ends the drag operation
        * @method end
        * @chainable
        */
        end: function() {
            this._endTime = (new Date()).getTime();
            if (this._clickTimeout) {
                this._clickTimeout.cancel();
            }
            this._dragThreshMet = this._fromTimeout = false;

            if (!this.get('lock') && this.get(DRAGGING)) {
                this.fire(EV_END, {
                    pageX: this.lastXY[0],
                    pageY: this.lastXY[1],
                    startTime: this._startTime,
                    endTime: this._endTime
                });
            }
            this.get(NODE).removeClass(DDM.CSS_PREFIX + '-dragging');
            this.set(DRAGGING, false);
            this.deltaXY = [0, 0];

            return this;
        },
        /**
        * Handler for fixing the selection in IE
        * @private
        * @method _defEndFn
        */
        _defEndFn: function() {
            this._fixIEMouseUp();
            this._ev_md = null;
        },
        /**
        * Handler for preventing the drag:end event. It will reset the node back to it's start position
        * @private
        * @method _prevEndFn
        */
        _prevEndFn: function() {
            this._fixIEMouseUp();
            //Bug #1852577
            this.get(DRAG_NODE).setXY(this.nodeXY);
            this._ev_md = null;
            this.region = null;
        },
        /**
        * Calculates the offsets and set's the XY that the element will move to.
        * @private
        * @method _align
        * @param {Array} xy The xy coords to align with.
        */
        _align: function(xy) {
            this.fire(EV_ALIGN, {pageX: xy[0], pageY: xy[1] });
        },
        /**
        * Calculates the offsets and set's the XY that the element will move to.
        * @private
        * @method _defAlignFn
        * @param {EventFacade} e The drag:align event.
        */
        _defAlignFn: function(e) {
            this.actXY = [e.pageX - this.deltaXY[0], e.pageY - this.deltaXY[1]];
        },
        /**
        * This method performs the alignment before the element move.
        * @private
        * @method _alignNode
        * @param {Array} eXY The XY to move the element to, usually comes from the mousemove DOM event.
        */
        _alignNode: function(eXY, scroll) {
            this._align(eXY);
            if (!scroll) {
                this._moveNode();
            }
        },
        /**
        * This method performs the actual element move.
        * @private
        * @method _moveNode
        */
        _moveNode: function(scroll) {
            //if (!this.get(DRAGGING)) {
            //    return;
            //}
            var diffXY = [], diffXY2 = [], startXY = this.nodeXY, xy = this.actXY;

            diffXY[0] = (xy[0] - this.lastXY[0]);
            diffXY[1] = (xy[1] - this.lastXY[1]);

            diffXY2[0] = (xy[0] - this.nodeXY[0]);
            diffXY2[1] = (xy[1] - this.nodeXY[1]);


            this.region = {
                '0': xy[0],
                '1': xy[1],
                area: 0,
                top: xy[1],
                right: xy[0] + this.get(DRAG_NODE).get(OFFSET_WIDTH),
                bottom: xy[1] + this.get(DRAG_NODE).get(OFFSET_HEIGHT),
                left: xy[0]
            };

            this.fire(EV_DRAG, {
                pageX: xy[0],
                pageY: xy[1],
                scroll: scroll,
                info: {
                    start: startXY,
                    xy: xy,
                    delta: diffXY,
                    offset: diffXY2
                }
            });

            this.lastXY = xy;
        },
        /**
        * Default function for drag:drag. Fired from _moveNode.
        * @private
        * @method _defDragFn
        * @param {EventFacade} ev The drag:drag event
        */
        _defDragFn: function(e) {
            if (this.get('move')) {
                if (e.scroll && e.scroll.node) {
                    var domNode = e.scroll.node.getDOMNode();
                    //If it's the window
                    if (domNode === Y.config.win) {
                        domNode.scrollTo(e.scroll.left, e.scroll.top);
                    } else {
                        e.scroll.node.set('scrollTop', e.scroll.top);
                        e.scroll.node.set('scrollLeft', e.scroll.left);
                    }
                }
                this.get(DRAG_NODE).setXY([e.pageX, e.pageY]);
                this.realXY = [e.pageX, e.pageY];
            }
        },
        /**
        * Fired from DragDropMgr (DDM) on mousemove.
        * @private
        * @method _move
        * @param {EventFacade} ev The mousemove DOM event
        */
        _move: function(ev) {
            if (this.get('lock')) {
                return false;
            }

            this.mouseXY = [ev.pageX, ev.pageY];
            if (!this._dragThreshMet && !ev.touches) {
                var diffX = Math.abs(this.startXY[0] - ev.pageX),
                diffY = Math.abs(this.startXY[1] - ev.pageY);
                if (diffX > this.get('clickPixelThresh') || diffY > this.get('clickPixelThresh')) {
                    this._dragThreshMet = true;
                    this.start();
                    this._alignNode([ev.pageX, ev.pageY]);
                }
            } else if (this._dragThreshMet) {
                if (this._clickTimeout) {
                    this._clickTimeout.cancel();
                }
                this._alignNode([ev.pageX, ev.pageY]);
            }
        },
        /**
        * Method will forcefully stop a drag operation. For example calling this from inside an ESC keypress handler will stop this drag.
        * @method stopDrag
        * @chainable
        */
        stopDrag: function() {
            if (this.get(DRAGGING)) {
                DDM._end();
            }
            return this;
        },
        /**
        * Lifecycle destructor, unreg the drag from the DDM and remove listeners
        * @private
        * @method destructor
        */
        destructor: function() {
            this._unprep();
            if (this.target) {
                this.target.destroy();
            }
            DDM._unregDrag(this);
        }
    });
    Y.namespace('DD');
    Y.DD.Drag = Drag;


