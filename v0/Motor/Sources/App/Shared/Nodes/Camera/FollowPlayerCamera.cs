using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts;
using ladiagonaledupoulpe.Sources.App.Shared.Plugins;
using System;

namespace ladiagonaledupoulpe.Sources.App.Shared.Nodes.Camera
{
    /// <summary>
    /// Camera that follows the player
    /// </summary>
    public class FollowPlayerCamera : Camera2D
    {
        #region Fields
        private Player _player = null;
        #endregion

        #region Public methods
        public override void _Ready()
        {
            AutoLoaderAccessor autoLoader = this.GetNode<AutoLoaderAccessor>("/root/AutoLoaderAccessor");
            this._player = autoLoader.CurrentPlayer;
        }

        public override void _Process(float delta)
        {
            this.Position = this._player.Position;
            this.Align();
        }
        #endregion
    }
}
