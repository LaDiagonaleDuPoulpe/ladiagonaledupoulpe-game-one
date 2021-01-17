using Godot;
using models = ladiagonaledupoulpe.Sources.App.Core.Models;
using ladiagonaledupoulpe.Sources.App.Core.Base.Scenes;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Characters;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Configurations.Characters;
using ladiagonaledupoulpe.Sources.App.Shared.Tools.ExtensionMethods;
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
		this._currentPlayer = this.GetRootNode<Player>("CurrentPlayer");
		this._currentPlayer.InitializeData(new PlayerCharacterDataSetting()
		{
			Health = new HealthDataSetting()
			{
				CurrentValue = 50,
				MaxValue = 100
			},
			SynalePower = new SynaleDataSetting()
			{
				CurrentValue = 40,
				MaxValue = 100
			}
		});

		var globalData = this.GetRootNode<models.Games.Game>("CurrentGame");
		globalData.Initialize(new models.Settings.Games.GameSetting()
		{
			RulesSet = new models.Settings.Games.RuleSetSetting()
			{
				RebornCost = 10
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



