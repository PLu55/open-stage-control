# Scripting

The `script` property allows widgets to run javascript code when their value update. It differs from the [javascript property syntax ](./advanced-syntaxes.md#available-variables) in the following ways:

- no `JS{{}}` wrapper, just the code
- `@{}`, `OSC{}`, `JS{{}}` and `#{}` blocks are replaced with their value before the script's compilation

!!! warning "Avoid advanced syntax in scripts"
    To avoid syntax errors it is recommended to use `getProp()` and `get()` instead of `@{}` and `OSC{}`. `JS{{}}` and `#{}` blocks should be avoided here as well.

## Event-dependent variables

Depending on what triggered the script's execution, a few variables are available to help determine the execution conditions.

**Event: value**

- `id` (`string`): id of the widget that's reponsible for the value update
- `value`: widget's value

**Event: keyboard** (script widget only)

- `type` (`string`): `keydown` or `keyup`
- `key` (`string`): key name,
- `code` (`number`): key code
- `ctrl` (`boolean)`: `true` if ctrl key is pressed
- `shift` (`boolean`): `true` if shift key is pressed
- `alt` (`boolean`): `true` if alt key is pressed
- `meta` (`boolean`): `true` if meta key is pressed


## Available variables

Besides the variables available in the [javascript property syntax ](./advanced-syntaxes.md#available-variables), the following variables and functions are also accessible in this context.

----

#### `get(id)`
- `id`: widget `id` as a string.

Returns the value of the first matching widget.

----

#### `set(id, value)`
- `id`: widget `id` as a string. Can be `"this"` to target the host widget, or `"parent"` to target the parent widget.
- `value`: new value for the widget.

Sets the value of the first matching widget.
If the event that triggered the script's execution was initiated by a user interaction, this will make the widget send its value as well.

----

#### `send(target, address, ...args)`
- `target` (optional): `"ip:port"` or `"midi:device_name"` string. If omitted, the widget's target will be used.
- `address`: osc address, must start with a `/`
- `args`: value or `{type: "OSC_TYPE_LETTER", value: VALUE}` `object`

If the event that triggered the script's execution was not initiated by a user interaction, this function will have no effect.

----

#### `getProp(id, name)`
- `id`: widget `id` as a string. Can be `"this"` to target the host widget, or `"parent"` to target the parent widget.
- `name`: property name.

Returns the property called `"name"` of the first matching widget.

----

#### `updateProp(id, name)`
- `id`: widget `id` as a string. Can be `"this"` to target the host widget, or `"parent"` to target the parent widget.
- `name`: property name.

Forcers a widget to check if one of its properties has changed and update itself if needed.

----

#### `httpGet(url, callback)`

- `url`: url of the resource to fetch (local url only)
- `callback`: function executed when/if the http request succeeds, with the response text as argument

----

#### `stateGet(id)`
- `id`: widget `id` as a string, or array of `id` strings. Can be `"this"` to target the host widget, or `"parent"` to target the parent widget.

Returns a state object (`id:value`) for matching widget and all their children.

----

#### `stateSet(state)`

Loads a state object. If the event that triggered the script's execution was initiated by a user interaction, this will make the updated widgets send their value as well.

----

#### `storage`: `localStorage`

Global [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) instance, allows storing data that persists upon refresh/relaunch.

----

#### `setTimeout(id, callback, delay)` / `setInterval(id, callback, delay)`

These work like their native equivalent, with an extra (optional) `id` argument.

- `id` (optional): unique identifier. If a timeout with the same id is already running, it is cleared before the new one is created. If omitted, defaults to `undefined`. One can use `Math.random()` or `Date.now()` to force new id at each execution, though this might cause performance issues. `id`s are scoped to the widget's context: two timeouts with the same `id` in two different widgets can run concurrently
- `callback`: function to be executed
- `delay`: delay before execution is ms

Reference:

- https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
- https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval

-----

#### `clearTimeout(id)` / `clearInterval(id)`

Clear timeout with matching `id`.

Reference:

- https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearTimeout
- https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearInterval

----

#### `unfocus()`

*Built-in client only*: tells the operating system to give the focus to the window that was focused before.

----

#### `getScroll(id)`
- `id`: widget `id` as a string.

Returns the scroll state of a container as a `[x, y]` array.

----

#### `setScroll(id, x, y)`
- `id`: widget `id` as a string. Can be `"this"` to target the host widget, or `"parent"` to target the parent widget.
- `x`: horizontal scroll, `undefined` to use current value
- `y`: vertical scroll, `undefined` to use current value

Sets the scroll state of a container.

----

#### `toolbar(i1, i2, ...)`
- `iX`: menu entry index

Trigger toolbar action at specified index. Examples:

- `toolbar(0, 0)` -> Open a new session
- `toolbar(3)` -> Toggle full screen

Actions will only be triggered if initiated with a user interaction. Fullscreen cannot be toggled with a simulated interaction (i.e. using `/SET`)
