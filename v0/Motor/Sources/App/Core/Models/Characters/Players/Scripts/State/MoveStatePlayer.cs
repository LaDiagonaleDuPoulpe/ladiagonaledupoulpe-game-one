using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Scripts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts.State
{
    public abstract class MoveStatePlayer : BaseStatePlayer
    {
        #region Constructors
        public MoveStatePlayer(StateMachinePlayer playerState, BaseCharacter character) : base(playerState, character)
        {
        }
        #endregion

        #region Public methods
        #endregion

        #region Internal methods
        /// <summary>
        /// Detected idle state of the player, and changes it if it's in idle state
        /// </summary>
        /// <returns>True if idle state is set</returns>
        protected virtual bool DetectAndChangeIdleState()
        {
            bool isIdle = false;

            if (this.GetVelocityValue() == 0)
            {
                this.PlayerState.ChangeState(new IdleStatePlayer(this.PlayerState, this.Character)
                {
                    CurrentDirection = this.CurrentDirection
                });

                isIdle = true;
            }

            return isIdle;
        }

        /// <summary>
        /// Gets the velocity value to control idle state
        /// </summary>
        /// <returns></returns>
        protected abstract float GetVelocityValue();
        #endregion
    }
}
