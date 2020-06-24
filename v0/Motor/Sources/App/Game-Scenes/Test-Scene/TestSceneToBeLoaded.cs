using Godot;
using Motor.Sources.App.Core.Interfaces.Scenes;
using System;

public class TestSceneToBeLoaded : Node2D, IDataInit
{
    #region Public methods
    public void Initialize()
    {
        GD.Print("Initialize");
    }

    public override void _Ready()
    {
        GD.Print("TestSceneToBeLoaded");
    }
    #endregion
}
