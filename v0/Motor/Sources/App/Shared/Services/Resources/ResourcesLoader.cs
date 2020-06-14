using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Interfaces.Scenes;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Services
{
    /// <summary>
    /// Loads all resources about one scene
    /// It uses background loading with signals to know the steps during loading
    /// </summary>
    public class ResourcesLoader : Node
    {
        #region Fields
        #region Events
        /// <summary>
        /// Starting loading resources
        /// </summary>
        [Signal]
        public delegate void Begin(int nbResources);

        /// <summary>
        /// End of the loading of all resources
        /// </summary>
        [Signal]
        public delegate void End();

        /// <summary>
        /// Reinit the loading actions but not stop it
        /// </summary>
        [Signal]
        public delegate void Reinit();

        /// <summary>
        /// Just before starting loading resource
        /// </summary>
        [Signal]
        public delegate void BeginLoadingResource();

        /// <summary>
        /// Just after loading one resource
        /// </summary>
        [Signal]
        public delegate void EndLoadingResource();
        #endregion

        private static Lazy<ResourcesLoader> __instance = new Lazy<ResourcesLoader>(() => new ResourcesLoader());
        private ILevelConfiguration _configuration = null;
        private System.Threading.Thread _maintThread = null;
        private SceneConfigurationSetting _currentSetting = null;
        #endregion

        #region Constructors
        private ResourcesLoader()
        {
        }
        #endregion

        #region Public methods
        public void Start(ILevelConfiguration configuration)
        {
            this._configuration = configuration;
            this._maintThread = new System.Threading.Thread(new System.Threading.ThreadStart(this.LoadResources));

            this.EmitSignal(LoadingActionsType.Begin.ToString(), 1);
            this._maintThread.Start();
        }
        #endregion

        #region Internal methods
        private void LoadResources()
        {
            if (! this.LoadJson())
            {
                throw new System.IO.FileLoadException();
            }

            this.WaitTimeBeforeLoadResources();
        }

        private void WaitTimeBeforeLoadResources()
        {
            // TODO: 14/05/2020, see to add a timer to wait a bit of time before load real resources, but timer must be added inside the SceneTree 
            this.LoadResourcesFromJson();
        }

        private bool LoadJson()
        {
            bool isOk = false;

            using (var file = new Godot.File())
            {
                try
                {
                    this.EmitSignal(LoadingActionsType.BeginLoadingResource.ToString());

                    string resourcePath = string.Format("res://Data/Scenes/{0}.json", this._configuration.Key);
                    var error = file.Open(resourcePath, File.ModeFlags.Read);

                    string content = file.GetAsText();
                    this._currentSetting = Newtonsoft.Json.JsonConvert.DeserializeObject<SceneConfigurationSetting>(content);

                    this.EmitSignal(LoadingActionsType.EndLoadingResource.ToString());
                    isOk = true;
                }
                finally
                {
                    file.Close();
                }
            }

            return isOk;
        }

        private void LoadResourcesFromJson()
        {
            this.EmitSignal(LoadingActionsType.Reinit.ToString());



            this.EmitSignal(LoadingActionsType.End.ToString());
        }
        #endregion

        #region Properties
        /// <summary>
        /// Returns the singleton
        /// </summary>
        public static ResourcesLoader Instance { get => __instance.Value; }
        #endregion
    }
}
