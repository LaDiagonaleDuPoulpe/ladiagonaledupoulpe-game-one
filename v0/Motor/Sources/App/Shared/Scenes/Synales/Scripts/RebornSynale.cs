using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Scenes;
using System;

/// <summary>
/// Synale used to display reborn animation
/// </summary>
public class RebornSynale : Node2D, IStartAnimation
{
	#region Fields
	private AnimatedSprite _electricArcs = null;
	private AnimatedSprite _roundedCircles = null;
	private AnimatedSprite _endingFlash = null;

	private Tween _electricTween = null;
	private Tween _circleTween = null;
	private Tween _endingFlashTween = null;

	#region Signals
	/// <summary>
	/// Beginning of the animation
	/// </summary>
	[Signal]
	public delegate void AnimationStarting();

	/// <summary>
	/// End of the animation
	/// </summary>
	[Signal]
	public delegate void AnimationEnded();
	#endregion
	#endregion

	#region Public methods
	public override void _Ready()
	{
		this._electricArcs = this.GetNode<AnimatedSprite>("ElectricArcs");
		this._roundedCircles = this.GetNode<AnimatedSprite>("RoundCircles");

		this._electricTween = this.GetNode<Tween>("ElectricArcsTween");
		this._circleTween = this.GetNode<Tween>("RoundedCirclesTween");

		this._endingFlash = this.GetNode<AnimatedSprite>("EndingFlash");
		this._endingFlashTween = this.GetNode<Tween>("EndingFlashTween");
	}

	/// <summary>
	/// Starts the animation
	/// </summary>
	public void Start()
	{
		this.Visible = true;
		this._endingFlash.Visible = false;
		this.Start(this._electricArcs, this._electricTween);
		this.Start(this._roundedCircles, this._circleTween);
	}

	/// <summary>
	/// Stops the animation, and set values to default
	/// </summary>
	public void Stop()
	{
		this.Stop(this._electricArcs, this._electricTween);
		this.Stop(this._roundedCircles, this._circleTween);
	}
	#endregion

	#region Internal methods
	private void Start(AnimatedSprite animatedSprite, Tween tween)
	{
		animatedSprite.Frame = 0;
		animatedSprite.Play("default");
		animatedSprite.SpeedScale = 1;

		animatedSprite.Visible = true;

		tween.InterpolateProperty(animatedSprite, "speed_scale", 1, 50, 2);
		tween.Start();
	}

	private void Stop(AnimatedSprite animatedSprite, Tween tween)
	{
		tween.StopAll();
		animatedSprite.Stop();
		animatedSprite.Frame = 0;
		animatedSprite.SpeedScale = 1;

		animatedSprite.Visible = false;
	}

	private void _on_RoundedCirclesTween_tween_all_completed()
	{
		this.Stop();
		this.StartEndingFlash();
	}

	private void StartEndingFlash()
	{
		this._endingFlash.Visible = true;
		this._endingFlash.Frame = 0;
		this._endingFlash.Play("default");

		this._endingFlashTween.InterpolateProperty(this._endingFlash, "speed_scale", 4, 10, 0.4F);
		this._endingFlashTween.Start();
	}

	private void _on_EndingFlashTween_tween_all_completed()
	{
		this._endingFlashTween.StopAll();
		this._endingFlash.Visible = false;

		this.EmitSignal(nameof(AnimationEnded));
	}
	#endregion
}



