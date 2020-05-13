using Godot;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

public class CloudMoving : Sprite
{
	private int _speed;
	private float _maxPosition;

	public override void _Ready()
	{
		_speed = new Random().Next(1, 4);
		_maxPosition = OS.GetScreenSize().x;

		Task.Run(MoveCloud);
	}

	/// <summary>
	/// Deplace le srite du nuage de gauche a droite
	/// </summary>
	public async void MoveCloud()
	{
		while(Position.x  < _maxPosition)
		{
			this.Position = new Vector2(this.Position.x + _speed, this.Position.y);
			await Task.Delay(10);
		}
	
		GetParent().QueueFree();
	}
}
