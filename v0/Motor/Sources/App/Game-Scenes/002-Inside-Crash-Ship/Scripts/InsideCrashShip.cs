using ddp.Plugins.Generators;
using ddp.Plugins.Generators.CloudGenerator;
using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Generators;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Scenes;
using System;

/// <summary>
/// Inside crash ship scene, launching just after video scene
/// </summary>
public class InsideCrashShip : Node2D, IWithClouds
{
    #region Fields
    private ISpriteGenerator _cloudGenerator = null;
    #endregion

    #region Public methods        
    public override void _Ready()
	{
        this._cloudGenerator = new GreyCloudGenerator(this, new GeneratorSetting()
        {
            InitialNumber = 10,
            ZIndex = 2,
            Size = new Vector2(0, 200)
        });

        this._cloudGenerator.Initialize();
        this._cloudGenerator.Generate();
    }
    #endregion

    #region Properties
    public Vector2 WindowSize => this.GetViewport().Size;

    public Godot.Object ToObject { get => this; }
    #endregion
}
