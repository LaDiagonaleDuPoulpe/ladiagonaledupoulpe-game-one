using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Scripts;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using System;

/// <summary>
/// This class is dedicated to connect all signals in the game
/// It is loaded with AutoLoad option in Godot.
/// </summary>
public class Signals : Node
{
    #region Fields
    private Player _currentPlayer = null;
    private OnePlayerStatusBar _statusBar = null;
    #endregion

    #region Public methods
    public override void _Ready()
    {
        this._currentPlayer = this.GetNode<Player>("/root/CurrentPlayer");
        this._statusBar = this.GetNode<OnePlayerStatusBar>("/root/OnePlayerStatusBar");

        this._currentPlayer.Connect(CharacterLifeSignal.HealthChanged.ToString(), this._statusBar, "LifeChanged");
    }
    #endregion

    #region Internal methods
    #endregion
}
