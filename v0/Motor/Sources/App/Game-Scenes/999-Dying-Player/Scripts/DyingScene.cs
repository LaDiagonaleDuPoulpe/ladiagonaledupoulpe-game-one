using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Base.Scenes;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Configurations.Levels;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using System;

public class DyingScene : BaseActiveScene
{
	#region Public methods
	public override void _Ready()
	{
		base._Ready();
		this.DefineCurrentCamera();
	}

	/// <summary>
	/// Displays the scene
	/// </summary>
	public void Display()
	{
		this.DefineVisibilityOfNodes();
		this.ActivateMainCamera();
		this.PutPlayerAtTheCenter();
	}
	#endregion

	#region Internal methods
	private void PutPlayerAtTheCenter()
	{
		
	}

	private void DefineVisibilityOfNodes()
	{
		this.Visible = true;
		this.SetVisibilityGlobalNodes(false);
		this.AutoLoaderAccessor.CurrentPlayer.Visible = true;
	}
	
	private void _on_gotohome_pressed()
	{
		this.Visible = false;
		this.LoadingScene.Launch(new LevelConfiguration()
		{
			Key = "home"
		});		
	}
	
	private void _on_newgame_pressed()
	{
		this.LoadMainData(DataInitializerStep.NewGame);
	}

	protected override void ExecuteAfterDataLoaded()
	{
		this.Visible = false;

		// TODO: 13/10/2020: see to use a controller to create the new game (SRP)
		this.LoadingScene.Launch(new LevelConfiguration()
		{
			Key =  "video-intro"
		});
	}

	private void HideWithFading()
	{

	}
	#endregion

	#region Properties
	public override bool RootNodesVisibility => false;
	#endregion

}






