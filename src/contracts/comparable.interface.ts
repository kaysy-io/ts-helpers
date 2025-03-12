export interface Comparable {
    /**
     * Returns true if the given entity matches this entity. Do not change the name of this function.
     * mongoose.ObjectId function has an equals function, so if we keep the name same as that, we
     * could get away with one conditional check.
     *
     * @param entity
     * @returns
     */
    equals(entity: Comparable): boolean;
}
