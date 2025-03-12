import { queryString } from '@app/helpers';
import { AnyObject } from '@app/types/data-types.type';
import { Jsonable } from '@app/contracts/jsonable.interface';

export abstract class Paginator<ItemType = any, ObjectType = any> implements Jsonable<ObjectType> {
    /**
     * All of the items being paginated.
     *
     * @property
     */
    protected items: ItemType[] = [];

    /**
     * The number of items to be shown per page.
     *
     * @property
     */
    protected perPage: number = 10;

    /**
     * The current page being "viewed".
     *
     * @property
     */
    protected currentPage: number = 1;

    /**
     * The base path to assign to all URLs.
     *
     * @property
     */
    protected path: string = '/';

    /**
     * The query parameters to add to all URLs.
     *
     * @property
     */
    protected query: AnyObject = {};

    /**
     * The query string variable used to store the page.
     *
     * @property
     */
    protected pageName: string = 'page';

    /**
     * Determine if there are more items in the data source.
     *
     * @returns
     */
    public abstract hasMorePages(): boolean;

    /**
     * Returns the JSON representation of this entity
     *
     * @returns
     */
    public abstract toJSON(): ObjectType;

    /**
     * Determine if the given value is a valid page number.
     *
     * @param page
     * @returns
     */
    protected isValidPageNumber(page: number) {
        return page >= 1;
    }

    /**
     * Get the URL for the previous page.
     *
     * @returns
     */
    public previousPageUrl() {
        if (this.getCurrentPage() > 1) {
            return this.url(this.getCurrentPage() - 1);
        }
        return null;
    }

    /**
     * Get the URL for the next page.
     *
     * @returns
     */
    public nextPageUrl() {
        if (this.hasMorePages()) {
            return this.url(this.getCurrentPage() + 1);
        }
        return null;
    }

    /**
     * Get the URL for a given page number.
     *
     * @param page
     * @returns
     */
    public url(page: number) {
        if (page <= 0) {
            page = 1;
        }

        const query = Object.assign({}, this.query, { [this.pageName]: page });

        return this.getPath() + (this.getPath().includes('?') ? '&' : '?') + queryString(query);
    }

    /**
     * Add a query string value to the paginator.
     *
     * @param key
     * @param value
     * @returns
     */
    public addQuery(key: string, value: any) {
        if (key !== this.pageName) {
            this.query[key] = value;
        }

        return this;
    }

    /**
     * Sets the query object for building the url
     *
     * @param query
     * @returns
     */
    public setQuery(query: AnyObject) {
        this.query = query;

        return this;
    }

    /**
     * Get the number of the first item in the slice.
     *
     * @returns
     */
    public firstItem() {
        return this.count() > 0 ? (this.currentPage - 1) * this.perPage + 1 : null;
    }

    /**
     * Get the number of the last item in the slice.
     *
     * @returns
     */
    public lastItem() {
        return this.count() > 0 ? (this.firstItem() as number) + this.count() - 1 : null;
    }

    /**
     * Get the number of items shown per page.
     *
     * @returns
     */
    public getPerPageCount() {
        return this.perPage;
    }

    /**
     * Determine if there are enough items to split into multiple pages.
     *
     * @returns
     */
    public hasPages() {
        return this.getCurrentPage() != 1 || this.hasMorePages();
    }

    /**
     * Determine if the paginator is on the first page.
     *
     * @returns
     */
    public onFirstPage() {
        return this.getCurrentPage() <= 1;
    }

    /**
     * Get the current page.
     *
     * @returns
     */
    public getCurrentPage() {
        return this.currentPage;
    }

    /**
     * Get the query string variable used to store the page.
     *
     * @returns
     */
    public getPageName() {
        return this.pageName;
    }

    /**
     * Set the query string variable used to store the page.
     *
     * @param pageName
     * @returns
     */
    public setPageName(pageName: string) {
        this.pageName = pageName;

        return this;
    }

    /**
     * Set the base path to assign to all URLs.
     *
     * @param path
     * @returns
     */
    public setPath(path: string) {
        this.path = path;

        return this;
    }

    /**
     * Get the base path for paginator generated URLs.
     *
     * @returns
     */
    public getPath() {
        return this.path;
    }

    /**
     * Determine if the list of items is empty.
     *
     * @returns
     */
    public isEmpty() {
        return this.items.length === 0;
    }

    /**
     * Determine if the list of items is not empty.
     *
     * @returns
     */
    public isNotEmpty() {
        return !this.isEmpty();
    }

    /**
     * Get the number of items for the current page.
     *
     * @returns
     */
    public count() {
        return this.items.length;
    }

    /**
     * Get the paginator's underlying collection.
     *
     * @returns
     */
    public getItems(): ItemType[] {
        return this.items;
    }

    /**
     * Set the paginator's underlying collection.
     *
     * @param items
     * @returns
     */
    public setItems(items: ItemType[]) {
        this.items = items;

        return this;
    }

    /**
     * Returns true if a path is already set for the paginator
     *
     * @returns
     */
    public hasPath() {
        return this.path !== '/';
    }

    /**
     * Returns true if query object is set for the paginator
     *
     * @returns
     */
    public hasQuery() {
        const query = Object.assign({}, this.query);

        return Object.keys(query).length > 0;
    }

    /**
     * Transforms the items in this collection using the given callbackfn
     *
     * @param callbackfn
     * @returns
     */
    public async transform<ReturnType = any>(callbackfn: (item: ItemType) => ReturnType) {
        const pendingTransformations = this.items.map(callbackfn);

        const transformedResults = await Promise.all(pendingTransformations);

        return this.setItems(transformedResults as any);
    }
}
