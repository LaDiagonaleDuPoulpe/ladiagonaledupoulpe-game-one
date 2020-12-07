using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Base.Scenes;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Scripts;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using ladiagonaledupoulpe.Sources.App.Shared.Nodes.Camera;
using System;

public class TestHealthBar : BaseActiveScene
{
	#region Fields
	private Player _currentPlayer = null;
	private FollowPlayerCamera _camera = null;
	#endregion

	#region Public methods
	public override void _Ready()
	{
		base._Ready();
	
		this._currentPlayer = this.AutoLoaderAccessor.CurrentPlayer;
		this._currentPlayer.Position = new Vector2(0, 0);

		this._camera = this.GetNode<FollowPlayerCamera>("MainCamera");
		this._camera.Current = true;
	}

	public void _on_Button_pressed() 
	{
		this._currentPlayer.Hit(10);
	}

	public void _on_Button2_pressed()
	{
		this._currentPlayer.Hit(-10);
	}
	#endregion

	#region Internal methods
	protected override void DefineCurrentCamera()
	{
	}
	#endregion

	#region Properties
	public override bool RootNodesVisibility => true;
	#endregion

}
