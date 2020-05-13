using Godot;
using System;

public class WaveSea : Sprite
{
	// Declare member variables here. Examples:
	// private int a = 2;
	// private string b = "text";
	private PackedScene _waveSeaScene;
	private Timer _timer;

	// Called when the node enters the scene tree for the first time.
	public override void _Ready()
	{
		_waveSeaScene = (PackedScene)ResourceLoader.Load("res://Sources/App/Game-Scenes/000-Home/WaveSea.tscn"); // Will load when the script is instanced.

		_timer = new Timer();

		AddChild(_timer);


		_timer.Connect("timeout", this, "InstantiateNewWaveSea");
		_timer.WaitTime = 0.4f;
		_timer.OneShot = false;
		_timer.Start();
	}

	//  // Called every frame. 'delta' is the elapsed time since the previous frame.
	private void InstantiateNewWaveSea()
	{
		for (var i = 0; i < 10; i++)
		{
			var node = _waveSeaScene.Instance();

			var animatedSprite = (AnimatedSprite)node.GetChild(0);

			var sizeX = Convert.ToInt32(this.Texture.GetSize().x) ; 
			var sizeY = Convert.ToInt32(this.Texture.GetSize().y ) ;

			animatedSprite.Position = new Vector2(new Random().Next(0,sizeX), new Random().Next(0, sizeY));
			animatedSprite.Play();
			AddChild(node);
		}
	}

	
}
