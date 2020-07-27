using ddp.Plugins.Generators;
using ddp.Plugins.Generators.CloudGenerator;
using Godot;

namespace ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Generators
{
    /// <summary>
    /// Uses it to generate a random list of sprites in a scene
    /// </summary>
    public interface ISpriteGenerator
    {
        /// <summary>
        /// Defines it to initialize the generator
        /// </summary>
        void Initialize();

        /// <summary>
        /// Generates first clouds and the next ones
        /// </summary>
        void Generate();

        /// <summary>
        /// Loads one packed scene as one item to generate
        /// </summary>
        /// <returns></returns>
        PackedScene LoadOne();

        /// <summary>
        /// Move all sprites
        /// </summary>
        void MoveSprites();

        /// <summary>
        /// Setting to configure clouds generation
        /// </summary>
        GeneratorSetting Setting { get; }
    }
}