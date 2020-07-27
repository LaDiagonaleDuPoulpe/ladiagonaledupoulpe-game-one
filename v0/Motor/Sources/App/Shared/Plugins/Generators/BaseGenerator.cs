using ddp.Plugins.Generators;
using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Generators;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Scenes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Plugins.Generators
{
    /// <summary>
    /// Uses it to generate a random list of sprites in a scene
    /// </summary>
    public abstract class BaseGenerator : Godot.Object, ISpriteGenerator
    {
        #region Constants
        private const string DEFAULT_RESOURCE_PATH = "res://Sources/App/";
        #endregion

        #region Fields
        private readonly GeneratorSetting _setting;
        private readonly IWithChilds _scene;
        private PackedScene _packedSceneToGenerate = null;
        private static Random __random = new Random();
        private List<IMovingSprite> _movingSprites = new List<IMovingSprite>();
        private Timer _timer = new Timer();
        #endregion

        #region Consructors
        public BaseGenerator(IWithChilds scene, GeneratorSetting setting)
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
            this.PrepareAllSprites();

            if (this.Setting.IsAutoMoving)
            {
                this.ConfigureTimer();
            }
        }

        public PackedScene LoadOne()
        {
            return (PackedScene)ResourceLoader.Load(DEFAULT_RESOURCE_PATH + this._setting.ResourcePath);
        }

        public virtual void MoveSprites()
        {
            const int MAX_X = 50;
            int stepX = __random.Next(0, MAX_X);

            if (this.Setting.LeftDirection)
            {
                stepX = -stepX;
            }

            this._movingSprites.ForEach((sprite) =>
            {
                this.MoveOneSprite(sprite, stepX);
            });
        }
        #endregion

        #region Internal methods
        /// <summary>
        /// Default movment of one sprite (node)
        /// </summary>
        /// <param name="sprite"></param>
        /// <param name="stepX">Adding step to the next position</param>
        protected virtual void MoveOneSprite(IMovingSprite sprite, int stepX)
        {
            sprite.Position = new Vector2(sprite.Position.x + stepX, sprite.Position.y);

            bool haveToBeReplaced = sprite.Position.x <= -sprite.Size.x ||
                                    sprite.Position.x >= this._scene.WindowSize.x;

            if (haveToBeReplaced)
            {
                float newX = 0;
                if (this.Setting.LeftDirection)
                {
                    newX = this._scene.WindowSize.x;
                }
                sprite.Position = new Vector2(newX, sprite.Position.y);
            }
        }

        private void ConfigureTimer()
        {
            this._timer.Connect("timeout", this, nameof(MoveSprites));
            this._timer.WaitTime = 1f;
            this._timer.OneShot = false;
            this._timer.Start();
        }

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

        private void PrepareAllSprites()
        {
            for (int i = 0; i < this._setting.InitialNumber; i++)
            {
                this.PrepareOneSprite();
            }
        }

        private void PrepareOneSprite()
        {
            IMovingSprite node = this._packedSceneToGenerate.Instance() as IMovingSprite;

            node.Position = this.RandomizeNewPosition();
            node.ZIndex = this._setting.ZIndex;

            this._scene.AddChild(node as Node);
            this._movingSprites.Add(node);
        }

        private Vector2 RandomizeNewPosition()
        {
            return new Vector2(__random.Next(0, (int)this.Setting.Size.x),
                               __random.Next(0, (int)this.Setting.Size.y));
        }
        #endregion

        #region Properties
        public GeneratorSetting Setting => this._setting;
        #endregion
    }

}
