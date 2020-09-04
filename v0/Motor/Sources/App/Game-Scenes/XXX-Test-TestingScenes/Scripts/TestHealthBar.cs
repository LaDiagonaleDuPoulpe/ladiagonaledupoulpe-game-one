using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Scripts;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using System;

public class TestHealthBar : Node2D
{
	private HeartsLifeBar _lifeBar = null;
	private Player _currentPlayer = null;

	// Called when the node enters the scene tree for the first time.
	public override void _Ready()
	{
		this._currentPlayer = this.GetNode<Player>("/root/CurrentPlayer");
	}

	public void _on_Button_pressed() 
	{
		this._currentPlayer.Hit(10);
	}

	public void _on_Button2_pressed()
	{
		this._currentPlayer.Hit(-10);
	}

	
}
