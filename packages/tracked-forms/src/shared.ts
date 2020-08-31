export interface LiveProperties<T> { value: T, underlyingValue: T }

export const CLASSNAME_CHANGED = "liveeditor-changed";
export const CLASSNAME_EDITABLE = "editable";

export function liveClassName(className: string|null|undefined, isChanged: boolean) {
    className = (className || '') + ' ' + CLASSNAME_EDITABLE;
    if (isChanged)
        className += " " + CLASSNAME_CHANGED;
    return className;
}