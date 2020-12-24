using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Scenes;
using System;

/// <summary>
/// This effect is used to animate effect when heart 
/// </summary>
public class RebornHeartEffect : Node2D, IStartAnimation
{
	#region Fields
	private Tween _centerParticlesTween;
	private Timer _stopTimer;
	private Particles2D _centerParticles;
	private Particles2D _trail1;
	private Particles2D _trail2;
	#endregion

	#region Public methods
	public override void _Ready()
	{		
		this._centerParticlesTween = this.GetNode<Tween>("CenterParticlesTween");
		this._stopTimer = this.GetNode<Timer>("StopTimer");

		this._centerParticles = this.GetNode<Particles2D>("CenterParticles");
		this._trail1 = this.GetNode<Particles2D>("Trail1");
		this._trail2 = this.GetNode<Particles2D>("Trail2");

		this.PrepareCenterParticleTween();
	}

	public void Start()
	{
		this._centerParticles.Visible = true;
		this._centerParticlesTween.Start();
		this._stopTimer.Stop();
	}

	public void Stop()
	{
		this._centerParticles.Visible = false;
		this._trail1.Visible = false;
		this._trail2.Visible = false;
		this._centerParticlesTween.StopAll();
	}
	#endregion

	#region Internal methods
	private void PrepareCenterParticleTween()
	{
		this._centerParticlesTween.InterpolateProperty(this._centerParticles, "process_material:initial_velocity", 0, 1000, 1F);
	}

	private void _on_CenterParticlesTween_tween_all_completed() 
	{
		this.ActivateTrail(this._trail1);
		this.ActivateTrail(this._trail2);
		this._stopTimer.Start();
	}

	private void ActivateTrail(Particles2D trail)
	{
		(trail.ProcessMaterial as ParticlesMaterial).InitialVelocity = 450;
		trail.Visible = true;
	}

	private void _on_Timer_timeout()
	{
		this.Stop();
	}
	#endregion
}
