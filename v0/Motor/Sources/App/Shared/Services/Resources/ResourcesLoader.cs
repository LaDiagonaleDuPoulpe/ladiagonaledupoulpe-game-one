using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Interfaces.Scenes;
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
            this._maintThread.Start();
        }
        #endregion

        #region Internal methods
        private void LoadJson()
        {
            GD.Print("loadjson");
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
