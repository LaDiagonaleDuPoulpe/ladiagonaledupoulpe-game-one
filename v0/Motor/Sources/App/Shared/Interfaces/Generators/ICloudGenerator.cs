using ddp.Plugins.Generators.CloudGenerator;
using Godot;

namespace ladiagonaledupoulpe.Sources.App.Shared.Interfaces
{
    /// <summary>
    /// Uses it to generate a random list of clouds in a scene
    /// </summary>
    public interface IGreyCloudGenerator
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
        /// Setting to configure clouds generation
        /// </summary>
        CloudGeneratorSetting Setting { get; }
    }
}