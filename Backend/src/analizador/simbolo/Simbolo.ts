import Tipo from "./Tipo";

export default class Simbolo {
    private tipo: Tipo
    private id: string
    private valor: any
    private mutabilidad:string

    constructor(tipo: Tipo, id: string,mutabilidad:string, valor?: any,) {
        this.tipo = tipo
        this.id = id.toLocaleLowerCase()
        this.mutabilidad=mutabilidad
        this.valor = valor
    }

    public getTipo(): Tipo {
        return this.tipo
    }

    public SetTipo(tipo: Tipo): void {
        this.tipo = tipo
    }

    public getId(): string {
        return this.id
    }

    public setId(id: string): void {
        this.id = id
    }

    public getValor(): any {
        return this.valor
    }

    public setValor(valor: any): void {
        this.valor = valor
    }
    public getMutabilidad(): string {
        return this.mutabilidad
    }

    public setMutabilidad(mutabilidad: string): void {
        this.mutabilidad=mutabilidad
    }
}