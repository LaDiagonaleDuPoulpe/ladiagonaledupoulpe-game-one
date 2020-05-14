using Godot;
using System;

public class InstantiateCloud : Node2D
{
	private PackedScene _cloud;
	private Timer _timer;

	public override void _Ready()
	{
		_cloud = (PackedScene)ResourceLoader.Load("res://Sources/App/Game-Scenes/000-Home/Cloud.tscn"); // Will load when the script is instanced.

		_timer = new Timer();

		AddChild(_timer);


		_timer.Connect("timeout", this, "InstantiateNewCloud");
		_timer.WaitTime = 1f;
		_timer.OneShot = false;
		_timer.Start();
	}

	/// <summary>
	/// Instanciation d'un nuage 
	/// </summary>
	private void InstantiateNewCloud()
	{
			var node = (Node2D)_cloud.Instance();
			var posY = ((Sprite)GetParent()).Texture.GetSize().y;
			node.Position = new Vector2(node.Position.x, new Random().Next(0, Convert.ToInt32(posY)));

			var scale = new Random().Next(2, 15) / 10f;
			node.Scale = new Vector2(scale, scale);
			AddChild(node);
	}
}
