import deepFreeze from "deep-freeze"
import { track } from '..'

test("track creates a Tracked<T>", () => {
    const entity = deepFreeze({ id: 4 });

    const actual = track(entity)

    expect(actual.current).toBe(entity)
    expect(actual.underlying).toBe(entity)
    expect(actual.loaded).toBe(entity)
})
