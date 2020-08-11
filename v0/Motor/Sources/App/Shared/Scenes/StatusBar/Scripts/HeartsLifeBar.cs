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
        this._mainHeart = this.GetNode<HeartBar>("MainHeart");
    }

    /// <summary>
    /// Updates value in all heart bars
    /// </summary>
    /// <param name="value">Positive or negative value</param>
    public void Update(int value)
    {
        GD.Print("Life bar update");

        this._mainHeart.Update(value);
    }
    #endregion

    #region Properties
    /// <summary>
    /// Min health of the octopus
    /// </summary>
    [Export]
    public int MinHealth { get; set; } = 0;

    /// <summary>
    /// Max health of the octopus
    /// </summary>
    [Export]
    public int MaxHealth { get; set; } = 100;
    #endregion
}
