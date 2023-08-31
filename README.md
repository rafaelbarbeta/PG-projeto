# PG-projeto
Projeto de Processamento gráfico. Implementado em Javascript com ThreeJs

## Descrição breve
O projeto consiste na representação de uma banheira cartunesca, com um patinho de borracha,
um chuveiro e um shampoo. Os objetos estão por cima de um "chão" virtual, que nada mais é do que um retângulo bem grande no qual foi aplicado uma textura de azulejo.
Pressione "1" para trocar para a câmera móvel. Nela pressione para se movimentar:
W : frente
A : esquerda
S : trás
D : direta
Q : Para cima
E : Para baixo
Clique e segure com o botão esquerdo do mouse para habilitar rotação da câmera. Mova o mouse para visualizar a cena
Pressione "2" para entrar na câmera estática. Ela dá uma visão geral da cena e nunca sai do lugar

## OBJETOS IMPLEMENTADOS
- Chão : Rafael Barbeta
- Patinho de borracha : Rafael Barbeta
- Chuveiro : Ana Juvencio
- Banheira : Beatriz Patrício
A banheira foi construída utilizando 3 objetos: 
Para o corpo da banheira, foi utilizado metade de uma esfera alongada no eixo z.
Para a borda foi utilizado um cilindro com um valor pequeno de altura, posicionado logo acima do corpo da banheira.
Por fim, foi adicionado um círculo acima da borda, para simular a água dentro da banheira.
- Shampoo : Carlos

## CÂMERAS:
- Câmera rotátil : Rafael Barbeta
- Câmera estática : Rafael Barbeta

## SHADER EM OBJETO
- Gradiente na água da banheira utilizando RawShaderMaterial:
Foi utilizado a função mix para a interpolação das cores e o smoothstep para criar uma transição suave de cores entre o centro e a borda da circunferência. 

## Movimento de objeto.
- Patinho de borracha rotacionando : Rafael Barbeta
- Gotas d'água : Ana Juvencio

