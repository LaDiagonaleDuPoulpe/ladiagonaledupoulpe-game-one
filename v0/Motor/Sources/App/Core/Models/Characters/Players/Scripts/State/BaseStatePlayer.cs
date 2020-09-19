using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Scripts;
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
    public abstract class BaseStatePlayer : IStatePlayer
    {
        #region Fields
        private StateMachinePlayer _playerState = null;
        private BaseCharacter _character = null;
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
        #endregion
    }
}
