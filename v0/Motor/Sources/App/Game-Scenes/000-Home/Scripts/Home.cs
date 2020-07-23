using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Base.Scenes;
using ladiagonaledupoulpe.Sources.App.Core.Interfaces.Configurations;
using System;

/// <summary>
/// Home scene with menu to new ame, load game
/// </summary>
public class Home : BaseActiveScene
{
	#region Internal methods
	private void _on_BtnNewParty_pressed() 
	{
		this.LoadingScene.Launch(new LevelConfiguration()
		{
			Key = "video-intro"
		});
	}
	#endregion 
}
