import { Paginator } from './paginator';
import { LengthAwareObject } from '@app/types/paginator/length-aware.type';

export class LengthAwarePaginator<Item = any> extends Paginator<Item, LengthAwareObject<Item>> {
    /**
     * Total number of items in the data source
     *
     * @property
     */
    protected total: number;

    /**
     * The last page available based on the total items and per page count
     *
     * @property
     */
    protected lastPage: number;

    constructor(items: Item[], total: number, perPage: number, currentPage = 1) {
        super();
        this.items = items;
        this.total = total;
        this.perPage = perPage;
        this.lastPage = Math.max(Math.ceil(this.total / this.perPage), 1);
        this.currentPage = currentPage || 1;
    }

    /**
     * Determine if there are more items in the data source.
     *
     * @returns
     */
    public hasMorePages(): boolean {
        return this.getCurrentPage() < this.getLastPage();
    }

    /**
     * Get the last page.
     *
     * @returns
     */
    public getLastPage() {
        return this.lastPage;
    }

    /**
     * Get the total number of items being paginated.
     *
     * @returns
     */
    public getTotal() {
        return this.total;
    }

    /**
     * Returns the JSON representation of this entity
     *
     * @returns
     */
    public toJSON() {
        return {
            current_page: this.getCurrentPage(),
            data: this.items,
            first_page_url: this.url(1),
            from: this.firstItem(),
            last_page: this.getLastPage(),
            last_page_url: this.url(this.getLastPage()),
            next_page_url: this.nextPageUrl(),
            path: this.getPath(),
            per_page: this.getPerPageCount(),
            prev_page_url: this.previousPageUrl(),
            to: this.lastItem(),
            total: this.getTotal(),
        };
    }
}
