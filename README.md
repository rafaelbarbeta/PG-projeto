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
Retângulo esticado e no qual foi aplicado uma textura, que é uma imagem de um azulejo
- Patinho de borracha : Rafael Barbeta
Consite de duas esferas, uma para a cabeça do patinho e outra que foi alongada para sergir como corpo.
O bico, é um cone cujo topo está "para dentro" da cbeça do patinho só sobrando a base visível, parecendo, assim, um bico. Os olhos são duas esferas e as asas dois cones. Foi definido um "grupo" no qual todas essas partes foram adicionadas, e o grupo, por fim, foi adicionado na cena, por cima da banheira 
- Chuveiro : Ana Juvencio
- Banheira : Beatriz Patrício
- Shampoo : Carlos

## CÂMERAS:
- Câmera rotátil : Rafael Barbeta
- Câmera estática : Rafael Barbeta

## SHADER EM OBJETO
- ?

## Movimento de objeto.
- Patinho de borracha rotacionando : Rafael Barbeta
Simplesmente aplica-se uma pequena rotação ao grupo do patinho a cada frame gerado, fazendo com que ele rotacione na cena.
- Gotas d'água : Ana Juvencio

