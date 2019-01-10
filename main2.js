var scene;
var camera;
var renderer;
var width;
var height;

function init() {

  width = window.innerWidth;
  height = window.innerHeight;

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.set(0,5,25);
  camera.lookAt(0,0,0);

  scene.add(camera);

  // renderer.setClearColor(0x333F47);

  var light1 = new THREE.PointLight(0xffffff, 1);
  light1.position.set(-100, 200, 100);
  scene.add(light1);

  var keyLight = new THREE.DirectionalLight(new THREE.Color(0x00ffff), 1.0);
  keyLight.position.set(-100, 0, 100);
  var fillLight = new THREE.DirectionalLight(new THREE.Color(0xff00ff), 0.75);
  fillLight.position.set(100, 0, 100);
  var backLight = new THREE.DirectionalLight(0xffff00, 1);
  backLight.position.set(100, 0, -100).normalize();

  scene.add(keyLight);
  scene.add(fillLight);
  scene.add(backLight);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  myLoader();

  window.addEventListener('resize', function() {
    width = window.innerWidth;
    height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });

}

function myLoader() {

  var rotationSpeed;
  var myModel = 'nikeGltf.gltf';

  var loader = new THREE.GLTFLoader().setPath('models/');
  loader.load(myModel, function(gltf) {
    var mesh = gltf.scene;

    console.log(mesh);

    scene.add(mesh);

    wireframeAnim();

    function wireframeAnim() {

      rotationSpeed = .02;

      rotation();
      function rotation() {
        mesh.rotation.y -= rotationSpeed;

        renderer.render(scene, camera);
        controls.update();

        requestAnimationFrame(rotation);
      };

      gltf.scene.traverse( function ( node ) {
         if ( node.isMesh ) {
           node.material.wireframe = true;
         }
      });

      // var Handler = function() {
      //    this.clickHandler = function() {
      //       var self = this;
      //       this.timerId = setTimeout(function() {
      //           gltf.scene.traverse( function ( node ) {
      //              if ( node.isMesh ) {
      //                node.material.wireframe = true;
      //              }
      //           });
      //
      //           // ACCELERATION
      //           rotationSpeed += .4;
      //
      //
      //       },1);
      //
      //       this.timerId = setTimeout(function() {
      //           gltf.scene.traverse( function ( node ) {
      //              if ( node.isMesh ) {
      //                var colors = [new THREE.Color(0x07E1A0), new THREE.Color(0x240CE8), new THREE.Color(0x720227), new THREE.Color(0xffffff)];
      //                node.material.color = colors[parseInt(Math.random() * 4)];
      //                node.material.wireframe = false;
      //              }
      //           });
      //           rotationSpeed = .02;
      //       },1000);
      //
      //    };
      //
      //    this.cancelHandler = function() {
      //        if (this.timerId) {
      //            clearTimeout(this.timerId);
      //            gltf.scene.traverse( function ( node ) {
      //     	        if ( node.isMesh ) {
      //                 node.material.wireframe = false;
      //               }
      //       	   });
      //           rotationSpeed = .02;
      //        }
      //    }
      //
      // }
      // var h = new Handler();
      // addEventListener('mousedown', h.clickHandler.bind(h));
      // addEventListener('mouseup', h.cancelHandler.bind(h));
    }

	});

}

function animate() {
  var random;
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
};

init();
animate();








//
