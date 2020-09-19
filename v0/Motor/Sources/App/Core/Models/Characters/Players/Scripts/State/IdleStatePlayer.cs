using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Scripts;
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
            IStatePlayer newState = new IdleStatePlayer(this.PlayerState, this.Character);

            if (this.Character.Velocity.x != 0)
            {
                newState = new LeftMoveStatePlayer(this.PlayerState, this.Character);
                //this._lastAnimation = LEFT_ANIMATION_KEY;
                //this._animatedSprite.FlipV = false;
                //this._animatedSprite.FlipH = this.Velocity.x > 0;
            }

            this.PlayerState.ChangeState(newState);
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
            this.Character.PlayAnimation("idle_left");
        }
        #endregion
    }
}
