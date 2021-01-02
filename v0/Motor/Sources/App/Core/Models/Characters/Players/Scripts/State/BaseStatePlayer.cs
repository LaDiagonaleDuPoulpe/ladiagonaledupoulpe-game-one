using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Scripts;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Models.States;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts.State
{
    /// <summary>
    ///  Parent of all states of the player
    /// </summary>
    public abstract class BaseStatePlayer : IStateCharacter
    {
        #region Fields
        private StateMachinePlayer _playerState = null;
        private BaseCharacter _character = null;
        private string _currentAction = string.Empty;
        #endregion

        #region Constructors
        public BaseStatePlayer(StateMachinePlayer playerState, BaseCharacter character)
        {
            this._playerState = playerState;
            this._character = character;
        }
        #endregion

        #region Public methods
        public abstract void Play();

        public abstract void HandleInput();
        #endregion

        #region Properties
        /// <summary>
        /// Gets the player state machine
        /// </summary>
        protected StateMachinePlayer PlayerState { get => this._playerState; }

        /// <summary>
        /// Gets the current character (player)
        /// </summary>
        protected BaseCharacter Character { get => this._character; }

        /// <summary>
        /// Gets the current action of the player
        /// </summary>
        public string CurrentAction { get => _currentAction; set => _currentAction = value; }

        /// <summary>
        /// Gets current direction
        /// </summary>
        public Direction CurrentDirection { get; set; }
        #endregion
    }
}
