import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene=new THREE.Scene();

scene.fog = new THREE.Fog( 0xa0a0a0, 10, 50 );
scene.background = new THREE.Color( 0xa0a0a0 );


const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
hemiLight.position.set( 0, 20, 0 );
scene.add( hemiLight );

const dirLight = new THREE.DirectionalLight( 0xffffff );
dirLight.position.set( 5 , 5 ,3 );
dirLight.castShadow = true;
dirLight.shadow.camera.top = 2;
dirLight.shadow.camera.bottom = - 2;
dirLight.shadow.camera.left = - 2;
dirLight.shadow.camera.right = 2;
dirLight.shadow.camera.near = 0.01;
dirLight.shadow.camera.far = 1000;
scene.add( dirLight );
const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
mesh.rotation.x = - Math.PI / 2;
mesh.receiveShadow = true;
scene.add( mesh );


const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.set( 1, 2, - 5 );
camera.lookAt( 0, 1, 0 );

// making a instance of renderer to add in our document as a canvas
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);




//cube her
const geometry = new THREE.BoxGeometry(1,1,1);

const material = new THREE.MeshBasicMaterial( { color:  'green' } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
cube.castShadow=true;




const loader = new GLTFLoader();

let model;
loader.load( './model/low_poly_human.glb', function ( gltf ) {

	model= gltf.scene;
    scene.add(model);
    model.traverse( function ( object ) {

        if ( object.isMesh ) object.castShadow = true;

    } );

}, undefined, function ( error ) {

	console.error( error );

} );

scene.add(model);


// rerender the scene
function animate() {
	requestAnimationFrame( animate );
    // /model.position.z+=0.01;
    //model.rotation.x+=0.01;
    cube.rotation.y+=0.01;
    cube.position.x+=0.01;
    cube.position.z=2;
    model.rotation.y+=0.01;
    
    
	renderer.render( scene, camera );
}
animate();




