using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Base.Scenes;
using ladiagonaledupoulpe.Sources.App.Core.Interfaces.Configurations;
using System;

/// <summary>
/// Scene with introduction video : it's the second scene, launching on new game
/// </summary>
public class VideoIntro : BaseActiveScene
{
    #region Internal methods
    private void _on_VideoPlayer_finished()
    {
        this.LoadingScene.Launch(new LevelConfiguration()
        {
            Key = "inside-broken-space-ship"
        });
    }
    #endregion
}
