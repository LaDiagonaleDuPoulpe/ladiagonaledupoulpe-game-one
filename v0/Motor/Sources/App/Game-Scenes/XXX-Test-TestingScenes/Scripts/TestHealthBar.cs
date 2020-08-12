using Godot;
using System;

public class TestHealthBar : Node2D
{
    private HeartsLifeBar _lifeBar = null;

    // Called when the node enters the scene tree for the first time.
    public override void _Ready()
    {
        this._lifeBar = this.GetNode<HeartsLifeBar>("LifeBar");
    }

    public void _on_Button_pressed() 
    {
        this._lifeBar.Update(20);
    }

    public void _on_Button2_pressed()
    {
        this._lifeBar.Update(-20);
    }
}
