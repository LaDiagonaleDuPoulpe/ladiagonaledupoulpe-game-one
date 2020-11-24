using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Configurations;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Configurations.Battle;
using ladiagonaledupoulpe.Sources.App.Game_Scenes._003_Code_Editor.Scripts;
using ladiagonaledupoulpe.Sources.App.Shared.Services.Data;
using System;

public class FrameBtn : Node
{
    
    public ActionFrame Frame { get; set; }

    #region Fields
    private Sprite _poulpeSprite;
    private BattleConfiguration _battleConfiguration;
    #endregion
    // Called when the node enters the scene tree for the first time.
    public override void _Ready()
    {
        _battleConfiguration = this.GetNode<GlobalDataService>("/root/GlobalDataService").GlobalSettings.Battle;
        _poulpeSprite = GetTree().Root.GetNode<Sprite>("/root/Battle/Grid/Players/Poulpe");
		this.Connect("pressed", this, "on_button_pressed");
    }


    #region Public
    public void on_button_pressed(){

        var grid = this.GetNode<Sprite>("/root/Battle/Grid");
        float sizeLength = grid.Texture.GetSize().x / _battleConfiguration.GridWidth;
        float sizeheight = grid.Texture.GetSize().y / _battleConfiguration.GridHeight;

        _poulpeSprite.Position = new Vector2(Frame.PlayerPosition.X * sizeLength, Frame.PlayerPosition.Y * sizeheight);
        this.EmitSignal("FrameChanged", Frame.ActionPointLeft);
    }
    #endregion
}
