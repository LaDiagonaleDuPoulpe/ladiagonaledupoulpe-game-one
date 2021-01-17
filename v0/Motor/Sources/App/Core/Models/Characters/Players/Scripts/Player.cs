using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts.State;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Scripts;
using ladiagonaledupoulpe.Sources.App.Core.Models.Games;
using ladiagonaledupoulpe.Sources.App.Core.Models.Quests.Rewards;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Configurations.Characters;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Games;
using ladiagonaledupoulpe.Sources.App.Core.Models.Synales;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.CheckPoints;
using ladiagonaledupoulpe.Sources.App.Shared.Plugins;
using ladiagonaledupoulpe.Sources.App.Shared.Signals;
using ladiagonaledupoulpe.Sources.App.Shared.Tools.ExtensionMethods;
using System;
using System.Diagnostics;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts
{
	/// <summary>
	/// Current player with animated sprite in the game
	/// </summary>
	public class Player : BaseCharacter, IMemento
	{
		#region Constants
		#endregion

		#region Fields
		private SynaleEvents _synaleEvents = null;
		private RulesSet _rules = null;
		private Synale _synalePower = null;
		private LoadingPower _loadingPower = null;
		private RebornPower _rebornPower = null;
		private AnimatedSprite _animatedSprite = null;
		private StateMachinePlayer _stateMachine = null;
		private PlayerCharacterDataSetting _lastSettings = null;
		private Timer _dyingTimer = null;
		private Timer _rebornTimer = null;
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
			this.ConfigureReloadingPower();

			this._rules = this.GetRootNode<Game>("CurrentGame").RulesSet;

			this.AttachQuestEvents();

			this._synaleEvents = this.GetRootNode<SynaleEvents>();
			this.AddSynale();
		}

		private void AttachQuestEvents()
		{
			QuestEvents questEvents = this.GetRootNode<QuestEvents>();
			questEvents.AttachRewardsArePublishing(this, nameof(QuestEvents_RewardsArePublishing));
			questEvents.AttachRewardsHaveBeenCollected(this, nameof(QuestEvents_RewardsHaveBeenCollected));
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
		/// Initializes life data of the player
		/// Starts the state motor
		/// </summary>
		/// <param name="playerSetting"></param>
		public void InitializeLifeData(PlayerCharacterDataSetting playerSetting)
		{
			this.MainHealth.Initialize(playerSetting.Health.CurrentValue, playerSetting.Health.MaxValue);
			this._stateMachine.Initialize();

			base.InitializeData(playerSetting);
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

		public CheckPointSetting GenerateMemento()
		{
			return new CheckPointSetting()
			{
				Player = this._lastSettings
			};
		}
		#endregion

		#region Internal methods
		private void _on_AnimatedSprite_animation_finished() {}

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
			this._rebornPower.Start();
		}

		private void ConfigureLoadingPower()
		{
			this._loadingPower = this.GetNode<LoadingPower>("LoadingPower");
			this._loadingPower.Connect(nameof(LoadingPower.NoPowerAnimationCompleted), this, nameof(LoadingPower_NoPowerAnimationCompleted));
		}

		private void ConfigureReloadingPower()
		{
			this._rebornPower = this.GetNode<RebornPower>("RebornPower");
			this._rebornPower.Connect(nameof(RebornPower.RebornIsReady), this, nameof(rebornPower_RebornIsReady));
			this._rebornPower.Stop();
		}

		private void LoadingPower_NoPowerAnimationCompleted()
		{
			this.Die();
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
			this._synaleEvents.BeInitialized(this, point);
		}

		private void Synale_SynalePowerUpdated(PowerPoint point)
		{
			this._synaleEvents.BeUpdated(this, point);
		}

		protected override void GoneLife(Godot.Object sender)
		{
			base.DoDie();
			this._stateMachine.TryToReborn();
		}

		private void rebornPower_RebornIsReady()
		{
			this.CanMove = true;
			this.AnimationIsActive = false;
			this.SetSettingsFromLastCheckPoint();
		}

		private void SetSettingsFromLastCheckPoint()
		{
			this.HealthCharacterEvents.BeReborn(this);
		}

		private void QuestEvents_RewardsArePublishing(Godot.Collections.Array<QuestReward> items)
		{
			this.CanMove = false;
			this._stateMachine.Initialize();
		}

		private void QuestEvents_RewardsHaveBeenCollected()
		{
			this.CanMove = true;
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

