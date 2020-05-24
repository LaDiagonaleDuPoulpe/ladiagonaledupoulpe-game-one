using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces;
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
            this.PrepareAllClouds();
        }
        #endregion

        #region Internal methods
        private void PrepareAllClouds()
        {
            for (int i = 0; i < this._setting.InitialNumber; i++)
            {
                ICloudSprite sprite = this._scene.CloudSprite.Clone() as ICloudSprite;

                sprite.Position = new Vector2(50, 50);
                sprite.ZIndex = this._setting.ZIndex;
            }
        }
        #endregion

        #region Properties
        public CloudGeneratorSetting Setting => this._setting;
        #endregion
    }
}