using Godot;
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
    private Tween _tweenItem = null;
    private int _currentValue = 0;
    #endregion

    #region Public methods
    public override void _Ready()
    {
        this._progressBar = this.GetNode<TextureProgress>("TextureProgress");
        this._tweenItem = this.GetNode<Tween>("Tween");

        this._progressBar.MaxValue = this.MaxValue;
    }

    /// <summary>
    /// Add or subtract value to the health bar
    /// </summary>
    /// <param name="value">Value positive or negative</param>
    public void Update(int value)
    {
        int finalValue = this.CurrentValue + value;

        this._tweenItem.InterpolateProperty(this._progressBar, "value", this.CurrentValue, finalValue,
                                            0.5f,
                                            Tween.TransitionType.Elastic,
                                            Tween.EaseType.Out);
        this._tweenItem.Start();

        this.CurrentValue += value;
        this.ChangeColorStyle(this.CurrentValue);
    }
    #endregion

    #region Internal methods
    private void ChangeColorStyle(int value)
    {
        double redPart = this.MaxValue * 0.3;
        double reallyGoodPart = this.MaxValue * 0.7;

        this._progressBar.TintProgress = Colors.DarkBlue;
        if (value < redPart)
        {
            this._progressBar.TintProgress = Colors.DarkRed;
        }

        if (value >= redPart && value <= reallyGoodPart)
        {
            this._progressBar.TintProgress = Colors.LightSkyBlue;
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
    public int MaxValue { get; set; } = 100;
    #endregion
}
