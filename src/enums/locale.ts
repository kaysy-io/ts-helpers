export enum Locale {
    EN = 'en',
}

/**
 * Locale id map is deprecated as locale itself is an identifier and no need
 * of an integer for identification. Use `Locale` instead
 *
 * @deprecated
 */
export const LocaleId = {
    1: Locale.EN,
};
