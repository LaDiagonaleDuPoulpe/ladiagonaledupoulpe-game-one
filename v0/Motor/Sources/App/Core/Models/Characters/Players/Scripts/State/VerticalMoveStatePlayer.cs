using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Scripts;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts.State
{
    public class VerticalMoveStatePlayer : MoveStatePlayer
    {
        #region Constructors
        public VerticalMoveStatePlayer(StateMachinePlayer playerState, BaseCharacter character) : base(playerState, character)
        {
        }
        #endregion

        #region Public methods
        public override void HandleInput()
        {
            bool isIdle = false;

            isIdle = this.DetectAndChangeIdleState();

            if (! isIdle)
            {
                this.CurrentDirection = this.Character.Velocity.y > 0 ? Direction.Down : Direction.Up;
            }
        }

        public override void Play()
        {
            this.Character.PlayAnimation($"move_{this.CurrentDirection.ToString().ToLower()}");
        }

        protected override float GetVelocityValue()
        {
            return this.Character.Velocity.y;
        }
        #endregion
    }
}
