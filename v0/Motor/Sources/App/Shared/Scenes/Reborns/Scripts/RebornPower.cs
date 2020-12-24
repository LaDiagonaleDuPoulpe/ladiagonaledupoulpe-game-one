using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Scenes;
using System;

/// <summary>
/// Reborn power to animate when player can continue to play
/// </summary>
public class RebornPower : Node2D, IStartAnimation
{
	#region Fields
	private RebornSynale _rebornSynale = null;

	#region Signals
	/// <summary>
	/// Reborn animation is finished, you can do what you have to do :=)
	/// </summary>
	[Signal]
	public delegate void RebornIsReady();
	#endregion
	#endregion

	#region Public methods
	public override void _Ready()
	{
		this._rebornSynale = this.GetNode<RebornSynale>("RebornSynale");
		this._rebornSynale.Connect(nameof(RebornSynale.AnimationEnded), this, nameof(synalePower_AnimationEnded));
	}

	public void Start()
	{
		this._rebornSynale.Start();
		this.Visible = true;
	}

	public void Stop()
	{
		this._rebornSynale.Stop();
		this.Visible = false;
	}
	#endregion

	#region Internal methods
	private void synalePower_AnimationEnded()
	{
		this.EmitSignal(nameof(RebornPower.RebornIsReady));
	}
	#endregion
}
