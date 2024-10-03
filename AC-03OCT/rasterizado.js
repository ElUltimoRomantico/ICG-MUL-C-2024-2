// Clase Punto
class Punto {
    constructor(x, y) {
        let _x = x;
        let _y = y;

        this.getX = () => _x;
        this.getY = () => _y;

        this.setX = (x) => { _x = x; };
        this.setY = (y) => { _y = y; };
    }
}

// Función para dibujar el polígono en un canvas
function dibujarPoligonoRasterizado(puntos) {
    console.log("Dibujando polígono rasterizado..."); // Debugging

    const canvas = document.getElementById('canvas');
    if (!canvas.getContext) {
        console.error("Canvas no soportado por el navegador.");
        return;
    }

    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(puntos[0].getX(), puntos[0].getY());

    puntos.forEach(punto => {
        ctx.lineTo(punto.getX(), punto.getY());
    });

    ctx.closePath();
    ctx.stroke();
}

// Ejemplo de uso
window.onload = function() {
    const puntos = [
        new Punto(100, 150),
        new Punto(200, 50),
        new Punto(300, 150),
        new Punto(250, 250),
        new Punto(150, 250)
    ];

    dibujarPoligonoRasterizado(puntos);
};
