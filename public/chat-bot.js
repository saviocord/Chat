function respondTo(input) {
	
	input = input.toLowerCase();
	
	if(RegExp('(oi|ola|hei|ou)(\\s|!|\\.|$)').test(input))
		return "ola em que posso ajudar?";
		
	if(RegExp('(quem e voce|quem e|voce|você)').test(input) || RegExp('(chat|chat-bot|chatbot)').test(input))
		return "eu sou o chat-bot estou aqui para te ajudar com algumas duvidas.";
		
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