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