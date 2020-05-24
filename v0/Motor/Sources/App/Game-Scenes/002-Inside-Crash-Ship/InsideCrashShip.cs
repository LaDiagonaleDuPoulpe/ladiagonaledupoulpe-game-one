using ddp.Plugins.Generators.CloudGenerator;
using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Scenes;
using System;

public class InsideCrashShip : Node2D, IWithClouds
{
    #region Fields
    private ICloudSprite _cloudSprite;
    private IGreyCloudGenerator _cloudGenerator = null;
    #endregion

    #region Public methods        
    public override void _Ready()
	{
        this._cloudSprite = this.GetNode("GreyCloud") as ICloudSprite;
        this._cloudGenerator = new GreyCloudGenerator(this, new CloudGeneratorSetting()
        {
            InitialNumber = 1,
            ZIndex = 4
        });
        this._cloudGenerator.Generate();
    }
    #endregion

    #region Properties
    public ICloudSprite CloudSprite { get => this._cloudSprite; }
    #endregion
}
