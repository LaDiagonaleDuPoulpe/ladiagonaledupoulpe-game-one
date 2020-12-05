using Godot;
using ladiagonaledupoulpe.Sources.App.Game_Scenes._003_Code_Editor.Scripts;
using ladiagonaledupoulpe.Sources.App.Shared.Scenes.CodeEditor.Scripts;
using System;
using System.Collections.Generic;

/// <summary>
/// Manage player action point left
/// </summary>
public class ActionPointLeftContainer : TextureRect
{
    public override void _Ready()
    {
        var movingSceneManager = (MovingSceneManager)this.Owner;
        this.RectSize = new Vector2(this.Texture.GetSize().x * 10, this.Texture.GetSize().y);
        movingSceneManager.Connect(nameof(MovingSceneManager.FrameChanged), this, nameof(SetActionPointLeft));
    }

    #region Internal
    /// <summary>
    /// Set size container action point left
    /// </summary>
    /// <param name="frame"></param>
    private void SetActionPointLeft(ActionFrame frame)
    {
        Vector2 size = this.Texture.GetSize();
        this.RectSize = new Vector2(size.x * frame.ActionPointLeft, size.y);
        this.Visible = frame.ActionPointLeft > 0;
    }
    #endregion

}
