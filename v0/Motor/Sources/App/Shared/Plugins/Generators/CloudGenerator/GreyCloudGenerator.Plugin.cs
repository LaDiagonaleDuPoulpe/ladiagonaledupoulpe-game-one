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
        #region Constants
        private const string DEFAULT_RESOURCE_PATH = "res://Sources/App/";
        #endregion

        #region Fields
        private readonly GeneratorSetting _setting;
        private readonly IWithClouds _scene;
        private PackedScene _packedSceneToGenerate = null;
        private static Random __random = new Random();
        private List<ICloudSprite> _cloudSprites = new List<ICloudSprite>();
        private Timer _timer = new Timer();
        #endregion

        #region Consructors
        public GreyCloudGenerator(IWithClouds scene, GeneratorSetting setting)
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

            this.DefineArea();
        }

        public void Generate()
        {
            this.PrepareAllClouds();
        }

        public PackedScene LoadOne()
        {
            return (PackedScene)ResourceLoader.Load(DEFAULT_RESOURCE_PATH + this._setting.ResourcePath);
        }
        #endregion

        #region Internal methods
        private void DefineArea()
        {
            float x = this.Setting.Size.x;
            float y = this.Setting.Size.y;

            if (x == 0)
            {
                x = this._scene.WindowSize.x;
            }
            if (y == 0)
            {
                y = this._scene.WindowSize.y;
            }
            this.Setting.Size = new Vector2(x, y);
        }
        
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

            node.Position = new Vector2(__random.Next(0, (int) this.Setting.Size.x), 
                                        __random.Next(0, (int) this.Setting.Size.y));
            node.ZIndex = this._setting.ZIndex;

            this._scene.AddChild(node as Node);
            this._cloudSprites.Add(node);
        }
        #endregion

        #region Properties
        public GeneratorSetting Setting => this._setting;
        #endregion
    }
}