# Mummet-core

Mummet is an _immutable_ helper library that tracks dictionary changes. 
It is optimized for use for Redux, but can be used with any code that 
needs to track object changes.

By wrapping objects in a tracked layer, you can easily get the current state 
of each object and compare it with its original "underlying" state. 

Mummet also has tracks a "loaded" state for each object, that makes it easy 
to track the state of objects when they were displayed, useful for example 
when you need to refresh a filtered page and don't want newly edited objects 
to disappear just because the filtered keyword was edited.

## Installation

```
npm install --save mummet-core
```

## API usage


### Create an empty state, for example in the reducers _initialState_.
```
import { track, Dictionary } from 'mummet-core'

interface MyEntity {
    id: number,
    name: string,
    //...etc
}

let state: Dictionary<MyEntity> = {}
```


### Add a tracked object as unmodified
Inserts an object with current and underlying values the same.

#### With the library...
```
const entity5: MyEntity = { id: 5, name: 'entity 5' }
state = addOrReplace(state, entity5, 'id')
```

#### ... or semi-manually
```
const entity6: MyEntity = { id: 6, name: 'entity 6' }
state = { ...state, [entity6.id]: tracked(entity) }
```


### Inserts a new object without underlying value
```
const newEntity: MyEntity = { id:7, name: 'newEntity' }
state = addOrUpdate(state, newEntity, 'id')
```

### Update the current name of a tracked object
```
state = update(state, 5, e => ({...e, name: 'updated entity 5' }))
```

### Update the underlying entity without affecting current changes
This replaces the underlying entity. It also updates all current 
properties that were unmodified. Thus pending user-changes are kept.

```
const serverChangedEntity: MyEntity = { id: 6, name: 'server changed name' }
state = setUnderlying(state, serverChangedEntity, 'id')
```

### Find all modified objects
```
const modified = findModified(state)
const currentList = modified.map(t => t.current)
const originalList = modified.map(t => t.underlying)
```

### Delete an object
```
state = remove(state, 6)
```

### Find original state of deleted objects
```
const originalList = findRemoved(state)
```

### Commit one or more modified or deleted object
Assigns the current value to the underlying. 
Removed objects are excavated from the dictionary at this point.
```
state = commit(state, [5, 6])
```

### Restore one or more modified or deleted object
Assigns the underlying value to the current.
Newly created objects are excavated from the dictionary at this point.
```
state = rollback(state, [5, 6])
```

### Filter the dictionary based on tracked properties
```
const trackedList = find(state, e => e.current?.name === 'entity 5' || e.underlying.name === 'entity 6')
```


## API methods ordered by intent


### Server actions

#### addOrReplace(state, entity, id_field_name)
Starts tracking the `entity`, replacing any existing version in the `state`, making the entity considered `unmodified`.

Use this method when the server returns the complete entity state when the user saves his changes.

**Note:** When tracking the initial state from the server, this call is more effective than calling `setUnderlying()`, since it doesn't have to check if the object already exists.

#### setUnderlying(state, entity[], id_field_name)
Updates an existing entity with latest changes from the server, without
overwriting uncommitted user changes to the `current` state.

New entities are added to the state as `unmodified`.


### User actions

#### addOrUpdate(state, entity, id_field_name)
Completely replaces the `current` state of an `entity` without affecting the `underlying` state.

New entities are added to the state as `new`.

#### update(state, id, (previous_state) => next_state)
Makes it easy to replace an entitys `current` state while inspecting its previous properties.

**Note:** Make sure to always treat the `entity` as immutable. Return a new state with `{...entity }` instead of trying to modify the previous state

#### updateProperty(state, id, property, value)
Fast method for updating a specific property of an entity while keeping all other properties unchanged.

#### remove(state, id)
Flags an `entity` as deleted.
It is still possible to `rollback()` until committed.

### refreshLoaded(state)
Resets all `loaded` states for entities to their `current` counterparts.

This method should typically be called when the user starts a new search,
so it is easy to repeatedly filter entities by their state at the time of the search.


### Save actions

### commit(state, id[])
Copies the `current` state of entities to their `underlying` counterparts.
This should be called when changes are submitted to the server.

### rollback(state, id, underlying, previous?)
Reverts the `underlying` state of an entity without affecting its `current` state. Conditionally this method checks that the `current` state is still `previous`.

You can effectively use `commit()` and `rollback()` in concert, to make a slow async save operation seem much faster. 
1. Store a local copy of the tracked entity.
2. Call `commit()` to make it appear as saved.
3. Call the `async` save-method and `await` its response.
4. Check if the save succeeded, else `rollback()` the entity to its previous state.


### Filter actions

#### findModified(state)
Returns a list of `new` or `modified` tracked entities, but not `deleted`.

#### findRemoved(state)
Returns a list of `underlying` states for `deleted` entities.

#### find(state, (trackedEntity) => boolean)
Returns tracked entities that fulfill a custom filter expression.

**Note:** Since filtered entities can be deleted, the `current` state must be tested for `null` before being used in the `filter` expression.
