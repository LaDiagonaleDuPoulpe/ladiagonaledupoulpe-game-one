using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts.State
{
    public class StateMachinePlayer
    {
        #region Fields
        private IStatePlayer _state = null;
        private Player _player = null;
        #endregion

        #region Constructors
        public StateMachinePlayer(Player player)
        {
            this._player = player;
            this.ChangeState(new IdleStatePlayer(this, player) { CurrentDirection = Direction.Left  } );
        }
        #endregion

        #region Public methods
        /// <summary>
        /// Changes the current state of the player
        /// </summary>
        /// <param name="newState">New state of the player</param>
        public void ChangeState(IStatePlayer newState)
        {
            this._state = newState;
        }

        public void HandleInput()
        {
            this._state?.HandleInput();
        }

        public void Play()
        {
            this._state?.Play();
        }

        public void Die()
        {
            this._state = new DiedStatePlayer(this, this._player);
        }
        #endregion
    }
}
