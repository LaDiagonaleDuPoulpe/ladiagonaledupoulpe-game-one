using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts;
using System;

/// <summary>
/// This class is dedicated o connect all signals in the game
/// It is loaded with AutoLoad option in Godot.
/// </summary>
public class Signals : Node
{
    #region Fields
    private Player _currentPlayer = null;

    #endregion

    #region Public methods
    public override void _Ready()
    {
        
    }
    #endregion
}
