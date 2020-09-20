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
        public override void HandleInput()
        {
			
        }

        public override void Play()
        {
            
		}
        #endregion
    }
}
