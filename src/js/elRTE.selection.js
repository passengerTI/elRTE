(function($) {
	
	elRTE.prototype.selection = function(rte) {

		var self = this;
		this.rte = rte;
		this.win = null;
		this.doc = null;
		this.dom = rte.dom;
		this.log = rte.log;
		this.node = null;
		
		this.rte.bind('focus', function(e) {
			self.win = e.target.window;
			self.doc = e.target.document;
		}).bind('click', function(e) {
			// self.rte.log(e.target)
		});
	
	}
	
	/**
	 * @return Selection
	 **/
	elRTE.prototype.selection.prototype.getSelection = function() {
		return this.win.getSelection();
	}

	/**
	 * @return Range
	 **/
	elRTE.prototype.selection.prototype.getRange = function() {
		var s = this.getSelection();
		return s.rangeCount ? s.getRangeAt(0) : this.doc.createRange();
	}

	/**
	 * return true if range is collapsed
	 * @return Boolean
	 **/
	elRTE.prototype.selection.prototype.collapsed = function() {
		return this.getRange().collapsed;
	}

	/**
	 * collapse range
	 *
	 * @param  Boolean  collapse to start?
	 * @return selection
	 **/
	elRTE.prototype.selection.prototype.collapse = function(toStart) {
		var s = this.getSelection(), 
			r = this.getRange();
		r.collapse(toStart);
		s.removeAllRanges();
		s.addRange(r);
		return this;
	}


	
	/**
	 * Return clone of selection contents wrapped in div
	 *
	 * @return DOMElement
	 **/
	elRTE.prototype.selection.prototype.cloneContents = function() {
		var c = this.getRange().cloneContents(),
			l = c.childNodes.length, i,
			n = this.dom.create('div');
		for (i=0; i<l; i++) {
			n.appendChild(c.childNodes[i].cloneNode(true));
		}
		return n;
	}
	
	/**
	 * select from start node to end node
	 * @param  DOMElement
	 * @param  DOMElement
	 * @return w3cSelection
	 **/
	elRTE.prototype.selection.prototype.select = function(st, en) {
		var s = this.getSelection(),
			r = this.getRange();

		if (en) {
			r.setStartBefore(st);
			r.setEndAfter(en);
		} else {
			r.selectNode(st);
		}
		
		s.removeAllRanges();
		s.addRange(r);
		return this;
	}
	
	/**
	 * Insert node into begining of selection
	 * @param  DOMElement
	 * @return DOMElement
	 **/
	elRTE.prototype.selection.prototype.insertNode = function(n) {
		var r = this.getRange();
		r.deleteContents();
		r.insertNode(n);
		return n;
	}
	
	/**
	 * Insert html into selection
	 * @param  String
	 * @return selection
	 **/
	elRTE.prototype.selection.prototype.insertHtml = function(html) {
		var n = this.insertNode($(this.dom.create('span')).html(html||'')[0]);
		$(n).replaceWith($(n).html());
		return this;
	}
	
	/**
	 * Create bookmark (to store selection)
	 * @return Array
	 **/
	elRTE.prototype.selection.prototype.getBookmark = function() {
		this.win.focus();
		var r  = this.getRange(),
			r1 = r.cloneRange(),
			r2 = r.cloneRange(),
			s  = this.dom.createBookmark(),
			e  = this.dom.createBookmark();
		
		r2.collapse(false);
		r2.insertNode(e);
		r1.collapse(true);
		r1.insertNode(s);
		this.select(s, e);
		return [s, e];
	}
	
	/**
	 * Move selection to bookmark
	 *
	 * @param Array  array of DOMElements - bookmark nodes
	 * @return selection
	 **/
	elRTE.prototype.selection.prototype.moveToBookmark = function(b) {
		this.win.focus();
		if (b[0] && b[1] && b[0].nodeName && b[1].nodeName) {
			this.select(b[0], b[1]);
			// this.removeBookmark(b);
			b[0].parentNode.removeChild(b[0]);
			b[1].parentNode.removeChild(b[1]);
		}
		return this;
	}
	
	/**
	 * Remove bookmark nodes
	 *
	 * @param Array  array of DOMElements - bookmark nodes
	 * @return selection
	 **/
	elRTE.prototype.selection.prototype.removeBookmark = function(b) {
		if (b[0] && b[1] && b[0].nodeName && b[1].nodeName) {
			b[0].parentNode.removeChild(b[0]);
			b[1].parentNode.removeChild(b[1]);
		}
		return this;
	}
	
	/**
	 * Remove all bookmarks nodes
	 * @return selection
	 **/
	elRTE.prototype.selection.prototype.cleanBookmarks = function(b) {
		$(this.doc.body).find('.elrtebm').remove();
		return this;
	}
	
	/**
	 * Return cached node or common ancestor for selected nodes
	 *
	 * @return DOMElement
	 **/
	elRTE.prototype.selection.prototype.getNode = function() {
		var n = this.node || this.getRange().commonAncestorContainer;
		return n.nodeType == 1 ? n : n.parentNode;
	}
	
	elRTE.prototype.selection.prototype.getSelected = function() {
		var res = [], s, e, c, b;
		
		this.win.focus();


		if (!this.collapsed()) {
			
			b = this.getBookmark();
			this.doc.body.normalize();

			s = b[0];
			e = b[1];
			c = this.dom.commonAncestor(s, e);

			while (this.dom.is(s, 'first') && s!=c && s.parentNode != this.doc.body) {
				s = s.parentNode; 
			}
			while (this.dom.is(e, 'last') && e!=c && e.parentNode != this.doc.body) {
				e = e.parentNode;
			}
			c = this.dom.commonAncestor(s, e);

			res = this.dom.traverse(s, e, c);

			res[0] == b[0] && res.shift();
			res[res.length-1] == b[1] && res.pop();

			this.removeBookmark(b);
			if (res.length==1 && this.dom.is(res[0], 'onlyChild') && res[0].parentNode != this.doc) {
				res = [res[0].parentNode];
			}
		}

		return res;
	}
	
	elRTE.prototype.selection.prototype.filterSelected = function(f) {
		return this.dom.filter(this.getSelected(), f);
	}
	
	elRTE.prototype.selection.prototype.wrapSelected = function(f, wf, w) {
		return this.dom.wrapAll(this.filterSelected(f), wf, w);
	}
	
	elRTE.prototype.selection.prototype.selected = function(opts) {
		var o = $.extend({ filter : '', wrapFilter : '', wrapNode : ''}, opts||{}),
			s = this.getSelected();
			
		if (o.filter) {
			s = this.dom.filter(s, o.filter);
		}
		if (o.wrapFilter && o.wrapNode) {
			s = this.dom.wrapAll(s, o.wrapFilter, o.wrapNode);
		}
		return s;
	}
	
	
	
})(jQuery);