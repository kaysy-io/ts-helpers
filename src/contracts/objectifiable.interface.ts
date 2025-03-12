export interface Objectifiable<ReturnType = any> {
    /**
     * Returns the object representation of this entity
     *
     * @returns
     */
    toObject(): ReturnType;
}
