using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Interfaces.Scenes;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using ladiagonaledupoulpe.Sources.App.Shared.Services;
using System;

/// <summary>
/// Loading scene to load all resource file
/// </summary>
public class LoadingScene : Node2D
{
    #region Signals
    /// <summary>
    /// Uses this signal to know when loading scene starts to load resources
    /// </summary>
    [Signal]
    public delegate void Begin();

    /// <summary>
    /// Uses this signal to know when all resources are loaded
    /// </summary>
    [Signal]
    public delegate void End();
    #endregion

    #region Public methods
    public override void _Ready()
    {
        this.Initialize();
    }

    /// <summary>
    /// Starts the resources loading.
    /// Emit start event
    /// </summary>
    /// <param name="configuration">Data to load next scene</param>
    public void Launch(ILevelConfiguration configuration)
    {
        this.Visible = true;
        ResourcesLoader.Instance.Start(configuration);
    }
    #endregion

    #region Internal methods
    private void Initialize()
    {
        ResourcesLoader.Instance.Connect(LoadingActionsType.Begin.ToString(), this, nameof(BeginLoadingResources));
    }

    private void EndLoadingOneResource()
    {
        throw new NotImplementedException();
    }

    private void BeginLoadingOneResource()
    {
        throw new NotImplementedException();
    }

    private void EndLoadingResources()
    {
        this.EmitSignal(LoadingActionsType.End.ToString());
    }

    private void BeginLoadingResources()
    {
        this.EmitSignal(LoadingActionsType.Begin.ToString());
    }
    #endregion
}
