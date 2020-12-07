using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Base.Scenes;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Characters;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Configurations.Characters;
using System;

public class TestRebornPlayer : BaseActiveScene
{
	#region Fields
	private Player _currentPlayer = null;
	#endregion

	#region Public methods
	public override void _Ready()
	{
		base._Ready();
		this._currentPlayer = this.GetNode<Player>("/root/CurrentPlayer");
		this._currentPlayer.InitializeData(new PlayerCharacterDataSetting()
		{
			Health = new HealthDataSetting()
			{
				CurrentValue = 50,
				MaxValue = 100
			},
			SynalePower = new SynaleDataSetting()
			{
				CurrentValue = 50,
				MaxValue = 100
			}
		});
	}
	#endregion

	#region Internal methods
	private void _on_btnShoot_pressed()
	{
		this._currentPlayer.Hit(50);
	}
	#endregion

	#region Properties
	public override bool RootNodesVisibility => true;
	#endregion
}



