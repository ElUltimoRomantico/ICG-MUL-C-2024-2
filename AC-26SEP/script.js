// Clase Punto con encapsulamiento
class Punto {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    set x(value) {
        this.#x = value;
    }

    set y(value) {
        this.#y = value;
    }
}

// Modificación de la clase Linea con la inclusión de objetos Punto y el algoritmo de Bresenham
class Linea {
    #punto1;
    #punto2;

    constructor(x1, y1, x2, y2) {
        this.#punto1 = new Punto(x1, y1);
        this.#punto2 = new Punto(x2, y2);
    }

    dibujar() {
        let x1 = this.#punto1.x;
        let y1 = this.#punto1.y;
        let x2 = this.#punto2.x;
        let y2 = this.#punto2.y;

        let dx = Math.abs(x2 - x1);
        let dy = Math.abs(y2 - y1);
        let sx = (x1 < x2) ? 1 : -1;
        let sy = (y1 < y2) ? 1 : -1;
        let err = dx - dy;

        while (true) {
            const point = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            point.setAttribute("x", x1);
            point.setAttribute("y", y1);
            point.setAttribute("width", 1);
            point.setAttribute("height", 1);
            point.setAttribute("fill", "black");
            svg.appendChild(point);

            if (x1 === x2 && y1 === y2) break;
            let e2 = 2 * err;
            if (e2 > -dy) {
                err -= dy;
                x1 += sx;
            }
            if (e2 < dx) {
                err += dx;
                y1 += sy;
            }
        }
    }
}

// Modificación de la clase Circunferencia para usar objetos Punto
class Circunferencia {
    #centro;
    #radio;

    constructor(cx, cy, r) {
        this.#centro = new Punto(cx, cy);
        this.#radio = r;
    }

    dibujar() {
        const circ = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circ.setAttribute("cx", this.#centro.x);
        circ.setAttribute("cy", this.#centro.y);
        circ.setAttribute("r", this.#radio);
        circ.setAttribute("fill", "none");
        circ.setAttribute("stroke", "black");
        svg.appendChild(circ);
    }
}

// Modificación de la clase Elipse para usar objetos Punto
class Elipse {
    #centro;
    #a;
    #b;

    constructor(cx, cy, a, b) {
        this.#centro = new Punto(cx, cy);
        this.#a = a;
        this.#b = b;
    }

    dibujar() {
        const elipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        elipse.setAttribute("cx", this.#centro.x);
        elipse.setAttribute("cy", this.#centro.y);
        elipse.setAttribute("rx", this.#a);
        elipse.setAttribute("ry", this.#b);
        elipse.setAttribute("fill", "none");
        elipse.setAttribute("stroke", "black");
        svg.appendChild(elipse);
    }
}

// Crear instancias y dibujar las primitivas con encapsulamiento
const linea = new Linea(20, 20, 220, 220);
linea.dibujar();

const circunferencia = new Circunferencia(320, 100, 50);
circunferencia.dibujar();

const elipse = new Elipse(300, 400, 80, 50);
elipse.dibujar();
