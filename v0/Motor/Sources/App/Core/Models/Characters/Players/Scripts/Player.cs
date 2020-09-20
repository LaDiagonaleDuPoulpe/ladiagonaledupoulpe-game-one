using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts.State;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Scripts;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using System;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts
{
	/// <summary>
	/// Current player with animated sprite in the game
	/// </summary>
	public class Player : BaseCharacter
	{
		#region Constants
		const string IDLE_STATE_KEY = "idle";
		const string LEFT_ANIMATION_KEY = "left";
		const string DOWN_ANIMATION_KEY = "down";
		const string UP_ANIMATION_KEY = "up";
		#endregion

		#region Fields
		private AnimatedSprite _animatedSprite = null;
		private StateMachinePlayer _stateMachine = null;
		#region Signals
		/// <summary>
		/// Observes this event to know when health changed (plus or less)
		/// </summary>
		/// <param name="health">New health</param>
		[Signal]
		public delegate void HealthChanged(LifePoint point);

		/// <summary>
		/// Observes this event to know when here is no life
		/// </summary>
		[Signal]
		public delegate void IsGone();
		#endregion

		private string _lastAnimation = LEFT_ANIMATION_KEY;
		#endregion

		#region Public methods
		public override void _Ready()
		{
			base._Ready();
			this._stateMachine = new StateMachinePlayer(this);
			this._animatedSprite = this.GetNode<AnimatedSprite>("AnimatedSprite");
		}

		public override void _PhysicsProcess(float delta)
		{
			base._PhysicsProcess(delta);

			Vector2 vector = Vector2.Zero;

			vector.x = Input.GetActionStrength("ui_right") - Input.GetActionStrength("ui_left");
			vector.y = Input.GetActionStrength("ui_down") - Input.GetActionStrength("ui_up");

			this.Velocity = Vector2.Zero;
			if (vector != Vector2.Zero)
			{
				this.Velocity = vector;
			}

			this.MoveAndCollide(this.Velocity.Normalized() * this.Speed);
		}

		public override void _Process(float delta)
		{
			this._stateMachine.HandleInput();
			this._stateMachine.Play();
		}

		/// <summary>
		/// Plays an animation in the player node
		/// </summary>
		/// <param name="animation">Key of the animation</param>
		public override void PlayAnimation(string animation)
		{
			this._animatedSprite.Play(animation);
		}

		public override void ChangeDirectionAnimation(bool isRight = true, bool isVertical = false)
		{
			this._animatedSprite.FlipV = isVertical;
			this._animatedSprite.FlipH = isRight;
		}
		#endregion

		#region Internal methods
		protected override void Initialize()
		{
			base.Initialize();
		}

		protected override void Die()
		{
			base.Die();
			this._stateMachine.Die();
		}
		#endregion
	}
}
