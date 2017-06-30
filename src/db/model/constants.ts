export type UpdateType = "CASCADE" | "RESTRICT" | "NO ACTION" | "SET NULL";

export module Behaviour {
    export const CASCADE = "CASCADE";
    export const RESTRICT = "RESTRICT";
    export const NO_ACTION = "NO ACTION";
    export const SET_NULL = "SET NULL";
}

export module FieldTypes {
    export const INTEGER = "INTEGER";
    export const TEXT = "TEXT";
    export const DATE = "DATE";
}

export module Constraints {
    export const NOT_NULL = "NOT NULL";
    export const NULL = "NULL";
    export const UNIQUE = "UNIQUE";
    export const AUTO_INCREMENT = "AUTOINCREMENT";
    export const PRIMARY_KEY = "PRIMARY KEY";
}