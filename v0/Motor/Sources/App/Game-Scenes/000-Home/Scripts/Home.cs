using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Base.Scenes;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Configurations.Levels;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using System;

/// <summary>
/// Home scene with menu to new game, load game
/// </summary>
public class Home : BaseActiveScene
{
	#region Fields
	#endregion

	#region Public methods
	public override void _Ready()
	{
		base._Ready();

	}
	#endregion

	#region Internal methods
	private void _on_BtnNewParty_pressed() 
	{
		this.LoadMainData(DataInitializerStep.NewGame);
	}

	protected override void ExecuteAfterDataLoaded()
	{
		this.LoadingScene.Launch(new LevelConfiguration()
		{
			Key = this.CurrentSetting.NextSceneAsKey
		});
	}
	#endregion

	#region Properties
	public override bool RootNodesVisibility => false;
	#endregion
}
