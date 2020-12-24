using ladiagonaledupoulpe.Sources.App.Core.Interfaces.Models.States;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts.State
{
    /// <summary>
    /// State machine to manage all states of the player
    /// </summary>
    public class StateMachinePlayer
    {
        #region Fields
        private IStateCharacter _state = null;
        private Player _player = null;
        private bool _canPlay = true;
        #endregion

        #region Constructors
        public StateMachinePlayer(Player player)
        {
            this._player = player;
            this.Initialize();
        }
        #endregion

        #region Public methods
        /// <summary>
        /// Starts the state of the player
        /// </summary>
        public void Initialize()
        {
            this._canPlay = true;

            var lastDirection = Direction.Left;
            if (this._state != null)
            {
                lastDirection = this._state.CurrentDirection;
            }

            this.ChangeState(new IdleStatePlayer(this, this._player) { CurrentDirection = lastDirection  } );
        }

        /// <summary>
        /// Changes the current state of the player
        /// </summary>
        /// <param name="newState">New state of the player</param>
        public void ChangeState(IStateCharacter newState)
        {
            this._state = newState;
        }

        /// <summary>
        /// Handles the input of the player
        /// </summary>
        public void HandleInput()
        {
            this._state?.HandleInput();
        }

        /// <summary>
        /// Plays animation of the current state
        /// </summary>
        public void Play()
        {
            if (this._canPlay)
            {
                this._state?.Play();
            }
        }

        /// <summary>
        /// The player tries to reborn 
        /// </summary>
        public void TryToReborn()
        {
            this.ChangeState(new ReloadingPowerStatePlayer(this, this._player) 
            { 
                CurrentDirection = this._state.CurrentDirection 
            });
        }

        /// <summary>
        /// Change the state to die state
        /// </summary>
        public void Die()
        {
            this.ChangeState(new DiedStatePlayer(this, this._player)
            {
                CurrentDirection = this._state.CurrentDirection
            });
        }

        /// <summary>
        /// There will be no state with this
        /// </summary>
        public void Stop()
        {
            this._state = null;
            this._canPlay = false;
        }
        #endregion

        #region Properties
        /// <summary>
        /// Current state in the machine state
        /// </summary>
        public IStateCharacter CurrentState { get => this._state; }
        #endregion
    }
}
