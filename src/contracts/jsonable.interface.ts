export interface Jsonable<ReturnType = any> {
    /**
     * Returns the JSON representation of this entity
     *
     * @returns
     */
    toJSON(): ReturnType;
}
