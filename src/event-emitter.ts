import { ListenerFunction } from './types/listener.type';

export class EventEmitter {
    /**
     * Map of events and its corresponding listeners
     *
     * @property
     */
    protected events: Record<string, Array<ListenerFunction>> = {};

    /**
     * Registers a new listener for the given event or events
     *
     * @param event
     * @param listener
     * @returns
     */
    public on<DataType = any>(event: string | string[], listener: ListenerFunction<DataType>) {
        let events: string[] = typeof event === 'string' ? [event] : event;

        events.forEach((event) => {
            if (!this.events[event]) {
                this.events[event] = [];
            }
            this.events[event].push(listener);
        });

        return this;
    }

    /**
     * Triggers the given event with the data. We'll be simply iterating through all the
     * listeners attached to the event.
     *
     * @param event
     * @param data
     * @returns
     */
    public async emit(event: string, data?: any) {
        if (!this.events[event]) {
            return;
        }

        const promises = this.events[event].map(async function (listener) {
            return await listener(event, data);
        });

        return await Promise.all(promises);
    }

    /**
     * Remove all the event listeners or listeners of a particular event or remove a particular
     * listener of an event.
     *
     * @param event
     * @param listenerToRemove
     * @returns
     */
    public removeListeners(event?: string, listenerToRemove?: ListenerFunction) {
        // If no event name is mentioned, simply clear out all the events and associated
        // listeners from the memory.
        if (!event) {
            this.events = {};
        }
        // If event name is mentioned, we clear out the listener based on the second
        // parameter `listenerToRemove`. If the value is not present, we simply clear
        // out all the listener mapped to the event.
        else {
            if (!listenerToRemove) {
                this.events[event] = [];
            }
            // If listener to remove is mentioned, we'll simply filter out the listener
            // from the events mapping.
            else {
                this.events[event] = this.events[event].filter(function (listener) {
                    return listener !== listenerToRemove;
                });
            }
        }

        return this;
    }
}
