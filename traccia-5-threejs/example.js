var scene;
var renderer;
var camera;
var mesh;


function init() {

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 60;
  camera.position.y = 20;

  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.setClearColor(0x333333, 1);
  renderer.gammaOutput = true;

  // light
  var light = new THREE.PointLight( '#c1582d', 50, 100 );
  light.position.set( 50, 70, 0 );

  var ambient = new THREE.AmbientLight("#85b2cd");
  scene.add(light);
  scene.add(ambient);

  //loader
  var loader = new THREE.GLTFLoader();

  loader.load(
    // resource URL
    'r2d2/scene.gltf',
    // called when the resource is loaded
    function(gltf) {

      mesh = gltf.scene;
      mesh.scale.set( 0.1, 0.1, 0.1 );
      scene.add(mesh);

    },
    // called when loading is in progresses
    function(xhr) {

      console.log((xhr.loaded / xhr.total * 100) + '% loaded');

    },
    // called when loading has errors
    function(error) {

      console.log('An error happened');

    }
  );

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  scene.rotation.y += 0.01;

  renderer.render(scene, camera);
}


init();
