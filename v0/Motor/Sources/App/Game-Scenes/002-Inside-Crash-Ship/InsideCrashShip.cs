using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Scenes;
using System;

public class InsideCrashShip : Node2D, IWithClouds
{
    #region Fields
    private ICloudSprite _cloudSprite;
    #endregion

    #region Public methods
    public override void _Ready()
	{
        this._cloudSprite = this.GetNode("GreyCloud") as ICloudSprite;
    }
    #endregion

    #region Properties
    public ICloudSprite CloudSprite { get => this._cloudSprite; }
    #endregion
}
