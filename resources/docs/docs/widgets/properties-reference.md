<!-- This file is generated automatically from the widget class declarations. See scripts/build-widget-reference.js -->

## Common

??? api "<div id="generic_properties">Generic properties<a class="headerlink" href="#generic_properties" title="Permanent link">#</a></div>"
    Properties shared by all widgets

    


    === "widget"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="type">type<a class="headerlink" href="#type" title="Permanent link">#</a></h6> | `string` | <code>"auto"</code> | Widget type |
        | <h6 id="id">id<a class="headerlink" href="#id" title="Permanent link">#</a></h6> | `string` | <code>"auto"</code> | Widgets sharing the same `id` will act as clones and update each other's value(s) without sending extra osc messages. |
        | <h6 id="visible">visible<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#visible" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | Set to `false` to hide the widget. |
        | <h6 id="interaction">interaction<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#interaction" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | Set to `false` to disable pointer interactions. |


    === "geometry"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="left">left<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#left" title="Permanent link">#</a></h6> | `number`&vert;<br/>`string` | <code>"auto"</code> | When both top and left are set to auto, the widget is positioned according to the normal flow of the page (from left to right, by order of creation).<br/><br/>Otherwise, the widget will be absolutely positioned |
        | <h6 id="top">top<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#top" title="Permanent link">#</a></h6> | `number`&vert;<br/>`percentage` | <code>"auto"</code> | When both top and left are set to auto, the widget is positioned according to the normal flow of the page (from left to right, by order of creation).<br/><br/>Otherwise, the widget will be absolutely positioned |
        | <h6 id="width">width<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#width" title="Permanent link">#</a></h6> | `number`&vert;<br/>`percentage` | <code>"auto"</code> | Widget width |
        | <h6 id="height">height<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#height" title="Permanent link">#</a></h6> | `number`&vert;<br/>`percentage` | <code>"auto"</code> | Widget height |
        | <h6 id="expand">expand<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#expand" title="Permanent link">#</a></h6> | `boolean`&vert;<br/>`number` | <code>"false"</code> | If parent's layout is `vertical` or `horizontal`, set this to `true` to stretch the widget to use available space automatically. |


    === "style"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="colorBg">colorBg<a class="headerlink" href="#colorBg" title="Permanent link">#</a></h6> | `string` | <code>"auto"</code> | Panel background color. Set to "auto" to inherit from parent widget. |
        | <h6 id="colorText">colorText<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#colorText" title="Permanent link">#</a></h6> | `string` | <code>"auto"</code> | Text color. Set to "auto" to inherit from parent widget. |
        | <h6 id="colorWidget">colorWidget<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#colorWidget" title="Permanent link">#</a></h6> | `string` | <code>"auto"</code> | Widget's default accent color. Set to "auto" to inherit from parent widget. |
        | <h6 id="colorStroke">colorStroke<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#colorStroke" title="Permanent link">#</a></h6> | `string` | <code>"auto"</code> | Stroke color. Set to "auto" to use `colorWidget`. |
        | <h6 id="colorFill">colorFill<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#colorFill" title="Permanent link">#</a></h6> | `string` | <code>"auto"</code> | Fill color. Set to "auto" to use `colorWidget`. |
        | <h6 id="alphaStroke">alphaStroke<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#alphaStroke" title="Permanent link">#</a></h6> | `number` | <code>"auto"</code> | Stroke color opacity. |
        | <h6 id="alphaFillOff">alphaFillOff<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#alphaFillOff" title="Permanent link">#</a></h6> | `number` | <code>"auto"</code> | Fill color opacity (off). |
        | <h6 id="alphaFillOn">alphaFillOn<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#alphaFillOn" title="Permanent link">#</a></h6> | `number` | <code>"auto"</code> | Fill color opacity (on). |
        | <h6 id="lineWidth">lineWidth<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#lineWidth" title="Permanent link">#</a></h6> | `number` | <code>"auto"</code> | Stroke width. |
        | <h6 id="padding">padding<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#padding" title="Permanent link">#</a></h6> | `number` | <code>"auto"</code> | Inner spacing. |
        | <h6 id="css">css<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#css" title="Permanent link">#</a></h6> | `string` | <code>""</code> | CSS rules. See <a href="https://openstagecontrol.ammd.net/docs/customization/css-tips/">documentation</a>.<br/><br/>Available css variables:<br/>- `--color-background`: `colorBg`<br/>- `--color-widget`: `colorWidget`<br/>- `--color-fill`: `colorFill`<br/>- `--color-stroke`: `colorStroke`<br/>- `--color-text`: `colorText`<br/>- `--widget-padding`: `padding`<br/>- `--line-width`: `lineWidth`<br/>- `--alpha-fill-on`: `alphaFillOn`<br/>- `--alpha-fill-off`: `alphaFillOff`<br/>- `--alpha-stroke`: `alphaStroke` |


    === "value"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="value">value<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#value" title="Permanent link">#</a></h6> | `*` | <code>""</code> | Define the widget's value depending on other widget's values / properties using the advanced property syntax |
        | <h6 id="default">default<a class="headerlink" href="#default" title="Permanent link">#</a></h6> | `*` | <code>""</code> | If set, the widget will be initialized with this value when the session is loaded. |
        | <h6 id="linkId">linkId<a class="headerlink" href="#linkId" title="Permanent link">#</a></h6> | `string`&vert;<br/>`array` | <code>""</code> | Widgets sharing the same `linkId` update each other's value(s) AND send their respective osc messages.<br/><br/>When prefixed with >>, the `linkId` will make the widget act as a master (sending but not receiving)<br/><br/>When prefixed with <<, the `linkId` will make the widget act as a slave (receiving but not sending) |
        | <h6 id="script">script<a class="headerlink" href="#script" title="Permanent link">#</a></h6> | `script` | <code>""</code> | Script executed whenever the widget's value updates. See <a href="https://openstagecontrol.ammd.net/docs/widgets/scripting/">documentation</a>. |


    === "osc"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="address">address<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#address" title="Permanent link">#</a></h6> | `string` | <code>"auto"</code> | OSC address for sending / receiving messages, it must start with a slash (`/`)<br/><br/>By default ("auto"), the widget's id is used: `/widget_id` |
        | <h6 id="preArgs">preArgs<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#preArgs" title="Permanent link">#</a></h6> | `*`&vert;<br/>`array` | <code>""</code> | A value or array of values that will be prepended to the OSC messages. |
        | <h6 id="typeTags">typeTags<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#typeTags" title="Permanent link">#</a></h6> | `string` | <code>""</code> | Defines the osc argument types, one letter per argument (including preArgs)<br/>- If empty, the types are infered automatically from the values (with numbers casted to floats by default)<br/>- If there are more arguments than type letters, the last type is used for the extra arguments<br/><br/>See http://opensoundcontrol.org/spec-1_0 for existing typetags |
        | <h6 id="decimals">decimals<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#decimals" title="Permanent link">#</a></h6> | `integer` | <code>2</code> | Defines the number of decimals to send. |
        | <h6 id="target">target<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#target" title="Permanent link">#</a></h6> | `string`&vert;<br/>`array`&vert;<br/>`null` | <code>""</code> | This defines the targets of the widget's OSC messages<br/>- A `string` or `array` of strings formatted as follow: `ip:port` or `["ip:port"]`<br/>- If midi is enabled, targets can be `midi:device_name`<br/>- If no target is set, messages can still be sent if the server has default targets |
        | <h6 id="ignoreDefaults">ignoreDefaults<a class="headerlink" href="#ignoreDefaults" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to ignore the server's default targets |
        | <h6 id="bypass">bypass<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#bypass" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to prevent the widget from sending any osc message |
## Basics

??? api "<div id="button">button<a class="headerlink" href="#button" title="Permanent link">#</a></div>"
    On / off button.

    === "style"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="button_css">css<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#button_css" title="Permanent link">#</a></h6> | `string` | <code>""</code> | CSS rules. See <a href="https://openstagecontrol.ammd.net/docs/customization/css-tips/">documentation</a>.<br/><br/>Available css variables:<br/>- `--color-background`: `colorBg`<br/>- `--color-widget`: `colorWidget`<br/>- `--color-fill`: `colorFill`<br/>- `--color-stroke`: `colorStroke`<br/>- `--color-text`: `colorText`<br/>- `--widget-padding`: `padding`<br/>- `--line-width`: `lineWidth`<br/>- `--alpha-fill-on`: `alphaFillOn`<br/>- `--alpha-fill-off`: `alphaFillOff`<br/>- `--alpha-stroke`: `alphaStroke`<br/>- `--color-text-on`: `colorTextOn` |

    === "button"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="button_label">label<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#button_label" title="Permanent link">#</a></h6> | `string`&vert;<br/>`boolean` | <code>"auto"</code> | Set to `false` to hide completely<br/>- Insert icons using the prefix ^ followed by the icon's name : `^play`, `^pause`, etc (see https://fontawesome.com/icons?d=gallery&s=solid&m=free)<br/>- Icons can be transformed with the following suffixes: `.flip-[horizontal|vertical|both]`, `.rotate-[90|180|270]`, `.spin`, `.pulse`. Example: `^play.flip-horizontal` |
        | <h6 id="button_on">on<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#button_on" title="Permanent link">#</a></h6> | `*` | <code>1</code> | Set to `null` to send send no argument in the osc message |
        | <h6 id="button_off">off<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#button_off" title="Permanent link">#</a></h6> | `*` | <code>0</code> | Set to `null` to send send no argument in the osc message. Must be different from `on`. |
        | <h6 id="button_mode">mode<a class="headerlink" href="#button_mode" title="Permanent link">#</a></h6> | `string` | <code>"toggle"</code> | Interraction mode:<br/>- `toggle` (classic on/off switch)<br/>- `push` (press & release)<br/>- `tap` (no release)<br/><br/>Choices: `toggle`, `push`, `tap` |
        | <h6 id="button_doubleTap">doubleTap<a class="headerlink" href="#button_doubleTap" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to make the button require a double tap to be pushed instead of a single tap |
        | <h6 id="button_colorTextOn">colorTextOn<a class="headerlink" href="#button_colorTextOn" title="Permanent link">#</a></h6> | `string` | <code>"auto"</code> | Defines the widget's text color when active. |

??? api "<div id="switch">switch<a class="headerlink" href="#switch" title="Permanent link">#</a></div>"
    Value selector button.

    === "style"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="switch_css">css<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#switch_css" title="Permanent link">#</a></h6> | `string` | <code>""</code> | CSS rules. See <a href="https://openstagecontrol.ammd.net/docs/customization/css-tips/">documentation</a>.<br/><br/>Available css variables:<br/>- `--color-background`: `colorBg`<br/>- `--color-widget`: `colorWidget`<br/>- `--color-fill`: `colorFill`<br/>- `--color-stroke`: `colorStroke`<br/>- `--color-text`: `colorText`<br/>- `--widget-padding`: `padding`<br/>- `--line-width`: `lineWidth`<br/>- `--alpha-fill-on`: `alphaFillOn`<br/>- `--alpha-fill-off`: `alphaFillOff`<br/>- `--alpha-stroke`: `alphaStroke`<br/>- `--color-text-on`: `colorTextOn` |

    === "switch"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="switch_layout">layout<a class="headerlink" href="#switch_layout" title="Permanent link">#</a></h6> | `string` | <code>"vertical"</code> | Choices: `vertical`, `horizontal`, `grid` |
        | <h6 id="switch_gridTemplate">gridTemplate<a class="headerlink" href="#switch_gridTemplate" title="Permanent link">#</a></h6> | `string`&vert;<br/>`number` | <code>""</code> | If `layout` is `grid`, can be either a number of columns of a value css grid-template definition. |
        | <h6 id="switch_values">values<a class="headerlink" href="#switch_values" title="Permanent link">#</a></h6> | `array`&vert;<br/>`object` | <code>\{<br/>&nbsp;"Value 1": 1,<br/>&nbsp;"Value 2": 2<br/>}</code> | `Array` of possible values to switch between : `[1,2,3]`<br/><br/>`Object` of `"label":value` pairs. Numeric labels must be prepended or appended with a white space (or any other non-numeric character) otherwise the order of the values won't be kept |
        | <h6 id="switch_mode">mode<a class="headerlink" href="#switch_mode" title="Permanent link">#</a></h6> | `string` | <code>"tap"</code> | Interraction mode:<br/>- `tap`: activates when the pointer is down but prevents further scrolling<br/>- `slide`: same as `tap` but allows sliding between values<br/>- `click`: activates upon click only and allows further scrolling<br/><br/>Choices: `tap`, `slide`, `click` |
        | <h6 id="switch_colorTextOn">colorTextOn<a class="headerlink" href="#switch_colorTextOn" title="Permanent link">#</a></h6> | `string` | <code>"auto"</code> | Defines the widget's text color when active. |

??? api "<div id="dropdown">dropdown<a class="headerlink" href="#dropdown" title="Permanent link">#</a></div>"
    Native dropdown menu.

    === "dropdown"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="dropdown_align">align<a class="headerlink" href="#dropdown_align" title="Permanent link">#</a></h6> | `string` | <code>"center"</code> | Set to `left` or `right` to change text alignment (otherwise center)<br/><br/>Choices: `center`, `left`, `right` |
        | <h6 id="dropdown_values">values<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#dropdown_values" title="Permanent link">#</a></h6> | `array`&vert;<br/>`object` | <code>\{<br/>&nbsp;"Value 1": 1,<br/>&nbsp;"Value 2": 2<br/>}</code> | `Array` of possible values to switch between : `[1,2,3]`<br/><br/>`Object` of label:value pairs. Numeric labels must be prepended or appended with a white space (or any other non-numeric character) otherwise the order of the values won't be kept |

??? api "<div id="menu">menu<a class="headerlink" href="#menu" title="Permanent link">#</a></div>"
    Drag and drop menu with a circular or grid layout.

    === "menu"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="menu_size">size<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#menu_size" title="Permanent link">#</a></h6> | `number`&vert;<br/>`array` | <code>200</code> | - If `layout` is `circular`: diameter (in px)<br/>- Else: square size or `[width, height]` array |
        | <h6 id="menu_textAlign">textAlign<a class="headerlink" href="#menu_textAlign" title="Permanent link">#</a></h6> | `string` | <code>"center"</code> | Set to `left` or `right` to change text alignment (otherwise center)<br/><br/>Choices: `center`, `left`, `right` |
        | <h6 id="menu_menuAlignV">menuAlignV<a class="headerlink" href="#menu_menuAlignV" title="Permanent link">#</a></h6> | `string` | <code>"center"</code> | Set to `top` or `bottom` to change menu alignment (otherwise center)<br/><br/>Choices: `center`, `top`, `bottom` |
        | <h6 id="menu_menuAlignH">menuAlignH<a class="headerlink" href="#menu_menuAlignH" title="Permanent link">#</a></h6> | `string` | <code>"center"</code> | Set to `left` or `right` to change menu alignment (otherwise center)<br/><br/>Choices: `center`, `left`, `right` |
        | <h6 id="menu_layout">layout<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#menu_layout" title="Permanent link">#</a></h6> | `string` | <code>"circular"</code> | Defines whether the menu's layout should be rendered in a circle or in a box<br/><br/>Choices: `circular`, `horizontal`, `vertical`, `grid` |
        | <h6 id="menu_gridTemplate">gridTemplate<a class="headerlink" href="#menu_gridTemplate" title="Permanent link">#</a></h6> | `string`&vert;<br/>`number` | <code>""</code> | If `layout` is `grid`, can be either a number of columns of a value css grid-template definition. |
        | <h6 id="menu_toggle">toggle<a class="headerlink" href="#menu_toggle" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to make the menu stay opened after mouse/touch release |
        | <h6 id="menu_doubleTap">doubleTap<a class="headerlink" href="#menu_doubleTap" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to make the menu require a double tap to be opened instead of a single tap |
        | <h6 id="menu_values">values<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#menu_values" title="Permanent link">#</a></h6> | `array`&vert;<br/>`object` | <code>[<br/>&nbsp;1,<br/>&nbsp;2,<br/>&nbsp;3<br/>]</code> | `Array` of possible values to switch between : `[1,2,3]`<br/><br/>`Object` of label:value pairs. Numeric labels must be prepended or appended with a white space (or any other non-numeric character) otherwise the order of the values won't be kept |
        | <h6 id="menu_weights">weights<a class="headerlink" href="#menu_weights" title="Permanent link">#</a></h6> | `array` | <code>""</code> | `Array` of `number` defining the weights of each value in `values`<br/><br/>Ignored when `mode` is `grid` |

??? api "<div id="input">input<a class="headerlink" href="#input" title="Permanent link">#</a></div>"
    Text input.

    === "input"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="input_align">align<a class="headerlink" href="#input_align" title="Permanent link">#</a></h6> | `string` | <code>"center"</code> | Set to `left` or `right` to change text alignment (otherwise center)<br/><br/>Choices: `center`, `left`, `right` |
        | <h6 id="input_unit">unit<a class="headerlink" href="#input_unit" title="Permanent link">#</a></h6> | `string` | <code>""</code> | Unit will be appended to the displayed widget's value (it doesn't affect osc messages) |
        | <h6 id="input_asYouType">asYouType<a class="headerlink" href="#input_asYouType" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to make the input send its value at each keystroke |

??? api "<div id="file">file<a class="headerlink" href="#file" title="Permanent link">#</a></div>"
    File/Folder selector (server-side).

    === "file"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="file_align">align<a class="headerlink" href="#file_align" title="Permanent link">#</a></h6> | `string` | <code>"center"</code> | Set to `left` or `right` to change text alignment (otherwise center)<br/><br/>Choices: `center`, `left`, `right` |
        | <h6 id="file_directory">directory<a class="headerlink" href="#file_directory" title="Permanent link">#</a></h6> | `string` | <code>"auto"</code> | Default browsing directory |
        | <h6 id="file_extension">extension<a class="headerlink" href="#file_extension" title="Permanent link">#</a></h6> | `string` | <code>"*"</code> | Only display files with this extension |
        | <h6 id="file_hidePath">hidePath<a class="headerlink" href="#file_hidePath" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to only display the filename (the whole path will still be used as value) |
        | <h6 id="file_allowDir">allowDir<a class="headerlink" href="#file_allowDir" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Allow selecting a folder (by pressing "open" when no file is selected) |
## Containers

??? api "<div id="panel">panel<a class="headerlink" href="#panel" title="Permanent link">#</a></div>"
    Widgets or Tabs container.

    === "panel"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="panel_variables">variables<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#panel_variables" title="Permanent link">#</a></h6> | `*` | <code>"@\{parent.variables}"</code> | Defines one or more arbitrary variables that can be inherited by children widgets |
        | <h6 id="panel_traversing">traversing<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#panel_traversing" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to enable traversing gestures in this widget. Set to `smart` or `auto` to limit affected widgets by the type of the first touched widget |

    === "widget container"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="panel_layout">layout<a class="headerlink" href="#panel_layout" title="Permanent link">#</a></h6> | `string` | <code>"default"</code> | Defines how children are laid out.<br/><br/>Choices: `default`, `vertical`, `horizontal`, `grid` |
        | <h6 id="panel_justify">justify<a class="headerlink" href="#panel_justify" title="Permanent link">#</a></h6> | `string` | <code>"start"</code> | If `layout` is `vertical` or `horizontal`, defines how widgets should be justified.<br/><br/>Choices: `start`, `end`, `center`, `space-around`, `space-between` |
        | <h6 id="panel_gridTemplate">gridTemplate<a class="headerlink" href="#panel_gridTemplate" title="Permanent link">#</a></h6> | `string`&vert;<br/>`number` | <code>""</code> | If `layout` is `grid`, can be either a number of columns of a value css grid-template definition. |
        | <h6 id="panel_contain">contain<a class="headerlink" href="#panel_contain" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | If `layout` is `vertical` or `horizontal`, prevents children from overflowing the panel. |
        | <h6 id="panel_scroll">scroll<a class="headerlink" href="#panel_scroll" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | Set to `false` to disable scrollbars |
        | <h6 id="panel_innerPadding">innerPadding<a class="headerlink" href="#panel_innerPadding" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | Set to `false` to make the `padding` property apply only between children and not at the container's inner boundaries. |

    === "tab container"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="panel_verticalTabs">verticalTabs<a class="headerlink" href="#panel_verticalTabs" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to display for vertical tab layout |

    === "value"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="panel_value">value<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#panel_value" title="Permanent link">#</a></h6> | `integer` | <code>""</code> | Defines currently selected tab in the widget<br/><br/>A tab can be opened only by setting its parent's value |

    === "children"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="panel_widgets">widgets<a class="headerlink" href="#panel_widgets" title="Permanent link">#</a></h6> | `array` | <code>[]</code> | Each element of the array must be a widget object. A panel cannot contain widgets and tabs simultaneously. |
        | <h6 id="panel_tabs">tabs<a class="headerlink" href="#panel_tabs" title="Permanent link">#</a></h6> | `array` | <code>[]</code> | Each element of the array must be a tab object. A panel cannot contain widgets and tabs simultaneously |

??? api "<div id="modal">modal<a class="headerlink" href="#modal" title="Permanent link">#</a></div>"
    A toggle button that opens a popup panel. Cannot contain tabs directly.

    === "modal"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="modal_label">label<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#modal_label" title="Permanent link">#</a></h6> | `string`&vert;<br/>`boolean` | <code>"auto"</code> | Set to `false` to hide completely<br/>- Insert icons using the prefix ^ followed by the icon's name : `^play`, `^pause`, etc (see https://fontawesome.com/icons?d=gallery&s=solid&m=free)<br/>- Icons can be transformed with the following suffixes: `.flip-[horizontal|vertical|both]`, `.rotate-[90|180|270]`, `.spin`, `.pulse`. Example: `^play.flip-horizontal` |
        | <h6 id="modal_doubleTap">doubleTap<a class="headerlink" href="#modal_doubleTap" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to make the modal require a double tap to open instead of a single tap |
        | <h6 id="modal_variables">variables<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#modal_variables" title="Permanent link">#</a></h6> | `*` | <code>"@\{parent.variables}"</code> | Defines one or more arbitrary variables that can be inherited by children widgets |
        | <h6 id="modal_traversing">traversing<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#modal_traversing" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to enable traversing gestures in this widget. Set to `smart` or `auto` to limit affected widgets by the type of the first touched widget |

    === "popup"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="modal_popupLabel">popupLabel<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#modal_popupLabel" title="Permanent link">#</a></h6> | `string`&vert;<br/>`boolean` | <code>"auto"</code> | Alternative label for the modal popup |
        | <h6 id="modal_popupWidth">popupWidth<a class="headerlink" href="#modal_popupWidth" title="Permanent link">#</a></h6> | `number`&vert;<br/>`percentage` | <code>"80%"</code> | Modal popup's size |
        | <h6 id="modal_popupHeight">popupHeight<a class="headerlink" href="#modal_popupHeight" title="Permanent link">#</a></h6> | `number`&vert;<br/>`percentage` | <code>"80%"</code> | Modal popup's size |
        | <h6 id="modal_popupLeft">popupLeft<a class="headerlink" href="#modal_popupLeft" title="Permanent link">#</a></h6> | `number`&vert;<br/>`percentage` | <code>"auto"</code> | Modal popup's position |
        | <h6 id="modal_popupTop">popupTop<a class="headerlink" href="#modal_popupTop" title="Permanent link">#</a></h6> | `number`&vert;<br/>`percentage` | <code>"auto"</code> | Modal popup's position |

    === "widget container"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="modal_layout">layout<a class="headerlink" href="#modal_layout" title="Permanent link">#</a></h6> | `string` | <code>"default"</code> | Defines how children are laid out.<br/><br/>Choices: `default`, `vertical`, `horizontal`, `grid` |
        | <h6 id="modal_gridTemplate">gridTemplate<a class="headerlink" href="#modal_gridTemplate" title="Permanent link">#</a></h6> | `string`&vert;<br/>`number` | <code>""</code> | If `layout` is `grid`, can be either a number of columns of a value css grid-template definition. |
        | <h6 id="modal_contain">contain<a class="headerlink" href="#modal_contain" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | If `layout` is `vertical` or `horizontal`, prevents children from overflowing the panel. |
        | <h6 id="modal_scroll">scroll<a class="headerlink" href="#modal_scroll" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | Set to `false` to disable scrollbars |
        | <h6 id="modal_innerPadding">innerPadding<a class="headerlink" href="#modal_innerPadding" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | Set to `false` to make the `padding` property apply only between children and not at the container's inner boundaries. |

    === "value"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="modal_value">value<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#modal_value" title="Permanent link">#</a></h6> | `integer` | <code>""</code> | Defines the modal's state:`0` for closed, `1` for opened |

    === "children"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="modal_widgets">widgets<a class="headerlink" href="#modal_widgets" title="Permanent link">#</a></h6> | `array` | <code>[]</code> | Each element of the array must be a widget object |

??? api "<div id="clone">clone<a class="headerlink" href="#clone" title="Permanent link">#</a></div>"
    Widget replication with overridable properties.

    === "clone"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="clone_widgetId">widgetId<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#clone_widgetId" title="Permanent link">#</a></h6> | `string` | <code>""</code> | `id` of the widget to clone |
        | <h6 id="clone_props">props<a class="headerlink" href="#clone_props" title="Permanent link">#</a></h6> | `object` | <code>\{}</code> | Cloned widget's properties to override |

??? api "<div id="matrix">matrix<a class="headerlink" href="#matrix" title="Permanent link">#</a></div>"
    Generic matrix for creating rows/columns of widgets.

    === "matrix"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="matrix_widgetType">widgetType<a class="headerlink" href="#matrix_widgetType" title="Permanent link">#</a></h6> | `string` | <code>"button"</code> | Defines the type of the widgets in the matrix |
        | <h6 id="matrix_quantity">quantity<a class="headerlink" href="#matrix_quantity" title="Permanent link">#</a></h6> | `number` | <code>4</code> | Defines the number of widgets in the matrix |
        | <h6 id="matrix_start">start<a class="headerlink" href="#matrix_start" title="Permanent link">#</a></h6> | `integer` | <code>0</code> | First widget's index |
        | <h6 id="matrix_props">props<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#matrix_props" title="Permanent link">#</a></h6> | `object` | <code>\{}</code> | Defines a set of property to override the widgets' defaults.<br/><br/>Formulas in this field are resolved with an extra variable representing each widget's index: `$`<br/><br/>Note: by default, the widgets inherit from the matrix' `id` and osc properties (`id` and `address` are appended with `/$`) |

    === "layout"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="matrix_layout">layout<a class="headerlink" href="#matrix_layout" title="Permanent link">#</a></h6> | `string` | <code>"horizontal"</code> | Defines how children are laid out.<br/><br/>Choices: `horizontal`, `vertical`, `grid` |
        | <h6 id="matrix_gridTemplate">gridTemplate<a class="headerlink" href="#matrix_gridTemplate" title="Permanent link">#</a></h6> | `string`&vert;<br/>`number` | <code>""</code> | If `layout` is `grid`, can be either a number of columns of a value css grid-template definition. |
        | <h6 id="matrix_traversing">traversing<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#matrix_traversing" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | Set to `false` to disable traversing gestures |
        | <h6 id="matrix_innerPadding">innerPadding<a class="headerlink" href="#matrix_innerPadding" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | Set to `false` to make the `padding` property apply only between children and not at the container's inner boundaries. |

??? api "<div id="keyboard">keyboard<a class="headerlink" href="#keyboard" title="Permanent link">#</a></div>"
    Piano keyboard.

    === "style"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="keyboard_css">css<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#keyboard_css" title="Permanent link">#</a></h6> | `string` | <code>""</code> | Available CSS variables:<br/>- `--color-white:color;` (white keys color)<br/>- `--color-black:color;` (black keys color) |

    === "keyboard"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="keyboard_keys">keys<a class="headerlink" href="#keyboard_keys" title="Permanent link">#</a></h6> | `number` | <code>25</code> | Defines the number keys |
        | <h6 id="keyboard_start">start<a class="headerlink" href="#keyboard_start" title="Permanent link">#</a></h6> | `number` | <code>48</code> | MIDI note number to start with (default is C4)<br/><br/>Standard keyboards settings are: `[25, 48]`, `[49, 36]`, `[61, 36]`, `[88, 21]` |
        | <h6 id="keyboard_traversing">traversing<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#keyboard_traversing" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | Set to `false` to disable traversing gestures |
        | <h6 id="keyboard_on">on<a class="headerlink" href="#keyboard_on" title="Permanent link">#</a></h6> | `*` | <code>1</code> | Set to `null` to send send no argument in the osc message<br/><br/>Can be an `object` if the type needs to be specified (see preArgs) |
        | <h6 id="keyboard_off">off<a class="headerlink" href="#keyboard_off" title="Permanent link">#</a></h6> | `*` | <code>0</code> | Set to `null` to send send no argument in the osc message<br/><br/>Can be an `object` if the type needs to be specified (see preArgs) |
        | <h6 id="keyboard_mode">mode<a class="headerlink" href="#keyboard_mode" title="Permanent link">#</a></h6> | `string` | <code>"push"</code> | Interraction mode:<br/>- `push` (press & release)<br/>- `toggle` (on/off switches)<br/>- `tap` (no release)<br/><br/>Choices: `push`, `toggle`, `tap` |

??? api "<div id="patchbay">patchbay<a class="headerlink" href="#patchbay" title="Permanent link">#</a></div>"
    Connect inputs to outputs.

    === "style"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="patchbay_css">css<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#patchbay_css" title="Permanent link">#</a></h6> | `string` | <code>""</code> | The inputs/ouputs width can be adjusted by using the  `.nodes` selector:<br/><br/>`.nodes { width: 25% }` |

    === "patchbay"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="patchbay_inputs">inputs<a class="headerlink" href="#patchbay_inputs" title="Permanent link">#</a></h6> | `array`&vert;<br/>`object` | <code>[<br/>&nbsp;"input_1",<br/>&nbsp;"input_2"<br/>]</code> | - `Array` of input names : `['input_1', 'input_2']`<br/>- `Object` of `"label_1": "input_1"` pairs. Numeric labels must be prepended or appended with a white space (or any other non-numeric character) otherwise the order of the values won't be kept<br/><br/><br/><br/>Patchbay inputs can be connected to one or more outputs and will send messages of the following form when they are connected/disconnected: <br/><br/>`/patchbay_address input_x output_x output_y etc`<br/><br/>If no output is connected to the input, the message will be `/patchbay_address input_x`<br/><br/>The inputs values can be consumed with the property inheritance syntax: `@{patchbay_id/input_1}` returns an array of output names connected to `input_1` |
        | <h6 id="patchbay_outputs">outputs<a class="headerlink" href="#patchbay_outputs" title="Permanent link">#</a></h6> | `array`&vert;<br/>`object` | <code>[<br/>&nbsp;"output_1",<br/>&nbsp;"output_2"<br/>]</code> | List of output values the inputs can connect to (see `inputs`). |

??? api "<div id="root">root<a class="headerlink" href="#root" title="Permanent link">#</a></div>"
    Main (unique) container

    === "panel"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="root_variables">variables<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#root_variables" title="Permanent link">#</a></h6> | `*` | <code>"@\{parent.variables}"</code> | Defines one or more arbitrary variables that can be inherited by children widgets |
        | <h6 id="root_traversing">traversing<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#root_traversing" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to enable traversing gestures in this widget. Set to `smart` or `auto` to limit affected widgets by the type of the first touched widget |

    === "widget container"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="root_layout">layout<a class="headerlink" href="#root_layout" title="Permanent link">#</a></h6> | `string` | <code>"default"</code> | Defines how children are laid out.<br/><br/>Choices: `default`, `vertical`, `horizontal`, `grid` |
        | <h6 id="root_justify">justify<a class="headerlink" href="#root_justify" title="Permanent link">#</a></h6> | `string` | <code>"start"</code> | If `layout` is `vertical` or `horizontal`, defines how widgets should be justified.<br/><br/>Choices: `start`, `end`, `center`, `space-around`, `space-between` |
        | <h6 id="root_gridTemplate">gridTemplate<a class="headerlink" href="#root_gridTemplate" title="Permanent link">#</a></h6> | `string`&vert;<br/>`number` | <code>""</code> | If `layout` is `grid`, can be either a number of columns of a value css grid-template definition. |
        | <h6 id="root_contain">contain<a class="headerlink" href="#root_contain" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | If `layout` is `vertical` or `horizontal`, prevents children from overflowing the panel. |
        | <h6 id="root_scroll">scroll<a class="headerlink" href="#root_scroll" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | Set to `false` to disable scrollbars |
        | <h6 id="root_innerPadding">innerPadding<a class="headerlink" href="#root_innerPadding" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | Set to `false` to make the `padding` property apply only between children and not at the container's inner boundaries. |

    === "tab container"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="root_verticalTabs">verticalTabs<a class="headerlink" href="#root_verticalTabs" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to display for vertical tab layout |

    === "value"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="root_value">value<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#root_value" title="Permanent link">#</a></h6> | `integer` | <code>""</code> | Defines currently widgeted tab in the widget<br/><br/>A tab can be opened only by setting its parent's value |

    === "children"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="root_widgets">widgets<a class="headerlink" href="#root_widgets" title="Permanent link">#</a></h6> | `array` | <code>[]</code> | Each element of the array must be a widget object. A panel cannot contain widgets and tabs simultaneously. |
        | <h6 id="root_tabs">tabs<a class="headerlink" href="#root_tabs" title="Permanent link">#</a></h6> | `array` | <code>[]</code> | Each element of the array must be a tab object. A panel cannot contain widgets and tabs simultaneously |

??? api "<div id="tab">tab<a class="headerlink" href="#tab" title="Permanent link">#</a></div>"
    Tabbed panel widget

    === "panel"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="tab_label">label<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#tab_label" title="Permanent link">#</a></h6> | `string`&vert;<br/>`boolean` | <code>"auto"</code> | Set to `false` to hide completely<br/>- Insert icons using the prefix ^ followed by the icon's name : `^play`, `^pause`, etc (see https://fontawesome.com/icons?d=gallery&s=solid&m=free)<br/>- Icons can be transformed with the following suffixes: `.flip-[horizontal|vertical|both]`, `.rotate-[90|180|270]`, `.spin`, `.pulse`. Example: `^play.flip-horizontal` |
        | <h6 id="tab_variables">variables<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#tab_variables" title="Permanent link">#</a></h6> | `*` | <code>"@\{parent.variables}"</code> | Defines one or more arbitrary variables that can be inherited by children widgets |
        | <h6 id="tab_traversing">traversing<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#tab_traversing" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to enable traversing gestures in this widget. Set to `smart` or `auto` to limit affected widgets by the type of the first touched widget |

    === "widget container"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="tab_layout">layout<a class="headerlink" href="#tab_layout" title="Permanent link">#</a></h6> | `string` | <code>"default"</code> | Defines how children are laid out.<br/><br/>Choices: `default`, `vertical`, `horizontal`, `grid` |
        | <h6 id="tab_justify">justify<a class="headerlink" href="#tab_justify" title="Permanent link">#</a></h6> | `string` | <code>"start"</code> | If `layout` is `vertical` or `horizontal`, defines how widgets should be justified.<br/><br/>Choices: `start`, `end`, `center`, `space-around`, `space-between` |
        | <h6 id="tab_gridTemplate">gridTemplate<a class="headerlink" href="#tab_gridTemplate" title="Permanent link">#</a></h6> | `string`&vert;<br/>`number` | <code>""</code> | If `layout` is `grid`, can be either a number of columns of a value css grid-template definition. |
        | <h6 id="tab_contain">contain<a class="headerlink" href="#tab_contain" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | If `layout` is `vertical` or `horizontal`, prevents children from overflowing the panel. |
        | <h6 id="tab_scroll">scroll<a class="headerlink" href="#tab_scroll" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | Set to `false` to disable scrollbars |
        | <h6 id="tab_innerPadding">innerPadding<a class="headerlink" href="#tab_innerPadding" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | Set to `false` to make the `padding` property apply only between children and not at the container's inner boundaries. |

    === "tab container"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="tab_verticalTabs">verticalTabs<a class="headerlink" href="#tab_verticalTabs" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to display for vertical tab layout |

    === "value"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="tab_value">value<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#tab_value" title="Permanent link">#</a></h6> | `integer` | <code>""</code> | Defines currently widgeted tab in the widget<br/><br/>A tab can be opened only by setting its parent's value |

    === "children"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="tab_widgets">widgets<a class="headerlink" href="#tab_widgets" title="Permanent link">#</a></h6> | `array` | <code>[]</code> | Each element of the array must be a widget object. A panel cannot contain widgets and tabs simultaneously. |
        | <h6 id="tab_tabs">tabs<a class="headerlink" href="#tab_tabs" title="Permanent link">#</a></h6> | `array` | <code>[]</code> | Each element of the array must be a tab object. A panel cannot contain widgets and tabs simultaneously |
## Frames

??? api "<div id="frame">frame<a class="headerlink" href="#frame" title="Permanent link">#</a></div>"
    Embed a page in a frame (local network only).

    === "value"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="frame_value">value<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#frame_value" title="Permanent link">#</a></h6> | `string` | <code>""</code> | External web page URL. |

??? api "<div id="svg">svg<a class="headerlink" href="#svg" title="Permanent link">#</a></div>"
    Svg parser.

    === "svg"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="svg_svg">svg<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#svg_svg" title="Permanent link">#</a></h6> | `string` | <code>""</code> | Svg xml definition (will be wrapped in a `< svg />` element) |

??? api "<div id="html">html<a class="headerlink" href="#html" title="Permanent link">#</a></div>"
    Simple HTML parser.

    === "html"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="html_html">html<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#html_html" title="Permanent link">#</a></h6> | `string` | <code>""</code> | Allowed HTML tags:<br/><br/>&nbsp;&nbsp;h1-6, blockquote, p, a, ul, ol, nl, li,<br/><br/>&nbsp;&nbsp;b, i, strong, em, strike, code, hr, br, div,<br/><br/>&nbsp;&nbsp;table, thead, img, caption, tbody, tr, th, td, pre<br/><br/>Allowed attributes:<br/><br/>&nbsp;&nbsp;<*>: class, style, title<br/><br/>&nbsp;&nbsp;<img>: src, width, height |

??? api "<div id="image">image<a class="headerlink" href="#image" title="Permanent link">#</a></div>"
    Load a image (url or base64-encoded).

    === "image"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="image_size">size<a class="headerlink" href="#image_size" title="Permanent link">#</a></h6> | `string` | <code>"cover"</code> | CSS background-size |
        | <h6 id="image_position">position<a class="headerlink" href="#image_position" title="Permanent link">#</a></h6> | `string` | <code>"center"</code> | CSS background-position |
        | <h6 id="image_repeat">repeat<a class="headerlink" href="#image_repeat" title="Permanent link">#</a></h6> | `string` | <code>"no-repeat"</code> | CSS background-repeat |
        | <h6 id="image_cache">cache<a class="headerlink" href="#image_cache" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | Set to false to disable image caching (forces file reload when updating or editing the widget).<br/><br/>When true, sending `reload` to the widget reloads its image without changing its value |

    === "value"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="image_value">value<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#image_value" title="Permanent link">#</a></h6> | `string` | <code>""</code> | - File `url` or `path` (relative to the session file location by default, falling back to absolute path)<br/>- Base64 encoded image : `data:image/...` |
## Graphs

??? api "<div id="plot">plot<a class="headerlink" href="#plot" title="Permanent link">#</a></div>"
    XY coordinates plot.

    === "plot"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="plot_rangeX">rangeX<a class="headerlink" href="#plot_rangeX" title="Permanent link">#</a></h6> | `object` | <code>\{<br/>&nbsp;"min": 0,<br/>&nbsp;"max": 1<br/>}</code> | Defines the min and max values for the x axis |
        | <h6 id="plot_rangeY">rangeY<a class="headerlink" href="#plot_rangeY" title="Permanent link">#</a></h6> | `object` | <code>\{<br/>&nbsp;"min": 0,<br/>&nbsp;"max": 1<br/>}</code> | Defines the min and max values for the y axis |
        | <h6 id="plot_logScaleX">logScaleX<a class="headerlink" href="#plot_logScaleX" title="Permanent link">#</a></h6> | `boolean`&vert;<br/>`number` | <code>false</code> | Set to `true` to use logarithmic scale for the x axis (base 10). Set to a `number` to define the logarithm's base. |
        | <h6 id="plot_logScaleY">logScaleY<a class="headerlink" href="#plot_logScaleY" title="Permanent link">#</a></h6> | `boolean`&vert;<br/>`number` | <code>false</code> | Set to `true` to use logarithmic scale for the y axis (base 10). Set to a `number` to define the logarithm's base. |
        | <h6 id="plot_origin">origin<a class="headerlink" href="#plot_origin" title="Permanent link">#</a></h6> | `number` | <code>"auto"</code> | Defines the y axis origin. Set to `false` to disable it. |
        | <h6 id="plot_dots">dots<a class="headerlink" href="#plot_dots" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Draw dots on the line |
        | <h6 id="plot_bars">bars<a class="headerlink" href="#plot_bars" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to use draw bars instead (disables `logScaleX` and forces `x axis` even spacing) |
        | <h6 id="plot_pips">pips<a class="headerlink" href="#plot_pips" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | Set to `false` to hide the scale |

    === "value"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="plot_value">value<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#plot_value" title="Permanent link">#</a></h6> | `array`&vert;<br/>`string` | <code>""</code> | - `Array` of `y` values<br/>- `Array` of `[x, y]` `array` values<br/>- `String` `array`<br/>- `String` `object` to update specific coordinates only: `{0:1, 4:0}` will change the 1st and 5th points' coordinates |

??? api "<div id="eq">eq<a class="headerlink" href="#eq" title="Permanent link">#</a></div>"
    Draws logarithmic frequency response from an array of filter objects.

    === "eq"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="eq_filters">filters<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#eq_filters" title="Permanent link">#</a></h6> | `array` | <code>""</code> | Each item must be an object with the following properties<br/>- `type`: string ("highpass", "highshelf", "lowpass", "lowshelf", "peak", "bandpass" or "notch", default: "peak")<br/>- `freq`: number (filter's resonant frequency, default: 1000)<br/>- `q`: number (Q factor, default: 1)<br/>- `gain`: number (default: 0)<br/>- `on`: boolean (default: true)<br/><br/>See https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode |
        | <h6 id="eq_pips">pips<a class="headerlink" href="#eq_pips" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | Set to false to hide the scale |
        | <h6 id="eq_rangeX">rangeX<a class="headerlink" href="#eq_rangeX" title="Permanent link">#</a></h6> | `object` | <code>\{<br/>&nbsp;"min": 20,<br/>&nbsp;"max": 22000<br/>}</code> | Defines the min and max values for the x axis (in Hz, logarithmic scale) |
        | <h6 id="eq_rangeY">rangeY<a class="headerlink" href="#eq_rangeY" title="Permanent link">#</a></h6> | `object` | <code>\{<br/>&nbsp;"min": -6,<br/>&nbsp;"max": 6<br/>}</code> | Defines the min and max values for the y axis (in dB) |
        | <h6 id="eq_origin">origin<a class="headerlink" href="#eq_origin" title="Permanent link">#</a></h6> | `number`&vert;<br/>`boolean` | <code>"auto"</code> | Defines the y axis origin. Set to `false` to disable it |

??? api "<div id="visualizer">visualizer<a class="headerlink" href="#visualizer" title="Permanent link">#</a></div>"
    Display its value over time.

    === "visualizer"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="visualizer_duration">duration<a class="headerlink" href="#visualizer_duration" title="Permanent link">#</a></h6> | `number` | <code>1</code> | Defines visualization duration in seconds |
        | <h6 id="visualizer_framerate">framerate<a class="headerlink" href="#visualizer_framerate" title="Permanent link">#</a></h6> | `number` | <code>30</code> | Defines visualization framerate |
        | <h6 id="visualizer_rangeY">rangeY<a class="headerlink" href="#visualizer_rangeY" title="Permanent link">#</a></h6> | `object` | <code>\{<br/>&nbsp;"min": 0,<br/>&nbsp;"max": 1<br/>}</code> | Defines the min and max values for the y axis |
        | <h6 id="visualizer_origin">origin<a class="headerlink" href="#visualizer_origin" title="Permanent link">#</a></h6> | `number` | <code>"auto"</code> | Defines the y axis origin. Set to `false` to disable it |
        | <h6 id="visualizer_logScaleY">logScaleY<a class="headerlink" href="#visualizer_logScaleY" title="Permanent link">#</a></h6> | `boolean`&vert;<br/>`number` | <code>false</code> | Set to `true` to use logarithmic scale for the y axis (base 10). Set to a `number` to define the logarithm's base. |
        | <h6 id="visualizer_pips">pips<a class="headerlink" href="#visualizer_pips" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | Set to `false` to hide the scale |
        | <h6 id="visualizer_freeze">freeze<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#visualizer_freeze" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to freeze current view and ignore incoming values |
## Indicators

??? api "<div id="led">led<a class="headerlink" href="#led" title="Permanent link">#</a></div>"
    Intensity display.

    === "led"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="led_mode">mode<a class="headerlink" href="#led_mode" title="Permanent link">#</a></h6> | `string` | <code>"intensity"</code> | Defines how value is interpreted (see `value`)<br/><br/>Choices: `intensity`, `color` |
        | <h6 id="led_range">range<a class="headerlink" href="#led_range" title="Permanent link">#</a></h6> | `object` | <code>\{<br/>&nbsp;"min": 0,<br/>&nbsp;"max": 1<br/>}</code> | Value range |
        | <h6 id="led_alphaRange">alphaRange<a class="headerlink" href="#led_alphaRange" title="Permanent link">#</a></h6> | `object` | <code>\{<br/>&nbsp;"min": 0,<br/>&nbsp;"max": 1<br/>}</code> | Alpha range (if `mode` is `color`) |
        | <h6 id="led_logScale">logScale<a class="headerlink" href="#led_logScale" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | If `mode` is `intensity`, set to `true` to use logarithmic scale. |
        | <h6 id="led_borderRadius">borderRadius<a class="headerlink" href="#led_borderRadius" title="Permanent link">#</a></h6> | `string` | <code>""</code> | Css border-radius property. |

    === "value"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="led_value">value<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#led_value" title="Permanent link">#</a></h6> | `number`&vert;<br/>`array`&vert;<br/>`string` | <code>""</code> | If `mode` is `intensity`:<br/>- `Number`: `intensity` between `range.min` and `range.max`<br/><br/>If `mode` is `color`:<br/>- `Array`: `[r, g, b]` (`r`, `g` and `b` between `range.min` and `range.max`)<br/>- `Array`: `[r, g, b, alpha]` (`alpha` between `alphaRange.min` and `alphaRange.max`)<br/>- `String`: CSS color |

??? api "<div id="text">text<a class="headerlink" href="#text" title="Permanent link">#</a></div>"
    Display text.

    === "text"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="text_vertical">vertical<a class="headerlink" href="#text_vertical" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to display the text vertically |
        | <h6 id="text_wrap">wrap<a class="headerlink" href="#text_wrap" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to wrap long lines automatically.<br/><br/>This will not break overflowing words by default, word-breaking can be enabled by adding `word-break: break-all;` to the `css` property |
        | <h6 id="text_align">align<a class="headerlink" href="#text_align" title="Permanent link">#</a></h6> | `string` | <code>"center"</code> | Css text-align property.<br/><br/>Choices: `center`, `left`, `right` |
## Pads

??? api "<div id="xy">xy<a class="headerlink" href="#xy" title="Permanent link">#</a></div>"
    Two-dimensional slider.

    === "xy"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="xy_pointSize">pointSize<a class="headerlink" href="#xy_pointSize" title="Permanent link">#</a></h6> | `integer` | <code>20</code> | Defines the points' size |
        | <h6 id="xy_snap">snap<a class="headerlink" href="#xy_snap" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | By default, the points are dragged from their initial position.<br/><br/>If set to `true`, touching anywhere on the widget's surface will make them snap to the touching coordinates |
        | <h6 id="xy_spring">spring<a class="headerlink" href="#xy_spring" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | When set to `true`, the widget will go back to its default value when released |
        | <h6 id="xy_pips">pips<a class="headerlink" href="#xy_pips" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | Set to `false` to hide the scale |
        | <h6 id="xy_rangeX">rangeX<a class="headerlink" href="#xy_rangeX" title="Permanent link">#</a></h6> | `object` | <code>\{<br/>&nbsp;"min": 0,<br/>&nbsp;"max": 1<br/>}</code> | Defines the min and max values for the x axis |
        | <h6 id="xy_rangeY">rangeY<a class="headerlink" href="#xy_rangeY" title="Permanent link">#</a></h6> | `object` | <code>\{<br/>&nbsp;"min": 0,<br/>&nbsp;"max": 1<br/>}</code> | Defines the min and max values for the y axis |
        | <h6 id="xy_logScaleX">logScaleX<a class="headerlink" href="#xy_logScaleX" title="Permanent link">#</a></h6> | `boolean`&vert;<br/>`number` | <code>false</code> | Set to `true` to use logarithmic scale for the x axis. Set to `-1` for exponential scale. |
        | <h6 id="xy_logScaleY">logScaleY<a class="headerlink" href="#xy_logScaleY" title="Permanent link">#</a></h6> | `boolean`&vert;<br/>`number` | <code>false</code> | Set to `true` to use logarithmic scale for the y axis. Set to `-1` for exponential scale. |
        | <h6 id="xy_doubleTap">doubleTap<a class="headerlink" href="#xy_doubleTap" title="Permanent link">#</a></h6> | `boolean`&vert;<br/>`string` | <code>false</code> | Set to `true` to make the fader reset to its default value when receiving a double tap.<br/><br/>Can also be an osc address, which case the widget will just send an osc message: `/<doubleTap> <preArgs>` |
        | <h6 id="xy_sensitivity">sensitivity<a class="headerlink" href="#xy_sensitivity" title="Permanent link">#</a></h6> | `number` | <code>1</code> | Defines the pad's sensitivity when `snap` is `false`  |

    === "osc"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="xy_touchAddress">touchAddress<a class="headerlink" href="#xy_touchAddress" title="Permanent link">#</a></h6> | `string` | <code>""</code> | OSC address for touched state messages: `/touchAddress [preArgs] 0/1`) |

??? api "<div id="rgb">rgb<a class="headerlink" href="#rgb" title="Permanent link">#</a></div>"
    Color picker with optional alpha slider.

    === "rgb"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="rgb_snap">snap<a class="headerlink" href="#rgb_snap" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | By default, the points are dragged from their initial position.<br/><br/>If set to `true`, touching anywhere on the widget's surface will make them snap to the touching coordinates |
        | <h6 id="rgb_spring">spring<a class="headerlink" href="#rgb_spring" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | When set to `true`, the widget will go back to its default value when released |
        | <h6 id="rgb_range">range<a class="headerlink" href="#rgb_range" title="Permanent link">#</a></h6> | `object` | <code>\{<br/>&nbsp;"min": 0,<br/>&nbsp;"max": 255<br/>}</code> | Defines the widget's output scale. |
        | <h6 id="rgb_alpha">alpha<a class="headerlink" href="#rgb_alpha" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to enable alpha channel |
        | <h6 id="rgb_rangeAlpha">rangeAlpha<a class="headerlink" href="#rgb_rangeAlpha" title="Permanent link">#</a></h6> | `object` | <code>\{<br/>&nbsp;"min": 0,<br/>&nbsp;"max": 1<br/>}</code> | Defines the widget's output scale for the alpha channel. |

??? api "<div id="multixy">multixy<a class="headerlink" href="#multixy" title="Permanent link">#</a></div>"
    Multi-point XY pad.

    === "multi xy"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="multixy_points">points<a class="headerlink" href="#multixy_points" title="Permanent link">#</a></h6> | `integer`&vert;<br/>`array` | <code>2</code> | Defines the number of points on the pad<br/><br/>Can be an array of strings that will be used as labels for the points (ex: `['A', 'B']`) |

    === "xy"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="multixy_pointSize">pointSize<a class="headerlink" href="#multixy_pointSize" title="Permanent link">#</a></h6> | `integer` | <code>20</code> | Defines the points' size |
        | <h6 id="multixy_snap">snap<a class="headerlink" href="#multixy_snap" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | By default, the points are dragged from their initial position.<br/><br/>If set to `true`, touching anywhere on the widget's surface will make them snap to the touching coordinates |
        | <h6 id="multixy_spring">spring<a class="headerlink" href="#multixy_spring" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | When set to `true`, the widget will go back to its default value when released |
        | <h6 id="multixy_pips">pips<a class="headerlink" href="#multixy_pips" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | Set to `false` to hide the scale |
        | <h6 id="multixy_rangeX">rangeX<a class="headerlink" href="#multixy_rangeX" title="Permanent link">#</a></h6> | `object` | <code>\{<br/>&nbsp;"min": 0,<br/>&nbsp;"max": 1<br/>}</code> | Defines the min and max values for the x axis |
        | <h6 id="multixy_rangeY">rangeY<a class="headerlink" href="#multixy_rangeY" title="Permanent link">#</a></h6> | `object` | <code>\{<br/>&nbsp;"min": 0,<br/>&nbsp;"max": 1<br/>}</code> | Defines the min and max values for the y axis |
        | <h6 id="multixy_logScaleX">logScaleX<a class="headerlink" href="#multixy_logScaleX" title="Permanent link">#</a></h6> | `boolean`&vert;<br/>`number` | <code>false</code> | Set to `true` to use logarithmic scale for the x axis. Set to `-1` for exponential scale. |
        | <h6 id="multixy_logScaleY">logScaleY<a class="headerlink" href="#multixy_logScaleY" title="Permanent link">#</a></h6> | `boolean`&vert;<br/>`number` | <code>false</code> | Set to `true` to use logarithmic scale for the y axis. Set to `-1` for exponential scale. |
        | <h6 id="multixy_sensitivity">sensitivity<a class="headerlink" href="#multixy_sensitivity" title="Permanent link">#</a></h6> | `number` | <code>1</code> | Defines the pad's sensitivity when `snap` is `false`  |

    === "osc"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="multixy_touchAddress">touchAddress<a class="headerlink" href="#multixy_touchAddress" title="Permanent link">#</a></h6> | `string` | <code>""</code> | OSC address for touched state messages: `/touchAddress [preArgs] 0/1` |
## Sliders

??? api "<div id="fader">fader<a class="headerlink" href="#fader" title="Permanent link">#</a></div>"
    Vertical / horizontal slider.

    === "style"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="fader_css">css<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#fader_css" title="Permanent link">#</a></h6> | `string` | <code>""</code> | CSS rules. See <a href="https://openstagecontrol.ammd.net/docs/customization/css-tips/">documentation</a>.<br/><br/>Available css variables:<br/>- `--color-background`: `colorBg`<br/>- `--color-widget`: `colorWidget`<br/>- `--color-fill`: `colorFill`<br/>- `--color-stroke`: `colorStroke`<br/>- `--color-text`: `colorText`<br/>- `--widget-padding`: `padding`<br/>- `--line-width`: `lineWidth`<br/>- `--alpha-fill-on`: `alphaFillOn`<br/>- `--alpha-fill-off`: `alphaFillOff`<br/>- `--alpha-stroke`: `alphaStroke`<br/>- `--alpha-pips`: `alphaPips`<br/>- `--alpha-pips-text`: `alphaPipsText`<br/>- `--knob-size`: `knobSize` |

    === "fader"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="fader_design">design<a class="headerlink" href="#fader_design" title="Permanent link">#</a></h6> | `string` | <code>"default"</code> | Design style<br/><br/>Choices: `default`, `round`, `compact` |
        | <h6 id="fader_knobSize">knobSize<a class="headerlink" href="#fader_knobSize" title="Permanent link">#</a></h6> | `number` | <code>"auto"</code> | Fader knob size |
        | <h6 id="fader_horizontal">horizontal<a class="headerlink" href="#fader_horizontal" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to display the fader horizontally |
        | <h6 id="fader_pips">pips<a class="headerlink" href="#fader_pips" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to show range breakpoints (ignored if `design` is `compact`) |
        | <h6 id="fader_dashed">dashed<a class="headerlink" href="#fader_dashed" title="Permanent link">#</a></h6> | `boolean`&vert;<br/>`array` | <code>false</code> | Set to `true` to display a dashed gauge. Can be set as an `array` of two numbers : `[dash_size, gap_size]` |
        | <h6 id="fader_gradient">gradient<a class="headerlink" href="#fader_gradient" title="Permanent link">#</a></h6> | `array`&vert;<br/>`object` | <code>[]</code> | When set, the meter's gauge will be filled with a linear color gradient<br/>- each item must be a CSS color string.<br/>- as an `object`: each key must be a number between 0 and 1<br/>- each item must be a CSS color string.<br/><br/>Examples: `['blue', 'red']`, {'0': 'blue', '0.9': 'blue', '1': 'red'}  |
        | <h6 id="fader_snap">snap<a class="headerlink" href="#fader_snap" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | By default, dragging the widget will modify it's value starting from its last value. Setting this to `true` will make it snap directly to the mouse/touch position |
        | <h6 id="fader_spring">spring<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#fader_spring" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | When set to `true`, the widget will go back to its `default` value when released |
        | <h6 id="fader_doubleTap">doubleTap<a class="headerlink" href="#fader_doubleTap" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to make the fader reset to its `default` value when receiving a double tap.<br/><br/>Can also be an osc address, in which case the widget will just send an osc message (`/<doubleTap> <preArgs>`) |
        | <h6 id="fader_range">range<a class="headerlink" href="#fader_range" title="Permanent link">#</a></h6> | `object` | <code>\{<br/>&nbsp;"min": 0,<br/>&nbsp;"max": 1<br/>}</code> | Defines the breakpoints of the fader's scale:<br/>- keys can be percentages and/or `min` / `max`<br/>- values can be `number` or `object` if a custom label is needed<br/><br/>Example: (`{min:{"-inf": 0}, "50%": 0.25, max: {"+inf": 1}}`) |
        | <h6 id="fader_logScale">logScale<a class="headerlink" href="#fader_logScale" title="Permanent link">#</a></h6> | `boolean`&vert;<br/>`number` | <code>false</code> | Set to `true` to use logarithmic scale. Set to `-1` for exponential scale. |
        | <h6 id="fader_sensitivity">sensitivity<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#fader_sensitivity" title="Permanent link">#</a></h6> | `number` | <code>1</code> | Defines the fader's sensitivity when `snap` is `false`  |
        | <h6 id="fader_steps">steps<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#fader_steps" title="Permanent link">#</a></h6> | `string`&vert;<br/>`number`&vert;<br/>`array` | <code>""</code> | Restricts the widget's value:<br/>- `auto`: use values defined in `range`<br/>- `number`: define a number of evenly spaced steps<br/>- `array`: use arbitrary values |
        | <h6 id="fader_origin">origin<a class="headerlink" href="#fader_origin" title="Permanent link">#</a></h6> | `number` | <code>"auto"</code> | Defines the starting point's value of the fader's gauge |

    === "osc"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="fader_touchAddress">touchAddress<a class="headerlink" href="#fader_touchAddress" title="Permanent link">#</a></h6> | `string` | <code>""</code> | OSC address for touched state messages: `/touchAddress [preArgs] 0/1` |

??? api "<div id="knob">knob<a class="headerlink" href="#knob" title="Permanent link">#</a></div>"
    Rotative knob slider.

    === "style"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="knob_css">css<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#knob_css" title="Permanent link">#</a></h6> | `string` | <code>""</code> | CSS rules. See <a href="https://openstagecontrol.ammd.net/docs/customization/css-tips/">documentation</a>.<br/><br/>Available css variables:<br/>- `--color-background`: `colorBg`<br/>- `--color-widget`: `colorWidget`<br/>- `--color-fill`: `colorFill`<br/>- `--color-stroke`: `colorStroke`<br/>- `--color-text`: `colorText`<br/>- `--widget-padding`: `padding`<br/>- `--line-width`: `lineWidth`<br/>- `--alpha-fill-on`: `alphaFillOn`<br/>- `--alpha-fill-off`: `alphaFillOff`<br/>- `--alpha-stroke`: `alphaStroke`<br/>- `--alpha-pips`: `alphaPips`<br/>- `--alpha-pips-text`: `alphaPipsText` |

    === "knob"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="knob_design">design<a class="headerlink" href="#knob_design" title="Permanent link">#</a></h6> | `string` | <code>"default"</code> | Design style<br/><br/>Note: "solid" design uses "colorStroke" for the central knob color.<br/><br/>Choices: `default`, `solid`, `line` |
        | <h6 id="knob_mode">mode<a class="headerlink" href="#knob_mode" title="Permanent link">#</a></h6> | `string` | <code>"vertical"</code> | - `circular`: relative move in circular motion<br/>- `snap`: snap to touch position and move in vertical motion<br/>- `vertical`: relative move in vertical motion<br/><br/>Choices: `vertical`, `circular`, `snap` |
        | <h6 id="knob_spring">spring<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#knob_spring" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | When set to `true`, the widget will go back to its `default` value when released |
        | <h6 id="knob_pips">pips<a class="headerlink" href="#knob_pips" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to show the scale's breakpoints |
        | <h6 id="knob_dashed">dashed<a class="headerlink" href="#knob_dashed" title="Permanent link">#</a></h6> | `boolean`&vert;<br/>`array` | <code>false</code> | Set to `true` to display a dashed gauge. Can be set as an `array` of two numbers : `[dash_size, gap_size]` |
        | <h6 id="knob_angle">angle<a class="headerlink" href="#knob_angle" title="Permanent link">#</a></h6> | `number` | <code>270</code> | Defines the angle's width of the knob, in degrees |
        | <h6 id="knob_doubleTap">doubleTap<a class="headerlink" href="#knob_doubleTap" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to make the knob reset to its `default` value when receiving a double tap.<br/><br/>Can also be an osc address, in which case the widget will just send an osc message (`/<doubleTap> <preArgs>`) |
        | <h6 id="knob_range">range<a class="headerlink" href="#knob_range" title="Permanent link">#</a></h6> | `object` | <code>\{<br/>&nbsp;"min": 0,<br/>&nbsp;"max": 1<br/>}</code> | Defines the breakpoints of the fader's scale:<br/>- keys can be percentages and/or `min` / `max`<br/>- values can be `number` or `object` if a custom label is needed<br/><br/>Example: (`{min:{"-inf": 0}, "50%": 0.25, max: {"+inf": 1}}`) |
        | <h6 id="knob_logScale">logScale<a class="headerlink" href="#knob_logScale" title="Permanent link">#</a></h6> | `boolean`&vert;<br/>`number` | <code>false</code> | Set to `true` to use logarithmic scale. Set to `-1` for exponential scale. |
        | <h6 id="knob_sensitivity">sensitivity<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#knob_sensitivity" title="Permanent link">#</a></h6> | `number` | <code>1</code> | Defines the knob's sensitivity when `mode` is not `snap`  |
        | <h6 id="knob_steps">steps<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#knob_steps" title="Permanent link">#</a></h6> | `string`&vert;<br/>`number`&vert;<br/>`array` | <code>""</code> | Restricts the widget's value:<br/>- `auto`: use values defined in `range`<br/>- `number`: define a number of evenly spaced steps<br/>- `array`: use arbitrary values |
        | <h6 id="knob_origin">origin<a class="headerlink" href="#knob_origin" title="Permanent link">#</a></h6> | `number` | <code>"auto"</code> | Defines the starting point's value of the knob's gauge |

    === "osc"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="knob_touchAddress">touchAddress<a class="headerlink" href="#knob_touchAddress" title="Permanent link">#</a></h6> | `string` | <code>""</code> | OSC address for touched state messages: `/touchAddress [preArgs] 0/1` |

??? api "<div id="encoder">encoder<a class="headerlink" href="#encoder" title="Permanent link">#</a></div>"
    A knob that sends a relative direction infomation instead of an absolute value.

    === "encoder"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="encoder_ticks">ticks<a class="headerlink" href="#encoder_ticks" title="Permanent link">#</a></h6> | `number` | <code>360</code> | defines the granularity / verbosity of the encoder (number of step for a 360° arc) |
        | <h6 id="encoder_back">back<a class="headerlink" href="#encoder_back" title="Permanent link">#</a></h6> | `*` | <code>-1</code> | Defines which value is sent when rotating the encoder anticlockwise |
        | <h6 id="encoder_forth">forth<a class="headerlink" href="#encoder_forth" title="Permanent link">#</a></h6> | `*` | <code>1</code> | Defines which value is sent when rotating the encoder clockwise |
        | <h6 id="encoder_release">release<a class="headerlink" href="#encoder_release" title="Permanent link">#</a></h6> | `number` | <code>""</code> | Defines which value is sent when releasing the encoder:<br/>- Set to `null` to send send no argument in the osc message<br/>- Can be an `object` if the type needs to be specified |
        | <h6 id="encoder_mode">mode<a class="headerlink" href="#encoder_mode" title="Permanent link">#</a></h6> | `string` | <code>"circular"</code> | - `circular`: relative move in circular motion<br/>- `snap`: snap to touch position and move in vertical motion<br/>- `vertical`: relative move in vertical motion<br/><br/>Choices: `circular`, `snap`, `vertical` |
        | <h6 id="encoder_doubleTap">doubleTap<a class="headerlink" href="#encoder_doubleTap" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to make the fader reset to its `default` value when receiving a double tap.<br/><br/>Can also be an osc address, in which case the widget will just send an osc message (`/<doubleTap> <preArgs>`) |

    === "osc"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="encoder_touchAddress">touchAddress<a class="headerlink" href="#encoder_touchAddress" title="Permanent link">#</a></h6> | `string` | <code>""</code> | OSC address for touched state messages: `/touchAddress [preArgs] 0/1` |

??? api "<div id="range">range<a class="headerlink" href="#range" title="Permanent link">#</a></div>"
    A fader with two heads for setting a range.

    === "style"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="range_css">css<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#range_css" title="Permanent link">#</a></h6> | `string` | <code>""</code> | CSS rules. See <a href="https://openstagecontrol.ammd.net/docs/customization/css-tips/">documentation</a>.<br/><br/>Available css variables:<br/>- `--color-background`: `colorBg`<br/>- `--color-widget`: `colorWidget`<br/>- `--color-fill`: `colorFill`<br/>- `--color-stroke`: `colorStroke`<br/>- `--color-text`: `colorText`<br/>- `--widget-padding`: `padding`<br/>- `--line-width`: `lineWidth`<br/>- `--alpha-fill-on`: `alphaFillOn`<br/>- `--alpha-fill-off`: `alphaFillOff`<br/>- `--alpha-stroke`: `alphaStroke`<br/>- `--alpha-pips`: `alphaPips`<br/>- `--alpha-pips-text`: `alphaPipsText`<br/>- `--knob-size`: `knobSize` |

    === "fader"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="range_design">design<a class="headerlink" href="#range_design" title="Permanent link">#</a></h6> | `string` | <code>"default"</code> | Design style<br/><br/>Choices: `default`, `round`, `compact` |
        | <h6 id="range_knobSize">knobSize<a class="headerlink" href="#range_knobSize" title="Permanent link">#</a></h6> | `number` | <code>"auto"</code> | Fader knob size |
        | <h6 id="range_horizontal">horizontal<a class="headerlink" href="#range_horizontal" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to display the fader horizontally |
        | <h6 id="range_pips">pips<a class="headerlink" href="#range_pips" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to show range breakpoints (ignored if `design` is `compact`) |
        | <h6 id="range_dashed">dashed<a class="headerlink" href="#range_dashed" title="Permanent link">#</a></h6> | `boolean`&vert;<br/>`array` | <code>false</code> | Set to `true` to display a dashed gauge. Can be set as an `array` of two numbers : `[dash_size, gap_size]` |
        | <h6 id="range_gradient">gradient<a class="headerlink" href="#range_gradient" title="Permanent link">#</a></h6> | `array`&vert;<br/>`object` | <code>[]</code> | When set, the meter's gauge will be filled with a linear color gradient<br/>- each item must be a CSS color string.<br/>- as an `object`: each key must be a number between 0 and 1<br/>- each item must be a CSS color string.<br/><br/>Examples: `['blue', 'red']`, {'0': 'blue', '0.9': 'blue', '1': 'red'}  |
        | <h6 id="range_snap">snap<a class="headerlink" href="#range_snap" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | By default, dragging the widget will modify it's value starting from its last value. Setting this to `true` will make it snap directly to the mouse/touch position |
        | <h6 id="range_spring">spring<a class="headerlink" href="#range_spring" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | When set to `true`, the widget will go back to its `default` value when released |
        | <h6 id="range_doubleTap">doubleTap<a class="headerlink" href="#range_doubleTap" title="Permanent link">#</a></h6> | `boolean` | <code>false</code> | Set to `true` to make the fader reset to its `default` value when receiving a double tap.<br/><br/>Can also be an osc address, in which case the widget will just send an osc message (`/<doubleTap> <preArgs>`) |
        | <h6 id="range_range">range<a class="headerlink" href="#range_range" title="Permanent link">#</a></h6> | `object` | <code>\{<br/>&nbsp;"min": 0,<br/>&nbsp;"max": 1<br/>}</code> | Defines the breakpoints of the fader's scale:<br/>- keys can be percentages and/or `min` / `max`<br/>- values can be `number` or `object` if a custom label is needed<br/><br/>Example: (`{min:{"-inf": 0}, "50%": 0.25, max: {"+inf": 1}}`) |
        | <h6 id="range_logScale">logScale<a class="headerlink" href="#range_logScale" title="Permanent link">#</a></h6> | `boolean`&vert;<br/>`number` | <code>false</code> | Set to `true` to use logarithmic scale. Set to `-1` for exponential scale. |
        | <h6 id="range_sensitivity">sensitivity<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#range_sensitivity" title="Permanent link">#</a></h6> | `number` | <code>1</code> | Defines the fader's sensitivity when `snap` is `false`  |
        | <h6 id="range_steps">steps<sup><i class="fas fa-bolt" title="dynamic"></i></sup><a class="headerlink" href="#range_steps" title="Permanent link">#</a></h6> | `string`&vert;<br/>`number`&vert;<br/>`array` | <code>""</code> | Restricts the widget's value:<br/>- `auto`: use values defined in `range`<br/>- `number`: define a number of evenly spaced steps<br/>- `array`: use arbitrary values |
        | <h6 id="range_origin">origin<a class="headerlink" href="#range_origin" title="Permanent link">#</a></h6> | `number` | <code>"auto"</code> | Defines the starting point's value of the fader's gauge |

    === "osc"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="range_touchAddress">touchAddress<a class="headerlink" href="#range_touchAddress" title="Permanent link">#</a></h6> | `string` | <code>""</code> | OSC address for touched state messages: `/touchAddress [preArgs] 0/1` |
## Scripts

??? api "<div id="script">script<a class="headerlink" href="#script" title="Permanent link">#</a></div>"
    Evaluates a script each time it receives a value.

    === "script"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="script_event">event<a class="headerlink" href="#script_event" title="Permanent link">#</a></h6> | `string` | <code>"value"</code> | Define which events trigger the script's execution.<br/><br/>Choices: `value`, `keyboard` |
        | <h6 id="script_script">script<a class="headerlink" href="#script_script" title="Permanent link">#</a></h6> | `script` | <code>""</code> | Script executed whenever the widget's receives the defined event. See <a href="https://openstagecontrol.ammd.net/docs/widgets/scripting/">documentation</a>. |

    === "event: keyboard"

        | property | type |default | description |
        | --- | --- | --- | --- |
        | <h6 id="script_keyBinding">keyBinding<a class="headerlink" href="#script_keyBinding" title="Permanent link">#</a></h6> | `string`&vert;<br/>`array` | <code>""</code> | Key combo `string` or `array` of strings (see <a href="https://github.com/RobertWHurst/KeyboardJS">KeyboardJS</a> documentation) |
        | <h6 id="script_keyRepeat">keyRepeat<a class="headerlink" href="#script_keyRepeat" title="Permanent link">#</a></h6> | `boolean` | <code>true</code> | Set to `false` to prevent keydown repeats when holding the key combo pressed |
        | <h6 id="script_keyType">keyType<a class="headerlink" href="#script_keyType" title="Permanent link">#</a></h6> | `string` | <code>"keydown"</code> | Determines which key event trigger the script's execution<br/><br/>Choices: `keydown`, `keyup`, `both` |

??? api "<div id="variable">variable<a class="headerlink" href="#variable" title="Permanent link">#</a></div>"
    Receives / stores a value, to be used in scripts (using the get function) or in properties (using the @{} syntax).
