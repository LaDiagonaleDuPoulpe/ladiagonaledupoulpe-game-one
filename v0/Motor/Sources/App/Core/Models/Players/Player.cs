using Godot;
using System;

public class Player : KinematicBody2D
{
	#region Fields
	private Vector2 _screenSize;
	private string _lastAnimation = "";

	private Vector2 _velocity = Vector2.Zero;
	#endregion

	#region Public methods
	public override void _Ready()
	{
		this.ScreenSize = this.GetViewport().Size;
	}

	public override void _PhysicsProcess(float delta)
	{
		Vector2 vector = Vector2.Zero;

		vector.x = Input.GetActionStrength("ui_right") - Input.GetActionStrength("ui_left");
		vector.y = Input.GetActionStrength("ui_down") - Input.GetActionStrength("ui_up");
		
		this._velocity = Vector2.Zero;
		if (vector != Vector2.Zero) 
		{
			this._velocity = vector;
		}

		this.MoveAndCollide(this._velocity.Normalized() * this.Speed);
	}

	public override void _Process(float delta)
	{
		string animation = string.Empty;
		string prefix = string.Empty;
	
		var animatedSprite = GetNode<AnimatedSprite>("AnimatedSprite");

		if (this._velocity.Length() > 0)
		{
			prefix = string.Empty;
		}
		else
		{
			prefix = "idle_";
		}


		if (this._velocity.x != 0)
		{
			this._lastAnimation = "left";
			animatedSprite.FlipV = false;
			animatedSprite.FlipH = this._velocity.x > 0;
		}
		else if (this._velocity.y != 0)
		{
			this._lastAnimation = "up";
			if (this._velocity.y > 0)
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
