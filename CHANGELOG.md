# Changelog

## next

- scripting
  - expose toolbar menu actions

- remote control
  - optimise small changes made with /EDIT

- widgets
  - button: add `wrap` and `vertical` properties  

## 1.2.0

- bug fixes
  - editor: id not incremented when pasting multiple widgets with id+1

- main
  - remove support for extra args in the `custom-module` option (fixes some path issues)

- widgets
  - all: add `lineWidth` style property
  - knob: add `solid` & `line` designs
  - fader: add `knobSize` property

- editor
  - preserve percentages in position/size
  - add 'Relative units (%)' option to use percents automatically on new widgets

## 1.1.0

- bug fixes
  - iOS 14+ scrolling issue

- midi
  - add support for channel pressure and key pressure messages

- widgets
  - svg: remove support for non-standard `%x` and `%y` units; fixed layout update when resized;
  - knob: add support for custom dash/gap size in `dashed` property

## 1.0.4

- bug fixes
  - script: broken `storage.getItem` and `storage.removeItem`
  - regression breaking `remote-root` option when starting with the launcher


## 1.0.3

- bug fixes
  - modal: layout issue on iOS

- widgets
  - panels: added `contain` property to allow scrolling in vertical/horizontal layouts

- midi
  - add support for named ports in midi configuration


## 1.0.2

- bug fixes
  - broken scrolling on iPhone iOS 13
  - window geometry issue  

## 1.0.1

- UI
  - windows' dimensions and position are now saved upon closing and restored at startup

## 1.0.0

*This list is not exhaustive*

- compatibility
  - dropped support for iOS 9
  - firefox (75+) support

- UI
  - overhaul design reworked
  - foldable sidepanels
  - removed lobby
  - added toolbar menu
  - dispay loading (spinner) in a notification instead of a modal
  - mod + w to close window
  - context-menu now use click event to trigger actions, not mousedown/touchstart
  - no more uppercase text by default

- themes
  - built-in themes removed except `orange`

- translations
  - incomplete russian translation removed

- editor
  - project tree
  - dropdown for properties with multiple choices
  - color picker
  - preview numeric values for style-related properties set to auto
  - context menu: added "show in tree" action
  - context menu: removed "edit parent" action
  - allow copying tabs (to tab containers only)
  - shared clipboard accross all clients
  - prevent interaction with widgets when `shift` or `ctrl` is held
  - ensure @{} bindings are always updated upon edition


- widget changes
  - all: removed `label` option except for buttons, tabs and modals (one should use `text` widgets if needed)
  - all: removed support for `null` and `"self"` targets
  - all: added `ignoreDefaults` property (allows ignoring the server's default targets)
  - all: `precision` property to `decimals`, don't set osc integer typetag when 0
  - all: added `typeTags` property
  - all: multiple style properties to control visibility, colors, alphas and padding
  - all: added `interaction` (=> css `pointer-events: none;`)
  - all: added `expand` (=> css `flex: 1;`)
  - all:  prevent html tags in label
  - pads: removed `split` property -> use custom-module or script instead
  - root: can contain widgets or tabs
  - panels: added `layout`, `justify` and `gridTemplate` to help managing layouts (especially responsive ones)
  - panels: added `verticalTabs` property
  - panels: added `traversing` property, allow restricting `traversing` to a specific widget type
  - fader: removed `input`
  - fader: removed `meter`
  - fader: added `gradient`
  - fader: added `round` design style
  - fader: support setting dash size and gap size in `dashed` property
  - switch: added `layout` (including grid)
  - switch: added `click` mode
  - plot/eq: removed `smooth`
  - plots/sliders/pads: reversed `logScale` behavior to match standard implementations; can be either `false` (disabled), `true` (logarithmic scale) or `number` (manual log scale, negative for exponential scale)
  - visualizer: added `framerate` property
  - visualizer: added `freeze` property
  - menu: always centered menu
  - modal: modals can't overflow parent tab boundaries
  - input: removed `vertical`
  - pads, range: when `touchAddress` is set, one message per touched point is sent, in addition to the former touch state message
  - eq: removed `logScaleX` property, always draw logarithmic frequency response
  - eq: logarithmic x-axis scale fixed
  - eq: filters ared now defined with the `filters` property, leaving the `value` to its default purpose
  - eq: added `rangeX`
  - html: allow `class`, `title` and `style` attributes
  - dropdown: close menu when receiving a value
  - dropdown: removed empty 1st option
  - switch: removed `showValues` (inconsistent with menu/dropdown, feature covered by `values` property)
  - frame: allow loading non local urls

- widget removals
  - `push`, `toggle`: merged into `button`
  - `strip`: features now covered by `panel`
  - `meter`: duplicate of `fader` with `design` to `compact` and `interaction` to `false`
  - `switcher`, `state`, `crossfader`: removed => state managment functions added to the `script` widget
  - `keys`: merged with `script`
  - `gyroscope`: not compatible since chrome 74 unless o-s-c goes HTTPS


- remote control
  - removed /TABS
  - added /NOTIFY

- scripting (general)
  - removed MathJS language
  - reuse #{} syntax as as shorthand for JS{{}} (one liner, implicit return)
  - added `locals` variable, a variable store scoped to the widget
  - renamed `global` to `globals`
  - expose environment variables in `globals`: `url`, `env` (query parameters), `platform`, `screen` (width/height)

- script widget
  - always hidden except in project tree
  - `script` property must not be wrapped in a JS{{}} block anymore
  - added `stateGet` and `stateSet` functions
  - added `storage` object, proxy to the document's localStorage object (allows storing data that persist after refresh/close (cleared with the browser's cache)
  - added `setTimeout`, `clearTimeout`, `setInterval`, `clearInterval` function proxies with an extra `id` argument (they clear automatically when called multiple times and upon widget removal. `id` is scoped to the widget)


- state
  - quickstate (store/recall from menu) is now stored in the clients cache and persists after refresh/close (cleared with the browser's cache)

- custom module
  - `settings.read(name)`: `name` is now the long name of command-line options (not a camelCased one)
  - `receive()`: optional last argument to pass extra options such as `clientId`
  - client id persist upon page refresh and can be set manually with the client url option `id`


- launcher
  - config save/load
  - allow starting/stopping server without rebooting
  - syntax check on `--midi` option

- server
  - renamed `--url-options` to `--client-options` and make them apply even in remote browsers (can be overridden with url queries)
  - removed `--blank`, `--gui-only`, `--examples`
  - hide `--disable-gpu` (cli-only)
  - added cli-only `--cache-dir` and `--config-file`
  - added `--authentication` option
  - added `--use-ssl` option


- misc
  - canvas: better visibility checks to avoid unnecessary draw calls
  - visualizer: perf improvement (avoid data processing when not visible), all visualizers hook on the same loop to avoid concurrent timeouts
  - button: in 'tap' mode (formerly push with `noRelease`), never send/sync `off` value, automatically reset to `off` when receiving `on`
  - more detached DOM for lighter nested canvas widgets (ie multixy)
  - unified (kind of) dom html structure for widgets, known css tricks will require adjustments.
  - cache and config files are now stored in a folder named `open-stage-control` (located in the system's default location for config file). The `.open-stage-control` is no longer used.
  - added support for icons rotate/flip transform suffixes (example: `^cog.spin`, `^play.rotate-horizontal`)
