using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Services;

public class RootScene : Node2D
{
    // Declare member variables here. Examples:
    // private int a = 2;
    // private string b = "text";

    // Called when the node enters the scene tree for the first time.
    public override void _Ready()
    {
        DialogBox box = this.GetNode("DialogBox") as DialogBox;
        
        box.MessageList.Add("Hello !");
        box.MessageList.Add("Ca va ti ?");

        DialoxBoxManager manager = new DialoxBoxManager();
        manager.Preload();

        box.Start();
    }
}
