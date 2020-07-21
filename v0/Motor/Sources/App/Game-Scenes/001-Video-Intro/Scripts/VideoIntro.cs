using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Base.Scenes;
using System;

/// <summary>
/// Scene with introduction video : it's the second scene, launching on new game
/// </summary>
public class VideoIntro : BaseActiveScene
{
    #region Internal methods
    private void OnVideoPlayerFinished()
    {
        GD.Print("OnVideoPlayerFinished");
    }
    #endregion
}
