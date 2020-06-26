using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Base.Scenes;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings;
using Motor.Sources.App.Core.Interfaces.Scenes;
using System;

public class TestSceneToBeLoaded : BaseScene
{
    #region Public methods
    public override void _Ready()
    {
        GD.Print("TestSceneToBeLoaded");
    }
    #endregion
}
