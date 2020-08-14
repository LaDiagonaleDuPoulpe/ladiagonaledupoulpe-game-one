﻿using Godot;
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
    public abstract class BaseCharacter : KinematicBody2D
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
            this.Health = this.GetNode<Health>("Health");
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

        public Health Health { get => this._health; protected set => this._health = value; }
        #endregion
    }
}
