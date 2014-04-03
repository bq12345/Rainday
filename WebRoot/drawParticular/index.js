// forked from zz85's "forked: three.js. random particles demo" http://jsdo.it/zz85/27tB
// forked from mrdoob's "three.js. random particles demo" http://jsdo.it/mrdoob/728D
// referred also from http://wonderfl.net/c/qTwn

    		var container, stats;
			var camera, scene, renderer, group, particle;
			var mouseX = 0, mouseY = 0;

			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;

			var lasttime = Date.now(), elapsed;
			
			init();
			animate();
			
			var testEmitter;
  
			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.Camera( 75, window.innerWidth / window.innerHeight, 1, 3000 );
				camera.position.z = 200; //1000

				scene = new THREE.Scene();

				var PI2 = Math.PI * 2;
				var program = function ( context ) {
					context.beginPath();
					context.arc( 0, 0, 1, 0, PI2, true );
					context.closePath();
					context.fill();
					
				};
				
				

				group = new THREE.Object3D();
				scene.addObject( group );


				renderer = new THREE.CanvasRenderer();
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				stats = new Stats();
				stats.domElement.style.position = 'absolute';
				stats.domElement.style.top = '0px';
				container.appendChild( stats.domElement );

				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				document.addEventListener( 'touchstart', onDocumentTouchStart, false );
				document.addEventListener( 'touchmove', onDocumentTouchMove, false );
				
				function generateSprite() {

					var canvas = document.createElement( 'canvas' );
					canvas.width = 16;
					canvas.height = 16;

					var context = canvas.getContext( '2d' );
					var gradient = context.createRadialGradient( canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 );
					gradient.addColorStop( 0, 'rgba(255,255,255,1)' );
					gradient.addColorStop( 0.2, 'rgba(0,255,255,1)' );
					gradient.addColorStop( 0.4, 'rgba(0,0,64,1)' );
					gradient.addColorStop( 1, 'rgba(0,0,0,1)' );

					context.fillStyle = gradient;
					context.fillRect( 0, 0, canvas.width, canvas.height );

					return canvas;

				}
				
				
				//// EMITTER STUFF
				
				
				testEmitter = new SPARKS.Emitter(new SPARKS.SteadyCounter(200));


				emitterpos = new THREE.Vector3(0,0,0);
				var sphereCap = new SPARKS.SphereCapZone(0, 0, 0, 10, 0, 40);

				testEmitter.addInitializer(new SPARKS.Position( new SPARKS.PointZone( emitterpos ) ) );
				testEmitter.addInitializer(new SPARKS.Lifetime(0,4));
				
						
				var h = 0;
				
				
					var callback = function() {

					var material = new THREE.ParticleCanvasMaterial( {  program: program, blending:THREE.AdditiveBlending } );
					
					material.color.setHSV(h, 1, 0.5); //0.7
					h += 0.001;
					if (h>1) h-=1;
					
					particle = new THREE.Particle( material );

					particle.scale.x = particle.scale.y = Math.random() * 2 +1;
					group.addChild( particle );	

					return particle;
				};
				

				testEmitter.addInitializer(new SPARKS.Target(null, callback));

				testEmitter.addInitializer(new SPARKS.Velocity(sphereCap));
				testEmitter.addAction(new SPARKS.Age());
				testEmitter.addAction(new SPARKS.Accelerate(0.2));
				testEmitter.addAction(new SPARKS.Move()); 
				
				testEmitter.addCallback("created", function(p) {
					var position = p.position;
               
					p.target.position = position;	
				});
				
				testEmitter.addCallback("initialized", function(particle) {
		//			var position = p.position;
		//			p.target.position = position;	
				});
				
				testEmitter.addCallback("dead", function(particle) {
					particle.target.visible = false; // is this a work around?
				//	group.removeChild(particle.target); 
					
				});
				
				/*
				testEmitter.addCallback("updated", function(p) {
					//var position = p.position;
					//console.log(p);
					//die();
					//p.target.position = position;
					//p.target.position.set(position.x, position.y, position.z);
					// alpha level?
				});
				*/

			}

			//

			function onDocumentMouseMove( event ) {

				mouseX = event.clientX - windowHalfX;
				mouseY = event.clientY - windowHalfY;
			}

			function onDocumentTouchStart( event ) {

				if ( event.touches.length == 1 ) {

					event.preventDefault();

					mouseX = event.touches[ 0 ].pageX - windowHalfX;
					mouseY = event.touches[ 0 ].pageY - windowHalfY;
				}
			}

			function onDocumentTouchMove( event ) {

				if ( event.touches.length == 1 ) {

					event.preventDefault();

					mouseX = event.touches[ 0 ].pageX - windowHalfX;
					mouseY = event.touches[ 0 ].pageY - windowHalfY;
				}
			}

			//
			


			function animate(time) {
                if (!time) {
    				time = Date.now();
				}
				elapsed = time - lasttime;
			    //console.log( elapsed);
			    lasttime = time;
			    testEmitter.update(elapsed / 1000);
			
				requestAnimationFrame( animate );

				render();
				stats.update();

			}
			
			var _rotation = 0;

			function render() {

				camera.position.x += ( mouseX - camera.position.x ) * 0.05;
				camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
				// 
				group.rotation.x += 0.01;
	 			group.rotation.y += 0.02;
				
				_rotation += 3;
	            
	            emitterpos.x = 100 * Math.sin((_rotation ) * SPARKS.Utils.DEGREE_TO_RADIAN);
	            emitterpos.y = 100 * Math.cos((_rotation +mouseY) * SPARKS.Utils.DEGREE_TO_RADIAN);
	            emitterpos.z = 100 * Math.cos((_rotation +mouseX) * SPARKS.Utils.DEGREE_TO_RADIAN);
				

				renderer.render( scene, camera );

			}
