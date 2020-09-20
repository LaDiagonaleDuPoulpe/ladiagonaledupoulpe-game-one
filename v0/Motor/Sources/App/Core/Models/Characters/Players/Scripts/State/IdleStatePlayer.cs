using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Scripts;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
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
            IStatePlayer newState = null;

            if (this.Character.Velocity.x != 0)
            {
                Direction direction = this.Character.Velocity.x > 0 ? Direction.Right : Direction.Left;

                newState = new HorizontalMoveStatePlayer(this.PlayerState, this.Character) 
                           { 
                                CurrentDirection = direction
                            };
                this.PlayerState.ChangeState(newState);
            }

            //else if (this.Velocity.y != 0)
            //{
            //	this._lastAnimation = UP_ANIMATION_KEY;
            //	if (this.Velocity.y > 0)
            //	{
            //		this._lastAnimation = DOWN_ANIMATION_KEY;
            //	}
            //}

            //if (!string.IsNullOrEmpty(this._lastAnimation))
            //{
            //	animation = $"{prefix}{this._lastAnimation}";
            //	this._animatedSprite.Play(animation);
            //}
        }

        public override void Play()
        {
            this.Character.PlayAnimation($"idle_left");
        }
        #endregion
    }
}
