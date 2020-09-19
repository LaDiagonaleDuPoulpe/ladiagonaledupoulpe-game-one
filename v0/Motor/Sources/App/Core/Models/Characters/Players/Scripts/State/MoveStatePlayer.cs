using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Scripts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts.State
{
    public class MoveStatePlayer : BaseStatePlayer
    {
        #region Constructors
        public MoveStatePlayer(StateMachinePlayer playerState, BaseCharacter character) : base(playerState, character)
        {
        }
        #endregion

        #region Public methods
        public override void HandleInput()
        {
			if (this.Character.Velocity.Length() <= 0)
            {
				this.PlayerState.ChangeState(new IdleStatePlayer(this.PlayerState, this.Character));
            }
        }

        public override void Play()
        {


			
		}
        #endregion
    }
}
