using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Generators;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Scenes;
using ladiagonaledupoulpe.Sources.App.Shared.Plugins.Generators;
using System;
using System.Collections.Generic;

namespace ddp.Plugins.Generators.CloudGenerator
{
    /// <summary>
    /// Uses it to generate a random list of clouds in a scene
    /// </summary>
    public class GreyCloudGenerator : BaseGenerator
    {
        #region Constructors
        public GreyCloudGenerator(IWithChilds scene, GeneratorSetting setting) : base(scene, setting)
        {
            this.Setting.ResourcePath = "Shared/Scenes/Clouds/GreyCloud.tscn";
        }
        #endregion
    }
}