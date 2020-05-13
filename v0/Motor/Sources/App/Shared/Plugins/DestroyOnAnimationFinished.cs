using Godot;
using System;

public class DestroyOnAnimationFinished : Node
{
	

	private void _on_AnimatedSprite_animation_finished()
	{
			GetParent().QueueFree();
	}


}

