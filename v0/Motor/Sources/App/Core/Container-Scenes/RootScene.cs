using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Interfaces.Configurations;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using ladiagonaledupoulpe.Sources.App.Shared.Scenes.Dialog;
using ladiagonaledupoulpe.Sources.App.Shared.Services;
using System.Collections.Generic;
using System.Linq;

public class RootScene : Node2D
{
    #region Fields
    private LoadingScene _loadingScene = null;
    #endregion

    #region Public methods
    public override void _Ready()
    {
        this.LoadingScene = this.GetNode<LoadingScene>("LoadingScene");
        DialogBox box = this.GetNode("DialogBox") as DialogBox;

        this.Initialize();

        Resource resource = ResourceLoader.Load("res://Sources/App/Shared/Assets/Animations/Characters/Speaking/player3.tres");
        SpriteFrames spriteFrames = resource as SpriteFrames;

        DialoxBoxManager manager = new DialoxBoxManager();
        manager.Preload();

        box.Start(new List<MessageContent>()
        {
            new MessageContent() { Content = "Le vaisseau ne va vraiment pas bien ! Comment s'en sortir ?", SpriteFrames = spriteFrames },
            new MessageContent() { Content = "Et si nous trouvions deja un moyen de déclencher l'auto-reparation ?", SpriteFrames = spriteFrames, SpriteDirection = AnimatedSpriteDirection.Right }
        });
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

    private void LoadingScene_End(IEnumerable<Resource> resources)
    {
        this.GetNode<Button>("Button").Visible = false;

        PackedScene nextScene = resources.Where(item => item is PackedScene).Cast<PackedScene>().First();
        this.AddChild(nextScene.Instance());
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
