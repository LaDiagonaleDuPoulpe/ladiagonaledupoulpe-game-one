using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Interfaces.Models.Attacks;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
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
        /// Observes this event to know when here is no life
        /// </summary>
        [Signal]
        public delegate void LifeIsGone();
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
            this.CurrentValue = this.CurrentValue + damageValue;
            this.EmitSignal(CharacterLifeSignal.HealthChanged.ToString(), new LifePoint(this.CurrentValue));

            if (this.CurrentValue < 0)
            {
                this.CurrentValue = 0;
                this.EmitSignal(CharacterLifeSignal.LifeIsGone.ToString());
            }
        } 

        /// <summary>
        /// Initializes life of the heart (current value and max value)
        /// </summary>
        /// <param name="maxValue"></param>
        public virtual void Initialize(int maxValue)
        {
            this.Initialize(maxValue, maxValue);
        }

        /// <summary>
        /// Initializes life of the heart (current value and max value)
        /// </summary>
        /// <param name="maxValue"></param>
        public virtual void Initialize(int currentValue, int maxValue)
        {
            this.CurrentValue = currentValue;
            this.MaxValue = maxValue;
        }
        #endregion

        #region Properties
        /// <summary>
        /// Current value of the health.
        /// Could be overrided.
        /// </summary>
        public virtual int CurrentValue { get => this._lifePoint.GetCurrentValue(); set => this._lifePoint.Define(value); }

        /// <summary>
        /// Max value of the health
        /// </summary>
        public virtual int MaxValue { get => this._lifePoint.MaxValue; set => this._lifePoint.MaxValue = value; }

        /// <summary>
        /// Current value is more than 0 ?
        /// </summary>
        public virtual bool IsAlive { get => this.CurrentValue > 0; }
        #endregion
    }
}