using Godot;
using System;

public class Main : Node
{
	// Declare member variables here. Examples:
	// private int a = 2;
	// private string b = "text";
	
	[Export]
	private PackedScene _ball;

	// Called when the node enters the scene tree for the first time.
	public override void _Ready()
	{
		
	}
	
	public override void _Input(InputEvent inputEvent) 
	{
		
		if (inputEvent.IsActionPressed("click"))
		{
			this._ball = (PackedScene)ResourceLoader.Load("res://Ball.tscn");
			var instance = this._ball.Instance();
			((RigidBody2D)instance).Position = this.GetViewport().GetMousePosition();
			AddChild(instance);
		}
	}

//  // Called every frame. 'delta' is the elapsed time since the previous frame.
//  public override void _Process(float delta)
//  {
//      
//  }
}
