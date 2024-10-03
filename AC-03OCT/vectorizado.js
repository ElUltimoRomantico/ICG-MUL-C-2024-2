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
    console.log("Dibujando polígono vectorizado..."); // Debugging

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
    document.getElementById('svg-container').appendChild(svg);
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

    dibujarPoligonoVectorizado(puntos);
};
