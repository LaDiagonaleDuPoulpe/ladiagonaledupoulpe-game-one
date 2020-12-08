using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Scripts;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts.State
{
    public class RebornStatePlayer : BaseStatePlayer
    {
        #region Constructors
        public RebornStatePlayer(StateMachinePlayer playerState, BaseCharacter character) : base(playerState, character)
        {
        }
        #endregion

        #region Public methods
        public override void HandleInput() {}

        public override void Play()
        {
            Direction currentDirection = this.CurrentDirection;
            this.Character.PlayAnimation($"reborn_{currentDirection.ToString().ToLower()}");
        }
        #endregion
    }
}
