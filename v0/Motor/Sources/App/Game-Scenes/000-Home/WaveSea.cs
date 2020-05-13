using Godot;
using System;

public class WaveSea : Sprite
{
	// Declare member variables here. Examples:
	// private int a = 2;
	// private string b = "text";
	private PackedScene _waveSeaScene;
	private Timer _timer1;

	// Called when the node enters the scene tree for the first time.
	public override void _Ready()
	{
		_waveSeaScene = (PackedScene)ResourceLoader.Load("res://Sources/App/Game-Scenes/000-Home/WaveSea.tscn"); // Will load when the script is instanced.

		_timer1 = new Timer();

		AddChild(_timer1);


		_timer1.Connect("timeout", this, "InstantiateNewWaveSea");
		_timer1.WaitTime = 0.4f;
		_timer1.OneShot = false;
		_timer1.Start();
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
