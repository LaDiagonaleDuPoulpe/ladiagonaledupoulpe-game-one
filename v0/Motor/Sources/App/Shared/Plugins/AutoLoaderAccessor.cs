using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Interfaces.DialogBox;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts;
using ladiagonaledupoulpe.Sources.App.Shared.Services;
using ladiagonaledupoulpe.Sources.App.Shared.Services.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Plugins
{
    /// <summary>
    /// Accessor of all instances in autoloader.
    /// It will be auto-loaded after all others
    /// </summary>
    public class AutoLoaderAccessor : Node
    {
        #region Fields
        private GlobalDataService _globalDataService = null;
        private Player _currentPlayer = null;
        private OnePlayerStatusBar _statusBar = null;
        private IDialogBoxManager _dialogBoxManager = null;
        private LoadingScene _loadingScene = null;
        private ResourcesSceneLoader _resourcesSceneLoader = null;
        #endregion

        #region Public methods
        public override void _Ready()
        {
            base._Ready();

            this._globalDataService = this.GetNode<GlobalDataService>("/root/GlobalDataService");
            this._currentPlayer = this.GetNode<Player>("/root/CurrentPlayer");
            this._statusBar = this.GetNode<OnePlayerStatusBar>("/root/OnePlayerStatusBar");
            this._dialogBoxManager = this.GetNode<IDialogBoxManager>("/root/DialoxBoxManager");
            this._loadingScene = this.GetNode<LoadingScene>("/root/LoadingScene");
            this._resourcesSceneLoader = this.GetNode<ResourcesSceneLoader>("/root/ResourcesSceneLoader");
        }
        #endregion

        #region Properties
        /// <summary>
        /// Service to get global project data
        /// </summary>
        public GlobalDataService GlobalDataService { get => this._globalDataService; private set => this._globalDataService = value; }
        
        /// <summary>
        /// Current instance of the player
        /// </summary>
        public Player CurrentPlayer { get => _currentPlayer; private set => _currentPlayer = value; }

        /// <summary>
        /// Status bar of the player
        /// </summary>
        public OnePlayerStatusBar StatusBar { get => _statusBar; private set => _statusBar = value; }

        /// <summary>
        /// Manager of the dialog box in the game
        /// </summary>
        public IDialogBoxManager DialogBoxManager { get => this._dialogBoxManager; private set => this._dialogBoxManager  = value; }

        /// <summary>
        /// Loading scene to switch between two scenes
        /// </summary>
        public LoadingScene LoadingScene { get => this._loadingScene; private set => this._loadingScene = value; }

        /// <summary>
        /// Loader of all ressources of one scene
        /// </summary>
        public ResourcesSceneLoader ResourcesSceneLoader { get => _resourcesSceneLoader; set => _resourcesSceneLoader = value; }
        #endregion
    }
}
