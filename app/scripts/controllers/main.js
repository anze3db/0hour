'use strict';

angular.module('0hourApp')
  .controller('MainCtrl', function ($scope) {
      
      var posX, posY;
      var shot = 0;
      var renderer = Newton.Renderer(document.getElementById('display'));
      var sim = Newton.Simulator(simulate, renderer.callback, 60);
      var particles = Newton.Body();
      var blackhole = Newton.RadialGravity(640, 225, 8, 2);
      
      var accumulator = 0;
      var particleLayer = sim.Layer();

      particleLayer
        .addBody(particles)
        .addForce(blackhole)
      sim.start();

      function simulate(time) {
        accumulator += time;
        blackhole.x = posX;//(blackhole.x + time * 0.5) % 1280;
        blackhole.y = posY;//225 + Math.sin(blackhole.x / 100) * 120;
      }
      
      
      $(document).mousemove(function(event){
          posX = event.pageX;
          posY = event.pageY;
      });
      $(document).mousedown(function(event){
          particles.addParticle(Newton.Particle(posX, posY, Math.random() * 5 + 1));
          shot++;
          renderer.ctx.setFillColor("#ff0000");
          if(shot > 10){
              shot = 5;
              var bh = Newton.RadialGravity(640, 225, 8, 2);
              bh.x = Math.random() * 1250;
              bh.y = Math.random() * 650;
              particleLayer.addForce(bh);
          }
      });
  });
