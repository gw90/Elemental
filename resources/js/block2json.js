//probably should put this in a local function on prod... fine for now tho

if (!String.prototype.startsWith) {  // sweet polyfill
  String.prototype.startsWith = function(searchString, position) {
    position = position || 0;
    return this.indexOf(searchString, position) === position;
  };
}

function toArr(nl) {
	return Array.prototype.slice.call(nl);
}

function includesArrItem(str, arr) {
	var includes = false;
	for (var i = 0; i < arr.length; i++) {
		if (str.indexOf(arr[i]) > -1) {
			includes = true;
			break;
		}
	}
	return includes;
}

function getChildElem(parent, cName) {
	var child = null;
	for (var i = 0; i < parent.childNodes.length; i++) {
	    if (parent.childNodes[i].className == cName) {
	        child = parent.childNodes[i];
	        break;
	    }        
	}
	return child;
}

function getElType(node) {
	var classList = node.className.split(' ');
	var type = null;
	for (var i = 0; i < classList.length; i++) {
		if (classList[i].startsWith('e-')) {
			type = classList[i].substr(2, classList[i].length - 1);
			break;
		}
	}
	return type;
}

function getAttrNames(classes) {
	var classList = classes.split(' ');
	var names = [];
	for (var i = 0; i < classList.length; i++) {
		if (attrNames.indexOf(classList[i]) > -1) {
			names.push(classList[i]);
		}
	}
	return names;
}

function getSingleAttrs(element) {
	// get attributes from element
	var attrs = {};
	var attrElems = toArr(element.children);
	for (var i = 0; i < attrElems.length; i++) {
		var attr = getAttrNames(attrElems[i].className);
		attrs[attr] = encodeEntities(attrElems[i].textContent);
	}
	return attrs;
}

function getWrapperAttrs(element) {
	element = element.children[0];
	var attrs = {};
	var attrElems = toArr(element.children);
	for (var i = 0; i < attrElems.length; i++) {
		var attr = getAttrNames(attrElems[i].className);
		attrs[attr] = encodeEntities(attrElems[i].textContent);
	}
	return attrs;
}

function encodeEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function getText(elem) {
	var text = '';
	var childNodes = toArr(elem.children);
	for (var i = 0; i < childNodes.length; i++) {
		if (childNodes[i].classList.contains(textInput)) {
			text += childNodes[i].children[0].textContent;
		}
	}
	return text;
}

function getInlineText(elem) {
	var text = '';
	var childNodes = toArr(elem.children);
	for (var i = 0; i < childNodes.length; i++) {
		if (childNodes[i].classList.contains(textInput)) {
			text += childNodes[i].textContent;
		}
	}
	return text;
}

function traverseTree(parentNode) {
	parentNode = parentNode.children[1];
	var directChildren = toArr(parentNode.children);
	var pushedArr = [];
	for (var i = 0; i < directChildren.length; i++) {
		if (includesArrItem(directChildren[i].className, stackElements)) {  //things like imgs
			var elType = getElType(directChildren[i]);
			if (elType == 'text') {
				elType = '';
			}
			pushedArr.push({
				tag: elType,
				attr: elType ? getSingleAttrs(directChildren[i]) : {},
				text: encodeEntities(getInlineText(directChildren[i]))
			});
		} else if (includesArrItem(directChildren[i].className, wrapperElements)) {  // things that can nest things - ie most elements
			var elType = getElType(directChildren[i]);
			pushedArr.push({
				tag: elType,
				attr: getWrapperAttrs(directChildren[i]),
				child: traverseTree(directChildren[i]),
			});
		}
	}
	return pushedArr;  //recursively get children of blocks
}

function setFrameContent() {
	var script = document.getElementsByClassName('script')[0].cloneNode(true); //should only be one...
	var previewElement = document.getElementsByClassName('previewBody')[0];

	var directChildren = toArr(script.children);
	directChildren.shift();

	var jsonFormat = {
		tag: 'body',
		attr: {},
		child: [],
	};
	var blocks = [];

	for (var i = 0; i < directChildren.length; i++) {
		if (includesArrItem(directChildren[i].className, stackElements)) {  //things like imgs
			var elType = getElType(directChildren[i]);
			if (elType == 'text') {
				elType = '';
			}
			blocks.push({
				tag: elType,
				attr: elType ? getSingleAttrs(directChildren[i]) : {},
				text: encodeEntities(getInlineText(directChildren[i]))
			});
		} else if (includesArrItem(directChildren[i].className, wrapperElements)) {  // things that can nest things - ie most elements
			var elType = getElType(directChildren[i]);
			blocks.push({
				tag: elType,
				child: traverseTree(directChildren[i]),
			});
		}
	}

	if (blocks[0]) {
		jsonFormat = blocks[0];
	}

	fileData[currentFile] = jsonFormat;

	var parsedHtml = json2html(jsonFormat);

	var previewWindow = previewElement;
	previewWindow = (previewWindow.contentWindow) ? previewWindow.contentWindow : (previewWindow.contentDocument.document) ? previewWindow.contentDocument.document : previewWindow.contentDocument;
	previewWindow.document.open();
	previewWindow.document.write(parsedHtml);
	previewWindow.document.close();
}

setFrameContent();

// example:
//
// var json = {
//   tag: 'body',
//   attr: {
//     id: '1',
//     class: ['foo']
//   },
//   child: [{
//     tag: 'h2',
//     text: 'sample text with <code>inline tag</code>'
//   },{
//     tag: 'pre',
//     attr: {
//       id: 'demo',
//       class: ['foo', 'bar']
//     }
//   },{
//     tag: 'pre',
//     attr: {
//       id: 'output',
//       class: ['goo']
//     }
//   },{
//     tag: 'input',
//     attr: {
//       id: 'execute',
//       type: 'button',
//       value: 'execute'
//     }
//   }]
// };