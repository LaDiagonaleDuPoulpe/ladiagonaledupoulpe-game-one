/**
 * List of event keys from status bar 
 */
export enum CustomStatusBarEventType {
    /** Refreshes graphics content */
    refresh = 'refreshEvent',
    /** Updates stats values in status bar */
    updateStats = 'updateStatsEvent',
    /** Reinits all the status bar */
    reinit = 'reinitEvent',
    /** Toggle the status bar : show or hide */
    toggle = 'toggleEvent'
}