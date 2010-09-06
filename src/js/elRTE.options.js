(function($) {
	
	elRTE.prototype.options = {
		/* --- editor view --- */
		
		/* additional css class for editor */
		cssClass : '',
		/* editor workzone(!) height */
		height : 0,
		/* interface language */
		lang : 'en',
		/* current toolbar name */
		toolbar : 'default',
		/* display toolbar? */
		showToolbar : true,
		/* make editor resizable (required jquery.ui.resizable) */
		resizable : true,
		
		/* --- editor options --- */
		/* allow user view and edit source? required plugin or command */
		allowSource : true, 
		/* switch current doc from source to editor when switching to another doc */
		autoToggle : true,
		/* always show documents tabs, if false - tabs hide when only one doc opened */
		alwaysShowTabs : true,
		/* max undo/redo steps, 0 - for disable history */
		historySize : 0,
		/* send debug to log? variants: "all" - for all messages, ["source[.type]", ...] - for debug from only required objects/methods */
		debug    : false,
		
		/* --- editor documents options --- */
		/* load target element as document */
		loadTarget : true,
		/* additional nodes or js objects to load in editor as documents */
		documents : [],
		/* Loading documents rule. If true - new docuent load in background, if false- set active after load */
		loadDocsInBg : true,
		/* number of documents to set active after editor load */
		active  : false,
		/* allow close docuents? Closed document not saves, except autosave is enabled */
		allowCloseDocs : true,
		
		/* --- options for every editor document --- */
		/* iframe doctype */
		doctype : '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">',
		/* documents charset */
		charset : 'UTF-8',
		/* css files to load in iframe */
		cssfiles : ['src/css/elrte-inner.css'],
		
		/* --- filter(clean html) options --- */
		/* if set, all other tags will be removed */
		allowTags : [],
		/* if set, this tags will be removed */
		denyTags : ['applet', 'base', 'basefont', 'bgsound', 'blink', 'body', 'col', 'colgroup', 'iframe', 'isindex', 'frameset', 'html', 'head', 'meta', 'marquee', 'noframes', 'noembed', 'o:p', 'object', 'title', 'xml'],
		/* this attributes will be deleted */
		denyAttr : ['id'],
		/* If false - all text nodes will be wrapped by paragraph tag */
		allowTextNodes : true,
		/* allow browser specific styles like -moz|-webkit|-o */
		allowBrowsersSpecStyles : false,
		/* user replacement rules */
		replace : [ ],
		/* user restore rules */
		restore : [ ],
		
		/* --- paste options --- */
		/* allow/disallow paste text in editor */
		allowPaste : true,
		/* If true - only text will be pasted */
		pasteOnlyText : false,
		/* this attributes will be deleted from pasted text */
		pasteDenyAttr : ['id', 'name', 'class', 'style', 'language', 'onclick', 'ondblclick', 'onhover', 'onkeup', 'onkeydown', 'onkeypress'],
		
		/* --- paste options --- */
		plugins : ['source', 'path', 'wordcount', 'webkit', 'autosave'],
		
		/* --- toolbar options --- */
		
		/* panels configuration */
		panels : {
			document   : ['save'],
			style      : ['bold', 'italic', 'underline', 'strike', 'sup', 'sub'],
			semantic   : ['ins', 'del', 'abbr', 'cite'],
			alignment  : ['left', 'center', 'right', 'justify'],
			direction  : ['ltr', 'rtl'],
			edit       : ['selectall', 'removeformat'],
			misc       : ['nbsp', 'stopfloat', 'hr'],
			history    : ['undo', 'redo'],
			control    : ['docstructure', 'source', 'fullscreen']
		},
		// ?
		panelsNames : {},
		/* toolbars presets */
		toolbars : {
			'empty' : [],
			'default' : ['document', 'edit', 'style', 'semantic', 'alignment', 'direction', 'misc', 'history', 'control', 'style']
		},
		
		/* --- plugins options --- */
		pluginsConf : {
			wordcount : { count : 'all'},
			autosave  : { interval : 0 }
		},
		
		/* --- commands options --- */
		/* commands, wich create text elements use span tag with css instead of tags */
		styleWithCss : true,
		/* commands configuration */
		commandsConf : {
			docstructure : {
				initState : 'on'
			}
			
		}
	}
	
})(jQuery);