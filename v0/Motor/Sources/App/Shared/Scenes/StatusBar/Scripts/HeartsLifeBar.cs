using Godot;
using System;

/// <summary>
/// Life bar with 3 hearts (hearts of each octopus)
/// Container that manages life with : one main heart and two helper hearts
/// </summary>
public class HeartsLifeBar : Node2D
{
    #region Fields
    private HeartBar _mainHeart = null;
    #endregion

    #region Public methods
    public override void _Ready()
    {
        Control container = this.GetNode<Control>("MarginContainer"); 
        this._mainHeart = container.GetNode<HeartBar>("MainHeart");
        this._mainHeart.SetDefaultValues(100, 100);
    }

    /// <summary>
    /// Updates value in all heart bars
    /// </summary>
    /// <param name="value">Positive or negative value</param>
    public void Update(int value)
    {
        this._mainHeart.Update(value);
    }
    #endregion

    #region Properties
    /// <summary>
    /// Min health of the octopus
    /// </summary>
    public int CurrentHealth
    {
        get => this._mainHeart.CurrentValue;
    }

    /// <summary>
    /// Max health of the octopus
    /// </summary>
    [Export]
    public int MaxHealth
    {
        get => this._mainHeart.MaxValue;
        set => this._mainHeart.MaxValue = value;
    }
    #endregion
}
