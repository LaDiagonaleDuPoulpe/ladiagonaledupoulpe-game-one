using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts;
using ladiagonaledupoulpe.Sources.App.Core.Models.Games;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.DialogBox;
using ladiagonaledupoulpe.Sources.App.Shared.Plugins.Initializers;
using ladiagonaledupoulpe.Sources.App.Shared.Plugins.Preloaders;
using ladiagonaledupoulpe.Sources.App.Shared.Services;
using ladiagonaledupoulpe.Sources.App.Shared.Services.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ladiagonaledupoulpe.Sources.App.Shared.Tools.ExtensionMethods;

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
		private ProxyDataInitializer _proxyDataInitializer = null;
		private DataPreloader _dataPreloader = null;
		private Game _currentGame = null;
		#endregion

		#region Public methods
		public override void _Ready()
		{
			base._Ready();

			this.GlobalDataService = this.GetRootNode<GlobalDataService>();
			this.CurrentPlayer = this.GetRootNode<Player>("CurrentPlayer");
			this.CurrentGame = this.GetRootNode<Game>("CurrentGame");
			this.StatusBar = this.GetRootNode<OnePlayerStatusBar>();
			this.DialogBoxManager = this.GetRootNode<IDialogBoxManager>("DialoxBoxManager");
			this.LoadingScene = this.GetRootNode<LoadingScene>("LoadingScene");
			this.ResourcesSceneLoader = this.GetRootNode<ResourcesSceneLoader>();
			this.ProxyDataInitializer = this.GetRootNode<ProxyDataInitializer>();
			this.DataPreloader = this.GetRootNode<DataPreloader>();
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
		public ResourcesSceneLoader ResourcesSceneLoader { get => _resourcesSceneLoader; private set => _resourcesSceneLoader = value; }
	   
		/// <summary>
		/// Access of the proxy of all data initializers
		/// </summary>
		public ProxyDataInitializer ProxyDataInitializer { get => _proxyDataInitializer; private set => _proxyDataInitializer = value; }

		/// <summary>
		/// Preloader of data, using the data initializer proxy <c>ProxyDataInitializer</c>
		/// </summary>
		public DataPreloader DataPreloader { get => _dataPreloader; private set => _dataPreloader = value; }

		/// <summary>
		/// Access of the current game (all data of the current game)
		/// </summary>
		public Game CurrentGame { get => _currentGame; private set => _currentGame = value; }
		#endregion
	}
}
