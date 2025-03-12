import { Bool } from '@app/enums/bool';

export interface MongoConnectionOption {
    /**
     * Comma seperated list of hosts including the mongodb listener port.
     * For example, mongo1.yahaal.com:27017,mongo2.yahaal.com:27017
     *
     * @property
     */
    hosts: string;

    /**
     * The database to which the connection has to be made
     *
     * @property
     */
    database: string;

    /**
     * Authentication username to be used for establishing connection
     *
     * @property
     */
    username?: string;

    /**
     * Authentication password to be used for establishing connection
     *
     * @property
     */
    password?: string;

    /**
     * The database which has the username and password defined.
     *
     * @property
     */
    authSource?: string;

    /**
     * The replica set to which connection has to be established.
     *
     * @property
     */
    replicaSet?: string;

    /**
     * Flag that determines whether direct connection has to be made to the provided
     * host ignoring the replica set. This will allow direct connection to a 
     * replica server and could result in write failures.
     *
     * @property
     */
    directConnection?: Bool;
}
