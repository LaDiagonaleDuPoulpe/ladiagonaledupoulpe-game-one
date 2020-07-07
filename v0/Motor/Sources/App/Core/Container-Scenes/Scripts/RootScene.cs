using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Interfaces.Configurations;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using ladiagonaledupoulpe.Sources.App.Shared.Scenes.Dialog;
using ladiagonaledupoulpe.Sources.App.Shared.Services;
using System.Collections.Generic;
using System.Linq;

/// <summary>
/// Parent scene of all scenes. The scene will load other scenes inside it.
/// </summary>
public class RootScene : Node2D
{
    #region Fields
    private LoadingScene _loadingScene = null;
    private DialogBox _dialogBox = null;
    #endregion

    #region Public methods
    public override void _Ready()
    {
        this.LoadingScene = this.GetNode<LoadingScene>("LoadingScene");
        this._dialogBox = this.GetNode("DialogBox") as DialogBox;

        this.Initialize();

    }

    public void _on_Button_pressed()
    {
        this.LoadingScene.Launch(new LevelConfiguration()
        {
            Key = "inside-broken-space-ship"
        });
    }
    #endregion

    #region Internal methods
    private void Initialize()
    {
        this.LoadingScene.Connect(LoadingActionsType.Begin.ToString(), this, nameof(LoadingScene_Start));
        this.LoadingScene.Connect(LoadingActionsType.End.ToString(), this, nameof(LoadingScene_End));
    }

    private void LoadingScene_Start()
    {
        this.GetNode<Button>("Button").Visible = false;
    }

    private void LoadingScene_End(Node2D nextScene)
    {
        this.GetNode<Button>("Button").Visible = false;
        this.AddChild(nextScene);
    }
    #endregion

    #region Properties
        /// <summary>
        /// Scene that loads other scene.
        /// It prepare all resources before loading scene
        /// </summary>
    public LoadingScene LoadingScene { get => this._loadingScene; private set => this._loadingScene = value; }
    #endregion
}
