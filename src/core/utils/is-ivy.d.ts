/**
 * @description
 *
 * Determines if the application runs with ivy or not (ViewEngine)
 *
 * @usageNotes
 *
 * The function can be just imported and used everywhere.
 *
 * ```ts
 * import { isIvy } from `utils/is-ivy`;
 *
 * console.log(isIvy());  // true or false
 * ```
 *
 * The determination if an application runs with Ivy or not is done by following table:
 *
 * **Table for ng global presence in ViewEngine and Ivy for prod/dev modes**
 *
 *  | render   | ViewEngine | ViewEngine | Ivy       | Ivy       |
 *  | -------- | ---------- | ---------- | --------- | --------  |
 *  | mode     | prod       | dev        | prod      | dev       |
 *  | ng       | present    | present    | undefined | present   |
 *  | ng.probe | present    | present    | undefined | undefined |
 *
 *  > So for Ivy we need to make sure that ng is undefined or,
 *  > in case of dev environment, ng.probe is undefined
 *
 */
export declare function isIvy(): boolean;
