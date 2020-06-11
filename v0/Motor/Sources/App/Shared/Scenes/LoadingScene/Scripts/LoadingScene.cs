using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Interfaces.Scenes;
using ladiagonaledupoulpe.Sources.App.Shared.Services;
using System;

/// <summary>
/// Loading scene to load all resource file
/// </summary>
public class LoadingScene : Node2D
{
    #region Public methods
    public override void _Ready()
    {
        
    }

    public void Start(ILevelConfiguration configuration)
    {
        ResourcesLoader.Instance.Start(configuration);
    }
    #endregion
}
