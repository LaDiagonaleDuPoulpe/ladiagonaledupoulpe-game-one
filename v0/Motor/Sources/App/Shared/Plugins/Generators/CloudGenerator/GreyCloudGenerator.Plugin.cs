using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Scenes;
using System;

namespace ddp.Plugins.Generators.CloudGenerator
{
    /// <summary>
    /// Uses it to generate a random list of clouds in a scene
    /// </summary>
    public class GreyCloudGenerator : IGreyCloudGenerator
    {
        #region Fields
        private readonly CloudGeneratorSetting _setting;
        private readonly IWithClouds _scene;
        #endregion

        #region Consructors
        public GreyCloudGenerator(IWithClouds scene, CloudGeneratorSetting setting)
        {
            this._setting = setting;
            this._scene = scene;
        }
        #endregion

        #region Public methods
        public void Generate()
        {

        }
        #endregion

        #region Properties
        public CloudGeneratorSetting Setting => this._setting;
        #endregion
    }
}