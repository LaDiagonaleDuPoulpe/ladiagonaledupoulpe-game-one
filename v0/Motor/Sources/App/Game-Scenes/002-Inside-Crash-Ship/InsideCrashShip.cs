using Godot;
using System;

public class InsideCrashShip : Node2D
{
	#region Fields
	private PackedScene _player;
	#endregion

	#region Public methods
	public override void _Ready()
	{
		//this._player = (PackedScene) ResourceLoader.Load("res://Sources/App/Core/Models/Players/Player.tscn");
	}
	#endregion

//  // Called every frame. 'delta' is the elapsed time since the previous frame.
//  public override void _Process(float delta)
//  {
//      
//  }
}
