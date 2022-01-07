import * as THREE from "https://unpkg.com/three@0.124.0/build/three.module.js";

import Stats from "https://unpkg.com/three@0.124.0/examples/jsm/libs/stats.module.js";
import { GUI } from "https://unpkg.com/three@0.124.0/examples/jsm/libs/dat.gui.module.js";

import { OrbitControls } from "https://unpkg.com/three@0.124.0/examples/jsm/controls/OrbitControls.js";


let renderer, scene, camera;
let stats;
init();
animate();
function init(){

   renderer = new THREE.WebGLRenderer({antialias:true});
   renderer.setPixelRatio(window.devicePixelRatio);
   renderer.setSize(window.innerWidth,window.innerHeight);
   renderer.shadowMap.enabled=true;
   renderer.shadowMap.type=THREE.PCFSoftShadowMap;
   renderer.outputEncoding=THREE.sRGBEncoding;
   document.body.appendChild(renderer.domElement);

   
   camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth/window.innerHeight,
      1,
      1000
   );
   camera.position.set(0,20,35);
   scene=new THREE.Scene();
   const ambient = new THREE.AmbientLight( 0x404040 ); // soft white light
   scene.add( ambient );

   const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    scene.add( directionalLight );


    const geoFloor=new THREE.BoxBufferGeometry(2000,0.1,200);
    const matStdFloor=new THREE.MeshStandardMaterial({
       color:0X808080,
       roughness:0,
       metalness:0,
    });
    const mshStdFloor=new THREE.Mesh(geoFloor,matStdFloor);
    scene.add(mshStdFloor)

   const matStdObjects=new THREE.MeshStandardMaterial({
      color:0Xa00000,
      roughness:0,
      metalness:0,
   });


   const geoBox =new THREE.BoxBufferGeometry(Math.PI,Math.sqrt(2),Math.E);
   const mshStdBox=new THREE.Mesh(geoBox,matStdObjects)
   mshStdBox.position.set(0,5,0);
   mshStdBox.rotation.set(0,Math.PI/2.0,0);
   mshStdBox.castShadow=true;
   mshStdBox.receiveShadow=true;
   scene.add(mshStdBox);


   const geoSphere =new THREE.SphereBufferGeometry(1.5,32,32);
   const mshStdSphere=new THREE.Mesh(geoSphere,matStdObjects)
   mshStdSphere.position.set(-5,5,0);

   mshStdSphere.castShadow=true;
   mshStdSphere.receiveShadow=true;
   scene.add(mshStdSphere);



   const geoKnot =new THREE.TorusKnotBufferGeometry(1.5,0.5,100,16);
   const mshStdKnot=new THREE.Mesh(geoKnot,matStdObjects)
   mshStdKnot.position.set(5,5,0);
   mshStdKnot.castShadow=true;
   mshStdKnot.receiveShadow=true;
   scene.add(mshStdKnot);



  const controls=new OrbitControls(camera,renderer.domElement);
  controls.target.copy(mshStdBox.position);
  controls.update();

  stats=new Stats();
  document.body.appendChild(stats.dom)

  const gui = new GUI({width:300});

  gui.open();


  let param={
     motion:true,
     light:true,
     ambient:ambient.intensity,
     "material color":matStdObjects.color.getHex()
  };
  gui.add(param,"motion");
  

  const lightFolder=gui.addFolder("Light");
  lightFolder.add(param,"light").onChange(function(val){
   ambient.intensity=val;
  });

  lightFolder.add(param,"ambient",0.0,1).step(0.01).onChange(function(val){
     ambient.intensity=val;
  })

  lightFolder.addColor(param,"material color").onChange(function(val){
     matStdObjects.color.setHex(val);
  })
  lightFolder.open();



}

function animate(){
   requestAnimationFrame(animate);
   renderer.render(scene,camera);
   stats.update();
}