using Godot;
using System;

/// <summary>
/// Reborn animation when user can use synale and reborn
/// </summary>
public class LoadingPower : Particles2D
{
	#region Fields
	private Tween _animationTween = null;

	#region Signals
	/// <summary>
	/// Attach it to know when no power is finished
	/// </summary>
	[Signal]
	public delegate void NoPowerAnimationCompleted();
	#endregion
	#endregion

	#region Public methods
	public override void _Ready()
	{
		this._animationTween = this.GetNode<Tween>("AnimationTween");
	}

	/// <summary>
	/// Starts the no power animation
	/// </summary>
	public void ActivateNoPowerAnimation()
	{
		(this.ProcessMaterial as ParticlesMaterial).InitialVelocity = 600;
		this._animationTween.InterpolateProperty(this, "modulate:a", Color.Color8(255, 255, 255), Color.Color8(0, 0, 0), 3, Tween.TransitionType.Linear, Tween.EaseType.InOut);
		this._animationTween.Start();
	}
	#endregion

	#region Internal methods
	private void _on_Tween_tween_completed(Godot.Object @object, NodePath key)
	{
		this._animationTween.StopAll();
		this._animationTween.InterpolateProperty(this, "modulate:a", Color.Color8(0, 0, 0), Color.Color8(255, 255, 255), 3, Tween.TransitionType.Linear, Tween.EaseType.InOut);
		this.EmitSignal(nameof(NoPowerAnimationCompleted));
	}
	#endregion
}
