using Godot;
using System;

/// <summary>
/// Health of character
/// </summary>
public class Health : Node
{
    #region Fields
    private int _currentValue = 100;
    #region Signals
    /// <summary>
    /// Observes this event to know when health changed (plus or less)
    /// </summary>
    /// <param name="health">New health</param>
    [Signal]
    public delegate void HealthChanged(int health);

    /// <summary>
    /// Observes this event to know when player is died
    /// </summary>
    [Signal]
    public delegate void Died();
    #endregion
    #endregion

    #region Public methods
    public override void _Ready() {}

    /// <summary>
    /// Hits the health, and substract the damage value to the current health value
    /// </summary>
    /// <param name="damageValue">Damage value, must be more than 0</param>
    public void Hit(int damageValue)
    {
        this.CurrentValue -= damageValue;

        this.EmitSignal(nameof(HealthChanged), this.CurrentValue);

        if (this.CurrentValue < 0)
        {
            this.CurrentValue = 0;
            this.EmitSignal(nameof(Died));
        }
    }
    #endregion

    #region Properties
    /// <summary>
    /// Current value of the health.
    /// Could be overrided.
    /// </summary>
    public virtual int CurrentValue { get => this._currentValue; set => this._currentValue = value; }

    /// <summary>
    /// Current value is more than 0 ?
    /// </summary>
    public virtual bool IsAlive { get => this.CurrentValue > 0; }
    #endregion
}
