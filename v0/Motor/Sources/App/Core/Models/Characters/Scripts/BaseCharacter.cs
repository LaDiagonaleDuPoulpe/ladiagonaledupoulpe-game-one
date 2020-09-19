using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Interfaces.Models.Attacks;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
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
        private Vector2 _velocity = Vector2.Zero;
        private Vector2 _screenSize;
        private Health _health = null;
        #endregion

        #region Public methods
        public override void _Ready()
        {
            base._Ready();
            this.ScreenSize = this.GetViewport().Size;
            this.MainHealth = this.GetNode<Health>("Health");

            this.Initialize();
        }

        /// <summary>
        /// Hits the health of the character
        /// </summary>
        /// <param name="damageValue"></param>
        public void Hit(int damageValue)
        {
            this.MainHealth.Hit(damageValue);
        }

        /// <summary>
		/// Plays an animation in the player node
		/// </summary>
		/// <param name="animation">Key of the animation</param>
		public virtual void PlayAnimation(string animation) { }
        #endregion

        #region Internal methods
        /// <summary>
        /// Allows you to add more initialize settings
        /// </summary>
        protected virtual void Initialize() 
        {
            this.MainHealth.Connect(CharacterLifeSignal.HealthChanged.ToString(), this, nameof(HealthIsChanged));
            this.MainHealth.Connect(CharacterLifeSignal.LifeIsGone.ToString(), this, nameof(HealthIsGone));

            // TODO: 20/08/2020, initialize with real values (from api ?)
            this.MainHealth.Initialize(300, 300);
        }

        protected virtual void HealthIsChanged(LifePoint point)
        {
            // TODO: 15/08/2020, play hint animation
            this.EmitSignal(CharacterLifeSignal.HealthChanged.ToString(), point);
        }

        protected virtual void HealthIsGone()
        {
            this.Die();
            this.EmitSignal(CharacterLifeSignal.LifeIsGone.ToString());
        }

        /// <summary>
        ///  Overrides it to add custom code about the death of the character
        /// </summary>
        protected virtual void Die() {}
        #endregion

        #region Properties
        public Vector2 Velocity { get => this._velocity; protected set => this._velocity = value; }

        /// <summary>
        /// Size of the game window.
        /// </summary>
        public Vector2 ScreenSize
        {
            get => this._screenSize;
            private set => this._screenSize = value;
        }

        /// <summary>
        /// How fast the player will move (pixels/sec)
        /// </summary>
        [Export]
        public int Speed { get; set; } = 300;

        /// <summary>
        /// Health of each character. You can override this property.
        /// </summary>
        public Health MainHealth { get => this._health; protected set => this._health = value; }
        #endregion
    }
}
