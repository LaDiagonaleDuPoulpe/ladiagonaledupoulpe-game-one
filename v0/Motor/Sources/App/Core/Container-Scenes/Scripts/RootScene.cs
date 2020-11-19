using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Base.Scenes;
using ladiagonaledupoulpe.Sources.App.Core.Interfaces.DialogBox;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Configurations.Levels;
using ladiagonaledupoulpe.Sources.App.Shared.Constants;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Initializers;
using ladiagonaledupoulpe.Sources.App.Shared.Plugins.Initializers;
using ladiagonaledupoulpe.Sources.App.Shared.Scenes.Dialog;
using ladiagonaledupoulpe.Sources.App.Shared.Services;
using ladiagonaledupoulpe.Sources.App.Shared.Services.Data;
using System.Collections.Generic;
using System.Linq;

/// <summary>
/// Parent scene of all scenes. The scene will load other scenes inside it.
/// </summary>
public class RootScene : BaseScene
{
	#region Fields
	private Node2D _lastScene = null;
	private ProxyDataInitializer _globalDataInitializer = null;
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
	#endregion

	#region Internal methods
	private void Initialize()
	{
		this.LoadingScene.Connect(LoadingActionsType.Begin.ToString(), this, nameof(LoadingScene_Start));
		this.LoadingScene.Connect(LoadingActionsType.End.ToString(), this, nameof(LoadingScene_End));

		this.LoadingScene.Launch(new LevelConfiguration()
		{
			Key = "home"
		});
	}

	private void LoadingScene_Start()
	{
		// nothing to do now
	}

	private void LoadingScene_End(Node2D nextScene)
	{
		if (this._lastScene != null)
		{
			this.RemoveChild(this._lastScene);
		}
		this.AddChild(nextScene);

		this._lastScene = nextScene;
	}
	#endregion

	#region Properties
	#endregion
}
