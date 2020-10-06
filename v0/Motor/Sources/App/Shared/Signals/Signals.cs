using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Scripts;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using ladiagonaledupoulpe.Sources.App.Shared.Plugins;
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
    private AutoLoaderAccessor _autoLoaderAccessor = null;
    #endregion

    #region Public methods
    public override void _Ready()
    {
        this._autoLoaderAccessor = this.GetNode<AutoLoaderAccessor>("/root/AutoLoaderAccessor");

        this._currentPlayer = this._autoLoaderAccessor.CurrentPlayer;
        this._statusBar = this._autoLoaderAccessor.StatusBar;

        this._currentPlayer.Connect(CharacterLifeSignal.HealthChanged.ToString(), this._statusBar, "LifeChanged");
    }
    #endregion

    #region Internal methods
    #endregion
}
