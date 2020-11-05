using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Interfaces.DialogBox;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using ladiagonaledupoulpe.Sources.App.Shared.Plugins;
using ladiagonaledupoulpe.Sources.App.Shared.Plugins.Initializers;
using ladiagonaledupoulpe.Sources.App.Shared.Plugins.Preloaders;
using ladiagonaledupoulpe.Sources.App.Shared.Services.Data;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Base.Scenes
{
    /// <summary>
    /// Parent scene of all scene (root and active scenes)
    /// </summary>
    public abstract class BaseScene : Node2D
    {
        #region Fields
        private DataPreloader _dataPreloader = null;

        #region Signals
        [Signal]
        public delegate void ShowBox();
        #endregion
        #endregion

        #region Public methods
        public override void _Ready()
        {
            base._Ready();
            this.AutoLoaderAccessor = this.GetNode<AutoLoaderAccessor>("/root/AutoLoaderAccessor");
            this.DataPreloader = this.AutoLoaderAccessor.DataPreloader;
        }
        #endregion

        #region Internal methods
        /// <summary>
        /// Load all data from one step, with main data initializer
        /// </summary>
        protected void LoadMainData(DataInitializerStep step)
        {
            this.DataPreloader.Connect(LoadDataType.DataLoaded.ToString(), this, nameof(globalDataInitializer_DataLoaded));
            this.DataPreloader.Load(step);
        }

        private void globalDataInitializer_DataLoaded(Godot.Object sender, Godot.Object data)
        {
            this.ExecuteAfterDataLoaded();
        }

        /// <summary>
        /// Overrides this method to define what to do after main data loaded
        /// </summary>
        protected virtual void ExecuteAfterDataLoaded()
        {
            // nothing to do here
        }
        #endregion

        #region Properties
        /// <summary>
        /// Manager of the dialog box
        /// </summary>
        public IDialogBoxManager DialoxBoxManager { get => this.AutoLoaderAccessor.DialogBoxManager; }

        /// <summary>
        /// Scene that loads other scene.
        /// It prepare all resources before loading scene
        /// </summary>
        public LoadingScene LoadingScene { get => this.AutoLoaderAccessor.LoadingScene; }

        /// <summary>
        /// Accessor of all autoloaded data 
        /// </summary>
        public AutoLoaderAccessor AutoLoaderAccessor { get; private set; }

        /// <summary>
        /// Singleton to get a proxy of preloading data with data initializers
        /// </summary>
        public DataPreloader DataPreloader { get => _dataPreloader; private set => _dataPreloader = value; }
        #endregion
    }
}
