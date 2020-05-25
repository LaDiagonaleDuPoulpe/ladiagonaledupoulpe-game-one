using ddp.Plugins.Generators.CloudGenerator;
using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Scenes;
using System;

public class InsideCrashShip : Node2D, IWithClouds
{
    #region Fields
    private IGreyCloudGenerator _cloudGenerator = null;
    #endregion

    #region Public methods        
    public override void _Ready()
	{
        this._cloudGenerator = new GreyCloudGenerator(this, new CloudGeneratorSetting()
        {
            InitialNumber = 10,
            ZIndex = 2,
            ResourcePath = "Shared/Scenes/Clouds/GreyCloud.tscn"
        });

        this._cloudGenerator.Initialize();
        this._cloudGenerator.Generate();
    }
    #endregion

    #region Properties
    #endregion
}
