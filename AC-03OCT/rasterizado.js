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
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas

    ctx.beginPath();
    ctx.moveTo(puntos[0].getX(), puntos[0].getY());

    puntos.forEach(punto => {
        ctx.lineTo(punto.getX(), punto.getY());
    });

    ctx.closePath();
    ctx.stroke();
}

// Función para determinar si un polígono es cóncavo o convexo
function esConvexo(puntos) {
    let esPositivo = false;
    let esNegativo = false;

    for (let i = 0; i < puntos.length; i++) {
        const p0 = puntos[i];
        const p1 = puntos[(i + 1) % puntos.length];
        const p2 = puntos[(i + 2) % puntos.length];

        const dx1 = p1.getX() - p0.getX();
        const dy1 = p1.getY() - p0.getY();
        const dx2 = p2.getX() - p1.getX();
        const dy2 = p2.getY() - p1.getY();

        const cruz = dx1 * dy2 - dy1 * dx2;

        if (cruz > 0) esPositivo = true;
        if (cruz < 0) esNegativo = true;

        if (esPositivo && esNegativo) return false;
    }

    return true;
}

// Función para generar una figura aleatoria
function generarFigura() {
    const puntos = [];

    for (let i = 0; i < 5; i++) {
        const x = Math.random() * 400 + 50;
        const y = Math.random() * 400 + 50;
        puntos.push(new Punto(x, y));
    }

    dibujarPoligonoRasterizado(puntos);

    const esConvexoPoligono = esConvexo(puntos);
    const tipo = esConvexoPoligono ? "convexo" : "cóncavo";
    
    document.getElementById('tipo-poligono').innerText = `El polígono es ${tipo}.`;
}
