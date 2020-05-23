using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Scenes;
using System;

public class GreyCloud : Node2D, ICloudSprite
{
    #region Fields
    private AnimatedSprite _animatedSprite;
    #endregion

    #region Public methods
    // Called when the node enters the scene tree for the first time.
    public override void _Ready()
    {
        this._animatedSprite = this.GetNode("AnimatedSprite") as AnimatedSprite;
    }
    #endregion

    #region Properties
    public AnimatedSprite AnimatedSprite => this._animatedSprite;
    #endregion
}
