using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Base.Scenes;
using ladiagonaledupoulpe.Sources.App.Core.Interfaces.Configurations;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts;
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
		this.LoadingScene.Launch(new LevelConfiguration()
		{
			Key = "video-intro"
		});
	}
    #endregion

    #region Properties
    public override bool RootNodesVisibility => false;
    #endregion
}
