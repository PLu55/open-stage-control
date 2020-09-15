var {updateWidget} = require('./data-workers'),
    {categories} = require('../widgets/'),
    widgetManager = require('../managers/widgets'),
    {icon} = require('../ui/utils'),
    editor = require('./'),
    locales = require('../locales'),
    ContextMenu = require('../ui/context-menu'),
    contextMenu = new ContextMenu()


var multiSelectKey = (navigator.platform || '').match('Mac') ? 'metaKey' : 'ctrlKey'

var handleClick = function(event) {

    if (!editor.enabled) return

    if (!event.detail[multiSelectKey] && event.type !== 'fast-right-click' && (
        event.target.classList.contains('no-widget-select') ||
        event.target.id === 'open-toggle'
    )) { return }

    var eventData = event.detail,
        targetWidget = widgetManager.getWidgetByElement(eventData.target, ':not(.not-editable)')

    if (!targetWidget) return

    // if the widget is not already selected
    if (!targetWidget.container.classList.contains('editing') || event.detail.ctrlKey || event.detail.shiftKey) {
        // add a flag to the original event to prevent draginit
        // and prevent any further fast-click (ie input focus)
        eventData.capturedByEditor = true
        event.capturedByEditor = true
    }


    if (event.type !== 'fast-right-click') {
        editor.select(targetWidget, {multi: event.detail[multiSelectKey]})
    }

    // right-click menu
    if (event.type !== 'fast-right-click') return

    if (!event.detail.shiftKey && !event.detail[multiSelectKey] && editor.selectedWidgets.length <= 1) {
        editor.select(targetWidget)
    }

    if (!editor.selectedWidgets.length) return

    var data = editor.selectedWidgets.map((w)=>w.props),
        widget = editor.selectedWidgets[0],
        parent = widget.parent,
        actions = []

    var clickX = Math.round((eventData.offsetX + eventData.target.scrollLeft) / (GRIDWIDTH * PXSCALE)) * GRIDWIDTH,
        clickY = Math.round((eventData.offsetY + eventData.target.scrollTop)  / (GRIDWIDTH * PXSCALE)) * GRIDWIDTH

    if (parent !== widgetManager)  {

        if (event.target.tagName !== 'LI') {
            actions.push({
                label: icon('project-diagram') + ' ' + locales('editor_show_in_tree'),
                action: ()=>{
                    editor.widgetTree.showWidget(editor.selectedWidgets[0])
                }
            })
            actions.push({
                separator: true
            })

        }

        actions.push({
            label: icon('copy') + ' ' + locales('editor_copy'),
            action: editor.copyWidget.bind(editor)
        })

        actions.push({
            label: icon('cut') + ' ' + locales('editor_cut'),
            action: editor.cutWidget.bind(editor)
        })

    }

    if (widget.childrenType !== undefined) {

        if (editor.clipboard !== null) {

            var pasteActions = [],
                canPaste = true

            if (
                editor.clipboard[0].type === 'tab' && widget.childrenType === 'widget' ||
                editor.clipboard[0].type !== 'tab' && widget.childrenType === 'tab'
            ) canPaste = false

            if (canPaste) {

                pasteActions.push({
                    label: icon('paste') + ' ' + locales('editor_paste'),
                    action: ()=>{
                        editor.pasteWidget(clickX, clickY)
                    }
                })
                pasteActions.push({
                    label: icon('plus-square') + ' ' + locales('editor_pasteindent'),
                    action: ()=>{
                        editor.pasteWidget(clickX, clickY, true)
                    }
                })

                if (editor.idClipboard && widgetManager.getWidgetById(editor.idClipboard).length && editor.clipboard[0].type !== 'tab') {
                    pasteActions.push({
                        label: icon('clone') + ' ' + locales('editor_clone'),
                        action: ()=>{
                            editor.pasteWidgetAsClone(clickX, clickY)
                        }
                    })
                }

            }

            actions.push({
                label: icon('paste') + ' ' + locales('editor_paste'),
                action: pasteActions,
                class: canPaste ? '' : 'disabled'
            })

        }


        var addActions = []

        for (let category in categories) {

            var catActions = []

            for (let t in categories[category]) {

                let type = categories[category][t]

                catActions.push({

                    label: type,
                    action: ()=>{

                        var newData = {type: type}

                        if (!eventData.target.classList.contains('tablink')) {
                            newData.top = clickY
                            newData.left= clickX
                        }

                        if (editor.usePercents) {
                            newData.top = (100 * clickY / editor.selectedWidgets[0].widget.offsetHeight).toFixed(2) + '%'
                            newData.left= (100 * clickX / editor.selectedWidgets[0].widget.offsetWidth).toFixed(2) + '%'
                            newData.height= '6%'
                            newData.width = '8%'
                        }

                        data[0].widgets = data[0].widgets || []
                        data[0].widgets.push(newData)

                        var indexes = {addedIndexes: [data[0].widgets.length -1]}
                        updateWidget(editor.selectedWidgets[0], indexes)


                        editor.pushHistory(indexes)

                    }
                })

            }

            addActions.push({
                label: category,
                action: catActions
            })

        }

        if (actions.length) actions.push({
            separator: true
        })

        actions.push({
            label: icon('plus') + ' ' + locales('editor_addwidget'),
            action: addActions
        })

    }

    if (data.length == 1 && (!data[0].widgets || !data[0].widgets.length) && (data[0].tabs)) {

        actions.push({
            label: icon('plus') + ' ' + locales('editor_addtab'),
            action: ()=>{
                data[0].tabs = data[0].tabs || []
                data[0].tabs.push({})

                var indexes = {addedIndexes: [data[0].tabs.length -1]}
                updateWidget(editor.selectedWidgets[0], indexes)
                editor.pushHistory(indexes)

            }
        })

    }

    if (parent !== widgetManager)  {

        actions.push({
            separator: true
        })

        actions.push({
            label: icon('trash') + ' ' + locales('editor_delete'),
            action: editor.deleteWidget.bind(editor)
        })

    }

    contextMenu.open(eventData, actions)

}

document.body.addEventListener('fast-right-click', handleClick, true)
document.body.addEventListener('fast-click', handleClick, true)
