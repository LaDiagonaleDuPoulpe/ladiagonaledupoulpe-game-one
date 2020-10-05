using ddp.Plugins.Generators;
using ddp.Plugins.Generators.CloudGenerator;
using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Base.Scenes;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Generators;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Scenes;
using System;

/// <summary>
/// Inside crash ship scene, launching just after video scene
/// </summary>
public class InsideCrashShip : BaseActiveScene, IWithClouds
{
	#region Fields
	private ISpriteGenerator _cloudGenerator = null;
	#endregion

	#region Public methods        
	public override void _Ready()
	{
		base._Ready();
		
		this._cloudGenerator = new GreyCloudGenerator(this, new GeneratorSetting()
		{
			InitialNumber = 10,
			ZIndex = 2,
			Size = new Vector2(0, 200)
		});

		this._cloudGenerator.Initialize();
		this._cloudGenerator.Generate();

		this.DialoxBoxManager.Start("begin");        
	}
	#endregion

	#region Properties
	public Vector2 WindowSize => this.GetViewport().Size;

	public Godot.Object ToObject { get => this; }
	#endregion
}
