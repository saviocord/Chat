/*Assuntos do chatbot:
	saudação
	exemplos de SO
	funçoes do SO
	conceito de threade
	conceito de escalonamento
	definição de escalonamento preemptivo e não preemptivo
	conceito de semáforo
	estados do processo
	conceito de SO
	definição de deadlock
	
*/
function respondTo(input) {
	
	input = input.toLowerCase();
	
	if(RegExp('(help|ajuda)').test(input))
		return "<a href=# onclick=\"abrirHelp();\">clique aqui para mais informações</a>";
	
	if(RegExp('(oi|ola|hei|ou|opa|alo)(\\s|!|\\.|$)').test(input))
		return " Ola em que posso ajudar?";
		
	if(RegExp('(quem e voce|quem é voce|quem e|voce|voçe|você|chat|chat-bot|chatbot)(\\s|[?]|$)').test(input))
		return " Eu sou o chat-bot estou aqui para te ajudar com algumas duvidas.";
		
	if(RegExp('(exemplo|exemplos|exemplifique|ex|alguns|algum)(\\s|\\.|de|de um|de alguns|alguns)*(?=sistema operacional|so|sistemas operacionais|sistemas operacinal|s.o)').test(input))
		return " Tenho varios exemplos de SO para te falar, mas vou te dizer alguns mais utilizados: MacOS,CentOS, Linux, Microsoft Windows, Solaris, Unix";
	
	if(RegExp('thread').test(input))
		return [" Thread é uma forma de um processo dividir a si mesmo em duas ou mais tarefas que podem ser executadas concorrencialmente "+
	            "O conceito de thread foi introduzido na tentativa de reduzir o tempo gasto na criação, eliminação e troca de contexto de processos nas "+
                "aplicações concorrentes, bem como economizar recursos do sistema como um todo"];
    
	if(RegExp('(escalonamento)(\\s|\\.)*(?=nao preemptivo|não preemptivo)').test(input))
	    return [" No escalonamento não-preemptivo um processo que entra no processador roda até terminar, sem jamais ser interrompido. "+
				"Este foi o primeiro tipo de escalonamento desenvolvido e foi utilizado nos SOs de processamento em batch"];
	
	if(RegExp('(escalonamento)(\\s|\\.)*(?=preemptivo)').test(input))
	    return ["No escalonamento preemptivo a estratégia é baseada na atividade de preempção, ou seja, permite a suspensão temporária da execução de um processo para outro "+
				"rodar, sem prejuízo lógico de execução a ambos. A maioria dos SOs da atualidade utiliza esta estratégia de escalonamento"];

	if(RegExp('(escalonamento|escalonar)').test(input))
		return [" Um escalonador é um programa responsável pelo trabalho de escolher processos e de escalar processos para execução. O "+
				"escalonador de processos escolhe processos guardados em disco e os carrega na memória "+
				"para execução. Pode-se dizer que ele seleciona processos que passaram a poder competir pela CPU."];
	
	if(RegExp('(semaforo|semáforo)').test(input))
		return [" Um semáforo é uma variável inteira, não-negativa, que só pode ser manipulada por "+
				"duas instruções atômicas: DOWN e UP. A instrução UP incrementa uma unidade ao valor do semáforo, enquanto DOWN decrementa a variável."];
	
	if(RegExp('Deadlock').test(input))
		return [" Refere-se a uma situação em que ocorre um impasse, e dois ou mais processos ficam impedidos de continuar suas execuções"+
	           "ou seja, ficam bloqueados, Um ou mais processos está bloqueado à espera de um evento que somente pode ser causado por um outro processos"];
	
	/*if(RegExp('()').test(input))
		return " Ola em que posso ajudar?";*/
	
	if(RegExp('(estado|estados)(\\s|\\.|de|do|dos|de um)*(?=processo|processos)').test(input))
		return [" Um processo ativo pode encontrar-se em três estados diferentes: "+
				"Rodando (Execução ou running), Pronto (ready), Bloqueado (Espera ou wait)."];
	
	if(RegExp('(faz|função|funções|funcao|funcoes|funçao|funçoes)(\\s|\\.|de|do|dos|um)*(?=sistema operacional|so|sistemas operacionais|sistemas operacinal|s.o)').test(input))
		return [" Um SO tem varias funcionalidade, mas dentre as principais estão Gerenciamento de processos, gerenciamento de memória, gerenciamento de recursos, "+
	           "entrada e saída de dados, sistema de arquivos."];
	
	if(RegExp('(sistema operacional|so|s.o)(\\s|[?]|$)').test(input))
		return " Pelas minhas definiçoes um SO é um programa ou um conjunto de programas cuja função é gerenciar os recursos do sistema.";
	
	if(RegExp('(troxa|porra|vtnc|cú|cu|desgraça|poha|buceta|pinto|penis|caralho|inferno|satanas|puta|rapariga|vadia|vagabundo|burro|idiota)').test(input))
		return " Voce parece estar Exaltado. Nao fale isso novamente";
		
	return " nao compreendi a expressão '"+input+"' .";
}

module.exports = {
     respondTo : respondTo
};