using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts.State;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Scripts;
using ladiagonaledupoulpe.Sources.App.Core.Models.Games;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Configurations.Characters;
using ladiagonaledupoulpe.Sources.App.Core.Models.Synales;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using ladiagonaledupoulpe.Sources.App.Shared.Plugins;
using System;
using System.Diagnostics;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts
{
	/// <summary>
	/// Current player with animated sprite in the game
	/// </summary>
	public class Player : BaseCharacter
	{
		#region Constants
		#endregion

		#region Fields
		private RulesSet _rules = null;
		private Synale _synalePower = null;
		private AnimatedSprite _animatedSprite = null;
		private StateMachinePlayer _stateMachine = null;
		private PlayerCharacterDataSetting _lastSettings = null;

		#region Signals
		/// <summary>
		/// Connect to this signal to get the init power point 
		/// </summary>
		[Signal]
		public delegate void SynaleInitialized(PowerPoint point);
		#endregion
		#endregion

		#region Public methods
		/// <summary>
		/// Puts player on the scene, with defaults settings
		/// </summary>
		/// <param name="position"></param>
		public void PutOnScene(Vector2 position, int zindex = 1)
		{
			this.Position = position;
			this.ZIndex = zindex;
		}

		public override void _Ready()
		{
			base._Ready();
			this._stateMachine = new StateMachinePlayer(this);
			this._animatedSprite = this.GetNode<AnimatedSprite>("AnimatedSprite");

			this._rules = this.GetNode<Game>("/root/CurrentGame").RulesSet;

			this._synalePower = new Synale();
			this.AddChild(this._synalePower);
		}

		public override void _PhysicsProcess(float delta)
		{
			base._PhysicsProcess(delta);

			if (this.CanMove)
			{
				Vector2 vector = Vector2.Zero;

				vector.x = Input.GetActionStrength("ui_right") - Input.GetActionStrength("ui_left");
				vector.y = Input.GetActionStrength("ui_down") - Input.GetActionStrength("ui_up");

				this.Velocity = Vector2.Zero;
				if (vector != Vector2.Zero)
				{
					this.Velocity = vector;
				}

				var collision = this.MoveAndCollide(this.Velocity.Normalized() * this.Speed);
			}
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

		public override void InitializeData(CharacterDataSetting setting)
		{
			this._lastSettings = setting as PlayerCharacterDataSetting;

			this.InitializeLifeData(this._lastSettings);
			this.InitializeSynaleData(this._lastSettings);
		}
		#endregion

		#region Internal methods
		protected override void Initialize()
		{
			base.Initialize();
		}

		private void InitializeLifeData(PlayerCharacterDataSetting playerSetting)
		{
			this.MainHealth.Initialize(playerSetting.Health.CurrentValue, playerSetting.Health.MaxValue);
			this._stateMachine.Initialize();

			base.InitializeData(playerSetting);
		}

		private void InitializeSynaleData(PlayerCharacterDataSetting playerSetting)
		{
			var point = new PowerPoint(playerSetting.SynalePower.CurrentValue, playerSetting.SynalePower.MaxValue);

			this._synalePower.Initialize(point);
			this.EmitSignal(nameof(SynaleInitialized), point);
		}

		protected override void DoDie()
		{
			if(! this._synalePower.ActToReborn() )
			{
				base.DoDie();
				this._stateMachine.Die();
			}
		}
		#endregion

		#region Properties
		#endregion
	}
}
