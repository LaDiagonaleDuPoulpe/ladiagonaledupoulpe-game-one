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
		private LoadingPower _loadingPower = null;
		private AnimatedSprite _animatedSprite = null;
		private StateMachinePlayer _stateMachine = null;
		private PlayerCharacterDataSetting _lastSettings = null;
		private Timer _dyingTimer = null;
		private Timer _rebornTimer = null;
		#region Signals
		/// <summary>
		/// Connect to this signal to get the init power point 
		/// </summary>
		[Signal]
		public delegate void SynaleInitialized(PowerPoint point);

		/// <summary>
		/// Update the power of the synale
		/// </summary>
		/// <param name="point"></param>
		[Signal]
		public delegate void SynalePowerUpdated(PowerPoint point);
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

			this.PrepareTimers();
			this.ConfigureLoadingPower();

			this._rules = this.GetNode<Game>("/root/CurrentGame").RulesSet;

			this.AddSynale();
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
			if (! this.AnimationIsActive)
			{
				this._stateMachine.HandleInput();
				this._stateMachine.Play();
			}
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

		/// <summary>
		/// Launches animation to show the reloading power 
		/// </summary>
		public void ActivateSynalePower()
		{
			Timer activeTimer = this._dyingTimer;
			this.AnimationIsActive = true;
			this._loadingPower.Visible = true;

			bool canReborn = this._synalePower.ActToReborn();

			if (canReborn)
			{
				activeTimer = this._rebornTimer;
			}
			activeTimer.Start();
		}

		public override void Die(Godot.Object sender = null)
		{
			this._loadingPower.Visible = false;

			this._stateMachine.Die();
			base.Die(sender);
		}

		private void _on_AnimatedSprite_animation_finished()
		{
		}
		#endregion

		#region Internal methods
		protected override void Initialize()
		{
			base.Initialize();
		}

		private void _on_DyingTimer_timeout()
		{
			this._dyingTimer.Stop();
			this._loadingPower.ActivateNoPowerAnimation();
		}

		private void _on_RebornTimer_timeout()
		{
			this._rebornTimer.Stop();
			this._loadingPower.Visible = false;
		}

		private void ConfigureLoadingPower()
		{
			this._loadingPower = this.GetNode<LoadingPower>("LoadingPower");
			this._loadingPower.Connect(nameof(LoadingPower.NoPowerAnimationCompleted), this, nameof(LoadingPower_NoPowerAnimationCompleted));
		}

		private void LoadingPower_NoPowerAnimationCompleted()
		{
			this.Die();
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
		}

		private void AddSynale()
		{
			this._synalePower = new Synale();
			this.AddChild(this._synalePower);

			this._synalePower.Connect(nameof(Synale.SynaleInitialized), this, nameof(Synale_SynaleInitialized));
			this._synalePower.Connect(nameof(Synale.SynalePowerUpdated), this, nameof(Synale_SynalePowerUpdated));
		}

		private void PrepareTimers()
		{
			this._dyingTimer = this.GetNode<Timer>("DyingTimer");
			this._rebornTimer = this.GetNode<Timer>("RebornTimer");
		}

		private void Synale_SynaleInitialized(PowerPoint point)
		{
			this.EmitSignal(nameof(SynaleInitialized), point);
		}

		private void Synale_SynalePowerUpdated(PowerPoint point)
		{
			this.EmitSignal(nameof(SynalePowerUpdated), point);
		}

		protected override void GoneLife(Godot.Object sender)
		{
			base.DoDie();
			this._stateMachine.TryToReborn();
		}
		#endregion

		#region Properties
		/// <summary>
		/// True if player can reborn
		/// </summary>
		public bool CanReborn
		{
			get => this._synalePower.IsValid;
		}
		#endregion
	}
}

