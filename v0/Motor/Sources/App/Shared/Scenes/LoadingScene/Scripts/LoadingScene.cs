using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Interfaces.Scenes;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using ladiagonaledupoulpe.Sources.App.Shared.Services;
using System;
using System.Collections.Generic;

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
    public delegate void End(IEnumerable<Resource> resources);
    #endregion

    private ProgressBar _oneFileProgressBar = null;
    private ProgressBar _allFilesProgressBar = null;

    private int _filesNumber = 0;
    private int _currentFilesLoadingNumber = 0;
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
        ResourcesLoader.Instance.Connect(LoadingActionsType.Reinit.ToString(), this, nameof(ReinitProgressBars));
    }

    private void BeginLoadingResources(int nbResources)
    {
        this.Visible = true;
        this.FilesNumber = nbResources;
        this.CurrentFilesLoadingNumber = 0;
        this.EmitSignal(LoadingActionsType.Begin.ToString());
    }

    private void EndLoadingResources(IEnumerable<Resource> resources)
    {
        this.Visible = false;
        this.ReinitProgressBars();
        this.EmitSignal(LoadingActionsType.End.ToString(), resources);
    }

    private void ReinitProgressBars()
    {
        this.FilesNumber = 0;
        this.CurrentFilesLoadingNumber = 0;

        this._allFilesProgressBar.Value = 0;
        this._oneFileProgressBar.Value = 0;
    }

    private void BeginLoadingOneResource()
    {
        this._oneFileProgressBar.Value = 0;
    }

    private void EndLoadingOneResource()
    {
        this._oneFileProgressBar.Value = 100;
        this._allFilesProgressBar.Value = (++this._currentFilesLoadingNumber / this.FilesNumber) * 100;

        //GD.Print("resource", resource);
    }
    #endregion

    #region Properties
    /// <summary>
    /// Number of files (resources) to load
    /// </summary>
    public int FilesNumber { get => this._filesNumber; private set => this._filesNumber = value; }

    /// <summary>
    /// Number of files (resources) that are currently loaded
    /// </summary>
    public int CurrentFilesLoadingNumber { get => this._currentFilesLoadingNumber; private set => this._currentFilesLoadingNumber = value; }
    #endregion
}
