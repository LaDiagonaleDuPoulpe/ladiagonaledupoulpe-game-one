using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Interfaces.Models.Attacks;
using System;
using System.Collections.Generic;
using System.Linq;
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
        #endregion

        #region Internal methods
        /// <summary>
        /// Allows you to add more initialize settings
        /// </summary>
        protected virtual void Initialize() 
        {
            // TODO: 20/08/2020, initialize with real values (from api ?)
            this.MainHealth.Initialize(100);
        }

        /// <summary>
        /// Hits the health of the character
        /// </summary>
        /// <param name="damageValue"></param>
        public void Hit(int damageValue)
        {
            GD.Print("BaseCharacter : damage : ", damageValue);
            this.MainHealth.Hit(damageValue);
        }
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
