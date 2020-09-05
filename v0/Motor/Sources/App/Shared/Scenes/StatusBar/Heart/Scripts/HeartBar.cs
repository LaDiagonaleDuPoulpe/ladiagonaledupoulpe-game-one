using Godot;
using Godot.Collections;
using System;

/// <summary>
/// Heart life status bar
/// You can update level of the status bar here
/// This specific status bar will be used with HeartsStatusBar scene
/// </summary>
public class HeartBar : Node2D
{
	#region Fields
	private TextureProgress _progressBar = null;
	private AnimatedSprite _animatedSprite = null;
	private Tween _tweenItem = null;
	private int _currentValue = 0;
	private Dictionary<bool, string> _animations = new Dictionary<bool, string>();
	#endregion

	#region Public methods
	public override void _Ready()
	{
		this._progressBar = this.GetNode<TextureProgress>("TextureProgress");
		this._tweenItem = this.GetNode<Tween>("Tween");
		this._animatedSprite = this.GetNode<AnimatedSprite>("Effects");

		this._progressBar.MaxValue = this.MaxValue;
		this.DefineAnimations();
	}

	/// <summary>
	/// Defines new value of the status bar
	/// </summary>
	/// <param name="value">Value positive or negative</param>
	public void Update(int value)
	{
		if (this.CurrentValue >= 0 && this.CurrentValue <= this.MaxValue)
		{
			int finalValue = value;

			this._tweenItem.InterpolateProperty(this._progressBar, "value", this.CurrentValue, finalValue,
												0.5f,
												Tween.TransitionType.Elastic,
												Tween.EaseType.Out);
			if (! this._tweenItem.IsActive())
			{
				this._tweenItem.Start();
			}

			this.ActivateAnimation(value);
			this.CurrentValue = value;
			this.ChangeColorStyle(this.CurrentValue);
		}
	}

	/// <summary>
	/// Initializes the value of the life bar
	/// </summary>
	/// <param name="value"></param>
	public void SetDefaultValues(int value, int maxValue)
	{
		this.CurrentValue = value;
		this.MaxValue = maxValue;

		this._progressBar.MaxValue = maxValue;
		this._progressBar.Value = value;
	}
	#endregion

	#region Internal methods
	private void DefineAnimations()
	{
		this._animations.Add(false, "Damage");
		this._animations.Add(true, "PowerUp");
	}

	private void ActivateAnimation(int newValue)
	{
		string animation = this._animations[newValue > this.CurrentValue];

		this._animatedSprite.ShowOnTop = true;
		if (this._animatedSprite.IsPlaying())
		{
			this._animatedSprite.Stop();
		}

		this._animatedSprite.Play(animation);
	}

	private void ChangeColorStyle(int value)
	{
		double redPart = this.MaxValue * 0.3;
		double reallyGoodPart = this.MaxValue * 0.7;

		this._progressBar.TintProgress = Colors.DarkBlue;
		if (value < redPart)
		{
			this._progressBar.TintProgress = Colors.DarkRed;
		}
	}
	#endregion

	#region Properties
	/// <summary>
	/// Alive if value is more than 0
	/// </summary>
	public bool IsAlive { get => this._progressBar.Value > 0; }

	/// <summary>
	/// Current value of the life bar
	/// </summary>
	public int CurrentValue
	{
		get => this._currentValue;
		private set
		{
			if (value < 0)
			{
				value = 0;
			}
			if (value > this.MaxValue)
			{
				value = this.MaxValue;
			}

			this._currentValue = value;
		}
	}

	/// <summary>
	/// Max value of the life bar
	/// </summary>
	public int MaxValue { get; set; } = 80;
	#endregion
}
