import { DbConnection } from "./db.connection";
import { IdentityModel } from "./identity.model";

export class DefaultModel<TEntity extends { id: number, name: string, description: string }> extends IdentityModel<TEntity> {

    name: string;
    description: string;

    protected loadFromEntity(entity: TEntity) {
        throw new Error("Method not implemented.");
    }
    protected loadDefaults() {
        this.name = "";
        this.description = "";
    }
    protected toEntity(): TEntity {
        return <TEntity>{
            name: this.name,
            description: this.description
        };
    }
}