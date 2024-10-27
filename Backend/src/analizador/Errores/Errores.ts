export class Errores {
    private tipo: string;
    private descripcion: string;
    private linea: number;
    private columna: number;

    constructor(tipo: string, descripcion: string, linea: number, columna: number) {
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.linea = linea;
        this.columna = columna;
    }

    public getTipo(): string {
        return this.tipo;
    }

    public getDescripcion(): string {
        return this.descripcion;
    }

    public getLinea(): number {
        return this.linea;
    }

    public getColumna(): number {
        return this.columna;
    }

    public setTipo(tipo: string): void {
        this.tipo = tipo;
    }

    public setDescripcion(descripcion: string): void {
        this.descripcion = descripcion;
    }

    public setLinea(linea: number): void {
        this.linea = linea;
    }

    public setColumna(columna: number): void {
        this.columna = columna;
    }

    public toString(): string {
        return `Errores{tipo=${this.tipo}, descripcion=${this.descripcion}, linea=${this.linea}, columna=${this.columna}}`;
    }
}
