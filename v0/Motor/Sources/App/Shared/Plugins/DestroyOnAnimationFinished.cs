using Godot;
using System;

public class DestroyOnAnimationFinished : Node
{
	
	/// <summary>
	/// Destruction de la scene contenant un sprite anime
	/// Il faut attacher le signal "AnimationFinished" sur ce script
	/// </summary>
	private void _on_AnimatedSprite_animation_finished()
	{
		GetParent().GetParent().QueueFree();
	}


}

