(function($) {
	/**
	 * @class elRTE plugin
	 * Show path to selected node in status bar
	 *
	 **/
	elRTE.prototype.plugins.statusbar = function(rte) {
		this.name        = 'statusbar';
		this.description = 'Show path to selected node in status bar';
		this.author      = 'Dmitry Levashov, dio@std42.ru';
		
		rte.view.statusbar.show();
		
		rte.bind('update toggle', function(e) {
			$(e.target.document.body).find('.highlight').removeClass('highlight');
			rte.view.statusbar.empty();
			if (rte.wysiwyg) {
				var n = rte.dom.parents(rte.selection.getNode(), 'all', null, true),
					l = n.length;
				
				while (l--) {
					var link = $('<span>'+n[l].nodeName.toLowerCase()+'</span>')
						.hover( (function(n) { return function(e) { $(n).toggleClass('highlight', e.type=='mouseenter') } })(n[l]) )
						.blur(function() { rte.log('blur') });
					rte.view.statusbar.append(link).append(l>0 ? ' &raquo; ' : '');
				}
			}
		});
		
	}
	
})(jQuery);