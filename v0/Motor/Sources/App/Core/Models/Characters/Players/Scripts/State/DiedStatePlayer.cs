using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Scripts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts.State
{
    public class DiedStatePlayer : BaseStatePlayer
    {
        #region Constructors
        public DiedStatePlayer(StateMachinePlayer playerState, BaseCharacter character) : base(playerState, character)
        {
        }
        #endregion

        #region Public methods
        public override void HandleInput()
        {
        }

        public override void Play()
        {
            this.Character.PlayAnimation("die_down");
        }
        #endregion
    }
}
