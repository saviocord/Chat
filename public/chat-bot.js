function respondTo(input) {
	
	input = input.toLowerCase();
	console.log('input: '+input);	
	if(RegExp('(hi|hello|hey|hola|howdy)(\\s|!|\\.|$)').test(input))
		return "um... hi?";
		
	if(RegExp('what[^ ]* up').test(input) || RegExp('sup').test(input) || RegExp('how are you').test(input))
		return "this github thing is pretty cool, huh?";
		
	if(RegExp('l(ol)+').test(input) || RegExp('(ha)+(h|$)').test(input) || RegExp('lmao').test(input))
		return "what's so funny?";
		
	if(RegExp('^no+(\\s|!|\\.|$)').test(input))
		return "don't be such a negative nancy :(";
		
	if(RegExp('(cya|bye|see ya|ttyl|talk to you later)').test(input))
		return ["alright, see you around", "good teamwork!"];
		
	if(RegExp('(dumb|stupid|is that all)').test(input))
		return ["hey i'm just a proof of concept", "you can make me smarter if you'd like"];
		
	if(input == 'noop')
		return;
		
	return input + " what?";
}

module.exports = {
     respondTo : respondTo
};