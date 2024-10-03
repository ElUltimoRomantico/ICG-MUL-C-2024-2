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

// Función para generar SVG
function dibujarPoligonoVectorizado(puntos) {
    const svgContainer = document.getElementById('svg-container');
    svgContainer.innerHTML = ""; // Limpiar el contenedor previo
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "500");
    svg.setAttribute("height", "500");
    svg.setAttribute("viewBox", "0 0 500 500");

    const poligono = document.createElementNS(svgNS, "polygon");
    
    let puntosStr = puntos.map(p => `${p.getX()},${p.getY()}`).join(" ");
    poligono.setAttribute("points", puntosStr);
    poligono.setAttribute("stroke", "black");
    poligono.setAttribute("fill", "none");

    svg.appendChild(poligono);
    svgContainer.appendChild(svg);
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

    dibujarPoligonoVectorizado(puntos);

    const esConvexoPoligono = esConvexo(puntos);
    const tipo = esConvexoPoligono ? "convexo" : "cóncavo";
    
    document.getElementById('tipo-poligono').innerText = `El polígono es ${tipo}.`;
}
