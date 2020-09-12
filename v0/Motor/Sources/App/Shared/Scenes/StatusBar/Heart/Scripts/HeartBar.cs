using Godot;
using Godot.Collections;
using System;
using System.Runtime.InteropServices;

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
	private Tween _tweenTextureItem = null;
	private Tween _tweenFpsItem = null;
	private int _currentValue = 0;
	private Dictionary<int, string> _animations = new Dictionary<int, string>();
	private Dictionary<bool, float> _fpsValues = new Dictionary<bool, float>() { { true, 10 }, { false, 4 }  };
	#endregion

	#region Public methods
	public override void _Ready()
	{
		this._progressBar = this.GetNode<TextureProgress>("TextureProgress");
		this._tweenTextureItem = this.GetNode<Tween>("TweenForTexture");
		this._tweenFpsItem = this.GetNode<Tween>("TweenForFps");
		this._animatedSprite = this.GetNode<AnimatedSprite>("Effects");

		this.Initialize();
	}

	/// <summary>
	/// Defines new value of the status bar
	/// </summary>
	/// <param name="newValueOfPlayer">New value positive of the player</param>
	/// <param name="maxValueOfPlayer">Maximum value of the player</param>
	public void Update(int newValueOfPlayer, int maxValueOfPlayer)
	{
		if (this.CurrentValue >= 0 && this.CurrentValue <= this.MaxValue)
		{
			int finalValue = this.ComputeValueToProgressBar(newValueOfPlayer, maxValueOfPlayer);

			this._tweenTextureItem.InterpolateProperty(this._progressBar, "value", this.CurrentValue, finalValue,
												0.5f,
												Tween.TransitionType.Elastic,
												Tween.EaseType.Out);
			if (! this._tweenTextureItem.IsActive())
			{
				this._tweenTextureItem.Start();
			}

			this.ActivateAnimation(finalValue);
			this.CurrentValue = finalValue;
			this.ChangeColorStyle(this.CurrentValue);
			this.ChangeHeartSpeed(this.CurrentValue);
		}
	}

	public void _on_Effects_animation_finished()
	{
		this._animatedSprite.Visible = false;
	}
    #endregion

    #region Internal methods
    private void Initialize()
	{
		this.SetDefaultValues(80, 100);
		this.DefineAnimations();
	}

	private void SetDefaultValues(int value, int maxValue)
	{
		this.CurrentValue = value;
		this.MaxValue = maxValue;

		this._progressBar.MaxValue = maxValue;
		this._progressBar.Value = value;
	}

	private int ComputeValueToProgressBar(int value, int maxValueOfPlayer)
	{
		const int margin = 20;
		int maxRealValueProgressBar = this.MaxValue - (margin * 2);
		decimal ratio = (maxRealValueProgressBar / (decimal) maxValueOfPlayer);

		return (int)((value * ratio) + 20);
	}

	private void DefineAnimations()
	{
		this._animations.Add(-1, "Damage");
		this._animations.Add(0, string.Empty);
		this._animations.Add(1, "PowerUp");
	}

	private void ChangeHeartSpeed(int currentValue)
	{
		AnimatedTexture underTexture = this._progressBar.TextureUnder as AnimatedTexture;
		float currentFpsValue = underTexture.Fps;
		float newFpsValue = this._fpsValues[this.IsWeakLife];

		this._tweenFpsItem.InterpolateProperty(underTexture, "fps", currentFpsValue, newFpsValue,
												0.5f,
												Tween.TransitionType.Elastic,
												Tween.EaseType.Out);
		if (!this._tweenFpsItem.IsActive())
		{
			this._tweenFpsItem.Start();
		}
	}

	private void ActivateAnimation(int newValue)
	{
		string animation = this.GetCurrentAnimation(newValue);

		if (!string.IsNullOrEmpty(animation))
		{
			this._animatedSprite.ShowOnTop = true;
			if (this._animatedSprite.IsPlaying())
			{
				this._animatedSprite.Visible = false;
				this._animatedSprite.Frame = 0;
				this._animatedSprite.Stop();
			}

			this._animatedSprite.Visible = true;
			this._animatedSprite.Play(animation);
		}
	}

	private string GetCurrentAnimation(int newValue)
    {
		int updateLifeDirection = newValue.CompareTo(this.CurrentValue);

		return this._animations[updateLifeDirection];
	}

	private void ChangeColorStyle(int value)
	{
		double reallyGoodPart = this.MaxValue * 0.7;

		this._progressBar.TintProgress = Colors.White;
		if (this.IsWeakLife)
		{
			this._progressBar.TintProgress = Colors.DarkRed;
		}
	}
	#endregion

	#region Properties
	/// <summary>
	/// Value where life could be weak to survive
	/// </summary>
	public double WeakLifeValue { get => this.MaxValue * 0.4; }

	public double NearDeadValue {get => this.MaxValue * 0.2; }

	/// <summary>
	/// Life is weak, take care !
	/// </summary>
	public bool IsWeakLife { get => this.CurrentValue < this.WeakLifeValue; }

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
	public int MaxValue { get; set; } = 100;
	#endregion
}
