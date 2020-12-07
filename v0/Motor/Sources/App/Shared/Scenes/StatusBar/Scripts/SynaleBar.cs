using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Scripts;
using System;

/// <summary>
/// Synale bar to display value of the power of the synale
/// </summary>
public class SynaleBar : Node2D
{
	#region Fields
	private RichTextLabel _pointsLabel = null;
	private AnimatedSprite _animation = null;
	private LifePoint _currentPoint = null;
	#endregion

	#region Public methods
	public override void _Ready()
	{
		this._pointsLabel = this.GetNode<RichTextLabel>("AnimatedSprite");
		this._animation = this.GetNode<AnimatedSprite>("DisplayPoints");
	}	

	/// <summary>
	/// Initializes the range values of the bar
	/// </summary>
	/// <param name="point"></param>
	public void Initialize(LifePoint point)
    {
		this._currentPoint = point;
	}

	/// <summary>
	/// Increases power of the synale
	/// Plays animation during increase action
	/// </summary>
	public void Increase(LifePoint point)
    {
		this._currentPoint = this._currentPoint + point;
    }

	/// <summary>
	/// Decreases power of the synale
	/// Plays animation during decrease action
	/// </summary>
	public void Decrease(LifePoint point)
    {
		this._currentPoint = this._currentPoint - point;
	}
	#endregion

	#region Internal methods
	private void _on_AnimatedSprite_animation_finished()
	{
		// Replace with function body.
	}
    #endregion

    #region Properties
	/// <summary>
	/// Gets the current value of the synale bar (and the player)
	/// </summary>
	public int CurrentValue
    {
		get => this._currentPoint.CurrentValue;
		private set => new LifePoint(value, this._currentPoint.MaxValue);
    }

	/// <summary>
	/// Gets the max value of the synale bar
	/// </summary>
	public int MaxValue
    {
		get => this._currentPoint.MaxValue;
		set => new LifePoint(this._currentPoint.CurrentValue, value);
    }
    #endregion
}


