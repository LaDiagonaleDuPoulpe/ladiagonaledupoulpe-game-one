using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings;
using ladiagonaledupoulpe.Sources.App.Game_Scenes._003_Code_Editor.Scripts;
using ladiagonaledupoulpe.Sources.App.Shared.Scenes.CodeEditor.Scripts;
using ladiagonaledupoulpe.Sources.App.Shared.Scenes.CodeEditor.Scripts.Players;
using ladiagonaledupoulpe.Sources.App.Shared.Services.Data;
using ladiagonaledupoulpe.Sources.App.Shared.Tools.ExtensionMethods;
using System;

/// <summary>
/// Button for one ActionFrame player code
/// Set the player to the action of this ActionFrame
/// </summary>
public class FrameBtn : Node
{
    [Signal]
    public delegate void FrameBtnPressed(ActionFrame frame);

    #region Fields
    public ActionFrame Frame { get; set; }
    private PlayerActionGrid _player;
    private BattleConfiguration _battleConfiguration;
    private Sprite _grid;
    #endregion

    #region Public
    public override void _Ready()
    {
        _battleConfiguration = this.GetRootNode<GlobalDataService>().GlobalSettings.Battle;
        var movingSceneManager = (MovingSceneManager)this.GetTree().Root.GetNode<Node>("MovingScene");
        _player = movingSceneManager.GetNode<PlayerActionGrid>("GridPlayCode/Players/Player");
        _grid = movingSceneManager.GetNode<Sprite>("GridPlayCode/Grid");

        this.Connect("pressed", this, "on_button_pressed");
        this.Connect(nameof(FrameBtnPressed), movingSceneManager, nameof(MovingSceneManager.on_frame_button_pressed));
    }

    /// <summary>
    /// Action on frame button pressed below the grid
    /// Change the player position
    /// </summary>
    public void on_button_pressed(){

        float sizeLength = _grid.Texture.GetSize().x / _battleConfiguration.GridWidth;
        float sizeheight = _grid.Texture.GetSize().y / _battleConfiguration.GridHeight;
        _player.Position = new Vector2(Frame.PlayerPosition.X * sizeLength, Frame.PlayerPosition.Y * sizeheight);
        this.EmitSignal(nameof(FrameBtnPressed), Frame);
    }

    
    #endregion
}
