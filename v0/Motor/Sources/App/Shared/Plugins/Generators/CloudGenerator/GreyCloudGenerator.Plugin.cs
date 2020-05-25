using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Scenes;
using System;
using System.Collections.Generic;

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
        private PackedScene _packedSceneToGenerate = null;
        private static Random __random = new Random();
        private List<ICloudSprite> _cloudSprites = new List<ICloudSprite>();
        private Timer _timer = new Timer();
        #endregion

        #region Consructors
        public GreyCloudGenerator(IWithClouds scene, CloudGeneratorSetting setting)
        {
            this._setting = setting;
            this._scene = scene;
        }
        #endregion

        #region Public methods
        public void Initialize()
        {
            this._packedSceneToGenerate = this.LoadOne();
            this._scene.AddChild(this._timer);
        }

        public void Generate()
        {
            this.PrepareAllClouds();
        }

        public PackedScene LoadOne()
        {
            return (PackedScene)ResourceLoader.Load("res://Sources/App/" + this._setting.ResourcePath);
        }
        #endregion

        #region Internal methods
        private void PrepareAllClouds()
        {
            for (int i = 0; i < this._setting.InitialNumber; i++)
            {
                this.PrepareOneCloud();
            }
        }

        private void PrepareOneCloud()
        {
            ICloudSprite node = this._packedSceneToGenerate.Instance() as ICloudSprite;

            node.Position = new Vector2(__random.Next(0, 1000), __random.Next(0, 200));
            node.ZIndex = this._setting.ZIndex;

            this._scene.AddChild(node as Node);
            this._cloudSprites.Add(node);
        }
        #endregion

        #region Properties
        public CloudGeneratorSetting Setting => this._setting;
        #endregion
    }
}