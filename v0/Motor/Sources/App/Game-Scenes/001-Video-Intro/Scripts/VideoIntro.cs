using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Base.Scenes;
using ladiagonaledupoulpe.Sources.App.Core.Interfaces.Configurations;
using ladiagonaledupoulpe.Sources.App.Shared.Constants;
using System;

/// <summary>
/// Scene with introduction video : it's the second scene, launching on new game
/// </summary>
public class VideoIntro : BaseActiveScene
{
	#region Public methods
	public override void _Input(InputEvent @event)
	{
		base._Input(@event);
		if (@event.IsActionPressed(KeyPressActionKeys.PressCancel))
		{
			this.GoToNextScene();
		}
	}
	#endregion

	#region Internal methods
	private void _on_VideoPlayer_finished()
	{
		this.GoToNextScene();
	}

	private void _on_VideoPlayer_gui_input(InputEvent action) {}

	private void GoToNextScene() 
	{
		VideoPlayer player = this.GetNode<VideoPlayer>("VideoPlayer");
		player.Stop();

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
