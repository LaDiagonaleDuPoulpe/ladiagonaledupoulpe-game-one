using Godot;
using System;

public class Player : KinematicBody2D
{
	#region Fields
	private Vector2 _screenSize;
	private string _lastAnimation = "";
	#endregion

	#region Public methods
	public override void _Ready()
	{
		this.ScreenSize = this.GetViewport().Size;
	}

	public override void _Process(float delta)
	{
		var velocity = new Vector2();
		string animation = string.Empty;
		string prefix = string.Empty;

		if (Input.IsActionPressed("ui_right"))
		{
			velocity.x += 1;
		}

		if (Input.IsActionPressed("ui_left"))
		{
			velocity.x -= 1;
		}

		if (Input.IsActionPressed("ui_down"))
		{
			velocity.y += 1;
		}

		if (Input.IsActionPressed("ui_up"))
		{
			velocity.y -= 1;
		}

		var animatedSprite = GetNode<AnimatedSprite>("AnimatedSprite");

		if (velocity.Length() > 0)
		{
			prefix = string.Empty;
			velocity = velocity.Normalized() * Speed;			
		}
		else
		{
			prefix = "idle_";
		}

		this.Position += velocity * delta;
		this.Position = new Vector2(
			x: Mathf.Clamp(Position.x, 0, _screenSize.x),
			y: Mathf.Clamp(Position.y, 0, _screenSize.y)
		);

		if (velocity.x != 0)
		{
			this._lastAnimation = "left";
			animatedSprite.FlipV = false;
			animatedSprite.FlipH = velocity.x > 0;
		}
		else if (velocity.y != 0)
		{
			this._lastAnimation = "up";
			if (velocity.y > 0)
			{
				this._lastAnimation = "down";
			}
		}

		animation = prefix + this._lastAnimation;

		animatedSprite.Play(animation);
	}
	#endregion

	#region Properties
	/// <summary>
	/// Size of the game window.
	/// </summary>
	public Vector2 ScreenSize
	{
		get => this._screenSize;
		private set => this._screenSize = value;
	}

	/// <summary>
	/// How fast the player will move (pixels/sec)
	/// </summary>
	[Export]
	public int Speed { get; set; } = 300;
	#endregion
}
