using ddp.Plugins.Generators;
using ddp.Plugins.Generators.CloudGenerator;
using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Base.Scenes;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Generators;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Scenes;
using ladiagonaledupoulpe.Sources.App.Shared.Nodes.Camera;
using System;

/// <summary>
/// Inside crash ship scene, launching just after video scene
/// </summary>
public class InsideCrashShip : BaseActiveScene, IWithClouds
{
	#region Fields
	private ISpriteGenerator _cloudGenerator = null;
	private FollowPlayerCamera _mainCamera = null;
	#endregion

	#region Public methods
	public override void Initialize()
	{
		this._mainCamera = this.GetNode<FollowPlayerCamera>("MainCamera");
		base.Initialize();

		this.PutPlayerOnTheCurrentScene();
		this.GenerateClouds();
		this.DialoxBoxManager.Start("begin");
	}
	#endregion

	#region Internal methods
	private void PutPlayerOnTheCurrentScene()
	{
		Vector2 playerPosition;

		playerPosition = this.GetNode<Node2D>("Anchor").Position;
		this.AutoLoaderAccessor.CurrentPlayer.PutOnScene(playerPosition, 4);
	}

	private void GenerateClouds()
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

	protected override void ActivateMainCamera()
	{
		this._mainCamera.ClearCurrent();
		this._mainCamera.Current = true;
		this._mainCamera.Zoom = new Vector2(0.6F, 0.6F);
	}
	#endregion

	#region Properties
	public Vector2 WindowSize => this.GetViewport().Size;

	public Godot.Object ToObject { get => this; }

	public override bool RootNodesVisibility => true;
	#endregion
}
