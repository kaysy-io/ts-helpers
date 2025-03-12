export interface LengthAwareObject<ItemType = any> {
    /**
     * Current page position
     *
     * @property
     */
    current_page: number;

    /**
     * List of paginated items
     *
     * @property
     */
    data: ItemType[];

    /**
     * First page url
     *
     * @property
     */
    first_page_url: string;

    /**
     * Current page start item position in the data source
     *
     * @property
     */
    from: number | null;

    /**
     * Last page number
     *
     * @property
     */
    last_page: number;

    /**
     * Last page url
     *
     * @property
     */
    last_page_url: string;

    /**
     * Next page url
     *
     * @property
     */
    next_page_url: string | null;

    /**
     * Current page path
     *
     * @property
     */
    path: string;

    /**
     * Per page count
     *
     * @property
     */
    per_page: number;

    /**
     * Previous page url
     *
     * @property
     */
    prev_page_url: string | null;

    /**
     * Last item position in the data source
     *
     * @property
     */
    to: number | null;

    /**
     * Total number of items in the data source
     *
     * @property
     */
    total: number;
}
