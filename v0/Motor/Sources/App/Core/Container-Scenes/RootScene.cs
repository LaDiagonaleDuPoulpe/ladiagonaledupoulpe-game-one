using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Scenes.Dialog;
using ladiagonaledupoulpe.Sources.App.Shared.Services;
using System.Collections.Generic;

public class RootScene : Node2D
{
    // Declare member variables here. Examples:
    // private int a = 2;
    // private string b = "text";

    // Called when the node enters the scene tree for the first time.
    public override void _Ready()
    {
        DialogBox box = this.GetNode("DialogBox") as DialogBox;

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
}
