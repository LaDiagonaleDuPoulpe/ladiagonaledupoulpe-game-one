using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Base.Scenes;
using ladiagonaledupoulpe.Sources.App.Core.Interfaces.Configurations;
using ladiagonaledupoulpe.Sources.App.Core.Interfaces.DialogBox;
using ladiagonaledupoulpe.Sources.App.Shared.Constants;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Initializers;
using ladiagonaledupoulpe.Sources.App.Shared.Plugins.Initializers;
using ladiagonaledupoulpe.Sources.App.Shared.Scenes.Dialog;
using ladiagonaledupoulpe.Sources.App.Shared.Services;
using System.Collections.Generic;
using System.Linq;

/// <summary>
/// Parent scene of all scenes. The scene will load other scenes inside it.
/// </summary>
public class RootScene : BaseScene
{
	#region Fields
	private Node2D _lastScene = null;
	private GlobalDataInitializer _globalDataInitializer = null;
	#endregion

	#region Public methods
	public override void _Ready()
	{
		base._Ready();

		this._globalDataInitializer = this.GetNode<GlobalDataInitializer>("/root/GlobalDataInitializer");

		this.Initialize();

		this._globalDataInitializer.Load();
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

		this._globalDataInitializer.Connect(LoadDataType.DataLoaded.ToString(), this, nameof(globalDataInitializer_DataLoaded));
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

	private void globalDataInitializer_DataLoaded(Godot.Object sender, Godot.Object data)
    {
		this.LoadingScene.Launch(new LevelConfiguration()
		{
			Key = "home"
		});
	}
	#endregion

	#region Properties
	#endregion
}
