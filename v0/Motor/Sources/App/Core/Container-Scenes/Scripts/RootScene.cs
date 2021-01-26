using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Base.Scenes;
using ladiagonaledupoulpe.Sources.App.Core.Models.Quests.Rewards;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Configurations.Levels;
using ladiagonaledupoulpe.Sources.App.Shared.Constants;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Initializers;
using ladiagonaledupoulpe.Sources.App.Shared.Plugins.Initializers;
using ladiagonaledupoulpe.Sources.App.Shared.Scenes.Dialog;
using ladiagonaledupoulpe.Sources.App.Shared.Services;
using ladiagonaledupoulpe.Sources.App.Shared.Services.Data;
using ladiagonaledupoulpe.Sources.App.Shared.Signals;
using ladiagonaledupoulpe.Sources.App.Shared.Tools.ExtensionMethods;
using System.Collections.Generic;
using System.Linq;

/// <summary>
/// Parent scene of all scenes. The scene will load other scenes inside it.
/// </summary>
public class RootScene : BaseScene
{
	#region Fields
	private Node2D _lastScene = null;
	private Timer _currentDyingTimer = null;
	private Camera2D _globalCamera = null;
	private DyingScene _dyingScene = null;
	private DisplayRewards _displayRewards = null;
	private QuestList _questList = null;
	private ColorRect _greyRectangle = null;
	#endregion

	#region Public methods
	public override void _Ready()
	{
		base._Ready();
		this.Initialize();
	}

	public override void _Input(InputEvent @event)
	{
		base._Input(@event);
	}

	public void PlayerDie(Godot.Object sender)
	{
		this._currentDyingTimer.Start(1.2F);
	}
	#endregion

	#region Internal methods
	private void Initialize()
	{
		this._dyingScene = this.GetNode<DyingScene>("DyingScene");
		this._currentDyingTimer = this.GetNode<Timer>("DyingTimer");
		this._globalCamera = this.GetNode<Camera2D>("MainCamera");
		this._displayRewards = this.GetNode<DisplayRewards>("DisplayRewards");
		this._greyRectangle = this.GetNode<ColorRect>("GreyRectangle");
		this._questList = this.GetNode<QuestList>("QuestList");

		this.AttachEvents();

		this.LoadingScene.Launch(new LevelConfiguration()
		{
			Key = "home"
		});
	}

	private void AttachEvents()
	{
		this.LoadingScene.Connect(nameof(LoadingScene.Begin), this, nameof(LoadingScene_Start));
		this.LoadingScene.Connect(nameof(LoadingScene.End), this, nameof(LoadingScene_End));
		this.ConnectToActivateCameraEvent(this._dyingScene);

		HealthCharacterEvents characterEvents = this.GetRootNode<HealthCharacterEvents>();
		characterEvents.AttachToDie(this, nameof(RootScene.PlayerDie));

		QuestEvents questEvents = this.GetRootNode<QuestEvents>();
		questEvents.AttachRewardsArePublishing(this, nameof(QuestEvents_RewardsArePublishing));
		questEvents.AttachRewardsHaveBeenCollected(this, nameof(QuestEvents_RewardsHaveBeenCollected));
		questEvents.AttachShowQuests(this, nameof(QuestEvents_ShowQuests));
	}

	private void LoadingScene_Start()
	{
		// nothing to do now
	}

	private void LoadingScene_End(Node2D nextScene)
	{
		this.RemoveLastScene();

		if (nextScene != null)
		{
			this.AddChild(nextScene);
			this._lastScene = nextScene;
			this.ConnectToActivateCameraEvent(nextScene);
		}
	}

	private void ConnectToActivateCameraEvent(Node2D scene)
	{
		scene.Connect(nameof(BaseActiveScene.ActivateCamera), this, nameof(ActivateCamera));
	}

	private void ActivateCamera(string cameraKey)
	{
		this._globalCamera.ClearCurrent();
		this._globalCamera.Current = true;
	}

	private void RemoveLastScene()
	{
		if (this._lastScene != null)
		{
			if (this._lastScene.IsConnected(nameof(BaseActiveScene.ActivateCamera), this, nameof(ActivateCamera)))
			{
				this._lastScene.Disconnect(nameof(BaseActiveScene.ActivateCamera), this, nameof(ActivateCamera));
			}

			this.RemoveChild(this._lastScene);
		}
	}

	private void DisplayDyingScene()
	{
		this.RemoveLastScene();
		this._dyingScene.Display();
	}

	private void _on_Timer_timeout()
	{
		this.DisplayDyingScene();
	}

	protected override void DefineCurrentCamera()
	{
		this._globalCamera.Current = true;
	}

	private void QuestEvents_RewardsArePublishing(Godot.Collections.Array<QuestReward> items)
	{
		this._greyRectangle.Visible = true;
		this._displayRewards.Visible = true;
	}

	private void QuestEvents_RewardsHaveBeenCollected()
	{
		this._greyRectangle.Visible = false;
		this._displayRewards.Visible = false;
	}

	private void QuestEvents_ShowQuests(bool isVisible)
	{
		this._questList.Visible = isVisible;
	}
	#endregion

	#region Properties
	#endregion
}



