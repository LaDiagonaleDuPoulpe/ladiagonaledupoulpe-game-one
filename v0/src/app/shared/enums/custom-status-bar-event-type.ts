/**
 * List of event keys from status bar 
 */
export enum CustomStatusBarEventType {
    /** Refreshes graphics content */
    refresh = 'refreshEvent',
    /** Updates whole stats values in status bar */
    updateStats = 'updateStatsEvent',
    /** Updates one part of the stats (you must precise the part key to update) */
    updatePartOfStat = 'updatePartOfStatEvent',
    /** Reinits one stat in status bar (not the whole status bar list) (you must precise the part key to update) */
    reinitPartOfStat = 'reinitPartOfStatEvent',
    /** Reinits all the status bar */
    reinit = 'reinitEvent',
    /** Toggle the status bar : show or hide */
    toggle = 'toggleEvent'
}