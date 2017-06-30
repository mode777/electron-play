export class Field {
    public readonly constraints: string[]

    constructor(
        public readonly name: string, 
        public readonly type: string, 
        ...constraints: string[]){
            this.constraints = constraints;
    }

    toSql(){
        return `${this.name} ${this.type} ${this.constraints.join(" ")}`
    }
}