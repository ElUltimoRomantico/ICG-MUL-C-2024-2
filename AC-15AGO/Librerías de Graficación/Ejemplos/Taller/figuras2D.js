let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    function dibujaFigura() {
      let figura = document.getElementById('figura').value;
      let coords = document.querySelector('input[name="coords"]:checked').value;
      let x = parseInt(document.getElementById('x').value);
      let y = parseInt(document.getElementById('y').value);
      let tamaño = parseInt(document.getElementById('tamaño').value);
      let color = document.getElementById('color').value;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = color;
      ctx.strokeStyle = color;

      if (figura === 'circulo') {
        if (coords === 'cartesianas') {
          ctx.beginPath();
          ctx.arc(x, y, tamaño, 0, 2 * Math.PI);
          ctx.fill();
          ctx.stroke();
        } else if (coords === 'polares') {
          let radio = Math.sqrt(x * x + y * y);
          let angulo = Math.atan2(y, x);
          ctx.beginPath();
          ctx.arc(radio, angulo, tamaño, 0, 2 * Math.PI);
          ctx.fill();
          ctx.stroke();
        }
      } else if (figura === 'cuadrado') {
        if (coords === 'cartesianas') {
          ctx.beginPath();
          ctx.rect(x, y, tamaño, tamaño);
          ctx.fill();
          ctx.stroke();
        } else if (coords === 'polares') {
          let radio = Math.sqrt(x * x + y * y);
          let angulo = Math.atan2(y, x);
          ctx.beginPath();
          ctx.rect(radio * Math.cos(angulo), radio * Math.sin(angulo), tamaño, tamaño);
          ctx.fill();
          ctx.stroke();
        }
      }
    }