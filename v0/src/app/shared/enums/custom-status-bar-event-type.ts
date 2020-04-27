/**
 * List of event keys from status bar 
 */
export enum CustomStatusBarEventType {
    /** Refreshes graphics content */
    refresh = 'refreshEvent',
    /** Updates whole stats values in status bar */
    updateStats = 'updateStatsEvent',
    /** Updates one stat in status bar (not the whole status bar list) */
    updatePartOfStat = 'updatePartOfStatEvent',
    /** Reinits all the status bar */
    reinit = 'reinitEvent',
    /** Toggle the status bar : show or hide */
    toggle = 'toggleEvent'
}