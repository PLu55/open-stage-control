var UiWidget = require('./ui-widget'),
    ContextMenu = require('./context-menu'),
    ipc = require('../ipc'),
    locales = require('../locales'),
    notifications = require('./notifications'),
    fullscreen = require('./fullscreen'),
    editor = require('../editor'),
    sessionManager = require('../managers/session/'),
    stateManager = require('../managers/state'),
    {leftUiSidePanel, rightUiSidePanel} = require('../ui/')


var recentSessions = [{label: locales('file_open_recent_wait'), class: 'disabled'}]
var menuEntries = [

    {
        label: locales('session'),
        action: [
            {
                label: locales('session_new'),
                action: sessionManager.create.bind(sessionManager),
                class: ()=>{return READ_ONLY ? 'disabled' :''}
            },
            {
                separator: true
            },
            {
                label: locales('file_open'),
                action: sessionManager.browse.bind(sessionManager),
                shortcut: 'mod + o',
                class: ()=>{return READ_ONLY ? 'disabled' :''}
            },
            {
                label: locales('file_open_recent'),
                action: recentSessions,
                class: ()=>{return !recentSessions.length ? 'disabled' :''}
            },
            {
                separator: true
            },
            {
                label: locales('file_save'),
                action: sessionManager.save.bind(sessionManager),
                shortcut: 'mod + s',
                class: ()=>{return READ_ONLY || sessionManager.session === null ? 'disabled' :''}
            },
            {
                label: locales('file_save_as'),
                action: sessionManager.saveAs.bind(sessionManager),
                shortcut: 'mod + shift + s',
                class: ()=>{return READ_ONLY || sessionManager.session === null ? 'disabled' :''}
            },
            {
                separator: true
            },
            {
                label: locales('file_import'),
                action: sessionManager.import.bind(sessionManager),
                class: ()=>{return READ_ONLY ? 'disabled' :''}
            },
            {
                label: locales('file_export'),
                action: sessionManager.export.bind(sessionManager),
                class: ()=>{return READ_ONLY || sessionManager.session === null ? 'disabled' :''}
            },

        ]
    },
    {
        label: locales('state'),
        class: ()=>{return sessionManager.session === null ? 'disabled' : ''},
        action: [
            {
                label: locales('state_store'),
                action: stateManager.quickSave.bind(stateManager)
            },
            {
                label: locales('state_recall'),
                class: ()=>{return stateManager.quickState === null ? 'disabled' : ''},
                action: stateManager.quickLoad.bind(stateManager)
            },
            {
                label: locales('state_send'),
                action: ()=>{
                    stateManager.send()
                    notifications.add({
                        icon: 'sliders-h',
                        message: locales('state_sendsuccess')
                    })
                }
            },
            {
                separator: true
            },
            {
                label: locales('file_open'),
                action: stateManager.browse.bind(stateManager),
                class: ()=>{return READ_ONLY ? 'disabled' :''}
            },
            {
                label: locales('file_save'),
                action: stateManager.save.bind(stateManager),
                class: ()=>{return READ_ONLY ? 'disabled' :''}
            },
            {
                label: locales('file_save_as'),
                action: stateManager.saveAs.bind(stateManager),
                class: ()=>{return READ_ONLY ? 'disabled' :''}
            },
            {
                separator: true
            },
            {
                label: locales('file_import'),
                action: stateManager.import.bind(stateManager),
                class: ()=>{return READ_ONLY ? 'disabled' :''}
            },
            {
                label: locales('file_export'),
                action: stateManager.export.bind(stateManager),
                class: ()=>{return READ_ONLY ? 'disabled' :''}
            },
        ]
    },
    {
        label: locales('editor'),
        class: ()=>{return sessionManager.session === null || READ_ONLY ? 'disabled' : ''},
        action: [
            {
                label: locales('editor_enabled'),
                class: ()=>{return 'toggle ' + (editor.enabled ? 'on' : 'off')},
                action: ()=>{
                    if (editor.enabled) editor.disable()
                    else editor.enable()
                },
                shortcut: 'mod + e'
            },
            {
                separator: true
            },
            {
                label: locales('editor_grid'),
                class: ()=>{return 'toggle ' + (editor.grid ? 'on' : 'off')},
                action: editor.toggleGrid.bind(editor),
                shortcut: 'mod + g'

            },
            {
                label: locales('editor_tree'),
                class: ()=>{return 'toggle ' + (leftUiSidePanel.minimized ? 'off' : 'on')},
                action: ()=>{return leftUiSidePanel.minimized ? leftUiSidePanel.restore() : leftUiSidePanel.minimize()},
                shortcut: 'mod + t'


            },
            {
                label: locales('editor_inspector'),
                class: ()=>{return 'toggle ' + (rightUiSidePanel.minimized ? 'off' : 'on')},
                action: ()=>{return rightUiSidePanel.minimized ? rightUiSidePanel.restore() : rightUiSidePanel.minimize()},
                shortcut: 'mod + i'
            },
            {
                separator: true
            },
            {
                label: locales('editor_percents'),
                class: ()=>{return 'toggle ' + (editor.usePercents ? 'on' : 'off')},
                action: ()=>{editor.usePercents = !editor.usePercents}
            }
        ]
    },
    {
        separator: true
    },
    {
        label: locales('fullscreen'),
        class: ()=>{return 'toggle ' + (fullscreen.isFullscreen ? 'on' : 'off')},
        action: ()=>{
            if (fullscreen.isEnabled) fullscreen.toggle()
        },
        shortcut: 'f11'
    }

]

if (navigator.userAgent.match(/Android|iPhone|iPad|iPod/i)) {

    var NoSleep = require('nosleep.js'),
        noSleep = new NoSleep(),
        noSleepState = false

    menuEntries.push({
        label: locales('nosleep'),
        class: ()=>{return 'toggle ' + (noSleepState ? 'on' : 'off')},
        action:()=>{
            noSleepState = !noSleepState
            if (noSleepState) noSleep.disable()
            else noSleep.enable()
        }
    })

}





class UiToolbar extends UiWidget {

    constructor(options) {

        super(options)

        this.menu = new ContextMenu({
            position: [40, 1]
        })
        this.opened = false
        this.entries = menuEntries
        this.menu.bindShortcuts(menuEntries)

        ipc.on('sessionList', (data)=>{
            if (recentSessions.length) {
                recentSessions.splice(0, 10)
            }
            for (let s of data) [
                recentSessions.push({
                    label: s,
                    action: ()=>{sessionManager.requestOpen(s)}
                })
            ]
        })

        this.container.addEventListener('fast-click', (e)=>{
            if (this.opened) this.close()
            else this.open(e)
        })

        this.menu.on('close', ()=>{
            setTimeout(()=>{
                this.opened = false
                this.toggleState()
            })
        })

    }

    open(e) {

        if (this.opened) return

        this.menu.open(e, menuEntries)

        this.opened = true
        this.toggleState()


    }

    close() {

        if (this.opened) return

        this.menu.close()

        this.opened = false
        this.toggleState()

    }

    toggleState() {

        this.container.classList.toggle('on', this.opened)

    }

}


module.exports = new UiToolbar({selector: 'osc-toolbar'})
