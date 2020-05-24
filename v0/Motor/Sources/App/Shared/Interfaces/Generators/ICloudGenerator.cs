using ddp.Plugins.Generators.CloudGenerator;

namespace ladiagonaledupoulpe.Sources.App.Shared.Interfaces
{
    /// <summary>
    /// Uses it to generate a random list of clouds in a scene
    /// </summary>
    public interface IGreyCloudGenerator
    {
        /// <summary>
        /// Generates first clouds and the next ones
        /// </summary>
        void Generate();

        /// <summary>
        /// Setting to configure clouds generation
        /// </summary>
        CloudGeneratorSetting Setting { get; }
    }
}