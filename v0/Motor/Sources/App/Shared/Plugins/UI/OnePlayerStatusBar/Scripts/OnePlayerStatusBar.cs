using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Scripts;
using System;

/// <summary>
/// Status bar for all infos of one player (lifebar, synale power, ...)
/// </summary>
public class OnePlayerStatusBar : Node2D
{
    #region Fields
    private HeartsLifeBar _lifeBar = null;
    #endregion

    #region Public methods
    public override void _Ready()
    {
        CanvasLayer layer = this.GetNode<CanvasLayer>("CanvasLayer");
        this._lifeBar = layer.GetNode<HeartsLifeBar>("HeartsLifeBar");
    }

    public void LifeChanged(LifePoint point)
    {
        this._lifeBar.Update(point.CurrentValue);
    }
    #endregion
}
