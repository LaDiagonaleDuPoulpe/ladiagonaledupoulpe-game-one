using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Scripts;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts.State
{
    public class HorizontalMoveStatePlayer : MoveStatePlayer
    {
        #region Constructors
        public HorizontalMoveStatePlayer(StateMachinePlayer playerState, BaseCharacter character) : base(playerState, character)
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
                this.CurrentDirection = this.Character.Velocity.x > 0 ? Direction.Right : Direction.Left;
            }
        }

        public override void Play()
        {
            this.Character.PlayAnimation($"move_left");
            this.Character.ChangeDirectionAnimation(this.CurrentDirection == Shared.Enums.Direction.Right);
        }

        protected override float GetVelocityValue()
        {
            return this.Character.Velocity.x;
        }
        #endregion
    }
}
