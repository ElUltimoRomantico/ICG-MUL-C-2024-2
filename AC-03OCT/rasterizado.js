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

// Función para calcular el centroide
function calcularCentroide(puntos) {
    let sumaX = 0, sumaY = 0;
    puntos.forEach(p => {
        sumaX += p.getX();
        sumaY += p.getY();
    });
    return new Punto(sumaX / puntos.length, sumaY / puntos.length);
}

// Función para calcular el ángulo de cada punto con respecto al centroide
function calcularAngulo(punto, centroide) {
    return Math.atan2(punto.getY() - centroide.getY(), punto.getX() - centroide.getX());
}

// Función para ordenar los puntos en sentido antihorario
function ordenarPuntosAntihorario(puntos) {
    const centroide = calcularCentroide(puntos);
    return puntos.slice().sort((a, b) => calcularAngulo(a, centroide) - calcularAngulo(b, centroide));
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

        const cruz = dx1 * dy2 - dy1 * dx2;  // Producto cruzado

        if (cruz > 0) esPositivo = true;
        if (cruz < 0) esNegativo = true;

        // Si hay cruces positivos y negativos, es cóncavo
        if (esPositivo && esNegativo) return false;
    }

    return true;  // Si todos los cruces tienen el mismo signo, es convexo
}

// Función para dibujar el polígono en un canvas
function dibujarPoligonoRasterizado(puntos) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
    
    ctx.beginPath();
    
    // Dibujar el polígono conectando los puntos
    ctx.moveTo(puntos[0].getX(), puntos[0].getY());
    for (let i = 1; i < puntos.length; i++) {
        ctx.lineTo(puntos[i].getX(), puntos[i].getY());
    }
    ctx.closePath();
    ctx.stroke(); // Traza las líneas del polígono
    
    // Rellenar el polígono si lo deseas
    ctx.fillStyle = 'rgba(0, 150, 250, 0.3)';
    ctx.fill();
}

// Función para generar una figura aleatoria
function generarFigura() {
    const puntos = [];

    // Generar puntos aleatorios
    for (let i = 0; i < 5; i++) {
        const x = Math.random() * 400 + 50;
        const y = Math.random() * 400 + 50;
        puntos.push(new Punto(x, y));
    }

    // Ordenar puntos en sentido antihorario
    const puntosOrdenados = ordenarPuntosAntihorario(puntos);

    // Dibujar el polígono
    dibujarPoligonoRasterizado(puntosOrdenados);

    // Determinar si es convexo o cóncavo
    const esConvexoPoligono = esConvexo(puntosOrdenados);
    const tipo = esConvexoPoligono ? "convexo" : "cóncavo";
    
    document.getElementById('tipo-poligono').innerText = `El polígono es ${tipo}.`;
}
