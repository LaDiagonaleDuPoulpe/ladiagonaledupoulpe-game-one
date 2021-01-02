using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Scripts;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Models.States;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts.State
{
    /// <summary>
    /// Idle state of the player : launches idle animation
    /// </summary>
    public class IdleStatePlayer : BaseStatePlayer
    {
        #region Constructors
        public IdleStatePlayer(StateMachinePlayer playerState, BaseCharacter character) : base(playerState, character)
        {
        }
        #endregion

        #region Public methods
        public override void HandleInput()
        {
            IStateCharacter newState = null;
            Direction direction;

            if (this.Character.Velocity.x != 0)
            {
                direction = this.Character.Velocity.x > 0 ? Direction.Right : Direction.Left;

                newState = new HorizontalMoveStatePlayer(this.PlayerState, this.Character)
                {
                    CurrentDirection = direction
                };
            }
            else if (this.Character.Velocity.y != 0)
            {
                direction = this.Character.Velocity.y > 0 ? Direction.Down : Direction.Up;

                newState = new VerticalMoveStatePlayer(this.PlayerState, this.Character)
                {
                    CurrentDirection = direction
                };
            }

            if (newState != null)
            { 
                this.PlayerState.ChangeState(newState);
            }
        }

        public override void Play()
        {
            Direction currentDirection = this.CurrentDirection;

            if (currentDirection == Direction.Right)
            {
                currentDirection = Direction.Left;
            }

            this.Character.PlayAnimation($"idle_{currentDirection.ToString().ToLower()}");
        }
        #endregion
    }
}
