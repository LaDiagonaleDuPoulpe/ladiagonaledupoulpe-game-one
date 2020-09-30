using Godot;
using ladiagonaledupoulpe.Sources.App.Game_Scenes._003_Code_Editor.Scripts;
using System;

public class FrameBtn : Node
{
    
    public ActionFrame Frame { get; set; }
    // Called when the node enters the scene tree for the first time.
    public override void _Ready()
    {
		this.Connect("pressed", this, "on_button_pressed");
    }

    

    public void on_button_pressed(){
        Sprite sprite = GetTree().Root.GetNode<Sprite>("Node2D/Grid/Players/Poulpe");
        sprite.Position = new Vector2(Frame.PlayerPosition.X, Frame.PlayerPosition.Y);
    }

}
