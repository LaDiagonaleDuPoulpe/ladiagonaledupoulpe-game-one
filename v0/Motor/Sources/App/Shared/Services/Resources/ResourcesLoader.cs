using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Interfaces.Scenes;
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
        public delegate void Begin();
        /// <summary>
        /// End of the loading of all resources
        /// </summary>
        [Signal]
        public delegate void End();
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
        #endregion

        #region Constructors
        private ResourcesLoader() { }
        #endregion

        #region Public methods
        public void Start(ILevelConfiguration configuration)
        {
            this._configuration = configuration;
            this._maintThread = new System.Threading.Thread(new System.Threading.ThreadStart(this.LoadJson));

            this.EmitSignal(LoadingActionsType.Begin.ToString());
            this._maintThread.Start();
        }
        #endregion

        #region Internal methods
        private void LoadJson()
        {
            using (var file = new Godot.File())
            {
                string resourcePath = string.Format("res://Data/Scenes/{0}.json", this._configuration.Key);
                var error = file.Open(resourcePath, File.ModeFlags.Read);

                string content = file.GetAsText();
            }
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
