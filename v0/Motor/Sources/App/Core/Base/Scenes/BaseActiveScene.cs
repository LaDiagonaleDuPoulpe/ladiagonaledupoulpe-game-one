using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts;
using ladiagonaledupoulpe.Sources.App.Core.Models.DialogBox;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Scenes;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Scenes;
using ladiagonaledupoulpe.Sources.App.Shared.Plugins;
using ladiagonaledupoulpe.Sources.App.Shared.Services;
using ladiagonaledupoulpe.Sources.App.Shared.Services.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Base.Scenes
{
    /// <summary>
    /// Base class to each active scene in project
    /// </summary>
    public abstract class BaseActiveScene : BaseScene, IDataInit
    {
        #region Fields
        #region Signals
        /// <summary>
        /// Asks for activate camera to the observer
        /// </summary>
        /// <param name="cameraKey">Key of the camera</param>
        [Signal]
        public delegate void ActivateCamera(string cameraKey);
        #endregion
        #endregion

        #region Constructors
        public BaseActiveScene() : base()
        {

        }
        #endregion

        #region Public methods
        public override void _Ready()
        {
            base._Ready();

            this.Initialize();
        }

        /// <summary>
        /// You can override this method to add more code to initialize the scene
        /// </summary>
        public virtual void Initialize()
        {
            this.Initialize(this.AutoLoaderAccessor.GlobalDataService.CurrentExchanges);
            this.PrepareEvents();
            this.DefineCurrentCamera();
        }

        public void Initialize(List<DialogBoxExchange> contents)
        {
            this.DialoxBoxManager.Preload(contents);
            this.SetVisibilityGlobalNodes();
        }
        #endregion

        #region Internal methods
        private void PrepareEvents()
        {
            this.AutoLoaderAccessor.DialogBoxManager.Connect(nameof(Shared.Services.DialoxBoxManager.EndOfOneExchange), this, nameof(EndOfOneExchange));
        }

        private void EndOfOneExchange()
        {
            GD.Print("EndOfOneExchange");
        }

        /// <summary>
        /// Defines visibility of player, statusbar, ...
        /// </summary>
        /// <param name="visible"></param>
        protected virtual void SetVisibilityGlobalNodes()
        {
            this.SetVisibilityGlobalNodes(this.RootNodesVisibility);
        }

        /// <summary>
        /// Defines visibility of player, statusbar, ...
        /// </summary>
        /// <param name="visible"></param>
        protected virtual void SetVisibilityGlobalNodes(bool visibility)
        {
            this.AutoLoaderAccessor.CurrentPlayer.Visible = visibility;
            this.AutoLoaderAccessor.StatusBar.SetVisibility(visibility);
        }

        /// <summary>
        /// Sets the current camera to be activated
        /// </summary>
        protected override void DefineCurrentCamera()
        {
            this.ActivateMainCamera();
        }

        /// <summary>
        /// Use this method to activate the root main camera
        /// </summary>
        protected virtual void ActivateMainCamera()
        { 
            this.EmitSignal(nameof(ActivateCamera), "Main");
        }
        #endregion

        #region Properties
        /// <summary>
        /// Defines visibility of player, statusbar, ...
        /// </summary>
        public virtual bool RootNodesVisibility { get => true; }

        /// <summary>
		/// Gets the setting of the current scene
		/// </summary>
		/// <remarks>It will change each time you change the current scene</remarks>
		public SceneConfigurationSetting CurrentSetting { get; set; }
        #endregion
    }
}
