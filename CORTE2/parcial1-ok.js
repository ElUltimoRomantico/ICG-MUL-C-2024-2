const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const coordenadasDiv = document.getElementById('coordenadas-div');
    const apotemaDiv = document.getElementById('apotema');
    const ladoCalculadoDiv = document.getElementById('lado-calculado');

    // Definir el ángulo de rotación (offset) para cada número de lados
    const angleOffsets = {
      3: Math.PI / 6,
      4: Math.PI / 4,
      5: Math.PI / 10,
      6: Math.PI / 6,
      7: Math.PI / 14,
      8: Math.PI / 8,
      9: Math.PI / 18,
      10: Math.PI / 20,
      11: Math.PI / 22,
      12: Math.PI / 24
    };

    // Clase Cartesiana
    class Cartesiana {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }

      getX() {
        return this.x;
      }

      getY() {
        return this.y;
      }
    }

    // Clase Polar
    class Polar {
      constructor(radio, angulo) {
        this.radio = radio;
        this.angulo = angulo;
      }

      getRadio() {
        return this.radio;
      }

      getAngulo() {
        return this.angulo;
      }

      toCartesiana() {
        const x = this.radio * Math.cos(this.angulo);
        const y = this.radio * Math.sin(this.angulo);
        return new Cartesiana(x, y);
      }
    }

    // Dibujar el plano cartesiano en la página
    function dibujarPlanoCartesiano() {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();
    }

    function dibujarPoligono() {
      const n = parseInt(document.getElementById('n').value);
      const lado = parseInt(document.getElementById('lado').value);
      const tipo = document.getElementById('tipo').value;
      const x = parseInt(document.getElementById('x').value);
      const y = parseInt(document.getElementById('y').value);
      const coordenadasTipo = document.getElementById('coordenadas').value;

      if (!n || n < 3 || n > 12) {
        alert('Debe ingresar un número de lados válido (entre 3 y 12)');
        return;
      }

      let apotema, radio, ladoCalculado;

      if (tipo === 'lado') {
        apotema = (lado / 2) / Math.tan(Math.PI / n);
        radio = apotema / Math.cos(Math.PI / n);
        ladoCalculado = lado;
      } else {
        apotema = lado;
        radio = apotema / Math.cos(Math.PI / n);
        ladoCalculado = 2 * radio * Math.sin(Math.PI / n);
      }

      const angleOffset = angleOffsets[n];
      const coords = [];

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dibujarPlanoCartesiano();
      ctx.beginPath();
      const startAngle = angleOffset;
      let startX = x, startY = y;

      if (coordenadasTipo === 'polar') {
        const startPolar = new Polar(radio, startAngle);
        const startCartesian = startPolar.toCartesiana();
        startX = x + startCartesian.getX();
        startY = y - startCartesian.getY();
      }

      ctx.moveTo(startX, startY);

      for (let i = 1; i <= n; i++) {
        const angulo = angleOffset + (2 * Math.PI / n) * i;
        const coordPolar = new Polar(radio, angulo);
        const coordCartesiana = coordPolar.toCartesiana();
        const xCoord = x + coordCartesiana.getX();
        const yCoord = y - coordCartesiana.getY();
        coords.push(new Cartesiana(xCoord, yCoord));
        ctx.lineTo(xCoord, yCoord);
      }

      ctx.closePath();
      ctx.stroke();

      // Mostrar coordenadas
      const coordsText = coordenadasTipo === 'polar'
        ? 'Coordenadas Polares:<br>' + coords.map(coord => {
            const radio = Math.sqrt(Math.pow(coord.getX(), 2) + Math.pow(coord.getY(), 2));
            const angulo = Math.atan2(coord.getY(), coord.getX());
            return `(${radio.toFixed(2)}, ${angulo.toFixed(2)})`;
          }).join('<br>')
        : 'Coordenadas Cartesianas:<br>' + coords.map(coord => `(${coord.getX().toFixed(2)}, ${coord.getY().toFixed(2)})`).join('<br>');

      coordenadasDiv.innerHTML = coordsText;

      // Mostrar apotema y lado calculado
      apotemaDiv.innerHTML = `Apotema: ${apotema.toFixed(2)}`;
      ladoCalculadoDiv.innerHTML = `Lado: ${ladoCalculado.toFixed(2)}`;
    }

    function limpiarCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      coordenadasDiv.innerHTML = '';
      apotemaDiv.innerHTML = '';
      ladoCalculadoDiv.innerHTML = '';
    }

    function actualizarValores() {
      dibujarPoligono();
    }

    // Llamar a actualizarValores al cargar la página para establecer los valores iniciales
    window.onload = actualizarValores;