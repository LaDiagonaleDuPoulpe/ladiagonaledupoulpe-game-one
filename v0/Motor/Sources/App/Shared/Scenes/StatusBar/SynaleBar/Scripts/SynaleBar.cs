using Godot;
using Godot.Collections;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Scripts;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using ladiagonaledupoulpe.Sources.App.Shared.Models.Settings.Animations;
using System;

/// <summary>
/// Synale bar to display value of the power of the synale
/// </summary>
public class SynaleBar : Node2D
{
	#region Fields
	private RichTextLabel _pointsLabel = null;
	private AnimatedSprite _animation = null;
	private AnimatedSprite _updateStateAnimatedSprite = null;
	private PowerPoint _currentPoint = null;
	private string _currentAnimation = string.Empty;
	private SynaleState _currentState = SynaleState.SynaleInitialized;
	private Dictionary<SynaleState, AnimationSetting> _animationKeys = null;
	#endregion

	#region Public methods
	public override void _Ready()
	{
		this._pointsLabel = this.GetNode<RichTextLabel>("DisplayPoints");
		this._animation = this.GetNode<AnimatedSprite>("AnimatedSprite");
		this._updateStateAnimatedSprite = this.GetNode<AnimatedSprite>("UpdateStateAnimatedSprite");

		this.DefineAnimationsSettings();
	}

	/// <summary>
	/// Initializes the range values of the bar
	/// </summary>
	/// <param name="point"></param>
	public void Initialize(PowerPoint point)
	{
		this._currentPoint = point;
		this.UpdateValueLabel();
		this.Animate(SynaleState.SynaleInitialized);
	}

	/// <summary>
	/// Increases power of the synale
	/// Plays animation during increase action
	/// </summary>
	public void Increase(PowerPoint point)
	{
		this.UpdatePowerOfSynale(point, SynaleState.SynaleIncreased);
	}

	/// <summary>
	/// Decreases power of the synale
	/// Plays animation during decrease action
	/// </summary>
	public void Decrease(PowerPoint point)
	{
		point.CurrentValue = -point.CurrentValue;
		this.UpdatePowerOfSynale(point, SynaleState.SynaleDecreased);
	}
	#endregion

	#region Internal methods
	private void UpdatePowerOfSynale(PowerPoint point, SynaleState state)
	{
		if (this._currentPoint.IsValid)
		{
			PowerPoint old = this._currentPoint;

			this._currentPoint = (PowerPoint) (this._currentPoint + point);

			if (old != this._currentPoint)
			{
				this.Animate(state);
				this.UpdateValueLabel();
			}
		}
	}

	private void DefineAnimationsSettings()
	{
		this._animationKeys = new Dictionary<SynaleState, AnimationSetting>();

		this._animationKeys.Add(SynaleState.SynaleInitialized, new AnimationSetting() { Key = "idle", SpeedScale = 3 });
		this._animationKeys.Add(SynaleState.SynaleIncreased, new AnimationSetting() { Key = "powering", SpeedScale = 4 });
		this._animationKeys.Add(SynaleState.SynaleDecreased, new AnimationSetting() { Key = "powering", SpeedScale = 5 });
	}

	private void _on_AnimatedSprite_animation_finished()
	{
		if (this.CurrentState != SynaleState.SynaleInitialized)
		{
			this.Animate(SynaleState.SynaleInitialized);
		}
	}

	private void Animate(SynaleState state)
	{
		this.CurrentState = state;

		if (this._animation.Playing)
		{
			this._animation.Playing = false;
			this._animation.Frame = 0;
			this._animation.SpeedScale = this.RealTimeSpeedScale;
		}
		this._animation.Play(this._animationKeys[this.CurrentState].Key);
	}

	private void UpdateValueLabel()
	{
		this.ValueAsText = this._currentPoint.CurrentValue.ToString();
	}
	#endregion

	#region Properties
	/// <summary>
	/// Gets real scale : ratio calculated from speedscale and current life value
	/// </summary>
	protected float RealTimeSpeedScale
	{
		get
		{
			float scale = this._animationKeys[this.CurrentState].SpeedScale;

			if (this.CurrentState == SynaleState.SynaleInitialized)
			{
				float ratio = this.CurrentValue == this.MaxValue ? 1 : (this.CurrentValue / (float) this.MaxValue);
				scale = (scale * ratio);
				if (scale == 0)
				{
					scale = 0.1F;
				}
			}

			return scale;
		}
	}

	/// <summary>
	/// Defines the value of the current power to be displayed
	/// </summary>
	protected string ValueAsText
	{
		set
		{
			this._pointsLabel.BbcodeText = $" [center]{value}[/center]";
		}
	}

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

	/// <summary>
	/// Use it to get the current state of the synale bar
	/// </summary>
	public SynaleState CurrentState { get => _currentState; private set => _currentState = value; }
	#endregion
}


