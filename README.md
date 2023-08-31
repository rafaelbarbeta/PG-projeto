# PG-projeto
Projeto de Processamento gráfico. Implementado em Javascript com ThreeJs
Visite https://rafaelbarbeta.github.io/PG-projeto/ para ver o projeto em funcionamento!

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
O bico, é um cone cujo topo está "para dentro" da cabeça do patinho só sobrando a base visível, parecendo, assim, um bico. Os olhos são duas esferas e as asas dois cones. Foi definido um "grupo" no qual todas essas partes foram adicionadas, e o grupo, por fim, foi adicionado na cena, por cima da banheira 
- Chuveiro : Ana Juvencio
Na construção do chuveiro foi utilizado a geometria de um cilindro e de um tubo, onde o tubo é posicionado na cabeça do chuveiro (cilindro) e todos o chuveiro é posicionado na borda da banheira com uma pequena inclinação. São aplicadas algumas propriedades para deixar o chuveiro um pouco mais parecido com o "real". Além disso, foi adicionado duas formas geométricas para representar as gotas de água do chuveiro. 
- Banheira : Beatriz Patrício
A banheira foi construída utilizando 3 objetos: 
Para o corpo da banheira, foi utilizado metade de uma esfera alongada no eixo z.
Para a borda foi utilizado um cilindro com um valor pequeno de altura, posicionado logo acima do corpo da banheira.
Por fim, foi adicionado um círculo acima da borda, para simular a água dentro da banheira.
- Shampoo : Carlos
  A embalagem de shampoo foi construída utilizando dois objetos com a geometria de cilíndros:
  Um cilíndro maior, de cor lilás, que representa o corpo da embalagem;
  Um cilíndro menor, de cor dourada, que representa a tampa do shampoo.
  A altura e área dos dois cilíndros foram ajustadas nos parâmetros do construtor. Os dois foram criados separadamente, então ajustei a posição deles para que a tampa ficasse logo acima do corpo. Assim, adicionei os dois objetos em um grupo, que por sua vez foi adicionado à cena e posicionado na borda da banheira.

## CÂMERAS:
- Câmera rotátil : Rafael Barbeta
- Câmera estática : Rafael Barbeta

## SHADER EM OBJETO
- Gradiente na água da banheira utilizando RawShaderMaterial:
Foi utilizado a função mix para a interpolação das cores e o smoothstep para criar uma transição suave de cores entre o centro e a borda da circunferência. 

## Movimento de objeto.
- Patinho de borracha rotacionando : Rafael Barbeta
Simplesmente aplica-se uma pequena rotação ao grupo do patinho a cada frame gerado, fazendo com que ele rotacione na cena.
- Gotas d'água : Ana Juvencio
Foi criado um função para dar um movimento vertical às geometrias que representam as gotas de água do chuveiro. É calculado o deslocamento vertical e definido a amplitude e velocidade de oscilação dos objetos, logo depois invertemos o deslocamento para que as gotas caiam de cima para baixo no quadro, porém quando é atualizado, o movimento se repete, fazendo com que a água volte para o chuveiro. 
