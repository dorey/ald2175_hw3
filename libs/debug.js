// allows us to avoid using "console.log('xyz')", which
// breaks all js when no console is available
function log() {
	if(console !== undefined && console.log !== undefined) {
		console.log.apply(console, arguments);
	}
}
function warn() {
	if(console !== undefined && console.warn !== undefined) {
	    console.warn.apply(console, arguments);
	    throw(arguments[0]);
	}
}