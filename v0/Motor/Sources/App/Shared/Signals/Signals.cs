using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Scripts;
using ladiagonaledupoulpe.Sources.App.Core.Models.Games;
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
    private Game _currentGame = null;
    private Player _currentPlayer = null;
    private OnePlayerStatusBar _statusBar = null;
    private AutoLoaderAccessor _autoLoaderAccessor = null;
    #endregion

    #region Public methods
    public override void _Ready()
    {
        this._autoLoaderAccessor = this.GetNode<AutoLoaderAccessor>("/root/AutoLoaderAccessor");

        this._currentPlayer = this._autoLoaderAccessor.CurrentPlayer;
        this._currentGame = this._autoLoaderAccessor.CurrentGame;
        this._statusBar = this._autoLoaderAccessor.StatusBar;

        this.ConnectGame();
        this.ConnectPlayer();
    }
    #endregion

    #region Internal methods
    private void ConnectGame()
    {
        // Nothing to do for now
    }

    private void ConnectPlayer()
    {
        this._currentPlayer.Connect(nameof(Player.HealthChanged), this._statusBar, nameof(OnePlayerStatusBar.LifeChanged));
        this._currentPlayer.Connect(nameof(Player.HealthInitialized), this._statusBar, nameof(OnePlayerStatusBar.InitializeLife));
        this._currentPlayer.Connect(nameof(Player.HealthInitialized), this._currentGame, nameof(Game.Player_HealthInitialized));
        this._currentPlayer.Connect(nameof(Player.LifeIsGone), this.GetTree().CurrentScene, nameof(RootScene.PlayerDie));
    
        this._currentPlayer.Connect(nameof(Player.SynaleInitialized), this._statusBar, nameof(OnePlayerStatusBar.InitializeSynale));
        this._currentPlayer.Connect(nameof(Player.SynalePowerUpdated), this._statusBar, nameof(OnePlayerStatusBar.SynalePowerChanged));

        this._currentPlayer.Connect(nameof(Player.RebornActivated), this._currentGame, nameof(Game.Player_RebornActivated));
    }
    #endregion
}
