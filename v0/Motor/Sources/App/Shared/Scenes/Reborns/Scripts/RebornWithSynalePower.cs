using Godot;
using System;

/// <summary>
/// Reborn animation when user can use synale and reborn
/// </summary>
public class RebornWithSynalePower : Particles2D
{
	#region Fields
	/// <summary>
	/// Uses it to slow down or accelerate the charging particules
	/// </summary>
	[Export]
	public int ChargingSpeed { get; set; }
	#endregion

	#region Public methods
	public override void _Ready()
	{
		
	}
	#endregion
}
