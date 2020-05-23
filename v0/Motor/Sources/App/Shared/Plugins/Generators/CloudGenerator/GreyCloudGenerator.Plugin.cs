using Godot;
using System;

namespace ddp.Plugins.Generators.CloudGenerator
{
    /// <summary>
    /// Uses it to generate a random list of clouds in a scene
    /// </summary>
    public class GreyCloudGenerator 
    {
        #region Fields
        private CloudGeneratorSetting _setting;
        #endregion

        #region Consructors
        public GreyCloudGenerator(CloudGeneratorSetting setting)
        {
            this._setting = setting;
        }
        #endregion
    }
}