using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Scripts;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using System;

public class TestHealthBar : Node2D
{
    private HeartsLifeBar _lifeBar = null;
    private Player _player = null;

    // Called when the node enters the scene tree for the first time.
    public override void _Ready()
    {
        this._lifeBar = this.GetNode<HeartsLifeBar>("LifeBar");
        this._player = this.GetNode<Player>("Player");

        this._player.Connect(CharacterLifeSignal.HealthChanged.ToString(), this, nameof(Player_LifeChanged));
    }

    public void _on_Button_pressed() 
    {
        this._player.Hit(10);
    }

    public void _on_Button2_pressed()
    {
        this._player.Hit(-10);
    }

    private void Player_LifeChanged(LifePoint point)
    {
        GD.Print(point);
    }
}
