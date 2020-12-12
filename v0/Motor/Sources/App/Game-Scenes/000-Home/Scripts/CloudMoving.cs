using Godot;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

public class CloudMoving : AnimatedSprite
{

	public override void _Ready()
	{
		int speed = new Random().Next(1, 4);
		Vector2 destination = new Vector2( OS.GetScreenSize().x * - 2, this.Position.y);
		Tween tween = new Tween();
		this.AddChild(tween);
		tween.InterpolateProperty(this, "position", this.Position, destination, 25f / speed, Tween.TransitionType.Linear, Tween.EaseType.InOut);
		tween.Connect("tween_all_completed", this, nameof(RemoveCloud));
		tween.Start();

	}

	/// <summary>
	/// Remove cloud from scene
	/// </summary>
	private void RemoveCloud()
	{
		GetParent().QueueFree();
	}
}
