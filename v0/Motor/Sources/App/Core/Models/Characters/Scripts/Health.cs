using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Interfaces.Models.Attacks;
using System;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Scripts
{
    /// <summary>
    /// Health of character
    /// </summary>
    public class Health : Node, IWithDamage
    {
        #region Fields
        private LifePoint _lifePoint = new LifePoint();
        #region Signals
        /// <summary>
        /// Observes this event to know when health changed (plus or less)
        /// </summary>
        /// <param name="health">New health</param>
        [Signal]
        public delegate void HealthChanged(LifePoint point);

        /// <summary>
        /// Observes this event to know when player is died
        /// </summary>
        [Signal]
        public delegate void Died();
        #endregion
        #endregion

        #region Public methods
        public override void _Ready() { }

        /// <summary>
        /// Hits the health, and substract the damage value to the current health value
        /// </summary>
        /// <param name="damageValue">Damage value, must be more than 0</param>
        public void Hit(int damageValue)
        {
            this.CurrentValue -= damageValue;

            this.EmitSignal(nameof(HealthChanged), LifePoint.New(this.CurrentValue));

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
        public virtual int CurrentValue { get => this._lifePoint.CurrentValue; set => this._lifePoint.Add(value); }

        /// <summary>
        /// Current value is more than 0 ?
        /// </summary>
        public virtual bool IsAlive { get => this.CurrentValue > 0; }
        #endregion
    }
}