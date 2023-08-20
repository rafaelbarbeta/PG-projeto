document.body.style.margin = '0';
document.body.style.backgroundColor = 'white';

// Cria a cena, as câmeras em perspectiva e o renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const cameraEstatica = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var cameraAtual = 1;
camera.position.set(0, 10, 10);
cameraEstatica.position.set(0, 70, 55);
cameraEstatica.rotation.x = -Math.PI/5;

var renderer = new THREE.WebGLRenderer();
camera.position.z = 5;
// adiciona um container para conter o canvas
const container = document.createElement('div');
container.style.width = '100%';
container.style.height = '100%';
container.style.display = 'flex';
container.style.justifyContent = 'center';
container.style.alignItems = 'center';
document.body.appendChild(container);

// cria o canvas e adiciona no container
container.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth*0.9, window.innerHeight*0.9);
renderer.setClearColor(0xffffff);

// Adiciona um chão
const floorGeometry = new THREE.PlaneGeometry(1000, 1000);
const floorTexture = new THREE.TextureLoader().load('texture.jpg', () => {
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.offset.set( 0, 0 );
  floorTexture.repeat.set( 2, 2 );
}); // Carregar a textura do chão
const floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = Math.PI / -2; // Rotação para posicionar horizontalmente
scene.add(floor);


// Cria um grupo para o patinho e define suas partes
const duckGroup = new THREE.Group();
// Corpo do patinho. Ele é alongado no eixo z
const bodyGeometry = new THREE.SphereGeometry(1, 12, 12);
const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
body.scale.z = 1.5;
//retira metade da esfera do corpo, para que a cabeça esteja no topo do corpo
body.geometry.translate(0, 0, -0.35);
duckGroup.add(body);

// Asas do patinho, fechadas e juntas ao corpo em formato conico
const wingGeometry = new THREE.ConeGeometry(0.3, 1, 8);
const wingMaterial = new THREE.MeshBasicMaterial({ color: 0xffa500 });
const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
const rightWing = leftWing.clone();
leftWing.position.set(-0.91, 0.2, -0.8);
rightWing.position.set(0.91, 0.2, -0.8);
leftWing.rotation.z = 3;
leftWing.rotation.x = Math.PI / 2;
rightWing.rotation.z = -3;
rightWing.rotation.x = Math.PI / 2;
duckGroup.add(leftWing, rightWing);
// Cabeça do patinho
const headGeometry = new THREE.SphereGeometry(0.7, 16, 16);
const headMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const head = new THREE.Mesh(headGeometry, headMaterial);
head.position.set(0, 1.2, 0);
duckGroup.add(head);
// Bico do patinho
const beakGeometry = new THREE.ConeGeometry(0.25, 0.5, 8);
const beakMaterial = new THREE.MeshBasicMaterial({ color: 0xffa500 });
const beak = new THREE.Mesh(beakGeometry, beakMaterial);
beak.position.set(0, 1.2, 0.5);
beak.rotation.x = -Math.PI / 6;
duckGroup.add(beak);
// Olhos do patinho
const eyeGeometry = new THREE.SphereGeometry(0.09, 8, 8);
const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
const rightEye = leftEye.clone();
leftEye.position.set(-0.3, 1.4, 0.6);
rightEye.position.set(0.3, 1.4, 0.6);
duckGroup.add(leftEye, rightEye);
// Adiciona os objetos à cena
scene.add(duckGroup);
duckGroup.scale.multiplyScalar(5);
duckGroup.position.set(0, 2, -20);

/* BANHEIRA */
const banheira = new THREE.Group();

//base da banheira
var radius = 5;
var radialSegments = 32;
var materialFora = new THREE.MeshBasicMaterial({
  color: 0x808080
});
var materialDentro = new THREE.MeshBasicMaterial({
  color: 0x0000FF
});
var hemiSphereGeom = new THREE.SphereBufferGeometry(radius, radialSegments, Math.round(radialSegments / 4), 0, Math.PI * 2, 0, Math.PI * 0.5);
var hemiSphere = new THREE.Mesh(hemiSphereGeom, materialFora);
var capGeom = new THREE.CircleBufferGeometry(radius, radialSegments);
capGeom.rotateX(Math.PI * 0.5);
var cap = new THREE.Mesh(capGeom, materialDentro);
hemiSphere.add(cap);
hemiSphere.rotateX(Math.PI);
hemiSphere.scale.x = 1.5;


//apoios da banheira (pezinho)



//borda



//adiciona objetos na cena
banheira.add(hemiSphere);
scene.add(banheira);
banheira.scale.multiplyScalar(5);
banheira.position.set(50, 10, -20);
/* FIM BANHEIRA */



/*CHUVEIRO*/
// Cria um grupo para o chuveiro
const chuveiroGroup = new THREE.Group();

// Cria a geometria do cano reto
class TuboReto extends THREE.Curve {
  constructor(scale = 1) {
    super();
    this.scale = scale;
  }

  getPoint(t) {
    const tx = 0.15; // Coordenada x constante (coloca o cano na vertical)
    const ty = t; // Coordenada y linear
    const tz = -t * 0.74; // Coordenada z decrescente para ir em direção à borda da banheira

    return new THREE.Vector3(tx * this.scale, ty * this.scale, tz * this.scale);
  }
}

// Cria uma instância da nova curva de cano reto
const tuboRetoCurve = new TuboReto(2); // Aumenta o tamanho do cano

// Cria a geometria do cano reto
const tuboRetoGeometry = new THREE.TubeGeometry(tuboRetoCurve, 64, 0.08, 16, false);
const tuboRetoMaterial = new THREE.MeshStandardMaterial({
  color: 0xaaaaaa,
  metalness: 0.8,
  roughness: 0.4,
});
const tuboReto = new THREE.Mesh(tuboRetoGeometry, tuboRetoMaterial);
chuveiroGroup.add(tuboReto);

// Cabeça do chuveiro (cúpula)
const cabecaGeometry = new THREE.CylinderGeometry(0.3, 0.4, 0.7, 17);
const cabecaMaterial = new THREE.MeshStandardMaterial({ color: 0xd3d3d3 });
const cabecaChuveiro = new THREE.Mesh(cabecaGeometry, cabecaMaterial);
cabecaChuveiro.position.copy(tuboRetoCurve.getPoint(1)); // Posiciona a cabeça do chuveiro na ponta do cano reto
cabecaChuveiro.rotation.z = Math.PI / -6; // Inclinação de 45 graus
chuveiroGroup.add(cabecaChuveiro);

// Posiciona o cano reto saindo da cabeça do chuveiro até a borda da banheira
const startPoint = tuboRetoCurve.getPoint(0); // Ponto inicial da curva
const endPoint = tuboRetoCurve.getPoint(1);   // Ponto final da curva

// Ajusta a posição do cano reto
tuboReto.position.copy(startPoint); // Posiciona o cano reto na cabeça do chuveiro

// Configuração da iluminação
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight);

// Criação do jato de água 
const jatoGeometry = new THREE.CylinderGeometry(0, 0.10, 0.8, 8); 
const jatoMaterial = new THREE.MeshBasicMaterial({
  color: 0x0000FF,
  transparent: true,
  opacity: 0.8
});
const jatoAgua = new THREE.Mesh(jatoGeometry, jatoMaterial);

// Criação do jato de água 
const jatoGeometry1 = new THREE.CylinderGeometry(0, 0.10, 0.8, 8); 
const jatoMaterial1 = new THREE.MeshBasicMaterial({
  color: 0x0000FF,
  transparent: true,
  opacity: 0.8
});
const jatoAgua1 = new THREE.Mesh(jatoGeometry, jatoMaterial);

// Posicionamento do jato de água no centro da cabeça do chuveiro
jatoAgua.position.copy(cabecaChuveiro.position);
jatoAgua.position.y -= cabecaGeometry.parameters.height / 2 + 0.25;
chuveiroGroup.add(jatoAgua);

// Posicionamento do jato de água no centro da cabeça do chuveiro
jatoAgua1.position.copy(cabecaChuveiro.position);
jatoAgua1.position.y -= cabecaGeometry.parameters.height / 0.6 + 0.20;
chuveiroGroup.add(jatoAgua1);


// Posiciona o chuveiro na borda da banheira
const chuveiroX = 50 + radius * Math.cos(Math.PI * 0.25); // Calcula a posição x usando um ângulo de 45 graus
const chuveiroY = 10 + radius + 0.1; // Coordenada y acima da borda da banheira
const chuveiroZ = -20; // Mesma coordenada z da banheira
chuveiroGroup.position.set(chuveiroX, chuveiroY, chuveiroZ);

// Escala do chuveiro
const chuveiroEscala = 8; // Aumenta a escala do chuveiro
chuveiroGroup.scale.set(chuveiroEscala, chuveiroEscala, chuveiroEscala);

// Adiciona o chuveiro à cena
scene.add(chuveiroGroup);

/*FIM DO CHUVEIRO*/






// anima a cena
const animate = () => {
  requestAnimationFrame(animate);
  duckGroup.rotation.y += 0.01;
  if (cameraAtual === 0) {
    renderer.render(scene, camera);
  } else {
    renderer.render(scene, cameraEstatica);
  }
};


// Ao clicar com o botão esquerdo, permite o movimento livra da câmera
function virarcamera(event) {
  if (event.buttons === 1) {
    camera.rotation.y += event.movementX * 0.01;
    camera.rotation.x += event.movementY * 0.01;
  }
}

// Função para obter o vetor de direção da câmera
function getCameraDirection()  {
  const direction = new THREE.Vector3(0, 0, -1); // Vetor inicial apontando para frente
  direction.applyQuaternion(camera.quaternion); // Aplica a rotação da câmera ao vetor
  return direction;
}

// Adiciona o manipulador do evento da roda do mouse
window.addEventListener('mousemove', virarcamera);
// responsividade.
window.addEventListener('resize', () => { 
    renderer.setSize(window.innerWidth*0.9, window.innerHeight*0.9);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

});
// movimentação livre da camera, relativo a posição da camera
window.addEventListener('keydown', (event) => {
  switch (event.key) {
      case 'w':
          camera.position.add(getCameraDirection());  
          break;
      case 's':
          camera.position.sub(getCameraDirection());
          break;
      case 'a':
          camera.position.sub(getCameraDirection().cross(camera.up));
          break;
      case 'd':
          camera.position.add(getCameraDirection().cross(camera.up));
          break;
      case 'q':
          camera.position.add(camera.up);
          break;
      case 'e':
          camera.position.sub(camera.up);
          break;
      case '1':
          cameraAtual = 0;
          break;
      case '2':
          cameraAtual = 1;
          break;
  }});

animate();