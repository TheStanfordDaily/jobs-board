import DOMPurify from "dompurify";

/* Purifies HTML from dangerous elements so it can be set in a component.
 */
export function purify(input) {
    return DOMPurify.sanitize(input);
}