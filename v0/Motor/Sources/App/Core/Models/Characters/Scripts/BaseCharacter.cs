using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Configurations.Characters;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Models.Attacks;
using ladiagonaledupoulpe.Sources.App.Shared.Plugins;
using ladiagonaledupoulpe.Sources.App.Shared.Signals;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Scripts
{
    /// <summary>
    /// Absract class, it represents all characters in the game : pncs anr pcs 
    /// </summary>
    public abstract class BaseCharacter : KinematicBody2D, IWithDamage
    {
        #region Fields
        #region Signals
        
        #endregion

        private Vector2 _velocity = Vector2.Zero;
        private Health _health = null;
        private bool _animationIsActive = false;
        private HealthCharacterEvents _healthCharacterEvents = null;
        #endregion

        #region Public methods
        public override void _Ready()
        {
            base._Ready();
            this.MainHealth = this.GetNode<Health>("Health");
            this._healthCharacterEvents = this.GetNode<HealthCharacterEvents>("/root/HealthCharacterEvents");

            this.Initialize();
        }

        /// <summary>
        /// Initializes all data of the character
        /// </summary>
        /// <param name="setting">Setting of the character. Settings from a data initializer</param>
        public virtual void InitializeData(CharacterDataSetting setting)
        {
            this.CanMove = true;
            this.HealthCharacterEvents.BeInitialized(this,
                                                  new LifePoint(setting.Health.CurrentValue, setting.Health.MaxValue));
        }

        /// <summary>
        /// Hits the health of the character
        /// </summary>
        /// <param name="damageValue">Positive value to decrease</param>
        public void Hit(int damageValue)
        {
            this.MainHealth.Hit(damageValue);
        }

        /// <summary>
        /// Restore life value on current one
        /// </summary>
        /// <param name="value">Positive value to increase</param>
        public void Restore(int value)
        {
            this.MainHealth.Restore(value);
        }

        /// <summary>
        /// Activates Die method when main health is gone
        /// </summary>
        /// <param name="sender"></param>
        public virtual void Die(Godot.Object sender = null)
        {
            this.DoDie();
            this.HealthCharacterEvents.BeDied(this);
            this.AnimationIsActive = false;
        }

        /// <summary>
		/// Plays an animation in the player node
		/// </summary>
		/// <param name="animation">Key of the animation</param>
		public virtual void PlayAnimation(string animation) { }

        /// <summary>
        /// Defines the direction of the animated sprite
        /// </summary>
        public virtual void ChangeDirectionAnimation(bool isLeft = true, bool isVertical = false) { }
        #endregion

        #region Internal methods
        /// <summary>
        /// Allows you to add more initialize settings
        /// </summary>
        protected virtual void Initialize() 
        {
            this.MainHealth.Connect(nameof(Health.HealthChanged), this, nameof(HealthIsChanged));
            this.MainHealth.Connect(nameof(Health.LifeIsGone), this, nameof(GoneLife));
        }

        protected virtual void HealthIsChanged(LifePoint point)
        {
            // TODO: 15/08/2020, play hint animation
            this.HealthCharacterEvents.BeChanged(this, point);
        }

        protected virtual void GoneLife(Godot.Object sender)
        {
            this.Die(sender);
        }

        /// <summary>
        ///  Overrides it to add custom code about the death of the character
        /// </summary>
        protected virtual void DoDie() 
        {
            this.CanMove = false;
        }
        #endregion

        #region Properties
        public Vector2 Velocity { get => this._velocity; protected set => this._velocity = value; }

        /// <summary>
        /// How fast the player will move (pixels/sec)
        /// </summary>
        [Export]
        public int Speed { get; set; } = 300;

        /// <summary>
        /// Health of each character. You can override this property.
        /// </summary>
        public Health MainHealth { get => this._health; protected set => this._health = value; }

        /// <summary>
        /// True if the user is alive and rights to move
        /// </summary>
        public bool CanMove { get; set; } = true;

        /// <summary>
        /// Sets this flag to ignore other animation during the current
        /// </summary>
        protected bool AnimationIsActive { get => _animationIsActive; set => _animationIsActive = value; }

        /// <summary>
        /// Accessor to the singleton to gets all events of character health
        /// </summary>
        public HealthCharacterEvents HealthCharacterEvents => _healthCharacterEvents;
        #endregion
    }
}
