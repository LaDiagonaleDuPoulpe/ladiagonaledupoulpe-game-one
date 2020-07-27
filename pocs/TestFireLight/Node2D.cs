using Godot;
using System;
using static Godot.Tween;

public class Node2D : Godot.Node2D
{
    private static Random _random = new Random();

    // Declare member variables here. Examples:
    // private int a = 2;
    // private string b = "text";

    private Light2D _light = null;
    private Tween _tween = null;

    // Called when the node enters the scene tree for the first time.
    public override void _Ready()
    {
        
    }


//  // Called every frame. 'delta' is the elapsed time since the previous frame.
//  public override void _Process(float delta)
//  {
//      
//  }
}
