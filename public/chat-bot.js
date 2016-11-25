function respondTo(input) {
	
	input = input.toLowerCase();
	
	if(RegExp('(oi|ola|hei|ou|opa|alo)(\\s|!|\\.|$)').test(input))
		return "ola em que posso ajudar?";
		
	if(RegExp('(quem e voce|quem é voce|quem e|voce|voçe|você|chat|chat-bot|chatbot)(\\s|[?]|$)').test(input))
		return "eu sou o chat-bot estou aqui para te ajudar com algumas duvidas.";
		
	if(RegExp('(exemplo|exemplos|exemplifique|ex|alguns|algum)(\\s|\\.|de|de um|de alguns|alguns)*(?=sistema operacional|so|sistemas operacionais|sistemas operacinal|s.o)').test(input))
		return "tenho varios exemplos de SO para te falar, mas vou te dizer alguns mais utilizados: MacOS,CentOS, Linux, Microsoft Windows, Solaris, Unix";
	
    if(RegExp('(faz|função|funções|funcao|funcoes|funçao|funçoes)(\\s|\\.|de|do|dos|um)*(?=sistema operacional|so|sistemas operacionais|sistemas operacinal|s.o)').test(input))
		return "Um SO tem varias funcionalidade, mas dentre as principais estão Gerenciamento de processos, gerenciamento de memória, gerenciamento de recursos, entrada e saída de dados, sistema de arquivos.";
	
	if(RegExp('(sistema operacional|so|s.o)(\\s|[?]|$)').test(input))
		return "Pelas minhas definiçoes um SO é um programa ou um conjunto de programas cuja função é gerenciar os recursos do sistema.";
		
	if(RegExp('(vtnc|cú|cu|desgraça|poha|buceta|pinto|penis|caralho|inferno|satanas|puta|rapariga|vadia|vagabundo|burro|idiota)').test(input))
		return "Voce parece estar Exaltado. Nao fale isso novamente";
		
	return " nao compreendi a expressão '"+input+"' .";
}

module.exports = {
     respondTo : respondTo
};