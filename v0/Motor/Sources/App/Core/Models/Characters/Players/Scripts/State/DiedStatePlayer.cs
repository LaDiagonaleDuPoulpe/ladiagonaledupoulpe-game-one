using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Scripts;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
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
            Direction currentDirection = this.CurrentDirection;
            
            if (currentDirection == Direction.Right)
            {
                currentDirection = Direction.Left;
            }

            this.Character.PlayAnimation($"die_{currentDirection.ToString().ToLower()}");
            this.PlayerState.Stop();
        }
        #endregion
    }
}
