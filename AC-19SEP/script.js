const svg = document.getElementById('svg');

class Linea {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    dibujar() {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line"); // Esto es fundamental para que el navegador reconozca y renderice correctamente los elementos en SVG
        line.setAttribute("x1", this.x1);
        line.setAttribute("y1", this.y1);
        line.setAttribute("x2", this.x2);
        line.setAttribute("y2", this.y2);
        line.setAttribute("stroke", "black");
        svg.appendChild(line);
    }
}

class Circunferencia {
    constructor(cx, cy, r) {
        this.cx = cx;
        this.cy = cy;
        this.r = r;
    }

    dibujar() {
        const circ = document.createElementNS("http://www.w3.org/2000/svg", "circle"); // Esto es fundamental para que el navegador reconozca y renderice correctamente los elementos en SVG
        circ.setAttribute("cx", this.cx);
        circ.setAttribute("cy", this.cy);
        circ.setAttribute("r", this.r);
        circ.setAttribute("fill", "none");
        circ.setAttribute("stroke", "black");
        svg.appendChild(circ);
    }
}

class Elipse {
    constructor(cx, cy, a, b) {
        this.cx = cx;
        this.cy = cy;
        this.a = a;
        this.b = b;
    }

    dibujar() {
        const elipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse"); // Esto es fundamental para que el navegador reconozca y renderice correctamente los elementos en SVG
        elipse.setAttribute("cx", this.cx);
        elipse.setAttribute("cy", this.cy);
        elipse.setAttribute("rx", this.a);
        elipse.setAttribute("ry", this.b);
        elipse.setAttribute("fill", "none");
        elipse.setAttribute("stroke", "black");
        svg.appendChild(elipse);
    }
}

// Crear instancias y dibujar las primitivas
const linea = new Linea(20, 20, 220, 220);
linea.dibujar();

const circunferencia = new Circunferencia(320, 100, 50);
circunferencia.dibujar();

const elipse = new Elipse(300, 400, 80, 50);
elipse.dibujar();