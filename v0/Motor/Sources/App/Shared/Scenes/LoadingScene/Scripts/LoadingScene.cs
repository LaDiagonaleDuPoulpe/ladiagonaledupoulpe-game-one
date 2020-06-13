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
    #region Fields
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

    private ProgressBar _oneFileProgressBar = null;
    private ProgressBar _allFilesProgressBar = null;

    private int _filesNumber = 0;
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
        ResourcesLoader.Instance.Start(configuration);
    }
    #endregion

    #region Internal methods
    private void Initialize()
    {
        this._oneFileProgressBar = this.GetNode<ProgressBar>("OneFileProgressBar");
        this._allFilesProgressBar = this.GetNode<ProgressBar>("AllFilesProgressBar");
        this.AttachSignals();
    }

    private void AttachSignals()
    {
        ResourcesLoader.Instance.Connect(LoadingActionsType.Begin.ToString(), this, nameof(BeginLoadingResources));
        ResourcesLoader.Instance.Connect(LoadingActionsType.BeginLoadingResource.ToString(), this, nameof(BeginLoadingOneResource));
        ResourcesLoader.Instance.Connect(LoadingActionsType.End.ToString(), this, nameof(EndLoadingResources));
        ResourcesLoader.Instance.Connect(LoadingActionsType.EndLoadingResource.ToString(), this, nameof(EndLoadingOneResource));
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
        this.Visible = false;
        this.EmitSignal(LoadingActionsType.End.ToString());
    }

    private void BeginLoadingResources()
    {
        this.Visible = true;
        this.EmitSignal(LoadingActionsType.Begin.ToString());
    }
    #endregion

    #region Properties
    /// <summary>
    /// Number of files to load
    /// </summary>
    public int FilesNumber { get => this._filesNumber; private set => this._filesNumber = value; }
    #endregion
}
